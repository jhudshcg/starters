import {bankRelease} from './bank-release.js';
import {BANK_VERSION} from './code-compatibility.js';
export {BANK_VERSION};
// 54-bit payload: 6 version, 3 bank, three (12 slot + 3 variation) pairs.
// Generation zero retains published versions <=18 in their original 7+2 layout.
// Legacy 48-bit untimed codes remain readable; nine characters now always mean54 bits.
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
export const UNUSED = 4095;
const integer = (n, max) => Number.isInteger(n) && n >= 0 && n <= max;

export function encode({version = BANK_VERSION, type, entries, minutes = null}, {generation=bankRelease.generation}={}) {
  if (!integer(version, 63) || !integer(type, 7) || !Array.isArray(entries) || entries.length < 1 || entries.length > 3) throw Error('Invalid code fields.');
  if (new Set(entries.map(e => e.slot)).size !== entries.length) throw Error('A question cannot appear twice.');
  const legacy=generation===0&&version<bankRelease.firstEightBankVersion;
  if(legacy&&type>3)throw Error('Banks 4–7 require the eight-bank code format.');
  let payload = (BigInt(version) << (legacy?2n:3n)) | BigInt(type);
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

function unpackFields(code, width, minutes=null, bankBits=null) {
  let value=0n;
  for(const c of code)value=(value<<6n)|BigInt(alphabet.indexOf(c));
  const unusedSlot=(1<<width)-1,mask=BigInt(unusedSlot),pairs=[];
  for(let i=0;i<3;i++){
    pairs.unshift({slot:Number((value>>3n)&mask),variation:Number(value&7n)});
    value>>=BigInt(width+3);
  }
  const bits=BigInt(bankBits??(width===10||bankRelease.generation===0&&value<=BigInt(bankRelease.legacyMaxVersion*4+3)?2:3));
  const type=Number(value&((1n<<bits)-1n)),version=Number(value>>bits),entries=[];
  if(bankBits===null&&width===12&&bankRelease.generation===0&&bits===3n&&version<bankRelease.firstEightBankVersion)throw Error('Unpublished code format/version.');
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
  return `${['PZ','EX','PY','ESP','OS','B5','B6','B7'][type]}-${version}-${slot}-${variation}`;
}
export function parseQuestionCode(code) {
  const match = /^(PZ|EX|PY|ESP|OS|B5|B6|B7)-(\d+)-(\d+)-(\d+)$/.exec(code.trim());
  if (!match) return null;
  return {version: Number(match[2]), type: ['PZ','EX','PY','ESP','OS','B5','B6','B7'].indexOf(match[1]), entries: [{slot: Number(match[3]), variation: Number(match[4])}], minutes: null};
}

// Known historical records carry generation, so their layout does not depend on
// the currently served generation. Generation-zero versions <=18 used 7+2.
export function decodeRecordedCode(raw,generation){
  const code=String(raw).trim();
  if(/^[A-Za-z0-9_-]{8}$/.test(code))return unpackFields(code,10,null,2);
  if(!/^[A-Za-z0-9_-]{9}([5-9A-F])?$/.test(code))throw Error('Invalid recorded code.');
  let header=0n;for(const c of code.slice(0,2))header=(header<<6n)|BigInt(alphabet.indexOf(c));
  header>>=3n;
  const bits=generation===0&&header<=BigInt(bankRelease.legacyMaxVersion*4+3)?2:3;
  return unpackFields(code.slice(0,9),12,code.length===10?parseInt(code[9],16):null,bits);
}
