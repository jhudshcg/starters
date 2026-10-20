/**
 * Purpose: Preserve completed code and test evidence independently of tracked score history.
 * Main contents: six-per-question retention, immutable snapshots and validated backup merging.
 * Used by: practice, progress transfer and progress review. Uses: no current-bank lookup. Libs: none.
 */
export const CODE_HISTORY_LIMIT = 6;
const group = (r) => `${r.generation}:${r.type}:${r.slot}:${r.variation}`;
const newest = (a, b) => b.finished - a.finished || b.id.localeCompare(a.id);
const text = (value, max = 100000) => typeof value === 'string' && value.length <= max;
const integer = (value) => Number.isSafeInteger(value) && value >= 0;
const time = (value) => integer(value) && Number.isFinite(new Date(value).getTime());
const partId = (value) =>
  typeof value === 'string' && /^[A-Za-z0-9][A-Za-z0-9_-]{0,79}$/.test(value);

/** Retain six detailed records in each question/variation group, leaving summaries untouched. */
export function retainCodeAttempts(records) {
  const counts = new Map();
  return [...records].sort(newest).filter((r) => {
    const key = group(r),
      count = counts.get(key) ?? 0;
    counts.set(key, count + 1);
    return count < CODE_HISTORY_LIMIT;
  });
}

/** Called once at submission, including practice-only repeats. Intern repeated source strings. */
export function archiveCodeAttempt(data, attempt, set, results) {
  const details = [],
    summaries = [];
  for (const q of set.questions.filter((q) => q.livePython)) {
    const saved = attempt.python?.[q.slot] ?? {};
    const sources = [];
    const sourceId = (source) => {
      let index = sources.indexOf(source);
      if (index < 0) {
        index = sources.length;
        sources.push(source);
      }
      return index;
    };
    const parts = q.parts.map((p) => ({
      id: p.id,
      prompt: p.prompt,
      answer: String(attempt.answers[q.slot]?.[p.id] ?? ''),
      ...results[q.slot].find((r) => r.id === p.id),
    }));
    const summary = {
      id: `${attempt.id}:${q.slot}:${q.variation}`,
      attemptId: attempt.id,
      generation: attempt.generation ?? 0,
      type: set.type,
      slot: q.slot,
      variation: q.variation,
      finished: attempt.finished,
      title: q.title,
      focus: q.focus,
      tracked: Boolean(attempt.tracking.eligible),
      earned: parts.reduce((n, p) => n + p.earned, 0),
      max: parts.reduce((n, p) => n + p.max, 0),
      skills: parts.map(({ id, prompt, earned, max }) => ({ id, prompt, earned, max })),
      support: {
        runs: saved.runs ?? 0,
        checks: saved.checks ?? 0,
        mode: saved.editor?.mode ?? 'free',
        hint: Boolean(attempt.hints[q.slot]),
        reveal: Boolean(attempt.reveals[q.slot]),
      },
    };
    summaries.push(summary);
    details.push({
      ...summary,
      prompt: q.prompt,
      requirements: q.requirements ?? [],
      original: sourceId(q.code),
      submitted: sourceId(attempt.answers[q.slot]?.code ?? q.code),
      parts,
      sources,
      runs: (saved.evidence ?? []).map((r) => ({ ...r, source: sourceId(r.source) })),
      predictions: (saved.predictions ?? []).map((p) => ({ ...p, source: sourceId(p.source) })),
    });
  }
  data.codeAttempts = retainCodeAttempts([
    ...(data.codeAttempts ?? []),
    ...structuredClone(details),
  ]);
  data.codeSummaries = [...(data.codeSummaries ?? []), ...structuredClone(summaries)];
}

