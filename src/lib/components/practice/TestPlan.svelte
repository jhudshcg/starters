<!-- Display student-selected input suites and supplied predictions, grouped by validity. -->
<script>
  let { rows, answers } = $props();
</script>

<details class="test-plan">
  <summary>Your test-plan draft</summary>
  <p>
    This draft uses your selections, which may be incorrect. Results below cover the supplied
    prediction cases; the other selected inputs still need testing. In the exam, record actual
    results after running the code.
  </p>
  {#each rows as row, index}
    <section class="test-plan-row" data-input-kind={row.kind}>
      <h3>Test {index + 1}</h3>
      <dl>
        <div>
          <dt>Description of test</dt>
          <dd>{row.description}</dd>
        </div>
        <div>
          <dt>Test data</dt>
          <dd>
            <ul class="test-data-values">
              {#each (answers[row.dataPart] || 'Not selected').split('; ') as value}<li>
                  {value}
                </li>{/each}
            </ul>
            <p class="muted">Supplied prediction cases</p>
            <ul>
              {#each row.cases as supplied}<li>
                  {supplied.label}: <code>{supplied.input}</code>
                </li>{/each}
            </ul>
          </dd>
        </div>
        <div>
          <dt>Expected outcome</dt>
          <dd>
            <ul>
              {#each row.cases as supplied}<li>
                  {supplied.label}: {answers[supplied.expectedPart] || 'Not selected'}
                </li>{/each}
            </ul>
          </dd>
        </div>
        <div>
          <dt>Actual outcome</dt>
          <dd>
            <p>Not run. Your predictions:</p>
            <ul>
              {#each row.cases as supplied}<li>
                  {supplied.label}: {answers[supplied.predictedPart] || 'Not selected'}
                </li>{/each}
            </ul>
          </dd>
        </div>
        <div>
          <dt>Comments and intended actions</dt>
          <dd>
            <ul>
              {#each row.actionParts as id}<li>{answers[id] || 'Not selected'}</li>{/each}
            </ul>
            <p>Any correction still needs to be applied and retested.</p>
          </dd>
        </div>
      </dl>
    </section>
  {/each}
</details>
