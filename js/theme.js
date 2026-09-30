export const themePalettes = [
  {id:'sage', light:'Sage', dark:'Forest'},
  {id:'blue', light:'Blue sky', dark:'Midnight blue'},
  {id:'rose', light:'Rose', dark:'Berry'},
  {id:'apricot', light:'Apricot', dark:'Ember'},
];

export function initTheme(button) {
  const root=document.documentElement,picker=document.querySelector('#theme-picker'),menu=document.querySelector('#theme-menu');
  const saturation=document.querySelector('#theme-saturation'),lightness=document.querySelector('#theme-lightness');
  const storageKey='dsd-starters-theme-adjustments';
  let dark=false,palette='sage',tweaks={};
  try {
    dark=localStorage.getItem('dsd-starters-theme')==='dark';
    const saved=localStorage.getItem('dsd-starters-palette');
    if(themePalettes.some(p=>p.id===saved))palette=saved;
    const values=JSON.parse(localStorage.getItem(storageKey));
    for(const p of themePalettes)for(const mode of ['light','dark']) {
      const key=`${mode}:${p.id}`,value=values?.[key];
      if(Number.isFinite(value?.saturation)&&Number.isFinite(value?.lightness))tweaks[key]={
        saturation:Math.max(0,Math.min(100,value.saturation)),
        lightness:Math.max(mode==='light'?55:5,Math.min(mode==='light'?96:45,value.lightness)),
      };
    }
  } catch {}
  for(const mode of ['light','dark']) {
    const group=document.createElement('fieldset');
    group.className='theme-group';
    group.innerHTML=`<legend>${mode==='light'?'Light':'Dark'} themes</legend><div class="theme-preview-grid"></div>`;
    for(const p of themePalettes)if(p[mode]) {
      const tile=document.createElement('button');
      tile.type='button';tile.className='theme-preview';tile.dataset.themeChoice=`${mode}:${p.id}`;
      tile.setAttribute('aria-label',`${p[mode]} · ${mode}`);
      tile.innerHTML=`<span class="theme-swatch" data-theme="${mode}" data-palette="${p.id}" aria-hidden="true"></span><span>${p[mode]}</span>`;
      tile.onclick=()=>{dark=mode==='dark';palette=p.id;save();};
      group.lastElementChild.append(tile);
    }
    document.querySelector('#theme-previews').append(group);
  }
  const apply=()=>{
    const mode=dark?'dark':'light';
    root.dataset.theme=mode;root.dataset.palette=palette;
    const preset=getComputedStyle(menu.querySelector(`[data-theme-choice="${mode}:${palette}"] .theme-swatch`));
    const values=tweaks[`${mode}:${palette}`]??{
      saturation:Math.round(Number(preset.getPropertyValue('--theme-saturation-default'))*100),
      lightness:Math.round(Number(preset.getPropertyValue('--theme-bg-default'))*100),
    };
    root.style.setProperty('--theme-saturation',values.saturation/100);
    root.style.setProperty('--theme-bg-lightness',values.lightness/100);
    saturation.value=values.saturation;
    lightness.min=dark?5:55;lightness.max=dark?45:96;lightness.value=values.lightness;
    lightness.setAttribute('aria-valuetext',`${values.lightness}% background lightness`);
    document.querySelector('#theme-saturation-value').value=`${values.saturation}%`;
    document.querySelector('#theme-lightness-value').value=`${values.lightness}%`;
    menu.querySelectorAll('[data-theme-choice]').forEach(tile=>tile.setAttribute('aria-pressed',String(tile.dataset.themeChoice===`${mode}:${palette}`)));
    button.setAttribute('aria-pressed',String(dark));
    button.title=dark?'Switch to paired light theme':'Switch to paired dark theme';
    button.innerHTML=dark?'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></svg>':'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 14A8.5 8.5 0 0 1 10 3.5 8.5 8.5 0 1 0 20.5 14Z"/></svg>';
  };
  const save=()=>{
    apply();
    try {
      localStorage.setItem('dsd-starters-theme',dark?'dark':'light');
      localStorage.setItem('dsd-starters-palette',palette);
      localStorage.setItem(storageKey,JSON.stringify(tweaks));
    } catch {document.querySelector('#toast').textContent='Theme changed, but this browser could not save the preference.';}
  };
  apply();
  button.onclick=()=>{
    dark=!dark;
    if(!themePalettes.find(p=>p.id===palette)?.[dark?'dark':'light'])palette='sage';
    save();
  };
  saturation.oninput=lightness.oninput=()=>{
    tweaks[`${dark?'dark':'light'}:${palette}`]={saturation:Number(saturation.value),lightness:Number(lightness.value)};
    save();
  };
  document.querySelector('#theme-reset').onclick=()=>{delete tweaks[`${dark?'dark':'light'}:${palette}`];save();};
  const positionMenu=()=>{
    const bounds=picker.getBoundingClientRect(),width=Math.min(384,innerWidth-32),height=menu.offsetHeight||Math.min(420,innerHeight-32);
    menu.style.left=`${Math.max(16,Math.min(bounds.right-width,innerWidth-width-16))}px`;
    menu.style.top=`${Math.max(16,Math.min(bounds.bottom+8,innerHeight-height-16))}px`;
  };
  menu.addEventListener('beforetoggle',event=>{if(event.newState==='open')positionMenu();});
  menu.addEventListener('toggle',event=>{if(event.newState==='open')positionMenu();});
  window.addEventListener('resize',()=>{if(menu.matches(':popover-open'))positionMenu();});
}
