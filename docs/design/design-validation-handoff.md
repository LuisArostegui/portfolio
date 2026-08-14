# Design validation and implementation handoff

## 1. Purpose

This document is the final implementation-facing checkpoint for the current portfolio design milestone. It validates the product, architecture, foundations, page experiences and interaction contract as one coherent system; records the final design corrections and accepted limitations; identifies what is ready for implementation; and separates design evidence from validation that only the production application can provide.

The design milestone is ready to close. The information architecture, experience hierarchy, visual system, responsive intent and interaction responsibilities are sufficiently resolved for implementation. No known blocking design correction remains. Content dependencies, implementation choices and real-browser validation remain work for the implementation milestone rather than reasons for speculative redesign.

## 2. Validation methodology

The review uses the following outcome categories:

### Pass

The design decision is sufficiently resolved for implementation.

### Pass with implementation requirement

The design direction is resolved, but its behaviour or quality must be verified in the real application and browser.

### Design correction applied

A design issue was identified and corrected before handoff.

### Requires product decision

This category is reserved for a genuinely unresolved product decision. No PT-25 finding currently has this outcome.

### Accepted limitation / implementation-time validation

The current design tools or milestone scope cannot prove the requirement. The limitation is accepted and converted into explicit production validation work.

### Deferred outside MVP

The capability is intentionally excluded from the current portfolio rather than omitted accidentally.

### Authoritative source set

The review used the [product vision](../product/product-vision.md), [information architecture](../product/information-architecture.md), [content strategy](../product/content-strategy.md), [product success criteria](../product/product-success-criteria.md), [high-level architecture](../architecture/high-level-architecture.md) and [accepted architecture decisions](../architecture/decisions/README.md).

The canonical design record comprises the [design principles](design-principles.md), [responsive wireframes](responsive-wireframes.md), [design foundations](design-foundations.md), [component foundations](component-foundations.md), [motion and interaction guidelines](motion-interaction-guidelines.md), [Home design](home-design.md), [Projects and project-detail design](projects-design.md), [Experience and shared navigation design](experience-navigation-design.md), and [interactive prototype and interaction contract](interactive-prototype.md).

Those documents link to the existing canonical editable Penpot sources. This handoff does not invent a Penpot file, page, board or prototype URL. PT-24 is complete and issue #39 is closed; the absence of a separately recorded reviewer-accessible presentation URL remains a documentation limitation, not a reason to invent one.

## 3. Reviewer perspectives

The following are three structured, role-based heuristic perspectives applied to the same design system. They are useful design-review evidence, but they are not independent external participant research or usability studies. No recruiter, engineering manager or software engineer is claimed to have participated as a named external reviewer. Real user, browser and assistive-technology testing remains future validation work.

### Recruiter / non-specialist

**Primary questions:** Is the role understandable quickly? Is frontend specialisation clear? Can Projects and Experience be found? Are CV, LinkedIn and Contact discoverable? Does the portfolio feel credible and human?

**Outcome:** `Pass with design correction applied`

Professional positioning is clear, navigation is simple, evidence is discoverable and irrelevant navigation complexity is absent. The review identified that the otherwise credible engineering presentation could feel slightly impersonal. A portrait was therefore introduced in the About / professional-summary design. This is a heuristic finding; it does not claim that an external recruiter participated.

### Engineering manager / technical lead

**Primary questions:** Does the portfolio communicate engineering depth? Can decisions, constraints, trade-offs and quality practices be found? Does Projects lead naturally into project detail? Is Experience useful rather than a duplicated CV? Does frontend remain the primary specialisation?

**Outcome:** `Pass`

The Home → Projects → Project detail → Experience path is coherent. Project detail is the strongest evidence surface; architecture, accessibility, testing and trade-offs have appropriate prominence; frontend remains primary; and wider software experience remains supporting breadth. Final project content must preserve this depth rather than reducing project pages to visual showcases or generic descriptions.

### Software engineer

**Primary questions:** Is the design internally consistent? Are interaction semantics credible? Does the responsive model preserve meaning? Is technical evidence readable? Are implementation boundaries proportionate?

**Outcome:** `Pass with design correction applied`

The design supports progressive technical depth, bounded technical evidence, semantic link and control responsibilities, content-led responsive composition and a static-first implementation. Provisional arrow, download and external glyphs were not sufficiently coherent as the final implementation language. The correction adopts a small SVG icon vocabulary, with Lucide as the preferred source candidate. This is a role-based heuristic review, not a claim that an external software engineer participated.

