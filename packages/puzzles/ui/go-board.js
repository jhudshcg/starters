/**
 * Purpose: Render Go intersections for recorded puzzles and human games.
 * Uses: coordinate labels from Go rules. Libs: none; caller binds interactions.
 */
import {goCoordinate} from '../rules/go-rules.js';

export function renderGoBoard({size:n,board,view=[0,0,n-1,n-1],last,pending,hintMove,locked=false,dead=[],zoom=false,coordinates=false,ownership=[]}) {
  const coordinate=i=>goCoordinate(i,n);
  const [x0,y0,x1,y1]=view,w=x1-x0+1,h=y1-y0+1;
  const font=Math.max(.28,n*.027);
  // Keep label size and distance from each board edge fixed as the grid grows.
  const axisX=-.22+Math.max(0,.39-font*(n>9?.6:.3))/2;
  const axisY=-.18+Math.max(0,.35-font*.5)/2;
  const padding=coordinates?Math.max(.3,-axisX+font*(n>9?.6:.3),-axisY+font*.5)+.05:0;
  const width=w+.2+2*padding,height=h+.2+2*padding;
  // About 12px per edge at the normal 9×9 board size, scaling with the board.
  const scaleX=coordinates?1+.6/(w-1):1,scaleY=coordinates?1+.6/(h-1):1;
  const offsetX=(1-scaleX)*(w+.2)/2,offsetY=(1-scaleY)*(h+.2)/2;
  const label=(x,y,text)=>`<text class="go-axis-label" x="${x}" y="${y}" text-anchor="middle" dominant-baseline="central" font-size="${font}" fill="#493719">${text}</text>`;
  const line=(x1,y1,x2,y2,extra='')=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#806437" stroke-width=".022" ${extra}/>`;
  let svg=Array.from({length:w},(_,x)=>line(x+.6,.6,x+.6,h-.4)).join('')+Array.from({length:h},(_,y)=>line(.6,y+.6,w-.4,y+.6)).join('');
  // Dashed margins mean a cropped view, not an edge of the real 19×19 board.
  if(x0>0)svg+=line(.1,.1,.1,h+.1,'stroke-dasharray=".12 .1"');
  if(x1<n-1)svg+=line(w+.1,.1,w+.1,h+.1,'stroke-dasharray=".12 .1"');
  if(y0>0)svg+=line(.1,.1,w+.1,.1,'stroke-dasharray=".12 .1"');
  if(y1<n-1)svg+=line(.1,h+.1,w+.1,h+.1,'stroke-dasharray=".12 .1"');
  let buttons='';
  for(let y=y0;y<=y1;y++)for(let x=x0;x<=x1;x++){
    const i=y*n+x,cx=x-x0+.6,cy=y-y0+.6,stone=board[i],selected=i===pending||i===last;
    if((stone==='.'||dead.includes(i)) && ['B','W'].includes(ownership[i])) svg+=`<rect data-go-ownership="${ownership[i]}" data-go-estimate="${i}" x="${cx-.13}" y="${cy-.13}" width=".26" height=".26" fill="${ownership[i]==='B'?'#222':'#fff'}" stroke="#303030" stroke-width=".025"/>`;
    if(stone!=='.')svg+=`<circle data-go-stone="${i}" cx="${cx}" cy="${cy}" r=".43" opacity="${dead.includes(i)?.35:1}" fill="${stone==='B'?'#222':'#fff'}" stroke="#303030" stroke-width=".025"/>`;
    if(selected)svg+=`<circle cx="${cx}" cy="${cy}" r=".23" fill="none" stroke="#efb93b" stroke-width=".09"/>`;
    if(i===hintMove&&!locked)svg+=`<circle cx="${cx}" cy="${cy}" r=".36" fill="none" stroke="#926000" stroke-width=".08" stroke-dasharray=".12 .08"/><text x="${cx}" y="${cy+.16}" text-anchor="middle" font-size=".5" fill="#684300">?</text>`;
    buttons+=`<button type="button" class="go-point" data-challenge-action="go" data-value="${i}" data-go-coordinate-value="${coordinate(i)}" ${locked?'disabled':''} aria-label="${coordinate(i)}, ${stone==='.'?'empty':stone==='B'?'black':'white'}${ownership[i] && stone==='.' ? `, estimated ${ownership[i]==='B'?'black':ownership[i]==='W'?'white':'undecided'} territory` : ''}${dead.includes(i)?', marked dead':i===pending?', proposed move':i===last?', last move':''}" aria-pressed="${selected}" style="left:${((cx-.48)*scaleX+offsetX+padding)/width*100}%;top:${((cy-.48)*scaleY+offsetY+padding)/height*100}%;width:${.96*scaleX/width*100}%;height:${.96*scaleY/height*100}%"></button>`;
  }
  svg=`<g data-go-grid transform="matrix(${scaleX} 0 0 ${scaleY} ${offsetX} ${offsetY})">${svg}</g>`;
  if(coordinates) {
    for(let x=x0;x<=x1;x++) {const name=coordinate(x).replace(/[0-9]/g,''),cx=(x-x0+.6)*scaleX+offsetX;svg+=label(cx,axisY,name)+label(cx,h+.2-axisY,name);}
    for(let y=y0;y<=y1;y++) {const name=n-y,cy=(y-y0+.6)*scaleY+offsetY;svg+=label(axisX,cy,name)+label(w+.2-axisX,cy,name);}
  }
  return `<div class="go-board ${zoom ? 'go-board-zoom' : ''}" style="width:var(--go-board-width, ${w*44}px);aspect-ratio:${width}/${height}" role="group" aria-label="Go intersections"><svg viewBox="${-padding} ${-padding} ${width} ${height}" aria-hidden="true">${svg}</svg>${buttons}</div>`;
}
