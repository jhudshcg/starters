# Maths framework adoption: reuse review

14 October 2026. The teacher confirmed **full SvelteKit/Svelte, Tailwind, daisyUI and Bits UI adoption**, including semantic classes, token mapping and Bits UI controls. That target is adopted in the [migration brief](../../T_LEVEL_REFACTOR_AGENT_GUIDE.md). The implementation recommendations below are for architectural discussion; no migration has started.

## Evidence and scope

Reviewed `/Users/joehudson/Dev/Maths/practice-gcse-maths` at commit `6ac4e021f51b13edcf55ff8c6f59fd656733d00c` (13 October), with a clean working tree. Links below refer to that local checkout. Read its AGENTS, framework and efficient-development skills, architecture/development guidance, implementation, verification runner and migration history. Compared those with this app's [current ownership](../application-architecture.md), requirements and production pipeline.

Maths's [package manifest](/Users/joehudson/Dev/Maths/practice-gcse-maths/website/package.json) pins SvelteKit 3.0.0, Svelte 5.57.1, Tailwind 4.3.3, daisyUI 5.7.47 and Bits UI 2.19.4. These are observed repository versions, not a claim about current releases. Resolve compatible versions and supported APIs when implementing. This was source review: no fresh Maths build, browser run or accessibility certification. Historical verification remains historical evidence.

## What to reuse

### Static SvelteKit routes and explicit ownership

Maths uses the static adapter, prerendered routes and base-aware links/assets. Its installed Kit configuration is in [vite.config.js](/Users/joehudson/Dev/Maths/practice-gcse-maths/website/vite.config.js); do not introduce configuration copied from a different Kit version. The root layout supplies the theme controller through context. Browser storage is opened after mount. Topic routes enumerate valid static entries; build-time home data does not imply a runtime server.

Reuse this separation:

- Domain modules calculate questions, codes, marking and progress without Svelte or DOM dependencies.
- An application session exposes commands and subscribable view snapshots; persistence, time, randomness and identifiers are supplied explicitly.
- Svelte components render those views, own temporary form/display state and call commands.
- Adapters own browser storage, linked files, browser events and portable players.

The concrete examples are [session.mjs](/Users/joehudson/Dev/Maths/practice-gcse-maths/website/src/lib/application/session.mjs) and [TopicPractice.svelte](/Users/joehudson/Dev/Maths/practice-gcse-maths/website/src/lib/components/practice/TopicPractice.svelte). The session copies mutable attempt/view data when publishing; it does not deep-clone every authored bank. Components use `$state.raw` for session snapshots and external handles, explicit props/callbacks, and derived display values.

TopicPractice starts asynchronous loading inside a synchronous mount callback, rejects results after disposal, and returns subscription/timer/autosave cleanup. Reuse that lifecycle discipline. Its large session and route component are not size or granularity targets. Our recent extraction separates responsibilities, but `practice-controller.js` still mixes actions with DOM bindings; wrapping it wholesale in one Svelte component would leave much of the maintainability problem intact.

### Semantic Tailwind and daisyUI integration

Maths's [app.css](/Users/joehudson/Dev/Maths/practice-gcse-maths/website/src/lib/styles/app.css) imports Tailwind theme/utilities without Preflight, selects daisyUI foundations and disables built-in daisyUI themes. [controls.css](/Users/joehudson/Dev/Maths/practice-gcse-maths/website/src/lib/styles/controls.css) composes buttons, fields, cards and progress into semantic classes. Component markup stays readable; reusable variants have names. Ordinary CSS remains where clearer, including complex geometry and gradients.

Reuse the approach throughout the app, rather than leaving most controls on a parallel legacy styling system. Start with shared action buttons, inputs, textareas, selects, cards, dialogs, popovers and progress indicators. Tailwind should also compose recurring layout and responsive rules. Avoid wholesale resets that silently change accepted typography or native control geometry.

Keep this app's theme tokens authoritative. A single [mapping layer, as in Maths](/Users/joehudson/Dev/Maths/practice-gcse-maths/website/src/lib/styles/theme-mapping.css), connects them to daisyUI's semantic colours, radii and borders. Preserve all eight palettes, adjustments, mode persistence, feedback colours and opaque layered gradient borders. Copy the mapping pattern, not Maths's default palette or storage namespace. Portalled controls must inherit the root theme and shared classes without depending on their former DOM ancestry.

