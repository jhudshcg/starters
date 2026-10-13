/**
 * Purpose: Provide transient messages, code diagnostics and file downloads.
 *
 * Main contents: toast, clipboard fallback, code errors and download
 *
 * Used by: application and page controllers.
 * Uses: diagnostics, bank replacement selection and native dialogs.
 * Libs: none.
 */
import { esc } from './view-utils.js';
import { showModal } from './dialog.js';
import { codeDiagnostics } from './code-diagnostics.js';
import { ensureBank, choose, focuses } from './bank.js';
import { discoverableFocuses } from './activity-discovery.js';
/** The entry module supplies its URL so reports keep identifying the actual app build. */
export function createAppFeedback({ start, scriptURL }) {
  const $ = (selector) => document.querySelector(selector);
  let toastTimer;
  const dialogs = new Set();
  function showCodeError(element, input, error) {
    element.textContent = error.message;
    element.reportDiagnostics = codeDiagnostics(input, error, {
      pageURL: location.href,
      scriptURL: scriptURL,
      browser: navigator.userAgent,
    });
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = 'Copy error details';
    button.className = 'subtle code-diagnostics';
    button.onclick = () =>
      copy(
        JSON.stringify(
          codeDiagnostics(input, error, {
            pageURL: location.href,
            scriptURL: scriptURL,
            browser: navigator.userAgent,
          }),
          null,
          2,
        ),
      );
    element.append(' ', button);
    if (error.replacement) {
      const replacement = document.createElement('button');
      replacement.type = 'button';
      replacement.textContent = 'Choose a replacement set';
      replacement.onclick = async () => {
        try {
          const { type, focus } = error.replacement;
          await ensureBank(type);
          await start(
            choose(
              type,
              discoverableFocuses(focuses(type), type).includes(focus)
                ? focus
                : discoverableFocuses(focuses(type), type)[0],
            ),
          );
        } catch (e) {
          toast(e.message);
        }
      };
      element.append(' ', replacement);
    }
  }
  function toast(message) {
    $('#toast').textContent = message;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => ($('#toast').textContent = ''), 4500);
  }
  async function copy(value) {
    try {
      await navigator.clipboard.writeText(value);
      toast('Copied.');
    } catch {
      const dialog = document.createElement('dialog');
      dialog.innerHTML = /* HTML */ `<h2>Copy this code or link</h2>
        <input aria-label="Text to copy" value="${esc(value)}" style="width:100%" />
        <form method="dialog"><button>Close</button></form>`;
      document.body.append(dialog);
      dialogs.add(dialog);
      dialog.onclose = () => {
        dialogs.delete(dialog);
        dialog.remove();
      };
      showModal(dialog);
      dialog.querySelector('input').select();
    }
  }
  function download(content, name, type) {
    const url = URL.createObjectURL(new Blob([content], { type }));
    const link = document.createElement('a');
    link.href = url;
    link.download = name;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function clearToast() {
    clearTimeout(toastTimer);
    $('#toast').textContent = '';
  }
  return {
    toast,
    clearToast,
    copy,
    download,
    showCodeError,
    dispose() {
      clearToast();
      for (const dialog of dialogs) dialog.close();
    },
  };
}
