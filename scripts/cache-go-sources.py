"""Cache public Go source data for offline selection/import and future reuse.

Usage: python3 scripts/cache-go-sources.py
Existing files are reused. Metadata retains problem content and attribution,
not contributor profile data. Requests are read-only and limited to this sample.
"""
import concurrent.futures
import json
import pathlib
import urllib.request

ROOT=pathlib.Path(__file__).resolve().parents[1]
CACHE=ROOT/'references/go'
CACHE.mkdir(parents=True,exist_ok=True)
def read(url):
    with urllib.request.urlopen(url,timeout=25) as response:
        return json.load(response)
def save(path,data):
    path.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')
def compact(data):
    keep=['id','rank','genre','specificGenre','description','sgf','source','playerColor','createdAt','problemLevel','hasNegativeFlags','isStandard','isCanon','avgSolveTimeSeconds','attempts']
    result={key:data[key] for key in keep if key in data}
    result['author']=data.get('author',{}).get('name','Unknown contributor')
    result['url']=f"https://goproblems.com/problems/{data['id']}"
    return result
def fetch(problem):
    path=CACHE/f"goproblems-{problem['id']}.json"
    if path.exists():return 'cached'
    try:
        save(path,compact(read(f"https://goproblems.com/api/v2/problems/{problem['id']}")))
        return 'downloaded'
    except Exception as error:
        return f"{problem['id']}: {error}"
def main():
    catalogue=CACHE/'catalogue-sample.json'
    if catalogue.exists():rows=json.loads(catalogue.read_text())
    else:
        rows=[]
        for page in range(8):
            page_path=CACHE/f'catalogue-page-{page}.json'
            temporary=pathlib.Path('/private/tmp/go-beginner-list.json')
            if page_path.exists():batch=json.loads(page_path.read_text())
            else:
                batch=json.loads(temporary.read_text()) if page==0 and temporary.exists() else read(f'https://goproblems.com/api/v2/problems?resultNumber=100&offset={page*100}&sortBy=p.id&sortDirection=asc')
                batch=[{k:q[k] for k in ['id','rank','genre','rating','flagStats'] if k in q} for q in batch]
                save(page_path,batch)
            rows.extend(batch)
            if sum(q['rank']['unit']=='kyu' and q['rank']['value']>=25 for q in rows)>=35:break
        save(catalogue,rows)
    selected=[]
    groups=[(25,40,35),(18,24,10),(12,17,3),(7,11,25)]
    for low,high,count in groups:
        candidates=[q for q in rows if q['rank']['unit']=='kyu' and low<=q['rank']['value']<=high and not q.get('flagStats',{}).get('negativeFlagSum',0)]
        candidates.sort(key=lambda q:(q['genre'] not in ['life and death','tesuji'],-q.get('rating',{}).get('votes',0)))
        selected.extend(candidates[:count])
    for result in concurrent.futures.ThreadPoolExecutor(max_workers=3).map(fetch,selected):
        print(result,flush=True)
if __name__=='__main__':main()
