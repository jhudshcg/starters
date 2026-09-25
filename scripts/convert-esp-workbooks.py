#!/usr/bin/env python3
"""Read-only XLSX export: Markdown + exact formulas/cache JSON/CSV + styled HTML.
No formula evaluation; original sheet/style XML retained for fidelity and audit.
"""
import argparse,csv,hashlib,html,json,re,shutil,warnings,zipfile
from datetime import date,datetime
from pathlib import Path
from urllib.parse import quote
from xml.etree import ElementTree as ET
import openpyxl
from openpyxl.styles.colors import COLOR_INDEX
from openpyxl.utils import get_column_letter
ROOT=Path(__file__).resolve().parents[1];SOURCE=ROOT.parent/'agents';STAGE=Path('/private/tmp/starters-esp-workbooks')
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def value(v):return v.isoformat() if isinstance(v,(datetime,date)) else v
def txt(v):return '' if v is None else str(value(v))
def md(v):return txt(v).replace('|','&#124;').replace('\n','<br>')
def colour(c):
 if not c:return None
 if c.type=='rgb':return '#'+str(c.rgb)[-6:]
 if c.type=='indexed' and c.indexed<len(COLOR_INDEX):return '#'+COLOR_INDEX[c.indexed][-6:]
 return None # raw styles/theme retain theme/tint definitions; note HTML limitation

