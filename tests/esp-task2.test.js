/**
 * Purpose: Verify revised Task 2 evidence and retirement without relying on model scores alone.
 * Main contents: independent Python oracle, packed marking, live selection and old-code access.
 * Used by: node --test. Uses: authored cases, bank/marking/search and the Python fixture.
 * Libs: Node test/assert/child_process; Python standard library through a bounded subprocess.
 */
import test from 'node:test';
import {
  studentCases,
  studentTest,
  testReferenceRequest,
  recordedOutcome,
} from '../js/task2-tests.js';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import draft from '../data/esp-task2.js';
import { banks, choose, resolve, espRecipes, validateBank } from '../js/bank.js';
import { BANK_VERSION } from '../js/codes.js';
import { pythonRequest, assessPython } from '../js/live-python.js';
import { markQuestion } from '../js/marking.js';
import { packBank } from '../scripts/pack-bank.mjs';
import { searchGroups } from '../js/search.js';
import { activityModel } from '../src/lib/application/activity-model.js';

const individual = (slot, variation) =>
  resolve({
    version: BANK_VERSION,
    type: 3,
    entries: [{ slot, variation }],
    minutes: null,
  });

test('function-sized Task 2 code is allowed without relaxing ordinary Python limits', () => {
  const investigation = banks[3].find((q) => q.slot === 36).variations[0];
  const python = banks[2][0].variations[0];
  const originals = [investigation.code, python.code];
  const lineErrors = () => validateBank().filter((error) => error.endsWith('too many lines'));
  try {
    investigation.code = Array(30).fill('value = 1').join('\n');
    assert.deepEqual(lineErrors(), []);
    investigation.code += '\nvalue = 2';
    assert.equal(lineErrors().length, 1);
    investigation.code = originals[0];
    python.code = Array(13).fill('value = 1').join('\n');
    assert.equal(lineErrors().length, 1);
  } finally {
    [investigation.code, python.code] = originals;
  }
});

test('Task 2 predictions, requirements and selected repairs match independent Python execution', () => {
  const cases = draft.flatMap((q) =>
    q.variations.map((v, i) => ({
      id: `${q.slot}-${i}`,
      code: v.code,
      parts: v.parts,
      testPlan: v.testPlan,
    })),
  );
  const result = execFileSync(
    'python3',
    [fileURLToPath(new URL('./fixtures/esp-task2.py', import.meta.url))],
    {
      input: JSON.stringify(cases),
      encoding: 'utf8',
      timeout: 10000,
    },
  );
  assert.match(
    result,
    /[1-9]\d+ independent execution checks; all 18 prediction\/expectation\/repair keys match/,
  );
});

const execute = (request) =>
  JSON.parse(
    execFileSync(
      'python3',
      [
        '-c',
        "import sys;sys.path.insert(0,'prototypes/pyscript');from runner import run_cases;print(run_cases(sys.stdin.read()))",
      ],
      {
        input: JSON.stringify(request),
        encoding: 'utf8',
        timeout: 5000,
      },
    ),
  );

function completedPlan(question, answers) {
  const reference = testReferenceRequest(question, answers);
  const expected = execute(reference);
  const actual = execute({ ...reference, source: question.code });
  const testReferences = reference.cases.map((c, i) => ({
    caseId: c.label,
    expression: c.expression,
    inputs: c.inputs,
    observation: expected[i],
  }));
  const evidence = testReferences.map((r, i) => ({
    ...r,
    source: question.code,
    document: 'original',
    observation: actual[i],
  }));
  for (const c of studentCases(question)) {
    const index = reference.cases.findIndex((r) => r.label === c.id);
    answers[c.expectedPart] = JSON.stringify(recordedOutcome(expected[index]));
    answers[c.actualPart] = JSON.stringify(recordedOutcome(actual[index]));
  }
  return { testReferences, evidence };
}

