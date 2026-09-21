import test from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import ca1 from '../data/exam-depth-ca1.js';
import ca2 from '../data/exam-depth-ca2.js';
import testing from '../data/exam-depth-testing.js';
import {markQuestion} from '../js/marking.js';
const added = [...ca1, ...ca2, ...testing];
const variation = (slot, index) => added.find(q => q.slot === slot).variations[index];
const earned = (slot, index, part, answer) => markQuestion(variation(slot, index), {[part]: answer})[part].earned;

test('new complete snippets and collection, file, operator and algorithm answers agree with Python execution', () => {
  const script = String.raw`
import contextlib, io, json, tempfile
from pathlib import Path
from array import array
rows = {q['slot']: q for q in json.loads(input())}
def part(slot, v, p):
    return rows[slot]['variations'][v]['parts'][p]
def check(slot, v, p, value):
    actual = str(value)
    expected = str(part(slot, v, p)['answer'])
    assert actual == expected, (slot, v, p, actual, expected)
for v in (0, 1):
    for slot in (129, 133, 137, 138):
        env = {}
        output = io.StringIO()
        with contextlib.redirect_stdout(output):
            exec(rows[slot]['variations'][v]['code'], env)
        if slot == 129:
            check(slot, v, 1, output.getvalue().strip())
            check(slot, v, 2, sum(x > 0 if v == 0 else x < 0 for x in env['values']))
        elif slot == 133:
            check(slot, v, 0, env['result'])
            check(slot, v, 1, output.getvalue().strip())
        elif slot == 137:
            check(slot, v, 0, env['count'])
            check(slot, v, 1, env['remaining'])
        else:
            check(slot, v, 0, env['result'])
            broken = rows[slot]['variations'][v]['code'].replace('return amount * 3', 'print(amount * 3)').replace('return amount + 10', 'print(amount + 10)')
            with contextlib.redirect_stdout(output): exec(broken, env)
            check(slot, v, 3, env['result'])
    check(126, v, 1, (37 + 4 <= 40) if v == 0 else (85 + 15 <= 100))
    checks = ([3 - 8, 8 / 2, '4' + '2', 4 > 9] if v == 0 else [2 - 9, 9 / 3, '1' + '8', 7 == 7])
    names = {int: 'integer', float: 'float', str: 'string', bool: 'Boolean'}
    for p, value in enumerate(checks): check(132, v, p, names[type(value)])
    items = [4, 7, 9] if v == 0 else [3, 8]
    items[1 if v == 0 else 0] = 2 if v == 0 else 5
    items.append(6 if v == 0 else 9)
    check(134, v, 0, len(items))
    stock = {'A': 4, 'B': 7} if v == 0 else {'C': 3, 'D': 8}
    stock['A' if v == 0 else 'C'] = 6 if v == 0 else 9
    check(134, v, 1, stock['B' if v == 0 else 'D'])
    values = array('i', [3, 6, 9] if v == 0 else [4, 7, 10])
    values[1] += 2 if v == 0 else 3
    check(134, v, 3, values[1])
    check(135, v, 1, 4 * (6 if v == 0 else 8) + (5 if v == 0 else 2))
    check(135, v, 3, (18 >= 16 and 18 <= 18) if v == 0 else (12 >= 4 and 12 <= 12))
    check(135, v, 5, not (False if v == 0 else True))
    with tempfile.TemporaryDirectory() as directory:
        path = Path(directory) / 'file.txt'
        path.write_text('old' if v == 0 else 'first')
        with path.open('w') as stream: stream.write('new' if v == 0 else 'last')
        check(136, v, 0, path.read_text())
    stream = io.StringIO()
    for value in ('A', 'B') if v == 0 else ('X', 'Y'): stream.write(value)
    check(136, v, 1, stream.getvalue())
    stream = io.StringIO('red\nblue\n' if v == 0 else 'green\ngold\n')
    stream.readline()
    check(136, v, 2, stream.readline().strip())
    divisor = 2
    env = {'first': 4, 'second': 8, 'minimum': 4, 'maximum': 8}
    assert eval(part(140, v, 1)['answer'], env) == 6
    env = {'total': 0, 'count': 0}
    for value in [3, 0, -1]:
        env['value'] = value
        exec(part(141, v, 4)['answer'], env)
    assert env['total' if v == 0 else 'count'] == (2 if v == 0 else 3)
    searched = [9, 2, 7, 4, 1] if v == 0 else [8, 3, 6, 1]
    check(142, v, 0, searched[2 if v == 0 else 1])
    observations = [1, 1, 1, 5] if v == 0 else [2, 2, 2, 6]
    check(142, v, 1, sum(observations) // len(observations))
    prefix, value = ([1, 3, 4, 7], 5) if v == 0 else ([2, 4, 6, 9], 8)
    check(142, v, 4, sum(x > value for x in prefix))
    left, right = ([2, 8], [3, 5]) if v == 0 else ([4, 9], [1, 7])
    check(142, v, 5, ', '.join(map(str, sorted(left + right)[:2])))
    check(143, v, 0, (2 if v == 0 else 5) - 1)
    lower, upper = (2, 8) if v == 0 else (5, 20)
    valid = [part(143, v, 5)['answer']] + part(143, v, 5)['accepted']
    assert {int(x) for x in valid} == set(range(lower + 1, upper))
    workloads, times, limit = ([100, 200, 300], [0.5, 1.8, 4], 2) if v == 0 else ([250, 500, 750], [1, 2.6, 5], 3)
    check(146, v, 2, max(n for n, time in zip(workloads, times) if time <= limit))
    check(147, v, 2, min(n for n in range(20) if (n >= 10 if v == 0 else n > 4)))
print('Independent reference checks passed')
`;
  assert.match(execFileSync('python3', ['-c', script], {
    input: JSON.stringify(added), encoding: 'utf8', timeout: 5000
  }), /Independent reference checks passed/);
});

