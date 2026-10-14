/** Enumerate every public page for a file-only host; codes and selections remain query data. */
import { error } from '@sveltejs/kit';
const views = [
  '',
  'exam',
  'practice',
  'set',
  'search',
  'progress',
  'projects',
  'faq',
  'about',
  'go',
];
export const entries = () => views.map((view) => ({ view }));
export function load({ params }) {
  if (!views.includes(params.view || '')) error(404, 'Page not found');
  return { view: params.view || 'home' };
}
