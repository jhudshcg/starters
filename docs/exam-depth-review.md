# CA1–CA2 expansion review — 21 September 2026

Added slots **126–148**: 23 original questions, 145 parts in each of two variations. Existing slots/variations are unchanged. Each new question has 6–7 one-mark parts; every possible three-question combination remains within 15–21 marks. Reading cautions appear only in hints. Editorial/technical review is not teacher approval or classroom timing evidence.

## Source and demand

Content is grounded in [Core specification 1.1](../../agents/spec.md), CA1–CA2 and Appendix 2. The table records comparison with the existing bank and the additional angle. Precise assessable-element links remain on individual parts rather than being duplicated here.

SAM references below mean [Paper 1](../../agents/SAM/paper1.md) and [its mark scheme](../../agents/SAM/mark_scheme_paper1.md). Q1–3 calibrate one-mark technical terms; Q5–7 and Q9 calibrate a point plus linked explanation; Q12(b–d), Q13(b), Q14(a–b) calibrate bounded completion, tracing, correction and test-plan responses. Q8, Q11, Q15(a) and Q16 ground algorithm reasoning. Larger SAM tasks are deliberately split into short, separately marked steps here; selected reasons provide supported practice, not equivalent demand to an unaided extended answer. No full design/program-development credit is inferred from fragments.

| New slots; spec scope | Existing comparison | Additional angle; SAM calibration |
| --- | --- | --- |
| 126; 1.1.14–15 | 1, 2, 102: identify calculation quantities and relevant information | Model a changing capacity constraint and derive a Boolean outcome; Q7 |
| 127; 1.1.5, 1.1.11–14, 1.1.17 | 0, 2, 4, 100: name components and recognise reusable checks | Compare rules before reuse; test when an apparent similarity or abstraction is unsafe; Q7 |
| 128; 1.2.2–5 | 5, 8, 104: name notation and state benefits | Repair a symbol choice, follow a branch and extend hierarchical numbering; Q2, Q13(a) |
| 129; 1.2.6–10 | 6, 7, 105: name structures and trace short arithmetic | Trace a complete loop, distinguish sum/count and locate a destructive reset; Q12(c–d) |
| 130; 1.3.1–2, 1.3.6 | 9, 106: recognise approaches and select general tradeoffs | Choose from starting constraints, justify the choice, check interfaces; Q5 |
| 131; 1.3.3–5 | 10, 11: name investigation stages/actions | Continue a causal chain and choose evidence for diagnosis and closure; Q3, Q5 |
| 132; 2.1.1 | 12–14: literal types and storage choices | Determine result types after operations; distinguish type from value; Q1, Q12(c) |
| 133; 2.2.1–5, 2.2.7–9 | 15–17, 123: define scope and simple updates | Trace shadowed names and a returned result; distinguish constant convention from enforcement; Q9, Q12(c) |
| 134; 2.3.1–2, 2.3.4 | 18–20, 124: identify/access structures and fixed-index repairs | Trace replacement versus append; repair an index for any non-empty list and a string-key error; Q13(b) |
| 135; 2.4.1–5, 2.4.7 | 21–24, 107: name/evaluate individual operators | Reconstruct grouped quantities and diagnose inclusive/exclusive Boolean boundaries; Q1, Q12(b–c) |
| 136; 2.5.2–3, 2.5.5 | 26–27, 108: name file modes and basic I/O repairs | Predict truncation, adjacent writes and advancing reads; repair display conversion; Q13(b) |
| 137; 2.6.2–6, 2.6.8 | 28–30, 109: name/complete structures | Trace repeated subtraction across zero; examine an empty range and overlapping branches; Q12(c–d), Q14(b) |
| 138; 2.7.1–2, 2.7.5, 2.7.7 | 31–33, 110–111: terminology, calls, return repair | Follow caller state, contrast displayed/returned values and repair missing arguments; Q9, Q13(b) |
| 139; 2.8.1–2, 2.8.4 | 34–36, 125: identify checks and validity | Evaluate what passing a check establishes; examine check-digit limitations and whitespace; Q12(b–c) |
| 140; 2.9.1–2, 2.9.3–7 | 37–39, 112: choose designs and beneficial optimisations | Diagnose ineffective keyed access, retained input and an unsafe moved calculation; Q11, Q16 |
| 141; 2.10.1–5 | 40–42, 113: exceptions and local fixes | Recover from committed progress; repair an overwritten accumulator and choose follow-up tests; Q13(b) |
| 142; 2.11.1–5, 2.11.6 | 43–45, 114–115: single steps and equal-position search averages | Infer a target from observed work, weight empirical averages and include preparation cost; Q8, Q11, Q15(a), Q16 |
| 143; 2.12.4.1–3 | 48–49, 116, 122: data labels and individual boundaries | Complete one coherent test record where expected and actual outcomes disagree; Q14(a) |
| 144; 2.12.1.1, 2.12.2.1 | 46, 116–117, 121: method names and general tradeoffs | Diagnose what prototype/unit/interface evidence does and does not establish; Q6 |
| 145; 2.12.1.1, 2.12.2.1 | 46–47, 118–119, 122 | Separate whole-system success, business acceptance and observed usability; Q6 |
| 146; 2.12.2.1 | 47–48, 118–120 | Interpret measured workload evidence and maintain expectations after deliberate changes; Q6, Q14(a) |
| 147; 2.12.2.1, 2.12.4.2 | 47–48, 117, 120–122 | Derive tests from specification versus code paths; identify a missed interior fault; Q12(c), Q14(a) |
| 148; 2.12.1.1, 2.12.3.1, 2.12.4.3 | 50, 121–122 | Isolate source/device faults; distinguish replay completion from verified outcomes; Q6(b), Q14(a) |

