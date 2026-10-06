import test from 'node:test';
import assert from 'node:assert/strict';
import {searchGroups,searchPlan,chooseSearchEntries,searchSetMatches,normaliseSearch,cleanSearchQuery} from '../js/search.js';
import core from '../data/exam.js';
import python from '../data/python.js';
import esp from '../data/esp.js';
import {packBank} from '../scripts/pack-bank.mjs';

const part=(marks=6,extra={})=>({id:'0',marks,answer:'secretanswer',options:['secretanswer','distractorword'],prompt:'irrelevantprompt',hint:'irrelevanthint',...extra});
const question=(slot,{focus='topic',format='trace',recipe,keywords=[],variants=[{}],retired=false}={})=>({slot,focus,recipe,format,retired,title:'Neutral task',keywords,tags:[],variations:variants.map(v=>({parts:[part()],...v}))});
const key=entries=>entries.map(e=>e.slot).sort((a,b)=>a-b).join(',');
const scoredMatches=(bank,type,query)=>searchGroups(bank,type,query).map(g=>[g.key,[...g.matches].map(([slot,vs])=>[slot,vs.map(v=>v.variation)])]);

test('normalisation handles aliases, case, punctuation and bounded input without broad substring matches',()=>{
 assert.equal(normaliseSearch('  While-loop '),'iteration');
 assert.equal(normaliseSearch('FOR LOOPS'),'iteration');
 assert.equal(normaliseSearch('BOOLEAN expressions'),'boolean logic');
 assert.equal(normaliseSearch('dicts'),'dictionary');
 assert.equal(cleanSearchQuery('x'.repeat(200)).length,100);
 assert.deepEqual(searchGroups(core,1,'    '),[]);
 assert.deepEqual(searchGroups([question(1,{keywords:['constant']})],2,'ant'),[]);
 assert.deepEqual(scoredMatches(core,1,'dict'),scoredMatches(core,1,'dictionary'));
 assert.ok(searchGroups(python,2,'dict').some(g=>g.matches.has(24)&&g.matches.has(25)));
});

test('only curriculum metadata, authored skills and titles are searchable; retired questions are excluded',()=>{
 const bank=[question(0,{keywords:['iteration'],variants:[{skills:['length']},{skills:['range']}]}),question(1,{keywords:['retiredonly'],retired:true})];
 for(const term of ['secretanswer','distractorword','irrelevantprompt','irrelevanthint','retiredonly'])assert.deepEqual(searchGroups(bank,2,term),[]);
 assert.deepEqual(searchGroups(bank,2,'length')[0].matches.get(0).map(v=>v.variation),[0]);
 assert.deepEqual(searchGroups(bank,2,'range')[0].matches.get(0).map(v=>v.variation),[1]);
 assert.deepEqual(searchGroups(bank,2,'length range'),[]);
 assert.equal(searchGroups(bank,2,'iteration length')[0].matches.get(0)[0].variation,0);
 // Q0 has a title hit; Q1 has an authored concept hit and ranks first.
 const ranking=[{...question(0,{focus:'a'}),title:'Dictionary'},question(1,{focus:'b',keywords:['dictionary']})];
 assert.equal(searchGroups(ranking,2,'dictionary')[0].focus,'b');
});

test('Core coverage topics apply only to linked elements in the matching variation',()=>{
 const bank=[{...question(1),tags:['CA2.3.4'],variations:[{parts:[part(6,{coverage:[{focus:'CA2.3.1',elements:['e']} ]})]},{parts:[part(6,{coverage:[{focus:'CA2.3.1',elements:['a']} ]})]}]}];
 assert.deepEqual(searchGroups(bank,1,'dictionary')[0].matches.get(1).map(v=>v.variation),[0]);
 assert.deepEqual(searchGroups(bank,1,'CA2.3.4'),[]); // A union tag is not variation evidence.
 assert.ok(searchGroups(core,1,'CA2.3').length);
 assert.deepEqual(searchGroups(core,1,'CA2.30'),[]);
 assert.ok(searchGroups(core,1,'decomposition')[0].matches.size>=3);
});

test('sets preserve whole questions, actual variation marks, different programming formats and maximum match count',()=>{
 const bank=[question(0,{keywords:['needle'],variants:[{parts:[part(10)]},{parts:[part(6)]}]}),question(1,{format:'repair',variants:[{parts:[part(7)]},{parts:[part(6)]}]}),question(2,{format:'repair'})];
 const group=searchGroups(bank,2,'needle')[0],plan=searchPlan(group);
 assert.equal(plan.matched,1);assert.equal(plan.related,1);assert.ok(plan.total>=10&&plan.total<=15);
 assert.equal(plan.entries.find(e=>e.slot===0).variation,1); // The ten-mark variation cannot fit with either related question.
 const next=chooseSearchEntries(group,{previous:plan,random:()=>0});assert.notEqual(key(next.entries),key(plan.entries));
 const allMatched=searchGroups([question(0,{keywords:['needle']}),question(1,{keywords:['needle'],format:'repair'}),question(2,{format:'repair'})],2,'needle')[0];
 const previous=searchPlan(allMatched);assert.equal(previous.matched,2);
 assert.equal(chooseSearchEntries(allMatched,{previous}),null); // Never reduce to one match for another combination.
});

