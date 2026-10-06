import test from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import python from '../data/python.js';
import exam from '../data/exam.js';
import {markQuestion} from '../js/marking.js';

const pythonSlots = [9, 10, 12, 16, 26, 37, 40, 43, 55, 56, 54, 34, 35];
const examSlots = [18, 19, 20, 37, 124, 134, 161, 162];

test('revised examples execute with authored repairs, including real file contents and boundary cases', () => {
  const script = String.raw`
import contextlib, io, json, os, tempfile
from pathlib import Path
rows = json.load(__import__('sys').stdin)
with tempfile.TemporaryDirectory() as directory:
 os.chdir(directory)
 for q in rows:
  for i, v in enumerate(q['variations']):
   slot = q['slot']; p = v['parts']; code = v['code']; env = {}
   if slot in (10,16,37,40,43,56,34): code = code.replace('___', p[0]['answer'])
   if slot == 26: code = code.replace('count, name, active = record',p[0]['answer'])
   if slot == 55: code = code.replace('counts[len(counts)]','counts['+p[0]['answer']+']')
   if slot == 34: Path('readings.txt').write_text(str(i+3)+'\n8\n')
   if slot == 35:
    Path('identifier.txt').write_text('OLD')
    code = code.replace('"a"','"'+p[0]['answer']+'"')
   out = io.StringIO()
   with contextlib.redirect_stdout(out): exec(code, env)
   if slot in (12,37,40,43,34,35):
    answers = p if slot == 12 else p[1:]
    assert out.getvalue().split() == [x['answer'] for x in answers], (slot,i,out.getvalue())
   if slot == 9:
    locate = env['locate']; values = [2,4,6,8,10,12,14]
    for j,value in enumerate(values): assert locate(values,value)==j
    for values,target in [([],1),([1],1),([1],2),([1,3],3)]:
     assert locate(values,target)==(values.index(target) if target in values else -1)
   if slot == 10: assert env['values']==[int(x['answer']) for x in p[1:5]]
   if slot == 16:
    assert [type(env[k]).__name__ for k in ('value','ratio','text','is_positive','values')]==[x['answer'] for x in p[1:]]
   if slot == 26:
    assert out.getvalue().split()==[x['answer'] for x in p[1:5]]
    assert type(env['record']).__name__==p[-1]['answer']
   if slot == 55:
    assert env['counts']==[int(x['answer']) for x in p[1:4]]
    try: exec(v['code'],{})
    except IndexError: pass
    else: raise AssertionError('Expected the original index error')
   if slot == 56:
    readings=env['readings']
    assert [len(readings),readings[-1],sum(readings)]==[int(x['answer']) for x in p[1:4]]
    try: int('four')
    except ValueError: pass
    else: raise AssertionError('Expected invalid integer text')
   if slot == 54:
    assert env['readings']==[int(x['answer']) for x in p[:3]]
    assert len(env['readings'])==int(p[3]['answer'])
    assert len(env['readings'])-1==int(p[4]['answer'])
   if slot in (34,35): assert env['file'].closed
   if slot == 35:
    assert Path('identifier.txt').read_text()=='ID'+str(i+3)
    Path('identifier.txt').write_text('OLD')
    with contextlib.redirect_stdout(io.StringIO()): exec(v['code'],{})
    assert Path('identifier.txt').read_text()=='OLDID'+str(i+3)
print('Verified revised variations and boundary cases')`;
  assert.match(execFileSync('python3', ['-c', script], {
    input: JSON.stringify(python.filter(q => pythonSlots.includes(q.slot))),
    encoding: 'utf8', timeout: 10000
  }), /Verified/);
});

test('revised model answers and alternatives score; wrong answers and contradictions do not', () => {
  const questions = [...python.filter(q => [...pythonSlots,47,48,49,50].includes(q.slot)),
    ...exam.filter(q => examSlots.includes(q.slot))];
  for (const q of questions) for (const v of q.variations) {
    const answers = Object.fromEntries(v.parts.map(p => [p.id,p.answer]));
    assert.ok(markQuestion(v,answers).every(r => r.earned === r.max), q.title);
    for (const p of v.parts) {
      for (const alternative of p.accepted ?? []) {
        const result = markQuestion(v,{...answers,[p.id]:alternative});
        assert.equal(result.find(r => r.id === p.id)?.earned ?? result[v.parts.indexOf(p)].earned,p.marks);
      }
      const wrong = p.options?.find(option => option !== p.answer)
        ?? (p.kind === 'number' ? String(Number(p.answer)+10) : 'not '+p.answer);
      const result = markQuestion(v,{...answers,[p.id]:wrong});
      assert.equal(result[v.parts.indexOf(p)].earned,0,`${q.title}: ${p.prompt}`);
    }
  }
});

test('current examples need no array module, StringIO or type introspection; refinements preserve question identities', () => {
  for (const q of python.filter(q => !q.retired)) for (const v of q.variations) {
    assert.doesNotMatch(v.code ?? '', /from array|import array|StringIO|__name__/);
    assert.ok(v.code.split('\n').filter(line => line.trim() && !line.trim().startsWith('#')).length <= 12,q.title);
  }
  assert.equal(new Set(python.map(q => q.slot)).size,63);
  assert.equal(python.length,63);
  for (const slot of [34,35,54]) assert.ok(!python.find(q => q.slot===slot).retired);
  for (const slot of [34,35,54]) assert.equal(python.find(q => q.slot===slot).variations.length,5);
});
