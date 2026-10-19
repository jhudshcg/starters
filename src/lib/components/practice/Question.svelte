<!-- Explicit answer events preserve marking, hints, first-response evidence and review gating. -->
<script>
  import { tick } from 'svelte';
  import Stimulus from './Stimulus.svelte';
  import TestPlan from './TestPlan.svelte';
  import PuzzleParts from './PuzzleParts.svelte';
  import { hasRecentSubmission } from '#domain/review.js';
  import { markQuestion } from '#domain/marking.js';
  import { marks, challengeLabel, matchesSubtopic } from '#domain/bank.js';
  import { questionCode } from '#domain/codes.js';
  import { revealPart } from '#domain/packed-data.js';
  import { formatCoverage } from '#domain/coverage.js';
  import { puzzleSolutionHTML } from '#domain/puzzle-view.js';
  let { q, index, set, a, app, href } = $props();
  const review = $derived(hasRecentSubmission(a));
  const answers = $derived(a.answers[q.slot] ?? {});
  const results = $derived(
    review && a.checks[q.slot] && (!a.feedbackHidden?.[q.slot] || a.finished)
      ? markQuestion(q, answers)
      : null,
  );
  const hintVisible = $derived(Boolean(a.hints[q.slot] && !a.hiddenHints?.[q.slot]));
  const subtopic = $derived(set.type === 1 ? (a.examSubtopic ?? 'all') : 'all');
  const matchCount = $derived(
    subtopic === 'all' ? 0 : q.parts.filter((p) => matchesSubtopic(p, subtopic)).length,
  );
  const indexedParts = $derived(q.parts.map((part, j) => ({ part, j })));
  const columnLabels = {
    data: 'Test data',
    expected: 'Expected outcome',
    predicted: 'Predicted outcome',
    actions: 'Comments and actions',
  };
  // Group only presentation; original part indexes still own labels and marking.
  const investigationGroups = $derived.by(() => {
    if (!q.testPlan) return [];
    const columns = new Map();
    for (const row of q.testPlan) {
      columns.set(row.dataPart, 'data');
      for (const supplied of row.cases) {
        columns.set(supplied.expectedPart, 'expected');
        columns.set(supplied.predictedPart, 'predicted');
      }
      for (const id of row.actionParts) columns.set(id, 'actions');
    }
    const groups = [];
    for (const item of indexedParts) {
      const column = columns.get(item.part.id) ?? 'data';
      const previous = groups.at(-1);
      if (previous?.column === column && previous.section === item.part.section) {
        previous.items.push(item);
      } else {
        groups.push({ key: item.part.id, column, section: item.part.section, items: [item] });
      }
    }
    return groups;
  });
  function outcome(result) {
    return !result
      ? undefined
      : result.needsReview
        ? 'review'
        : result.earned === result.max
          ? 'correct'
          : result.earned > 0
            ? 'partial'
            : 'incorrect';
  }
  async function hint() {
    app.practice.hint(q.slot);
    await tick();
    const panel = document.querySelector(`[data-question="${q.slot}"] .hint-text`);
    if (panel) {
      panel.focus({ preventScroll: true });
      app.toast('Hint shown. This question is marked as assisted practice.');
    }
  }
  async function reveal() {
    app.practice.reveal(q.slot);
    await tick();
    document.querySelector(`[data-question="${q.slot}"] .solution`)?.focus();
  }
</script>

