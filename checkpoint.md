# Tolerant concept prefixes and equivalent alternatives — 22 September 2026

Exam concept groups now opt into up to three descriptive prefix words, with negating/contrast/combined-answer prefixes rejected. A permitted suffix remains optional. Standalone `or` separates alternatives that must all pass independently; empty or incorrect operands fail. Explicit authored phrases remain atomic. Function/procedure concept questions are opted in; Python function-name and code tasks stay exact. Set `prefixWords: 0` or omit it for strict groups. This deliberately tolerates imprecise non-negating descriptors, as agreed with the teacher.

Checks passed: 18 focused term-rule, packed-bank and existing alternative-answer tests, including positive/negative prefix cases, equivalent versus guessing alternatives, and both raw and packed marking. Coverage/compatibility generation, whole-bank model validation, production build and diff whitespace checks pass. No browser or full-suite run, as requested. Source and `live/` are synchronised; work remains uncommitted.

---

# Labelled answer reveals — 22 September 2026

Show answer now uses the same `a)`, `b)`, etc. labels as the question parts. Each list item presents the model answer in bold, its explanation on a separate line, and spacing/dividers between parts. Removed repeated question prompts and the extra punctuation previously appended to answers. Multiline answers preserve line breaks; interactive puzzle solutions remain inside their corresponding item.

Added `written representation` and its plural as accepted synonyms for `written description` in both variations of exam slot 3, part e (CA1.1.9). This is an equivalent name for the existing plain-language representation task; marks, source mapping and demand are unchanged. Compatibility advances to revision **8** for these two variations; unchanged historical entries remain usable.

Checks passed: 17 focused marking/packing/alternative-answer tests, explicit synonym acceptance and rejection in both variations, coverage generation, compatibility/content validation and production build. Targeted browser checks cover both exam variations plus a Python challenge: matching labels, model answers, explanations, full-credit scoring, reveal focus and desktop/320px reflow. Desktop/mobile screenshots were inspected. Work remains local and uncommitted; teacher subject approval remains pending.

---

# Context and conceptual answer rules — 22 September 2026

Implemented the agreed whole-answer rule: exactly one authored key term/synonym, optionally followed by one qualifier linked to that term group. Rules are opt-in for case-insensitive conceptual text parts; code, identifiers, choices and literal outputs retain their existing marking. Explicit irregular alternatives and sentence normalisation remain supported. Qualifier lists are reused, with permanent slot/part/variation assignments and expected-answer guards in [exam-term-rules.js](data/exam-term-rules.js). Rules are sealed in marking payloads, validated and included in compatibility fingerprints.

Reviewed term answers across the CA1–CA2 bank. Added rules to **336 parts** and clarified **106 prompts** across **62 templates / 124 variations**, without changing marks, code, answer values, coverage, hints or explanations. Examples include real/floating-point for data types, modular design, logging, sequential search, memory usage, elapsed time and hyphenated box-testing names. The float conversion function stays exact. Category wording now specifies control structures, problem-solving steps, variable naming and validation where needed; neighbouring-part answer leakage was checked. See [review evidence and limits](docs/exam-term-review.md).

Checks passed: **100 tests**, coverage generation, compatibility update, all-model validation and production build. Full isolated browser smoke passed, including 12 synonym/rejection submissions across both variations, sharing, timer/storage, hints/reveals and 320px layout. An initial navigation race in the added browser test was corrected before the successful rerun. The mobile result screenshot confirms “real number” and qualified type names earn credit. Question revision **7** preserves unchanged historical entries and explicitly rejects changed entries under the existing policy. Generated coverage is unchanged; `live/` and compatibility records are updated.

Work remains local; no commit, push or deployment. Teacher subject review and classroom calibration remain pending.

---

# Sequential exam sets and descriptive titles — 22 September 2026

Added optional **In sequence** exam navigation. It advances both new-set controls through selectable subtopics in specification order, crosses topic boundaries, preserves the visible Topic/Subtopic cursor and stops at the final available subtopic. Shared set/question code formats are unchanged; sequence preference remains local attempt state and is not encoded. Adjacent subtopics may retain their only best whole-question combination while changing qualifying variations. The control has a hover/focus tooltip, and focused-set guidance and matching-part labels are compact disclosures or badges.

Retitled expanded exam slots 100–125 after reviewing every part in both variations. Removed all generic `CAx.y · Applying ideas N` titles and replaced them with concise descriptions of the assessed concepts, without changing prompts, options, answers, hints, coverage, slots or variation positions. Titles are fingerprinted user-visible content, so the 52 affected variations create revision **6**; unchanged older entries remain compatible. Teacher subject review and classroom wording calibration remain pending.

Checks passed: focused expansion and sequence tests, all **92 tests**, coverage generation, identity/content validation and production build. Browser checks confirm bank 6, a retitled packed question, tooltip visibility on hover and keyboard focus, selector alignment, compact disclosures and selected-subtopic labels above question text. Generated `live/`, compatibility and coverage files are updated. No commit, push or deployment was performed.

---

# Streamlined checks, four questions and home emphasis — 22 September 2026

Persisted the adopted smaller check set and escalation conditions in [content-refinement.md](docs/content-refinement.md): focused answer/reference checks, coverage/identities/content validation and build for bank-only edits; targeted previews when needed. Shared behaviour changes or relevant failures justify broader checks. A small cosmetic change gets an affected-view preview, not an automatic full regression run.

Added slots 157–160: input/output, selection/sequence, reusable-code sources and investigation. Each has two variations and six one-mark parts. Bank now **112 exam questions / 628 paired parts**; two-question coverage **263 → 285**, with 56 elements still at one question and 28 practice-only. Original questions remain unchanged; additions extend revision 5. Source/angle evidence is appended to the existing expansion review.

The home exam card gains a blue border and subtle shadow through one commented `.activity-grid > .type-card.type-1` rule in `css/styles.css`. Delete that rule to restore equal card styling. No DOM, order or interaction changes.

Checks passed: two focused tests, reference execution, coverage/identity/content validation, production build; targeted browser scoring/hints/reveal for all eight new variations and desktop/mobile/keyboard home preview. No full suite or whole-bank smoke. Generated live files are updated. All work remains local; no commit/push/deployment. Teacher review and classroom calibration remain pending.

---

# Bounded priority expansion — 21 September 2026

Completed the agreed eight questions, slots 149–156, each with two variations: function/procedure development and debugging first, then decomposition, searching/sorting and maintainability. Added 47 paired parts (94 instances). Exam bank: **108 questions / 604 paired parts**. Full bank: 621 templates / 1,381 variations. Original questions are unchanged; additions extend revision 5. Preview: `CpKglgRQ`.

Code tasks assess headers, bodies, expressions, calls and repairs separately. Required identifiers/forms keep answers bounded; token matching accepts spacing and quote variants, never executes student code. Independent Python tests assemble the authored answers and check boundaries, outputs and list effects. Scaffolded code development remains supporting practice. Coverage links remain within the selectable topic so progress exports retain their existing validation contract; selection within functions is assessed under function interpretation/debugging.

Two-question coverage rises **224 → 263 of 369 elements**, including **28/28 searching/sorting elements**. Remaining: 78 with one direct question, 28 practice-only; teacher approval and timing trials remain pending. Source/angle evidence is appended to [the existing review](docs/exam-depth-review.md), avoiding another guide.

Checks: all 88 tests, content/coverage/identity validation, build and full browser smoke pass. Browser checks explicitly cover both variations of each new pair, scoring, hint/reveal separation and 320 px layout. The first pair was saved/validated/built before the remaining six were authored; reporting then caught up with pair-by-pair browser results. All work is saved locally; no commit, push or deployment.

---

# CA1–CA2 further exam coverage — 21 September 2026

Confirmed from the pre-caution snapshot that only hints changed for slots 1, 5, 8, 44 and 49. The shared rule now explicitly confines reading cautions to hints. Added **23 questions / 46 variations / 290 part instances**, slots 126–148, across all 15 broad CA1–CA2 topics; the original 77 questions remain byte-for-byte equivalent as data. The exam bank is now **100 templates / 557 paired parts**. Full bank: 613 templates / 1,365 variations. Additions extend revision 5 without changing existing identities; all 154 prior exam variations still resolve.

The [expansion review](docs/exam-depth-review.md) records specification/SAM evidence, comparisons and new angles. Tasks include state tracing, capacity decisions, unsafe reuse/optimisation, file effects, interface diagnosis and interpreting test evidence. Generated coverage rises from **23 to 224 elements with two distinct direct questions**. Still outstanding: **117 with one direct question, 28 supporting-practice-only**; no teacher-approved complete elements. This is progress towards the two-question target, not completion. No CA3–CA8 expansion is included.

Validation: 86 tests, independent Python reference execution, all authored aliases, linked reasons, content/coverage/identity validation, zero hint-audit errors and production build pass. All 46 added variations passed browser checks for prompt/code fidelity, model scoring, hint focus, reveal separation and 320 px reflow; full browser regression also passes. Prior puzzle repetition warnings are unchanged. Updated tests whose old fixed-bank assumptions no longer hold. Teacher review and classroom timing/hint trials remain pending. Preview example: `CpEkHQDx`. No commit, push or deployment.

---

# Reading cautions and future coverage — 21 September 2026

Teacher clarification is recorded in the shared authoring/refinement guides: hints address likely misreadings; coverage additions must document the gap, existing-question comparison, distinct angle and SAM-calibrated demand. Added cautions to both variations of exam slots 1, 5, 8, 44 and 49; no prompts, answers, marking or coverage changed. Technical symbol names are encouraged without rejecting existing accepted shape aliases. Revision 5; example `CoAkAiAg`. Content validation, 83 tests, build and browser smoke pass. Teacher approval/student trials remain pending; no coverage expansion or publication performed.

---

# Content guidance and hints — 21 September 2026

Shared [authoring](docs/content-authoring.md) and [refinement](docs/content-refinement.md) guides replace duplicated rules. Reviewed all exam/puzzle hints: revised 77 exam templates (154 variations) and 158 puzzle templates (230 variations). Other assessment data is unchanged. Logic hints use visible constraints; Go anchors identify existing groups. Generators/import inventory preserve edits. Repeated strategies remain where applicable to the same constraints, geometry or sequence rule; 30 audit groups were reviewed.

Grounding: specification 1.1; SAM Paper 1 questions/mark scheme 1–3, 7–8 calibrate terminology, short responses and distinct marking points. Assessment was not rewritten. Teacher approval and student trials remain pending.

Checks: 83 tests, content/coverage/identity validation, 420 grid variations, 1,528 Go positions, build and browser smoke pass, including hint focus/reveal separation/mobile. Revision 4; current example `CIAkAiAg`. No commit/push.

---

# Unsubmitted-answer navigation warning — 21 September 2026

- The leave warning now requires the activity to be visible, unfinished and contain entered answers or puzzle work. Saved unfinished activities no longer trigger a warning when starting from Home/Progress. Empty activities, whitespace-only answers, submitted work and puzzle UI selections alone do not trigger it.
- Navigating from an answered activity to Home/Progress or a different set prompts before replacing the visible activity. Cancel restores the activity route and preserves answers. Replacement controls and same-tab external links use the same condition; links opening another tab do not leave the activity. Skip-to-content simply focuses main.
- Puzzle checks include candidate selections/exclusions, entered grid values/notes, paths, placed pieces and Go moves/pending attempts; givens, selection state, undo history and reset-only state do not count.
- Validation: all 81 tests pass; full browser smoke passes, including explicit blank/home navigation, entered-answer cancellation/confirmation, unchanged answers, and the prior filtering/reporting/sharing/puzzle checks. Rebuilt live/ locally. No commit or push performed.

---

# Local commit-time builds — 21 September 2026

- Application builds now output tracked `live/`, replacing ignored `_site/`. `npm start` serves `live/`. Existing docs remain documentation.
- Enabled `core.hooksPath=.githooks` in this clone. New clones run `npm ci` and `npm run hooks:install` once. The executable pre-commit hook invokes scripts/pre-commit-build.mjs; it exports the Git index into a temporary directory, uses installed local dependencies, builds there, then replaces and stages live/ only after success. Unstaged source is not published or staged. Failure blocks the commit. A staged lockfile differing from the working lockfile is rejected; run npm ci after dependency changes.
- esbuild preserves dependency symlink paths so temporary-index builds and ordinary local builds have matching hashes. Verified the full project through the hook in an isolated Git repository; output HTML matches the normal local build.
- GitHub workflow now only checks out committed files, uploads live/, and deploys Pages on main pushes/manual main runs. No dependency installation, application building or tests on GitHub. Keep Pages source set to GitHub Actions. Local full tests/coverage/puzzle checks remain explicit authoring checks; the hook runs bank identity and bank validation through the build.
- Validation: all 78 tests passed; after the dependency path adjustment, production build and hook tests passed again. Hook regression covers partial staging and failed-build preservation. Generated live/ is ready to commit along with source/config changes. No commit, push or deployment performed here.
- This supersedes prior checkpoint instructions to preview/deploy _site and run builds in GitHub Actions.

---

# Student issue reports — 21 September 2026

- Added one Report an issue button in the shared footer. Activity pages offer Bug or Content issue; content reports require one or more current questions/puzzles/challenges. Other pages offer Bug. A nonblank description is required (maximum 1,500 characters).
- Preview gathers selected item numbers/titles/exact permutation codes, visible set code, page link, build/bank identifier, browser and timestamp. Bug reports include currently visible code-entry diagnostics. No saved progress or answers are automatically included. Report context is captured when the dialog opens; the activity and its timer continue normally.
- Open email draft creates a standard mailto URL with an encoded subject and body, using CRLF line endings. Recipient remains blank by explicit user preference; students know their teacher’s email address. Outlook is the likely classroom handler but is not guaranteed, so this remains client-independent. The student reviews and sends; the site does not send or confirm delivery.
- Copy report supports other email setups and incomplete/blocked mailto handling. If clipboard permission is unavailable, the preview is selected for manual copying. No backend, reporting account, automatic transmission or dependency added.
- Validation: all 77 automated tests pass, production build passes and full browser smoke passes. New checks cover multiple selected items, required selection, exact context, clipboard failure, 320px dialog layout, home-page context and preservation of the active attempt. Unit tests check email field escaping (including Unicode and header-like text) and newline formatting. No real email was opened/sent; the classroom Outlook/default-handler integration still needs a manual check.
- Documented in docs/spec-common.md. Changes are local and undeployed. CA6 content remains the next content task.

---

# Whole-question filtering and shared-code audit — 20 September 2026

- **Fine exam filtering is implemented.** Topic selects x.y; Subtopic selects x.y.z and deeper authored references, with counts of distinct matching questions. The filter preserves entire questions and their linked parts. It maximises matching questions in a three-question set and fills any shortage with explicitly labelled related questions from the same topic. Matching parts are highlighted. Example: CA1.2.3 selects its two matching questions plus one related CA1.2 question.
- New set with this subtopic retains the selection; permutations preserve the templates and matching variations. Changing topic / requesting a different topic resets to All. Cancellation preserves the previous attempt/filter; refresh restores it. Set codes retain exact questions and variations without encoding the UI filter, so recipients open the same questions independently of their preferences. Scoring still uses each part's coverage, never the selected filter.
- Existing question identities and bank revision **3** are unchanged. No content added or revised for this task; the bank remains 590 templates / 1,319 variations. CA6 content is the next requested development stage and has not been started here.
- **Code audit:** `scripts/audit-shared-codes.mjs` checks saved commit `45cc13e` (14 September) in an isolated temporary checkout and the current authoring bank. The archived release passed 417 individual variations and 2,240 generated/timed set checks; the current bank passed 1,319 individual variations and 3,520 generated/timed set checks. No encoder/resolver mismatch was reproduced. We cannot establish that this commit was the exact classroom deployment, and the original failing code/error/build remain unknown. Do not describe caching, transcription or architecture as the established cause.
- **Browser verification:** actual UI-started activities and Copy code / Copy link handlers were exercised for puzzles, exam practice and programming. Their exact strings opened matching question text in a separate browser context with independent storage. Timed codes, individual codes and link navigation also passed. The test intercepts the clipboard-write argument rather than reading the OS clipboard. This was Chrome on the development Mac, not a physical Windows classroom test.
- Footer now shows the loaded application asset/build and bank revision. Home/global code-entry errors and link errors offer **Copy error details**: entered text, Unicode character values, decoded fields when possible, error, build, bank revision, page origin/path and browser identity. No answers, history, storage or query parameters are included; nothing is transmitted automatically. Link-start errors are awaited and handled through the visible error path.
- **Validation:** all 74 automated tests pass; content/identity validation and production build pass. Browser smoke passes fine filtering, cancellation, refresh, permutations, related-question labels, intact parts, 320px layout, sharing across independent contexts, diagnostics and all earlier progress/puzzle checks. Screenshot: `/private/tmp/starters-exam-subtopic-mobile.png`.
- Updated `docs/spec-exam.md` and `docs/spec-common.md`. Changes remain local and undeployed; preview serves `_site` at `http://127.0.0.1:8765`.

---

# Detailed progress tracking — 20 September 2026

- Agreed policy: **only attempts containing the new `partScores` breakdown contribute to revision priorities**. Existing aggregate-only records are left untouched and remain in history, charts, averages, exports and four-hour repeat eligibility checks. There is no per-user migration, redistribution of old marks, date cutoff or persisted migration flag. Reopening a completed old attempt does not upgrade it.
- New exam/programming submissions snapshot question slot/variation, part ID, reporting references, final marks and eligible first-response marks. Exam references come from each part's explicit coverage mappings (CAx.y.z, or CAx.y.z.w where authored). Multiple subelement letters under one reference do not create extra credit. Programming retains its existing named focus because its tags are not part-level curriculum mappings. Puzzles remain excluded.
- Whole questions stay intact. For a part mapped to several distinct subtopics, divide both earned and available marks equally. Broad-topic totals count the original part once, never the original plus its child allocations. Percentages are calculated from summed marks, not averaged percentages.
- Apply history filters, then choose the latest five eligible detailed attempts with unassisted evidence per broad topic/programming focus. Both broad and fine views use the same parent window. This deliberately avoids different parent/child time windows; older evidence for an otherwise-unseen subtopic can fall out of that common window.
- Existing assistance and repeat rules remain: a question assisted before its first check contributes no first-response marks; early repeats do not enter history. Final results remain visible. An unfinished older activity submitted under the new code can receive detailed scores.
- My progress now has Topic / programming focus and Exam subtopic priority views, with contributing attempt counts and assessed marks. Fewer than three attempts OR ten marks is labelled Limited evidence. The page explains why earlier records do not affect priorities.
- JSON backups preserve the recorded breakdown. Import accepts legacy absence but rejects malformed detail, duplicate coordinates/references, invalid/out-of-parent references and inconsistent mark totals before any write. CSV includes first-response totals and the breakdown in a quoted JSON cell; restore remains JSON-based.
- Regression coverage includes the agreed example: an old 20/20 remains in history; a new detailed 3/5 gives 60% in priorities, with no inherited or guessed historical marks. Tests also cover equal splitting, repeated references, parent/child conservation, common recent windows, assisted scores, repeat eligibility and every current exam/Python variation's portable record.
- Validation: all 70 automated tests passed (the production-artifact check was rerun alone after concurrent builds interfered with its first run); content/coverage checks and production build passed. Browser smoke passed detailed topic/subtopic display, mixed legacy/detailed backup restoration, rejection of malformed part scores, reload/repeat behaviour and the prior activity interactions. Screenshot: `/private/tmp/starters-subtopic-progress.png`. Changes remain local and undeployed.
- This changes progress reporting only; finer filtering of the activity question bank is still a separate task. The agreed direction for that is to retain whole questions and select questions containing the chosen subtopic.

