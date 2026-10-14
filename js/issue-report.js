/** Pure report formatting used by the Svelte report dialog; no sending or browser state. */
// Leave blank to let students address the draft to their teacher.
export const REPORT_EMAIL = '';

export function makeReport(context, kind, description, selected = []) {
  const content = kind === 'content';
  const questions = content ? context.questions.filter(q => selected.includes(q.code)) : [];
  const subject = `Starter ${content ? 'content issue' : 'bug'}${context.setCode ? ` — ${context.setCode}` : ''}`;
  const body = [subject, '', description.trim(), '',
    ...(questions.length ? ['Selected items:', ...questions.map(q => `${q.number}. ${q.title} (${q.code})`), ''] : []),
    `Page: ${context.page}`, ...(context.setCode ? [`Set: ${context.setCode}`] : []),
    `Build: ${context.build}`, `Browser: ${context.browser}`, `Time: ${context.time}`,
    ...(!content && context.error ? ['', 'Code error details:', JSON.stringify(context.error, null, 2)] : [])
  ].join('\n');
  return {subject, body};
}

export function emailURL({subject, body}, recipient = REPORT_EMAIL) {
  return `mailto:${encodeURIComponent(recipient)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body.replace(/\r?\n/g, '\r\n'))}`;
}
