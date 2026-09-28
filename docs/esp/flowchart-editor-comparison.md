# Task 3 interactive flowchart editor comparison

28 September 2026. Primary-documentation review, not a tested integration. Supersedes the shorter tooling shortlist in [Tasks3–4 review](tasks-3-4-design-review.md). Task3 is now the active priority; Task1 formula implementation remains pending for later in-site teacher review.

## Recommendation

**maxGraph is a reasonable first choice for small/medium conventional flowcharts in this site.** It supplies diagram manipulation; we would assemble a deliberately small activity interface and separate assessment logic. Prototype one make and one repair activity before committing the whole Task3 bank. For starter questions, begin with6–8 nodes; also check a15–20-node chart to establish practical usability beyond the initial cases. These sizes are proposed checks, not library limits or measured benchmarks.

The required palette is start/end, input/output, process, decision and subprogram. Preserve conventional shapes and labelled Yes/No branches. Students should be able to drag blocks, reconnect arrows, change bounded conditions and trace their result. Save operational identities and edges independently of layout so moving a box does not alter its marks.

## Options

| Option | Editing and standard shapes | What we must add / trade-off | Assessment fit |
| --- | --- | --- | --- |
| **maxGraph** | Built-in rectangles, ellipses and diamonds; custom XML stencils cover input/output and subprogram symbols. Drag connections, routed arrows, labels, undo/redo, zoom and layout are documented. | Assemble a small palette/toolbar and activity controls. Fits vanilla JS and the existing bundler. Apache2.0. Test keyboard connection editing, touch and screen-reader use explicitly; shortcuts alone are insufficient. | Direct access to the graph model makes bounded operations and labelled branches practical. Best initial fit for tightly integrated, self-marking activities. |
| **draw.io embed** | Complete familiar editor, flowchart library, shape/connector editing and editor controls. Host exchanges XML using the documented iframe messaging API. | Least general editor UI to assemble. Restrict the available tools and map saved diagram objects to our question model. Official hosted embed depends on external availability; saved diagrams must still enter our local progress lifecycle. | Strong for open construction and later review. Possible for automatic marking, but metadata preservation and free-form XML interpretation need a prototype. Not inherently unmarkable. |
| **JointJS / JointJS+** | SVG diagram library, standard/custom shapes, editable links/ports/labels and JSON persistence. Framework-agnostic. | Free core is MPL2.0. Ready-made UI plugins such as the draggable Stencil palette are in the commercial extension; otherwise assemble a small palette ourselves. Check exact core/plugin boundaries before adopting examples. | Strong direct graph model and fine-grained interaction control. Closest alternative to maxGraph, especially if its SVG model or tooling proves easier to maintain. |
| **React Flow** | Interactive custom nodes and edges, with shape rendering supplied as custom components. Documented keyboard and screen-reader support; the polished Shapes example is a Pro example, not a mandatory paid runtime feature. | Introduces React into a site that currently has none. We supply conventional symbols, palette and educational controls. Core is MIT; some ready-made examples/support are paid. | Strong option if its accessible interaction wins the prototype comparison. Good structured node/edge data, but adds a framework integration boundary. |

Fit judgements above are inferences from the documented APIs and the current repository, not measurements of development hours, download size or performance. No claim that any library automatically meets the site's accessibility requirements.

## maxGraph capability check

Official documentation confirms SVG shapes, custom stencils, drag/drop, connection editing, routed edges, labels, keyboard shortcuts, undo/redo, layouts, model events and XML persistence. Built-in primitives plus two small authored stencils can provide our conventional five-symbol palette. This reuses a diagram engine; it does not require writing connector geometry, selection or dragging from scratch. [Feature documentation](https://maxgraph.github.io/maxGraph/docs/intro/).

The current website includes development changes, so choose a released package and use its corresponding documentation when implementing. The project's old mxGraph issue list is explicitly historical; neither treat those issues as current maxGraph defects nor assume them all resolved. [Documentation/version note](https://maxgraph.github.io/maxGraph/docs/intro/), [known-issues guidance](https://maxgraph.github.io/maxGraph/docs/known-issues/).

## What all choices still require

The editor does not know whether a student's algorithm solves the problem. Keep our activity model small: operation ID and parameters per block, source/branch/destination per connection, and separate visual positions. Use component/connection checks plus bounded traces for supplied valid, invalid and boundary inputs. Accept equivalent supported control flow and ignore layout for scoring. Do not grade by screenshot or exact XML equality.

Students need a keyboard alternative for creating/reconnecting edges, such as source/branch/destination selectors synchronized with the picture. Test the full activity at200% zoom and on touch. Save drafts before timer submission and preserve graph state through reload/backup. These are product requirements whichever engine is chosen.

Suggested prototype: (1) construct an inclusive-range validation loop; (2) repair a loop that repeats the condition without reading new input, then trace invalid→valid input. Give each an independent starting state. Use the same small graph model for both. Prove save/reload, undo, meaningful feedback, alternative valid layout and keyboard use before expanding to medium charts or more questions. Keep runtime integration buildable at each boundary; load the editor only for flowchart activities.

## Primary references retained for reuse

Checked28September2026; no library installed or benchmark performed.

- maxGraph: [features](https://maxgraph.github.io/maxGraph/docs/intro/), [installation/licence](https://maxgraph.github.io/maxGraph/docs/getting-started/), [shape API](https://maxgraph.github.io/maxGraph/api-docs/). API lists rectangle, ellipse and rhombus primitives; stencils add other symbols.
- draw.io: [editor embedding API](https://www.drawio.com/docs/reference/embed-mode/), [configuration](https://www.drawio.com/docs/reference/configure-diagram-editor/), [shape-library parameters](https://www.drawio.com/docs/reference/supported-url-parameters/). Embed supports load/save/autosave XML messages; configurable libraries include flowchart.
- JointJS: [core repository/features/licence](https://github.com/clientIO/joint), [standard shapes](https://docs.jointjs.com/learn/features/ready-to-use-shapes/standard/), [Stencil API](https://docs.jointjs.com/api/ui/Stencil/), [commercial-extension distinction](https://docs.jointjs.com/), [licensing](https://www.jointjs.com/license).
- React Flow: [repository/licence](https://github.com/xyflow/xyflow), [custom nodes](https://reactflow.dev/learn/customization/custom-nodes), [Shapes Pro example](https://reactflow.dev/examples/nodes/shapes), [accessibility](https://reactflow.dev/learn/advanced-use/accessibility).

## Adopted decision — 28 September

Use **maxGraph with vanilla JavaScript**, bundled for the existing static site; no React or backend. The teacher prioritises conventional shapes, simple connections/labels, low maintenance and inspectable automatic marking. maxGraph supplies the editing mechanics while a small adapter stores operation IDs, parameters and labelled edges separately from layout. Pin the package version; use its standard primitives/stencils and existing editing controls rather than maintaining a bespoke drawing engine.

First Task3 implementation boundary: one construction and one repair question using start/end, input/output, process, decision and subprogram shapes; drag/connect/label, undo/reset/delete and keyboard connection controls. Verify model inspection, marking of equivalent layouts, save/reload and zoom/touch usability before adding more questions. Library integration is planned, not yet installed. Task1 formula activities are the currently authorised implementation slice.
