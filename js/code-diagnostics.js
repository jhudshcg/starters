import {decode,parseQuestionCode,BANK_VERSION} from './codes.js';
// Diagnostic data deliberately omits answers, history, storage and URL queries.
export function codeDiagnostics(input,error,{pageURL,scriptURL,browser}={}) {
  const entered=String(input??'').slice(0,256);
  let decoded=null;
  try{decoded=parseQuestionCode(entered)??decode(entered);}catch{/* Keep malformed input available for diagnosis. */}
  const page=pageURL?new URL(pageURL):null;
  return {
    enteredCode:entered,characters:Array.from(entered).map(c=>`U+${c.codePointAt(0).toString(16).toUpperCase().padStart(4,'0')}`),
    error:String(error?.message??error),decoded,bankVersion:BANK_VERSION,
    build:scriptURL?new URL(scriptURL).pathname.split('/').pop():'unknown',
    page:page?`${page.origin}${page.pathname}`:null,browser:browser??null
  };
}
