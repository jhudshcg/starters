// One public bank per activity type; CA files keep exam content manageable.
import ca1 from './exam-ca1.js';
import ca2 from './exam-ca2.js';
import expanded from './exam-expanded.js';
import depthCa1 from './exam-depth-ca1.js';
import depthCa2 from './exam-depth-ca2.js';
import depthTesting from './exam-depth-testing.js';
import priority from './exam-priority.js';
export default [...ca1, ...ca2, ...expanded, ...depthCa1, ...depthCa2, ...depthTesting, ...priority];
