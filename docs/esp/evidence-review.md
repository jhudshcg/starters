# ESP evidence review — 25–26 September 2026

**Status:** historical research record; teacher agreement and implementation authorisation are now recorded. The [close-reading ledger](close-reading-ledger.md) supersedes the old outstanding-reading list. This record preserves findings so the next session can resume without rereading the collection. Follow [review process](review-process.md); exact source paths/hashes are in the [conversion register](conversion-register.md) and manifests. PDF page numbers include covers. Sources are supplied local assessment materials, not a current-series administration audit.

## Sources read on 25 September — historical inventory

Outstanding targeted reads listed here were completed on 26 September as recorded at the end of this document. Full independent evaluation of exemplar workbook formulas remains outside the completed checks.

- Local `../agents/spec.md`, ESP section (lines 2466–2708): pre-release and Tasks 1, 2, 3, 4a, 4b.
- All three packs' Task 2, 3, 4a and 4b substantive requirements and deliverables. Initial combined output truncated part of AdSAM T2/T3; these were separately reread completely. Scenario contexts: RBSX finance; RetailX retail loyalty/sales; Glenstar athlete training/performance.
- Task 1 original SAM pp3–6,10; AdSAM pp3–5,9; live pp3–6,9. Individual staff profiles were sampled in conversion visuals, not completely re-reviewed against all task allocations. Final assumption/deadline page of AdSAM/live still needs a targeted read before using its exact numbers.
- Original SAM scheme rubric pp8–9,13,18–19,24–25,28 and guidance p12; AdSAM scheme rubric pp10–11,17–18,23–24,30–33,37; live scheme rubric pp10,13,18,23,26 and development guidance p19. Original SAM Task4a functionality/logic/robustness row p23 remains to be checked against the current copy if comparing every descriptor.
- Live examiner report pp2–6,8–17,19,22–23,26,32–33,40–41,54–55,65–66. T2 worked examples on pp18,20–21 and T4a high-scoring commentary p53 need a targeted read before claiming their complete evidence has been analysed. Source visual contact sheets sampled figures, not every screenshot's detailed text.
- Grade A commentary pp10–11,14,16,21,29; Grade E commentary pp7–8,11,13,16,20. Grade A/E separate Task1 rationale PDFs read in full. Their project workbook structures and formulas inspected; full independent formula evaluation has NOT been done.
- Six CSV headers and first two records inspected; full date-order/content validation not yet done. No supplied Python entry point executed; the new session has not yet read the complete supplied code files. Existing older notes contain earlier code analysis, which must be matched to current hashes before reuse.

## Assessment structure and corrected historical assumptions

All three compared scheme families use task totals **18 + 21 + 18 + 34 + 9 = 100**. Current original SAM and AdSAM Task3 V2.0 booklets explicitly say **18 including 3 for communication**. The older `tasks-and-assessment.md` conflict of 21 versus 18 is superseded for these revised Task3 files. Do not edit original reference content or revive the old discrepancy.

| Task | Assessed traits and maxima | Strong evidence |
| --- | --- | --- |
| 1 | Gantt 3; costings 3; resource allocation 3; rationale 9 | Feasible dependencies/timings, justified staffing, consistent and accurate costs, perceptive reasons addressing risks and impact |
| 2 | Testing to find defects 9; understanding testing process 3; working solution 9 | Requirements-led tests/data, independently determined expected results, diagnosis/fix/retest trail, precise functional code |
| 3 | Decomposition 9; logic/conventions 6; communication 3 | Detailed implementable inputs/processes/outputs, reusable sub-processes, correct control flow and audience-appropriate explanation |
| 4a | Functionality 6; logic 3; robustness 3; security 6; organisation 8; UX 8 | Meaningful extension of given code, precise analysis, appropriate error handling, maintainable structure and useful outputs |
| 4b | Review of outcomes 6; future development 3 | Supported judgements against requirements and convincing improvements, grounded in actual evidence |

Official marking is holistic/best-fit. Starter marks can check bounded components; do not convert a starter percentage into an official band or grade. Grade A exemplars have acknowledged imperfections and are not flawless model solutions.

