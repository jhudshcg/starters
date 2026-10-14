<!-- Profile selection preserves the required first-entry prompt and explicit name matching. -->
<script>
  import Modal from './Modal.svelte';
  let { app, view } = $props();
  let name = $state(''),
    message = $state(''),
    suggestion = $state(null),
    input;
  $effect(() => {
    if (view.profileOpen) {
      name = '';
      message = '';
      suggestion = null;
    }
  });
  async function submit(value = name, confirmed = false) {
    try {
      suggestion = await app.chooseName(value, confirmed);
    } catch (error) {
      message = error.message;
    }
  }
  async function restore(event) {
    try {
      const file = event.currentTarget.files[0];
      if (!file) return;
      if (file.size > 5000000) throw Error('Backup is too large (maximum 5 MB).');
      await app.restore(await file.text(), true);
    } catch (error) {
      message = error.message;
    }
  }
</script>

<Modal
  open={view.profileOpen}
  title="Your progress profile"
  description="Enter your name to keep your progress on this computer. Use your synced OneDrive folder to keep progress between computers."
  dismissible={view.switching}
  onclose={() => app.closeProfile()}
>
  <button type="button" id="profile-open" class="action-button" onclick={() => input.click()}
    >Open progress file</button
  ><input
    bind:this={input}
    type="file"
    id="profile-backup"
    accept=".json,.txt"
    hidden
    onchange={restore}
  />
  <form
    onsubmit={(e) => {
      e.preventDefault();
      submit(String(new FormData(e.currentTarget).get('username') ?? ''));
    }}
  >
    <label for="profile-name">Your name</label><input
      class="text-field"
      id="profile-name"
      name="username"
      maxlength="80"
      required
      autocomplete="name"
      bind:value={name}
    />
    <p id="profile-message" role="status">
      {message}{#if suggestion?.suggestion}Did you mean <strong>{suggestion.suggestion}</strong>?
        <button
          type="button"
          class="action-button"
          id="use-match"
          onclick={() => submit(suggestion.suggestion, true)}>Yes, use this profile</button
        >
        <button
          type="button"
          class="action-button"
          id="use-entered"
          onclick={() => submit(suggestion.entered, true)}>No, use {suggestion.entered}</button
        >{/if}
    </p>
    <div class="actions">
      <button class="action-button primary" type="submit">Continue</button
      >{#if view.switching}<button
          type="button"
          class="action-button"
          id="profile-cancel"
          onclick={() => app.closeProfile()}>Cancel</button
        >{/if}
    </div>
  </form>
</Modal>
