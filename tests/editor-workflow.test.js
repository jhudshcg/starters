/** Independent editor, prediction lifecycle and archive checks; no browser or student storage. */
import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import bank from '../data/python.js';
import { markQuestion } from '../js/marking.js';
import { initialRegions } from '../prototypes/pyscript/regions.js';
import { createPythonPractice } from '../src/lib/application/python-practice.js';
import { archiveCodeAttempt, mergeCodeHistory } from '../js/code-history.js';
import { backupJSON, prepareBackup } from '../js/progress-transfer.js';
import { validatePartScores } from '../js/progress.js';

const question = (slot, variation = 0) => {
  const t = bank.find((q) => q.slot === slot);
  return { ...t, ...t.variations[variation], variation };
};
function completed(q) {
  let source = q.code;
  const regions = initialRegions(source, q.livePython.regions);
  for (const r of [...regions].reverse()) {
    const p = q.parts.find((p) => p.editorRegion === r.id);
    source = source.slice(0, r.from) + p.answer + source.slice(r.to);
  }
  return source;
}
function harness(q = question(2)) {
  let now = 1000,
    pending,
    requests = [];
  const session = {
    data: { active: { id: 'attempt', answers: {}, python: {}, hints: {}, reveals: {} } },
  };
  const python = createPythonPractice({
    session,
    activeSet: () => ({ questions: [q] }),
    persist() {},
    render() {},
    clock: () => ++now,
    load: async () => ({
      createRunner: () => ({
        stop() {},
        run: (request) => {
          requests.push(request);
          return new Promise((r) => (pending = r));
        },
      }),
    }),
  });
  return {
    session,
    python,
    requests,
    finish: () =>
      pending([
        {
          label: 'Your run',
          stdout: '1\n2\n3\n4\n',
          stderr: '',
          error: null,
          value: null,
          type: 'NoneType',
          consumed: 0,
        },
      ]),
  };
}

test('all 240 adapted models compile and preserve independently authored printed answers', () => {
  const questions = bank.flatMap((t) =>
    t.variations
      .filter((v) => v.livePython?.embedded)
      .map((v, variation) => ({ ...t, ...v, variation })),
  );
  assert.equal(questions.length, 240);
  const requests = questions.map((q) => ({
    source: completed(q),
    expression: 'None',
    fixtures: q.livePython.fixtures,
    cases: [{ label: 'model', inputs: [] }],
  }));
  const actual = JSON.parse(
    execFileSync(
      'python3',
      [
        '-c',
        `import json,sys
sys.path.insert(0,'prototypes/pyscript')
from runner import run_cases
print(json.dumps([json.loads(run_cases(json.dumps(r)))[0] for r in json.load(sys.stdin)]))`,
      ],
      {
        input: JSON.stringify(requests),
        encoding: 'utf8',
        timeout: 10000,
        maxBuffer: 4 * 1024 * 1024,
      },
    ),
  );
  for (const [i, q] of questions.entries()) {
    assert.equal(
      actual[i].error,
      null,
      `${q.slot}/${q.variation}: ${JSON.stringify(actual[i].error)}`,
    );
    assert.ok(!q.code.includes('___'));
    const outputs = q.parts.filter((p) => /^Printed value|^Printed Boolean/.test(p.prompt));
    if (outputs.length)
      assert.deepEqual(
        actual[i].stdout.trim().split(/\s+/),
        outputs.map((p) => p.answer),
        `${q.slot}/${q.variation}`,
      );
    const answers = Object.fromEntries(q.parts.map((p) => [p.id, p.answer]));
    assert.ok(markQuestion(q, answers).every((r) => r.earned === r.max));
    for (const p of q.parts.filter((p) => p.editorRegion))
      assert.equal(
        markQuestion(q, { ...answers, [p.id]: '' }).find((r) => r.id === p.id).earned,
        0,
      );
  }
});

test('Run captures predictions, pauses for a rethink, preserves revisions and rejects stale results', async () => {
  const q = question(2),
    h = harness(q),
    a = h.session.data.active;
  assert.equal(await h.python.execute(2, 'run'), false);
  a.answers[2] = { code: completed(q), 3: '99', 4: ' ' };
  assert.equal(await h.python.execute(2, 'run'), false);
  assert.equal(h.requests.length, 0);
  assert.equal(a.python[2].predictions, undefined);
  a.answers[2][4] = '3';
  assert.equal(await h.python.execute(2, 'run'), false);
  assert.equal(h.requests.length, 0, 'rethink appears before execution');
  assert.equal(a.python[2].predictions[0].rethink, true);
  a.answers[2][3] = '4';
  a.answers[2][4] = '4';
  const run = h.python.execute(2, 'run');
  await new Promise(setImmediate);
  assert.equal(h.requests.length, 1);
  h.finish();
  assert.equal(await run, true);
  assert.equal(a.python[2].predictions[0].answers[3], '99');
  assert.equal(a.python[2].predictions[1].answers[3], '4');
  assert.equal(a.python[2].predictions[1].afterRun, false);
  a.answers[2][3] = '5';
  h.python.edit(2, completed(q) + '\n# changed', { regions: [] });
  const stale = h.python.execute(2, 'run');
  await new Promise(setImmediate);
  assert.equal(a.python[2].predictions[2].afterRun, true);
  assert.equal(a.python[2].predictions[2].source, completed(q) + '\n# changed');
  h.python.expression(2, 'None');
  h.finish();
  assert.equal(await stale, false);
  assert.equal(a.python[2].evidence.length, 1, 'edits retain earlier run');
});

