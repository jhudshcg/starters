import test from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {readFileSync} from 'node:fs';
import maths from '../data/puzzles/classic-maths.js';
import go from '../data/puzzles/go.js';
import python from '../data/python-more.js';
import {expressionValue,validCoinSystems,fractionValue} from '../js/maths-answer.js';
import {playGo,markGo,goPosition} from '../js/go-rules.js';
import {markQuestion} from '../js/marking.js';
import {choose,resolve} from '../js/bank.js';
import {BANK_VERSION} from '../js/codes.js';

test('all 30 maths source ideas have distinct accessible live templates',()=>{
 assert.deepEqual(maths.map(q=>q.sourceId).sort((a,b)=>a-b),Array.from({length:30},(_,i)=>i+1));
 for(const q of maths)assert.equal(resolve({version:BANK_VERSION,type:0,entries:[{slot:q.slot,variation:0}],minutes:null}).questions[0].sourceId,q.sourceId);
 const inventory=JSON.parse(readFileSync(new URL('../data/coverage/classic-maths-inventory.json',import.meta.url)));
 assert.equal(inventory.items.length,30);
 for(const row of inventory.items){assert.equal(row.status,'integrated');assert.ok(maths.some(q=>q.sourceId===row.sourceId&&q.slot===row.bankSlot));}
});
test('maths expressions accept alternatives and reject invalid digits, syntax and execution',()=>{
 for(const part of maths.find(q=>q.sourceId===16).variations[0].parts)assert.ok(Math.abs(expressionValue(part.answer,part.digit)-6)<1e-9);
 assert.equal(expressionValue('3+3+3-3',3),null);
 assert.equal(expressionValue('22-2',2),null);
 assert.equal(expressionValue('2+2+2;alert(1)',2),null);
 assert.equal(expressionValue('sqrt(4)+sqrt(4)+sqrt(4)',4),6);
 assert.equal(expressionValue('(3+3)/3',3),2);
 assert.equal(expressionValue('9!+9!+9!',9),null);
 assert.equal(expressionValue('0/0+0',0),null);
 assert.equal(fractionValue('16 / 18'),8/9);assert.equal(fractionValue('1/0'),null);
 assert.ok(validCoinSystems('7,3,2,1;1,3,4,9'));
 assert.ok(!validCoinSystems('1,2,4,5;5,4,2,1'));
 assert.ok(!validCoinSystems('1,2,3,4;1,3,4,5'));
});
test('new maths enumeration answers agree with independent calculations',()=>{
 const sums=[];
 for(let a=1;a<=9;a++)for(let b=1;b<=9;b++)for(let c=1;c<=9;c++)for(let d=1;d<=9;d++)if(new Set([a,b,c,d]).size===4)sums.push(10*a+b+10*c+d);
 sums.sort((a,b)=>a-b);const counts=new Map();for(const s of sums)counts.set(s,(counts.get(s)??0)+1);
 const modes=[...counts].filter(([,n])=>n===Math.max(...counts.values())).map(([s])=>s);
 assert.equal(sums.length,3024);assert.equal(sums.reduce((s,n)=>s+n,0)/sums.length,110);assert.equal(sums[1512],110);assert.deepEqual(modes,[99,110,121]);
 const gcd=(a,b)=>b?gcd(b,a%b):a;let coprime=0;
 for(let a=1;a<=100;a++)for(let b=a+1;b<=100;b++)if(gcd(a,b)===1)coprime++;
 assert.equal(coprime,3043);assert.equal(Math.round((2*(4950-coprime)-coprime)/4950*1000)/10,15.6);
 let difference=1,total=1;for(let k=1;k<6;k++){difference=(6+k*difference)/(6-k);total+=difference;}assert.ok(Math.abs(total-83.2)<1e-9);

});
test('Go play applies recorded replies, preserves alternate wins and rejects incomplete answers',()=>{
 for(const q of go){
  const p=q.variations[0].parts[0];let visited=0;
  function visit(node,moves=[]){
   visited++;assert.equal(markGo(p,{moves}).earned,node.success?3:0);
   for(const child of node.children)visit(child,[...moves,child.move]);
  }
  visit(p.tree);assert.ok(visited>1);
  let state={moves:[]};
  for(let step=0;step<100&&!goPosition(p,state.moves).success;step++){
   const model=JSON.parse(p.answer).moves,move=model[state.moves.length];
   const result=playGo(p,state,move);assert.ok(!result.error);state=result.state;
  }
  assert.equal(markGo(p,state).earned,3);
  assert.equal(markGo(p,{moves:JSON.parse(p.answer).moves,pending:0}).earned,0);
  const occupied=p.tree.board.indexOf('B');assert.ok(playGo(p,{},occupied).error);
 }
 const set=choose(0,'go');assert.equal(set.questions.length,3);assert.equal(new Set(set.questions.map(q=>q.slot)).size,3);
});
test('new Python examples agree with execution of the corrected reference snippets',()=>{
 const script=`import json\nrows=json.loads(input())\nfor q in rows:\n for v in q['variations']:\n  p=v['parts'];code=v['code'];env={}\n  if q['slot']==6:\n   code=code.replace('print(amount *', 'return (amount *')\n   exec(code,env);assert env['result']==int(p[2]['answer'])\n  elif q['slot']==7:\n   exec(code,env);assert [env['value'],env['first'],env['second']]==[int(x['answer']) for x in p[:3]]\n  elif q['slot']==8:\n   exec(code.replace('___',p[0]['answer']),env)\n   import re\n   for part in p[1:]:\n    value=int(re.search(r'in_range\\((\\d+)\\)',part['prompt']).group(1));assert str(env['in_range'](value))==part['answer']\n  elif q['slot']==9:\n   exec(code,env);assert env['locate']([2,4,6,8,10,12,14],12)==5;assert env['locate']([],2)==-1\n  elif q['slot']==10:\n   exec(code.replace('___','>'),env);assert env['values']==[int(x['answer']) for x in p[1:5]]\n  elif q['slot']==11:\n   exec(code.replace('        return -1','    return -1'),env);assert env['find']([10,20,30,40],30)==2;assert env['find']([],99)==-1\nprint('Reference checks passed')`;
 const output=execFileSync('python3',['-c',script],{input:JSON.stringify(python),encoding:'utf8'});
 assert.ok(output.includes('Reference checks passed'));
 for(const q of python)for(const v of q.variations)assert.ok(markQuestion(v,Object.fromEntries(v.parts.map(p=>[p.id,p.answer]))).every(r=>r.earned===r.max));
});
