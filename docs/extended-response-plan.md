# Scaffolded discuss/evaluate practice — design and implementation plan

Status: **proposed implementation plan, 7 October 2026**, following a student request reported by the teacher. The user requested planning; no renderer, marker or new questions have been implemented. This extends Core exam practice without replacing its short-answer coverage requirements. No LLM, remote marking service or unrestricted essay evaluator is proposed.

## Adopted automatic-marking requirement — 7 October 2026

Useful automatic marking must be possible for **every exam-practice question**. Teacher evaluation of individual student work may supplement it, but must never be required to obtain a useful result or complete the supported practice flow. This applies to the whole assessed reasoning task, including linked explanation, scenario application and supported judgement where requested—not merely identifying an option while leaving the substantive answer unmarked.

The bounded format is the means of meeting this requirement without an LLM. Each published question needs an authored, tested automatically markable response space and an automatic way forward when free wording is not recognised. A review-only question is not an acceptable first release. Teacher review of content/rules during authoring is quality assurance; it is distinct from requiring a teacher to mark each student's attempt.

## Original idea and exam-technique notice

The teacher's original request is retained in [feature_ideas.md](../feature_ideas.md). This plan develops it without replacing that record. Two explicit requirements from that scratchpad apply: scaffolding must help without becoming clunky or off-putting, and students must understand how this differs from the real exam.

Show a clear notice before the first scaffolded answer and keep a short reminder visible:

> This activity helps you build an answer step by step. In the exam, you must organise the answer yourself, write in complete sentences, and link your points clearly to the question's context.

Include that notice in pilot acceptance checks. Keep it concise and accessible rather than repeatedly interrupting students with a modal. Use the existing editable cards, progressive disclosure and combined-answer preview to connect the scaffold to independent exam writing; student trials must check that the interface supports thinking rather than becoming extra work.

## Assessment of the idea

The idea is viable and valuable as structured reasoning practice. Breaking an answer into a point, its linked explanation, its effect in the scenario and (for evaluate) a supported judgement makes the reasoning visible to students and gives a deterministic marker bounded relationships to check. It also allows feedback to identify where a chain breaks.

The main constraint is recognition coverage: one-line free text still permits many valid expressions and arguments. A keyword hit does not prove a causal link, relevance or a defensible judgement. The first release should recognise a carefully authored set of argument chains, credit the evidence it can establish and give an automatic clarification/retry path for other wording. It must not claim to mark any possible extended response or reproduce an examiner's holistic mark band.

The substantial work is authoring, adversarial answer testing and classroom calibration, rather than add/remove controls. Build a small pilot before expanding across the specification.

## Source calibration

Use the [cached source review](../references/core-extended-response/README.md), selected actual-paper extracts and original source paths there. It covers both Paper 1 and Paper 2 SAMs and actual summer 2026 questions with their matching schemes. No new network research is required for this initial plan.

- The specification's command-word glossary distinguishes **discuss** (contextual consideration of opposing aspects; no conclusion required) from **evaluate** (an evidence-supported judgement).
- Paper 1 SAM Q16 evaluates two particular linear-search programs against several requirements. It is not a generic linear-versus-binary question. The student's algorithm-choice example is a useful original adaptation, but must state its own data/workload assumptions.
- Paper 2 SAM Q14(d), cloud services for a health club, illustrates benefits and drawbacks linked to sensitive records, staffing and budget, followed by weighing their importance.
- Actual 2026 Paper 1 Q11 and Paper 2 Q10 are bounded six-mark discussion models. Paper 1 Q16 and Paper 2 Q14(d) illustrate larger evaluative tasks with decisive scenario constraints.
- Exam level grids are best-fit judgements, not one point per box. Item weighting can differ: the 2026 Paper 1 Q16 grid gives contextual application twice the weight of either other trait. Preserve that source distinction in teacher guidance; do not invent a universal exam-mark formula.

Closely adapt the reasoning demand, scenario constraints and command word; write clear original prompts and explanations. Record exact source question/part, source marks, specification references and adaptation notes. Independently check technical conclusions against the stated scenario rather than copying indicative content mechanically. CA3–CA8 examples need new precise curriculum mappings; this does not imply that the current bank already covers those areas.

## Student interaction

Keep the whole question and its key facts available while answering. Begin with one expanded answer card and visible **Add advantage** / **Add disadvantage** controls; do not display a large matrix of empty inputs. For discussion of impacts, use **Positive impact** / **Negative impact** where those labels fit better. Some questions compare two options; others evaluate one proposal, so option entry must be configurable rather than always required.

A card contains:

