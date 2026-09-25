#!/usr/bin/env python3
"""Check staged conversion provenance/links/page coverage; publish only owned outputs."""
import argparse, ast, hashlib, importlib.util, json, re, shutil
from pathlib import Path
from urllib.parse import unquote
ROOT=Path(__file__).resolve().parents[1]
SOURCE=ROOT.parent/'agents'
STAGE=Path('/private/tmp/starters-esp-conversions')
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
spec=importlib.util.spec_from_file_location('converter',ROOT/'scripts/convert-esp-resources.py')
mod=importlib.util.module_from_spec(spec);spec.loader.exec_module(mod)

def main(publish=False):
 records=[];outputs={};failures=[]
 for src in mod.sources():
  rel=src.relative_to(SOURCE);out=STAGE/rel.parent/'md'/f'{src.stem}.md';side=out.with_suffix('.conversion.json')
  if not out.exists() or not side.exists():
   cached=src.parent/'md'/out.name; cached_side=cached.with_suffix('.conversion.json')
   if cached.exists() and cached_side.exists():
    cm=json.loads(cached_side.read_text())
    if cm.get('source_sha256')==sha(src) and cm.get('converter_sha256')==sha(ROOT/'scripts/convert-esp-resources.py') and cm.get('output_sha256')==sha(cached):
     out.parent.mkdir(parents=True,exist_ok=True)
     shutil.copy2(cached,out);shutil.copy2(cached_side,side)
     for target in re.findall(r'\]\(<([^>]+)>\)',cached.read_text()):
      target=unquote(target)
      if target.startswith('assets/'):
       dest=out.parent/target;dest.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(cached.parent/target,dest)
  if not out.exists() or not side.exists(): failures.append(f'Missing {rel}');continue
  meta=json.loads(side.read_text());text=out.read_text()
  assert meta['source_sha256']==sha(src),f'Source changed: {rel}'
  assert meta['converter_sha256']==sha(ROOT/'scripts/convert-esp-resources.py'),f'Stale converter: {rel}'
  assert meta['output_sha256']==sha(out),f'Unrecorded edit: {out}'
  # One visually verified extraction repair: overlapping invisible/native text on
  # the Grade A contents page. Preserve source spelling everywhere else.
  bad='TTaasbk l1e - o Efx aCmopnlete Sntutdse nt Response (A Grade) 3'
  if src.name=='DSD_ESP_AGrade_GER_V1.0.pdf' and bad in text:
   text=text.replace(bad,'### Table of Contents\n\nTask 1 - Example Student Response (A Grade) 3',1)
   out.write_text(text);meta['editorial_repairs']=['Contents p2: separated overlapping Table of Contents / Task 1 text after visual comparison with original.']
   meta['output_sha256']=sha(out)
  # Variable page numbers prevent repetition matching; these are print IDs,
  # not task content (checked against the live booklets' bottom margins).
  cleaned,n=re.subn(r'^W\d{5}[A-Z]?\s+\d+\s*$', '', text, flags=re.M)
  if n:
   text=cleaned;out.write_text(text)
   meta.setdefault('editorial_repairs',[]).append(f'Removed {n} live-paper print-ID/page-number footer lines.')
   meta['output_sha256']=sha(out)
  pages=re.findall(r'^## Source page (\d+)$',text,re.M)
  if list(map(int,pages))!=list(range(1,len(meta['pages'])+1)):failures.append(f'Page coverage {rel}')
  # PDF 'o' sub-bullet glyphs are deliberately normalised to Markdown '-'.
  for page in meta['pages']:
   section=text.split(f"## Source page {page['page']}\n",1)[1].split('## Source page ',1)[0]
   for flag in list(page['flags']):
    if 'coverage deficit:' in flag:
     counts=ast.literal_eval(flag.split('coverage deficit: ',1)[1].split(';',1)[0])
     if set(counts)=={'o'} and section.count('\n  - ')>=counts['o']:
      page['flags'].remove(flag);page['flags'].append('Alphanumeric difference explained by o-shaped sub-bullets converted to Markdown list markers.')
  deficits=[p['page'] for p in meta['pages'] if any('deficit' in f for f in p['flags'])]
  if deficits:failures.append(f'Character deficits {rel} {deficits}')
  figures=[]
  for target in re.findall(r'\]\(<([^>]+)>\)',text):
   target=unquote(target)
   if target.startswith('assets/'):
    p=out.parent/target
    assert p.exists(),f'Missing figure {p}'
    outputs[p]=SOURCE/p.relative_to(STAGE);figures.append(target)
   elif target.startswith('../'):
    assert (src.parent/'md'/target).resolve()==src.resolve(),f'Unexpected source link {target}'
  # Pandoc emits HTML tables for the DOCX forms, preserving all five fields.
  if src.suffix=='.docx':
   for term in ['Description of test','Expected outcome','Actual outcome','Comments']:
    assert term in text,f'Missing DOCX field {rel}: {term}'
  meta['quality_checks']=['source/converter hashes','sequential PDF page anchors','native alphanumeric retention','linked assets exist','DOCX field labels where applicable']
  meta['review_status']='structural checks passed; visual sampling recorded in conversion register; not word-for-word certified'
  side.write_text(json.dumps(meta,indent=2)+'\n')
  outputs[out]=SOURCE/out.relative_to(STAGE);outputs[side]=SOURCE/side.relative_to(STAGE)
  records.append({**meta,'linked_assets':len(set(figures))})
 assert not failures,'\n'.join(failures)
 if publish:
  # Only adjacent md/ files named in the checked inventory; never source files.
  for origin,dest in outputs.items():
   assert 'md' in dest.relative_to(SOURCE).parts
   if dest.exists() and sha(dest)==sha(origin):continue
   if dest.exists() and dest.suffix=='.md' and 'Faithful extraction, not a summary.' not in dest.read_text():
    raise RuntimeError(f'Refusing to replace non-generated document: {dest}')
   dest.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(origin,dest)
  assert all(sha(src)==sha(dst) for src,dst in outputs.items())
 manifest={'date':'2026-09-25','published':publish,'documents':records,'output_files':len(outputs),'total_pdf_pages':sum(len(r['pages']) for r in records),'assets':sum(r['linked_assets'] for r in records)}
 (ROOT/'references/esp/conversion-manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
 print(json.dumps({k:v for k,v in manifest.items() if k!='documents'}))
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--publish',action='store_true');main(p.parse_args().publish)
