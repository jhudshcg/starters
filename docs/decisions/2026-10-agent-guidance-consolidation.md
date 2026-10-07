# AGENTS.md consolidation — 7 October 2026

This records a documentation move, not a change of product scope or approval to refactor. The user requested preserving original wording and resolution, resolving only clearly stale content, and pausing for review. Original requirements retain their status even where their destination contains drafts. Existing proposals are not adopted by relocation.

## Requirement ownership

| Original section | Current owner and preservation |
| --- | --- |
| Purpose, audience, activity categories and hosting | Root AGENTS.md retains the original wording; a separate note identifies the existing Core/ESP split. |
| Engineering guidance, efficient work and handovers | Root AGENTS.md retains the engineering links and checkpoint/cache instructions verbatim. |
| Puzzles | `spec-puzzles.md`, Purpose and original requirements: interaction modes, self-marking, numerical/spatial/sequence/logic variety, grouping, challenge/time points, fun and example sources. Go/filter suggestions are recorded below with their current implementation. The exact curriculum/industry-context requirement moved to content-authoring, Grounding and wording, and is linked from the puzzle specification because it applies to all question types. |
| Spec related questions | `spec-exam.md`, Requirements and Sources: exact detailed command-word/programming/linked-reasoning wording, short responses, three questions, 1–3 marks per part, 15–22 total, CA focus and testing examples. Corrected only “single work” to “single word” and moved source links relative to docs. The teacher’s two-distinct-question minimum supersedes one; full Core coverage and two variations remain. |
| Python challenges | `spec-python.md`, Scope: all six original formats, syntax/data/control/functions intent, 12-line guidance, PEP8, searching/sorting, feedback, two-question/10–15 marks and three distinct questions per focus retained verbatim. Five variations remain explicit. Optional PyScript wording moved to Later execution support; function writing remains staged scope. |
| Stray puzzle revision-priority sentence | `spec-progress.md`: removed only the accidental leading “If”; exclusion is retained. |
| Presentation and navigation | `style-guide.md` retains colourful/responsive/accessibility/high-zoom and language wording verbatim; `spec-common.md` retains Home selection/code entry verbatim. |
| Question permutations and sets | `spec-common.md`: preserves varied wording/scenarios/values/code/answers and learning-principle intent, unique prefixed direct-question codes, extensibility, precise tags, exact set sharing, prominent codes, multiple focuses and all randomisation constraints. Only the superseded hash clause was removed from the set-code sentence; the full original is quoted below. Existing fixed-puzzle exceptions remain explicit. |
| Question data and codes | `spec-common.md`: original separate-file/tags/permutations/generation-rules wording retained verbatim. Codec/cache proposals below are superseded by the current implementation while preserving deterministic cross-client resolution, order independence, efficient lookup and explicit compatibility. |
| Timing | `spec-common.md`: configurable whole-set countdown, automatic submission/scoring and optional student activation retained verbatim. Old suffix position and hidden-clock reset wording are recorded below against current rules. |
| Record keeping | `spec-progress.md`: original local storage fields, attempt count, charts, sorting/filtering, weak/strong areas, revision priorities, CSV export/import and OneDrive reminder retained verbatim. Adopted tracked-repeat and JSON-restore rules are explicit qualifications; CSV import remains deferred, not deleted. |
| Implementation direction | `CODE_STYLE.md` retains library/tool/browser API reuse wording verbatim. `spec-python.md` retains optional runtime wording. Root retains high-signal documentation, consistent terminology and required content-authoring/refinement links verbatim. |

## Python minimum: initially unresolved, subsequently confirmed

