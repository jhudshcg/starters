/**
 * Purpose: Keep a per-learner file link outside exported progress, and protect explicit file saves.
 * Used by: ProgressTransfer; browser file access is always initiated by a user gesture.
 * Uses: IndexedDB and File System Access, with no cloud credentials or automatic merging.
 */
import {progressFilename} from './progress-identity.js';

const limit = 5000000;
export async function readProgressFile(handle) {
  const file = await handle.getFile();
  if (file.size > limit) throw Error('Choose a progress file smaller than 5 MB.');
  const raw = await file.text();
  return { raw, fingerprint: await fingerprint(raw) };
}
async function fingerprint(raw) {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(raw));
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, '0')).join('');
}
/** Ignore export bookkeeping, and object key order, when detecting actual progress changes. */
export async function progressContentFingerprint(raw) {
  let value;
  try {
    value = JSON.parse(raw);
  } catch {
    return null;
  }
  if (value?.schema !== 1 || !Array.isArray(value.history)) return null;
  const { exportedAt, backup, progressUpdatedAt, ...content } = value;
  const ordered = (item) =>
    Array.isArray(item)
      ? item.map(ordered)
      : item && typeof item === 'object'
        ? Object.fromEntries(
            Object.keys(item)
              .sort()
              .map((key) => [key, ordered(item[key])]),
          )
        : item;
  return fingerprint(JSON.stringify(ordered(content)));
}
/** Re-read before every write; an external edit requires a fresh, reviewed import. */
export async function saveProgressFile(link, raw, { interactive = true } = {}) {
  if (new TextEncoder().encode(raw).byteLength > limit)
    throw Error('Progress exceeds the 5 MB import limit. Export a separate backup instead.');
  if (!interactive) {
    if ((await link.handle.queryPermission?.({ mode: 'readwrite' })) !== 'granted')
      throw Error(
        'Automatic saving needs file access. Use Save to OneDrive on Progress to allow access again.',
      );
  } else if (
    link.handle.requestPermission &&
    (await link.handle.requestPermission({ mode: 'readwrite' })) !== 'granted'
  )
    throw Error('File access was not granted. Choose your progress file again.');
  const current = await readProgressFile(link.handle);
  if (current.fingerprint !== link.fingerprint)
    throw Error('This file has changed. Open it and review the latest progress before saving.');
  const writable = await link.handle.createWritable();
  try {
    await writable.write(raw);
    await writable.close();
  } catch (error) {
    await writable.abort().catch(() => {});
    throw error;
  }
  const saved = await readProgressFile(link.handle);
  if (saved.raw !== raw)
    throw Error(
      'The saved file could not be verified. Keep this tab open and export a separate JSON backup from Progress.',
    );
  return {
    handle: link.handle,
    fingerprint: saved.fingerprint,
    contentFingerprint: await progressContentFingerprint(raw),
  };
}

/** Serialize remembered-link transactions, including across tabs/routes on this origin. */
export function withProgressFileLock(profile, action) {
  return navigator.locks
    ? navigator.locks.request(`tlevel-progress-file:${profile.profileId}`, action)
    : action();
}
/** IndexedDB can retain native handles, unlike localStorage. No permission prompt on load. */
export async function progressFileLink(key, value) {
  const database = await new Promise((resolve, reject) => {
    const request = indexedDB.open('tlevel-progress-files', 1);
    request.onupgradeneeded = () => request.result.createObjectStore('links');
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
  try {
    return await new Promise((resolve, reject) => {
      const transaction = database.transaction(
        'links',
        value === undefined ? 'readonly' : 'readwrite',
      );
      const store = transaction.objectStore('links');
      const request =
        value === undefined
          ? store.get(key)
          : value === null
            ? store.delete(key)
            : store.put(
                {
                  handle: value.handle,
                  fingerprint: value.fingerprint,
                  contentFingerprint: value.contentFingerprint,
                },
                key,
              );
      transaction.oncomplete = () => resolve(request.result ?? null);
      transaction.onerror = () => reject(transaction.error);
      transaction.onabort = () => reject(transaction.error);
    });
  } finally {
    database.close();
  }
}

/** User picks the synced OneDrive root; reuse T-Level/DSD T-Level, or create T-Level inside that granted directory only. */
export async function chooseProgressFile(profile, picker = window) {
  if (picker.showDirectoryPicker) {
    let root;
    try {
      root = await picker.showDirectoryPicker({ id: 'tlevel-progress', mode: 'readwrite' });
    } catch (error) {
      throw Error(
        'Folder access was not granted. The folder chooser may have been cancelled, or this browser may not support granting access. Download a JSON backup before trying the site in a normal Chrome or Edge window.',
        { cause: error },
      );
    }
    try {
      let folder = ['t-level','dsd t-level'].includes(root.name.toLowerCase()) ? root : null;
      if(!folder) for(const name of ['T-Level','DSD T-Level']){
        try{folder=await root.getDirectoryHandle(name);break;}
        catch(error){if(error.name!=='NotFoundError')throw error;}
      }
      folder??=await root.getDirectoryHandle('T-Level',{create:true});
      return await folder.getFileHandle(progressFilename(profile), { create: true });
    } catch (error) {
      // An AbortError after selection is a file-operation failure, not picker cancellation.
      throw Error(
        `Could not create the progress file in ${root.name}/T-Level: ${error.message || error.name}. Your current progress remains available in this tab. Try choosing the folder again, or export JSON from Progress.`,
        { cause: error },
      );
    }
  }
  return picker.showSaveFilePicker({
    id: 'tlevel-progress',
    suggestedName: progressFilename(profile),
    types: [{ description: 'T-Level progress', accept: { 'application/json': ['.json'] } }],
  });
}
/** File links are local browser capabilities, keyed only by the portable profile UUID. */
export function learnerFileLink(profile,value){return progressFileLink(profile.profileId,value);}
