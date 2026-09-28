export function initTheme(button) {
  let dark=false;
  try {dark=localStorage.getItem('dsd-starters-theme')==='dark';} catch {}
  const apply=()=>{
    document.documentElement.dataset.theme=dark?'dark':'light';
    button.setAttribute('aria-pressed',String(dark));
    button.title=dark?'Switch to light theme':'Switch to dark theme';
    button.innerHTML=dark?'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></svg>':'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 14A8.5 8.5 0 0 1 10 3.5 8.5 8.5 0 1 0 20.5 14Z"/></svg>';
  };
  apply();
  button.onclick=()=>{
    dark=!dark;apply();
    try {localStorage.setItem('dsd-starters-theme',dark?'dark':'light');} catch {
      document.querySelector('#toast').textContent='Theme changed, but this browser could not save the preference.';
    }
  };
}