## Task 1 — planning and rationale

**Evidence:** original scheme pp4–9; AdSAM pp10–11; live scheme p10; examiner pp5–16,66; A pp10–11, E pp7–8 and both standalone rationales.

- Live examiner identifies rationale as a persistent weakness: many responses merely narrate task order and staffing, repeating the chart; some match staff only by job title. Strong reasons connect specific skills/experience, dependencies, benefits, risks and effects on time/cost. Focus on notable decisions, not an exhaustive commentary on every cell.
- Better plans combine sensible parallel/consecutive work, subdivide modules into shorter phases and distribute testing/fixing. Concurrent work is not automatically valid: dependencies, staffing capacity and integration readiness still govern it. The examiner's top-band example even has a minor integration-timing error: do not turn a practice constraint count into a simulated official band.
- Tasks and cost plans must agree. The live report praises inclusion of all costs, distinction between initial/ongoing costs and a multi-year affordability forecast. Poor work gives only totals or omits the forecast.
- Grade E rationale/programme uses calendar days for manager cost (119 including weekends), while staffing assumes working days. Its workbook explicitly contains `Costs!B8 =119*7`, `C8 =200/7`. Grade A uses manager hours from `Gannt!D100`, divides by 7 and multiplies by £200/day. Useful starter distinction: effort hours, working days, elapsed calendar time and duration.
- A rationale explains concurrent database/investment work using partial functionality, communication and coordinated integration; E uses more generic statements. A still admits no general contingency; do not copy that omission as a top-quality requirement. A's physical-server task name carries a note explaining cloud setup: consistency must be judged using notes, not title alone.
- Workbook formula inspection shows some `SUMIF` criteria and sum ranges of different lengths (e.g. C6:C99 versus D6:D101). Preserve those formulas; independently verify their actual behaviour before using them as a teaching example. Cached spreadsheet figures are source evidence, not guaranteed correct answers.

**Starter design implications (inference):** schedule repair with dependency/capacity rules; staff allocation with linked evidence and trade-off; cost/forecast table with explicit units and compounding assumptions; critique/rewrite a short rationale; reconcile a small plan, costing and rationale. Pair structured marking with a short rubric-reviewed explanation and later unaided spreadsheet transfer.

## Task 2 — testing, repairs and evidence

**Evidence:** all three Task2 briefs; original scheme pp12–13; AdSAM pp17–18; live scheme p13; examiner p17,19,66; A p14; E p11.

- Start from requirements and derive expected outcomes before studying the faulty code. The examiner calls out lack of boundary data and independently calculated expected outputs; retest changes and document the result.
- Finding every bug is explicitly NOT the hurdle between bands 2/3 for the first two criteria; quality/appropriateness of testing and process understanding matter. Do not award a simulated ESP band by bug count.
- A tests logic/calculations as well as IDE-highlighted errors; E repeatedly casts currency to integer, loses precision and misses the inclusive £20,000 boundary. A still needs more retest evidence and two-decimal output formatting.
- RBSX: ID length 10; savings maximum £20,000/year inclusive; five-year predictions, fees and GBP formatting. Monthly input wording conflicts with annual code/rates in earlier source analysis: define units/deposit/fee assumptions in authored starters; verify current code before reusing numbers.
- RetailX: eight numeric-character loyalty ID (leading zero matters), category-dependent points on whole pounds, £500 tier break, in-store bonus. Distinguish per-item rounding from transaction rounding; state the rule explicitly in new practice rather than hide an ambiguity.
- Glenstar: inputs include start/target weight, weeks and injury status; 45–150 kg competition bounds; formula/output branches and one-decimal formatting. Treat supplied limits/rates only as fictional assessment rules, not health advice. An original non-health scenario can practise the same boundary/branch logic.

**Starter implications:** choose test cases that discriminate faults; calculate expected results; complete an authentic five-column test log; diagnose a trace, make a bounded repair, then select and interpret retests/regression tests. Constrain code fields for deterministic initial marking; do not claim they demonstrate unaided full-program debugging.

## Task 3 — detailed, implementable design

**Evidence:** all Task3 requirements; original scheme pp18–19; AdSAM pp23–24; live p18; examiner pp22–23,26; A p16; E p13; flowchart figures preserved.

