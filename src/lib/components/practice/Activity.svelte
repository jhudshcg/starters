<!-- Practice layout; state changes go through the application command interface. -->
<script>
  import { resolve } from '$app/paths';
  import { activityModel } from '#lib/application/activity-model.js';
  import { types, focusNames } from '#domain/bank.js';
  import { pageStatus, developmentNotice } from '#domain/page-status.js';
  import { hasRecentSubmission } from '#domain/review.js';
  import { practiceSeconds } from '#domain/practice-time.js';
  import { REATTEMPT_HOURS, deadlineState } from '#domain/progress.js';
  import { searchSetMatches } from '#domain/search.js';
  import { duration } from '#domain/view-utils.js';
  import Breadcrumbs from './Breadcrumbs.svelte';
  import PuzzlePicker from './PuzzlePicker.svelte';
  import Selectors from './Selectors.svelte';
  import Guides from './Guides.svelte';
  import Question from './Question.svelte';
  let { app, view, href } = $props();
  const set = $derived(view.set),
    a = $derived(view.data.active);
  const model = $derived(activityModel(set, a, view.data));
  const record = $derived(a.result ?? view.data.history.find((r) => r.id === a.id));
  const review = $derived(hasRecentSubmission(a));
  const state = $derived(deadlineState(a));
  // Temporarily hide revision notices; compatibility/history metadata remains active.
  const showSetUpdateNotice = false;
  let minutes = $state(10);
  let timerKey;
  $effect(() => {
    const key = `${a.id}:${set.minutes}`;
    if (timerKey !== key) {
      timerKey = key;
      minutes = set.minutes ?? types[set.type].minutes;
    }
  });
  const unavailable = $derived(
    set.search
      ? !model.searchAlternatives
      : model.inSequence
        ? !model.nextSubtopic
        : !model.sameFocusAlternatives,
  );
  const noPermutation = $derived(
    set.search ? !model.searchPermutation : set.questions.some((q) => q.variations.length < 2),
  );
</script>

