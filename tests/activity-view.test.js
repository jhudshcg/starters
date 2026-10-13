/**
 * Purpose: Keep view rendering independent of saved-profile mutation and implicit app state.
 *
 * Main contents: explicit attempt inputs, escaped answers and submission-gated feedback.
 *
 * Used by: npm test. Uses: activity/question views and a real Python set.
 * Libs: Node test/assert APIs.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { choose } from '../js/bank.js';
import { activityView } from '../js/activity-view.js';
import { questionHTML } from '../js/question-view.js';

function freeze(value) {
  if (value && typeof value === 'object') {
    for (const child of Object.values(value)) freeze(child);
    Object.freeze(value);
  }
  return value;
}
function attempt(set) {
  return {
    id: 'view-attempt',
    code: set.code,
    answers: {},
    checks: {},
    first: {},
    hints: {},
    reveals: {},
    tracking: { eligible: true },
    deadline: null,
    finished: null,
  };
}

test('views render explicit frozen attempts without changing saved profile data', (t) => {
  t.mock.method(Math, 'random', () => 0);
  const set = choose(2, 'selection');
  const first = attempt(set),
    second = attempt(set);
  const q = set.questions[0],
    part = q.parts.find((p) => !p.options);
  assert.ok(part, 'the selected Python task has an editable answer');
  first.answers[q.slot] = { [part.id]: '"><script>unexpected()</script>' };
  second.answers[q.slot] = { [part.id]: 'another profile answer' };
  const profile = freeze({ history: [], active: first });
  freeze(second);
  const firstHTML = activityView(set, first, profile).html;
  assert.ok(firstHTML.includes('&lt;script&gt;unexpected()&lt;/script&gt;'));
  assert.ok(!firstHTML.includes('<script>unexpected()'));
  const secondHTML = activityView(set, second, profile).html;
  assert.ok(secondHTML.includes('another profile answer'));
  assert.ok(!secondHTML.includes('unexpected()'));
  assert.equal(profile.active, first);
});

test('question views keep solutions gated by recent submission and preserve hint evidence', (t) => {
  t.mock.method(Math, 'random', () => 0);
  const now = 1800000000000;
  t.mock.method(Date, 'now', () => now);
  const set = choose(2, 'selection'),
    q = set.questions[0],
    a = attempt(set);
  a.hints[q.slot] = true;
  a.hiddenHints = { [q.slot]: true };
  a.reveals[q.slot] = true;
  a.checks[q.slot] = 1;
  let html = questionHTML(q, 0, set, freeze(structuredClone(a)));
  assert.ok(html.includes('Assisted practice'));
  assert.ok(!html.includes('class="solution"'));
  a.finished = now;
  a.reviewSubmittedAt = now;
  html = questionHTML(q, 0, set, freeze(structuredClone(a)));
  assert.ok(html.includes('class="solution"'));
  assert.match(html, /disabled/);
  a.reviewSubmittedAt = now - 4 * 3600000;
  html = questionHTML(q, 0, set, freeze(a));
  assert.ok(!html.includes('class="solution"'));
  assert.ok(html.includes('Assisted practice'));
});