def convert(p):
 rel=p.relative_to(SOURCE);out=STAGE/rel.parent/'md'/f'{p.stem}.md';side=out.with_suffix('.workbook.json');asset=out.parent/'assets'/p.stem
 if side.exists():
  m=json.loads(side.read_text())
  if m['source_sha256']==sha(p) and m['converter_sha256']==sha(Path(__file__)) and all((out.parent/x).exists() for x in m['files']):return m
 out.parent.mkdir(parents=True,exist_ok=True);asset.mkdir(parents=True,exist_ok=True)
 with warnings.catch_warnings(record=True) as caught:
  warnings.simplefilter('always');book=openpyxl.load_workbook(p,data_only=False);cache=openpyxl.load_workbook(p,data_only=True)
 notices=sorted(set(str(w.message) for w in caught))
 raw=[];excluded=[]
 with zipfile.ZipFile(p) as z:
  for name in z.namelist():
   # Keep XML, including unsupported validation extensions and VML/comment
   # geometry. Branding media on Copyright sheets are deliberately omitted.
   if name.endswith(('.xml','.rels','.vml')):
    target=asset/'ooxml'/name;target.parent.mkdir(parents=True,exist_ok=True);target.write_bytes(z.read(name));raw.append(str(target.relative_to(out.parent)))
   elif name.startswith('xl/media/'):excluded.append(name)
 document={'source':str(rel),'source_sha256':sha(p),'cached_results':'Original workbook cache; NOT recalculated','sheets':[]}
 lines=[f'# {p.stem}',f'\nSource: [{p.name}](<{quote("../"+p.name)}>)',f'\nSHA-256: `{sha(p)}`',
 '\nConverted 25 September 2026 with openpyxl '+openpyxl.__version__+'. Original unchanged.',
 '\nFormula results below are cached values saved by the source author, not independently recalculated answers.',
 f'\n[Styled workbook preview](<{quote("assets/"+p.stem+"/workbook.html")}>) · [Full cell/formula/cache JSON](<{quote("assets/"+p.stem+"/cells.json")}>)',
 '\nThe preview preserves direct cell fills (including Gantt bars), text, basic borders and merged cells. It is not Excel: theme/tint colours, exact number formats, printing, interactions and formula recalculation are not reproduced. Original styles/theme, worksheet XML, validations and drawings are retained under the linked asset folder. No chart objects or conditional formatting were found in these five workbooks.',
 '\nCSV exports preserve the sheet rectangle and blank cells: `formulas.csv` contains original formulas/literals; `values.csv` contains cached results/literals. They are data exports; do not treat formulas as newly calculated.',
 '\nGantt summaries below list active task rows. Full cells, unused template rows and formulas remain in the linked exports. Copyright sheets are retained in data exports but omitted from the reading view.']
 views=['<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>'+html.escape(p.stem)+'</title><style>body{font:14px system-ui;margin:20px;color:#222}table{border-collapse:collapse}td,th{border:1px solid #bbb;padding:3px;white-space:pre-wrap;min-width:35px;max-width:280px;vertical-align:top}th{background:#eee}.scroll{overflow:auto;max-height:80vh}h1{font-size:22px}.formula{outline:1px dotted #999}caption{text-align:left;font-weight:bold}details{margin:15px 0}</style>',
 '<h1>'+html.escape(p.stem)+'</h1><p>Read-only source preview. Formula results are saved caches, not recalculated. Gantt cells retain direct fills; dates use ISO format. Formula text is available in each cell tooltip and the linked JSON/CSV. Theme colours and complex number formats are not reproduced. No charts or conditional formatting in these sources.</p>']
 formula_total=0
 for n,s in enumerate(book,1):
  slug=f'{n:02}-'+re.sub(r'[^\w-]+','-',s.title).strip('-');vs=cache[s.title];cells=[];formulas=[]
  for row in s:
   for c in row:
    if c.value is not None or c.has_style:
     item={'address':c.coordinate,'value':value(c.value),'type':c.data_type,'style_id':c.style_id,'number_format':c.number_format}
     if c.data_type=='f':item['formula']=c.value;item['cached']=value(vs[c.coordinate].value);formulas.append(item)
     cells.append(item)
  formula_total+=len(formulas)
  sheet={'name':s.title,'rows':s.max_row,'columns':s.max_column,'state':s.sheet_state,'cells':cells,'merged_ranges':[str(x) for x in s.merged_cells.ranges],'native_charts':len(s._charts),'conditional_formatting_ranges':len(s.conditional_formatting)}
  document['sheets'].append(sheet)
  for kind,ws in [('formulas',s),('values',vs)]:
   with (asset/f'{slug}-{kind}.csv').open('w',newline='') as f:
    w=csv.writer(f);w.writerows([[value(c.value) for c in row] for row in ws])
  lines += [f'\n## {s.title}',f'\n{s.max_row} rows × {s.max_column} columns; {sum(c.value is not None for row in s for c in row)} populated cells; {len(formulas)} formulas; {len(s._charts)} charts.',
   f'\n[Formula/literal CSV](<{quote("assets/"+p.stem+"/"+slug+"-formulas.csv")}>) · [Cached-value CSV](<{quote("assets/"+p.stem+"/"+slug+"-values.csv")}>)']
  if s.title.lower()=='copyright':continue
  if s.title.lower() in ('gantt','gannt'):
   lines+=['\n| Row | Task | Notes | Staff | Cached total hours | Scheduled cells / hours |','| --- | --- | --- | --- | --- | --- |']
   for row in range(6,s.max_row+1):
    if not any(s.cell(row,c).value is not None for c in (1,2,3)):continue
    schedule=', '.join(f'{get_column_letter(c)}={txt(vs.cell(row,c).value)}' for c in range(5,s.max_column+1) if vs.cell(row,c).value not in (None,0,''))
    lines.append('| '+' | '.join(md(x) for x in [row,s.cell(row,1).value,s.cell(row,2).value,s.cell(row,3).value,vs.cell(row,4).value,schedule])+' |')
  else:
   lines+=['\n| Cell | Literal or formula | Cached formula result |','| --- | --- | --- |']
   for c in cells:
    if c['value'] is not None:lines.append(f'| {c["address"]} | {md(c["value"])} | {md(c.get("cached"))} |')
  views.append('<details open><summary>'+html.escape(s.title)+'</summary><div class="scroll" tabindex="0"><table><caption>'+html.escape(s.title)+'</caption><tr><th scope="col">Row</th>'+''.join('<th scope="col">'+get_column_letter(c)+'</th>' for c in range(1,s.max_column+1))+'</tr>')
  merged={};covered=set()
  for rng in s.merged_cells.ranges:
   merged[(rng.min_row,rng.min_col)]=(rng.max_row-rng.min_row+1,rng.max_col-rng.min_col+1)
   covered.update((r,c) for r in range(rng.min_row,rng.max_row+1) for c in range(rng.min_col,rng.max_col+1) if (r,c)!=(rng.min_row,rng.min_col))
  for row in s:
   views.append('<tr><th scope="row">'+str(row[0].row)+'</th>')
   for c in row:
    if (c.row,c.column) in covered:continue
    css=[]
    if c.fill.patternType=='solid' and colour(c.fill.fgColor):css.append('background:'+colour(c.fill.fgColor))
    if colour(c.font.color):css.append('color:'+colour(c.font.color))
    if c.font.bold:css.append('font-weight:bold')
    if c.font.italic:css.append('font-style:italic')
    span=merged.get((c.row,c.column),(1,1));v=vs[c.coordinate].value
    views.append(f'<td rowspan="{span[0]}" colspan="{span[1]}" style="{";".join(css)}" title="{html.escape(c.coordinate+": "+txt(c.value),quote=True)}" class="{"formula" if c.data_type=="f" else ""}">'+html.escape(txt(v))+'</td>')
   views.append('</tr>')
  views.append('</table></div></details>')
 views.append('</html>');(asset/'workbook.html').write_text(''.join(views));(asset/'cells.json').write_text(json.dumps(document,ensure_ascii=False,indent=2)+'\n');out.write_text('\n'.join(lines)+'\n')
 # Reopen JSON and independently compare each formula/cached result to source.
 reopened=json.loads((asset/'cells.json').read_text());assert sum(sum(c['type']=='f' for c in s['cells']) for s in reopened['sheets'])==formula_total
 for sheet in reopened['sheets']:
  for c in sheet['cells']:
   original=book[sheet['name']][c['address']]
   assert c['value']==value(original.value)
   if c['type']=='f':assert c['cached']==value(cache[sheet['name']][c['address']].value)
 files=[str(out.relative_to(out.parent))]+[str(f.relative_to(out.parent)) for f in asset.rglob('*') if f.is_file()]
 meta={'source':str(rel),'source_sha256':sha(p),'converter_sha256':sha(Path(__file__)),'output':str(out.relative_to(STAGE)),'sheets':len(book.sheetnames),'formulas':formula_total,'charts':sum(len(s._charts) for s in book),'warnings':notices,'excluded_branding_media':excluded,'files':files,'checks':['all exported literals/formulas/cached results match source cells','all formulas counted','source opened read-only; no recalculation','worksheet/style/drawing XML retained including unsupported extensions']}
 side.write_text(json.dumps(meta,indent=2)+'\n');assert sha(p)==document['source_sha256'];return meta

if __name__=='__main__':
 parser=argparse.ArgumentParser();parser.add_argument('--publish',action='store_true');args=parser.parse_args();records=[]
 for p in sorted(SOURCE.rglob('*.xlsx')):
  if 'md' in p.relative_to(SOURCE).parts or not any(t in str(p).lower() for t in ('esp','exemplification')):continue
  m=convert(p);records.append(m)
  if args.publish:
   out=STAGE/m['output'];side=out.with_suffix('.workbook.json')
   for f in [out.parent/x for x in m['files']]+[side]:
    dest=SOURCE/f.relative_to(STAGE);assert 'md' in dest.relative_to(SOURCE).parts
    dest.parent.mkdir(parents=True,exist_ok=True)
    if not dest.exists() or sha(dest)!=sha(f):shutil.copy2(f,dest)
    assert sha(dest)==sha(f)
 (ROOT/'references/esp/workbook-manifest.json').write_text(json.dumps({'published':args.publish,'workbooks':records},indent=2)+'\n')
 print(json.dumps({'workbooks':len(records),'sheets':sum(m['sheets'] for m in records),'formulas':sum(m['formulas'] for m in records),'charts':sum(m['charts'] for m in records),'published':args.publish}))
