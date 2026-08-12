# Projects and project-detail high-fidelity design

## 1. Purpose and scope

PT-22 defines the approved high-fidelity design for:

- `/projects`;
- `/projects/:project-slug`;
- project previews;
- complete and concise project-detail experiences;
- technical case-study evidence;
- responsive behaviour;
- interaction states;
- public-evidence availability; and
- accessibility and content-resilience expectations.

Projects are the portfolio's main source of concrete technical evidence. The Projects index helps visitors discover and compare relevant work, while project detail provides progressive depth through:

```text
context
→ ownership
→ constraints
→ decisions
→ trade-offs
→ implementation
→ quality
→ outcome
→ lessons
→ evidence
```

PT-22 documents design. It does not implement Astro, React, TypeScript, CSS, content schemas, production components, assets, tests or motion.

## 2. Canonical editable design source

[Open the approved PT-22 design in Penpot](https://design.penpot.app/?_gl=1*12fwxa4*_gcl_au*MTA2MzA0OTkyOS4xNzg2MTAyMzU3Li0uLS4xNzg2MTE0ODc5LjExMDA1ODgzNDcuMTc4NjExNDg4MC4xNzg2MTE0OTUz*_ga*NjEwMzg5ODk0LjE3ODYxMDIzNTc.*_ga_K0KF97C51Q*czE3ODYxMTQ0MTMkbzIkZzEkdDE3ODYxMTUxODYkajQ3JGwwJGgw#/workspace?team-id=81f57451-85cc-819d-8008-7273b4e9b9c5&file-id=81f57451-85cc-819d-8008-762cda1b22f8&page-id=6e0a7da9-2dab-8004-8008-77bd681e49cd&layout=layers&board-id=6e0a7da9-2dab-8004-8008-77c47ef05923)

The reviewed source is organised as follows:

```text
Portfolio — Product Design
├── 03 — Projects index responsive
├── 04 — Project detail responsive
├── 05 — Project variants & evidence
└── 06 — Projects states & annotations
```

Penpot is the canonical editable visual source. This Markdown document is authoritative for implementation-facing decisions and keeps the design understandable when Penpot cannot be accessed. Incidental Penpot geometry must not become an implementation contract.

The 320px, 390px, 768px, 1440px and 1728px canvases are representative review contexts, not fixed production breakpoints. No Penpot artwork, exports or intermediate design artefacts are stored in the repository.

## 3. Relationship to prior decisions

PT-22 consumes rather than replaces:

- the [product vision](../product/product-vision.md);
- the [information architecture](../product/information-architecture.md);
- the [content strategy](../product/content-strategy.md);
- the [product success criteria](../product/product-success-criteria.md);
- the [high-level architecture](../architecture/high-level-architecture.md);
- the accepted [architecture decision records](../architecture/decisions/README.md);
- the [design principles and visual direction](design-principles.md);
- the [responsive wireframes](responsive-wireframes.md);
- the [PT-18 design foundations](design-foundations.md);
- the [PT-19 component foundations](component-foundations.md);
- the [PT-20 motion and interaction guidelines](motion-interaction-guidelines.md); and
- the [PT-21 Home design](home-design.md).

PT-22 does not introduce design tokens or component-specific tokens. It does not redefine the shared header, navigation, footer or focus-visible treatment; introduce a project-card animation system or project filters; or create a new React requirement.

## 4. Experience principles

The Projects experience is evidence-led, professional, editorial, technically informed, restrained, accessible, content-first, progressively disclosed and public-safe. Technical material supports the project story rather than becoming its visual identity.

Avoid generic portfolio-card grids, technology-logo walls, oversized technology branding, skill ratings, decorative code, excessive effects, artificial project scores, carousels, hover-only information, excessive sticky navigation, unnecessary tabs or accordions, and a documentation-site presentation detached from the professional narrative.

## 5. Projects index purpose

`/projects` is a curated collection rather than an exhaustive archive. It helps a visitor answer:

1. What is the project?
2. What problem or purpose does it address?
3. What was my role or contribution?
4. Why is it professionally relevant?
5. Which capabilities does it demonstrate?
6. Is deeper public evidence available?
7. Where can I continue?

Introductory content explains why these projects were selected. Filtering, categories, search and sorting are intentionally absent from the MVP because the collection is small and manually curated. They should be introduced only if real project volume makes manual browsing meaningfully difficult.

## 6. Projects index hierarchy

The approved hierarchy is:

```text
Shared header
→ Projects page header
→ collection-selection context
→ curated project previews
→ continuation / supporting context
→ footer
```

The page header communicates selected engineering evidence rather than an exhaustive archive. Projects remain understandable without images or logos.

## 7. Project preview contract

A project preview should normally communicate:

- title;
- concise project context or problem;
- role or contribution;
- professional relevance;
- selected capabilities;
- selected technologies only when useful;
- project status where meaningful;
- public-evidence availability; and
- one clear continuation to project detail.

Technologies remain supporting metadata. The project title, problem, ownership and relevance are more important than technology names. Do not display progress bars, technology scores, proficiency ratings or decorative logo walls.

## 8. Project-card interaction model

A preview is structured content. The whole card must not automatically become one anonymous interactive target. The approved model uses a clear explicit continuation such as **View project →**.

Avoid nested links, competing primary actions, repository, demo and detail buttons competing inside every index card, hover-only actions, and clickable `div` or `span` wrappers. The explicit project-detail action remains the primary continuation from the index.

Repository or demo availability may appear as metadata on the index, while full evidence actions appear in the detail experience where appropriate. Links navigate; buttons change local state. Static project cards do not require React.

## 9. Projects index responsive behaviour

The following widths are representative review canvases, not production breakpoints. Exact production breakpoints remain content-driven implementation decisions.

### Small mobile — 320

This is a stress-test composition. It uses one logical reading column; metadata reflows vertically as needed; the action remains close to project context; no page-level horizontal scrolling occurs; and the content remains understandable without removing information.

### Mobile — 390

This is the canonical mobile hierarchy and source order. Projects read vertically, role and evidence remain visible, each preview has one explicit primary continuation, and touch targets remain comfortable.

### Tablet — 768

This is an intermediate recomposition, not a scaled-down desktop design. Available width may support more efficient metadata grouping while preserving source order and equivalent actions.

### Desktop — 1440

The index uses a more editorial horizontal composition. Project context remains dominant, while role, evidence and primary continuation may occupy a quieter supporting region. The collection remains easy to compare without forcing equal fixed heights.

### Large desktop — 1728

This context introduces neither a new information architecture nor unlimited content width. It preserves the established wide-content constraint, uses extra width primarily as external whitespace and adds no large-screen-only information or interaction.

## 10. Project-detail purpose

`/projects/:project-slug` is the canonical location for complete project information and technical case-study evidence. Its initial region establishes:

1. what the project is;
2. why it matters;
3. my role or ownership;
4. project status where relevant;
5. selected capabilities; and
6. available public evidence.

Only after this orientation should deeper implementation evidence appear.

## 11. Representative project-detail design

The approved full responsive case-study design uses **Portfolio engineering system** as the representative complete example. The portfolio repository can provide genuine public evidence without inventing confidential professional work.

Representative professional case-study titles or structures elsewhere in the design remain provisional design content. They are not automatically approved production claims and must not be turned into final production content without review.

## 12. Project-detail content hierarchy

The designed hierarchy is:

```text
Back to Projects
Project / case-study header
Context / summary
Role
Focus / capabilities
Status
Public evidence actions
Overview
Problem & context
Role & constraints
Key decisions
Trade-offs / alternatives
Implementation approach
Architecture / technical evidence
Accessibility
Testing & quality
Outcome & limitations
Lessons learned
Public evidence
Continuation
Footer
```

Not every project contains every section. This sequence describes available depth rather than a mandatory fixed template.

## 13. Readable narrative vs wide evidence

Ordinary long-form prose remains within the established readable content width. Architecture diagrams, screenshots, tables, selected code excerpts and other technical media may use broader standard or wide regions when the evidence benefits from additional space.

A wide viewport must not make prose excessively wide. Technical evidence must not cause page-level horizontal scrolling.

## 14. Full case study vs concise project entry

### Complete technical case study

When available evidence and project complexity justify the depth, a complete case study may include:

- Overview.
- Problem.
- Context.
- Constraints.
- Role and responsibilities.
- Key decisions.
- Alternatives.
- Trade-offs.
- Implementation.
- Architecture.
- Accessibility.
- Testing and quality.
- Outcomes.
- Limitations.
- Lessons.
- Public evidence.

### Concise project entry

A concise entry may contain only:

```text
Summary
Role
Selected decision
Outcome
Evidence
Continuation
```

Another proportionate subset is valid. Concise does not mean incomplete; it means the project does not require an artificially expanded case study. Projects must not be forced into identical content depth or page height.

## 15. Optional-section behaviour

**Unavailable content disappears cleanly.**

If a project has no repository, live demo, screenshot, diagram, code excerpt, media, detailed architecture section, extended lessons or complete case study, do not display disabled buttons, “coming soon” placeholders, empty media boxes, empty cards or reserved blank sections. The content flow closes naturally around the sections that exist.

## 16. Evidence availability

### Repository + live demo

Both actions may appear when both genuinely exist and have clear, distinct purposes.

### Repository only

Show the repository and omit the live-demo control completely.

### No public repository / demo

The project remains valid if its public-safe narrative provides credible evidence. Do not invent an external source or display disabled controls.

### Internal portfolio evidence

For the portfolio itself, public evidence may include the repository, architecture decisions, design documentation, issue and pull-request history, and testing documentation when implemented. The evidence type should follow what actually helps verify the engineering story.

## 17. Public repository and live-demo actions

Distinguish:

```text
View project →
View repository ↗
Open live demo ↗
```

The symbol supplements the visible label and never replaces understandable text. External behaviour must be semantically appropriate in implementation. External links do not automatically require a new browsing context.

## 18. Decisions and trade-offs

Technical reasoning is presented differently from ordinary prose. A representative decision treatment may contain:

```text
Decision
Why
Alternative
Consequence
```

A representative trade-off treatment may contain:

```text
Benefit
Cost
Trigger / reassessment condition
```

These treatments make reasoning scannable without replacing the surrounding narrative. Not every implementation detail should become a callout.

## 19. Technical evidence

### Code excerpts

- Use the smallest useful public-safe excerpt.
- Identify language or context where relevant.
- Support a specific engineering point.
- Avoid large source dumps.
- Keep the public source repository canonical where one exists.

### Architecture diagrams

- Use a diagram when relationships become easier to understand visually.
- Keep node count proportionate.
- Do not make colour the only carrier of meaning.
- Provide equivalent surrounding textual explanation.

### Tables

Use tables only for genuine structured comparison. Do not force narrative prose into a table. At narrow widths, bounded local overflow is acceptable when reflow would destroy meaning.

### Screenshots / media

Media requires an evidential or explanatory purpose; it is not added merely because a page appears visually empty. Use useful context, a caption where appropriate, confidentiality review and accessible alternative-text requirements in implementation.

### Captions

Captions explain what the visitor should notice and why the evidence matters. They do not simply repeat adjacent text.

## 20. Outcomes and limitations

Outcomes do not require numerical metrics. Use exact metrics only when they are accurate, public, attributable, non-confidential and supported by evidence. Precise qualitative outcomes remain valid.

Present limitations honestly without making a project appear unfinished merely because constraints are acknowledged. Do not invent impact.

## 21. Lessons learned

Lessons remain part of the engineering narrative. They should describe what worked, identify meaningful difficulty, explain what would be reconsidered and surface reusable principles. They must not become generic motivational statements.

## 22. Continuation paths

Every project detail provides at least one meaningful continuation. Approved possibilities include:

```text
← All projects
Related experience →
Next project →
Professional contact →
Public evidence ↗
```

Visitors can return to Projects without relying only on browser Back. Related-project or next-project treatment may be manually curated; it does not introduce algorithmic recommendation infrastructure. Relevant Experience connections link to, rather than duplicate, Experience content.

## 23. Project preview states

The design covers `default`, `hover`, `focus-visible` and `pressed / active`.

### Default

Use a subtle boundary and clear explicit action.

### Hover

A restrained surface or border change may supplement the static affordance. Hover reveals no hidden information and does not require a transform.

### Focus-visible

Focus-visible is immediate, clearly perceivable and distinct from hover. It applies the established PT-18/PT-19 focus treatment and introduces no new focus token.

### Pressed / active

Provide immediate temporary feedback at action level. Pressed feedback must not be confused with a selected or current semantic state.

## 24. Motion

PT-22 consumes PT-20 and defines no new project-motion system. Project previews may use Fast local feedback for border, surface or foreground. A small transform remains optional and requires actual affordance value; the approved design does not require transforms.

Reduced motion retains the useful final state without unnecessary movement. Motion never delays navigation or content access, and static project content remains complete without animation.

## 25. Status, availability and role

These are separate concepts.

### Status

Examples used by the design include:

```text
Active
Completed
Experimental
Representative
```

These are content states, not a speculative application-status taxonomy. Visible wording and structure communicate status; colour alone does not.

### Evidence availability

Evidence availability describes which public resources exist: repository, live demo, public documentation or other approved evidence.

### Role

Role describes contribution or ownership. Examples may include product owner, frontend engineering contribution or collaborative engineering contribution.

Role, maturity and evidence availability must not be merged into one ambiguous badge.

## 26. Representative professional content

PT-22 may use representative content to validate hierarchy, but that content remains provisional. Representative titles, outcomes, responsibilities, metrics and professional examples are not final approved public copy.

Professional evidence must be checked against the content strategy and public-safety rules before publication. Do not infer or invent employer architecture, confidential project names, customer information, internal screenshots, private repositories, internal metrics, proprietary code, sole ownership or unsupported business outcomes.

## 27. Shared navigation and footer

Projects consumes the site-wide navigation and footer language established by PT-19 and PT-21. Projects is the current top-level route on `/projects` and project-detail pages; current state remains semantic and visible.

Do not create a Projects-specific navigation system. Breadcrumbs remain absent unless later real project depth demonstrates a genuine need; the current shallow route hierarchy does not justify them automatically.

## 28. Table of contents

A project-detail table of contents is not currently approved. The representative complete case study remains understandable through strong heading hierarchy and section rhythm. Introduce a local table of contents only if actual production project length demonstrates a meaningful navigation problem. Do not add sticky table-of-contents behaviour speculatively.

## 29. Responsive project detail

The five widths below are representative review contexts, not implementation breakpoints.

### 320

This is the narrow stress-test context. The canonical reading sequence remains linear; metadata and actions stack; decisions and trade-offs reflow vertically; technical diagrams may recompose vertically; and no page-level horizontal scrolling occurs.

### 390

This is the primary mobile reference. It uses one logical narrative in which orientation precedes technical depth.

### 768

This is an intermediate recomposition. It uses horizontal space where useful while preserving source order and avoiding a scaled-desktop treatment.

### 1440

This is the primary desktop reference. The readable narrative remains constrained, while supporting metadata and evidence may take advantage of a wider composition.

### 1728

This context creates no new large-screen information architecture. It preserves the existing wide-content constraints, makes extra viewport width mostly outer whitespace and leaves exact production breakpoints to implementation.

## 30. Content resilience

Implementation must support longer titles and project descriptions, variable role text, missing metadata, different capability counts, browser zoom, text enlargement, reflow, changed professional content, variable case-study depth, absent media and absent public links.

Do not copy fixed Penpot heights into production, assume equal card heights or assume fixed English-only text lengths. Manual line breaking used by design or import tooling is not a production requirement; production relies on natural responsive text flow.

## 31. Accessibility requirements

The experience requires:

- semantic landmarks;
- a logical heading hierarchy;
- correct links-versus-buttons semantics;
- explicit action targets;
- visible keyboard focus;
- predictable focus order;
- no hover-only information;
- project state independent from colour;
- usable touch-target sizing;
- support for text enlargement, zoom and reflow;
- bounded local overflow where necessary;
- technical-evidence alternatives and useful captions;
- media confidentiality review;
- reduced-motion behaviour; and
- equivalent mobile and desktop access.

Interactive targets should normally preserve the established approximately 44–48px usable-area guidance where appropriate. This is not described as a universal WCAG requirement. The design does not establish WCAG conformance; implementation requires automated and manual accessibility validation.

## 32. Reflow and horizontal overflow

Ordinary pages must not require horizontal scrolling. Layouts reduce columns before readable content becomes cramped, long URLs wrap or break safely, and media remains responsive. Wide technical evidence stays inside deliberate containers.

Code and tables may use bounded local horizontal scrolling when necessary. A wide technical element must never expand the whole page.

## 33. Static-first implementation boundary

- Project index content is static by default.
- Project detail content is static by default.
- Project cards do not require React hydration.
- Technical evidence does not require React.
- Responsive layout does not require JavaScript.
- Hover and focus visuals do not require React.
- Normal links provide navigation.
- Browser JavaScript is justified only by a later concrete interaction requirement.

This boundary remains aligned with the high-level architecture and ADR 0001.

## 34. Performance considerations

- Do not load large decorative screenshots.
- Optimise real media.
- Do not add syntax-highlighting or interactive-diagram libraries without need.
- Do not add carousel libraries.
- Do not hydrate static project collections.
- Keep code and media proportionate to the evidence provided.
- Avoid large visual effects that add runtime cost without communicating meaning.

## 35. Public-safety requirements

The public repository and previews contain only public-safe evidence. Project design does not grant permission to publish professional artefacts. Screenshots require confidentiality review, and representative diagrams should be recreated from safe abstractions where necessary.

Internal names, metrics, users, customers, URLs, architecture or source code must not be exposed unless already approved for public use. Omission is preferable to unsafe disclosure. The design system must work without confidential assets.

## 36. Implementation boundaries

PT-22 does not decide:

- production component APIs;
- exact component files;
- final CSS;
- exact breakpoints;
- exact Markdown frontmatter;
- content-schema implementation;
- React island boundaries for hypothetical future features;
- a syntax-highlighting, diagram or carousel library;
- the final media pipeline;
- filtering or search;
- CMS integration;
- analytics; or
- backend behaviour.

Likely implementation may reuse responsibilities already documented by PT-19. A visual group does not automatically justify a dedicated component.

## 37. Key design decisions

- Projects is a curated evidence collection.
- Filtering is deferred.
- Project previews prioritise context, role and relevance over technology.
- One clear project-detail continuation exists per preview.
- Entire cards are not automatically clickable.
- Images are not required for preview comprehension.
- Project detail establishes context and ownership before implementation depth.
- Full and concise project-detail depths share one visual system.
- Optional sections disappear cleanly.
- Repository and demo links appear only when they exist.
- Technical evidence supports rather than dominates the narrative.
- Long-form prose remains readable.
- Wide technical content uses bounded evidence regions.
- Outcomes do not require numerical metrics.
- Continuation is explicit.
- Related-project navigation may be manually curated.
- No table of contents is required yet.
- Project content remains static-first.
- Representative content is provisional and public-safe.
- Large screens remain bounded rather than scaling indefinitely.

## 38. Open / deferred decisions

PT-22 intentionally leaves unresolved:

- the final public project set;
- final project descriptions;
- final public-safe professional case studies;
- exact production breakpoints;
- the exact production content schema;
- exact final component API boundaries;
- final media availability;
- final repository and live-demo destinations;
- whether actual case-study length later justifies a local table of contents;
- whether any project-preview transform improves affordance;
- whether visited-link styling adds useful value;
- future filtering or search if project volume materially grows;
- any future interactive evidence pattern; and
- implementation-specific responsive CSS.

These decisions must not be resolved speculatively.

## 39. Implementation-time validation

### Responsive

Validate narrow mobile, mobile, intermediate or tablet, desktop and larger desktop contexts; long titles; variable project descriptions; content expansion; browser zoom; text enlargement; missing optional sections; and the absence of page-level horizontal overflow.

### Accessibility

Validate landmarks and heading hierarchy, keyboard navigation, visible focus, current navigation, link and button semantics, touch targets, absence of hover-only information, status without colour-only communication, technical-media alternatives, reduced motion, reflow and assistive-technology behaviour where applicable.

### Content

Validate that representative content is replaced or intentionally retained only when approved; no fictional metrics, unsupported ownership or confidential material is present; all public evidence exists; and missing resources are omitted.

### Interaction

Validate project links, external resources, focus-visible, hover, pressed feedback, reduced-motion fallback and normal navigation without JavaScript.

Automated checks complement manual review.

## 40. Related documentation

- [Product vision](../product/product-vision.md)
- [Information architecture](../product/information-architecture.md)
- [Content strategy](../product/content-strategy.md)
- [Product success criteria](../product/product-success-criteria.md)
- [High-level architecture](../architecture/high-level-architecture.md)
- [Architecture decision records](../architecture/decisions/README.md)
- [Design principles and visual direction](design-principles.md)
- [Responsive wireframes](responsive-wireframes.md)
- [Design foundations and token system](design-foundations.md)
- [Component foundations and accessibility states](component-foundations.md)
- [Motion and interaction guidelines](motion-interaction-guidelines.md)
- [Home high-fidelity design](home-design.md)
