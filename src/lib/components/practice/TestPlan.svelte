<!-- Review student-entered tests and source-bound execution evidence. -->
<script>
  import { studentTest, sameTest, testResponse } from '#domain/task2-tests.js';
  let { q, answers, evidence = [], source = '' } = $props();
  function test(id) {
    try {
      return studentTest(q, answers, id);
    } catch {
      return null;
    }
  }
  function outcome(id) {
    const v = testResponse(answers[id]);
    return v.type
      ? `${v.type === 'error' ? 'Exception' : v.type}: ${JSON.stringify(v.value ?? '')} · inputs used: ${v.consumed ?? 'not recorded'}`
      : 'Not recorded';
  }
</script>

<details class="test-plan">
  <summary>Your test-plan draft</summary>
  <p>
    Compare your expected results with the original runs, then check your repairs. Earlier runs are
    kept when you change inputs or code.
  </p>
  <!-- svelte-ignore a11y_no_noninteractive_tabindex (The scroll region needs keyboard access to columns outside the viewport.) -->
  <div class="test-log-scroll" role="region" aria-label="ESP Task 2 test log preview" tabindex="0">
    <table class="test-log">
      <caption class="sr-only">Your ESP Task 2 test-log draft</caption>
      <thead
        ><tr>
          <th scope="col">Description of test</th>
          <th scope="col">Test data</th>
          <th scope="col">Expected outcome</th>
          <th scope="col">Actual outcome</th>
          <th scope="col">Comments and intended actions</th>
        </tr></thead
      >
      <tbody>
        {#each q.testPlan as row, index}
          <tr class="test-plan-row" data-input-kind={row.kind}>
            <th scope="row"
              ><strong>Test {index + 1}</strong>
              <p>{row.description}</p></th
            >
            <td>
              {#each row.cases as c}
                {@const current = test(c.id)}
                <div class="log-case">
                  {#if row.cases.length > 1}<strong>{c.label}</strong>{/if}
                  {#if current}<code>{current.expression}</code>
                    {#each current.inputs as input, i}<p>
                        Input {i + 1}: <code>{JSON.stringify(input)}</code>
                      </p>{/each}
                  {:else}Not complete{/if}
                </div>
              {/each}
            </td>
            <td>
              {#each row.cases as c}<div class="log-case">
                  {#if row.cases.length > 1}<strong>{c.label}</strong>{/if}
                  <p>{outcome(c.expectedPart)}</p>
                </div>{/each}
            </td>
            <td>
              {#each row.cases as c}
                {@const current = test(c.id)}
                <div class="log-case">
                  {#if row.cases.length > 1}<strong>{c.label}</strong>{/if}
                  <p>{outcome(c.actualPart)}</p>
                  {#if evidence.some((run) => run.caseId === c.id)}
                    <details class="run-evidence">
                      <summary>Run evidence</summary>
                      {#each evidence.filter((run) => run.caseId === c.id) as run}
                        <details>
                          <summary
                            >{run.document === 'original' ? 'Original code' : 'Your code'} · {new Date(
                              run.at,
                            ).toLocaleTimeString()}
                            {current && sameTest(run, current) ? '' : ' · Earlier inputs'}
                            {run.document === 'edited' && run.source !== source
                              ? ' · Earlier code — retest needed'
                              : ''}</summary
                          >
                          <p>Call: <code>{run.expression}</code></p>
                          {#each run.inputs as input, i}<p>
                              Input {i + 1}: <code>{JSON.stringify(input)}</code>
                            </p>{/each}
                          <pre class="code-panel">{run.observation.stdout}{run.observation
                              .stderr}{run.observation.error
                              ? `${run.observation.error.type}: ${run.observation.error.message}`
                              : `Returned ${JSON.stringify(run.observation.value)} (${run.observation.type})`}{`\nInputs used: ${run.observation.consumed}`}</pre>
                        </details>
                      {/each}
                    </details>
                  {/if}
                </div>
              {/each}
            </td>
            <td
              ><ul>
                {#each row.actionParts as id}<li>
                    {id.endsWith('-repair')
                      ? 'See Your code and its retest evidence.'
                      : answers[id] || 'Not recorded'}
                  </li>{/each}
              </ul></td
            >
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</details>

<style>
  .test-plan {
    min-width: 0;
    max-width: 100%;
  }
  .test-log-scroll {
    max-width: 100%;
    overflow-x: auto;
  }
  .test-log-scroll:focus-visible {
    outline: 2px solid var(--selection-border);
    outline-offset: 2px;
  }
  .test-log {
    width: 100%;
    min-width: 64rem;
    table-layout: fixed;
    border-collapse: collapse;
    font-size: 0.85rem;
    line-height: 1.45;
  }
  th,
  td {
    padding: 0.65rem;
    border: 1px solid var(--control-border);
    text-align: left;
    vertical-align: top;
    overflow-wrap: anywhere;
  }
  thead th {
    background: var(--surface-soft);
    font-weight: 700;
  }
  tbody th {
    font-weight: normal;
  }
  th:first-child {
    width: 15%;
  }
  th:nth-child(2) {
    width: 21%;
  }
  th:nth-child(3) {
    width: 18%;
  }
  th:nth-child(4),
  th:nth-child(5) {
    width: 23%;
  }
  p {
    margin: 0.35rem 0 0;
  }
  ul {
    margin: 0;
    padding-left: 1rem;
  }
  li + li {
    margin-top: 0.4rem;
  }
  code {
    font-size: inherit;
    white-space: pre-wrap;
  }
  .log-case + .log-case {
    margin-top: 0.75rem;
    padding-top: 0.75rem;
    border-top: 1px solid var(--line);
  }
  .log-case > strong {
    display: block;
    margin-bottom: 0.35rem;
  }
  .run-evidence {
    margin-top: 0.5rem;
  }
  .test-log summary {
    padding: 0.35rem 0;
    min-height: 2rem;
  }
  .code-panel {
    max-height: 16rem;
    padding: 0.5rem;
    font-size: inherit;
    white-space: pre-wrap;
    overflow-wrap: anywhere;
  }
</style>
