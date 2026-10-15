/**
 * Purpose: Give one tab exclusive editing ownership of a local profile.
 * Main contents: acquireProfileLock and its release handle.
 * Used by: profile session. Uses: normalised profile names. Libs: browser Web Locks.
 */
export function acquireProfileLock(name, locks = globalThis.navigator?.locks) {
  if (!locks) {
    return Promise.reject(
      new Error(
        'This browser cannot protect progress across tabs. Open this site over HTTPS in an up-to-date browser.',
      ),
    );
  }
  const key = name ? `named:${name.toLocaleLowerCase()}` : 'unnamed';
  return new Promise((resolve, reject) => {
    const request = locks.request(`tlevel-profile:${key}`, { ifAvailable: true }, (lock) => {
      if (!lock) {
        reject(
          new Error(
            `${name || 'Practice'} is already open in another tab. Close that tab, then try again here.`,
          ),
        );
        return;
      }
      // The browser releases the lock automatically if this document closes or crashes.
      return new Promise((finish) =>
        resolve({
          name,
          release() {
            finish();
            return request;
          },
        }),
      );
    });
    void request.catch(reject);
  });
}