<Breadcrumbs type={set.type} focus={set.focus} {href} />
{#if set.type === 0}<details class="puzzle-picker">
    <summary>Puzzle type</summary><PuzzlePicker
      selected={set.focus}
      onchange={(focus) => app.practice.select(0, focus)}
    />
  </details>{/if}
<div class="page-top">
  <div>
    <h1>{focusNames[set.focus]}</h1>
    {#if pageStatus[set.type]?.inDevelopment}<p class="development-notice" role="note">
        {developmentNotice}
      </p>{/if}
  </div>
  <Selectors {set} {a} {model} practice={app.practice} />
</div>
{#if showSetUpdateNotice && set.updated}<p class="set-update-notice">
    This set has been updated since this code was created.
  </p>{/if}
{#if !a.tracking.eligible}<p class="tracking-notice" role="status">
    You attempted this set {Math.max(
      0,
      (a.tracking.checkedAt - a.tracking.previous) / 3600000,
    ).toFixed(1)} hours ago. To have your progress tracked, wait at least {REATTEMPT_HOURS}
    hours between reattempts. You can practise now, but this attempt will not update your progress.
  </p>{/if}
{#if set.search}<p class="search-context">
    Search: <strong>{set.search.query}</strong> · {model.searchGroup
      ? searchSetMatches(model.searchGroup, set.entries)
      : 0} of {set.questions.length} questions match{model.searchGroup &&
    searchSetMatches(model.searchGroup, set.entries) < set.questions.length
      ? ' · includes related practice'
      : ''}.
    <a href={href('#search=all&q=' + encodeURIComponent(set.search.query))}>Change search</a>
    <button
      class="action-button subtle"
      id="clear-search"
      onclick={() => app.practice.clearSearch()}>Clear search</button
    >
  </p>{/if}
{#if set.type === 3}<p class="esp-notice">
    Each question is independent and designed for no more than 5 minutes.
    {#if set.questions.some((q) => q.review)}
      Scores cover automatic checks only; written reasoning needs separate review.
    {:else}
      All answers in this activity are automatically marked.
    {/if}
    These are practice marks, not ESP grades.
  </p>{/if}
{#if model.subtopic !== 'all'}<details class="subtopic-notice">
    <summary>In sequence questions info</summary>
    <p>
      Primary focus: <strong>{model.subtopic}</strong>. {model.matchingQuestions}
      of {set.questions.length} questions match.{#if model.matchingQuestions < set.questions.length}
        {set.questions.length - model.matchingQuestions}
        {set.questions.length - model.matchingQuestions === 1 ? 'question adds' : 'questions add'} related
        {set.focus} practice.{/if} Matching parts are labelled; marks are tracked against each part’s
      spec references.
    </p>
  </details>{/if}
{#if record}<section class="surface-card result-banner" aria-label="Activity result">
    <span class="result-score">{record.percentage}%</span>
    <div>
      <h2>
        {record.outcome === 'expired' ? 'Time’s up. Answers submitted.' : 'Activity complete.'}
      </h2>
      <p>
        {record.earned}/{record.max} marks · {record.engagedSeconds === undefined
          ? 'elapsed time'
          : 'estimated practice time'}: {duration(practiceSeconds(record))}{record.assisted
          ? ' · Assisted practice'
          : ''}{!a.tracking.eligible ? ' · Practice only — progress not updated' : ''}. {review
          ? 'Review your feedback below.'
          : 'Submit your saved answers to unlock review for another four hours.'}
      </p>
    </div>
    <button
      class="action-button"
      id="retry"
      onclick={() => app.practice.start(set, { inSequence: model.inSequence })}
      >Try this set again</button
    >
  </section>{/if}
<section class="surface-card set-toolbar" aria-label="Set code and timing">
  <div class="code-block">
    <div>
      <div class="code-label">
        YOUR {set.questions.length === 1 ? 'ACTIVITY' : 'SET'} CODE
      </div>
      <div class="set-code" id="display-code">{a.code}</div>
    </div>
    <div class="code-actions">
      <button class="action-button" id="copy-code" onclick={() => app.copy(a.code)}
        >Copy code</button
      ><button
        class="action-button"
        id="copy-link"
        onclick={() =>
          app.copy(`${location.origin}${resolve('/')}#set=${encodeURIComponent(a.code)}`)}
        >Copy link</button
      >
    </div>
  </div>
  <p class="set-summary muted">
    {set.questions.length}
    {set.questions.length === 1 ? 'question' : 'questions'} · {set.total}
    {set.type === 0 ? 'points' : 'marks'} · {set.type === 3 ? 'Up to' : 'About'}
    {set.questions.length === 1
      ? (set.questions[0].estimatedMinutes ?? types[set.type].minutes)
      : types[set.type].minutes} minutes
  </p>
  <div class="timer-controls">
    <span
      class="timer-display"
      class:warning={!a.finished && state.remaining !== null && state.remaining <= 60}
      id="timer"
      >{a.pythonSubmission && !a.finished
        ? 'Checking submission'
        : a.finished
          ? a.deadline
            ? 'Finished'
            : 'Untimed'
          : state.remaining === null
            ? 'Untimed'
            : duration(state.remaining)}</span
    ><label for="minutes">Timer</label><select
      class="choice-field"
      id="minutes"
      disabled={Boolean(a.finished || a.pythonSubmission)}
      bind:value={minutes}
      >{#each Array.from({ length: 11 }, (_, i) => i + 5) as value}<option {value}
          >{value} min</option
        >{/each}</select
    ><button
      class="action-button"
      id="timer-toggle"
      disabled={Boolean(a.finished || a.pythonSubmission)}
      onclick={() => app.practice.timer(minutes)}
      >{a.deadline ? 'Stop timer' : 'Start timer'}</button
    >
  </div>
</section>
<div class="random-controls">
  <button
    class="action-button"
    id="new-type"
    disabled={!set.search && model.inSequence && !model.nextSubtopic}
    onclick={() => app.practice.replaceSet(set, 'type')}
    >{set.search
      ? 'Other matching topics'
      : model.inSequence
        ? 'Next question set'
        : 'Get new question set ↗'}</button
  ><button
    class="action-button"
    id="new-focus"
    disabled={unavailable}
    title={unavailable
      ? 'No other question combination matches this selection. Use Get new permutation.'
      : undefined}
    onclick={() => app.practice.replaceSet(set, 'focus')}
    >{model.inSequence
      ? 'Next set in sequence'
      : model.subtopic === 'all'
        ? 'New set in this focus'
        : 'New set with this subtopic'}</button
  ><button
    class="action-button"
    id="permutation"
    disabled={noPermutation}
    title={noPermutation ? 'No other permutation is available for this selection.' : undefined}
    onclick={() => app.practice.replaceSet(set, 'permutation')}>Get new permutation ↻</button
  >
</div>
{#if set.type === 2}<Guides
    questions={set.questions}
    opened={a.pythonGuidesOpen}
    onchange={app.practice.guide}
  />{/if}
<section class="questions" aria-label="Questions">
  {#each set.questions as q, index (`${a.id}:${q.slot}:${q.variation}`)}<Question
      {q}
      {index}
      {set}
      {a}
      {app}
      {href}
    />{/each}
</section>
{#if set.questions.some((q) => q.livePython)}
  <p role="status">{a.pythonStatus ?? ''}</p>
  {#if a.pythonBusy}<button class="action-button" onclick={() => app.practice.python.cancel()}
      >Stop Python</button
    >{/if}
  {#if a.pythonSubmission && !a.finished}<p>
      Your submitted code is saved and locked. Checking is pending; retry if Python was stopped or
      could not load.
    </p>{/if}
{/if}
<div class="submit-bar">
  {#if record}<div class="submit-result" id="submit-result" tabindex="-1" role="status">
      <strong>{record.percentage}%</strong><span
        >{record.earned}/{record.max}
        {set.type === 0 ? 'points' : 'marks'} · {record.engagedSeconds === undefined
          ? 'elapsed time'
          : 'estimated practice time'}: {duration(practiceSeconds(record))}{record.assisted
          ? ' · Assisted practice'
          : ''}<br />{record.outcome === 'expired'
          ? 'Time’s up. Answers submitted.'
          : 'Activity complete.'}</span
      >
    </div>{:else}<p>Try all questions, then submit your best try.</p>{/if}<button
    class="action-button primary"
    id="submit"
    disabled={Boolean(a.pythonBusy || (a.finished && review))}
    onclick={() => app.practice.submit('submitted')}
    >{a.pythonSubmission && !a.finished
      ? 'Retry submitted checks'
      : a.finished
        ? review
          ? 'Submitted ✓'
          : 'Submit saved answers →'
        : 'Submit set answers →'}</button
  >
</div>
{#if set.type === 2}<p class="project-link">
    <a href={href('#projects')}>Build something: Python project ideas ↗</a>
  </p>{/if}
