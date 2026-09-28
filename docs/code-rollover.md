# Bank codes, rollover and progress

Implemented 28 September 2026: new releases use six version bits and three bank bits. Generation-aware history, backup metadata, CSV export metadata, historical labels and explicit rollover tooling are implemented. CSV import remains a pre-existing deferred feature.

## Capacity

Keep nine Base64url characters (54 bits), plus the optional timer character:

`[version:6][bank:3][question1:12][variation1:3][question2:12][variation2:3][question3:12][variation3:3]`

This supports eight independent banks, 64 version values (0–63), 4,095 usable question slots per bank (4095 is reserved for an unused position), and eight variations per question. Core, ESP and future Year 2 OS have independent slot allocations, with the same capacity as puzzles and programming. Navigation sections and topic tags do not consume bank identifiers.

Versions may roll from 63 to 0 after this system is implemented. Increment an unbounded generation counter at each rollover. The generation is bank/release metadata and saved-progress metadata; it is not encoded in the nine-character shared code. The current implementation versions all banks together: retain that release-wide scope initially, rather than assuming existing version numbers are independent per bank. Record the bank identity separately on every attempt.

## Bank and progress metadata

Publish the current generation, current version and latest rollover timestamp in UTC with the bank release. Before the first rollover, the timestamp is null. Rollover dates describe the release event and are fixed build metadata, never the date a browser first loads the release.

Save generation, bank identity and version with each attempt, alongside its existing start/completion dates, question identities and results. Capture these at the start of an attempt, including an attempt that finishes after rollover. Preserve assessed CA references and canonical topic/skill tags with the scores, so historical results do not depend on looking up a reused question slot. Preserve this metadata in JSON backups and CSV imports/exports; importing a record must not replace its original attempt dates with the import date.

Keep the most recently observed generation/version in storage for comparison. Read and classify existing records before replacing that stored metadata during an update. Missing, inconsistent or invalid metadata must not silently become the current generation.

## Detecting rollover and classifying older records

1. Explicit saved generation is authoritative for distinguishing question identities. A lower saved generation is historical even when its numeric version equals the live version. A higher saved generation indicates an older running site or newer imported data; preserve it and prompt for an update instead of rewriting it.
2. For records without generation metadata, compare the original attempt start date (completion date only if no start date exists) with the latest rollover timestamp. Records from before the timestamp belong to an earlier or unconfirmed generation. The date need not identify exactly which earlier generation: historical isolation is sufficient. An attempt started before rollover and submitted after it remains historical.
3. Also compare the live version with the last tracked version. `liveVersion < trackedVersion` is a useful rollover signal when releases have advanced normally. It is not proof by itself: a cached site or rollback can produce the same comparison. Nor does its absence rule out rollover: tracked version10 and live version15 could belong to different generations.
4. A date after the latest rollover does not prove the current generation either: a stale cached bank may have recorded it, and device clocks can be wrong. Use available release/version evidence together. Where the generation cannot be established, label the record as historical/unknown and preserve it rather than assigning it to current question identities.

The latest rollover date is enough for the intended compatibility cutoff; indefinite reconstruction of multiple old generations is not required. A date comparison is a fallback, not a replacement for explicit generation metadata on newly recorded attempts.

## Progress and revision priorities

Keep older results visible and exportable. Label them by generation or, where only the date is known, “Before the latest rollover” / “Generation unknown”. Do not discard students' history on rollover.

Question-specific comparisons, duplicate detection, four-hour repeat-attempt eligibility, resume state and any cached code-to-question lookup must distinguish generations as well as bank/question/variation identity. An old completion must not block or be compared with an unrelated new question that reuses the same code. Preserve unfinished historical answers for review/export; do not silently resume them against current-generation questions.

Revision priorities are organised by assessed CA references or canonical topic/skill tags, not by set code. Older detailed results may continue contributing when those references still represent the same assessed knowledge. Preserve existing assisted/untracked eligibility rules and puzzle exclusion. Where a specification reference or topic changes meaning, use an explicit mapping or separate it; do not infer equivalence from a reused code or similar label. Aggregate-only history must not acquire invented part/topic scores.

Thus generation boundaries isolate question identity without automatically discarding useful topic-level revision evidence.

## Shared-code compatibility cutoff

After a version value is reused, an old shared code may be identical to a new code and may open a different current-generation question set. This is explicitly accepted; indefinite validity of codes across one or more rollovers is not required. Expose the latest rollover date in code-help/progress information and explain that pre-rollover codes are no longer guaranteed to identify their original content.

A shared code has neither a date nor a generation identifier, so the app cannot reliably recognise and reject all old codes. “Retired” does not mean distinguishable. Continue normal structural/composition validation; some old codes will be invalid rather than resolve to a new set. Old saved results must remain attached to their recorded historical metadata and must not be relabelled using the current interpretation of their code.

Permanent slots, content-change notices and retirement of superseded questions continue within a generation. Across rollover, the compatibility guarantee ends; accidental reuse within a generation is still prohibited.

## Implementation boundary and checks

The initial migration is implemented by disjoint published version ranges. Generation0 versions0–18 retain the legacy7+2 layout; versions19–63 use6+3. The decoder recognises legacy header values through75 and rejects the unused gap before the new-format version19 header. No published legacy release used version19. Generation0 therefore has45 new-format version values available; after its first rollover every version0–63 uses6+3. Existing eight-character untimed and previously supported saved timed codes remain readable. New bank IDs4–7 require version19 or later in generation0.

`js/bank-release.js` holds generation/date metadata. At version63, run `npm run codes:update -- --rollover-date=<ISO UTC timestamp ending in Z>` to archive the old history, increment generation and start version0. Normal updates refuse to overflow. Review/build/validate the release before publishing. Saved generations use explicit recorded-code decoding and do not reinterpret historical records against current content. Older active attempts are archived in backups rather than resumed against new questions. Recent-attempt maps are isolated by generation; compatible stored topic scores still contribute to priorities.

The codec, identity tooling, saved attempts, repeat maps, JSON backups, CSV exports and progress help were updated together. Test normal version increases; 63→0; returning after the new cycle exceeds the tracked version; equal version values across generations; several missed rollovers; old imports; cached older releases; missing/invalid dates; attempts crossing the rollover; and preservation of eligible topic-level priorities. Verify all banks retain full question capacity, timer codes work, and no historical completion is reattributed to a new question.
