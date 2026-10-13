/**
 * Purpose: Run an optional GNU Go worker only when an estimate is requested.
 * Ownership: the host supplies a worker URL; no app routing or bundled engine here.
 * Uses: standard Worker messages; abort/dispose terminate unfinished analysis.
 */
export function createGnuGoEstimator(url, createWorker = url => new Worker(url, {type:'module'})) {
  let worker, pending, nextId=0;
  const stop = error => {
    worker?.terminate(); worker=undefined;
    pending?.reject(error); pending=undefined;
  };
  return {
    estimate(position, signal) {
      if(signal?.aborted) return Promise.reject(new DOMException('Cancelled', 'AbortError'));
      if(pending) stop(new DOMException('Replaced', 'AbortError'));
      return new Promise((resolve,reject) => {
        const id=++nextId;
        const abort=()=>stop(new DOMException('Cancelled', 'AbortError'));
        const timeout=setTimeout(()=>stop(Error('GNU Go took too long. Try again or use the area count.')), 45000);
        const finish=(callback,value)=>{
          clearTimeout(timeout); signal?.removeEventListener('abort',abort);
          pending=undefined; callback(value);
        };
        pending={reject:error=>finish(reject,error)};
        signal?.addEventListener('abort',abort,{once:true});
        try {
          worker ??= createWorker(url);
          const activeWorker=worker;
          worker.onmessage=({data})=>{
            if(worker!==activeWorker || data.id!==id) return;
            if(data.error) stop(Error(data.error));
            else if(!Number.isFinite(data.result?.lead) ||
              typeof data.result?.ownership!=='string' ||
              data.result.ownership.length!==position.size**2 || /[^BW.]/.test(data.result.ownership))
              stop(Error('GNU Go returned an unreadable estimate.'));
            else finish(resolve,{...data.result,ownership:[...data.result.ownership]});
          };
          worker.onerror=()=>{if(worker===activeWorker) stop(Error('GNU Go could not load. Try again or use the area count.'));};
          worker.postMessage({id,position});
        } catch(error) { stop(error); }
      });
    },
    dispose() {stop(new DOMException('Closed','AbortError'));}
  };
}
