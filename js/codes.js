import {BANK_VERSION} from './code-compatibility.js';
export {BANK_VERSION};
// 54-bit set payload: 7 version, 2 type, three (12 slot + 3 variation) pairs.
// Legacy 48-bit untimed codes remain readable; nine characters now always mean54 bits.
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
export const UNUSED = 4095;
const integer = (n, max) => Number.isInteger(n) && n >= 0 && n <= max;

export function encode({version = BANK_VERSION, type, entries, minutes = null}) {
  if (!integer(version, 127) || !integer(type, 3) || !Array.isArray(entries) || entries.length < 1 || entries.length > 3) throw Error('Invalid code fields.');
  if (new Set(entries.map(e => e.slot)).size !== entries.length) throw Error('A question cannot appear twice.');
  let payload = (BigInt(version) << 2n) | BigInt(type);
  for (let i = 0; i < 3; i++) {
    const e = entries[i] ?? {slot: UNUSED, variation: 0};
    if (!integer(e.slot, entries[i] ? 4094 : 4095) || !integer(e.variation, 7)) throw Error('Invalid question or variation.');
    payload = (payload << 15n) | (BigInt(e.slot) << 3n) | BigInt(e.variation);
  }
  let result = '';
  for (let shift = 48n; shift >= 0n; shift -= 6n) result += alphabet[Number((payload >> shift) & 63n)];
  if (minutes !== null) {
    if (!Number.isInteger(minutes) || minutes < 5 || minutes > 15) throw Error('Choose 5–15 minutes.');
    result += minutes.toString(16).toUpperCase();
  }
  return result;
}

function unpackFields(code, width, minutes=null) {
  let value=0n;
  for(const c of code)value=(value<<6n)|BigInt(alphabet.indexOf(c));
  const unusedSlot=(1<<width)-1,mask=BigInt(unusedSlot),pairs=[];
  for(let i=0;i<3;i++){
    pairs.unshift({slot:Number((value>>3n)&mask),variation:Number(value&7n)});
    value>>=BigInt(width+3);
  }
  const type=Number(value&3n),version=Number(value>>2n),entries=[];
  let unused=false;
  for(const p of pairs){
    if(p.slot===unusedSlot){if(p.variation!==0)throw Error('Invalid unused question.');unused=true;}
    else {if(unused)throw Error('Invalid question order.');entries.push(p);}
  }
  if(!entries.length||new Set(entries.map(e=>e.slot)).size!==entries.length)throw Error('This code has invalid question fields.');
  return {version,type,entries,minutes};
}
export function decode(raw) {
  const code=String(raw).trim();
  if(/^[A-Za-z0-9_-]{8}$/.test(code))return unpackFields(code,10);
  if(!/^[A-Za-z0-9_-]{9}([5-9A-F])?$/.test(code))throw Error('Enter a 9-character set code, or 10 characters with a timer. Capitals matter. Older 8-character untimed codes also work.');
  return unpackFields(code.slice(0,9),12,code.length===10?parseInt(code[9],16):null);
}
// Only for migrating explicitly old saved data/backups, never for pasted codes.
export function decodeLegacyCode(raw) {
  const code=String(raw).trim();
  if(!/^[A-Za-z0-9_-]{8}([5-9A-F])?$/.test(code))throw Error('Invalid legacy saved code.');
  return unpackFields(code.slice(0,8),10,code.length===9?parseInt(code[8],16):null);
}

export function questionCode(type, slot, variation, version = BANK_VERSION) {
  return `${['PZ','EX','PY','ESP'][type]}-${version}-${slot}-${variation}`;
}
export function parseQuestionCode(code) {
  const match = /^(PZ|EX|PY|ESP)-(\d+)-(\d+)-(\d+)$/.exec(code.trim());
  if (!match) return null;
  return {version: Number(match[2]), type: ['PZ','EX','PY','ESP'].indexOf(match[1]), entries: [{slot: Number(match[3]), variation: Number(match[4])}], minutes: null};
}
