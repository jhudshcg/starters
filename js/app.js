/**
 * Purpose: Start the browser application.
 *
 * Main contents: single application mount and exported cleanup
 *
 * Used by: index.html and production build.
 * Uses: application.
 * Libs: none.
 */
import { mountApplication } from './application.js';

export const disposeApplication = await mountApplication({ scriptURL: import.meta.url });

export { mountApplication };
