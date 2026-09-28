import test from 'node:test';
import assert from 'node:assert/strict';
import questions from '../data/exam-comparisons.js';
import {markQuestion} from '../js/marking.js';
test('linked comparison reasons require the correct decision in every variation',()=>{
 for(const q of questions)for(const v of q.variations){
  const answers=Object.fromEntries(v.parts.map(p=>[p.id,p.answer]));
  assert.equal(markQuestion(v,answers).reduce((n,r)=>n+r.earned,0),6);
  for(const index of [0,2,4]){
   const wrong={...answers,[String(index)]:'not '+answers[index]};
   const result=markQuestion(v,wrong);assert.equal(result[index].earned,0);assert.equal(result[index+1].earned,0);
   for(const option of v.parts[index+1].options.filter(x=>x!==v.parts[index+1].answer))assert.equal(markQuestion(v,{...answers,[String(index+1)]:option})[index+1].earned,0);
  }
 }
});
test('workload arithmetic independently supports the search choices',()=>{
 assert.ok(60*5<400+6*5);assert.ok(60*20>400+6*20);
 assert.ok(40*8>180+5*8);assert.ok(40*2<180+5*2);
});
test('quicksort extension only claims supporting practice and extreme pivots are unbalanced',()=>{
 const extension=questions.find(q=>q.slot===169);assert.ok(extension.tags.includes('extension'));
 for(const v of extension.variations)assert.ok(v.parts.every(p=>p.coverageMode==='practice'));
 for(const values of [[1,2,3,4,5],[5,4,3,2,1]])for(const pivot of [values[0],values.at(-1)]){
  const lower=values.filter(x=>x<pivot),higher=values.filter(x=>x>pivot);
  assert.deepEqual([lower.length,higher.length].sort(),[0,4]);
 }
});
