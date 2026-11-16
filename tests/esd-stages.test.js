/** Exercise staged evidence capture, portable answer formats and independent ESD arithmetic. */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import drafts from '../packages/puzzles/data/esd.js';
import { markPart, evaluatePuzzle } from '../packages/puzzles/evaluation.js';
import { logicRule } from '../packages/puzzles/rules/challenge-rules.js';
import { renderPart } from '../packages/puzzles/ui/render.js';
import { packBank } from '../scripts/pack-bank.mjs';
import { markQuestion } from '../js/marking.js';
import { resolve, puzzlePool } from '../js/bank.js';
import { BANK_VERSION } from '../js/codes.js';
import { searchGroups } from '../js/search.js';
import { createPractice } from '../src/lib/application/practice.js';
const starter = drafts[0].variations[0],
  longer = drafts[1].variations[0];
const answers = (q) => Object.fromEntries(q.parts.map((p) => [p.id, p.answer]));
function fixture(code) {
  const session = { data: { schema: 1, history: [], active: null }, storageOK: true, persist() {} };
  const practice = createPractice({
    session,
    navigation: { remember() {}, async go() {} },
    render() {},
    toast() {},
    clearToast() {},
    confirm: async () => true,
    visible: () => true,
    focus() {},
    uuid: () => 'esd-test',
  });
  return {
    session,
    practice,
    set: resolve({
      version: BANK_VERSION,
      type: 0,
      entries: [{ slot: code, variation: 0 }],
      minutes: null,
    }),
  };
}

test('grid clues are independently necessary and the staged shortlist is unique', () => {
  const p = starter.parts[0],
    permutations = [];
  for (const a of [0, 1, 2, 3])
    for (const b of [0, 1, 2, 3])
      for (const c of [0, 1, 2, 3])
        for (const d of [0, 1, 2, 3])
          if (new Set([a, b, c, d]).size === 4) permutations.push([a, b, c, d]);
  const solutions = (rules) =>
    permutations.filter((values) => rules.every((rule) => logicRule(rule, [values])));
  assert.deepEqual(solutions(p.rules), [[2, 0, 3, 1]]);
  for (let i = 0; i < p.rules.length; i++)
    assert.ok(solutions(p.rules.filter((_, j) => i !== j)).length > 1);
  const costs = [12, 8, 16, 9],
    savings = [6000, 27000, 21000, 10000],
    pairs = [
      [0, 1],
      [0, 2],
      [0, 3],
      [1, 2],
      [1, 3],
      [2, 3],
    ];
  const affordable = pairs.filter(([a, b]) => costs[a] + costs[b] <= 24);
  assert.deepEqual(affordable, [
    [0, 1],
    [0, 3],
    [1, 2],
    [1, 3],
  ]);
  assert.deepEqual(
    affordable.filter(([a, b]) => savings[a] + savings[b] >= 40000),
    [[1, 2]],
  );
});

test('the longer linked grids have one solution and each distinct clue is necessary', () => {
  const grid = longer.parts.find((p) => p.id === 'costs'),
    permutations = [];
  for (const a of [0, 1, 2])
    for (const b of [0, 1, 2])
      for (const c of [0, 1, 2]) if (new Set([a, b, c]).size === 3) permutations.push([a, b, c]);
  const candidates = permutations.flatMap((build) => permutations.map((annual) => [build, annual]));
  const clues = [
    ([build]) => build[0] !== 0,
    ([build]) => build[0] < build[1],
    ([build, annual]) => annual[build.indexOf(0)] === 2,
    ([build, annual]) => Number(build[1] === 2) + Number(annual[1] === 0) === 1,
  ];
  const solutions = candidates.filter((values) => clues.every((clue) => clue(values)));
  assert.deepEqual(solutions, [
    [
      [1, 2, 0],
      [0, 1, 2],
    ],
  ]);
  assert.equal(grid.answer, JSON.stringify(solutions[0]));
  assert.deepEqual(
    clues.map(
      (_, i) =>
        candidates.filter((values) => clues.every((clue, j) => i === j || clue(values))).length,
    ),
    [3, 2, 4, 2],
  );
  for (const values of candidates)
    assert.equal(
      grid.rules.every((rule) => logicRule(rule, values)),
      clues.every((clue) => clue(values)),
    );
  const html = renderPart(grid);
  assert.equal((html.match(/class="candidate-table"/g) || []).length, 2);
  assert.equal((html.match(/<span>Plan<\/span>/g) || []).length, 2);
  assert.equal(evaluatePuzzle(longer, answers(longer)).earned, 11);
});

test('food and electrical plans follow independently from the stated costs and flows', () => {
  const totals = [12 + 5 * 0.5, 20 + 5 * 1.4, 6 + 5 * (1.2 + 0.5)];
  assert.deepEqual(totals, [14.5, 27, 14.5]);
  const supply = 26000 - 2000;
  const processed = [30000, 45000, 20000].map((capacity) => Math.min(capacity, supply));
  assert.deepEqual(processed, [24000, 24000, 20000]);
  const savings = processed.map((value, i) => value * 0.7 + (i === 2 ? 5000 * 1.7 : 0));
  assert.deepEqual(savings, [16800, 16800, 22500]);
  assert.deepEqual(
    totals.map((cost, i) => cost <= 25 && savings[i] >= 20000),
    [false, false, true],
  );
  assert.equal(evaluatePuzzle(longer, answers(longer)).earned, 11);
});

