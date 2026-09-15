import {unpack} from './packed-data.js';

export function createBankLoader(urls,fetchFile=(...args)=>fetch(...args)) {
  const banks=urls.map(()=>null),pending=new Map();
  async function ensureBank(type){
    if(!Number.isInteger(type)||!urls[type])throw Error('Unknown activity type.');
    if(banks[type])return banks[type];
    if(!pending.has(type))pending.set(type,(async()=>{
      try{
        const response=await fetchFile(urls[type]);
        if(!response.ok)throw Error('Download failed');
        const bank=unpack(await response.text());
        if(!Array.isArray(bank)||!bank.length)throw Error('Invalid bank');
        banks[type]=bank;
        return bank;
      }catch{
        throw Error('Could not load these questions. Check your connection and try again. If this continues, reload the page.');
      }finally{pending.delete(type);}
    })());
    return pending.get(type);
  }
  return {banks,ensureBank};
}
