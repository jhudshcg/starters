export const IDLE_MS=120000;
export const INTERACTION_POLL_MS=5000;
export function initialisePractice(attempt,now=Date.now()){
  attempt.practiceClock??={milliseconds:0,measuredFrom:now,accountedAt:now,running:false};
  const clock=attempt.practiceClock;
  clock.expiresAt??=(clock.lastActivity??now)+IDLE_MS;
  clock.interacted??=false;
  return clock;
}
export function settlePractice(attempt,now=Date.now()){
  if(!attempt.practiceClock)return;
  const clock=initialisePractice(attempt,now);
  const end=Math.min(now,attempt.deadline??now,clock.expiresAt);
  if(clock.running)clock.milliseconds+=Math.max(0,end-clock.accountedAt);
  clock.accountedAt=Math.max(clock.accountedAt,now);
  if(now>=Math.min(clock.expiresAt,attempt.deadline??Infinity))clock.running=false;
}
// Explicit display/resume starts a fresh inactivity window, without charging absence.
export function engagePractice(attempt,now=Date.now()){
  if(attempt.finished)return;
  const clock=initialisePractice(attempt,now);settlePractice(attempt,now);
  clock.accountedAt=now;clock.expiresAt=now+IDLE_MS;clock.interacted=false;clock.running=true;
}
// Hot path: repeated mouse events only set a flag. No timer creation or clock settlement.
export function notePracticeInteraction(attempt,now){
  if(attempt.finished)return;
  const clock=attempt.practiceClock;
  if(clock?.running&&clock.interacted)return;
  now??=Date.now();
  if(!clock?.running||now>=clock.expiresAt)engagePractice(attempt,now);
  attempt.practiceClock.interacted=true;
  attempt.saved=now;
}
export function pollPractice(attempt,now=Date.now()){
  if(attempt.finished||!attempt.practiceClock)return;
  const clock=initialisePractice(attempt,now),interacted=clock.interacted;
  // Settle against the old expiry first: delayed callbacks cannot charge a long idle gap.
  settlePractice(attempt,now);
  if(interacted&&now<(attempt.deadline??Infinity)){
    clock.expiresAt=now+IDLE_MS;clock.running=true;
  }
  clock.interacted=false;
}
export function pausePractice(attempt,now=Date.now()){
  settlePractice(attempt,now);
  if(attempt.practiceClock){attempt.practiceClock.running=false;attempt.practiceClock.interacted=false;}
}
export const practiceSeconds=record=>record.engagedSeconds??record.seconds;
export function validPracticeTime(record){
  if(record.engagedSeconds===undefined&&record.practiceMeasuredFrom===undefined)return true;
  return Number.isInteger(record.engagedSeconds)&&record.engagedSeconds>=0&&Number.isFinite(record.started)&&
    Number.isFinite(record.practiceMeasuredFrom)&&record.practiceMeasuredFrom>=record.started&&record.practiceMeasuredFrom<=record.finished&&
    record.engagedSeconds<=Math.ceil((record.finished-record.practiceMeasuredFrom)/1000);
}
export function backupFilename(username,now=new Date()){
  const safe=username.normalize('NFKC').replace(/[<>:"/\\|?*\u0000-\u001f\u007f]/g,'-').replace(/[. ]+$/,'').trim()||'student';
  const pad=value=>String(value).padStart(2,'0');
  const stamp=`${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
  return `tlevel-practice-${safe}-${stamp}.json`;
}
