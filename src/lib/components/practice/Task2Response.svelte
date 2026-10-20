<!-- Student-owned test inputs and typed outcomes; the attempt service owns every saved response. -->
<script>
  import {
    testResponse,
    studentCases,
    studentTest,
    sameTest,
    completeOutcome,
    testInputIds,
    testOutcome,
    withTestOutcome,
    testRunOutput,
  } from '#domain/task2-tests.js';
  let { q, part, answers, a, app } = $props();
  const locked = $derived(Boolean(a.finished || a.pythonSubmission));
  const value = $derived(testResponse(answers[part.id]));
  const spec = $derived(q.livePython.testInputs);
  const cases = $derived(
    studentCases(q, part.testRole === 'data' ? undefined : answers).filter((c) =>
      part.testRole === 'data' ? c.row.dataPart === part.id : c.baseId === part.testCase,
    ),
  );
  let runNotice = $state('');
  function inputIssue(c) {
    try {
      studentTest(q, answers, c.id);
      return '';
    } catch (error) {
      return error.message;
    }
  }
  async function runTest(c, document) {
    runNotice = 'Running this test…';
    await app.practice.python.execute(q.slot, 'run', false, { document, caseId: c.id });
    runNotice = a.pythonStatus ?? '';
  }
  const prefix = $derived(`test-${q.slot}-${part.id}`);
  function save(next) {
    app.practice.answer(q.slot, part.id, JSON.stringify(next));
  }
  function inputData(id, next) {
    save({ ...value, [id]: next });
  }
  function outcome(c, key, next) {
    save(
      withTestOutcome(answers[part.id], c, {
        consumed: spec.parameters.length ? '0' : '',
        value: '',
        ...testOutcome(answers[part.id], c),
        [key]: next,
      }),
    );
  }
  function addInput(c) {
    const data = value[c.id] ?? {};
    const inputs = data.inputs ?? [];
    inputData(c.id, {
      inputs: [...inputs, ''],
      inputIds: [
        ...testInputIds(c.id, data),
        inputs.length || data.inputIds ? `${c.id}-input-${crypto.randomUUID()}` : c.id,
      ],
    });
  }
  function removeInput(c, index) {
    const data = value[c.id];
    inputData(c.id, {
      inputs: data.inputs.filter((_, i) => i !== index),
      inputIds: testInputIds(c.id, data).filter((_, i) => i !== index),
    });
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
          : 'Enter one valid value per input.'}
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
                    ...value[c.id],
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
                onclick={() => removeInput(c, i)}>Remove</button
              >
            </div>
          {/each}
          <button
            class="action-button"
            disabled={(value[c.id]?.inputs.length ?? 0) >= 20}
            onclick={() => addInput(c)}>Add input</button
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
      <div class="test-actions">
        {#each ['original', 'edited'] as document}
          <button
            class="action-button"
            disabled={locked ||
              a.pythonBusy ||
              cases.some(
                (c) => inputIssue(c) || !completeOutcome(testOutcome(answers[c.expectedPart], c)),
              )}
            onclick={() => runTest(cases[0], document)}
          >
            Run {document === 'original' ? 'Original code' : 'Your code'}
          </button>
        {/each}
      </div>
      <small>
        {cases[0].independent
          ? 'All chosen inputs run in order. Enter an expected result for each input first.'
          : 'Enter the expected result above to enable running.'}
        Record the original results below; use Your code to retest repairs.
      </small>
      {#each cases.filter((c) => inputIssue(c)) as c}<p class="muted">{inputIssue(c)}</p>{/each}
      {#if runNotice}<p role="status">{runNotice}</p>{/if}
    {/if}
    {#each cases as c (c.id)}
      {@const current = testOutcome(answers[part.id], c)}
      {@const fieldPrefix = c.id === c.baseId ? prefix : `${prefix}-${c.id}`}
      <section class="case-outcome" data-test-case={c.id}>
        {#if c.independent}<h4>
            {c.label}{#if c.input !== undefined}: <code>{JSON.stringify(c.input)}</code>{/if}
          </h4>{/if}
        {#if part.testRole === 'actual'}
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
              <pre class="code-panel">{testRunOutput(run.observation)}</pre>
            </details>
          {/each}
        {/if}
        <fieldset disabled={locked}>
          <legend class="sr-only"
            >{part.testRole === 'expected' ? 'Expected' : 'Actual'} result</legend
          >
          <label for={`${fieldPrefix}-type`}>Result type</label>
          <select
            id={`${fieldPrefix}-type`}
            class="choice-field"
            value={current.type ?? ''}
            onchange={(e) => outcome(c, 'type', e.currentTarget.value)}
          >
            <option value="">Choose a type</option>
            <option value="int">Integer (int)</option><option value="float">Decimal (float)</option>
            <option value="str">Text (str)</option><option value="bool">Boolean (bool)</option>
            <option value="NoneType">None</option><option value="error">Exception</option>
          </select>
          <label for={`${fieldPrefix}-value`}
            >{current.type === 'error' ? 'Exception name' : 'Returned value'}</label
          >
          <input
            class="text-field"
            id={`${fieldPrefix}-value`}
            value={current.value ?? ''}
            spellcheck="false"
            maxlength="1000"
            oninput={(e) => outcome(c, 'value', e.currentTarget.value)}
          />
          <small
            >{current.type === 'str'
              ? 'Enter the text without quotes. Leave blank for an empty string; spaces are kept.'
              : current.type === 'error'
                ? 'Enter the exception name shown by Python, for example ValueError.'
                : 'Record the returned value, not the printed messages.'}</small
          >
          {#if !spec.parameters.length}
            <label for={`${fieldPrefix}-consumed`}>Number of input entries used</label>
            <input
              class="text-field"
              id={`${fieldPrefix}-consumed`}
              type="number"
              min="0"
              max="20"
              step="1"
              value={current.consumed ?? ''}
              oninput={(e) => outcome(c, 'consumed', e.currentTarget.value)}
            />
            <small
              >Count entries read, including rejected ones. An unanswered extra prompt does not use
              an entry.</small
            >
          {/if}
        </fieldset>
      </section>
    {/each}
  {/if}
</div>

<style>
  .test-response,
  .case-outcome,
  fieldset {
    display: grid;
    gap: 0.6rem;
    min-width: 0;
  }
  .case-outcome + .case-outcome {
    border-top: 1px solid var(--line);
    padding-top: 1rem;
    margin-top: 0.5rem;
  }
  h4 {
    margin: 0;
    overflow-wrap: anywhere;
  }
  h4 code {
    font-size: inherit;
    white-space: pre-wrap;
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
