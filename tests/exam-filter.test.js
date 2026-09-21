import test from 'node:test';
import assert from 'node:assert/strict';
import {banks,focuses,examSubtopics,choose,resolve,hasAlternativeExamSet,matchesSubtopic} from '../js/bank.js';
import {matchingVariations,subtopicOptions,preferSubtopic} from '../js/exam-selection.js';
import {codeDiagnostics} from '../js/code-diagnostics.js';
import {BANK_VERSION,encode} from '../js/codes.js';

test('every available exam reference selects the maximum matching whole questions with bounded marks',()=>{
 for(const focus of focuses(1))for(const {reference,count} of examSubtopics(focus)){
  const set=choose(1,focus,null,'new','all',reference);
  assert.equal(set.questions.length,3);assert.ok(set.total>=15&&set.total<=22);
  assert.equal(set.questions.filter(q=>q.parts.some(p=>matchesSubtopic(p,reference))).length,Math.min(3,count),reference);
  for(const q of set.questions)assert.deepEqual(q.parts,banks[1].find(t=>t.slot===q.slot).variations[q.variation].parts);
  const opened=resolve(set.code);assert.deepEqual(opened.questions,set.questions); // Filter is not required to reconstruct the set.
  const next=choose(1,focus,set,'permutation','all',reference);
  assert.deepEqual(next.entries.map(e=>e.slot),set.entries.map(e=>e.slot));assert.ok(next.entries.every((e,i)=>e.variation!==set.entries[i].variation));
  assert.equal(next.questions.filter(q=>q.parts.some(p=>matchesSubtopic(p,reference))).length,Math.min(3,count));
  if(hasAlternativeExamSet(set,reference)){
   const other=choose(1,focus,set,'new','all',reference);assert.notDeepEqual(other.entries.map(e=>e.slot),set.entries.map(e=>e.slot));
   assert.equal(other.questions.filter(q=>q.parts.some(p=>matchesSubtopic(p,reference))).length,Math.min(3,count));
  }else assert.throws(()=>choose(1,focus,set,'new','all',reference),/No other/);
 }
});
test('CA1.2.10 retains its two matching questions and fills with related practice',()=>{
 const set=choose(1,'CA1.2',null,'new','all','CA1.2.10');
 assert.equal(set.examSubtopic,'CA1.2.10');assert.ok(set.entries.some(e=>e.slot===7));assert.ok(set.entries.some(e=>e.slot===129));
 assert.equal(set.questions.flatMap(q=>q.parts).filter(p=>matchesSubtopic(p,'CA1.2.10')).length,2);
 assert.throws(()=>choose(1,'CA1.2',null,'new','all','CA2.1.1'),/No questions/);
});
test('matching is segment-aware, includes deeper references, and respects variation-specific coverage',()=>{
 const part=focus=>({coverage:[{focus,elements:['a']}]});
 assert.ok(matchesSubtopic(part('CA2.12.1.1'),'CA2.12.1'));
 assert.ok(!matchesSubtopic(part('CA1.2.10'),'CA1.2.1'));
 const q={focus:'CA1.2',variations:[{parts:[part('CA1.2.1')]},{parts:[part('CA1.2.3')]}]};
 assert.deepEqual(matchingVariations(q,'CA1.2.3'),[1]);
 assert.deepEqual(subtopicOptions([q],'CA1.2'),[{reference:'CA1.2.1',count:1},{reference:'CA1.2.3',count:1}]);
 assert.throws(()=>preferSubtopic([[q]],'CA1.2.9'),/No questions/);
 const deep={...q,focus:'CA2.12',variations:[{parts:[part('CA2.12.1.1')]}]};
 assert.deepEqual(subtopicOptions([deep],'CA2.12').map(r=>r.reference),['CA2.12.1','CA2.12.1.1']);
});
test('error diagnostics preserve exact characters and omit page queries and student storage',()=>{
 const raw='BoAkAiAg\u200b';
 const result=codeDiagnostics(raw,Error('Invalid code'),{pageURL:'https://example.org/starters/?private=value#set=anything',scriptURL:'https://example.org/starters/assets/app-XYZ.js',browser:'Test browser'});
 assert.equal(result.enteredCode,raw);assert.ok(result.characters.includes('U+200B'));assert.equal(result.decoded,null);
 assert.equal(result.page,'https://example.org/starters/');assert.equal(result.build,'app-XYZ.js');assert.equal(result.bankVersion,BANK_VERSION);
 assert.ok(!JSON.stringify(result).includes('private'));assert.ok(!('history' in result));assert.ok(!('answers' in result));
 const code=encode({type:1,entries:[{slot:8,variation:0}],minutes:10});
 assert.equal(codeDiagnostics(code,Error('test')).decoded.minutes,10);
});
