/** Shared activity name; breadcrumb markup belongs to the Svelte component. */
import { types } from './bank.js';
export const practiceName = (type) => (type === 1 ? 'Core exam practice' : types[type].name);
