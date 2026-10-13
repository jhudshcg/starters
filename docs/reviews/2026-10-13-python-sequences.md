# Coding practice review — 13 October 2026

## Scope and evidence

This change concerns the **Coding practice (Python)** bank, not Core exam or ESP question content. Reviewed all existing search/sort/list questions and all 63 existing hints against their five variations. Preserved the 315 existing assessment records except for 55 hint refinements. Added ten original templates at unused slots 63–72, each with five variations and six marks. These remain short, bounded application/trace/repair tasks suitable for Year 1; there is no new difficulty-band system or arbitrary student-code execution.

Used the cached [Core specification](../../../agents/spec.md), CA2.3 (data structures and operations), CA2.6–2.8 (control, functions and validation), CA2.11 (algorithms) and Appendix 2's Python operations. Calibration used [SAM Paper 1](../../../agents/SAM/paper1.md) Q12(b–d), Q15(a) and Q16 with the [mark scheme](../../../agents/SAM/mark_scheme_paper1.md). Q12 supports short completion, tracing and boundary reasoning; Q15(a)'s six marks assess loop control, indexing and copying into an array represented by a list. Q16 supports search comparisons and reasons. Our six-mark tasks divide marks between independently assessed tokens, trace values and bounded reasons; they are not reproductions of those questions.

Slicing, extend and a list used as an undo stack provide supporting Python representations and practice, not claims that each is a separately named Core assessable element. The guides label sets as an extension. Python lists stand in for arrays for indexing without claiming equivalence across languages.

## Gaps filled and different reasoning

| Slots | Added task | Difference from existing practice |
| --- | --- | --- |
| 63 | Slice, concatenate and update | Track separate outer lists and an exclusive slice stop, rather than simple indexing alone |
| 64 | Repair append versus extend | Explain nested versus flat results and unchanged source collection |
| 65 | Stack push/pop using a list | Apply LIFO, track shrinking contents and recognise empty-pop failure |
| 66 | Insert/remove/pop with duplicates | Distinguish value from index, first-match removal and shifting indices |
| 67 | Complete linear search | Return a first-match index, handle missing/empty input and preserve loop bounds |
| 68 | Repair binary search | Include the final singleton range instead of stopping early |
| 69 | Count linear-search comparisons | Compare best/worst/empty and duplicate cases, rather than only predict a found value |
| 70 | Repair early-stop bubble sort | Reset and use the swap flag on each pass |
| 71 | Repair insertion sort | Move the index through the sorted prefix in the correct direction |
| 72 | Count bubble-sort comparisons | Separate fixed-pass work from input order and list size |

The prior bank already supplied basic search traces, a bubble pass, insertion/merge steps, and sort-in-place versus a new sorted list. Those tasks remain. No new merge implementation was necessary to fill the requested gaps.

## Optional learning guides and hints

All **20 primary Python focuses** have collapsed topic guides; algorithms and sorting share one guide. Show only guides relevant to the current questions. Definitions introduce technical terms directly, followed by two or three short independent Python examples and their output. The search/sort guide includes binary-search and merge diagrams. All 39 examples are executed offline, including file examples in a temporary directory. Ordinary snippets keep the existing 12-line/64-character targets and readable, wrapping text.

Opening a guide before submission records matching questions as assisted; closing it does not erase that evidence. Disclosure state belongs to the active set and survives reload. Reading after submission does not rewrite the result. These guides are separate from question-specific hints and do not alter question fingerprints. Revised hints retain technical terms while explaining indices, exclusive stops, short circuiting, mutable data, exceptions and other relevant distinctions. They give a starting point without adding an assessed solution.

## Counts, review limits and verification

The bank now has **73 templates / 365 variations**. Algorithms and sorting each have six templates; lists has seven; selection retains six. The other 16 focuses have three each, leaving **48 templates / at least 240 variations** to meet the adopted six-per-focus target. Because lists already exceeds six, filling those gaps would yield 121 templates / 605 variations. Keep the current validator floor of three until the remaining expansion is delivered.

Focused checks execute every new variation's reference program, exercise edge cases, verify model/alternative/wrong-answer marking, and check snippet limits. Existing assessment data was compared with the captured pre-edit bank. Coverage, compatibility revision 23, bank validation and the production build pass. Focused browser checks cover disclosure, assistance, restored state and narrow layout; see the development log for final results and fixes.

This is an editorial and technical review. Teacher subject approval and mixed-ability timing/hint trials remain outstanding; no automated check establishes classroom suitability or full specification coverage.
