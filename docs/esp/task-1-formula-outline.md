# Task 1 formula practice — outline for review

28 September 2026. **Design proposal; not yet implemented.** Two three-question sets, five coordinated variations each. Each question is independent and takes at most five minutes including reading. These extend the accepted [Task1 requirements](task-1-designs.md#required-addition--excel-formula-practice), rather than replacing existing numerical practice. Starter points are not official ESP marks.

## Evidence and intended learning

Use the saved [assessment distillation](assessment-distilled.md) and [workbook register](conversion-register.md#task-1-workbooks). Source cells inspected for this outline:

- Grade A and E: Costs!B3:B7 aggregate scheduled staff hours using SUMIF; D3:D8 multiply effort by rates. A B8 uses scheduled manager time; E B8 uses119 calendar days. Students must apply the brief's stated working-time assumptions.
- A Costs!H15 and E Costs!D26 omit the separately listed developer costs. Listing a cost does not include it in a total. A D19/E D21 are subtotals, so careless range extension can also double-count components.
- A Costs!I13:K13 compounds income; I14:K14 fixes the base outgoing reference; D17 annualises a monthly charge; I18:K18 carries forward cumulative profit. These illustrate structures, not verified answer keys.
- Scheme families assess accurate, consistent costing; examiner pp11–12 contrasts meaningful forecasts with undifferentiated cost lists. Formula work supports this assessment, without inventing a separate official Excel-function requirement.

Technical caution: Microsoft explains that SUMIF uses the dimensions of its criteria range from the starting cell of its sum range when sizes differ. The exemplar's longer sum-range endpoint is therefore not evidence of an Excel error. Teach explicit aligned ranges for clarity, and demonstrate actual omissions or offsets. [Microsoft SUMIF documentation](https://support.microsoft.com/en-us/excel/functions/sumif-function?nochrome=true&shownav=false), checked28September2026. Mixed references fix only a row or column; acceptance must follow the stated copy direction. [Microsoft reference guidance](https://support.microsoft.com/en-us/excel/switch-between-relative-absolute-and-mixed-references).

## Set A — Costs and copied formulas (T1.2)

Outcome: turn assigned effort into a complete, reusable cost model. **12 automatic points; approximately12 minutes.** Each question displays its own small spreadsheet extract with row numbers, column letters, units and destination cell.

| Question | Student activity | Seed case and checked answer | Time / points |
| --- | --- | --- | --- |
| A1: Repair a rate reference | Identify what goes wrong when a formula is filled down; repair a short formula; check a later row | B2=£30/hour; B5:B7=6,8,5 hours. C5 incorrectly contains `=B5*B2`, to be filled through C7. Accept `=B5*$B$2` or `=B5*B$2` for this down-only contract (and equivalent multiplication order). C7=£150. The hours row changes, the rate row stays fixed. | 4 min; diagnosis1, formula2, check1 |
| A2: Include every cost once | Select the omitted/double-counted row; repair SUM; independently check the total | D3 developer600, D4 manager540, D5 equipment400, D6 subtotal1540, D7 training100. D8 incorrectly uses `=SUM(D4:D5,D7)`. Correct `=SUM(D3:D5,D7)` or `=D6+D7`; total£1640. SUM(D3:D7) double-counts D6. | 3 min; diagnosis1, formula2, total1 |
| A3: Aggregate hours by staff | Complete SUMIF's three arguments with cell/range tokens; predict the filled formula; check the second staff total | A3:A6=Jo,Lee,Jo,Lee; B3:B6=6,4,5,3; F3=Jo,F4=Lee. G3=`=SUMIF($A$3:$A$6,F3,$B$3:$B$6)`, filled to G4, where the criterion becomes F4 and the result is7. Down-only mixed row locks are also valid. | 5 min; criteria/ranges2, copied formula1, check1 |

A1 feedback distinguishes the changing quantity from the fixed rate, without asserting all references require both dollar signs. A2 feedback names the cost row missing from the student's dependency set. A3 feedback distinguishes selecting staff names from adding hours. Hints point to the copying direction, subtotal boundary or the matching row; they do not give the corrected formula.

## Set B — Forecasts and reconciliation (T1.5)

Outcome: preserve the financial meaning of formulas across periods and trace totals to their components. **12 automatic points; approximately13 minutes.** Fresh data and context in each question; no answer from Set A is required.

| Question | Student activity | Seed case and checked answer | Time / points |
| --- | --- | --- | --- |
| B1: Separate one-off and recurring charges | Find a unit error; correct the project-year formula; choose the next-year formula | B2=existing annual costs£2000; B3=monthly subscription£50; B4=one-off setup£400. Project-year B7 wrongly uses `=B2+B3+B4`; repair to `=B2+12*B3+B4` (£3000). Next-year B8=`=B2+12*B3` (£2600). Each forecast year covers12 subscription months. | 4 min; diagnosis1, formula2, next-year formula1 |
| B2: Copy a growth formula across and down | Repair the year/rate references; predict a copied formula; verify second-year income | Base incomes B5=£10000 and B6=£20000; C2=10%,D2=20%. Fill C5 across to D5 and down through D6. Faulty C5=`=$B5*(1+C2)` has two stated copy faults. Correct `=B5*(1+C$2)`; D5=`=C5*(1+D$2)`; D5=£13200. The previous income changes by row/year; the rate stays on row2 and changes by year. | 4 min; repair2, copied formula1, check1 |
| B3: Reconcile annual and cumulative profit | Repair a total that omits a staff row; complete annual profit; repair a carry-forward formula | B2 income10000; B3 existing costs2000; B4 developers600; B5 manager540; B6 one-off equipment400; B7 annual subscription600. B8 wrongly sums B3,B5:B7; correct SUM(B3:B7)=4140. B9=B2-B8=5860. C9 contains a separately supplied next-year annual profit6400. C10 wrongly uses `=B9+2*C9`; repair `=B9+C9`, giving cumulative£12260. | 5 min; complete cost formula2, annual profit1, carry-forward formula1 |

B3 contains two explicitly stated faults in separate formulas; locate them using the complete displayed model. Within-question results can depend on earlier parts, but formula points assess structure independently of an earlier arithmetic mistake. Its numeric reveal traces every included component. Do not award duplicate points merely for copying an already supplied answer.

## Five variations, not five cosmetic rewrites

| Variation | Cost/copy emphasis | Forecast/reconciliation emphasis |
| --- | --- | --- |
| 1 | Hourly rate, omitted first cost, repeated staff rows | Missing annual conversion; previous-year growth; omitted developer row |
| 2 | Daily rate with stated working days, omitted last cost, shuffled assignments | Repeated one-off cost; wrong rate column; duplicated previous profit |
| 3 | Different rate location, included subtotal, zero hours for one staff member | Wrong arithmetic operator; rate row drifts on fill; omitted recurring cost |
| 4 | Two staff rates across columns, selected SUM range includes an unrelated value, staff criterion incorrectly locked | Misspelled function producing an Excel name error; original-year reference prevents compounding; wrong carry-forward cell |
| 5 | Quantity/rate operands reversed, valid equivalent total requiring recognition, shifted SUMIF start row | Correct formula that should be retained; zero growth; negative annual profit still carried forward correctly |

Keep each question's role stable. Where copy direction changes, redraw a small independent extract and state both destinations. At most two identified faults per question. Include a correct formula to prevent students assuming every presented formula is defective. No deliberately unequal SUMIF sizes as a supposed guaranteed Excel error.

## UI and marking boundaries

- Reuse existing tables, selected diagnoses and number fields. Add formula completion fields and short formula repair entry, with a visible supported-syntax guide. Display cell addresses alongside each input and keep the extract visible. No full spreadsheet editor in this slice.
- Formula answers must refer to the supplied cells; hard-coded answers are not equivalent for a reusable model. Evaluate the specified fill destinations as well as the initial cell. Accept case/whitespace differences, parentheses, commutative products, equivalent sums and reference-lock variants that genuinely satisfy the copying contract.
- Support only the authored subset: A1 references with `$`, numeric constants, parentheses, arithmetic, SUM and exact-match SUMIF over the displayed cells. Percentage rates are numeric fractions in percentage-formatted cells. No arbitrary JavaScript, external workbook references, macros or general formula execution.
- Use a constrained parser and dependency/normal-form checks where feasible; exercise changed cell values, first/last rows, duplicate staff, no matches and copy destinations. A finite set of matching outputs alone is not proof of arbitrary formula equivalence. Unsupported constructions must be labelled **Needs review**, with a supported answer route, rather than claimed mathematically wrong. Do not feed formulas to the existing Python-fragment marker.
- Separate diagnosis, formula and independent-check points. Feedback should identify the fault, show a counterexample if useful and allow retry. Reveal gives a correct formula, accepted alternative and brief numerical check. Explicitly document each variation's accepted structure and rejected characteristic mistakes.

## Integration and completion plan after outline review

Preserve all existing30 ESP question slots and five variations. Add six new permanent slots30–35, subject to a fresh availability check. Keep these two sets under the existing costing/reconciliation skill families: T1.2 and T1.5. The current selector couples recipe IDs to exactly three questions, so introduce distinct compatible recipe IDs such as T1.2F/T1.5F with explicit display names rather than appending six questions to an existing recipe or replacing published variations. No sixth broad Task1 learning objective is implied.

Implement the formula marker separately from existing numerical/code marking. Independently recalculate all30 question variations and expected copy destinations with installed spreadsheet tooling where available, plus changed-value reference checks. Test equivalent and faulty formulas, unsupported syntax, progress/reload, timer submission, sharing and keyboard/mobile use. Preserve review states in backups if unsupported formulas need review. Update identities, validate and build at functional boundaries. If reliable equivalent-formula marking exceeds this slice, discuss a constrained-token first release rather than silently using exact-string marking.

**Review requested:** the learning progression, six question roles and mix of token completion/short formula repair. Timing remains a teacher/student trial estimate. No runtime changes or library installation have been made for this proposal.
