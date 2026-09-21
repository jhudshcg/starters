# Implementation plan

Historical delivery plan; current status is in [README](../README.md) and the generated coverage report. Shared content rules and completion criteria are in the [refinement guide](content-refinement.md). [AGENTS.md](../AGENTS.md) remains authoritative subject to recorded teacher decisions.

## Decisions to review

The draft supplies concrete defaults so review can be targeted. These decisions affect the indicated implementation stage; other preparation can proceed independently.

| Decision | Draft proposal | Resolve before |
| --- | --- | --- |
| Programming v1 | Constrained answers, prediction and tracing; free-form execution later | Renderers and content authoring |
| Exact sharing — settled | Eight Base64url characters encode version/type/question/variation fields; optional ninth timer character | Implement as documented below |
| Similarity matching | Explicit aliases only; never guess from code similarity | Compatibility implementation |
| Navigation | Three actions: new focus, new set within focus, same questions/new variations | Activity controls |
| Focus | Exam subsection normally; primary topic separate from secondary tags | Content schema freeze |
| Puzzle expansion — implemented | Eight subtypes, five puzzles each; one substantial puzzle per activity; family-specific banks | Teacher difficulty review |
| Exam mark wording | Keep 1–3 marks per part; use 1–4-mark source questions only as patterns | Exam production |
| 45-minute rule | Stale untimed attempts restart; overdue timed attempts expire before retry | Recovery logic |
| Scoring lifecycle | Checks within attempt; final submission ends it; first response retained | Marking and progress |
| Revision priorities | Latest five eligible attempts by reporting focus; exclude puzzles | Progress implementation |
| Source version — settled | Teacher confirmed Core content version 1.1; older source labels are stale | Use 1.1 for coverage inventory |

“Proposal” rules in the specifications remain drafts until adopted. No need to settle optional Go or a Python runtime before implementing the constrained pilot.

## Settled set-code decision

