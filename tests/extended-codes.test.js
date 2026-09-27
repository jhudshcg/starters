import test from 'node:test';
import assert from 'node:assert/strict';
import {encode,decode,decodeLegacyCode,parseQuestionCode} from '../js/codes.js';
import {migrateStoredCodes,saveStorage,loadStorage,setIdentity} from '../js/progress.js';

test('54-bit maximum fields, all types and high slots round-trip without Number precision loss',()=>{
 for(const version of [0,16,127])for(const type of [0,1,2,3])for(const count of [1,2,3]){
  const f={version,type,entries:[{slot:4094,variation:7},{slot:2048,variation:4},{slot:1023,variation:0}].slice(0,count),minutes:null};
  assert.deepEqual(decode(encode(f)),f);assert.equal(encode(f).length,9);
  for(let minutes=5;minutes<=15;minutes++)assert.deepEqual(decode(encode({...f,minutes})),{...f,minutes});
 }
 assert.throws(()=>encode({type:0,entries:[{slot:4095,variation:0}]}));
 assert.throws(()=>encode({type:0,entries:[{slot:4096,variation:0}]}));
 assert.equal(parseQuestionCode('PZ-16-4094-7').entries[0].slot,4094);
 // All-ones payload has illegal unused variations, not three maximum questions.
 assert.throws(()=>decode('_________'));
});
test('legacy untimed codes decode; nine characters have only the new interpretation',()=>{
 const old=decode('BA8D_x_4');assert.equal(old.entries[0].slot,120);
 const timed=decodeLegacyCode('BA8D_x_4A');assert.equal(timed.minutes,10);
 assert.notDeepEqual(decode('BA8D_x_4A'),timed);
 assert.equal(setIdentity('BA8D_x_4'),setIdentity(encode(old)));
});
test('old stored active/history/timers migrate once; new nine-character backups never migrate as timers',()=>{
 const data={schema:1,history:[{code:'BA8D_x_4A'}],active:{code:'BA8D_x_4A',deadline:123456,result:{code:'BA8D_x_4A'},tracking:{key:'BA8D_x_4'}},recentAttempts:{BA8D_x_4:321}};
 const migrated=migrateStoredCodes(structuredClone(data));
 assert.equal(migrated.codeFormat,54);assert.equal(decode(migrated.active.code).minutes,10);
 assert.equal(migrated.active.deadline,123456);assert.equal(migrated.history[0].code.length,10);
 assert.deepEqual(migrateStoredCodes(structuredClone(migrated)),migrated);
 const storage={value:null,setItem(k,v){this.value=v;},getItem(){return this.value;}};
 saveStorage(migrated,storage);assert.deepEqual(loadStorage(storage),migrated);
 const current={schema:1,codeFormat:54,history:[{code:encode({version:16,type:0,entries:[{slot:4094,variation:0}]})}]};
 assert.deepEqual(migrateStoredCodes(structuredClone(current)),current);
 assert.throws(()=>migrateStoredCodes({schema:1,codeFormat:99,history:[]}));
});