test('all 18 student test plans survive packing and require exact original run evidence', () => {
  const packed = packBank(draft);
  for (const [i, q] of draft.entries())
    for (const [v, question] of q.variations.entries()) {
      const answers = Object.fromEntries(question.parts.map((p) => [p.id, p.answer]));
      answers.code = question.parts.find((p) => p.kind === 'python').answer;
      const plan = completedPlan(question, answers);
      const execution = {
        ...plan,
        source: answers.code,
        revision: question.livePython.revision,
        parts: assessPython(question, execute(pythonRequest(question, answers.code))),
      };
      const publicQuestion = packed[i].variations[v];
      const result = markQuestion(publicQuestion, answers, execution);
      assert.ok(
        result.every((r) => r.earned === r.max),
        `${q.slot}/${v}: ${JSON.stringify(result)}`,
      );
      for (const p of question.parts) {
        if (p.options)
          for (const wrong of p.options.filter((o) => o !== p.answer))
            assert.equal(
              markQuestion(publicQuestion, { ...answers, [p.id]: wrong }, execution).find(
                (r) => r.id === p.id,
              ).earned,
              0,
            );
        if (p.testRole === 'actual') {
          for (const evidence of [
            [],
            plan.evidence.map((r) => ({ ...r, document: 'edited' })),
            plan.evidence.map((r) => ({ ...r, inputs: [...r.inputs, 'changed'] })),
          ])
            assert.equal(
              markQuestion(publicQuestion, answers, { ...execution, evidence }).find(
                (r) => r.id === p.id,
              ).earned,
              0,
            );
        }
      }
      const ids = new Set(question.parts.map((p) => p.id));
      assert.equal(ids.size, question.parts.length);
      for (const row of question.testPlan) {
        assert.ok(ids.has(row.dataPart));
        for (const c of row.cases)
          for (const id of [c.expectedPart, c.actualPart, ...c.actionParts]) assert.ok(ids.has(id));
      }
    }
});

test('students can choose new values; invalid suites must finish, and changed inputs invalidate old checks', () => {
  const q = draft[0].variations[1];
  const answers = {
    'valid-own-inputs': JSON.stringify({ c1: { inputs: ['0098'] } }),
    'invalid-own-inputs': JSON.stringify({ c0: { inputs: ['', ' 1234 ', '٠٠٠١', '0089'] } }),
  };
  const execution = completedPlan(q, answers);
  const tests = () =>
    markQuestion(q, answers, execution).filter((r) => q.parts.find((p) => p.id === r.id).testRole);
  assert.ok(tests().every((r) => r.earned === r.max));
  answers['c0-own-expected'] = JSON.stringify({ type: 'str', value: '89', consumed: '4' });
  assert.equal(tests().find((r) => r.id === 'c0-own-expected').earned, 0, 'leading zeros matter');
  answers['valid-own-inputs'] = JSON.stringify({ c1: { inputs: ['1234'] } });
  assert.equal(tests().find((r) => r.id === 'valid-own-inputs').earned, 0);
  assert.equal(tests().find((r) => r.id === 'c1-own-actual').earned, 0);
  answers['invalid-own-inputs'] = JSON.stringify({ c0: { inputs: ['abcd'] } });
  const unfinished = completedPlan(q, answers);
  assert.equal(
    markQuestion(q, answers, unfinished).find((r) => r.id === 'invalid-own-inputs').earned,
    0,
  );
});

test('named argument fields build safe calls and assess novel calculations', () => {
  const q = draft[1].variations[0];
  const answers = {
    'valid-own-inputs': JSON.stringify({ c0: { args: { prices: '7, 11, 2', delivery: 'False' } } }),
  };
  assert.equal(studentTest(q, answers, 'c0').expression, 'order_total([7,11,2], False)');
  const execution = completedPlan(q, answers);
  assert.deepEqual(JSON.parse(answers['c0-own-expected']), {
    type: 'int',
    value: '20',
    consumed: '0',
  });
  assert.ok(
    markQuestion(q, answers, execution)
      .filter((r) => q.parts.find((p) => p.id === r.id).testRole)
      .every((r) => r.earned === r.max),
  );
  answers['valid-own-inputs'] = JSON.stringify({
    c0: { args: { prices: '__import__("os")', delivery: 'False' } },
  });
  assert.throws(() => studentTest(q, answers, 'c0'), /comma-separated/);
});

