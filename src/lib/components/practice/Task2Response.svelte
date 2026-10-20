<!-- Student-owned test inputs and typed outcomes; the attempt service owns every saved response. -->
<script>
  import {
    testResponse,
    studentCases,
    studentTest,
    sameTest,
    completeOutcome,
  } from '#domain/task2-tests.js';
  let { q, part, answers, a, app } = $props();
  const locked = $derived(Boolean(a.finished || a.pythonSubmission));
  const value = $derived(testResponse(answers[part.id]));
  const spec = $derived(q.livePython.testInputs);
  const cases = $derived(
    studentCases(q).filter((c) =>
      part.testRole === 'data' ? c.row.dataPart === part.id : c.id === part.testCase,
    ),
  );
  let runNotice = $state('');
  const inputIssue = $derived.by(() => {
    if (part.testRole !== 'actual') return '';
    try {
      studentTest(q, answers, part.testCase);
      return '';
    } catch (error) {
      return error.message;
    }
  });
  async function runTest(document) {
    runNotice = 'Running this test…';
    await app.practice.python.execute(q.slot, 'run', false, { document, caseId: part.testCase });
    runNotice = a.pythonStatus ?? '';
  }
  const prefix = $derived(`test-${q.slot}-${part.id}`);
  function save(next) {
    app.practice.answer(q.slot, part.id, JSON.stringify(next));
  }
  function inputData(id, next) {
    save({ ...value, [id]: next });
  }
  function outcome(key, next) {
    save({ consumed: spec.parameters.length ? '0' : '', value: '', ...value, [key]: next });
  }
  function matching(c) {
    try {
      const test = studentTest(q, answers, c.id);
      const runs = (a.python?.[q.slot]?.evidence ?? []).filter((r) => sameTest(r, test));
      return ['original', 'edited'].flatMap((document) => {
        const run = runs.findLast((r) => r.document === document);
        return run ? [run] : [];
      });
    } catch {
      return [];
    }
  }
</script>

