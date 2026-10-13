/** Portable profile UUID validation and hashed backup filenames. Used by profiles and file transfer; no dependencies. */
export const validLearnerId = (value) =>
  typeof value === 'string' &&
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
/** Compact FNV-1a filename tag only; the full UUID remains the identity in saved data. */
function learnerFileTag(id) {
  let hash = 0xcbf29ce484222325n;
  for (const character of id.toLowerCase())
    hash = BigInt.asUintN(64, (hash ^ BigInt(character.charCodeAt(0))) * 0x100000001b3n);
  return hash.toString(36).padStart(12, '0').slice(-12);
}
/** A portable filename, safe on Windows/macOS, with identity independent of the display name. */
export function progressFilename(profile, extension = 'json') {
  const name =
    profile.username
      .normalize('NFKC')
      .toLowerCase()
      .replace(/[^\p{L}\p{N}_-]+/gu, '_')
      .replace(/^_+|_+$/g, '')
      .slice(0, 40) || 'learner';
  return `practice_progress_${name}${profile.profileId ? `_${learnerFileTag(profile.profileId)}` : ''}.${extension}`;
}