---

# Content expansion and challenge selector — 20 September 2026

- **590 templates / 1,319 variations**: 450 puzzles (50 in each of nine subtypes), 77 exam questions, 63 Python challenges (five variations each). Changes are local, not pushed or deployed.
- Programming adds varied output, completion, repair, data-structure, string, array, match/case, exception, scope, sorting, file-operation, testing, code-style and validation tasks. Check-digit generation and its inability to detect digit swaps are explicit. Bounded answers remain the assessment model; no student Python execution.
- Exam adds 26 two-scenario templates with 137 new paired parts. CA1/CA2 report: **341 direct live elements, 28 supporting-practice-only, 0 uncovered, 0 teacher-approved complete**. The broad independent-development/diagramming skills are deliberately not claimed as fully assessed. Only 23 elements currently have two distinct live question templates; this remains a later coverage target.
- Puzzle levels: Foundation, Standard, Stretch and Mixed challenge. Each question carries `challengeLevel` plus `challenge:<level>`. Selector constrains new sets; shared codes open their exact questions; replacement cancellation and reload preserve state. Unavailable levels are disabled; changing focus falls back to mixed if necessary. Labels are provisional; especially tangram compactness and Go tree-depth proxies need classroom calibration.
- Six board families append 45 fixed, checked boards each. Existing five templates and their variations are retained. Foundations include 4×4 cages and 40-given Sudoku; stretch includes 6×6 cages, eight-variable equations, reduced-clue Sudoku and larger paths. Tangrams have 70 distinct silhouettes across all variations, even after rotation/reflection. Added sequences use nine clearly stated rule families; maths adds 20 problem designs with five variations each. Existing 50 Go problems are retained and labelled.
- `scripts/expand-puzzles.py` and `scripts/refine-puzzles.py` reproduce board additions. New original sequence/maths content is in separate authoring modules. Offline Python references live in `data/coverage/python-reference.json`, excluded from the student bank.
- Existing question fingerprints remain unchanged. Content revision stays **3**; all previously valid current-revision codes still work. Challenge selection metadata is excluded from identity hashes. Token comparison now supports method dots and augmented floor/power operators without executing input. Python set selection excludes same-format pairs.
- **63 Node tests pass**, content/code/coverage validation and production build pass, and independent Python solvers validate **420 grid/geometry variations**. Browser smoke passes all prior interactions plus challenge filter/cancel/reload/320px layout and the arrays/validation focuses. Screenshots include `/private/tmp/starters-challenge-filter-mobile.png`.
- Local preview server: `http://127.0.0.1:8765`, serving `_site`. Browser checks use an isolated Chrome profile, not the user's browser data.

---

# Separate on-demand banks — 15 September 2026

- Production emits `banks/puzzles-<hash>.txt`, `banks/exam-<hash>.txt` and `banks/python-<hash>.txt`; the app bundle contains URLs and the loader, not bank payloads. Relative URLs work under the repository Pages path.
- Selecting an activity or entering a code fetches only its bank. Display data is reused in memory; answer payloads remain encoded until checking/reveal. An active saved attempt loads its bank on startup; a fresh home/progress page loads none.
- Failed fetches/decodes can be retried; saved attempts are preserved after a network error. Concurrent requests share one download. Content/code revisions are unchanged by this packaging change.
- 57 Node tests pass, including separate-artifact and loader/cache/retry checks. Production browser checks pass, including saved attempts, codes and progress imports. Changes are local, not deployed.

# Local implementation checkpoint — 15 September 2026

- Four-hour gap from the last completed attempt to the next tracked start for the same exact set; timer/order ignored, permutations distinct. Early practice scores are shown without changing progress; recent practice dates are included in JSON backups. Legacy tracked attempts keep their status.
- Applied classroom review to 52 exam parts in both variations and further wording/accepted-answer fixes. The encoding layout and slots are unchanged. The teacher agreed to selective compatibility: content revision 3 accepts the 344 unchanged revision-2 variations and rejects the 73 altered ones. Updated example: BoAkAiAg. Use codes:update after future content edits; docs/build-only changes do not affect revisions.
- Build uses pinned esbuild and fflate: compressed/Base64 display banks with a reversible 17-position alphabet rotation, separate per-part marking and reveal payloads, and a separately encoded Go playing tree. No plaintext authoring banks or source maps in `_site`; authoring files remain in Git. Decoding is temporary and model explanations are decoded only for reveal.
- Use `npm ci` then `npm start` to build and serve `_site`. Serving repository-root HTML is no longer the preview workflow. CI installs JavaScript dependencies before validation/build.
- 55 Node tests pass, covering packed/source parity, production artifacts, selective code compatibility, four-hour boundaries and marking alternatives. Browser checks pass against the built site; validate/build pass. These changes are local and have not been deployed by the assistant.

# GitHub Pages is live

- Published at https://jhudshcg.github.io/starters/ from `jhudshcg/starters`, branch `main`.
- Enabled Pages with `build_type: workflow`. The existing build passed; rerunning the failed deployment succeeded (run 34796389719, attempt 2).
- Verified public HTTP 200 and the Joe Hudson footer credit. Future pushes to `main` run validation and deploy automatically.

# Publish checkpoint — 14 September 2026

This section supersedes the historical snapshots below.

- Ready for the user to publish to GitHub. Pages Actions workflow validates and packages browser assets, then deploys successful `main` builds. No remote is configured locally; the user is creating the repository. Select Settings → Pages → Source → GitHub Actions, then push `main` or run the workflow manually.
- Current bank: **178 templates / 417 variations**: **115 puzzles**, **51 exam questions**, **12 Python challenges**. Normal puzzle sets contain **three** distinct questions of one subtype; individual question codes still open one. Existing revision-2 slots remain stable.
- All **30 maths source ideas** are in the live classic maths bank, with source IDs and counts in the JSON inventory. Concise adaptations repair ambiguous source rules. Coin-system and arithmetic-expression marking accepts valid alternatives without executing input.
- **50 Go problems** imported: 49 attributed GoProblems examples plus OGS 2625. Original board sizes, setup, captures and supplied branches are preserved. The import/validation tool uses pinned sgfmill 1.1.1. All **1,528 recorded positions** pass legality/capture checks. Winning outcomes rely on source annotations; unlisted moves remain explicitly unverified. Ko and seki are identified in relevant prompts.
- Go UX: click/keyboard play, immediate visible opponent stone and captures, alternative recorded replies, Undo/Reset, persistent next-move hints counted as assisted, and immediate green success feedback. Removed redundant automatic-reply wording. Solution replay supports actual dragging without replacing the slider node during input.
- Six new coding templates, five variations each: functions, returns, scope, bounds, binary/linear search and bubble-sort passes. Python now has four selectable focuses. Existing CA1/CA2 content was not changed in this batch; the user will provide feedback later.
- Footer includes “designed by Joe Hudson”.
- Browser smoke passed: all nine puzzle subtypes, three-puzzle sets, new coding focuses, Go stone visibility/hints/reload/drag replay/success feedback, existing path/tangram interactions, score placement, timer recovery and 320px reflow. An earlier coding-focus failure disappeared after a fresh browser load with caching disabled.
- Final local checks: 33 Node tests passed; all model answers and coverage report passed; Go tree validation passed. All 150 grid/geometry variations passed independent validation and the static site build succeeded.
- The user wants concise progress updates and quick completion; do not leave long silent periods while testing. Public deployment itself has not been verified.

---

# Current checkpoint — 14 September 2026

This section supersedes the earlier session snapshots below.

## Deployment and maths collection follow-up

- Corrected scope: all 30 Mr Barton Maths problems are requested, exempt from the five-per-type limit. All prompts were read, but only five are integrated; the remaining 25 are unfinished work. `data/coverage/classic-maths-inventory.json` tracks every source ID, live bank slots and known authoring issues. Do not describe this collection as completed.
- `.github/workflows/pages.yml` validates and packages the site on pull requests and deploys successful `main` builds through GitHub Pages. `npm run build` creates `_site` from browser assets only.
- No GitHub remote was configured at setup time. Repository URL and the repository’s Pages source setting are still needed before public deployment can be verified.

## Ready for local testing

- Preview: http://127.0.0.1:8765. Prefer VS Code’s integrated browser. An isolated Chrome profile was used for automated tests because no VS Code browser tool was available.
- 97 templates / 312 variations across the app: **40 puzzles**, **51 exam questions**, **6 Python questions**.
- Puzzles: eight subtypes with five distinct puzzles each — logic grids, logic equations, tangrams, cover-every-dot paths, Sudoku, arithmetic cages, sequences and classic maths. Original templates have five variations; the five classic problems are fixed. Each subtype has its own file in `data/puzzles/`, imported by `data/puzzles.js`. One substantial puzzle per activity, with a provisional 5–15-minute duration.
- Exam: every CA1–CA2 subsection is selectable, with three multipart questions per activity (currently 15–16 marks). `data/exam.js` imports CA1 and CA2 files. Term aliases and simple sentence wrappers are supported; code fragments are compared by tokens, preserving case and string contents, without execution.
- Coverage: `data/coverage/core-inventory.json` contains 106 official focuses / **369 subelements**, with permanent letters. Parts link to `{focus, elements}`; display notation is `CA2.1.1[a,b]`. Generated report: **239 elements with a qualifying live question**, **10 with two live questions**, **10 supporting-practice-only**, **120 uncovered**, **0 teacher-approved complete**. Do not present topic-level or live counts as full reviewed coverage. Run `npm run coverage` after edits; validation rejects stale reports.
- Bank revision **2** replaces the demo bank at the user’s request. Old demo codes are rejected rather than mapped to different content. History is retained; unsupported unfinished activities are cleared. The eight-character Base64url format is unchanged.

## Latest puzzle interaction decisions

- Paths have **no fixed start or endpoint**. Choose any open dot. Press and drag while held; snap through adjacent tracks, release to stop, and press the endpoint to resume. Backtracking removes the later route. Click and keyboard alternatives remain. All open dots must be visited exactly once; no blocked dots, jumps or diagonals. Accept any valid route, including reversed solutions. Every obstacle layout has a checked complete witness route.
- Logic and equation grids cycle unknown → × excluded → ✓ selected. Persist candidate notes and Undo history. Yellow means selected, not correct.
- Sudoku and arithmetic cages use directly selected cells, digit buttons, keyboard input and pencil notes. Givens are immutable; large boards scroll within their region at high zoom.
- Tangrams use seven geometric pieces with click placement, half-unit movement, ±45° rotation and parallelogram flipping. Check geometric coverage and overlap, accepting alternative tilings. The 25 supplied silhouettes are distinct even after rotation/reflection. Piece dragging is not implemented; all placement operations work by click/keyboard.
- Keep Show hint visible and checking/reveal in the existing disclosure. Solutions remain hidden until requested. Results appear beside Submit and at the top.
- Each subtype now has its own format, approach, presentation and marking section in `docs/spec-puzzles.md`.

## Source review and boundaries

- Inspected all nine images in `example_puzzles`, including the easy and harder logic grids, equations, tangram, dot path and Sudoku. The under-one-minute basic example is onboarding, not the difficulty benchmark.
- Read all 30 prompts embedded in the linked Mr Barton Maths HTML. The page has self-reported completion, no answer key or automatic marking. Found ambiguous/mistaken wording, including reversed information assignments in the birthday puzzle. The five imported classic ideas use concise adapted wording, source links and independently checked explanations, rather than copying the entire collection.
- Sampled the linked Mathschallenge PDF; did not claim to review all 127 pages. Questions and solutions share pages and must be separated if used.
- Go remains the optional separate extension. GoProblems/OGS links exposed app shells through the reader; positions and ranks were not verified. No Go puzzles are claimed implemented.

## Verification completed

- **28 automated tests passed**, covering codes, set selection, marking/negation/code tokens, coverage counting and variation requirements, puzzle constraints, alternative paths/tilings, and independently calculated classic answers.
- Bank validation passed for all 97 templates / 312 variations. Generated coverage files are current.
- `python3 scripts/validate-puzzles.py` independently checked all **150 served grid/geometry variations**, including unique logic/equation solutions, Sudoku uniqueness and deduction traces, cage uniqueness, feasible routes and exact lattice tangram coverage.
- Browser smoke passed: exam input/scoring and subelement references; candidate states and Undo; Sudoku notes and reload; real continuous mouse dragging from an arbitrary path start; tangram click placement/rotation and reveal; all eight subtypes; timer recovery; 320px reflow. Screenshots: `/private/tmp/starters-*.png`.

## Next priorities

1. Teacher review the new puzzle difficulty and run mixed-ability timing trials; solver checks do not establish challenge level. Sequences and some equation boards may particularly need calibration.
2. Review the subelement inventory and direct-assessment mappings, then fill the generated coverage gaps. Add a second distinct question and two applicable variations per element; do not bulk-mark current content approved.
3. Further improve short-description marking and misconception feedback. Current text rules are deliberately bounded; unrestricted semantic marking is not implemented.
4. Optional later work: Go, tangram dragging, more advanced Sudoku techniques, richer linked explanations, CSV import and broader Python challenges. No public deployment performed.

---

# Session checkpoint · 13 September 2026

## Read this first: puzzle difficulty is still inadequate

Latest teacher feedback:

> “those spatial challenges are barely any more challenging. I suppose I'll need to find some examples for you. and in general the challenges for all puzzles needs to be raised, so T-Level students can be kept busy thinking for 5-15 minutes.”

This applies to **all puzzle families**, not only spatial reasoning. The recent multi-step spatial replacements did not meet the intended difficulty. Do not interpret earlier positive feedback on the app as approval of puzzle difficulty. The interface is testable; the educational challenge still needs substantial work.

- Target: year 1 Digital Software Development T-Level students, generally 16–18, mixed experience. A starter set should sustain meaningful thinking for 5–15 minutes.
- Current duration labels are estimates, not validated student completion times. Passing automated checks establishes functional correctness, not age-appropriate challenge or engagement.
- Adding a few transformations or more clicks did not solve the difficulty problem. Future tasks need stronger reasoning demands, such as linked deductions, planning, interacting constraints or evaluation of alternatives. These are design directions, not agreed example puzzles.
- The teacher may bring examples to establish the intended level. No examples have been supplied yet. Use them to calibrate puzzle structure, difficulty and timing before producing another large bank of similarly simple tasks.
- Latest request is to save this checkpoint for the next session. No further puzzle redesign was requested for the remainder of this session.

## Recommended next-session starting point

1. Read this checkpoint, [AGENTS.md](AGENTS.md), and any new teacher examples or instructions.
2. Identify what makes the examples demanding: deductions needed, constraints that interact, planning depth, plausible wrong approaches and expected solving time.
3. Develop a small number of representative puzzles at the intended level and make them testable for teacher review before generating many variations. If examples are still unavailable, acknowledge that difficulty calibration remains unresolved rather than claiming the existing puzzles now meet the target.
4. Preserve the interface improvements below. Increase intellectual difficulty without adding confusing controls, unnecessary reading or repetitive clicking.
5. Validate solvability, solution uniqueness where required, acceptance of alternative valid answers and marking; then use student/teacher trials to assess the 5–15-minute target.

## Current working application

Static SPA, no installation/build step required for browser use. Local preview:

`http://127.0.0.1:8765`

If it is not running, start from the project root:

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

The server was running at the end of development; do not assume that process survives into the next session. Use HTTP rather than opening index.html directly because the app uses ES modules. No public deployment has been performed; GitHub Pages is the intended hosting platform.

**Browser preference:** use VS Code's integrated browser where possible. This session had no tool to automate it, so automated checks used an isolated headless Chrome session. Do not repeatedly ask the teacher to approve routine actions already authorised; follow any actual sandbox approval requirements.

Implemented:

- Puzzles, exam practice and constrained Python challenges, with type/focus selection and exact code entry.
- Marking, hints, model answers, retries and submission.
- Three selection actions: new set with another focus; different question combination within the focus; same questions with new variations.
- Optional 5–15-minute timer, hidden elapsed time, answer persistence, deadline recovery after refresh and single submission on expiry.
- Local progress, type/focus/date filters, history, score chart/table, revision priorities, CSV export and JSON backup/restore with duplicate detection.
- Click/keyboard controls for job ordering, device assignments, switches, drawing shapes, building paths and selecting spatial coordinates.

Current content: **27 active templates / 135 active variations**, five variations per template. Including retired spatial questions: **30 stored templates / 150 variations**.

| Type | Active focuses | Set size / marks |
| --- | --- | --- |
| Puzzles | Number grids, spatial reasoning, logic, shapes, paths | Two questions; six or eight points |
| Exam practice | CA2.4 operators, CA2.8 validation | Three questions; 15 marks |
| Programming | Iteration, selection | Two questions; 12 marks |

The puzzle bank remains too easy according to the latest teacher review.

## Interface decisions to retain

- Show hint stays directly visible.
- To its right, a collapsed native details/summary container labelled **Check / show answer** holds Check answer and Show answer. When opened, it displays this exact reminder:

  “try to answer all questions first and submit your best try before checking correct answers”

- Disclosure state persists while interacting. Submission remains available without opening the answer controls.
- Submitted results appear **beside Submit as well as at the top**. Manual submission focuses the nearby result so students do not need to scroll to the top.
- The brand subtitle is two lines: **Digital Software Development**, then **T-Level**.
- Spatial questions use a **single clickable puzzle grid** showing the given marker. The second “new position” radio-selector grid was removed, including for old spatial codes.
- **Warm yellow means selected, not correct.** Puzzle selections use `#FFE6A0` with `#9B7122` borders. Reference shapes are purple; marked-correct feedback may be green. Retain text, symbols and pressed states rather than relying only on colour.
- New puzzle controls support click and keyboard. Shape cells toggle; paths support backtracking, Undo and Reset. Dragging is not required.
- Path marking accepts any route satisfying the constraints, not just the stored model path.

## Settled technical and curriculum decisions

- The teacher confirmed the curriculum **content is version 1.1**; older version references inside `../agents/spec.md` are stale. Preserve the source file and use 1.1 as the baseline. SAM files are in `../agents/SAM/`.
- Set codes use **Base64url**, case-sensitive alphabet `A–Z a–z 0–9 - _`. Eight characters encode 48 bits with no padding:

  `[version:7][type:2][question1:10][variation1:3][question2:10][variation2:3][question3:10][variation3:3]`

- An optional ninth character gives the timer duration: `5`–`9`, `A`–`F` for 5–15 minutes.
- Types: 0=puzzles, 1=exam, 2=programming; 3 reserved. Question slot 1023 denotes an unused trailing position, with variation zero. Active slots are 0–1022. Eight possible variations per slot; the bank currently uses five.
- Codes decode directly; no exhaustive set-code catalogue, question-text hash or shared seed is needed. Preserve case; reject standard Base64 `+` and `/`, invalid fields and invalid compositions.
- Slots are stable IDs, not array positions. Preserve existing code meanings; use new slots or a new retained bank version for different tasks. Curriculum version 1.1 and encoded question-bank version 1 are distinct.
- Original spatial slots 3–5 are marked `retired` and excluded from random selection. Old codes still resolve. New spatial slots 15–17 contain the attempted replacements, which the teacher also considers insufficiently challenging.
- Some AGENTS.md paragraphs still describe superseded six-character/hash/ASCII ideas. The explicit conversation decisions and the implemented Base64url specification supersede those passages. Do not revert to them.

