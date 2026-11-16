/**
 * Purpose: Recover a failed initial app-module download before Svelte can mount.
 * Main contents: one guarded refresh and an independent failure notice.
 * Used by: the server hook's inline bootstrap. Uses: native browser APIs only.
 * Libs: none; keep this function self-contained for inline serialisation.
 */
export function installStartupRecovery(browser = window) {
  const { document } = browser;
  const key = 'dsd-starters-startup-retry';
  let stopped = false,
    recovering = false,
    pendingMessage;
  const notice = (message) => {
    pendingMessage = message;
    const panel = document.getElementById('startup-error');
    if (!panel) return;
    panel.hidden = false;
    panel.querySelector('p').textContent = message;
  };
  const clearGuard = () => {
    try {
      browser.sessionStorage.removeItem(key);
    } catch {}
  };
  async function recover() {
    if (stopped || recovering) return;
    recovering = true;
    notice('The page could not finish loading. Trying a fresh copy…');
    let allowed = false;
    try {
      allowed = browser.sessionStorage.getItem(key) !== browser.location.href;
      if (allowed) browser.sessionStorage.setItem(key, browser.location.href);
    } catch {
      allowed = false;
      // Without a persistent guard an automatic refresh could loop.
    }
    if (allowed) {
      try {
        const response = await browser.fetch(browser.location.href, {
          cache: 'reload',
          signal: browser.AbortSignal.timeout(10000),
        });
        if (response.ok && response.headers.get('content-type')?.includes('text/html')) {
          await response.text();
          if (!stopped) browser.location.reload();
          return;
        }
      } catch {}
    }
    if (!stopped)
      notice('The page could not finish loading. Check your connection, then reload to try again.');
  }
  function failed(event) {
    const message = String(event.reason?.message || '');
    if (
      /Failed to fetch dynamically imported module|error loading dynamically imported module|Importing a module script failed/i.test(
        message,
      )
    )
      void recover();
  }
  function mounted() {
    stopped = true;
    clearGuard();
    browser.removeEventListener('unhandledrejection', failed);
    browser.removeEventListener('starters:mounted', mounted);
    const panel = document.getElementById('startup-error');
    if (panel) panel.hidden = true;
  }
  browser.addEventListener('unhandledrejection', failed);
  browser.addEventListener('starters:mounted', mounted);
  document.addEventListener(
    'DOMContentLoaded',
    () => {
      if (pendingMessage && !stopped) notice(pendingMessage);
      document.getElementById('startup-reload')?.addEventListener('click', () => {
        clearGuard();
        browser.location.reload();
      });
    },
    { once: true },
  );
}
