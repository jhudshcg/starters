/**
 * Purpose: Render the activity page without owning its state or events.
 *
 * Main contents: activity markup and derived selection values
 *
 * Used by: practice-controller.
 * Uses: question view, guides, bank metadata and search.
 * Libs: none.
 */
import { esc, duration } from './view-utils.js';
import { questionHTML } from './question-view.js';
import { practiceBreadcrumbs } from './practice-heading.js';
import { pythonGuidesHTML } from './python-guides.js';
import { puzzleCards } from './puzzle-cards.js';
import { hasRecentSubmission } from './review.js';
import { practiceSeconds } from './practice-time.js';
import { REATTEMPT_HOURS } from './progress.js';
import { pageStatus, developmentNotice } from './page-status.js';
import { matchingSearchGroup } from './search-sets.js';
import { chooseSearchEntries, searchSetMatches } from './search.js';
import {
  banks,
  types,
  focuses,
  focusNames,
  espRecipeNames,
  challengeLevels,
  challengeLabel,
  availableChallenges,
  puzzlePool,
  examSubtopics,
  nextExamSubtopic,
  matchesSubtopic,
  hasAlternativeExamSet,
} from './bank.js';
/** Build markup and the selection values used by the controller; never mutate the attempt. */
export function activityView(set, a, data) {
  const canReview = () => hasRecentSubmission(a);
  const record = a.result ?? data.history.find((r) => r.id === a.id);
  const untracked = !a.tracking.eligible;
  const trackingNotice = untracked
    ? `<p class="tracking-notice" role="status">You attempted this set ${Math.max(0, (a.tracking.checkedAt - a.tracking.previous) / 3600000).toFixed(1)} hours ago. To have your progress tracked, wait at least ${REATTEMPT_HOURS} hours between reattempts. You can practise now, but this attempt will not update your progress.</p>`
    : '';
  const level = set.type === 0 ? (data.puzzleChallenge ?? 'all') : 'all';
  const subtopic = set.type === 1 ? (a.examSubtopic ?? 'all') : 'all';
  const mathsTopic =
    set.type === 0 && set.focus === 'classic maths' ? (a.mathsTopic ?? 'all') : 'all';
  const inSequence = set.type === 1 && Boolean(a.inSequence);
  const nextSubtopic = inSequence ? nextExamSubtopic(set.focus, subtopic) : null;
  const matchingQuestions =
    subtopic === 'all'
      ? 0
      : set.questions.filter((q) => q.parts.some((p) => matchesSubtopic(p, subtopic))).length;
  const searchGroup = matchingSearchGroup(set);
  const searchAlternatives = searchGroup
    ? Boolean(chooseSearchEntries(searchGroup, { previous: set, random: null }))
    : false;
  const searchPermutation = searchGroup
    ? Boolean(
        chooseSearchEntries(searchGroup, { previous: set, mode: 'permutation', random: null }),
      )
    : false;
  const sameFocusAlternatives =
    set.type === 1
      ? hasAlternativeExamSet(set, subtopic)
      : (set.type === 0
          ? puzzlePool(set.focus, level, mathsTopic)
          : banks[set.type].filter((q) => q.focus === set.focus && !q.retired)
        ).length > set.questions.length;
  const html = /* HTML */ `${practiceBreadcrumbs(set.type, set.focus)}
    ${set.type === 0
      ? `<details class="puzzle-picker"><summary>Puzzle type</summary>${puzzleCards(focuses(0), focusNames, set.focus)}</details>`
      : ''}
    <div class="page-top">
      <div>
        <h1>${esc(focusNames[set.focus])}</h1>
        ${pageStatus[set.type]?.inDevelopment
          ? `<p class="development-notice" role="note">${esc(developmentNotice)}</p>`
          : ''}
      </div>
      <div class="focus-row">
        ${set.type === 0
          ? ''
          : `<span class="primary-focus-controls"><label for="focus">Focus</label><select id="focus">${focuses(
              set.type,
            )
              .map(
                (f) =>
                  `<option value="${f}" ${f === set.focus ? 'selected' : ''}>${esc(focusNames[f])}</option>`,
              )
              .join('')}</select></span>`}${set.type === 3
          ? `<span class="subtopic-controls"><label for="esp-recipe">Activity</label><select id="esp-recipe">${Object.entries(
              espRecipeNames,
            )
              .filter(([r]) => r.startsWith(set.focus === 'task1' ? 'T1.' : 'T2.'))
              .map(
                ([r, label]) =>
                  `<option value="${r}" ${r === set.questions[0].recipe ? 'selected' : ''}>${esc(label)}</option>`,
              )
              .join('')}</select></span>`
          : ''}${set.type === 1
          ? `<span class="subtopic-controls"><label for="subtopic">Subtopic</label><select id="subtopic"><option value="all">All subtopics</option>${examSubtopics(
              set.focus,
            )
              .map(
                ({ reference, count }) =>
                  `<option value="${reference}" ${reference === subtopic ? 'selected' : ''}>${reference} · ${count} ${count === 1 ? 'question' : 'questions'}</option>`,
              )
              .join(
                '',
              )}</select><label class="sequence-toggle"><input id="in-sequence" type="checkbox" aria-describedby="sequence-tooltip" ${inSequence ? 'checked' : ''}> In sequence<span class="sequence-tooltip" id="sequence-tooltip" role="tooltip">Advance new sets through subtopics in spec order.</span></label></span>`
          : ''}${set.type === 0 && set.focus === 'classic maths'
          ? `<label for="maths-topic">Maths topic</label><select id="maths-topic">${Object.entries({
              all: 'All maths',
              algebra: 'Algebra',
              number: 'Number and measures',
            })
              .map(
                ([key, label]) =>
                  `<option value="${key}" ${key === mathsTopic ? 'selected' : ''}>${label}</option>`,
              )
              .join('')}</select>`
          : ''}${set.type === 0
          ? `<label for="challenge-level">Challenge</label><select id="challenge-level">${Object.entries(
              challengeLevels,
            )
              .map(
                ([key, label]) =>
                  `<option value="${key}" ${key === level ? 'selected' : ''} ${availableChallenges(set.focus, mathsTopic).includes(key) ? '' : 'disabled'}>${challengeLabel(key, set.focus)}${availableChallenges(set.focus, mathsTopic).includes(key) ? '' : ' (not available)'}</option>`,
              )
              .join('')}</select>`
          : ''}
      </div>
    </div>
    ${set.updated
      ? '<p class="set-update-notice">This set has been updated since this code was created.</p>'
      : ''}
    ${trackingNotice}
    ${set.search
      ? `<p class="search-context">Search: <strong>${esc(set.search.query)}</strong> · ${searchGroup ? searchSetMatches(searchGroup, set.entries) : 0} of ${set.questions.length} questions match${searchGroup && searchSetMatches(searchGroup, set.entries) < set.questions.length ? ' · includes related practice' : ''}. <a href="#search=all&q=${encodeURIComponent(set.search.query)}">Change search</a> <button class="subtle" id="clear-search">Clear search</button></p>`
      : ''}
    ${set.type === 3
      ? '<p class="esp-notice">Each question is independent and designed for no more than 5 minutes. Scores cover automatic checks only; written reasoning needs separate review. These are practice marks, not ESP grades.</p>'
      : ''}
    ${subtopic !== 'all'
      ? `<details class="subtopic-notice"><summary>In sequence questions info</summary><p>Primary focus: <strong>${esc(subtopic)}</strong>. ${matchingQuestions} of ${set.questions.length} questions match.${matchingQuestions < set.questions.length ? ` ${set.questions.length - matchingQuestions} ${set.questions.length - matchingQuestions === 1 ? 'question adds' : 'questions add'} related ${esc(set.focus)} practice.` : ''} Matching parts are labelled; marks are tracked against each part’s spec references.</p></details>`
      : ''}
    ${record
      ? `<section class="result-banner" aria-label="Activity result"><span class="result-score">${record.percentage}%</span><div><h2>${record.outcome === 'expired' ? 'Time’s up. Answers submitted.' : 'Activity complete.'}</h2><p>${record.earned}/${record.max} marks · ${record.engagedSeconds === undefined ? 'elapsed time' : 'estimated practice time'}: ${duration(practiceSeconds(record))}${record.assisted ? ' · Assisted practice' : ''}${untracked ? ' · Practice only — progress not updated' : ''}. ${canReview() ? 'Review your feedback below.' : 'Submit your saved answers to unlock review for another four hours.'}</p></div><button id="retry">Try this set again</button></section>`
      : ''}
    <section class="set-toolbar" aria-label="Set code and timing">
      <div class="code-block">
        <div>
          <div class="code-label">YOUR ${set.questions.length === 1 ? 'ACTIVITY' : 'SET'} CODE</div>
          <div class="set-code" id="display-code">${esc(a.code)}</div>
        </div>
        <div class="code-actions">
          <button id="copy-code">Copy code</button><button id="copy-link">Copy link</button>
        </div>
      </div>
      <p class="set-summary muted">
        ${set.questions.length} ${set.questions.length === 1 ? 'question' : 'questions'} ·
        ${set.total} ${set.type === 0 ? 'points' : 'marks'} · ${set.type === 3 ? 'Up to' : 'About'}
        ${set.questions.length === 1
          ? (set.questions[0].estimatedMinutes ?? types[set.type].minutes)
          : types[set.type].minutes}
        minutes
      </p>
      <div class="timer-controls">
        <span class="timer-display" id="timer">${a.deadline ? '' : 'Untimed'}</span
        ><label for="minutes">Timer</label
        ><select id="minutes" ${a.finished ? 'disabled' : ''}>
          ${Array.from({ length: 11 }, (_, i) => i + 5)
            .map(
              (m) =>
                `<option value="${m}" ${m === (set.minutes ?? types[set.type].minutes) ? 'selected' : ''}>${m} min</option>`,
            )
            .join('')}</select
        ><button id="timer-toggle" ${a.finished ? 'disabled' : ''}>
          ${a.deadline ? 'Stop timer' : 'Start timer'}
        </button>
      </div>
    </section>
    <div class="random-controls">
      <button
        id="new-type"
        ${set.search
          ? ''
          : inSequence && !nextSubtopic
            ? 'disabled title="End of available subtopics."'
            : ''}
      >
        ${set.search
          ? 'Other matching topics'
          : inSequence
            ? 'Next question set'
            : 'Get new question set ↗'}</button
      ><button
        id="new-focus"
        ${set.search
          ? !searchAlternatives
            ? 'disabled title="No other set keeps these search matches."'
            : ''
          : inSequence && !nextSubtopic
            ? 'disabled title="End of available subtopics."'
            : !inSequence && !sameFocusAlternatives
              ? 'disabled title="No other question combination matches this selection. Use Get new permutation."'
              : ''}
      >
        ${inSequence
          ? 'Next set in sequence'
          : subtopic === 'all'
            ? 'New set in this focus'
            : 'New set with this subtopic'}</button
      ><button
        id="permutation"
        ${set.search
          ? !searchPermutation
            ? 'disabled title="No other permutation keeps these search matches."'
            : ''
          : set.questions.some((q) => q.variations.length < 2)
            ? 'disabled title="This set includes a fixed problem. Choose a new set for different puzzles."'
            : ''}
      >
        Get new permutation ↻
      </button>
    </div>
    ${set.type === 2 ? pythonGuidesHTML(set.questions, a.pythonGuidesOpen) : ''}
    <section class="questions" aria-label="Questions">
      ${set.questions.map((q, i) => questionHTML(q, i, set, a)).join('')}
    </section>
    <div class="submit-bar">
      ${record
        ? `<div class="submit-result" id="submit-result" tabindex="-1" role="status"><strong>${record.percentage}%</strong><span>${record.earned}/${record.max} ${set.type === 0 ? 'points' : 'marks'} · ${record.engagedSeconds === undefined ? 'elapsed time' : 'estimated practice time'}: ${duration(practiceSeconds(record))}${record.assisted ? ' · Assisted practice' : ''}<br>${record.outcome === 'expired' ? 'Time’s up. Answers submitted.' : 'Activity complete.'}</span></div>`
        : '<p>Try all questions, then submit your best try.</p>'}<button
        class="primary"
        id="submit"
        ${a.finished && canReview() ? 'disabled' : ''}
      >
        ${a.finished
          ? canReview()
            ? 'Submitted ✓'
            : 'Submit saved answers →'
          : 'Submit set answers →'}
      </button>
    </div>
    ${set.type === 2
      ? '<p class="project-link"><a href="#projects">Build something: Python project ideas ↗</a></p>'
      : ''}`;

  return { html, level, subtopic, mathsTopic, inSequence };
}
