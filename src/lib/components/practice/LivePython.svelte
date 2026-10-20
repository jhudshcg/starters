<!-- Question-bound editor. The attempt service owns source, permissions and execution. -->
<script>
  import { untrack } from 'svelte';
  import { resolve } from '$app/paths';
  import { pythonModes } from '#domain/live-python.js';
  import { revealPart } from '#domain/packed-data.js';
  let { q, a, app, hintVisible, review } = $props();
  let host,
    editor = $state.raw(null),
    notice = $state(''),
    mode = $state(''),
    mounting = $state(true);
  let generation = 0;
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
    editor?.destroy();
    editor = null;
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
        onRun: () => app.practice.python.execute(q.slot, 'check'),
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
      app.practice.python.edit(q.slot, currentEditor.source, currentEditor.snapshot());
    });
  });
  function changeMode(value) {
    editor.setMode(value);
    mode = editor.snapshot().mode;
    app.practice.python.edit(q.slot, editor.source, editor.snapshot());
  }
</script>

<svelte:head><link rel="stylesheet" href={`${resolve('/')}python/vendor/core.css`} /></svelte:head>

<div class="live-python">
  <ul class="requirements">
    {#each q.parts as p}<li>{p.prompt} ({p.marks} marks)</li>{/each}
  </ul>
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
  <p class="muted">
    {locked
      ? 'Submitted code · read only.'
      : mode === 'choices'
        ? 'Choose replacements beside the outlined code.'
        : mode === 'regions'
          ? 'Edit inside the outlined regions. The rest of the code is fixed.'
          : 'Edit the code. Changed regions lose their outlines.'}
    {#if !locked}Ctrl/Cmd + Enter checks code when permitted.{/if}
  </p>
  {#if notice}<p role="status">{notice}</p>{/if}
  <div class="live-python-editor" bind:this={host} inert={locked}></div>
  {#if permitted && q.livePython.actions.includes('run')}
    <label
      >Try a function call<input
        class="text-field"
        placeholder="Enter your function call"
        spellcheck="false"
        value={saved?.expression ?? ''}
        disabled={locked}
        oninput={(e) => app.practice.python.expression(q.slot, e.currentTarget.value)}
      /></label
    >
  {/if}
  <div class="question-actions">
    {#if permitted}
      {#if q.livePython.actions.includes('run')}<button
          class="action-button"
          disabled={mounting || a.pythonBusy}
          onclick={() => app.practice.python.execute(q.slot, 'run')}>Run code</button
        >{/if}
      <button
        class="action-button"
        disabled={mounting || a.pythonBusy}
        onclick={() => app.practice.python.execute(q.slot)}>Check code</button
      >
    {/if}
    {#if !locked}<button
        class="action-button subtle"
        disabled={mounting || a.pythonBusy}
        onclick={() => {
          editor.source = q.code;
          changeMode(policy.defaultMode);
        }}>Reset code</button
      >{/if}
  </div>
  {#if saved?.output}<pre class="code-panel">{saved.output}</pre>{/if}
  {#if saved?.result && saved.result.source === (a.answers[q.slot]?.code ?? q.code)}
    <ul aria-live="polite">
      {#each saved.result.parts as result, i}<li>
          {result.earned}/{result.max} · {q.parts[i].prompt}: {result.message}
        </li>{/each}
    </ul>
  {/if}
  {#if review && a.reveals[q.slot]}
    <div class="solution" tabindex="-1">
      <h3>Example solution</h3>
      <pre class="code-panel"><code>{revealPart(q.parts[0]).solutionText}</code></pre>
      <p>{revealPart(q.parts[0]).explanation}</p>
    </div>
  {/if}
</div>

<style>
  .live-python {
    min-width: 0;
  }
  select {
    width: 20ch;
    max-width: 100%;
  }
  .live-python-editor {
    min-width: 0;
    min-height: 100px;
    margin: 1rem 0;
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
</style>
