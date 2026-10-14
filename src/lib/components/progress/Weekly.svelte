<script>
  import { weeklyProgress } from '#domain/weekly-progress.js';
  let { rows } = $props();
  const weeks = $derived(weeklyProgress(rows)),
    current = $derived(weeks.at(-1)),
    previous = $derived(weeks.at(-2));
  const change = $derived(
    current.average === null || previous.average === null
      ? null
      : Math.round(current.average - previous.average),
  );
  const label = (at) =>
    new Date(at).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
    });
</script>

<section class="surface-card progress-panel" id="weekly-progress">
  <h2>This week’s practice</h2>
  <p class="muted">
    Week beginning {label(current.start)} · Monday–Sunday · uses the filters above.
  </p>
  <div class="progress-summary">
    {#each [[current.count, 'Sets completed so far'], [current.average === null ? '—' : Math.round(current.average) + '%', 'Average final percentage'], [current.days, 'Days practised this week'], [current.minutes, 'Minutes practised this week'], [previous.minutes, 'Minutes practised last week']] as [value, text]}<div
        class="stat"
      >
        <strong>{value}</strong><span>{text}</span>
      </div>{/each}
  </div>
  <p>
    {change === null
      ? 'Complete tracked sets each week to build your trend.'
      : change === 0
        ? 'Your average so far this week matches last week.'
        : `Your average so far this week is ${Math.abs(change)} percentage points ${change > 0 ? 'higher' : 'lower'} than last week.`}
  </p>
  <h3>Weekly average percentage</h3>
  <p class="muted">
    Last eight weeks, including this week so far. Each set’s marks are converted to a percentage,
    then averaged equally. Final scores include retries. Different topics and difficulty can affect
    the trend.
  </p>
  <div
    class="weekly-chart"
    role="img"
    aria-label="Weekly average final percentages. Exact dates, scores and completion counts follow in the weekly results table."
  >
    {#each weeks as week}<div class="weekly-column">
        <strong>{week.average === null ? '—' : Math.round(week.average) + '%'}</strong>
        <div class="weekly-track">
          {#if week.average !== null}<div
              class="weekly-bar"
              style:height={`${Math.max(2, week.average)}%`}
            ></div>{/if}
        </div>
        <small>{label(week.start)}</small>
      </div>{/each}
  </div>
  <details>
    <summary>Weekly results table</summary>
    <div class="history-wrap">
      <table class="history">
        <caption>Weeks beginning Monday · current week is incomplete</caption><thead
          ><tr
            >{#each ['Week beginning', 'Sets completed', 'Average percentage', 'Days practised', 'Minutes'] as heading}<th
                >{heading}</th
              >{/each}</tr
          ></thead
        ><tbody
          >{#each weeks as week}<tr
              ><td>{new Date(week.start).toLocaleDateString('en-GB')}</td><td>{week.count}</td><td
                >{week.average === null ? 'No tracked sets' : Math.round(week.average) + '%'}</td
              ><td>{week.days}</td><td>{week.minutes}</td></tr
            >{/each}</tbody
        >
      </table>
    </div>
  </details>
</section>
