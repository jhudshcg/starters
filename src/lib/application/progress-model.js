/**
 * Purpose: Derive filtered progress and revision priorities without rendering.
 * Main contents: revision areas, history filtering and ordering.
 * Used by: Progress and session. Uses: existing bank/progress rules. Libs: none.
 */
import { focuses, examSubtopics } from '#domain/bank.js';
import { revisionPriorities } from '#domain/revision.js';
export function revisionAreas(level) {
  return level === 'subtopic'
    ? focuses(1).flatMap((parent) =>
        examSubtopics(parent).map(({ reference }) => ({
          type: 1,
          focus: reference,
          parent,
        })),
      )
    : [1, 2].flatMap((type) => focuses(type).map((focus) => ({ type, focus })));
}
export function progressModel(data, filters, level) {
  const rows = data.history.filter(
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
  const priority = revisionPriorities(
    rows,
    revisionAreas(level).filter(
      (a) =>
        (filters.type === 'all' || a.type === Number(filters.type)) &&
        (filters.focus === 'all' || a.focus === filters.focus || a.parent === filters.focus),
    ),
  );
  return { rows, priority };
}
