// Authoring and Node tools use the readable banks. The production build replaces
// this module with the external-asset loader and a generated URL manifest.
import puzzles from '../data/puzzles.js';
import exam from '../data/exam.js';
import python from '../data/python.js';
export const banks=[puzzles,exam,python];
export async function ensureBank(type){if(!banks[type])throw Error('Unknown activity type.');return banks[type];}
