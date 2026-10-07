# Repository guidance and framework refactor readiness — 7 October 2026

## Assessment

The repository is ready for migration preparation and an agreed first vertical slice, but not yet for an unchecked whole-app conversion. It has reusable domain modules, extensive behaviour tests, documented storage/code contracts and an existing Vite development server. The remaining prerequisites concern architecture, production packaging and a reproducible browser baseline. A pre-existing production-test assertion also needs correcting before claiming a green baseline. This review does not implement or authorise the refactor.

Reviewed: root guidance and README, the documentation index, common/progress/type specification structure, implementation plan, planned work, style/theming/development guidance, the framework brief, code policies, application entry point, supporting modules, build/hook/deployment scripts and relevant tests. This is an engineering/documentation review, not a fresh audit of every question or exam source.

## AGENTS.md: splitting is worthwhile

The root file combines durable working instructions with an early product specification. Specialist documents already exist, so the useful change is consolidation into those documents, not another parallel specification tree. Keep a short root entry point containing purpose/audience, checkpoint/cache rules, a task-to-document map, decision precedence and required engineering guidance. Keep checkpoint instructions inline so agents cannot miss them.

| Root material | Recommended owner |
| --- | --- |
| Puzzle formats and scoring | `docs/spec-puzzles.md` |
| Core questions, marks and curriculum coverage | `docs/spec-exam.md`, with `docs/exam-resource-map.md` for sources |
| Python formats, constraints and permutations | `docs/spec-python.md` |
| Codes, selection, navigation, timing and shared data contracts | `docs/spec-common.md`; rollover detail in `docs/code-rollover.md` |
| Profiles, progress, revision priorities and backups | `docs/spec-progress.md` |
| Presentation and accessibility | `docs/style-guide.md`; palette mechanics in `docs/theming.md` |
| Development, build and hosting workflow | `docs/local-development.md` and root README |
| Authoring/refinement and engineering policies | Existing linked content guides and `CODE_STYLE.md` / `CODE_COMMENTS.md` |

Benefits: less mandatory context, clearer ownership, fewer contradictory instructions and more focused updates. Costs: links can be overlooked and requirements can disappear during consolidation. Mitigate those with explicit “read when” routing, one authoritative owner per rule and a requirement-by-requirement move/reconcile checklist. Nested directory `AGENTS.md` files are unnecessary unless a directory actually needs additional scoped instructions.

Resolve these discrepancies before deleting root detail:

- Root guidance proposes six-character codes plus a seventh timer character. The adopted common specification and codec use nine plus an optional tenth, with explicit legacy migration. Root suggestions for nearest-code matching also conflict with explicit identity/compatibility rules.
- Root requests CSV import. The adopted progress specification uses validated JSON restoration and CSV export; CSV import is deferred. Do not add it as part of a behaviour-preserving refactor.
- Root describes three activity types; the runtime has four banks, with Core and ESP grouped under Exam practice. Preserve the distinction between navigation categories and bank identities.
- `docs/implementation-plan.md` labels itself historical, but its decision table still says eight characters while its settled section says nine. `docs/spec-common.md` still has an older future-OS paragraph describing a four-ID limit despite its current codec section and `tests/eight-bank-codes.test.js`. Consolidation must mark these passages as superseded, not copy them forward.
- `docs/spec-common.md` mixes implemented search with requested queue behaviour. `docs/planned-work.md` identifies the queue as outstanding. A refactor must preserve the implemented flow without claiming the queue is already present.

Recommendation: do this as a separate, small documentation change before broad migration. First map every root requirement to its owner; distinguish adopted decisions from proposals; then shorten the root and check all links. This review only adds the requested engineering references and review/index links; it does not silently settle product requirements.

## Refactoring brief review

`T_LEVEL_REFACTOR_AGENT_GUIDE.md` gives useful framework roles, preserves static hosting, content, saved data and visual identity, requires incremental migration, and separates deployment. Its semantic-class requirement agrees with `CODE_STYLE.md`. The brief appropriately permits retaining domain logic rather than rewriting it to demonstrate framework usage.

Add a repository-specific execution plan beside the brief, covering:

1. **Architecture decision.** Discuss Vite/Svelte versus SvelteKit before implementation, as `CODE_STYLE.md` requires for key decisions. Vite/Svelte is the recommended starting option because hash navigation and static hosting already work; it has less routing/build change. SvelteKit offers a route/server framework for future growth but adds migration and static-hosting decisions now. Future server work alone does not settle this choice.
2. **State ownership.** Define who owns the active attempt, profile, history, search context, timers and theme settings. Keep persisted formats and domain APIs stable initially. Assign subscriptions/listeners/timers explicit setup and cleanup; avoid simultaneous Svelte and legacy handlers for the same interaction.
3. **Production contract.** Specify how the new compiler retains lazy packed banks, hashes, relative asset URLs, source exclusions, licences and deterministic output. Updating `npm run build` alone is insufficient: the staged-source commit hook and production tests also depend on the current builder.
4. **Acceptance matrix.** Name representative flows, exact fixture codes and saved-state fixtures, viewport/theme checks, and scripts required per slice. Separate semantic behaviour assertions from selectors and bundle-name conventions that legitimately change.
5. **Framework adoption and CSS ownership.** Identify a real Svelte flow, recurring Tailwind composition, daisyUI component foundations and a Bits UI interaction. Assign token mapping and component styling one owner. Preserve all eight palettes, adjustment controls, feedback colours, native semantics and dialog dismissal rules. Do not require every existing control to use every library.
6. **Reference and version evidence.** Identify the Maths repository and the particular decisions/components worth studying; no path is supplied in the brief. At implementation time, verify compatible framework versions and APIs against official documentation, then pin the chosen set. No framework compatibility/version claim was established in this local review.
7. **Scope and exit.** Keep question identities/content and deferred product features unchanged unless separately requested. Record rollback boundaries and remove replaced renderers after each verified slice. Deployment remains separate.