- RBSX converts an amount with the most up-to-date rate. RetailX filters product/date range and totals units. Glenstar filters athlete/date range and counts each placing. These share reusable input/filter/process/output structure, but require different actual data operations.
- Examiner: vague boxes such as “is input valid?” do not specify the algorithm. Strong work gives format and data-range checks, actual extraction/processing steps, appropriate sub-processes and outputs.
- A separate decomposition diagram is not required; useful decomposition can be visible in main/subprogram algorithms. Avoid spending the short practice window on decorative diagrams or rote symbol naming alone.
- E omits how the latest rate is found and meaningful messages. A decomposes well but uses Pandas-specific syntax that non-technical clients may not understand. Pair technical detail with clear annotations rather than remove precision.

**Starter implications:** expand a vague algorithm box; connect reusable subprogram interfaces; repair validation/retry flow; derive a filter/aggregation and trace its output; choose suitable client versus developer explanation. Accept alternative logically equivalent designs; a restricted block vocabulary can support automatic checks, with free designs reviewed by rubric.

## Task 4a — extend and integrate a useful solution

**Evidence:** all Task4a briefs; AdSAM rubric pp30–33; live pp19,23; examiner pp33,40–41,54; A p21; E p16.

- Preserve useful supplied behaviour while adding the actual requested analytical capability. Copy/paste with superficial renaming can produce a plausible interface but the wrong data or calculation.
- Stronger analysis discriminates meaningful time windows/groups/comparisons; simply dumping one subset is weaker. All six inspected CSVs have scenario-specific schemas; Task4a adds USD pairs (RBSX), Category (RetailX), Rule Set (Glenstar). Do not assume Task3/4a data files are interchangeable.
- Examiner explicitly says an added login earns no credit here; it distracts from assessed secure coding. The supplied guidance emphasises function/data scope and error handling. Keep practical exercises aligned with the assessed behaviours while explaining that local variables alone do not provide authentication or confidentiality.
- Weak code organisation includes enormous functions, repetition and deep nesting. Helpful comments explain intent, but excessive comments can also impair readability (examiner p54).
- UX includes clear input guidance, meaningful labels/units, helpful error paths and comprehensible comparative charts. A exemplar can improve graph layout and offer custom date ranges.

**Starter implications:** choose/complete a filter-and-aggregate pipeline; repair copied code that uses the wrong field; refactor repeated logic via parameters/returns; improve a short input/error path; select and annotate a graph that actually answers the user's question. Keep full Python/dataframe execution out of the initial scope until explicitly designed and tested.

## Task 4b — evaluate with evidence

**Evidence:** all Task4b briefs; all scheme outcome/improvement rows; examiner pp55,65–66; A p29; E p20.

- Students evaluate read-only Task4a evidence against both system and user requirements. A description of features is not a judgement of quality.
- Strong chain: requirement → actual evidence → supported judgement → effect on user → justified improvement. Improvements can refine a working feature, not just finish missing ones.
- A is balanced and supported but can explain graph choices and date-search implications more deeply. E is more descriptive; an alternative graph is not automatically an improvement for time-series data.

**Starter implications:** classify claims as description/evaluation/unsupported; select evidence that supports or contradicts a judgement; write a bounded evaluation paragraph; prioritise improvements with a reason and a way to verify success. Use structured choices for checkable links; label authored prose as rubric/self/teacher reviewed, not automatically graded by keywords.

## Important source issues to retain

1. Current Task3 mark discrepancy resolved above; old notes are historical.
2. Native original SAM scheme p5 labels £1,580,900 as ongoing costs, while Task1 p6 states income £1,580,900 and costs £985,340. Use the brief's explicit labels in authored calculations and record the conflict.
3. Live examiner sample rationale p15 claims a NAS removes data-breach risk; it is a student's claim in an example, not a sound general principle. Commentary praises consideration of backup trade-offs overall; do not teach absolute security claims.
4. Grade E contents page calls its Task3 example “A Grade”; retain as a source typo, not evidence of a different grade.
5. Grade A/E examples contain imperfect reasoning and formulas. Distinguish source commentary, source artefact, independent calculation and instructional inference.

