# ESP source guide

Status: reference notes from the supplied specimen pack, read in September 2026. These are authoring notes, not new assessment regulations. The teacher-confirmed Core specification baseline is **1.1**, regardless of stale labels in the local conversion. Source PDFs and supplied files remain unchanged.

## Reading route

- [Task and assessment notes](tasks-and-assessment.md): purposes, outputs, assessment traits, marks and constraints.
- [Supplied assets and source issues](supplied-assets.md): workbook cells, datasets, code defects, diagram/code-image findings and ambiguities.
- [Starter additions plan](starter-plan.md): proposed activities, sequencing, marking, integration and acceptance criteria.

Read these notes first for future ESP work. Reopen source pages only for a detail not captured here, a flagged discrepancy or a changed source fingerprint. The notes paraphrase and organise the material; they do not replace teacher judgement or the source when wording is disputed.

## Source hierarchy and scope

1. [Local specification](../../../agents/spec.md): Core skills; Employer Set Project content; assessment overview and objectives; additional pandas/Matplotlib expectations. Relevant headings are indexed below.
2. The task booklet defines the task and scenario requirements; the mark scheme supplies assessment traits and indicative approaches. Where they conflict, record both and make an explicit assumption in original practice content.
3. Supplied workbook, code, CSVs and test-log template reveal the concrete artefacts students must interpret. They contain defects and inconsistencies; do not treat them as flawless reference implementations.
4. Use the **V0.2 PDF mark scheme** in the ESP directory as the supplied pack baseline. The older [V0.1 HTML conversion](../../../agents/SAM/ESP_Mark_Scheme_V0.1.html) is not merged into this baseline. It was identified, not used to resolve conflicts.

These notes concern the supplied financial-sector specimen, not a claim that every live assessment series uses this context. No web verification or current-series administration audit was undertaken.

## Inventory and exact fingerprints

All seven PDFs were text-extracted and read. Mark-scheme pp. 16, 21–23 were also rendered and visually inspected because diagrams/code screenshots are not fully represented in extracted text. Both Python files were read without executing their interactive entry points; workbook cell values/formulas, DOCX paragraphs and both CSV datasets were inspected programmatically. No source file was saved or modified.

