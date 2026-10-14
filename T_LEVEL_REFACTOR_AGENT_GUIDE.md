# T-Level starter: framework refactoring brief

The starter has migrated from plain HTML, CSS and JavaScript to **SvelteKit/Svelte, Tailwind CSS, daisyUI and Bits UI**, drawing on the Maths project’s experience and this repository’s needs.

**Target confirmed 14 October 2026:** full adoption, including semantic classes, theme-token mapping and Bits UI controls. See the [Maths implementation review](docs/reviews/2026-10-14-maths-framework-reuse.md) for reusable patterns and necessary adaptations. The teacher subsequently authorised implementation (“ok, proceed”). See [application ownership](docs/application-architecture.md) for the implemented boundaries and build, and the development log for verification. The requirements below remain the maintenance contract.

The live production site will remain static with no server for dynamic content or saving state, for the time being. The motivation for this move is to standardise tooling across different related apps and allow components/modules developed in one to be repurposed or reused in another. There will also come a point where serverside features are added, so this is prep for that too.  

The immediate aim is simpler, reusable UI code with clear ownership of state, behaviour and styling. Preserve accepted content, user flows, saved data and the existing visual identity and themes. Choose the architecture and migration sequence that best achieve that; the Maths implementation is a reference, not a template to copy wholesale.

## Role of each framework

- **SvelteKit/Svelte** owns routing, component rendering, reactive state and UI events, using static prerendering for GitHub Pages. Extract reusable components where there is a useful boundary; keep domain logic independent of the UI where practical. Preserve existing incoming links, browser-history behaviour and deployment subpaths when designing the routes.
- **Tailwind CSS** provides styling utilities and composition. Use it to simplify recurring layout and styling, with readable semantic classes where they help.
- **daisyUI** provides consistent component foundations. Integrate those with the existing theme tokens and design rather than inheriting a new visual identity unintentionally.
- **Bits UI** provides accessible interaction primitives such as dialogs and popovers. It is headless: the app must supply their visual styling. Native controls remain appropriate for simple interactions.

Use all four meaningfully to the fullest useful extent, with latest compatible versions and supported APIs. Installing packages alone does not constitute adoption. Exercise judgment about which existing code to retain, adapt or replace.

HTML must remain clean with semantic css class attributes, i.e. no class salad. Compose utility classes into semantic names for reused elements and components, using css tokens and/or the features Tailwind and daisyUI provides for this purpose. Readability and maintainability is key.

## General process

Understand the current app, persistence, themes and deployment first. Establish representative behaviour and visual baselines, then introduce the tooling and migrate coherent flows incrementally. Keep each step reviewable and avoid maintaining two competing implementations after a replacement is verified.

Validate the main flows, saved-data continuity, responsive layout, themes and keyboard/touch interactions against the baseline. Check the production build and hosting paths too. Keep verification focused on affected behaviour and record actual evidence and remaining limits.

Finish with a clear architecture, documented development/build commands and a concise handoff. Explain consequential tradeoffs; use the repository's conventions and your judgment for routine choices. Deployment is separate from this refactoring task.