<div class="test-response" data-test-response={part.id}>
  {#if part.testRole === 'data'}
    <p class="muted">
      {spec.parameters.length
        ? 'Enter argument values that meet the requirements.'
        : cases[0].row.kind === 'invalid'
          ? 'Start with an invalid entry. Add further entries in order, ending with a valid entry so the intended function can finish.'
          : 'Choose one valid entry. It should be accepted without a retry.'}
    </p>
    {#each cases as c}
      <fieldset disabled={locked}>
        <legend>{c.name}</legend>
        {#if spec.parameters.length}
          {#each spec.parameters as parameter}
            <label for={`${prefix}-${c.id}-${parameter.name}`}
              >{parameter.name}{parameter.type === 'list'
                ? ' — numbers separated by commas'
                : ''}</label
            >
            {#if parameter.type === 'bool'}
              <select
                class="choice-field"
                id={`${prefix}-${c.id}-${parameter.name}`}
                value={value[c.id]?.args?.[parameter.name] ?? ''}
                onchange={(e) =>
                  inputData(c.id, {
                    args: { ...value[c.id]?.args, [parameter.name]: e.currentTarget.value },
                  })}
              >
                <option value="">Choose a value</option><option>True</option><option>False</option>
              </select>
            {:else}
              <input
                class="text-field"
                id={`${prefix}-${c.id}-${parameter.name}`}
                value={value[c.id]?.args?.[parameter.name] ?? ''}
                spellcheck="false"
                maxlength="1000"
                oninput={(e) =>
                  inputData(c.id, {
                    args: { ...value[c.id]?.args, [parameter.name]: e.currentTarget.value },
                  })}
              />
            {/if}
          {/each}
        {:else}
          {#each value[c.id]?.inputs ?? [] as entry, i}
            <div class="input-entry">
              <label for={`${prefix}-${c.id}-${i}`}>Input {i + 1}</label>
              <input
                class="text-field"
                id={`${prefix}-${c.id}-${i}`}
                value={entry}
                spellcheck="false"
                maxlength="1000"
                oninput={(e) =>
                  inputData(c.id, {
                    inputs: value[c.id].inputs.map((v, j) => (j === i ? e.currentTarget.value : v)),
                  })}
              />
              <small
                >{entry === ''
                  ? 'Empty input'
                  : `${entry.length} characters · ${JSON.stringify(entry)}`}</small
              >
              <button
                class="action-button subtle"
                aria-label={`Remove input ${i + 1} from ${c.name}`}
                onclick={() =>
                  inputData(c.id, { inputs: value[c.id].inputs.filter((_, j) => j !== i) })}
                >Remove</button
              >
            </div>
          {/each}
          <button
            class="action-button"
            disabled={(value[c.id]?.inputs.length ?? 0) >= 20}
            onclick={() => inputData(c.id, { inputs: [...(value[c.id]?.inputs ?? []), ''] })}
            >Add input</button
          >
          <small
            >Enter text exactly as it would be typed into Python. Spaces and leading zeroes are
            kept. Leave an added entry blank to test empty input.</small
          >
        {/if}
      </fieldset>
    {/each}
  {:else}
    {#if part.testRole === 'actual'}
      {@const c = cases[0]}
      <div class="test-actions">
        {#each ['original', 'edited'] as document}
          <button
            class="action-button"
            disabled={locked ||
              a.pythonBusy ||
              Boolean(inputIssue) ||
              !completeOutcome(answers[c.expectedPart])}
            onclick={() => runTest(document)}
          >
            Run {document === 'original' ? 'Original code' : 'Your code'}
          </button>
        {/each}
      </div>
      <small
        >Enter the expected result above to enable running. Record the original result below; use
        Your code to retest repairs.</small
      >
      {#if inputIssue}<p class="muted">{inputIssue}</p>{/if}
      {#if runNotice}<p role="status">{runNotice}</p>{/if}
      {#each matching(c) as run}
        <details class="run-result" open>
          <summary
            >{run.document === 'original' ? 'Original code' : 'Your code'} · {new Date(
              run.at,
            ).toLocaleTimeString()}{run.document === 'edited' &&
            run.source !== (answers.code ?? q.code)
              ? ' · Earlier code — retest needed'
              : ''}</summary
          >
          <pre class="code-panel">{run.observation.stdout}{run.observation.stderr}{run.observation
              .error
              ? `${run.observation.error.type}: ${run.observation.error.message}`
              : `Returned ${JSON.stringify(run.observation.value)} (${run.observation.type})`}{`\nInputs used: ${run.observation.consumed}`}</pre>
        </details>
      {/each}
    {/if}
    <fieldset disabled={locked}>
      <legend class="sr-only">{part.testRole === 'expected' ? 'Expected' : 'Actual'} result</legend>
      <label for={`${prefix}-type`}>Result type</label>
      <select
        id={`${prefix}-type`}
        class="choice-field"
        value={value.type ?? ''}
        onchange={(e) => outcome('type', e.currentTarget.value)}
      >
        <option value="">Choose a type</option>
        <option value="int">Integer (int)</option><option value="float">Decimal (float)</option>
        <option value="str">Text (str)</option><option value="bool">Boolean (bool)</option>
        <option value="NoneType">None</option><option value="error">Exception</option>
      </select>
      <label for={`${prefix}-value`}
        >{value.type === 'error' ? 'Exception name' : 'Returned value'}</label
      >
      <input
        class="text-field"
        id={`${prefix}-value`}
        value={value.value ?? ''}
        spellcheck="false"
        maxlength="1000"
        oninput={(e) => outcome('value', e.currentTarget.value)}
      />
      <small
        >{value.type === 'str'
          ? 'Enter the text without quotes. Leave blank for an empty string; spaces are kept.'
          : value.type === 'error'
            ? 'Enter the exception name shown by Python, for example ValueError.'
            : 'Record the returned value, not the printed messages.'}</small
      >
      {#if !spec.parameters.length}
        <label for={`${prefix}-consumed`}>Number of input entries used</label>
        <input
          class="text-field"
          id={`${prefix}-consumed`}
          type="number"
          min="0"
          max="20"
          step="1"
          value={value.consumed ?? ''}
          oninput={(e) => outcome('consumed', e.currentTarget.value)}
        />
        <small
          >Count entries read, including rejected ones. An unanswered extra prompt does not use an
          entry.</small
        >
      {/if}
    </fieldset>
  {/if}
</div>

<style>
  .test-response,
  fieldset {
    display: grid;
    gap: 0.6rem;
    min-width: 0;
  }
  fieldset {
    padding: 0;
    border: 0;
    margin: 0;
  }
  legend {
    font-weight: bold;
    margin-bottom: 0.6rem;
  }
  input,
  select {
    width: 100%;
    min-width: 0;
    max-width: 100%;
  }
  label {
    display: block;
    margin: 0;
  }
  small {
    overflow-wrap: anywhere;
  }
  .input-entry {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 0.4rem;
    align-items: start;
  }
  .input-entry label,
  .input-entry input {
    grid-column: 1 / -1;
  }
  .input-entry button {
    padding: 0.2rem 0.5rem;
    min-height: 2rem;
  }
  .test-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  .test-actions button {
    flex: 1 1 10rem;
  }
  .run-result {
    min-width: 0;
  }
  .code-panel {
    max-height: 18rem;
    white-space: pre-wrap;
    overflow-wrap: anywhere;
  }
</style>
