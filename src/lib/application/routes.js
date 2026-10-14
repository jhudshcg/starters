/**
 * Purpose: Translate old shared hash links to static Kit pages without changing codes.
 * Main contents: route parsing and URL construction.
 * Used by: shell, components and route tests. Uses: none. Libs: none.
 */
export function routeURL(hash, base = '') {
  const value = hash.replace(/^#/, '');
  if (!value || value === 'home') return `${base}/`;
  if (value.startsWith('practice=')) return `${base}/practice/?type=${value.slice(9)}`;
  if (value.startsWith('set=')) return `${base}/set/?code=${value.slice(4)}`;
  if (value.startsWith('search=')) return `${base}/search/?${value}`;
  return `${base}/${['exam', 'progress', 'projects', 'faq', 'about', 'go'].includes(value) ? value + '/' : ''}`;
}
export function routeHash(url, base = '') {
  if (url.hash && url.hash !== '#main') return url.hash;
  const name = url.pathname.slice(base.length).replace(/^\/|\/$/g, '');
  if (name === 'practice') return `#practice=${url.searchParams.get('type') ?? ''}`;
  if (name === 'set') return `#set=${encodeURIComponent(url.searchParams.get('code') ?? '')}`;
  if (name === 'search')
    return `#search=all&q=${encodeURIComponent(url.searchParams.get('q') ?? '')}`;
  return `#${name || 'home'}`;
}
