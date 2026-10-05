import test from 'node:test';
import assert from 'node:assert/strict';
import {nameMatch,selectProfile,saveProfile,loadProfile,profiles} from '../js/profiles.js';
import {saveStorage} from '../js/progress.js';
import {revisionPriorities,STALE_MS,updateRecommendations} from '../js/revision.js';
import {choose} from '../js/bank.js';
const now=Date.now(),area={type:1,focus:'CA2.1.1',parent:'CA2.1'};
const row=(earned,max=100,finished=now)=>({type:1,focus:'CA2.1',finished,firstMax:max,partScores:[{refs:['CA2.1.1'],firstEarned:earned,firstMax:max}]});
test('RAG exact boundaries and stale boundary, missing evidence and latest practice',()=>{
 for(const [score,status] of [[44,'red'],[45,'amber'],[64,'amber'],[65,'green']])assert.equal(revisionPriorities([row(score)],[area],now)[0].status,status);
 assert.equal(revisionPriorities([row(90,100,now-STALE_MS)],[area],now)[0].status,'green');
 assert.equal(revisionPriorities([row(90,100,now-STALE_MS-1)],[area],now)[0].status,'stale');
 assert.equal(revisionPriorities([],[area],now)[0].status,'missing');
 assert.equal(revisionPriorities([row(90,100,now-STALE_MS-1),row(50)],[area],now)[0].status,'green');
});
test('priority order is missing, fresh results, stale; exact scores avoid rounding at thresholds',()=>{
 const areas=[area,{type:1,focus:'CA2.2'},{type:1,focus:'CA2.3'}];
 const rows=[row(449,1000),{...row(20,100,now-STALE_MS-1),focus:'CA2.2'}];
 assert.deepEqual(revisionPriorities(rows,areas,now).map(r=>r.status),['missing','red','stale']);
});
test('profiles migrate legacy once, isolate active/history and resolve likely spelling errors',()=>{
 const values=new Map(),storage={getItem:k=>values.get(k)??null,setItem:(k,v)=>values.set(k,v)};
 saveStorage({schema:1,history:[{id:'legacy'}],active:null},storage);
 const joe=selectProfile(' Joe  Hudson ',storage);assert.equal(joe.history.length,1);
 const other=selectProfile('Alex',storage);assert.equal(other.history.length,0);
 other.history.push({id:'alex'});saveProfile(other,storage);
 assert.equal(selectProfile('joe hudson',storage).username,'Joe Hudson');
 assert.deepEqual(loadProfile('Joe Hudson',storage).history,[{id:'legacy'}]);
 assert.equal(profiles(storage).names.length,2);
 other.active={practiceClock:{milliseconds:30000,running:true}};saveProfile(other,storage);
 assert.equal(loadProfile('Alex',storage).active.practiceClock.running,false);
 assert.equal(loadProfile('Alex',storage).active.practiceClock.milliseconds,30000);
 assert.deepEqual(nameMatch('Joe Hudosn',profiles(storage).names),{suggestion:'Joe Hudson'});
 assert.deepEqual(nameMatch('Unrelated Person',profiles(storage).names),{});
});
test('three distinct recommendations persist until completed then advance',()=>{
 const data={history:[]},areas=[area,{type:1,focus:'CA2.2.1',parent:'CA2.2'},{type:1,focus:'CA2.3.1',parent:'CA2.3'}];
 const pick=a=>choose(1,a.parent,null,'new','all',a.focus);
 assert.equal(updateRecommendations(data,areas,pick,now),true);
 const initial=JSON.stringify(data.recommendations);assert.equal(data.recommendations.items.length,3);
 assert.equal(updateRecommendations(data,areas,pick,now+1),false);assert.equal(JSON.stringify(data.recommendations),initial);
 data.history=data.recommendations.items.map((r,i)=>({...row(50),code:r.code,finished:now+10+i}));
 assert.equal(updateRecommendations(data,areas,pick,now+30),true);assert.equal(data.recommendations.celebrate,true);
 assert.ok(data.recommendations.items.every(r=>!data.history.some(h=>h.code===r.code)));
});

test('subtopic evidence splits shared marks and excludes assisted-only visits from its latest five',()=>{
 const independent={...row(0),partScores:[{refs:['CA2.1.1'],firstEarned:2,firstMax:2},{refs:['CA2.1.1','CA2.1.2'],firstEarned:1,firstMax:3}]};
 const assisted=Array.from({length:5},(_,i)=>({...row(0,0,now+i+1),firstMax:1}));
 const result=revisionPriorities([independent,...assisted],[area],now)[0];
 assert.equal(result.max,3.5);assert.equal(result.earned,2.5);assert.equal(result.count,1);assert.equal(result.last,now);
});