| Field | Student task | Interaction |
| --- | --- | --- |
| Option / approach | Name the algorithm or proposal being discussed, where applicable | Short free-text entry; recognise authored aliases after entry. Reuse an option already entered without repeated typing. Do not reveal a list of assessed algorithm names before the student identifies one. |
| Point | State one advantage, disadvantage or impact | One short clause; label the polarity clearly. |
| Explanation | Explain why it follows or what it leads to | A second short clause linked to that point. Use “because” or “meaning” according to the direction of the explanation. |
| Why it matters here | Connect that chain to a fact or requirement in this scenario | A separate short field initially. Ask for the effect on the business/user/task, not a pasted organisation name. |

Use one logical short response per field, but let the control wrap/grow so text stays visible on phones and at high zoom. Do not enforce a single visual line at the cost of readability. For a one-proposal question, omit the redundant option field. Defer more deeply nested sub-blocks: a list of simple linked cards provides the intended structure with less UI overhead.

Each card can be added, edited and removed. Preserve stable row IDs through edits and reloads. Offer Undo for removal of a populated card. Move focus to a newly added card; after removal put it at a sensible adjacent control and announce the change. No dragging is required. A later reorder control can be keyboard-operable if ordering proves useful; it is not a pilot dependency.

Avoid a rigid equal quota of positives and negatives: balance means considering relevant competing factors, not counting matching columns. Start with a modest recommended answer size appropriate to the source task; adding rows must not manufacture more available marks. Author a disclosed maximum row count per pilot question to bound work and storage, then calibrate it with students.

Preserve the existing submission/review/retry lifecycle. Hints and structural guidance can be available while drafting; correctness feedback and model answers follow submission. Do not mark every keystroke or force a student to accept the marker's preferred phrasing before continuing.

### Context field and scaffolding progression

Use the separate context field for the first pilot: it makes an often-missing reasoning step explicit and helps recognition. Valid context supplied in the explanation field should still count; never reject a sound chain just because its last clause is in the adjacent box. Treat the linked fields together for assessment, with one credit per criterion.

Do not routinely supply completed context phrases as clickable answers. Optional help can direct attention to an existing scenario fact or offer a prompt; record that assistance. Later, offer reduced scaffolding and an editable continuous-response view only if the question retains a useful automatic assessment path. A prose-only response that can only be teacher-marked must not replace that path; optional teacher discussion can supplement the automatically assessed work. Record scaffold level so guided success is not misrepresented as independent essay performance.

### Evaluate conclusions

After the evidence cards, offer a **Judgement** card:

1. Select one or two of the student's own points as the decisive evidence (display their text, retain row IDs).
2. Optionally select a competing point that is outweighed, or a condition under which the recommendation changes.
3. Explain why the chosen factor matters more **in this scenario**.
4. State the recommendation: option A/B, the proposed approach suitable/unsuitable, or a justified conditional judgement where the question permits it.

Allow a supported synthesis without requiring a counterpoint checkbox in every case. Deleting or materially editing a referenced point must flag the conclusion link for review, not silently attach it to another row. Repetition of a point is not additional analysis credit; its justified prioritisation is new evaluative evidence.

Do not automatically award a conclusion for selecting a recognised option or majority of favourable cards. Either option can be justified only where the scenario permits it and the reasoning supports it. Some scenarios have hard constraints that rule an option out. A fixed universal “either answer is fine” policy would teach poor evaluation. Discuss tasks do not require this judgement card unless the actual prompt asks for one.

Offer **Read my answer** to combine the student's own clauses into a coherent preview, without adding missing reasoning or silently improving content. Allow copying the response for discussion with the teacher. The preview is useful for connecting scaffolded practice with exam writing; no preview prose should be treated as a model answer.

## Worked original adaptation: searching customer records

Specify assumptions before asking for evaluation. For example: an in-memory list is kept sorted by unique customer ID; staff perform many exact-ID lookups each day; new accounts are added in a nightly batch; the list is growing. Evaluate linear and binary search for this workload. State that the exercise concerns the two taught algorithms, not choosing a production database architecture. Other variations can change the balance by making searches rare, updates frequent or data unsorted, with independently authored rules.

| Option | Point | Linked explanation | Why it matters here |
| --- | --- | --- | --- |
| Binary search | It needs fewer comparisons as the list grows | Each comparison removes about half the remaining search range | Staff repeatedly search an expanding customer list, so reducing lookup work matters |
| Binary search | It needs the list in key order | The nightly update must preserve or restore customer-ID order | Adding new accounts introduces maintenance work even though lookups are frequent |
| Linear search | It works without sorted input | It can inspect each record in turn | This would avoid sorting work in a variation where new accounts arrive throughout the day |

The third row illustrates a **different variation**, not full context credit in the already-sorted scenario. Keep the student facing example/model aligned with the actual variation; this design comparison is for authors.

A suitable conclusion in the first scenario weighs frequent lookup work against nightly maintenance, then recommends binary search while acknowledging its ordering requirement. A different recommendation requires a defensible scenario-specific argument, not just a recognised algorithm name.

