# Task 1 — planning starter designs

**Broad progression accepted with teacher refinements, 26 September 2026; detailed content still to be authored and checked.** Apply the [shared design/marking contract](activity-designs.md). Five recipes, three questions each, five coordinated variations per recipe. These are original bounded cases calibrated to ESP Task1 evidence, not reproductions of an official assessment. Short explanations are separately reviewed; automatic totals below exclude them.

## Agreed question size and independence

Each recipe is a **three-question set, up to five minutes per multipart question** (no more than 15 minutes total; shorter questions and sets are welcome). Reading, interaction and checking fit inside that budget. Each question includes its own brief, required data/code and assumptions and can be completed without solving an earlier question or opening an external resource. A shared scenario may connect the set, but later questions supply a fresh starting state; earlier mistakes must not block them. Within a question, parts may form a coherent sequence. These are authoring targets, not classroom-verified timings.

## Source-to-skill mapping

| Evidence | Teaching consequence | Recipes |
| --- | --- | --- |
| SAM Task1 pp3,6,10; scheme pp4–9; live scheme p10 | Chart, allocation, costs and rationale must agree; manage dependencies and the given assumptions | All |
| Examiner pp6,8–10,66; Grade A pp10–11 versus E pp7–8 | Parallel work needs dependencies and capacity; divide work/test phases meaningfully | T1.1, T1.3, T1.5 |
| Examiner pp11–12; A costs discussion p10; E manager-cost error p7 and Costs!B8 | Cost assigned effort and manager duration with correct units; distinguish initial/ongoing costs and forecast periods | T1.2, T1.5 |
| Examiner pp13–16; A/E standalone rationales | Explain notable decisions, evidence, benefits, risks and consequences; job title alone is weak justification | T1.3, T1.4, T1.5 |
| AdSAM Task1 p10 and live Task1 p10 | Staff absence is an explicit constraint, not an optional complication | T1.3 |

All page/file references are indexed in the [conversion register](conversion-register.md). The current brief assumptions differ: SAM 7-hour days/17 weeks/no absence; AdSAM 8-hour days/18 weeks/database engineer absent weeks3–4; live 7-hour days/12 weeks/network engineer unavailable weeks1–2. New starters state their own assumptions explicitly.

## T1.1 — Make a feasible schedule

**Outcome:** arrange a small project so dependencies and staff capacity are satisfied. **3 × up to 5 minutes; 10 automatic points.** Prerequisites: sequence/dependencies, reading a task table, effort versus elapsed time.

Stimulus: three or four tasks with given duration, named staff, prerequisites and a short deadline; stated working-day length and whether tasks can split. Display only relevant staff profiles. A tiny Gantt strip follows the editable schedule table.

| Question | Response and marking |
| --- | --- |
| 1. Complete/repair the schedule | Start-day fields or day-cell selections, **4** = correct task durations (2) + all stated predecessor constraints (2). For split tasks, count assigned work slots; for continuous tasks, enforce consecutive working days. |
| 2. Check resources and deadline | Identify/correct the overloaded or unavailable staff assignment, **3** = feasible staff availability/capacity (2) + meeting the specified deadline (1). Do not award this for silently dropping work. |
| 3. Explain one dependency | Select prerequisite and matching reason/consequence, **3** = correct dependency (1) + reason pair (1) + consequence (1). Distractors include an independent task and a true but irrelevant reason. |

**Worked case:** one person works at most seven hours/day. Database D needs Sam for two whole days; interface U needs Lee for two whole days and can use supplied mock data before D is ready; integration I needs Sam for one day after both D and U finish. Deadline: end of day4. A valid schedule is D/U days1–2, I day3: **35 person-hours over three elapsed working days**. D1–2/U2–3/I4 is also valid. I2 is invalid because its inputs are not complete. The task asks for feasibility, so do not reject a valid day4 completion merely because day3 is possible.

**Variations:** database prerequisite; hardware availability; unit/integration testing order; two tasks competing for one member of staff; independently developable components with a final merge. Use different dependency graphs across at least three variants. Verify every variant has a solution and that invalid alternatives expose the intended concept.

**Hint:** “Find the tasks that can start before any other task finishes.” **Feedback:** identify one violated edge or overloaded day, leaving the student to repair it. **Reveal:** a valid schedule plus a dependency explanation, noting alternatives. **Transfer:** recreate a five-task plan unaided in a spreadsheet using the provided template; completion in the starter alone does not assess spreadsheet proficiency.

