// Version 1 format: 7 version bits, 2 type bits, three (10 slot + 3 variation) pairs.
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
export const UNUSED = 1023;
const integer = (n, max) => Number.isInteger(n) && n >= 0 && n <= max;

export function encode({version = 1, type, entries, minutes = null}) {
  if (!integer(version, 127) || !integer(type, 2) || !Array.isArray(entries) || entries.length < 1 || entries.length > 3) throw Error('Invalid code fields.');
  if (new Set(entries.map(e => e.slot)).size !== entries.length) throw Error('A question cannot appear twice.');
  let payload = (BigInt(version) << 2n) | BigInt(type);
  for (let i = 0; i < 3; i++) {
    const e = entries[i] ?? {slot: UNUSED, variation: 0};
    if (!integer(e.slot, entries[i] ? 1022 : 1023) || !integer(e.variation, 7)) throw Error('Invalid question or variation.');
    payload = (payload << 13n) | (BigInt(e.slot) << 3n) | BigInt(e.variation);
  }
  let result = '';
  for (let shift = 42n; shift >= 0n; shift -= 6n) result += alphabet[Number((payload >> shift) & 63n)];
  if (minutes !== null) {
    if (!Number.isInteger(minutes) || minutes < 5 || minutes > 15) throw Error('Choose 5–15 minutes.');
    result += minutes.toString(16).toUpperCase();
  }
  return result;
}

export function decode(raw) {
  const code = String(raw).trim();
  if (!/^[A-Za-z0-9_-]{8}([5-9A-F])?$/.test(code)) throw Error('Enter an 8-character code, or 9 characters with a timer. Capitals matter.');
  let value = 0n;
  for (const c of code.slice(0, 8)) value = (value << 6n) | BigInt(alphabet.indexOf(c));
  const pairs = [];
  for (let i = 0; i < 3; i++) {
    pairs.unshift({slot: Number((value >> 3n) & 1023n), variation: Number(value & 7n)});
    value >>= 13n;
  }
  const type = Number(value & 3n), version = Number(value >> 2n);
  let unused = false;
  const entries = [];
  for (const p of pairs) {
    if (p.slot === UNUSED) { if (p.variation !== 0) throw Error('Invalid unused question.'); unused = true; }
    else { if (unused) throw Error('Invalid question order.'); entries.push(p); }
  }
  if (!entries.length || type === 3 || new Set(entries.map(e => e.slot)).size !== entries.length) throw Error('This code has invalid question fields.');
  return {version, type, entries, minutes: code.length === 9 ? parseInt(code[8], 16) : null};
}

export function questionCode(type, slot, variation) {
  return `${['PZ','EX','PY'][type]}-1-${slot}-${variation}`;
}
export function parseQuestionCode(code) {
  const match = /^(PZ|EX|PY)-(\d+)-(\d+)-(\d+)$/.exec(code.trim());
  if (!match) return null;
  return {version: Number(match[2]), type: ['PZ','EX','PY'].indexOf(match[1]), entries: [{slot: Number(match[3]), variation: Number(match[4])}], minutes: null};
}