The Python minimum preserved at consolidation read: “For each question focus, there should be at least 3 completely different questions, each with their own permutations.” At the consolidation review pause, its primary-focus interpretation remained unadopted; the instruction to retain wording was not treated as a decision. The user subsequently confirmed on 7 October 2026 that at least three distinct questions per primary Python practice focus is definitely the minimum target. The [Python specification and audit](../spec-python.md#primary-focus-minimum-audit--7-october-2026) recorded that clarification: all 20 current primary focuses met three, with 63 templates and five variations each. Later the same day the user raised the target to **six per primary focus** and requested a todo task. That newer target supersedes three; the original counts remain the baseline and the [57-template expansion](../planned-work.md) is not yet implemented.

## Clearly superseded wording

The quotations below are historical evidence only, not active implementation instructions. Their replacements preserve the goals identified in the ownership table.

### Set codes: removed hash alternative

> Questions sets (the 2-3 questions presented to students for a starter activity) should also have unique codes (which also specify the specific permutation of each question), which can be a short hash of the individual question codes, to allow for easy sharing and access to specific sets of questions.

The unique exact-set code requirement remains; only the hash suggestion is replaced by the adopted reversible codec.

### Go suggestion

Go is implemented. Source-rank bands and the rules reminder are owned by [the puzzle specification](../spec-puzzles.md). The original assumed prior rules explanation is retained there.

> Perhaps also some basic Go tsumigo problems (10k to 20k difficulty). Students will have already had the rules explained, but a link to a short online tutorial (e.g. at online-go.com) could be provided with the puzzle if students want a reminder.

### Puzzle subtype filter suggestion

Subtype selection is implemented; current selection behaviour is owned by [the puzzle specification](../spec-puzzles.md).

> It may be good to have puzzle subtype selection/filtering for the user.

### Original Core coverage minimum

Only the minimum is superseded: the recorded teacher clarification requires two distinct questions per assessable element, each with at least two variations. Full Core coverage, phrasing/value/answer variations and precise tags remain in [the exam specification](../spec-exam.md#requirements).

> The band of spec related questions should completely cover the Core CA spec (each assessible element in the spec should be covered by at least one question (each with at least 2 permutations for question phrasing, values and correct answers where appropriate), and each question should be tagged with the relevant spec content area and subsection, e.g. CA1.3.2).

### Six-character hash

Superseded by the [nine-character 54-bit contract](../spec-common.md#set-codes-and-compatibility), with optional tenth timer character.

> A 6 character hash should be sufficient for question set codes.

### Suggested question-code cache file

A possible mechanism, superseded by stable slots, compatibility metadata and the existing identity tooling. No requirement for this particular filename survives; exact resolution and efficiency do.

> A separate questions_codes.js file could be maintained for caching question codes, and containing a function to make question set codes to individual question codes.

### Text-derived question identities

Superseded by permanent slots and variation positions. Independence from file order and avoiding repeated client computation remain intended; content fingerprints detect changes without becoming identity.

> The question code generation could be a function of the question text and tags, which has the benefit of making it independent of question order. Having these cached in a separate compiled js file would save the client computing each question code for the whole set of each client code.

### Deterministic cached resolution

The cross-client reproducibility requirement is retained in [the common specification](../spec-common.md#set-codes-and-compatibility). The particular cache mechanism is superseded by the adopted codec/compatibility tooling.

> Using the question code cache file and a deterministic function for deriving question codes (same question always produces same question code), the same code for questions and question sets should produce the same outcome for all clients.

### Versioned question and cache files

Compatibility intent is retained by the [current identity rules](../spec-common.md#set-codes-and-compatibility) and [rollover policy](../code-rollover.md); these specify supported legacy formats, withdrawals and generation cutoffs rather than promising every version forever.

> question and cache files could be versioned to allow for updates and older client versions remaining usable.

### Nearest-match codes

Superseded by explicit identity resolution: never guess a nearest match or silently substitute content. Corrections retain identity; substantive changes get new identities.

> It might be helpful if the question code derivation function maps similar codes to similar functions, so that nearest match could be found, after minor updates. Then previous codes could be stored in the question code cache, to help old codes find the updated versions of questions.

### Seed/catalogue and original packed-layout alternatives

Superseded by the settled 54-bit reversible codec. Short exact sharing, compact decoding, room for bank/version growth and no exhaustive set catalogue remain the design intent. The original 41-bit/six-character arithmetic is not the current encoding contract.

> For question set codes, a shared seed may be required used to produce the 6 character hash from the individual question codes. Additionally, to map the other way, it would be helpful to also have a question_set_codes.js to cache those codes as well. An exhaustive list would be too large though.
> Alternatively, a scheme that relies of question and permutation order could be much more compact and reversible. e.g. [type][offset1][perm1][offset2][perm2][offset3][perm3] could work.  using a binary scheme where 2 bits are used for type, 10 for offset, 3 for permutation, would require 41 bits, which can be encoded in 6 ascii characters and decoded back into the type and offset data to match questions. There would even be upto 7 bits spare for a version number, to allow codes to match with versions of the question data files.

### Seventh-character timer suffix

Only the position is superseded: use the optional tenth character. The 5–15-minute range and 5–9/A–F duration encoding remain current.

> Adding a 7th character to the question set code should indicate that the student has selected timed mode, and the SPA should display the countdown timer accordingly, according to the value of the 7th character, e.g. 6 for 6 minutes A for 10 minutes, F for 15 minutes, etc.

### Synchronised hidden and visible timers; refresh exception

The [adopted progress specification](../spec-progress.md#estimated-engaged-practice-time) separates accumulated engaged practice time from the countdown origin: resetting one must not erase the other. The [common timing/recovery rules](../spec-common.md#timing-and-recovery) preserve valid deadlines on refresh and distinguish stale untimed work from expired timed work; do not reset an overdue countdown simply because 45 minutes elapsed. The detailed untimed recovery interpretation retains its existing Proposal label.

> If a timer is enabled, then this can reset the hidden timer already running, so they are synced. A page refresh should not reset the timer, unless it's been > 45 minutes.

## Other clearly stale statements reconciled

- `implementation-plan.md` Exact sharing table now agrees with its settled section: nine payload characters plus optional tenth timer character, replacing eight plus ninth.
- `spec-common.md` Future OS paragraph now distinguishes four currently used banks from the implemented eight-ID capacity. It retains the independent-bank requirement, reserved OS ID, 4,095 usable slots and explicit migration/rollover rules.
- The exam specification no longer directs readers to an obsolete one-question minimum in the root; it links this record instead.

Other historical content and Proposal labels were not globally rewritten. No application code, question content, identities, persisted data or production output changed.


## Preservation and verification

Compared all 65 non-heading blocks of the pre-consolidation AGENTS.md: 49 remain verbatim in the root or their specialist owner; four have minimal explicit edits (single work → single word, relocated source links, removal of the stray “If”, and removal of the superseded set-hash clause); 12 superseded blocks retain their full original wording above with replacement decisions. The removed hash clause also has its full source paragraph quoted above. Requirements containing multiple sentences or list items were checked as whole blocks, not just keywords.

AGENTS.md reduced from 168 to 56 lines. All 123 checked local documentation links/anchors resolve, and `git diff --check` passes. At the consolidation pause, the final Python wording check kept the secondary-tag organisation and selectable-focus acceptance check from silently adopting the then-unresolved restriction. The subsequent explicit decision is recorded above. No runtime tests or production rebuild were needed for these documentation-only changes. The separate pre-existing production-test failure recorded in the readiness review remains unresolved.

Stopped for the requested user review; no application refactor started.
