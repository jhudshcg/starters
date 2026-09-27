# Task 1/2 activity evidence and implementation

27 September 2026. Authorised scope: five recipes per task, three independent multipart questions per recipe, five variations per question (30 templates / 150 variations). Source paths are in the [register](conversion-register.md); [distillation](assessment-distilled.md) preserves the teaching conclusions and source conflicts. This is original practice, not copied assessment material or a grade predictor.

## Family-to-evidence map

Page numbers include covers. SAM and AdSAM refer to the supplied ESP packs; “report” is the live 2026 examiner report. All three schemes' relevant bands were compared, not just top-band descriptors. Task1 common bands: SAM pp4–9, AdSAM pp4–11, live pp5–10. Task2: SAM pp10–13, AdSAM pp12–18, live pp11–13.

| Recipe / stable slots | Learning objective and distinct activity | Evidence shaping the question/feedback |
| --- | --- | --- |
| T1.1 / 0–2 | Order dependencies; distinguish elapsed time, effort and capacity; allow test/fix/integration/deployment | Task1 bands; report pp7–10 weak premature deployment versus stronger plan; A workbook phased development and paired rows. No universal single Gantt oracle. |
| T1.2 / 3–5 | Staff and manager cost units; one-off/recurring costs; annual and cumulative profit | Report pp11–12; A forecast structure versus E calendar-day manager calculation and missing forecast. Both workbook totals omit developer costs: authored totals independently checked. |
| T1.3 / 6–8 | Respond to absence; allocate by demonstrated skill; acknowledge infeasible deadline and trade-offs | Live scheme pp7–9 permits reasoned overrun; staff profiles and absence assumptions across briefs; A/E rationale commentary. Original short briefs make constraints explicit. |
| T1.4 / 9–11 | Construct decision → evidence → effect → trade-off reasoning | Rationale nine-mark progression; report pp13–16; A pp7–11, E pp5–8. Prose is reviewed against criteria, never keyword-scored as a holistic rationale. |
| T1.5 / 12–14 | Reconcile cost rows, schedule capacity and written claims | Both actual workbook formulas; E missing test-plan time and overcapacity; report pp7–12. Students detect specific contradictions and write bounded corrections. |
| T2.1 / 15–17 | Select discriminating data, boundary neighbours and invalid-then-valid sequences | Test-range bands; E six/ten-character tests miss overlong IDs; A nine/ten/eleven sequence; live report pp18–21. A test purpose and concrete reproducible data are distinct. |
| T2.2 / 18–20 | Compute an independent oracle; separate actual from expected; predict rejection and recovery | A's early four-year-looking expectations and rounding discrepancy; report p21 precalculated outputs. Explicit rounding/type contracts; no copied observed value as oracle. |
| T2.3 / 21–23 | Repair validation and other faults; distinguish confirmation and regression | All indicative code tables and solution/process descriptors; A exact-length/inclusive-limit repair, E repeated integer casts; report pp20–21 missing follow-up evidence. Includes characters, conversion, arithmetic loop, syntax and flag initialisation. |
| T2.4 / 24–26 | Complete and explain every test-log column; record a pending repair honestly | Exact AdSAM DOCX template headings; all nine A/E log table images; report p20 real rows, including startup N/A and NameError versus SyntaxError. Original cases separate intended actions from observed results. |
| T2.5 / 27–29 | Investigate three fresh independent cases; preserve passing-test evidence and its limits | Testing/process bands explicitly do not use bug count as the Band2/3 hurdle; test apparently correct code. A/E comparisons show why a repair requires further testing. No answer depends on a preceding question. |

These differ from existing CA2/Python items by organising evidence around the ESP deliverables: a feasible and reconciled project plan or a requirement-led test/repair trail. They provide supporting practice rather than claiming exhaustive Core subelement coverage. Small one-mark numeric/choice/token checks assess one point each; 2-sentence prose is separate. Official 18/21-mark task totals are not miniaturised into artificial starter grades.

## Column and validation coverage