## Useful files

| File | Purpose |
| --- | --- |
| [README.md](README.md) | Running the pilot, known codes, test checklist and limits |
| [docs/README.md](docs/README.md) | Index of drafted specifications, style guide and implementation plan |
| [index.html](index.html) | Page shell and subtitle |
| [js/app.js](js/app.js) | Navigation, question rendering, answer disclosure, attempts, timer and progress UI |
| [js/codes.js](js/codes.js) | 48-bit codec and individual question codes |
| [js/bank.js](js/bank.js) | Bank loading, set selection and content validation |
| [js/marking.js](js/marking.js) | Shared marking, delegating interactive puzzles to their rules |
| [js/puzzle-rules.js](js/puzzle-rules.js) | Order, switch, matching, shape and path validation |
| [js/puzzle-controls.js](js/puzzle-controls.js) | Clickable and keyboard puzzle controls |
| [js/progress.js](js/progress.js) | Storage, deadline helpers, history, revision priorities and CSV export |
| [data/puzzles.js](data/puzzles.js) | Original puzzles plus imported expansion and retirement flags |
| [data/puzzle-expansion.js](data/puzzle-expansion.js) | Logic, shape and path templates, slots 6–14 |
| [data/spatial-challenges.js](data/spatial-challenges.js) | Latest spatial templates, slots 15–17 |
| [data/exam.js](data/exam.js), [data/python.js](data/python.js) | Other question banks |
| [css/puzzles.css](css/puzzles.css) | New controls, yellow selection, disclosure and nearby result styles |
| [css/styles.css](css/styles.css), [css/tokens.css](css/tokens.css) | Shared layout and palette |

## Reference codes

| Focus | Code |
| --- | --- |
| Number grids | `AgAAAR_4` |
| Exam operators | `AoAAAQAQ` |
| Python iteration | `AwAAAR_4` |
| Logic | `AgDABx_4` |
| Shapes | `AgEgCx_4` |
| Paths | `AgGADh_4` |
| Latest spatial tasks (still too easy) | `AgHgER_4` |

Open with `http://127.0.0.1:8765/#set=<code>`. Individual question example: `PY-1-0-0`.

## Verification at last implementation checkpoint

**22 automated tests passed**, and all 150 stored variation model answers passed bank validation. Tests cover codec boundaries and compatibility, marking, selection, deadlines, puzzle arithmetic, unique logic solutions, independent shape/spatial/robot reference calculations and alternative valid paths.

```sh
/opt/homebrew/bin/node --test tests/*.test.js
/opt/homebrew/bin/node scripts/validate.js
```

Node was available at `/opt/homebrew/bin/node` but absent from the default shell PATH. Python 3 is used for reference-code checks.

Browser smoke checks also passed: three activity types, scoring, history, refresh, timer expiry/deduplication, answer disclosure, nearby submission results, direct spatial selection, logic interactions, shape painting, keyboard arrows/Space, yellow selection colour, saved puzzle answers, alternative paths and 320px reflow.

`scripts/browser-smoke.mjs` expects the preview on port 8765 and an isolated Chrome debug endpoint on 9227. It **clears app storage in the test profile**; do not use a real student/user browser profile. Previous isolated profile: `/private/tmp/dsd-starters-pilot-browser`. Screenshots were saved as `/private/tmp/starters-*.png`; these temporary files/processes may not survive. This is not a full accessibility audit or cross-browser certification.

No tests were rerun merely to save this documentation checkpoint.

## Other outstanding work and limits

- Full curriculum coverage inventory and reviewed question bank are not built. Topic coverage is distinct from demonstrating every specified skill.
- Free-form Python execution, extended text marking and CSV import are not implemented. JSON backup/restore is the current history-transfer mechanism.
- Revision evidence is recorded at question level, not part level. Assisted first responses and puzzles are excluded from revision priorities. Final scores may include retries within the activity.
- Progress is browser-local; no accounts or OneDrive integration. One active activity per browser profile. Abandoned drafts are not retained as completed history.
- Classroom timing and difficulty calibration are unresolved. **Raising puzzle difficulty is the next content priority; do not treat it as completed because the interface and automated tests work.**

## Current session: coverage and puzzle recalibration (14 September 2026)

- The initial 106-question draft sampled numbered objectives and did not cover their constituent elements. This was a serious limitation, not complete CA1–CA2 coverage.
- Agreed coverage model: each official focus has permanent local letters; parts link structurally to `{focus, elements}` and display `CA2.1.1[a,b]`. Counts are generated, never hand-maintained. Reordering must not reassign letters. Count distinct questions, require two applicable variations, and distinguish supporting practice from direct assessment and teacher-approved coverage.
- New inventory: 106 focuses / 369 subelements. Current exam expansion: 51 live multipart questions, two variations each, spanning all CA1–CA2 subsections. Initial generated report: 235 elements with live questions, 14 practice-only, 120 uncovered; only 10 elements have two live questions. None is teacher-approved. Re-run the report for current counts.
- User authorises dropping old demo-code compatibility to prioritise clean, robust, maintainable implementation. Keep separate banks by activity type. Exam implementation and checks are still being completed; do not claim final verification yet.
- Reread updated AGENTS.md: numerical/maths, spatial, sequence, logic and example-derived types; subtype filtering is desirable. User clarifies students are 16–19 at A-Level-equivalent academic level.
- Inspected all nine local example images. Basic 1 logic is explicitly under-one-minute onboarding; it is not the difficulty target. Four-entity logic examples require linked exclusions, time differences and either/or reasoning; the harder example has four categories and eight clues. Tangram requires using every piece without gaps/overlap and may admit alternative solutions. Dot paths require visiting all dots, not merely reaching an end. Equation grids use cross/tick candidate marking. Sudoku needs candidate notes and deductions.
- The old arithmetic grids, direct transformations and three-item ordering examples in spec-puzzles must be replaced as production benchmarks. Larger grids and more clicks alone do not establish difficulty. New items need linked reasoning, independently checked solutions and student timing calibration.
- User now authorises implementation of five distinct puzzles per planned type, including all local example types, and asks to use the ready-made maths problems from the linked HTML collection where practical. Read source questions/solutions first; separate prompt from hidden solution. Do not treat the request as preparation-only any more.
- Linked sources: Mr Barton Maths puzzle collection; mathschallenge 1-star PDF; GoProblems; OGS collection 2625. Web reader exposes the Barton landing page but not its client-rendered problems; downloaded HTML for full review. Go content has not yet been inspected beyond its app shell. Record source-review limits accurately.
## 2026-09-24 — Puzzle enrichment, GCSE maths and symbolic marking (in progress)

This is the current work plan/status. Earlier dated entries below are historical. User now requires efficient work, reusable references cached in the repository, and a checkpoint plan **before every job expected to exceed 20 seconds**. These directives are also in AGENTS.md. This entry records work already performed before that instruction, plus the remaining plan.

**Objective:** at least 100 puzzles in each of nine families with meaningful variety; rank-based Go challenge bands; improved Go card; GCSE Foundation ceiling for Beginner/Foundation maths; polynomial expression marking with partial credit for equivalent unfinished forms. The user approved the variety proposals, smaller Sudoku and scaffolded tangrams. No delegation was requested.

### Plan and completion record

- [x] Inspect existing banks: initially 50 per family. Go used tree-depth grading; Foundation had only two problems and was unavailable. Tangrams were 43 Stretch / seven Standard.
- [x] Replace Go card row with a small SVG ko pattern (`js/puzzle-cards.js`).
- [x] Add restricted mathjs parsing and exact rational polynomial equivalence (`js/algebra-answer.js`). Never compile/evaluate student trees. Full/partial credit depends on equivalence and requested form. Forms: equivalent, simplified, expanded, factorised, rearranged. Rearranged allows a reduced single fraction, rejects uncancelled factors/unfinished arithmetic. Variable denominators, roots/functions/inequalities are unsupported. Marker integrates with packed banks and dependencies. Focused tests: six passed at last run.
- [x] Add 50 Classic maths tasks / 250 variations in `data/puzzles/maths-practice.js` (slots 635–684): 35 algebra, 15 other maths. Classic maths total 100. Beginner/Foundation constrained to routine GCSE Foundation content. Four older combinatorial tasks moved to Standard. Algebra topic filter added. See `docs/maths-practice-review.md` for evidence and limitations; teacher review remains pending.
- [x] Expand six grid/shape families to 100 each using `scripts/enrich-puzzles.py` (slots 685–984). Includes three-person logic grids, equation mixes, 4×4/6×6 Sudoku, rectangular/shaped paths, guided tangrams and addition-only/mixed cages. `scripts/validate-puzzles.py` passed: 720 served variations independently checked. Runtime supports path `rows`, Sudoku `boxRows/boxCols`, tangram `guides`.
- [x] Add 50 sequence templates / 250 variations in `data/puzzles/sequences-enriched.js` (slots 0–49). Ten rule families × extend/restore/sum/position/error tasks. Sequences total 100.
- [x] Cache useful Go references in `references/go`. `scripts/cache-go-sources.py` reuses existing files and stores public SGFs, ranks, contributor attribution and catalogue sample. The API ignores difficultyFrom/difficultyTo in catalogue queries, so filter returned ranks locally. Working public endpoints: `/api/v2/problems?resultNumber=100&offset=N&sortBy=p.id&sortDirection=asc`, `/api/v2/problems/ID`. Eight catalogue pages and 69 problem files were cached; do not redownload them. One OGS problem and collection index also cached.
- [x] Finish Go import and grading. `scripts/import-go-enrichment.py` selects 51 cached positions with authored objectives/hints; currently creates 101 Go problems. Duplicate sibling moves in source problems 191 and 25 are merged after checking equal board/colour, retaining all continuations and winning markers. Independent replay passed: 101 problems / 3,833 recorded positions. Tree-depth grading removed; original source ranks and cached OGS rank classify all four bands, and UI labels show rank ranges.
- [ ] Finish independent maths/sequence content checks and targeted tests for rectangular paths, small Sudoku, guides, maths topic selection and partial marks. All model answers passed the last bank validator, but independent source-expression checks and the newly added structures deserve focused verification.
- [ ] Finish browser checks. Initial full smoke failed at line 193: test drag coordinates assumed square path boards. Corrected the test to use `part.rows`; the runtime already used the correct rectangular geometry. Rerun after the final build. Add focused algebra partial/full credit, rearranged fractions, maths filters, small Sudoku and rectangular-path checks, then inspect desktop/mobile/high zoom screenshots. Chrome isolated profile `/private/tmp/starters-enrichment-browser`, debug port 9227; preview server port 8765 serving `live/`. Do not use a personal profile.
- [ ] Update reference documentation and puzzle specification, record final counts/limits, regenerate identities/build, run relevant tests and final validation. Previous full suite: 109 tests passed before the later grid/sequence/rearrangement changes. Latest bank validation/build passed at revision 10 (1025 total templates, before Go additions). Do not claim final verification yet.

### Resume commands and current files

- Go environment: `/private/tmp/starters-content-venv/bin/python` has sgfmill 1.1.1. `scripts/requirements-content.txt` already records it. Run importer and `scripts/validate-go.py` offline. Regular `python3` has SymPy available, but not sgfmill.
- `/opt/homebrew/bin/node --test tests/algebra.test.js`; `python3 scripts/validate-puzzles.py`; `npm run codes:update`; `npm run validate`; `npm run build`; `npm test`.
- Browser: `/opt/homebrew/bin/node scripts/browser-smoke.mjs` requires local debug-socket access outside the sandbox. Current output in `/private/tmp/browser-smoke.log`.
- Working tree changes are uncommitted. Initial Go-card change predates the latest user request and is intentional. Generated `live/` currently predates the new Go bank. Preserve stable slots/variation positions; no commit/deployment was requested.

## 2026-09-25 — Workflow summary, puzzle band audit and exam-resource map

**Objective/scope:** summarise persisted efficiency guidance; investigate and report puzzle-family difficulty gaps without changing content; inspect only directory/file names under `../agents` and write a concise resource-routing guide linked from AGENTS.md.

- [x] Read recent workflow guidance and current puzzle selection/band metadata.
- [x] Calculate active challenge counts and selectable sets per family/band; report gaps and causes without editing puzzles.
- [x] List exam-resource directories/file names only; map resource types to suitable tasks in a new documentation file and link it from AGENTS.md.
- [x] Verify links and audit results; record findings, limitations and exact next action here.

**Checks:** use existing local files/caches; no downloads or exam-resource content reads. No build/browser rerun for documentation-only changes. Preserve unrelated unfinished work from 24 September.

**Completed findings:** seven puzzle families have no Beginner templates. All nine support Foundation/Standard/Stretch. Number and measures filtering supports only Foundation (counts 0/13/2/0); Algebra supports all bands (12/11/8/4). Source counts match the cached inventory, 901 active templates. See `docs/reviews/2026-09-25-puzzle-level-coverage.md` for counts, cause, thresholds and suggested follow-up. No puzzles changed.

**Resource routing:** created `docs/exam-resource-map.md`, linked from AGENTS.md and docs/README.md. Inspected only directory/file names under `../agents`; no exam-resource contents read. Covers Core SAM and summer 2026 papers/schemes/reports, ESP SAM/AdSAM/live tasks, A/E exemplars, OS and old-spec topic questions. Conversion/PDF equivalence remains unverified.

**Current-state correction:** working tree was clean before this documentation job except the newly appended plan. The 24 September entry's claim that implementation was uncommitted is historical, not current evidence; its unfinished verification items were not rerun in this task.

**Next action:** report findings for review; await the user's direction on Beginner authoring/reclassification and Number and measures gaps. Do not silently implement puzzle changes. Prior implementation verification remains outside this audit's scope.

**Verification:** fresh runtime pool counts matched the saved inventory for every family/band; inspected actual selection threshold and topic filtering. All 20 local Markdown links across the changed guide/index/instructions and audit resolve. `git diff --check` passed. Documentation only; no source-bank edits, downloads, rebuild, commit or deployment.

## 2026-09-25 — ESP conversion, evidence review and starter design programme

**Authorised objective:** (1) carefully convert ESP PDF/DOCX resources into adjacent `md/` directories with matching basenames, retaining assessment images/tables/lists and removing repeating headers/footers; (2) document a repeatable cross-session evidence-review process; (3) apply it to starter designs for every ESP task; (4) ONLY AFTER teacher discussion/agreement, implement Task 1 and Task 2 designs. User explicitly requires checkpointed progress and a working site throughout. No delegation requested.

### Programme checklist

- [x] Inventory sources, existing extracts and reliable local tooling; build a resumable converter/manifest with source hashes and quality checks. Original resources remain untouched. Obtain sandbox approval for adjacent output under `../agents`.
- [x] Convert/check original ESP SAM (RBSX): pre-release, tasks, scheme, DOCX log.
- [x] Convert/check additional ESP SAM (RetailX): pre-release, tasks, scheme, PDF/DOCX logs; preserve both formats without basename collisions.
- [x] Convert/check summer 2026 ESP (Glenstar): pre-release, task papers and DOCX log.
- [x] Convert/check summer 2026 ESP mark scheme and examiner report.
- [x] Convert/check ESP Grade A/E exemplification reports and task PDFs; inspect extensionless Grade E flowchart format and preserve relevant visual evidence.
- [x] Record conversion completeness, tables/images, review evidence and limitations per resource. Verify provenance, output links, page coverage and representative/all flagged visual pages. Do not equate extraction with verified fidelity.
- [x] Document repeatable ESP analysis workflow and task evidence matrices: requirements → assessed criteria → top-band evidence → examiner difficulties → teachable subskills → starter design → marking/validation.
- [x] Apply workflow across Task 1, Task 2, Task 3, Task 4a and Task 4b; triangulate SAM/AdSAM/live scheme, examiner commentary and A/E exemplars. Reuse existing `docs/esp` notes and cached assets, verify current paths. Read supplied Python/CSV/XLSX as needed for analysis, without expanding PDF/DOCX conversion scope to OS/Core written exams.
- [x] Write detailed activity-set designs, progression, meaningful variations, accessible UI, deterministic versus rubric/self/teacher assessment, feedback and review limits. Document implementation increments and checks for Tasks 1/2.
- [ ] Share designs and material choices with teacher; STOP before implementation until agreement.
- [ ] After agreement: implement/test Task 1 in independently usable increments; checkpoint each.
- [ ] After agreement: implement/test Task 2 in independently usable increments; checkpoint each.

**Current state:** previous documentation edits are present, including user's scenario-label clarification; preserve them. No application changes required for conversion/design phases. Original sibling resource area is read-only under current sandbox; prepare converter/output review before requesting narrowly scoped write approval. Keep transient extraction/render files in `/private/tmp`, reusable tools/manifests/notes in this repo; published conversions/images beside sources as requested. Cache first; no repeated successful conversion if source and converter hashes match.

**Next action:** inspect existing ESP source guide/assessment notes and local converter availability, inventory PDF pages/structure and DOCX tables/images. Choose tooling based on evidence, then pilot representative task/scheme/exemplar conversions before batch processing.

**Conversion increment completed:** 36 documents (33 PDFs including the extensionless Grade E flowchart; 3 DOCX), 341 PDF pages, 269 linked table/figure assets. Generated outputs are in source-adjacent `md/` directories, with unchanged basenames and `.conversion.json` provenance records. PDF/DOCX names do not collide in this inventory. `references/esp/conversion-manifest.json` records every page, source hash, outputs and checks. Published successfully with approved filesystem escalation; originals unchanged. Used installed pdfplumber 0.11.9/PDFium 5.5.0 and Pandoc 3.11, no downloads.

**Conversion checks/limits:** page anchors, source/converter/output hashes, native alphanumeric retention (normalised sub-bullets accounted for), all linked assets and DOCX five-column labels checked. Initial contact sheets sampled 138 visual-bearing pages; some first-pilot stale assets appeared in contacts but were excluded from publication, which copies only current links. Visually checked the original SAM rubric, live scheme p17 and Grade A contents p2 at readable size. Fixed open-bottom pseudocode table loss (live scheme p17), Grade A overlapping contents text, native code indentation and live print-ID footers. This is structural verification plus visual sampling, not word-for-word certification or complete diagram transcription. Figures remain linked images. No source content silently corrected; source mistakes retained.

**Repeatable workflow:** `docs/esp/review-process.md` created. Source review currently confirms Task 3 revised SAM/AdSAM booklets explicitly total 18 including communication, superseding old notes' 21/18 discrepancy. Examiner report pp5–23/33/55/65–66 read for planning/testing/design/evaluation weaknesses. Current original SAM + AdSAM + live Task2–4b requirements read (some initial oversized output was truncated; AdSAM T2/T3 reread in full). Local spec ESP section read.

**Exact next action:** finish task evidence matrices from scheme bands, Grade A/E commentary and artefacts; review Task1 briefs and supplied data/code as needed, independently verify proposed numeric examples; write all-task starter designs for teacher discussion. Do not implement before agreement. Conversion tools: `python3 scripts/check-esp-conversions.py` restores published cache to staging when missing and checks; only run `convert-esp-resources.py --match <resource>` for missing/changed resources, then check/publish. Use non-login shell for escalated commands to avoid unrelated pyenv startup lock delay.

