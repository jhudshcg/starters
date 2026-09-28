import test from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import esp from '../data/esp.js';
import {choose,resolve} from '../js/bank.js';
import {encode,decode,questionCode,parseQuestionCode,BANK_VERSION} from '../js/codes.js';
import {markQuestion} from '../js/marking.js';
import {packBank} from '../scripts/pack-bank.mjs';
import {hasUnsubmittedAnswers} from '../js/unsent-answers.js';
import {exportCSV} from '../js/progress.js';

test('ESP codes, recipe selection and coordinated permutations preserve complete independent questions',()=>{
 assert.ok(esp.length>=36);
 for(const focus of ['task1','task2'])for(let i=0;i<30;i++){
  const a=choose(3,focus),b=choose(3,focus,a),c=choose(3,focus,a,'permutation');
  assert.equal(a.questions.length,3);assert.equal(new Set(a.questions.map(q=>q.recipe)).size,1);
  assert.notEqual(a.questions[0].recipe,b.questions[0].recipe);
  assert.deepEqual(a.entries.map(e=>e.slot),c.entries.map(e=>e.slot));
  assert.equal(new Set(c.entries.map(e=>e.variation)).size,1);
  assert.notEqual(a.entries[0].variation,c.entries[0].variation);
  assert.deepEqual(decode(encode(a)).entries,a.entries);
  for(const e of a.entries){const single=resolve(questionCode(3,e.slot,e.variation));assert.equal(single.questions.length,1);assert.ok(single.questions[0].prompt);}
 }
 assert.equal(parseQuestionCode(`ESP-${BANK_VERSION}-29-4`).type,3);
 assert.throws(()=>resolve({version:BANK_VERSION,type:3,entries:[{slot:0,variation:0},{slot:1,variation:1},{slot:2,variation:0}]}),/shared variation/);
 assert.throws(()=>resolve({version:BANK_VERSION,type:3,entries:[{slot:0,variation:0},{slot:1,variation:0},{slot:3,variation:0}]}),/one recipe/);
});

test('all ESP choices reject alternatives, models survive packing, prose never contributes automatic marks',()=>{
 const packed=packBank(esp);
 for(const [i,q] of esp.entries())for(const [j,v] of q.variations.entries()){
  assert.ok(q.estimatedMinutes<=5);assert.equal(q.variations.length,5);
  const answers=Object.fromEntries(v.parts.map(p=>[p.id,p.answer]));
  assert.ok(markQuestion(packed[i].variations[j],answers).every(r=>r.earned===r.max));
  for(const p of v.parts){
   for(const wrong of (p.options??[]).filter(o=>o!==p.answer))assert.equal(markQuestion(v,{[p.id]:wrong}).find(r=>r.id===p.id).earned,0);
   assert.equal(markQuestion(v,{[p.id]:'not '+p.answer}).find(r=>r.id===p.id).earned,0);
  }
  assert.deepEqual(markQuestion(v,{...answers,reflection:'excellent reasoning'}),markQuestion(v,answers));
 }
 const q=esp[8].variations[0];
 assert.equal(hasUnsubmittedAnswers({answers:{8:{reflection:'My reason'}}},{questions:[{...q,slot:8}]}),true);
 assert.match(exportCSV([{finished:0,espReview:{8:{text:'=1+1,"reason"',status:'Needs review'}}}]),/espReview/);
});

