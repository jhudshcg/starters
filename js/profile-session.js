/**
 * Purpose: Own the current profile and its persistence boundary.
 *
 * Main contents: profile choice, restoration, history snapshots and OneDrive coordination
 *
 * Used by: application, practice-controller and progress-page.
 * Uses: profiles, backup validation, practice clock and OneDrive.
 * Libs: none.
 */
import { esc } from './view-utils.js';
import {
  profiles,
  loadProfile,
  saveProfile,
  selectProfile,
  activateProfile,
  nameMatch,
  normaliseName,
} from './profiles.js';
import { createOneDrive } from './onedrive.js';
import { backupJSON, prepareBackup } from './progress-transfer.js';
import { progressFilename } from './progress-identity.js';
import { showModal } from './dialog.js';
import { settlePractice, pausePractice, engagePractice } from './practice-time.js';
import { lastTracked } from './weekly-progress.js';
import { historicalSet } from './bank.js';
import { bankRelease } from './bank-release.js';
import { loadStorage } from './progress.js';
/** Callbacks connect page changes without making this session depend on a renderer. */
export function createProfileSession({
  main,
  remember,
  onProfileChange,
  showProgress,
  goHome,
  render,
  practiceVisible,
  toast,
  download,
}) {
  const $ = (selector) => document.querySelector(selector);
  let data = { schema: 1, active: null, history: [] };
  let storageOK = true;
  let profileDialog = null;
  let disposed = false;
  const oneDrive = createOneDrive({
    current: () => data,
    saveLocal: (profile) => {
      try {
        saveProfile(profile);
      } catch (error) {
        storageError();
        throw error;
      }
    },
    restore: restoreProgress,
    notify: toast,
    download: () => download(backupJSON(data), progressFilename(data), 'application/json'),
  });
  async function restoreProgress(raw, review = false) {
    const { merged, added, duplicate, switching } = await prepareBackup(raw, data);
    if (
      review &&
      !confirm(
        `Open progress for ${merged.username}? Merge ${added} results; skip ${duplicate} duplicates. Existing browser results are retained.`,
      )
    )
      return false;
    data = activateProfile(merged);
    onProfileChange();
    profileHeader();
    const message = `${switching ? `Switched to ${data.username}, the profile named in this backup. ` : ''}${added} results restored; ${duplicate} duplicates skipped.`;
    if (location.hash === '#progress') {
      showProgress();
      const notice = document.createElement('p');
      notice.className = 'restore-notice';
      notice.setAttribute('role', 'status');
      notice.textContent = message;
      main.querySelector('.page-top').after(notice);
    }
    toast(message);
    return true;
  }
  function storageError() {
    storageOK = false;
    $('#storage-warning').hidden = false;
    $('#storage-warning').textContent =
      'Progress could not be saved on this browser. You can keep practising. Export a backup from My progress to keep your results.';
  }
  function load() {
    try {
      data = profiles().current ? loadProfile(profiles().current) : loadStorage();
      if (data.username && !data.profileId) data = activateProfile(data);
      if (data.active?.migratedCodeFrom) {
        if (location.hash === `#set=${encodeURIComponent(data.active.migratedCodeFrom)}`)
          history.replaceState(null, '', `#set=${encodeURIComponent(data.active.code)}`);
        delete data.active.migratedCodeFrom;
      }
      if (data.active) {
        try {
          historicalSet(data.active.code);
        } catch {
          data.active = null;
          saveProfile(data);
        }
      }
    } catch {
      storageError();
    }
  }
  function persist() {
    remember();
    if (data.active && !data.active.finished) settlePractice(data.active);
    try {
      saveProfile(data);
      oneDrive.changed(data);
    } catch {
      storageError();
    }
    if (data.username) profileHeader();
  }
  function profileHeader() {
    let el = $('#profile-welcome');
    if (!el) {
      el = document.createElement('div');
      el.id = 'profile-welcome';
      $('.site-header').append(el);
    }
    const last = lastTracked(data.history);
    el.innerHTML = `<span class="profile-greeting"><span>Welcome back ${esc(data.username ?? '')}</span> <button class="subtle" id="switch-profile">Not you?</button></span><small class="last-tracked">${last === null ? 'No tracked practice yet' : `Last tracked: ${esc(new Date(last).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' }))}`}</small>`;
    $('#switch-profile').onclick = () => chooseProfile(true);
  }
  function chooseProfile(switching = false) {
    if (data.active && !data.active.finished) {
      pausePractice(data.active);
      persist();
    }
    return new Promise((resolve) => {
      const dialog = document.createElement('dialog');
      profileDialog = dialog;
      dialog.setAttribute('aria-labelledby', 'profile-title');
      dialog.innerHTML = /* HTML */ `<h2 id="profile-title">Your progress profile</h2>
        <p>
          Enter your name to keep your progress on this computer. Use your synced OneDrive folder to
          keep progress between computers.
        </p>
        <button type="button" id="profile-open">Open progress file</button
        ><input type="file" id="profile-backup" accept=".json,.txt" hidden />
        <form>
          <label for="profile-name">Your name</label
          ><input id="profile-name" name="username" maxlength="80" required autocomplete="name" />
          <p id="profile-message" role="status"></p>
          <div class="actions">
            <button class="primary" type="submit">Continue</button>${switching
              ? '<button type="button" id="profile-cancel">Cancel</button>'
              : ''}
          </div>
        </form>`;
      document.body.append(dialog);
      showModal(dialog);
      dialog.oncancel = (e) => {
        if (!switching) e.preventDefault();
      };
      dialog.onclose = () => {
        dialog.remove();
        profileDialog = null;
        if (!disposed && practiceVisible()) engagePractice(data.active);
        resolve();
      };
      dialog.querySelector('#profile-cancel')?.addEventListener('click', () => dialog.close());
      dialog.querySelector('#profile-open').onclick = () =>
        dialog.querySelector('#profile-backup').click();
      dialog.querySelector('#profile-backup').onchange = async (event) => {
        try {
          const file = event.target.files[0];
          if (!file) return;
          if (file.size > 5000000) throw Error('Backup is too large (maximum 5 MB).');
          if (await restoreProgress(await file.text(), true)) {
            dialog.close();
            render();
          }
        } catch (error) {
          dialog.querySelector('#profile-message').textContent = error.message;
        }
      };
      const finish = (name) => {
        try {
          persist();
          void oneDrive.flush(data);
          data = selectProfile(name);
        } catch {
          storageError();
          data = { schema: 1, active: null, history: [], username: name };
        }
        onProfileChange();
        profileHeader();
        dialog.close();
        if (switching) {
          main.innerHTML = '';
          void goHome();
        }
      };
      dialog.querySelector('form').onsubmit = (e) => {
        e.preventDefault();
        const name = normaliseName(dialog.querySelector('#profile-name').value);
        if (!name) return;
        let names = [];
        try {
          names = profiles().names;
        } catch {
          storageError();
        }
        const match = nameMatch(name, names);
        if (match.suggestion) {
          const message = dialog.querySelector('#profile-message');
          message.innerHTML = `Did you mean <strong>${esc(match.suggestion)}</strong>? <button type="button" id="use-match">Yes, use this profile</button> <button type="button" id="use-entered">No, use ${esc(name)}</button>`;
          message.querySelector('#use-match').onclick = () => finish(match.suggestion);
          message.querySelector('#use-entered').onclick = () => finish(name);
        } else finish(match.exact ?? name);
      };
    });
  }

  /** Restore history snapshots only within the active profile and bank generation. */
  function restoreAttempt(state) {
    const saved = state?.profileId === data.profileId ? state.attempt : null;
    if (saved && saved.generation === bankRelease.generation && saved.id !== data.active?.id) {
      data.active = saved;
      if (saved.practiceClock) {
        saved.practiceClock.running = false;
        saved.practiceClock.interacted = false;
      }
      persist();
    }
  }
  async function initialise() {
    if (!data.username) await chooseProfile();
    else profileHeader();
  }

  return {
    get data() {
      return data;
    },
    get storageOK() {
      return storageOK;
    },
    oneDrive,
    load,
    initialise,
    persist,
    restore: restoreProgress,
    restoreAttempt,
    dispose() {
      disposed = true;
      profileDialog?.close();
      document.querySelector('#profile-welcome')?.remove();
    },
  };
}