## Evidence and remaining work

Both variations were reviewed together for answers, alternatives, hint leakage, marking dependencies, relevant distractors and mapping scope. Python execution independently checks complete snippets and selected collection, file, operator, algorithm and boundary results. Marker tests cover sentence wrappers, near terms, contradictions, case-sensitive values, general index repairs, all valid interior integers and linked reasons. Browser checks open both variations of every addition, check prompts/code/hints, mark model answers and reveal at 320 px.

The [generated report](coverage-ca1-ca2.md) remains authoritative: **285/369** elements now have two distinct direct questions (23 before the first expansion, 224 before the eight-question follow-up, 263 before the latest four); **56** still have one, **28** have supporting practice only. This expansion addresses every broad CA1–CA2 topic but does **not** finish the two-question target. Remaining work includes decomposition representations, some strategy/notation details, reusable-code sources, sorting tradeoffs and testing definitions, plus full practical tasks. All questions await teacher subject approval; mixed-ability timing and hint-use trials remain outstanding.


## Bounded follow-up — slots 149–156

Eight questions, two variations each, add 47 paired parts. The existing marker checks short code fragments by tokens, accepting spacing and equivalent quote delimiters while preserving identifiers, operators and string contents. Code-writing prompts constrain names and form; assembled reference answers are executed independently in Python. No student code is executed. Scaffolded development remains supporting practice.

| Slots | Existing comparison and additional assessment; Paper 1 calibration |
| --- | --- |
| 149–150; CA2.7 | 31–33, 110–111, 138: assemble headers, Boolean return expressions and procedure bodies; repair missing arguments and assignment of an in-place method’s None result. Selection within functions is also exercised. Q9, Q12(b–c), Q13(b). |
| 151–152; CA1.1 | 0–4, 100–103, 126–127: assign rules to responsibilities, detect duplicate ownership, interpret complementary decomposition representations and supply a subtask call. Q7; short application steps, not a complete independent design. |
| 153–155; CA2.11 | 43–45, 114–115, 142: choose searches under preparation constraints, identify binary-search best case, examine early stopping, insertion shifts, merging and multiple resource limits. Q8, Q11, Q15(a), Q16, reduced to bounded one-mark points. |
| 156; CA2.9 | 37–39, 112, 140: select suitable storage, transform a specified identifier, interpret layout changes and address inconsistent copied rules. Q11, Q13(b), Q16. |

All 88 tests pass, including boundary execution, list effects, assembled function/procedure output and rejection of incorrect code. Generated reports, compatibility and the production build are updated; all original questions remain unchanged. Both variations of every new pair also passed browser scoring, hint/reveal and mobile-layout checks. Full skill coverage, teacher approval and classroom timing remain outstanding.


## Focused follow-up — 22 September 2026

Slots 157–160 add four questions, two variations each (24 paired parts). Precise mappings remain on their parts. Comparison/source evidence:

| Slot | Gap and distinct angle; Paper 1 calibration |
| --- | --- |
| 157; CA2.5 | 25–27, 108, 136: compose numeric keyboard input and output calls; repair text-file type mismatches. Q13(b), Appendix 2 I/O/conversions. |
| 158; CA2.6 | 28–30, 109, 137: trace the first matching branch, repair overlapping thresholds and follow an intermediate accumulator. Q12(c–d), Q14(b). |
| 159; CA2.7 | 31–32, 110: distinguish a user-written wrapper from its built-in callee, distinguish dependency origins, assess reuse against required behaviour and a zero-parameter boundary. CA2.7.1, .3–4; short identification/reason demand calibrated to Q1–3/Q9. |
| 160; CA1.3 | 10–11, 106, 131: choose a reproducible problem statement, plan verification, distinguish an FMEA consequence from a corrective action and follow an event-tree branch. Q3/Q5. |

Used the adopted smaller check set: two focused tests (all new models/alternatives, plausible wrong answers, independent I/O and repaired-branch execution), coverage/identity/content validation and build. All eight new variations passed a targeted mobile browser check for scoring, hints and reveal. No full regression suite or whole-bank browser smoke was run. Teacher approval remains pending.
