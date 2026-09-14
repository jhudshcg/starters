"""Build deterministic puzzle instances. Run from the repository root.
The generated bank is served directly; no Python or solver runs in the browser.
"""
import itertools as it,json,math,random,pathlib
ROOT=pathlib.Path(__file__).resolve().parents[1]
bank=[]
def question(slot,focus,title,kind,make,hint):
 variations=[]
 for v in range(5):
  data=make(random.Random(7000+slot*101+v*7919))
  variations.append({'prompt':data.pop('prompt'),'hint':hint,'parts':[{'id':'0','prompt':'Solve the puzzle.','kind':kind,'marks':3,'answer':json.dumps(data.pop('solution')),'explanation':data.pop('explanation'),'solutionText':data.pop('solutionText','See the completed board below.'),**data}]})
 bank.append({'slot':slot,'focus':focus,'title':title,'format':'Reasoning puzzle','tags':[],'setSize':1,'estimatedMinutes':10,'variations':variations})
def logic_holds(clue,assign):
 op,c,r,a,b=clue
 if op=='eq':return assign[c][r]==a
 if op=='ne':return assign[c][r]!=a
 if op=='diff':return assign[c][r]-assign[c][a]==b
 if op=='before':return assign[c][r]<assign[c][a]
 if op=='link':return (assign[c][r]==a)==(assign[b[0]][r]==b[1])
 if op=='either':return (assign[c][r]==a)+(assign[b[0]][r]==b[1])==1
 raise ValueError(op)
def logic(rng,k):
 n=4;perms=list(it.permutations(range(n)));sol=[rng.choice(perms) for _ in range(k)]
 names=['Alex','Blair','Casey','Drew'];cats=[{'name':'Start time','values':['09:00','10:00','11:00','12:00']},{'name':'Task','values':['Backup','Deploy','Audit','Support']},{'name':'Device','values':['Laptop','Server','Tablet','Desktop']}][:k]
 candidates=[]
 for c in range(k):
  for r in range(n):
   for a in range(n):
    if sol[c][r]!=a:candidates.append(['ne',c,r,a,0])
   if c==0:
    for a in range(n):
     if r!=a:
      candidates.append(['diff',c,r,a,sol[c][r]-sol[c][a]])
      if sol[c][r]<sol[c][a]:candidates.append(['before',c,r,a,0])
   for d in range(k):
    if c==d:continue
    for a in range(n):
     for b in range(n):
      clue=['either',c,r,a,[d,b]]
      if logic_holds(clue,sol):candidates.append(clue)
 rng.shuffle(candidates)
 solutions=list(it.product(perms,repeat=k));clues=[]
 # Prefer clues that leave several deductions, not a table of direct assignments.
 for clue in candidates:
  kept=[s for s in solutions if logic_holds(clue,s)]
  if len(kept)==len(solutions):continue
  clues.append(clue);solutions=kept
  if len(solutions)==1:break
 assert len(solutions)==1
 # Remove redundant clues; retain a reproducible independent enumeration result.
 for clue in clues[:]:
  other=[c for c in clues if c is not clue]
  count=0
  for a in it.product(perms,repeat=k):
   if all(logic_holds(c,a) for c in other):count+=1
   if count==2:break
  if count==1:clues.remove(clue)
 def statement(x):
  op,c,r,a,b=x;person=names[r];val=cats[c]['values']
  if op=='ne':return f'{person} is not assigned {val[a]}.'
  if op=='diff':return f'{person} starts {abs(b)} hour'+('s' if abs(b)!=1 else '')+f' {"after" if b>0 else "before"} {names[a]}.'
  if op=='before':return f'{person} starts earlier than {names[a]}.'
  if op=='either':
   def fact(category,value):
    return f'{person} starts at {cats[category]["values"][value]}' if category==0 else f'{person} works on {cats[category]["values"][value]}' if category==1 else f'{person} uses the {cats[category]["values"][value].lower()}'
   return f'Exactly one is true: {fact(c,a)}; {fact(b[0],b[1])}.'
 return {'prompt':'Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.','names':names,'categories':cats,'clues':[statement(c) for c in clues],'rules':clues,'solution':[list(x) for x in sol],'explanation':'Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.','validation':{'solutionCount':1,'method':'enumeration'}}
def equation_holds(c,a):
 op,i,j,target=c;x,y=a[i],a[j]
 return {'sum':lambda:x+y==target,'product':lambda:x*y==target,'difference':lambda:x-y==target,'less':lambda:x<y}[op]()
