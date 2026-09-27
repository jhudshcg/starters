# ESP assessment: reusable teaching conclusions

Close-reading update, 26 September 2026. Read this for teaching decisions; use the [register](conversion-register.md) for exact sources and [evidence review](evidence-review.md) for context and anomalies. Page numbers below include covers. Distinguish the board's assessment judgements from our instructional inferences. A starter checks small components, not an official band or grade.

## Task 1: accurate planning plus contextual reasoning

The three scheme families agree on Gantt 3, costs 3, resources 3 and rationale 9 marks. Progression is from partly logical/accurate/effective through mostly so to consistently effective planning and accurate costs; rationale rises from some consideration to thorough, perceptive consideration of task order, staffing, benefits/risks and effects on timings/costs. A list of those headings is insufficient: explain causal relationships in this particular plan. Sources: SAM pp4–9; AdSAM pp4–11; live pp5–10.

- **There is no single correct schedule.** Read the rationale and notes before rejecting an apparent dependency violation. Grade A overlaps investment development with the database because some work uses external data, with experienced staff communicating and coordinating integration. This is a justified partial overlap, not permission to ignore dependencies (A report pp7–11). Author small exercises with explicit readiness rules and accept all valid schedules.
- **Testing belongs in the schedule.** Split long modules into development/test/fix phases where sensible. Integration needs compatible completed components; deployment and acceptance have prerequisites. Live weak example deploys before integration and misallocates hardware/code work; stronger example still contains a minor integration error yet receives top-band Gantt credit (examiner pp7–10, images inspected). Do not simulate holistic marking by counting constraint failures.
- **Allocation must use evidence of skill and capacity.** Pairing can improve quality but adds effort/cost and limits concurrency. A's repeated junior pairing is defensible but could be relaxed for suitable minor tasks; seniority alone is not a universal allocation rule (A pp10–11; live examiner pp6,13–16).
- **Cost the plan actually made.** Staff effort is not total project duration; manager pay depends on working days under the brief's assumptions. E uses 119 calendar days, including weekends, for manager cost and omits the multi-year model (E pp7–8, workbook Costs!B8/C8). A accounts for manager hours/days through the Gantt (A p10). Include existing costs, one-off additions, recurring additions, the project year and subsequent forecast periods; distinguish annual profit from cumulative profit. Live examiner pp11–12 contrasts an explicit forecast with an undifferentiated list.
- **Feasibility need not mean meeting the requested deadline.** Live scheme pp7–9 anticipates a credible plan running beyond 12 weeks and rewards consideration of risk/alternatives. Include an honestly impossible short case and ask what must change; do not train students to force every plan to fit.
- **Rationale is reasoning, not narration.** Explain a notable choice → specific evidence → benefit → risk/trade-off → effect on time/cost and mitigation. E describes reasonable allocations but misses wider consequences; A links choices to other modules and cost but still lacks contingency and could deepen its methodology justification (A pp7–11; E pp5–8; examiner pp13–16).

Source cautions: the original SAM scheme p5 calls £1,580,900 ongoing costs, although the brief p6 labels that income and gives costs £985,340. The live scheme p6 similarly calls £543,120 costs; live brief p6 labels it income and costs £382,360. Use the explicit brief labels, record conflicts and independently calculate authored examples. The live student rationale's claim that NAS removes breach risk is not valid merely because the overall answer receives credit.

## Task 2: requirements, discriminating tests and a traceable repair process

All three schemes allocate testing 9, process 3 and solution 9 marks. Basic work shows a few appropriate tests and partial fixes; stronger work shows a requirement-led comprehensive range, a detailed account of finding/rectifying errors, and consistently correct functionality. **Bug count is explicitly not the Band2/3 hurdle for testing/process.** Test apparently correct code too; accept logically correct alternative repairs. Sources: SAM pp10–13; AdSAM pp12–18; live pp11–13.

### What the complete exemplars demonstrate

Both full logs (A five pages; E four pages) were read as text and visually, including screenshots, against their separate Python files and report commentary (A p14; E p11).

