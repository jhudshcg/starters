# ESP task and assessment notes

Reference digest of the supplied specimen pack. Read the [source guide](source-guide.md) for exact filenames, versions and fingerprints, and [source issues](supplied-assets.md#source-issues-and-authoring-decisions) before using numerical examples. Page numbers below are **PDF page numbers**, including covers. `MS` means the **V0.2 PDF mark scheme**, not the older HTML conversion.

## Assessment shape and limits of starter practice

The specification's Employer Set Project section describes a portfolio responding to a vocational brief: planning documentation, design, working code, testing evidence and evaluation. The six Core skills span reflection, communication, collaboration, artefact creation, logical problem-solving and security. A short selected-response or code-completion exercise can practise a component of these skills; it cannot establish that a student can independently deliver the portfolio.

| Stage | Specimen time | Evidence | Mark-scheme allocation |
| --- | --- | --- | --- |
| Pre-release | Recommended maximum 4 hours | No submitted evidence | Unassessed |
| Task 1: Planning | 3 hours | Project-plan XLSX; rationale PDF | 18 |
| Task 2: Defect repair | 3 hours | Corrected Python; test-log PDF | 21 |
| Task 3: Design | 2 hours 30 minutes | Design-document PDFs | 18 across rubric rows; booklet activity page says 21 including communication |
| Task 4a: Development | 4 hours | Working Python, code PDF and TXT | 34 |
| Task 4b: Evaluation | 2 hours | Review PDF; read-only access to Task 4a work | 9 |

The rubric totals give 100; the Task 3 activity-page interpretation would give 103. Do not present 103 as the settled qualification total. These sources need clarification, not silent reconciliation. The supplied specification states 100 and 14 hours 30 minutes of assessed work.

The specimen assessed tasks prohibit internet/AI assistance; Task 2 also explicitly requires independent work. Offline relevant software is allowed where specified. These are notes about the supplied assessment documents. The starters are teaching and practice before assessment, not an assessment-session tool or a replacement for current administration guidance.

## Pre-release: sector understanding

Sources: pre-release pp. 1–3; specification, Employer Set Project pre-task.

Students investigate digital tools in the financial sector, independently and through discussions in groups of up to six. They may use the internet, share findings and make research notes during/outside supervised sessions. They cannot take the notes into subsequent supervised tasks. Nothing is submitted for marking.

Research themes are personal-data management/protection; savings and investments; currency-exchange costs; fees and interest; market/investment performance; and comparing data points to support judgements. Teach distinction between a source-supported finding and an unsupported assertion, and between a financial calculation using supplied assumptions and financial advice.

Starter implications: interpret a small client brief, connect a data-protection concern to a concrete control, identify missing research evidence, or choose a useful contribution to a technical/non-technical discussion. A solo browser score does not demonstrate collaboration. Do not give marks for memorising this particular company name or administrative filenames.

## Task 1: plan a project and justify decisions

Sources: Task 1 pp. 3–10; MS pp. 4–9; specification, Task 1.

### Scenario and deliverables

RBSX Group Ltd currently relies on advisers travelling to meet UK clients. The proposed solution supports staff/client communication, financial dashboards, information about products/services and an appropriate interface. Management wants business analysis tools; clients need savings/investment tools. Students produce a Gantt chart and resource/cost plan, explore affordability and three-year profit impact, then justify important planning decisions in a separate rationale.

The rationale needs relationships: why this dependency affects task order; why a person's skills justify an allocation; how a contingency changes cost and deadline risk. Naming a methodology or listing staff is insufficient.

### Source values for future exercise calibration

Task 1 p. 6:

| Item | Supplied amount |
| --- | ---: |
| Current annual income | £1,580,900 |
| Current annual costs | £985,340 |
| Development company base fee | £50,000 |
| Client staff training/development | £4,000 |
| Equipment upgrades | £15,000 |
| Software licensing | £4,000 |
| Cloud server option | £830/month, ongoing |
| Physical server option | £13,500 once |
| Network infrastructure upgrades | £13,200 |
| Project manager | £200/day |
| Additional network technician | £22,000/year |
| Ongoing maintenance | £9,250/year |

Forecast income changes are +8.75% after year one, a further +15.5% after year two and a further +13% after year three. For an original exercise, state explicitly whether successive increases compound, when costs are incurred and whether figures are annual or cumulative. Do not demand one unexplained three-year total.

Task 1 pp. 7–9:

| Person | Hourly rate | Evidence relevant to allocation |
| --- | ---: | --- |
| Sarah O’Toole | £105 | Senior; Python/C#, testing, front-end, financial-sector/cloud delivery and team leadership; limited back-end experience |
| Ahad Shafiq | £25 | New graduate; web/HTML/CSS/JavaScript/SQL and HCI; no employment experience |
| Terry Duran | £45 | Junior title but four years independent mobile-development experience; Kotlin/Java, Python/JavaScript and strong communication |
| Gina Diaz | £47.50 | Database/back-end engineer; PHP/Python/SQL, security, local/cloud databases and teamwork |
| Marius Bronski | £73 | Network design/installation/monitoring, troubleshooting, protocols/services and security |

Task 1 p. 10:

| Task | Work hours |
| --- | ---: |
| Infrastructure upgrade / physical server installation | 21 / 7 |
| Investments and savings / user interface | 115 / 70 |
| Information feed / back-end database | 126 / 147 |
| Data analytics / communications | 112 / 105 |
| Deployment / unit testing / integration testing | 7 / 21 / 14 **per module** |
| Major fault repair and regression / minor fault repair and regression | 14 / 7 **per fault** |
| Acceptance testing / test-plan creation / client staff training | 35 / 14 / 21 |

Assumptions: at least three minor faults per module; no more than three major faults overall; seven hours/day; five days/week; no staff absences; deadline seventeen weeks. Distinguish person-hours, elapsed time and calendar days. Two workers do not automatically halve a task's duration unless the question says the work can be divided that way.

### Assessment traits

| Focus | Maximum | What stronger evidence demonstrates |
| --- | ---: | --- |
| Gantt chart | 3 | Logical, efficient ordering with an appropriate methodology and accurate timings |
| Costings | 3 | Accurate costs consistent with the chosen plan |
| Resource allocation | 3 | Appropriate and consistent allocation of resources |
| Rationale | 9 | Thorough, contextual justification of order/timing, people, benefits/risks and cost/time consequences |

MS pp. 4–7 offer alternatives, not one canonical Gantt chart. Sensible parallel work is allowed; backend/investment dependencies matter; test planning precedes testing; integration needs components to integrate. Iterative delivery can justify earlier partial deployments. Support for the inexperienced developer is a risk/cost trade-off. Staff are costed for assigned effort; the manager is expected throughout the project. Server choices need a justified cost/reliability/scalability/security discussion, not “cloud is always better”. See source issues before copying indicative totals.

## Task 2: identify, fix and retest defects

Sources: Task 2 pp. 3–4; MS pp. 10–13; specification, Task 2; supplied Python and test-log notes in [assets](supplied-assets.md).

The investment quotation must accept customer name, a ten-character client ID, contribution amount and investment type. It reports customer details, maximum/minimum value after five years, profit and fees, with GBP amounts to two decimal places, and handles user errors.

The booklet says contribution **per month**, while the existing code prompts/calculates annual contributions and the plan limits/rates are annual. Any short exercise must explicitly choose monthly/annual units and define the conversion, deposit timing and fee basis it expects. This ambiguity is not a useful hidden trick.

| Plan | Annual contribution limit | Annual predicted returns | Annual fee |
| --- | ---: | --- | ---: |
| Savings | £20,000 maximum, inclusive | 1.2%–2.4% | 0.25% |
| Managed stocks | No stated maximum | 4%–23% | 1.3% |

MS's listed defects cover missing syntax, wrong client-ID length comparison, conversion result not retained, wrong inclusive boundary, a four-iteration loop for five years, 40% rather than 4%, currency formatting and a misspelt entry-point call. Its line numbers do not reliably match the delivered V0.2 file. Refer to functions/snippets, not memorised line numbers.

The test log has five columns: description; data; expected outcome; actual outcome; comments/intended actions. Evidence should show a meaningful test, expected result, actual observation, defect interpretation, justified repair and retest. Test apparently correct branches as well as IDE-highlighted failures. Use boundary values such as 19,999/20,000/20,001 and client-ID lengths 0/9/10/11 where units/requirements are explicit.

| Focus | Maximum | Stronger evidence |
| --- | ---: | --- |
| Testing to identify defects | 9 | Comprehensive, appropriate tests/data reflecting detailed understanding of requirements |
| Understanding the testing process | 3 | Clear evidence of how faults were found and corrected |
| Solution | 9 | Fully functional code with precise logic and consistently correct outcomes |

MS p. 12 explicitly says the count of errors found is not the hurdle separating upper bands for the first two foci. Quality of testing and understanding matter. In a starter, score the bounded evidence given, not an invented official band based on “three bugs found”.

## Task 3: communicate an implementable design

Sources: Task 3 pp. 3–4; MS pp. 14–19; specification, Task 3.

Design a currency-conversion data service from a provided CSV: accept an amount and conversion, use the most up-to-date supplied rate, be easy to use and present meaningful textual/numerical/graphical information. Use pseudocode or flowcharts. A third party should be able to implement the design and a client should understand enough to make informed decisions.

Useful decomposition separates input/menu validation, loading/selecting data, obtaining the required rate, converting an amount and presenting outputs. Repeated processes should become reusable components with parameters/returns, not copied algorithms for each currency. Decomposition can be shown through the algorithms; MS p. 14 does not require a separate decomposition diagram. Pseudocode has no mandated house syntax: reward coherent, precise structures and conventions rather than Python-only spelling.

MS p. 15 identifies currency headers, date interpretation and rate precision. The last row is latest in the supplied ascending dataset; this is a property to establish, not a general rule for every CSV. The sample designs include retry paths for invalid choices and unavailable data. Output should carry context/units, not just a bare number. See the asset notes for the image-only flowcharts and code examples.

| Focus | Maximum | Stronger evidence |
| --- | ---: | --- |
| Decomposition | 9 | Detailed coverage of inputs, processes, outputs and suitable smaller/reusable components |
| Logic and conventions | 6 | Correct, efficient sequence/structure and consistent accepted notation |
| Communication | 3 | Clear design using technical language appropriate to its audience |

These rows sum to 18 including communication. The booklet's p. 3 separately says 18 + 3 = 21. Do not write an automatically marked “How many marks?” question from this conflict.

## Task 4a: extend an existing solution

Sources: Task 4a pp. 3–4; MS pp. 20–25; specification, Task 4a and additional libraries.

A senior developer's supplied conversion program is the starting point, not the student's Task 3 implementation. Preserve/integrate conversion functionality and add analysis of GBP against other currencies and selected-currency performance over time. Meet security and usability requirements; produce readable, maintainable, functional code using accepted conventions. Formal testing documentation is **not** required here; testing is still necessary to achieve a working solution.

The specification explicitly expects pandas CSV/dataframe work, selection/manipulation and calculations such as totals/means/counts/trends; Matplotlib is used to choose suitable graphs and communicate with axes/labels/legends. This is additional ESP preparation, not a reason to relabel every library exercise as existing Core paper coverage.

MS pp. 20–22 discuss modular integration, meaningful text/tables/graphs, discriminating time windows (for example seven/fourteen days), appropriate naming, helpful messages, invalid menu choices/non-numeric/negative amounts and deliberate precision. Image-only examples use dataframe column selection, `.iloc[-7:]`/`.iloc[-14:]`, `.mean()` and plotting. Their correctness depends on dataset ordering/frequency; full calendar windows need date reasoning.

| Focus | Maximum | Stronger evidence |
| --- | ---: | --- |
| Functionality | 6 | Functional, efficient implementation of requirements |
| Logic/programming structures | 3 | See anomalous repeated top-band wording in source issue register |
| Robustness | 3 | Common and most unexpected input errors handled |
| Security | 6 | Effective mitigation of relevant vulnerabilities |
| Code organisation | 8 | Reusable, logically organised code, consistent names and informative comments |
| User experience | 8 | Effective input handling, guidance/errors and meaningful outputs |

Avoid conflating maintainability with security. Local variables and function boundaries can reduce unintended state changes, but do not themselves authenticate a user, enforce access control or prevent data disclosure. A secure-coding starter must identify an actual risk, a relevant control and its effect. Do not require irrelevant security boilerplate simply to name a control.

## Task 4b: evidence-based reflective evaluation

Sources: Task 4b pp. 2–4; MS pp. 26–28; specification, Task 4b.

Students receive read-only Task 4a evidence, cannot change the earlier work and produce a review of system requirements, user requirements and further development. Judgements must use specific examples and explain why choices/outcomes matter. A function-by-function description is weaker than a supported evaluation.

| Focus | Maximum | Stronger evidence |
| --- | ---: | --- |
| Review of outcomes | 6 | Thorough, supported judgements about system and user requirements |
| Future development | 3 | Convincing rationale for relevant improvements |

Useful reasoning chain: **requirement → observed evidence → judgement → consequence for the user → justified improvement**. Examples include proving whether the latest rate is selected; explaining why rounding the rate early changes accuracy; evaluating clear/error-prone input; judging whether the graph supports comparison; or explaining how date-based selection would cope with future datasets. Improvement suggestions should target an evidenced limitation or extend useful capability, not merely say “improve the interface”.

For self-marking practice, supply a short artefact and test evidence. Ask for a linked judgement/reason/improvement, not a free essay that a keyword matcher claims to grade holistically. Some full-project reflection must remain teacher/self-reviewed outside these starter scores.

## Marking principles to preserve

MS pp. 2–3 use positive, holistic best-fit marking; indicative content is neither exhaustive nor a compulsory model answer. Accept alternative valid approaches. The app's 1–3-mark parts are deliberately narrower practice checks and must be labelled as such. Do not convert a starter percentage into an ESP grade or official band, or claim that a selection exercise proves independent design, programming, collaboration or evaluation.
