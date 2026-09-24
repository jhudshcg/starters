"""Check the actual served instances with independent Python solvers."""
import importlib.util,json,pathlib,itertools
root=pathlib.Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('puzzle_reference',root/'scripts/build-puzzles.py')
reference=importlib.util.module_from_spec(spec);spec.loader.exec_module(reference)
count=0
for filename in ['logic-grids','logic-equations','sudoku','cover-paths','tangrams','number-constraints']:
 text=(root/f'data/puzzles/{filename}.js').read_text()
 bank=json.loads(text.split('export default ',1)[1].strip().removesuffix(';'))
 assert len(bank)>=100
 for q in bank:
  assert len(q['variations'])==(1 if q.get('fixed') else 5)
  for v in q['variations']:
   p=v['parts'][0];answer=json.loads(p['answer']);kind=p['kind']
   if kind=='sudoku':
    n=p['size'];br=p.get('boxRows',3);bc=p.get('boxCols',3)
    solver=lambda grid:reference.sudoku_solve(grid,n=n,box_rows=br,box_cols=bc)
    singles=lambda grid:reference.human_singles(grid,n,br,bc)
    solutions=solver(p['givens']);assert solutions==[answer]
    done,tech,steps,trace=singles(p['givens'])
    if q.get('challengeLevel')!='stretch':assert done
    assert p['validation']['deductionTrace']==trace
   elif kind=='cage-grid':assert reference.latin_solve(p['cages'],p['size'])==[answer]
   elif kind=='logic-grid':
    perms=list(itertools.permutations(range(len(p['names']))))
    valid=[a for a in itertools.product(perms,repeat=len(p['categories'])) if all(reference.logic_holds(c,a) for c in p['rules'])]
    assert len(valid)==1 and [list(row) for row in valid[0]]==answer
   elif kind=='equation-grid':
    valid=[a for a in itertools.permutations(range(1,len(p['names'])+1)) if all(reference.equation_holds(c,a) for c in p['rules'])]
    assert len(valid)==1 and [n-1 for n in valid[0]]==answer[0]
   elif kind=='cover-path':
    n=p['size'];assert set(answer)==set(range(n*p.get('rows',n)))-set(p['blocked']) and len(answer)==len(set(answer))
    assert all(abs(a//n-b//n)+abs(a%n-b%n)==1 for a,b in zip(answer,answer[1:]))
    assert 'start' not in p and 'end' not in p
   elif kind=='tiling':
    filled=set()
    for shape,pos in zip(p['pieces'],answer):
     assert pos['rotation']%90==0
     cells=reference.atoms(reference.transform(shape,pos['x'],pos['y'],pos['rotation']//90,pos['flipped']))
     assert not filled&cells;filled|=cells
    target=set().union(*(reference.atoms(poly) for poly in p['target']))
    assert filled==target and len(filled)==32
   count+=1
print(f'Independently validated {count} served puzzle variations, including Sudoku deduction traces.')
