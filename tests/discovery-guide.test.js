/** App discovery preserves old codes; guide content has native, initially closed disclosure. */
import test from 'node:test';
import assert from 'node:assert/strict';
import {discoverableQuestion,discoverableFocuses,mathsPracticeURL} from '../js/activity-discovery.js';
import {puzzleCards} from '../js/puzzle-cards.js';
import {algorithmGuideHTML,algorithmExamples} from '../js/algorithm-guide.js';
import {pythonGuides,guidesForQuestions,pythonGuidesHTML} from '../js/python-guides.js';
import {spawnSync} from 'node:child_process';
import {mkdtempSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {banks,resolve} from '../js/bank.js';
import {BANK_VERSION} from '../js/codes.js';
test('classic maths is hidden only from discovery; historical question addresses remain resolvable',()=>{
 const maths=banks[0].find(q=>q.focus==='classic maths');assert.equal(discoverableQuestion(maths,0),false);
 assert.deepEqual(discoverableFocuses(['go','classic maths','sudoku'],0),['go','sudoku']);
 const set=resolve({version:BANK_VERSION,type:0,entries:[{slot:maths.slot,variation:0}],minutes:null});assert.equal(set.questions[0].slot,maths.slot);
 const cards=puzzleCards(['go','classic maths'],{go:'Go'},'go');assert.ok(cards.includes(mathsPracticeURL));assert.ok(!cards.includes('data-puzzle-focus="classic maths"'));
});
test('guide is closed by default, covers all five algorithms and selects applicable questions',()=>{
 const html=algorithmGuideHTML();assert.ok(!/<details[^>]*\bopen\b/.test(html), 'Native disclosure starts closed');
 for(const name of ['Linear search','Binary search','Bubble sort','Insertion sort','Merge sort'])assert.ok(html.includes(name));
 assert.equal((html.match(/<figure /g)??[]).length,2);
 assert.deepEqual(guidesForQuestions([{focus:'sorting'},{focus:'algorithms'}]),['algorithms']);
});
test('all selectable Python focuses have guides with independent, correct short examples',()=>{
 const focuses=[...new Set(banks[2].filter(q=>!q.retired).map(q=>q.focus))];
 for(const focus of focuses){
  const questions=[{focus}];assert.equal(guidesForQuestions(questions).length,1,focus);
  assert.ok(!/<details[^>]*\bopen\b/.test(pythonGuidesHTML(questions)),focus);
 }
 const dir=mkdtempSync(join(tmpdir(),'tlevel-guide-'));
 try{
  for(const [focus,examples] of [...Object.entries(pythonGuides).map(([key,value])=>[key,value.examples]),['algorithms',algorithmExamples]]){
   assert.ok(examples.length>=2,focus);
   for(const example of examples){
    const lines=example.code.split('\n');assert.ok(lines.filter(line=>line.trim()).length<=12,focus);
    assert.ok(lines.every(line=>line.length<=64),focus);
    const result=spawnSync('python3',['-c',example.code],{encoding:'utf8',cwd:dir,timeout:3000});
    assert.equal(result.status,0,`${focus}: ${result.stderr}`);
    assert.equal(result.stdout.trimEnd(),example.output,focus);
   }
  }
 }finally{rmSync(dir,{recursive:true,force:true});}
});
