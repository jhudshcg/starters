"""Append 50 checked boards per geometric/logic family without renumbering.

Deterministic new slots 685–984. Existing boards and variations are preserved.
Run from the repository root; the independent validator checks the saved data.
"""
import importlib.util
import itertools
import json
import pathlib
import random
import sys

ROOT = pathlib.Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('builders', ROOT/'scripts/build-puzzles.py')
b = importlib.util.module_from_spec(spec)
spec.loader.exec_module(b)
SOURCE = (ROOT/'scripts/build-puzzles.py').read_text()

def load(name):
    return json.loads((ROOT/f'data/puzzles/{name}.js').read_text().split('export default ', 1)[1].strip().removesuffix(';'))

def customised(start, end, replacements):
    source = SOURCE[SOURCE.index(start):SOURCE.index(end)]
    for old, new in replacements:
        source = source.replace(old, new)
    namespace = dict(vars(b))
    exec(source, namespace)
    return namespace

def grid_solutions(givens, n, br, bc, limit=2):
    grid = givens[:]
    solutions = []
    def visit():
        if len(solutions) >= limit:
            return
        empty = [i for i, v in enumerate(grid) if not v]
        if not empty:
            solutions.append(grid[:])
            return
        def candidates(i):
            r, c = divmod(i, n)
            used = set(grid[r*n:r*n+n]) | {grid[y*n+c] for y in range(n)}
            used |= {grid[y*n+x] for y in range(r//br*br, r//br*br+br) for x in range(c//bc*bc, c//bc*bc+bc)}
            return set(range(1, n+1)) - used
        cell, values = min(((i, candidates(i)) for i in empty), key=lambda pair:len(pair[1]))
        for value in sorted(values):
            grid[cell] = value
            visit()
            grid[cell] = 0
    visit()
    return solutions

def small_sudoku(rng, n):
    br, bc = 2, n//2
    digits = rng.sample(range(1, n+1), n)
    solution = [digits[(r*bc+r//br+c)%n] for r in range(n) for c in range(n)]
    givens = solution[:]
    for cell in rng.sample(range(n*n), n*n):
        old = givens[cell]
        givens[cell] = 0
        if len(grid_solutions(givens, n, br, bc)) != 1:
            givens[cell] = old
    done,tech,steps,trace=b.human_singles(givens,n,br,bc)
    assert done
    return dict(prompt=f'Fill the grid with 1–{n}. Each row, column and {br}×{bc} box must contain each digit once.',
        size=n,boxRows=br,boxCols=bc,givens=givens,solution=solution,
        explanation=f'Every row, column and {br}×{bc} box contains 1–{n} exactly once.',
        validation=dict(solutionCount=1,method='independent small-grid enumeration',techniques=tech,deductionSteps=steps,deductionTrace=trace))

def path_board(rng, j, level):
    dimensions = {'foundation':[(4,5),(5,4),(4,6)], 'standard':[(5,7),(7,5),(6,6)], 'stretch':[(6,8),(8,6),(7,7)]}
    cols, rows = dimensions[level][j%3]
    shape = ['rectangle','stepped','L shape','central gap','two regions'][j%5]
    allowed = set(range(cols*rows))
    if shape == 'stepped':
        allowed = {i for i in allowed if i%cols >= (i//cols)//3}
    elif shape == 'L shape':
        allowed = {i for i in allowed if i%cols < cols//2 or i//cols >= rows//2}
    elif shape == 'central gap':
        allowed -= {(rows//2)*cols+cols//2}
    elif shape == 'two regions':
        allowed = {i for i in allowed if i%cols != cols//2 or i//cols == rows//2}
    def neighbours(i):
        return [k for k in (i-1,i+1,i-cols,i+cols) if k in allowed and abs(i//cols-k//cols)+abs(i%cols-k%cols)==1]
    # Full Hamiltonian search, bounded. Reject impossible masks rather than
    # deleting arbitrary dots from the intended silhouette.
    for attempt in range(30):
        start = rng.choice(sorted(allowed))
        path = [start]
        unseen = allowed-{start}
        budget = [40000]
        def walk():
            budget[0] -= 1
            if budget[0] <= 0:
                return False
            if not unseen:
                return True
            options = [p for p in neighbours(path[-1]) if p in unseen]
            rng.shuffle(options)
            options.sort(key=lambda p:sum(v in unseen for v in neighbours(p)))
            for cell in options:
                path.append(cell);unseen.remove(cell)
                if walk():
                    return True
                unseen.add(cell);path.pop()
            return False
        if walk():
            break
    else:
        raise ValueError('No path for mask')
    return dict(prompt='Choose any open dot to start. Join every dot once using horizontal or vertical moves. Dark squares are blocked.',
        size=cols,rows=rows,blocked=sorted(set(range(cols*rows))-allowed),solution=path,
        explanation='The route visits every open dot exactly once. Its reverse and any other valid complete route also work.',
        validation=dict(method='Hamiltonian witness with adjacency and coverage checks',shape=shape))

def silhouette(part):
    cells = set().union(*(b.atoms(poly) for poly in part['target']))
    points = {(6*x+[3,5,3,1][d],6*y+[1,3,5,3][d]) for x,y,d in cells}
    forms = []
    for flip in (1,-1):
        current = {(flip*x,y) for x,y in points}
        for _ in range(4):
            x0=min(x for x,y in current);y0=min(y for x,y in current)
            forms.append(tuple(sorted((x-x0,y-y0) for x,y in current)))
            current={(-y,x) for x,y in current}
    return min(forms)

families = [('logic-grids','logic grids','logic-grid'),('logic-equations','logic equations','equation-grid'),
    ('sudoku','sudoku','sudoku'),('cover-paths','cover paths','cover-path'),('tangrams','tangrams','tiling'),('number-constraints','number constraints','cage-grid')]

def run():
    for family,(filename,focus,kind) in enumerate(families):
        if len(sys.argv)>1 and filename not in sys.argv[1:]:continue
        bank=load(filename)
        base=685+50*family
        bank=[q for q in bank if not base<=q['slot']<base+50]
        signatures=set()
        for q in bank:
            for v in q['variations']:
                p=v['parts'][0]
                signatures.add(silhouette(p) if kind=='tiling' else json.dumps({k:p[k] for k in ['size','rows','givens','rules','blocked','cages'] if k in p},sort_keys=True))
        for j in range(50):
            level='foundation' if j<15 else 'standard' if j<35 else 'stretch'
            rng=random.Random(242600+family*10000+j*313)
            for attempt in range(200):
                try:
                    if kind=='logic-grid':
                        # Three-person introductions; two/three category systems
                        # and explicit starting relationships in standard boards.
                        if level=='foundation':
                            ns=customised('def logic(rng,k):','def equation_holds',[
                                ('n=4;','n=3;'),("names=['Alex','Blair','Casey','Drew']", "names=['Alex','Blair','Casey']"),
                                ("'12:00'", "'12:00'"),('][:k]','][:k]'),
                                ('candidates=[]',"cats=[{**c,'values':c['values'][:3]} for c in cats];candidates=[]")])
                            d=ns['logic'](rng,2 if j%2==0 else 3)
                        else:
                            d=b.logic(rng,2 if j%3==0 else 3)
                            if level=='standard':
                                c=1;r=j%4;a=d['solution'][c][r]
                                d['rules'].append(['eq',c,r,a,0]);d['clues'].append(f"{d['names'][r]} is assigned {d['categories'][c]['values'][a]}.")
                    elif kind=='equation-grid':
                        n=4+j%2 if level=='foundation' else 6+j%2 if level=='standard' else 7+j%2
                        # Rotate permitted mixes; all systems are still coupled
                        # and independently enumerated for uniqueness.
                        if j%3==0:
                            ns=customised('def equations(rng,n):','def sudoku_solve',[("('product',solution[i]*solution[j]),",'')])
                            d=ns['equations'](rng,n)
                        else:d=b.equations(rng,n)
                    elif kind=='sudoku':
                        if level=='foundation':d=small_sudoku(rng,4 if j<7 else 6)
                        else:
                            d=b.sudoku(rng)
                            if level=='stretch':
                                for cell in rng.sample(range(81),81):
                                    old=d['givens'][cell];d['givens'][cell]=0
                                    if len(b.sudoku_solve(d['givens']))!=1:d['givens'][cell]=old
                                done,tech,steps,trace=b.human_singles(d['givens'])
                                d['validation'].update(techniques=tech,deductionSteps=steps,deductionTrace=trace,singlesComplete=done)
                    elif kind=='cover-path':
                        # Alternate masks and dimensions; extra blocked cells
                        # below make distinct layouts, rather than rotations.
                        d=path_board(rng,j+attempt,level)
                        if attempt and len(d['solution'])>12:
                            cut=1+attempt%4;d['blocked']+=d['solution'][:cut];d['blocked'].sort();d['solution']=d['solution'][cut:]
                    elif kind=='tiling':
                        ns=customised('def tangram(rng):','def cage_ok',[
                            ('width*height+rng.random()*3', 'width*height+rng.random()*'+str(8+j%5*6))])
                        d=ns['tangram'](rng)
                        level='foundation' if j<30 else 'standard'
                        guide_count=2 if level=='foundation' else 1
                        d['guides']=d['target'][:guide_count]
                        d['prompt']+=' Dashed outlines show possible positions for '+str(guide_count)+' pieces to help you start.'
                    else:
                        n=4 if level=='foundation' else 5 if level=='standard' else 6
                        replacements=[('n=5',f'n={n}'),('1–5',f'1–{n}')]
                        if j%3==0:
                            # Keep cage shapes/uniqueness, but use addition only.
                            replacements += [("rng.choice(['+','×'])", "'+'"),('if len(group)==2 and rng.random()<.4:', 'if False:')]
                        ns=customised('def cages(rng):','\nif __name__',replacements)
                        d=ns['cages'](rng)
                    signature=silhouette(d) if kind=='tiling' else json.dumps({k:d[k] for k in ['size','rows','givens','rules','blocked','cages'] if k in d},sort_keys=True)
                    if signature not in signatures:
                        break
                except (ValueError,AssertionError):
                    continue
            else:raise ValueError(f'Could not make distinct {kind} {j}')
            signatures.add(signature)
            hint={
                'logic-grid':'Combine the one-to-one rule with the most restrictive time or exactly-one clue. Mark exclusions before choosing a match.',
                'equation-grid':'Start with a product with few factor pairs, or a sum near the smallest or largest possible total. Use each integer once.',
                'sudoku':'Look for a row, column or box with only one missing digit. Then check where a particular digit can fit in another unit.',
                'cover-path':'Look for dots with very few neighbours and narrow links between regions. Plan how to reach them without cutting off the rest.',
                'tiling':'Use the dashed guide to place a starting piece. Compare the long edges and inward corners of the remaining silhouette.',
                'cage-grid':'List combinations that meet a small cage target, then eliminate those that would repeat a digit in its row or column.'}[kind]
            if kind=='equation-grid' and not any(c[0]=='product' for c in d['rules']):hint='Start with a sum or difference that has few possible pairs. Use the all-different rule to narrow the remaining values.'
            prompt=d.pop('prompt');solution=d.pop('solution');explanation=d.pop('explanation')
            bank.append(dict(slot=base+j,title=f'{focus.title()} · {j+51}',focus=focus,format='Reasoning puzzle',tags=[f'challenge:{level}'],challengeLevel=level,fixed=True,setSize=3,estimatedMinutes=8,
                variations=[dict(prompt=prompt,hint=hint,parts=[dict(id='0',kind=kind,prompt='Solve the puzzle.',marks=3,answer=json.dumps(solution),explanation=explanation,solutionText='See the completed board below.',**d)])]))
            if j%10==9:print(filename,j+51,flush=True)
        (ROOT/f'data/puzzles/{filename}.js').write_text('// Deterministic instances; see scripts/enrich-puzzles.py.\nexport default '+json.dumps(bank,ensure_ascii=False,indent=2)+';\n')

if __name__=='__main__':
    run()
