export function initTheme(button) {
  let dark=false;
  try {dark=localStorage.getItem('dsd-starters-theme')==='dark';} catch {}
  const apply=()=>{
    document.documentElement.dataset.theme=dark?'dark':'light';
    button.setAttribute('aria-pressed',String(dark));
  };
  apply();
  button.onclick=()=>{
    dark=!dark;apply();
    try {localStorage.setItem('dsd-starters-theme',dark?'dark':'light');} catch {
      document.querySelector('#toast').textContent='Theme changed, but this browser could not save the preference.';
    }
  };
}
