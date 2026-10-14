<!-- Student-reviewed email draft; no data is sent automatically. -->
<script>
  import Modal from './Modal.svelte';
  import { makeReport, emailURL } from '#domain/issue-report.js';
  let { context, onclose } = $props();
  let kind = $state('bug'),
    description = $state(''),
    selected = $state([]),
    error = $state(''),
    status = $state(''),
    preview;
  const report = $derived(makeReport(context, kind, description, selected));
  async function submit(event) {
    event.preventDefault();
    error = '';
    if (kind === 'content' && context.questions.length && !selected.length) {
      error = 'Select at least one item.';
      document.querySelector('#report-items input')?.focus();
      return;
    }
    if (!description.trim()) {
      error = 'Please describe the issue.';
      document.getElementById('report-description')?.focus();
      return;
    }
    if (event.submitter?.value === 'email') {
      location.href = emailURL(report);
      status = 'Email draft requested. Nothing has been sent by this site.';
    } else
      try {
        await navigator.clipboard.writeText(report.body);
        status = 'Report copied. Paste it into your email.';
      } catch {
        preview.focus();
        preview.select();
        status = 'Copy the selected preview text, then paste it into your email.';
      }
  }
</script>

<Modal open title="Report an issue" id="issue-report" {onclose}>
  <form onsubmit={submit}>
    <label for="report-kind">Issue type</label><select
      class="choice-field"
      id="report-kind"
      bind:value={kind}
      ><option value="bug">Bug — something isn't working</option
      >{#if context.questions.length}<option value="content"
          >Content issue — a question or answer</option
        >{/if}</select
    >
    <fieldset id="report-items" hidden={kind !== 'content'}>
      <legend>Which items? Select one or more.</legend>{#each context.questions as q}<label
          ><input type="checkbox" value={q.code} bind:group={selected} />{q.number}. {q.title}</label
        >{/each}
    </fieldset>
    <label for="report-description">Describe the issue</label><textarea
      class="working-field"
      id="report-description"
      rows="4"
      maxlength="1500"
      required
      placeholder="What happened, and what did you expect? For a marking issue, include the part and your answer."
      bind:value={description}></textarea>
    <p id="report-error" class="error" role="alert">{error}</p>
    <label for="report-preview">Email preview</label><textarea
      class="working-field"
      id="report-preview"
      rows="6"
      readonly
      value={report.body}
      bind:this={preview}></textarea>
    <p>
      Includes the page, build and browser details shown above. Your saved progress and answers are
      not attached.
    </p>
    <p>
      Enter your teacher’s email address in the draft, then review and send it. If your email app
      does not open or the message is incomplete, use Copy report and paste it into an email.
    </p>
    <p id="report-status" role="status">{status}</p>
    <div class="actions">
      <button class="action-button" type="button" id="report-close" onclick={onclose}>Close</button
      ><button class="action-button" type="submit" value="copy">Copy report</button><button
        type="submit"
        value="email"
        class="action-button primary">Open email draft</button
      >
    </div>
  </form>
</Modal>
