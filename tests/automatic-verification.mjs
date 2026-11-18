import assert from 'node:assert/strict';
import {extractSchedule,verifySubmission} from '../lib/automatic-verification.js';
assert.equal(extractSchedule('<h2>Happy hour</h2><p>Daily 3–6 pm</p>').early_display,'3:00 PM–6:00 PM');
assert.equal(extractSchedule('Happy hour Daily 3–6 pm and 9–11 pm'),null);
assert.equal(extractSchedule('Happy hour Monday Friday 3–6 pm'),null);
assert.equal(extractSchedule('Dinner daily 3–6 pm'),null);
assert.equal(extractSchedule('Happy hour daily except holidays 3–6 pm'),null);
console.log('Schedule ambiguity checks passed');
