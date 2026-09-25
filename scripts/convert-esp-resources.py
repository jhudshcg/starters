#!/usr/bin/env python3
"""Offline ESP conversion. Stage outside repo; publish separately after review.
PDF: pdfplumber/pdfminer + PDFium, DOCX: Pandoc. Never modify originals.
"""
import argparse
from collections import Counter
from datetime import date
import hashlib
import importlib.metadata
import json
from pathlib import Path
import re
import subprocess
from urllib.parse import quote
import pdfplumber

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT.parent / 'agents'
STAGE = Path('/private/tmp/starters-esp-conversions')
VERSION = '2'

def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()

def sources():
    result = []
    for p in sorted(SOURCE.rglob('*')):
        if not p.is_file() or 'md' in p.relative_to(SOURCE).parts:
            continue
        rel = str(p.relative_to(SOURCE))
        if not ('esp' in rel.lower() or 'exemplification material' in rel):
            continue
        if p.suffix.lower() in ('.pdf', '.docx'):
            result.append(p)
        elif not p.suffix and p.open('rb').read(5) == b'%PDF-':
            result.append(p)
    return result

def normal(text):
    return re.sub(r'\d+', '#', re.sub(r'\s+', ' ', text).strip())

def cell(value):
    return (value or '').strip().replace('|', '&#124;').replace('\n', '<br>')

def table_md(rows):
    width = max(map(len, rows))
    rows = [list(r) + [None] * (width - len(r)) for r in rows]
    # Generic headers avoid interpreting a merged band/mark row as field names.
    out = ['| ' + ' | '.join(f'Column {i+1}' for i in range(width)) + ' |',
           '| ' + ' | '.join('---' for _ in range(width)) + ' |']
    out += ['| ' + ' | '.join(cell(x) for x in r) + ' |' for r in rows]
    return '\n'.join(out)

def inside(obj, box):
    x, y = (obj['x0']+obj['x1'])/2, (obj['top']+obj['bottom'])/2
    return box[0] <= x <= box[2] and box[1] <= y <= box[3]

