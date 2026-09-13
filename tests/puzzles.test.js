import test from 'node:test';
import assert from 'node:assert/strict';
import {banks,resolve,choose} from '../js/bank.js';
import {markPuzzle,orderRule,switchRule,pathError,transformCell} from '../js/puzzle-rules.js';
import {markQuestion} from '../js/marking.js';

function permutations(items){return items.length?items.flatMap((item,i)=>permutations(items.filter((_,j)=>j!==i)).map(rest=>[item,...rest])):[[]];}
test('new puzzle questions have unique logic solutions for every variation',()=>{
  for(const q of banks[0].filter(q=>q.focus==='logic'))for(const v of q.variations){
    const p=v.parts[0],expected=JSON.parse(p.answer);
    let valid=[];
    if(p.kind==='order')valid=permutations([0,1,2,3]).filter(order=>p.rules.every(r=>orderRule(order,r)));
    if(p.kind==='matching'){
      // Independently apply the two authored clues and the one-device-per-person rule.
      valid=permutations([0,1,2]).filter(a=>v.clues[0]===`${p.items[0]} uses the ${p.choices[a[0]].toLowerCase()}.` && !v.clues[1].includes(p.choices[a[1]].toLowerCase()));
    }
    if(p.kind==='switches')valid=Array.from({length:16},(_,mask)=>[0,1,2,3].filter(i=>mask&(1<<i))).filter(on=>p.rules.every(r=>switchRule(on,r)));
    assert.equal(valid.length,1,`${q.title}: ${v.clues}`);
    assert.deepEqual([...valid[0]].sort(),[...expected].sort());
  }
});
test('shape solutions satisfy independent reflection, rotation and mask rules',()=>{
  for(const q of banks[0].filter(q=>q.focus==='shapes'))for(const v of q.variations){
    const p=v.parts[0],answer=JSON.parse(p.answer),source=p.references[0].cells;let expected;
    if(q.slot===9)expected=source.map(c=>Math.floor(c/5)*5+4-c%5);
    if(q.slot===10)expected=source.map(c=>(c%5)*5+4-Math.floor(c/5));
    if(q.slot===11)expected=Array.from({length:25},(_,c)=>c).filter(c=>source.includes(c)!==p.references[1].cells.includes(c));
    assert.deepEqual([...answer].sort((a,b)=>a-b),expected.sort((a,b)=>a-b));
    assert.equal(markPuzzle(p,JSON.stringify([...answer].reverse())).earned,3,'Selection order must not matter');
    assert.equal(markPuzzle(p,JSON.stringify([...answer,answer[0]])).earned,0,'Duplicate cells must not earn points');
    assert.equal(markPuzzle(p,JSON.stringify(answer.slice(1))).earned,0);
  }
});
test('path puzzles accept every legal alternative, not just the stored example',()=>{
  let alternatives=0;
  for(const q of banks[0].filter(q=>q.focus==='paths'))for(const v of q.variations){
    const p=v.parts[0],r=p.rules,paths=[];
    function walk(route){
      if(route.length===7){
        if(route.at(-1)!==r.end)return;
        if(r.checkpoint!==undefined&&!route.includes(r.checkpoint))return;
        const headings=route.slice(1).map((c,i)=>c-route[i]);
        const bends=headings.slice(1).filter((h,i)=>h!==headings[i]).length;
        if(r.turns!==undefined&&bends!==r.turns)return;
        paths.push(route);return;
      }
      const last=route.at(-1),row=Math.floor(last/4),col=last%4;
      for(const [dr,dc] of [[1,0],[-1,0],[0,1],[0,-1]]){
        const nr=row+dr,nc=col+dc,next=nr*4+nc;
        if(nr>=0&&nr<4&&nc>=0&&nc<4&&!route.includes(next)&&!r.blocked.includes(next))walk([...route,next]);
      }
    }
    walk([r.start]);assert.ok(paths.length>0);
    for(const path of paths){assert.equal(markPuzzle(p,JSON.stringify(path)).earned,3);if(JSON.stringify(path)!==p.answer)alternatives++;}
    assert.ok(pathError([r.start,r.end],r));
    assert.ok(pathError([r.start,r.start,r.end],r));
    assert.ok(pathError([r.start,99,r.end],r));
    assert.equal(markPuzzle(p,'invalid').earned,0);
  }
  assert.ok(alternatives>5);
});
test('interactive inputs reject malformed data and reused matching devices',()=>{
  for(const q of banks[0].filter(q=>q.slot>=6))for(const raw of ['hello','{}','[null]','["0"]'])assert.equal(markQuestion(q.variations[0],{'0':raw})[0].earned,0);
  const p=banks[0].find(q=>q.slot===7).variations[0].parts[0];assert.equal(markPuzzle(p,'[0,0,0]').earned,0);
});
test('bank extension preserves previous public codes and limits new coordinates',()=>{
  assert.deepEqual(resolve('AgAAAR_4').entries,[{slot:0,variation:0},{slot:1,variation:0}]);
  assert.equal(resolve('AoAAAQAQ').total,15);assert.equal(resolve('AwAAAR_4').total,12);
  for(const q of banks[0].filter(q=>q.slot>=6))for(let variation=0;variation<5;variation++)assert.equal(resolve({version:1,type:0,entries:[{slot:q.slot,variation}],minutes:null}).total,q.slot>=15?4:3);
  assert.equal(transformCell(1,4,1),7);
});

test('spatial selection uses only multi-step challenges; previous codes still resolve',()=>{
  for(let i=0;i<30;i++)assert.ok(choose(0,'spatial').entries.every(e=>e.slot>=15));
  assert.equal(resolve('PZ-1-3-0').questions[0].title,'Rotate the signal');
});

test('compound and reverse transformation answers are independently verified',()=>{
  for(const q of banks[0].filter(q=>q.slot===15||q.slot===16))for(const v of q.variations){
    const p=v.parts[0];
    if(q.slot===15){
      const {r,c}=v.board;
      const rotated=[c,6-r],reflected=[6-rotated[0],rotated[1]],moved=[reflected[0],reflected[1]+1];
      assert.equal(p.answer,moved.join(','));
      assert.equal(v.parts[1].answer,String(Math.abs(moved[0]-r)+Math.abs(moved[1]-c)));
    }else{
      let [r,c]=p.answer.split(',').map(Number);
      c=6-c;[r,c]=[c,6-r];r-=1;
      assert.deepEqual([r,c],[v.board.r,v.board.c]);
    }
  }
});

test('robot routes obey wall stops, board edges and orientation changes',()=>{
  const q=banks[0].find(q=>q.slot===17);
  const directions=[[0,1],[1,0],[0,-1],[-1,0]];
  q.variations.forEach((v,i)=>{
    let r=v.board.r-1,c=v.board.c-1,d=[0,1,2,3,2][i],moves=0;
    const turn=i===4?-1:1;
    for(const action of [3,'first',3,'second',2]){
      if(typeof action==='string'){d=(d+(action==='first'?turn:-turn)+4)%4;continue;}
      for(let step=0;step<action;step++){
        const nr=r+directions[d][0],nc=c+directions[d][1];
        if(nr<0||nr>=5||nc<0||nc>=5||v.board.blocked.includes(nr*5+nc))break;
        r=nr;c=nc;moves++;
      }
    }
    assert.equal(v.parts[0].answer,`${r+1},${c+1}`);assert.equal(v.parts[1].answer,String(moves));
  });
});
