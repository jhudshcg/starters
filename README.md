# Start here · DSD starters pilot

A static, self-marking starter app for year 1 Digital Software Development T Level students. Curriculum content is treated as **Core version 1.1**, as confirmed by the teacher; older version labels in the reference file are stale.

## Try it

Run this command from the project folder:

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Open [the local preview](http://127.0.0.1:8765) in VS Code's integrated browser or your usual browser. Use an HTTP server rather than opening index.html directly: the app uses browser modules. No install or build step is needed for the app.

The preview server started during development may already be running; use the link before starting another server. Keeping the same host and port preserves the same browser storage. VS Code and your usual browser can have separate storage; use a backup to transfer results.

Example codes (case-sensitive):

| Type | Untimed code | Direct link |
| --- | --- | --- |
| Number grids | `AgAAAR_4` | [Try puzzles](http://127.0.0.1:8765/#set=AgAAAR_4) |
| Operators | `AoAAAQAQ` | [Try exam practice](http://127.0.0.1:8765/#set=AoAAAQAQ) |
| Iteration | `AwAAAR_4` | [Try programming](http://127.0.0.1:8765/#set=AwAAAR_4) |

New puzzle sets:

| Focus | Code | Direct link |
| --- | --- | --- |
| Logic deductions | `AgDABx_4` | [Order jobs and assign devices](http://127.0.0.1:8765/#set=AgDABx_4) |
| Shapes | `AgEgCx_4` | [Reflect shapes and combine masks](http://127.0.0.1:8765/#set=AgEgCx_4) |
| Paths | `AgGADh_4` | [Build routes with constraints](http://127.0.0.1:8765/#set=AgGADh_4) |
| Spatial reasoning | `AgHgER_4` | [Combined transformations and robot movement](http://127.0.0.1:8765/#set=AgHgER_4) |

Append `A` for a ten-minute countdown, for example `AwAAAR_4A`. Timer characters are `5`–`9`, `A`–`F` for 5–15 minutes. You can also start a timer on the activity page. Individual question codes are displayed on question cards and accepted on the home page, for example `PY-1-0-0`.

## What to test

1. Try each activity type. Show hint stays visible; open Check / show answer for checking and model answers. The panel encourages students to submit their best attempt first. After submission, the score appears beside Submit as well as at the top.
2. Copy a set code and open it in another browser. The questions, order and values should match.
3. Get a new permutation: the questions remain, their values change. Get a new question set: the focus changes. Programming and puzzles also offer a different pair within the same focus.
4. Start a timer, enter an answer and refresh. Both answers and the deadline should survive. At expiry, answers submit once.
5. Submit an activity and visit My progress. Test type/focus/date filters, the history table and revision priorities.
6. Export CSV for a spreadsheet. Save a JSON backup, restore it in a different browser, then import it again: duplicate results should be skipped.
7. Use keyboard navigation and high zoom. Spatial puzzle cells are directly clickable. Selections are warm yellow, not green. Logic, shape and path controls work by click and keyboard; dragging is not required.

## Pilot content and limits

27 active question templates, five variations each (135 active variations). Three earlier spatial templates remain available through old codes only (30 stored templates / 150 stored variations):

- Puzzles: number grids, multi-step spatial reasoning, logic deductions, shape painting and path construction. Two questions per set; six or eight points depending on focus.
- Exam practice: CA2.4 operators and CA2.8 validation; three questions, 15 marks per set.
- Programming: iteration and selection; two questions, 12 marks per set.

This is a working pilot, not complete Core coverage. Questions still need teacher review and student timing trials. Text marking uses explicit accepted terms and selected misspellings, not general sentence understanding. Python tasks use constrained answers; student code is not executed. Runtime Python execution, more puzzle families, full coverage mapping and CSV import remain later work. JSON backup/restore supplies transfer between browsers for this pilot.

Progress is local, not connected to student accounts. Use one active activity per browser profile. Final scores include changes after checking; revision priorities use first responses, excluding questions assisted before their first check. Abandoned drafts are replaced and are not counted as completed results. This pilot records first-response evidence by question rather than by part. It does not provide a formal assessment grade.

## Development checks

Requires Node.js with built-in test support; Python 3 runs the reference-code checks.

```sh
node --test tests/*.test.js
node scripts/validate.js
```

On this workstation, Node is available at `/opt/homebrew/bin/node` if it is absent from the shell PATH.

`scripts/browser-smoke.mjs` exercises the running site using an isolated Chrome debugging session on port 9227. It clears **test-profile** app storage; never point it at a real student browser profile. Node 22 or later is needed for its built-in WebSocket client. Prefer VS Code's integrated browser for manual previews; the current tool session could not automate that browser.

## Hosting and files

Serve this folder as a static site; all asset references are relative, and navigation uses URL fragments for compatibility with GitHub Pages project sites. No external services, CDN assets, fonts or runtime libraries are required. Public deployment has not been performed.

Question files are in `data/`; shared logic is in `js/`; shared CSS is in `css/`. [Specifications and plan](docs/README.md) describe the broader project. Published question slots and variation meanings must remain stable within a bank version. Bank version 1 is the pilot baseline; the codec reserves seven bits for bank versions and uses eight Base64url characters plus the optional timer suffix.
