import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {banks,resolve,historicalSet,choose} from '../js/bank.js';
import {encode,BANK_VERSION} from '../js/codes.js';
import {revisions} from '../js/code-compatibility.js';
import {snapshotBanks,nextHistory,compatibilityModule} from '../scripts/question-identities.mjs';
import {setIdentity,attemptEligibility} from '../js/progress.js';
const history=JSON.parse(readFileSync(new URL('../data/code-history.json',import.meta.url)));

test('all available historical variations open current content with an accurate update notice',()=>{
 let preserved=0,changed=0,removed=0;
 for(const [version,entries] of Object.entries(revisions))for(const [key,state] of Object.entries(entries)){
  const [type,slot,variation]=key.split(':').map(Number),fields={version:Number(version),type,entries:[{slot,variation}]};
  const template=banks[type].find(q=>q.slot===slot);
  if(!template?.variations[variation]){assert.throws(()=>resolve(encode(fields)),/no longer available/);removed++;continue;}
  const old=resolve(encode(fields)),current=resolve(encode({...fields,version:BANK_VERSION}));
  assert.deepEqual(old.questions,current.questions);
  assert.equal(old.updated,state===0);
  assert.equal(old.code,encode(fields));
  state===1?preserved++:changed++;
 }
 assert.ok(preserved>0&&changed>0);
});
test('changed mixed sets and single-question codes remain usable',()=>{
 assert.equal(resolve('BIAkAiAg').total,15);
 assert.equal(resolve('BIAkAiAg').updated,true);
 assert.equal(resolve('EX-2-1-1').updated,true);
 assert.equal(resolve('EX-3-1-1').updated,true);
 assert.equal(resolve(`EX-${BANK_VERSION}-1-1`).updated,false);
});
test('retirement preserves old links; removal offers an explicit replacement',()=>{
 const q=banks[1].find(q=>q.slot===1),retired=q.retired,index=banks[1].indexOf(q);
 try {
  q.retired=true;
  assert.equal(resolve('EX-2-1-1').questions[0].slot,1);
  for(let i=0;i<10;i++)assert.ok(!choose(1,q.focus).entries.some(e=>e.slot===1));
  banks[1].splice(index,1);
  assert.throws(()=>resolve('BIAkAiAg'),error=>{
   assert.match(error.message,/no longer available/);
   assert.deepEqual(error.replacement,{type:1,focus:'CA1.1'});return true;
  });
 } finally {
  if(!banks[1].includes(q))banks[1].splice(index,0,q);
  if(retired===undefined)delete q.retired;else q.retired=retired;
 }
});
test('old timers, single-question codes and new permutations work for unchanged content',()=>{
 const old=resolve('BA8D_x_4A');assert.equal(old.minutes,10);assert.equal(old.version,2);
 assert.equal(resolve('PZ-2-120-0').questions.length,1);
 const next=choose(0,old.focus,old,'permutation');assert.equal(next.version,BANK_VERSION);
 assert.notEqual(next.entries[0].variation,old.entries[0].variation);
});
test('old and current codes share a repeat-attempt identity after corrections',()=>{
 const old=resolve('BA8D_x_4'),current=encode({...old,version:BANK_VERSION,minutes:15});
 assert.equal(setIdentity(old.code),setIdentity(current));
 assert.equal(attemptEligibility({history:[{code:old.code,finished:1000}]},current,2000).eligible,false);
 assert.equal(setIdentity('BIAkAiAg'),setIdentity('BoAkAiAg'));
 assert.equal(attemptEligibility({history:[],recentAttempts:{BoAkAiAg:1000}},'BIAkAiAg',2000).eligible,false);
});
test('historical marks remain available for progress backup imports independently of current question content',()=>{
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

test('removed question addresses cannot be recycled into new content',()=>{
 const entry={fingerprint:'original',focus:'CA1.1',marks:5};
 assert.throws(()=>nextHistory({2:{'1:5:0':entry},3:{}},{'1:5:0':{...entry,fingerprint:'new'}}),/Cannot reuse removed/);
 assert.throws(()=>nextHistory({2:{'1:5:0':entry},3:{}},{'1:5:1':entry}),/Cannot reuse removed/);
});
