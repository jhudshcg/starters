<!-- Persisted palette controls; Bits UI owns the popover and focus. -->
<script>
  import { onMount } from 'svelte';
  import { Popover } from 'bits-ui';
  import { createTheme, themePalettes } from '#lib/theme/preferences.js';
  let { notify } = $props();
  let theme = $state.raw(null),
    view = $state.raw({
      mode: 'light',
      dark: false,
      palette: 'sage',
      saturation: 30,
      lightness: 94,
    });
  onMount(() => {
    let storage;
    try {
      storage = localStorage;
    } catch {}
    theme = createTheme({ root: document.documentElement, storage, notify });
    return theme.subscribe((value) => {
      view = value;
    });
  });
</script>

<Popover.Root>
  <Popover.Trigger
    id="theme-picker"
    class="icon-button"
    aria-label="Choose colour theme"
    title="Choose colour theme"
    disabled={!theme}
  >
    <svg viewBox="0 0 24 24" aria-hidden="true"
      ><circle cx="7" cy="7" r="3" /><circle cx="17" cy="7" r="3" /><circle
        cx="7"
        cy="17"
        r="3"
      /><circle cx="17" cy="17" r="3" /></svg
    >
  </Popover.Trigger>
  <Popover.Portal>
    <Popover.Content
      strategy="fixed"
      sticky="always"
      id="theme-menu"
      class="popover-panel"
      sideOffset={8}
      align="end"
      collisionPadding={16}
    >
      <h2>Colour theme</h2>
      <div id="theme-previews">
        {#each ['light', 'dark'] as mode}
          <fieldset class="theme-group">
            <legend>{mode === 'light' ? 'Light' : 'Dark'} themes</legend>
            <div class="theme-preview-grid">
              {#each themePalettes as palette}
                <button
                  type="button"
                  class="theme-preview"
                  data-theme-choice={`${mode}:${palette.id}`}
                  aria-label={`${palette[mode]} · ${mode}`}
                  aria-pressed={view.mode === mode && view.palette === palette.id}
                  onclick={() => theme.choose(mode, palette.id)}
                >
                  <span
                    class="theme-swatch"
                    data-theme={mode}
                    data-palette={palette.id}
                    aria-hidden="true"
                  ></span><span>{palette[mode]}</span>
                </button>
              {/each}
            </div>
          </fieldset>
        {/each}
      </div>
      <div class="theme-adjustments">
        <label for="theme-saturation"
          >Saturation <output id="theme-saturation-value" for="theme-saturation"
            >{view.saturation}%</output
          ></label
        >
        <input
          id="theme-saturation"
          type="range"
          min="0"
          max="100"
          step="5"
          value={view.saturation}
          oninput={(e) => theme.adjust(Number(e.currentTarget.value), view.lightness)}
        />
        <label for="theme-lightness"
          >Background lightness <output id="theme-lightness-value" for="theme-lightness"
            >{view.lightness}%</output
          ></label
        >
        <input
          id="theme-lightness"
          type="range"
          min={view.dark ? 5 : 55}
          max={view.dark ? 45 : 96}
          step="1"
          value={view.lightness}
          aria-valuetext={`${view.lightness}% background lightness`}
          oninput={(e) => theme.adjust(view.saturation, Number(e.currentTarget.value))}
        />
        <button
          type="button"
          id="theme-reset"
          class="action-button subtle"
          onclick={() => theme.reset()}>Reset adjustments</button
        >
      </div>
    </Popover.Content>
  </Popover.Portal>
</Popover.Root>
<button
  type="button"
  id="theme-toggle"
  class="icon-button"
  aria-label={view.dark ? 'Light theme' : 'Dark theme'}
  title={view.dark ? 'Switch to paired light theme' : 'Switch to paired dark theme'}
  aria-pressed={view.dark}
  disabled={!theme}
  onclick={() => theme.toggle()}
>
  <svg viewBox="0 0 24 24" aria-hidden="true"
    >{#if view.dark}<circle cx="12" cy="12" r="4" /><path
        d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"
      />{:else}<path d="M20.5 14A8.5 8.5 0 0 1 10 3.5 8.5 8.5 0 1 0 20.5 14Z" />{/if}</svg
  >
</button>