## T1.2 — Cost the plan, then forecast

**Outcome:** calculate costs using correct units and distinguish one-off from recurring expenditure. **3 × up to 5 minutes; 10 automatic points.** Prerequisites: multiplication, percentages and simple spreadsheet references; state percentage rules rather than assume a financial convention.

| Question | Response and marking |
| --- | --- |
| 1. Complete a staff-cost extract | Numeric cells for two staff totals and manager cost; **4** split as staff costs (2) and working-day manager calculation (2). Hours, daily rates and working days are explicit. |
| 2. Complete a cost/forecast row | Select formula/method and enter annual totals; **4** split as recurring-cost method (1), first-year profit (1), next-year compounding method (1), next-year profit (1). Error-carried-forward may credit correct method using the student's own staffing total; exact totals remain separate. |
| 3. Check the conclusion | Select affordability statement and supporting cost evidence, **2**. A profitable forecast alone is not evidence of available cash; use only the stated funding/budget assumptions. |

**Worked case:** staff: 18 hours at £25 and 12 at £40; manager: five working days at £160/day; setup: £300 once; hosting: £25/month for the full year. Staff £450 + £480; manager £800; first-year incremental costs **£2,330**, of which £2,030 is one-off and £300 recurs. Base income £10,000 rises by 10% each year, compounded; base annual costs stay £6,000. All project one-off costs occur in year1. Income year1/2/3: £11,000/£12,100/£13,310; profit: **£2,670/£5,800/£7,010**. Three-year cumulative profit is £15,480. The set need only ask for two years; year3 is the reveal/extension. No VAT, discounting or financing assumptions are implied.

A formula-completion variation can provide `B3=hours`, `C3=rate`, with `D3=B3*C3`. Later variants use absolute references for a fixed rate or select which cells belong in an annual total. Do not build a general spreadsheet formula evaluator for this initial feature; provide bounded formula choices/fields.

**Variations:** working days versus calendar days; monthly versus annual cost; one-off server versus hosted service; rate reference when copying a formula; staff effort retained while calendar duration changes. Keep the requested comparison explicit; different options can be justified if their stated assumptions fit.

**Hint:** “Label each rate as per hour, per day, per month or per year before multiplying.” **Feedback:** distinguish missing ×12, manager paid for calendar days, and repeated one-off cost. **Reveal:** show units in every calculation. **Transfer:** extend the template cost sheet and trace a formula's inputs; check that it matches the actual chosen plan.

## T1.3 — Respond to a resource constraint

**Outcome:** revise a plan when a staff member is unavailable, and justify a realistic allocation. **3 × up to 5 minutes; 10 automatic points.** Prerequisites: T1.1 skills and reading skill/availability profiles.

| Question | Response and marking |
| --- | --- |
| 1. Find and repair the clash | Select affected work and adjust day allocations, **4** = locate constraint (1), complete required work (1), feasible availability/capacity (2). |
| 2. Choose staff with evidence | Allocate a suitable person/team from authored valid options and link skills/support needs, **4** = allocation (2), relevant evidence (1), risk/mitigation pair (1). Several defensible allocations may pass. |
| 3. Calculate the consequence | Revised finish day and manager-cost change, **2**. For non-optimal but feasible plans, calculate against that plan; impose a fixed deadline only when stated. |

**Worked case:** adapt T1.1 with D fixed on days1–2, U's two days explicitly allowed to split, Lee unavailable day2, and I allowed only after D/U. Use U days1/3 and I day4. Staff effort remains **35 hours**; elapsed work spans four days. At £200 per elapsed working day, manager cost rises from £600 to **£800**, a £200 change. Two people do not halve a task automatically. A different variant can make U indivisible: U3–4/I5 would miss day4, prompting a choice between an explicitly permitted substitute or revised deadline.

**Variations:** holiday, delayed specialist, training/support time for a junior, scarce equipment, paired work that consumes both people's capacity. Pairing productivity and any overhead must be authored, not inferred. Change which constraint binds, not just the absent person's name.

**Hint:** “Check availability against each assigned day, then follow the tasks that depend on the delayed work.” **Feedback:** explain whether the problem is missing effort, overload or unavailable expertise. **Reveal:** compare the feasible revision with its time/cost consequence. **Transfer:** annotate a changed project plan and explain the effect in its rationale.

