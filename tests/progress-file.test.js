/** Folder selection and verified writes: no real user files or permissions are changed. */
import test from 'node:test';
import assert from 'node:assert/strict';
import {chooseProgressFile,readProgressFile,saveProgressFile} from '../js/progress-file.js';
import {progressFilename} from '../js/progress-identity.js';
import {selectProfile,loadProfile,PROFILE_KEY} from '../js/profiles.js';
import {backupJSON,prepareBackup} from '../js/progress-transfer.js';
const profile={username:'Alex / Test',profileId:'12345678-1234-4234-8234-123456789abc'};
function directory(name,children={}){
 return {name,children,async getDirectoryHandle(key,{create=false}={}){
  if(!children[key]){if(!create)throw new DOMException('Missing','NotFoundError');children[key]=directory(key);}
  return children[key];
 },async getFileHandle(name){return {name};}};
}
function handle(raw='',permission='granted'){
 const value={raw,writes:0,reads:0,async queryPermission(){return permission;},async requestPermission(){return permission;},async getFile(){value.reads++;return new Blob([value.raw]);},async createWritable(){value.writes++;return {async write(raw){value.pending=raw;},async close(){value.raw=value.pending;},async abort(){value.aborted=true;}};}};
 return value;
}
test('folder setup reuses either existing folder, prefers T-Level, and never nests a selected subject folder',async()=>{
 for(const name of ['T-Level','DSD T-Level']){
  const root=directory('OneDrive',{[name]:directory(name),Other:directory('Other')});
  const file=await chooseProgressFile(profile,{showDirectoryPicker:async()=>root});
  assert.equal(file.name,progressFilename(profile));assert.deepEqual(Object.keys(root.children),[name,'Other']);
  const direct=root.children[name];await chooseProgressFile(profile,{showDirectoryPicker:async()=>direct});assert.deepEqual(direct.children,{});
 }
 const root=directory('OneDrive');await chooseProgressFile(profile,{showDirectoryPicker:async()=>root});assert.deepEqual(Object.keys(root.children),['T-Level']);
 const both=directory('OneDrive',{'T-Level':directory('T-Level'),'DSD T-Level':{getFileHandle(){throw Error('Wrong folder');}}});
 await chooseProgressFile(profile,{showDirectoryPicker:async()=>both});
 await assert.rejects(chooseProgressFile(profile,{showDirectoryPicker:async()=>{throw new DOMException('Cancelled','AbortError');}}),/Folder access was not granted/);
});
test('stable filename hashes match the Maths algorithm and remain safe for names',()=>{
 assert.equal(progressFilename(profile),'practice_progress_alex_test_gsxv2uvipjyu.json');
 assert.match(progressFilename({...profile,username:'CON'}),/^practice_progress_con_[a-z0-9]{12}\.json$/);
});
test('writes require permission and original bytes; success requires close and matching read-back',async()=>{
 const file=handle(),link={handle:file,...await readProgressFile(file)};
 const saved=await saveProgressFile(link,'{"schema":1,"history":[]}',{interactive:false});assert.equal(file.writes,1);
 file.raw='changed elsewhere';await assert.rejects(saveProgressFile(saved,'next'),/has changed/);assert.equal(file.writes,1);
 const denied=handle('','denied');await assert.rejects(saveProgressFile({handle:denied,fingerprint:'x'},'next',{interactive:false}),/needs file access/);assert.equal(denied.reads,0);assert.equal(denied.writes,0);
 const broken=handle(),empty=await readProgressFile(broken);broken.createWritable=async()=>({write:async()=>{},close:async()=>{throw Error('Disk full');},abort:async()=>{broken.aborted=true;}});
 await assert.rejects(saveProgressFile({handle:broken,...empty},'next'),/Disk full/);assert.equal(broken.aborted,true);
 broken.createWritable=async()=>({write:async()=>{},close:async()=>{},abort:async()=>{}});
 await assert.rejects(saveProgressFile({handle:broken,...empty},'next'),/could not be verified/);
 await assert.rejects(saveProgressFile(link,'x'.repeat(5000001)),/exceeds/);
});
test('UUID persists through export/reload/import and malformed or colliding IDs cannot select a profile',async()=>{
 const values=new Map(),storage={getItem:key=>values.get(key)??null,setItem:(key,value)=>values.set(key,value)};
 const previous=globalThis.localStorage;globalThis.localStorage=storage;
 try{
  const first=selectProfile('Alex',storage);assert.equal(loadProfile('Alex',storage).profileId,first.profileId);
  const exported=backupJSON(first);assert.equal(JSON.parse(exported).profileId,first.profileId);
  const second=selectProfile('Jamie',storage),registry=storage.getItem(PROFILE_KEY);
  const restored=await prepareBackup(exported,second);assert.equal(restored.merged.profileId,first.profileId);assert.equal(restored.switching,true);assert.equal(storage.getItem(PROFILE_KEY),registry);
  await assert.rejects(prepareBackup(JSON.stringify({...JSON.parse(exported),profileId:'bad'}),second),/invalid profile ID/);
  await assert.rejects(prepareBackup(JSON.stringify({...JSON.parse(exported),username:'Other'}),second),/already used/);
  const legacy=JSON.parse(exported);delete legacy.profileId;assert.equal((await prepareBackup(JSON.stringify(legacy),second)).merged.profileId,first.profileId);
  assert.equal(storage.getItem(PROFILE_KEY),registry);
 }finally{globalThis.localStorage=previous;}
});