## 4. Professional-positioning validation

**Outcome:** `Pass`

The approved statement remains:

> Frontend Engineer specialised in React and TypeScript, focused on scalable, accessible, maintainable, and well-tested digital products.

The portfolio continues to communicate frontend engineering, React and TypeScript specialisation, scalable architecture, accessibility, testing, maintainability and product reasoning. It must not become primarily a visual-design portfolio, a generic full-stack or backend profile, an AI profile, a freelancer-services page or a technology-logo collection.

## 5. Information architecture validation

**Outcome:** `Pass`

The canonical MVP is:

```text
Home
Projects
Project detail
Experience
```

Home also owns About and Contact. CV, GitHub and LinkedIn are professional resources. Case-study content remains inside project detail. Dedicated About or Contact routes, search, filtering, accounts, authentication, a language selector and nested navigation are not required for the MVP.

## 6. Home validation

**Outcome:** `Pass with design correction applied`

The first viewport communicates role and specialisation; selected evidence is visible; Projects and Experience are discoverable; About supplies professional context; Contact provides direct continuation; and mobile order remains intentional. The final correction places one portrait within About / the professional summary. It humanises the experience while remaining secondary to the role and value proposition.

## 7. Projects index validation

**Outcome:** `Pass`

Projects is a curated collection, not an exhaustive catalogue. Previews support comparison and discovery, provide one explicit project-detail action and avoid a giant competing click target with nested actions. Unavailable evidence is omitted, and representative or provisional projects remain labelled accurately.

## 8. Project-detail validation

**Outcome:** `Pass with content dependency`

The design supports context, role, constraints, responsibilities, decisions, alternatives, trade-offs, implementation reasoning, architecture, accessibility, testing, supported outcomes, limitations, lessons and public evidence. Production content must preserve this engineering depth and must not reduce the page to a visual gallery or generic project description.

## 9. Experience validation

**Outcome:** `Pass`

Professional context precedes task detail; responsibilities are distinct from selected contributions; contributions provide evidence; and capabilities remain evidence-supported. Frontend is primary and wider-stack experience is supporting breadth. Current and previous role state is not colour-only. Entries support variable depth and content-led height rather than fixed-height cards.

## 10. Shared navigation validation

**Outcome:** `Pass`

The primary hierarchy is Home, Projects, Experience, About and Contact. CV, GitHub and LinkedIn remain secondary professional resources. The hierarchy is shallow, current location is exposed visually and programmatically, equivalent destinations survive responsive recomposition, and resources do not overwhelm primary navigation.

## 11. Mobile navigation validation

**Outcome:** `Pass with implementation requirement`

The approved pattern is an **inline expanded region beneath the header**. It is not a modal, dialog, drawer, overlay or full-screen menu. Implementation must use a real button with an accessible name and `aria-expanded`, preserve keyboard operation and logical focus order, avoid unexpected focus movement and omit a focus trap.

## 12. Contact validation

**Outcome:** `Pass`

Contact remains a Home section with direct professional actions such as email, LinkedIn, GitHub and CV. A contact form is unnecessary for the MVP: direct actions are simpler, static-friendly, require fewer accessibility states, avoid spam and backend dependencies, introduce no unnecessary personal-data processing, and are sufficient for the current product purpose.

Form functionality is `Deferred outside MVP` and may be reconsidered only if real usage establishes a need.

## 13. Iconography validation

**Outcome:** `Design correction applied`

The provisional arrow glyphs are replaced by a coherent static SVG direction:

```text
internal continuation → arrow-right
external destination → external-link
download → download
compact navigation → menu
expanded compact navigation → close
```

Lucide is the preferred source candidate, subject to confirmation in implementation. Visible labels retain semantic meaning; icons are supporting presentation and do not carry meaning alone. Decorative SVGs should generally be hidden from accessible output so they do not duplicate the label, while exact treatment must be verified in final markup. SVGs do not justify React hydration or a dependency by themselves.

## 14. Portrait / media validation

**Outcome:** `Design correction applied + content dependency`

One portrait belongs in About / the professional summary, humanises the experience and remains secondary to the initial professional message. On wider layouts it may sit beside the text; on mobile the text comes first and the portrait follows in normal content order. Production must optimise its format and dimensions, avoid unnecessary transfer, and define width, height or aspect ratio where appropriate to reduce layout shift.

The exact final portrait is not yet supplied. Whether it is decorative or informative, and therefore its final alternative-text treatment, must be decided from the selected image and actual context. This document does not invent image metadata or alt text.

