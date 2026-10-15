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
import { acquireProfileLock } from './profile-lock.js';

export function createProfile({ changed, remember, notify, download, confirm, onRestore }) {
  let data = { schema: 1, active: null, history: [] },
    storageOK = true,
    blocked = '',
    lease = null,
    disposed = false,
    changing = false,
    requestedName;
  function saveLocal(profile) {
    if (!lease || lease.name !== (profile.username ?? null))
      throw Error('This tab does not own the profile. Reload before continuing.');
    saveProfile(profile);
  }
  function storageError() {
    storageOK = false;
    changed();
  }
  const oneDrive = createOneDrive({
    current: () => data,
    saveLocal: (profile) => {
      try {
        saveLocal(profile);
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
  async function load() {
    try {
      // Retry the profile this tab requested, even if another tab has since switched names.
      if (requestedName === undefined) requestedName = profiles().current ?? null;
      lease = await acquireProfileLock(requestedName);
      if (disposed) {
        await lease.release();
        lease = null;
        return false;
      }
      data = requestedName ? loadProfile(requestedName) : loadStorage();
      if (data.username && !data.profileId) data = activateProfile(data);
      if (data.active) {
        try {
          historicalSet(data.active.code);
        } catch {
          data.active = null;
          saveLocal(data);
        }
      }
      blocked = '';
      return true;
    } catch (error) {
      await lease?.release();
      lease = null;
      blocked = error.message;
      changed();
      return false;
    }
  }
  function persist() {
    if (!lease || disposed) return;
    if (data.active && !data.active.finished) settlePractice(data.active);
    try {
      saveLocal(data);
      oneDrive.changed(data);
    } catch {
      storageError();
    }
    remember();
    changed();
  }
  /** Return a suggestion without switching; explicit confirmation retains canonical name rules. */
  async function chooseName(raw, confirmed = false) {
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
    await changeProfile(match.exact ?? name, () => selectProfile(match.exact ?? name));
    changed();
    return { profile: data };
  }
  async function restore(raw, review = false) {
    let prepared = await prepareBackup(raw, data);
    const { merged, added, duplicate } = prepared;
    if (
      review &&
      !(await confirm(
        `Open progress for ${merged.username}?`,
        `Merge ${added} results; skip ${duplicate} duplicates. Existing browser results are retained.`,
        'Open progress',
      ))
    )
      return false;
    await changeProfile(merged.username, async () => {
      // A target profile may have changed while its backup was being reviewed.
      prepared = await prepareBackup(raw, data);
      if (disposed) throw Error('This profile session has closed.');
      return activateProfile(prepared.merged);
    });
    const message = `${prepared.switching ? `Switched to ${data.username}, the profile named in this backup. ` : ''}${prepared.added} results restored; ${prepared.duplicate} duplicates skipped.`;
    onRestore(message);
    changed();
    notify(message);
    return true;
  }
  /** Acquire the destination before switching; drain outgoing file saves before releasing it. */
  async function changeProfile(name, read) {
    if (changing || disposed)
      throw Error('A profile change is already in progress. Try again shortly.');
    changing = true;
    let next;
    try {
      next = lease?.name === name ? lease : await acquireProfileLock(name);
      await oneDrive.dispose();
      if (disposed) throw Error('This profile session has closed.');
      const selected = await read();
      if (disposed) throw Error('This profile session has closed.');
      if (lease !== next) await lease?.release();
      lease = next;
      data = selected;
    } catch (error) {
      if (next !== lease) await next?.release();
      throw error;
    } finally {
      changing = false;
    }
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
    get blocked() {
      return blocked;
    },
    oneDrive,
    load,
    persist,
    chooseName,
    restore,
    restoreAttempt,
    async dispose() {
      disposed = true;
      if (lease) await oneDrive.dispose();
      await lease?.release();
      lease = null;
    },
  };
}
