import test from 'node:test';
import assert from 'node:assert/strict';
import {hasRecentSubmission} from '../js/review.js';
test('review lasts four hours across reloads and can be renewed without changing completion',()=>{
 const now=1_800_000_000_000;
 assert.equal(hasRecentSubmission(null,now),false);
 assert.equal(hasRecentSubmission({finished:null},now),false);
 assert.equal(hasRecentSubmission({finished:now-4*3600000+1},now),true);
 assert.equal(hasRecentSubmission({finished:now-4*3600000},now),false);
 assert.equal(hasRecentSubmission({finished:now-5*3600000,reviewSubmittedAt:now-1},now),true);
 assert.equal(hasRecentSubmission({finished:now+1},now),false);
});
