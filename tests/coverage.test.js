import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import exam from '../data/exam.js';
import {coverageReport,formatCoverage} from '../js/coverage.js';
import {markQuestion} from '../js/marking.js';
const inventory=JSON.parse(readFileSync(new URL('../data/coverage/core-inventory.json',import.meta.url)));
const report=coverageReport(inventory,exam);
test('coverage inventory has distinct permanent keys and valid live links',()=>{
 assert.deepEqual(report.errors,[]);
 assert.equal(inventory.focuses.length,106);
 assert.equal(inventory.focuses.find(f=>f.focus==='CA2.1.1').elements.find(e=>e.key==='a').topic,'integer');
 assert.equal(inventory.focuses.find(f=>f.focus==='CA2.12.2.1').elements.find(e=>e.key==='av').aspect,'Drawback');
 assert.equal(report.summary.uncovered_elements,0);
 assert.ok(report.summary.practice_only_elements>0);
 assert.equal(report.summary.complete_elements,0);
 assert.equal(formatCoverage([{focus:'CA2.1.1',elements:['a','b']}]),'CA2.1.1[a,b]');
});
test('coverage counts each question once and requires two applicable variations',()=>{
 const make=(slot,variations,extra={})=>({slot,variations,reviewStatus:'approved',...extra});
 const part={id:'0',coverage:[{focus:'CA2.1.1',elements:['a']}]};
 const v={parts:[part,part]};
 const row=bank=>coverageReport(inventory,bank).focuses.find(f=>f.focus==='CA2.1.1').elements[0];
 assert.equal(row([make(1,[v,v])]).question_count,1);
 assert.equal(row([make(1,[v,{parts:[]}])]).question_count,0);
 assert.equal(row([make(1,[v,v]),make(2,[v,v])]).coverage_status,'complete');
 assert.equal(row([make(1,[v,v],{retired:true})]).live_question_count,0);
 assert.equal(row([make(1,[v,v],{status:'draft'})]).draft_question_count,1);
 assert.equal(row([make(1,[{parts:[{...part,coverageMode:'practice'}]},{parts:[{...part,coverageMode:'practice'}]}])]).live_question_count,0);
 assert.equal(row([make(1,[v,v],{reviewStatus:'teacher-review-pending'})]).question_count,0);
});
test('unknown subelements and missing mappings fail validation',()=>{
 const bad=[{slot:1,variations:[{parts:[{id:'0',coverage:[{focus:'CA2.1.1',elements:['zz']}]}]}]}];
 assert.match(coverageReport(inventory,bad).errors.join(),/unknown or retired/);
 bad[0].variations[0].parts=[{id:'1'}];assert.match(coverageReport(inventory,bad).errors.join(),/missing coverage/);
});
test('Python fragments ignore layout and quote style, preserving tokens and string data',()=>{
 const mark=(answer,response)=>markQuestion({parts:[{id:'0',kind:'code',marks:1,answer,explanation:'Check Python syntax.'}]},{'0':response})[0].earned;
 assert.equal(mark('total = price * quantity','total=price*quantity'),1);
 assert.equal(mark('f = open("data.txt", "r")',"f=open('data.txt','r')"),1);
 assert.equal(mark('return n * n','ret urn n*n'),0);
 assert.equal(mark('print(total)','Print(total)'),0);
 assert.equal(mark('print("A  B")','print("A B")'),0);
 assert.equal(mark('print(total)','print("total")'),0);
 assert.equal(mark('x += 1','x + = 1'),0);
 assert.equal(mark('print(total)','print(total); print(1)'),0);
});
test('live exam text answers reject negation and contradictory additions',()=>{
 for(const q of exam) for(const v of q.variations) for(const p of v.parts.filter(p=>p.kind==='text')) {
  assert.equal(markQuestion({parts:[p]},{[p.id]:`not ${p.answer}`})[0].earned,0);
  assert.equal(markQuestion({parts:[p]},{[p.id]:`${p.answer} but not ${p.answer}`})[0].earned,0);
 }
});

test('short-answer sentence wrappers are accepted without accepting opposite claims',()=>{
 const v=exam.find(q=>q.slot===12).variations[0];
 for(const answer of ['integer','an integer','It is an integer.'])assert.equal(markQuestion(v,{'0':answer})[0].earned,1);
 for(const answer of ['not an integer','It is not an integer.','integer or float'])assert.equal(markQuestion(v,{'0':answer})[0].earned,0);
});
