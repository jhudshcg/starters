# Content refinement and completion

For every change, including hints alone, apply [authoring rules](content-authoring.md) and the type specification. Historical reviews/checkpoints record evidence.

## Per-change definition of done

1. Identify slots/variations, assessment and source evidence. For coverage additions, record the gap, comparison with existing questions and distinct angle and SAM-calibrated demand. Recheck mappings: mentions/distractors are not coverage; constrained support for broader skills is practice. Reset subject approval when prompts, marking or assistance change.
2. Review every affected variation: prompts, code/boards, options, answers/alternatives, hints, feedback, explanations and linked parts. Check ambiguity, likely misreadings and suitable cautions, answer leakage, meaningful variation, marks/dependencies and set composition. Reconsider difficulty/timing when demand changes; technical success is not classroom calibration.
3. Independently check answers. Text rules need accepted, rejected, near-spelling and contradiction examples. Execute corrected Python references (timeout unsafe examples); apply puzzle-specific solution checks. For hint-only edits, verify assessment data is unchanged and review the hint against it.
4. Use the proportionate checks below. Resolve hint placeholders and review relevant repetition; regenerate coverage and compatibility, then build `live/`. Technical checks do not replace the editorial review above.
5. Record scope, source/review evidence, checks and unresolved findings in the checkpoint/change description. Commit generated coverage/compatibility with source. Never reuse slots/variation positions; hints affect fingerprints. The staged-build hook omits the full suite. Update examples/status; link generated counts.

An editorial/technical pass is complete when these checks pass and unresolved items are explicit. Subject approval additionally requires teacher review of each variation; keep `reviewStatus` pending until then. Record reviewer, scope and decision; automated checks never grant approval. Student timing/hint trials remain a separate evidence requirement.

## Proportionate checks

**Question-bank-only changes:** use this smaller set when editing/adding authored questions through existing formats and markers, plus their imports, generated records and documentation. Shared marking, selection, rendering, progress, storage, codec and build behaviour must be unchanged.

- Check all affected variations: model answers and authored alternatives earn their intended marks; representative plausible wrong answers and contradictions fail; linked reasons respect dependencies. Reuse a relevant focused test or a small targeted script; do not create tests that merely repeat the data.
- For new/revised coding tasks, execute only their reference solutions independently, including boundaries and side effects. Never execute student answers. For other content, use the relevant answer/solution check. Hint-only edits need an assessment-data comparison, not code execution.
- Run `npm run coverage`, `npm run codes:update`, `npm run validate`, then `npm run build`. The lightweight validators include bank structure, model answers, hint placeholders, identities and coverage freshness. Review hint repetition only for the affected content.
- Skip the full test suite and whole-bank browser smoke. Preview only new/changed questions when their layout or interaction needs checking. For puzzle changes, run the relevant family’s solution validator; broaden only if its generator/rules change.
- Save functional increments (normally two questions) and post one short progress update. Suppress successful command output; retain failure details locally and report the relevant failure. Run a check again only after a relevant change or failure.

**Broaden when needed:** shared application behaviour, data schema, markers, selection, generators, build tooling or dependencies change; a focused failure suggests wider impact; or a release-wide check is explicitly requested. Run relevant subsystem tests first, then the full suite/browser smoke when the change or unresolved risk warrants it. Do not trigger the full suite merely because content and an unrelated cosmetic change share a turn.

**Small isolated CSS changes:** build and inspect only the affected view at desktop/mobile widths and with keyboard focus. No whole-app browser run is required unless interaction, layout outside that view or accessibility behaviour is affected.

## Project definitions of done

The pilot requires the three activity types, exact sharing, feedback, timing, local progress and CSV transfer to work together and pass their checks. Full completion additionally requires reviewed Core coverage, all adopted content minimums and the deferred programming formats in [AGENTS.md](../AGENTS.md). A pilot release does not imply full completion. Type specifications retain their numerical minima and specialist checks; the implementation plan retains stage exits.
