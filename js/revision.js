import {priorities,setIdentity,attemptEligibility} from './progress.js';
export const STALE_MS=15*24*60*60*1000;
export function revisionPriorities(history,areas,now=Date.now()){
  return areas.map(area=>{
    const rows=history.filter(r=>r.type===area.type&&(r.focus===area.focus||r.partScores?.some(p=>p.refs.some(ref=>ref===area.focus||ref.startsWith(area.focus+'.')))));
    const detailed=rows.map(r=>{
      const parts=r.partScores?.flatMap(p=>{
        const fraction=r.focus===area.focus?1:p.refs.filter(ref=>ref===area.focus||ref.startsWith(area.focus+'.')).length/p.refs.length;
        return fraction?[{...p,firstEarned:p.firstEarned*fraction,firstMax:p.firstMax*fraction}]:[];
      });
      return {...r,focus:area.focus,partScores:parts,firstMax:parts?.reduce((total,p)=>total+p.firstMax,0)??0};
    });
    const evidence=priorities(detailed)[0];
    const last=rows.filter(r=>r.partScores?.some(p=>p.firstMax&&(r.focus===area.focus||p.refs.some(ref=>ref===area.focus||ref.startsWith(area.focus+'.'))))).reduce((last,r)=>Math.max(last,r.finished),0);
    const score=evidence?evidence.earned/evidence.max*100:null;
    const status=score===null?'missing':now-last>STALE_MS?'stale':score<45?'red':score<65?'amber':'green';
    return {...area,...evidence,score,last,status,count:evidence?.count??0,max:evidence?.max??0};
  }).sort((a,b)=>priorityRank(a)-priorityRank(b)||(a.score??0)-(b.score??0)||a.last-b.last||a.focus.localeCompare(b.focus));
}
function priorityRank(p){return p.status==='missing'?0:p.status==='stale'?2:1;}
export function updateRecommendations(data,areas,choose,now=Date.now()){
  const old=data.recommendations;
  const valid=old?.items?.length===3&&old.items.every(item=>{try{setIdentity(item.code);return true;}catch{return false;}});
  if(valid)for(const item of old.items)item.completed ||= data.history.some(r=>r.finished>=old.created&&setIdentity(r.code)===setIdentity(item.code));
  if(valid&&!old.items.every(item=>item.completed))return false;
  const ranked=revisionPriorities(data.history,areas,now),items=[];
  for(let pass=0;pass<20&&items.length<3;pass++)for(const area of ranked){
    if(items.length===3)break;
    try{
      const set=choose(area);
      if(items.some(item=>setIdentity(item.code)===setIdentity(set.code))||!attemptEligibility(data,set.code,now).eligible)continue;
      items.push({code:set.code,focus:area.focus,reason:area.status,completed:false});
    }catch{/* A retired or unavailable area cannot supply a set. */}
  }
  if(items.length!==3)return false;
  data.recommendations={created:now,items,celebrate:Boolean(valid)};
  return true;
}
