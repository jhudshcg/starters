# Current handover — 15 October 2026

## Completed objective
Investigated and fixed the reported dot-path dragging regression and related puzzle input faults. Investigated missing completed-set data and implemented the teacher-selected one-editable-tab-per-profile protection. Durable evidence, review stages and decisions are in the latest DEV_LOG.md entry.

## Completed plan
- [x] Read requirements and complete the ordered project-refactor-checks stages with teacher agreement at each gate.
- [x] Reproduce real dragging and related text/keyboard input issues; repair live state reads and focus preservation.
- [x] Trace hints/repeats/storage; reproduce stale-tab history overwrite and distinguish it from revision eligibility.
- [x] Implement exclusive profile editing, guarded switching/restoration, safe disposal and retry of the original requested name.
- [x] Add independently selectable regression checks, run affected verification, update docs/log and handover.

## Findings and current behaviour
- Dot gestures now read current service answers, including multiple interpolated moves within one event. Ordinary puzzle inputs remain mounted during typing. Space/arrow continuation retains focus on path dots.
- The history overwrite predates migration: a stale tab could save its whole older profile over newer results. The new app permits one editable tab per profile; a competing tab shows the reason and Try again. Switching/restoring names respects ownership and drains outgoing file saves. Different profiles can use different tabs.
- Hints still record eligible completed sets in history. Assisted questions do not supply independent revision evidence. The four-hour rule still excludes early repeats. The particular students' data-loss cause remains unconfirmed; no lost data was recovered.

## Verification
- Zero Svelte diagnostics; production build and whitespace checks pass.
- Focused profile-lock, lifecycle/startup, framework and linked-file unit checks pass. Initial unchanged progress/repeat/subtopic checks also passed; full npm test was not repeated.
- browser-interaction-regressions.mjs --puzzles and --profiles pass independently. The new checks are selected by changed code, not run for unrelated content/theme edits.
- All 14 existing puzzle integration cases, the existing profile/backup browser suite, and browser-onedrive-go.mjs --files-only pass.
- Temporary logs: /private/tmp/tlevel-regression-{build,tests}.log, tlevel-puzzle-integration.log, tlevel-profile-browser.log, tlevel-profile-files.log. Initial reproduction scripts are in /private/tmp/tlevel-reproduce-{drag,progress}.mjs.

## Workspace and limits
Changes are uncommitted and undeployed. live/ is now a root preview build; the commit hook builds staged output under /starters. Last used: production preview on 8765 and isolated Chrome on 9227 (/private/tmp/tlevel-regression-chrome); check availability next session. An earlier temporary 8766 mount was used only for the committed /starters baseline. Do not use a student/personal browser for these scripts: they clear test storage, and the focused regression harness closes test tabs.
Web Locks requires HTTPS/localhost and a supporting browser. Unavailable ownership/unreadable storage blocks startup rather than allowing a destructive fallback. Close old-version tabs after an update; they cannot follow the new lock. No physical Safari, screen-reader or OneDrive desktop sync verification. Existing large-chunk warning remains. Prior unreproduced startup delay and stalled clock-mocking assessment fixture remain separate historical limitations; no new claim about either.

## Next action
Session closed at the teacher’s request. Requested work and documentation are complete; await review or new feedback. Commit/deploy only when requested. Source changes and generated hashed-asset additions/removals in live/ remain uncommitted. For further puzzle-host/control edits run --puzzles; for profile ownership/persistence edits run --profiles and the focused unit checks in docs/local-development.md. Reuse passing results when inputs are unchanged.
