"""Append25 introductory fixed boards per family at unused slots1024–1173.
Existing boards are never regraded or removed. Deterministic; run selectively
with family file names. Checks are repeated independently by validate-puzzles.py.
"""
import importlib.util,itertools,json,pathlib,random,sys
ROOT=pathlib.Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('enrich',ROOT/'scripts/enrich-puzzles.py')
e=importlib.util.module_from_spec(spec);spec.loader.exec_module(e)
b=e.b

def logic(rng,j):
    # One category rather than two/three simultaneously: four people, four times.
    n=4;solution=rng.sample(range(n),n);names=['Alex','Blair','Casey','Drew']
    cats=[dict(name='Start time',values=['09:00','10:00','11:00','12:00'])]
    row=j%4;rules=[['eq',0,row,solution[row],0]]
    pool=[(p,) for p in itertools.permutations(range(n)) if p[row]==solution[row]]
    candidates=[['ne',0,r,v,0] for r in range(n) for v in range(n) if v!=solution[r]]
    candidates += [['before',0,r,a,0] for r in range(n) for a in range(n) if solution[r]<solution[a]]
    rng.shuffle(candidates)
    for rule in candidates:
        remaining=[a for a in pool if b.logic_holds(rule,a)]
        if len(remaining)==len(pool):continue
        rules.append(rule);pool=remaining
        if len(pool)==1:break
    assert len(pool)==1
    def text(rule):
        op,_,r,a,_=rule
        if op=='eq':return f'{names[r]} starts at {cats[0]["values"][a]}.'
        if op=='ne':return f'{names[r]} does not start at {cats[0]["values"][a]}.'
        return f'{names[r]} starts earlier than {names[a]}.'
    return dict(prompt='Match four people to four start times. Each time is used once. One assignment is supplied; combine the remaining exclusions and ordering clues.',names=names,categories=cats,rules=rules,clues=list(map(text,rules)),solution=[solution],explanation='Use the stated starting assignment, then remove its time from the other rows. Combine exclusions and earlier-than clues with the one-to-one rule.',validation=dict(solutionCount=1,method='enumeration'))