| Exact supplied heading | Direct practice |
| --- | --- |
| Description of test | Slots15 and24 selected purpose; slot24 independently written purpose; slot28 written recovery-test purpose |
| Test data to be used (if required) | Slots15–17,23–24,29 concrete values/sequences; slot29 produces next data and expectation |
| Expected outcome | Slots15–20,23–24,26,29; numerical oracle, rejection, re-prompt, return type and successful continuation |
| Actual outcome | Slots19,25,28 supplied observation versus intended behaviour; slots25/28 independently written observation |
| Comments and intended actions | Slots26–29; diagnosis, proposed change, pending confirmation and passing-test limits; independent short prose |

Validation is central in all five variants of T2.1, T2.4 and T2.5; T2.3 has validation in its first/third questions in all variants plus additional distinct faults in the second. Coverage includes exact length and leading zeros; inclusive numeric boundaries; and/or; string/integer menu mismatch; empty/all-space data; ASCII lowercase restriction; decimal conversion; return type; flag initial state; retry variable update; invalid-then-valid termination. Arithmetic loop and missing-colon cases retain other defect categories. This distribution is an authoring choice, not an official weighting.

Repeated five-case validation contracts in slots15/19/21/24–26 deliberately practise a different operation each time: select → predict/observe → repair → document. Other slots change actual values and boundary locations, not just scenario nouns. Requirements always state relevant character/type/rounding assumptions.

## UI and marking decisions

The initial implementation uses schedule/cost tables, number entry, bounded code-expression entry, radio choices and short prose boxes. Accessible native controls support keyboard and narrow screens. Schedule practice checks derived dates/capacity and justified alternatives; a free-placement Gantt editor is **not included** in this first release. The earlier drag/drop and interactive run-preview proposals are superseded for this scope by bounded representations, keeping each question within its five-minute design ceiling. Whole spreadsheet/IDE work remains the necessary later transfer activity.

Task and named activity selectors open complete recipes. New set in the same focus changes recipe; new permutation retains recipe and changes all three variations together. Each individual question remains self-contained and shareable (`ESP-version-slot-variation`); existing eight-character set codes and other banks retain their meanings. ESP is a separate lazily downloaded bank.

Automatic results use established marking, hints, submission, timers and first-response tracking. Written responses have no automatic marks and do not affect revision percentages. After submission, students can compare explicit criteria and an example and record Needs review / Self-reviewed / Teacher-reviewed. This status is a local declaration, not authenticated teacher approval or a grade. Text/status survive refresh, appear in history and are included in CSV/JSON export. Prose is limited to 1,200 characters; task wording requests at most two sentences where appropriate.

## Verification and limits

`tests/esp.test.js` checks code compatibility and recipe integrity, model/wrong/packed answers, prose separation, independent Python execution (including boundaries, characters, flag and retry cases) and independent schedule/accounting sums. Shared suite passed120 tests; latest character/flag content refinement passed the focused tests. Shared browser smoke passed. Focused ESP browser checks passed all50 sets/150 variations, persisted/reviewed prose, JSON restore, timer expiry and320px reflow. Desktop/mobile screenshots were inspected; see checkpoint for commands.

Editorial review covers all generated variants, units, explicit starting states, plausible alternatives, hint relevance and independent context. A semantically valid second distractor in an early and/or case was removed before release. Teacher subject approval remains pending for every variation; student timing and hint usefulness require classroom trials. Technical success does not certify a five-minute completion time for every learner.


## Identified next coverage addition

Teacher-confirmed requirement, 27 September: current Task1 questions test calculations and cost reconciliation, **not Excel formula authoring**. The [Task1 Excel formula requirements](task-1-designs.md#required-addition--excel-formula-practice) now require writing/completion and “fix the errors” practice for SUM/SUMIF, hours×rate, copied references, growth/cumulative formulas and omitted ranges. Implementation remains a separately planned increment; this requirement is not covered by the150 current variations. Workbook evidence is already distilled; do not repeat source conversion.
