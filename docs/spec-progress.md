# Progress tracking, profiles and revision display

Adopted requirements and implementation, updated **5 October 2026**. This specification records the teacher’s progress/profile requests and the concrete calculation and display rules used by the app. It supersedes the older common-specification parent-window priority rules and the earlier requirement to switch profiles manually before restoring a named backup. The [repeat-attempt policy](spec-common.md#implemented-repeat-attempt-policy-15-september-2026) remains in force.

## Original tracking requirements and current delivery

Requirements moved from AGENTS.md on 7 October 2026 retain their original status; moving them into a document containing drafts does not make them proposals. Later explicitly adopted decisions and the exceptions identified below still apply.

The SPA should use local storage to keep track of student progress, including: date, % score on each question set, time taken to complete each set (whether timer visible or not), and the number of attempts made. Students should be able to view their progress over time, with visual representations such as graphs or charts. Data should be sortable and filterable by question type, focus, and date range. It should be easy for students to identify weaker and stronger areas. There should be a revision priorities box and/or 'sort by revision priority' feature.

There should be an export feature than allows students to save their progress data as CSV. Similarly it should be possible to import data from csv.

Students should be encouraged to save their data to their student account OneDrives regularly, so swapping computers and or computer rebuilds can be handled.

Puzzle questions do not contribute to revision priority calculations.

The adopted repeat-attempt policy below qualifies which completions enter tracked history and counts; do not treat early untracked repeats as extra tracked results. The dated records, filters, weekly displays and priority calculations below implement the original tracking intent. CSV export is implemented, full restoration uses JSON, and CSV import remains a deferred requirement rather than an implemented feature or deleted goal. Students can back up to OneDrive manually; no account integration is implied.

## Local named profiles

Profiles are a low-complexity way to share a computer, not a secure login system. There is no password, identity verification, server account or automatic OneDrive sync.

- If no current username is stored, show a modal requesting a name before practice. Accept 1–80 characters after trimming and collapsing whitespace.
- Reuse an existing name when case and normalised spacing match. For a close spelling, ask “Did you mean …?” and let the student choose the suggested profile or the name they entered. Do not silently merge similar names. The current matcher suggests the nearest name within a bounded edit distance of at most two characters; short names have a stricter limit.
- Remember the most recently selected profile. On reload, display “Welcome back [username]” and a small “Not you?” action to choose another profile.
- Show **Last tracked: [local date and time]** in the header, using the latest completion timestamp in that profile’s tracked history. If none exists, show “No tracked practice yet”. This is a clue for recognising the intended profile, not a login date or the date of an untracked repeat. Refresh it after a tracked submission, profile switch or successful restore.
- Keep each profile’s active activity, tracked history, repeat-attempt dates and recommendation batch separate. Switching saves the outgoing profile and selects the other profile without erasing either history.
- The first named profile inherits the existing unnamed local save. Preserve the original legacy save; subsequent new profiles start empty.

The student is responsible for regularly exporting progress to their student OneDrive. Display that reminder in the profile modal and on My progress.

## Dated records and attribution

Each tracked completion stores an attempt ID, exact question-set code and bank generation/revision, activity type and topic/focus, start and completion timestamps, final marks/maximum/percentage, elapsed seconds, check count, assistance status and submitted/expired outcome. Timestamps are numeric UTC instants; the UI displays local dates and times. A later eligible attempt creates a separate dated record.

Exam and programming records also retain `partScores`: question slot and variation, part ID, distinct reporting references, final earned/available marks and independent first-response earned/available marks. The attempt’s completion date applies to all its part results. These snapshots preserve the topics/subtopics practised and the results even when authored questions change later. A question assisted before its first check contributes zero independent first-response available/earned marks. Its final results remain recorded.

The history table shows dated set results, type/focus, code, final marks and percentage, time, checks and assistance/expiry. Expand “Topic / subtopic results” for that attempt’s independent first-response results. JSON/CSV retain the full recorded first/final part marks. Puzzles remain in tracked history and overall/weekly statistics, but do not contribute to revision priorities. Current priority views cover Core exam topics/subtopics and programming focuses, not ESP written reasoning.

Earlier aggregate-only records remain in history, statistics, charts, exports and repeat-attempt checks. They cannot establish detailed topic/subtopic priority evidence: do not invent historical attribution or silently backfill it. Reopening a completed older record does not convert it into detailed evidence.

## Estimated engaged practice time

For new practice, accumulate estimated engaged time separately from elapsed wall-clock time. Begin when the first question is displayed on an unfinished activity page in the visible tab. Initialise an interaction flag (IV) as false and a two-minute inactivity expiry timestamp (IT).

Any mouse/pointer movement, clicks/taps, touch movement, keyboard input or scrolling anywhere on the open practice page sets IV to true. If practice measurement is paused, resume it immediately with a fresh two-minute window. Repeated events while IV is already true take a fast return path: they do not settle the accumulated clock, renew the expiry, write storage or create/restart browser timers.

A single repeating check runs every **five seconds**. If IV is true, renew IT to two minutes from the check and clear IV. Otherwise, leave the expiry unchanged and pause measurement when it expires. Settlement caps accumulated time at the expiry timestamp; ordinary persistence/submission also honours that cap. A late callback never adds an unbounded idle gap. This gives approximately **120–125 seconds after the last interaction** with normal callback scheduling, rather than renewing at the exact time of every mouse event. IT is a timestamp, not a separate timer allocated for each interaction. Pending flags are cleared when leaving/hiding the activity or loading a saved profile, so stale events cannot resume an absent activity. No keystrokes or pointer locations are stored.

Pause immediately when the document is hidden, the student leaves the activity, switches profile or unloads the page. Preserve the accumulated value across normal reloads/navigation. Checkpoint approximately every 15 seconds and on ordinary answer saves/visibility changes/unload; abrupt browser termination can lose the latest unsaved interval. Restoring a checkpoint does not count time while the browser was closed. A two-minute idle threshold can undercount quiet reading/thinking and cannot prove engagement; label results as **estimated practice time**.

The visible timed-mode countdown remains deadline-based: it does not pause with inactivity, and still submits on expiry. Starting/stopping/resetting that countdown does not reset accumulated practice time. Stop measurement at submission or the countdown deadline; post-submission feedback review is not added to that attempt’s recorded time. The four-hour tracking rule continues to exclude early repeats from history/statistics.

New result fields are `engagedSeconds` (whole accumulated seconds, rounded down) and `practiceMeasuredFrom` (UTC timestamp of the first measured interval). Retain existing `seconds` (elapsed since the timer origin) and `totalSeconds` (elapsed since starting) for compatibility. History, result banners and overall/weekly practice minutes use `engagedSeconds` when available and otherwise the older elapsed `seconds`. Label older history rows “Elapsed (older record)” so their basis is explicit. An unfinished legacy activity begins measurement when first displayed under the new code; do not guess engagement before `practiceMeasuredFrom`. Historical completed results remain unchanged. CSV and JSON exports preserve these fields; import validates nonnegative whole engaged seconds and a plausible measurement interval.

## Revision priority calculation and colours

The selector offers **Topic / programming focus** and **Exam subtopic**. Include every available area from the relevant question banks, including areas with no recorded evidence. History filters (type, focus and local date range) also apply to this display; missing evidence means no qualifying evidence within those filters.

For each area independently, select its latest five eligible detailed attempts with nonzero independent first-response marks for that area. Assisted-only visits do not displace independent evidence. Topic scores count each part once. Subtopic scores divide each part’s earned and available marks equally across its distinct reporting references; parent subtopics aggregate matching descendant shares. Multiple links to the same reference do not multiply credit. Divide summed earned marks by summed available marks; do not average per-attempt percentages or add child totals to parent totals. Programming uses its named focus, because its tags are not authored part-level CA mappings.

This replaces the old rule that every subtopic used its parent topic’s latest-five window. A subtopic now retains its own latest relevant evidence, which can become stale rather than disappearing when other subtopics are practised.

| Evidence state | Display | Required annotation / meaning |
| --- | --- | --- |
| No qualifying detailed independent evidence | Grey (`#e6e6e6`) mixed with 10% dominant theme colour (`--main`), “No score” | “missing data, please practice this area to assess revision priority” |
| Latest qualifying practice more than 15 × 24 hours ago | Icy blue with a visible frost-like line texture; retain score | “stale data, revise this area soon to check if you still have the skills!” |
| Fresh score below 45% | Red | High revision priority |
| Fresh score at least 45% and below 65% | Amber | Developing skills |
| Fresh score at least 65% | Green | Secure skills |

Stale display takes precedence over RAG when a score exists. Exactly 15 days old is still fresh; only a greater elapsed time is stale. Show the last qualifying practice date, contributing attempt count and assessed marks with scored rows. Thresholds use the unrounded percentage. The priority list truncates the displayed whole percentage so a value below a threshold does not appear to cross it through rounding. Colour always has a text label; missing data is distinct from a recorded 0% result.

Selected/unmarked question answers use amber; correct and incorrect feedback use green and red. Mix these semantic background/border colours with `--surface`, the default selectable surface, rather than the dominant `--main` theme colour. Progress highlights instead mix 90% of their semantic base colours with 10% dominant `--main` colour: red, amber and green fills/borders, plus the icy blue fill, border and texture lines. Their text colours and the texture geometry remain unchanged. The [theming guide](theming.md) records the exact CSS tokens and blend proportions.

## Automatically recommended exam revision

Display three generated Core exam question-set codes together, above the full revision-priority list. Each code opens the exact set and permutations shown. Use the selected profile’s complete history for recommendation ranking, independent of display filters.

Order candidate subtopics as follows:

1. Missing independent evidence.
2. Fresh results, weakest score first.
3. Stale evidence, weakest recorded score first.

Within equal scores, older practice precedes newer practice; reference order breaks remaining ties. A fresh green area therefore precedes a stale area under the requested category order. Select whole exam sets using existing subtopic matching and composition rules; a set can also cover other subtopics. Codes in a batch must have distinct question/variation identities and respect the four-hour tracked-repeat rule.

Persist the three codes for that profile across reloads and navigation. Mark a recommendation completed when a matching tracked result is recorded at or after batch creation. Keep the batch until all three are complete. Then display “good job on completing some recommended revision! see what’s next...” and automatically generate the next three using the updated evidence. This reconciliation runs when My progress is displayed. If three eligible sets cannot be generated, retain any existing batch and show the unavailable state when no batch exists; do not fabricate codes.

## Weekly statistics and trends

My progress includes an overall filtered summary, a weekly section, recommendations, the priority list and dated activity history. Weekly statistics obey the same type/focus/date filters as the history table; label this explicitly. They count **tracked completions**, including assisted, timed-out and puzzle results, but exclude early untracked repeats. Each eligible completion counts once, including later eligible attempts at the same set.

Use the student’s local calendar, **Monday 00:00 to the following Monday 00:00**. Use calendar arithmetic across daylight-saving changes. Assign attempts by their completion timestamp; exclude future-dated records from weekly calculations.

Show for the current week so far:

- Question sets completed.
- Average final percentage: calculate `(earned marks / available marks) × 100` for each set, then take the arithmetic mean with every set weighted equally. Round only the displayed mean to a whole percentage, not each component percentage. Use the recorded percentage only if exact marks are unavailable in legacy data. For example, 1/2 and 9/10 give (50% + 90%) / 2 = 70%; do not pool marks into 10/12. This is different from the mark-weighted independent first-response revision score.
- Number of distinct local days with tracked practice.
- Minutes practised this week so far and in the previous Monday–Sunday week, shown together. Both use the selected filters and the same engaged-time/legacy fallback as the weekly table; sum seconds before rounding to whole minutes.

Show a small chart of average final score per set for the **last eight calendar weeks**, oldest to newest, including the current incomplete week. Use a common 0–100% scale and visible dates/values. A week with no records shows a dash and no bar, not a zero score; a recorded 0% week shows 0%. Provide an equivalent accessible table with week-start date, completion count, average score, practice days and total practice minutes (estimated engaged time for measured records, elapsed time for older records).

When both the current and previous week contain records, report the rounded percentage-point difference in average score, explicitly comparing “so far this week” with last week. Otherwise encourage completing tracked sets to build a trend. State that final scores include retries and that topic/difficulty differences can affect the trend; this is practice feedback, not a comparable exam-grade forecast.

## JSON restore, export and validation

**Save backup** and **Restore backup** are the prominent primary controls. Explain that backups keep progress safe and move it between computers. Keep **Export CSV** hidden initially inside a smaller, keyboard-accessible “Spreadsheet options” disclosure beside the backup controls. Its explanation states that CSV is for viewing results in a spreadsheet and backups are for restoring progress. The disclosure does not require a prior backup download.

The main tracking backup downloads as **`tlevel-practice-[username]-[YYYY-MM-DD-HHMMSS].json`**. Use the local export date/time; replace filename-reserved characters in the username with hyphens, retaining the original username inside the file. Its contents remain UTF-8 JSON so restoration retains structured records. The file picker accepts `.json` backups and JSON-formatted `.txt` backups; changing the extension does not change validation or profile selection. CSV remains a separate spreadsheet export with a `.csv` extension.

JSON backups embed the selected **username** and retain recorded history, `partScores`, code-format/release metadata, recent-practice dates and archived metadata. They do not export the whole local profile registry, current active work or recommendation batch. CSV is for spreadsheet viewing and includes a quoted JSON `partScores` column; full restoration uses JSON.

A named backup automatically selects its named profile after validation, creating the profile if necessary. Case/spacing-equivalent names reuse the existing canonical name; do not silently fuzzy-match a backup into a differently spelled profile. Merge against the target profile’s history, not the previously selected profile. Preserve both profiles’ other local data. An older backup without a username restores into the currently selected profile.

Validate before profile switching or history writes: supported schema/code format; username when present; valid question identities, dates, marks, outcomes, references and totals; part attribution; written-review data and practice dates. Current limits are 5 MB per file and 10,000 imported history rows. Reject malformed records and unsupported formats. An attempt ID with identical data is a duplicate to skip; conflicting data for the same ID aborts the import without overwriting. Preserve legacy records without detailed scores. Render imported strings as text, and protect CSV cells from spreadsheet formula interpretation.

After a successful differently named restore, update the remembered profile, header and last tracked date, reset history filters, show that profile’s progress, and display a status message such as “Switched to [username], the profile named in this backup. [N] results restored; [N] duplicates skipped.” Also show duplicate/result counts for same-profile restores. Do not require the student to switch manually first. Invalid backups do not switch profiles. If browser storage fails, show the failure rather than claiming successful restoration.

## Remaining limitations

Profiles are local and visible to anyone using this browser. JSON backup/restore and CSV export are implemented; CSV import, direct OneDrive sync, a last-export-date display and a confirmed local-history reset are not implemented. These remain separate backlog requirements, not implied features of this specification update. Existing unrestricted theme adjustments can affect contrast; this update does not add a contrast-correction system.
