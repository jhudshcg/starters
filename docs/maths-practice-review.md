# Maths practice and algebra marking — 24 September 2026

## Scope and tier boundary

Classic maths slots 635–684 add 50 original tasks, each with five numerical variations: 35 algebra tasks and 15 number, measure, probability and sequence tasks. The focus contains 100 templates in total. Algebra can be selected separately. Topic and challenge selections constrain new sets; shared codes still open their exact questions. These are short maths practice tasks, not additional T-Level Core coverage claims.

The [AQA GCSE algebra specification](https://www.aqa.org.uk/subjects/mathematics/gcse/mathematics-8300/specification/subject-content/3.2-algebra) was inspected on 24 September 2026. Its basic and additional Foundation columns establish the ceiling for **both Beginner and Foundation**. Beginner uses small positive integers, substitution, collecting like terms, notation and one-step equations. Foundation adds single-bracket expansion, common-factor extraction, straightforward linear equations, negative substitution and simple rearrangement. No lower-level task uses algebraic fractions with variable denominators, completing the square, composite/inverse functions or calculus. Foundation tasks in other maths domains use routine fractions, percentages, ratio, scale, measures, averages and elementary probability.

Standard includes GCSE Higher demand, although some prerequisite techniques also occur in additional Foundation content. Stretch includes completing the square, three-bracket expansion and introductory AS polynomial differentiation/remainders. It does not claim to cover the whole Higher or AS specification. `mathsReference` records the topic reference; `mathsTier` records the intended ceiling. The AQA reference is a content boundary, not endorsement or measured student difficulty. No T-Level SAM calibration is claimed for this separate maths strand.

Older “Handshake network”, “Pigeonhole guarantee”, “Binary switches” and “Tournament elimination” questions move from Foundation to Standard: their combinatorial reasoning is unsuitable for the requested routine Foundation practice. The remaining older Foundation tasks are least common multiples and finding a missing value using the mean. Their content remains unchanged and their codes remain valid.

## Marking contract

`kind: 'algebra'` requires an explicit list of single-letter `variables`, an `algebraForm` and `equivalentMarks`. Supported forms are `equivalent`, `simplified`, `expanded`, `factorised` and `rearranged`. Two-mark form questions award one mark for exact equivalence and the second for completing the requested form. An incorrect or unparseable expression earns zero; equivalence-only questions award full marks for any supported equivalent form. Rearrangement questions require a finished expression: a reduced single fraction is accepted, while common numerical factors, uncollected terms and unnecessary arithmetic receive partial credit. Ordinary numeric answers retain their existing marking.

The [mathjs expression parser](https://mathjs.org/docs/expressions/expression_trees.html) supplies syntax trees. Trees are restricted to numbers, the specified letters, arithmetic operators, brackets and bounded non-negative integer powers. Student trees are never compiled or evaluated. BigNumber parsing preserves decimal literals; exact rational polynomial coefficients establish equivalence without substituting sample values. Multiplication can be implicit; Unicode minus, multiplication and superscript digits are accepted. Input length, tree depth, degree, term count and coefficient size are bounded.

Division is supported only by a non-zero constant. Variable denominators, roots, equations, inequalities, functions, assignments and arbitrary code are not accepted as expression answers. This avoids accepting cancellation that silently changes the domain. Inequalities and more general rational expressions require a separate marking extension before publication.

Expanded/simplified form rejects remaining distribution, duplicated monomials and redundant zero terms. Factorised form compares the non-constant factors with the authored factorisation, allowing reordered factors and sign redistribution, and rejecting unextracted integer common factors. Authors must supply a fully factorised reference. This is a bounded final-form check, not a general proof or typed-working marker.

Partial feedback points to division across the numerator, distribution, collecting terms or extracting factors. It does not reveal the final expression. It appears after submission under the existing review lifecycle; students can retry the set to improve their answers. Equivalent-form metadata is included in question fingerprints. Packed bank delivery retains the same marking behaviour.

## Review and verification

All 250 variations have explicit hints and worked-answer explanations. Model-answer checks cover every part. `python3 scripts/validate-algebra-content.py` separately derives 275 algebra, formula and equation answer parts from the prompts using SymPy. Focused marker tests cover accepted alternatives, wrong signs and powers, very close but unequal decimals, unfinished equivalent expressions, factor ordering, common factors, unsupported domain changes, excessive inputs, packed delivery and dependency handling.

Teacher review and classroom timing remain pending; `reviewStatus` is not promoted by automated checks.

## Approved wider puzzle enrichment

The earlier proposal remains in scope: at least 100 puzzles per family; Go bands Beginner 25k+, Foundation 18–24k, Standard 12–17k, Stretch 11k and stronger; rank-based grading; rectangular and shaped dot paths; scaffolded tangrams; smaller Sudoku introductions; varied coupled logic/equation/cage systems; broader sequence rules. Counts refer to independently addressable problems, with structural variety rather than renaming or rotating one problem. Implementations and remaining limitations are recorded in the project checkpoint as they are validated.
