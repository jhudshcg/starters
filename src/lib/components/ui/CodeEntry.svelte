<!-- Shared code/search form with explicit diagnostics and replacement actions. -->
<script>
  let { app, error, global = false, href } = $props();
  let value = $state('');
  async function submit(event) {
    event.preventDefault();
    if (await app.openCode(new FormData(event.currentTarget).get('code'))) value = '';
  }
</script>

<form id={global ? 'global-code-form' : 'code-form'} onsubmit={submit}>
  {#if global}<label for="global-code">Code or key term</label>{/if}
  <input
    class="text-field"
    id={global ? 'global-code' : undefined}
    name="code"
    aria-label="Question set code or key term"
    placeholder="Enter code or key term"
    autocomplete="off"
    autocapitalize="off"
    spellcheck="false"
    required
    bind:value
  />
  <button class="action-button" type="submit">Open <span aria-hidden="true">↗</span></button>
</form>
{#if global}<small id="global-code-help">Search all questions</small>{/if}
<p class="error" id={global ? 'global-code-error' : 'code-error'} role="alert">
  {#if error}{error.message}
    <button
      type="button"
      class="action-button subtle code-diagnostics"
      onclick={() => app.copy(JSON.stringify(error.diagnostics, null, 2))}
      >Copy error details</button
    >
    {#if error.replacement}<button
        type="button"
        class="action-button"
        onclick={() => app.replacement()}>Choose a replacement set</button
      >{/if}
    <a href={href('#search=all&q=' + encodeURIComponent(error.input))}
      >Search for this term instead</a
    >
  {/if}
</p>
