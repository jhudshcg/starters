<!-- File actions retain local-first writes and existing permission/conflict handling. -->
<script>
  let { app, status, href } = $props();
</script>

<section class="onedrive-controls" aria-label="OneDrive progress file">
  <p data-file-status role="status">{status}</p>
  <div class="actions">
    {#if app.profile.oneDrive.supported()}<button
        class="action-button primary"
        data-file-action="save"
        onclick={() => app.profile.oneDrive.action('save')}>Save to OneDrive</button
      ><button
        class="action-button"
        data-file-action="open"
        onclick={() => app.profile.oneDrive.action('open')}>Open progress file</button
      >{/if}
    <button
      class="action-button"
      data-file-action="download"
      onclick={() => app.profile.oneDrive.action('download')}>Download backup</button
    ><a href={href('#progress')}>Manage progress files</a>
  </div>
  <details>
    <summary>File options</summary>
    <div class="actions">
      {#if app.profile.oneDrive.supported()}{#each [['folder', 'Choose OneDrive folder'], ['review', 'Open linked file'], ['keep', 'Keep browser progress']] as [action, label]}<button
            class="action-button"
            data-file-action={action}
            onclick={() => app.profile.oneDrive.action(action)}>{label}</button
          >{/each}{/if}<button
        class="action-button"
        data-file-action="forget"
        onclick={() => app.profile.oneDrive.action('forget')}>Forget file link</button
      >
    </div>
    <p>
      Choose the locally synced OneDrive root, or its T-Level / DSD T-Level folder. Saves are
      checked after writing. Keep the tab open until saved; closing the browser can interrupt a
      save. This does not confirm cloud upload.
    </p>
  </details>
</section>
