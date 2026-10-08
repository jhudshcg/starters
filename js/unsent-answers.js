/** Parent navigation policy; puzzle-specific work detection belongs to the package. */
import {hasAnswer} from '../packages/puzzles/state.js';
export function hasUnsubmittedAnswers(attempt,set){
 if(!attempt||attempt.finished||!set)return false;
 return set.questions.some(q=>String(attempt.answers?.[q.slot]?.reflection??'').trim().length>0||q.parts.some(p=>hasAnswer(p,attempt.answers?.[q.slot]?.[p.id])));
}