The comment policy asks for caller/callee lists in file and function comments. Those can become expensive and stale during component extraction. Apply concise summaries and review their accuracy as files change; discuss whether exhaustive function-level caller lists are intended before scaling them across components. Existing files mostly lack the newly supplied full header structure, so this is an adoption task, not an existing compliance guarantee. Clarify how the HTML exclusion applies to mixed `.svelte` files. Avoid a repository-wide comment-only rewrite during migration.

## Concrete readiness and risks

| Area | Evidence and implication |
| --- | --- |
| Domain boundaries | `js/codes.js`, `bank.js`, `marking.js`, `profiles.js`, `progress.js`, `revision.js`, `search.js` and practice-time modules already separate useful logic. Retain their contracts and tests first. |
| UI/state coupling | `js/app.js` is about 72 KB despite only 537 dense lines. It combines HTML strings, DOM listeners, navigation, dialogs, storage, activity lifecycle and recurring timers. Split by coherent flows; line count alone understates complexity. |
| Interactive questions | `js/challenge-controls.js` renders and binds imperative puzzle controls. Use an explicit isolated mount/cleanup boundary during transition, then migrate each family. Do not let both renderers mutate the same DOM subtree. |
| Development tooling | Vite is installed, but `vite.config.js` is explicitly source-preview only. None of the four requested frameworks is currently declared in `package.json`. Existing Vite is a starting point, not a completed framework pipeline. |
| Production packaging | `scripts/build-site.mjs` validates identities/search metadata/hints, packs four banks and substitutes the authoring loader during esbuild bundling. A plain Vite build would not automatically reproduce this. Preserve the separate display/marking/reveal boundary as well as lazy loading. |
| Commit and hosting | `scripts/pre-commit-build.mjs` builds the staged snapshot, checks its lockfile and stages `live/`. Pages deploys committed `live/` without rebuilding or running tests. Preserve or explicitly replace this coordinated contract and test a project subpath. |
| Persistence | Profiles, active attempts, generation-aware codes, deadlines, eligibility, recommendations and JSON restore already have contracts. Do not change storage keys/schema just for reactive state. Test old saved data at the same origin; different preview ports have separate storage. |
| Themes and dialogs | Theme state and CSS tokens already implement more than a light/dark switch. `js/dialog.js` has deliberate backdrop/Escape semantics; initial profile entry differs from cancellable dialogs. A library migration needs behavioural equivalence, not merely a similar appearance. |
| Verification | Node tests and dedicated browser scripts exist, but `npm test` does not invoke browser scripts and the Pages workflow is deployment-only. Browser scripts depend on an isolated Chrome debug session and many current DOM selectors. Establish repeatable setup and retain meaningful assertions during migration. |
| Visual baseline | Browser scripts take temporary screenshots and check selected layouts; this review found no durable approved comparison set for the new migration. Capture a bounded fresh baseline before UI changes, including 320px, 200%/400% zoom, keyboard and touch paths. Prior passing checks do not certify a future refactor. |

## Suggested sequence and gates

1. Reconcile guidance and record the architecture decision, framework compatibility evidence and Maths reference. Record exact preservation contracts and outstanding product work.
2. Capture baseline browser evidence and synthetic fixtures for legacy/current storage, active timed/untimed attempts and multi-profile backups. Include refresh, navigation away, profile switching, expiry exactly once and storage failure.
3. Introduce the compiler/styling pipeline while retaining bank generation, staged-source builds and static paths. Verify production packaging before depending on source-preview success.
4. Migrate a bounded shell/Home/About flow and a meaningful shared interaction. Document temporary ownership boundaries; verify navigation, theme/profile access and dialog behaviour.
5. Migrate activity lifecycle and answer controls, then interactive puzzle families and progress/search views in reviewable slices. Reuse domain modules. Check affected compatibility, persistence and browser flows at each step.
6. Remove replaced imperative rendering/CSS, update commands and architecture documentation, and run the integrated acceptance matrix. Review real production output under the Pages subpath. Publish only as a separate requested action.

## Verification from this review

- Focused Node baseline: **43/43 passed** across code compatibility, extended/eight-bank codes, profiles/revision, repeat progress, practice time, bank loading and search.
- Staged-source commit-hook test: **passed**. Production builder completed, but `tests/production-build.test.js:31` **failed**: it rejects every `data/` input, including the intentionally imported `data/search-keywords.js` and `data/search-topics.js`. These were the only `data/` inputs in `.build-meta.json`. Earlier assertions for separate packed banks and exclusion of selected authoring content passed; the later deterministic-rebuild assertions were not reached. The generated tracked `live/` output remained unchanged. Before migration, narrow the assertion to permit the two reviewed search-metadata modules while continuing to reject authoring banks; rerun this test. No test was changed during this review.
- Documentation links added in this change resolve locally; `git diff --check` passed.
- No browser suite or visual comparison was run for this documentation-only change. Existing scripts and historical evidence were inspected, not presented as fresh browser verification.
- No packages installed, content rewritten, framework migration performed or deployment triggered. The three supplied untracked guidance files were read and preserved.
