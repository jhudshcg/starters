/** Execute authored live tasks independently; verify typed results and selection. */
import test from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import live from '../data/python-live.js';
import {pythonRequest, assessPython, pythonResults, pythonModes} from '../js/live-python.js';
import {choose, resolve} from '../js/bank.js';
import {packBank} from '../scripts/pack-bank.mjs';
import {initialRegions} from '../prototypes/pyscript/regions.js';

test('all forty live models pass independent expectations; faulty and alternative code are distinguished', () => {
  const requests = live.flatMap(q=>q.variations.flatMap(v=>[
    pythonRequest(v,v.parts[0].answer), pythonRequest(v,v.code),
    pythonRequest(v,`def ${v.livePython.function}(*args):\n    return None`),
  ]));
  const observations=JSON.parse(execFileSync('python3',['-c',`import sys,json
sys.path.insert(0, 'prototypes/pyscript')
from runner import run_cases
print(json.dumps([json.loads(run_cases(json.dumps(r))) for r in json.load(sys.stdin)]))`],{input:JSON.stringify(requests),encoding:'utf8',timeout:10000,maxBuffer:8*1024*1024}));
  let n=0;
  for(const q of live)for(const v of q.variations){
    assert.ok(assessPython(v,observations[n++]).every(r=>r.earned===r.max),q.title);
    assert.ok(assessPython(v,observations[n++]).some(r=>r.earned<r.max),q.title);
    assert.ok(assessPython(v,observations[n++]).every(r=>r.earned===0),q.title);
    assert.equal(initialRegions(v.code,v.livePython.regions).length,v.livePython.regions.length);
    assert.ok(v.code.split('\n').length<=12);
  }
  const q=live[0].variations[0], source='def count_readings(readings):\n    return sum(1 for x in readings if 1 <= x <= 8)';
  const actual=JSON.parse(execFileSync('python3',['-c',`import sys;sys.path.insert(0,'prototypes/pyscript');from runner import run_cases;print(run_cases(sys.stdin.read()))`],{input:JSON.stringify(pythonRequest(q,source)),encoding:'utf8',timeout:3000}));
  assert.ok(assessPython(q,actual).every(r=>r.earned===r.max));
  assert.ok(assessPython(q,actual.map(r=>({...r,type:'bool'}))).every(r=>r.earned===0));
});

test('eligible focus sets include live code without changing paper question identities or sealing',()=>{
  for(const q of live)for(let i=0;i<12;i++){
    const set=choose(2,q.focus);
    assert.ok(set.questions.some(q=>q.livePython));
    assert.equal(new Set(set.questions.map(q=>q.format)).size,2);
    assert.equal(resolve(set.code).code,set.code);
  }
  for(const q of packBank(live))for(const v of q.variations){
    assert.ok(v.parts.every(p=>!p.pythonTests&&!p.answer));
    assert.deepEqual(pythonRequest(v,v.code),pythonRequest(live.find(x=>x.slot===q.slot).variations[q.variations.indexOf(v)],v.code));
  }
  const q=live[0].variations[0];
  assert.equal(pythonModes(q,'beginner').defaultMode,'choices');
  assert.equal(pythonModes(q,'foundation').defaultMode,'regions');
  assert.ok(!pythonModes(q,'standard').modes.includes('choices'));
  assert.ok(pythonModes(q,'standard',true).modes.includes('choices'));
  assert.ok(pythonResults(q,{code:'changed'},{source:q.code,revision:1,parts:[]}).every(r=>r.pending));
});
