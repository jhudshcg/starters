import test from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import all from '../data/exam-priority.js';
import {markQuestion} from '../js/marking.js';
const added=all.filter(q=>q.slot>=157);
test('follow-up models and alternatives mark correctly; likely mistakes do not',()=>{
 for(const q of added)for(const v of q.variations){
  const answers=Object.fromEntries(v.parts.map(p=>[p.id,p.answer]));
  assert.ok(markQuestion(v,answers).every(r=>r.earned===r.max));
  for(const p of v.parts){
   for(const answer of p.accepted??[])assert.equal(markQuestion(v,{...answers,[p.id]:answer})[Number(p.id)].earned,p.marks);
   assert.equal(markQuestion(v,{...answers,[p.id]:p.answer+' or incorrect'})[Number(p.id)].earned,0);
  }
 }
 const a=added.find(q=>q.slot===157).variations[0];
 assert.equal(markQuestion(a,{'0':'quantity = input()','3':'output.write(total)'})[0].earned,0);
 assert.equal(markQuestion(a,{'3':'output.write(total)'})[3].earned,0);
 assert.equal(markQuestion(a,{'2':"output = open ( 'result.txt', 'w' )"})[2].earned,1);
 const b=added.find(q=>q.slot===158).variations[0];
 assert.equal(markQuestion(b,{'1':'high','2':'if score > 80:'})[1].earned,0);
 assert.equal(markQuestion(b,{'2':'if score > 80:'})[2].earned,0);
});
test('new I/O references execute and repaired selection includes its boundary',()=>{
 const script=String.raw`
import io,json,tempfile,os
rows={q['slot']:q for q in json.loads(input())}
for v in (0,1):
 p=rows[157]['variations'][v]['parts']
 env={'input':lambda:'4' if v==0 else '2.5','print':lambda x:env.update(display=x)}
 exec(p[0]['answer'],env);exec(p[1]['answer'],env)
 assert env['display']==(12 if v==0 else 10)
 with tempfile.TemporaryDirectory() as folder:
  previous=os.getcwd();os.chdir(folder)
  try:
   with open('readings.txt','w') as f:f.write('2.5')
   exec(p[2]['answer'],env)
   env['output' if v==0 else 'source'].close()
  finally:os.chdir(previous)
 env.update(output=io.StringIO(),total=12,average=2.5)
 exec(p[3]['answer'],env);assert env['output'].getvalue()==('12' if v==0 else '2.5')
 env['source']=io.StringIO('12' if v==0 else '2.5')
 assert str(eval(p[4]['answer'],env)+1)==p[5]['answer']
 p=rows[158]['variations'][v]['parts']
 name,threshold=('score',80) if v==0 else ('total',100)
 for header in [p[2]['answer']]+p[2]['accepted']:
  for value in [threshold-1,threshold,threshold+1]:
   env={name:value,'high':False};exec(header+'\n    high = True',env)
   assert env['high']==(value>=threshold)
 values=[2,4,6] if v==0 else [3,5,7]
 assert str(sum(values[:2]))==p[4]['answer']
 env={'total':0,'count':0}
 for value in values:
  env['value']=value;exec(p[5]['answer'],env)
 assert env['total' if v==0 else 'count']==(sum(values) if v==0 else len(values))
print('Reference checks passed')`;
 assert.match(execFileSync('python3',['-c',script],{input:JSON.stringify(added),encoding:'utf8',timeout:5000}),/Reference checks passed/);
});
