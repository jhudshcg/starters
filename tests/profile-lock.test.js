/** Profile ownership must prevent stale tabs from writing or restoring another tab's results. */
import test from 'node:test';
import assert from 'node:assert/strict';
import { acquireProfileLock } from '../src/lib/application/profile-lock.js';
import { createProfile } from '../src/lib/application/profile.js';
import { createPractice } from '../src/lib/application/practice.js';
import { selectProfile, loadProfile } from '../js/profiles.js';
import { choose } from '../js/bank.js';
import { backupJSON } from '../js/progress-transfer.js';

function fixture(t) {
  const values = new Map(),
    previousGlobals = new Map();
  for (const [key, value] of Object.entries({
    localStorage: {
      getItem: (key) => values.get(key) ?? null,
      setItem: (key, value) => values.set(key, value),
    },
    window: {},
  })) {
    const previous = Object.getOwnPropertyDescriptor(globalThis, key);
    Object.defineProperty(globalThis, key, { configurable: true, value });
    previousGlobals.set(key, previous);
  }
  const profiles = [];
  t.after(async () => {
    for (const profile of profiles) await profile.dispose();
    for (const [key, previous] of previousGlobals)
      if (previous) Object.defineProperty(globalThis, key, previous);
      else delete globalThis[key];
  });
  return () => {
    const profile = createProfile({
      changed() {},
      remember() {},
      notify() {},
      download() {},
      confirm: async () => true,
      onRestore() {},
    });
    profiles.push(profile);
    return profile;
  };
}

test('one lease per name, independent profiles, release and unavailable browser', async () => {
  const first = await acquireProfileLock('Lock Test');
  const other = await acquireProfileLock('Other Lock Test');
  try {
    await assert.rejects(acquireProfileLock('lock test'), /already open/);
    await assert.rejects(acquireProfileLock('Unsupported', null), /cannot protect progress/);
  } finally {
    await first.release();
    await other.release();
  }
  await (await acquireProfileLock('Lock Test')).release();
});

test('blocked session cannot erase an assisted submission; reopening loads the latest history', async (t) => {
  const make = fixture(t);
  selectProfile('Student');
  const owner = make(),
    blocked = make();
  assert.equal(await owner.load(), true);
  assert.equal(await blocked.load(), false);
  assert.match(blocked.blocked, /already open/);
  const practice = createPractice({
    session: owner,
    navigation: { remember() {}, state: () => ({}), async go() {} },
    render() {},
    toast() {},
    clearToast() {},
    confirm: async () => true,
    visible: () => true,
    focus() {},
  });
  const set = choose(2, 'records');
  await practice.start(set);
  practice.hint(set.questions[0].slot);
  practice.submit('submitted');
  blocked.persist();
  await blocked.dispose();
  assert.equal(loadProfile('Student').history.length, 1);
  assert.equal(loadProfile('Student').history[0].assisted, true);
  await owner.dispose();
  const reopened = make();
  assert.equal(await reopened.load(), true);
  assert.equal(reopened.data.history.length, 1);
});

test('switching and named restore cannot bypass ownership; switching releases the old profile', async (t) => {
  const make = fixture(t);
  selectProfile('First');
  const first = make();
  await first.load();
  selectProfile('Second');
  const second = make();
  await second.load();
  await assert.rejects(second.chooseName('first'), /already open/);
  assert.equal(second.data.username, 'Second');
  await assert.rejects(second.restore(backupJSON(first.data)), /already open/);
  assert.equal(second.data.username, 'Second');
  await first.chooseName('Third');
  await second.chooseName('First');
  assert.equal(first.data.username, 'Third');
  assert.equal(second.data.username, 'First');
});

test('an unreadable profile stays untouched and releases its lease', async (t) => {
  const make = fixture(t);
  selectProfile('Broken');
  localStorage.setItem('dsd-starters-v1:profile:Broken', '{invalid');
  const profile = make();
  assert.equal(await profile.load(), false);
  profile.persist();
  await profile.dispose();
  assert.equal(localStorage.getItem('dsd-starters-v1:profile:Broken'), '{invalid');
  await (await acquireProfileLock('Broken')).release();
});
