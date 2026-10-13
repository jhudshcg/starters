/**
 * Purpose: Render consistent question-type names and breadcrumbs.
 *
 * Main contents: practiceName and practiceBreadcrumbs
 *
 * Used by: entry-pages and activity-view.
 * Uses: bank labels and exam sections.
 * Libs: none.
 */
import { types, focusNames } from './bank.js';
import { isExamBank } from './exam-sections.js';
import { esc } from './view-utils.js';
export const practiceName = (type) => (type === 1 ? 'Core exam practice' : types[type].name);
export function practiceBreadcrumbs(type, focus = null) {
  return /* HTML */ `<nav class="breadcrumbs eyebrow" aria-label="Breadcrumb">
    <a href="#home">Home</a><span aria-hidden="true">/</span>${isExamBank(type)
      ? '<a href="#exam">Exam practice</a><span aria-hidden="true">/</span>'
      : ''}<a href="#practice=${type}" data-practice-picker ${focus ? '' : 'aria-current="page"'}
      >${practiceName(type)}</a
    >${focus
      ? `<span aria-hidden="true">/</span><span aria-current="page">${esc(focusNames[focus])}</span>`
      : ''}
  </nav>`;
}
