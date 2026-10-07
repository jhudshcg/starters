# ESP starter designs for discussion

**7 October 2026 requirement update:** useful automatic marking is required for every exam-practice question. Teacher evaluation of student work is optional, so the earlier review-only written-reasoning approach below is not sufficient on its own. Existing content has not been changed by this note; audit and adapt those formats as recorded in [planned work](../planned-work.md), following the [shared marking requirement](../spec-common.md#marking-and-attempts).

**27 September 2026 — Task1/Task2 implementation authorised and authored.** See the [implementation/evidence map](activity-evidence.md) for final first-release controls, coverage and checks. Tasks3–4b remain documentation only. Grounded in the [evidence review](evidence-review.md), using the [repeatable process](review-process.md). Detailed first-phase designs: [Task 1](task-1-designs.md) and [Task 2](task-2-designs.md). Resource/page references below resolve through the [conversion register](conversion-register.md).

## Intended experience

Add **ESP practice** as a fourth activity type, with Task 1, Task 2, Task 3, Task 4a and Task 4b as the main choices. Show only implemented tasks; do not expose empty activities. Within a task, choose a skill or a mixed set. Initially implement only the agreed Task 1/2 designs. Keep exam CA revision and Python practice available as separate activities.

Propose **21 set designs**: five each for Tasks 1 and 2, four each for Tasks 3 and 4a, three for Task 4b. Each set contains three self-contained multipart questions, up to five minutes each (no more than 15 minutes total), including reading and interaction. Each question supplies all required context and an independent starting state. Practice marks measure bounded evidence; they are not official ESP marks. Timings are estimates awaiting classroom trials. Sources calibrate demand and evidence, not a requirement to reproduce the original multi-hour tasks in miniature.

The progression is **recognise and explain → complete/repair → construct and check → transfer unaided**. Students should eventually produce a short artefact, not only recognise a correct option. A teacher can prescribe a sequence; random selection remains useful for retrieval practice. Recommended starting route: T1.1 → T1.2 → T1.3 → T1.4 → T1.5, and T2.1 → T2.2 → T2.3 → T2.4 → T2.5. Allow direct access without forced unlocking.

Use original small scenarios: a booking service, retail stock tool, club results dashboard or helpdesk. These transfer the processes demonstrated in RBSX/RetailX/Glenstar without rehearsing company names or relying on unstated sector knowledge. Include only the brief extract, code, data and resources required by that set. Keep calculations within the supplied context; do not introduce legal/financial/medical advice.

## Marking and feedback contract

- **Automatic checks:** exact values, meaningful selected relationships, test-class coverage, permitted code edits, schedule constraints, valid algorithm structure and trace results. Score independent components in 1–3-point parts. A 4-point question comprises multiple parts. Each design below states its automatic total.
- **Short authored explanations:** one or two sentences reviewed against a small evidence rubric after submission. Label **Needs review / Self-reviewed / Teacher-reviewed** separately from automatic points. No keyword-based claim of holistic assessment. Offer an annotated example and let students identify evidence in their own response. Do not award an official band, or count pressing “reviewed” as attainment.
- A correct decision and a valid reason for it are separate authored checks. If a reason depends on a selected decision, use a list of permitted pairs; an unrelated true statement earns no linked-reason credit. No global fuzzy matching of code, numbers or formulas.
- Numeric answers accept equivalent representations unless formatting is assessed. For currency, state rounding explicitly and compute reference answers with decimal arithmetic. Unit correctness is a separate component where it is assessed. Do not double-penalise an arithmetic slip: assess a downstream method against the student's earlier value only where that question explicitly supports error-carried-forward.
- Constraints allow all valid schedules/allocations/algorithms within the bounded model. Do not compare a timetable to one exact screenshot. Distinguish feasibility from optimality; ask for a shortest schedule only when an independent solver proves the minimum.
- Hints supply a starting strategy. Wrong-answer feedback identifies a relevant conflict or counterexample without filling every blank. Reveal shows a worked solution, why it meets the rules and any valid alternatives. Keep model answers separate from questions and review rubrics until submission/reveal.
- Shared cases can leak help between questions. Record assistance at the dependency-group level for connected questions; exclude assisted first responses from independent revision evidence. Retain final practice scores separately.
- Timed expiry submits structured answers and saves prose for later review. It must not invent a grade for an unfinished explanation. Keep draft answers and UI state across refresh, with the existing timer semantics.

## UI choices and accessibility

| Evidence being practised | Proposed control | Accessible alternative / guard |
| --- | --- | --- |
| Timing, task order and staff capacity | Small schedule table with start-day inputs, duration and staff selectors; derived Gantt strip | Full labelled text table is authoritative; no drag required; show conflicts in text after checking |
| Cost consistency | Spreadsheet-like table with a few editable numbers/formula choices | Row/column headers, tab order, currency/units; collapse to labelled cards at narrow widths |
| Decision and rationale | Linked decision/evidence/consequence choices, followed by a short text box | Explicit labels; no score for mere word count; separate review state |
| Testing process | Five-column test-log editor: purpose, data, expected, actual, action | One row at a time on phones; retain full-table overview; actual outcomes come from authored observed runs |
| Defect repair | Short code panel with bounded editable tokens/lines and trace/run evidence | No arbitrary student-code execution in the initial release; keyboard editing and clear line references |
| Algorithm design | Reorderable blocks and branch/connection selectors with a diagram preview | Move up/down buttons and an ordered textual representation; never require precise dragging |
| Data analysis | Tiny data table, query/filter controls and chart/table output choices | Underlying data and written chart description always available; no colour-only encoding |
| Evaluation | Requirement/evidence/judgement matrix, then short reflection | Review rubric and examples; separate automated and reflective outcomes |

Use existing site layout, focus styles, hints and answer controls. Avoid a full spreadsheet IDE or freehand diagram canvas. All controls must work with keyboard, screen reader labels, narrow screens and high zoom; test relevant components at 320 CSS px and 400% zoom after implementation. Table scrolling must not make the entire page horizontally scroll.

## Variety and set composition

Each named design is a **set recipe** with three stable question roles, not an invitation to mix unrelated questions blindly. Initially author five coordinated variations per recipe (within the current eight-variation limit). For Task 1/2 this proposes 30 question templates / 150 question variations in total. Keep structurally different cases across each recipe, but also deliberately repeat a stable procedure with small meaningful changes to inputs, boundaries or observations. This supports fluency, especially for validation and test-log columns. Do not substitute cosmetic synonym/name rotation for practice; label close-repeat practice separately from transfer to a different defect or constraint. Concrete variation axes are in the task documents.

A recipe's variations must be independently reviewed; five variations do not count as five distinct templates or five distinct skills. Every individual question must contain enough context to open directly. A full set may display shared context once, but its stored data must make individual codes self-contained. Later questions supply a fresh state and must not require earlier answers; staged dependencies belong within a question. Mixed practice may combine self-contained questions only; coordinated-case questions remain together.

“New set in this skill” selects another compatible recipe where one exists; otherwise it offers another coordinated variation. “New permutation” preserves roles and learning focus while changing the complete case consistently. Preserve stable slots/variation positions and exact sharing. Do not manufacture a new combination by mixing a staffing table from one case with another case's costs.

## Task 3 — designing a solution

See the [28 September review](tasks-3-4-design-review.md) for proposed drag-and-drop make/fix activities, per-question timing, Task4 refinements and reusable editor options.

Sources: all three Task3 briefs; SAM scheme pp18–19; AdSAM pp23–24; live scheme p18; examiner pp22–26; Grade A p16 and Grade E p13. Common gap: diagrams name processes but do not explain how they work. Prerequisites: selection/iteration, lists or tabular data, basic flowchart/pseudocode conventions.

| Set / time | Three questions and evidence | UI / automatic points | Variations and feedback |
| --- | --- | --- | --- |
| **T3.1 Make the brief executable** / 7–10 min | Identify required inputs/outputs (3); assign concrete operations to reusable components with input/return contracts (3); improve a vague “process data” box in one sentence (review) | Requirement matrix + component cards; **6 + review** | Conversion, stock totals, competition placings, booking counts, helpdesk age. Hint: trace one request from input to output. Reject a list of component names with no data flow. |
| **T3.2 Design a validation loop** / 8–12 min | Order input/parse/check blocks (4); connect invalid and valid branches (4); trace one valid and one invalid input (2) | Block list + branch selects + trace; **10** | Invalid date format, reversed dates, unknown ID, out-of-data range, empty input. Accept different correct retry structures; reject loops that never change input or proceed after failure. |
| **T3.3 Filter, then calculate** / 8–12 min | Select qualifying rows for an inclusive date/entity filter (3); complete accumulation/count algorithm (4); determine its result and empty-result message (3) | Data table + bounded pseudocode + numeric/text choices; **10** | Sum versus count, duplicate entities/dates, shuffled rows, inclusive endpoints, no matches. Hint: make a keep/discard decision per row before aggregating. Feedback supplies one counterexample row. |
| **T3.4 Hand the design to someone else** / 10–15 min | Identify two missing details in a supplied design (4); repair a call/parameter/return contract (2); write developer or client explanation as requested (review) | Annotated algorithm + contract table; **6 + review** | Missing return, ambiguous units, absent branch labels, hidden date-order assumption, incorrect graph description. Review precision, audience and implementability rather than diagram decoration. |

**Worked T3.3 case:** records `(date, product, units)` are `(2026-09-01,A,2)`, `(2026-09-02,A,3)`, `(2026-09-02,B,7)`, `(2026-09-03,A,4)`. Request A from 1–2 September inclusive. Keep rows 1/2, sum **5**, count **2**. `AND` combines product and both date bounds. A distractor that sums all A rows gives 9; using OR includes unrelated rows. The question asks for units sold, so count=2 is a meaningful wrong answer. An empty match must return the specified zero/no-data response without attempting an average division. Students later implement their own equivalent algorithm in a design tool; block success alone is supporting practice.

**T3 review rubric:** identify data used, precise process/control condition and output; then judge whether another developer could implement without inventing a missing requirement. Accept conventions consistently used in an intelligible pseudocode dialect; do not require Python syntax.

## Task 4a — developing and extending a solution

Sources: Task4a briefs; AdSAM scheme pp30–33; live pp19,23; examiner pp33,40–41,53–54; Grade A p21, E p16. Prerequisites: functions, parameters, collection processing; introduce needed dataframe operations within the case rather than assume all students know pandas.

| Set / time | Three questions and evidence | UI / automatic points | Variations and feedback |
| --- | --- | --- | --- |
| **T4a.1 Answer the actual data question** / 8–12 min | Choose fields/filter/grouping (3); complete a small pipeline or formula (4); calculate/interpret result (3) | Tiny table + pipeline cards + number fields; **10** | Revenue/profit/units, group comparison, inclusive range, absent group, unsorted data. Hint: state what one output row represents. Wrong-field feedback contrasts count, sum and average. |
| **T4a.2 Extend without breaking existing work** / 8–12 min | Match an existing function contract (3); complete a new call/return or repair a copied column reference (4); choose a discriminating regression case (3) | ≤12-line snippets + contract/test selectors; **10** | Wrong field, swapped arguments, premature return, shared mutable state, omitted prior menu route. Reveal demonstrates old and new behaviour, not just the new screen. |
| **T4a.3 Make failure useful** / 8–12 min | Diagnose an input/empty-data failure (3); complete a bounded handling path (4); choose an accurate user message and relevant data-handling reason (3) | Error transcript + repair fields + linked choices; **10** | Blank input, malformed number/date, absent file, no matches, irrelevant detail exposed by an error. No bolt-on login. Distinguish handling a failure from silently hiding all exceptions. |
| **T4a.4 Make the output worth reading** / 10–15 min | Choose a suitable comparison/time-series output with labels/units (3); improve a reusable function boundary or an informative comment (3); justify one usability improvement using the displayed artefact (review) | Chart preview with data table + code choices; **6 + review** | Crowded labels, mismatched scales, missing units, duplicated comparison code, comments that restate syntax. More comments or a different graph type is not automatically better. |

**Worked T4a.1 case:** product A sells 2 units at £15, unit cost £9; product B sells 3 at £8, unit cost £5. Revenue is **£54**, cost **£33**, profit **£21**. `(sale_price - cost_price) * quantity` matters; summing unit margins gives £9 and misses quantity. A group's average per transaction is a different requested measure from average per unit. Round displayed money to two decimal places; do not round source rates prematurely.

**Transfer:** independently extend a small supplied Python program and verify both existing/new functions. These starter checks assess local reasoning and constrained edits, not whole-program functionality, security or maintainability. Source login commentary and scoped-data advice are contextual; never teach that local variables alone guarantee confidentiality.

## Task 4b — reflective evaluation

Sources: Task4b briefs; SAM scheme p28, AdSAM p37, live p26; examiner pp55,65–66; Grade A p29 and E p20. Prerequisite: distinguish a requirement from an implementation detail and understand the supplied evidence.

| Set / time | Three questions and evidence | UI / automatic points | Variations and feedback |
| --- | --- | --- | --- |
| **T4b.1 Description or judgement?** / 5–8 min | Classify short statements (3); match a judgement to evidence that supports it (3); add a consequence for the named user (review) | Claim/evidence cards + one sentence; **6 + review** | Unsupported praise, accurate description, contradicted claim, partial success, useful limitation. Hint: ask what requirement is being judged and how the evidence demonstrates it. |
| **T4b.2 Evaluate a working feature** / 8–12 min | Identify which requirement is met/partly met (3); detect an unsupported generalisation using a counterexample (3); write a bounded balanced judgement (review) | Read-only output/code/test evidence matrix; **6 + review** | Correct calculation but unclear units, readable graph with wrong range, robust input but poor empty-state message, correct single case but insufficient tests, useful fixed range but no custom range. |
| **T4b.3 Propose an improvement that matters** / 8–12 min | Choose an improvement relevant to evidenced need (3); choose an acceptance test that establishes its benefit (3); justify priority/trade-off (review) | Need/change/check chain + short text; **6 + review** | Improve a completed feature as well as fix omissions. Accept more than one justified priority; do not mark one universal feature ranking as correct. |

**Worked T4b.2 case:** requirement: total A's units over an inclusive requested date range, with meaningful output. The T3.3 implementation outputs only `5`. Calculation evidence supports numeric correctness for this test; output lacks product, period and units. A strong short judgement: “The total matches the two qualifying records, but ‘5’ does not tell staff which product or dates it covers. Label the product, date range and units, then check another range and an empty result.” Reject “fully tested” from one example. Review rubric: supported judgement, specific evidence, consequence and justified next step. This is a teaching rubric, not the official 6+3 mark allocation.

## Pre-release preparation

Optional later set, outside the 21 assessed-task recipes: read a short unfamiliar sector brief, identify a question worth researching, distinguish evidence from assumption and plan a contribution to a group discussion. Any solo score measures those bounded decisions, not collaboration. No memorisation of scenario names or assessment administration trivia.

## Implementation order after discussion

1. Agree navigation, hybrid marking and first-phase set scope. All task documents remain proposals until that discussion.
2. Add a minimal ESP bank/loader/identity route and complete T1.1 plus T2.1 as the first usable increment. Avoid publishing empty choices. Verify old codes/history still work.
3. Add cost/capacity controls and T1.2/T1.3; bounded calculation/repair tasks T2.2/T2.3. Build each functional increment.
4. Add reviewed-response storage/display and T1.4/T2.4, then connected cases T1.5/T2.5. If reviewed responses are not agreed, revise these designs before coding; do not quietly drop their reasoning outcome.
5. Finish focused validation and classroom-facing preview of all Task1/2 recipes. Tasks3/4a/4b stay documented until separately authorised for implementation.

Implemented: the 48-bit format now uses type3 for ESP, with individual prefix `ESP`. Eight-character set codes and earlier type meanings are preserved. Codec, identity, loader, production build and progress integration are tested. Older clients still require an updated build to recognise ESP codes.

Progress proposal: store automatic marks and review state separately, tagged `ESP.T1.dependencies`, `ESP.T2.boundaries`, etc. Keep ESP revision priorities separate from Core CA coverage and exclude self-review from attainment calculations. Imports/exports must retain these distinctions. Three set roles fit the current code slots; coordinated variation selection and related-question assistance need explicit tests.

Checks after agreement: independent reference calculations/constraint solutions; accepted/rejected and alternative valid responses; regression tests for other activity types, codec, loader, marking and progress; targeted keyboard/mobile/high-zoom previews; coverage/identity generation where applicable, validation and production build. This documentation phase changes no runtime content or `live/` files.

## Decisions for discussion

- Recommended: a separate **ESP practice** activity, with task/skill selection and the same sharing/timer experience.
- Recommended: automatic checking for bounded work plus clearly separate short rubric-reviewed explanations. This preserves rationale/evaluation practice without pretending to grade it reliably by keywords.
- Recommended: implement all five Task1 and all five Task2 recipes in the increments above; build only those tasks initially. Default to 8–12 minutes, with integrated sets up to 15 minutes.
- Student responses remain local. Optional teacher review is a classroom activity using the displayed response/model rubric; no accounts, automatic teacher inbox or cloud sharing is implied.


## Teacher refinement — 26 September 2026

The three-question, maximum-five-minutes-per-question contract supersedes the earlier shorter whole-set time estimates in the tables above. Rebalance reading, decisions and feedback within each question; do not merely change a time label. Close assessment-source comparison is required before authoring each question family: see the evidence gate in the review process. Task2 prioritises validation defects and explicitly teaches all five test-template columns across repeated short exercises; see its detailed design additions. Broad progression is accepted; subsequent work should apply these requirements rather than seek the same approval again.
