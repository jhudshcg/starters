<!-- Display filters are local; persisted results and file work remain in the application session. -->
<script>
  import { types, focusNames, loadSet } from '#domain/bank.js';
  import { averageSetPercentage } from '#domain/weekly-progress.js';
  import { practiceSeconds } from '#domain/practice-time.js';
  import { exportCSV } from '#domain/progress.js';
  import { backupJSON } from '#domain/progress-transfer.js';
  import { progressFilename } from '#domain/progress-identity.js';
  import { bankRelease } from '#domain/bank-release.js';
  import { progressModel } from '#lib/application/progress-model.js';
  import Weekly from '../progress/Weekly.svelte';
  import FileControls from '../progress/FileControls.svelte';
  import CodeHistory from '../progress/CodeHistory.svelte';
  import History from '../progress/History.svelte';
  let { app, view, href } = $props();
  let filters = $state({
      type: 'all',
      focus: 'all',
      from: '',
      to: '',
      sort: 'newest',
    }),
    priorityLevel = $state('topic'),
    fileInput;
  const data = $derived(view.data),
    model = $derived(progressModel(data, filters, priorityLevel)),
    rows = $derived(model.rows);
  async function open(code) {
    try {
      await app.practice.start(await loadSet(code));
    } catch (error) {
      app.toast(error.message);
    }
  }
  async function restore(event) {
    try {
      const file = event.currentTarget.files[0];
      if (!file) return;
      if (file.size > 5000000) throw Error('Backup is too large (maximum 5 MB).');
      await app.restore(await file.text());
    } catch (error) {
      app.toast(error.message);
    } finally {
      event.target.value = '';
    }
  }
</script>

<a href={href('#home')} class="back">← All activities</a>
<div class="page-top">
  <div>
    <div class="eyebrow">A little better, every time</div>
    <h1>My progress</h1>
    <p class="muted">
      Tracked attempts, saved on this browser. Leave at least four hours after completing a set
      before starting another tracked attempt at it. Link your synced OneDrive file below to save
      progress between computers. Practice time pauses after two minutes without interaction and
      while the activity is hidden. Older records retain elapsed time.
    </p>
  </div>
  <div class="progress-transfers">
    <div class="progress-transfer-actions">
      <button
        class="action-button primary"
        id="export-backup"
        onclick={() =>
          app.download(
            backupJSON(app.profile.data),
            progressFilename(app.profile.data),
            'application/json',
          )}>Download backup</button
      ><button class="action-button primary" id="import-backup" onclick={() => fileInput.click()}
        >Restore backup</button
      >
      <details class="spreadsheet-options">
        <summary>Spreadsheet options</summary>
        <p>CSV is for viewing results in a spreadsheet. Use a backup to restore your progress.</p>
        <button
          class="action-button"
          id="export-csv"
          onclick={() =>
            app.download(exportCSV(data.history), 'starter-progress.csv', 'text/csv;charset=utf-8')}
          >Export CSV</button
        >
      </details>
    </div>
    <p class="muted">Save a backup to keep your progress or move it to another computer.</p>
    <input
      bind:this={fileInput}
      type="file"
      id="backup-file"
      accept="text/plain,application/json,.txt,.json"
      hidden
      onchange={restore}
    />
  </div>
