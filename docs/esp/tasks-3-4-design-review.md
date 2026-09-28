# Tasks 3, 4a and 4b — design review

28 September 2026. Documentation only; implementation remains outside the current Task1 formula slice. Reuses the completed [evidence review](evidence-review.md#task-3--detailed-implementable-design), [assessment distillation](assessment-distilled.md#tasks-34b-transfer-beyond-starters) and [existing set designs](activity-designs.md). No bulk source reading or conversion repeated.

## Task 3: make, repair and explain an implementable algorithm

Retain four skill sets. Increase construction/repair practice, especially real drag-and-drop flowcharts, rather than adding more symbol-identification questions. This responds to examiner pp22–26: vague processing/validation boxes fail to explain the actual algorithm. Grade E omits latest-rate selection; Grade A demonstrates useful decomposition but needs clearer client-facing explanations. A separate decomposition diagram is not compulsory.

Every set has three independent questions with its own supplied starting state; each includes reading/interaction in its five-minute ceiling. A later question must not require the student's earlier graph to be correct.

| Set | Revised three-question progression | Learning emphasis / format |
| --- | --- | --- |
| T3.1 Make the brief executable | Identify inputs/outputs from a short brief (3min); construct a small main flow that calls two supplied subprograms with explicit arguments/results (4min); replace a vague processing box with precise operations and a short explanation (4min) | Decomposition means data and contracts, not merely naming modules. Bounded flowchart palette plus parameter/return selectors; review the short explanation separately. |
| T3.2 Build and repair validation | Make a retry loop from6–8 supplied blocks (5min); repair a different supplied chart containing two stated faults (4min); trace a fresh chart through invalid, invalid, valid input (3min) | Make, debug and trace. Check conversion before numerical comparison, useful error output, renewed input and a reachable success exit. Formats/conditions are explicit, not a generic “valid?” diamond. |
| T3.3 Filter, then calculate | Select rows meeting an inclusive entity/date condition (3min); make a bounded accumulation flow with initialisation, filter, update and loop exit (5min); repair another chart's empty-result or count-versus-sum error and check its output (4min) | Correct data operation and control flow. Tiny visible table, constrained graph and numeric check. Include shuffled data and no matches; do not confuse newest row with latest date. |
| T3.4 Hand the design to someone else | Identify two missing implementable details (3min); fix a call/return or branch connection in a supplied chart (4min); give a developer or client explanation for a fresh annotated design (4min) | Interface consistency and audience. Accept precise pseudocode without requiring Python syntax; review prose against evidence and clarity. |

### Flowchart question contract

- Initially keep each chart to about6–8 active blocks, at most two decisions, a small palette and supplied start/end anchors. Avoid spending five minutes dragging twenty boxes. Offer auto-arrange, undo and reset; repositioning alone does not count as algorithmic progress.
- Use conventional terminators, input/output, process, decision and subprogram shapes. Blocks carry explicit operations/conditions, with bounded editable tokens where needed. Make and fix activities both require actual connection changes, not only ordering a list.
- Example make case: read a quantity as text; reject non-integer input; convert; accept1–20 inclusive; show a specific error and read again on failure; return the accepted value. Use token choices for the parsing condition so no hidden language-specific integer rules are assumed.
- Example fix case: an invalid branch returns to a condition without reading new input, and the valid/invalid edges are swapped. Tell students there are two faults. Afterwards test the supplied sequence0,21,5 and confirm two re-prompts followed by return5. In another variation, a missing conversion or exclusive endpoint replaces one fault.
- Grade **meaning**, not coordinates, edge bend points or XML text. Separate component evidence, control-flow evidence and trace/output evidence. Do not demand a single picture. Accept equivalent reversed conditions with correspondingly reversed branch labels within the supported vocabulary.
- Structural checks: usable start/end, connected required operations, explicit decision branches and no dangling assessed edges. Behaviour checks: independently authored input sequences, boundary values, expected outputs and input consumption, with a step cap to detect non-terminating retry paths. Loops are necessary; do not reject every cycle. A few passing traces alone do not prove arbitrary algorithm correctness.
- Keep the automatic language bounded and explicit. Execute only authored operation definitions through a small graph interpreter; free-form labels are annotations, not executable code. Free designs outside that vocabulary get a review rubric rather than a false automated verdict.
- Keyboard users must be able to add/select blocks, set conditions and choose source/branch/destination from an equivalent connection list. Dragging cannot be the only input method. Preserve graph state through reload, timer expiry and backup; record first-response assistance under the existing lifecycle.

## Task 4a: extend a working solution, then test the consequences

Keep the existing four sets and strengthen the link between edits and evidence. Source basis: examiner pp33,40–41,53–54; A p21; E p16. Relevant data schemas differ between Task3 and4a; supplying the actual columns is part of each case. Do not assume students know pandas: provide a tiny operation glossary when used.

| Set | Review decision / three-question emphasis |
| --- | --- |
| T4a.1 Answer the actual data question | Keep. Identify what one output row means (3min); complete filter/group/aggregate logic (4min); compare its result with a tiny independent calculation (4min). Vary totals versus averages, units versus revenue/profit, inclusive dates and absent groups. |
| T4a.2 Extend without breaking existing work | Strengthen. Read an existing contract (3min); repair/complete a ≤12-line addition (5min); choose both a new-feature test and an old-route regression test with expected outcomes (4min). Include the plausible wrong-column copy/paste error. |
| T4a.3 Make failure useful | Keep with narrower diagnosis. Read an observed failure (3min); repair the specific input/empty-data path (4min); choose a truthful message and explain the consequence (4min). Reject silently swallowing every exception. Avoid an unrelated login exercise. |
| T4a.4 Make output worth reading | Strengthen evidence. Compare two outputs against the user's question (3min); repair a label/unit/scale or reusable function boundary (4min); justify the user benefit of one change (4min, prose review). Preserve correct data while improving presentation; chart type alone earns no assumed benefit. |

Automatic scoring covers bounded filters, repairs and derived outputs; open usability/maintainability claims use the existing separate review status. Reuse existing Python-fragment and trace controls where they fit; no general student-code execution platform is needed for this design.

## Task 4b: supported evaluation, not feature description

Retain three sets. Source basis: examiner pp55,65–66; A pp22–29; E pp17–20. Make both successful and defective evidence visible so students learn to improve working features, not just finish omissions.

| Set | Review decision / three-question emphasis |
| --- | --- |
| T4b.1 Description or judgement? | Classify a short claim (2min); link another claim to supporting/contradicting evidence (3min); write a user consequence for a fresh example (3min). |
| T4b.2 Evaluate a working feature | Match a requirement to its evidence (3min); challenge an overgeneralisation using a counterexample (4min); write a balanced judgement about a separately supplied output/test record (5min). One passing test does not establish full correctness. |
| T4b.3 Propose a useful improvement | Choose a change that addresses an evidenced need (3min); select a discriminating acceptance test and expected result (4min); justify priority and a trade-off (4min). Accept multiple evidence-backed priorities. |

Prose rubric: requirement → evidence → judgement → user effect → justified improvement. Do not automatically grade prose by keywords or hide unreviewed writing inside an automatic percentage. Templates scaffold the reasoning, but include one short independent response so learners practise making the links themselves.

## Reusable flowchart tooling: bounded research record

The [expanded comparison](flowchart-editor-comparison.md) adds JointJS, checks standard-shape support and clarifies the ready-made editor versus library trade-off.

Primary documentation checked28September2026; summaries and URLs retained here for reuse. No dependency installed, downloaded bundle retained or prototype claimed. These tools provide editing; none supplies our educational marking rules.

| Option | Verified capability | Fit for this site (design judgement) |
| --- | --- | --- |
| draw.io embedded editor | Official iframe mode exchanges diagram XML via postMessage; JSON protocol supports load/save/autosave and configuration. [Embed API](https://www.drawio.com/docs/reference/embed-mode/), [integration examples](https://github.com/jgraph/drawio-integration). | Fastest route to a familiar full editor. Candidate for later free-design/portfolio practice. For these tiny marked starters, restricting the interface and translating free XML into bounded semantics adds work; hosted mode also depends on school access to embed.diagrams.net. |
| maxGraph | Client-side, framework-agnostic TypeScript/JavaScript graph library with nodes, connectors, layouts, change events and XML persistence; Apache2.0. [Official repository](https://github.com/maxGraph/maxGraph). Installation uses @maxgraph/core through a bundler; ES modules and JavaScript are supported. [Getting started](https://maxgraph.github.io/maxGraph/docs/getting-started/). | **First prototype candidate:** fits the existing vanilla-JS/esbuild app, allows a small authored palette and a directly controlled graph model. Reuses diagram editing without importing the full draw.io application. Accessible connection editing still needs a deliberate implementation and test. |
| React Flow | React components for interactive nodes/edges; documented keyboard focus, node movement, deletion, ARIA descriptions and screen-reader support. [Quick start](https://reactflow.dev/learn), [accessibility](https://reactflow.dev/learn/advanced-use/accessibility). | Strong alternative if maxGraph's interaction/accessibility trial is poor. This repository currently has no React runtime; introducing one for a single control has integration cost. Library accessibility support does not certify our finished activity. |

Recommendation: prototype **one make question and one fix question with maxGraph** when Task3 implementation is authorised. Keep draw.io as the familiar full-editor alternative; choose after observing keyboard/mobile usability and the effort needed for restricted connections, not by reputation alone. No hand-written canvas/connector editor is proposed.

Prototype acceptance: keyboard and touch parity; readable at200% zoom and narrow width; persistent undoable graph edits; deterministic JSON question state independent of visual layout; correct/incorrect/equivalent flow acceptance; bounded nontermination handling; successful reload/timer/backup; lazy loading so other activities remain unaffected. Pin the chosen dependency and retain licence notices. Use node IDs for operations and branch-labelled edges for assessment, with any library-specific XML confined to an adapter. Confirm round-trip semantics rather than assuming maxGraph and draw.io files are universally interchangeable.

## Next action

The teacher has now prioritised Task3. Use the expanded tooling comparison to select the small flowchart prototype. Task1 formula implementation remains pending for later in-site review. Tasks4a/4b remain documented designs; no new navigation options or incomplete runtime feature should be exposed.

## Adopted implementation plan — 28 September

The teacher selected **maxGraph, vanilla JavaScript, static hosting**. Follow the [recorded decision](flowchart-editor-comparison.md#adopted-decision--28-september): a small five-shape editor and inspectable operation/edge model, with a make/fix pair as the first tested boundary. Retain the activity progression and semantic marking above. No React migration, server requirement or full diagramming-suite UI. Implement the Task1 Excel sets first for review in the starter pages; Task3 editor integration follows as a separate buildable slice.
