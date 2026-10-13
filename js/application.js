/**
 * Purpose: Compose page controllers and own application startup and routing.
 *
 * Main contents: services, route loading, history snapshots and application disposal
 *
 * Used by: app.js.
 * Uses: page controllers, profile session, navigation, theme and lifecycle.
 * Libs: none.
 */
import { createNavigation } from './navigation.js';
import { createProfileSession } from './profile-session.js';
import { createPracticeController } from './practice-controller.js';
import { createEntryPages } from './entry-pages.js';
import { createProgressPage } from './progress-page.js';
import { createAppFeedback } from './app-feedback.js';
import { mountAppLifecycle } from './app-lifecycle.js';
import { faqHTML } from './faq.js';
import { pythonProjectsHTML } from './python-projects.js';
import { mountGoPractice } from './go-practice.js';
import { disposeChallenges as disposePuzzles } from './challenge-controls.js';
import { rememberSelection } from './practice-selection.js';
import { pausePractice } from './practice-time.js';
import { initTheme } from './theme.js';
import { banks, types, historicalSet, resolve, ensureBank, loadSet } from './bank.js';
import { cleanSearchQuery } from './search.js';
import { questionCode, BANK_VERSION } from './codes.js';
import { openIssueReport } from './issue-report.js';
/** Mount the legacy application once. Await its disposer before mounting a replacement. */
export async function mountApplication({ scriptURL }) {
  const $ = (selector) => document.querySelector(selector);
  const main = $('#main');
  const events = new AbortController();
  let disposed = false,
    navigation,
    practice,
    pages,
    progressPage;
  const disposeTheme = initTheme($('#theme-toggle'));
  $('#build-info').textContent =
    `Build ${new URL(scriptURL).pathname.split('/').pop()} · bank ${BANK_VERSION}`;
  const feedback = createAppFeedback({ start: (...args) => practice.start(...args), scriptURL });
  const session = createProfileSession({
    main,
    remember: () => navigation?.remember(),
    onProfileChange: () => progressPage.resetFilters(),
    showProgress: () => progressPage.show(),
    goHome: () => navigation.go('#home', { guard: false }),
    render,
    practiceVisible: () => practice.visible(),
    toast: feedback.toast,
    download: feedback.download,
  });
  session.load();
  navigation = createNavigation({
    beforeLeave: async () => {
      if (!(await practice.askLeave())) return false;
      if ($('#display-code') && session.data.active) {
        rememberSelection(session.data, practice.activeSet());
        if (!session.data.active.finished) pausePractice(session.data.active);
        session.persist();
      }
      return true;
    },
    capture: () => ({
      profileId: session.data.profileId,
      attempt:
        location.hash === `#set=${encodeURIComponent(session.data.active?.code)}`
          ? session.data.active
          : null,
    }),
    restore: (state) => session.restoreAttempt(state),
    render: async () => {
      await render();
      main.focus();
    },
  });
  practice = createPracticeController({
    main,
    session,
    navigation,
    render,
    home: () => pages.home(),
    toast: feedback.toast,
    clearToast: feedback.clearToast,
    copy: feedback.copy,
  });
  pages = createEntryPages({
    main,
    session,
    navigation,
    start: practice.start,
    openCodeOrSearch,
    toast: feedback.toast,
  });
  progressPage = createProgressPage({
    main,
    session,
    start: practice.start,
    toast: feedback.toast,
    download: feedback.download,
  });
  let disposeGoPractice = null,
    goReturn = '#home';
  let renderId = 0;
  async function render() {
    if (disposed) return;
    const requestId = ++renderId;
    const route = location.hash;
    void session.oneDrive.flush(session.data);
    disposeGoPractice?.();
    disposeGoPractice = null;
    disposePuzzles(main);
    $('#nav-home').setAttribute(
      'aria-current',
      route === '#progress' || route === '#about' ? 'false' : 'page',
    );
    $('#nav-progress').setAttribute('aria-current', route === '#progress' ? 'page' : 'false');
    if (route === '#progress') {
      await Promise.all([ensureBank(1), ensureBank(2)]);
      if (requestId === renderId) progressPage.show();
      return;
    }
    if (route === '#go') {
      $('.global-code-entry').hidden = true;
      disposeGoPractice = mountGoPractice(main, goReturn);
      return;
    }
    if (route === '#about') {
      pages.about();
      return;
    }
    if (route === '#faq') {
      pages.information(faqHTML());
      return;
    }
    if (route === '#projects') {
      pages.information(pythonProjectsHTML());
      return;
    }
    if (/^#practice=[0-3]$/.test(route)) {
      const type = Number(route.slice(-1));
      await ensureBank(type);
      if (requestId === renderId) await practice.entry(type);
      return;
    }
    if (route === '#exam') {
      pages.exam();
      return;
    }
    if (route.startsWith('#search=')) {
      const params = new URLSearchParams(route.slice(1)),
        type = params.get('search') === 'all' ? 'all' : Number(params.get('search'));
      if (type !== 'all' && (!Number.isInteger(type) || type < 0 || type >= types.length)) {
        pages.home();
        return;
      }
      try {
        await Promise.all([0, 1, 2, 3].map(ensureBank));
        if (requestId === renderId) pages.search(type, params.get('q') ?? '');
      } catch (error) {
        if (requestId === renderId) {
          pages.home();
          feedback.toast(error.message);
        }
      }
      return;
    }
    if (route.startsWith('#set=')) {
      try {
        const code = decodeURIComponent(route.slice(5));
        const set = banks[historicalSet(code).type] ? resolve(code) : await loadSet(code);
        if (requestId !== renderId) return;
        if (session.data.active?.code === set.code) {
          practice.show();
          return;
        }
        // External links are explicit navigation; preserve unfinished work until confirmed.
        await practice.start(set, { force: true, replace: true });
        if (session.data.active?.code !== set.code) navigation.go('#home');
        return;
      } catch (e) {
        if (requestId !== renderId) return;
        pages.home();
        feedback.showCodeError($('#code-error'), route.slice(5), e);
        return;
      }
    }
    pages.home();
  }
  async function openCodeOrSearch(e, errorSelector) {
    e.preventDefault();
    const input = String(new FormData(e.target).get('code')).trim(),
      error = $(errorSelector);
    error.textContent = '';
    try {
      const set = await loadSet(input);
      await practice.start(set);
      if (session.data.active?.code === set.code) e.target.reset();
    } catch (problem) {
      // Existing valid codes always win; familiar words/references use search.
      const looksLikeCode =
        /^(PZ|EX|PY|ESP|OS|B5|B6|B7)-/i.test(input) ||
        (/^[A-Za-z0-9_-]{8,10}$/.test(input) &&
          (/[0-9_-]/.test(input) || input === input.toUpperCase()));
      if (!looksLikeCode) {
        navigation.go('#search=all&q=' + encodeURIComponent(cleanSearchQuery(input)));
        return;
      }
      feedback.showCodeError(error, input, problem);
      const search = document.createElement('a');
      search.href = '#search=all&q=' + encodeURIComponent(cleanSearchQuery(input));
      search.textContent = 'Search for this term instead';
      error.append(' ', search);
    }
  }

  $('#report-issue').addEventListener(
    'click',
    () => {
      const set = $('#display-code') ? practice.activeSet() : null;
      const error = [...document.querySelectorAll('#code-error, #global-code-error')].find(
        (el) => el.textContent && el.getClientRects().length,
      );
      openIssueReport({
        questions: set
          ? set.questions.map((q, i) => ({
              number: i + 1,
              title: q.title,
              code: questionCode(set.type, q.slot, q.variation, set.version),
            }))
          : [],
        setCode: set?.code,
        page: `${location.origin}${location.pathname}${set ? '#set=' + set.code : location.hash === '#progress' ? '#progress' : '#home'}`,
        build: $('#build-info').textContent,
        browser: navigator.userAgent,
        time: new Date().toISOString(),
        error: error?.reportDiagnostics,
      });
    },
    { signal: events.signal },
  );

  await session.initialise();
  await practice.resume();
  $('#global-code-form').addEventListener(
    'submit',
    (e) => openCodeOrSearch(e, '#global-code-error'),
    { signal: events.signal },
  );
  const disposeLifecycle = mountAppLifecycle({
    main,
    session,
    navigation,
    practice,
    setGoReturn: (value) => {
      goReturn = value;
    },
  });
  await render();
  return async () => {
    if (disposed) return;
    disposed = true;
    renderId++;
    events.abort();
    disposeLifecycle();
    navigation.dispose();
    disposeTheme();
    disposeGoPractice?.();
    disposePuzzles(main);
    practice.dispose();
    if (session.data.active && !session.data.active.finished) pausePractice(session.data.active);
    session.persist();
    session.dispose();
    await session.oneDrive.dispose();
    feedback.dispose();
    main.replaceChildren();
  };
}