def convert_pdf(src, out, meta):
    assetdir = out.parent / 'assets' / src.stem
    assetdir.mkdir(parents=True, exist_ok=True)
    result, pages = [], []
    with pdfplumber.open(src) as doc:
        # Recognise actual recurring margin text, not all text near page edges.
        freq = Counter()
        for pg in doc.pages:
            freq.update(set(normal(l['text']) for l in pg.extract_text_lines(y_tolerance=5)
                if l['top'] < pg.height*.09 or l['top'] > pg.height*.925))
        repeated = {s for s,n in freq.items() if n >= 2}
        for i, pg in enumerate(doc.pages, 1):
            removed=[]
            def keep(c):
                return True
            lines=pg.extract_text_lines(y_tolerance=5)
            for line in lines:
                text=normal(line['text'])
                margin=line['top']<pg.height*.09 or line['top']>pg.height*.925
                footer=(line['top']>pg.height*.88 and (
                    re.fullmatch(r'\d+',line['text'].strip()) or
                    re.search(r'©|Pearson|Turn over|[PSW]\d{5,}|DO NOT WRITE|registered trade|Department for Education|Guide Exemplar Response|T Level Technical Qualification',line['text'],re.I)))
                if (margin and text in repeated) or footer:
                    removed.append(line)
            boxes=[(l['x0']-.2,l['top']-.2,l['x1']+.2,l['bottom']+.2) for l in removed]
            clean=pg.filter(lambda o: o.get('object_type')!='char' or not any(inside(o,b) for b in boxes))
            events=[]; tables=[]; flags=[]
            settings={}
            if str(src.relative_to(SOURCE))=='mark schemes/esp-mark-scheme-19612-summer-2026.pdf' and i==17:
                # Source has two open-bottom pseudocode cells: supply their actual
                # shared bottom edge so pdfplumber retains all three columns.
                settings={'explicit_horizontal_lines':[346.3]}
            for t in clean.find_tables(settings):
                rows=t.extract()
                # Discard diagram frames / empty boxes, not genuine one-row forms.
                values=[x for r in rows for x in r if x and x.strip()]
                if len(values)<2 or max(map(len,rows),default=0)<2:
                    continue
                tables.append(t)
                events.append((t.bbox[1],t.bbox[0],table_md(rows)))
                # Preserve visual geometry: Markdown cannot represent merged cells faithfully.
                name=f'page-{i:03}-table-{len(tables):02}.png'
                clean.crop(t.bbox).to_image(resolution=150).save(assetdir/name)
                events.append((t.bbox[1]+.01,t.bbox[0],
                    f'[Table {len(tables)} layout / merged cells](<{quote("assets/"+src.stem+"/"+name)}>)'))
            body=clean.filter(lambda o: o.get('object_type')!='char' or not any(inside(o,t.bbox) for t in tables))
            paragraph=None
            for line in body.extract_text_lines(y_tolerance=5):
                text=line['text'].strip()
                if not text: continue
                text=re.sub(r'^[•\uf0b7]\s*','- ',text)
                text=re.sub(r'^o\s+','  - ',text)
                chars=line.get('chars',[])
                bold=chars and all('bold' in c.get('fontname','').lower() for c in chars if c.get('text','').strip())
                if bold and len(text)<160: text='### '+text
                new_item=bool(re.match(r'\s*(?:-|[a-zA-Z0-9]+[.)])\s',text))
                if paragraph and not new_item and not text.startswith('### ') and not paragraph[2].startswith('### ') and 0 < line['top']-paragraph[3] <= max(18,paragraph[4]*1.7):
                    paragraph[2]+=' '+text;paragraph[3]=line['top'];paragraph[4]=line['bottom']-line['top']
                else:
                    if paragraph: events.append(tuple(paragraph[:3]))
                    paragraph=[line['top'],line['x0'],text,line['top'],line['bottom']-line['top']]
            if paragraph: events.append(tuple(paragraph[:3]))
            visuals=[]
            for img in pg.images:
                x0,top,x1,bottom=[img[k] for k in ['x0','top','x1','bottom']]
                # Decorative full-page backgrounds and repeating top/footer logos.
                if (x1-x0)*(bottom-top)>.8*pg.width*pg.height:
                    flags.append('Excluded full-page background image; inspect if page lacks native text.')
                    continue
                if bottom<pg.height*.18 or top>pg.height*.94:
                    continue
                if i==1 and bottom<pg.height*.3:
                    continue
                b=(max(0,x0),max(0,top),min(pg.width,x1),min(pg.height,bottom))
                if b[2]-b[0]<12 or b[3]-b[1]<12: continue
                # Overlapping image fragments become a single rendered region below.
                visuals.append(b)
            merged=[]
            for b in visuals:
                overlaps=[a for a in merged if b[0]<=a[2]+3 and b[2]>=a[0]-3 and b[1]<=a[3]+3 and b[3]>=a[1]-3]
                for a in overlaps:
                    merged.remove(a); b=(min(a[0],b[0]),min(a[1],b[1]),max(a[2],b[2]),max(a[3],b[3]))
                merged.append(b)
            # Drawn flowcharts may have no raster images. Retain a body visual for
            # pages with substantial vector drawings outside extracted tables.
            vectors=[v for v in pg.curves+pg.rects if v['top']>pg.height*.13 and v['bottom']<pg.height*.94 and not any(inside(v,t.bbox) for t in tables)]
            if len(vectors)>12 and not tables:
                merged.append((0,pg.height*.13,pg.width,pg.height*.94));flags.append('Vector-rich body retained as image.')
            if len((clean.extract_text() or '').strip())<40 and not merged:
                merged.append((0,0,pg.width,pg.height)); flags.append('Image-only/near-empty page retained in full; review required.')
            for n,b in enumerate(merged,1):
                name=f'page-{i:03}-figure-{n:02}.png'
                pg.crop(b).to_image(resolution=160).save(assetdir/name)
                events.append((b[1],b[0],f'![Source page {i}, figure {n}: assessment evidence; inspect image for diagram/code detail](<{quote("assets/"+src.stem+"/"+name)}>)'))
            plain=clean.extract_text() or ''
            code_lines=sum(bool(re.match(r'\s*(def |import |from .+ import |while |if .+:|elif .+:|for .+:|print\(|return )',l)) for l in plain.splitlines())
            if code_lines>=3 and not tables:
                layout=clean.extract_text(layout=True) or plain
                layout='\n'.join(l.rstrip() for l in layout.splitlines()).strip('\n')
                layout=re.sub(r'\n{4,}','\n\n\n',layout)
                visual_events=[e for e in events if e[2].startswith('![')]
                events=[(0,0,'```text\n'+layout+'\n```')]+visual_events
                flags.append('Code-like native text retained in a layout-preserving text block; source wrapping is not executable code.')
            if len(plain.strip())<40 and not merged:
                flags.append('Little native text; inspect source page for image-only content.')
            result.append(f'\n## Source page {i}\n\n'+'\n\n'.join(e[2] for e in sorted(events)))
            rendered=' '.join(e[2] for e in events)
            missing=Counter(c.lower() for c in plain if c.isalnum())-Counter(c.lower() for c in rendered if c.isalnum())
            if sum(missing.values())>0: flags.append(f'Native alphanumeric coverage deficit: {dict(missing)}; inspect tables/text.')
            pages.append(dict(page=i,native_characters=len(plain),tables=len(tables),figures=len(merged),
                removed_margin_lines=[l['text'] for l in removed],flags=sorted(set(flags))))
    meta['pages']=pages
    return '\n'.join(result)

