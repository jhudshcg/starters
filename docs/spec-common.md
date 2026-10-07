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

## Question permutations and question sets

Requirements moved from AGENTS.md on 7 October 2026 retain their original status; moving them into a document containing drafts does not make them proposals. Later explicitly adopted decisions and the exceptions identified below still apply.

Each question should have multiple (at least 5 for code challenges) variations, with different values, scenarios, code snippets, and answer values, but essentially being quite similar questions. This is to give more variety but also help students identify the underlying concept or principle rather than simply memorize an arbitrary set of questions. Each unique question permutation must have a unique code, which can be used to access that specific question directly from the main page. The code should include a prefix to identify the question type (puzzle, spec question, or python challenge) and a unique identifier for the specific question. It should be extendable to allow for future additions of new question types and variations.

Questions should support tags to record spec content area and subsections, e.g. CA1.3.2

Questions sets (the 2-3 questions presented to students for a starter activity) should also have unique codes (which also specify the specific permutation of each question), to allow for easy sharing and access to specific sets of questions.

The idea is students can enter a code for a question set given by the teacher into the SPA and immediately access the exact intended question set.

Whenever a question set is shown, its unique code should be displayed prominently, so students can share it with peers or teachers.

A question can potentially cover more than one focus area (e.g. logic errors and boolean expressions, or functions and syntax).

The fixed classic-maths/Go/grid exceptions in the [puzzle specification](spec-puzzles.md) do not claim artificial permutations; disable the permutation action where no alternative exists. The current code format and identity rules below supersede the original hash/cache proposals, without removing reproducibility, direct question access or future extensibility.

## Data contract

Each question type should have it's own JSON/js file which the main script imports.
The data file should include tags for each question as well as question permutations (or rules for generating them, per question).

Renderers and marking engines are shared modules, not copied into question records. Generated output may be split into smaller files when the bank grows. Core and ESP have separate bank entry points within the Exam practice navigation group.

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

