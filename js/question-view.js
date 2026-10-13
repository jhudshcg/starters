/**
 * Purpose: Render a question from explicit set and attempt inputs.
 *
 * Main contents: stimuli, answer controls, feedback, hints and solutions
 *
 * Used by: activity-view.
 * Uses: marking, puzzle views, packed answers and coverage.
 * Libs: none.
 */
import { esc } from './view-utils.js';
import { hasRecentSubmission } from './review.js';
import { markQuestion } from './marking.js';
import { marks, challengeLabel, matchesSubtopic } from './bank.js';
import { questionCode } from './codes.js';
import { revealPart } from './packed-data.js';
import { formatCoverage } from './coverage.js';
import { puzzlePartHTML, puzzleSolutionHTML } from './puzzle-view.js';
function stimulus(q) {
  if (q.sheet) {
    const entries = Object.keys(q.sheet.cells),
      colNo = (s) => [...s].reduce((n, c) => n * 26 + c.charCodeAt(0) - 64, 0);
    const lastRow = Math.max(...entries.map((k) => Number(k.match(/\d+$/)[0]))),
      lastCol = Math.max(...entries.map((k) => colNo(k.match(/^[A-Z]+/)[0])));
    const cols = Array.from({ length: lastCol }, (_, i) => String.fromCharCode(65 + i));
    return /* HTML */ `<div class="grid-wrap">
      <table class="puzzle-grid spreadsheet">
        <caption>
          ${esc(q.title)} · spreadsheet extract
        </caption>
        <thead>
          <tr>
            <th scope="col">Cell</th>
            ${cols.map((c) => `<th scope="col">${c}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${Array.from(
            { length: lastRow },
            (_, r) =>
              `<tr><th scope="row">${r + 1}</th>${cols
                .map((c) => {
                  const key = c + (r + 1),
                    value = q.sheet.cells[key] ?? '',
                    format = q.sheet.formats?.[key];
                  return /* HTML */ `<td
                    title="${key}${q.sheet.formulas?.[key] ? ' ' + esc(q.sheet.formulas[key]) : ''}"
                  >
                    ${esc(
                      format === 'percent'
                        ? Number(value) * 100 + '%'
                        : format === 'money'
                          ? Number(value).toFixed(2)
                          : value,
                    )}
                  </td>`;
                })
                .join('')}</tr>`,
          ).join('')}
        </tbody>
      </table>
      <p class="muted">
        Use the displayed cell addresses. Supported: =, +, −, *, / by a number, brackets, SUM and
        SUMIF; $ fixes a row or column. Equivalent formulas are accepted. Unsupported formulas need
        review and receive no automatic credit.
      </p>
    </div>`;
  }
  if (q.code)
    return /* HTML */ `<pre class="code-panel" tabindex="0" aria-label="Python code"><code>${esc(
      q.code,
    )}</code></pre>`;
  if (q.grid)
    return /* HTML */ `<div class="grid-wrap">
      <table class="puzzle-grid">
        <caption>
          ${esc(q.title)}
        </caption>
        <thead>
          <tr>
            <th scope="col">Row</th>
            ${q.grid.headers.map((h) => `<th scope="col">${esc(h)}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${q.grid.rows
            .map(
              (row, i) =>
                `<tr><th scope="row">${i + 1}</th>${row.map((v) => `<td${v === null ? ' class="missing"' : ''}>${v === null ? '<span aria-label="Missing value">?</span>' : v}</td>`).join('')}</tr>`,
            )
            .join('')}
        </tbody>
        ${q.grid.footer
          ? `<tfoot><tr><th scope="row">Column<br>total</th>${q.grid.footer.map((v) => `<td>${v}</td>`).join('')}</tr></tfoot>`
          : ''}
      </table>
    </div>`;

  if (q.clues)
    return /* HTML */ `<aside class="logic-clues">
      <h3>Your clues</h3>
      <ol>
        ${q.clues.map((clue) => `<li>${esc(clue)}</li>`).join('')}
      </ol>
    </aside>`;
  return '';
}
function espReviewHTML(q, a) {
  if (!q.review) return '';
  const saved = a.answers[q.slot]?.reflection ?? '';
  return /* HTML */ `<section class="esp-review">
    <h3>Written reasoning · separate review</h3>
    <label for="review-${q.slot}">${esc(q.review.prompt)}</label
    ><textarea
      id="review-${q.slot}"
      data-slot="${q.slot}"
      data-part="reflection"
      maxlength="1200"
      rows="3"
      ${a.finished ? 'disabled' : ''}
    >
${esc(saved)}</textarea
    >
    <p class="muted">
      This response is not automatically marked. Automatic marks do not assess your written
      reasoning.
    </p>
    ${a.finished
      ? `<details><summary>Review criteria and example</summary><ul>${q.review.criteria.map((c) => `<li>${esc(c)}</li>`).join('')}</ul><p>${esc(q.review.example)}</p></details><label>Review status <select data-review-status="${q.slot}">${['Needs review', 'Self-reviewed', 'Teacher-reviewed'].map((status) => `<option ${((a.espReview ?? {})[q.slot]?.status ?? 'Needs review') === status ? 'selected' : ''}>${status}</option>`).join('')}</select></label><small>A recorded review status is not a grade or verified teacher approval.</small>`
      : ''}
  </section>`;
}
export function questionHTML(q, index, set, a) {
  const canReview = () => hasRecentSubmission(a);
  const answers = a.answers[q.slot] ?? {},
    results =
      canReview() && a.checks[q.slot] && (!a.feedbackHidden?.[q.slot] || a.finished)
        ? markQuestion(q, answers)
        : null;
  const locked = Boolean(a.finished),
    hintVisible = Boolean(a.hints[q.slot] && !a.hiddenHints?.[q.slot]);
  const hintButton = `<button class="${q.focus === 'go' ? 'puzzle-link' : 'subtle'}" data-hint="${q.slot}" aria-expanded="${hintVisible}">${hintVisible ? 'Hide hint' : 'Show hint'}</button>`;
  const hintPanel = hintVisible
    ? `<p class="hint-text"><strong>Hint:</strong> ${esc(q.hint)}</p>`
    : '';
  const goHint = set.type === 0 && q.focus === 'go';
  const subtopic = set.type === 1 ? (a.examSubtopic ?? 'all') : 'all';
  const matchCount =
    subtopic === 'all' ? 0 : q.parts.filter((p) => matchesSubtopic(p, subtopic)).length;
  return /* HTML */ `<article class="question type-${set.type}" data-question="${q.slot}">
    <div class="question-top">
      <span class="question-number">${String(index + 1).padStart(2, '0')}</span>
      <div>
        <h2>${esc(q.title)}</h2>
        <div class="muted">
          ${esc(q.format)}${set.type === 0
            ? ` · ${esc(challengeLabel(q.challengeLevel, q.focus))}`
            : ''}
          ·
          <span title="Individual question code"
            >${questionCode(set.type, q.slot, q.variation, set.version)}</span
          >${q.tags.filter((t) => t.startsWith('CA')).length
            ? ` · ${q.tags.filter((t) => t.startsWith('CA')).join(', ')}`
            : ''}
        </div>
      </div>
      <span class="marks-badge">${marks(q)} ${set.type === 0 ? 'points' : 'marks'}</span>
    </div>
    <p class="question-prompt">${esc(q.prompt)}</p>
    ${subtopic !== 'all'
      ? `<p class="subtopic-context">${matchCount ? `Includes ${esc(subtopic)} · ${matchCount} matching ${matchCount === 1 ? 'part' : 'parts'}` : `Related practice from ${esc(set.focus)}`}</p>`
      : ''}${q.source && !goHint
      ? `<p class="muted"><a href="${esc(q.source.url)}" target="_blank" rel="noopener noreferrer">Puzzle source</a> · ${esc(q.source.note)}</p>`
      : ''}
    <div class="question-layout ${q.code || q.grid || q.sheet || q.clues ? '' : 'no-stimulus'}">
      ${stimulus(q)}
      <div class="parts">
        ${q.parts
          .map((p, j) => {
            const id = `answer-${q.slot}-${p.id}`,
              answer = answers[p.id] ?? '',
              result = results?.[j];
            const outcome = result
              ? result.needsReview
                ? 'review'
                : result.earned === result.max
                  ? 'correct'
                  : result.earned > 0
                    ? 'partial'
                    : 'incorrect'
              : '';
            const outcomeAttribute = outcome ? ` data-result="${outcome}"` : '';
            const codeBlock = p.code
              ? `<pre class="code-panel part-code" tabindex="0" aria-label="Python code for part ${j + 1}"><code>${esc(p.code)}</code></pre>`
              : '';
            const label = `${subtopic !== 'all' && matchesSubtopic(p, subtopic) ? `<span class="subtopic-match">Selected subtopic · ${esc(subtopic)}</span> ` : ''}<span class="part-label">${String.fromCharCode(97 + j)})</span> ${esc(p.prompt)} <span class="part-marks">(${p.marks})</span>`;
            if (set.type === 0)
              return puzzlePartHTML(p, answer, {
                instanceId: q.slot,
                index: j,
                locked,
                result,
                labelHTML: label,
                guidanceActionsHTML: goHint
                  ? hintButton + ' <a class="puzzle-link" href="#go">Practice board</a>'
                  : '',
                guidanceHTML: goHint ? hintPanel : '',
                referenceHTML:
                  goHint && q.source
                    ? `<a href="${esc(q.source.url)}" target="_blank" rel="noopener noreferrer">Puzzle source</a>`
                    : '',
              });
            const input = p.options
              ? `<fieldset class="part"${outcomeAttribute} ${locked ? 'disabled' : ''}><legend>${label}</legend>${codeBlock}<div class="options">${p.options.map((option) => `<label class="option"><input type="radio" name="${id}" value="${esc(option)}" data-slot="${q.slot}" data-part="${p.id}" ${answer === option ? 'checked' : ''}>${esc(option)}</label>`).join('')}</div>`
              : `<div class="part"${outcomeAttribute}><label for="${id}">${label}</label>${codeBlock}<input id="${id}" data-slot="${q.slot}" data-part="${p.id}" value="${esc(answer)}" ${locked ? 'disabled' : ''} ${p.kind === 'number' ? 'inputmode="decimal"' : ''} autocomplete="off" autocapitalize="off" spellcheck="false" ${result ? `aria-describedby="feedback-${q.slot}-${j}"` : ''}>`;
            return (
              input +
              (p.coverage?.length
                ? `<details class="part-coverage"><summary>Spec reference</summary><small>${esc(formatCoverage(p.coverage))}${p.coverageMode === 'practice' ? ' · Supporting practice' : ''}</small></details>`
                : '') +
              (result
                ? `<p id="feedback-${q.slot}-${j}" class="feedback ${outcome}">${result.earned}/${result.max} · ${esc(result.message)}</p>`
                : '') +
              (p.options ? '</fieldset>' : '</div>')
            );
          })
          .join('')}
      </div>
    </div>
    ${espReviewHTML(q, a)}
    <div class="question-actions">
      ${goHint ? '' : hintButton}${canReview()
        ? `<button data-check="${q.slot}">Check answer</button><button class="subtle" data-reveal="${q.slot}" ${a.reveals[q.slot] ? 'disabled' : ''}>${a.reveals[q.slot] ? 'Answer shown' : 'Show answer'}</button>`
        : ''}${a.hints[q.slot] || a.reveals[q.slot] ? '<small>Assisted practice</small>' : ''}
    </div>
    ${goHint ? '' : hintPanel}${canReview() && a.reveals[q.slot]
      ? `<div class="solution"><h3>Answers and explanations</h3><ol class="solution-list" role="list">${q.parts.map((publicPart, j) => (set.type === 0 ? puzzleSolutionHTML(publicPart, j, q.slot) : ((p) => `<li class="solution-part"><p class="solution-answer"><span class="part-label">${String.fromCharCode(97 + j)})</span> <strong>${esc(p.solutionText ?? p.answer)}</strong></p><p class="solution-explanation">${esc(p.explanation)}</p></li>`)(revealPart(publicPart)))).join('')}</ol></div>`
      : ''}
  </article>`;
}
