/**
 * Purpose: Own global navigation links, practice-clock events and polling.
 *
 * Main contents: mount subscriptions and their matching cleanup
 *
 * Used by: application.
 * Uses: practice-time and selection recall.
 * Libs: none.
 */
import {
  engagePractice,
  notePracticeInteraction,
  pollPractice,
  INTERACTION_POLL_MS,
  pausePractice,
} from './practice-time.js';
import { rememberSelection } from './practice-selection.js';
/** Mount once per application; disposal does not run on pagehide because Back can restore it. */
export function mountAppLifecycle({ main, session, navigation, practice, setGoReturn }) {
  const $ = (selector) => document.querySelector(selector);
  const { activeSet, needsLeaveWarning, askLeave, tick, visible: practiceVisible } = practice;
  const events = new AbortController();
  const { signal } = events;
  document.addEventListener(
    'click',
    async (event) => {
      const link = event.target.closest('a[href]');
      if (link?.getAttribute('href') === '#go') setGoReturn(location.hash || '#home');
      if (
        !link ||
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        link.hasAttribute('download') ||
        (link.target && link.target !== '_self')
      )
        return;
      if (link.getAttribute('href') === '#main') {
        event.preventDefault();
        main.focus();
        return;
      }
      const url = new URL(link.href, location.href);
      if (
        url.origin === location.origin &&
        url.pathname === location.pathname &&
        url.search === location.search
      ) {
        event.preventDefault();
        $('#nav-menu').hidePopover();
        navigation.go(url.hash || '#home', {
          state: link.hasAttribute('data-practice-picker') ? { practiceEntry: true } : {},
        });
        return;
      }
      if (!needsLeaveWarning()) return;
      event.preventDefault();
      if (await askLeave()) location.href = url.href;
    },
    { signal },
  );
  window.addEventListener(
    'pagehide',
    () => {
      if ($('#display-code') && session.data.active) rememberSelection(session.data, activeSet());
      void session.oneDrive.flush(session.data);
      if (session.data.active && !session.data.active.finished) {
        pausePractice(session.data.active);
        session.data.active.saved = Date.now();
        session.persist();
      }
    },
    { signal },
  );
  document.addEventListener(
    'visibilitychange',
    () => {
      if (document.hidden) {
        void session.oneDrive.flush(session.data);
        if (session.data.active && !session.data.active.finished) {
          pausePractice(session.data.active);
          session.persist();
        }
      } else {
        tick();
        if (practiceVisible()) engagePractice(session.data.active);
      }
    },
    { signal },
  );
  window.addEventListener(
    'pageshow',
    () => {
      if (practiceVisible()) engagePractice(session.data.active);
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
        const clock = session.data.active?.practiceClock;
        if (clock?.running && clock.interacted) return;
        if (practiceVisible()) notePracticeInteraction(session.data.active);
      },
      { capture: true, passive: true, signal },
    );
  const interactionTimer = setInterval(() => {
    if (practiceVisible()) pollPractice(session.data.active);
  }, INTERACTION_POLL_MS);
  const deadlineTimer = setInterval(tick, 1000);
  return () => {
    events.abort();
    clearInterval(interactionTimer);
    clearInterval(deadlineTimer);
  };
}
