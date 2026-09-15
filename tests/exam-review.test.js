import test from 'node:test';
import assert from 'node:assert/strict';
import exam from '../data/exam.js';
import {markQuestion} from '../js/marking.js';
const question=(slot,v=0)=>exam.find(q=>q.slot===slot).variations[v];
const earned=(slot,v,part,answer)=>markQuestion(question(slot,v),{[part]:answer})[Number(part)].earned;
test('reviewed equivalent terms, identifiers and expressions mark fairly',()=>{
 for(const name of ['printing_cost','print_cost','total_cost','cost'])assert.equal(earned(1,1,'1',name),1);
 for(const bad of ['printing cost','3cost','x','cost or total'])assert.equal(earned(1,1,'1',bad),0);
 assert.equal(earned(4,0,'3','hiding implementation details'),1);
 assert.equal(earned(32,1,'4','effort'),1);
 assert.equal(earned(42,0,'4','-1'),1);
 assert.equal(earned(42,0,'4','3'),0);
 assert.equal(earned(7,0,'4','total = quantity * price'),1);
 assert.equal(earned(7,0,'4','total = price / quantity'),0);
 assert.equal(earned(11,0,'4','evaluate the solution'),1);
 assert.equal(earned(35,0,'2','the field is not empty'),1);
 assert.equal(earned(35,0,'2','the field is empty'),0);
});
test('a linked reason needs the appropriate preceding response',()=>{
 const q=question(14),reason=q.parts[3].answer;
 assert.equal(markQuestion(q,{'2':'string','3':reason})[3].earned,1);
 assert.equal(markQuestion(q,{'2':'integer','3':reason})[3].earned,0);
 assert.equal(markQuestion(q,{'2':'string','3':'It automatically checks the postcode exists'})[3].earned,0);
});
test('sorting checks the specified algorithm step instead of a sorted final list',()=>{
 const bubble=values=>{const a=[...values];for(let i=0;i<a.length-1;i++)if(a[i]>a[i+1])[a[i],a[i+1]]=[a[i+1],a[i]];return a;};
 for(const [v,input] of [[0,[7,3,5,1]],[1,[4,8,2,6]]]){
  assert.equal(earned(44,v,'0',JSON.stringify(bubble(input))),1);
  assert.equal(earned(44,v,'0',JSON.stringify(input.toSorted((a,b)=>a-b))),0);
 }
 assert.equal(earned(44,0,'1','2'),1);assert.equal(earned(44,1,'1','1'),1);
 assert.equal(earned(44,0,'2','5,2'),1);assert.equal(earned(44,0,'2','2,5'),0);
});
test('every authored alternative earns credit with its dependencies satisfied',()=>{
 for(const q of exam)for(const v of q.variations)for(const p of v.parts){
  for(const a of p.accepted??[]){
   const answers=Object.fromEntries(v.parts.map(part=>[part.id,part.answer]));answers[p.id]=a;
   assert.equal(markQuestion(v,answers).find(r=>r.id===p.id).earned,p.marks,`${q.slot}/${p.id}: ${a}`);
  }
 }
});