### 2026-09-25 — Added Task 1 workbook conversion (user steering)

User explicitly adds XLSX Task 1 spreadsheets to conversion scope, requesting a readable open format that preserves formulas and charts. Preserve the original ESP programme and approval gate.

- [x] Inventory all ESP Task1 XLSX files, including A/E example plans; inspect sheets, formulas, cached results, native charts/images, merges and conditional formatting.
- [x] Export source-adjacent `md/<same-stem>.md` workbook guide plus linked CSV/JSON data with exact cell addresses, formulas and separately identified cached values. Preserve chart definitions/images and meaningful Gantt formatting; record any rendering/recalculation limitations.
- [x] Verify cell/formula counts and source hashes; inspect representative plan views. Add outputs/provenance to conversion register and source review. Reuse originals/existing tools; no source edits.

**Next action:** inspect workbook structures using installed openpyxl and OOXML ZIP metadata. Choose the least complex faithful representation before exporting. Do not imply cached formula results are freshly recalculated.

## 2026-09-26 — Resume ESP evidence-to-design work

**Objective:** finish the conversion handover and evidence review, then produce concrete all-task activity designs for discussion. No implementation before teacher agreement; later implementation is limited to Tasks 1 and 2.

- [x] Reconcile published PDF/DOCX/workbook manifests with the stale last checkpoint; check output presence/hashes without reconverting unchanged sources. Finish the conversion register, useful links and limitations.
- [x] Read saved evidence review/process and only targeted outstanding source sections; verify any new worked-example calculations/code. Record new findings so subsequent sessions do not repeat source review.
- [x] Document sets for all five assessed tasks, with progression, worked examples, meaningful variations, UI, marking contracts, feedback, transfer limits and Task1/Task2 delivery increments.
- [x] Verify documentation links, examples and source claims; record completion/remaining decisions and present the designs for discussion. STOP at this gate.

**Resume observation:** initial `git status --short` is clean. The previous turn successfully published five XLSX exports (17 sheets, 698 formulas, zero chart objects), but the final checkpoint checkboxes were not updated. `docs/esp/evidence-review.md` and both manifests exist; `conversion-register.md` has not yet been created. Reuse them; do not restart extraction. No application files have changed during this programme.


### 2026-09-26 completion and exact handover

**Conversion reconciliation complete:** all 36 PDF/DOCX source/output hashes and linked assets checked without reconversion. Final manifest count is **270** linked assets, superseding the earlier 269. Five published XLSX exports contain 17 sheets and 698 formulas; source hashes and declared output files checked. Workbook exports include same-stem MD guides, formula/value CSVs, addressed-cell JSON, styled HTML and retained OOXML. No native charts or conditional formatting present. Cached results were not recalculated. Direct Gantt cell fills and basic merges are preserved; theme/tint colours, exact number formats, printing/interactivity and browser visual fidelity are not certified. Checkbox completion does not imply those limitations were removed. Originals unchanged; no sibling-folder writes this session.

**Evidence/design complete for discussion:** `docs/esp/conversion-register.md` indexes all outputs. `docs/esp/source-guide.md` is now the current entry point, linked from docs/README.md; old source guide retained as historical research, superseded Task3 21/18 discrepancy corrected in task notes. `docs/esp/evidence-review.md` records targeted source reads, all three supplied Task2 code reviews (read only), examiner testing examples, scheme wording anomaly and CSV findings. `references/esp/dataset-inventory.json` records six file hashes/schemas/counts/date ranges. Both RetailX CSVs contain a 2026 date among November 2025 records; preserve and state assumptions, do not silently correct.

**Proposals:** `docs/esp/activity-designs.md` covers 21 three-question set recipes (T1:5, T2:5, T3:4, T4a:4, T4b:3), UI/feedback/marking contracts, progression and implementation increments. `task-1-designs.md` and `task-2-designs.md` provide detailed worked examples and meaningful variation axes. First-phase scope proposes five coordinated variations for each of ten T1/T2 recipes: 30 question templates / 150 variations. These are designs, not completed question banks. Recommended marking combines automatic constrained checks with separately reviewed short prose; no automatic ESP grade. Review statuses do not imply a teacher inbox/account system.

**Verification:** `python3 scripts/validate-esp-designs.py` passed independent schedule/availability, costs/forecast, boundary/ID, tier/rounding, repair and small data examples. All 98 local Markdown links across docs/esp and docs/README.md resolve. `git diff --check` passed. Application files untouched; no app build/browser tests repeated for this documentation-only change. Workbook rendering limits and unverified full exemplar formulas remain recorded.

**Exact next action:** discuss the proposed activity coverage, separate ESP navigation and hybrid marking with the teacher. Do not implement until agreement, as explicitly requested. After agreement, persist the next incremental plan before code changes; first deliver one usable T1/T2 slice, then expand the agreed scope. Existing codec rejects type 3 despite two type bits, so explicitly test backward-compatible code/loader/navigation/progress integration. Preserve existing share codes. Do not restart conversions or bulk source reading. No commit or deployment performed.

## 2026-09-26 — Teacher refinement: timing, close reading and validation practice

**Objective:** incorporate teacher acceptance of the broad progression with explicit refinements: each set is three self-contained multipart questions of about five minutes each; Task2 needs generous validation fault-finding and repeated practice of every test-template column. This turn updates design requirements, not application code.

- [x] Confirm exact template headings from cached conversions and identify evidence-review requirements before authoring.
- [x] Update shared and Task1/Task2 designs for timing, validation coverage, column-level objectives and deliberate repetition.
- [x] Check documentation consistency and record exact next authoring action, including any evidence still needing close comparison.

**Scope decision:** broad activity progression accepted by teacher (“seems reasonable”), subject to these refinements. Do not request the same broad approval again. Prior design-level evidence synthesis is not certification of every future question/variation; source-to-question checks remain required.


**Completed refinement:** shared designs, both task designs and review process now require three independently answerable multipart questions, **at most five minutes each**, with reading/interaction included; shorter questions/sets explicitly welcome (teacher clarification). Task2 now has a validation coverage requirement, all five exact AdSAM template headings with column-specific objectives/exercises, a recipe-to-column map and deliberate small-variation repetition. T2.5 is revised to three independent miniature investigations rather than a chain relying on previous answers. Existing worked examples remain reusable design material; they are not yet final timed questions.

**Close-reading requirement:** before authoring each question family, compare all relevant scheme bands, examiner judgement against the actual response, and A/E artefacts/commentary; inspect relevant figures and persist claim → evidence → question/feedback links. Task-level summaries alone do not certify every future question. Reuse completed close comparisons, fill specific gaps, and record limitations. No application changes or source reconversion this turn.

**Checks:** cached AdSAM DOCX headings read directly; `git diff --check` passed. No executable content changed; no runtime tests required. **Next action:** begin the question-family evidence/coverage matrix for Tasks1/2, then author a small representative slice under the accepted progression and refined requirements. Do not seek repeated approval of the broad progression. Classroom timing remains unverified; narrow any question that exceeds the five-minute ceiling instead of requiring every question to use the whole allowance.

## 2026-09-26 — Authorised ESP close-reading and implementation

**User authorisation:** complete close reading of all supplied ESP assessment references, persist high-signal distillations, refine designs, then implement Task1/Task2. The previous discussion gate is satisfied; no repeat approval required. Three independent multipart questions per set, each <=5 minutes, with strong validation and all test-log columns. Keep existing app functional; no deployment requested.

- [ ] Audit source/page coverage; complete missing task/scheme/report/exemplar reading and relevant visuals; persist a coverage ledger and concise distilled findings with precise references and limits.
- [ ] Reconcile question designs against evidence; persist family/column/validation coverage and concrete scope.
- [ ] Implement ESP infrastructure and an independently usable vertical slice; verify compatibility before expansion.
- [ ] Complete five Task1 and five Task2 recipes with five variations each, bounded marking, feedback, separate prose review and accessible controls.
- [ ] Run focused and shared tests, validation/build and browser checks; update checkpoint at each working boundary with exact next action.

**Starting state:** earlier documentation edits remain uncommitted; preserve them. Read cached conversions, never repeat unchanged extraction. No subagents authorised. Close reading must distinguish fully examined material from sampled visuals; do not overclaim completion.

**Close-reading increment 1:** reread all three Task1/Task2 scheme guidance/bands; completed SAM/AdSAM later-task textual guidance, all live report commentary through33 and53–66 (remaining code/visual examples still to cover). Read both complete A/E Task2 logs and all nine full table images, plus both Python solutions; matched against commentary. Inspected live Task1 report figures pp7,9–12 and all task1 staff/task tables. Added `docs/esp/assessment-distilled.md`, including new live scheme income/cost label conflict and exemplar expected-result limitations. Broader remaining visual/code reading must not be claimed complete. No application changes yet.

## 2026-09-27 — Resume authorised ESP delivery

**Objective:** finish the outstanding review ledger and high-signal references, then implement and verify the agreed Task1/Task2 activities. Existing authorisation persists; no repeated design approval. The working tree is clean at resume, so earlier documentation has been saved externally.

- [x] Reconcile reading completed after the previous checkpoint; finish genuine gaps and record exact coverage, source conflicts and family evidence.
- [x] Implement a compatible fourth ESP bank, coherent recipe selection, accessible multipart controls and separate prose review; test a vertical slice.
- [x] Complete ten recipes × three questions × five variations, with strong validation and all test-log columns; independently verify cases and marking.
- [x] Run appropriate tests, codes/validation/build and browser checks; record working boundaries and remaining classroom limits.

**No repeat work:** all three schemes' text and indicative code/flowchart images were read in the previous conversation; full A/E Task2 logs (nine images) and both Python files read. Later report code pp34–53, flowchart figures pp24–30, evaluation images pp56–64, A/E Task3 flowcharts and Task4a code were also read after the last checkpoint. Task1 report figures pp7,9–12 inspected. Preserve those results; remaining narrow gaps include exemplar workbook complete plan/cost comparison and any unique standalone review images not duplicated in the reports. No application implementation exists yet.

**27 September reading increment:** completed full populated A/E workbook Markdown comparison and live report p20 test-log image. Added `docs/esp/close-reading-ledger.md` with reconciled reading scope, explicit residual visual gaps and newly identified omission of developer costs in BOTH exemplars (E £79,491.50; A £97,261.50). Distillation updated. Do not repeat workbook/cost reading. Next: confirm report p30 second/p31 visuals and standalone evaluation duplicates, then implement original bounded cases; none of the exemplar totals is an automatic answer oracle.

### 27 September — functional ESP bank and integration increment

- [x] Reconciled prior close-reading coverage in `docs/esp/close-reading-ledger.md`; appended cost-model findings to `assessment-distilled.md`. Confirmed report p20, p30 second figure and p31. Standalone E Task4b screenshots all three read; A screenshots pp1–3 including both p3 figures read. **Remaining source image reading:** A Task4b pp4–7 (five images); these have unique binary hashes, so inspect rather than assume duplicates. All related native code/text already read.
- [x] Authored `data/esp.js`: ten coherent recipes, 30 independent multipart question templates, five variations each (150). T1 schedule/capacity/testing, costs/forecast, adaptation, rationale, reconciliation; T2 test selection, expected results, repair/retest, all five log columns, independent investigations. Uses tables, code, numeric/token inputs, choices and separately reviewed prose. No student code execution.
- [x] Integrated fourth bank, ESP individual codes and existing eight-character set format, lazy production asset, task/activity selection, coherent recipe/permutation selection, separate written review controls, local persistence/history display, CSV and JSON backup text. Existing question identities retained; provisional new ESP edits generated revisions12/13. Source files: `js/{bank,bank-data,codes,app,progress,unsent-answers}.js`, `scripts/build-site.mjs`, `css/styles.css`.
- [x] Added `tests/esp.test.js`: codes/recipes/permutations, packed marking and wrong answers, prose excluded from automatic marks, independent Python execution and working-day/accounting checks. Updated production-build expectation to four banks. **Full suite: 120 passed, 0 failed**, including deterministic production builds.
- [x] Diagnosed initial wider-suite failure as default system Python3.9 lacking match/case; rerun uses installed3.13.3. Useful command: `PATH=/Users/joehudson/.pyenv/versions/3.13.3/bin:/opt/homebrew/bin:/usr/bin:/bin /opt/homebrew/bin/node --test tests/*.test.js`. Node is not on non-login default PATH; use `/opt/homebrew/bin/node`.
- [ ] Complete family evidence map and current design status; check every variation for semantic alternatives, hint leakage and coverage omissions. In particular, character validation and flag state should be compared against the accepted design before declaring complete.
- [ ] Add/run focused ESP browser checks (all recipes, written response refresh/save/review, timer, mobile/zoom); complete shared browser smoke already running. Then final validation/build, link/diff checks and checkpoint closure.

**Browser state:** preview server running on127.0.0.1:8765 (session54821); isolated Chrome profile `/private/tmp/starters-esp-chrome`, debug9227 (session28829). Sandbox blocked local server/Chrome/socket access; narrow escalated launches approved. Shared smoke running session50903; log `/private/tmp/esp-browser.log`. Full suite log `/private/tmp/esp-tests.log`; focused log older failure was a test fixture missing `finished`, corrected and full suite passed. Screenshots/temp tools stay outside repo. No commit or deployment performed.

**Exact next actions:** finish five A evaluation images; persist `activity-evidence.md` (source guide currently links this not-yet-created file), reconcile validation coverage, finish focused browser test, inspect screenshots and run final checks. Do not repeat completed source reading, conversion or full test suite absent relevant changes/failures. App currently builds and passes tests; browser verification not yet certified. Timing and per-variation subject approval remain pending classroom/teacher review.

**27 September checkpoint follow-up:** all remaining twelve standalone A/E Task4b review screenshots now inspected (including five outstanding A images); reading ledger updated. Created `docs/esp/activity-evidence.md`: every recipe linked to assessment/exemplar findings, all five log columns mapped, validation coverage and UI refinements explicit. Closed character-restriction and initial-flag practice gaps in slot22 variants0/4; retained whitespace/retry-update practice elsewhere. These are newly authored unpublished content refinements, now bank revision14; four focused tests pass after change. Shared browser smoke **passed** before this content-only refinement. Full suite120-pass remains applicable to unchanged shared integration. Remaining: focused ESP browser checks/visual inspection and final validate/build/link/diff checks; no need to rerun the full suite for these isolated authored-case edits.

**27 September verification boundary:** focused ESP browser checks now pass all50 complete sets (all150 variations), 100% model scoring, saved prose after reload, independent review status, history display, JSON backup restoration and expiry submission with prose preserved and zero unearned automatic marks. Desktop/mobile screenshots inspected; all tested layouts reflow at320px. Fixed two test-only issues (persistent DevTools lexical variable and pagehide overwriting simulated deadline); no application timer defect found. Shared browser smoke passed.112 local documentation links resolve; codes freshness, design-example validator and diff whitespace checks pass. Final small presentation refinement: ESP home card now has plan/test/explain artwork and timing says “Up to”15 minutes. Rebuild and focused navigation check remain before closure; no full-suite rerun needed for this copy/art change.

### 27 September — teacher question: Excel formula practice

