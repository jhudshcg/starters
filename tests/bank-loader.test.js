import test from 'node:test';
import assert from 'node:assert/strict';
import {createBankLoader} from '../js/bank-loader.js';
import {pack} from '../scripts/pack-bank.mjs';

test('banks download only on demand, share in-flight requests, and cache decoded display data',async()=>{
 const calls=[];
 const loader=createBankLoader(['puzzles','exam','python'],async url=>{
   calls.push(url);return {ok:true,text:async()=>pack([{title:url}])};
 });
 assert.deepEqual(calls,[]);
 const [first,second]=await Promise.all([loader.ensureBank(1),loader.ensureBank(1)]);
 assert.equal(first,second);
 assert.deepEqual(calls,['exam']);
 assert.equal(await loader.ensureBank(1),first);
 assert.equal(loader.banks[0],null);
 assert.equal(loader.banks[2],null);
 await loader.ensureBank(2);
 assert.deepEqual(calls,['exam','python']);
});

test('failed downloads and malformed payloads can be retried without losing loaded banks',async()=>{
 let attempts=0;
 const loader=createBankLoader(['puzzles','exam'],async()=>{
   attempts++;
   return {ok:attempts!==1,text:async()=>attempts===2?'broken':pack([{title:'loaded'}])};
 });
 await assert.rejects(loader.ensureBank(1),/Could not load/);
 await assert.rejects(loader.ensureBank(1),/Could not load/);
 assert.equal(loader.banks[1],null);
 assert.deepEqual(await loader.ensureBank(1),[{title:'loaded'}]);
 await assert.rejects(loader.ensureBank(3),/Unknown activity/);
});
