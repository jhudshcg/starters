import test from 'node:test';
import assert from 'node:assert/strict';
import {partScores,priorities,validatePartScores,exportCSV,saveStorage,loadStorage,recordPractice,attemptEligibility} from '../js/progress.js';
import {banks,resolve,historicalSet} from '../js/bank.js';
import {BANK_VERSION} from '../js/codes.js';
import {markQuestion} from '../js/marking.js';
const set={type:1,focus:'CA2.1',entries:[{slot:12,variation:0}],questions:[{slot:12,variation:0,parts:[
 {id:'0',coverage:[{focus:'CA2.1.1',elements:['a','b']}]},
 {id:'1',coverage:[{focus:'CA2.1.2',elements:['a']},{focus:'CA2.1.3',elements:['a']},{focus:'CA2.1.2',elements:['b']}]}
]}]};
const results=[{id:'0',earned:2,max:2},{id:'1',earned:1,max:3}];
const make=(finished=1)=>({id:String(finished),type:1,focus:'CA2.1',finished,earned:3,max:5,firstEarned:3,firstMax:5,partScores:partScores(set,{12:{results,assisted:false}},{12:results})});

test('part results retain attribution and split unique references without duplicating marks',()=>{
 const record=make();assert.ok(validatePartScores(record,set));
 assert.deepEqual(record.partScores[1].refs,['CA2.1.2','CA2.1.3']);
 assert.deepEqual(priorities([record]),[{focus:'CA2.1',count:1,earned:3,max:5,score:60}]);
 const children=priorities([record],'subtopic');
 assert.deepEqual(children,[{focus:'CA2.1.2',count:1,earned:.5,max:1.5,score:33},{focus:'CA2.1.3',count:1,earned:.5,max:1.5,score:33},{focus:'CA2.1.1',count:1,earned:2,max:2,score:100}]);
 assert.equal(children.reduce((s,r)=>s+r.earned,0),3);assert.equal(children.reduce((s,r)=>s+r.max,0),5);
});
test('old 20/20 remains history-only alongside a new detailed 3/5, without migration',()=>{
 const legacy={id:'old',type:1,focus:'CA2.1',finished:0,earned:20,max:20,firstEarned:20,firstMax:20};
 const history=[legacy,make()],before=JSON.stringify(history);
 assert.equal(priorities(history)[0].score,60);assert.equal(priorities([legacy]).length,0);
 assert.ok(validatePartScores(legacy,set));assert.equal(JSON.stringify(history),before);
 const storage={value:null,setItem(k,v){this.value=v;},getItem(){return this.value;}};
 saveStorage({schema:1,history},storage);assert.deepEqual(loadStorage(storage).history,history);
 assert.deepEqual(priorities(loadStorage(storage).history),priorities(history));
});
test('both views use one latest-five window, count attempts once and weight marks',()=>{
 const older=make(0);older.partScores[0].refs=['CA2.1.9'];
 const history=[older,...Array.from({length:5},(_,i)=>make(i+1))];
 const topic=priorities(history)[0],children=priorities(history,'subtopic');
 assert.equal(topic.count,5);assert.equal(topic.max,25);assert.equal(topic.score,60);
 assert.ok(!children.some(p=>p.focus==='CA2.1.9'));
 assert.equal(children.reduce((s,p)=>s+p.max,0),topic.max);
 const small=make(10);small.partScores=[{...small.partScores[0],earned:0,max:1,firstEarned:0,firstMax:1}];
 assert.equal(priorities([make(),small])[0].score,50); // 3/6, not the mean of 60% and 0%.
});
test('assisted and puzzle results are excluded; programming retains its named focus',()=>{
 const record=make();record.partScores=partScores(set,{12:{results,assisted:true}},{12:results});record.firstMax=0;record.firstEarned=0;
 assert.ok(validatePartScores(record,set));assert.deepEqual(priorities([record]),[]);
 const mixed=make();mixed.partScores[0].firstMax=0;mixed.partScores[0].firstEarned=0;mixed.firstEarned=1;mixed.firstMax=3;
 assert.ok(validatePartScores(mixed,set));assert.equal(priorities([mixed])[0].score,33);
 assert.ok(!priorities([mixed],'subtopic').some(p=>p.focus==='CA2.1.1'));
 assert.equal(partScores({...set,type:0},{},{}),undefined);
 const programming={...set,type:2,focus:'iteration'};
 const prog={...make(),type:2,focus:'iteration',partScores:partScores(programming,{12:{results,assisted:false}},{12:results})};
 assert.ok(validatePartScores(prog,programming));assert.equal(priorities([prog])[0].focus,'iteration');assert.deepEqual(priorities([prog],'subtopic'),[]);
});
test('backup validation rejects corrupted attribution or totals and accepts legacy absence',()=>{
 for(const corrupt of [
  r=>r.partScores=null,r=>r.partScores=[],r=>r.partScores.push(r.partScores[0]),
  r=>r.partScores[0].slot=999,r=>r.partScores[0].variation=7,
  r=>r.partScores[0].refs=['CA9.9.1'],r=>r.partScores[0].refs=['CA2.1'],
  r=>r.partScores[0].refs=['CA2.1.1','CA2.1.1'],r=>r.partScores[0].earned=1,
  r=>r.partScores[0].firstEarned=3,r=>r.partScores[0].firstMax=1,
  r=>r.partScores[0].max=.5,r=>r.partScores[0].refs=['<script>'],r=>r.partScores[0].part={},
 ]){const r=make();corrupt(r);assert.equal(validatePartScores(r,set),false);}
 const r=make();delete r.partScores;assert.equal(validatePartScores(r,set),true);
 const csv=exportCSV([make()]);assert.match(csv,/partScores/);assert.ok(csv.includes('""refs""'));assert.ok(csv.includes('CA2.1.2'));
});
test('all actual exam and Python variations create valid portable detailed records',()=>{
 for(const type of [1,2])for(const template of banks[type])for(let variation=0;variation<template.variations.length;variation++){
  const actual=resolve({version:BANK_VERSION,type,entries:[{slot:template.slot,variation}],minutes:null});
  const q=actual.questions[0],result=markQuestion(q,Object.fromEntries(q.parts.map(p=>[p.id,p.answer])));
  const r={type,focus:actual.focus,earned:actual.total,max:actual.total,firstEarned:actual.total,firstMax:actual.total,
   partScores:partScores(actual,{[q.slot]:{results:result,assisted:false}},{[q.slot]:result})};
  assert.ok(validatePartScores(JSON.parse(JSON.stringify(r)),historicalSet(actual.code)),`${type}:${q.slot}:${variation}`);
 }
});
test('ineligible repeats cannot introduce detailed evidence into history',()=>{
 const q=resolve({version:BANK_VERSION,type:1,entries:[{slot:12,variation:0}],minutes:null});
 const old={...make(1),code:q.code},data={history:[old]};
 const before=priorities(data.history),early={...make(2),code:q.code};
 recordPractice(data,early,attemptEligibility(data,q.code,2));
 assert.deepEqual(priorities(data.history),before);assert.equal(data.history.length,1);
});