test('permutations retain every template and change every variation without losing assessed matches',()=>{
 const bank=[question(0,{variants:[{skills:['needle']},{skills:['needle']},{skills:['other']}]}),question(1,{format:'repair',variants:[{},{},{}]})];
 const group=searchGroups(bank,2,'needle')[0],previous=searchPlan(group);
 const next=chooseSearchEntries(group,{previous,mode:'permutation',random:()=>0});
 assert.deepEqual(next.entries.map(e=>e.slot),previous.entries.map(e=>e.slot));
 assert.ok(next.entries.every((e,i)=>e.variation!==previous.entries[i].variation));
 assert.equal(searchSetMatches(group,next.entries),1);
 const fixed=searchGroups([question(0,{keywords:['needle']}),question(1,{format:'repair'})],2,'needle')[0];
 assert.equal(chooseSearchEntries(fixed,{previous:searchPlan(fixed),mode:'permutation'}),null);
});

test('ESP retains recipe and shared variation; insufficient groups cannot form sets',()=>{
 const bank=[0,1,2].map(slot=>question(slot,{focus:'task1',recipe:'T1.1',variants:[{skills:slot===0?['needle']:[]},{skills:slot===1?['needle']:[]}]}));
 const group=searchGroups(bank,3,'needle')[0],plan=searchPlan(group);
 assert.equal(plan.matched,1);assert.equal(plan.related,2);assert.equal(new Set(plan.entries.map(e=>e.variation)).size,1);
 const next=chooseSearchEntries(group,{previous:plan,mode:'permutation'});assert.equal(next.matched,1);assert.equal(new Set(next.entries.map(e=>e.variation)).size,1);
 assert.equal(searchPlan(searchGroups(bank.slice(0,2),3,'needle')[0]),null);
});

test('real Core, programming and ESP searches work identically with production-packed banks',()=>{
 for(const [bank,type,terms] of [[core,1,['decomposition','array','CA2.3.4']],[python,2,['loops','dict','binary search','recursion']],[esp,3,['validation','excel','test data']]]){
  const packed=packBank(bank);
  for(const query of terms){
   assert.deepEqual(scoredMatches(packed,type,query),scoredMatches(bank,type,query));
   const groups=searchGroups(packed,type,query);assert.ok(groups.length,query);
   for(const group of groups){
    const plan=searchPlan(group);if(!plan)continue;
    assert.equal(plan.entries.length,type===2?2:3);
    assert.equal(new Set(plan.entries.map(e=>e.slot)).size,plan.entries.length);
    assert.equal(searchSetMatches(group,plan.entries),plan.matched);
    assert.equal(plan.total,plan.entries.reduce((sum,e)=>sum+bank.find(q=>q.slot===e.slot).variations[e.variation].parts.reduce((s,p)=>s+p.marks,0),0));
    if(type===1)assert.ok(plan.total>=15&&plan.total<=22);
    if(type===2)assert.ok(plan.total>=10&&plan.total<=15);
    if(type===3)assert.equal(new Set(plan.entries.map(e=>e.variation)).size,1);
   }
  }
 }
});

test('puzzle sets retain family and whole-question selection, including fixed problems',()=>{
 const bank=[0,1,2,3].map(slot=>question(slot,{focus:'sudoku',keywords:slot<2?['needle']:[],variants:[{}]}));
 bank.push(question(4,{focus:'go',keywords:['needle'],variants:[{}]}));
 const groups=searchGroups(bank,0,'needle'),sudoku=groups.find(g=>g.focus==='sudoku');
 const plan=searchPlan(sudoku);assert.equal(plan.entries.length,3);assert.equal(plan.matched,2);
 const next=chooseSearchEntries(sudoku,{previous:plan});assert.notEqual(key(next.entries),key(plan.entries));
 assert.equal(chooseSearchEntries(sudoku,{previous:plan,mode:'permutation'}),null);
 assert.equal(searchPlan(groups.find(g=>g.focus==='go')),null);
});

test('CA tags connect programming to curriculum terms without expanding broad tags into unrelated child concepts',()=>{
 const sample=[
  question(200,{focus:'practice'}),question(201,{focus:'practice'}),question(202,{focus:'practice'})
 ];
 sample[0].tags=['CA2.2.9'];sample[1].tags=['CA2.3'];
 sample[2].variations=[{parts:[part()],tags:['CA2.8.4']},{parts:[part()],tags:['CA2.7.1']}];
 assert.ok(searchGroups(sample,2,'data type conversion')[0].matches.has(200));
 assert.ok(searchGroups(sample,2,'data structures')[0].matches.has(201));
 assert.deepEqual(searchGroups(sample,2,'dictionary'),[]);
 assert.deepEqual(searchGroups(sample,2,'array'),[]);
 assert.deepEqual(searchGroups(sample,2,'CA2.3.4'),[]);
 assert.deepEqual(searchGroups(sample,2,'validation')[0].matches.get(202).map(v=>v.variation),[0]);
 assert.ok(searchGroups(python,2,'data type conversion').some(g=>g.matches.has(56)));
 assert.ok(searchGroups(core,1,'data type conversion').length);
 assert.ok(searchGroups(python,2,'CA2.3.4').some(g=>g.matches.has(55)));
 assert.deepEqual(scoredMatches(packBank(python),2,'data type conversion'),scoredMatches(python,2,'data type conversion'));
});