Maths centralises viewport/container thresholds in [breakpoints.css](/Users/joehudson/Dev/Maths/practice-gcse-maths/website/src/lib/styles/breakpoints.css), with CSS tokens available to JavaScript consumers. Reuse 440/768/1024px and named component thresholds where justified. Preserve our explicit **<=440px** edge-to-edge question-card rule: the ordinary `max-` convention uses **<**, so mechanical substitution would change the boundary. Maths's specialised progress/reference/container sizes are not general defaults.

### Bits UI controls with deliberate focus behaviour

Maths uses real Dialog, Popover and Select primitives. [ThemeControls](/Users/joehudson/Dev/Maths/practice-gcse-maths/website/src/lib/components/ui/ThemeControls.svelte) and [SiteHeader](/Users/joehudson/Dev/Maths/practice-gcse-maths/website/src/lib/components/ui/SiteHeader.svelte) demonstrate controlled open state, portals, collision handling and shared semantic styling. [ProfileDialog](/Users/joehudson/Dev/Maths/practice-gcse-maths/website/src/lib/components/ui/ProfileDialog.svelte) demonstrates titles/descriptions and explicit focus return. Reuse these structures for theme/menu controls, profile switching and confirmations; keep native fields and disclosures where they already suit the interaction.

Adapt cancellation and focus to our requirements. The initial profile prompt cannot simply inherit Maths's unconditional Cancel action. Leaving an unfinished attempt, Escape/backdrop cancellation and browser Back must retain Keep working semantics. Navigation heading focus remains an existing presentation finding, not something this review silently fixes. Preserve this app's header geometry: three controls stay on the first row at 360px, and the one-line subject subtitle continues below them. Maths's measured header layout is not a replacement specification.

### Portable puzzle wrappers

[PuzzlePlayer.svelte](/Users/joehudson/Dev/Maths/practice-gcse-maths/website/src/lib/components/puzzles/PuzzlePlayer.svelte) mounts the shared player into a dedicated element, passes callbacks, restores serialisable state and destroys the player on unmount. The [puzzles route](/Users/joehudson/Dev/Maths/practice-gcse-maths/website/src/routes/puzzles.html/+page.svelte) uses history snapshots for board working and distinguishes Back restoration from fresh navigation.

Reuse the wrapper and restoration patterns with our existing [package boundary](../../packages/puzzles/ARCHITECTURE.md). Svelte must not also render the player-owned subtree. Retain parent-owned submission, marking, review, assistance and Go timing. Check vendored differences before transferring code; do not overwrite the authoritative package with Maths's copy. Its inherited vendor README contains older integration wording and is not evidence of current wrapper behaviour.

## Differences that must survive migration

| Area | Required adaptation |
| --- | --- |
| Routing/history | Give SvelteKit sole ownership of navigation; replace the old history listener rather than running both. Design compatibility for existing hash/share links, exact set codes, guarded Back/Forward and same-profile/generation attempt snapshots. Keep two-hour fresh-entry selection recall separate from history restoration. |
| Profiles and files | Maths explicitly waived older progress migration; we have no such waiver. Preserve keys, UUIDs, generations, old backups, merge/conflict rules and serial OneDrive writes. Await pending saves at ownership handover; ordinary pagehide is not application destruction. |
| Assistance and timers | Maths method-reference assistance rules do not transfer. Our general Python introductions remain unassisted; specific hints retain their rules. Preserve first-response evidence, repeat eligibility and persisted timer deadlines. |
| Banks and home | Maths practice currently loads all registered topic banks together. Keep our packed, lazy-loaded bank contract and Core/ESP distinction. Home entry still shows no practice set until a focus is chosen, subject to recall. |
| Production output | Retain identity/search/hint validation, code compatibility, packed bank loading, hashed assets, subpath support and engine/source/licence assets. Static adapter output alone does not supply these features. |
| Git/Pages | Maths's pre-commit hook builds its working tree. Keep our stronger staged-snapshot build contract in `scripts/pre-commit-build.mjs`. Pages currently deploys committed output; it does not run verification. |

