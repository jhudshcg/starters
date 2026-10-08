/** App compatibility adapter: hydrate the playing tree without revealing answers. */
import {renderGo as render} from '../packages/puzzles/ui/go.js';
import {playTree} from './packed-data.js';
export const renderGo=(part,...args)=>render({...part,tree:playTree(part)},...args);