## Design pass completed 26 September 2026

The [activity designs](activity-designs.md), [Task 1 detail](task-1-designs.md) and [Task 2 detail](task-2-designs.md) now apply this review. They remain proposals for discussion. The following paragraph records the original design remit; no repeat bulk reading is needed.

### Original design remit

Use the evidence above to draft named 5–15-minute activity sets for every task, with worked examples, progression, meaningful variations, accessible UI and explicit marking contracts. Read only outstanding targeted items noted at the top when needed. Prioritise Task1 rationale/consistency and Task2 requirements → test → repair → retest. The teacher subsequently authorised implementation; current scope remains Task1/Task2 only.


## Targeted follow-up — 26 September 2026

- **Task 1 constraints:** AdSAM p10 specifies eight-hour days, five-day weeks, an 18-week deadline, database engineer unavailable in weeks 3–4, at least three minor tests per module and no more than four major tests overall. Live p10 specifies seven-hour days, five-day weeks, a 12-week deadline, network engineer unavailable in weeks 1–2, at least three minor tests per module and no more than three major tests overall. These are scenario-specific constraints, not universal ESP rules.
- **Scheme wording:** original SAM p23 top-band logic/structure text repeats “some” wording. AdSAM/live schemes state precision and consistency. Preserve the original anomaly; triangulate rather than silently rewrite the source.
- **Testing evidence:** live examiner p18 describes logs with unspecified inputs and vague expectations (two testing marks, one process mark). The p21 example has boundary tests and calculated expectations but lacks confirmation testing (eight testing, three process, nine solution marks). Both example images were inspected at readable size. These support explicit input, independent expected result, observation, repair and retest steps; they do not define an automatic grade conversion.
- **Strong development:** live examiner p53 gives six functionality, three logic/structure and three robustness marks, while chart comparisons could still improve. A working solution can support a justified improvement in Task 4b.

### Supplied Task 2 code — read, not executed

Original RBSX defects include a missing colon, identifier length logic, discarded float conversion/string return, an inclusive threshold error, four rather than five iterations, an incorrect rate, formatting and spelling issues. Its monthly brief versus annual implementation requires an explicit interpretation when designing practice.

RetailX includes a validation loop skipped by its initial flag, string menu input compared with integers, an identifier length inequality, incorrect category/tier logic, a missing argument, list/range misuse, whole-pound bonus interpretation and no main entry call. Glenstar includes inappropriate name validation, a misspelled function, a boundary exclusion, indexing/empty-input problems, a missing parameter, an incorrect rate, zero-timeframe handling, subtraction direction and a missing closing parenthesis. These findings inform original bounded examples; the supplied programs are not executed or silently repaired.

### CSV coverage and date anomaly

[Dataset inventory](../../references/esp/dataset-inventory.json) records six source hashes, schemas, row counts and date ranges. RBSX has 86 rows per file with one chronological row per date; Glenstar has 235 rows per file and multiple chronological rows per date. Both RetailX files have 252 rows and contain **03/11/2026** among November 2025 dates. The resulting order/range conflicts with a simple four-week assumption. Preserve the source; parse dates explicitly, inspect range/order, and state any authored exercise's date assumptions. Do not teach positional slicing as a universally valid date filter.

### Verification and implementation boundary

The [worked-example validator](../../scripts/validate-esp-designs.py) passes schedules, availability/capacity, costs, forecasts, tier calculations, rounding, boundary/identifier checks, harmful repairs and small data calculations. It verifies original design examples, not a future UI or marking engine. All 36 PDF/DOCX source/output hashes and linked assets were reconciled; all five workbook source hashes and declared output paths passed. No conversions were repeated. The final document manifest lists 270 linked assets (superseding the earlier checkpoint's 269).

Code integration review found that the existing codec has two type bits but explicitly rejects type 3 and currently recognises only PZ/EX/PY. Adding ESP needs a deliberate compatibility-preserving change to codes, loaders, navigation and progress, with tests; it is not just another bank import. Implementation remains blocked on the requested design discussion, not on further bulk source review.
