import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {banks,resolve,historicalSet,choose} from '../js/bank.js';
import {encode,BANK_VERSION} from '../js/codes.js';
import {revisions} from '../js/code-compatibility.js';
import {snapshotBanks,nextHistory,compatibilityModule} from '../scripts/question-identities.mjs';
import {setIdentity,attemptEligibility} from '../js/progress.js';
const history=JSON.parse(readFileSync(new URL('../data/code-history.json',import.meta.url)));

test('every unchanged revision-2 variation opens; every altered one is explicitly rejected',()=>{
 let preserved=0,changed=0;
 for(const [key,state] of Object.entries(revisions[2])){
  const [type,slot,variation]=key.split(':').map(Number),fields={version:2,type,entries:[{slot,variation}]};
  if(state===1){
   assert.deepEqual(resolve(encode(fields)).questions,resolve(encode({...fields,version:BANK_VERSION})).questions);preserved++;
  }else{assert.throws(()=>resolve(encode(fields)),/updated or removed/);changed++;}
 }
 assert.equal(preserved,344);assert.equal(changed,73);
});
test('a mixed set is invalid if any contained variation changed; revised code opens it',()=>{
 assert.throws(()=>resolve('BIAkAiAg'),/updated or removed/);
 assert.equal(resolve('BoAkAiAg').total,15);
 assert.throws(()=>resolve('EX-2-1-1'),/updated or removed/);
 assert.equal(resolve('EX-3-1-1').questions[0].title,'Abstraction in a calculation');
});
test('old timers, single-question codes and new permutations work for unchanged content',()=>{
 const old=resolve('BAyD_x_4A');assert.equal(old.minutes,10);assert.equal(old.version,2);
 assert.equal(resolve('PZ-2-100-0').questions.length,1);
 const next=choose(0,old.focus,old,'permutation');assert.equal(next.version,BANK_VERSION);
 assert.notEqual(next.entries[0].variation,old.entries[0].variation);
});
test('unchanged codes across revisions share a repeat-attempt identity; changed questions do not',()=>{
 const old=resolve('BAyD_x_4'),current=encode({...old,version:BANK_VERSION,minutes:15});
 assert.equal(setIdentity(old.code),setIdentity(current));
 assert.equal(attemptEligibility({history:[{code:old.code,finished:1000}]},current,2000).eligible,false);
 assert.notEqual(setIdentity('BIAkAiAg'),setIdentity('BoAkAiAg'));
});
test('historical marks remain available for progress backup imports without opening changed questions',()=>{
 const old=historicalSet('BIAkAiAg');assert.equal(old.total,15);assert.equal(old.focus,'CA1.1');assert.equal(old.type,1);
 assert.throws(()=>historicalSet(encode({version:2,type:1,entries:[{slot:900,variation:0}]})),/Unknown historical/);
});
test('additions, metadata and stable rebuilds do not consume a new revision',()=>{
 const current=snapshotBanks(banks),latest=String(BANK_VERSION);
 assert.deepEqual(current,history[latest]);
 assert.deepEqual(nextHistory(history,current),history);
 const added={...current,'1:900:0':{fingerprint:'new',focus:'CA1.1',marks:5}};
 assert.equal(Math.max(...Object.keys(nextHistory(history,added)).map(Number)),BANK_VERSION);
 const review=banks.map(bank=>bank.map(q=>({...q,reviewStatus:'approved',retired:!q.retired})));
 assert.deepEqual(snapshotBanks(review),current);
 assert.equal(compatibilityModule(history),readFileSync(new URL('../js/code-compatibility.js',import.meta.url),'utf8'));
});
test('changed or removed content creates a revision while preserving unaffected entries',()=>{
 const current=history[BANK_VERSION],key=Object.keys(current)[0];
 const altered={...current,[key]:{...current[key],fingerprint:'changed'}};
 const next=nextHistory(history,altered);
 assert.equal(Math.max(...Object.keys(next).map(Number)),BANK_VERSION+1);
 assert.deepEqual(next[BANK_VERSION],current);
 const removed={...current};delete removed[key];
 assert.equal(Math.max(...Object.keys(nextHistory(history,removed)).map(Number)),BANK_VERSION+1);
});