**Confirmed gap:** the implemented Task1 bank practises formula results and accounting logic, but has **no dedicated Excel formula-writing/debugging challenges**. Do not describe numeric costing questions as Excel syntax/reference practice. Recommended next authoring scope: SUM over complete cost ranges; SUMIF staff-hour aggregation; hours×rate; relative versus absolute references when filling a forecast; percentage-growth multipliers; annual versus cumulative profit formulas; missing cost rows/ranges. Ground these in the actual workbook formulas (both exemplars' omitted developer-cost totals are especially useful). Keep any new questions within the existing three-question recipe/five-minute-per-question model; make a concrete follow-on plan before implementation. The user's question is answered as a coverage check; no new Excel questions have been claimed or silently added.

**Current working state:** Task1/Task2 implementation, distillations and family map are saved in the working tree. Full suite120 passed; all50 ESP sets passed browser scoring/persistence/backup/timer/mobile; shared smoke passed. Final presentation build passed. Final navigation-only script exercised task/activity/new-set/permutation but failed on a test selector's quoting when returning home; selector corrected, rerun next. This is a test-script failure, not an observed application failure. Exact command: `/opt/homebrew/bin/node scripts/browser-esp.mjs --navigation-only` (local browser/server require the already-approved escalation). No commit/deployment.


**27 September final working boundary:** final navigation-only browser check passed after fixing the test selector: ESP home card, task/activity selection, new set, coordinated permutation, up-to timing and320px layout. All four steps of the current resume plan are complete to the documented review limits. Built `live/` is current. No known failing checks remain; teacher per-variation approval and classroom timing are still pending. No commit/deployment. **Next substantive action:** discuss/plan the identified Excel-formula coverage addition; reuse current evidence and workbook analysis rather than rereading or reconverting sources. Commands/results are recorded above; no need to repeat passing checks without a relevant change.

## 2026-09-27 — Add agreed Task1 Excel formula requirements

**Objective/scope:** user explicitly requests adding Excel formula practice, including “fix the errors in this formula”, to the Task1 design requirements. Documentation only; no activity implementation in this increment.

- [x] Make formula writing/completion and debugging required coverage in `docs/esp/task-1-designs.md`, mapped to costing/forecasting/reconciliation.
- [x] Specify relevant functions, reference errors, independent checks, bounded marking and existing timing limits; reconcile the evidence-map gap status.
- [x] Check documentation diff and record completion/next action. Reuse existing workbook evidence; no reconversion or runtime tests needed.


**Completed:** Task1 design now requires explicit formula writing/completion and formula-error repair, with SUM/SUMIF, rate/unit calculations, copied references, growth and annual/cumulative profit coverage. Added bounded UI/marking contracts, source grounding, worked authoring seeds and independent formula/copy checks; mapped additions to T1.2/T1.5 while preserving three-question sets and five-minute ceiling. Evidence map now records this as an agreed requirement, not merely a suggested gap. Documentation links/section anchor and `git diff --check` verified. No executable files changed or runtime checks repeated. **Next action:** plan/implement the documented formula coverage when requested; current150 variations still do not include dedicated Excel formula questions.

## 2026-09-27 — Time-boxed puzzle difficulty gap fix

**Plan (user limit about one minute):** reuse the saved25September audit; inspect existing untagged Number and measures candidates, make only defensible metadata fixes, validate/build and record remaining gaps. Do not relabel harder puzzles Beginner or claim all28 missing templates can be authored/tested in this time.
- [x] Review and tag appropriate existing mathematical-reasoning tasks for Number and measures.
- [x] Validate model answers/identities and build; record fresh filtered counts and remaining Beginner gaps.


**Completed within the bounded follow-up:** tagged nine existing numerical/counting/rate/measure tasks in `data/puzzles/maths-more.js` as `maths:number` (slots616,617,621,622,623,624,627,631,633). Inspected their generators; question text, answers, hints and difficulty levels unchanged. Number and measures counts now0 Beginner /15 Foundation /5 Standard /4 Stretch. Standard and Stretch are now selectable and both have alternative three-question combinations. Updated the original audit with the change and exact scope.

**Verification:** revision15 identities regenerated, all1106 templates/2390 variations validated with full-credit model answers; Core coverage freshness unchanged/passed; production `live/` rebuilt; explicit filtered Standard/Stretch set-selection checks and `git diff --check` passed. No runtime changes, full-suite/browser rerun, commit or deployment.

**Remaining / exact next action:** seven non-Go/non-maths puzzle families still need genuine Beginner content, and Number and measures needs Beginner content. Plan a separate authoring increment against the saved audit (at least21+3 new templates if using additions alone; prefer four per band for new-set variety). Do not relabel harder puzzles merely to make a selector available. The original one-minute request did not allow safe completion of all these authoring gaps. ESP Excel-formula requirements remain documented but unimplemented. Current site builds and no known checks are failing.

## 2026-09-27 — Teacher clarification: puzzle totals and distribution

**Confirmed target:** approximately100 active question templates per puzzle family/subtype, roughly distributed across the four challenge levels—not100 per level, and not merely the minimum three needed to enable each selector. Current family totals are100 each, with101 Go. The recent maths tag fix changes filtering only, not these totals or difficulty distribution.

**Correction to the previous next action:** do not simply add21+3 templates on top of already-full families. First compare each family's distribution with a roughly balanced four-level allocation (about25 each as a guide, not a quota that overrides difficulty). Review existing genuinely introductory candidates; where new Beginner content is necessary, rebalance the active pool by retiring appropriate surplus templates while preserving historical slots/codes. Never relabel a harder question solely to fill a band. Number and measures is a filter within Classic maths, not another100-question family; balance its coverage within the overall maths pool and maintain useful Algebra coverage.

**Next action:** persist a family-by-family rebalance plan with current/proposed active counts, educational difficulty criteria and replacements; then implement/test bounded increments. All preceding additive-minimum suggestions are superseded by this clarified target. No content changes in this clarification turn.

## 2026-09-27 — Final clarification: minimum coverage, preserve good content

**Supersedes the preceding rebalance/retirement direction:** aim for at least approximately25 active, good-quality question templates at each challenge level in each puzzle family. Preserve good existing questions even where a level already exceeds25; add suitable content to underrepresented levels. Approximately100 per family is therefore a baseline, not a cap. Do not retire good questions just to keep a family at100, or relabel difficulty merely to satisfy counts.

**Exact next action:** use the saved family/band audit to plan additions toward the approximately25-per-level minimum (not merely three to enable selection). Keep existing excess coverage. Review Number and measures/Algebra filter availability within Classic maths alongside this work; the teacher has not specified a separate100-template quota for each maths filter. No content changes or tests in this clarification turn.

## 2026-09-27 — Authorised additions to approximately25 per challenge level

**Objective:** preserve all good existing puzzles and add genuinely appropriate content until each family has at least approximately25 templates per level. Current deficits:25 Beginner in each of seven families; Classic maths13 Beginner and15 Stretch; Go none. Total planned additions203; family totals may exceed100. Inspect Number and measures/Algebra availability as part of maths authoring.

- [ ] Confirm slot capacity and choose a backward-compatible identity approach before using new addresses: current codec allows slots0–1022, while901+203 active puzzles exceed that capacity. Preserve all published slots/codes; never recycle retired identities.
- [ ] Author/check numerical starters and sequence Beginners as a first functional increment; document level criteria and independent answer checks.
- [ ] Add25 genuinely Beginner logic grids/equations/tangrams/paths/Sudoku/cages per family with independent solution checks and appropriate scaffolding.
- [ ] Complete remaining maths Stretch coverage; regenerate inventories/identities, validate/build, run relevant browser checks and checkpoint each boundary.

**Implementation constraints:** use existing controls and cached generators/solvers, explicit hints, meaningful variations and pending teacher calibration. Do not turn a count target into synonymous duplicate templates or relabel existing harder content. Keep completed increments buildable. No delegation authorised. Next inspect actual unused historical slots and existing helper/generator APIs, then implement a bounded increment while recording the upcoming codec capacity change.

**27 September first functional authoring increment completed:** added13 Beginner Number and measures templates ×5 variations (65) in `data/puzzles/maths-beginner.js`, slots985–997, imported in `data/puzzles.js`. Reviewed prompt/hint/answer pairs and removed duplicated/directly supplied assessed points. Independently checked all65 numeric answers with Python arithmetic/unit/statistics calculations. Model marking and production build pass after final editorial changes; puzzle inventory regenerated (914 templates). Existing content preserved. Classic maths now25/26/52/10 across Beginner/Foundation/Standard/Stretch; Number and measures13/15/5/4. Subject approval/timing pending; no new controls or full-suite/browser rerun. No commit/deployment.

**Exact resume point:** remaining190 family-level additions (seven families ×25 Beginner;15 Stretch maths). Historical address audit:122 unused slots before this increment,109 now; all190 cannot fit the current1023-slot per-type codec. Design/test a backwards-compatible extended address format before exceeding capacity; preserve old codes and identities. Current bank and `live/` are functional. The first numerical increment is complete; the overall approximately25-per-level programme remains unfinished. Reuse saved audit, existing generators/solvers and the new level criteria; do not repeat completed ESP reading or this65-variation arithmetic check.

## 2026-09-27 — Agreed54-bit codec and continued puzzle additions

**User-approved format:** nine Base64url characters,54bits =7 version +2 type +3×(12 slot +3 variation). Slots0–4094 usable;4095 unused sentinel. Optional tenth timer character. Supersede old nine-character timed share codes; retain eight-character untimed decoding. Individual textual codes retain their variable-length numeric slot. Preserve stored historical progress where its old format can be identified unambiguously from saved metadata; do not guess ambiguous pasted nine-character strings.

- [ ] Implement/test codec and update sharing, timer, diagnostics and documentation; audit persisted history/active attempts/backup handling for legacy timer format.
- [ ] Verify a working build before expanding slots; then continue remaining190 puzzle additions from the previous plan, retaining good content and approximately25 minimum per level.
- [ ] Independently check new content, update inventories and run relevant browser/shared checks at working boundaries.

**Next:** inspect progress canonicalisation and existing codec/history tests. No subagents authorised; no deployment requested. Earlier one-minute increment is complete; this is the newly approved format-and-content continuation.

### 27 September — codec/content progress and fairness requirement

-54-bit codec implemented (nine/tenth timer), legacy untimed decoding and explicitly marked saved-data migration. Existing120 tests passed before the final migration-route refinement; three new boundary/migration tests pass. Browser check still pending. Documentation updated; format fields use BigInt throughout.
- Generated25 Beginner boards in each of six interactive families, at slots1024–1173. New single-category logic, small sum/difference grids, heavily supplied4×4 Sudoku, short dot paths, four-guide tangrams and3×3 addition cages. All existing boards retained. Generator `scripts/add-beginner-puzzles.py`; generation complete. Independent solver/marking/browser checks pending.
- Drafted25 Beginner sequence templates (1174–1198) and15 numerical maths templates (1199–1213), five variants each. **Do not claim final level coverage yet:** numerical drafts include routine multi-step calculations that need Foundation/Standard classification rather than automatic Stretch labels. Models/editorial review pending.

**User fairness refinement:** review existing as well as new labels; reclassify genuinely misgraded items. Counts must not dictate difficulty. Preserve quality and add genuine Stretch replacements where a reclassification creates a shortfall. Pending work: define/evaluate evidence-based family criteria, classify the numerical drafts fairly, add real Stretch content, independently verify all additions, update code/docs/build and browser tests. The large generation is saved; do not repeat completed tangram generation.

**27 September fairness/content increment:** independent solver validation passed all870 served interactive puzzle variations (including the150 new Beginner boards). All seven Beginner families now authored (25 sequence templates additionally have five variations). Reclassified13 of the15 numerical drafts as Standard: routine multi-step calculation alone is not Stretch. Retained pack optimisation/three-set reasoning as Stretch and added15 distinct harder reasoning templates (1214–1228). Existing Weighing capacity and Reliable majority are reclassified Stretch→Standard after inspecting all generators: their supplied structure substantially reduces inference. Corrected misleading “Optimal adjacent merges” title to “Optimal merges” (prompt already permits any pair). Added two replacement Stretch reasoning families for limited-stock guarantees and box-volume optimisation, preserving minimum coverage. Fixed the draft filtering example so every percentage produces whole record counts. Numerical independent checks, final fairness documentation and browser checks still pending; generated boards need not be rebuilt.

**Teacher reminder — Go:** preserve source problem grading and the agreed mapping (Beginner25k+, Foundation18–24k, Standard12–17k, Stretch11k and stronger). Do not substitute tree depth or generic puzzle heuristics. Existing Go pools26/25/25/25 already meet the target; `data/puzzles.js` continues deriving Go levels from recorded sourceRank/cached rank attribution. No Go problems or grades changed in this work.

**27 September independent checks saved:** all275 new sequence/maths variations pass `scripts/verify-puzzle-additions.py`, using independent Python enumeration, recurrence, combinations and Decimal arithmetic. Interactive validation already passed870 served variations. No Go data changed. Final steps: refresh inventory and identities, enforce25-per-band regression checks, build, run shared tests/browser checks for the codec migration and inspect new high-slot puzzles. Teacher approval and student timing remain pending.

## 2026-09-27 — User-requested stop and handover

**Stopped at the user's explicit request.** Implementation is saved but this codec/puzzle increment is not fully verified. Do not describe it as ready to deploy. No commit or deployment performed.

### Completed and saved

- Implemented the agreed54-bit codec: nine-character set codes, optional tenth timer character,4095 usable question slots per type. Eight-character untimed legacy decoding remains. Old nine-character timed pasted codes are superseded; explicitly old saved progress/backups migrate using format metadata. Changes in `js/codes.js`, `js/progress.js`, `js/app.js`, codec tests and sharing documentation.
- Added150 Beginner interactive boards (25 each: logic grids, equations, Sudoku, paths, tangrams, number constraints),25 Beginner sequence templates with125 variations, and30 numerical maths templates with150 variations. Earlier13 Beginner maths templates with65 variations are also saved. Preserve generated content; especially do not repeat tangram generation.
- Fairness review placed13 new routine applied maths templates at Standard, two at Stretch;15 additional reasoning templates at Stretch. Existing slots621 and632 were moved Stretch→Standard based on supplied scaffolding. Slot633's misleading “adjacent” title was corrected; its prompt already allowed any pair.
- **Go unchanged:** source problem grades govern levels: Beginner25k+, Foundation18–24k, Standard12–17k, Stretch11k and stronger. Existing26/25/25/25 distribution meets target. No tree-depth grading. Corrected the obsolete historical tree-depth statement in `docs/spec-puzzles.md` to make its supersession explicit.
- Latest generated inventory: **1119 puzzle templates**, at least25 per family/level. `data/coverage/puzzle-inventory.json` regenerated27September. Classic maths143; sequences125; six interactive families125 each; Go101. Inventory is the authoritative detailed count.
- Last edits renamed the misleading `data/puzzles/maths-stretch.js` draft to **`data/puzzles/maths-applied.js`** (13 Standard/two Stretch), updated imports and the independent checker, and fixed prompt spacing. Other new files: `maths-reasoning-stretch.js`, `sequences-beginner.js`, `scripts/add-beginner-puzzles.py`, `scripts/verify-puzzle-additions.py`, `tests/extended-codes.test.js`.
- Updated `tests/puzzle-enrichment.test.js` to require25 per level in every family, retaining explicit Go source-rank assertions. Updated current specification total and target in `docs/spec-puzzles.md`.
- **Last command completed:** `node scripts/question-codes.mjs --update` prepared question revision17 after the final authoring edits; no subsequent validation/build/test run before the stop.

### Verification already completed (reuse these results within their limits)

- Existing120 tests passed after the initial codec implementation, before the final migration-route refinement and bank additions. Three new codec boundary/migration tests passed after that refinement.
- Independent interactive solver validation passed all870 served interactive variations, including all150 new boards. No board changes since that pass.
- Independent Python checker passed all275 new sequence/applied/reasoning numerical variations. Subsequent changes were the applied-file rename, prompt spacing and portable Node lookup; rerun the checker once to verify those final edits/imports.
- Earlier13 Beginner maths variations (65) independently checked and that earlier increment validated/built.
- **Not yet verified:** final all-bank validation, full test suite, production build and browser tests for the combined codec/content changes. The current `live/` output predates these final changes and must be rebuilt. Do not infer current source readiness from the earlier live build.

### Exact next actions when resumed

1. Read this entry and relevant diff only. Run `scripts/verify-puzzle-additions.py` once after its rename/import edits. Review final new numerical wording and hints; new questions remain `reviewStatus: pending` for teacher approval/student timing.
2. Finish a concise fairness/coverage completion section in `docs/reviews/2026-09-25-puzzle-level-coverage.md` using the regenerated inventory; its latest narrative still describes the earlier partial increment. Keep historical records rather than overwriting them. Check other current count/code-format documentation for stale claims.
3. Run identity check, bank validation and coverage freshness, then build: `node scripts/question-codes.mjs --check`, `node scripts/validate.js`, `node scripts/coverage.js --check`, `node scripts/build-site.mjs`. Revision17 was already generated; regenerate only if subsequent edits change fingerprints.
4. Run the full tests because codec/progress/sharing changed: `PATH=/Users/joehudson/.pyenv/versions/3.13.3/bin:/opt/homebrew/bin:/usr/bin:/bin /opt/homebrew/bin/node --test tests/*.test.js`. The default Python3.9 is too old for some existing test helpers. Resolve failures and record results.
5. Run shared browser smoke against freshly built `live/`, adapting legacy test assumptions only where the agreed codec changes require it. `scripts/browser-smoke.mjs` already has new nine/tenth-character expectations and codeFormat54 in new backup fixtures. Preview representative new boards/numerical questions, high-slot sharing in an independent browser context and timed progress recovery. ESP navigation/share checks as relevant. Existing isolated preview8765/Chrome9227 may still be running; check rather than duplicate them. Screenshots/logs belong in `/private/tmp`.
6. Record final checks and remaining limits in this checkpoint; mark the codec/content plan complete only when those checks pass. No deployment authorised/requested here.

**Other preserved scope:** dedicated Task1 Excel formula writing/debugging is documented in `docs/esp/task-1-designs.md` but not implemented. Existing ESP Task1/Task2 activity implementation and source research remain saved; do not repeat conversions or close reading. Preserve all pre-existing repository modifications. No further implementation or tests were run after the stop request.

## 2026-09-28 — Resume final puzzle/codec verification

Objective: finish the saved slice without repeating completed generation or solution checks. The repository starts clean; prior work has been persisted in its current baseline.
- [x] Review final numerical wording and current coverage/code documentation; document fair difficulty criteria and final counts.
- [x] Rerun numerical checker after its rename, validate identities/bank/coverage, build and run full tests for shared codec/progress changes.
- [x] Verify browser sharing, timers/migration and representative new high-slot puzzles; resolve concrete failures.
- [x] Record results and exact remaining limitations; keep the site build functional. No deployment or ESP formula implementation in this slice.

**28 September checks:** numerical reference checker passes275 variations; identities, bank validation (1324 templates/2880 variations), coverage freshness and production build pass. Full suite now123/123 after removing an obsolete clue-count assertion; exhaustive logic-grid uniqueness remains enforced. Browser checks required canonical nine-character display expectations for legacy links; updated assertions and added ESP to peer-browser sharing. Browser completion pending.

**Final fairness correction plan:** the newly added cumulative doubling task (slot1223) supplies its recurrence and only requires running totals, so classify it Standard. Preserve the question/identity. Add one genuinely Stretch constrained-order counting task at unused slot1229, independently enumerate its five variations, refresh identities/inventory/build and verify. This avoids retaining an inflated difficulty label to satisfy the25 minimum.

**28 September final verification progress:** shared browser smoke passed, including peer-browser sharing for all four types and timer/backup/legacy-code flows. The final fairness correction added slot1229 (five independently enumerated variations) and relabelled1223 Standard; inventory now1120 puzzles, Classic maths144 (25/26/68/25), all families at least25 per level. Independent numerical checker now passes280 variations. Final bank validation1325 templates/2885 variations and production build pass;18 focused puzzle/codec tests pass after the numerical addition. Full123-test pass remains applicable to unchanged shared runtime code.

Focused browser checks exercised13 high-slot puzzles through actual controls, marking, saved-answer reload, reveal,320px and200% zoom. All passed. Legacy timed active work also passed migration/second reload with the same ID, answers and deadline. Test harness corrections: use a full navigation to install a legacy fixture (hash navigation does not reload scripts), and check persisted migration after pagehide/reload, matching the app's existing save lifecycle. No application runtime fix was needed. Screenshots/logs in `/private/tmp/starters-*`; updated review in `docs/reviews/2026-09-25-puzzle-level-coverage.md`.

## 2026-09-28 — Slice complete

The puzzle coverage and54-bit sharing-code slice is complete for local use. All current plan steps above are checked. Earlier unchecked historical plans describe interrupted stages, not remaining implementation. Final ESP navigation check also passed; `git diff --check` passed. The current `live/` build matches source and includes all1120 puzzles. No commit or deployment performed in this session.

**Outcome:** all nine puzzle families have at least25 templates per challenge level; existing good surplus questions retained. Source-graded Go unchanged. Nine-character set codes and optional tenth timer support slots0–4094; legacy untimed links and explicitly old saved data/backup migration verified. See the28September review for counts, fairness criteria and test evidence.

**Remaining limitations, not unfinished checks:** teacher subject approval and measured student timing/hint calibration remain pending. Browser verification used isolated Chrome, not a cross-browser accessibility certification. Dedicated ESP Task1 formula challenges remain documented but unimplemented and were outside this slice. No further puzzle additions, broad reruns or deployment are needed merely to resume; await the next task.

**Clarification to user:**1119 puzzles were already authored at the prior stop. This session primarily completed the previously outstanding whole-slice verification and documentation. The one additional question replaced Stretch coverage after a fairness-driven reclassification; it was not the main workload.

## 2026-09-28 — ESP Excel formula slice and optional design review

Objective: prepare the agreed two Task1 Excel formula sets, using cached assessment/workbook evidence, and present the concrete outline for teacher review before implementation, as agreed in the immediately preceding exchange.
- [x] Read only relevant Task1 requirements, evidence routing and existing activity structure.
- [x] Document two three-question sets (each question ≤5 minutes), meaningful variations, equivalent-formula marking, feedback and independent checks; share for review.
- [ ] Pending outline review: implement the agreed sets, validate/build and run focused checks in a subsequent authorised increment.
- [x] If capacity permits, review saved Task3/Task4a/4b designs and primary documentation for reusable browser flowchart editing; document recommendations without implementation.

**28 September formula outline completed:** `docs/esp/task-1-formula-outline.md` now specifies six independent questions, timing/points, worked spreadsheet cells, five meaningful variation roles, equivalent/copy-aware formula marking and integration checks. Reused cached A/E workbook cell evidence and distilled assessment; no conversions repeated. Verified current Microsoft SUMIF and reference semantics to avoid teaching that unequal SUMIF range sizes necessarily raise an error. The outline is awaiting the teacher's requested pre-implementation review; an asynchronous question is pending while the independent Task3/4 design review continues.

**Buildability constraint reaffirmed:** this increment changes documentation only; tested source and `live/` remain intact. Future implementation must use small validated/buildable boundaries, record exact pending work before approaching a limit, and avoid partially wired runtime features.

**28 September design increment complete, awaiting outline response:** `docs/esp/tasks-3-4-design-review.md` records revised Task3 make/fix/trace flowchart practice, focused Task4a/4b refinements, bounded semantic grading/accessibility requirements and primary-source comparison of draw.io embed, maxGraph and React Flow. Recommend a later two-question maxGraph prototype, not a new custom canvas editor; no package installation/prototype performed. Source-guide links and parent design links updated. Six Task1 outline arithmetic seeds independently checked with Python/Decimal; spreadsheet-engine verification belongs to implementation. Documentation diff checks pass; no runtime/source-bank/build changes in this design increment, so the previously tested working build remains intact without an unnecessary rebuild.

**Exact next action:** read the teacher's response to the pending Task1 outline review. If accepted, plan the smallest complete formula-marking/content increment, preserving buildability; use `task-1-formula-outline.md` instead of repeating workbook/web research. If changes requested, revise the outline first. The preceding offer explicitly put outline review before implementation; no skill-imposed approval barrier. Task3/4 work remains design-only. Current completed scope is the concrete outline plus optional design/tooling review, not implemented formula activities.

## 2026-09-28 — Compare Task3 interactive flowchart options

User redirects the active task to Task3 tooling comparison. Task1 formula implementation remains pending; no pre-implementation outline approval is needed merely for its later student-facing review, but do not resume it during this Task3 comparison.
- [x] Reuse saved tooling research; verify primary documentation for maxGraph and credible alternatives against standard shapes, editing, persistence, accessible interaction and assessment integration.
- [x] Persist a concise comparison and recommend the best bounded prototype for this vanilla-JS/esbuild static site.
- [x] Present choices and material trade-offs. Research/documentation only; preserve the working build without dependency or runtime changes.

**Completed:** expanded comparison saved in `docs/esp/flowchart-editor-comparison.md`, linked from design/source guides. Verified maxGraph conventional primitives/custom stencils and editing/persistence; compared draw.io complete hosted editor, JointJS core versus commercial UI plugins, and React Flow custom shapes/framework/accessibility trade-offs. Recommend a bounded maxGraph make/repair prototype; documentation evidence only, no performance/usability claims from testing. No dependency/runtime/build changes; documentation diff check passed and existing functional site preserved.

**Exact next action:** follow the user's Task3 direction after presenting the comparison; if proceeding, plan a small buildable editor prototype with normal flowchart shapes, saved graph semantics, keyboard edge controls and a make/fix pair. Task1 outline-review gate from the previous entry is superseded by the user's preference to review implemented activities later; Task1 implementation itself is deferred while Task3 is the focus. Do not repeat completed source conversions or library research.

## 2026-09-28 — Implement Task1 formula activities; record Task3 decision

User authorises implementation for evaluation in the starter pages. No further outline approval required.
- [ ] Record maxGraph/vanilla-JS choice, limited standard-shape UI, inspectable marking model and rationale in Task3 plan.
- [ ] Inspect existing marker/renderer/ESP recipe contracts; implement a bounded Excel formula marker with meaningful equivalence/copy tests as a standalone buildable increment.
- [ ] Add six independent questions ×five variations in two formula recipes under Task1, preserving existing slots; wire rendering/marking/selection and regenerate compatibility/build.
- [ ] Verify independent spreadsheet/reference calculations, accepted/wrong formulas, browser scoring/navigation/reload and relevant shared tests. Record direct review codes and limitations.

**Standalone marker boundary:** Task3 maxGraph choice/plan recorded. Added `js/excel-answer.js` and three focused tests; all pass. Parser admits only bounded Excel syntax and reuses the existing exact polynomial comparator, keeping cell inputs symbolic and checking each copy destination. SUMIF uses symbolic match/amount dependencies; unsupported functions/range semantics return a Needs review message. No app wiring yet; existing build remains functional. Added the six-question draft bank in a separate unimported module; next integrate it atomically with renderer/marker/recipe changes, verify all models, then build.

**Scope update — user clarification:** implement the Excel activities directly in the app now, also implement draft Task3 activities, and add a centrally configured per-activity-type “In development” header notice (ESP enabled; exam configurable). No further design approval. Complete Excel integration/build first, then a small maxGraph integration and Task3 draft bank with focused checks. Preserve buildable boundaries; no live deployment requested.
- [ ] Add central page/type development-status configuration and ESP header notice.
- [ ] Implement draft Task3 activities with standard-shape make/fix controls, inspectable marking and existing persistence.

**Excel integration boundary complete:** six questions ×five variations are now imported into ESP as T1.2F and T1.5F (slots30–35). The spreadsheet extract renderer, equivalent/copy-aware marker and review routing are wired. All models validate (1331 total templates/2915 variations), production build succeeds and focused Excel/ESP tests pass. Browser/reference checks still pending. Central `js/page-status.js` enables the header notice for ESP(type3) only; exam(type1), programming and puzzles are disabled. User explicitly reconfirmed ESP-only notice.

## 2026-09-28 — Navigation, theme and question-language review

Objective: place ESP within exam practice, fix card graphic layering, simplify the theme toggle, assess search tags and audit ambiguous synonym choices and reasoning coverage.
- [x] Inspect navigation/style contracts; implement ESP entry within exam practice and compact adaptive theme icon.
- [x] Audit authored question wording across banks; correct concrete awkward synonyms without changing assessed concepts or stable slots; record scope and limitations.
- [x] Inspect tagging and data-structure/computational-thinking choice/reason coverage; document findings and search proposal (no search implementation requested).
- [x] Refresh affected generated data/build, run proportionate validation and focused browser checks; record outcomes and next action.

**Scope clarification:** future Year 2 OS belongs beside Core and ESP within Exam practice. Preserve independent full-capacity banks (4,095 usable slots each), never partition Core's slots or encode section IDs in question-slot bits. Current sharing format has only four bank IDs; OS will require a backward-compatible bank-ID extension before its content is added. This navigation increment will use a section registry, with the codec extension recorded as an explicit OS prerequisite rather than silently claiming a fifth bank already works.


**Completed:** home now has three full-width cards with content over faded background graphics. Exam practice opens registry-driven Core/ESP choices, and activity back links return there. Theme control is a 22px changing moon/sun icon with a 44px keyboard/touch target and persisted preference. Independent banks/codes remain unchanged by navigation. Future OS capacity contract is in `docs/spec-common.md` and `docs/reviews/2026-09-28-navigation-wording-search.md`; the 2-bit bank identifier still requires expansion before a fifth bank can be added.

**Wording/coverage:** targeted vocabulary screen of all rendered banks, followed by contextual review of candidates, corrected nine templates (exam26/43/101/103/117/142/151/152, ESP15). Pre/post rendered-data comparison confirms all answers, alternatives, options, marks, dependencies, coverage, hints and explanations unchanged. Search proposal and precise choice/reason gaps are in the review. No search feature or new questions added. Teacher subject review remains pending; this is not an exhaustive fresh subject approval.

**Verification:** coverage regeneration, compatibility revision18, bank/model validation (1331 templates/2915 variations), production build and32 focused tests passed. Full existing browser smoke passed including peer-browser sharing for all four banks, persistence, scoring and navigation. Final focused browser checks passed at1280/640/320px in both themes, keyboard focus, menu reload and ESP recipes. Visual inspection caught obsolete four-column desktop and90px mobile card rules; both removed, rebuilt and focused checks repeated with an explicit full-card text-width assertion. Final light desktop/dark mobile screenshots inspected. Artefacts remain in `/private/tmp/starters-*`. `git diff --check` passes. No deployment or commit.

**Resolved check harness issues:** pre/post comparison initially distinguished undefined properties from missing JSON properties; normalised both snapshots before comparing. Browser access required approved local server/Chrome commands. One non-login npm call could not find npm; used the absolute Node path for the build. These were tooling issues, not remaining application failures.

**Exact next action:** present the implemented changes and search/coverage discussion. Await direction on keyword search and/or new linked-reason question authoring. OS content/codec implementation is future work; keep its full independent bank capacity requirement. Prior session Task3 drafting is not part of this navigation/wording increment.

## 2026-09-28 — Record agreed rollover policy and finish numbered review

Objective: document the agreed eight-bank/nine-character design and rollover-aware progress policy, then complete the original five-item response using the verified implementation and saved audit.
- [x] Record six version bits/three bank bits, rollover metadata/date fallback, stable topic-level revision evidence and explicit old-code compatibility cutoff; distinguish agreed design from current runtime.
- [x] Reconcile conflicting current specification statements and link the decision from the navigation review.
- [x] Finish items3/5 with concrete tagging/selection recommendations and existing-versus-missing justification coverage; reuse completed items1/2/4 and checks.
- [x] Check documentation diff and record completed work. No search, question expansion or codec implementation inferred from a request to document/discuss.


**Completed:** `docs/code-rollover.md` records the agreed6+3-bit successor layout,64 version values/eight independent banks, generation metadata, latest UTC rollover date, live-versus-tracked version fallback, date limitations, import/export preservation and retained comparable CA/topic evidence. Old shared-code ambiguity after rollover is explicitly accepted. Initial7+2→6+3 layout migration is separately identified as unresolved implementation design; runtime remains unchanged. Reconciled no-rollover and permanent-identity wording in `docs/spec-common.md` / `docs/implementation-plan.md`, linked the decision from the navigation review. Documentation diff check passed; no build/tests repeated for documentation-only work.

**Original numbered list:**1/2 implemented and browser-verified in the preceding entry;4 targeted wording audit and nine-template corrections complete with recorded scope;3 search suitability/design discussion and5 existing/missing choice-reason coverage ready for final response. Search implementation and new question authoring were not requested by those discussion/check questions and are not silently treated as completed features.

**Exact next action:** deliver the five-item findings and documentation link, then follow the user's choice of search implementation or linked-reason content expansion. Do not reopen completed UI checks or implement the new codec merely because its design is now documented.

## 2026-09-28 — Implement eight-bank encoding and reasoning questions

Objective: implement the agreed six-version-bit/three-bank-bit code format and add a few linked choice/reason questions for data structures, computational thinking and specification search algorithms.
- [ ] Inspect codec/history/progress contracts and choose an explicit compatible format transition; implement eight-bank encoding, generation/rollover metadata and necessary persistence protections.
- [ ] Reuse source mapping; author a small grounded batch of new stable-slot questions with two meaningful variations each and linked reasons.
- [ ] Update focused codec/progress/content checks, generated compatibility/coverage and production build; run shared regression checks appropriate to the encoding change.
- [ ] Record exact compatibility behaviour, verification and remaining limits.

**Scope update:** user adds sorting comparisons, naming bubble/quicksort/merge. Current spec CA2.11 lists bubble/insertion/merge, so include insertion as Core and clearly label quicksort extension; do not claim quicksort-specific work as assessable Core coverage. Encoding transition uses published legacy versions<=18 in7+2 and new versions19–63 in6+3 for generation0; after rollover all0–63 use6+3. No ambiguous best-guess decoding.

**Paused mid-implementation, pre checks** must carefully check for incomplete work and finish testing.

## 2026-09-28 — Reconcile README and current status

Objective: update current-facing documentation after the paused implementation was reviewed and tested, without rewriting historical checkpoint records.
- [x] Update README counts, bank revision/code format and implemented ESP scope from generated/current sources.
- [x] Append a minimal current-state clarification distinguishing implemented, planned and pending-review work.
- [x] Confirm the browser-test guidance reflects proportionate checks for minor changes; verify links and documentation diffs. No application changes.

**Current true state:** the clean repository baseline implements bank revision 19, the generation-aware 54-bit six-version-bit/three-bank-bit code format, four lazy banks, 1,120 puzzles, 121 Core exam questions, 63 Python questions and 36 ESP questions. ESP Task 1/2, including the six Excel-formula questions, is implemented. Core comparison/reasoning slots 161–169 are implemented. Task 3 flowchart activities, Tasks 4a/4b, keyword search and Year 2 OS content are planned only; maxGraph is installed and the Task 3 design is recorded, but there is no Task 3 runtime bank, editor integration or test coverage yet.

**Verification after the paused commit:** 132 tests pass; question identities, all 1,340 templates / 2,933 variations and generated coverage validate; all 18 new comparison variations pass focused browser scoring, reload, reveal and 320 px checks; shared browser smoke passes current/legacy sharing, migration, timers, persistence and all four banks. Teacher subject approval and classroom timing remain pending.

**Efficient-check policy:** focused browser scripts are intentionally standalone and selected for the changed surface. Bank-only and minor visual changes use focused checks rather than the full suite. Shared codec, storage, schema, marker, selection or build changes justify broader tests and shared smoke; the revision-19 codec change received those broader checks. README now states this explicitly. Documentation diff checks pass; no application files changed in this clarification.

## 2026-09-28 — Restore home-card artwork presentation

Objective: retain selector-card artwork behind content while surgically restoring its prior opacity and vertical position.
- [x] Compare the current CSS with the immediate pre-layering commit and identify only the artwork opacity/position changes.
- [x] Restore those values without changing card structure, layering or unrelated responsive rules.
- [x] Build and inspect the home cards at desktop/mobile widths; record the exact change and checks.

**Completed:** retained the absolute full-card background layer and `z-index:-1`, removed the added light/dark opacity reductions and restored the three graphics to their measured pre-layering vertical offsets. Desktop rendered positions match within 0.5 px; opacity is `1`. Production build passes with 1,340 templates. Light/dark desktop and 320 px mobile cards were inspected; no card/page overflow or hidden controls. This isolated CSS correction used the documented focused visual check rather than the full suite. Generated `live/` is current; no other application behavior changed.

### Card-art readability follow-up

- [x] Add white/light-theme and black/dark-theme shadows to selector-card paragraph text only.
- [x] Move only the puzzle grid background artwork up 10 px.
- [x] Rebuild and inspect desktop/mobile cards in both themes; record completion.

Paragraph text now uses a 5 px white shadow in light mode and black shadow in dark mode. The puzzle grid top offset is 17 px, exactly 10 px above the prior restored 27 px position; the other graphics are unchanged. Production build, computed-style checks and light/dark desktop plus 320 px inspection pass with no page/card overflow. No full suite was needed for this isolated CSS follow-up.

### Paragraph wrapping around card artwork

- [x] Add per-card floated exclusion shapes inside paragraph text, aligned with the existing artwork bounds.
- [x] Use a small negative inline margin so text intentionally overlaps the exclusion boundary.
- [x] Rebuild and inspect desktop/mobile wrapping in light and dark themes; preserve artwork position and opacity.

Puzzle and exam paragraphs now use rotated `shape-outside` polygons matched to their rendered artwork bounds, with `margin-inline-start:-8px` for the requested slight overlap. The programming artwork ends above its paragraph, so no unnecessary exclusion is added. Shapes apply from 601 px upward with adjusted tablet alignment; at 600 px and below the artwork already ends at the paragraph boundary, so wrapping remains unchanged. Production build and focused 1280/640/320 px checks pass without horizontal overflow; artwork position, opacity and theme shadows are unchanged.

### Simplify responsive home-card layout

- [x] Replace the selector grid with one centered, wrapping flex layout that fits three, two or one card per row.
- [x] Keep one card composition and one artwork size at all breakpoints; allow cards below 340 px only when the viewport requires it and cap them at the current 380 px design.
- [x] Remove obsolete breakpoint-specific card layout/graphic sizing rules, rebuild and inspect representative three/two/one-column widths.

**Completed:** `.activity-grid` is one centered wrapping flex row; cards use `flex:1 1 340px` and `max-width:380px`. The current 380 px card is the canonical design. Three, two or one card fits per row according to available width; cards stay within 340–380 px unless the content area itself is narrower than 340 px. Removed mobile/tablet changes to card padding, typography, artwork dimensions/transforms/offsets and paragraph-shape alignment. Production build passes. Focused checks confirm centered 380 px two-card and one-card layouts, 323/263 px constrained cards at narrow widths, unchanged artwork dimensions and no horizontal overflow. No full suite was needed for this isolated layout change.

### Neutral multiple-choice selection colour

- [x] Audit pre-marking selected-option styles and existing shared colour tokens.
- [x] Define one commented amber selection source of truth and apply it only to unanswered/selected multiple-choice options.
- [x] Preserve marked correct/incorrect feedback colours; rebuild and inspect selected and submitted states.

**Completed:** `css/tokens.css` now owns the commented semantic `--selection-bg`, `--selection-border` and `--selection-text` values, including the dark-theme amber background. Generic multiple-choice options and existing puzzle/challenge pre-marking selections use those tokens; the dark green checked-option override was removed. Correct/incorrect feedback retains its separate green/red palette. Production build passes. Focused browser checks confirm amber selected options in both themes and a submitted 100% answer retains dark-theme green correctness feedback. No full suite was needed for this isolated styling change.

## 2026-09-29 — Plan simple semantic colour theming

Objective: first correct the dark-theme selected tone, then migrate the current visual palette to five centrally defined semantic roles: main tone, accent, selected, correct and incorrect. Planning and risk review precede implementation.
- [ ] Inventory current tokens, hard-coded component colours, theme overrides and state-specific contrast dependencies.
- [ ] Define light/dark role tokens and a bounded mapping from existing UI roles; identify colours that should remain neutral or component-specific.
- [ ] Present migration order, validation scope and risks before implementation. First implementation increment will correct dark selected styling; broader token conversion follows only after the plan is reviewed.

## 2026-09-30 — Investigate theming progress and requirements

Objective: establish the implemented theming baseline and locate the intended approach/features without changing application behaviour.
- [x] Read theming handovers, design/decision documents and relevant source/history.
- [x] Compare the current implementation with the latest five-role migration plan; identify gaps and stale documentation.
- [x] Record findings, verification limits and the exact next action; report relevant references to the user.

Scope: repository investigation and checkpoint update only. Checks: source/history comparison and documentation diff; no build or browser run unless needed to resolve a discrepancy.

**Findings:** the light/dark toggle is implemented in `js/theme.js`, wired by `js/app.js`, with a changing sun/moon icon, `aria-pressed`, and browser-local preference (`dsd-starters-theme`). It defaults to light when no dark preference is stored. Selection background/border/text tokens are centralised in `css/tokens.css` and used by generic choices plus puzzle/challenge controls. Latest commit `b448cd9` (29 September) includes dark selection values and generated assets; its title says the dark highlight was fixed. This is more progress than the unchecked 29 September planning entry alone suggests, but does not establish that the latest requested tone is visually accepted.

**Outstanding:** five-role conversion (main tone, accent, selected, correct, incorrect) is not implemented. Most dark base overrides remain in `css/styles.css:68`; feedback, hover and other component colours remain hard-coded. The 29 September checkpoint is the only located explicit five-role migration brief: inventory first, define light/dark role mapping and exceptions, then present migration order/checks/risks before broader implementation. No completed mapping or dedicated migration design document was found. `docs/style-guide.md` remains explicitly a draft and its initial purple primary palette is not the implemented green palette. `docs/decisions/2026-09-student-experience-and-shared-codes.md#selectable-theme` is the adopted functional requirement: saved local toggle and readable controls, feedback, puzzles and progress in both themes. Style-guide contrast/reflow/keyboard targets remain relevant.

**Verification/limits:** compared source, relevant documentation and Git history; existing smoke/ESP browser scripts contain theme persistence, icon and light/dark layout checks. Did not rerun browser tests or build for this investigation; historical passing checks are not a new visual or contrast certification. Application files unchanged.

**Exact next action:** if implementation is requested, inventory remaining colour declarations and prepare the five-role light/dark token mapping, neutral/component exceptions and focused contrast/state checks for review; first reconcile the already-committed dark selection tone with the intended correction.

## 2026-09-30 — Assess a faster local development workflow

Objective: recommend a local preview workflow before implementation, and preserve the expanded theming scope (configurable page gradients and card borders, including gradient borders).
- [x] Inspect source/production bank routing, dependency imports and commit build behaviour.
- [x] Compare a manual local/prod flag with automatic development serving; record a concrete recommendation and limitations.
- [x] Report findings without implementing the workflow or theme changes.

Checks: inspect existing scripts and relevant official tooling documentation. No production rebuild needed for this assessment.

**Assessment completed:** source `js/bank-data.js` already imports readable banks; `scripts/build-site.mjs` substitutes the encoded lazy loader only for production. `scripts/pre-commit-build.mjs` builds an isolated staged snapshot and stages `live/`; changing a tracked mode flag is unnecessary and would complicate that boundary. A plain static root server is insufficient because browser imports include npm packages (`mathjs`, `fflate`).

**Recommendation (not implemented):** add Vite for local development only, with `npm run dev` serving the authoring entry, resolving dependencies and updating CSS on save; preserve the existing esbuild production build and staged-source hook. No tracked local/prod switch. Source banks remain readable and currently load eagerly; production retains encoded lazy loading. Development skips production packing/validation; keep those checks at production/commit boundaries and verify production behaviour separately. An esbuild watch/serve alternative reuses the existing dependency but still incrementally bundles and requires additional reload plumbing. Official references checked: https://vite.dev/guide/why.html and https://esbuild.github.io/api/#serve .

**Expanded theme scope:** add centrally controlled page/card backgrounds (solid or gradient), card border width/style/colour and optional gradient treatment, radius and shadow, with light/dark definitions and semantic feedback colours kept legible. This is a proposed design scope, not implemented token names or defaults.

**Verification/next action:** source and hook inspection only; no build/test run needed, no runtime edits. Discuss recommendation with user, then implement the selected dev workflow before the theme migration. Validate live CSS/source edits, bank loading/scoring and unchanged encoded production output.

## 2026-09-30 — Implement Vite preview and minimal theme system

Objective: add lightweight source preview with removal instructions, then implement central light/dark semantic colours and decorative settings.
- [x] Add Vite dev command/config and concise use/reversal documentation; retain staged production build.
- [x] Centralise main/accent/selected/correct/incorrect palettes, neutral/partial states and page/card decoration; remove superseded dark overrides.
- [x] Verify source preview, CSS live updates, both themes and selection/feedback contrast; run production build, appropriate tests and production smoke.
- [x] Document theme editing, completed checks and limitations.

Mapping: main = actions/headings; accent = contextual panels/focus; selected = unmarked amber; correct/incorrect = feedback. Neutral surfaces/text/borders and partial/warning remain explicit supporting roles. Puzzle artwork/board geometry colours remain component-specific where meaningful. Decoration uses page background image plus card fill/border image, width/style/radius/shadow with solid defaults. Risks: cascade overrides, gradient fill masking, contrast and source/production differences; check these directly. User has authorised this implementation and the earlier review gate is satisfied by the discussed approach.

**Completed:** pinned Vite 8.3.1 adds only `npm run dev` and a small `vite.config.js` (loopback 5173, strict port, no public directory, dependency scan limited to authoring index). Existing source-bank adapter, production esbuild/encoding and staged-source pre-commit hook are unchanged. `npm start` remains the original production preview. `docs/local-development.md` documents use, separate-origin browser storage, validation boundaries and complete removal without reverting theming. README now defaults to source preview.

**Theming:** `css/tokens.css` now defines light/dark main, accent, selected, correct/incorrect, warning and neutral pairs. Shared CSS consumes tokens instead of a second hard-coded dark cascade. Dark selection uses a dark amber fill/light amber label; feedback remains separate. Page image and shared card fill/border-image/colour/width/style/radius/shadow are centrally editable. Solid defaults; gradient recipe in `docs/theming.md`. Layered card backgrounds support rounded gradient borders; home artwork no longer masks the fill. Selected puzzle controls retain their fill on hover. Code surfaces and meaningful puzzle artwork have explicit exceptions. Updated stale palette guidance in `docs/style-guide.md`.

**Verification:** npm install reported zero vulnerabilities. All 132 tests pass; identities/coverage and 1,340 templates / 2,933 variations validate. Final production build passes and `live/` is regenerated. New `scripts/browser-theme.mjs` passes against Vite and production: both palettes, semantic text contrast >=4.5:1, distinct selected/correct/incorrect states, selected digit styling, gradient borders/radius, 1280/320px reflow, theme persistence and rendering all four banks. Its optional `--hmr` check passed: source token changed/restored with no reload or lost input. Final Vite configuration rechecked. Sampled control/selection/feedback boundaries exceed 3:1 in both themes. Full existing production browser smoke passes encoded lazy loading, scoring/reveal, sharing, progress, timers and puzzle interactions. Light desktop and dark narrow gradient screenshots visually inspected; screenshots remain in `/private/tmp/starters-theme-*.png`. Documentation diff check passes.

**Limits/next action:** this is not a full accessibility audit or certification of arbitrary future gradients. Defaults are deliberately solid; edit documented token values to enable decoration. No commit/deployment. Vite remains available at http://127.0.0.1:5173 and production preview at http://127.0.0.1:8765. User can review the appearance, then adjust only the central tokens. Infrastructure note: network/server/browser commands needed sandbox escalation; shell startup also emitted existing pyenv rehash-lock warnings, avoided for later browser commands with direct Node and non-login shell. These did not prevent successful checks.

## 2026-09-30 — Eight selectable themes and marked-answer colours

Objective: provide four light/four dark themes (blue, rose, apricot, sage), with two gradient themes per mode and rose gradient borders; preserve amber pre-marking and green/red marked answers.
- [x] Add paired palette presets and a persistent accessible theme selector, retaining the light/dark shortcut and old preference.
- [x] Apply outcome colours to marked selections/answer fields; clear stale outcome styling on edits and retry. Partial remains amber.
- [x] Check all eight themes, contrast at gradient extremes, responsive selector, persistence, scoring/retry and live/production behaviour.
- [x] Update concise theme docs, build output and handover with results.

Scope: theme CSS/UI and outcome presentation only; no content, code identities or marking rules change. Existing uncommitted Vite/theme work is retained. Tests: focused theme browser checks, marker/review tests and production build; broaden only for failures or shared-state concerns.

**Selector refinement:** user requests a discreet palette button adjacent to the light/dark button, explicit light/dark names and paired opposite-mode switching with default fallback. Implemented direction: native popover with labelled native select; all four palettes have counterparts, with Sage/Forest as fallback. No changes to answers when switching themes.

### Follow-on plan — Subtle semantic colour mixing

User asks for unmarked/correct/incorrect tones to blend with the palette, e.g. red leaning purple in blue themes.
- [x] Add CSS perceptual mixing of semantic base fills/borders with the active main colour; retain amber/green/red identity and readable text.
- [x] Recheck all eight palettes, gradient/semantic contrast and marking behaviour; update documentation and production assets.

Approach: `color-mix(in oklab, …)` with a smaller theme contribution for amber than correctness feedback; unmixed fallback for unsupported browsers. No changes to marks or outcome logic.

**Implemented so far:** paired Sage/Forest, Blue sky/Midnight blue, Rose/Berry and Apricot/Ember. Blue and Rose pairs have page/card gradients; only Rose/Berry have gradient borders. Discreet palette icon opens a native popover next to the sun/moon shortcut; native select labels include light/dark. Saved palette complements the existing saved mode, with validated fallback and paired toggling. No answer or score changes on theme switches.

**Marking/mixing:** current results annotate the part container so selected options, radio indicators, direct answer fields and interactive selections consume correct/incorrect (partial/review amber) tokens. Edits clear stale outcome attributes and hide stale feedback across re-render; retry starts unmarked. Shared semantic fills/borders mix in the active main colour using OKLab: 6% amber, 10% green, 14% red. Foreground text retains semantic colours. Unsupported CSS mixing falls back to the base colours. `docs/theming.md` covers presets, pairing and mixing controls.

**Checks to date:** eight-theme browser suite passes on Vite and final production: preset gradient counts, text contrast >=4.5:1 including gradient endpoints (CSS colours sampled into sRGB), popover bounds/Escape at 1280/640/320px, paired toggles, saved/invalid-palette fallback, mixed correct/incorrect MCQs and text fields before/after submission, retry and all four banks. Twenty-two focused core/packed-data/review/unsent-answer tests pass. Production build passes (1,340 templates); no bank content/identity changes. Inspected blue light desktop and Berry dark narrow screenshots, including mixed feedback. Full existing production smoke is running; exact next action: collect its result, then finish this handover. Earlier pre-mixing contrast checks are historical; current checks use mixed colours.

**Completed / final handover:** full production browser smoke passed, including encoded bank loading, scoring/reveal, persistence, shared codes, timers and puzzle interactions. All steps in this entry and the mixing follow-on are complete. Source and production previews remain on ports 5173 and 8765. `live/` matches the final implementation; changes are uncommitted and undeployed. No outstanding implementation blocker. Next action is user visual review; any aesthetic adjustments belong in `css/tokens.css`.

**Mixing source of truth:** the final `@supports` block in `css/tokens.css` derives semantic fills/borders from `--selection-base`, `--correct-base`, `--incorrect-base` (and border-base equivalents) plus the active palette's `--main`. It uses variables, not precomputed/hard-coded mixed colours per theme. Only the shared mix proportions are fixed (6/10/14% main). `docs/theming.md` documents editing and fallback; `js/theme.js` owns paired names/preference handling; `js/app.js` supplies visible marking-state attributes. The final browser contrast checks cover all eight palettes with the actual CSS mixes, but are not a full accessibility audit. No further testing is required absent new changes.

## 2026-09-30 — Planned-feature audit and theme preview/tweak controls

Objective: identify genuinely planned but unfinished features, replace the theme dropdown with eight abstract preview buttons, and add saturation plus primary-colour lightness sliders to the popover.
- [x] Reconcile current source with search/ESP/OS and remaining-feature docs; record a concise current backlog without treating historical gaps as current.
- [x] Implement accessible preview tiles and persistent tweak sliders/reset; saturation affects rendered colours, lightness changes dominant backgrounds with gently linked accents (revised by the subsequent user clarification).
- [x] Update focused browser checks for previews, sliders, reload/reset, popover bounds, selection/outcome colours and production build.
- [x] Update theme documentation and final handover; report backlog and completed changes.

Scope: implement only theme controls in this request; search and other backlog items are an investigation. Reuse existing eight-theme/token system and browser tests. Preserve paired mode switching, saved preferences and answer state. Check filter/top-layer behaviour and primary-label contrast before selecting final slider ranges.

**Current clarification / pause boundary:** user suggests 55–96% brightness for light themes and 5–45% for dark themes. Current implementation is a signed −8…+8 OKLCH primary-accent adjustment (headings/buttons), not page brightness. Explained that the proposed ranges fit background lightness better and would break primary foreground contrast if applied directly. Asked whether the slider should target page/card backgrounds or retain the bounded accent adjustment. Do not implement the proposed new range/target until the user answers. Keep already authorised preview/saturation work and backlog audit. Broad background ranges would also need foreground contrast checking before claiming them safe.

**Independent progress:** added `docs/planned-work.md` and README link, reconciling keyword search, ESP3/4, CA3–8/coverage review, OS, CSV import and later Python execution with current source. Preview buttons reuse the actual token blocks via `.theme-swatch`; no duplicated colour map or dependency. Saturation uses one CSS rule for root plus top-layer popovers/dialogs (native top layer bypasses root filters). Source browser tests passed the previews and original ±8 lightness endpoints before the top-layer filter addition; final screenshot/filter/persistence checks and docs/build remain pending.

**Independent check completed while awaiting clarification:** source eight-theme suite passes after the top-layer saturation fix. Pixel inspection of the full 0%-saturation screenshot found maximum RGB channel difference 0, including the open popout; all rendered colours are desaturated. No library or filter workaround beyond the shared root/top-layer rule was required. Updated theme docs for previews/saturation and explicitly marked lightness range/target provisional. No production build yet: resolve the lightness question first, then add final tweak persistence/reset/bounds tests and rebuild once.

**Latest design discussion:** user confirmed the lightness control targets dominant page/card backgrounds and wants accents to track it somewhat for coherence. Background-only wide ranges have foreground-contrast problems. Proposed a single coordinated lightness value: largest background shift, smaller hue-preserving accent shift, contrast-safe foregrounds/feedback. Asked whether to use a narrower tested range (minimal) or the proposed broad ranges with automatic foreground adjustment; this choice remains unresolved. User explicitly requested pausing/discussion if implementation becomes non-minimal, so do not introduce a recolouring/contrast engine without resolving that choice. Current lightness code is still the earlier provisional ±8 primary-accent prototype, NOT the final background-target design. Preview/saturation work and backlog audit are complete at source level, but final persistence tests, correct background/linked-accent implementation, documentation reconciliation and production build remain outstanding. Exact next action: agree range/contrast policy, then replace the provisional slider mapping with the agreed coordinated background/accent mapping and complete focused checks.

## 2026-09-30 — Finish full-range background lightness controls

User resolves the range decision: keep the implementation minimal, expose 55–96% (light) and 5–45% (dark), and leave contrast refinement for their own exploration. This supersedes the earlier pause and safe-range proposal.
- [x] Replace provisional primary slider with absolute background OKLCH lightness, related surface offsets and a gentle shared accent shift; no contrast engine.
- [x] Persist separate light/dark settings, retain global saturation and preview tiles, and implement reset/defaults.
- [x] Check full endpoints, mode changes, persistence/reset, source/production rendering and update documentation/build/checkpoint.

Defaults: 96% light, 20% dark. Related surfaces retain small mode-specific offsets; main/accent colours shift by 20% of the change from the mode default, retaining hue. Shared CSS tokens own these mappings. Test baseline contrast separately from full-range behaviour; do not claim all user-selected settings meet contrast targets.

**Completed — current state supersedes the earlier pause/prototype notes:** full requested ranges are implemented, without a contrast/recolouring engine or new dependency. The lightness slider sets page OKLCH L to 55–96% in light mode and 5–45% in dark mode. Defaults are 96% and 20%. Related surfaces/glow use fixed mode offsets; main/hover/accent track 20% of movement from the mode default. Text and code surfaces remain unchanged. The two mode values persist independently with shared saturation 0–150%; reset restores all defaults. Eight abstract buttons reuse the real CSS palette definitions. Saturation filters the root and independently rendered top-layer popovers/dialogs exactly once.

**Final verification:** focused browser suite passes against Vite and generated production output: eight previews, 1280/640/320px layouts/popover bounds, default contrast, exact full-range endpoints, background and surface movement, 20% linked accent movement, unchanged text/code colours, mode-specific limits, persistence across reload and paired mode switch, reset, global saturation, selected/marked/retry states and all four banks. Production build passes with 1,340 templates and matching identities; `live/` is current. Default preview popout screenshot inspected. `git diff --check` passes. Existing marking/codec/bank logic was not changed; no repeat full unit/smoke run was needed for this focused theme change.

**Documentation and next action:** `docs/theming.md` records tokens/ranges/defaults, persistence and deliberate lack of full-range contrast correction. `docs/planned-work.md` is the reconciled unfinished-feature backlog, linked from README. Source preview remains http://127.0.0.1:5173; production preview http://127.0.0.1:8765. Changes are uncommitted/undeployed. No unresolved implementation work; user will explore full-range appearance and decide any later refinement. Do not narrow ranges or add automatic contrast handling without a new request.

## 2026-09-30 — Make saturation an absolute 0–100% control

User requests efficient, proportionate work: 100% should mean maximum background saturation at the current lightness, not a relative 150% boost to low-chroma presets.
- [x] Use fully saturated HSL background colours at the slider's selected lightness, with the existing global saturation filter reducing them from 100% to 0%. Keep palette hue, surface offsets and gentle accent tracking.
- [x] Change slider/storage bounds to 0–100%, update docs/check expectations, and run one production build plus diff check. No broad browser/unit suite for this bounded CSS/control change.

This changes dominant background lightness from OKLCH L to HSL lightness so 100% saturation has a standard, explicit meaning at each lightness. Very pale colours near white are a gamut/lightness constraint, not an additional saturation cap. Existing full-range contrast exploration remains intentional.

Completed: backgrounds and related surfaces now derive full HSL saturation from the palette main hue; the global filter reduces saturation across the interface. Slider and saved-value bounds are 0–100 (legacy values above 100 clamp on load). Documentation and browser-check expectations now reflect HSL backgrounds and exploratory background contrast.

Verification: production build passed (1340 templates), and `git diff --check` passed. Updated browser checks were not run, as requested to keep verification proportionate. Initial build invocation could not find npm; succeeded with `PATH=/opt/homebrew/bin:$PATH npm run build`. No outstanding implementation steps; next action is user exploration of saturation/lightness in the local preview.

## 2026-09-30 — Give theme defaults adjustment room

Objective: start both controls inside their ranges so colour/lightness can move in either direction.
- [x] Set defaults to saturation 50%, light lightness 90%, dark lightness 20%; align CSS, initial controls and reset.
- [x] Migrate the exact previous saved default combination; preserve other custom settings. Update documentation/check expectations, build once and check the diff. No browser suite.

Completed: defaults/reset and initial HTML/CSS agree at 50% saturation, 90% light-mode lightness and 20% dark-mode lightness. Exact old saved defaults migrate on load; other custom preferences remain. Production build passed (1340 templates), diff check passed; no browser suite run. Next action: reload preview; use Reset adjustments if existing custom settings should also return to these defaults.

## 2026-09-30 — Independent colour controls and palette defaults

- [x] Replace rendered-page saturation filter with relative HSL token adjustments; retain 0–100 saturation and 55–96 / 5–45 lightness ranges.
- [x] Restore palette-derived default background saturation/lightness (Rose 90/92); use per-theme saved overrides and CSS defaults shared with previews. Preserve authored non-background colours at defaults.
- [x] Update docs and focused check expectations; run production build and diff check. Small browser control check deferred at user request to wrap up.

Current state: page-wide saturation filter removed. Relative HSL colour tokens adjust saturation without changing their numerical HSL lightness. Dominant backgrounds use absolute saturation; other authored theme colours scale around their original saturation at palette default. Fixed artwork is no longer globally filtered. Lightness ranges remain 55–96% light / 5–45% dark; saturation remains 0–100%. Accent OKLCH lightness still tracks 20% of background movement. No contrast guard.

Defaults derive from original page backgrounds, with light defaults capped at 94% to leave upward room and Rose explicitly 90% saturation / 92% lightness. Related surfaces retain existing offsets, so the original palette is a starting point, not an exact reconstruction of every old surface. CSS drives defaults and preview swatches. Slider display rounds defaults to whole percentages. Each light/dark palette has separate overrides in `dsd-starters-theme-adjustments`; Reset clears only the current theme. Prior global filter-based tweaks are ignored (different colour mapping), while saved mode/palette remain.

Relevant files: `css/tokens.css` (raw colours, defaults and relative transforms), `css/styles.css` (filter removed), `js/theme.js` (per-theme overrides/defaults), `docs/theming.md` (current behaviour), `scripts/browser-theme.mjs` (updated expectations), generated `live/` output.

Verification: `PATH=/opt/homebrew/bin:$PATH npm run build` passed with 1340 templates; `git diff --check` passed. No browser suite or visual check run for this change. Existing browser script expectations were updated but remain unverified. Perceived brightness may still vary with saturation even though numerical HSL lightness does not. Fixed artwork no longer follows saturation; theme token colours do. Changes remain uncommitted and undeployed.

Next action, only when resumed: inspect Rose at default 90/92 and compare low/high saturation at one fixed low lightness; confirm per-theme persistence/reset. Do not repeat broad suites or add contrast handling without need. User requested wrap-up now.

## 2026-10-05 — Feedback surfaces, revision priorities and named progress

Objective: blend feedback with selectable surfaces; retain dated topic/subtopic outcomes per named local profile; colour priorities and automatically maintain three recommended exam revision sets.
- [x] Inspect existing tokens, storage, progress aggregation, recommendations and UI.
- [x] Implement surface blending, dated records, RAG/missing/stale priorities and persistent recommendation batches.
- [x] Add local username selection, close-match confirmation, profile isolation and named JSON import/export; preserve legacy records.
- [x] Run relevant unit/browser checks and production build; record outcomes and limitations.
Scope: local profiles are convenience only, with no authentication. Missing evidence ranks first, scored weaknesses second, stale evidence third. Stale means more than 15 days since latest practice. Preserve existing unrelated work.
Next action: inspect progress and application code before implementing.


Completed: semantic feedback fills/borders now mix with `--surface` rather than `--main`. Local named profiles isolate active activity, history, repeat-attempt dates and recommendation batches. The first profile inherits unnamed legacy progress; the original save remains intact. Case/spacing normalisation reuses exact names; bounded edit-distance suggestions require explicit confirmation. Header supports switching profiles. JSON backup embeds the username and rejects restoring into a differently named profile with instructions to switch first. Older unnamed backups remain supported.

Progress review: existing attempt timestamps and `partScores` already retain topic/subtopic attribution and first/final results. History now exposes per-attempt subtopic first-response scores. No invented backfill for legacy aggregate-only records. Priorities use the latest five eligible independent attempts for each area, splitting shared marks across references, excluding assisted-only visits, and using exact unrounded thresholds (<45, <65, otherwise green). More than 15 days is stale; no independent evidence is missing. Labels accompany grey/RAG/icy styles. Displayed whole percentages truncate to avoid rounding below-threshold evidence into the next colour band.

Recommendations appear above the full priority list. Three distinct eligible exam sets persist until completed, then show the requested encouragement and generate another batch. Ordering is missing evidence, fresh results ascending, then stale evidence. Selection uses complete profile history, independent of display filters, and honours the four-hour repeat rule. Progress now loads exam/programming banks for the available-area inventory. README and theming documentation updated.

Relevant files: `js/profiles.js`, `js/revision.js`, `js/app.js`, `css/tokens.css`, `css/styles.css`, `tests/profiles-revision.test.js`, `scripts/browser-profiles.mjs`; regenerated `live/`.

Verification: all 16 initial targeted profile/revision/subtopic/repeat tests passed (the existing all-variation subtopic check takes about four minutes including module setup). After refining shared-subtopic weighting, 10 profile/revision/repeat tests passed, including a new regression for assisted-only visits and fractional shared marks. Production build passed with 1340 templates; compatibility records unchanged. Focused production browser checks pass for first-use modal, fuzzy confirmation, switching, profile isolation, reload persistence, genuine set submissions, three-set batch renewal, named export, dated subtopic evidence, stale display and 390px layout; no browser exceptions. No full unrelated bank test suite was run. Browser artefacts stay under `/private/tmp`.

Final next action: record final backup round-trip/browser result and diff check, then hand back for user review. No deployment or commit requested; local preview is http://127.0.0.1:8765. Local profiles are intentionally not secure accounts. Aggregate-only historical results cannot supply subtopic evidence. Existing four-hour tracking policy remains in force.

Final verification complete: the expanded production browser check also passed a named JSON backup restore round-trip (three duplicate records correctly skipped), after the shared-subtopic weighting fix. Final `git diff --check` passed. Implementation complete, uncommitted and undeployed; next action is user review of the local preview.

## 2026-10-05 — Document progress rules and improve profile restore / weekly feedback

Objective: faithfully document the updated progress specification; automatically switch to the username in a restored backup; show the last tracked date in the header; add weekly activity and average-score trends.
- [x] Inspect current progress documentation, import/profile lifecycle and test coverage.
- [x] Implement validated automatic named-backup profile switching with feedback, last tracked date and weekly statistics/chart.
- [x] Document exact behaviours, calculations, migration and limitations in the project specification.
- [x] Run focused unit/browser checks, build static output and record results.
Scope: preserve existing named profiles and reject invalid backups before switching or merging. Weekly figures use tracked completions, Monday–Sunday local calendar weeks, with clear labels and accessible chart data.
Next action: inspect existing progress specifications and restore logic.


Completed: `docs/spec-progress.md` is the adopted detailed progress/profile specification. It records exact dated evidence, profile matching/migration, last tracked dates, RAG thresholds and missing/stale annotations, independent per-area latest-five windows, shared-mark attribution, recommendation ordering/batch renewal, weekly metrics, named JSON restore and known backlog. The common spec links to it instead of retaining superseded parent-window/limited-evidence/manual-restore rules; docs index, README and style guide are aligned. Historic checkpoint entries remain unchanged as history.

Named restores now validate/merge against the backup’s target profile without mutation, then activate the merged target and update the remembered username. Existing case/spacing-equivalent names are reused; new exact backup names create profiles; fuzzy backup matching is not automatic. A persistent on-page status and toast explain the switch and restored/duplicate counts. Invalid backups do not switch/create profiles. The outgoing profile remains intact. Header last-tracked date/time uses the latest tracked completion across that profile’s whole history, with an explicit no-records label, and refreshes on selection, submission and restore.

Weekly section: selected-history filters apply; Monday–Sunday local calendar weeks; current-week tracked sets, equal-weight average final percentage per set, practice days; eight-week chart and equivalent table including minutes; comparison with the previous week when both have records. No-data weeks differ from 0%; current week is labelled incomplete; future records excluded. Unit checks cover Monday boundaries, UK daylight-saving change (169-hour week), empty/zero/future records, equal weighting and last tracked dates. Implementation in `js/weekly-progress.js`, `js/app.js`, `js/profiles.js`, shared CSS; tests in `tests/weekly-progress.test.js` and expanded `scripts/browser-profiles.mjs`.

Verification: 13 focused weekly/profile/revision/repeat-attempt tests passed. Production build passed with 1340 templates and unchanged bank compatibility records. Production browser checks passed existing/new-profile automatic restore, same-profile duplicate restore, invalid-backup isolation, header dates, reload persistence, weekly stats/filtering, recommendation completion/renewal and mobile layout; no browser exceptions. Desktop (1280px) and mobile (390px) weekly screenshots inspected; temporary artefacts at `/private/tmp/starters-weekly-{desktop,mobile}.png`. No full unrelated bank suite repeated. Final diff check passed.

Current next action: user review at http://127.0.0.1:8765. No required work remains for this request; changes are uncommitted and undeployed. The older 5 October manual profile-switch requirement is superseded by this completed entry and `docs/spec-progress.md`.

## 2026-10-05 — Idle-aware practice time and named text backups

Objective: record estimated engaged practice time, pausing after over one minute of inactivity, and export restorable JSON in `tlevel-practice-[username]-[datestring].txt` files.
- [x] Inspect activity timing, resume/submission lifecycle and existing export/import tests.
- [x] Implement persistent idle-aware practice timing without changing countdown deadlines; update export filenames and .txt restore support.
- [x] Document timing semantics, compatibility and filename format; run focused tests, browser checks and production build.
Scope: meaningful interaction resumes timing; reading/thinking without input can be undercounted. Preserve historical elapsed seconds and label the timing basis. Visible countdowns continue by deadline. Use a filename-safe username and local date/time string.
Next action: inspect start, submit, tick and persistence handlers.

Latest clarification: use 120 seconds (not 60) before pausing, and count any mouse movement, clicks/taps or scroll anywhere on the page while the activity is open; keyboard input also continues to count. Updated implementation/docs/tests accordingly. Recommended `.json` as the format-matching backup extension; a filename preference question is pending while timing work continues. Keep .txt until the user chooses otherwise. During focused testing, fixed a clock-accounting edge case so extending a countdown cannot retroactively add previously excluded time.

Resolved filename choice: user selects `.json` (recommended). Final backup name is `tlevel-practice-[filename-safe username]-YYYY-MM-DD-HHMMSS.json`, using local export date/time. JSON-formatted .txt imports remain accepted. This supersedes the original .txt output request and pending question above.


Completed with latest user choices: 120-second inactivity threshold; any mouse/pointer movement, clicks/taps, scrolling/touch movement or keyboard interaction across the open practice page resumes/renews measurement. Hidden documents, leaving the activity, profile switches and unload pause it immediately. Accumulated practice time persists separately from countdown/wall-clock time; loaded profile checkpoints never charge the offline gap. Visible timer deadlines continue running and submission caps measurement at the deadline. New `engagedSeconds` and `practiceMeasuredFrom` fields are stored with results and exported in JSON/CSV; old elapsed fields remain intact. Result/history/overall/weekly durations prefer engaged seconds and label older elapsed records. No engagement backfill for older completed work; older unfinished work begins measurement when displayed.

Backup download is `tlevel-practice-[filename-safe username]-YYYY-MM-DD-HHMMSS.json` using local date/time; username inside JSON remains unchanged. Restore accepts JSON and JSON-formatted TXT and validates optional engaged-time fields. README, progress specification and shared timing specification document the 120-second policy, raw/engaged time distinction and filenames. No pause-state ticker was added: measurement remains hidden, with its policy explained on My progress.

Verification: 18 focused timing/weekly/profile/revision/repeat tests passed. Production browser checks passed 120-second idle capping, mouse/click/scroll/keyboard renewal, hidden/reload gap exclusion, unchanged countdown deadline, engaged-time submission, final JSON filename and existing named-profile/recommendation/restore flows, with no browser exceptions. Browser scenario advances its isolated clock; no multi-minute idle wait. Production build passed with 1340 templates. One initial clock test exposed post-deadline accounting; the fixed implementation marks deadline-capped clocks inactive and retains the latest accounted timestamp. Final small profile-load hardening additionally marks loaded clocks paused; rerun focused profile/timing checks and rebuild before handoff.

Remaining limitation: interaction is only a proxy for engagement; quiet reading/thinking longer than two minutes is undercounted. Abrupt browser termination can lose up to the latest 15-second checkpoint interval. Normal reloads preserve recorded accumulation. Next action: final focused checks/build/diff check, then user review; no deployment or commit requested.

Final checks complete: all 10 focused timing/profile tests passed after profile-load hardening; final production rebuild (1340 templates) and `git diff --check` passed. Required work is complete. Next action is user review of the local preview; changes remain uncommitted and undeployed.

## 2026-10-05 — Flag-and-poll inactivity tracking

Objective: replace per-interaction clock settlement with a lightweight activity flag, consumed every five seconds to renew a two-minute expiry. Resume paused practice measurement immediately on interaction; start when the first question is displayed. Keep countdown deadlines independent.
- [x] Inspect existing practice clock and browser tests.
- [x] Implement flag/poll lifecycle, migrate active clock checkpoints and update exact documentation.
- [x] Run focused clock/browser checks, rebuild and record outcomes.
Next action: inspect practice-time module and activity lifecycle integration.


Completed: page interactions now set IV; once pending, repeated mouse/pointer/click/scroll/keyboard events return without DOM queries, Date reads, clock settlement, storage writes or timer renewal. A single five-second interval consumes IV and renews the timestamp expiry by 120 seconds. Paused measurement resumes immediately on interaction. Initial display of Q1 starts measurement; ordinary rerendering alone cannot revive an idle clock. Settlement still caps at expiry/deadline so callback delays cannot add unlimited absence. Hiding/leaving/profile loading clears pending flags, and older clock checkpoints migrate their lastActivity-based expiry without losing measured totals. Countdown deadlines and JSON export conventions remain unchanged.

Documentation: `docs/spec-progress.md` now states the exact IV/IT polling mechanism, ordinary 120–125-second inactivity window, fast event path, timestamp-based expiry and delayed-callback handling; README aligned. This supersedes the earlier per-event renewal mechanism, not the general policy of recording continuous engaged practice with idle pauses.

Verification: 12 focused timing/profile tests passed, including bursts of thousands of events, five-second flag consumption, immediate resume, delayed polls, pause flag clearing and old clock migration. Production build passed (1340 templates), complete focused profile/progress/timing browser regression passed with no browser exceptions, and `git diff --check` passed. Browser simulated idle/background/reload intervals still record the expected engaged duration. No unrelated whole-bank suite repeated.

Current next action: user review at http://127.0.0.1:8765. All requested work is complete, uncommitted and undeployed. The previous implementation updated timestamps rather than recreating timers per event; this change specifically reduces per-event processing and adopts the requested flag/poll timing semantics.

## 2026-10-05 — Weekly minutes and priority colour verification

- [x] Add current/previous-week practice minutes to the weekly card and document the display.
- [x] Verify missing, red, amber, green and stale rules; remove the missing-state grey tint.
- [x] Build and check the affected browser view/styles and focused statistics tests.
Next action: inspect weekly markup and shared priority CSS.


Completed: weekly card now displays minutes practised this week and last week, using existing filtered calendar-week totals and engaged-time/legacy fallback. Five stat tiles wrap responsively. Missing-data CSS was a cool grey (#e5e7eb), not the green state; replaced fill/text/border with neutral greys (#e6e6e6/#333/#888) to remove colour tint. RAG classes still reuse question feedback tokens; stale rows retain icy blue cross-line texture and annotation. Priority thresholds remain <45 red, >=45/<65 amber, >=65 green; missing overrides absence, stale overrides scored evidence older than 15 days.

Verification: eight weekly/profile/revision unit tests passed, including threshold and stale boundaries. Production build passed (1340 templates), final diff check passed. Isolated browser fixture verified 5 current-week minutes and 7 prior-week minutes, exact rgb(230,230,230) missing fill across all eight palettes, distinct RAG fills and stale texture; no browser exceptions. Desktop 1280px and mobile 390px screenshots inspected, with no horizontal overflow. Temporary check/script/screenshots are under /private/tmp/browser-weekly-colours.mjs and /private/tmp/starters-weekly-colours-*.png; no student profile was modified (dedicated test browser only). Documentation updated in docs/spec-progress.md. No unrelated full browser/bank suite repeated.

Next action: user reloads http://127.0.0.1:8765 to inspect. Implementation complete, uncommitted and undeployed.

## 2026-10-05 — Clarify progress export controls

- [x] Prioritise Save backup and Restore backup; reveal secondary CSV export through a small labelled disclosure.
- [x] Explain backup versus spreadsheet use, update documentation, build and check the affected UI.
Next action: update progress toolbar while preserving export/import handlers.


Completed: Save backup and Restore backup use primary styling and appear before the smaller native “Spreadsheet options” disclosure. CSV is initially hidden; opening the disclosure explains spreadsheet viewing versus restoring progress. Backup actions also carry a concise preservation/transfer explanation. Handlers, filenames and data formats are unchanged. The disclosure supports touch and native keyboard activation, without requiring a prior download. Documentation updated in docs/spec-progress.md.

Verification: production build passed (1340 templates). Focused isolated browser check passed initial CSV invisibility, primary backup styling, Space-key disclosure activation, backup/CSV download names and contents, restore-file-picker handler and desktop/mobile bounds. Inspected screenshots at /private/tmp/starters-backup-controls-{1280,390}.png. Initial Enter-only CDP key dispatch did not activate the disclosure; Space activation passed using native behaviour. Widened the desktop control group slightly after inspection to keep both primary buttons together. No data/marking tests repeated for this presentation-only change. Final rebuild/diff check pending; next action: finish those and user reloads preview.

Final production rebuild and diff check passed. No required work remains. Next action: user review at http://127.0.0.1:8765; changes remain uncommitted and undeployed.

## 2026-10-05 — Clarify and refine percentage averages

- [x] Use exact per-set earned/available percentages for overall/weekly averages, rounding only the displayed mean.
- [x] Make percentage labels explicit in cards, weekly chart/table and specification.
- [x] Check mixed-maxima and rounding cases; rebuild static output.
Finding: current implementation already averages saved percentages and displays %, but saved percentages are rounded first. Preserve equal weighting per set and improve precision; no marks pooling.


Completed: shared averageSetPercentage calculates each set’s earned/max × 100 before taking an equal-weight mean; only the display is rounded. Legacy percentage-only values remain supported. Overall and weekly cards now say “Average final percentage”; weekly chart/table labels explicitly say percentage and explain normalisation. Specification includes the 1/2 + 9/10 → 70% example. Existing saved records are unchanged.

Verification: all four weekly-statistics tests passed, including unequal maxima (70%, not pooled 83%) and a double-rounding regression (2/3 plus 1/2 displays 58%, not 59%). Production build passed (1340 templates) and diff check passed. No browser suite repeated for this arithmetic/label change. Next action: user reloads local preview; complete, uncommitted and undeployed.

## 2026-10-05 — Blend missing-data grey with the default surface

- [x] Apply a subtle default-surface mix to missing-data grey, with a neutral fallback.
- [x] Update colour documentation; build and check the CSS change.
Scope: use the same surface-based mixing approach as semantic feedback, with a small 5% surface contribution. Perceived neutrality remains theme/context dependent.


Completed: missing-data fill and border use shared --missing-bg/--missing-border tokens with 95% neutral grey and 5% --surface mixed in OKLab; plain grey fallback retained. No main-accent blend or extra separator added. Progress/theming documentation updated.

Verification: production build (1340 templates), diff check and focused isolated browser check passed. Verified colour-mix output across all eight palettes, distinct RAG colours, unchanged icy texture, desktop/mobile bounds; desktop Rose screenshot inspected. Perceived neutrality remains contextual and requires user judgement. Next action: user refreshes local preview to judge the subtle tint; no outstanding implementation work. Uncommitted/undeployed.


## 2026-10-05 — Increase missing-data surface blend

Plan: change missing-data fill/border to 90% grey and 10% surface; update docs and rebuild local preview. User explicitly requests no testing; visual review belongs to the user.
Completed: fill/border now mix 90% grey with 10% surface. Documentation aligned and production preview rebuilt. No tests or browser checks run, as requested. Next action: user refreshes preview and judges colour.


## 2026-10-05 — Mix missing-data grey with the dominant theme colour

Plan: retain 90% grey, replace its 10% surface contribution with the main theme colour for fill and border only; align docs and rebuild. User will test; no tests or browser checks.
Completed: missing-data fill and border now mix 90% grey with 10% --main. RAG highlights continue to mix with --surface. Documentation aligned; local production preview rebuilt. No tests/browser checks run as requested. Next action: user refreshes and evaluates appearance.

## 2026-10-05 — Theme-blend progress RAG and icy highlights

Plan: apply 90% semantic colour / 10% dominant theme colour to progress-only RAG fills/borders and icy fill/texture/border, retaining shared question-option surface blends. Update docs and rebuild preview. Preserve user's preference to do visual testing themselves; no test/browser runs.
Completed: progress RAG fill/border tokens and stale icy fill/border/texture-line tokens now mix 90% semantic base with 10% --main in OKLab. Text colours, icy geometry, priority rules and question-option surface blends are unchanged. Unmixed fallbacks retained. Documentation aligned and preview rebuilt (1340 templates). No tests or browser checks run, respecting the user's ongoing visual-testing preference. Next action: user refreshes local preview; complete, uncommitted and undeployed.
