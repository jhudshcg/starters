import test from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {readFileSync} from 'node:fs';
import {banks,choose,focuses,availableChallenges} from '../js/bank.js';
import {sameCode} from '../js/code-answer.js';
import {markQuestion} from '../js/marking.js';

test('expanded banks meet per-type counts and every challenge filter produces matching sets',()=>{
 assert.ok(banks[2].length>=50);
 for(const q of banks[2])assert.ok(q.variations.length>=5);
 for(const focus of focuses(0)){
  assert.ok(banks[0].filter(q=>q.focus===focus).length>=50,focus);
  for(const level of availableChallenges(focus)){
   const first=choose(0,focus,null,'new',level),next=choose(0,focus,first,'new',level);
   assert.equal(first.questions.length,3);
   for(const q of [...first.questions,...next.questions]){
    assert.ok(q.tags.includes(`challenge:${q.challengeLevel}`));
    if(level!=='all')assert.equal(q.challengeLevel,level);
   }
   assert.notDeepEqual(new Set(first.entries.map(e=>e.slot)),new Set(next.entries.map(e=>e.slot)));
  }
 }
 for(const focus of focuses(2))for(let i=0;i<10;i++){
  const set=choose(2,focus);assert.equal(new Set(set.questions.map(q=>q.format)).size,2);assert.ok(set.total>=10&&set.total<=15);
 }
});
test('expanded Python reference programs execute and agree with all prediction fields',()=>{
 const references=JSON.parse(readFileSync(new URL('../data/coverage/python-reference.json',import.meta.url)));
 const script=`import json,sys\npayload=json.load(sys.stdin)\nfor row in payload['references']:\n q=next(q for q in payload['bank'] if q['slot']==row['slot'])\n v=q['variations'][row['variation']]\n env={}\n exec(row['code'].rsplit('\\nprint(',1)[0],env)\n expected=[str(eval(expr,env)) for expr in row['expressions']]\n predictions=[p for p in v['parts'] if p['prompt'].startswith('Printed value')]\n for p,actual in zip(predictions,expected):\n  assert p['answer']==actual,(q['title'],row['variation'],p,actual)\nprint('Verified',len(payload['references']),'reference programs')`;
 assert.match(execFileSync('python3',['-c',script],{input:JSON.stringify({references,bank:banks[2]}),encoding:'utf8'}),/Verified 210/);
});
test('method calls and augmented floor division compare safely as tokens',()=>{
 assert.ok(sameCode('name.strip()', 'name . strip ( )'));
 assert.ok(sameCode('values.append("ok")',"values.append('ok')"));
 assert.ok(sameCode('value //= 2','value//=2'));
 assert.ok(!sameCode('value //= 2','value // = 2'));
 assert.ok(!sameCode('name.strip()','name.lower()'));
 assert.ok(!sameCode('name.strip()','name.strip();other()'));
 assert.ok(!sameCode('name.strip()','Name.strip()'));
});
test('exam expansion has varied scenarios, bounded marks and no missing answers',()=>{
 for(const q of banks[1].filter(q=>q.slot>=100)){
  assert.notEqual(q.variations[0].parts.map(p=>p.prompt).join(),q.variations[1].parts.map(p=>p.prompt).join());
  for(const v of q.variations){
   assert.ok(v.parts.length>=5&&v.parts.length<=7);
   assert.equal(new Set(v.parts.map(p=>p.prompt)).size,v.parts.length);
   for(const p of v.parts)if(p.options)assert.equal(new Set(p.options).size,p.options.length);
   assert.ok(markQuestion(v,Object.fromEntries(v.parts.map(p=>[p.id,p.answer]))).every(r=>r.earned===r.max));
  }
 }
});

test('new mathematical counting and optimisation answers agree with independent enumeration',()=>{
 const get=(slot,i)=>banks[0].find(q=>q.slot===slot).variations[i].parts.map(p=>Number(p.answer));
 for(let i=0;i<5;i++){
  const k=i+6;let pairs=0;for(let a=0;a<k;a++)for(let b=a+1;b<k;b++)pairs++;
  assert.equal(get(615,i)[1],pairs);
  const matches=[];for(let x=30*i;x<=30*i+29;x++)if(x%3===2&&x%5===2&&x%2===1)matches.push(x);
  assert.deepEqual(matches,[get(617,i)[0]]);
  const w=i+2;function routes(x,y){return x===w&&y===3?1:(x<w?routes(x+1,y):0)+(y<3?routes(x,y+1):0);}
  assert.equal(get(618,i)[1],routes(0,0));assert.equal(get(618,i)[2],routes(0,1));
  const side=i+3,counts=[0,0,0,0];for(let x=0;x<side;x++)for(let y=0;y<side;y++)for(let z=0;z<side;z++)counts[[x,y,z].filter(v=>v===0||v===side-1).length]++;
  assert.deepEqual(get(619,i),[counts[3],counts[2],counts[0]]);
  let rects=0;for(let x1=0;x1<i+2;x1++)for(let x2=x1+1;x2<=i+2;x2++)for(let y1=0;y1<i+3;y1++)for(let y2=y1+1;y2<=i+3;y2++)rects++;
  assert.equal(get(627,i)[2],rects);
  function mergeCost(values){if(values.length===1)return 0;let best=Infinity;for(let a=0;a<values.length;a++)for(let b=a+1;b<values.length;b++){const cost=values[a]+values[b];best=Math.min(best,cost+mergeCost([...values.filter((_,k)=>k!==a&&k!==b),cost]));}return best;}
  const a=i+2;assert.equal(get(633,i)[2],mergeCost([a,a,2*a,4*a]));
  const width=i+4;
  function tile(mask){if(mask===(1<<(2*width))-1)return 1;let at=0;while(mask&(1<<at))at++;let total=0;const row=Math.floor(at/width),col=at%width;for(const next of [row===0?at+width:-1,col<width-1?at+1:-1])if(next>=0&&!(mask&(1<<next)))total+=tile(mask|(1<<at)|(1<<next));return total;}
  assert.equal(get(634,i)[1],tile(0));
 }
});

test('array, match/case and validation snippets execute with their stated corrections',()=>{
 const script=`import json,sys,contextlib,io\nfor q in json.load(sys.stdin):\n for v in q['variations']:\n  code=v['code'];p=v['parts'];slot=q['slot'];env={}\n  if slot in [56,59,61]:code=code.replace('___',p[0]['answer'])\n  elif slot==55:code=code.replace('counts[len(counts)]','counts[len(counts) - 1]')\n  elif slot==58:code=code.replace('number > ','number >= ')\n  elif slot==62:code=code.replace('//','%')\n  with contextlib.redirect_stdout(io.StringIO()):exec(code,env)\n  if slot==54:assert list(env['readings'])==[int(x['answer']) for x in p[:3]]\n  elif slot==55:assert list(env['counts'])==[int(x['answer']) for x in p[1:4]]\n  elif slot==56:assert env['readings'][-1]==int(p[2]['answer'])\n  elif slot in [57,58,59,60,61]:\n   for part in p:\n    expr=part['prompt'].split(' after repair')[0]\n    if expr.startswith(('route(', 'band(', 'label(', 'valid_name(', 'valid_id(')):\n     assert str(eval(expr,env))==part['answer'],(slot,expr)\n  elif slot==62:\n   assert env['check_digit']('999')==7\n   assert env['check_digit']('000')==0\nprint('Additional snippets verified')`;
 assert.match(execFileSync('python3',['-c',script],{input:JSON.stringify(banks[2].filter(q=>q.slot>=54)),encoding:'utf8'}),/verified/);
});
