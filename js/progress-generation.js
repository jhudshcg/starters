import {bankRelease} from './bank-release.js';
export function generationOf(record,release=bankRelease){
  if(Number.isSafeInteger(record.generation)&&record.generation>=0)return record.generation;
  if(record.generation!==undefined)return null;
  return release.generation===0?0:null;
}
export function generationLabel(record,release=bankRelease){
  const generation=generationOf(record,release);
  if(generation===release.generation)return '';
  if(generation!==null)return `Generation ${generation}${generation>release.generation?' · newer bank release':' · historical'}`;
  const at=record.started??record.finished,rollover=Date.parse(release.latestRolloverAt);
  return Number.isFinite(at)&&Number.isFinite(rollover)&&at<rollover?'Before the latest rollover':'Generation unknown';
}
export function sameGeneration(record,release=bankRelease){return generationOf(record,release)===release.generation;}
