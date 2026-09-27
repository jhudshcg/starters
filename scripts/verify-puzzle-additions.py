"""Independent reference checks of the authored numerical expansion.
Node serialises the served variations; Python recomputes using independent
enumeration, combinations, recurrence and Decimal arithmetic. No student code.
"""
import json,subprocess,pathlib,itertools,math,statistics,shutil
from decimal import Decimal,ROUND_HALF_UP
ROOT=pathlib.Path(__file__).resolve().parents[1]
node=shutil.which('node') or '/opt/homebrew/bin/node'
data=json.loads(subprocess.check_output([node,'--input-type=module','-e',"import seq from './data/puzzles/sequences-beginner.js';import maths from './data/puzzles/maths-applied.js';import hard from './data/puzzles/maths-reasoning-stretch.js';console.log(JSON.stringify({seq,maths,hard}));"],cwd=ROOT))
def check(bank,j,v,expected):
    actual=[Decimal(p['answer']) for p in data[bank][j]['variations'][v]['parts']]
    want=[Decimal(str(x)).quantize(Decimal('.01'),rounding=ROUND_HALF_UP) for x in expected]
    assert actual==want,(bank,j,v,actual,want)
def minimum_containers(items):
    # Enumerate set partitions through subset DP, rather than the authored backtracking.
    n=len(items);dp=[n+1]*(1<<n);dp[0]=0
    for mask in range(1,1<<n):
        subset=mask
        while subset:
            if sum(items[i] for i in range(n) if subset>>i&1)<=10:dp[mask]=min(dp[mask],1+dp[mask^subset])
            subset=(subset-1)&mask
    return dp[-1]
def min_tree(edges):
    best=math.inf
    for links in itertools.combinations(edges,4):
        groups={x:{x} for x in 'ABCDE'}
        for a,b,c in links:
            joined=groups[a]|groups[b]
            for x in joined:groups[x]=joined
        if len(groups['A'])==5:best=min(best,sum(c for a,b,c in links))
    return best
