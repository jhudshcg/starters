# Puzzle package boundary — adopted 8 October 2026

The package owns puzzle expertise. A consuming app must be able to offer every supplied puzzle type without implementing its renderer, interaction rules or answer checker. The parent remains responsible for a cohesive activity experience.

## Responsibilities

| Package | Parent app |
| --- | --- |
| Content, stable IDs, variation order, tags, numeric bands, individual Go ranks, guidance and artwork | Selection, ordering, grouping, question/set codes and activity navigation |
| Embeddable puzzle controls, keyboard/pointer interactions and serialisable answer state | Where controls appear, optional style overrides, saving/restoring state |
| Rule-specific evaluation, earned/maximum marks and feedback | When checking/submission occurs, where results appear, progress and attempt policy |
| Hint/solution content and render functions; report assistance requests | Whether assistance is allowed, show/reveal controls and recording assistance |
| Recognise a source-recorded Go win and report it | Decide how live feedback relates to submission and tracked results |

The package does not submit an activity, access storage, encode app codes, group questions, start timers or record progress. Undo/reset and next-move hints are puzzle controls, but their availability must be configurable by the parent. Locking prevents edits; revealing a solution must not replace the saved answer.

## API and rationale

Provide independent headless evaluation and DOM rendering entry points. Evaluation accepts a resolved variation and an answer map keyed by part ID. It returns earned marks, maximum marks, completion and per-part feedback. Maximum marks are available without an answer. Reading state/results does not implicitly check or reveal anything. This supports custom renderers, testing and parent-controlled submission without DOM dependencies.

Provide both composable HTML/binding functions and a mountable control for consumers without their own rendering infrastructure. The mounted control supplies snapshot/restore, lock/update and disposal. Callbacks report answer changes, assistance requests, messages and live Go completion. The parent owns submission buttons and persistence. No framework or CSS is imported automatically; default scoped styles remain optional.

Keep readable package inputs independent of this app's packed-bank format. The parent adapter decodes only the data needed for display/play, evaluation or reveal at that point. Ordinary checking must not decode explanations. Existing stored answers remain strings keyed by the original part IDs; the initial extraction does not introduce a storage migration.

Preserve app slots, variation order, question fingerprints, hints and source/rules links. Package instance IDs namespace control IDs so multiple copies can coexist. Package internals may retain existing markup classes to avoid needless visual churn, but the public API must not require parent bank/set/attempt objects.

## Implementation and checks

Move existing board rendering and interactions, rather than rewrite mechanics. Consolidate all supplied puzzle answer kinds behind the evaluator. Adapt this app's render/mark entry points to use those APIs while retaining question cards, codes, submission, feedback placement and saved-state policy.

Test every authored model answer and representative wrong/partial answers; preserve packed-data separation and existing code identities. Exercise multiple mounted instances, restore, lock/unlock, hints/reveal, keyboard/pointer input and disposal. Build production and check representative app flows. Keep the existing repository and optional styles; no separate hosting, submodule or framework migration is required for this boundary change.

## Theme and layout contract

The package uses only generic `--puzzle-*` tokens and scoped selectors. It never reads parent theme names, palette IDs or local theme storage. The parent maps semantic colours onto package tokens; its existing theme system remains authoritative and updates mounted controls through CSS inheritance. Sizing tokens and low-specificity element rules permit container/control overrides. Consumers may use default layout/theme, layout with their own theme, or their own CSS. Parent-owned question cards remain outside the control; transparent board hit targets are the documented structural exception to ordinary style overrides.