## 15. Responsive validation

**Outcome:** `Pass with implementation requirement`

The established review widths—320, 390, 768, 1440 and 1728 where represented by the relevant artefact—are design-review canvases, not mandatory CSS breakpoints. The system defines conceptual behaviour for narrow mobile, mobile, tablet, desktop and large desktop through content priority, responsive recomposition, mobile-first source order, readable line length, navigation transformation, no intended page-level horizontal scrolling and meaningful continuation paths.

Production must still test browser zoom, text enlargement, real reflow, long content, long URLs and dynamic content length. Exact breakpoints remain content-driven implementation decisions.

## 16. Accessibility design validation

**Overall outcome:** `Pass with implementation requirement`. The design supplies requirements; it does not claim WCAG conformance.

| Requirement                 | Design outcome                                                                 | Production requirement                                                          |
| --------------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------- |
| Headings                    | Content hierarchy and differentiated roles are defined.                        | Implement meaningful heading levels and test the rendered outline.              |
| Landmarks                   | Shared header, navigation, main content and footer responsibilities are clear. | Use appropriate semantic landmarks and distinguish repeated navigation regions. |
| Reading order               | Mobile-first source and content order is intentional.                          | Verify DOM, visual and assistive-technology reading order at every composition. |
| Link purpose                | Internal, external, download and contact outcomes are distinguished.           | Use meaningful labels, destinations and native link semantics.                  |
| Buttons vs links            | Navigation and local-state responsibilities are separated.                     | Use links for navigation and buttons for disclosure or other local state.       |
| Focus-visible               | A prominent state distinct from hover is defined.                              | Verify visibility on every surface and input path.                              |
| Hover distinction           | Hover is supplementary and reveals no essential information.                   | Check pointer feedback without weakening focus or touch access.                 |
| Current state               | Persistent location uses more than colour.                                     | Apply suitable semantics such as `aria-current` where appropriate.              |
| Expanded state              | Compact navigation has explicit collapsed and expanded states.                 | Keep `aria-expanded` synchronised with actual state and control relationship.   |
| Non-colour meaning          | Status and state include text, structure or shape.                             | Test contrast and comprehension with colour cues unavailable.                   |
| Target sizing               | Approximately 44–48px usable targets are the established guidance.             | Measure actual controls across responsive and touch contexts.                   |
| Reduced motion              | Essential meaning and access do not require motion.                            | Implement and test the reduced-motion media-query behaviour.                    |
| Long text / reflow          | Heights are content-led and local overflow is bounded.                         | Test zoom, text enlargement, long labels, URLs and no page-level overflow.      |
| Image alternatives          | Media purpose and placement are defined without invented alt text.             | Decide informative or decorative treatment from each final image and context.   |
| Diagrams / text equivalents | Technical diagrams supplement understandable text.                             | Provide an equivalent explanation and test reading order.                       |
| External links              | External destination is communicated by label and supporting icon.             | Verify destination, accessible name and safe new-context behaviour if used.     |
| Download treatment          | CV is a distinct professional resource and download outcome is clear.          | Verify file, filename, type, destination and native download/view behaviour.    |

Automated checks can detect some failures but cannot establish conformance. Keyboard, screen-reader, zoom, reflow, contrast, motion and comprehension require accountable manual review.

## 17. Motion validation

**Outcome:** `Pass with implementation requirement`

The design consumes the [motion and interaction guidelines](motion-interaction-guidelines.md): no motion is required for comprehension; hover and pressed feedback are restrained; route navigation does not require animation; compact navigation may use bounded motion; reduced motion removes unnecessary spatial movement; and content access is never delayed. No animation dependency is required.

## 18. Static-first / architecture validation

**Outcome:** `Pass`

The design does not imply an SPA, client router, global React root, global client state, hydration for static content, dynamic backend or unnecessary animation runtime. The expected implementation uses Astro routes and pages, semantic HTML, CSS and normal links. React is reserved for a bounded interactive island only when concrete local client state justifies it.

## 19. Token and visual-system validation

**Outcome:** `Pass`

The [design foundations](design-foundations.md) sufficiently define responsibilities for colour roles, typography hierarchy, spacing, layouts and containers, radii, surfaces, borders, focus, motion and technical content. PT-25 consumes those responsibilities and creates no new tokens.

## 20. Component handoff inventory

Representative implementation responsibilities include the shared header, desktop navigation, compact navigation disclosure, footer, actions, project preview and metadata, experience entry, capability or status treatment, technical prose, code region, decision or callout, evidence link and contact actions.

