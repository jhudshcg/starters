# Navigation, wording and search review — 28 September 2026

## Exam sections and future OS capacity

The home page has three cards. Exam practice opens a section menu populated by `js/exam-sections.js`; Core and ESP retain independent banks, identities, progress and selection rules. Both activity pages return to this menu. Future OS belongs in this registry as an independent bank, not as a focus sharing Core or ESP question slots.

The current codec gives **each bank 4,095 usable question slots**, with eight variation positions per question. The 2-bit bank field currently allows only four banks, all allocated. Before OS is introduced, extend bank identifiers with a distinguishable, backward-compatible code format; preserve or increase the 12-bit question-slot field for every bank. Do not take slot bits for sections, reserve a subset of Core slots for OS, or overload the existing bank-version field as an OS identifier. Keep reading existing set/question codes and saved progress. Update identity history, loaders, backup/CSV validation and sharing tests together at that point. This change deliberately does not migrate the codec before an OS bank exists.

Subsequent agreed decision: use six version bits and three bank bits, with rollover generations/dates protecting progress while stable topic evidence remains useful. See [bank rollover and progress](../code-rollover.md) for the authoritative design and the separate initial-layout migration constraint. Runtime encoding has not yet changed.

## Search discussion

Historical proposal: the user subsequently chose global search, cross-topic relevance, CA-tag matching across banks and shared code/search entry fields. The requested three-question result queue remains unimplemented. Use the [6 October decisions and rationale](../spec-common.md#decisions-and-rationale) for current direction; the single-bank/single-focus proposal below is not the final requirement.

Existing metadata is a good foundation, but not yet a consistent keyword index:

- Core: precise `CAx.y.z` tags and part-level coverage; parent focus labels and titles. The current imported Core bank covers CA1/CA2, not yet CA3–CA8.
- Programming: useful topic and skill tags, but variants such as `boolean expressions` and `boolean logic` need consistent mapping.
- ESP: broad Task1/Task2 tags, recipes, titles, plus variation-level `skills`; formula questions add `Excel formulas`. Skills should participate in search only for the variation that actually assesses them.
- Puzzles: families, challenge levels and some maths tags. Keep these separate from revision-priority calculations.

Suggested first implementation: search within the selected activity/section, using canonical topic tags, focus/spec labels, titles and authored skill tags. Maintain a small alias dictionary (`loops` → `iteration`, `dict` → `dictionary`) separate from question text and accepted answers. Rank exact topic/reference matches before title matches; show matching topics and counts before generating a set. Do not search correct answers or distractors as evidence of assessed content. Part-level references/keywords are useful where one multi-part question covers several topics.

The existing selector makes sets within a focus (or an ESP recipe). A search result cannot simply be passed as a new focus string. A dedicated candidate-pool selector must preserve whole questions, compatible variations, question counts, marks and ESP recipe requirements. Prefer a single-focus set initially; explicitly show related-question fill if exact matches cannot form one, or ask the user to broaden the search. Never silently label a weakly matching set as an exact match. Share the resulting concrete question/variation IDs with the normal codec; the search text need not be encoded. Store the search/filter only as selection context for new sets.

No search UI or new tags were added in this increment; these are design findings for discussion.

## Wording audit

Screened the rendered title, prompt, part-prompt and option strings across all four imported banks for unusual vocabulary and ambiguous substitutions. Followed candidate hits back to source, reviewed their variations and neighbouring parts, and inspected the data-structure/computational-thinking groups. This was a targeted vocabulary audit, not a fresh line-by-line subject approval of every puzzle, hint and explanation. The temporary extracted corpus is `/private/tmp/starters-wording-audit.txt` and can be regenerated from `banks`.

Corrected nine templates (Core: 26, 43, 101, 103, 117, 142, 151, 152; ESP: 15):

| Previous wording | Replacement |
| --- | --- |
| releases the open file resource / finishes explicit file access | closes the file |
| seeking [value] | searching for [value] |
| Characterise a booking's capacity rule / a receipt | Which category describes this rule / receipt? |
| block breakdown … reporting pipeline | set of blocks … stages of producing a report |
| module consumes an import module output | module uses the output from an import module |
| a coherent responsibility | one clear task |
| routine that owns the price calculation / aggregation | routine responsible for calculating the price / totals |
| Choose a discriminating test | Choose a test that exposes the fault |

The ESP recipe label uses the same clear wording. Technical terms with useful, precise meanings (abstraction, decomposition, interface, scope, array type code, reconciliation) remain. Ordinary vocabulary was not replaced merely to make variations sound different.

Sources: Core specification 1.1, CA1.1.7/1.1.9 (decomposition/representations), CA2.5 (file operations), CA2.11 (searching), CA2.12 (testing); the local `../agents/spec.md` is routed through `docs/exam-resource-map.md`. “Characterise” occurs in the specification, but the existing multiple-choice task only asks students to classify a feature, so the revised command is more explicit. Paper 1 SAM Q6 (testing benefits/interface role) and Q7 (abstraction tasks) illustrate the bounded explanation demand; these wording-only corrections preserve the existing one-mark task and do not claim to supply a full two-mark explanation.

Compared pre/post rendered banks: answers, alternatives, options, marks, dependencies, coverage, hints and explanations are unchanged. Slots and variation order are unchanged. Teacher approval remains pending; these are editorial refinements only.

## Choice-and-reason coverage

| Area | Existing practice | Gap |
| --- | --- | --- |
| Data structures, CA2.3 | Slot18 chooses list/dictionary by positional/key access; slot19 chooses typed array for compact numeric storage; slot124 constructs collections; slot134 traces changes. CA2.9 slot37 also chooses dictionary/typed array for efficiency. | No linked choice-plus-reason pair in CA2.3. The system explains choices afterwards, but that does not assess a student's justification. |
| Computational thinking, CA1.1 | Slots4,100,101,102,127,151 assess uses, benefits, limitations and combining techniques. Slot2 links a prediction to its assumption. | Few explicit scenario → choose technique → justify that choice pairs. Components complement one another; avoid implying they are always mutually exclusive alternatives. |
| Problem-solving approaches, CA1.3 | Slot130 links top-down choice to a benefit and bottom-up choice to a limitation with `dependsOn`. | Useful existing model for linked reasoning, but not the same content as computational-thinking components. |
| Data types, CA2.1 | Slot14 links string choice to preserving postcode characters/leading zeros. | This is data-type reasoning, not data-structure justification. |

A useful next content increment would compare list/dictionary/typed array against explicit access, update and storage needs; assess the choice and a linked scenario-specific reason. For computational thinking, ask which component addresses a stated immediate problem and why, then include combinations such as decomposition followed by pattern recognition. Use new slots for materially new tasks, two meaningful variations, 1–3 marks per part, and normal 15–22-mark set constraints. No new questions were authored in this review.
