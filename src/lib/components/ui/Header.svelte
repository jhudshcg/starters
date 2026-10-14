<!-- Shared brand, theme controls, navigation and current profile. -->
<script>
  import { Popover } from 'bits-ui';
  import ThemeControls from './ThemeControls.svelte';
  import { lastTracked } from '#domain/weekly-progress.js';
  let { app, view, href } = $props();
  let open = $state(false);
  const last = $derived(lastTracked(view.data.history));
</script>

<header class="site-header">
  <a class="brand" href={href('#home')} aria-label="Start here home"
    ><span class="brand-icon" aria-hidden="true">s.</span><span class="brand-copy">start here</span
    ><span class="brand-sub">Digital Software Development T-Level</span></a
  >
  <div class="theme-controls">
    <ThemeControls notify={(value) => app?.toast(value)} />
    <Popover.Root bind:open>
      <Popover.Trigger
        id="nav-toggle"
        class="icon-button"
        aria-label="Open navigation menu"
        title="Navigation menu"
        ><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16" /></svg
        ></Popover.Trigger
      >
      <Popover.Portal
        ><Popover.Content
          strategy="fixed"
          sticky="always"
          id="nav-menu"
          class="popover-panel"
          sideOffset={8}
          align="end"
          collisionPadding={16}
        >
          <nav aria-label="Main navigation">
            {#each [['#home', 'Activities', 'nav-home'], ['#progress', 'My progress', 'nav-progress'], ['#projects', 'Python project ideas'], ['#go', 'Go practice board']] as [route, label, id]}
              <a
                {id}
                href={href(route)}
                aria-current={view.route === route ? 'page' : undefined}
                onclick={() => {
                  open = false;
                }}>{label}</a
              >
            {/each}
            <a
              href="https://joe312213.github.io/practice-gcse-maths/"
              target="_blank"
              rel="noopener"
              onclick={() => {
                open = false;
              }}>Maths practice ↗</a
            >
            <a
              href={href('#faq')}
              onclick={() => {
                open = false;
              }}>FAQ</a
            >
          </nav>
        </Popover.Content></Popover.Portal
      >
    </Popover.Root>
    <a
      class="header-progress-link"
      href={href('#progress')}
      aria-current={view.route === '#progress' ? 'page' : undefined}>My progress</a
    >
  </div>
  {#if view.data.username}
    <div id="profile-welcome">
      <span class="profile-greeting">Welcome back {view.data.username}</span>
      <button class="action-button subtle" id="switch-profile" onclick={() => app.chooseProfile()}
        >Not you?</button
      ><small class="last-tracked"
        >{last === null
          ? 'No tracked practice yet'
          : `Last tracked: ${new Date(last).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })}`}</small
      >
    </div>
  {/if}
</header>
