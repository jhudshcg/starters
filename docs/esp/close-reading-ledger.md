# ESP close-reading ledger — 27 September 2026

Use [assessment conclusions](assessment-distilled.md) before reopening sources. Exact file links are in the [conversion register](conversion-register.md). This records reading, not certification that every source answer is correct.

| Resource group | Completed reading and comparison |
| --- | --- |
| Specification and three assessment packs | ESP requirements and assessment guidance; SAM RBSX, AdSAM RetailX and live Glenstar prerelease and Tasks 1–4b; staff, hours, absence, faults, forecast assumptions and deliverables compared. |
| Three mark schemes | All substantive text: SAM pp2–28, AdSAM pp2–37, live pp2–26; Task2 indicative tables and Task3/4a example diagrams/code inspected. Holistic bands distinguished from indicative examples. |
| Live examiner report | Substantive commentary pp2–66; code pp34–53; Task1 figures pp7,9–12; Task2 pp18,20–21; Task3 figures pp24–30; Task4b pp56–64. Page20 inspected at readable size on 27 September. The second p30 figure and p31 were also inspected on 27 September: generic selection/output blocks lack the precise analysis needed for implementable algorithms. |
| A/E exemplification reports | Complete substantive commentary, rationale and evaluation text, compared with actual Task2 logs/code, Task3 diagrams and Task4a code. Nine Task2 log table images inspected in full. Strong examples retain errors; grade commentary is not a technical oracle. |
| Standalone A/E artefacts | Task1 rationale and complete populated workbook Markdown (all task rows and cost cells), full Task2 logs and Python, Task3 diagrams, full Task4a Python, Task4b review text. All twelve standalone A/E Task4b review screenshots inspected on 27 September (nine A, three E), including graphs and source code. Do not equate this selected substantive-image audit with individually reading all 270 conversion assets. |
| Five spreadsheets | Structure, formulas, cached values, Gantt fills and exports preserved. A/E populated plans and every exported cost formula compared on 27 September. Not recalculated in Excel; exact rendered workbook fidelity and all formula results are not independently certified. |
| Six CSV datasets | Local schema, counts, date order and date ranges recorded in dataset-inventory.json. RetailX includes an anomalous November 2026 date among November 2025 records; preserve the source and teach explicit date filtering. |

## New workbook findings: use as error-detection evidence

E: Gantt row10 allocates eight hours in one cell despite a seven-hour day; row27 contains no test-plan time. Deployment row14 precedes completion of testing. Costs!D26 adds D8+D21, omitting the five developer costs D3:D7 (£79,491.50). Its manager calculation uses 119 calendar days. These are separate faults; merely correcting manager days does not reconcile its project total.

A: the plan decomposes development, test and repair, records paired staff separately and provides a multi-year forecast with cumulative profit. However Costs!H15=(D8+D19)-D17 also omits developer costs D3:D7 (£97,261.50). A correct forecast structure therefore does not certify its inputs. Gantt development totals also deserve comparison with the brief: investments 119 versus 115 hours, analytics 105 versus 112. Interpret these against rationale; do not silently copy the exemplar totals. Its manager uses 588/7=84 scheduled days, not the template's 119 calendar days. These observations do not retrospectively assign a new official grade.

## Technical caveats beyond Tasks 1/2

A Task4a code returns a string date-range choice but compares one branch with integer 2; its start comparison uses iloc[1]. Retain these caveats separately from positive examiner judgement. Live examiner p40 calls a prize-money function unchanged/incorrect although p39 displays a basic sum: distinguish limited analysis from claiming that summing prize money is inherently incorrect. Do not use either source as an unverified answer key.

## Resume without repeating reading

The explicitly named visual gaps above are now closed. Maintain a family-to-evidence map during authoring; independently execute original reference cases and check wrong alternatives. Student timing, teacher approval of each variation and complete-portfolio performance remain separate from technical checks.
