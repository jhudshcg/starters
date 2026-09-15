import {unzlibSync, strFromU8} from 'fflate';
import {rotatePayload,PAYLOAD_ROTATION} from './payload-alphabet.js';

// Obfuscation only: the browser necessarily has the decoder. Never use eval.
export function unpack(payload) {
  try {
    const bytes=Uint8Array.from(atob(rotatePayload(payload,-PAYLOAD_ROTATION)),c=>c.charCodeAt(0));
    const envelope=JSON.parse(strFromU8(unzlibSync(bytes)));
    if(envelope.format!==1)throw Error('Unsupported format');
    return envelope.data;
  } catch {
    throw Error('Question data could not be decoded. Reload the page to get the current build.');
  }
}

// Temporary copies only. Never attach decoded answers to the public bank or storage.
export const markingPart=part=>part.checkData?{...part,...unpack(part.checkData)}:part;
export const revealPart=part=>part.revealData?{...part,...unpack(part.revealData)}:part;
export const playTree=part=>part.playData?unpack(part.playData):part.tree;
