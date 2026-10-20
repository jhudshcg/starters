<!-- Completed snapshots are read-only and do not open practice or change its timer. -->
<script>
  import { describeTestResponse, testRunOutput } from '#domain/task2-tests.js';
  let { records = [], summaries = [] } = $props();
  let selected = $state('');
  const identity = (r) => `${r.generation}:${r.type}:${r.slot}:${r.variation}`;
  const groups = $derived([...new Map(summaries.map((r) => [identity(r), r])).entries()]);
  const key = $derived(selected || groups[0]?.[0]);
  const rows = $derived(
    summaries
      .filter((r) => identity(r) === key)
      .sort((a, b) => b.finished - a.finished || b.id.localeCompare(a.id)),
  );
  const date = (at) => new Date(at).toLocaleString('en-GB');
</script>

{#if summaries.length}
  <section class="surface-card progress-panel">
    <h2>Code attempts and skill progression</h2>
    <p>
      Review the six most recent completed attempts for each question and variation. Older scores
      and skill summaries remain. Your current draft is separate.
    </p>
    <label
      >Question and variation
      <select class="choice-field" value={key} onchange={(e) => (selected = e.currentTarget.value)}>
        {#each groups as [id, row]}<option value={id}
            >{row.title} · variation {row.variation + 1} · bank {row.type}, generation {row.generation}</option
          >{/each}
      </select>
    </label>
    {#each rows as row (row.id)}
      {@const record = records.find((r) => r.id === row.id)}
      <details class="attempt-review">
        <summary
          >{date(row.finished)} · {row.earned}/{row.max} · {row.tracked
            ? 'Tracked attempt'
            : 'Practice-only repeat'}</summary
        >
        <p>
          Support used: {row.support.mode} editing; {row.support.runs} runs; {row.support.checks} checks;
          hint {row.support.hint ? 'shown' : 'not shown'}; answer {row.support.reveal
            ? 'shown'
            : 'not shown'}.
        </p>
        <ul>
          {#each row.skills as skill}<li>{skill.prompt} — {skill.earned}/{skill.max}</li>{/each}
        </ul>
        {#if record}
          <p>{record.prompt}</p>
          <ul>
            {#each record.requirements as requirement}<li>{requirement}</li>{/each}
          </ul>
          <details>
            <summary>Original code</summary>
            <pre class="code-panel"><code>{record.sources[record.original]}</code></pre>
          </details>
          <details open>
            <summary>Submitted code · read only</summary>
            <pre class="code-panel"><code>{record.sources[record.submitted]}</code></pre>
          </details>
          {#each record.parts as part}<p>
              <strong>{part.prompt}</strong><br />{describeTestResponse(part.answer) ||
                'Answered in code'} · {part.earned}/{part.max}
              — {part.message}
            </p>{/each}
          {#each record.predictions as prediction, i}
            <details>
              <summary
                >Prediction {i + 1} · {date(prediction.at)} · {prediction.afterRun
                  ? 'After execution'
                  : 'Before execution'}</summary
              >
              {#each Object.entries(prediction.answers) as [id, answer]}<p>
                  {record.parts.find((p) => p.id === id)?.prompt}: {answer}
                </p>{/each}
              <pre class="code-panel"><code>{record.sources[prediction.source]}</code></pre>
            </details>
          {/each}
          {#each record.runs as run}
            <details>
              <summary
                >{run.document === 'original' ? 'Original code run' : 'Your code run'} · {date(
                  run.at,
                )} · {run.caseName ?? run.caseId ?? 'Custom call'}</summary
              >
              <p>
                Call: <code>{run.expression}</code> · Inputs:
                <code>{JSON.stringify(run.inputs)}</code>
              </p>
              {#if run.expected}<p>
                  Expected before this run: {describeTestResponse(run.expected)}
                </p>{/if}
              <pre class="code-panel">{testRunOutput(run.observation)}</pre>
              <details>
                <summary>Exact code run</summary>
                <pre class="code-panel"><code>{record.sources[run.source]}</code></pre>
              </details>
            </details>
          {/each}
        {:else}<p>
            Code evidence is unavailable. The score and assessed-skill summary are retained.
          </p>{/if}
      </details>
    {/each}
  </section>
{/if}

<style>
  .attempt-review {
    margin-block: 1rem;
    border-top: 1px solid var(--border);
    padding-top: 0.75rem;
  }
  select {
    max-width: 100%;
  }
  pre {
    max-height: 60dvh;
    overflow: auto;
    white-space: pre-wrap;
  }
</style>
