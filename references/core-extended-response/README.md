# Core extended-response evidence — 7 October 2026

Reusable local evidence for [the scaffolded-response plan](../../docs/extended-response-plan.md). Start with the existing SAM Markdown conversions; use `2026-selected-extracts.json` for the selected actual-paper extracts below. No sources were downloaded or originals modified.

The JSON records the original local path, SHA-256, extraction tool/version, extraction date and one-based PDF page numbers. Original download URLs were not supplied with the local files, so `source_url` is explicitly null rather than guessed. Sources live in the sibling `agents` collection routed by the [exam resource map](../../docs/exam-resource-map.md). If regenerating, use this cache first when the source hash matches. PDF text extraction does not certify diagrams, typography or every source claim.

| Source | Relevant evidence read | Design implication |
| --- | --- | --- |
| Specification `../agents/spec.md`, command-word glossary (Discuss / Evaluate) | Discuss asks for contextual consideration of opposing aspects without requiring a conclusion. Evaluate asks for an evidence-supported judgement. | Different scaffolds; do not require a recommendation for every discuss task. |
| SAM Paper 1 Q11 + matching scheme Q11 | Six-mark discussion of random IDs, collisions, maintaining sorted data and execution time. | Link effects to the actual program requirements; generic speed claims are insufficient. |
| SAM Paper 1 Q16 + matching scheme Q16 | Twelve-mark evaluation of two supplied linear-search programs, three search tasks and 40,000 words. Scheme separates analysis, contextual application and supported evaluation. | Evaluating supplied implementations is distinct from choosing linear versus binary search. Retain the specific data/search requirements when adapting. |
| SAM Paper 2 Q10 + matching scheme Q10 | Six-mark discussion of hospital remote access; positive and negative implications, with contextual analysis descriptors. | Good single-proposal discussion model; no compulsory best-choice conclusion. |
| SAM Paper 2 Q14(d) + matching scheme Q14(d) | Nine-mark cloud evaluation using personal/medical/financial records, limited budget and part-time IT support in the scenario. Conclusions weigh competing factors. | Context is the business consequence of the claim, not simply mentioning the organisation. |
| Actual Paper 1, summer 2026, Q11, PDF p8; scheme pp9–10 | Written algorithm description for an undecided language, a non-programmer audience and early testing. Six marks. | Good tightly bounded first pilot: natural-language accessibility versus inability to execute directly. |
| Actual Paper 1, summer 2026, Q16, PDF p28; scheme pp26–28 | Bubble versus merge sort for about 20 million customer records that cannot all fit in main memory. Twelve marks. AO2b context carries twice the weighting of either other trait in this item. | Preserve hard constraints. Do not accept any conclusion merely because both options have some benefits; do not assume identical weighting across all questions. |
| Actual Paper 2, summer 2026, Q10, PDF p8; scheme pp9–10 | Four staffed checkouts replaced by eight self-service units, still needing one supervising staff member. Six marks. | Recognise specific staffing/throughput implications; reject a claim that all staffing cost disappears. |
| Actual Paper 2, summer 2026, Q14(d), PDF p20; scheme pp22–24 | Weekly full/off-site and nightly overwritten incremental backup proposal for college student work. Nine marks. | Recoverability and time/location details are consequential constraints. Independently verify backup-chain reasoning before turning indicative wording into automatic rules. |

SAM source paths: [Paper 1](../../../agents/SAM/paper1.md), [scheme 1](../../../agents/SAM/mark_scheme_paper1.md), [Paper 2](../../../agents/SAM/paper2.md), [scheme 2](../../../agents/SAM/mark_scheme_paper2.md). The existing conversions were used without reconverting PDFs; equivalence to reorganised original SAM PDFs was not newly checked. Actual-paper extracts were read directly from the named PDFs and matched to their question numbers and scheme sections.

## Boundaries for adaptation

The schemes explicitly allow other pertinent contextualised answers and use holistic best-fit levels. They are not exhaustive phrase dictionaries or a licence to assign an official band by counting filled boxes. Preserve source question/command-word/mark-scheme references per authored variation and independently verify technical claims.

Do not transplant indicative claims without their conditions. In particular, the SAM search discussion includes possible adaptations beyond the displayed code; check the actual loop before claiming sorted-order early termination. Merge sort's use of backing storage is an external-sort design choice, not a guarantee that any in-memory implementation handles a file larger than RAM. For incremental backups, identify exactly which generations are needed and retained.

This selected review establishes design calibration, not a full past-paper review, examiner-report review, exhaustive content coverage or teacher approval of new questions.