test('retired Task 2 questions keep their codes while selection, recall and search use the draft', () => {
  assert.deepEqual(espRecipes('task2'), ['T2.6']);
  assert.deepEqual(
    banks[3].filter((q) => q.focus === 'task2' && !q.retired).map((q) => q.slot),
    [36, 37, 38],
  );
  for (let slot = 15; slot <= 29; slot++)
    for (let variation = 0; variation < 5; variation++) {
      assert.equal(individual(slot, variation).questions[0].retired, true);
    }
  for (const recipe of ['T2.1', 'T2.2', 'T2.3', 'T2.4', 'T2.5']) {
    assert.equal(choose(3, 'task2', null, 'new', 'all', recipe).questions[0].recipe, 'T2.6');
  }
  assert.throws(() => choose(3, 'task2', null, 'new', 'all', 'unknown'));
  for (let variation = 0; variation < 6; variation++) {
    const full = resolve({
      version: BANK_VERSION,
      type: 3,
      entries: [36, 37, 38].map((slot) => ({ slot, variation })),
      minutes: null,
    });
    for (const previous of [full, individual(36, variation)]) {
      assert.equal(activityModel(previous, {}, {}).sameFocusAlternatives, true);
      for (const mode of ['new', 'permutation']) {
        const next = choose(3, 'task2', previous, mode);
        assert.notEqual(next.entries[0].variation, variation);
        assert.equal(new Set(next.entries.map((e) => e.variation)).size, 1);
        assert.equal(next.questions.length, mode === 'new' ? 3 : previous.questions.length);
        assert.ok(next.questions.every((q) => !q.retired));
      }
    }
  }
  const groups = searchGroups(banks[3], 3, 'validation');
  assert.ok(groups.length);
  assert.ok(groups.every((g) => g.recipe === 'T2.6' && g.questions.every((q) => !q.retired)));
});

test('practice checks requirement expectations independently of broken student code and captures pre-run expectations', async () => {
  const { createPythonPractice } = await import('../src/lib/application/python-practice.js');
  const q = { ...draft[2].variations[5], slot: 38 };
  const a = {
    id: 'own-tests',
    answers: {
      38: {
        'valid-own-inputs': JSON.stringify({ c1: { inputs: ['yes'] } }),
        'invalid-own-inputs': JSON.stringify({ c0: { inputs: ['perhaps', 'yes'] } }),
      },
    },
    python: {},
  };
  const session = { data: { active: a } },
    requests = [];
  const service = createPythonPractice({
    session,
    activeSet: () => ({ questions: [q] }),
    persist() {},
    render() {},
    clock: () => 1000,
    load: async () => ({
      createRunner: () => ({
        stop() {},
        run: async (request) => {
          requests.push(request);
          return execute(request);
        },
      }),
    }),
  });
  assert.equal(
    await service.execute(38, 'run', false, { document: 'original', caseId: 'c0' }),
    false,
  );
  assert.equal(requests.length, 0);
  a.answers[38]['c0-own-expected'] = JSON.stringify({ type: 'str', value: 'yes', consumed: '2' });
  assert.equal(
    await service.execute(38, 'run', false, { document: 'original', caseId: 'c0' }),
    true,
  );
  const run = a.python[38].evidence[0];
  assert.deepEqual(run.inputs, ['perhaps', 'yes']);
  assert.equal(run.source, q.code);
  assert.equal(run.expected, a.answers[38]['c0-own-expected']);
  a.answers[38]['c0-own-actual'] = JSON.stringify({ type: 'str', value: '', consumed: '0' });
  assert.equal(await service.execute(38, 'check'), true);
  assert.notEqual(
    requests[1].source,
    q.code,
    'expectations use the reference, not defective student code',
  );
  assert.equal(requests[2].source, q.code);
  const results = markQuestion(q, a.answers[38], a.python[38].result);
  for (const id of ['valid-own-inputs', 'invalid-own-inputs', 'c0-own-expected', 'c0-own-actual'])
    assert.equal(results.find((r) => r.id === id).earned, 1, id);
  assert.equal(results.find((r) => r.id === 'd0-repair').earned, 0);
  service.edit(38, q.code + '\n# edit', null);
  assert.equal(
    markQuestion(q, a.answers[38], a.python[38].result).find((r) => r.id === 'c0-own-expected')
      .earned,
    1,
  );
  service.dispose();
});
