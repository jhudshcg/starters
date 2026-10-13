/** Execute authored reference repairs and assess search/list boundaries without running student input. */
import test from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import questions from '../data/python-sequences.js';
import {markQuestion} from '../js/marking.js';
test('new list/search/sort reference programs agree with every output and boundary',()=>{
 const script=String.raw`
import contextlib, io, json, sys
for q in json.load(sys.stdin):
 for i,v in enumerate(q['variations']):
  slot=q['slot']; parts=v['parts']; code=v['code']; env={}
  if slot in (65,67,70): code=code.replace('___',parts[0]['answer'])
  if slot==64: code=code.replace('items.append(incoming)','items.extend(incoming)')
  if slot==68: code=code.replace('while low < high:', 'while low <= high:')
  if slot==71: code=code.replace('index += 1','index -= 1')
  output=io.StringIO()
  with contextlib.redirect_stdout(output): exec(code,env)
  if slot in (63,64,65,66,70,71):
   expected=parts if slot in (63,66) else parts[1:4] if slot==64 else parts[1:5] if slot==65 else parts[1:]
   assert output.getvalue().split()==[p['answer'] for p in expected],(slot,i,output.getvalue())
  if slot in (67,68):
   find=env['find']
   for items in ([],[3],[1,3],[1,3,5],[1,1,3],[5,2,8,3] if slot==67 else [2,4,6,8]):
    for target in range(10):
     got=find(items,target)
     assert (got==-1 if target not in items else items[got]==target),(slot,items,target,got)
     if slot==67 and target in items: assert got==items.index(target)
   for p in parts[1:5]:
    a=i+2; env['items']=[a+6,a,a+4,a+2]
    assert str(eval(p['prompt'],env))==p['answer'],(slot,i,p)
  if slot==69:
   a=i+2;env['items']=[a+4,a,a+6,a+2]
   for p in parts: assert str(eval(p['prompt'],env))==p['answer']
   for length in range(8): assert env['checks'](list(range(length)),-1)==length
  if slot==72:
   for p in parts[:5]: assert str(eval(p['prompt'],env))==p['answer']
   for length in range(10): assert env['comparisons'](list(range(length)))==sum(range(length))
  if slot==64:
   before=env['incoming'][:]; assert len(env['items'])==4 and env['incoming']==before
   original={}
   with contextlib.redirect_stdout(io.StringIO()): exec(v['code'],original)
   assert len(original['items'])==3 and isinstance(original['items'][-1],list)
  if slot==65:
   stack=[]
   for value in [2,4,6]: stack.append(value)
   assert [stack.pop(),stack.pop(),stack.pop()]==[6,4,2]
   try: stack.pop()
   except IndexError: pass
   else: raise AssertionError('Empty pop must fail')
  if slot==66:
   assert env['jobs']==[i+8,i+4,i+6] and env['removed']==i+2
print('All 50 new variations and search/list/sort boundaries verified')`;
 assert.match(execFileSync('python3',['-c',script],{input:JSON.stringify(questions),encoding:'utf8',timeout:10000}),/verified/);
});
test('new question answers and alternatives mark correctly; plausible wrong responses fail',()=>{
 for(const q of questions)for(const v of q.variations){
  assert.equal(v.parts.reduce((sum,p)=>sum+p.marks,0),6);
  assert.ok(v.code.split('\n').filter(line=>line.trim()).length<=12,q.title);
  assert.ok(v.code.split('\n').every(line=>line.length<=64),q.title);
  const answers=Object.fromEntries(v.parts.map(p=>[p.id,p.answer]));
  assert.ok(markQuestion(v,answers).every(p=>p.earned===p.max),q.title);
  for(const [index,p] of v.parts.entries()){
   for(const answer of p.accepted??[])assert.equal(markQuestion(v,{...answers,[p.id]:answer})[index].earned,p.marks);
   const wrong=p.options?.find(value=>value!==p.answer)??(p.kind==='number'?String(Number(p.answer)+1):p.answer==='True'?'False':p.kind==='code'?'=':'True');
   assert.equal(markQuestion(v,{...answers,[p.id]:wrong})[index].earned,0,`${q.slot}: ${p.prompt}`);
  }
 }
});