test('original Python faults and repairs are checked with the Python interpreter, including boundaries and retries',()=>{
 const snippets=esp.slice(15).flatMap(q=>q.variations.filter(v=>v.code).map(v=>v.code));
 const code=String.raw`
import json,sys,math
sources=json.load(sys.stdin)
# Validate the authored fault representations independently of JS marking.
for source in sources:
 if source.startswith('def valid(text):\n    return len(text) >= 6'):
  ns={};exec(source,ns);assert ns['valid']('0000000') is True
 elif source.startswith('def valid(n):\n    return 1 <= n < 20'):
  ns={};exec(source,ns);assert ns['valid'](20) is False
 elif source.startswith('def valid(n):\n    return n >= 10 or n <= 50'):
  ns={};exec(source,ns);assert ns['valid'](9) is True
 elif source.startswith('def report_selected'):
  ns={};exec(source,ns);assert ns['report_selected']('2') is False
 elif source.startswith('def valid(text):\n    return len(text) > 0'):
  ns={};exec(source,ns);assert ns['valid']('   ') is True
 elif source.startswith('def valid(text):\n    return text.isalpha()'):
  ns={};exec(source,ns);assert ns['valid']('Ada')
  exec(source.replace('text.isalpha()','text.isascii() and text.isalpha() and text.islower()'),ns)
  assert [ns['valid'](x) for x in ['abc','Ada','é','','a1']]==[True,False,False,False,False]
 elif source.startswith('again ='):
  entries=iter(['no','yes']);calls=[]
  def read(prompt): calls.append(prompt);return next(entries)
  ns={'input':read};exec(source,ns);assert calls==[]
  exec(source.replace('again = False','again = True'),ns);assert len(calls)==2 and not ns['again']
 elif source.startswith('def valid(text):\n    cleaned'):
  ns={};exec(source,ns);assert ns['valid']('   ') is True
  exec(source.replace('bool(text)','bool(cleaned)'),ns);assert not ns['valid']('   ') and ns['valid'](' Ada ')
 elif source.startswith('def amount'):
  ns={};exec(source,ns)
  try: ns['amount']('12.50');raise AssertionError('conversion should fail')
  except ValueError: pass
  exec(source.replace('int(text)','float(text)'),ns);assert ns['amount']('12.50')==12.5
 elif source.startswith('def grow'):
  ns={};exec(source.replace('range(1, 5)','range(5)'),ns);assert math.isclose(ns['grow'](100),121.66529024)
 elif source.startswith('def positive'):
  try: compile(source,'case','exec');raise AssertionError('colon should be required')
  except SyntaxError: pass
  ns={};exec(source.replace('def positive(n)','def positive(n):'),ns);assert ns['positive'](1) and not ns['positive'](0)
 elif source.startswith('answer =') or source.startswith('text ='):
  name='answer' if source.startswith('answer') else 'text'
  word='yes' if name=='answer' else source.split('!= "')[1].split('"')[0]
  lines=source.splitlines();lines[-1]='    '+name+' = '+lines[-1].strip()
  entries=iter(['wrong',word]);calls=[]
  def read(prompt): calls.append(prompt);return next(entries)
  ns={'input':read};exec('\n'.join(lines),ns);assert ns[name]==word and len(calls)==2
 else: raise AssertionError('Unverified snippet: '+source)
# Corrected validation contracts: include valid, invalid and adjacent boundaries.
assert [len(x)==6 for x in ['00000','000000','0000000']]==[False,True,False]
assert [1<=x<=20 for x in [0,1,19,20,21]]==[False,True,True,True,False]
assert [10<=x<=50 for x in [9,10,30,50,51]]==[False,True,True,True,False]
`;
 execFileSync('python3',['-c',code],{input:JSON.stringify(snippets),timeout:10000});
});

test('planning answers agree with independently enumerated working days and accounting sums',()=>{
 for(let v=0;v<5;v++){
  const values=slot=>esp[slot].variations[v].parts.map(p=>Number(p.answer));
  const db=Array.from({length:2+v},(_,i)=>i+1),ui=Array.from({length:3+v%2},(_,i)=>db.at(-1)+i+1);
  assert.equal(values(0)[0],ui[0]);assert.equal(values(0)[1],ui.at(-1)+2);
  const developer=Array(21+7*v).fill(30+5*v).reduce((a,b)=>a+b,0);
  const manager=Array(10+v).fill(180).reduce((a,b)=>a+b,0);
  assert.deepEqual(values(3),[developer,manager,developer+manager+1200+100*v]);
  const income=10000+2000*v,cost=7000+500*v;
  assert.deepEqual(values(5),[income-cost-1000,income+income*(5+v)/100,(income-cost-1000)+(income+income*(5+v)/100-cost)]);
  assert.equal(values(12)[1],(14+7*v)*40);
  assert.equal(values(12)[2],(14+7*v)*40+(5+v)*200+500);
 }
});
