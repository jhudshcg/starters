/**
 * Purpose: Own attempt actions and bind the current activity view.
 *
 * Main contents: start, entry recall, answer events, submission, timers and resume
 *
 * Used by: application.
 * Uses: profile session, bank selection, progress rules and activity view.
 * Libs: none.
 */
import { activityView } from './activity-view.js';
import { esc, duration } from './view-utils.js';
import { practiceName, practiceBreadcrumbs } from './practice-heading.js';
import { rememberSelection, recalledSelection } from './practice-selection.js';
import { discoverableFocuses } from './activity-discovery.js';
import { matchingSearchGroup, makeSearchSet } from './search-sets.js';
import {
  initialisePractice,
  settlePractice,
  engagePractice,
  pausePractice,
} from './practice-time.js';
import { bankRelease } from './bank-release.js';
import { hasRecentSubmission } from './review.js';
import { pageStatus, developmentNotice } from './page-status.js';
import { puzzleCards } from './puzzle-cards.js';
import { bindChallenges as bindPuzzles } from './challenge-controls.js';
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
} from './bank.js';
import { hasUnsubmittedAnswers } from './unsent-answers.js';
import { showModal } from './dialog.js';
import { encode, BANK_VERSION } from './codes.js';
import { markQuestion } from './marking.js';
import { deadlineState, attemptEligibility, recordPractice, partScores } from './progress.js';
/** Bind host navigation and persistence; this controller owns no second copy of profile data. */
export function createPracticeController({
  main,
  session,
  navigation,
  render,
  home,
  toast,
  clearToast,
  copy,
}) {
  let disposed = false;
  const $ = (selector) => document.querySelector(selector);
  const persist = () => session.persist();
  const navigate = (hash) => navigation.go(hash);
  const canReview = () => hasRecentSubmission(session.data.active);
  function activeSet() {
    const data = session.data;
    return data.active
      ? {
          ...resolve(data.active.code),
          examSubtopic: data.active.examSubtopic ?? 'all',
          search: data.active.search ?? null,
        }
      : null;
  }
  function setHash(code) {
    return navigation.go(`#set=${encodeURIComponent(code)}`, {
      replace: true,
      guard: false,
      draw: false,
    });
  }
  function needsLeaveWarning() {
    const data = session.data;
    return Boolean($('#display-code')) && hasUnsubmittedAnswers(data.active, activeSet());
  }
  let leaveDecision = null;
  let leaveDialog = null;
  function askLeave() {
    if (!needsLeaveWarning()) return Promise.resolve(true);
    if (leaveDecision) return leaveDecision;
    leaveDecision = new Promise((resolveAnswer) => {
      const dialog = document.createElement('dialog');
      leaveDialog = dialog;
      dialog.innerHTML =
        '<h2>Leave unsubmitted answers?</h2><p>You have entered answers but have not submitted this activity. You can keep working and submit them first.</p><div class="actions"><button value="stay">Keep working</button><button class="primary" value="leave">Leave activity</button></div>';
      document.body.append(dialog);
      dialog.addEventListener('click', (e) => {
        if (e.target.matches('button')) dialog.close(e.target.value);
      });
      dialog.addEventListener('cancel', (e) => {
        e.preventDefault();
        dialog.close('stay');
      });
      dialog.addEventListener('close', () => {
        const yes = dialog.returnValue === 'leave';
        dialog.remove();
        leaveDecision = null;
        leaveDialog = null;
        resolveAnswer(yes);
      });
      showModal(dialog);
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
    navigation.remember();
    if (set.type === 0) {
      const levels = new Set(set.questions.map((q) => q.challengeLevel));
      data.puzzleChallenge = challengeLevel ?? (levels.size === 1 ? [...levels][0] : 'all');
    }
    const now = Date.now();
    clearToast();
    data.active = {
      generation: bankRelease.generation,
      bankVersion: BANK_VERSION,
      id: crypto.randomUUID(),
      contentVersion: BANK_VERSION,
      code: set.code,
      search: set.search ?? null,
      mathsTopic: set.mathsTopic ?? 'all',
      examSubtopic: set.type === 1 ? (set.examSubtopic ?? 'all') : 'all',
      inSequence: set.type === 1 && inSequence,
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
    main.focus();
  }
  /** Show a blank selector on first entry; recall recent focus only on a fresh visit. */
  async function practiceHome(type) {
    const data = session.data;
    const choice = !history.state?.practiceEntry && recalledSelection(data, type);
    history.replaceState({ ...history.state, practiceEntry: true }, '');
    if (choice && discoverableFocuses(focuses(type), type).includes(choice.focus)) {
      if (data.active?.code === choice.code) {
        await setHash(choice.code);
        activity();
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
        return;
      } catch (error) {
        toast(error.message);
      }
    }
    $('.global-code-entry').hidden = false;
    main.innerHTML = /* HTML */ `${practiceBreadcrumbs(type)}${type === 0
        ? puzzleCards(focuses(0), focusNames, null)
        : ''}
      <div class="page-top">
        <div>
          <h1>${practiceName(type)}</h1>
          ${pageStatus[type]?.inDevelopment
            ? `<p class="development-notice">${esc(developmentNotice)}</p>`
            : ''}
        </div>
        ${type === 0
          ? ''
          : `<div class="focus-row"><label for="focus">Focus</label><select id="focus"><option value="">--</option>${focuses(
              type,
            )
              .map((f) => `<option value="${f}">${esc(focusNames[f])}</option>`)
              .join('')}</select></div>`}
      </div>
      ${type === 2
        ? '<p class="project-link"><a href="#projects">Build something: Python project ideas ↗</a></p>'
        : ''}`;
    const chooseFocus = async (focus) => {
      if (!focus) return;
      try {
        await start(choose(type, focus), { challengeLevel: 'all' });
      } catch (error) {
        toast(error.message);
      }
    };
    if ($('#focus')) $('#focus').onchange = (event) => chooseFocus(event.target.value);
    main
      .querySelectorAll('[data-puzzle-focus]')
      .forEach((button) => (button.onclick = () => chooseFocus(button.dataset.puzzleFocus)));
  }
  function activity() {
    if (disposed) return;
    const data = session.data;
    $('.global-code-entry').hidden = false;
    const set = activeSet(),
      a = data.active;
    if (!set) {
      home();
      return;
    }
    if (
      !a.finished &&
      !document.hidden &&
      !document.querySelector('dialog[open]') &&
      $('#display-code')?.textContent !== a.code
    )
      engagePractice(a);
    const record = a.result ?? data.history.find((r) => r.id === a.id);
    a.tracking ??= {
      ...attemptEligibility(
        { ...data, history: data.history.filter((r) => r.id !== a.id) },
        a.code,
        a.started,
      ),
      ...(record ? { eligible: true } : {}),
    };
    const { html, level, subtopic, mathsTopic, inSequence } = activityView(set, a, data);
    main.innerHTML = html;
    main.querySelectorAll('[data-python-guide]').forEach((guide) =>
      guide.addEventListener('toggle', (event) => {
        const key = guide.dataset.pythonGuide;
        a.pythonGuidesOpen ??= {};
        a.pythonGuidesOpen[key] = event.target.open;
        persist();
      }),
    );
    bindPuzzles(
      main,
      set,
      a,
      (slot, id, value, selector) => {
        a.answers[slot] ??= {};
        a.answers[slot][id] = value;
        a.saved = Date.now();
        // New puzzle moves invalidate visible feedback but retain first-response evidence.
        a.feedbackHidden ??= {};
        a.feedbackHidden[slot] = true;
        persist();
        activity();
        const control = selector ? main.querySelector(selector) : null;
        if (control && !control.disabled) control.focus({ preventScroll: true });
        else
          main
            .querySelector(`[data-question="${slot}"] [data-puzzle-action]:not(:disabled)`)
            ?.focus({ preventScroll: true });
      },
      toast,
      (slot) => {
        a.hiddenHints ??= {};
        if (!a.hints[slot]) a.hiddenHints[slot] = true;
        a.hints[slot] = true;
        persist();
      },
    );
    main.querySelectorAll('[data-part]').forEach((el) =>
      el.addEventListener(el.type === 'radio' ? 'change' : 'input', () => {
        if (a.finished) return;
        a.answers[el.dataset.slot] ??= {};
        a.answers[el.dataset.slot][el.dataset.part] = el.value;
        // Remove stale feedback after an edit, retaining first-check evidence.
        const article = el.closest('.question');
        article.querySelectorAll('.feedback').forEach((f) => f.remove());
        article
          .querySelectorAll('[data-result]')
          .forEach((part) => part.removeAttribute('data-result'));
        a.feedbackHidden ??= {};
        a.feedbackHidden[el.dataset.slot] = true;
        a.saved = Date.now();
        persist();
      }),
    );
    main.querySelectorAll('[data-review-status]').forEach(
      (el) =>
        (el.onchange = () => {
          const slot = el.dataset.reviewStatus;
          a.espReview ??= {};
          a.espReview[slot] = { text: a.answers[slot]?.reflection ?? '', status: el.value };
          if (a.result) a.result.espReview = structuredClone(a.espReview);
          const record = data.history.find((r) => r.id === a.id);
          if (record) record.espReview = structuredClone(a.espReview);
          persist();
        }),
    );
    main.querySelectorAll('[data-check]').forEach(
      (b) =>
        (b.onclick = () => {
          if (!canReview()) return;
          check(Number(b.dataset.check));
          persist();
          activity();
          main.querySelector(`[data-check="${b.dataset.check}"]`).focus();
        }),
    );
    main.querySelectorAll('[data-hint]').forEach(
      (b) =>
        (b.onclick = () => {
          const slot = b.dataset.hint,
            visible = a.hints[slot] && !a.hiddenHints?.[slot];
          a.hiddenHints ??= {};
          a.hiddenHints[slot] = Boolean(visible);
          a.hints[slot] = true;
          persist();
          activity();
          const panel = main.querySelector('[data-question="' + slot + '"] .hint-text');
          if (panel) {
            panel.tabIndex = -1;
            panel.focus({ preventScroll: true });
            toast('Hint shown. This question is marked as assisted practice.');
          } else main.querySelector('[data-hint="' + slot + '"]').focus();
        }),
    );
    main.querySelectorAll('[data-reveal]').forEach(
      (b) =>
        (b.onclick = () => {
          if (!canReview()) return;
          a.reveals[b.dataset.reveal] = true;
          persist();
          activity();
          const panel = main.querySelector('[data-question="' + b.dataset.reveal + '"] .solution');
          panel.tabIndex = -1;
          panel.focus();
          toast('Model answers shown. Your submitted score is unchanged.');
        }),
    );
    $('#clear-search')?.addEventListener('click', () => {
      delete a.search;
      persist();
      activity();
      toast('Search cleared. Your current questions and answers are unchanged.');
    });
    $('#submit').onclick = () => submit('submitted');
    $('#retry')?.addEventListener('click', () => start(set, { inSequence }));
    $('#new-type').onclick = () => replaceSet(set, 'type');
    $('#new-focus').onclick = () => replaceSet(set, 'focus');
    $('#permutation').onclick = () => replaceSet(set, 'permutation');
    if (set.type === 3)
      $('#esp-recipe').onchange = async (e) => {
        try {
          await start(choose(3, set.focus, null, 'new', 'all', e.target.value));
        } catch (err) {
          toast(err.message);
        }
        activity();
      };
    if (set.type === 1) {
      $('#in-sequence').onchange = (e) => {
        delete a.search;
        a.inSequence = e.target.checked;
        rememberSelection(data, set);
        persist();
        activity();
      };
      $('#subtopic').onchange = async (e) => {
        const requested = e.target.value;
        try {
          await start(choose(1, set.focus, null, 'new', 'all', requested), { inSequence });
        } catch (err) {
          toast(err.message);
        }
        activity();
      };
    }
    if (set.type === 0)
      $('#challenge-level').onchange = async (e) => {
        const requested = e.target.value,
          prior = data.active?.id;
        try {
          await start(choose(0, set.focus, null, 'new', requested, mathsTopic), {
            challengeLevel: requested,
          });
          if (data.active?.id !== prior) {
            data.puzzleChallenge = requested;
            persist();
          }
        } catch (err) {
          toast(err.message);
        }
        activity();
      };
    if ($('#maths-topic'))
      $('#maths-topic').onchange = async (e) => {
        const topic = e.target.value,
          nextLevel = availableChallenges(set.focus, topic).includes(level) ? level : 'all';
        try {
          await start(choose(0, set.focus, null, 'new', nextLevel, topic), {
            challengeLevel: nextLevel,
          });
        } catch (err) {
          toast(err.message);
        }
        activity();
      };
    const changeFocus = async (target) => {
      try {
        const level = set.type === 0 ? (data.puzzleChallenge ?? 'all') : 'all';
        const nextLevel =
          set.type === 0 && !availableChallenges(target).includes(level) ? 'all' : level;
        const prior = data.active?.id;
        await start(choose(set.type, target, null, 'new', nextLevel), {
          challengeLevel: nextLevel,
          inSequence,
        });
        if (data.active?.id !== prior) {
          if (set.type === 0) data.puzzleChallenge = nextLevel;
          persist();
          activity();
        }
      } catch (err) {
        toast(err.message);
      }
      if (data.active?.id === a.id) activity();
    };
    if ($('#focus')) $('#focus').onchange = (e) => changeFocus(e.target.value);
    main
      .querySelectorAll('[data-puzzle-focus]')
      .forEach((b) => (b.onclick = () => changeFocus(b.dataset.puzzleFocus)));
    $('#copy-code').onclick = () => copy(a.code);
    $('#copy-link').onclick = () =>
      copy(`${location.href.split('#')[0]}#set=${encodeURIComponent(a.code)}`);
    $('#timer-toggle').onclick = () => {
      if (a.finished) return;
      const now = Date.now(),
        stop = a.deadline !== null,
        minutes = stop ? null : Number($('#minutes').value);
      a.deadline = stop ? null : now + minutes * 60000;
      if (!stop) {
        a.origin = now;
        a.warned = false;
      }
      a.timingEvents.push({ at: now, minutes });
      a.code = encode({ ...set, minutes });
      a.saved = now;
      setHash(a.code);
      persist();
      activity();
      toast(
        stop
          ? 'Timer stopped. You can continue at your own pace.'
          : 'Timer started. Estimated practice time continues accumulating.',
      );
    };
    tick();
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
    const result = markQuestion(q, a.answers[slot]);
    if (!a.first[slot])
      a.first[slot] = { results: result, assisted: Boolean(a.hints[slot] || a.reveals[slot]) };
    if (!a.finished) a.checks[slot] = (a.checks[slot] ?? 0) + 1;
    if (announce)
      toast(`${q.title}: ${result.reduce((s, r) => s + r.earned, 0)} of ${marks(q)} marks.`);
    return result;
  }
  function submit(outcome) {
    const data = session.data;
    const a = data.active;
    if (!a) return;
    a.reviewSubmittedAt = Date.now();
    // A restored completed attempt unlocks review without recording it twice.
    if (a.finished) {
      persist();
      render();
      $('#submit-result')?.focus();
      return;
    }
    const set = activeSet(),
      now = Date.now();
    let earned = 0,
      firstEarned = 0,
      firstMax = 0;
    const finalResults = {};
    for (const q of set.questions) {
      if (!a.first[q.slot]) check(q.slot, false);
      else a.checks[q.slot] ??= 1;
      finalResults[q.slot] = markQuestion(q, a.answers[q.slot]);
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
      assisted: Object.keys(a.hints).length > 0 || Object.keys(a.reveals).length > 0,
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
    recordPractice(data, record, a.tracking);
    a.result = record;
    persist();
    render();
    if (location.hash.startsWith('#set=') && outcome === 'submitted') $('#submit-result')?.focus();
    toast(
      `${outcome === 'expired' ? 'Time’s up. ' : ''}${record.percentage}%. ${!a.tracking.eligible ? 'Practice only — progress not updated.' : session.storageOK ? 'Result saved.' : 'Export to keep your result.'}`,
    );
  }
  let lastPracticeSave = Date.now();
  function practiceVisible() {
    const data = session.data;
    return (
      data.active &&
      !data.active.finished &&
      !document.hidden &&
      $('#display-code')?.textContent === data.active.code &&
      !document.querySelector('#profile-name')
    );
  }
  function tick() {
    const data = session.data;
    if (data.active && !banks[historicalSet(data.active.code).type]) return;
    const a = data.active;
    if (!a) return;
    if (a.finished && !canReview() && main.querySelector('[data-reveal]')) {
      activity();
      return;
    }
    if (!a.finished && a.practiceClock) {
      settlePractice(a);
      if (Date.now() - lastPracticeSave >= 15000) {
        lastPracticeSave = Date.now();
        persist();
      }
    }
    const state = deadlineState(a);
    if (!a.finished && state.expired) {
      submit('expired');
      return;
    }
    const el = $('#timer');
    if (!el) return;
    if (a.finished) {
      el.textContent = a.deadline ? 'Finished' : 'Untimed';
      return;
    }
    el.textContent = state.remaining === null ? 'Untimed' : duration(state.remaining);
    el.classList.toggle('warning', state.remaining !== null && state.remaining <= 60);
    if (state.remaining !== null && state.remaining <= 60 && !a.warned) {
      a.warned = true;
      persist();
      toast('One minute or less remaining. Your answers will submit automatically.');
    }
  }

  async function resume() {
    const data = session.data;
    try {
      if (data.active) {
        if (data.active.practiceClock) data.active.practiceClock.running = false;
        const restored = await loadSet(data.active.code);
        if (contentChanged(restored, data.active.contentVersion ?? restored.version)) {
          data.active = null;
          persist();
          toast(
            'These questions have been updated. Start a fresh attempt; your saved results are unchanged.',
          );
        }
        if (data.active && !data.active.finished && deadlineState(data.active).expired)
          submit('expired');
        else if (
          data.active &&
          !data.active.finished &&
          Date.now() - data.active.saved > 45 * 60000
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
    start,
    entry: practiceHome,
    show: activity,
    activeSet,
    needsLeaveWarning,
    askLeave,
    tick,
    visible: practiceVisible,
    resume,
    dispose() {
      disposed = true;
      leaveDialog?.close('stay');
    },
  };
}