These are preserved product/build contracts, not reasons to weaken framework adoption. The authoritative detail stays in the existing specifications and [application ownership map](../application-architecture.md).

## Proposed migration shape

Discuss these boundaries before implementation:

1. **Tooling, routes and baseline.** Establish static Kit output and the bank build integration; verify root and project-subpath hosting. Agree finite public routes plus a legacy hash-link adapter, with dynamic set codes represented in URLs rather than prerendering every set. Capture current representative behaviour/visuals, including recent header changes. Choose one navigation owner and the lifetime of the shared profile/file session.
2. **Shared shell and controls.** Migrate header/footer, theme controller, token mapping, semantic control styles and Bits UI dialogs/popovers together. Replace home/static views with Svelte components. Do not leave legacy listeners controlling migrated elements.
3. **Practice flows.** Separate DOM bindings from application commands; migrate focus entry, question rendering, answers, submission/review and portable puzzle wrappers in coherent flows. Keep domain modules and identity data. Bind and dispose timers and subscriptions explicitly.
4. **Progress and transfer.** Migrate display filters and profile/file status onto the same application session. Verify restoration, file failures, queued saves and profile isolation.
5. **Retire and verify.** Remove replaced renderers/listeners/styles and reconcile documentation/build hooks. Update tests that assert obsolete markup while preserving meaningful behaviour and packaging assertions. Avoid leaving two runtimes or two authored copies of banks.

Suggested component boundaries follow existing responsibilities: `entry-pages.js` → home/search/information routes; `activity-view.js` and `question-view.js` → practice/question/answer components; `progress-page.js` → progress views; `theme.js` → preference controller plus Bits UI controls. `profile-session.js` remains the ownership reference for persistence. This is a responsibility map, not a requirement to create one component for every existing file.

Share code between apps only where both have a stable contract. The puzzle package already qualifies. Adapt focused shell/control patterns first; avoid creating a generic application framework around different progress and assessment rules.

## Verification and definition of done

Reuse the mechanism in [verify-changed.mjs](/Users/joehudson/Dev/Maths/practice-gcse-maths/website/scripts/verify-changed.mjs) and its [job map](/Users/joehudson/Dev/Maths/practice-gcse-maths/website/scripts/verification/plan.mjs): deterministic affected checks, content fingerprints, successful-result caching, tool/environment identity and build-output invalidation. Write a T-Level dependency map; copying Maths's path rules would miss our banks/packages. Keep watching opt-in and do not repeat unchanged expensive checks.

Maths combines injected domain/session tests, Svelte diagnostics/formatting and isolated browser checks against static output. Its [browser support](/Users/joehudson/Dev/Maths/practice-gcse-maths/website/scripts/browser/support.mjs) serves real files without an SPA fallback, exposing missing prerendered routes. Reuse isolated profiles, controlled clocks and targeted keyboard/touch/accessibility checks. Its JavaScript configuration has `checkJs: false`; Svelte diagnostics do not establish full JavaScript type safety.

Completion means actual use of all four layers: Svelte components own rendering/events; Kit owns routes/static output; Tailwind composes recurring layout/styles; daisyUI supplies shared foundations mapped to existing tokens; Bits UI supplies appropriate interactive controls. Package installation or a handful of isolated examples is insufficient. Maths's development log records an early incomplete integration followed by broader semantic-control adoption; use that lesson as an acceptance criterion.

Verify preserved progress/backups and codes, initial entry/recall, guarded navigation, submissions/assistance/deadlines, puzzle/Go state, file queues and repeated mount/disposal. Check all themes and representative adjustments, 360px header/home layout, 440/441px question borders, larger breakpoints and zoom. Verify direct URLs and asset loading under the production subpath, staged builds and required distribution assets. Record actual checks and limits; do not equate automated checks with physical-device or complete accessibility coverage.

The earlier heading-focus and small-code-text findings remain separate pending decisions. This review neither repairs them nor completes the broader project-refactor-checks test-quality stage.
