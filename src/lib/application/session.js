/**
 * Purpose: Compose the browser application once while SvelteKit owns route changes.
 * Main contents: observable view, profile/practice commands, prompts and lifecycle cleanup.
 * Used by: AppShell. Uses: domain modules and profile/practice sessions.
 * Libs: none; navigation and focus are supplied by the Svelte host.
 */
import { createProfile } from './profile.js';
import { createPractice } from './practice.js';
import {
  banks,
  types,
  historicalSet,
  resolve,
  ensureBank,
  loadSet,
  choose,
  focuses,
} from '#domain/bank.js';
import { rememberSelection } from '#domain/practice-selection.js';
import { cleanSearchQuery } from '#domain/search.js';
import { discoverableFocuses } from '#domain/activity-discovery.js';
import { questionCode, BANK_VERSION } from '#domain/codes.js';
import { codeDiagnostics } from '#domain/code-diagnostics.js';
import { updateRecommendations } from '#domain/revision.js';
import { revisionAreas } from './progress-model.js';
import { attemptEligibility } from '#domain/progress.js';
import {
  pausePractice,
  engagePractice,
  notePracticeInteraction,
  pollPractice,
  INTERACTION_POLL_MS,
} from '#domain/practice-time.js';

export function createApplication({ navigation, focus, scriptURL }) {
  const listeners = new Set();
  let route = '#home',
    ready = false,
    disposed = false,
    loading = false,
    request = 0;
  let message = '',
    toastTimer,
    profileOpen = false,
    switching = false,
    profileResolve;
  let prompt = null,
    promptResolve,
    copyText = '',
    issue = null,
    error = null;
  let currentSet = null,
    profile;
  let goReturn = '#home';
  let restoreNotice = '',
    restoreRevision = 0;
  const build = `Build ${new URL(scriptURL).pathname.split('/').pop()} · bank ${BANK_VERSION}`;
  const practiceVisible = () =>
    ready && route.startsWith('#set=') && currentSet?.code === profile?.data.active?.code;
  function snapshot() {
    return {
      route,
      ready,
      loading,
      message,
      profileOpen,
      switching,
      prompt,
      copyText,
      issue,
      error,
      build,
      restoreNotice,
      goReturn,
      restoreRevision,
      set: currentSet,
      data: profile
        ? {
            ...profile.data,
            active: profile.data.active ? structuredClone(profile.data.active) : null,
            history: [...profile.data.history],
          }
        : { history: [] },
      storageOK: profile?.storageOK ?? true,
      fileStatus: profile?.oneDrive.status() ?? '',
    };
  }
  function publish() {
    if (!disposed) for (const listener of listeners) listener(snapshot());
  }
  function toast(value) {
    message = value;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      message = '';
      publish();
    }, 4500);
    publish();
  }
  function clearToast() {
    clearTimeout(toastTimer);
    message = '';
    publish();
  }
  function confirm(title, description, accept = 'Continue', cancel = 'Cancel') {
    if (promptResolve) return Promise.resolve(false);
    prompt = { title, description, accept, cancel };
    publish();
    return new Promise((resolve) => {
      promptResolve = resolve;
    });
  }
  function decide(value) {
    const resolve = promptResolve;
    promptResolve = null;
    prompt = null;
    publish();
    resolve?.(value);
  }
  function download(content, name, type) {
    const url = URL.createObjectURL(new Blob([content], { type })),
      link = document.createElement('a');
    link.href = url;
    link.download = name;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  async function copy(value) {
    try {
      await navigator.clipboard.writeText(value);
      toast('Copied.');
    } catch {
      copyText = value;
      publish();
    }
  }
  profile = createProfile({
    changed: publish,
    remember: () => navigation.remember(),
    notify: toast,
    download,
    confirm,
    onRestore(value) {
      restoreNotice = value;
      restoreRevision++;
    },
  });
  const practice = createPractice({
    session: profile,
    navigation,
    render: refresh,
    toast,
    clearToast,
    confirm,
    visible: practiceVisible,
    focus,
  });
  /** Recompute presentation after commands; bank loads belong only to openRoute. */
  function refresh() {
    if (practiceVisible() && profile.data.active) currentSet = practice.activeSet();
    publish();
  }
  function capture() {
    return {
      profileId: profile.data.profileId,
      attempt: practiceVisible() ? structuredClone(profile.data.active) : null,
    };
  }
  function leaving() {
    if (practiceVisible() && profile.data.active) {
      rememberSelection(profile.data, practice.activeSet());
      if (!profile.data.active.finished) pausePractice(profile.data.active);
      profile.persist();
    }
    void profile.oneDrive.flush(profile.data);
  }
  async function openRoute(hash, state = {}) {
    if (!ready || disposed) return;
    const migratedFrom = profile.data.active?.migratedCodeFrom;
    if (migratedFrom && hash === `#set=${encodeURIComponent(migratedFrom)}`) {
      delete profile.data.active.migratedCodeFrom;
      await navigation.go(`#set=${encodeURIComponent(profile.data.active.code)}`, {
        replace: true,
        guard: false,
      });
      profile.persist();
      return;
    }
    const id = ++request;
    if (hash === '#go' && route !== '#go') goReturn = route;
    route = hash;
    currentSet = null;
    error = null;
    loading = true;
    publish();
    try {
      if (route === '#progress') {
        await Promise.all([ensureBank(1), ensureBank(2)]);
        if (id !== request) return;
        if (
          updateRecommendations(profile.data, revisionAreas('subtopic'), (area) =>
            choose(1, area.parent, null, 'new', 'all', area.focus),
          )
        )
          profile.persist();
      } else if (route.startsWith('#search=')) await Promise.all([0, 1, 2, 3].map(ensureBank));
      else if (/^#practice=[0-3]$/.test(route)) {
        const type = Number(route.slice(-1));
        await ensureBank(type);
        if (id !== request) return;
        await practice.entry(type);
      } else if (route.startsWith('#set=')) {
        const code = decodeURIComponent(route.slice(5));
        const set = banks[historicalSet(code).type] ? resolve(code) : await loadSet(code);
        if (id !== request) return;
        profile.restoreAttempt(state);
        if (profile.data.active?.code !== set.code) {
          await practice.start(set, { force: true, replace: true });
          return;
        }
        currentSet = practice.activeSet();
        const active = profile.data.active,
          record = active.result ?? profile.data.history.find((item) => item.id === active.id);
        active.tracking ??= {
          ...attemptEligibility(
            {
              ...profile.data,
              history: profile.data.history.filter((item) => item.id !== active.id),
            },
            active.code,
            active.started,
          ),
          ...(record ? { eligible: true } : {}),
        };
        if (!profile.data.active.finished && !document.hidden && !profileOpen)
          engagePractice(profile.data.active);
      }
    } catch (problem) {
      if (id !== request) return;
      if (route.startsWith('#set=')) showError(route.slice(5), problem);
      else toast(problem.message);
      route = '#home';
    } finally {
      if (id === request) {
        loading = false;
        publish();
      }
    }
  }
  function showError(input, problem) {
    error = {
      message: problem.message,
      input,
      replacement: problem.replacement,
      diagnostics: codeDiagnostics(input, problem, {
        pageURL: location.href,
        scriptURL,
        browser: navigator.userAgent,
      }),
    };
    publish();
  }
  async function openCode(input) {
    input = String(input).trim();
    error = null;
    publish();
    try {
      const set = await loadSet(input);
      await practice.start(set);
      return profile.data.active?.code === set.code;
    } catch (problem) {
      const codeLike =
        /^(PZ|EX|PY|ESP|OS|B5|B6|B7)-/i.test(input) ||
        (/^[A-Za-z0-9_-]{8,10}$/.test(input) &&
          (/[0-9_-]/.test(input) || input === input.toUpperCase()));
      if (!codeLike)
        await navigation.go('#search=all&q=' + encodeURIComponent(cleanSearchQuery(input)));
      else showError(input, problem);
      return false;
    }
  }
  async function replacement() {
    try {
      const { type, focus } = error.replacement;
      await ensureBank(type);
      const available = discoverableFocuses(focuses(type), type);
      await practice.start(choose(type, available.includes(focus) ? focus : available[0]));
    } catch (problem) {
      toast(problem.message);
    }
  }
  function chooseProfile(change = true) {
    if (profile.data.active && !profile.data.active.finished) {
      pausePractice(profile.data.active);
      profile.persist();
    }
    switching = change;
    profileOpen = true;
    publish();
    return new Promise((resolve) => {
      profileResolve = resolve;
    });
  }
  function closeProfile() {
    profileOpen = false;
    profileResolve?.();
    profileResolve = null;
    if (practiceVisible() && !profile.data.active?.finished) engagePractice(profile.data.active);
    publish();
  }
  async function chooseName(name, confirmed = false) {
    const result = profile.chooseName(name, confirmed);
    if (result.profile) {
      restoreNotice = '';
      closeProfile();
      if (switching) await navigation.go('#home', { guard: false });
    }
    return result;
  }
  async function restore(raw, review = false) {
    if (!(await profile.restore(raw, review))) return false;
    closeProfile();
    if (ready) await navigation.go('#progress', { guard: false });
    return true;
  }
  function report() {
    const set = practiceVisible() ? currentSet : null;
    issue = {
      questions: set
        ? set.questions.map((q, i) => ({
            number: i + 1,
            title: q.title,
            code: questionCode(set.type, q.slot, q.variation, set.version),
          }))
        : [],
      setCode: set?.code,
      page: location.origin + location.pathname + location.search,
      build,
      browser: navigator.userAgent,
      time: new Date().toISOString(),
      error: error?.diagnostics,
    };
    publish();
  }
  const events = new AbortController();
  let clockTimer, interactionTimer;
  async function start() {
    profile.load();
    if (!profile.data.username) await chooseProfile(false);
    if (disposed) return;
    await practice.resume();
    ready = true;
    const signal = events.signal;
    window.addEventListener('pagehide', leaving, { signal });
    document.addEventListener(
      'visibilitychange',
      () => {
        if (document.hidden) leaving();
        else {
          practice.tick();
          if (practiceVisible() && !profileOpen && !profile.data.active?.finished)
            engagePractice(profile.data.active);
        }
      },
      { signal },
    );
    window.addEventListener(
      'pageshow',
      () => {
        if (practiceVisible() && !profileOpen && !profile.data.active?.finished)
          engagePractice(profile.data.active);
      },
      { signal },
    );
    for (const type of [
      'pointerdown',
      'pointermove',
      'mousemove',
      'click',
      'keydown',
      'input',
      'wheel',
      'touchstart',
      'touchmove',
      'scroll',
    ])
      document.addEventListener(
        type,
        () => {
          if (practiceVisible() && !profileOpen && !profile.data.active?.finished)
            notePracticeInteraction(profile.data.active);
        },
        { capture: true, passive: true, signal },
      );
    interactionTimer = setInterval(() => {
      if (practiceVisible() && !profileOpen) pollPractice(profile.data.active);
    }, INTERACTION_POLL_MS);
    clockTimer = setInterval(() => practice.tick(), 1000);
    publish();
  }
  return {
    navigate: navigation.go,
    profile,
    practice,
    start,
    openRoute,
    capture,
    leaving,
    refresh,
    toast,
    copy,
    download,
    openCode,
    replacement,
    chooseProfile,
    chooseName,
    closeProfile,
    restore,
    decide,
    report,
    closeCopy() {
      copyText = '';
      publish();
    },
    closeIssue() {
      issue = null;
      publish();
    },
    subscribe(listener) {
      listeners.add(listener);
      listener(snapshot());
      return () => listeners.delete(listener);
    },
    async dispose() {
      if (disposed) return;
      leaving();
      disposed = true;
      request++;
      events.abort();
      clearTimeout(toastTimer);
      clearInterval(clockTimer);
      clearInterval(interactionTimer);
      practice.dispose();
      decide(false);
      closeProfile();
      listeners.clear();
      await profile.oneDrive.dispose();
    },
  };
}
