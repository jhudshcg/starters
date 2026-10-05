# Planned work — current status, 5 October 2026

Progress/profile status refreshed on 5 October; content inventory figures below retain the 30 September review and were not re-audited during that UI work. Older checkpoint/design entries describe their date, not necessarily today’s implementation.

| Not implemented | Recorded approach / scope |
| --- | --- |
| Keyword/topic search | Search within an activity/section using canonical tags, spec references, titles and assessed skills, with a small alias map. Show matching topics/counts and preserve whole-question/variation/mark constraints when forming a set. Never use answers/distractors as topic evidence. [Search review](reviews/2026-09-28-navigation-wording-search.md#search-discussion). |
| ESP Task 3 flowcharts and Tasks 4a/4b | Designs exist; Task 1/2 and Excel-formula questions are implemented. maxGraph is installed, but no Task 3 editor/runtime activities are wired in. First editor slice: one construction and one repair activity, with keyboard controls and saved graph state. [ESP designs](esp/activity-designs.md), [editor decision](esp/flowchart-editor-comparison.md). |
| Full Core content coverage | Core bank currently covers CA1/CA2. CA3–CA8 remain outside the implemented bank. Within CA1/CA2, 52 inventory elements have one direct question and 28 have supporting practice only; 289 have two or more. Teacher review and timing remain outstanding. [Current coverage](coverage-ca1-ca2.md), [README](../README.md). |
| Year 2 Occupational Specialism (OS) | Planned as its own question bank, not a subdivision of Core/ESP. No OS content/runtime bank yet. The prerequisite six-version-bit/three-bank-bit sharing-code migration **is implemented**. [Code rollover](code-rollover.md), [section registry](../js/exam-sections.js). |
| CSV import | CSV export and JSON backup/restore already work. CSV importing remains deferred. [Shared specification](spec-common.md), [README](../README.md). |
| Free-form Python execution | Current exercises mark constrained edits/answers without executing student Python. A browser execution environment is a later extension, not part of the current implemented bank. [Python specification](spec-python.md). |

Teacher subject approval, mixed-ability timing/hint trials and broader accessibility/cross-browser review are validation work, not missing runtime features. None of the CA1/CA2 inventory is yet teacher-approved complete.

Secure accounts/cloud sync, direct OneDrive integration and unrestricted sentence understanding are absent, but should not be mistaken for agreed next implementations: local progress plus export/backup and bounded answer matching are the current approach.

Already implemented: keyword-independent topic/subtopic filters; comparison/reasoning questions; broad puzzle families; generation-aware codes/progress; Vite local preview; eight themes and CSS feedback mixing. Historical references to a four-bank codec limit, uninstalled maxGraph, or the original tiny pilot question counts are superseded.

Progress features now implemented: local named profiles with close-spelling confirmation, last tracked date, automatic validated named-backup profile switching, dated part-level evidence, RAG/missing/stale priorities, persistent three-set Core recommendations, weekly percentages/minutes, and idle-aware engaged time with a five-second interaction-flag check and two-minute expiry. JSON backups use a username/timestamp filename; CSV is secondary. See [progress specification](spec-progress.md). Last-export-date display and local-history reset remain unimplemented; they are not the next task unless requested.

Progress highlight colours now mix 90% semantic base with 10% dominant theme colour; question-option feedback retains its default-surface mix. The user is visually testing the final colour changes; do not repeat browser suites for further blend tweaks unless requested or a functional concern requires them.
