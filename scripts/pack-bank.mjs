import {zlibSync, strToU8} from 'fflate';
import {rotatePayload,PAYLOAD_ROTATION} from '../js/payload-alphabet.js';
export function pack(data) {
  return rotatePayload(Buffer.from(zlibSync(strToU8(JSON.stringify({format:1,data})),{level:9})).toString('base64'),PAYLOAD_ROTATION);
}
export function packBank(bank) {
  return bank.map(q=>({...q,variations:q.variations.map(v=>({...v,parts:v.parts.map(part=>{
    const {answer,accepted,typos,explanation,solutionText,tree,...visible}=part;
    return {...visible,
      checkData:pack({answer,accepted,typos}),
      revealData:pack({answer,explanation,solutionText}),
      ...(tree?{playData:pack(tree)}:{})};
  })}))}));
}