| Evidence | What it teaches |
| --- | --- |
| E log pp1–2 changes rejection from length >10 to <10; tests six and ten characters, then says fixed | A repair can solve the observed case and introduce/retain another defect. An eleven-character input exposes the missing upper-length check. |
| A log pp1–2 tests ten, then nine, repairs to !=10, repeats nine, then tests eleven | Link requirement, discriminating input, causal diagnosis, confirmation and additional boundary coverage. |
| E log pp2–4 repeatedly casts investment strings to integers; expectations merely say totals should calculate | Running without a crash does not establish numerical correctness; preserve decimal values and repair the data contract at its origin. Its code still has four savings iterations, wrong rate and inclusive-limit errors. |
| A log pp2–3 initially lists four-year-looking expectations, then supplies five-year expectations and identifies the loop defect | Even a strong exemplar's expected results need independent checking. Don't copy early cells into answer keys or imply every exemplar entry is ideal. |
| A log p3 documents a small difference between hand rounding and output; pp4–5 test exact limit and incorrect rate | State calculation/rounding rules. Check behaviour and numerical outputs; approximate expectations may diagnose a large defect but cannot certify precise currency output. |
| E tests 25,000 but not exactly 20,000; A tests exactly 20,000 and retests after repair | A far-out invalid case does not replace a boundary case. |
| Live examiner pp18–21 contrasts vague/implied data with boundary tests and precalculated outputs; stronger work lacks confirmation testing | Record actual inputs/results, then test the applied repair. Good diagnosis and a fixed program do not erase missing evidence. |

Do not call every startup fault a syntax error: a missing colon is syntax; a misspelled called function is a runtime name error. A log uses imprecise language here. Both exemplars leave wider validation concerns; strong grade commentary is not a certification that a program handles every possible input.

### Five-column test-log contract

These exact headings are in the supplied template. Teach recognition, completion and short independent production for each, with close-repeat variants.

| Column | Required evidence | Common misconception / feedback |
| --- | --- | --- |
| Description of test | Requirement and behaviour under investigation, with the particular boundary/path | “Test program” does not identify what correctness means. |
| Test data to be used (if required) | Exact values/types, sequence and setup needed to reproduce the test | “Invalid data” is not an input. No input can be appropriate for a startup/syntax check; N/A is not universally wrong. |
| Expected outcome | Requirement-derived result/behaviour before observation: values, rejection/re-prompt, continuation, preserved state as relevant | “Works” and copying the observed output do not provide an independent check. |
| Actual outcome | What the run really did, including wrong output, crash or repeated prompt | Do not replace the observed fault with what should have happened. A proposed retest is not an observed pass. |
| Comments and intended actions | Interpretation, justified change/next investigation, then linked confirmation/regression evidence | Do not infer that one passing test proves the program correct. A passing case may need no repair. |

### Validation coverage to practise generously

Exact length (short/equal/long); inclusive bounds (below/at/above); character and type restrictions; leading zeros; empty/space input; conversion and return type; menu strings versus numbers; combined conditions; retry-loop initial state/update/termination; invalid-then-valid entry sequences. Mix false acceptance, false rejection and crashes. Use original clear contracts so Unicode, whitespace or rounding assumptions are never hidden traps. Retain arithmetic/control-flow defects and some syntax faults. This distribution is a teaching decision, not a claimed official weighting.

## Tasks 3–4b: transfer beyond starters

- **Task3:** strong decomposition explains actual inputs, transformations, outputs and reusable interfaces. “Validate input” or “process CSV” is too vague. Algorithms must be precise and consistently notated; communicate to the specified audience. A/E commentary contrasts implementable detail with missing latest-rate logic; A still needs plainer explanation around Pandas syntax. A separate decomposition diagram is not required (SAM pp14–19; AdSAM pp19–24; live pp14–18; examiner pp22–32; A p16; E p13).
- **Task4a:** extend the supplied solution to the required analysis, preserving useful existing behaviour. Seek meaningful dates/groups/comparisons, robust input, modular code, informative comments and understandable outputs. A login earns no credit for the assessed secure-coding focus. Scope/data handling and error handling are relevant here, but local variables alone do not establish real-world security (schemes' Task4a sections; examiner pp33,40–41,53–54; A p21; E p16).
- **Task4b:** requirement → evidence → quality judgement → user effect → supported improvement. Description and screenshots alone are insufficient. Improve working features too. A proposes scalable data-derived choices and flexible date ranges; E mainly describes code and missing functionality. Choice of a different chart needs a reason appropriate to the data (all Task4b schemes; examiner pp55,65–66; A pp22–29; E pp17–20).

## Authoring consequences

Each question is an independent, bounded investigation of <=5 minutes including reading. Use a short original brief and concrete artefact. Test valid alternatives and characteristic wrong answers. Store assessment-source links with the family; keep learner screens free of source-management detail. Mark constrained evidence automatically and show prose review separately. Test-log practice must include passing observations and honest unresolved states. Starter success supports later unaided spreadsheet/IDE work; it does not demonstrate a complete ESP portfolio.

### Workbook reconciliation update (27 September)

Both exemplar cost models omit the separately listed developer costs from the project/forecast total: E Costs!D26 and A Costs!H15. The omitted rows total £79,491.50 and £97,261.50 respectively. A's forecast structure is useful, but its numbers are not a verified model answer. Include a starter that traces a displayed total back to **all** its component rows. See the [reading ledger](close-reading-ledger.md) for exact workbook observations and remaining visual limits.
