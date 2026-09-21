# Common specification

Status: draft. See [document status](README.md) and [implementation decisions](implementation-plan.md).

## Scope and terminology

Static GitHub Pages SPA for 16–18-year-old year 1 students. Activities take 5–15 minutes. All marking and progress storage run in the browser. No account or backend is required.

| Term | Meaning |
| --- | --- |
| Type | Puzzles, exam practice or programming |
| Focus | Selectable curriculum reference, puzzle family or programming topic |
| Question | A reusable task template with stable identity |
| Part | A separately marked response within a question |
| Variation | A particular question with fixed wording, values and answers |
| Set | An ordered group of specific question variations |
| Attempt | One started activity, ending in submission, expiry or abandonment |

Questions may have several tags. A set has one primary focus. Exam parts report against their distinct coverage references; a part with several references divides its earned and available marks equally between them. Programming parts report against the named programming focus. Other tags remain searchable.

## Data contract

Keep one authored JSON or JS entry file per type. Renderers and marking engines are shared modules, not copied into question records. Generated output may be split into smaller files when the bank grows.

| Record | Required fields |
| --- | --- |
| Question | `id`, `type`, `primaryFocus`, `tags`, `format`, `difficulty`, `estimatedMinutes`, `variations` |
| Variation | `id`, `revision`, `prompt`, `parts`, `hint`, `solution` |
| Part | `id`, `prompt`, `inputKind`, `maxMarks`, `marking`, `reportingFocus`, `coverageIds` |
| Marking | Rule kind, accepted answers or marking points, dependencies, misconception feedback |
| Set | `code`, `type`, `primaryFocus`, ordered variation IDs and revisions, `maxMarks`, `estimatedMinutes` |

Coverage IDs are required for exam parts; optional elsewhere. Mark totals are derived from parts and checked against declared totals. Difficulty uses `introductory`, `standard`, `stretch`; it does not change marking rules.

Supported initial input kinds: single choice, multiple choice, short text, numeric entry, token entry, trace table, grid cell and ordering. Options have stable IDs; marking never depends on displayed option position. Store any randomised option order in the published variation so a shared code reproduces the presentation.

**Proposal:** give questions stable authored IDs, for example `PY-ITER-001`; variation codes include revision, for example `PY-ITER-001-V03-R01`. Prefixes are `PZ`, `EX`, `PY`. IDs are independent of text and tags. A content digest may detect changes but is not the identity.

Authoring generators must use deterministic inputs. **Proposal:** materialise a finite selection of validated variations at build time for v1; do not generate unregistered variants in the browser.

## Set codes and compatibility