<article class={`surface-card question type-${set.type}`} data-question={q.slot}>
  <div class="question-top">
    <span class="question-number">{String(index + 1).padStart(2, '0')}</span>
    <div>
      <h2>{q.title}</h2>
      <div class="muted">
        {q.format}{set.type === 0 ? ` · ${challengeLabel(q.challengeLevel, q.focus)}` : ''} ·
        <span title="Individual question code"
          >{questionCode(set.type, q.slot, q.variation, set.version)}</span
        >{q.tags.filter((t) => t.startsWith('CA')).length
          ? ' · ' + q.tags.filter((t) => t.startsWith('CA')).join(', ')
          : ''}
      </div>
    </div>
    <span class="marks-badge">{marks(q)} {set.type === 0 ? 'points' : 'marks'}</span>
  </div>
  <p class="question-prompt">{q.prompt}</p>
  {#if subtopic !== 'all'}<p class="subtopic-context">
      {matchCount
        ? `Includes ${subtopic} · ${matchCount} matching ${matchCount === 1 ? 'part' : 'parts'}`
        : `Related practice from ${set.focus}`}
    </p>{/if}
  {#if q.source && q.focus !== 'go'}<p class="muted">
      <a href={q.source.url} target="_blank" rel="noopener noreferrer">Puzzle source</a>
      · {q.source.note}
    </p>{/if}
  <div
    class="question-layout"
    class:investigation={Boolean(q.testPlan)}
    class:no-stimulus={!q.code && !q.grid && !q.sheet && !q.clues}
  >
    <Stimulus {q} />
    {#if set.type === 0}<PuzzleParts {q} {set} attempt={a} {results} {app} {href} />{:else}
      {#snippet renderParts(items)}
        {#each items as { part, j } (part.id)}
          {@const id = `answer-${q.slot}-${part.id}`}
          {@const result = results?.[j]}
          {@const showSelectedText = (answers[part.id]?.length ?? 0) > 30}
          {#if !q.testPlan && part.section && part.section !== q.parts[j - 1]?.section}
            <h3 class="answer-section">{part.section}</h3>
          {/if}
          {#snippet label()}{#if subtopic !== 'all' && matchesSubtopic(part, subtopic)}<span
                class="subtopic-match">Selected subtopic · {subtopic}</span
              >
            {/if}<span class="part-label">{String.fromCharCode(97 + j)})</span>
            {part.prompt}
            <span class="part-marks">({part.marks})</span>{/snippet}
          {#snippet code()}{#if part.code}<!-- svelte-ignore a11y_no_noninteractive_tabindex (Code panels remain keyboard-scrollable at high zoom.) -->
              <pre
                class="code-panel part-code"
                tabindex="0"
                role="region"
                aria-label={`Python code for part ${j + 1}`}><code>{part.code}</code
                ></pre>{/if}{/snippet}
          {#snippet feedback()}
            {#if part.coverage?.length}<details class="part-coverage">
                <summary>Spec reference</summary><small
                  >{formatCoverage(part.coverage)}{part.coverageMode === 'practice'
                    ? ' · Supporting practice'
                    : ''}</small
                >
              </details>{/if}
            {#if result}<p id={`feedback-${q.slot}-${j}`} class={`feedback ${outcome(result)}`}>
                {result.earned}/{result.max} · {result.message}
              </p>{/if}
          {/snippet}
          {#if part.control === 'select' && part.options}
            <div class="part" data-result={outcome(result)}>
              <label for={id}>{@render label()}</label>{@render code()}
              <select
                class="choice-field answer-select"
                {id}
                data-slot={q.slot}
                data-part={part.id}
                value={answers[part.id] ?? ''}
                disabled={Boolean(a.finished)}
                aria-describedby={[
                  showSelectedText ? `${id}-selected` : '',
                  result ? `feedback-${q.slot}-${j}` : '',
                ]
                  .filter(Boolean)
                  .join(' ') || undefined}
                onchange={(e) => app.practice.answer(q.slot, part.id, e.currentTarget.value)}
              >
                <option value="">Choose an answer</option>
                {#each part.options as option}<option value={option}>{option}</option>{/each}
              </select>
              {#if showSelectedText}
                <p class="selected-answer" id={`${id}-selected`}>{answers[part.id]}</p>
              {/if}
              {@render feedback()}
            </div>
          {:else if part.options}
            <fieldset class="part" data-result={outcome(result)} disabled={Boolean(a.finished)}>
              <legend>{@render label()}</legend>{@render code()}
              <div class="options">
                {#each part.options as option}<label class="option"
                    ><input
                      type="radio"
                      name={id}
                      value={option}
                      data-slot={q.slot}
                      data-part={part.id}
                      checked={answers[part.id] === option}
                      onchange={() => app.practice.answer(q.slot, part.id, option)}
                    />{option}</label
                  >{/each}
              </div>
              {@render feedback()}
            </fieldset>
          {:else}
            <div class="part" data-result={outcome(result)}>
              <label for={id}>{@render label()}</label>{@render code()}<input
                class="text-field"
                {id}
                data-slot={q.slot}
                data-part={part.id}
                value={answers[part.id] ?? ''}
                disabled={Boolean(a.finished)}
                inputmode={part.kind === 'number' ? 'decimal' : undefined}
                autocomplete="off"
                autocapitalize="off"
                spellcheck="false"
                aria-describedby={result ? `feedback-${q.slot}-${j}` : undefined}
                oninput={(e) => app.practice.answer(q.slot, part.id, e.currentTarget.value)}
              />{@render feedback()}
            </div>
          {/if}
        {/each}
      {/snippet}
      <div class="parts" class:investigation-parts={Boolean(q.testPlan)}>
        {#if q.testPlan}
          {#each investigationGroups as group (group.key)}
            <section
              class="investigation-group"
              data-column={group.column}
              aria-labelledby={`group-${q.slot}-${group.key}`}
            >
              <header>
                <p class="test-plan-column">{columnLabels[group.column]}</p>
                <h3 id={`group-${q.slot}-${group.key}`}>{group.section}</h3>
              </header>
              <div class="investigation-group-parts">{@render renderParts(group.items)}</div>
            </section>
          {/each}
        {:else}
          {@render renderParts(indexedParts)}
        {/if}
      </div>
    {/if}
  </div>
  {#if q.testPlan}<TestPlan rows={q.testPlan} {answers} />{/if}
  {#if q.review}<section class="esp-review">
      <h3>Written reasoning · separate review</h3>
      <label for={`review-${q.slot}`}>{q.review.prompt}</label><textarea
        class="working-field"
        id={`review-${q.slot}`}
        data-slot={q.slot}
        data-part="reflection"
        maxlength="1200"
        rows="3"
        disabled={Boolean(a.finished)}
        value={answers.reflection ?? ''}
        oninput={(e) => app.practice.answer(q.slot, 'reflection', e.currentTarget.value)}
      ></textarea>
      <p class="muted">
        This response is not automatically marked. Automatic marks do not assess your written
        reasoning.
      </p>
      {#if a.finished}<details>
          <summary>Review criteria and example</summary>
          <ul>
            {#each q.review.criteria as criterion}<li>{criterion}</li>{/each}
          </ul>
          <p>{q.review.example}</p>
        </details>
        <label
          >Review status <select
            class="choice-field"
            data-review-status={q.slot}
            value={a.espReview?.[q.slot]?.status ?? 'Needs review'}
            onchange={(e) => app.practice.review(q.slot, e.currentTarget.value)}
            >{#each ['Needs review', 'Self-reviewed', 'Teacher-reviewed'] as status}<option
                >{status}</option
              >{/each}</select
          ></label
        ><small>A recorded review status is not a grade or verified teacher approval.</small>{/if}
    </section>{/if}
  <div class="question-actions">
    {#if q.focus !== 'go'}<button
        class="action-button subtle"
        data-hint={q.slot}
        aria-expanded={hintVisible}
        onclick={hint}>{hintVisible ? 'Hide hint' : 'Show hint'}</button
      >{/if}{#if review}<button
        class="action-button"
        data-check={q.slot}
        onclick={() => app.practice.check(q.slot)}>Check answer</button
      ><button
        class="action-button subtle"
        data-reveal={q.slot}
        disabled={Boolean(a.reveals[q.slot])}
        onclick={reveal}>{a.reveals[q.slot] ? 'Answer shown' : 'Show answer'}</button
      >{/if}{#if a.hints[q.slot] || a.reveals[q.slot]}<small>Assisted practice</small>{/if}
  </div>
  {#if q.focus !== 'go' && hintVisible}<p class="hint-text" tabindex="-1">
      <strong>Hint:</strong>
      {q.hint}
    </p>{/if}
  {#if review && a.reveals[q.slot]}<div class="solution" tabindex="-1">
      <h3>Answers and explanations</h3>
      <ol class="solution-list" role="list">
        {#each q.parts as publicPart, j}{#if set.type === 0}{@html puzzleSolutionHTML(
              publicPart,
              j,
              q.slot,
            )}{:else}{@const part = revealPart(publicPart)}
            <li class="solution-part">
              <p class="solution-answer">
                <span class="part-label">{String.fromCharCode(97 + j)})</span>
                <strong>{part.solutionText ?? part.answer}</strong>
              </p>
              <p class="solution-explanation">{part.explanation}</p>
            </li>{/if}{/each}
      </ol>
    </div>{/if}
</article>
