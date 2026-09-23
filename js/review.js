import {REATTEMPT_HOURS} from './progress.js';
export function hasRecentSubmission(active, now=Date.now()) {
  const submitted=active?.reviewSubmittedAt??active?.finished;
  return Number.isFinite(submitted)&&submitted>0&&now>=submitted&&now-submitted<REATTEMPT_HOURS*3600000;
}
