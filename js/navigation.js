/**
 * Purpose: Keep visible app pages and their saved state in browser history.
 * Main contents: guarded navigation, Back/Forward restoration and entry snapshots.
 * Used by: app.js. Uses: History API callbacks. Libs: none.
 */
export function createNavigation({beforeLeave,capture,restore,render}){
  let index=history.state?.pageIndex??0;
  let currentHash=location.hash||'#home';
  let returning=false;
  history.replaceState({...history.state,pageIndex:index},'',currentHash);

  /** Save the current page before leaving; also called after activity edits. */
  function remember(){
    if((location.hash||'#home')!==currentHash)return;
    const state={...history.state,...capture(),pageIndex:index};
    if(JSON.stringify(state)!==JSON.stringify(history.state))history.replaceState(state,'');
  }
  /** Navigate after confirmation. Replacement is reserved for canonical URLs and timers. */
  async function go(hash,{replace=false,guard=true,draw=true,snapshot=true,state={}}={}){
    if(guard&&!await beforeLeave())return false;
    if(snapshot)remember();
    if(hash!==currentHash){
      if(!replace)index++;
      history[replace?'replaceState':'pushState']({...state,pageIndex:index},'',hash);
      currentHash=hash;
    }
    if(draw)await render();
    return true;
  }
  window.addEventListener('popstate',async event=>{
    if(returning){returning=false;return;}
    const target=event.state?.pageIndex??index+1;
    if(!await beforeLeave()){
      returning=true;history.go(index-target);return;
    }
    index=target;currentHash=location.hash||'#home';
    restore(history.state);
    await render();
  });
  return {go,remember};
}