Use the settled [48-bit Base64url contract](spec-common.md#set-codes-and-compatibility), superseding the six-character hash/catalogue proposal. Eight case-sensitive characters encode six bytes, without padding; an optional ninth configures timing.

Reversible fields remove the need for a server, exhaustive set catalogue, collision registry or shared hash seed. Base36 would require ten characters; raw ASCII contains unsuitable controls. Stable slots preserve identities independently of file order. The user explicitly chose URL-safe `-` and `_`, not standard Base64 `+` and `/`.

Trade-offs: visually similar characters, no checksum, eight variations per question and 128 bank versions. Provide copy controls; never truncate overflowing fields or reuse exhausted versions. Future expansion needs a new format. An optional question index can resolve coordinates. Validate set composition before encoding.

## Proposed architecture

Static HTML entry point with browser ES modules, shared CSS and generated question assets. Develop through a local HTTP server. No server-side routes, authentication or database.

```text
index.html
css/                     tokens, base, components, activities
js/app.js                startup and navigation
js/renderers/            shared input and question components
js/marking/              bounded text, choices, numeric, trace and puzzle rules
js/sets.js               Base64url packing/unpacking and eligible-set selection
js/timer.js              deadlines, reset events and recovery
js/progress.js           storage, attempts and revision priorities
js/csv.js                import/export validation
data/                    one authored entry file per question type
data/banks/              retained versioned banks with stable question slots
generated/               validated banks, question index, release manifest
scripts/                 generation and content validation
tests/                   critical behaviour and content fixtures
docs/                    these specifications and coverage inventory
```

Use native controls and browser capabilities first. Select maintained libraries where they reduce real work, notably CSV parsing and, if needed, chart rendering. Pin dependency versions, check licences and test served assets on the college network. Select exact packages during implementation using current primary documentation; none is mandated by this draft. Prefer locally served production assets to runtime CDN dependencies. A Python runtime is not included in the constrained pilot.

## Stage 1: schema and content proof

1. Adopt the affected draft decisions and freeze schema v1.
2. Expand the worked examples into complete machine-readable records with all options, marking rules, hints and solutions.
3. Create the coverage inventory from the agreed source. Keep unreviewed and unmapped elements visible.
4. Implement content validation: unique IDs, part totals, allowed set totals, variation counts, option references, dependency cycles and deterministic generation.
5. Implement the 48-bit codec and prove round-trip and cross-build stability. Use boundary fixtures, two- and three-question sets, all timer suffixes and old-bank fixtures after a content revision. Use BigInt or explicit byte packing; avoid packing the entire payload through 32-bit JavaScript bitwise operations.

Exit: one validated set per type opens from data; every example answer is independently checked. No complete curriculum claim yet.

## Stage 2: complete activity flow

Implement home, type/focus selection, code entry, question renderers, feedback, hints, reveal and submission. Add the three randomisation actions and single-question entry. Implement the style tokens and common components once.

Exit: each type can be completed by keyboard, scored and retried. Known codes reproduce the same ordered variations in separate browser profiles. No eligible-set action silently changes its constraints.

## Stage 3: timing and durable progress

Implement attempt state, local recovery, hidden and visible timing, expiry, histories, filters, revision priorities, chart/table and CSV import/export.

Exit: refresh does not reset a valid timer; background expiry submits once; stale recovery follows the agreed rule. CSV round-trip preserves records, repeated imports do not duplicate them, and malformed/conflicting data is reported. Storage failure does not lose the current visible activity or falsely report success.

## Stage 4: expanded local pilot

Implemented: 51 CA1–CA2 exam templates with two variations; 40 puzzle templates across eight subtypes (five variations for original puzzles, fixed classic problems); six Python templates with five variations. Puzzle subtypes have separate bank files and their own format/interaction/marking sections in spec-puzzles.md.

Nested CA coverage uses permanent subelement letters and generated counts. Direct assessment, supporting practice and subject approval remain separate. Teacher review and classroom timing are outstanding; technical test success is not a difficulty or coverage certification.

Bank revision 2 replaces the demonstrations at the teacher’s request. Reject old codes rather than silently mapping them to different content. Preserve saved history; clear unsupported active attempts.

## Stage 5: publish and expand coverage

Prepare the GitHub Pages build and deployment instructions; verify relative asset paths under a project subpath and fragment links. Publish when requested. Retain the versioned question banks and stable slot mappings with each release. Provide a brief teacher guide for codes, timers and student progress export.

Expand by curriculum gaps using the [shared completion criteria](content-refinement.md), separating topic coverage from demonstrated skill. This historical stage treats optional Go and free-form Python execution as later milestones.

## Verification priorities

| Area | Meaningful checks |
| --- | --- |
| Content | Mark sums, accepted/rejected answers, reference outputs, puzzle validity/uniqueness, coverage gaps |
| Codes | 48-bit round-trip/boundaries, case preservation, - and _ in URLs, rejection of + and /, invalid fields, unused slots, old banks, timed suffix |
| Selection | Different focus/templates as required; all variations change; no-alternative state |
| Marking | Negation, close but incorrect terms, equivalent allowed tokens, linked reasons, blank answers |
| Timing | Fake-clock tests for expiry/reset/refresh; expired recovery; one submission per attempt |
| Progress | First versus assisted response, reporting-focus totals, date filters, CSV round-trip/deduplication |
| UI | Keyboard, zoom, screen-reader feedback, mobile layout, restricted storage, served project subpath |

Test the supported college browsers once identified; initial smoke testing should cover current Chromium and Firefox, with Safari where students use it. Do not claim compatibility before testing. Broaden tests when failures or new interactions justify them, not by repeatedly checking unchanged behaviour.

## Completion criteria

See [shared definitions of done](content-refinement.md#project-definitions-of-done); the stage exits above remain applicable.

## Pilot implementation checkpoint · 13 September 2026

The user authorised an independently built, testable pilot. Implemented the Base64url codec, three type-specific question banks (18 templates / 90 variations), shared renderers, bounded marking, three selection actions, hints/reveal, timers with refresh recovery, local progress, filters and CSV export. JSON backup/restore provides history transfer and duplicate detection.

The teacher confirmed source content version 1.1 despite stale headings. Manual preview preference is VS Code's integrated browser where available. This session used an isolated Chrome profile for automated interaction checks because it had no VS Code browser-control tool.

See the root [README](../README.md) for the local preview, known codes and test checklist. Remaining work includes teacher review, the full coverage inventory, broader puzzle families, free-form Python execution and CSV import. The pilot records first-response assistance at question level, not part level, and does not retain abandoned drafts as progress records. The implemented palette is in css/tokens.css; visual design follows the shared layout and accessibility direction with green primary accents.

Validation: unit tests cover the codec, reference Python output, puzzle arithmetic, bounded marking, selection constraints, deadlines and revision calculations. Browser smoke tests cover all three types, scoring, restored answers, progress, spatial selection, deadline recovery with single submission, invalid codes and 320-pixel reflow. This does not constitute a complete accessibility audit or cross-browser certification.

## Puzzle and feedback refinement checkpoint

Implemented the teacher's requested answer disclosure, bottom-of-page result and two-line subtitle. Added nine templates for logic, shapes and paths, and three harder spatial replacements. The active bank is now 27 templates / 135 variations; three retired spatial templates remain accessible by existing codes. New set selection chooses among all other focuses rather than alternating between the first two.

Spatial positions are selected on the original grid. Warm yellow highlights replace green selection cues across puzzle controls. Multi-step spatial tasks combine transformations, reverse them or simulate a robot with obstacle/edge rules. The test suite checks their reference answers independently. Browser checks cover disclosure behaviour, nearby results, direct grid input, saved selections, logic assignments, shape painting and alternate valid routes.
