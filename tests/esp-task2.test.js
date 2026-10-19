/**
 * Purpose: Verify revised Task 2 evidence and retirement without relying on model scores alone.
 * Main contents: independent Python oracle, packed marking, live selection and old-code access.
 * Used by: node --test. Uses: authored cases, bank/marking/search and the Python fixture.
 * Libs: Node test/assert/child_process; Python standard library through a bounded subprocess.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import draft from '../data/esp-task2.js';
import { banks, choose, resolve, espRecipes, validateBank } from '../js/bank.js';
import { BANK_VERSION } from '../js/codes.js';
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

test('all draft choices mark automatically and summaries reference only student answer IDs', () => {
  const packed = packBank(draft);
  for (const [i, q] of draft.entries())
    for (const [v, question] of q.variations.entries()) {
      assert.equal(q.variations.length, 6);
      assert.equal(question.review, undefined);
      assert.ok(question.code.split('\n').length <= 30, 'Keep each investigation function-sized');
      const ids = new Set(question.parts.map((p) => p.id));
      assert.equal(ids.size, question.parts.length);
      const answers = Object.fromEntries(question.parts.map((p) => [p.id, p.answer]));
      const publicQuestion = packed[i].variations[v];
      assert.ok(markQuestion(publicQuestion, answers).every((r) => r.earned === r.max));
      for (const p of question.parts) {
        assert.equal(p.control, 'select');
        assert.equal(new Set(p.options).size, p.options.length);
        for (const wrong of ['', ...p.options.filter((o) => o !== p.answer)]) {
          assert.equal(
            markQuestion(publicQuestion, { [p.id]: wrong }).find((r) => r.id === p.id).earned,
            0,
            `${q.slot}/${v}/${p.id}: ${wrong}`,
          );
        }
      }
      const groups = publicQuestion.testPlan;
      const callerValidated = q.slot === 37 && v !== 3;
      assert.deepEqual(
        groups.map((row) => row.kind),
        callerValidated ? ['valid'] : ['valid', 'invalid'],
      );
      for (const row of groups) {
        assert.deepEqual(Object.keys(row).sort(), [
          'actionParts',
          'cases',
          'dataPart',
          'description',
          'kind',
        ]);
        assert.match(row.description, new RegExp(`^[a-z_]+: ${row.kind} inputs$`));
        assert.ok(ids.has(row.dataPart));
        for (const id of row.actionParts) assert.ok(ids.has(id));
        for (const supplied of row.cases) {
          assert.deepEqual(Object.keys(supplied).sort(), [
            'actionParts',
            'expectedPart',
            'id',
            'input',
            'label',
            'predictedPart',
          ]);
          assert.ok(!supplied.input.includes(row.description.split(':')[0]));
          for (const id of [supplied.expectedPart, supplied.predictedPart, ...supplied.actionParts])
            assert.ok(ids.has(id));
        }
      }
      if (q.slot === 36 && v === 0) {
        const sizes = groups.map((row) => answers[row.dataPart].split('; ').length);
        assert.deepEqual(sizes, [3, 5]);
        const invalid = answers[groups[1].dataPart];
        for (const label of [
          'invalid boundary',
          'other invalid, correct type',
          'invalid type/format',
        ])
          assert.ok(invalid.includes(label));
      }
    }
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
