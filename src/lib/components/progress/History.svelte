<script>
  import { types, focusNames } from '#domain/bank.js';
  import { revisionPriorities } from '#domain/revision.js';
  import { generationLabel, sameGeneration } from '#domain/progress-generation.js';
  import { practiceSeconds } from '#domain/practice-time.js';
  import { duration } from '#domain/view-utils.js';
  let { rows, open } = $props();
</script>

<section class="surface-card progress-panel">
  <h2>Score over time</h2>
  <div
    class="chart"
    role="img"
    aria-label="Final scores for up to 12 recent activities, oldest to newest. Exact scores and dates are in the table below."
  >
    {#each [...rows].sort((a, b) => a.finished - b.finished).slice(-12) as row}<div
        class="chart-column"
      >
        <span>{row.percentage}%</span>
        <div class="chart-bar" style:height={`${Math.max(2, row.percentage)}%`}></div>
      </div>{/each}
  </div>
  <div class="history-wrap">
    <table class="history">
      <caption>Activity history · final scores include retries within an activity</caption><thead
        ><tr
          >{#each ['Date', 'Activity / focus', 'Code', 'Score', 'Time', 'Checks', 'Practice'] as heading}<th
              >{heading}</th
            >{/each}</tr
        ></thead
      ><tbody
        >{#each rows as row (row.id)}<tr>
            <td
              >{new Date(row.finished).toLocaleString('en-GB', {
                dateStyle: 'short',
                timeStyle: 'short',
              })}</td
            >
            <td
              >{types[row.type]?.name ?? 'Bank ' + row.type}<br /><span class="muted"
                >{focusNames[row.focus] ?? row.focus}</span
              >{#if row.partScores?.length}<details>
                  <summary>Topic / subtopic results</summary
                  >{#each revisionPriorities( [row], [...new Set(row.partScores.flatMap((p) => p.refs))].map( (focus) => ({ type: row.type, focus }) ), row.finished ) as priority}<div
                    >
                      {priority.focus}: {priority.score === null
                        ? 'Assisted — no independent score'
                        : Math.round(priority.score) + '% first response'}
                    </div>{/each}
                </details>{/if}</td
            >
            <td
              >{#if sameGeneration(row)}<button
                  class="action-button subtle history-code"
                  data-code={row.code}
                  onclick={() => open(row.code)}><code>{row.code}</code></button
                >{:else}<span><code>{row.code}</code></span>{/if}{#if generationLabel(row)}<br
                /><small>{generationLabel(row)}</small>{/if}</td
            >
            <td><strong>{row.percentage}%</strong><br />{row.earned}/{row.max}</td><td
              >{duration(practiceSeconds(row))}<br /><small
                >{row.engagedSeconds === undefined
                  ? 'Elapsed (older record)'
                  : 'Estimated active time'}</small
              ></td
            ><td>{row.attemptChecks}</td><td
              >{row.assisted ? 'Assisted' : 'Independent'}{#if row.outcome === 'expired'}<br />Timer
                expired{/if}</td
            >
          </tr>{/each}</tbody
      >
    </table>
  </div>
</section>