test('a second Run accepts an incorrect prediction without duplicate snapshots or correctness gating', async () => {
  const q = question(2),
    h = harness(q),
    a = h.session.data.active;
  a.answers[2] = { code: completed(q), 3: '99', 4: '3' };
  assert.equal(await h.python.execute(2, 'run'), false);
  const run = h.python.execute(2, 'run');
  await new Promise(setImmediate);
  assert.equal(h.requests.length, 1);
  h.finish();
  assert.equal(await run, true);
  assert.equal(a.python[2].predictions.length, 1);
  assert.equal(a.python[2].predictions[0].answers[3], '99');
  assert.equal(a.python[2].predictions[0].afterRun, false);
});

test('profile changes cannot receive a previous runtime completion', async () => {
  const q = question(2),
    h = harness(q),
    a = h.session.data.active;
  a.answers[2] = { code: completed(q), 3: '4', 4: '4' };
  const run = h.python.execute(2, 'run');
  await new Promise(setImmediate);
  h.session.data = { active: { id: 'other' } };
  h.finish();
  assert.equal(await run, false);
  assert.equal(h.session.data.active.python, undefined);
});

test('six detailed attempts per variation retain all summaries, current draft and backup integrity', () => {
  const q = question(2),
    data = { active: { id: 'current' }, history: [{ id: 'old score' }] };
  function save(index, variation = 0) {
    const answers = Object.fromEntries(q.parts.map((p) => [p.id, p.answer]));
    const a = {
      id: `attempt-${index}`,
      generation: 0,
      finished: 1000 + index,
      answers: { 2: { ...answers, code: completed(q) } },
      hints: {},
      reveals: {},
      tracking: { eligible: index === 0 },
    };
    archiveCodeAttempt(
      data,
      a,
      { type: 2, questions: [{ ...q, variation }] },
      { 2: markQuestion(q, answers) },
    );
  }
  for (let i = 0; i < 8; i++) save(i);
  save(9, 1);
  assert.equal(data.codeAttempts.filter((r) => r.variation === 0).length, 6);
  assert.equal(data.codeSummaries.length, 9);
  assert.equal(data.active.id, 'current');
  assert.equal(data.history[0].id, 'old score');
  assert.equal(
    data.codeAttempts.some((r) => r.attemptId === 'attempt-0'),
    false,
  );
  const merged = mergeCodeHistory({}, structuredClone(data));
  assert.deepEqual(mergeCodeHistory(merged, structuredClone(data)), merged);
  const bad = structuredClone(data);
  bad.codeAttempts[0].original = 999;
  assert.throws(() => mergeCodeHistory(merged, bad), /invalid code history/);
  const conflict = structuredClone(data);
  conflict.codeAttempts[0].sources[0] += '\n# conflict';
  assert.throws(() => mergeCodeHistory(merged, conflict), /conflicts/);
  const wrongTotal = structuredClone(data);
  wrongTotal.codeSummaries[0].earned++;
  assert.throws(() => mergeCodeHistory({}, wrongTotal), /invalid code history/);
});

test('descriptive historical part IDs restore while malformed IDs, duplicates and totals fail', () => {
  const set = { entries: [{ slot: 36, variation: 0 }] };
  const part = {
    slot: 36,
    variation: 0,
    part: 'c0-observed',
    refs: ['task2'],
    earned: 1,
    max: 1,
    firstEarned: 0,
    firstMax: 0,
  };
  const record = {
    type: 3,
    focus: 'task2',
    earned: 1,
    max: 1,
    firstEarned: 0,
    firstMax: 0,
    partScores: [part],
  };
  assert.equal(validatePartScores(record, set), true);
  assert.equal(
    validatePartScores({ ...record, partScores: [{ ...part, part: '__proto__' }] }, set),
    false,
  );
  assert.equal(validatePartScores({ ...record, partScores: [part, part], max: 2 }, set), false);
  assert.equal(validatePartScores({ ...record, earned: 0 }, set), false);
});

test('named backups retain code evidence and merge without replacing the current draft', async () => {
  const previous = globalThis.localStorage;
  globalThis.localStorage = {
    getItem: () => null,
    setItem: () => assert.fail('Preparation must not write'),
  };
  try {
    const q = question(2),
      answers = Object.fromEntries(q.parts.map((p) => [p.id, p.answer]));
    const data = {
      schema: 1,
      username: 'Code Review Test',
      profileId: '12345678-1234-4234-8234-123456789abc',
      history: [],
      active: { id: 'current-draft' },
    };
    const a = {
      id: 'completed',
      generation: 0,
      finished: 1000,
      answers: { 2: { ...answers, code: completed(q) } },
      hints: {},
      reveals: {},
      tracking: { eligible: false },
    };
    archiveCodeAttempt(data, a, { type: 2, questions: [q] }, { 2: markQuestion(q, answers) });
    const backup = backupJSON(data),
      target = { ...data, codeAttempts: [], codeSummaries: [] };
    const { merged } = await prepareBackup(backup, target);
    assert.equal(merged.active.id, 'current-draft');
    assert.deepEqual(merged.codeAttempts, data.codeAttempts);
    assert.deepEqual(merged.codeSummaries, data.codeSummaries);
    const invalid = JSON.parse(backup);
    invalid.codeAttempts[0].sources = [];
    await assert.rejects(prepareBackup(JSON.stringify(invalid), target), /invalid code history/);
    assert.deepEqual(target.codeAttempts, []);
  } finally {
    globalThis.localStorage = previous;
  }
});