</div>
{#if view.restoreNotice}<p class="restore-notice" role="status">
    {view.restoreNotice}
  </p>{/if}
<FileControls {app} status={view.fileStatus} {href} />
<div class="filters">
  <label
    >Type<select class="choice-field" id="filter-type" bind:value={filters.type}
      ><option value="all">All types</option>{#each types as type, index}<option
          value={String(index)}>{type.name}</option
        >{/each}</select
    ></label
  ><label
    >Focus<select class="choice-field" id="filter-focus" bind:value={filters.focus}
      ><option value="all">All focuses</option
      >{#each Object.entries(focusNames) as [key, label]}<option value={key}>{label}</option
        >{/each}</select
    ></label
  ><label
    >From<input class="text-field" type="date" id="filter-from" bind:value={filters.from} /></label
  ><label>To<input class="text-field" type="date" id="filter-to" bind:value={filters.to} /></label
  ><label
    >Sort<select class="choice-field" id="filter-sort" bind:value={filters.sort}
      >{#each [['newest', 'Newest first'], ['oldest', 'Oldest first'], ['score', 'Highest score']] as [key, label]}<option
          value={key}>{label}</option
        >{/each}</select
    ></label
  >
</div>
<section class="progress-summary">
  <div class="stat">
    <strong>{rows.length}</strong><span>Completed activities</span>
  </div>
  <div class="stat">
    <strong>{rows.length ? Math.round(averageSetPercentage(rows)) + '%' : '—'}</strong><span
      >Average final percentage</span
    >
  </div>
  <div class="stat">
    <strong>{Math.round(rows.reduce((sum, r) => sum + practiceSeconds(r), 0) / 60)}</strong><span
      >Minutes of practice</span
    >
  </div>
</section>
<Weekly {rows} />
<section class="surface-card progress-panel">
  <h2>Recommended exam revision</h2>
  <p>Missing data first, then scores from lowest to highest, then stale data.</p>
  {#if data.recommendations?.celebrate}<p role="status">
      good job on completing some recommended revision! see what’s next...
    </p>{/if}
  <div class="recommended-sets">
    {#each data.recommendations?.items ?? [] as item}<div>
        <p>{item.focus} · {item.reason}</p>
        {#if item.completed}<strong>Completed · <code>{item.code}</code></strong>{:else}<button
            class="action-button history-code"
            data-code={item.code}
            onclick={() => open(item.code)}><code>{item.code}</code> · Practise</button
          >{/if}
      </div>{:else}<p>No available recommendations yet.</p>{/each}
  </div>
</section>
<section class="surface-card progress-panel">
  <h2>What to practise next</h2>
  <label for="priority-level">Show priorities by</label><select
    class="choice-field"
    id="priority-level"
    bind:value={priorityLevel}
    ><option value="topic">Topic / programming focus</option><option value="subtopic"
      >Exam subtopic</option
    ></select
  >
  <p class="muted">
    First responses from your latest five eligible detailed attempts per topic or programming focus.
    Subtopics use their latest five relevant attempts. Answers assisted before the first check and
    puzzles are excluded.
  </p>
  <p class="muted">
    Earlier results without subtopic scores stay in your history, but do not contribute to these
    priorities.
  </p>
  {#each model.priority as priority}<div class={`priority-row priority-${priority.status}`}>
      <span>{focusNames[priority.focus] ?? priority.focus}</span><strong
        >{priority.score === null ? 'No score' : Math.floor(priority.score) + '%'}</strong
      ><small
        >{priority.status === 'missing'
          ? 'missing data, please practice this area to assess revision priority'
          : priority.status === 'stale'
            ? 'stale data, revise this area soon to check if you still have the skills!'
            : priority.status === 'red'
              ? 'High revision priority'
              : priority.status === 'amber'
                ? 'Developing skills'
                : 'Secure skills'}{priority.last
          ? ` · Last practised ${new Date(priority.last).toLocaleDateString('en-GB')} · ${priority.count} attempts · ${Number(priority.max.toFixed(2))} marks assessed`
          : ''}</small
      >
    </div>{/each}
</section>
<CodeHistory records={data.codeAttempts ?? []} summaries={data.codeSummaries ?? []} />
{#if rows.length}<History {rows} {open} />{:else}<div class="empty-state">
    <h2>No results here yet.</h2>
    <p class="muted">Try an activity, or adjust your filters.</p>
    <a href={href('#home')}>Find an activity →</a>
  </div>{/if}
<p class="muted">
  {bankRelease.latestRolloverAt
    ? `Latest bank rollover: ${new Date(bankRelease.latestRolloverAt).toLocaleDateString('en-GB')}. Codes issued before that date may open different questions. `
    : ''}CSV is for viewing in a spreadsheet. Use Download backup / Restore backup to move your
  complete history between browsers. CSV import is planned for a later release.
</p>
{#if rows.some((r) => r.espReview)}<section class="esp-review">
    <h2>Saved ESP written reasoning</h2>
    <p>
      Automatic percentages exclude these responses. Review status records a review, not a grade.
      Backups and CSV exports include the text.
    </p>
    {#each rows.filter((r) => r.espReview) as row}<details>
        <summary>{row.code} · {new Date(row.finished).toLocaleDateString()}</summary
        >{#each Object.entries(row.espReview) as [slot, value]}<h3>
            Question slot {slot} · {value.status}
          </h3>
          <p>{value.text || 'No written response entered.'}</p>{/each}
      </details>{/each}
  </section>{/if}