The proposed “simple to code → shorter development time / fewer mistakes → accurate customer processing” chain needs refinement. Shorter development time is plausible where the scenario supplies a limited development budget or deadline. Simpler code may reduce implementation risk, but it does not guarantee accurate results, and the generic importance of accurate customer data does not alone connect that advantage to this scenario. Feedback should identify that missing link rather than accept all those keywords.

## Bounded automatic marking

Author question-specific concept and relationship records, not a universal keyword bag:

- Option aliases; point/concept IDs; accepted paraphrases and bounded sentence patterns.
- Linked explanation IDs and valid option–point–explanation combinations, with explicit causal direction and polarity.
- Scenario fact IDs and accepted impact links for each chain; validity belongs to the variation.
- Contradictory claims, common misconceptions and invalid conditions, including reversed comparisons and assertions unsupported by the scenario.
- Conclusion relationships: relevant referenced evidence, valid prioritisation/conditions and compatible recommendations.
- Deduplication groups and fixed evidence caps, so synonyms, repeated rows and the same argument in both sections cannot earn repeated credit.

Recognition flow: normalise permitted surface differences → recognise bounded concepts → check the authored relationships/conditions → detect known contradictions → record evidence and feedback. Do not fuzzy-match numbers, algorithm operators or technical opposites. Authored negation such as “does not require sorted input” can be correct; a blanket rejection of “not” is unsuitable.

A field can receive **Recognised**, **Needs a clearer link**, **Conflicts with the scenario**, or **Not recognised — clarify this link**. Blank and unrecognised responses are different states. Credit independently established evidence; do not treat an unrecognised but potentially valid argument as proven wrong. Keep original text visible. After submission, offer a targeted clarification or guided retry that lets the student confirm the intended concept and linked relationship using bounded alternatives (including plausible misconceptions, not just the model answer). Automatically mark those choices and their scenario/conclusion links. Record that help and the original response separately; it must not overwrite the original independent evidence. Students must not need synonym guessing or a teacher to proceed. Optional teacher review/reporting remains available for a valid argument outside the authored recognition space.

Test each rule with whole chains, including correct words combined into wrong explanations, negated/reversed claims, mixed correct-and-incorrect clauses, unrelated scenario details, copying the question, duplicate paraphrases, swapped advantages/disadvantages and contradictory conclusions. Do not add loose substring matching to the existing exact-term marker: it was designed for short concept answers, not causal reasoning.

## Feedback, scoring and progress

For the pilot, return an **automatic practice result** with a fixed, published practice-point maximum and an evidence checklist grouped as **Point**, **Explanation**, **Application** and (evaluate only) **Judgement**. Score authored criteria and valid links, not the number of filled fields. Repeated rows cannot increase the maximum. Display recognised evidence and unresolved free wording separately, with specific next-step feedback and the automatic clarification/retry route above.

An initial scoring pattern to calibrate is one practice point for each independently established point, one for its valid explanation and one for relevant scenario application, with a fixed authored cap on distinct chains. Evaluate adds separate capped criteria for supported prioritisation and a compatible recommendation. This is a proposed practice rubric, not the examination's holistic level grid; exact criteria/caps depend on each question. An option name or selected recommendation alone must not earn explanation or judgement credit. Do not label the result as an official mark out of the source paper's total or as an exam band.

A result based on unresolved wording must say which evidence was not automatically established; do not present the provisional recognised score as proof that all other ideas are wrong. The student must be able to obtain a fully automatically checked **assisted practice result** through bounded clarification/retry, without teacher intervention. Self-review clicks never award points. Retain source marks separately in author/teacher metadata, and preserve first-response versus assisted results.

Keep the new guided practice scores separately labelled initially rather than silently mixing them into existing Core revision percentages, recommendation ranking or comparable exam-score averages. This is separation of measurement, not an absence of marking. Record practice results/time/assistance in a compatible evidence record; do not fake a zero-score normal exam result. Later progress integration needs an explicit calculation policy. Preserve all existing histories.

Earlier [ESP designs](esp/activity-designs.md) include reviewed written reasoning. The new requirement supersedes reliance on teacher/self-review as the only substantive assessment path for exam-practice questions. Audit existing Core/ESP questions against it as a separate backlog task; this documentation change does not claim that existing review-only elements already comply or retroactively change recorded scores.

## Repository integration and decisions before implementation

Recommended pilot: a dedicated **Build an extended answer** option within Core practice, opening one scaffolded question directly. Keep existing three-question, 15–22-mark short-answer sets unchanged; do not slip this longer format into their random pool. Use current stable question slots, variations and single-question sharing where compatible, rather than inventing a new bank or code scheme. Confirm eligibility, direct access, search filters and historical composition validation before publishing new records.