## T1.4 — Turn a decision into a rationale

**Outcome:** explain why a notable decision fits this project, including a trade-off. **3 × up to 5 minutes; 6 automatic points plus a reviewed response.** Prerequisites: read a small plan and relevant staff/task evidence.

| Question | Response and marking |
| --- | --- |
| 1. Distinguish description from justification | Classify three short statements, **3**, using an authored answer for each. A statement can be factually correct yet merely descriptive. |
| 2. Build an evidence chain | Link decision → case fact → benefit/risk/consequence, **3**. Check coherence of the chain; do not credit matching isolated words. |
| 3. Write a short rationale | One or two sentences, about 40–70 words; **reviewed, no automatic points**. Assess context-specific reason, effect/trade-off and consistency with the plan. Word count is guidance, not the assessment. |

**Worked contrast:** “Lee will build the interface” describes an allocation. “Lee has already built the client's booking screens, so allocating the interface to Lee reduces familiarisation time; a scheduled Sam review checks its data contract before integration” supplies relevant evidence, a benefit and mitigation. The brief must actually state Lee's experience, the contract risk and available review time. Do not award a made-up fact because it sounds plausible.

A second case uses parallel database/interface development with mock data: a strong answer justifies the time saving but identifies the risk of a changing contract and the planned integration check. Valid alternative decisions receive credit if supported by the given facts and a feasible plan.

**Variations:** dependency ordering, junior support, early testing, contingency placement, infrastructure choice with stated comparable costs. Vary the decision and evidence, not synonym rotation.

**Hint:** “Which fact in this brief explains why you chose this option?” **Feedback:** structured responses distinguish irrelevant evidence from missing consequences; prose review asks the learner to point to their evidence and consequence before comparing with annotated examples. **Reveal:** acceptable examples plus an explanation of why a generic slogan is weak. **Transfer:** write one paragraph about a notable decision from the student's own plan.

## T1.5 — Reconcile plan, cost and rationale

**Outcome:** make a consistent small planning decision across three artefacts. **3 × up to 5 minutes; 8 automatic points plus a reviewed response.** Prerequisites: earlier planning/costing/rationale skills.

| Question | Response and marking |
| --- | --- |
| 1. Repair a compact plan | A four-to-six-task schedule/resource extract; **4** = completion of stated work (1), dependencies (1), capacity/availability (1), deadline (1). Accept any feasible result. |
| 2. Make costings agree | Enter revised assigned hours and manager duration/cost; **4** = staff effort method (1), staff amount (1), manager duration method (1), manager amount (1). Method credit may follow a feasible alternative plan. |
| 3. Explain a notable decision | Two-sentence rationale; review evidence, trade-off and agreement with the displayed schedule/costs. No invented overall ESP band. |

**Worked discrepancy:** the revised T1.3 plan finishes day4, but the cost sheet still pays the manager for three days and the rationale says “no extra cost”. Correct the manager line to **£800**, retain developer effort, and explain the **£200** timing consequence and how the absence was handled. A superficially faster plan that overloads a person is not acceptable evidence of savings.

**Variations:** absence revision; extra integration test; changed deployment dependency; junior supervision consuming senior hours; recurring service substituted for a one-off purchase. At least one variant should allow two valid alternatives so the marker demonstrates constraint-based acceptance.

**Hint:** “Trace one decision through all three artefacts: what changes in the chart, in the cost calculation and in the explanation?” **Feedback:** identify a mismatching pair without repairing the whole case. **Reveal:** consistent plan/cost/rationale with accepted alternatives. **Transfer:** a longer independent template exercise, followed by teacher review; the short integrated case is preparation for that work.

## Authoring and verification before implementation

Keep each schedule tiny enough for independent exhaustive feasibility checking. Record day-boundary rules, staff capacities, productivity assumptions, permitted splitting, fees and rounding. Verify all five variants per recipe, including a valid alternative, an impossible schedule, a boundary day, a relevant wrong cost and a coherent but unsupported rationale. Review wording and cognitive load with the teacher; source complexity does not establish five-minute question timing.

Do not teach that Agile always beats Waterfall, that all concurrent work is valid, that junior staff are unsuitable, or that local storage/cloud hosting determines security by itself. The task is justified contextual planning. Maintain a separate review status for prose and a clear path to unaided spreadsheet work.
