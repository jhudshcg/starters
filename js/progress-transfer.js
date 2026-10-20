/**
 * Purpose: Export transferable results and validate/merge backups before any profile activation.
 * Main contents: backupJSON and prepareBackup. Used by app and OneDrive controls.
 * Uses: existing progress validation, profile registry and bank identities. Libs: none.
 */
import {mergeCodeHistory} from './code-history.js';
import {bankRelease,CODE_FORMAT} from './bank-release.js';
import {profiles,loadProfile,nameMatch,normaliseName} from './profiles.js';
import {validLearnerId} from './progress-identity.js';
import {migrateStoredCodes,attemptEligibility,validatePartScores} from './progress.js';
import {validPracticeTime} from './practice-time.js';
import {recordedSet,historicalSet,ensureBank} from './bank.js';
export function backupJSON(data){
 return JSON.stringify({schema:1,codeFormat:CODE_FORMAT,lastSeenRelease:{...bankRelease},profileId:data.profileId,username:data.username,history:data.history,codeAttempts:data.codeAttempts??[],codeSummaries:data.codeSummaries??[],recentAttempts:data.recentAttempts??{},recentAttemptsGeneration:data.recentAttemptsGeneration??bankRelease.generation,archivedActive:data.archivedActive??[],archivedRecentAttempts:data.archivedRecentAttempts??[]},null,2);
}
/** Prepare all records in memory; the caller activates only after successful validation/review. */
export async function prepareBackup(raw,data){
 if(new TextEncoder().encode(raw).byteLength>5000000)throw Error('Backup is too large (maximum 5 MB).');
 const imported=JSON.parse(raw);
 if(!imported||typeof imported!=='object')throw Error('Unsupported backup format.');
 await Promise.all([0,1,2,3].map(ensureBank));
 if(imported.schema!==1||!Array.isArray(imported.history)||imported.history.length>10000)throw Error('Unsupported backup format.');
 if(imported.username!==undefined&&(typeof imported.username!=='string'||!normaliseName(imported.username)||normaliseName(imported.username).length>80))throw Error('Backup contains an invalid username. Nothing was imported.');
 const requested=imported.username===undefined?data.username:normaliseName(imported.username);
 if(!requested)throw Error('This older backup has no name. Enter your name first, then restore it from My progress.');
 const username=nameMatch(requested,profiles().names).exact??requested;
 const switching=username!==data.username;
 const target=switching?loadProfile(username):data;
 if(imported.profileId!==undefined&&!validLearnerId(imported.profileId))throw Error('Backup contains an invalid profile ID.');
 const owners=profiles().names.filter(name=>loadProfile(name).profileId===imported.profileId);
 if(imported.profileId && owners.some(name=>name!==username))throw Error('This profile ID is already used by another name. Restore a backup with its original profile name.');
 if(imported.profileId && target.profileId && target.profileId!==imported.profileId && (target.history.length || target.active))throw Error('This name belongs to a different profile. Choose a different local name before opening this file.');
 migrateStoredCodes(imported);
 let added=0,duplicate=0;let next=[...target.history];
 for(const r of imported.history){
   const set=recordedSet(r);
   if(typeof r.id!=='string'||r.id.length>100||r.type!==set.type||r.focus!==set.focus||r.max!==set.total||!Number.isFinite(r.finished)||!Number.isFinite(new Date(r.finished).getTime())||!Number.isFinite(r.seconds)||r.seconds<0||!Number.isInteger(r.earned)||r.earned<0||r.earned>r.max||r.percentage!==Math.round(r.earned/r.max*100)||!Number.isInteger(r.firstMax)||r.firstMax<0||r.firstMax>r.max||!Number.isInteger(r.firstEarned)||r.firstEarned<0||r.firstEarned>r.firstMax||!Number.isInteger(r.attemptChecks)||r.attemptChecks<0||typeof r.assisted!=='boolean'||!['submitted','expired'].includes(r.outcome))throw Error('Backup contains an invalid result. Nothing was imported.');
   if(!validPracticeTime(r))throw Error('Backup contains invalid practice time. Nothing was imported.');
   if(!validatePartScores(r,set))throw Error('Backup contains invalid part scores. Nothing was imported.');
   if(r.espReview!==undefined&&(!r.espReview||typeof r.espReview!=='object'||Array.isArray(r.espReview)||Object.entries(r.espReview).some(([slot,v])=>!set.entries.some(e=>String(e.slot)===slot)||!v||typeof v.text!=='string'||v.text.length>1200||!['Needs review','Self-reviewed','Teacher-reviewed'].includes(v.status))))throw Error('Backup contains invalid written reviews.');
   const old=next.find(a=>a.id===r.id);
   if(old){if(JSON.stringify(old)!==JSON.stringify(r))throw Error('A result conflicts with this browser’s history. Nothing was imported.');duplicate++;}else{next.push(r);added++;}
 }
 const recent={...target.recentAttempts};
 if(imported.recentAttempts!==undefined&&imported.recentAttemptsGeneration===bankRelease.generation){
   if(!imported.recentAttempts||typeof imported.recentAttempts!=='object'||Array.isArray(imported.recentAttempts)||Object.keys(imported.recentAttempts).length>10000)throw Error('Backup contains invalid practice dates.');
   for(const [code,at] of Object.entries(imported.recentAttempts)){
     const key=attemptEligibility({history:[]},historicalSet(code).code).key;
     if(!Number.isFinite(at)||at<0||!Number.isFinite(new Date(at).getTime()))throw Error('Backup contains an invalid practice date.');
     recent[key]=Math.max(recent[key]??0,at);
   }
 }
 const codeHistory=mergeCodeHistory(target,imported);
 const merged={...target,...codeHistory,profileId:imported.profileId??target.profileId??crypto.randomUUID(),history:next,recentAttempts:recent,recentAttemptsGeneration:bankRelease.generation};
 for(const key of ['archivedActive','archivedRecentAttempts'])if(Array.isArray(imported[key]))merged[key]=[...target[key]??[],...imported[key]];

 return {merged,added,duplicate,switching};
}
