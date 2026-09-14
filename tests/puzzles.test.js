import test from 'node:test';
import assert from 'node:assert/strict';
import puzzles from '../data/puzzles.js';
import {choose,resolve} from '../js/bank.js';
import {markChallenge,logicRule,equationRule,placedPolygon,intersectionArea,polygonArea} from '../js/challenge-rules.js';
const permutations=a=>a.length?a.flatMap((x,i)=>permutations(a.filter((_,j)=>i!==j)).map(t=>[x,...t])):[[]];
test('each puzzle subtype has five distinct templates and sets contain one puzzle',()=>{
 for(const focus of new Set(puzzles.map(q=>q.focus))){
  const qs=puzzles.filter(q=>q.focus===focus);assert.ok(qs.length>=5);
  const first=choose(0,focus),second=choose(0,focus,first);assert.equal(first.questions.length,1);assert.notEqual(first.entries[0].slot,second.entries[0].slot);
  assert.equal(resolve(first.code).focus,focus);
 }
});
test('all equation assignments have exactly one solution',()=>{
 for(const q of puzzles.filter(q=>q.focus==='logic equations'))for(const v of q.variations){
  const p=v.parts[0],valid=permutations(p.names.map((_,i)=>i+1)).filter(a=>p.rules.every(c=>equationRule(c,a)));
  assert.equal(valid.length,1);assert.deepEqual(valid[0].map(v=>v-1),JSON.parse(p.answer)[0]);
 }
});
test('logic clues uniquely determine each mapping across all categories',()=>{
 const perm=permutations([0,1,2,3]);
 for(const q of puzzles.filter(q=>q.focus==='logic grids'))for(const v of q.variations){
  const p=v.parts[0];let count=0;
  function search(rows){if(rows.length===p.categories.length){if(p.rules.every(c=>logicRule(c,rows)))count++;return;}for(const row of perm)search([...rows,row]);}
  search([]);assert.equal(count,1);assert.ok(p.rules.length>=4);
 }
});
test('every path layout is feasible, with no fixed endpoints; reverse routes also pass',()=>{
 const layouts=new Set();
 for(const q of puzzles.filter(q=>q.focus==='cover paths'))for(const v of q.variations){
  const p=v.parts[0],a=JSON.parse(p.answer);assert.equal(p.start,undefined);assert.equal(p.end,undefined);assert.ok(p.blocked.length>=5);
  assert.equal(markChallenge(p,p.answer).earned,3);assert.equal(markChallenge(p,JSON.stringify(a.toReversed())).earned,3);
  assert.equal(markChallenge(p,JSON.stringify(a.slice(1))).earned,0);
  assert.equal(markChallenge(p,JSON.stringify([...a,a[0]])).earned,0);
  assert.equal(markChallenge(p,JSON.stringify([...a.slice(0,-1),p.blocked[0]])).earned,0);
  layouts.add(p.blocked.join(','));
 }
 assert.ok(layouts.size>=20);
 const p={kind:'cover-path',size:2,blocked:[],marks:3};
 for(const route of [[0,1,3,2],[1,0,2,3],[2,0,1,3]])assert.equal(markChallenge(p,JSON.stringify(route)).earned,3);
});
test('tangram geometry accepts alternate identical-piece assignments and rejects overlap',()=>{
 for(const q of puzzles.filter(q=>q.focus==='tangrams'))for(const v of q.variations){
  const p=v.parts[0],a=JSON.parse(p.answer);assert.equal(markChallenge(p,p.answer).earned,3);
  [a[0],a[1]]=[a[1],a[0]];assert.equal(markChallenge(p,JSON.stringify(a)).earned,3);
  a[1]={...a[0]};assert.equal(markChallenge(p,JSON.stringify(a)).earned,0);
  const b=JSON.parse(p.answer);b[0].x+=20;assert.equal(markChallenge(p,JSON.stringify(b)).earned,0);
  assert.ok(Math.abs(p.pieces.reduce((s,poly)=>s+polygonArea(poly),0)-8)<1e-8);
 }
 const square=[[0,0],[1,0],[1,1],[0,1]];
 assert.equal(intersectionArea(square,[[1,0],[2,0],[2,1],[1,1]]),0);
 assert.ok(Math.abs(intersectionArea(square,[[.5,0],[1.5,0],[1.5,1],[.5,1]])-.5)<1e-8);
 assert.ok(Math.abs(polygonArea(placedPolygon(square,{x:2,y:3,rotation:45,flipped:true}))-1)<1e-8);
});
test('Sudoku and cage grids enforce givens, domains, units and constraints',()=>{
 for(const q of puzzles.filter(q=>['sudoku','number constraints'].includes(q.focus)))for(const v of q.variations){
  const p=v.parts[0],a=JSON.parse(p.answer);assert.equal(markChallenge(p,p.answer).earned,3);
  const bad=a.slice();bad[0]=bad[1];assert.equal(markChallenge(p,JSON.stringify(bad)).earned,0);
  assert.equal(markChallenge(p,JSON.stringify(a.slice(1))).earned,0);
  assert.equal(p.validation.solutionCount,1);
  if(p.kind==='sudoku'){assert.ok(p.validation.techniques.includes('hidden single'));assert.ok(p.givens.filter(Boolean).length<=35);}
 }
});
test('interactive marking rejects malformed and out-of-range state',()=>{
 for(const q of puzzles.filter(q=>!['sequences','classic maths'].includes(q.focus))){const p=q.variations[0].parts[0];for(const raw of ['bad','null','{}','[null]','{"values":42}','{"path":[-1]}'])assert.equal(markChallenge(p,raw).earned,0);}
});
test('classic numeric solutions agree with independent simulations',()=>{
 let circle=Array.from({length:100},(_,i)=>i+1),index=0;while(circle.length>1){index=(index+1)%circle.length;circle.splice(index,1);}assert.equal(circle[0],73);
 const lockers=Array(1001).fill(false);for(let k=1;k<=1000;k++)for(let i=k;i<=1000;i+=k)lockers[i]=!lockers[i];assert.equal(lockers.filter(Boolean).length,31);
 let sums=new Set([0]);for(const w of [1,3,9,27,81])sums=new Set([...sums].flatMap(s=>[s-w,s,s+w]));assert.ok(Array.from({length:121},(_,i)=>i+1).every(i=>sums.has(i)));
 // Dijkstra over bridge-side masks and torch side.
 const times=[1,2,7,10],dist=new Map([['0,0',0]]),todo=[[0,0,0]];
 while(todo.length){todo.sort((a,b)=>a[2]-b[2]);const [mask,side,cost]=todo.shift();if(cost!==dist.get(`${mask},${side}`))continue;if(mask===15){assert.equal(cost,17);break;}
  const available=[0,1,2,3].filter(i=>Boolean(mask&(1<<i))===Boolean(side));
  for(let i=0;i<available.length;i++)for(let j=i;j<available.length;j++){
   const group=[available[i],available[j]],next=group.reduce((m,x)=>side?m&~(1<<x):m|(1<<x),mask),value=cost+Math.max(...group.map(x=>times[x])),key=`${next},${1-side}`;
   if(value<(dist.get(key)??Infinity)){dist.set(key,value);todo.push([next,1-side,value]);}
  }
 }
 let capacity=0,drops=0;while(capacity<100)capacity+=++drops;assert.equal(drops,14);
});

test('weight-set answer accepts any ordering but rejects duplicate weights',async()=>{
 const {markQuestion}=await import('../js/marking.js');const v=puzzles.find(q=>q.slot===138).variations[0];
 assert.equal(markQuestion(v,{'1':'81,27,9,3,1'})[1].earned,2);
 assert.equal(markQuestion(v,{'1':'1,3,9,27,27'})[1].earned,0);
});
