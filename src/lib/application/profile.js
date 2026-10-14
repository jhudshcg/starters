/**
 * Purpose: Own the active profile and persistence independently of rendered controls.
 * Main contents: selection, backup restoration, snapshots and file saves.
 * Used by: application session. Uses: existing profile, progress and file adapters.
 * Libs: none.
 */
import {
  profiles,
  loadProfile,
  saveProfile,
  selectProfile,
  activateProfile,
  nameMatch,
  normaliseName,
} from '#domain/profiles.js';
import { createOneDrive } from '#domain/onedrive.js';
import { backupJSON, prepareBackup } from '#domain/progress-transfer.js';
import { progressFilename } from '#domain/progress-identity.js';
import { settlePractice, pausePractice } from '#domain/practice-time.js';
import { historicalSet } from '#domain/bank.js';
import { bankRelease } from '#domain/bank-release.js';
import { loadStorage } from '#domain/progress.js';

export function createProfile({ changed, remember, notify, download, confirm, onRestore }) {
  let data = { schema: 1, active: null, history: [] },
    storageOK = true;
  function storageError() {
    storageOK = false;
    changed();
  }
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
    restore,
    notify,
    confirm,
    onStatus: changed,
    download: () => download(backupJSON(data), progressFilename(data), 'application/json'),
  });
  function load() {
    try {
      const registry = profiles();
      data = registry.current ? loadProfile(registry.current) : loadStorage();
      if (data.username && !data.profileId) data = activateProfile(data);
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
    if (data.active && !data.active.finished) settlePractice(data.active);
    try {
      saveProfile(data);
      oneDrive.changed(data);
    } catch {
      storageError();
    }
    remember();
    changed();
  }
  /** Return a suggestion without switching; explicit confirmation retains canonical name rules. */
  function chooseName(raw, confirmed = false) {
    const name = normaliseName(raw);
    if (!name) throw Error('Enter your name to continue.');
    let names = [];
    try {
      names = profiles().names;
    } catch {
      storageError();
    }
    const match = nameMatch(name, names);
    if (match.suggestion && !confirmed) return { suggestion: match.suggestion, entered: name };
    if (data.active && !data.active.finished) pausePractice(data.active);
    persist();
    void oneDrive.flush(data);
    try {
      data = selectProfile(match.exact ?? name);
    } catch {
      storageError();
      data = { schema: 1, active: null, history: [], username: name };
    }
    changed();
    return { profile: data };
  }
  async function restore(raw, review = false) {
    const { merged, added, duplicate, switching } = await prepareBackup(raw, data);
    if (
      review &&
      !(await confirm(
        `Open progress for ${merged.username}?`,
        `Merge ${added} results; skip ${duplicate} duplicates. Existing browser results are retained.`,
        'Open progress',
      ))
    )
      return false;
    data = activateProfile(merged);
    const message = `${switching ? `Switched to ${data.username}, the profile named in this backup. ` : ''}${added} results restored; ${duplicate} duplicates skipped.`;
    onRestore(message);
    changed();
    notify(message);
    return true;
  }
  function restoreAttempt(state) {
    const saved = state?.profileId === data.profileId ? state.attempt : null;
    if (saved && saved.generation === bankRelease.generation && saved.id !== data.active?.id) {
      data.active = structuredClone(saved);
      if (data.active.practiceClock) {
        data.active.practiceClock.running = false;
        data.active.practiceClock.interacted = false;
      }
      persist();
    }
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
    persist,
    chooseName,
    restore,
    restoreAttempt,
  };
}
