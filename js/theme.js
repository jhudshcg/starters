export const themePalettes = [
  {id:'sage', light:'Sage', dark:'Forest'},
  {id:'blue', light:'Blue sky', dark:'Midnight blue'},
  {id:'rose', light:'Rose', dark:'Berry'},
  {id:'apricot', light:'Apricot', dark:'Ember'},
];

export function initTheme(button, select) {
  let dark=false, palette='sage';
  try {
    dark=localStorage.getItem('dsd-starters-theme')==='dark';
    const saved=localStorage.getItem('dsd-starters-palette');
    if(themePalettes.some(p=>p.id===saved&&p[dark?'dark':'light']))palette=saved;
  } catch {}
  for(const mode of ['light','dark']) {
    const group=document.createElement('optgroup');
    group.label=mode==='light'?'Light themes':'Dark themes';
    for(const p of themePalettes)if(p[mode])group.append(new Option(`${p[mode]} · ${mode}`,`${mode}:${p.id}`));
    select.append(group);
  }
  const apply=()=>{
    const mode=dark?'dark':'light';
    document.documentElement.dataset.theme=mode;
    document.documentElement.dataset.palette=palette;
    select.value=`${mode}:${palette}`;
    button.setAttribute('aria-pressed',String(dark));
    button.title=dark?'Switch to paired light theme':'Switch to paired dark theme';
    button.innerHTML=dark?'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></svg>':'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 14A8.5 8.5 0 0 1 10 3.5 8.5 8.5 0 1 0 20.5 14Z"/></svg>';
  };
  const save=()=>{
    apply();
    try {
      localStorage.setItem('dsd-starters-theme',dark?'dark':'light');
      localStorage.setItem('dsd-starters-palette',palette);
    } catch {
      document.querySelector('#toast').textContent='Theme changed, but this browser could not save the preference.';
    }
  };
  apply();
  button.onclick=()=>{
    dark=!dark;
    if(!themePalettes.find(p=>p.id===palette)?.[dark?'dark':'light'])palette='sage';
    save();
  };
  const picker=document.querySelector('#theme-picker'),menu=document.querySelector('#theme-menu');
  const positionMenu=()=>{
    const bounds=picker.getBoundingClientRect(),width=Math.min(288,innerWidth-32);
    menu.style.left=`${Math.max(16,Math.min(bounds.right-width,innerWidth-width-16))}px`;
    menu.style.top=`${Math.max(16,Math.min(bounds.bottom+8,innerHeight-160))}px`;
  };
  menu.addEventListener('beforetoggle',event=>{
    if(event.newState==='open')positionMenu();
  });
  window.addEventListener('resize',()=>{if(menu.matches(':popover-open'))positionMenu();});
  select.onchange=()=>{
    const [mode,id]=select.value.split(':');
    if(!['light','dark'].includes(mode)||!themePalettes.some(p=>p.id===id&&p[mode]))return;
    dark=mode==='dark';palette=id;save();
    menu.hidePopover();picker.focus();
  };
}
