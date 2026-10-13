/**
 * Purpose: Render progress and own its temporary display filters.
 *
 * Main contents: weekly results, revision priorities, history and transfer controls
 *
 * Used by: application.
 * Uses: progress calculations, profile session and host attempt actions.
 * Libs: none.
 */
import { esc, duration } from './view-utils.js';
import { types, focuses, focusNames, examSubtopics, choose, loadSet } from './bank.js';
import { weeklyProgress, averageSetPercentage } from './weekly-progress.js';
import { revisionPriorities, updateRecommendations } from './revision.js';
import { generationLabel, sameGeneration } from './progress-generation.js';
import { bankRelease } from './bank-release.js';
import { practiceSeconds } from './practice-time.js';
import { exportCSV } from './progress.js';
import { backupJSON } from './progress-transfer.js';
import { progressFilename } from './progress-identity.js';
/** Filters belong to this page; saved results remain in the profile session. */
export function createProgressPage({ main, session, start, toast, download }) {
  const $ = (selector) => document.querySelector(selector);
  const persist = () => session.persist();
  const restoreProgress = (...args) => session.restore(...args);
  const oneDrive = session.oneDrive;
  let priorityLevel = 'topic';
  let filters;
  function resetFilters() {
    filters = { type: 'all', focus: 'all', from: '', to: '', sort: 'newest' };
  }
  resetFilters();
  function revisionAreas(level) {
    return level === 'subtopic'
      ? focuses(1).flatMap((parent) =>
          examSubtopics(parent).map(({ reference }) => ({ type: 1, focus: reference, parent })),
        )
      : [1, 2].flatMap((type) => focuses(type).map((focus) => ({ type, focus })));
  }
  function weeklyHTML(rows) {
    const weeks = weeklyProgress(rows),
      current = weeks.at(-1),
      previous = weeks.at(-2);
    const label = (at) =>
      new Date(at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
    const change =
      current.average === null || previous.average === null
        ? null
        : Math.round(current.average - previous.average);
    const trend =
      change === null
        ? 'Complete tracked sets each week to build your trend.'
        : change === 0
          ? 'Your average so far this week matches last week.'
          : `Your average so far this week is ${Math.abs(change)} percentage points ${change > 0 ? 'higher' : 'lower'} than last week.`;
    return /* HTML */ `<section class="progress-panel" id="weekly-progress">
      <h2>This week’s practice</h2>
      <p class="muted">
        Week beginning ${label(current.start)} · Monday–Sunday · uses the filters above.
      </p>
      <div class="progress-summary">
        <div class="stat"><strong>${current.count}</strong><span>Sets completed so far</span></div>
        <div class="stat">
          <strong>${current.average === null ? '—' : Math.round(current.average) + '%'}</strong
          ><span>Average final percentage</span>
        </div>
        <div class="stat">
          <strong>${current.days}</strong><span>Days practised this week</span>
        </div>
        <div class="stat">
          <strong>${current.minutes}</strong><span>Minutes practised this week</span>
        </div>
        <div class="stat">
          <strong>${previous.minutes}</strong><span>Minutes practised last week</span>
        </div>
      </div>
      <p>${trend}</p>
      <h3>Weekly average percentage</h3>
      <p class="muted">
        Last eight weeks, including this week so far. Each set’s marks are converted to a
        percentage, then averaged equally. Final scores include retries. Different topics and
        difficulty can affect the trend.
      </p>
      <div
        class="weekly-chart"
        role="img"
        aria-label="Weekly average final percentages. Exact dates, scores and completion counts follow in the weekly results table."
      >
        ${weeks
          .map(
            (w) =>
              `<div class="weekly-column"><strong>${w.average === null ? '—' : Math.round(w.average) + '%'}</strong><div class="weekly-track">${w.average === null ? '' : `<div class="weekly-bar" style="height:${Math.max(2, w.average)}%"></div>`}</div><small>${label(w.start)}</small></div>`,
          )
          .join('')}
      </div>
      <details>
        <summary>Weekly results table</summary>
        <div class="history-wrap">
          <table class="history">
            <caption>
              Weeks beginning Monday · current week is incomplete
            </caption>
            <thead>
              <tr>
                <th>Week beginning</th>
                <th>Sets completed</th>
                <th>Average percentage</th>
                <th>Days practised</th>
                <th>Minutes</th>
              </tr>
            </thead>
            <tbody>
              ${weeks
                .map(
                  (w) =>
                    `<tr><td>${esc(new Date(w.start).toLocaleDateString('en-GB'))}</td><td>${w.count}</td><td>${w.average === null ? 'No tracked sets' : Math.round(w.average) + '%'}</td><td>${w.days}</td><td>${w.minutes}</td></tr>`,
                )
                .join('')}
            </tbody>
          </table>
        </div>
      </details>
    </section>`;
  }
  function progress() {
    const data = session.data;
    $('.global-code-entry').hidden = false;
    let rows = data.history.filter(
      (r) =>
        (filters.type === 'all' || r.type === Number(filters.type)) &&
        (filters.focus === 'all' || r.focus === filters.focus) &&
        (!filters.from || r.finished >= new Date(`${filters.from}T00:00:00`).getTime()) &&
        (!filters.to || r.finished < new Date(`${filters.to}T23:59:59.999`).getTime() + 1),
    );
    rows.sort((a, b) =>
      filters.sort === 'score'
        ? b.percentage - a.percentage
        : filters.sort === 'oldest'
          ? a.finished - b.finished
          : b.finished - a.finished,
    );
    const average = rows.length ? Math.round(averageSetPercentage(rows)) : 0,
      priority = revisionPriorities(
        rows,
        revisionAreas(priorityLevel).filter(
          (a) =>
            (filters.type === 'all' || a.type === Number(filters.type)) &&
            (filters.focus === 'all' || a.focus === filters.focus || a.parent === filters.focus),
        ),
      );
    if (
      updateRecommendations(data, revisionAreas('subtopic'), (area) =>
        choose(1, area.parent, null, 'new', 'all', area.focus),
      )
    )
      persist();
    const evidenceMarks = (value) => Number(value.toFixed(2)).toString();
    const select = (key, options) =>
      `<select id="filter-${key}">${options.map(([v, l]) => `<option value="${v}" ${filters[key] === v ? 'selected' : ''}>${esc(l)}</option>`).join('')}</select>`;
    main.innerHTML = /* HTML */ `<a href="#home" class="back">← All activities</a>
      <div class="page-top">
        <div>
          <div class="eyebrow">A little better, every time</div>
          <h1>My progress</h1>
          <p class="muted">
            Tracked attempts, saved on this browser. Leave at least four hours after completing a
            set before starting another tracked attempt at it. Link your synced OneDrive file below
            to save progress between computers. Practice time pauses after two minutes without
            interaction and while the activity is hidden. Older records retain elapsed time.
          </p>
        </div>
        <div class="progress-transfers">
          <div class="progress-transfer-actions">
            <button class="primary" id="export-backup">Download backup</button
            ><button class="primary" id="import-backup">Restore backup</button>
            <details class="spreadsheet-options">
              <summary>Spreadsheet options</summary>
              <p>
                CSV is for viewing results in a spreadsheet. Use a backup to restore your progress.
              </p>
              <button id="export-csv">Export CSV</button>
            </details>
          </div>
          <p class="muted">Save a backup to keep your progress or move it to another computer.</p>
          <input
            type="file"
            id="backup-file"
            accept="text/plain,application/json,.txt,.json"
            hidden
          />
        </div>
      </div>
      <div class="filters">
        <label
          >Type${select('type', [
            ['all', 'All types'],
            ...types.map((t, i) => [String(i), t.name]),
          ])}</label
        ><label
          >Focus${select('focus', [['all', 'All focuses'], ...Object.entries(focusNames)])}</label
        ><label>From<input type="date" id="filter-from" value="${filters.from}" /></label
        ><label>To<input type="date" id="filter-to" value="${filters.to}" /></label
        ><label
          >Sort${select('sort', [
            ['newest', 'Newest first'],
            ['oldest', 'Oldest first'],
            ['score', 'Highest score'],
          ])}</label
        >
      </div>
      <section class="progress-summary" style="margin-top:1.5rem">
        <div class="stat"><strong>${rows.length}</strong><span>Completed activities</span></div>
        <div class="stat">
          <strong>${rows.length ? average + '%' : '—'}</strong><span>Average final percentage</span>
        </div>
        <div class="stat">
          <strong>${Math.round(rows.reduce((s, r) => s + practiceSeconds(r), 0) / 60)}</strong
          ><span>Minutes of practice</span>
        </div>
      </section>
      ${weeklyHTML(rows)}
      <section class="progress-panel">
        <h2>Recommended exam revision</h2>
        <p>Missing data first, then scores from lowest to highest, then stale data.</p>
        ${data.recommendations?.celebrate
          ? '<p role="status">good job on completing some recommended revision! see what’s next...</p>'
          : ''}
        <div class="recommended-sets">
          ${data.recommendations?.items
            .map(
              (item) =>
                `<div><p>${esc(item.focus)} · ${esc(item.reason)}</p>${item.completed ? `<strong>Completed · <code>${esc(item.code)}</code></strong>` : `<button class="history-code" data-code="${esc(item.code)}"><code>${esc(item.code)}</code> · Practise</button>`}</div>`,
            )
            .join('') ?? '<p>No available recommendations yet.</p>'}
        </div>
      </section>
      <section class="progress-panel">
        <h2>What to practise next</h2>
        <label for="priority-level">Show priorities by</label>
        <select id="priority-level">
          <option value="topic" ${priorityLevel === 'topic' ? 'selected' : ''}>
            Topic / programming focus
          </option>
          <option value="subtopic" ${priorityLevel === 'subtopic' ? 'selected' : ''}>
            Exam subtopic
          </option>
        </select>
        <p class="muted" style="font-size:.8rem">
          First responses from your latest five eligible detailed attempts per topic or programming
          focus. Subtopics use their latest five relevant attempts. Answers assisted before the
          first check and puzzles are excluded.
        </p>
        <p class="muted" style="font-size:.8rem">
          Earlier results without subtopic scores stay in your history, but do not contribute to
          these priorities.
        </p>
        ${priority
          .map(
            (p) =>
              `<div class="priority-row priority-${p.status}"><span>${esc(focusNames[p.focus] ?? p.focus)}</span><strong>${p.score === null ? 'No score' : Math.floor(p.score) + '%'}</strong><small>${p.status === 'missing' ? 'missing data, please practice this area to assess revision priority' : p.status === 'stale' ? 'stale data, revise this area soon to check if you still have the skills!' : p.status === 'red' ? 'High revision priority' : p.status === 'amber' ? 'Developing skills' : 'Secure skills'}${p.last ? ` · Last practised ${esc(new Date(p.last).toLocaleDateString('en-GB'))} · ${p.count} attempts · ${evidenceMarks(p.max)} marks assessed` : ''}</small></div>`,
          )
          .join('')}
      </section>

      ${rows.length
        ? `<section class="progress-panel"><h2>Score over time</h2><div class="chart" role="img" aria-label="Final scores for up to 12 recent activities, oldest to newest. Exact scores and dates are in the table below.">${[
            ...rows,
          ]
            .sort((a, b) => a.finished - b.finished)
            .slice(-12)
            .map(
              (r) =>
                `<div class="chart-column"><span>${r.percentage}%</span><div class="chart-bar" style="height:${Math.max(2, r.percentage)}%"></div></div>`,
            )
            .join(
              '',
            )}</div><div class="history-wrap"><table class="history"><caption>Activity history · final scores include retries within an activity</caption><thead><tr><th>Date</th><th>Activity / focus</th><th>Code</th><th>Score</th><th>Time</th><th>Checks</th><th>Practice</th></tr></thead><tbody>${rows
            .map(
              (r) =>
                `<tr><td>${esc(new Date(r.finished).toLocaleString('en-GB', { dateStyle: 'short', timeStyle: 'short' }))}</td><td>${types[r.type]?.name ?? 'Bank ' + r.type}<br><span class="muted">${esc(focusNames[r.focus] ?? r.focus)}</span>${
                  r.partScores?.length
                    ? `<details><summary>Topic / subtopic results</summary>${revisionPriorities(
                        [r],
                        [...new Set(r.partScores.flatMap((p) => p.refs))].map((focus) => ({
                          type: r.type,
                          focus,
                        })),
                        r.finished,
                      )
                        .map(
                          (p) =>
                            `<div>${esc(p.focus)}: ${p.score === null ? 'Assisted — no independent score' : Math.round(p.score) + '% first response'}</div>`,
                        )
                        .join('')}</details>`
                    : ''
                }</td><td>${sameGeneration(r) ? `<button class="subtle history-code" data-code="${esc(r.code)}">` : '<span>'}<code>${esc(r.code)}</code>${sameGeneration(r) ? '</button>' : '</span>'}${generationLabel(r) ? `<br><small>${esc(generationLabel(r))}</small>` : ''}</td><td><strong>${r.percentage}%</strong><br>${r.earned}/${r.max}</td><td>${duration(practiceSeconds(r))}<br><small>${r.engagedSeconds === undefined ? 'Elapsed (older record)' : 'Estimated active time'}</small></td><td>${r.attemptChecks}</td><td>${r.assisted ? 'Assisted' : 'Independent'}${r.outcome === 'expired' ? '<br>Timer expired' : ''}</td></tr>`,
            )
            .join('')}</tbody></table></div></section>`
        : '<div class="empty-state"><h2>No results here yet.</h2><p class="muted">Try an activity, or adjust your filters.</p><a href="#home">Find an activity →</a></div>'}
      <p class="muted" style="font-size:.8rem">
        ${bankRelease.latestRolloverAt
          ? `Latest bank rollover: ${esc(new Date(bankRelease.latestRolloverAt).toLocaleDateString('en-GB'))}. Codes issued before that date may open different questions. `
          : ''}CSV
        is for viewing in a spreadsheet. Use Download backup / Restore backup to move your complete
        history between browsers. CSV import is planned for a later release.
      </p>`;
    for (const key of Object.keys(filters))
      $(`#filter-${key}`).onchange = (e) => {
        filters[key] = e.target.value;
        progress();
        $(`#filter-${key}`).focus();
      };
    $('#priority-level').onchange = (e) => {
      priorityLevel = e.target.value;
      progress();
      $('#priority-level').focus();
    };
    $('#export-csv').onclick = () =>
      download(exportCSV(data.history), 'starter-progress.csv', 'text/csv;charset=utf-8');
    if (rows.some((r) => r.espReview)) {
      main.insertAdjacentHTML(
        'beforeend',
        `<section class="esp-review"><h2>Saved ESP written reasoning</h2><p>Automatic percentages exclude these responses. Review status records a review, not a grade. Backups and CSV exports include the text.</p>${rows
          .filter((r) => r.espReview)
          .map(
            (r) =>
              `<details><summary>${esc(r.code)} · ${esc(new Date(r.finished).toLocaleDateString())}</summary>${Object.entries(
                r.espReview,
              )
                .map(
                  ([slot, v]) =>
                    `<h3>Question slot ${esc(slot)} · ${esc(v.status)}</h3><p>${esc(v.text || 'No written response entered.')}</p>`,
                )
                .join('')}</details>`,
          )
          .join('')}</section>`,
      );
    }
    const fileControls = document.createElement('div');
    main.querySelector('.page-top').after(fileControls);
    oneDrive.mount(fileControls);
    $('#export-backup').onclick = () =>
      download(backupJSON(data), progressFilename(data), 'application/json');
    $('#import-backup').onclick = () => $('#backup-file').click();
    $('#backup-file').onchange = async (e) => {
      try {
        const file = e.target.files[0];
        if (!file) return;
        if (file.size > 5000000) throw Error('Backup is too large (maximum 5 MB).');
        await restoreProgress(await file.text());
      } catch (error) {
        toast(error.message);
      }
    };
    main.querySelectorAll('.history-code').forEach(
      (b) =>
        (b.onclick = async () => {
          try {
            await start(await loadSet(b.dataset.code));
          } catch (e) {
            toast(e.message);
          }
        }),
    );
  }

  return { show: progress, resetFilters };
}
