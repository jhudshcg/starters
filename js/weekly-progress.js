import {practiceSeconds} from './practice-time.js';
// Normalise each set before averaging, so different mark totals carry equal weight.
export function averageSetPercentage(rows){
  return rows.length?rows.reduce((sum,r)=>sum+(Number.isFinite(r.earned)&&r.max>0?100*r.earned/r.max:r.percentage),0)/rows.length:null;
}
// Calendar arithmetic keeps Monday boundaries correct across daylight-saving changes.
export function lastTracked(history){
  return history.reduce((last,row)=>Number.isFinite(row.finished)?Math.max(last??row.finished,row.finished):last,null);
}
export function weeklyProgress(history,now=Date.now(),count=8){
  const monday=new Date(now);monday.setHours(0,0,0,0);monday.setDate(monday.getDate()-(monday.getDay()+6)%7);
  return Array.from({length:count},(_,i)=>{
    const start=new Date(monday);start.setDate(start.getDate()-7*(count-1-i));
    const end=new Date(start);end.setDate(end.getDate()+7);
    const rows=history.filter(r=>r.finished>=start.getTime()&&r.finished<end.getTime()&&r.finished<=now);
    return {start:start.getTime(),end:end.getTime(),count:rows.length,
      average:averageSetPercentage(rows),
      days:new Set(rows.map(r=>new Date(r.finished).toDateString())).size,
      minutes:Math.round(rows.reduce((sum,r)=>sum+practiceSeconds(r),0)/60)};
  });
}