**Settled decision:** use Base64url (`A–Z`, `a–z`, `0–9`, `-`, `_`), preserving case. Eight characters encode a six-byte, 48-bit payload exactly, without padding. An optional ninth character configures timing. This supersedes the earlier six-character hash and finite set-catalogue proposals. See the [rationale](implementation-plan.md#settled-set-code-decision).

Pack fields in this order, most-significant bit first, and encode the resulting six bytes:

`[version:7][type:2][question1:10][variation1:3][question2:10][variation2:3][question3:10][variation3:3]`

Capacity: 128 bank versions, four types, 1,024 question slots per type and eight variations per question. **Proposal:** type values 0=puzzles, 1=exam practice, 2=programming, 3=reserved. Reserve question slot 1023 for an unused trailing position, with variation zero; this leaves 1,023 usable question slots per type and permits shorter activities. Reject gaps between used positions.

Question slots are stable assigned IDs, not positions in a sorted array. A bank version fixes question content, variation ordering, answers and generation rules. Do not reuse a version for changed content or wrap version numbers on exhaustion. The teacher explicitly authorised retiring the demonstration bank; revision 1 remains unsupported. From revision 3, the app checks earlier published codes against per-variation fingerprints and accepts each set only when all its contained variations remain unchanged. Compatible additions may use previously unassigned slots without altering existing mappings. Answer-changing corrections require a new bank version. App styling changes do not consume a bank version.

The browser encodes eligible combinations directly. An optional generated index resolves bank/type/question/variation coordinates; it is not a catalogue of combinations. See the linked rationale.

Decode and validate version, type, question existence, variation existence, canonical unused fields, duplicate questions and activity composition/mark rules before displaying a set. Unknown versions may offer reload; never guess a nearest match. Retained old content may show a correction notice linking to its replacement.

Trim surrounding whitespace only; never lowercase, uppercase or silently substitute characters in the eight-character payload. Reject padding and invalid lengths. There is no checksum: some transcription errors can identify another valid set. Display decoded type/focus prominently and provide Copy code and Copy link controls.

Timed codes append `5`–`9` or `A`–`F` for 5–15 minutes. Parse the suffix by length, separately from Base64url decoding. Individual prefixed question codes retain their own format and do not take this suffix.

Share URLs use a fragment field to work on GitHub Pages without server routes, for example `#set=<code>`. Base64url uses URL-safe `-` and `_` in place of standard Base64’s `+` and `/`. Preserve case and both symbols through URL creation and parsing. Reject the standard Base64 alphabet rather than silently accepting two formats.

## Navigation and selection

Home provides three type choices, focus selection, code entry and progress access. A shared question-set code form is also available on every page, including activities and progress. Invalid codes are reported beside that form; opening a different set preserves the existing unfinished-work confirmation. An activity shows its type, focus, code, total marks, estimated duration and timer control.

**Proposal: three distinct actions.**

| Label | Selection rule |
| --- | --- |
| Get new question set | Same type, different primary focus and different question templates |
| New set in this focus | Same primary focus, different template combination |
| Get new permutation | Same ordered templates and focus; every question receives a different variation |

Choose randomly among eligible combinations from the versioned bank, excluding the current set. If no eligible alternative exists, disable the action with a short explanation. Do not silently relax the rule. This is the initial interpretation of “not just seen”; no long-term avoidance algorithm is needed.

Before replacing an unfinished activity, offer to keep working or leave it. **Proposal:** store one active activity; leaving marks it abandoned. Opening one question directly uses the same controls, records `activityKind: question`, and does not pretend it satisfies set mark limits.

## Marking and attempts

Mark each part using its own rule. Scores are non-negative and capped at the part maximum. Blank answers score zero. Multi-select rules declare whether selection count is limited and how partial credit works. Dependencies and error-carried-forward credit are explicit, not inferred.

Checking and showing answers are disabled until the set is submitted during the current page visit. Submission records current answers and ends the attempt; automatic timer submission also unlocks review. Reloading or leaving the set locks checking/reveal and hides answer feedback again. A restored completed attempt offers Submit saved answers to unlock review without changing its recorded score or adding another record. Post-submission checks redisplay feedback without increasing attempt check counts. Retry creates a fresh attempt with review locked. Submission is idempotent: repeated clicks or timer events cannot duplicate records. Hints remain available before submission.

Record first-check marks per part, final marks, check counts, hint use and answer reveals. Hints used before submission flag the response as assisted. Revealing answers during review does not award marks or change the submitted record. Feedback distinguishes correct, partly correct, incorrect and blank, and gives a useful next step. After expiry, review is available; changing answers requires a new attempt.

## Timing and recovery

Start hidden elapsed-time tracking when an activity starts. Enabling a visible timer resets the timing origin and starts the selected 5–15-minute countdown, as permitted by AGENTS.md. Record original start and reset time separately. Update the displayed/shareable set code with the duration suffix.

Persist answers, attempt ID, timing origin, deadline and last saved timestamp. Calculate remaining time from the absolute deadline; background-tab throttling must not extend the deadline. Auto-submit saved current answers when the deadline passes, including on return to the page. Do not announce every second to assistive technology.

**Proposal for the 45-minute rule:** an unfinished, untimed activity last saved more than 45 minutes ago is offered as a fresh attempt, with its old draft marked abandoned. A timed activity whose deadline passed is submitted as expired first, regardless of absence length. It may then be retried with a fresh timer. Within 45 minutes, refresh restores the original timing origin and answers.

**Proposal:** stopping or changing a running timer is allowed for practice but flags the attempt `timingAdjusted`; enabling again starts the selected duration anew. Preserve the timing event history. Record both total elapsed time and elapsed time since the latest timing origin; the UI labels the latter “Time taken” with a reset indicator when applicable.

## Progress and CSV

Persist a versioned local record with attempt ID, activity kind, code, content revision, type, primary focus, start/submission timestamps, outcome, earned/available marks, percentage, elapsed times, timing settings, assistance flags and per-part first/final marks with reporting focuses. Store UTC timestamps; display local dates. Compute attempt counts from records.

Views: sortable attempt table, score-over-time chart with equivalent table, type/focus/date filters and revision priorities. Date boundaries use the student's local date. Puzzles are excluded from revision priorities; their history remains visible. This interprets the incomplete sentence about puzzles in AGENTS.md.

**Implemented detailed tracking:** new exam and programming attempts save optional `partScores`, containing question slot/variation, part ID, distinct reporting references, final earned/available marks and unassisted first-response earned/available marks. A question assisted before its first check contributes zero first-response earned and available marks, retaining the existing question-level assistance rule. Puzzle attempts have no detailed-priority contribution.

Only records containing `partScores` contribute to revision priorities. Earlier aggregate-only results remain unchanged in history, charts, summary statistics, exports and repeat-attempt checks. There is no migration, historical allocation, cutoff date or “migration completed” flag. A completed older attempt remains aggregate-only when reopened; an unfinished attempt submitted under the new code receives detailed scores.

After applying history filters, select the latest five eligible detailed attempts with nonzero first-response available marks per broad topic or programming focus. Both priority views use this **same parent-level window**. Topic scores count each part once; exam-subtopic scores divide each part's earned and available marks equally across its distinct references (multiple subelement letters or repeated links do not multiply its credit). Sum marks before calculating percentages; round only display values. Do not add child totals to parent totals. Programming remains a named-focus measure because its tags are not authored part-level CA mappings.

The priorities view switches between Topic / programming focus and Exam subtopic, shows assessed marks and contributing attempts, and labels fewer than three attempts or fewer than ten assessed marks “Limited evidence”. The note explains that earlier results remain in history without contributing to priorities. A narrow subtopic with no evidence in the selected parent window has no rating.

JSON backups retain `partScores` as recorded rather than re-deriving mappings from today's bank. Import accepts absent legacy detail but rejects malformed detail, duplicate part identities/references, invalid question coordinates, references outside the parent focus, invalid marks and totals inconsistent with the aggregate record. All validation finishes before writing history. CSV adds first-response totals and a quoted JSON `partScores` column; full restoration continues to use JSON backups.

**Proposal:** CSV schema v1 uses one row per attempt, with fixed scalar columns plus quoted JSON cells for part results and timing events. Use a maintained CSV parser/writer; support commas, quotes, Unicode and newlines. Export enough metadata to preserve focus results even if questions later change. Exclude raw student answer text from exports by default.

Import validates schema version, required fields, dates, numeric ranges and nested result structure before writing. Show valid, invalid and duplicate counts. Merge by attempt ID; skip identical duplicates and report conflicts without overwriting. Reject unsupported versions. Display imported strings as text and protect spreadsheet exports from formula interpretation. Re-importing an export must not change totals.

Encourage download to student OneDrive; import uses a standard file picker. No direct OneDrive connection is required. Show the date of last export. Provide a clearly confirmed local-history reset. If storage is unavailable or full, keep the activity usable, show that saving failed and offer export; never claim data was saved.

## Implemented repeat-attempt policy (15 September 2026)

Progress is recorded only when an attempt starts at least four hours after the most recent completion of that exact set. Students may practise sooner with a notice and an untracked result; those results do not enter charts, averages or revision priorities. Every completion, including untracked practice, updates the last-practice date. Timer suffixes and question order are ignored for this comparison; different variations remain distinct sets. Eligibility is fixed at the start of the attempt. JSON backups include recent-practice dates as well as tracked results; legacy backups remain accepted. Reloading and resubmitting a completed attempt does not create a new completion or move the gap.

Production build details and the client-side obfuscation boundary are documented in README.md. Display data, marking data and reveal text are separate; ordinary checking must not decode model explanations. The agreed compatibility policy uses content fingerprints: earlier codes remain valid if all contained variations are unchanged. Altered/removed questions produce a specific update message. Content revision 3 records this editorial update without changing the encoding layout; documentation edits and rebuilds do not change it. See README.md for the codes:update workflow.

## Shared-code diagnostics and regression checks (20 September 2026)

The footer identifies the loaded application asset and bank revision. Since production app and bank assets have content-based filenames, the application filename distinguishes builds even when additions retain the same question revision. A malformed, unsupported or unavailable code entered through either form, or a failing shared link, offers Copy error details. This explicitly copied report includes the entered string and Unicode character values, decoded code fields where possible, the error, build, bank revision, page origin/path and browser identification. It excludes answers, progress history, local storage and URL query strings. It is not sent anywhere automatically.

The encoding remains the existing eight-character, case-sensitive, 48-bit format with an optional timer suffix. No automatic case changes or lookalike-character substitutions are made. Sharing tests exercise actual activity-start and copy-button handlers, open the resulting code in another browser context without shared storage, and compare the displayed questions. They also cover timers, single-question codes, shared links, malformed-input diagnostics and the existing compatibility tests. Copy-button tests capture the exact clipboard-write argument; they do not access the operating-system clipboard.

`scripts/audit-shared-codes.mjs` extracts the saved 14 September commit `45cc13e` into a temporary directory, tests its own encoder/resolver and bank, then audits the current bank. It leaves the working checkout unchanged. Passing these checks does not identify the earlier classroom failure or prove that this commit was the deployed classroom release. The exact failing code, error and loaded release remain unknown.

## Student issue reports

One footer button is available on every page. On an activity page, students choose Bug or Content issue; content reports require one or more items selected from the current set. Elsewhere the form offers Bug. A description is required, with a 1,500-character limit. Closing the dialog preserves the activity; its timer continues normally.

A preview includes the description, selected item numbers/titles/exact question codes, current set code when visible, page link, build/bank identifier, browser and report time. Bug reports also include any currently visible code-entry diagnostics. Saved history and answers are not collected. The recipient stays blank: students address the draft to their teacher.

Open email draft uses a percent-encoded mailto subject/body with CRLF line endings. The student reviews and sends through their configured email app; the site neither sends nor claims delivery. Copy report provides a fallback for missing email handlers or client URL-length limits; if clipboard access fails, the preview is selected for manual copying. No server, reporting account or new dependency is required.


## Leaving an activity

Warn only when the currently visible activity has entered, unsubmitted answers or puzzle work. Show the warning before navigating to another page or replacing the set, with Keep working and Leave activity choices. Starting from Home/Progress must not warn about a saved activity. Empty activities and submitted work do not warn. Puzzle selections, givens and undo history alone do not count as answers; entered notes and moves do. Cancel preserves the visible activity, route and answers.
