<!-- One application lifetime; Kit owns navigation and Svelte owns the page shell. -->
<script>
  import { onMount, setContext, tick } from 'svelte';
  import { beforeNavigate, afterNavigate, goto, snapshot } from '$app/navigation';
  import { page } from '$app/state';
  import { resolve } from '$app/paths';
  import { createApplication } from '#lib/application/session.js';
  import { routeURL, routeHash } from '#lib/application/routes.js';
  import Header from './ui/Header.svelte';
  import CodeEntry from './ui/CodeEntry.svelte';
  import ProfileDialog from './ui/ProfileDialog.svelte';
  import Modal from './ui/Modal.svelte';
  import IssueReport from './ui/IssueReport.svelte';
  let { children } = $props();
  let app = $state.raw(null),
    view = $state.raw({
      route: '#home',
      ready: false,
      data: { history: [] },
      storageOK: true,
    });
  let allowNavigation = false,
    disposed = false;
  let legacyTransition = null;
  let historySnapshot = null;
  let navigationType = 'enter';
  const base = resolve('/').replace(/\/$/, '');
  const href = (hash) => routeURL(hash, base);
  const context = {
    get app() {
      return app;
    },
    get view() {
      return view;
    },
    href,
  };
  setContext('application', context);
  async function focus(id) {
    await tick();
    document.getElementById(id)?.focus();
  }
  const navigation = {
    state: () => historySnapshot ?? page.state,
    remember(extra = {}) {
      if (!app || !view.ready || disposed) return;
      historySnapshot = { ...(historySnapshot ?? page.state), ...app.capture(), ...extra };
    },
    async go(hash, { replace = false, guard = true, state = {}, snapshot = true } = {}) {
      if (disposed || (guard && !(await app.practice.askLeave()))) return false;
      if (disposed) return false;
      if (snapshot) navigation.remember();
      app.leaving();
      allowNavigation = true;
      await goto(href(hash), { replace, state, reset: false });
      allowNavigation = false;
      return true;
    },
  };
  beforeNavigate((event) => {
    if (!app || !view.ready || disposed) return;
    if (allowNavigation || !app.practice.needsLeaveWarning()) {
      app.leaving();
      return;
    }
    event.cancel();
    if (event.willUnload && !event.to) return;
    void app.practice.askLeave().then(async (accepted) => {
      if (!accepted || disposed) {
        return;
      }
      app.leaving();
      allowNavigation = true;
      if (event.type === 'popstate') history.go(event.delta);
      else if (event.willUnload) location.href = event.to.url.href;
      else await goto(event.to.url, { reset: false });
    });
  });
  async function showRoute(type = 'goto') {
    if (!view.ready || disposed) return;
    const hash = routeHash(page.url, base);
    if (page.url.hash && page.url.hash !== '#main') return;
    await app.openRoute(hash, historySnapshot ?? page.state);
    await tick();
    if (type !== 'popstate') await focus('main');
  }
  afterNavigate(({ type }) => {
    allowNavigation = false;
    navigationType = type;
  });
  // Let Kit capture each entry at the correct history index. Writing shallow
  // page state while a traversal is pending can overwrite its destination.
  snapshot({
    id: 'practice-attempt',
    capture: () => historySnapshot ?? app?.capture() ?? null,
    restore(value) {
      historySnapshot = value;
      void showRoute(navigationType);
    },
    reset() {
      historySnapshot = null;
      void showRoute(navigationType);
    },
  });
  // Kit updates page.url for hash-only changes without a full route navigation.
  // Translate old bookmarks through Kit; do not install another history listener.
  $effect(() => {
    const hash = page.url.hash;
    if (!view.ready || !hash || hash === '#main' || legacyTransition === hash) return;
    legacyTransition = hash;
    void navigation
      .go(hash, { replace: true })
      .then((accepted) => {
        if (!accepted) return navigation.go(view.route, { replace: true, guard: false });
      })
      .finally(() => {
        legacyTransition = null;
      });
  });
  onMount(() => {
    app = createApplication({ navigation, focus, scriptURL: import.meta.url });
    const unsubscribe = app.subscribe((value) => {
      view = value;
    });
    void app.start().then(() => showRoute('enter'));
    return () => {
      disposed = true;
      unsubscribe();
      void app.dispose();
    };
  });
</script>

<svelte:head><title>Start here · Digital Software Development</title></svelte:head>
<a class="skip" href="#main">Skip to content</a>
<Header {app} {view} {href} />
<section
  class="global-code-entry"
  hidden={!view.ready || ['#home', '#about', '#faq', '#projects', '#go'].includes(view.route)}
  aria-label="Find practice or open a question set"
>
  <CodeEntry {app} error={view.error} global {href} />
</section>
<div id="storage-warning" role="alert" hidden={view.storageOK}>
  Progress could not be saved on this browser. You can keep practising. Export a backup from My
  progress to keep your results.
</div>
<main id="main" tabindex="-1">
  {#if view.ready}{@render children()}{:else}<p role="status">Loading activities…</p>
    <p>Reload this page if activities do not appear.</p>{/if}
</main>
<div id="toast" role="status" aria-live="polite">{view.message ?? ''}</div>
<footer>
  <span>A small start. A stronger understanding.<br />designed by Joe Hudson</span>
  <div class="footer-links">
    <a href={href('#about')}>About</a><a href={href('#faq')}>FAQ</a><button
      type="button"
      id="report-issue"
      class="action-button subtle"
      onclick={() => app?.report()}>Report an issue</button
    >
  </div>
  <span
    >T Level · Core 1.1 <span aria-hidden="true">/</span> Saved on this browser<br /><small
      id="build-info">{view.build ?? ''}</small
    ></span
  >
</footer>
{#if app}
  <ProfileDialog {app} {view} />
  <Modal
    open={Boolean(view.prompt)}
    title={view.prompt?.title ?? ''}
    description={view.prompt?.description ?? ''}
    onclose={() => app.decide(false)}
  >
    <div class="actions">
      <button class="action-button" value="stay" onclick={() => app.decide(false)}
        >{view.prompt?.cancel}</button
      ><button class="action-button primary" value="leave" onclick={() => app.decide(true)}
        >{view.prompt?.accept}</button
      >
    </div>
  </Modal>
  <Modal
    open={Boolean(view.copyText)}
    title="Copy this code or link"
    onclose={() => app.closeCopy()}
  >
    <input
      class="text-field"
      aria-label="Text to copy"
      readonly
      value={view.copyText}
      onfocus={(e) => e.currentTarget.select()}
    /><button class="action-button" onclick={() => app.closeCopy()}>Close</button>
  </Modal>
  {#if view.issue}<IssueReport context={view.issue} onclose={() => app.closeIssue()} />{/if}
{/if}