**Settled decision:** use Base64url (`A–Z`, `a–z`, `0–9`, `-`, `_`), preserving case. Nine characters encode a 54-bit payload exactly, without padding. An optional tenth character configures timing. Eight-character untimed codes remain readable and open a canonical new code; old nine-character timed share codes are superseded. Saved progress/JSON backups record `codeFormat:54`; older unmarked/48-bit records are explicitly migrated, preserving deadlines and scores. Nine-character pasted codes are never guessed to be old timers. This supersedes the earlier six-character hash and finite set-catalogue proposals. See the [rationale](implementation-plan.md#settled-set-code-decision).

**Current implementation:** pack fields in this order, most-significant bit first, and encode the resulting 54 bits in six-bit groups:

`[version:6][type:3][question1:12][variation1:3][question2:12][variation2:3][question3:12][variation3:3]`

Capacity: 64 bank versions, eight types, 4,096 question slots per type and eight variations per question. Type values 0=puzzles, 1=Core exam practice, 2=programming, 3=ESP practice;4 is reserved for future OS. Generation0 versions<=18 retain their original7+2 encoding; new releases begin at19. See [rollover and transition rules](code-rollover.md). Reserve question slot 4095 for an unused trailing position, with variation zero; this leaves 4,095 usable question slots per type and permits shorter activities. Reject gaps between used positions.

Question slots and variation positions are permanent identities. Corrections and refinements retain those identities: old codes open current content and show “This set has been updated since this code was created” when any contained fingerprint differs. Substantive changes to the task, assessed concept or required solution need a new question slot. Retire superseded questions to exclude them from selection while preserving direct access; remove only when they should no longer be accessible. Never recycle removed identities within a generation. Bank versions record content changes for notices and historical score metadata; they do not invalidate surviving identities. Revision 1 remains unsupported as previously agreed. Unused addresses can extend a revision; content edits create a new revision, styling does not. Normal updates refuse version overflow. Explicit rollover tooling implements six version bits and three bank bits, with generation/date-aware progress; see [bank rollover and progress](code-rollover.md). That policy supersedes the earlier permanent no-rollover requirement through the explicit rollover command.

The same question or question-set code must resolve consistently across clients, independently of source-file order. Permanent question slots and variation positions, with recorded compatibility metadata, provide this guarantee; do not derive identity from editable question text or guess a nearest code. This preserves the original deterministic-code and versioned-cache intent using the adopted mechanism.

The browser encodes eligible combinations directly. An optional generated index resolves bank/type/question/variation coordinates; it is not a catalogue of combinations. See the linked rationale.

Decode and validate version, type, question existence, variation existence, canonical unused fields, duplicate questions and activity composition/mark rules before displaying a set. Unknown versions may offer reload; never guess a nearest match. Validate an older set against its original composition metadata, then resolve its surviving identities to current content. A removed item produces an unavailable message and an explicit replacement-set action; never silently substitute questions.

Trim surrounding whitespace only; never lowercase, uppercase or silently substitute characters in the nine-character payload. Reject padding and invalid lengths. There is no checksum: some transcription errors can identify another valid set. Display decoded type/focus prominently and provide Copy code and Copy link controls.

Timed codes append `5`–`9` or `A`–`F` for 5–15 minutes. Parse the suffix by length, separately from Base64url decoding. Individual prefixed question codes retain their own format and do not take this suffix.

Share URLs use a fragment field to work on GitHub Pages without server routes, for example `#set=<code>`. Base64url uses URL-safe `-` and `_` in place of standard Base64’s `+` and `/`. Preserve case and both symbols through URL creation and parsing. Reject the standard Base64 alphabet rather than silently accepting two formats.

## Navigation and selection

Navigation should allow selection of question types and entry of a specific question set code directly from main page.

There should be a button for randomizing the question set ('get new question set') within a given question type and another button for randomizing within the question focus.

Selecting 'get new question set' should keep the same question type (puzzles, exam practice, programming) but alter the focus of the questions, e.g. don't pick permutations of the same question, but an entirely different set of questions of the same type and also randomize the chosen permutations of those questions.

Selecting 'get new permutation' should keep the same question type and focus, but alter the specific question permutations presented to the student.

For viewing a new question (sets) a simple rule such as: random (with selected type or focus constraint) + not just seen, could be a good starting point.

The selection table below elaborates these original requirements; it does not replace their constraints.

Home provides three type choices, focus selection, code entry and progress access. A shared question-set code form is also available on every page, including activities and progress. Invalid codes are reported beside that form; opening a different set preserves the existing unfinished-work confirmation. An activity shows its type, focus, code, total marks, estimated duration and timer control. Its breadcrumb segments are links; no separate back link duplicates that navigation. Question count, marks/points and estimated duration share the set-code toolbar row with copy and timer controls. The toolbar wraps on narrow screens without horizontal page scrolling.

**Proposal: three distinct actions.**

| Label | Selection rule |
| --- | --- |
| Get new question set | Same type, different primary focus and different question templates |
| New set in this focus | Same primary focus, different template combination |
| Get new permutation | Same ordered templates and focus; every question receives a different variation |

Choose randomly among eligible combinations from the versioned bank, excluding the current set. If no eligible alternative exists, disable the action with a short explanation. Do not silently relax the rule. This is the initial interpretation of “not just seen”; no long-term avoidance algorithm is needed.

Before replacing an unfinished activity, offer to keep working or leave it. **Proposal:** store one active activity; leaving marks it abandoned. Opening one question directly uses the same controls, records `activityKind: question`, and does not pretend it satisfies set mark limits.

## Marking and attempts

**Adopted exam-practice requirement — 7 October 2026:** useful automatic marking must be possible for every exam-practice question, including its substantive linked reasoning and judgement where assessed. Teacher evaluation of student work may supplement automatic results but must not be required for a useful result or completion. Author bounded, automatically checkable response structures; when free wording is unrecognised, provide an automatically marked clarification/retry path rather than a teacher-only dead end. Distinguish unknown wording from a proven error and assisted results from independent evidence. Automatic practice scores are not claims of official holistic exam marks. The [extended-response plan](extended-response-plan.md) applies this requirement; existing Core/ESP written-response formats need the [recorded compliance audit](planned-work.md).

Mark each part using its own rule. Scores are non-negative and capped at the part maximum. Blank answers score zero. Multi-select rules declare whether selection count is limited and how partial credit works. Dependencies and error-carried-forward credit are explicit, not inferred.

Check answer and Show answer buttons are hidden until the active attempt has a submission within the last four hours. Both are direct, one-click buttons. Submission records current answers and ends the attempt; automatic timer submission also unlocks review. Review access survives reloads for that four-hour window, then the controls and answer feedback are hidden. A restored completed attempt offers Submit saved answers to renew review for four hours without changing its recorded score or adding another record. Post-submission checks redisplay feedback without increasing attempt check counts. Retry creates a fresh attempt with review locked. Submission is idempotent: repeated clicks or timer events cannot duplicate records. Hints remain available before submission.

Record first-check marks per part, final marks, check counts, hint use and answer reveals. Hints used before submission flag the response as assisted. Revealing answers during review does not award marks or change the submitted record. Feedback distinguishes correct, partly correct, incorrect and blank, and gives a useful next step. After expiry, review is available; changing answers requires a new attempt.

## Timing and recovery

There should be a timed mode option that displays a countdown timer for the entire question set, with a configurable time limit (e.g., 5-15 minutes). When the timer runs out, the student's answers should be automatically submitted and scored.

Students should also be able to enable a timer on question sets whenever they want for their own practice.

The current timer suffix is the optional tenth character described above; countdown and accumulated practice time have separate purposes as detailed below.

Start hidden estimated-engagement tracking when an activity starts. Pause after 120 seconds without page interaction and when the activity is hidden; see [practice time](spec-progress.md#estimated-engaged-practice-time). Enabling a visible timer resets its elapsed-time origin and starts the selected 5–15-minute countdown, but does not reset accumulated engaged time. Record original start and reset time separately. Update the displayed/shareable set code with the duration suffix.

Persist answers, attempt ID, timing origin, deadline and last saved timestamp. Calculate remaining time from the absolute deadline; background-tab throttling must not extend the deadline. Auto-submit saved current answers when the deadline passes, including on return to the page. Do not announce every second to assistive technology.

**Proposal for the 45-minute rule:** an unfinished, untimed activity last saved more than 45 minutes ago is offered as a fresh attempt, with its old draft marked abandoned. A timed activity whose deadline passed is submitted as expired first, regardless of absence length. It may then be retried with a fresh timer. Within 45 minutes, refresh restores the original timing origin and answers.

Stopping or restarting a visible timer is allowed for practice; enabling again starts the selected duration anew and preserves timing events. Retain total elapsed time and elapsed time since the latest countdown origin for compatibility. Current UI practice durations use estimated engaged time when available, explicitly distinguishing older elapsed-time records. A separate `timingAdjusted` reporting flag remains a proposal.

## Progress, profiles and exports

The adopted [progress specification](spec-progress.md) defines dated topic/subtopic records, named local profiles and last tracked dates, idle-aware estimated practice time, RAG/missing/stale priorities, persistent three-set recommendations, weekly statistics and trends, and validated JSON restore with automatic profile switching. It supersedes the previous parent-level priority-window and manual profile-switching rules. Existing aggregate-only history remains intact without invented subtopic evidence. CSV import and the other explicitly listed backlog items remain unimplemented.

## Implemented repeat-attempt policy (15 September 2026)

Progress is recorded only when an attempt starts at least four hours after the most recent completion of that exact set. Students may practise sooner with a notice and an untracked result; those results do not enter charts, averages or revision priorities. Every completion, including untracked practice, updates the last-practice date. Under the agreed [rollover policy](code-rollover.md), exact-set comparison must also include generation. Timer suffixes and question order are ignored for this comparison; different variations remain distinct sets. Eligibility is fixed at the start of the attempt. JSON backups include recent-practice dates as well as tracked results; legacy backups remain accepted. Reloading and resubmitting a completed attempt does not create a new completion or move the gap.

Production build details and the client-side obfuscation boundary are documented in README.md. Display data, marking data and reveal text are separate; ordinary checking must not decode model explanations. Content fingerprints identify changed variations for the discreet update notice; they do not invalidate codes. Removal produces an unavailable message with a replacement-set action. See README.md for the codes:update workflow.

## Shared-code diagnostics and regression checks (20 September 2026)

The footer identifies the loaded application asset and bank revision. Since production app and bank assets have content-based filenames, the application filename distinguishes builds even when additions retain the same question revision. A malformed, unsupported or unavailable code entered through either form, or a failing shared link, offers Copy error details. This explicitly copied report includes the entered string and Unicode character values, decoded code fields where possible, the error, build, bank revision, page origin/path and browser identification. It excludes answers, progress history, local storage and URL query strings. It is not sent anywhere automatically.

The current encoding uses nine case-sensitive Base64url characters (54 bits) with an optional tenth timer character; the legacy-format rules above apply. No automatic case changes or lookalike-character substitutions are made. Sharing tests exercise actual activity-start and copy-button handlers, open the resulting code in another browser context without shared storage, and compare the displayed questions. They also cover timers, single-question codes, shared links, malformed-input diagnostics and the existing compatibility tests. Copy-button tests capture the exact clipboard-write argument; they do not access the operating-system clipboard.

`scripts/audit-shared-codes.mjs` extracts the saved 14 September commit `45cc13e` into a temporary directory, tests its own encoder/resolver and bank, then audits the current bank. It leaves the working checkout unchanged. Passing these checks does not identify the earlier classroom failure or prove that this commit was the deployed classroom release. The exact failing code, error and loaded release remain unknown.

## Student issue reports

One footer button is available on every page. On an activity page, students choose Bug or Content issue; content reports require one or more items selected from the current set. Elsewhere the form offers Bug. A description is required, with a 1,500-character limit. Closing the dialog preserves the activity; its timer continues normally.

A preview includes the description, selected item numbers/titles/exact question codes, current set code when visible, page link, build/bank identifier, browser and report time. Bug reports also include any currently visible code-entry diagnostics. Saved history and answers are not collected. The recipient stays blank: students address the draft to their teacher.

Open email draft uses a percent-encoded mailto subject/body with CRLF line endings. The student reviews and sends through their configured email app; the site neither sends nor claims delivery. Copy report provides a fallback for missing email handlers or client URL-length limits; if clipboard access fails, the preview is selected for manual copying. No server, reporting account or new dependency is required.

## Leaving an activity

Warn only when the currently visible activity has entered, unsubmitted answers or puzzle work. Show the warning before navigating to another page or replacing the set, with Keep working and Leave activity choices. Starting from Home/Progress must not warn about a saved activity. Empty activities and submitted work do not warn. Puzzle selections, givens and undo history alone do not count as answers; entered notes and moves do. Cancel preserves the visible activity, route and answers.

### Attempts spanning content updates

Store the bank revision used by the active attempt. If its questions change before it is resumed, start fresh instead of grading saved answers against changed questions. Keep existing history untouched. New results use a code for the revision actually marked; the shared code displayed on the activity remains the code entered. Repeat-attempt identity follows permanent question/variation addresses across revisions, including earlier saved recent-attempt keys. Historical imports use their original focus/marks metadata.

### Exam navigation and future OS banks

Exam practice is a navigation group, currently containing independent Core and ESP banks (`js/exam-sections.js`). Future Year 2 OS must receive its own bank with at least the same question-slot capacity as puzzles and programming; never divide the Core or ESP slot allocation between sections. The earlier four-ID limit is superseded by the implemented six-version-bit/three-bank-bit layout described above, preserving 4,095 usable question slots per bank. Four banks are currently used and ID 4 is reserved for future OS. Follow the explicit format-migration and rollover/progress rules in [bank rollover and progress](code-rollover.md); do not assume the two nine-character layouts are automatically distinguishable. See the [navigation and capacity review](reviews/2026-09-28-navigation-wording-search.md).

## Key-term search (6 October 2026)

This section is the current search decision record. It supersedes the bank-scoped, single-focus starting proposal in the [28 September review](reviews/2026-09-28-navigation-wording-search.md#search-discussion). Distinguish the user's requested experience from the interim implementation below.

### Decisions and rationale

| Choice | Rationale | Status / provenance |
| --- | --- | --- |
| Search all questions from every entry point; helper says “Search all questions”. | A student should not lose relevant results because they started from a particular activity page. | Explicit user decision; implemented across the four available banks. “All” means authored available questions, not future CA3–CA8/OS content. |
| Allow a term to span topics where the connection is real. | The user values meaningful links across topic boundaries; a search term is not necessarily a single focus. | Explicit user direction; discovery spans topics now. Current playable sets still stay within one focus/ESP recipe. |
| Use CA tags to connect curriculum terms to programming practice as well as Core questions. | A programming question can practise the searched specification concept even if its activity type or title differs. | Explicit user decision; implemented using reference descriptions and authored metadata. Broad tags do not establish every child concept. |
| Use one code-or-key-term field on Home and question-set pages. Remove the separate activity search field. | Reuse a familiar entry point and preserve the uncluttered space below the header. | Latest user placement decision; implemented. Supersedes the earlier separate left-hand search field. |
| Show the number of matching questions and let students work through the results three at a time, with a final batch of one or two when needed. | Gives students a bounded starter-sized activity while allowing them to work through all matches, including the remainder. | Explicit user request; **queue not implemented**. Three is the requested batch size, not an unanswered preference. Applying this to programming requires changing its current two-question composition rule. |
| Search assessed metadata, with bounded aliases; do not use answers, distractors or incidental prompt/code words as relevance evidence. | Mentioning a term does not mean a question assesses it; results should reflect the real connection requested by the user. | Implementation/design choice supporting relevance, not a claim that the user prescribed the matching algorithm. |
| Valid codes take precedence; ambiguous invalid code-looking input keeps diagnostics and offers a search fallback. | Preserve reliable teacher-shared codes while supporting ordinary search terms in the same field. | Implemented interaction choice. A code-looking search term may require selecting the fallback. |

### Current implementation

Find practice by key term is available from Puzzles and Programming cards, the Core/ESP section cards and activity controls. Every entry point searches all four implemented banks, including older bank-specific search links. Results group matching questions by focus (and ESP recipe), show counts and example question titles, and disclose related-question fill before starting a set.

Match only authored topic/skill tags, titles, explicit keywords, focus/recipe labels and specification references. For Core, use the exact part-level reference and element keys to obtain topic labels from the cached curriculum inventory. Do not index prompts, code, hints, options, answers or reveal text. ESP skills apply only to their authored variation. A small separate alias map handles terms such as loops/iteration and dict/dictionary; it is not unrestricted language understanding. Matching ignores case, normalises punctuation, accepts word prefixes of at least three characters and requires every search term to match the same variation. Specification references match themselves or their descendants, not similar-numbered siblings. References and topic metadata rank before title-only matches.

Sets retain complete questions and one focus, normal question counts, actual selected-variation mark limits and distinct programming formats. ESP sets retain one recipe and a common variation. Maximise the number of matching questions before adding explicitly labelled related questions from the same focus/recipe. If no valid set includes a match, show an unavailable result and ask the student to broaden the search. Do not silently reduce match quality to manufacture another set.

The active attempt stores its search query and result group as selection context. New set in this focus and Get new permutation preserve that context; permutations retain ordered templates and change every variation. Disable either action when no compatible alternative exists. Other matching topics returns to the results. Changing the ordinary topic/subtopic/recipe/challenge filters starts their usual selection and clears search; enabling sequence mode or using Clear search removes the constraint without replacing the current answers. Search state survives reload and remains isolated by local profile. Shared codes/links contain only the normal concrete question/variation identities; a recipient gets the same questions without inheriting the sender's search filter.

Search metadata is separate from marking and does not change question IDs or content fingerprints. `npm run search:index` regenerates the compact Core topic lookup from `data/coverage/core-inventory.json`; production builds check its freshness. `data/search-keywords.js` supplements missing assessed programming tags. Metadata coverage limits search recall: this is not a full-text question or answer search.

### Search entry points refinement

The Home hero and existing top-strip code field both accept a question/set code or a key term through the same handler. Keep the top strip's left side empty; do not add a separate activity search field. Label the shared field “Code or key term”, with placeholder “Enter code or key term” and helper “Search all questions”. Home retains “or enter key term to search for” below the code-format guidance. Valid existing codes open directly. Ordinary words and references search every bank; results identify their bank. Invalid code-looking entries retain code diagnostics and offer an explicit search fallback. Leaving an unfinished activity retains the existing confirmation.

CA tags on programming and other non-Core questions match explicit references and curriculum descriptions for the tagged subsection and parent headings. A broad tag does not inherit every child concept: CA2.3 alone does not establish a dictionary or array match. Exact Core coverage still uses part-level element labels. For example, searching “data type conversion” returns relevant Core and CA2.2.9-tagged programming questions. Search relevance adds no assessment credit and changes no progress attribution.

### Requested next behaviour and remaining design work

Implement the requested result queue in batches of three, with a smaller final batch. The intended interpretation is to work through each matching question once per traversal, selecting a matching variation rather than counting every permutation as a separate result. Show total matches and batch position. Do not pad the final batch with nonmatching related questions. These queue details are the proposed implementation of the user's request; the current related-fill selector is an interim limitation, not the agreed destination.

Cross-topic discovery is settled. The user has expressed the value of real cross-topic links and asked about progress implications, but has not explicitly settled whether a single playable batch should mix activity banks. Keeping banks separate was the assistant's recommendation, not an approved user restriction. Resolve bank ordering/grouping and ESP scenario/recipe coherence during queue design; do not turn the old same-focus constraint into a permanent search rule. Changes to programming's two-question rule, mark bands and shorter-set validation are implementation work required by the requested batches, not grounds to describe the requested size as undecided.

### Progress implications of mixed-topic batches

Global discovery and CA-term matching currently change no stored scores, progress attribution or question identities. A tag used to find a question is not proof that each of its marks assesses that tag. Preserve that distinction when implementing the queue.

The following are identified requirements/recommendations for queue design, **not completed progress changes or newly approved scoring policies**:

- Attribute marks to the question/part actually assessed. Core already records part-level CA references, but validation currently requires them to belong to the set's parent focus. Programming currently attributes parts to the set's named focus; mixed-focus batches need question-specific attribution. Do not simply copy the entire batch score into every matching topic or CA tag.
- Keep revision evidence specific: 4/4 on arrays and 1/4 on iteration should contribute 100% and 25% respectively, rather than 62.5% to both. Search aliases and related CA labels must not create duplicate evidence. Puzzles remain excluded from revision priorities.
- History should identify all assessed topics while counting the completed batch and its time once. Preserve first-response/assisted distinctions, local-profile isolation and existing history/backup compatibility.
- Decide and document weekly-score weighting for unequal batch sizes. The current weekly mean gives each activity equal weight; a one-question remainder would count as much as a three-question batch. A mark-weighted alternative was discussed as a design choice, not adopted.
- Review the four-hour repeat rule: current identity is based on the concrete set, so regrouping the same questions can bypass it. Decide how repeated question/variation evidence should count without duplicating progress.
- Keep shared codes tied to concrete questions and variations, not a live search result that can change as content grows. Validate mixed-focus/shorter batches and round-trip sharing before release. Search state and queue position need their own resume behaviour; they are not currently encoded in shared set codes.

Next implementation step: design the queue's bank/recipe composition, concrete set validation and per-question progress attribution together, using the requested three-question batches and smaller remainder as the starting requirements. The unresolved bank-mixing and scoring-policy details must be stated explicitly rather than inferred from global search scope.

## About page (6 October 2026)

The footer links to the SPA route `#about`. Keep this page brief: explain short, varied practice and feedback for DSD T Level students; summarise the current roadmap without promising dates; credit Joe Hudson and explicitly acknowledge extensive agentic development combined with expert human input. Roadmap copy distinguishes planned features from available activities. Retain the normal unfinished-answer navigation protection.
