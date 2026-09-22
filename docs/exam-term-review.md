# Context and accepted-term review — 22 September 2026

Reviewed the CA1–CA2 exam bank's conceptual short answers after the coverage/title work in `e4ebb1f` and `bc3f1f5`. The bank has 112 templates and 224 variations. This change attaches explicit term rules to 336 parts and clarifies 106 part prompts across the variations. Overall, 62 templates / 124 variations change. Marks, assessed references, answer values, code, options, explanations and hints are retained. All templates remain pending teacher review.

## Source and assessment

The existing [Core specification 1.1](../../agents/spec.md) mappings remain authoritative. CA1.1–1.3 supply computational-thinking components, control structures, representations, development approaches and investigation actions; CA2.1–2.12 supply types, scope, collections, programming terminology, validation, algorithms and testing. [SAM Paper 1 marking guidance](../../agents/SAM/mark_scheme_paper1.md) explicitly credits appropriate alternative responses; Q1–3 calibrate short technical-term identification. [SAM Paper 2 Q11(c)](../../agents/SAM/mark_scheme_paper2.md) uses **real** for a measurement with decimal values. The user's explicit direction accepts that conceptual synonym for float, while Python function names stay exact. These are clarity/marking corrections to existing assessments, with no new coverage or increase in marks/demand.

## Editorial decisions

- Add the requested category where it helps: control structure, problem-solving step, variable-naming convention, Python data type, validation check or search algorithm. Retain enough interpretation for the student to identify the concept. Review both versions and neighbouring parts: computational thinking is not named in the preceding parts of slot 0 because its final part asks for that term.
- Use the same appropriate synonyms across the original and expanded questions: modular design, logging, sequential search, floating-point/real, memory usage and elapsed time. Preserve spelling/hyphen alternatives such as off by one and black-box/white-box.
- Link qualifier lists to complete term groups, with explicit part-level opt-ins. The marker accepts one whole term and zero or one linked suffix. No arbitrary qualifiers, global fuzzy matching, substring credit or contradiction stripping. Terms such as `gather information` retain their essential object. Compound technical terms and qualifiers are authored phrases, not individual tokens.
- Broaden only conceptual meanings: float as a type is distinct from the `float` conversion function; a check digit is distinct from a check-digit check; actual and expected results stay distinct. Code/identifier/choice/literal-output parts receive no term rules. Existing phrase-specific alternatives remain available.
- Inspect the remaining free-text parts as scenario quantities, bounded choices, short descriptions or literal outputs. They retain their existing exact alternatives; this change does not introduce unrestricted sentence marking. The Python free-text parts in this category are literal returned strings, so conceptual synonyms do not apply. Puzzles are unchanged.

## Verification

Focused tests exercise the shared matcher, source and sealed production parts, linked marks, schema validation and fingerprint changes. Every authored term/qualifier combination is checked in both variations, together with negations, contradictory additions, duplicated terms and unrelated suffixes. Independent regression cases check the previously rejected synonyms and distinct technical answers. Existing authored alternatives and all model answers retain their marks.

All **100 automated tests** pass. Coverage generation, compatibility generation, validation and production build pass; all 625 templates / 1,389 variations retain full-credit model answers. Coverage counts are unchanged. Revision **7** fingerprints the revised content and term rules; unchanged historical questions remain compatible, while changed ones follow the existing explicit rejection policy.

The full browser smoke passes, including 12 new submissions covering both variations of strategy, type and testing-method questions with valid synonyms and invalid qualifiers. Existing scoring, sharing, timer, storage, hint/reveal and 320px reflow checks also pass. The first run exposed a test-runner navigation race when clearing an attempt and immediately reloading the same code; a unique navigation URL and fresh-attempt wait corrected the runner, and the full rerun passed. A mobile screenshot confirms the longer accepted answers and clarified prompts fit the layout.

Automated checks do not confer teacher approval; classroom interpretation/timing remain unmeasured.