/** Validate historical snapshots by their stored contract, never by today's question content. */
function validSummary(r) {
  return (
    r &&
    text(r.id, 200) &&
    text(r.attemptId, 100) &&
    r.id === `${r.attemptId}:${r.slot}:${r.variation}` &&
    [r.generation, r.slot, r.variation].every(integer) &&
    [2, 3].includes(r.type) &&
    time(r.finished) &&
    text(r.title, 500) &&
    text(r.focus, 100) &&
    typeof r.tracked === 'boolean' &&
    integer(r.earned) &&
    integer(r.max) &&
    r.max > 0 &&
    r.earned <= r.max &&
    Array.isArray(r.skills) &&
    r.skills.length > 0 &&
    r.skills.length <= 100 &&
    new Set(r.skills.map((p) => p.id)).size === r.skills.length &&
    r.skills.every(
      (p) =>
        partId(p.id) &&
        text(p.prompt, 3000) &&
        integer(p.earned) &&
        integer(p.max) &&
        p.max > 0 &&
        p.earned <= p.max,
    ) &&
    r.skills.reduce((n, p) => n + p.earned, 0) === r.earned &&
    r.skills.reduce((n, p) => n + p.max, 0) === r.max &&
    r.support &&
    integer(r.support.runs) &&
    integer(r.support.checks) &&
    ['choices', 'regions', 'free'].includes(r.support.mode) &&
    typeof r.support.hint === 'boolean' &&
    typeof r.support.reveal === 'boolean'
  );
}
function validDetail(r) {
  const source = (i) => integer(i) && i < r.sources.length;
  return (
    validSummary(r) &&
    text(r.prompt) &&
    Array.isArray(r.requirements) &&
    r.requirements.length <= 100 &&
    r.requirements.every((v) => text(v, 5000)) &&
    Array.isArray(r.sources) &&
    r.sources.length > 0 &&
    r.sources.length <= 2000 &&
    r.sources.every((v) => text(v)) &&
    source(r.original) &&
    source(r.submitted) &&
    Array.isArray(r.parts) &&
    r.parts.length === r.skills.length &&
    r.parts.every(
      (p, i) =>
        p.id === r.skills[i].id &&
        p.prompt === r.skills[i].prompt &&
        p.earned === r.skills[i].earned &&
        p.max === r.skills[i].max &&
        text(p.answer) &&
        text(p.message, 5000),
    ) &&
    Array.isArray(r.runs) &&
    r.runs.length <= 2000 &&
    r.runs.every(
      (run) =>
        source(run.source) &&
        time(run.at) &&
        ['original', 'edited'].includes(run.document) &&
        (run.document !== 'original' || run.source === r.original) &&
        (run.caseId === null || partId(run.caseId)) &&
        text(run.expression) &&
        (run.expected === undefined || text(run.expected, 10000)) &&
        Array.isArray(run.inputs) &&
        run.inputs.length <= 1000 &&
        run.inputs.every((v) => text(v, 10000)) &&
        run.observation &&
        text(run.observation.stdout, 12000) &&
        text(run.observation.stderr, 12000) &&
        integer(run.observation.consumed) &&
        run.observation.consumed <= run.inputs.length &&
        (run.observation.type === null || text(run.observation.type, 100)) &&
        (run.observation.error === null ||
          (text(run.observation.error?.type, 100) && text(run.observation.error?.message, 1500))),
    ) &&
    Array.isArray(r.predictions) &&
    r.predictions.length <= 2000 &&
    r.predictions.every(
      (p) =>
        source(p.source) &&
        time(p.at) &&
        typeof p.afterRun === 'boolean' &&
        typeof p.rethink === 'boolean' &&
        p.answers &&
        !Array.isArray(p.answers) &&
        Object.entries(p.answers).every(
          ([id, answer]) => r.parts.some((p) => p.id === id) && text(answer, 10000),
        ),
    )
  );
}
const canonical = (value) =>
  JSON.stringify(value, (_, v) =>
    v && typeof v === 'object' && !Array.isArray(v)
      ? Object.fromEntries(Object.entries(v).sort(([a], [b]) => a.localeCompare(b)))
      : v,
  );

/** Validate both collections and conflicts before returning a merged, capped archive. */
export function mergeCodeHistory(target, imported) {
  const merged = {};
  for (const [key, valid] of [
    ['codeSummaries', validSummary],
    ['codeAttempts', validDetail],
  ]) {
    const incoming = imported[key] ?? [];
    if (!Array.isArray(incoming) || incoming.length > 10000 || !incoming.every(valid))
      throw Error('Backup contains invalid code history. Nothing was imported.');
    const records = new Map((target[key] ?? []).map((r) => [r.id, r]));
    for (const record of incoming) {
      const old = records.get(record.id);
      if (old && canonical(old) !== canonical(record))
        throw Error('Code history conflicts with this browser. Nothing was imported.');
      records.set(record.id, record);
    }
    merged[key] = [...records.values()];
  }
  for (const detail of merged.codeAttempts) {
    const summary = merged.codeSummaries.find((s) => s.id === detail.id);
    if (
      !summary ||
      Object.keys(summary).some((key) => canonical(detail[key]) !== canonical(summary[key]))
    )
      throw Error('Backup code history does not match its skill summaries. Nothing was imported.');
  }
  merged.codeAttempts = retainCodeAttempts(merged.codeAttempts);
  return merged;
}
