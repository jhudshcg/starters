"""Independent SymPy checks of authored algebra (never student input).

Reads the source prompts and derives their answers separately from the browser
marker. Requires SymPy and Node; no network requests or source downloads.
"""
import json
import re
import shutil
import subprocess
import sympy as s
from sympy.parsing.sympy_parser import parse_expr,standard_transformations,implicit_multiplication_application,convert_xor

node=shutil.which('node') or '/opt/homebrew/bin/node'
rows=json.loads(subprocess.check_output([node,'--input-type=module','-e',"import q from './data/puzzles/maths-practice.js'; console.log(JSON.stringify(q));"],text=True))
x,y=s.symbols('x y')
def parse(text):
    text=text.replace('−','-').replace('×','*').replace('²','^2').replace('³','^3')
    return parse_expr(text,transformations=standard_transformations+(implicit_multiplication_application,convert_xor),local_dict={'x':x,'y':y})
raw_titles={'Collect a single letter','Letters and constants','Multiply letter terms','Collect two letters','Expand a single bracket','Common numerical factor','Common letter factor','Divide an expression','Expand and collect','Product of two brackets','Quadratic factorisation','Index laws with two letters','Expand three brackets'}
count=0
for q in rows:
    for v in q['variations']:
        context=v['prompt']
        for p in v['parts']:
            if p['kind']!='algebra':continue
            title=q['title'];prompt=p['prompt'];context=v['prompt'];expected=None
            if title in raw_titles:expected=parse(re.sub(r'^Simplify\s+','',prompt))
            elif title=='Write an expression':
                n=int(re.search(r'\d+',prompt)[0]);expected=x+n if 'more' in prompt else n*x if 'times' in prompt else x-n
            elif title=='Function machine inputs':
                a,b=map(int,re.findall(r'\d+',context));expected=a*x+b
            elif title=='Rectangle perimeter expression':
                width=int(re.search(r'width (\d+)',context)[1]);expected=2*(x+width)
            elif title.startswith('Rearrange'):
                right=context.split(' = ')[1].rstrip('.');expected=s.solve(s.Eq(y,parse(right)),x)[0]
            elif title=='Compose two functions':
                f,g=context.rstrip('.').split(' and ');f=parse(f.split(' = ')[1]);g=parse(g.split(' = ')[1]);expected=f.subs(x,g) if 'f(g' in prompt else g.subs(x,f)
            elif title=='Line through two points':
                pairs=re.findall(r'\((\d+), (\d+)\)',context);(x1,y1),(x2,y2)=[tuple(map(int,pair)) for pair in pairs];m=s.Rational(y2-y1,x2-x1);expected=m*x+y1-m*x1
            elif title=='Inverse linear function':
                f=parse(context.split(' = ')[1].rstrip('.'));expected=s.solve(s.Eq(y,f),x)[0].subs(y,x)
            elif title=='Differentiate a polynomial':
                expression=context.split('y = ')[1].split(' with respect')[0];expected=s.diff(parse(expression),x)
            assert expected is not None,(title,prompt)
            assert s.expand(parse(p['answer'])-expected)==0,(title,prompt,p['answer'],expected)
            count+=1
        if q['title'] in ['Undo an addition','Undo a multiplication','Two-step linear equations','Unknown on both sides','Equation with a bracket']:
            for p in v['parts']:
                equation=p['prompt'].split('. Find')[0];a,b=map(parse,equation.split(' = '));symbol=next(iter(a.free_symbols|b.free_symbols));expected=s.solve(s.Eq(a,b),symbol)
                assert expected==[s.Rational(p['answer'])],(q['title'],p,expected)
                count+=1
        if q['title']=='Quadratic roots':
            equation=context.removeprefix('Solve ').rstrip('.');a,b=map(parse,equation.split(' = '));expected=sorted(s.solve(s.Eq(a,b),x));assert expected==[s.Rational(p['answer']) for p in v['parts']];count+=2
        if q['title']=='Simultaneous equations':
            equations=context.removeprefix('Solve ').rstrip('.').split(' and ');result=s.solve([parse(a)-parse(b) for a,b in (e.split(' = ') for e in equations)],(x,y));assert [result[x],result[y]]==[s.Rational(p['answer']) for p in v['parts']];count+=2
        if q['title']=='Complete the square':
            expression=parse(context.removeprefix('Write ').split(' as ')[0]);a,b=[s.Rational(p['answer']) for p in v['parts']];assert s.expand((x+a)**2+b-expression)==0;count+=2
        if q['title']=='Polynomial remainder':
            expression=parse(context.split(' = ')[1].rstrip('.'))
            for p in v['parts']:
                divisor=parse(p['prompt'].split('divided by ')[1]);assert s.rem(expression,divisor,x)==s.Rational(p['answer']);count+=1
print(f'Independently derived and checked {count} algebra/formula/equation answer parts with SymPy.')
