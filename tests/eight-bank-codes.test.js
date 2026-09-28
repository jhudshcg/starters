import test from 'node:test';
import assert from 'node:assert/strict';
import {encode,decode,decodeRecordedCode,questionCode,parseQuestionCode} from '../js/codes.js';
import {bankRelease,CODE_FORMAT} from '../js/bank-release.js';
import {generationOf,generationLabel} from '../js/progress-generation.js';
import {migrateStoredCodes,attemptEligibility,priorities,exportCSV} from '../js/progress.js';
import {recordedSet} from '../js/bank.js';
import {rolloverHistory} from '../scripts/question-identities.mjs';
const alphabet='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
function independent(f){
 const entries=[...f.entries];while(entries.length<3)entries.push({slot:4095,variation:0});
 const bits=f.version.toString(2).padStart(6,'0')+f.type.toString(2).padStart(3,'0')+entries.map(e=>e.slot.toString(2).padStart(12,'0')+e.variation.toString(2).padStart(3,'0')).join('');
 return bits.match(/.{6}/g).map(x=>alphabet[parseInt(x,2)]).join('')+(f.minutes?.toString(16).toUpperCase()??'');
}
test('all eight banks retain maximum slots/variations and every timer in nine payload characters',()=>{
 for(const version of [19,32,63])for(let type=0;type<8;type++)for(let count=1;count<=3;count++)for(const minutes of [null,5,6,7,8,9,10,11,12,13,14,15]){
  const f={version,type,entries:[{slot:4094,variation:7},{slot:2048,variation:6},{slot:0,variation:0}].slice(0,count),minutes};
  assert.equal(encode(f),independent(f));assert.deepEqual(decode(encode(f)),f);
  assert.equal(encode(f).length,minutes===null?9:10);
  assert.equal(parseQuestionCode(questionCode(type,4094,7,version)).type,type);
 }
 assert.throws(()=>encode({version:64,type:0,entries:[{slot:0,variation:0}]}));
 assert.throws(()=>encode({version:19,type:8,entries:[{slot:0,variation:0}]}));
 assert.throws(()=>encode({version:18,type:4,entries:[{slot:0,variation:0}]}));
});
test('rollover enables all 64 values and isolates historical identity without discarding topic evidence',()=>{
 const release={...bankRelease},oldCode=encode({version:18,type:1,entries:[{slot:0,variation:0}]}),newCode=encode({version:19,type:1,entries:[{slot:0,variation:0}]});
 try{
  Object.assign(bankRelease,{generation:2,latestRolloverAt:'2030-01-01T00:00:00.000Z'});
  for(const version of [0,1,18,19,63])for(let type=0;type<8;type++){
   const f={version,type,entries:[{slot:4094,variation:7}],minutes:15};assert.equal(encode(f),independent(f));assert.deepEqual(decode(encode(f)),f);
  }
  const legacy=migrateStoredCodes({codeFormat:48,history:[{code:'BA8D_x_4A'}]});assert.equal(legacy.history[0].generation,0);assert.equal(decodeRecordedCode(legacy.history[0].code,0).version,2);assert.equal(decodeRecordedCode(legacy.history[0].code,0).minutes,10);
  assert.equal(decodeRecordedCode(oldCode,0).version,18);assert.equal(decodeRecordedCode(newCode,0).version,19);
  const record={generation:0,code:oldCode,type:1,focus:'CA1.1',max:5,finished:100,firstMax:1,firstEarned:0,partScores:[{refs:['CA1.1.4'],firstMax:1,firstEarned:0}]};
  assert.equal(recordedSet(record).focus,'CA1.1');
  const data=migrateStoredCodes({schema:1,codeFormat:CODE_FORMAT,history:[record],active:{...record,started:50,answers:{0:{0:'saved'}}},recentAttemptsGeneration:0,recentAttempts:{[oldCode]:100}});
  assert.equal(data.active,null);assert.equal(data.archivedActive[0].answers[0][0],'saved');assert.deepEqual(data.recentAttempts,{});
  assert.equal(data.history[0],record);assert.equal(priorities(data.history,'subtopic')[0].focus,'CA1.1.4');
  assert.equal(attemptEligibility(data,encode({version:19,type:1,entries:[{slot:0,variation:0}]}),101).eligible,true);
  assert.match(exportCSV(data.history),/generation,bankVersion/);
  assert.equal(generationOf({generation:3}),3);assert.match(generationLabel({generation:3}),/newer/);
  assert.equal(generationLabel({started:Date.parse('2029-01-01')}),'Before the latest rollover');
  assert.equal(generationLabel({started:Date.parse('2031-01-01')}),'Generation unknown');
  assert.equal(generationOf({generation:-1}),null);
 }finally{Object.assign(bankRelease,release);}
});
test('rollover is explicit, dated and allowed only at exhaustion',()=>{
 const snapshot={'0:1:0':{fingerprint:'new'}};
 assert.throws(()=>rolloverHistory({62:{}},snapshot,bankRelease,'2030-01-01T00:00:00Z'));
 assert.throws(()=>rolloverHistory({63:{}},snapshot,bankRelease,'not a date'));
 const next=rolloverHistory({63:{}},snapshot,bankRelease,'2030-01-01T00:00:00Z');
 assert.deepEqual(next.history,{0:snapshot});assert.equal(next.release.generation,1);
 assert.throws(()=>rolloverHistory({63:{}},snapshot,next.release,'2029-01-01T00:00:00Z'));
});
