/** Preserve assessment behaviour while replacing the DOM controller with commands. */
import test from 'node:test';
import assert from 'node:assert/strict';
import { createPractice } from '../src/lib/application/practice.js';
import { BANK_VERSION } from '../js/codes.js';
import { choose, resolve } from '../js/bank.js';
import { routeURL, routeHash } from '../src/lib/application/routes.js';

function fixture() {
  const session = {
    data: { schema: 1, history: [], active: null },
    storageOK: true,
    persist() {},
  };
  let time = Date.now(),
    route = '#home',
    accepted = true;
  const navigation = {
    remember() {},
    state: () => ({}),
    async go(hash) {
      route = hash;
    },
  };
  const practice = createPractice({
    session,
    navigation,
    render() {},
    toast() {},
    clearToast() {},
    confirm: async () => accepted,
    visible: () => route.startsWith('#set='),
    focus() {},
    clock: () => time,
    uuid: () => `attempt-${time}`,
  });
  return {
    session,
    practice,
    advance: (ms) => {
      time += ms;
    },
    cancel: () => {
      accepted = false;
    },
  };
}
test('practice commands preserve guide independence, specific assistance and single recording', async () => {
  const { practice, session, advance } = fixture(),
    set = resolve({
      version: BANK_VERSION,
      type: 2,
      entries: [{ slot: 24, variation: 0 }],
      minutes: null,
    });
  await practice.start(set);
  const q = set.questions[0],
    part = q.parts[0];
  practice.answer(q.slot, part.id, 'my answer');
  practice.guide('records', true);
  assert.equal(session.data.active.answers[q.slot][part.id], 'my answer');
  assert.deepEqual(session.data.active.hints, {});
  advance(1500);
  practice.submit('submitted');
  assert.equal(session.data.history.length, 1);
  assert.equal(session.data.history[0].assisted, false);
  practice.submit('submitted');
  assert.equal(session.data.history.length, 1);
  advance(4 * 3600000 + 1);
  await practice.start(set);
  practice.hint(q.slot);
  practice.submit('submitted');
  assert.equal(session.data.history.length, 2);
  assert.equal(session.data.history[1].assisted, true);
  assert.equal(session.data.active.first[q.slot].assisted, true);
});
test('cancelled replacement retains the exact attempt, answers and code', async () => {
  const { practice, session, cancel } = fixture(),
    set = choose(2, 'records');
  await practice.start(set);
  practice.answer(set.questions[0].slot, set.questions[0].parts[0].id, 'keep');
  const previous = structuredClone(session.data.active);
  cancel();
  await practice.start(choose(2, 'iteration'));
  assert.deepEqual(session.data.active, previous);
});
test('legacy links round-trip through static pages under a project subpath', () => {
  for (const hash of [
    '#home',
    '#exam',
    '#practice=0',
    '#practice=2',
    '#set=Ab_c-DE12x',
    '#search=all&q=data%20types',
    '#progress',
    '#faq',
    '#go',
  ]) {
    const url = new URL(routeURL(hash, '/starters'), 'https://example.test');
    assert.equal(routeHash(url, '/starters'), hash);
  }
  assert.equal(
    routeHash(new URL('https://example.test/starters/#set=Ab_c-DE12x'), '/starters'),
    '#set=Ab_c-DE12x',
  );
});

test('every practice area opens a default set and recalls its profile-specific choice', async () => {
  const { practice, session, advance } = fixture();
  for (const type of [0, 1, 2, 3]) {
    await practice.entry(type);
    assert.equal(practice.activeSet().type, type);
    assert.ok(practice.activeSet().questions.length);
  }
  await practice.start(choose(2, 'records'));
  const original = session.data.active;
  await practice.entry(2);
  assert.equal(session.data.active, original, 'entry resumes the active set');
  await practice.entry(1);
  advance(30 * 24 * 60 * 60 * 1000);
  await practice.entry(2);
  assert.equal(practice.activeSet().focus, 'records');
  const firstProfile = session.data;
  session.data = { schema: 1, history: [], active: null };
  await practice.entry(2);
  assert.notEqual(practice.activeSet().focus, 'records', 'another profile gets its own default');
  session.data = firstProfile;
  await practice.entry(2);
  assert.equal(practice.activeSet().focus, 'records');
});

test('stale remembered focus or filters fall back to an available question set', async () => {
  const { practice, session } = fixture();
  session.data.practiceSelections = {
    1: { focus: 'CA1.1', subtopic: 'removed-topic', code: 'old', at: 1 },
    2: { focus: 'removed-focus', code: 'old', at: 1 },
  };
  await practice.entry(1);
  assert.equal(practice.activeSet().type, 1);
  assert.equal(practice.activeSet().focus, 'CA1.1');
  await practice.entry(2);
  assert.equal(practice.activeSet().type, 2);
  assert.ok(practice.activeSet().questions.length);
});
