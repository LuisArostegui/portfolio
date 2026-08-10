# Home high-fidelity design

## 1. Purpose and scope

This document is the canonical implementation-facing written record of the approved high-fidelity Home experience for PT-21. It explains how the existing product, architecture and design foundations apply to Home without redefining those foundations or prescribing production component APIs.

Home is an evidence-led, curated overview. It establishes the professional position quickly, introduces selected evidence progressively and gives clear continuation paths to Projects, Experience, the CV, professional profiles and contact. It is not a complete project archive, a reproduction of the CV or a substitute for detailed project and Experience content.

PT-21 documents design. It does not implement Astro, React, TypeScript, CSS, components, assets, tests or motion.

## 2. Canonical editable design source

The approved editable visual source is [Portfolio — Product Design in Penpot](https://design.penpot.app/#/workspace?team-id=81f57451-85cc-819d-8008-7273b4e9b9c5&file-id=81f57451-85cc-819d-8008-762cda1b22f8&page-id=81f57451-85cc-819d-8008-762cda1b22f9&layout=layers).

The reviewed source is organised as:

```text
Portfolio — Product Design
├── 01 — Home responsive
│   ├── Home — mobile 390
│   ├── Home — tablet 768
│   └── Home — desktop 1440
└── 02 — Home states & annotations
    ├── Home — mobile navigation expanded
    └── Home — interaction states
```

Penpot remains the canonical editable visual source. This document remains authoritative for implementation-facing decisions and must be understandable when the workspace is unavailable. The named widths are representative design-review canvases, not fixed production breakpoints. No Penpot artwork is stored in the repository.

## 3. Relationship to prior design decisions

Home consumes rather than replaces the established direction:

- the [product vision](../product/product-vision.md) establishes the evidence-led professional position;
- the [information architecture](../product/information-architecture.md) establishes destinations, content ownership and progressive disclosure;
- the [content strategy](../product/content-strategy.md) governs public-safe, accurate and maintainable copy;
- the [product success criteria](../product/product-success-criteria.md) establish communication, accessibility, performance and quality outcomes;
- the [high-level architecture](../architecture/high-level-architecture.md) and [accepted ADRs](../architecture/decisions/README.md) constrain static-first implementation, styling, motion, content, hosting and validation;
- the [design principles](design-principles.md) establish the restrained, editorial and technically informed direction;
- the [responsive wireframes](responsive-wireframes.md) establish mobile-first hierarchy and equivalent access;
- the [design foundations](design-foundations.md) establish the dark semantic surfaces, typography, spacing, content widths and interaction roles;
- the [component foundations](component-foundations.md) establish shared responsibilities and accessible states; and
- the [motion and interaction guidelines](motion-interaction-guidelines.md) establish optional, native-first enhancement and reduced-motion behaviour.

Incidental Penpot geometry must not override those sources. In particular, PT-21 does not repeat PT-18 token values, create a new focus token, or turn the Home state board into a new component foundation.

## 4. Home experience principles

The approved visual direction is dark, restrained, editorial, evidence-led, technically informed, professional, accessible and content-first. Structure, spacing and typography do most of the visual work. The limited periwinkle accent signals actions, focus and selected emphasis without becoming decoration.

The experience deliberately avoids generic SaaS and portfolio-template presentation, terminal novelty, technology-logo walls, skill percentages, progress bars, excessive cards and effects, and large decorative code examples. Technical material appears only when it provides evidence or useful context.

The first viewport prioritises, in order:

1. who the professional is;
2. frontend engineering as the primary role;
3. React and TypeScript specialisation;
4. a quality-oriented engineering value proposition; and
5. a clear path to evidence.

It does not need to communicate every technology, skill, project or professional detail.

## 5. Content hierarchy

The approved Home order is:

1. Hero and professional positioning.
2. Professional summary / About content.
3. Selected projects.
4. Engineering strengths.
5. Selected experience.
6. Engineering process.
7. Contact call to action.
8. Footer.

This order is also the canonical mobile source, reading and focus order. Responsive recomposition must not change its meaning.

Detailed professional history belongs to Experience, and complete project evidence belongs to project detail. Home owns concise previews and continuation paths. About and Contact remain concise Home content unless a future decision justifies dedicated routes.

## 6. Hero and professional positioning

The approved professional positioning is Frontend Engineer specialised in React and TypeScript, focused on scalable, accessible, maintainable and well-tested digital products. The hero communicates:

- the professional's name through the shared site identity in the header, rather than repeating it in the main hero content;
- the professional role and React and TypeScript specialisation;
- a concise quality-oriented value proposition;
- one primary internal continuation, represented as **View selected projects**; and
- one relevant secondary resource, represented as **Download CV**.

These labels and the other high-fidelity wording are representative design copy. They establish content purpose and hierarchy, not final approved production copy.

Supporting engineering-focus content may reinforce React and TypeScript engineering, accessible interaction, testing, maintainability and technical reasoning. It remains quieter than the primary position. The hero excludes career history, social-link collections, exhaustive skills, unsupported availability claims and decorative technical UI.

## 7. Professional summary / About

The concise summary communicates primary frontend specialisation, production-oriented engineering experience, accessibility, testing, architecture and relevant awareness of the wider software stack. It must not become a biography or duplicate Experience.

Tablet and desktop compositions may support the prose with fact rows such as **Primary specialisation**, **Quality focus** and **Engineering approach**. These are information-hierarchy treatments, not new design-system components. A continuation leads to fuller professional Experience.

## 8. Selected projects

Projects are selected evidence, not a complete archive. The order and prominence remain consistent across widths:

1. one prominent selected project; and
2. two subordinate selected-project or case-study previews.

On mobile the previews appear sequentially. At an appropriate intermediate width the secondary previews may share a row. Desktop uses an asymmetric hierarchy rather than an equal three-card grid.

Representative design content includes **Portfolio engineering system**, **Typed journeys for complex product flows** and **Accessible document interactions**. These examples are provisional. The portfolio repository can provide strong public evidence, while professional case-study material still requires public-safety and content review.

Each preview communicates a title, concise context or problem, relevant role or ownership, engineering relevance, selected supporting technologies where useful and a clear continuation to deeper content. Implementations must not invent evidence or metrics, impose fixed heights, add a carousel or filters, or create conflicting nested click targets by making an entire preview indiscriminately interactive.

## 9. Engineering strengths

Engineering strengths use editorial rows rather than a large boxed panel, table or grid of interchangeable cards. Each entry combines whitespace, a number, a small category label, a capability heading, concise explanation, an evidence or continuation link and a subtle divider.

The representative capability groups are:

1. **React & TypeScript engineering / Architecture**;
2. **Inclusive interaction by design / Accessibility**;
3. **Testing for delivery confidence / Quality**; and
4. **Decisions with context and trade-offs / Product reasoning**.

The section presents supported professional capabilities, not a technology inventory. Progress bars, percentages, star ratings, proficiency meters and logo walls are excluded. Evidence should be reachable naturally from each claim.

## 10. Selected experience

Home shows a concise preview of current or relevant professional context, selected responsibilities or contributions, production-engineering breadth and a continuation to the canonical Experience page. It neither reproduces the CV nor presents the full professional history.

Representative public-safe wording remains provisional. Confidential details must not be inferred or published. Any current status is conveyed through text and structure as well as visual accent, so it remains understandable without colour.

## 11. Engineering process

The portfolio itself demonstrates engineering practice through the sequence:

1. Define.
2. Decide.
3. Design.
4. Build & validate.
5. Review & evolve.

Supporting evidence may include product documentation, information architecture, ADRs, design foundations, issues, pull requests, repository history, and tests or checks once they actually exist. A repository continuation gives visitors access to that public evidence.

The section demonstrates reasoning and traceability rather than process theatre. It must not describe planned continuous integration, automation, tests or workflows as implemented.

## 12. Contact and footer

Home concludes with a strong but restrained professional contact region containing a concise heading, a direct professional contact action, LinkedIn, GitHub and the CV. It does not add a contact form, scheduling integration, freelance-service positioning, marketing language or unsupported availability claims. Final wording and destinations remain content decisions.

The restrained footer preserves relevant navigation, Home destinations and professional context while using available horizontal space at wider sizes. Speculative legal links are not introduced; they should appear only if future product behaviour makes them necessary.

## 13. Shared navigation

The primary destinations are Home, Projects, Experience, About and Contact. About and Contact may refer to Home sections. The CV is a separately identifiable professional resource rather than an equal primary route; GitHub and LinkedIn are also professional resources.

Desktop exposes primary navigation and identifies Home as the current location. Current and hover treatments differ, and current location is exposed semantically as well as visually. Mobile and tablet use compact navigation while the full set would compete for space; tablet may keep CV access alongside the menu trigger.

### Expanded mobile navigation

The approved expanded state is an inline region beneath the shared header. It is not a modal, full-screen dialog, nested menu, off-canvas drawer or focus-trapped overlay. This choice keeps the interaction simple and consistent with the responsive and component foundations.

The region contains:

- primary navigation: Home — current, Projects, Experience, About — Home section, Contact — Home section; and
- professional resources: Download CV, GitHub and LinkedIn.

The trigger is a real control and exposes its expanded or collapsed state programmatically. Home current location is semantic, visible and not colour-only. All destinations work without animation or hover. Focus behaviour is independent from motion, and closing leaves interaction in a logical state.

## 14. Interaction states

The Home state board applies the shared component and motion guidance; it does not redefine it.

### Actions

The primary **View projects / View selected projects** action remains a semantic link because it navigates. Its default, hover, focus-visible and pressed states use the established action hierarchy. Hover supplies fast, local pointer feedback; focus-visible is immediate and distinct; pressed is transient; navigation never waits for animation.

The secondary **Download CV** action has the same represented state set and remains semantically a downloadable resource link.

### Navigation and link language

Navigation represents Home current, ordinary destination, hover and focus-visible states. Current and hover are not interchangeable, and current location is semantically exposed.

The visual language distinguishes outcomes with supplementary symbols:

- internal continuation: `→`;
- external resource: `↗`; and
- downloadable resource: `↓`.

The symbols reinforce understandable labels; they never replace them.

### Focus

Focus-visible uses the established PT-18/PT-19 treatment. It is immediate, highly perceivable, distinct from hover and visible against the existing control boundary. Visual polish must not remove or weaken it, and PT-21 introduces no new focus token.

## 15. Motion and reduced motion

Home consumes the [motion and interaction guidelines](motion-interaction-guidelines.md). Motion is optional enhancement; content, navigation and final semantic states are complete without it.

- Hover may use Fast local feedback.
- Pressed feedback feels Immediate.
- Focus remains immediate.
- Inline mobile-navigation opening may use Standard, bounded motion.
- Any future project-preview movement must be extremely restrained and justified.
- Content remains visible by default; there is no site-wide reveal-on-scroll.
- Decorative route animation is not required; route continuity remains optional progressive enhancement.

With reduced motion, unnecessary transforms and spatial movement are removed, the mobile navigation may open immediately, focus remains unchanged, and any route transition falls back to normal navigation. PT-21 implements no motion.

## 16. Responsive behaviour

Responsive layout is content-driven. The 390px, 768px and 1440px canvases document representative compositions for review, not mandatory implementation breakpoints or device detection rules. Every composition retains equivalent functionality, destinations and source order.

### Mobile

The 390px review canvas establishes canonical content, reading and focus order. It uses a compact header and collapsed navigation trigger, a vertical hero, vertically stacked primary and secondary actions, and supporting engineering evidence after the main hero content.

All major content remains in one logical reading column. Projects appear sequentially, strengths use an editorial list, Experience is a concise preview, process becomes a linear sequence, and contact resources remain direct and touch-friendly.

### Tablet

The 768px review canvas is an intermediate recomposition, not a scaled desktop layout. Compact navigation remains appropriate, with CV potentially visible beside the menu trigger. The hero remains primarily vertical, while its actions may share a row and engineering-focus content uses horizontal space more effectively.

The professional summary may use two columns. The featured project remains prominent while two secondary previews may share a row. Strengths form a two-part editorial row, and process items may use a two-column composition. Functionality and source order remain equivalent to mobile.

### Desktop

The 1440px review canvas exposes primary navigation and visibly identifies Home as current. The hero uses an editorial two-column composition: primary positioning dominates while supporting engineering evidence occupies a quieter secondary region. Hero actions share a row.

The summary combines readable prose with supporting facts. Projects use one prominent item and two subordinate previews. Strengths become a broad editorial list rather than a card grid. Experience uses a wider composition without duplicating its canonical page, process may become horizontal, contact becomes a larger concluding region, and the footer uses horizontal space without sacrificing clarity.

### Large-screen behaviour

A separate 1728px Penpot canvas was intentionally unnecessary after review of the mobile, tablet and 1440px compositions. This is a responsive decision, not missing design work.

Larger viewports preserve the established `layout.content.wide` role of approximately 1360px. Prose stays constrained, wide composition remains bounded, and typography, controls and content regions do not scale indefinitely. Extra width primarily becomes outer whitespace; evidence regions use it only within established foundations. No new desktop-only information, interaction, layout token or large-screen design system appears. Exact breakpoints remain content-driven implementation decisions.

## 17. Accessibility

Home-specific implementation must preserve the following expectations:

- semantic landmarks and a content-led heading hierarchy remain identifiable;
- the page, current navigation and interaction states remain understandable without colour;
- links navigate, controls change local state, and roles remain identifiable;
- external and download outcomes are communicated appropriately in text and semantics;
- hover is supplementary and focus-visible is distinct;
- touch targets remain usable, following the established approximate 44–48px guidance where appropriate;
- mobile navigation exposes expanded and collapsed state;
- logical reading and focus order follow the mobile-first source order;
- closing interactive navigation leaves focus in a logical state;
- zoom, text enlargement and reflow do not remove essential information or actions;
- no page-level horizontal scrolling is required;
- content-led heights and long professional content remain viable; and
- motion is never the only carrier of meaning.

The design and annotations do not establish WCAG conformance. Implementation requires automated checks complemented by manual keyboard, focus, reflow, contrast, motion and assistive-technology review where applicable.

## 18. Content resilience

The high-fidelity frames use representative copy to test hierarchy and composition. Final production copy is deferred and must receive accuracy, confidentiality and public-safety review.

Implementation must tolerate longer names, headings, project and capability descriptions; changed professional content; variable evidence; text enlargement; and browser zoom. Penpot canvas heights and preview geometry are not fixed production heights.

Some manual line breaks exist only to make HTML-to-design import predictable where the converter does not reproduce normal wrapping. They are not production copy and are not responsive implementation requirements. Production must use resilient typography and normal content flow rather than reproduce those line breaks blindly.

## 19. Implementation boundaries

PT-21 does not decide production component APIs, file structure, exact CSS, breakpoints or navigation ownership. Likely implementation may consume responsibilities already described by PT-19, including shared header and navigation, actions, project previews, experience previews, capability and evidence items, metadata and footer. A visual group does not automatically justify a new component family.

Implementation must not couple contracts to Penpot geometry or prescribe React for static Home content. Most presentation should remain possible through Astro, semantic HTML and CSS. Only actual local interaction or state may justify browser JavaScript, in line with the high-level architecture and accepted ADRs.

## 20. Key design decisions

- Home remains an evidence-led curated overview.
- Mobile establishes canonical content and focus order.
- Tablet is an intermediate recomposition rather than scaled desktop.
- Desktop uses a restrained editorial composition.
- Large desktop needs no separate composition while established content widths remain sufficient.
- The hero prioritises positioning, Projects and CV.
- Engineering-focus content supports rather than competes with the hero.
- Projects use asymmetric hierarchy on desktop.
- Engineering strengths use editorial rows instead of one large card or table.
- Experience remains a preview.
- Engineering process uses the public repository as supporting evidence.
- Contact remains direct and form-free.
- Mobile navigation remains an inline expanded region.
- Home states consume PT-19 and PT-20 rather than redefining them.
- Representative Penpot copy is not final production copy.

## 21. Open / deferred decisions

PT-21 intentionally leaves unresolved:

- final public Home copy;
- the final selected-project set and public-safe professional case-study material;
- exact implementation breakpoints and production line wrapping;
- exact component API boundaries and mobile-navigation implementation ownership;
- whether any project-preview transform provides useful feedback;
- whether cross-document View Transitions are eventually implemented;
- the exact contact destination and final CV asset or location;
- final GitHub and LinkedIn URLs if they are not already canonical;
- future dedicated About or Contact routes; and
- implementation-specific responsive CSS.

These gaps require later content or implementation decisions and must not be closed speculatively.

## 22. Validation requirements

Future implementation review must cover:

### Responsive and resilience

- narrow mobile, intermediate/tablet, desktop and larger desktop contexts;
- long and changed content, browser zoom and text resizing;
- content-led heights, safe wrapping and reflow; and
- absence of page-level horizontal overflow.

### Accessibility

- heading structure and landmarks;
- keyboard navigation and visible focus;
- current navigation and non-colour state communication;
- mobile-navigation state exposure and logical focus behaviour;
- usable touch targets;
- reduced-motion behaviour;
- external and download semantics; and
- assistive-technology review where applicable.

### Interaction

- mobile navigation open and close, including rapid repeated interaction;
- logical focus restoration where required;
- correct link and control semantics; and
- no essential hover-only behaviour.

### Content

- replacement of representative copy with reviewed, public-safe content;
- no fictional metrics, unsupported claims or confidential detail;
- real evidence for selected projects; and
- repository-process claims that reflect the repository's actual state.

Automated checks complement but do not replace manual review.

## 23. Related documentation

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