test('new marking distinguishes values, names, boundaries and plausible contradictory answers', () => {
  assert.equal(earned(132, 0, 3, 'It is a Boolean.'), 1);
  for (const answer of ['False', 'integer', 'Boolean or integer', 'booleanish']) assert.equal(earned(132, 0, 3, answer), 0);
  assert.equal(earned(131, 0, 1, 'why was memory exhausted?'), 1);
  assert.equal(earned(131, 0, 1, 'why was memory not exhausted?'), 0);
  assert.equal(earned(134, 0, 4, '-1'), 1);
  assert.equal(earned(134, 0, 4, 'len(items)'), 0);
  assert.equal(earned(138, 0, 3, 'None'), 1);
  for (const answer of ['12', 'none', '0']) assert.equal(earned(138, 0, 3, answer), 0);
  assert.equal(earned(140, 0, 5, 'failed_attempt_count'), 1);
  for (const answer of ['failedAttemptCount', 'failed attempt count', 'failed_attempt_count or x']) assert.equal(earned(140, 0, 5, answer), 0);
  assert.equal(earned(143, 0, 5, '2'), 0);
  assert.equal(earned(143, 0, 5, '8'), 0);
  assert.equal(earned(143, 0, 5, '7.0'), 1);
  assert.equal(earned(143, 0, 2, 'reject'), 0);
  assert.equal(earned(143, 0, 2, 'accept'), 1);
});

test('new linked reasons depend on their associated strategy rather than any answered part', () => {
  for (const v of [0, 1]) {
    const q = variation(130, v);
    const all = Object.fromEntries(q.parts.map(p => [p.id, p.answer]));
    assert.ok(markQuestion(q, all).every(r => r.earned === r.max));
    const results = markQuestion(q, {...all, 0: 'bottom-up', 2: 'top-down'});
    assert.equal(results[1].earned, 0);
    assert.equal(results[3].earned, 0);
    assert.equal(results[4].earned, 1);
  }
});