def sudoku(rng,j):
    n=4;digits=rng.sample(range(1,5),4)
    answer=[digits[(r*2+r//2+c)%4] for r in range(4) for c in range(4)]
    givens=answer[:]
    for cell in rng.sample(range(16),4+j%3):givens[cell]=0
    done,tech,steps,trace=b.human_singles(givens,4,2,2)
    if not done or b.sudoku_solve(givens,n=4,box_rows=2,box_cols=2)!=[answer]:raise ValueError('Not a singles introduction')
    return dict(prompt='Fill the empty cells with1–4. Each row, column and2×2 box must contain each digit once. Most cells are already filled.',size=4,boxRows=2,boxCols=2,givens=givens,solution=answer,explanation='Find a missing digit in a nearly complete row, column or box. Repeat as each filled cell removes another possibility.',validation=dict(solutionCount=1,techniques=tech,deductionSteps=steps,deductionTrace=trace))

def path(rng,j):
    cols,rows=[(3,4),(4,3),(4,4)][j%3]
    total=cols*rows;route=[rng.randrange(total)]
    target=min(total-2,8+j%5)
    while len(route)<target:
        last=route[-1];options=[i for i in range(total) if i not in route and abs(i//cols-last//cols)+abs(i%cols-last%cols)==1]
        if not options:raise ValueError('Short walk')
        route.append(rng.choice(options))
    return dict(prompt='Visit each open dot once with horizontal or vertical moves. Choose your own start and finish. Dark squares are blocked.',size=cols,rows=rows,blocked=sorted(set(range(total))-set(route)),solution=route,explanation='Start by examining dots with only one neighbour. Choose a route that leaves all remaining dots reachable; any complete valid route is accepted.',validation=dict(method='checked path witness',openDots=len(route)))

def cages(rng,j):
    ns=e.customised('def cages(rng):','\nif __name__', [('n=5','n=3'),('1–5','1–3'),("rng.choice(['+','×'])","'+'"),('if len(group)==2 and rng.random()<.4:','if False:'),('rng.choice([1,1,2])','1')])
    d=ns['cages'](rng)
    d['prompt']='Use1–3 once in each row and column. A single-cell cage gives its value; a two-cell cage shows their sum.'
    d['explanation']='Use the single-cell values first. For a two-cell sum, subtract a known value from the target, then check row and column exclusions.'
    return d

def make(family,rng,j):
    if family==0:return logic(rng,j)
    if family==1:
        ns=e.customised('def equations(rng,n):','def sudoku_solve',[("('product',solution[i]*solution[j]),",'')])
        d=ns['equations'](rng,3)
        d['explanation']='List the small number pairs that fit a sum or difference. Each integer is used once, so assigning one removes it from the other variables.'
        return d
    if family==2:return sudoku(rng,j)
    if family==3:return path(rng,j)
    if family==4:
        d=b.tangram(rng);d['guides']=d['target'][:4]
        d['prompt']+=' Four dashed piece outlines give starting positions. Fit the remaining pieces into the uncovered spaces.'
        return d
    return cages(rng,j)

for family,(filename,focus,kind) in enumerate(e.families):
    if len(sys.argv)>1 and filename not in sys.argv[1:]:continue
    bank=e.load(filename);base=1024+family*25
    # Idempotent regeneration only of this script's dedicated addresses.
    bank=[q for q in bank if not base<=q['slot']<base+25]
    seen=set()
    for q in bank:
        for v in q['variations']:
            p=v['parts'][0]
            seen.add(e.silhouette(p) if family==4 else json.dumps({k:p[k] for k in ['size','rows','givens','rules','blocked','cages'] if k in p},sort_keys=True))
    for j in range(25):
        rng=random.Random(927000+family*1000+j*17)
        for attempt in range(500):
            try:d=make(family,rng,j)
            except (ValueError,AssertionError):continue
            key=e.silhouette(d) if family==4 else json.dumps({k:d[k] for k in ['size','rows','givens','rules','blocked','cages'] if k in d},sort_keys=True)
            if key not in seen:seen.add(key);break
        else:raise RuntimeError(f'No distinct {filename} {j}')
        prompt=d.pop('prompt').replace('with1','with 1').replace('and2','and 2').replace('Use1','Use 1')
        answer=d.pop('solution');explanation=d.pop('explanation')
        hint=['Start with the supplied match and cross out that time for the other people. Read earlier-than clues as an order, not necessarily consecutive times.','List the allowed pairs for a sum or difference. Use the fact that a value cannot be assigned twice.','Look for a row, column or small box with only one missing digit.','A dot with only one neighbour must be an endpoint. Check these before choosing where to start.','Place the guided shapes first, then compare the edges and angles of the remaining spaces.','Use a single-cell cage first, then subtract its value from a neighbouring sum where possible.'][family]
        bank.append(dict(slot=base+j,focus=focus,title=f'{focus.title()} · Beginner {j+1}',format='Reasoning puzzle',tags=['challenge:beginner'],challengeLevel='beginner',fixed=True,estimatedMinutes=5,reviewStatus='pending',setSize=3,variations=[dict(prompt=prompt,hint=hint,parts=[dict(id='0',prompt='Solve the puzzle.',kind=kind,marks=3,answer=json.dumps(answer),explanation=explanation,solutionText='See the completed board below.',**d)])]))
    (ROOT/f'packages/puzzles/data/{filename}.js').write_text('// Deterministic instances; see build/expand/enrich/add-beginner-puzzles.py.\nexport default '+json.dumps(bank,ensure_ascii=False,indent=2)+';\n')
    print(filename,'25 Beginner boards added',flush=True)
