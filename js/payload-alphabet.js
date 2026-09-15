// Deliberately simple obfuscation, not encryption. Set-code encoding is separate.
const alphabet='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
export const PAYLOAD_ROTATION=17;
export function rotatePayload(text,offset) {
  return [...text].map(char=>{
    if(char==='=')return char;
    const index=alphabet.indexOf(char);
    if(index<0)throw Error('Invalid encoded payload character');
    return alphabet[(index+offset+64)%64];
  }).join('');
}
