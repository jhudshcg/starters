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