def equations(rng,n):
 solution=list(range(1,n+1));rng.shuffle(solution);candidates=[]
 for i in range(n):
  for j in range(i+1,n):
   for op,t in [('sum',solution[i]+solution[j]),('product',solution[i]*solution[j]),('difference',solution[i]-solution[j])]:candidates.append([op,i,j,t])
   if solution[i]<solution[j]:candidates.append(['less',i,j,0])
 rng.shuffle(candidates);pool=list(it.permutations(range(1,n+1)));rules=[]
 for c in candidates:
  kept=[a for a in pool if equation_holds(c,a)]
  if len(kept)==len(pool):continue
  rules.append(c);pool=kept
  if len(pool)==1:break
 assert len(pool)==1
 symbols={'sum':'+','product':'×','difference':'−','less':'<'}
 clues=[f'{chr(65+i)} {symbols[op]} {chr(65+j)}'+('' if op=='less' else f' = {t}') for op,i,j,t in rules]
 return {'prompt':f'Assign the integers 1 to {n} to the variables, using each once. All equations and inequalities must hold. × means multiplication.','names':[chr(65+i) for i in range(n)],'categories':[{'name':'Value','values':[str(i) for i in range(1,n+1)]}],'clues':clues,'rules':rules,'solution':[[v-1 for v in solution]],'explanation':'Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.','validation':{'solutionCount':1,'method':'permutation enumeration'}}
