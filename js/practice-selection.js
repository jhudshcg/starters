/**
 * Purpose: Recall each profile's practice choices for two hours after use.
 * Main contents: selection snapshots and expiry. Used by: app and tests.
 * Uses: profile data and resolved sets. Libs: none.
 */
export const FOCUS_RECALL_MS=2*60*60*1000;
/** Save focus and subsection without coupling recall to browser-history entries. */
export function rememberSelection(data,set,now=Date.now()){
  data.practiceSelections??={};
  data.practiceSelections[set.type]={focus:set.focus,code:set.code,at:now,
    subtopic:data.active?.examSubtopic??'all',recipe:set.questions[0]?.recipe??null,
    challenge:data.puzzleChallenge??'all',inSequence:Boolean(data.active?.inSequence)};
}
/** Return a valid recent choice; the caller checks it against available focuses. */
export function recalledSelection(data,type,now=Date.now()){
  const choice=data.practiceSelections?.[type];
  return choice&&Number.isFinite(choice.at)&&now>=choice.at&&now-choice.at<FOCUS_RECALL_MS?choice:null;
}