This inventory does not prescribe an exact file tree or require one component per visual group. A visual grouping does not automatically justify a reusable component family; extraction requires repeated responsibility and real reuse. Astro and semantic HTML remain the default.

## 21. Route and destination handoff

```text
/
/projects
/projects/:project-slug
/experience
```

About and Contact are Home-section destinations. `/about` and `/contact` are not defined unless a future product decision changes the information architecture. GitHub, LinkedIn, CV and email/contact are separate external or resource destinations. Final unresolved URLs remain content or configuration dependencies.

## 22. Content handoff

Production requires final Home and About copy, the selected portrait, real project content and public evidence, Experience content, CV, GitHub, LinkedIn and a public email or contact destination.

All content must be factual, public-safe and attributable. Do not invent metrics, expose confidential material or private architecture, code or screenshots, create fake evidence, or silently present provisional content as final. Provisional material must be replaced or explicitly approved.

## 23. Performance-aware handoff

**Outcome:** `Pass with implementation requirement`

The design supports static-first rendering, restrained imagery, an optimised portrait, limited font and asset loading, static SVG icons, no animation library by default, no hydration for presentation and portable static output. Core Web Vitals and actual transfer, rendering and layout behaviour remain production measurements; no measured performance claim is made here.

## 24. Traceability matrix

| Requirement / concern     | Product / architecture source                                                                                                                                                                                                                                  | Design artefact                                                                                                 | PT-25 outcome                                  | Implementation verification                                                                        |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Professional positioning  | [Product vision](../product/product-vision.md)                                                                                                                                                                                                                 | [Home design](home-design.md)                                                                                   | Pass                                           | Confirm first-viewport comprehension with final copy and real content.                             |
| Information architecture  | [Information architecture](../product/information-architecture.md)                                                                                                                                                                                             | [Responsive wireframes](responsive-wireframes.md)                                                               | Pass                                           | Verify routes, section destinations and link integrity.                                            |
| Responsive behaviour      | [Product success criteria](../product/product-success-criteria.md)                                                                                                                                                                                             | [Home](home-design.md), [Projects](projects-design.md), [Experience](experience-navigation-design.md)           | Pass with implementation requirement           | Test real browsers, zoom, text enlargement, reflow and long content.                               |
| Accessibility             | [Product success criteria](../product/product-success-criteria.md), [testing ADR](../architecture/decisions/0006-use-a-pragmatic-risk-based-testing-strategy.md)                                                                                               | [Component foundations](component-foundations.md), [prototype contract](interactive-prototype.md)               | Pass with implementation requirement           | Combine automated checks with keyboard, screen-reader and manual review; do not infer conformance. |
| Project evidence          | [Content strategy](../product/content-strategy.md)                                                                                                                                                                                                             | [Projects design](projects-design.md)                                                                           | Pass with content dependency                   | Review every claim, artefact and destination for accuracy and public safety.                       |
| Experience                | [Product vision](../product/product-vision.md), [content strategy](../product/content-strategy.md)                                                                                                                                                             | [Experience design](experience-navigation-design.md)                                                            | Pass                                           | Verify hierarchy, variable depth and evidence-supported capabilities.                              |
| Navigation                | [Information architecture](../product/information-architecture.md)                                                                                                                                                                                             | [Experience/shared navigation](experience-navigation-design.md), [prototype contract](interactive-prototype.md) | Pass with implementation requirement           | Verify native navigation, current state, disclosure semantics, keyboard and focus.                 |
| Motion                    | [ADR 0003](../architecture/decisions/0003-use-a-native-first-purpose-driven-animation-strategy.md)                                                                                                                                                             | [Motion guidelines](motion-interaction-guidelines.md)                                                           | Pass with implementation requirement           | Verify absence/reduction, interruption and no delayed access.                                      |
| Static-first architecture | [High-level architecture](../architecture/high-level-architecture.md), [ADR 0001](../architecture/decisions/0001-use-astro-as-the-primary-frontend-framework.md), [ADR 0002](../architecture/decisions/0002-use-modern-css-as-the-primary-styling-strategy.md) | [Component foundations](component-foundations.md)                                                               | Pass                                           | Confirm normal routes/links, static content and bounded hydration only where justified.            |
| Confidentiality           | [Content strategy](../product/content-strategy.md)                                                                                                                                                                                                             | [Projects design](projects-design.md), [Experience design](experience-navigation-design.md)                     | Pass with content dependency                   | Perform mandatory human public-safety review of final content and output.                          |
| Contact                   | [Information architecture](../product/information-architecture.md)                                                                                                                                                                                             | [Home design](home-design.md), [prototype contract](interactive-prototype.md)                                   | Pass                                           | Verify direct email/profile/CV actions and absence of a form.                                      |
| Portrait / media          | [Content strategy](../product/content-strategy.md)                                                                                                                                                                                                             | [Home design](home-design.md)                                                                                   | Design correction applied + content dependency | Select and optimise the image; decide contextual alternative text.                                 |
| SVG iconography           | [High-level architecture](../architecture/high-level-architecture.md)                                                                                                                                                                                          | [Design foundations](design-foundations.md), [component foundations](component-foundations.md)                  | Design correction applied                      | Confirm static mechanism, visible labels, SVG accessibility and no presentation-only hydration.    |

