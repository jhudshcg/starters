/**
 * Purpose: Apply practice commands without owning DOM or a second profile object.
 * Main contents: attempt creation, answers, assistance, marking, deadlines and recall.
 * Used by: application session and Svelte practice components.
 * Uses: bank selection, progress and profile persistence. Libs: none.
 */
import { archiveCodeAttempt } from '#domain/code-history.js';
import { createPythonPractice } from './python-practice.js';
import { loadPython } from '#domain/live-python.js';
import { rememberSelection, recalledSelection } from '#domain/practice-selection.js';
import { discoverableFocuses } from '#domain/activity-discovery.js';
import { matchingSearchGroup, makeSearchSet } from '#domain/search-sets.js';
import {
  initialisePractice,
  settlePractice,
  engagePractice,
  pausePractice,
} from '#domain/practice-time.js';
import { bankRelease } from '#domain/bank-release.js';
import { hasRecentSubmission } from '#domain/review.js';
import {
  banks,
  focuses,
  focusNames,
  resolve,
  choose,
  marks,
  contentChanged,
  historicalSet,
  loadSet,
  availableChallenges,
  nextExamSubtopic,
} from '#domain/bank.js';
import { hasUnsubmittedAnswers } from '#domain/unsent-answers.js';
import { encode, BANK_VERSION } from '#domain/codes.js';
import { markQuestion } from '#domain/marking.js';
import { deadlineState, attemptEligibility, recordPractice, partScores } from '#domain/progress.js';