| Source | SHA-256 |
| --- | --- |
| [20250613_Digital_DSD_Core_ESP_Mark_Scheme_V0.2.pdf](../../../agents/SAM/ESP/20250613_Digital_DSD_Core_ESP_Mark_Scheme_V0.2.pdf) | `1a4b634445f7aea3e4ab9a93faf79c1aa6d9a63fac1133b5da116518d3ba09f7` |
| [20250613_Digital_DSD_Core_ESP_Pre-release_Booklet_V0.1.pdf](../../../agents/SAM/ESP/20250613_Digital_DSD_Core_ESP_Pre-release_Booklet_V0.1.pdf) | `9f83c51d5207db6b8ca73a3e7b16551997d18b022339a2028c522e286a918653` |
| [20250613_Digital_DSD_Core_ESP_Task_1_Booklet_V0.1.pdf](../../../agents/SAM/ESP/20250613_Digital_DSD_Core_ESP_Task_1_Booklet_V0.1.pdf) | `8f310940b2d617a2f35c2ba34fa85874d5d085f2d331e94b1744a2d3b20f7df2` |
| [20250613_Digital_DSD_Core_ESP_Task_1_RBSX_ Project_Plan _V0.2.xlsx](../../../agents/SAM/ESP/20250613_Digital_DSD_Core_ESP_Task_1_RBSX_%20Project_Plan%20_V0.2.xlsx) | `6dfb8a7ab6205bb685c47432c8c77140ca07b59436853b52c3745588f7270ffc` |
| [20250613_Digital_DSD_Core_ESP_Task_2_Booklet_V0.1.pdf](../../../agents/SAM/ESP/20250613_Digital_DSD_Core_ESP_Task_2_Booklet_V0.1.pdf) | `9cf9d5c0ea5cd0806cf7f4a2ac0836c1b840e06bebdf2fc4d3f5c72aac6b9651` |
| [20250613_Digital_DSD_Core_ESP_Task_2_RBSX_NonWorkingCode_V0.2.py](../../../agents/SAM/ESP/20250613_Digital_DSD_Core_ESP_Task_2_RBSX_NonWorkingCode_V0.2.py) | `0fb03f55f41f9826abdc8cd48d46b409ca48b02b7431e4cf175d3790eca14616` |
| [20250613_Digital_DSD_Core_ESP_Task_2_Test_Log_Template_V0.2.docx](../../../agents/SAM/ESP/20250613_Digital_DSD_Core_ESP_Task_2_Test_Log_Template_V0.2.docx) | `3b096984f3a0570e40c76ce9fb489bf9e213cea08ed7cf4d5d266407d58306d0` |
| [20250613_Digital_DSD_Core_ESP_Task_3_Booklet_V0.1.pdf](../../../agents/SAM/ESP/20250613_Digital_DSD_Core_ESP_Task_3_Booklet_V0.1.pdf) | `bca3a06b9af14082771b2ceeb023b98b6a1f71759b49f98fac29a5531a4626e7` |
| [20250613_Digital_DSD_Core_ESP_Task_3_RBSX_data_V0.2.csv](../../../agents/SAM/ESP/20250613_Digital_DSD_Core_ESP_Task_3_RBSX_data_V0.2.csv) | `3108380df0c90cb4deb13806b3771fd9eb25cdc84731f926841dc8a6ccfb8c50` |
| [20250613_Digital_DSD_Core_ESP_Task_4a_Booklet_V0.1.pdf](../../../agents/SAM/ESP/20250613_Digital_DSD_Core_ESP_Task_4a_Booklet_V0.1.pdf) | `aca8ba473ad45f274ae570f05edf6b7a91edbe85f4bbf805ae96abd200b2665f` |
| [20250613_Digital_DSD_Core_ESP_Task_4a_RBSX_currency_conversion_V0.2.py](../../../agents/SAM/ESP/20250613_Digital_DSD_Core_ESP_Task_4a_RBSX_currency_conversion_V0.2.py) | `e9841700366d39177f830e427a4cf7523fcd79701ac2fcb80cec7dbc6224b9c8` |
| [20250613_Digital_DSD_Core_ESP_Task_4a_RBSX_data_V0.2.csv](../../../agents/SAM/ESP/20250613_Digital_DSD_Core_ESP_Task_4a_RBSX_data_V0.2.csv) | `7b422a821d43fd0445cd59ea71f3f4b065766911a33d26552c5f5dea1342066c` |
| [20250613_Digital_DSD_Core_ESP_Task_4b_Booklet_V0.1.pdf](../../../agents/SAM/ESP/20250613_Digital_DSD_Core_ESP_Task_4b_Booklet_V0.1.pdf) | `e48cd8c1dc5671d3ca68072bb710ad4ce74c0e6b299eb5d74bdc894e29014133` |

## Specification locations

| Topic | Local heading / approximate lines at review |
| --- | --- |
| Six Core skills | Core Component, lines 493–517 |
| Pre-release and Task 1 planning | Employer Set Project, lines 2466–2538 |
| Task 2 testing/repair | lines 2539–2574 |
| Task 3 design | lines 2575–2627 |
| Task 4a development, organisation and UX | lines 2628–2683 |
| Task 4b reflective evaluation | lines 2684–2705 |
| Assessed duration, task list, conditions, portfolio | Employer Set Project assessment overview, lines 2858–2898 |
| Assessment objectives | lines 2900–2960; conversion interleaves table cells, so do not infer missing splits |
| pandas and Matplotlib expectations | Additional libraries and commands, lines 4518–4550 |

The Core skills are reflective evaluation; clear technical/non-technical communication; collaboration; software/artefact creation; logical problem-solving including defect repair and proposing solutions; and mitigation of security risks. The pre-release supports collaborative research; supervised task work does not become a group task merely because collaboration is a Core skill.

The supplied specification states 14 hours 30 minutes of assessed work, 100 marks and 40% of the Core assessment. The task-booklet times agree: 3 + 3 + 2.5 + 4 + 2 hours. The recommended four-hour pre-release research is additional and unassessed. Mark totals in the specimen documents conflict: see the issue register before presenting official totals to students.

For authoring, distinguish **source fact**, **source inconsistency**, **our derived calculation**, and **starter proposal**. Do not turn an indicative examiner example into a mandatory single answer.