## 25. Final corrections log

### Correction 01 — Personal identity

Portrait added to the About / professional-summary design.

**Outcome:** `Applied`

### Correction 02 — Iconography

Provisional glyphs replaced with a coherent SVG icon direction.

**Outcome:** `Applied`

### Correction 03 — Contact scope

Contact confirmed as direct actions without a form for the MVP.

**Outcome:** `Confirmed product/design decision`

No blocking design correction remains.

## 26. Accepted limitations

**Outcome:** `Accepted limitation / implementation-time validation`

- The reviewer perspectives are structured role-based heuristics, not independent external usability participants.
- Penpot cannot validate semantic HTML, assistive technology or real keyboard and focus behaviour.
- The prototype cannot validate browser history or native navigation behaviour.
- Real zoom, text enlargement and reflow are untested.
- Core Web Vitals are unmeasured.
- Real external links and the final CV may remain content dependencies.
- The exact final portrait has not been supplied.
- Final production breakpoints remain implementation decisions.
- A separately verified reviewer-accessible Penpot presentation URL is not recorded in the repository.

These limitations do not block implementation. Each becomes an explicit production verification task.

## 27. Ready for implementation

The following are design-ready: information architecture; Home hierarchy; Projects hierarchy; project detail; Experience; navigation structure; the inline mobile disclosure pattern; Home ownership of About and Contact; responsive intent; design tokens; component responsibilities; interaction states; focus appearance; motion principles and reduced-motion intent; SVG icon direction; portrait placement; and the form-free Contact MVP model.

## 28. Implementation-time validation requirements

Production must validate:

- semantic HTML, landmarks and heading levels;
- keyboard navigation, focus behaviour and focus restoration;
- screen-reader output and accessible-name calculation;
- `aria-expanded` and the compact navigation control relationship;
- browser zoom, text enlargement, reflow and horizontal overflow;
- contrast of actual production combinations;
- the reduced-motion media query and behaviour without motion;
- image alternative text and SVG accessibility;
- external links, CV download and email action;
- reasonable JavaScript-failure behaviour and essential static access;
- performance and Core Web Vitals;
- route and link integrity;
- responsive browser and device behaviour; and
- automated accessibility testing plus manual accessibility review.

## 29. Deferred outside MVP

- Contact form.
- Search and filtering.
- Analytics.
- Authentication and personalisation.
- Localisation.
- Blog or Notes unless separately approved.
- Dedicated About and Contact routes.
- Backend, CMS or database.
- Complex animation.
- SPA navigation.

## 30. Design-review checkpoints during implementation

### Foundations implementation review

Validate tokens, typography, spacing, surfaces and focus against the established foundations.

### Shared navigation review

Validate semantic navigation, equivalent destinations and the compact inline disclosure.

### Home review

Validate professional positioning, responsive hierarchy and secondary portrait integration.

### Projects / detail review

Validate project discovery, explicit continuation and readable, public-safe technical evidence.

### Experience review

Validate role hierarchy, responsibility/contribution distinction and variable content depth.

### Pre-release accessibility review

Validate keyboard, screen reader, zoom/reflow, reduced motion and production contrast.

### Pre-release design QA

Compare the implementation with approved Penpot and repository documentation. Responsive, semantic and content correctness take precedence over copying incidental pixels or fixed canvas geometry.

## 31. Final milestone conclusion

The design system and MVP page experiences are sufficiently defined to proceed to production implementation. No blocking design issue remains.

Remaining uncertainties are content dependencies, implementation choices, real-browser behaviour, production accessibility and measured performance. The next milestone should implement and validate the approved design rather than continue speculative redesign.