export function createPractice({
  session,
  navigation,
  render,
  toast,
  clearToast,
  confirm,
  visible,
  focus,
  clock = () => Date.now(),
  uuid = () => crypto.randomUUID(),
  pythonLoader = () => loadPython(),
}) {
  let disposed = false,
    leaveDecision = null,
    lastPracticeSave = clock();
  const persist = () => session.persist();
  const navigate = (hash) => navigation.go(hash);
  const canReview = () => hasRecentSubmission(session.data.active);
  function activeSet() {
    const a = session.data.active;
    return a
      ? {
          ...resolve(a.code),
          examSubtopic: a.examSubtopic ?? 'all',
          search: a.search ?? null,
        }
      : null;
  }
  const python = createPythonPractice({
    session,
    activeSet,
    persist,
    render,
    load: pythonLoader,
    clock,
  });
  function pythonLevel(value) {
    const a = session.data.active;
    if (
      !a ||
      a.finished ||
      a.pythonSubmission ||
      !['all', 'beginner', 'foundation', 'standard', 'stretch'].includes(value)
    )
      return;
    a.pythonLevel = value;
    session.data.pythonChallenge = value;
    persist();
    render();
  }
  async function submitPython(outcome) {
    const data = session.data,
      a = data.active;
    if (a.pythonBusy) python.cancel();
    a.pythonSubmission ??= { at: clock(), outcome };
    if (a.practiceClock) pausePractice(a, a.pythonSubmission.at);
    persist();
    render();
    for (const q of activeSet().questions.filter((q) => q.parts.some((p) => p.kind === 'python'))) {
      if (!(await python.execute(q.slot, 'check', true))) return;
      if (session.data !== data || data.active !== a) return;
    }
    submit(a.pythonSubmission.outcome, true);
  }
  const setHash = (code) =>
    navigation.go(`#set=${encodeURIComponent(code)}`, {
      replace: true,
      guard: false,
      draw: false,
    });
  function needsLeaveWarning() {
    return visible() && hasUnsubmittedAnswers(session.data.active, activeSet());
  }
  function askLeave() {
    if (!needsLeaveWarning()) return Promise.resolve(true);
    if (!leaveDecision)
      leaveDecision = confirm(
        'Leave unsubmitted answers?',
        'You have entered answers but have not submitted this activity. You can keep working and submit them first.',
        'Leave activity',
        'Keep working',
      ).finally(() => {
        leaveDecision = null;
      });
    return leaveDecision;
  }
  async function start(
    set,
    { force = false, challengeLevel = null, inSequence = false, replace = false } = {},
  ) {
    const data = session.data;
    if (!force && !(await askLeave())) return;
    if (disposed) return;
    if (data.active && !data.active.finished) {
      pausePractice(data.active);
      persist();
    }
    python.cancel();
    navigation.remember();
    if (set.type === 0) {
      const levels = new Set(set.questions.map((q) => q.challengeLevel));
      data.puzzleChallenge = challengeLevel ?? (levels.size === 1 ? [...levels][0] : 'all');
    }
    const now = clock();
    clearToast();
    data.active = {
      generation: bankRelease.generation,
      bankVersion: BANK_VERSION,
      id: uuid(),
      contentVersion: BANK_VERSION,
      code: set.code,
      search: set.search ?? null,
      mathsTopic: set.mathsTopic ?? 'all',
      examSubtopic: set.type === 1 ? (set.examSubtopic ?? 'all') : 'all',
      inSequence: set.type === 1 && inSequence,
      pythonLevel: data.pythonChallenge ?? 'foundation',
      answers: {},
      checks: {},
      first: {},
      hints: {},
      reveals: {},
      started: now,
      origin: now,
      saved: now,
      deadline: set.minutes ? now + set.minutes * 60000 : null,
      finished: null,
      outcome: null,
      timingEvents: [],
      tracking: attemptEligibility(data, set.code, now),
    };
    initialisePractice(data.active, now);
    rememberSelection(data, set);
    await navigation.go(`#set=${encodeURIComponent(set.code)}`, {
      replace,
      guard: false,
      draw: false,
      snapshot: false,
    });
    persist();
    await render();
    focus('main');
  }

  async function entry(type) {
    const data = session.data;
    const choice = !navigation.state().practiceEntry && recalledSelection(data, type);
    navigation.remember({ practiceEntry: true });
    if (choice && discoverableFocuses(focuses(type), type).includes(choice.focus)) {
      if (data.active?.code === choice.code) {
        await setHash(choice.code);
        await render();
        return;
      }
      try {
        await start(
          choose(
            type,
            choice.focus,
            null,
            'new',
            choice.challenge,
            type === 1 ? choice.subtopic : type === 3 ? choice.recipe : 'all',
          ),
          {
            force: true,
            replace: true,
            challengeLevel: choice.challenge,
            inSequence: choice.inSequence,
          },
        );
      } catch (error) {
        toast(error.message);
      }
    }
  }
  /** Save an edit without replacing the input or losing its caret. */
  function answer(slot, id, value) {
    const a = session.data.active;
    if (!a || a.finished || a.pythonSubmission) return;
    a.answers[slot] ??= {};
    if (
      a.pythonBusy &&
      activeSet()
        ?.questions.find((q) => q.slot === slot)
        ?.parts.some((p) => p.id === id && p.testRole)
    )
      python.cancel('Run stopped because the test plan changed.');
    a.answers[slot][id] = value;
    a.feedbackHidden ??= {};
    a.feedbackHidden[slot] = true;
    a.saved = clock();
    persist();
  }
  function guide(key, open) {
    const a = session.data.active;
    a.pythonGuidesOpen ??= {};
    a.pythonGuidesOpen[key] = open;
    persist();
  }
  function hint(slot, hidden = false) {
    const a = session.data.active;
    a.hiddenHints ??= {};
    a.hiddenHints[slot] = hidden ? !a.hints[slot] : Boolean(a.hints[slot] && !a.hiddenHints[slot]);
    a.hints[slot] = true;
    persist();
  }
  function reveal(slot) {
    if (!canReview()) return;
    session.data.active.reveals[slot] = true;
    persist();
    toast('Model answers shown. Your submitted score is unchanged.');
  }
  function review(slot, status) {
    const data = session.data,
      a = data.active;
    a.espReview ??= {};
    a.espReview[slot] = { text: a.answers[slot]?.reflection ?? '', status };
    if (a.result) a.result.espReview = structuredClone(a.espReview);
    const record = data.history.find((r) => r.id === a.id);
    if (record) record.espReview = structuredClone(a.espReview);
    persist();
  }
  function clearSearch() {
    delete session.data.active.search;
    persist();
    toast('Search cleared. Your current questions and answers are unchanged.');
  }
  function sequence(value) {
    const a = session.data.active;
    delete a.search;
    a.inSequence = value;
    rememberSelection(session.data, activeSet());
    persist();
  }
  async function select(type, value, kind = 'focus') {
    if (!value) return;
    const data = session.data,
      set = visible() ? activeSet() : null;
    const focus = kind === 'focus' ? value : set.focus;
    let level = type === 0 ? (data.puzzleChallenge ?? 'all') : 'all';
    let subtopic = kind === 'subtopic' || kind === 'recipe' || kind === 'maths' ? value : 'all';
    if (kind === 'challenge') {
      level = value;
      subtopic = data.active?.mathsTopic ?? 'all';
    }
    if (type === 0 && !availableChallenges(focus, subtopic).includes(level)) level = 'all';
    try {
      await start(choose(type, focus, null, 'new', level, subtopic), {
        challengeLevel: level,
        inSequence: Boolean(set && data.active.inSequence),
      });
    } catch (error) {
      toast(error.message);
    }
    render();
  }
  async function timer(minutes) {
    const a = session.data.active;
    if (a.finished || a.pythonSubmission) return;
    const at = clock(),
      stop = a.deadline !== null;
    const duration = stop ? null : Number(minutes);
    a.deadline = stop ? null : at + duration * 60000;
    if (!stop) {
      a.origin = at;
      a.warned = false;
    }
    a.timingEvents.push({ at, minutes: duration });
    a.code = encode({ ...activeSet(), minutes: duration });
    a.saved = at;
    await setHash(a.code);
    persist();
    render();
    toast(
      stop
        ? 'Timer stopped. You can continue at your own pace.'
        : 'Timer started. Estimated practice time continues accumulating.',
    );
  }
  async function replaceSet(set, mode) {
    const data = session.data;
    try {
      if (set.search) {
        if (mode === 'type') {
          navigate(`#search=all&q=${encodeURIComponent(set.search.query)}`);
          return;
        }
        const group = matchingSearchGroup(set);
        if (!group)
          throw Error('These search matches are no longer available. Change or clear your search.');
        await start(
          makeSearchSet(group, set.search.query, {
            previous: set,
            mode: mode === 'permutation' ? 'permutation' : 'new',
          }),
        );
        return;
      }
      const level = set.type === 0 ? (data.puzzleChallenge ?? 'all') : 'all';
      const inSequence = set.type === 1 && Boolean(data.active.inSequence);
      if (inSequence && mode !== 'permutation') {
        const next = nextExamSubtopic(set.focus, data.active.examSubtopic ?? 'all');
        if (!next) throw Error('You have reached the end of the available subtopics.');
        await start(choose(1, next.focus, set, 'sequence', 'all', next.reference), {
          inSequence: true,
        });
        return;
      }
      const alternatives = discoverableFocuses(focuses(set.type), set.type).filter(
        (f) => f !== set.focus && (set.type !== 0 || availableChallenges(f).includes(level)),
      );
      const focus =
        mode === 'type' ? alternatives[Math.floor(Math.random() * alternatives.length)] : set.focus;
      const subtopic =
        mode === 'type'
          ? 'all'
          : set.type === 1
            ? (data.active.examSubtopic ?? 'all')
            : set.type === 0 && set.focus === 'classic maths'
              ? (data.active.mathsTopic ?? 'all')
              : 'all';
      await start(
        choose(
          set.type,
          focus,
          set,
          mode === 'permutation' ? 'permutation' : 'new',
          level,
          subtopic,
        ),
        { challengeLevel: level, inSequence },
      );
    } catch (e) {
      toast(e.message);
    }
  }
  function check(slot, announce = true) {
    const data = session.data;
    const a = data.active,
      q = activeSet().questions.find((q) => q.slot === slot);
    a.feedbackHidden ??= {};
    a.feedbackHidden[slot] = false;
    const result = markQuestion(q, a.answers[slot], a.python?.[slot]?.result);
    if (!a.first[slot])
      a.first[slot] = {
        results: result,
        assisted: Boolean(a.hints[slot] || a.reveals[slot] || q.livePython?.access === 'practice'),
      };
    if (!a.finished) a.checks[slot] = (a.checks[slot] ?? 0) + 1;
    if (announce)
      toast(`${q.title}: ${result.reduce((s, r) => s + r.earned, 0)} of ${marks(q)} marks.`);
    return result;
  }
  function submit(outcome, pythonReady = false) {
    const data = session.data;
    const a = data.active;
    if (!a) return;
    if (
      !a.finished &&
      !pythonReady &&
      activeSet().questions.some((q) => q.parts.some((p) => p.kind === 'python'))
    )
      return submitPython(outcome);
    a.reviewSubmittedAt = clock();
    // A restored completed attempt unlocks review without recording it twice.
    if (a.finished) {
      persist();
      render();
      focus('submit-result');
      return;
    }
    const set = activeSet(),
      now = a.pythonSubmission?.at ?? clock();
    let earned = 0,
      firstEarned = 0,
      firstMax = 0;
    const finalResults = {};
    for (const q of set.questions) {
      if (!a.first[q.slot]) check(q.slot, false);
      else a.checks[q.slot] ??= 1;
      finalResults[q.slot] = markQuestion(q, a.answers[q.slot], a.python?.[q.slot]?.result);
      earned += finalResults[q.slot].reduce((s, r) => s + r.earned, 0);
      const first = a.first[q.slot];
      if (!first.assisted)
        for (const r of first.results) {
          firstEarned += r.earned;
          firstMax += r.max;
        }
    }
    a.finished = now;
    a.outcome = outcome;
    const stop = outcome === 'expired' ? a.deadline : now;
    if (a.practiceClock) pausePractice(a, stop);
    const record = {
      generation: a.generation,
      bankVersion: BANK_VERSION,
      started: a.started,
      id: a.id,
      code: encode({ ...set, version: BANK_VERSION }),
      type: set.type,
      focus: set.focus,
      finished: now,
      earned,
      max: set.total,
      percentage: Math.round((earned / set.total) * 100),
      seconds: Math.max(0, Math.round((stop - a.origin) / 1000)),
      totalSeconds: Math.max(0, Math.round((stop - a.started) / 1000)),
      attemptChecks: Object.values(a.checks).reduce((s, n) => s + n, 0),
      assisted: Object.values(a.first).some((first) => first.assisted),
      outcome,
      firstEarned,
      firstMax,
      partScores: partScores(set, a.first, finalResults),
    };
    if (set.type === 3) {
      a.espReview = Object.fromEntries(
        set.questions.flatMap((q) => {
          const pending = (finalResults[q.slot] ?? [])
            .filter((r) => r.needsReview)
            .map(
              (r) =>
                `${q.parts.find((p) => p.id === r.id).prompt}: ${a.answers[q.slot]?.[r.id] ?? ''}`,
            );
          return q.review || pending.length
            ? [
                [
                  q.slot,
                  {
                    text: [a.answers[q.slot]?.reflection ?? '', ...pending]
                      .filter(Boolean)
                      .join('\n'),
                    status: 'Needs review',
                  },
                ],
              ]
            : [];
        }),
      );
      record.espReview = structuredClone(a.espReview);
    }
    a.tracking ??= attemptEligibility(data, a.code, a.started);
    if (a.practiceClock) {
      record.engagedSeconds = Math.floor(a.practiceClock.milliseconds / 1000);
      record.practiceMeasuredFrom = a.practiceClock.measuredFrom;
    }
    archiveCodeAttempt(data, a, set, finalResults);
    recordPractice(data, record, a.tracking);
    a.result = record;
    persist();
    render();
    if (visible() && outcome === 'submitted') focus('submit-result');
    toast(
      `${outcome === 'expired' ? 'Time’s up. ' : ''}${record.percentage}%. ${!a.tracking.eligible ? 'Practice only — progress not updated.' : session.storageOK ? 'Result saved.' : 'Export to keep your result.'}`,
    );
  }

  function tick() {
    const a = session.data.active;
    if (!a || !banks[historicalSet(a.code).type]) return;
    if (!a.finished && a.practiceClock) {
      settlePractice(a);
      if (clock() - lastPracticeSave >= 15000) {
        lastPracticeSave = clock();
        persist();
      }
    }
    const state = deadlineState(a);
    if (!a.finished && !a.pythonSubmission && state.expired) {
      submit('expired');
      return;
    }
    if (!a.finished && state.remaining !== null && state.remaining <= 60 && !a.warned) {
      a.warned = true;
      persist();
      toast('One minute or less remaining. Your answers will submit automatically.');
    }
    if (visible()) render();
  }
  async function resume() {
    const data = session.data;
    try {
      if (data.active) {
        data.active.pythonBusy = false;
        if (data.active.practiceClock) data.active.practiceClock.running = false;
        const restored = await loadSet(data.active.code);
        if (contentChanged(restored, data.active.contentVersion ?? restored.version)) {
          data.active = null;
          persist();
          toast(
            'These questions have been updated. Start a fresh attempt; your saved results are unchanged.',
          );
        }
        if (
          data.active &&
          !data.active.finished &&
          !data.active.pythonSubmission &&
          deadlineState(data.active).expired
        )
          submit('expired');
        else if (
          data.active &&
          !data.active.finished &&
          !data.active.pythonSubmission &&
          clock() - data.active.saved > 45 * 60000
        ) {
          data.active = null;
          persist();
          toast(
            'Your previous untimed activity was inactive for over 45 minutes. Start a fresh attempt.',
          );
        }
      }
    } catch (error) {
      toast(error.message);
    }
  }

  return {
    python,
    pythonLevel,
    start,
    entry,
    activeSet,
    answer,
    guide,
    hint,
    reveal,
    review,
    clearSearch,
    sequence,
    select,
    timer,
    replaceSet,
    check(slot) {
      if (canReview()) {
        check(slot);
        persist();
      }
    },
    submit,
    needsLeaveWarning,
    askLeave,
    tick,
    resume,
    dispose() {
      python.dispose();
      disposed = true;
    },
  };
}
