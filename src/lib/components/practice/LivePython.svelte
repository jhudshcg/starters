<!-- Question-bound editor. The attempt service owns source, permissions and execution. -->
<script>
  import { onMount, untrack } from 'svelte';
  import { resolve } from '$app/paths';
  import { pythonModes } from '#domain/live-python.js';
  import { markQuestion } from '#domain/marking.js';
  import { revealPart } from '#domain/packed-data.js';
  let { q, a, app, hintVisible, review } = $props();
  let host,
    editor = $state.raw(null),
    notice = $state(''),
    mode = $state(''),
    mounting = $state(true);
  let generation = 0;
  let originalHost = $state(),
    originalEditor = $state.raw(null),
    tab = $state('edited');
  let height = $state(180);
  let resultsMinimised = $state(false);
  let guidanceMinimised = $state(false);
  let intro,
    docked = $state(false),
    viewportHeight = $state(900),
    singleColumn = $state(false),
    dockedHeight = $state(null);
  const visibleHeight = $derived(
    docked
      ? (dockedHeight ?? Math.min(height, viewportHeight * (singleColumn ? 0.45 : 0.65)))
      : height,
  );
  function setHeight(value) {
    height = Math.max(100, Math.min(3000, value));
    if (docked) dockedHeight = height;
  }
  function check() {
    resultsMinimised = false;
    return app.practice.python.execute(q.slot, 'check');
  }
  let dragStart = null;
  let workspace;
  onMount(() => {
    const measure = () => {
      viewportHeight = window.innerHeight;
      singleColumn = window.innerWidth < 768;
      docked = intro.getBoundingClientRect().bottom <= (singleColumn ? 0 : 16);
    };
    let frame;
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(intro);
    window.addEventListener('resize', schedule);
    window.addEventListener('scroll', schedule, { passive: true });
    measure();
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', schedule);
      window.removeEventListener('scroll', schedule);
      cancelAnimationFrame(frame);
    };
  });
  onMount(() => {
    height = Math.max(
      100,
      Math.min(
        q.code.split('\n').length * 24 + 32,
        Math.max(window.innerWidth * 1.4, window.innerHeight * 0.75),
      ),
    );
  });
  const prediction = $derived(saved?.predictions?.at(-1));
  const predictionReady = $derived(
    !q.livePython.predictions?.length ||
      a.finished ||
      q.livePython.predictions.every((id) => String(a.answers[q.slot]?.[id] ?? '').trim()),
  );
  const predictionCurrent = $derived(
    prediction?.source === (a.answers[q.slot]?.code ?? q.code) &&
      q.livePython.predictions?.every((id) => prediction.answers[id] === a.answers[q.slot]?.[id]),
  );
  function run() {
    return app.practice.python.execute(q.slot, 'run', false, {
      document: tab,
    });
  }
  function resize(event) {
    if (!dragStart) return;
    setHeight(dragStart.height + event.clientY - dragStart.y);
  }
  $effect(() => {
    editor?.setHeight(visibleHeight);
    originalEditor?.setHeight(visibleHeight);
    // Focused answer fields must clear the pinned code, including after manual resizing.
    workspace?.parentElement.style.setProperty(
      '--editor-scroll-offset',
      `${docked ? visibleHeight + (q.livePython.tabs ? 100 : 40) : 0}px`,
    );
  });
  const locked = $derived(Boolean(a.finished || a.pythonSubmission));
  const attemptId = $derived(a.id);
  const level = $derived(a.pythonLevel ?? 'foundation');
  const policy = $derived(pythonModes(q, level, hintVisible));
  const saved = $derived(a.python?.[q.slot]);
  const permitted = $derived(
    Boolean(a.finished || (!locked && q.livePython.access === 'practice')),
  );
  const names = {
    choices: 'Choose replacements',
    regions: 'Edit marked regions',
    free: 'Edit all code',
  };
  async function mount(readOnly) {
    const mine = ++generation;
    notice = '';
    editor?.destroy();
    editor = null;
    originalEditor?.destroy();
    originalEditor = null;
    mounting = true;
    try {
      const module = await app.practice.python.module();
      if (mine !== generation) return;
      const created = await module.createEditor(host, a.answers[q.slot]?.code ?? q.code, {
        original: q.code,
        definitions: readOnly ? [] : q.livePython.regions,
        saved: readOnly ? null : a.python?.[q.slot]?.editor,
        readOnly,
        onNotice: (message) => (notice = message),
        onSelect: () => {},
        onRun: () => (q.livePython.actions.includes('run') ? run() : check()),
        onChange: (source) => {
          if (mine !== generation) return;
          app.practice.python.edit(q.slot, source, editor?.snapshot());
          notice = '';
        },
      });
      if (mine !== generation) {
        created.destroy();
        return;
      }
      editor = created;
      created.setFill(true);
      if (q.livePython.tabs) {
        const original = await module.createEditor(originalHost, q.code, {
          original: q.code,
          definitions: [],
          saved: null,
          readOnly: true,
          onNotice: (message) => (notice = message),
          onChange: () => {},
          onSelect: () => {},
          onRun: run,
        });
        if (mine !== generation) {
          original.destroy();
          return;
        }
        originalEditor = original;
      }
      if (!readOnly) {
        created.setMode(a.python?.[q.slot]?.editor?.mode ?? policy.defaultMode);
        mode = created.snapshot().mode;
      }
    } catch (error) {
      if (mine === generation)
        notice = `${error.message} Reload to retry the editor; your saved code is kept.`;
    } finally {
      if (mine === generation) mounting = false;
    }
  }
  $effect(() => {
    const readOnly = locked,
      identity = attemptId;
    if (identity) untrack(() => mount(readOnly));
    return () => {
      generation++;
      editor?.destroy();
      originalEditor?.destroy();
      originalEditor = null;
      editor = null;
    };
  });
  $effect(() => {
    const showHint = hintVisible,
      currentLevel = level,
      currentEditor = editor;
    if (!currentEditor || locked) return;
    untrack(() => {
      const p = pythonModes(q, currentLevel, showHint);
      currentEditor.setMode(showHint && p.modes.includes('choices') ? 'choices' : p.defaultMode);
      mode = currentEditor.snapshot().mode;
      notice = '';
      app.practice.python.edit(q.slot, currentEditor.source, currentEditor.snapshot());
    });
  });
  function changeMode(value) {
    editor.setMode(value);
    mode = editor.snapshot().mode;
    notice = '';
    app.practice.python.edit(q.slot, editor.source, editor.snapshot());
  }
