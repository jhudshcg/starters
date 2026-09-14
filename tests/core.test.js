import test from 'node:test';
import assert from 'node:assert/strict';
import {encode,decode} from '../js/codes.js';
import {banks,resolve,choose,validateBank} from '../js/bank.js';
import {markQuestion} from '../js/marking.js';
import {appendAttempt,deadlineState,priorities,exportCSV} from '../js/progress.js';
import {execFileSync} from 'node:child_process';

test('48-bit Base64url round-trip agrees with an independent byte encoder',()=>{
 for(let version of [0,1,63,127])for(let type of [0,1,2])for(let count of [1,2,3]) {
  const fields={version,type,entries:[{slot:0,variation:0},{slot:511,variation:7},{slot:1022,variation:6}].slice(0,count),minutes:null};
  const code=encode(fields);assert.equal(code.length,8);assert.deepEqual(decode(code),fields);
  let bits=version.toString(2).padStart(7,'0')+type.toString(2).padStart(2,'0');
  for(let j=0;j<3;j++){let e=fields.entries[j]??{slot:1023,variation:0};bits+=e.slot.toString(2).padStart(10,'0')+e.variation.toString(2).padStart(3,'0');}
  assert.equal(Buffer.from(bits.match(/.{8}/g).map(b=>parseInt(b,2))).toString('base64url'),code);
 }
});
test('timer suffixes are separate from payload and preserve all durations',()=>{
 for(let minutes=5;minutes<=15;minutes++){
  const f={version:2,type:2,entries:[{slot:0,variation:0},{slot:1,variation:0}],minutes};
  assert.equal(encode(f).length,9);assert.deepEqual(decode(encode(f)),f);
 }
});
test('URL symbols, leading zero fields and case survive copying',()=>{
 const code=encode({version:127,type:2,entries:[{slot:1022,variation:7},{slot:1021,variation:7},{slot:1020,variation:7}]});
 assert.match(code,/[_-]/);assert.equal(new URL('https://example.org/#set='+code).hash.slice(5),code);
 assert.equal(encode({version:0,type:0,entries:[{slot:0,variation:0},{slot:1,variation:0},{slot:2,variation:0}]}).length,8);
 const a=encode({version:2,type:2,entries:[{slot:0,variation:0},{slot:1,variation:0}]});
 assert.notEqual(a,a.toLowerCase());assert.throws(()=>resolve(a.toLowerCase()));
});
test('invalid codes and missing content are rejected',()=>{
 for(const code of ['','abcdefg','AAAAAAAA=','AAAAAAA+','AAAAAAA/','AAAAAAAA0','AAAAAAAAa','________'])assert.throws(()=>resolve(code));
 assert.throws(()=>encode({version:128,type:0,entries:[{slot:0,variation:0}]}));
 assert.throws(()=>encode({version:2,type:0,entries:[{slot:0,variation:8}]}));
 assert.throws(()=>encode({version:2,type:0,entries:[{slot:1,variation:0},{slot:1,variation:1}]}));
 assert.throws(()=>resolve(encode({version:3,type:1,entries:[{slot:0,variation:0}]})));
 assert.throws(()=>resolve(encode({version:2,type:1,entries:[{slot:0,variation:7}]})));
});
test('question bank meets pilot content constraints',()=>assert.deepEqual(validateBank(),[]));
test('all answers mark correctly and blanks never receive marks',()=>{
 for(const q of banks.flat())for(const v of q.variations){
  assert.ok(markQuestion(v,Object.fromEntries(v.parts.map(p=>[p.id,p.answer]))).every(r=>r.earned===r.max));
  assert.ok(markQuestion(v,{}).every(r=>r.earned===0));
 }
});
test('bounded synonyms, negation, Python case and dependency marking',()=>{
 const q={parts:[{id:'0',prompt:'Name the remainder operator',answer:'modulus',accepted:['modulo','mod','%'],typos:['modulous'],marks:1,kind:'text',explanation:'Modulus returns the remainder.'},
 {id:'1',prompt:'Choose the reason',answer:'Counts complete groups',dependsOn:'0',marks:1,kind:'text',explanation:'Choose a reason.'}]};
 assert.equal(markQuestion(q,{'0':' MOD '})[0].earned,1);
 assert.equal(markQuestion(q,{'0':'not modulus'})[0].earned,0);
 assert.equal(markQuestion(q,{'0':'modulous'})[0].earned,1);
 assert.equal(markQuestion(q,{'0':'division','1':'Counts complete groups'})[1].earned,0);
 assert.equal(markQuestion(banks[2][2].variations[0],{'0':'Range'})[0].earned,0);
});
test('new permutations replace every variation but preserve templates',()=>{
 const first=choose(2,'iteration');
 const next=choose(2,'iteration',first,'permutation');
 assert.deepEqual(next.entries.map(e=>e.slot),first.entries.map(e=>e.slot));
 assert.ok(next.entries.every((e,i)=>e.variation!==first.entries[i].variation));
 assert.notDeepEqual(choose(2,'iteration',first).entries.map(e=>e.slot),first.entries.map(e=>e.slot));
 assert.throws(()=>choose(1,'CA2.1',choose(1,'CA2.1')));
 assert.notDeepEqual(choose(1,'CA2.4',choose(1,'CA2.4')).entries,choose(1,'CA2.1').entries);
});
test('all published question combinations meet mark limits',()=>{
 for(let type=0;type<3;type++)for(const focus of new Set(banks[type].map(q=>q.focus))) {
  const pool=banks[type].filter(q=>q.focus===focus&&!q.retired);
  const size=type===0?1:type===1?3:2;
  function check(start,group){
   if(group.length===size){
    for(let seed=0;seed<8;seed++) {
     const set=resolve({version:2,type,entries:group.map(q=>({slot:q.slot,variation:seed%q.variations.length})),minutes:null});
     assert.ok(set.total>0);
    }
    return;
   }
   for(let i=start;i<pool.length;i++)check(i+1,[...group,pool[i]]);
  }
  check(0,[]);
 }
});
test('deadlines survive reload and background time; submission deduplicates',()=>{
 const a=JSON.parse(JSON.stringify({deadline:10000}));
 assert.deepEqual(deadlineState(a,4000),{expired:false,remaining:6});
 assert.deepEqual(deadlineState(a,20000),{expired:true,remaining:0});
 assert.equal(deadlineState({deadline:null},20000).expired,false);
 const h=appendAttempt([],{id:'same'});assert.equal(appendAttempt(h,{id:'same'}).length,1);
});
test('revision priorities exclude puzzles and assisted first responses',()=>{
 const rows=[{type:0,focus:'spatial',firstEarned:0,firstMax:4,finished:3},{type:2,focus:'iteration',firstEarned:3,firstMax:6,finished:2},{type:2,focus:'selection',firstEarned:0,firstMax:0,finished:1}];
 assert.deepEqual(priorities(rows),[{focus:'iteration',count:1,score:50}]);
});
test('CSV quotes values and protects spreadsheet formula prefixes',()=>{
 const csv=exportCSV([{id:'=1+1',focus:'commas, "quotes"',finished:0}]);
 assert.ok(csv.includes("'=1+1"));assert.ok(csv.includes('"commas, ""quotes"""'));
});

test('Python reference outputs agree with the authored trace and countdown answers',()=>{
 for(const v of banks[2][0].variations) {
  const output=execFileSync('python3',['-c',v.code],{encoding:'utf8',timeout:2000}).trim();
  assert.equal(output,v.parts[5].answer);
  const readings=JSON.parse(v.code.match(/\[[^\]]+\]/)[0]);
  let total=Number(v.code.split('\n')[0].split('=')[1]);
  readings.forEach((r,i)=>{total+=r;assert.equal(total,Number(v.parts[i].answer));});
 }
 for(const v of banks[2][1].variations) {
  const corrected=v.code.replace('remaining +=','remaining -=');
  const output=execFileSync('python3',['-c',corrected],{encoding:'utf8',timeout:2000}).trim().split('\n');
  assert.deepEqual(output,v.parts.slice(1,5).map(p=>p.answer));
 }
});
