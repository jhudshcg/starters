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

export function openIssueReport(context) {
  if (document.querySelector('#issue-report')) return;
  const dialog = document.createElement('dialog');
  dialog.id = 'issue-report';
  dialog.setAttribute('aria-labelledby', 'report-title');
  dialog.innerHTML = `<form>
    <h2 id="report-title">Report an issue</h2>
    <label for="report-kind">Issue type</label>
    <select id="report-kind"><option value="bug">Bug — something isn't working</option><option value="content">Content issue — a question or answer</option></select>
    <fieldset id="report-items" hidden><legend>Which items? Select one or more.</legend></fieldset>
    <label for="report-description">Describe the issue</label>
    <textarea id="report-description" rows="4" maxlength="1500" required placeholder="What happened, and what did you expect? For a marking issue, include the part and your answer."></textarea>
    <p id="report-error" class="error" role="alert"></p>
    <label for="report-preview">Email preview</label>
    <textarea id="report-preview" rows="6" readonly></textarea>
    <p>Includes the page, build and browser details shown above. Your saved progress and answers are not attached.</p>
    <p>${REPORT_EMAIL ? 'Review and send the draft in your email app.' : 'Enter your teacher’s email address in the draft, then review and send it.'} If your email app does not open or the message is incomplete, use Copy report and paste it into an email.</p>
    <p id="report-status" role="status"></p>
    <div class="actions"><button type="button" id="report-close">Close</button><button type="submit" value="copy">Copy report</button><button type="submit" value="email" class="primary">Open email draft</button></div>
  </form>`;
  const find = selector => dialog.querySelector(selector);
  for (const q of context.questions) {
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox'; checkbox.value = q.code;
    label.append(checkbox, document.createTextNode(`${q.number}. ${q.title}`));
    find('#report-items').append(label);
  }
  const current = () => makeReport(context, find('#report-kind').value, find('#report-description').value,
    [...dialog.querySelectorAll('input:checked')].map(input => input.value));
  const update = () => {
    find('#report-items').hidden = find('#report-kind').value !== 'content' || !context.questions.length;
    find('#report-preview').value = current().body;
    find('#report-error').textContent = ''; find('#report-status').textContent = '';
  };
  find('form').addEventListener('input', update);
  find('form').addEventListener('change', update);
  find('form').onsubmit = async event => {
    event.preventDefault();
    if (find('#report-kind').value === 'content' && context.questions.length && !dialog.querySelector('input:checked')) {
      find('#report-error').textContent = 'Select at least one item.';
      find('#report-items input').focus(); return;
    }
    if (!find('#report-description').value.trim()) {
      find('#report-error').textContent = 'Please describe the issue.';
      find('#report-description').focus(); return;
    }
    const report = current();
    if (event.submitter?.value === 'email') {
      window.location.href = emailURL(report);
      find('#report-status').textContent = 'Email draft requested. Nothing has been sent by this site.';
    } else {
      try { await navigator.clipboard.writeText(report.body); find('#report-status').textContent = 'Report copied. Paste it into your email.'; }
      catch { find('#report-preview').focus(); find('#report-preview').select(); find('#report-status').textContent = 'Copy the selected preview text, then paste it into your email.'; }
    }
  };
  find('#report-close').onclick = () => dialog.close();
  dialog.onclose = () => dialog.remove();
  document.body.append(dialog); update(); dialog.showModal();
}
