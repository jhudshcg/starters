import test from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import bank from '../data/exam-priority.js';
import {markQuestion} from '../js/marking.js';
const question=(slot,v)=>bank.find(q=>q.slot===slot).variations[v];
const earned=(slot,v,p,text)=>markQuestion(question(slot,v),{[p]:text})[p].earned;
test('multipart function and procedure answers assemble into executable code with correct boundaries and effects',()=>{
 const script=String.raw`
import contextlib, io, json
rows={q['slot']:q for q in json.loads(input())}
for v in (0,1):
 p=rows[149]['variations'][v]['parts']
 name='in_range' if v==0 else 'permitted'
 low,high=(2,8) if v==0 else (16,19)
 for body in [p[1]['answer']]+p[1]['accepted']:
  env={}
  exec(p[0]['answer']+'\n    '+body,env)
  for value in range(low-2,high+3): assert env[name](value)==(low<=value<=high)
  env['quantity' if v==0 else 'user_age']=high
  exec(p[4]['answer'],env)
  assert env['result'] is True
 condition=('2 <= value '+p[3]['answer']+' value <= 8') if v==0 else ('16 <= age '+p[3]['answer']+' age <= 19')
 for value in range(low-2,high+3): assert eval(condition,{'value':value,'age':value})==(low<=value<=high)
 p=rows[150]['variations'][v]['parts']
 env={'items':[4,2] if v==0 else [9,3,6],'value':7}
 original=env['items']
 exec(p[0]['answer'],env)
 assert env['items'] is original
 assert original==([4,2,7] if v==0 else [3,6,9])
 exec(p[2]['answer']+'\n    '+p[3]['answer'],env)
 env['stock' if v==0 else 'readings']=original
 output=io.StringIO()
 with contextlib.redirect_stdout(output): result=eval(p[4]['answer'],env)
 assert result is None
 assert output.getvalue().strip()==('3' if v==0 else '9')
 # Insertion and merge answers independently calculated.
 prefix,new=([3,5,7,9],1) if v==0 else ([4,6,8,10,12],2)
 assert str(sum(x>new for x in prefix))==rows[154]['variations'][v]['parts'][4]['answer']
 left,right=([2,6],[3,8]) if v==0 else ([1,7],[4,9])
 assert str(sorted(left+right)[2])==rows[155]['variations'][v]['parts'][0]['answer']
print('Passed')`;
 assert.match(execFileSync('python3',['-c',script],{input:JSON.stringify(bank),encoding:'utf8',timeout:5000}),/Passed/);
});
test('code fragments accept layout and quotes but reject wrong identifiers, syntax and behaviour',()=>{
 assert.equal(earned(149,0,0,'def in_range ( value ) :'),1);
 for(const bad of ['def in_range(value)','def in_range(Value):','in_range(value)','def in_range(value): return True'])assert.equal(earned(149,0,0,bad),0);
 assert.equal(earned(149,0,1,'return (2<=value<=8)'),1);
 for(const bad of ['return 2 < value < 8','print(2 <= value <= 8)','return 2 <= Value <= 8','return 2 <= value or value <= 8'])assert.equal(earned(149,0,1,bad),0);
 assert.equal(earned(150,0,0,'items . append ( value )'),1);
 assert.equal(earned(150,0,0,'items = items.append(value)'),0);
 assert.equal(earned(150,1,3,'print ( max ( values ) )'),1);
 assert.equal(earned(150,1,3,'return max(values)'),0);
 assert.equal(earned(150,1,3,'print(max("values"))'),0);
 assert.equal(earned(156,0,3,'totalItemCount'),1);
 assert.equal(earned(156,0,3,'TotalItemCount'),0);
});
