import sys, pathlib, json, random,importlib.util
root=pathlib.Path.cwd();spec=importlib.util.spec_from_file_location('b',root/'scripts/build-puzzles.py');b=importlib.util.module_from_spec(spec);spec.loader.exec_module(b)
def read(name):return json.loads((root/f'data/puzzles/{name}.js').read_text().split('export default ',1)[1].strip().removesuffix(';'))
def write(name,bank):(root/f'data/puzzles/{name}.js').write_text('// Deterministic puzzle instances; see scripts/expand-puzzles.py.\nexport default '+json.dumps(bank,ensure_ascii=False,indent=2)+';\n')
bank=read('sudoku')
for q in bank[5:20]:
 p=q['variations'][0]['parts'][0];answer=json.loads(p['answer'])
 for cell in random.Random(q['slot']).sample(range(81),81):
  if sum(bool(v) for v in p['givens'])>=40:break
  p['givens'][cell]=answer[cell]
 complete,tech,steps,trace=b.human_singles(p['givens']);assert complete
 p['validation'].update(techniques=tech,deductionSteps=steps,deductionTrace=trace)
write('sudoku',bank)
# Add one explicit relationship to standard logic grids. Stretch retains irredundant clues.
bank=read('logic-grids')
for q in bank[20:35]:
 p=q['variations'][0]['parts'][0];answer=json.loads(p['answer']);c=1;r=0;a=answer[c][r]
 p['rules'].append(['eq',c,r,a,0]);p['clues'].append(f"{p['names'][r]} is assigned {p['categories'][c]['values'][a]}.")
write('logic-grids',bank)
# Four-by-four cages introduce the controls with fewer interacting candidates.
source=(root/'scripts/build-puzzles.py').read_text();source=source[source.index('def cages(rng):'):source.index("\nif __name__")].replace('n=5','n=4').replace('1–5','1–4');ns=dict(vars(b));exec(source,ns)
bank=read('number-constraints')
for q in bank[5:20]:
 v=q['variations'][0];d=ns['cages'](random.Random(q['slot']));v['prompt']=d.pop('prompt');p=v['parts'][0];p.update(answer=json.dumps(d.pop('solution')),**d)
write('number-constraints',bank)
# Canonical silhouette signature: translation, quarter turns and reflection do not make new puzzles.
def silhouette(p):
 # Four triangle centroids per lattice square, integer-scaled by six.
 cells=set().union(*(b.atoms(poly) for poly in p['target']))
 points={(6*x+[3,5,3,1][d],6*y+[1,3,5,3][d]) for x,y,d in cells};forms=[]
 for flip in [1,-1]:
  current={(flip*x,y) for x,y in points}
  for k in range(4):
   lowx=min(x for x,y in current);lowy=min(y for x,y in current)
   forms.append(tuple(sorted((x-lowx,y-lowy) for x,y in current)));current={(-y,x) for x,y in current}
 return min(forms)
bank=read('tangrams');seen=set();replaced=0
for q in bank:
 for v in q['variations']:
  p=v['parts'][0];sig=silhouette(p)
  if sig in seen and q['slot']>=300:
   rng=random.Random(q['slot']+50000)
   while sig in seen:
    d=b.tangram(rng);sig=silhouette(d)
   v['prompt']=d.pop('prompt');p.update(answer=json.dumps(d.pop('solution')),**d);replaced+=1
  assert sig not in seen;seen.add(sig)
write('tangrams',bank);print('Unique silhouettes',len(seen),'replacements',replaced)