Implementation needs more than a renderer:

| Area | Required work |
| --- | --- |
| Answer model | Versioned structured rows with stable IDs, option/polarity, raw clauses, conclusion references and scaffold metadata. Changing/deleting rows must not renumber authored assessment criteria. |
| Domain marker | Dedicated bounded chain-recognition module with explicit per-question rules. Reuse appropriate normalisation, not existing full-answer equality as if it understood prose. |
| Schema/validation | Existing validation assumes 1–3 marks per authored part; `partScores` expects stable numeric part IDs and score snapshots. Separate dynamic answer rows from fixed criterion IDs and define automatic practice scores, unresolved recognition and assisted results before coding. |
| Packed banks | `pack-bank.mjs` currently seals a named list of marking fields. Extend its check/reveal separation deliberately so the new rubric/accepted chains do not accidentally remain in display data. No new untrusted HTML rendering. |
| Persistence | Save every edit/add/remove, preserve reload/profile switching, references and undo state as appropriate; support expiry submission, repeat/review semantics and backup validation. Bound rows/field lengths without truncating silently. |
| Selection and progress | Dedicated format eligibility and labelled evidence records; no mixing into old sets or statistical scores by accident. Preserve code identity and content-update behaviour. |
| UI architecture | Coordinate with the planned Svelte migration. Discuss a small domain module + one answer-builder component versus a generic schema/form engine before implementation, as CODE_STYLE requires for key decisions. Prefer the smaller pilot unless evidence justifies the generic engine. Avoid building two throwaway renderers. |

These are proposed design choices, not approvals of a schema or architecture. The source evidence, content prototype and marking fixtures can be prepared before settling the UI framework boundary.

## Delivery sequence and acceptance gates

1. **Author two paper prototypes and rubrics.** Start with a tightly bounded Paper 1 discuss item inspired by actual Q11, and a Paper 2 evaluate item inspired by SAM Q14(d). Use matching schemes and exact spec mappings; add at least two meaningful variations each. Keep the search example as a third candidate. Teacher checks technical correctness, plausible alternative arguments and scaffold usefulness before runtime implementation.
2. **Trial the interaction and collect phrasing.** Students build a few answers using the paper/wireframe structure. Check whether the context field helps, whether clause boundaries confuse “because” versus “meaning”, and whether adding/deleting/referencing points is understandable. Use volunteered/de-identified responses for fixtures. Record assistance and time; no claim that this has already been trialled.
3. **Build and calibrate the pure marker.** Teacher-label a corpus of valid, invalid and ambiguous whole chains. Separate development examples from held-out student wording. Report false-credit and missed-valid-answer counts by field/chain and command word. Require no false full-chain credit in the agreed known misconception/contradiction fixture suite; teacher sets an acceptable missed-recognition level before pilot release. Every model and authored valid alternative must receive its intended automatic result. Test an automatically markable clarification/retry path for unrecognised text, including plausible wrong clarifications. If too many sound answers are unrecognised, narrow the question or strengthen structured response controls before shipping; do not defer useful marking to a teacher.
4. **Implement one complete question flow.** Agree the architecture/data boundary, then deliver add/edit/remove/undo, reference-aware conclusion, answer preview, save/restore and post-submission feedback together. Prove a recognised chain, a wrong chain and an unrecognised chain remain distinguishable after reload, expiry and profile switch. Use the established guidance/decision process for the framework choice.
5. **Add the second command word and variation coverage.** Verify discuss does not demand judgement; evaluate checks supported prioritisation. Exercise different scenarios, valid alternative recommendations, row deletion and duplicates. Confirm bank packing, old/new codes, set exclusion and backup round trips. Keep the separate evidence view out of current percentage-based priorities.
6. **Classroom pilot, then expand.** Check 320px, 200%/400% zoom, keyboard-only use and touch; have students complete both scaffolded and a less-scaffolded response to see whether technique transfers. Teacher reviews feedback accuracy and completion time. Scale by well-supported argument families across both papers only after the pilot passes; retain optional review/reporting for valid unrecognised ideas alongside the automatic clarification path.

For initial timing, offer a 5–10-minute single-chain/discussion exercise and a roughly 10–15-minute fuller evaluation as provisional targets, not measured completion times. Do not require a full extended answer in every short starter. On timer expiry preserve and submit the student's partial structure once; do not auto-fill missing reasoning.

Definition of pilot completion: two source-calibrated questions with reviewed variations/rules, useful automatic practice scores and feedback across all assessed components, an automatically marked path through unrecognised-wording clarification/retry, useful student-facing editing, preserved persistence/sharing, accessible controls, separated progress evidence and recorded teacher/student pilot findings. Verify the complete flow without any teacher marking a student response. A technically working form or a review-only scaffold is insufficient.
