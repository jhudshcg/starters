# Current handover — 16 November 2026

Latest work: shared candidate grids now reserve explicit space for the vertical axis title (`min-width: calc(1lh + 1rem)`). Item labels retain a separate max-content column sized to the widest label. This addresses the reported live overlap without restricting item labels or changing content/codes.

Local production build passed. Focused initial-load geometry passed for both ESD activities and original hCAIK6CCo at 1280/375px, device scale 2, including a temporary long row label. Verified title containment, separation, unwrapped labels and uniform cells; screenshot visually inspected. Original overlap was not reproduced in the isolated Chrome profile; exact triggering condition is unconfirmed. Logs: /private/tmp/grid-axis-{inspect,build,verify}.log; screenshot /private/tmp/grid-axis-fixed.png. scripts/browser-esd.mjs now includes axis/row-label bounds checks; syntax and whitespace checks passed.

The latest CSS/docs/check changes are uncommitted and not deployed. Previous ESD student-testing and startup changes were committed before this task and are visible on live GitHub Pages. Next action: publish the latest axis spacing fix through the usual commit/push workflow, or review locally.

ESD revision 38 links:
- Starter: http://127.0.0.1:8765/starters/set/?code=mCZw__H_4
- Longer: http://127.0.0.1:8765/starters/set/?code=mCZ4__H_4
- Search: http://127.0.0.1:8765/starters/search/?q=ESD

Both are Student testing activities, searchable by ESD/sustainable/sustainable decisions, opening as complete worksheets outside random multi-question sets. Sources are in references/esd/; content contract is docs/esd-activity-drafts.md. Earlier checks and limitations are in DEV_LOG.md. Preview remains port 8765 under /starters/, dedicated Chrome CDP 9227. No dependency, sync or profile-data changes.