def convert(src):
    rel=src.relative_to(SOURCE); out=STAGE/rel.parent/'md'/f'{src.stem}.md'
    side=out.with_suffix('.conversion.json'); fingerprint=digest(src)
    if side.exists():
        old=json.loads(side.read_text())
        if old.get('source_sha256')==fingerprint and old.get('converter_sha256')==digest(Path(__file__)) and out.exists():
            print('CACHE',rel,flush=True);return old
    out.parent.mkdir(parents=True,exist_ok=True)
    meta=dict(source=str(rel),source_sha256=fingerprint,converter_sha256=digest(Path(__file__)),
        converted=str(date.today()),output=str(out.relative_to(STAGE)),
        tools={'pdfplumber':importlib.metadata.version('pdfplumber'),'pypdfium2':importlib.metadata.version('pypdfium2'),'pandoc':'3.11'},
        review_status='extracted; quality review pending')
    header=(f'# {src.stem}\n\n'
        f'- Source: [{src.name}](<{quote("../"+src.name)}>)\n'
        f'- SHA-256: `{fingerprint}`\n- Converted: {meta["converted"]}; offline pdfplumber/PDFium or Pandoc.\n'
        '- Faithful extraction, not a summary. Original source remains authoritative.\n'
        '- PDF page numbers include covers. Repeated margin text omitted; source wording retained.\n'
        '- Table columns are positional; blank cells may be merged in the original. Linked table images preserve geometry.\n'
        '- Figure text is not transcribed automatically; inspect linked images where relevant.\n\n')
    if src.suffix.lower()=='.docx':
        asset=Path('assets')/src.stem
        cmd=['/opt/homebrew/bin/pandoc',str(src),'-f','docx','-t','gfm','--wrap=none','--extract-media='+str(asset)]
        body=subprocess.run(cmd,cwd=out.parent,capture_output=True,text=True,check=True).stdout
        meta['pages']=[]
        meta['notes']=['DOCX has no stable source page numbers; body order retained. Headers/footers excluded by Pandoc.']
    else: body=convert_pdf(src,out,meta)
    out.write_text(header+body+'\n')
    meta['output_sha256']=digest(out)
    side.write_text(json.dumps(meta,indent=2)+'\n')
    print('CONVERTED',rel,flush=True)
    return meta

if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--match',default='');args=parser.parse_args()
    files=[p for p in sources() if args.match.lower() in str(p.relative_to(SOURCE)).lower()]
    for p in files: convert(p)
