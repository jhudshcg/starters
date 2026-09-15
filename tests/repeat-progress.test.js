import test from 'node:test';
import assert from 'node:assert/strict';
import {attemptEligibility, recordPractice, setIdentity, priorities} from '../js/progress.js';
import {decode, encode} from '../js/codes.js';
const code='BoAkAiAg',hour=3600000,start=Date.UTC(2026,8,15,9);
const record=(id,finished,codeValue=code)=>({id,code:codeValue,finished,type:1,focus:'CA1.1',firstEarned:5,firstMax:15});

test('the four-hour gap has an exact boundary and starts from the last completion',()=>{
 const data={history:[record('first',start)]};
 assert.equal(attemptEligibility(data,code,start+4*hour-1).eligible,false);
 assert.equal(attemptEligibility(data,code,start+4*hour).eligible,true);
 assert.equal(attemptEligibility(data,code,start-1).eligible,false);
});
test('timer, order and single-question spelling cannot disguise the same questions',()=>{
 const fields=decode(code);
 assert.equal(setIdentity(code),setIdentity(encode({...fields,minutes:15,entries:fields.entries.toReversed()})));
 assert.notEqual(setIdentity(code),setIdentity(encode({...fields,entries:fields.entries.map((e,i)=>i===0?{...e,variation:0}:e)})));
 assert.equal(setIdentity('EX-3-1-1'),setIdentity(encode({...fields,entries:[fields.entries[0]]})));
});
test('early practice changes the next eligible date but not tracked results or priorities',()=>{
 const data={history:[record('first',start)]};
 const before=structuredClone(data.history),priority=priorities(data.history);
 const eligibility=attemptEligibility(data,code,start+hour);
 recordPractice(data,record('early',start+hour+60000),eligibility);
 assert.deepEqual(data.history,before);assert.deepEqual(priorities(data.history),priority);
 assert.equal(attemptEligibility(data,code,start+4*hour).eligible,false);
 assert.equal(attemptEligibility(data,code,start+5*hour+60000).eligible,true);
 const later=attemptEligibility(data,code,start+6*hour);
 recordPractice(data,record('later',start+6*hour+60000),later);
 assert.equal(data.history.length,2);
});
test('eligibility is decided when the attempt starts, not by waiting on revealed answers',()=>{
 const data={history:[record('first',start)]};
 const early=attemptEligibility(data,code,start+hour);
 recordPractice(data,record('waited',start+6*hour),early);
 assert.equal(data.history.length,1);
});
test('legacy progress without recent dates still enforces the gap; backups retain early practice dates',()=>{
 const data={history:[record('old',start)]};
 assert.equal(attemptEligibility(data,code,start+hour).eligible,false);
 recordPractice(data,record('early',start+hour),attemptEligibility(data,code,start+hour));
 const restored=JSON.parse(JSON.stringify(data));
 assert.equal(attemptEligibility(restored,code,start+4*hour).eligible,false);
 assert.equal(attemptEligibility(restored,code,start+5*hour).eligible,true);
});
