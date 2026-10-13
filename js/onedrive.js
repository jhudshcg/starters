/**
 * Purpose: Connect each local profile to a verified JSON file in its synced OneDrive folder.
 * Main contents: controls, reviewed imports, serial automatic saves and permission recovery.
 * Used by: app.js. Uses: progress-file, progress-transfer and profile identity. Libs: none.
 */
import {backupJSON} from './progress-transfer.js';
import {chooseProgressFile,learnerFileLink,readProgressFile,saveProgressFile,withProgressFileLock} from './progress-file.js';

/** Bind host-owned storage/import callbacks; background work never requests file permission. */
export function createOneDrive({current,saveLocal,restore,download,notify}) {
  const states=new Map(), queues=new Map(), baselines=new Map();
  let timer;
  const supported=()=>Boolean(window.showDirectoryPicker);
  function report(profile,message){states.set(profile.profileId,message);paint();}
  function paint(){
    for(const node of document.querySelectorAll('[data-file-status]'))node.textContent=states.get(current().profileId)??(supported()?'Choose your OneDrive folder. Progress saves automatically to T-Level or DSD T-Level.':'Use Download backup and Restore backup in this browser. Folder access is available in Chrome or Edge.');
  }
  async function flush(profile=current(),interactive=false){
    if(!profile.profileId)return;
    const id=profile.profileId;
    if(current().profileId===id)profile=current();
    // Commit browser data synchronously before starting any asynchronous file operation.
    try{saveLocal(profile);}catch{
      report(profile,'Browser progress could not be saved. Download a backup now to keep the results in this tab. OneDrive saving has not started.');
      return;
    }
    if(queues.has(id)){await queues.get(id);return flush(profile,interactive);}
    const task=withProgressFileLock(profile,async()=>{
      const link=await learnerFileLink(profile);if(!link)return;
      const baseline=baselines.get(id)??link.fingerprint;
      baselines.set(id,baseline);
      if(baseline!==link.fingerprint)throw Error('Another tab updated this file. Open linked file to review it before saving.');
      const raw=backupJSON(profile);
      // Even unchanged browser progress must detect external edits before claiming it is saved.
      if(!interactive && await link.handle.queryPermission?.({mode:'readwrite'})!=='granted')throw Error('Use Save to OneDrive to allow file access again.');
      if(interactive && link.handle.requestPermission && await link.handle.requestPermission({mode:'readwrite'})!=='granted')throw Error('File access was not granted.');
      const file=await readProgressFile(link.handle);
      if(file.fingerprint!==link.fingerprint)throw Error('The linked file has different progress. Open linked file to review it, or choose Keep browser progress. Automatic saving is paused.');
      if(file.raw!==raw){
        report(profile,'Saving progress…');
        const updated=await saveProgressFile(link,raw,{interactive:false});
        await learnerFileLink(profile,updated);baselines.set(id,updated.fingerprint);
      }
      report(profile,'Progress saved to your linked file. OneDrive handles cloud syncing.');
    }).catch(error=>report(profile,`File save needs attention: ${error.message} Browser progress is retained.`));
    queues.set(id,task);
    try{await task;}finally{queues.delete(id);}
  }
  async function review(handle){
    if(handle.requestPermission && await handle.requestPermission({mode:'readwrite'})!=='granted')throw Error('File access was not granted.');
    const file=await readProgressFile(handle);
    if(!file.raw.trim())throw Error('This file is empty. Choose your folder to create a progress file.');
    // The host validates before showing the review and activates only after confirmation.
    if(!await restore(file.raw,true))return false;
    await learnerFileLink(current(),{handle,fingerprint:file.fingerprint});baselines.set(current().profileId,file.fingerprint);
    await flush(current());
    return true;
  }
  async function action(kind){
    const profile=current();
    try{
      if(kind==='download'){download();return;}
      if(kind==='open'){
        const [handle]=await window.showOpenFilePicker({types:[{description:'T-Level progress',accept:{'application/json':['.json']}}]});
        await review(handle);return;
      }
      if(kind==='folder'){
        const handle=await chooseProgressFile(profile),file=await readProgressFile(handle);
        if(file.raw.trim()){await review(handle);return;}
        await learnerFileLink(profile,{handle,fingerprint:file.fingerprint});baselines.set(profile.profileId,file.fingerprint);
        await flush(profile,true);return;
      }
      const link=await learnerFileLink(profile);
      if(!link){if(kind==='save')return action('folder');throw Error('Choose your OneDrive folder first.');}
      if(kind==='review'){await review(link.handle);return;}
      if(kind==='forget'){baselines.delete(profile.profileId);await withProgressFileLock(profile,()=>learnerFileLink(profile,null));report(profile,'File link forgotten. The file and browser progress are unchanged.');return;}
      if(kind==='keep'){
        if(!confirm('Replace the linked file with this browser’s progress? Results that exist only in that file will not be included. Open linked file to merge them instead.'))return;
        if(link.handle.requestPermission && await link.handle.requestPermission({mode:'readwrite'})!=='granted')throw Error('File access was not granted.');
        await withProgressFileLock(profile,async()=>{
          const file=await readProgressFile(link.handle);
          await learnerFileLink(profile,{handle:link.handle,fingerprint:file.fingerprint});baselines.set(profile.profileId,file.fingerprint);
        });
      }
      await flush(profile,true);
    }catch(error){const message=`${error.message || 'File access was interrupted.'} Your browser progress is retained. Download a backup before moving from an embedded preview to Chrome or Edge.`;report(profile,message);notify(message);}
  }
  return {
    flush,
    changed(profile=current()){
      clearTimeout(timer);
      // Keep the outgoing profile object in the callback when the user switches profiles.
      timer=setTimeout(()=>void flush(profile),1000);
    },
    mount(root,{compact=false}={}){
      root.innerHTML=`<section class="onedrive-controls" aria-label="OneDrive progress file"><p data-file-status role="status"></p><div class="actions">${supported()?'<button data-file-action="save" class="primary">Save to OneDrive</button><button data-file-action="open">Open progress file</button>':''}<button data-file-action="download">Download backup</button><a href="#progress">Manage progress files</a></div>${compact?'':`<details><summary>File options</summary><div class="actions">${supported()?'<button data-file-action="folder">Choose OneDrive folder</button><button data-file-action="review">Open linked file</button><button data-file-action="keep">Keep browser progress</button>':''}<button data-file-action="forget">Forget file link</button></div><p>Choose the locally synced OneDrive root, or its T-Level / DSD T-Level folder. Saves are checked after writing. Keep the tab open until saved; closing the browser can interrupt a save. This does not confirm cloud upload.</p></details>`}</section>`;
      root.querySelectorAll('[data-file-action]').forEach(button=>button.onclick=()=>action(button.dataset.fileAction));paint();
    }
  };
}