test('checkbox marking rejects all-selected, duplicates, partial lists and malformed input', () => {
  const p = starter.parts[1];
  assert.equal(markPart(p, JSON.stringify(JSON.parse(p.answer).reverse())).earned, 1);
  for (const wrong of [
    JSON.stringify(p.options),
    '[]',
    'not json',
    JSON.stringify([p.options[0]]),
    JSON.stringify([p.options[0], p.options[0]]),
    JSON.stringify(['invented', p.options[2]]),
  ])
    assert.equal(markPart(p, wrong).earned, 0, wrong);
  assert.match(renderPart(p, p.answer), /type="checkbox"/);
  assert.equal((renderPart(p, p.answer).match(/checked/g) || []).length, 4);
});

test('multiple-selection feedback identifies correct choices, omissions and incorrect extras', () => {
  const p = starter.parts.find((p) => p.id === 'budget');
  const selected = ['Glass + Plastics', 'Plastics + Food', 'Plastics + Garden'];
  const result = markPart(p, JSON.stringify(selected));
  assert.equal(result.earned, 0);
  assert.match(result.message, /Missed: Glass \+ Garden/);
  assert.match(result.message, /Your selected options are correct/);
  const html = renderPart(p, JSON.stringify(selected), { result, locked: true });
  assert.equal((html.match(/data-choice-result="correct"/g) || []).length, 3);
  assert.equal((html.match(/data-choice-result="missed"/g) || []).length, 1);
  assert.match(html, /Glass \+ Garden<small class="option-status">! Missed answer/);
  assert.doesNotMatch(html, /data-choice-result="incorrect"/);
  const extra = markPart(p, JSON.stringify([...selected, 'Glass + Food']));
  assert.match(extra.message, /Incorrect selections: Glass \+ Food/);
  assert.match(
    renderPart(p, '', { result: extra }),
    /Glass \+ Food<small class="option-status">× Incorrect selection/,
  );
  const before = renderPart(p, JSON.stringify(selected));
  assert.doesNotMatch(before, /data-choice-result|Missed answer|Correct selection/);
  const blank = markPart(p, '[]');
  assert.equal(blank.blank, true);
  assert.equal(blank.optionResults.filter((item) => item.correct && !item.selected).length, 4);
});

test('numeric rows retain both fields and require ordered, correctly parsed quantities', () => {
  const p = longer.parts.find((p) => p.id === 'row-a');
  assert.equal(markPart(p, '["24,000","16,800"]').earned, 1);
  for (const wrong of [
    '[16800,24000]',
    '[24000]',
    '[24000,16800,0]',
    '["24,00","16,800"]',
    '[null,16800]',
    '["",16800]',
    '[30000,21000]',
  ])
    assert.equal(markPart(p, wrong).earned, 0, wrong);
  const supply = longer.parts.find((p) => p.id === 'supply');
  assert.equal(markPart(supply, '24,000').earned, 1);
  assert.equal(markPart(supply, '24,00').earned, 0);
  assert.match(renderPart(p), /data-field="1"/);
});

test('packed student-testing activities retain staging, source references and exact model marking', () => {
  const ledger = JSON.parse(
    readFileSync(new URL('../references/esd/draft-figures.json', import.meta.url)),
  );
  const urls = new Set(Object.values(ledger.sources).map((source) => source.url));
  for (const q of packBank(drafts)) {
    assert.equal(q.reviewStatus, 'student-testing');
    const v = q.variations[0],
      original = drafts.find((d) => d.slot === q.slot).variations[0];
    assert.equal(
      markQuestion(v, answers(original)).reduce((sum, r) => sum + r.earned, 0),
      q.slot === 1230 ? 6 : 11,
    );
    assert.deepEqual(v.stages, original.stages);
    assert.equal(new Set(v.stages.flatMap((s) => s.parts)).size, v.parts.length);
    for (const source of v.sources) assert.ok(urls.has(source.url.split('#')[0]));
    assert.ok(v.parts.every((p) => p.answer === undefined));
  }
  assert.ok(!puzzlePool('logic grids').some((q) => [1230, 1231].includes(q.slot)));
  for (const query of ['ESD', 'sustainable', 'sustainable decisions']) {
    const groups = searchGroups(drafts, 0, query);
    assert.deepEqual(groups.flatMap((g) => [...g.matches.keys()]).sort(), [1230, 1231]);
    assert.ok(groups.every((g) => g.standalone));
  }
});

test('worksheet allows answers and revisions across every stage before normal submission', async () => {
  const { session, practice, set } = fixture(1231),
    q = set.questions[0];
  await practice.start(set);
  practice.answer(q.slot, 'supply', '26000');
  assert.equal(session.data.active.answers[q.slot].supply, '26000');
  for (const part of q.parts) practice.answer(q.slot, part.id, part.answer);
  practice.answer(q.slot, '_stage', '3');
  assert.equal(session.data.active.answers[q.slot]._stage, undefined);
  assert.equal(session.data.active.answers[q.slot].supply, '24000');
  practice.submit('submitted');
  assert.equal(session.data.active.result.earned, 11);
  assert.equal(session.data.active.result.max, 11);
  practice.answer(q.slot, 'supply', '999');
  assert.equal(session.data.active.answers[q.slot].supply, '24000');
  practice.submit('submitted');
  assert.equal(session.data.history.length, 1);
  practice.dispose();
});

test('expiry records a partial staged attempt once without inventing unanswered responses', async () => {
  const { session, practice, set } = fixture(1230);
  await practice.start(set);
  practice.answer(1230, 'costs', starter.parts[0].answer);
  practice.submit('expired');
  assert.equal(session.data.active.result.earned, 3);
  assert.equal(session.data.active.result.max, 6);
  assert.equal(session.data.active.answers[1230].budget, undefined);
  assert.ok(session.data.active.finished);
  practice.dispose();
});