def sudoku_solve(board,limit=2):
 a=board[:];solutions=[]
 def solve():
  if len(solutions)>=limit:return
  best=None;possible=None
  for i,x in enumerate(a):
   if x:continue
   r,c=divmod(i,9);used=set(a[r*9:r*9+9])|{a[j*9+c] for j in range(9)}|{a[y*9+x] for y in range(r//3*3,r//3*3+3) for x in range(c//3*3,c//3*3+3)}
   vals=set(range(1,10))-used
   if not vals:return
   if possible is None or len(vals)<len(possible):best,possible=i,vals
  if best is None:solutions.append(a[:]);return
  for v in possible:
   a[best]=v;solve();a[best]=0
   if len(solutions)>=limit:return
 solve();return solutions

def human_singles(board):
 a=board[:];tech=set();steps=0;trace=[]
 groups=[[r*9+c for c in range(9)] for r in range(9)]+[[r*9+c for r in range(9)] for c in range(9)]+[[r*9+c for r in range(br,br+3) for c in range(bc,bc+3)] for br in [0,3,6] for bc in [0,3,6]]
 while 0 in a:
  cand={i:set(range(1,10))-set(v for g in groups if i in g for j in g for v in [a[j]]) for i,v in enumerate(a) if not v}
  singles=[(i,next(iter(v))) for i,v in cand.items() if len(v)==1]
  if singles:i,v=singles[0];tech.add('naked single');technique='naked single'
  else:
   hidden=[]
   for g in groups:
    for v in range(1,10):
     cells=[i for i in g if i in cand and v in cand[i]]
     if len(cells)==1:hidden.append((cells[0],v))
   if not hidden:return False,sorted(tech),steps,trace
   i,v=hidden[0];tech.add('hidden single');technique='hidden single'
  a[i]=v;steps+=1;trace.append({'cell':i,'value':v,'technique':technique})
 return True,sorted(tech),steps,trace

def sudoku(rng):
 # Uniqueness is checked after removing each given. Require a human-solvable route.
 for attempt in range(20):
  rows=[b*3+r for b in rng.sample(range(3),3) for r in rng.sample(range(3),3)]
  cols=[b*3+c for b in rng.sample(range(3),3) for c in rng.sample(range(3),3)]
  digits=rng.sample(range(1,10),9)
  solution=[digits[(r*3+r//3+c)%9] for r in rows for c in cols];givens=solution[:]
  for i in rng.sample(range(81),81):
   old=givens[i];givens[i]=0
   if len(sudoku_solve(givens))!=1:givens[i]=old
   if sum(v!=0 for v in givens)<=30:break
  complete,tech,steps,trace=human_singles(givens)
  if complete and 'hidden single' in tech:break
 assert complete
 return {'prompt':'Fill the grid with 1–9. Each row, column and 3×3 box must contain every digit once. Use pencil notes to record candidates.','size':9,'givens':givens,'solution':solution,'explanation':'The completed grid preserves the givens and contains 1–9 exactly once in each row, column and box. Look for a digit with only one possible cell in a unit as well as cells with one candidate.','validation':{'solutionCount':1,'method':'independent backtracking','techniques':tech,'deductionSteps':steps,'deductionTrace':trace}}

def cover_path(rng,size):
 def near(c):
  r,col=divmod(c,size)
  return [y*size+x for y,x in [(r-1,col),(r+1,col),(r,col-1),(r,col+1)] if 0<=y<size and 0<=x<size]
 length=size*size-7
 for attempt in range(200):
  path=[rng.randrange(size*size)]
  while len(path)<length:
   options=[c for c in near(path[-1]) if c not in path]
   if not options:break
   path.append(rng.choice(options))
  if len(path)==length:break
 assert len(path)==length
 return {'prompt':'Choose any open dot to start. Draw one continuous route visiting every dot exactly once. Move horizontally or vertically; blocked positions cannot be visited. Do not retrace or cross the route.','size':size,'blocked':[c for c in range(size*size) if c not in path],'solution':path,'explanation':'This is one complete route. Other routes earn full credit if they visit every available dot exactly once and obey the adjacency rules.','validation':{'method':'complete witness route','requiredCells':length}}

# Convex shapes on an integer lattice. Geometry is checked again in JavaScript.
SHAPES=[[[0,0],[2,0],[0,2]],[[0,0],[2,0],[0,2]],[[0,0],[2,0],[1,1]],[[0,0],[1,0],[1,1],[0,1]],[[0,0],[1,0],[2,1],[1,1]],[[0,0],[1,0],[0,1]],[[0,0],[1,0],[0,1]]]
def transform(poly,x,y,rot,flip=False):
 out=[]
 for a,b in poly:
  if flip:a=-a
  for _ in range(rot%4):a,b=-b,a
  out.append([a+x,b+y])
 return out
def inside(point,poly):
 x,y=point;sign=[]
 for a,b in zip(poly,poly[1:]+poly[:1]):sign.append((b[0]-a[0])*(y-a[1])-(b[1]-a[1])*(x-a[0]))
 return all(v>=-1e-9 for v in sign) or all(v<=1e-9 for v in sign)
def atoms(poly):
 return {(x,y,d) for x in range(math.floor(min(p[0] for p in poly)),math.ceil(max(p[0] for p in poly))) for y in range(math.floor(min(p[1] for p in poly)),math.ceil(max(p[1] for p in poly))) for d,(dx,dy) in enumerate([(.5,1/6),(5/6,.5),(.5,5/6),(1/6,.5)]) if inside((x+dx,y+dy),poly)}
def connected(poly,others):
 for a,b in zip(poly,poly[1:]+poly[:1]):
  for other in others:
   for c,d in zip(other,other[1:]+other[:1]):
    cross=lambda p:(b[0]-a[0])*(p[1]-a[1])-(b[1]-a[1])*(p[0]-a[0])
    if abs(cross(c))<1e-8 and abs(cross(d))<1e-8:
     axis=0 if a[0]!=b[0] else 1
     if min(max(a[axis],b[axis]),max(c[axis],d[axis]))>max(min(a[axis],b[axis]),min(c[axis],d[axis])):return True
 return False
def tangram(rng):
 placed=[];filled=set();vertices=set();polygons=[]
 for index,shape in enumerate(SHAPES):
  choices=[]
  for rot in range(4):
   for flip in ([False,True] if index==4 else [False]):
    for x in range(-3,5):
     for y in range(-3,5):
      poly=transform(shape,x,y,rot,flip);cells=atoms(poly)
      if filled&cells:continue
      if placed:
       # Require a shared edge segment, not just a point contact.
       if not connected(poly,polygons):continue
      union=vertices|{tuple(v) for v in poly};width=max(v[0] for v in union)-min(v[0] for v in union);height=max(v[1] for v in union)-min(v[1] for v in union)
      if width>7 or height>7:continue
      choices.append((width*height+rng.random()*3,{'x':x,'y':y,'rotation':rot*90,'flipped':flip},poly,cells))
  if not choices:raise ValueError('No tangram placement')
  _,pos,poly,cells=min(choices,key=lambda c:c[0]);placed.append(pos);polygons.append(poly);filled|=cells;vertices|={tuple(v) for v in poly}
 minx=min(x for x,y in vertices);miny=min(y for x,y in vertices)
 for pos in placed:pos['x']+=1-minx;pos['y']+=1-miny
 target=[transform(s,pos['x'],pos['y'],pos['rotation']//90,pos['flipped']) for s,pos in zip(SHAPES,placed)]
 return {'prompt':'Use all seven pieces to cover the silhouette. Pieces may rotate and the parallelogram may flip. No overlaps, gaps or pieces outside the target. Select a piece, then place it on the board; adjust with the controls.','pieces':SHAPES,'target':target,'size':9,'solution':placed,'explanation':'This arrangement covers the target exactly. Other arrangements are accepted if they use every piece once without overlaps, gaps or overhang.','validation':{'method':'exact lattice-area construction','pieceCount':7}}

def cage_ok(c,values,complete):
 op,target=c['op'],c['target'];nums=[values[i] for i in c['cells'] if values[i]]
 if op=='+':return sum(nums)==target if complete else sum(nums)<target
 if op=='×':return math.prod(nums)==target if complete else target%math.prod(nums)==0 and math.prod(nums)<=target
 if not complete:return True
 if op=='−':return abs(nums[0]-nums[1])==target
 if op=='÷':return max(nums)==min(nums)*target
 return nums[0]==target

def latin_solve(cages,n,limit=2):
 a=[0]*(n*n);cellcage={i:c for c in cages for i in c['cells']};solutions=[]
 def options(i):
  r,col=divmod(i,n);used=set(a[r*n:r*n+n])|{a[y*n+col] for y in range(n)};out=[];c=cellcage[i]
  for v in range(1,n+1):
   if v in used:continue
   a[i]=v
   if cage_ok(c,a,all(a[j] for j in c['cells'])):out.append(v)
   a[i]=0
  return out
 def solve():
  if len(solutions)>=limit:return
  empty=[i for i,v in enumerate(a) if not v]
  if not empty:solutions.append(a[:]);return
  i,vals=min(((i,options(i)) for i in empty),key=lambda x:len(x[1]))
  for v in vals:
   a[i]=v;solve();a[i]=0
   if len(solutions)>=limit:return
 solve();return solutions

def cages(rng):
 n=5
 for attempt in range(100):
  rows=rng.sample(range(n),n);cols=rng.sample(range(n),n);digits=rng.sample(range(1,n+1),n)
  solution=[digits[(r+c)%n] for r in rows for c in cols];remaining=set(range(n*n));groups=[]
  while remaining:
   cell=min(remaining);group=[cell];remaining.remove(cell)
   for _ in range(rng.choice([1,1,2])):
    near=[j for j in remaining if any(abs(j//n-i//n)+abs(j%n-i%n)==1 for i in group)]
    if not near:break
    j=rng.choice(near);group.append(j);remaining.remove(j)
   nums=[solution[i] for i in group]
   op=rng.choice(['+','×']) if len(group)>1 else '='
   if len(group)==2 and rng.random()<.4:op='÷' if max(nums)%min(nums)==0 else '−'
   target={'+':lambda:sum(nums),'×':lambda:math.prod(nums),'−':lambda:abs(nums[0]-nums[1]),'÷':lambda:max(nums)//min(nums),'=':lambda:nums[0]}[op]()
   groups.append({'cells':group,'op':op,'target':target})
  solutions=latin_solve(groups,n)
  if len(solutions)==1:break
 assert len(solutions)==1
 return {'prompt':'Enter 1–5 once in each row and column. Each labelled cage must meet its target using the shown operation. For subtraction and division, use the larger value first.','size':n,'givens':[0]*(n*n),'cages':groups,'solution':solution,'explanation':'The completed grid meets every cage target and uses 1–5 exactly once in each row and column. Combine arithmetic possibilities with row and column exclusions.','validation':{'solutionCount':1,'method':'Latin-square constraint solver'}}

if __name__=='__main__':
 for i in range(5):
  print('logic',i,flush=True);question(100+i,'logic grids',['Deployment rota','Support desk','Device allocation','Release team','Incident response'][i],'logic-grid',lambda rng,i=i:logic(rng,2 if i<2 else 3),'Start with time differences or a value excluded from several people. Combine clues with the one-to-one rule.')
  print('equations',i,flush=True);question(105+i,'logic equations',['Products and bounds','Differences and totals','Integer assignment','Mixed constraints','Seven-variable deduction'][i],'equation-grid',lambda rng,i=i:equations(rng,5 if i<2 else 6 if i<4 else 7),'Factor a product or use a large difference to reduce the candidates. Every value is used once.')
  print('sudoku',i,flush=True);question(110+i,'sudoku',f'Sudoku {i+1}','sudoku',sudoku,'Look for a missing digit with only one possible position in a row, column or box.')
  print('path',i,flush=True);question(115+i,'cover paths',['Narrow passages','Avoid isolation','Across the board','Plan the exit','Connected regions'][i],'cover-path',lambda rng:cover_path(rng,6),'Avoid sealing off unvisited dots. Consider which dots have only one possible entrance or exit.')
  print('tangram',i,flush=True);question(120+i,'tangrams',f'Silhouette {i+1}','tiling',tangram,'Plan where the large triangles can fit. Check the angles and spaces remaining for the smaller pieces.')
  print('cages',i,flush=True);question(125+i,'number constraints',f'Arithmetic cages {i+1}','cage-grid',cages,'List possible cage values, then use row and column exclusions to narrow them.')
 for focus in sorted(set(q['focus'] for q in bank)):
  rows=[q for q in bank if q['focus']==focus]
  output='// Generated by scripts/build-puzzles.py; deterministic, solver-checked instances.\nexport default '+json.dumps(rows,ensure_ascii=False,indent=2)+';\n'
  (ROOT/'data/puzzles'/((focus.replace(' ','-'))+'.js')).write_text(output)
 print('Wrote',len(bank),'templates and',sum(len(q['variations']) for q in bank),'variations',flush=True)
