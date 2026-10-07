# Repeatable ESP evidence and design process

Adopted working process, 25 September 2026. Scope: teaching/practice before the assessment. Read alongside [content authoring](../content-authoring.md), [content refinement](../content-refinement.md) and the [resource map](../exam-resource-map.md). Practice scores do not predict an ESP grade.

## Resume with a small, explicit context

1. Read the current [checkpoint](../../checkpoint.md) and the relevant ESP handover in [development history](../../DEV_LOG.md#2026-09-28), then the conversion register and the task evidence/design record being worked on. Do not reread the collection.
2. Identify the next unchecked unit: resource group, assessment focus, activity set or implementation increment. Write objective, files, checks and exact completion criterion in the checkpoint before work exceeding 20 seconds.
3. Check source SHA-256 against the conversion sidecar. Reuse unchanged conversions and verified evidence. If a source changed, invalidate only dependent findings/designs; preserve old evidence as historical.
4. Load only the relevant task booklet sections, matching scheme rows and needed commentary/exemplar extracts. Inspect linked figures for visual evidence; figure links alone do not count as reading them.
5. Finish with evidence references, decisions, checks, unresolved issues and a precise next action. Mark completion only at the appropriate level below.

## Evidence ladder for each task

Maintain one record per Task 1, 2, 3, 4a and 4b, with pre-release context where relevant. Record scenario/series, source filename/hash and PDF page for each claim.

| Pass | Read / do | Persist |
| --- | --- | --- |
| Requirements | Current local specification section; original SAM, AdSAM and live task requirements | Deliverables, constraints, inputs/outputs, scenario-specific requirements versus transferable skills. Record conflicts explicitly. |
| Assessment | Matching scheme: guidance, all bands, maximum marks and criteria | What distinguishes stronger work; acceptable alternatives; evidence actually assessed; holistic versus discrete assessment. Never turn indicative content into a required single solution. |
| Student difficulty | Live examiner report section and worked examples | Observed mistakes, why they matter, and what evidence improved the outcome. Separate examiner findings from our instructional inference. |
| Standards | Grade A and Grade E commentary with the actual task artefact | Concrete paired examples of quality: accuracy, completeness, justification, consistency and communication. A Grade A exemplar is evidence of strong work, not a guarantee every feature earns full marks. |
| Technical verification | Relevant supplied code/data/workbook or figure | Independently check sample calculations, boundaries, traces, dates, dependencies and units. Do not run unknown interactive entry points; isolate bounded reference calculations. |
| Synthesis | Compare all of the above | Requirement → rubric trait → observed difficulty → strong evidence → teachable subskill → proposed starter → marking limit. Record disagreements rather than silently harmonising sources. |

Do not compare marks across versions until the allocation is verified. Scenario-dependent rates, budgets, deadlines and file names belong in the evidence record, not the general skill definition. No online search is required merely to restate supplied source documents; consult current official administration guidance only if making claims about current assessment rules.

## Design from evidence, not from a list of widgets

For every proposed set, record:

- Task/assessment trait and source pages; gap it addresses; prerequisite knowledge.
- Three bounded, self-contained multipart questions of up to five minutes each, with all necessary context and independent starting states. Budget reading and interaction as well as answering. Five minutes is a ceiling per complete multipart question, not a minimum or target to fill; sets may be shorter than 15 minutes.
- Questions/parts, expected response, marks, time, meaningful permutations and progression from recognition through completion to independently constructed evidence.
- UI chosen for the evidence: editable schedule/cost table, dependency links, test-log rows, trace grid, code repair, algorithm blocks, chart interpretation, or short justified judgement. Include keyboard and non-drag alternatives.
- Marking contract: exact numeric/structural constraints; accepted alternatives; partial-credit boundaries; contradiction checks; dependencies/error-carried-forward policy; representative wrong responses.
- Hint, retry feedback and reveal rationale. Do not leak answers between questions or reward matching incidental wording.
- What can be automatically checked and what requires rubric-assisted self/teacher review. Do not present keyword matching as a valid holistic judgement of rationale, design or evaluation.
- Transfer exercise: what students should later do unaided in their actual editor/spreadsheet/design tool. Short structured success is supporting practice, not proof of independent portfolio competence.

Each task should offer a progression and more than one evidence format. Vary the underlying decision, defect or trade-off, not only names/numbers. Mix isolated practice with a short connected case that requires consistency between decisions and artefacts.

## Review gates and completion meanings

1. **Extracted:** conversion exists, source hash recorded, pages and figures indexed. Not yet a claim of accurate interpretation.
2. **Conversion checked:** page count/links/character retention reviewed; representative tables and every flagged page inspected; unresolved visual/text limitations documented.
3. **Evidence reviewed:** requirements, bands, examiner findings and exemplar evidence compared; calculations independently checked where used.
4. **Design ready for discussion:** every set has the above design/marking contract; unsupported assumptions and product choices are explicit.
5. **Teacher agreed:** scope and changes recorded in checkpoint. The user explicitly requires discussion before implementation; initially only Task 1 and Task 2 may be built.
6. **Implemented and technically checked:** small usable increments, focused tests and preview, compatibility/coverage where relevant, production build. Broaden tests for shared behaviour/schema changes. Keep existing activities working; never treat an unfinished ESP feature as a completed release.
7. **Subject approved / classroom calibrated:** separate teacher review and student timing/accessibility evidence. Passing tests does not confer this status.

## Implementation handover after agreement

Record selected sets and deferred sets, navigation/task labels, code and storage compatibility, bank schema, marking/progress treatment, reusable controls, generated files and relevant tests. Build Task 1 and Task 2 as separate reviewable increments. Record each working boundary so a later session can resume without rerunning unchanged extraction or investigation. Publication remains a separate action; no commit or deployment is implied by document preparation.


## Close-reading gate before question authoring — teacher refinement, 26 September 2026

For each Task1/Task2 question family, persist a compact evidence record before implementation:

1. Read the relevant mark-scheme guidance and **all bands** together. Describe the observable difference between weak, adequate and strong evidence; record page/trait references and acceptable alternatives.
2. Compare the examiner's judgement with the actual student response or log being discussed. Inspect the full relevant image/table; a commentary summary alone is insufficient where the artefact carries the evidence.
3. Compare relevant A/E exemplar work with its commentary. Identify exactly what is present, missing or inconsistent. Independently verify calculations or program behaviour used in a question. Reuse already recorded close comparisons where sufficient; target gaps rather than repeat the whole collection.
4. Link each question part, accepted answer, plausible mistake and feedback to that evidence or label it explicitly as an instructional inference. Do not claim an authored teaching threshold is an official mark-scheme rule.
5. Check independence and a five-minute workload: brief, bounded work, response and feedback. Record unverified classroom timing honestly. If a part needs too much context, narrow it instead of dropping the reasoning objective.

Existing task-level mappings are a foundation, not proof this gate has passed for every uncreated question. Persist coverage and outstanding evidence per family so later sessions do not repeat completed reading. Maintain a coverage matrix for Task2 validation families and every test-log column. Repetition with small meaningful variations is explicitly authorised for procedural fluency; retain contrasting/transfer cases to test understanding.