for v in range(5):
    sequences=[]
    for f in range(5):
        start=[10+v,60+v,2*(v+1),128*(v+1),v+2][f];a=[start]
        for k in range(1,8):a.append(a[-1]+v+2 if f==0 else a[-1]-v-2 if f==1 else a[-1]*2 if f==2 else a[-1]/2 if f==3 else [v+2,v+5,v+8][k%3])
        before=[start-v-2,start+v+2,start/2,start*2,v+8][f]
        for m,answers in enumerate([[a[4],a[5]],[a[1],a[3],a[5]],[3+v%3,a[2+v%3]],[sum(a[:3]),sum(a[:4])],[before,a[1]]]):check('seq',f*5+m,v,answers)
    base=Decimal(200+100*v);rate=Decimal(10+5*v)/100;after=base+base*rate;last=after-after*rate
    check('maths',0,v,[after,last,base-last])
    old=120+20*v;rate=Decimal(20+5*v)/100;check('maths',1,v,[old,Decimal(old)*rate])
    readings=[20+2*v]*(v+3)+[30+2*v]*(v+2);check('maths',2,v,[sum(readings),len(readings),Decimal(sum(readings))/len(readings)])
    options=[((7+v)*a+(10+v)*b,4*a+7*b) for a in range(30) for b in range(30) if 4*a+7*b>=17+3*v];check('maths',3,v,min(options))
    stock=400+400*v;remaining=stock*(100-20-5*v)//100;passed=remaining*9//10;check('maths',4,v,[remaining,passed,stock-passed])
    check('maths',5,v,[3,Decimal(4*(20+5*v))/3])
    lead=40+10*v;check('maths',6,v,[lead//2,(lead//2)*(4+v)])
    a=[6,8,9,10,12][v];b=[9,12,15,15,18][v];end=3*math.lcm(a,b);aa=set(range(a,end+1,a));bb=set(range(b,end+1,b));check('maths',7,v,[len(aa&bb),len(aa|bb)])
    counters=list(range(5+2*v));draws=list(itertools.permutations(counters,2));red=lambda x:x<3+v
    check('maths',8,v,[len(draws),sum(red(a) and red(b) for a,b in draws),sum(red(a)!=red(b) for a,b in draws)])
    regions=[3,8-3,6-3,5-3,20+v-8-6+3,18+v-8-5+3,16+v-6-5+3]
    check('maths',9,v,[sum(regions),sum(regions[1:4]),60+3*v-sum(regions)])
    prices=[(a,b) for a in range(30) for b in range(30) if 2*a+b==11+4*v and a+2*b==13+5*v];assert len(prices)==1;check('maths',10,v,prices[0])
    w=12+4*v;check('maths',11,v,[w*5/4,w*10,0])
    w=12+2*v;h=10+2*v;border=1+v%2;inner=sum(1 for x in range(w) for y in range(h) if border<=x<w-border and border<=y<h-border);check('maths',12,v,[inner,w*h-inner])
    size=13+3*v;allocated=next(n for n in range(size,size+9) if n%8==0);check('maths',13,v,[allocated//8*(5+v),(allocated-size)*(5+v)])
    start=Decimal(1000+500*v);rate=Decimal(10+5*v)/100;last=start
    for _ in range(2):last-=last*rate
    check('maths',14,v,[last,start-last])
    a=4+v;b=5+v;events=[n for n in range(1,1000) if n%a==0 and (n-2)%b==0];check('hard',0,v,[events[0],events[1]-events[0],events[1]])
    t=v+4;cover=[0]
    for drops in range(1,t+1):cover.append(cover[-1]+drops)
    check('hard',1,v,[t,t-1,cover[t-1]])
    n=v+4;words=[p for p in itertools.product([0,1],repeat=n) if not any(a==b==1 for a,b in zip(p,p[1:]))];check('hard',2,v,[len(words),sum(p[0]==1 for p in words),sum(sum(p)==2 for p in words)])
    arrangements=set(itertools.permutations('AABB'+'CDEFG'[:v]));adj=sum('AA' in ''.join(p) for p in arrangements);check('hard',3,v,[len(arrangements),adj,len(arrangements)-adj])
    w=4+v;h=3+v%2;routes=list(itertools.combinations(range(w+h),h));through=0
    for up in routes:
        x=y=0
        for step in range(w+h):
            if step in up:y+=1
            else:x+=1
            if (x,y)==(2,1):through+=1;break
    check('hard',4,v,[len(routes),through,len(routes)-through])
    jobs=[7+v,6+v,5+v,4+v,3+v];assignments=itertools.product([0,1],repeat=5);best=min(max(sum(t for t,k in zip(jobs,a) if k==0),sum(t for t,k in zip(jobs,a) if k==1)) for a in assignments);check('hard',5,v,[best,2*best-sum(jobs)])
    items=[[6,6,6,6,4],[7,7,5,5,3,3],[8,8,4,4,2,2],[6,6,5,5,4,4],[9,7,6,4,3,1]][v];count=minimum_containers(items);check('hard',6,v,[count,count*10-sum(items)])
    target=10+2*v;ways=[]
    for size in range(1,target//2+1):
        ways += [c for c in itertools.combinations_with_replacement([2,3,5],size) if sum(c)==target]
    check('hard',7,v,[len(ways),min(map(len,ways))])
    n=5+v;even=[p for p in itertools.product([0,1],repeat=n) if sum(p)%2==0];check('hard',8,v,[len(even),sum(sum(p)==2 for p in even),len(even)-1])
    first=v+2;budget=100+50*v;amount=first;total=0;n=0
    while total<=budget:previous=total;total+=amount;amount*=2;n+=1
    check('hard',9,v,[n,total,budget-previous])
    n=v+4;seatings=list(itertools.permutations(range(1,n)));adj=sum(p[0]==1 or p[-1]==1 for p in seatings);check('hard',10,v,[len(seatings),adj,len(seatings)-adj])
    edges=[('A','B',2+v),('A','C',5+v),('B','C',3+v),('B','D',6+v),('C','D',4+v),('C','E',8+v),('D','E',5+v),('A','E',12+v)];check('hard',11,v,[min_tree(edges),min_tree(edges[1:])])
    digits=[[0,1,2,3,5],[0,1,2,4,5],[0,1,3,4,5],[0,2,3,4,5],[0,1,2,5,6]][v];codes=[100*a+10*b+c for a,b,c in itertools.permutations(digits,3) if a];check('hard',12,v,[len(codes),sum(n%5==0 for n in codes),sum(n%15==0 for n in codes)])
    stock=[1+v%2,3+v,4+v];draws=list(itertools.product(*(range(n+1) for n in stock)));check('hard',13,v,[max(sum(d) for d in draws if sum(n>=3 for n in d)==0)+1,max(sum(d) for d in draws if sum(n>=3 for n in d)<2)+1])
    w=16+2*v;h=12;boxes=[(c*(w-2*c)*(h-2*c),-c) for c in range(1,6)];volume,cut=max(boxes);check('hard',14,v,[-cut,volume])
print('PASS:275 numerical variations independently checked (125 sequences,150 maths).')
