# Current checkpoint — 13 October 2026

## Completed; ready for review

Implemented the authorised OneDrive, Go, puzzle-layout, Coding practice content/guides and Maths-link work. Final production output is rebuilt in `live/`. No commit or deployment. Earlier uncommitted plain Go notice CSS and DEV_LOG history were preserved. Detailed evidence and decisions are appended to [DEV_LOG.md](DEV_LOG.md).

- Browser-local progress remains primary. Linked OneDrive files use hashed profile UUID filenames and reuse root T-Level or DSD T-Level, otherwise create T-Level. File write/permission/conflict failures retain local data; local-storage failure is explicit and offers Download backup. Cloud upload belongs to the OneDrive desktop client.
- Portable Maths Go improvements and a human practice route are integrated, including drag-to-aim, clocks, undo/redo, count/dead groups and optional GNU Go estimates. Engine source/licences ship with production. Practice games are transient; no computer opponent.
- Dense puzzle layouts fit at 320px without horizontal scrolling or split short labels. Classic maths is hidden from discovery and links to the live Maths site; existing codes remain valid.
- Coding practice only: 10 new search/sort/list templates (50 variations), 55 refined tips and optional guides for all 20 Python focuses. All 39 guide examples independently executed. Guides preserve assistance and disclosure state. Core exam and ESP content is unchanged.

## Verification evidence

- Shared runtime milestone: all 189 tests passed; package/puzzle/profile browsers passed, including 14 production puzzle examples.
- Later focused checks: Python reference/marking/readability; progress/file/profile/discovery; 23 search/packed-bank/compatibility tests passed.
- Final OneDrive failure browser check passed local-first save, simulated disk/quota failures, retry, reload and external-edit refusal.
- Final guide browser check passed all 20 focuses at 320/640/1280px, native keyboard disclosure, saved state, assistance and post-submission review.
- Final dense-puzzle browser check passed 32 family/level examples at 320/640px; no internal scroll, candidate buttons ≥24px and unsplit short labels.
- Coverage/codes/validation and final build passed: revision 23, 1,350 templates / 2,983 variations. Python: 73 templates / 365 variations. Documentation links and whitespace checked.
- Final content/CSS work used focused checks; the earlier full-suite result is not a claim of a later full rerun. See [check selection](docs/local-development.md#select-checks-from-the-change).

## Remaining priorities and limitations

No known failing check remains. High-priority backlog: automatic-marking coverage audit, Core CA3–CA8, and 48 additional Python templates to meet six per focus across the remaining 16 focuses. Framework migration and account/checkout move remain separately planned.

Teacher subject approval, student timing/hint trials, physical-device pinch/accessibility and actual OneDrive desktop upload remain unverified. File APIs need supporting browsers (Chrome/Edge); download/restore remain the fallback. Confirmed writes are not confirmation of cloud upload.

Possible later Maths transfers (not implemented): profile rename/reset/delete, last-backup reminders and an input-hash verification cache. Recorded in feature_ideas.md; no watcher or automatic cache was installed.

## Exact next action

Review the completed changes and try the local site if desired; do not repeat passing suites for documentation-only changes. Choose the next backlog item before new implementation. Do not infer permission to deploy, migrate frameworks or move the checkout.

The last session used production HTTP on 8765 and isolated Chrome debugging on 9227. Check availability before reuse. Browser scripts clear that dedicated test browser's storage; never use a personal profile. Temporary logs/screenshots are in `/private/tmp/tlevel-*` and may not survive. Source Maths repository was read-only at `/Users/joehudson/Dev/Maths/practice-gcse-maths`.

## Quick follow-on — Python project suggestions

Plan: add one collapsed Coding-practice-only section with ten beginner-friendly projects in increasing challenge order; preserve existing question behaviour, syntax-check and rebuild production. Each project should use several covered topics and fit roughly 100–500 readable lines without making line count a target.

Quick follow-on completed: ten ordered Python project briefs now appear in a collapsed section on Coding practice activities only. Syntax check and production rebuild passed; no new browser run. See the final DEV_LOG entry. No outstanding implementation step; site production output is current.