</script>

<svelte:head><link rel="stylesheet" href={`${resolve('/')}python/vendor/core.css`} /></svelte:head>

<div class="live-python coding-workspace" bind:this={workspace}>
  <div class="coding-intro" bind:this={intro}>
    <div class="guidance-heading">
      <strong>Code guidance</strong>
      <button
        class="action-button subtle disclosure-toggle guidance-toggle"
        aria-label={guidanceMinimised ? 'Expand code guidance' : 'Minimise code guidance'}
        aria-expanded={!guidanceMinimised}
        aria-controls={`code-guidance-${q.slot}`}
        onclick={() => (guidanceMinimised = !guidanceMinimised)}
        ><span aria-hidden="true">{guidanceMinimised ? '+' : '−'}</span></button
      >
    </div>
    <div id={`code-guidance-${q.slot}`} hidden={guidanceMinimised}>
      {#if q.requirements?.length}<ul class="requirements">
          {#each q.requirements ?? [] as text}<li>{text}</li>{/each}
        </ul>{/if}
      <p class="muted">
        {q.livePython.access === 'practice'
          ? 'Learning practice · experiment and check before submitting. This score is separate from independent readiness.'
          : 'Assessment · code is checked when you submit.'}
      </p>
      {#if !locked && policy.modes.length > 1}
        <label
          >Editing mode <select
            class="choice-field"
            value={mode}
            disabled={mounting}
            onchange={(e) => changeMode(e.currentTarget.value)}
          >
            {#each policy.modes as value}<option {value}>{names[value]}</option>{/each}
          </select></label
        >
      {/if}
      <p class="muted editor-guidance" role="status">
        {#if notice}{notice}{:else}{locked
            ? 'Submitted code · read only.'
            : mode === 'choices'
              ? 'Choose replacements beside the outlined code.'
              : mode === 'regions'
                ? 'Edit inside the outlined regions. The rest of the code is fixed.'
                : 'Edit the code. Changed regions lose their outlines.'}
          {#if !locked}Ctrl/Cmd + Enter runs code when permitted.{/if}{/if}
      </p>
    </div>
    {#if guidanceMinimised && notice}<p role="status">{notice}</p>{/if}
  </div>
  <div class="editor-dock" class:docked>
    {#if q.livePython.tabs}
      <div class="editor-tabs" role="tablist" aria-label="Code version">
        {#each ['original', 'edited'] as value, i}
          <button
            role="tab"
            id={`tab-${q.slot}-${value}`}
            aria-controls={`editor-${q.slot}-${value}`}
            aria-selected={tab === value}
            tabindex={tab === value ? 0 : -1}
            class="editor-tab"
            onclick={() => (tab = value)}
            onkeydown={(e) => {
              if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) {
                e.preventDefault();
                tab =
                  e.key === 'Home'
                    ? 'original'
                    : e.key === 'End'
                      ? 'edited'
                      : value === 'original'
                        ? 'edited'
                        : 'original';
                document.getElementById(`tab-${q.slot}-${tab}`)?.focus();
              }
            }}>{i === 0 ? 'Original code' : 'Your code'}</button
          >
        {/each}
      </div>
      <div
        class="editor-document"
        id={`editor-${q.slot}-original`}
        role="tabpanel"
        aria-labelledby={`tab-${q.slot}-original`}
        hidden={tab !== 'original'}
      >
        <div class="live-python-editor" bind:this={originalHost}></div>
      </div>
    {/if}
    <div
      class="editor-document"
      id={`editor-${q.slot}-edited`}
      role={q.livePython.tabs ? 'tabpanel' : undefined}
      aria-labelledby={q.livePython.tabs ? `tab-${q.slot}-edited` : undefined}
      hidden={tab !== 'edited'}
    >
      <div class="live-python-editor" bind:this={host}></div>
    </div>
    <div class="editor-height">
      <button
        class="height-handle"
        aria-label="Drag to resize editor; use arrow keys to adjust height"
        onpointerdown={(e) => {
          dragStart = { y: e.clientY, height: visibleHeight };
          e.currentTarget.setPointerCapture(e.pointerId);
        }}
        onpointermove={resize}
        onpointerup={() => (dragStart = null)}
        onpointercancel={() => (dragStart = null)}
        onkeydown={(e) => {
          if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
            e.preventDefault();
            setHeight(visibleHeight + (e.key === 'ArrowUp' ? -20 : 20));
          }
        }}><span aria-hidden="true"></span></button
      >
    </div>
  </div>
  <!-- Retain the normal flow height when the pinned editor becomes compact, avoiding a page jump. -->
  <div
    class="editor-space"
    aria-hidden="true"
    style:height={`calc(1rem + ${Math.max(0, height - visibleHeight)}px)`}
  ></div>
  <div class="coding-controls">
    {#if q.livePython.predictions?.length && !locked}
      <p>Enter your predictions in the question parts, then choose Run and compare.</p>
      {#if predictionCurrent && prediction}
        {#if prediction.rethink && !saved?.runs}<p role="status">
            {q.livePython.rethink} Revise your predictions, or choose Run and compare again to continue.
          </p>{/if}
        {#if prediction.afterRun}<small
            >These predictions were revised after running. Your earlier predictions are kept.</small
          >{/if}
      {/if}
    {/if}
    {#if q.livePython.testInputs}
      <p class="muted">
        Run each test from its test-plan row. Ctrl/Cmd + Enter reruns the most recently selected
        test using the visible code tab.
      </p>
    {:else if permitted && q.livePython.actions.includes('run') && q.livePython.expression !== 'None'}
      <label class="run-field"
        >Try a function call
        <input
          class="text-field"
          placeholder="Enter your function call"
          spellcheck="false"
          value={saved?.expression ?? q.livePython.expression ?? ''}
          disabled={locked}
          oninput={(e) => app.practice.python.expression(q.slot, e.currentTarget.value)}
        />
      </label>
    {/if}
    <div class="question-actions">
      {#if permitted}
        {#if q.livePython.actions.includes('run') && !q.livePython.testInputs}<button
            class="action-button"
            disabled={mounting || a.pythonBusy || !predictionReady}
            onclick={run}
            >{q.livePython.predictions?.length ? 'Run and compare' : 'Run code'}</button
          >{/if}
        {#if q.livePython.actions.includes('check')}<button
            class="action-button"
            disabled={mounting || a.pythonBusy || !predictionReady}
            onclick={check}
            >{q.livePython.testInputs ? 'Check test plan and code' : 'Check code'}</button
          >{/if}
      {/if}
      {#if !locked}<button
          class="action-button subtle"
          disabled={mounting || a.pythonBusy}
          onclick={() => {
            editor.setMode('free');
            editor.source = q.code;
            changeMode(policy.defaultMode);
          }}>Reset code</button
        >{/if}
    </div>
    {#if saved?.output && !q.livePython.testInputs}
      <section class="run-output" aria-label="Program output">
        <h3>Program output</h3>
        <pre class="code-panel">{saved.output}</pre>
      </section>
    {/if}
    {#if saved?.result?.parts && saved.result.source === (a.answers[q.slot]?.code ?? q.code)}
      <section class="check-results" aria-label="Check results" aria-live="polite">
        <div class="check-results-heading">
          <h3>Check results</h3>
          <button
            class="action-button subtle disclosure-toggle results-toggle"
            aria-label={resultsMinimised ? 'Expand check results' : 'Minimise check results'}
            aria-expanded={!resultsMinimised}
            aria-controls={`check-results-${q.slot}`}
            onclick={() => (resultsMinimised = !resultsMinimised)}
          >
            <span aria-hidden="true">{resultsMinimised ? '+' : '−'}</span>
          </button>
        </div>
        <div id={`check-results-${q.slot}`} hidden={resultsMinimised}>
          <p class="muted">
            {q.livePython.testInputs
              ? 'Test-plan marks and repair checks. Program output appears beside each test.'
              : 'Feedback from the code checks.'}
          </p>
          <ul>
            {#each markQuestion(q, a.answers[q.slot] ?? {}, saved.result).filter((r) => q.parts.find((p) => p.id === r.id)?.kind === 'python' || q.parts.find((p) => p.id === r.id)?.testRole) as result}
              {@const index = q.parts.findIndex((p) => p.id === result.id)}
              <li data-check-result={result.earned === result.max ? 'passed' : 'not-passed'}>
                <div class="check-result-title">
                  <strong
                    >Part {String.fromCharCode(97 + index)} · {q.parts[index].testRole === 'data'
                      ? 'Test inputs'
                      : q.parts[index].testRole === 'expected'
                        ? 'Expected result'
                        : q.parts[index].testRole === 'actual'
                          ? 'Recorded result'
                          : 'Code repair'}</strong
                  >
                  <span>{result.earned}/{result.max}</span>
                </div>
                <p>{result.message}</p>
              </li>
            {/each}
          </ul>
        </div>
      </section>
    {/if}
    {#if review && a.reveals[q.slot] && q.parts.some((p) => p.kind === 'python')}
      <div class="solution" tabindex="-1">
        <h3>Example solution</h3>
        <pre class="code-panel"><code
            >{revealPart(q.parts.find((p) => p.kind === 'python')).solutionText}</code
          ></pre>
        <p>{revealPart(q.parts.find((p) => p.kind === 'python')).explanation}</p>
      </div>
    {/if}
  </div>
</div>

<style>
  /* Sections share the question grid, so only code sticks and results cannot move it offscreen. */
  .coding-workspace {
    display: contents;
  }
  .coding-intro,
  .coding-controls {
    min-width: 0;
    padding: 1rem;
    background: var(--surface);
    border: 1px solid var(--line);
  }
  .coding-intro {
    grid-area: guidance;
    border-radius: 0.75rem 0.75rem 0 0;
    border-bottom: 0;
  }
  .coding-controls {
    grid-area: controls;
    border-radius: 0 0 0.75rem 0.75rem;
    border-top: 0;
  }
  .editor-dock {
    grid-area: editor;
    min-width: 0;
    position: sticky;
    top: 1rem;
    z-index: 2;
    padding-inline: 1rem;
    background: var(--surface);
  }
  .editor-dock::before {
    content: '';
    position: absolute;
    inset: 0;
    border-inline: 1px solid var(--line);
    pointer-events: none;
  }
  .editor-dock.docked {
    box-shadow: 0 3px 8px rgb(0 0 0 / 15%);
  }
  .editor-space {
    grid-area: spacer;
    background: var(--surface);
    border-inline: 1px solid var(--line);
  }
  .coding-controls > :first-child {
    margin-top: 0;
  }
  .coding-controls > :last-child {
    margin-bottom: 0;
  }
  .check-results,
  .run-output {
    margin-top: 1rem;
    border-top: 1px solid var(--line);
    padding-top: 1rem;
  }
  .check-results h3,
  .run-output h3 {
    margin: 0 0 0.5rem;
    font-size: 1.1rem;
  }
  .guidance-heading,
  .check-results-heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
  }
  .check-results-heading h3 {
    margin: 0;
  }
  .disclosure-toggle {
    flex: 0 0 2.75rem;
    width: 2.75rem;
    height: 2.75rem;
    padding: 0;
    font-size: 1.25rem;
  }
  .check-results ul {
    display: grid;
    gap: 0.6rem;
    list-style: none;
    padding: 0;
  }
  .check-results li {
    border: 1px solid var(--line);
    border-radius: 0.5rem;
    padding: 0.75rem;
  }
  .check-result-title {
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
  }
  .check-results li p {
    margin: 0.5rem 0 0;
    overflow-wrap: anywhere;
  }
  .run-field {
    display: grid;
    gap: 0.5rem;
  }
  .run-field input {
    width: 100%;
    min-width: 0;
  }
  .editor-tabs {
    display: flex;
    align-items: stretch;
    gap: 0.25rem;
    margin: 0 -1rem;
    padding: 0 1rem;
    border-bottom: 1px solid var(--line);
  }
  .editor-tab {
    flex: 0 1 auto;
    min-width: 0;
    max-width: 50%;
    min-height: 2.75rem;
    padding: 0.65rem 1rem;
    border: 1px solid var(--line);
    border-bottom: 0;
    border-radius: 0.5rem 0.5rem 0 0;
    background: var(--surface);
    color: var(--text);
    font: inherit;
    cursor: pointer;
  }
  .editor-tab:hover {
    background: color-mix(in srgb, var(--main) 6%, var(--surface));
  }
  .editor-tab[aria-selected='true'] {
    background: color-mix(in srgb, var(--main) 12%, var(--surface));
    color: var(--text);
    box-shadow: inset 0 3px var(--main);
    font-weight: 700;
  }
  .editor-tab:focus-visible {
    outline: 2px solid var(--selection-border);
    outline-offset: 2px;
  }
  .editor-document[role='tabpanel'] .live-python-editor {
    margin-top: 0;
    border-top: 0;
  }
  .editor-height {
    position: absolute;
    top: 100%;
    inset-inline: 0;
    height: 1rem;
    display: flex;
    justify-content: center;
    pointer-events: none;
  }
  .height-handle {
    pointer-events: auto;
    cursor: ns-resize;
    touch-action: none;
    display: grid;
    place-items: center;
    width: 2.35rem;
    min-height: 1rem;
    padding: 0;
    border: 1px solid var(--line);
    border-top: 0;
    border-radius: 0 0 0.4rem 0.4rem;
    background: var(--surface);
    color: var(--text);
  }
  .height-handle span {
    width: 0.94rem;
    height: 0.24rem;
    border-block: 1px solid currentColor;
  }
  .height-handle:focus-visible {
    outline: 2px solid var(--selection-border);
    outline-offset: 2px;
  }
  select {
    width: 20ch;
    max-width: 100%;
  }
  .live-python-editor {
    min-width: 0;
    min-height: 100px;
    margin: 0;
    border: 1px solid var(--line);
  }
  .editor-document {
    margin-inline: -1rem;
  }
  .live-python-editor :global(.py-editor-box::before) {
    display: none;
  }
  .live-python-editor :global(py-editor) {
    display: block;
    min-width: 0;
  }
  .live-python-editor :global(.py-editor-input) {
    border: 0;
    background: transparent;
  }
  input {
    font-family: ui-monospace, monospace;
  }
  @media (width < 768px) {
    .coding-controls {
      margin-bottom: 1.5rem;
    }
    .editor-dock {
      top: 0;
    }
    .editor-document {
      margin-inline: calc(-1rem - var(--question-inline-padding));
    }
    .live-python-editor {
      border-inline: 0;
    }
    /* Side rules belong to the inset tabs, not across the wider code surface. */
    .editor-dock::before {
      display: none;
    }
    .editor-tabs {
      border-bottom: 0;
      box-shadow:
        inset 1px 0 var(--line),
        inset -1px 0 var(--line);
    }
    .editor-document[role='tabpanel'] .live-python-editor {
      border-top: 1px solid var(--line);
    }
    .editor-dock.docked {
      box-shadow: none;
    }
    .editor-dock.docked .editor-document {
      box-shadow: 0 3px 8px rgb(0 0 0 / 15%);
    }
  }
</style>
