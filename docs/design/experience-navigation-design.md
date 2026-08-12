# Experience and shared navigation high-fidelity design

## 1. Purpose and scope

PT-23 defines the approved high-fidelity design for:

- `/experience`;
- the professional-experience collection;
- detailed and concise experience-entry depths;
- professional responsibilities, selected contributions and demonstrated capabilities;
- relationships from Experience to Projects and other public-safe evidence;
- the shared header;
- desktop navigation;
- compact or tablet navigation;
- mobile closed navigation;
- mobile inline-expanded navigation;
- the shared footer; and
- navigation interaction and accessibility states.

Experience is the canonical location for detailed professional history. It communicates professional trajectory, scope and evidence without reproducing the complete CV. PT-23 documents approved design; it does not implement production code, routes, content, components or assets.

## 2. Canonical editable source

The approved editable visual source is [Portfolio — Product Design, PT-23 page in Penpot](https://design.penpot.app/#/workspace?team-id=81f57451-85cc-819d-8008-7273b4e9b9c5&file-id=81f57451-85cc-819d-8008-762cda1b22f8&page-id=6e0a7da9-2dab-8004-8008-77bd68893a39).

The reviewed source is organised as follows:

```text
Portfolio — Product Design
├── 07 — Experience responsive
├── 08 — Experience variants & evidence
├── 09 — Shared navigation responsive
└── 10 — Navigation states & annotations
```

Penpot is the canonical editable visual source. This Markdown document is the canonical implementation-facing written record and remains independently understandable when Penpot cannot be accessed. Incidental Penpot geometry is not a production contract, and manual line breaks introduced for design or import tooling are not implementation requirements. Production must use resilient content flow instead of copying fixed canvas geometry.

No Penpot artwork, exports or intermediate design artefacts are stored in the repository. The link records the supplied PT-23 page identifier; no board identifier is inferred.

## 3. Relationship to prior foundations

PT-23 consumes rather than replaces:

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
- the [PT-20 motion and interaction guidelines](motion-interaction-guidelines.md);
- the [PT-21 Home design](home-design.md); and
- the [PT-22 Projects and project-detail design](projects-design.md).

These sources govern product direction, content ownership, public safety, responsive behaviour, semantic foundations, components, motion and static-first architecture. PT-23 does not redefine those systems, create new tokens or make every visual group a new component family.

## 4. Professional positioning

The approved professional positioning is:

> Frontend Engineer specialised in React and TypeScript, focused on scalable, accessible, maintainable, and well-tested digital products.

Frontend engineering remains the primary professional specialisation. Relevant backend, API and wider software experience provides supporting breadth and context; it is not presented as an equivalent current specialisation. The design avoids percentages, ratings, scores and other artificial comparisons between capabilities.

## 5. Experience page purpose

Experience helps visitors understand:

1. professional trajectory;
2. responsibilities held;
3. meaningful contributions;
4. demonstrated capabilities;
5. growth in professional scope; and
6. related public-safe evidence.

It must not become a copy of the CV, a generic job-description list, a technology history or a company-logo showcase. Context and evidence establish relevance more effectively than exhaustive chronology.

## 6. Experience hierarchy

The approved page hierarchy is:

```text
Shared header
→ Experience introduction
→ professional context
→ current role
→ previous roles
→ frontend specialisation / supporting breadth
→ continuation
→ shared footer
```

Within a relevant role, the hierarchy is:

```text
role state
→ period
→ role
→ professional context
→ professional focus
→ responsibilities
→ selected contributions
→ demonstrated capabilities
→ optional related evidence
```

The exact number of sections varies by role. The continuation should provide meaningful next steps towards Projects, the CV and professional contact without turning every option into an equal primary action.

## 7. Current vs completed roles

A current role uses explicit visible wording such as **Current role**. A completed role may use wording such as **Previous role**. Colour may reinforce this distinction but cannot communicate it alone.

Previous roles remain available professional history and must not appear disabled. State wording, structure and period provide the durable distinction between current and completed work.

## 8. Entry depth

A highly relevant or current role may include professional context, responsibilities, several selected contributions, demonstrated capabilities and related evidence. A previous or less relevant role may use a concise entry with context, fewer selected contributions and capabilities.

Entries do not need identical content depth or matching section counts. They must use content-led heights; fixed-height role cards would create fragile gaps or truncation when copy, evidence or contribution counts vary.

## 9. Responsibilities vs selected contributions

Responsibilities answer:

> What professional scope did the role continuously include?

Selected contributions answer:

> Which pieces of work provide particularly useful evidence?

Responsibilities remain concise and describe ongoing scope. Selected contributions may receive stronger editorial treatment because they provide evidence-oriented examples. The two must not collapse into one undifferentiated task list, and fictional achievements must never be created to fill the layout.

## 10. Capabilities demonstrated

Capabilities are evidence-supported professional signals rather than self-ratings. Representative categories may include:

- React and TypeScript;
- accessibility;
- testing;
- frontend architecture;
- product reasoning;
- collaboration; and
- technical coordination.

Final claims remain only when verified professional content supports them. Percentages, stars, progress bars, arbitrary levels and skill scores are not appropriate evidence.

## 11. Related evidence

Experience may link to related Projects, approved public professional evidence or public documentation where appropriate. Experience owns professional context; project detail owns the complete project evidence and case study. The Experience page must link to relevant Projects rather than duplicate them.

If no safe public evidence exists, the evidence region is omitted without an empty gap, disabled placeholder or unavailable action. Capabilities should connect to real evidence where possible, but the design must also support roles for which public evidence cannot be disclosed.

## 12. Confidentiality

Professional copy shown in the design is representative and provisional unless canonical content documentation already supports it. Final public content must not invent or expose:

- confidential employer information;
- internal project names;
- private screenshots;
- internal architecture;
- customer information;
- proprietary code;
- private repositories;
- internal URLs;
- unsupported metrics;
- unsupported ownership; or
- confidential business information.

Omission or a reviewed public-safe abstraction is preferable to disclosure. A design placeholder never grants permission to publish the represented information.

## 13. Responsive Experience

The named widths are representative design-review contexts, not mandatory production breakpoints. Exact breakpoints remain content-led implementation decisions.

### 320

This is a narrow stress-test. The page uses one logical reading column; metadata, contributions and evidence actions stack as needed; and no page-level horizontal scrolling is required. The design does not establish 320px as a production breakpoint.

### 390

This is the primary mobile design reference. It preserves the canonical reading order, content hierarchy, role relationships and meaningful continuations in a vertical composition.

### 768

This is an intermediate composition rather than scaled desktop. It uses available width more efficiently while preserving equivalent content, source order, actions and focus order. The design does not establish 768px as a production breakpoint.

### 1440

This is the primary desktop reference. A supporting role rail may sit beside the main professional narrative, while readable text remains constrained and context stays more prominent than decorative layout.

### 1728

This is a large-screen validation context, not a new composition. Established content-width constraints remain in force, and additional viewport width is used primarily as surrounding whitespace.

## 14. Navigation hierarchy

The primary navigation is:

```text
Home
Projects
Experience
About
Contact
```

Secondary professional resources are:

```text
Download CV
GitHub
LinkedIn
```

These hierarchies remain distinct. The primary navigation describes the site's meaningful destinations, while the CV and external profiles are discoverable professional resources.

## 15. Desktop navigation

Desktop exposes the full primary navigation directly. When `/experience` is active, Experience has a visible and semantic current-page treatment. The current state must use more than colour and must remain distinct from hover, focus and pressed feedback.

The CV may remain a prominent secondary resource. GitHub and LinkedIn do not need to compete inside the primary navigation row. Desktop navigation remains shallow and introduces no nested or mega menus.

## 16. Tablet / compact navigation

Tablet may use the compact menu pattern when all primary destinations would create crowding. This is a responsive recomposition, not a loss of content: the same destination hierarchy and professional resources remain available.

The CV may remain directly visible where layout permits. The 768px review canvas does not impose a production breakpoint; implementation should switch composition when content and available space require it.

## 17. Mobile navigation

The selected mobile pattern is an **inline expanded navigation region directly beneath the shared header**. This decision replaces any earlier unresolved choice between inline, popover, drawer and dialog-like navigation.

When collapsed:

- site identity remains visible; and
- one understandable Menu control remains available.

When expanded:

- primary navigation is exposed;
- professional resources are exposed separately;
- the region enters and remains in normal document flow;
- there is no overlay;
- there are no modal or dialog semantics;
- there is no focus trap; and
- background content is not deactivated or made inert.

The pattern is not a modal, dialog, drawer, full-screen menu or focus-trapped surface.

## 18. Primary vs professional resources

The expanded mobile region visually and semantically distinguishes:

### Primary navigation

- Home;
- Projects;
- Experience;
- About; and
- Contact.

### Professional resources

- Download CV;
- GitHub; and
- LinkedIn.

The two groups must not become one undifferentiated list. Secondary resources remain discoverable without competing as equal top-level destinations.

## 19. About and Contact

About and Contact are meaningful first-level navigation destinations, but they may remain Home sections in the MVP. PT-23 does not require `/about` or `/contact` and does not prescribe exact fragment URLs.

Implementation must preserve understandable labels, predictable cross-route navigation from Projects and Experience, reasonable current-state semantics and equivalent mobile and desktop access. It must not create duplicate or conflicting current-page states. Whether Home and an active Home section should simultaneously expose a current-state treatment remains an implementation-time validation question.

## 20. Shared footer

The shared footer supports continuation and restrained secondary navigation. It may expose identity, Home, Projects, Experience, About, Contact, GitHub, LinkedIn and the CV.

It is not a large sitemap, a SaaS-style multi-column navigation area, a newsletter surface or a place for speculative legal navigation and unrelated utilities. Its hierarchy should support, rather than compete with, the main content and header.

## 21. Navigation states

The approved state vocabulary is:

```text
default
hover
focus-visible
current
pressed
collapsed
expanded
```

- **Default** means a normally available destination.
- **Hover** is temporary pointer feedback and may use restrained surface or foreground change. No information is revealed only on hover.
- **Focus-visible** is an immediate, prominent keyboard indication. It consumes the existing PT-18 and PT-19 focus foundations and remains distinguishable from hover and current state; PT-23 creates no new focus token.
- **Current** is a persistent current-location indication using wording or structure in addition to colour. It is neither hover nor pressed.
- **Pressed** is temporary input confirmation. It does not mean current or selected.
- **Collapsed** and **expanded** are persistent states of the mobile disclosure and must be exposed programmatically during implementation.

Representative foreground, surface, focus and state combinations consume the established semantic colour roles and carry a contrast intent; implementation must verify actual contrast rather than treating the design canvas as conformance evidence.

## 22. Keyboard and focus management

Navigation follows a predictable focus order. Focus-visible remains distinct from hover, the disclosure trigger remains focusable and expanded links enter the normal keyboard sequence.

Because the mobile navigation is an inline disclosure:

- opening requires no focus trap;
- background content remains available;
- focus does not need to be forced into the navigation;
- keeping focus on the trigger after opening is valid;
- closing from the trigger naturally leaves focus on the trigger;
- focus must never move unexpectedly; and
- a future alternative close control would require intentional focus restoration to an appropriate origin.

Navigation must not depend on hover.

## 23. Semantics

Destinations use normal links. The compact-menu disclosure uses a real button or equivalent control with an understandable accessible name, visible focus and programmatically exposed collapsed or expanded state. Visible language such as **Menu** and **Close** is representative; production wording may be refined while remaining understandable. An icon-only hamburger control is not required.

The CV is a download or professional resource, and external resources use understandable labels. Generic clickable containers are not required. Ordinary navigation does not prescribe React.

## 24. Target sizing

Interactive navigation targets should normally preserve the established approximately 44–48px usable-area guidance where appropriate. This is practical touch guidance, not a universal WCAG requirement. Targets must remain comfortable and distinguishable on touch devices without creating crowding.

## 25. Reflow

Implementation must validate long labels, text enlargement, browser zoom, 320-style narrow conditions, mobile and tablet compositions, and the absence of unintended page-level horizontal overflow. Compact navigation is preferred when direct presentation would squeeze destinations into an unreadable header.

## 26. Motion

PT-23 consumes PT-20 and defines no new motion system. Appropriate navigation feedback may use the established Immediate and Fast categories, with bounded Standard expansion where useful.

Menu expansion animation is optional. Navigation remains immediately usable when motion is disabled, and reduced motion reaches the same final expanded or collapsed result without unnecessary spatial animation. No animation may delay access to navigation links.

## 27. Static-first implementation boundary

- Primary site navigation uses normal Astro links and routes.
- Experience content is static by default.
- The shared header and footer do not require React.
- Ordinary navigation does not require hydration.
- The mobile disclosure needs only minimal, bounded local state.
- No global client state is required.
- No SPA router is required.
- No global React root is required.

PT-23 does not prescribe the exact disclosure mechanism. Implementation should prefer native or progressively enhanced behaviour consistent with the high-level architecture and accepted ADRs, while preserving the documented semantics and access to essential destinations.

## 28. Content resilience

Implementation must support:

- longer organisation or context text;
- different role titles;
- different periods;
- varying contribution counts;
- optional related evidence;
- missing capability groups;
- multiple previous roles;
- longer navigation labels; and
- future copy changes.

Missing optional content leaves no placeholder or visual gap. Fixed Penpot heights and manual import-tool line breaks must not be copied into production.

## 29. Key design decisions

- Experience is not a CV reproduction.
- Contributions are prioritised over generic task lists.
- Responsibilities and contributions have different semantic roles.
- Frontend engineering remains the primary specialisation.
- Wider-stack experience remains supporting breadth.
- Experience entries support variable depth.
- Current roles use visible text and structure, not colour alone.
- Related Projects are linked rather than duplicated.
- Missing evidence is omitted without a placeholder.
- Navigation remains shallow.
- Mobile navigation uses inline expansion beneath the header.
- Mobile navigation is not modal and requires no focus trap.
- Primary destinations remain separate from professional resources.
- About and Contact may remain Home sections.
- Exact About and Contact URLs remain implementation details.
- Current state differs from hover, focus-visible and pressed states.
- Motion is optional.
- Navigation remains compatible with static Astro routes.
- React, global state and SPA routing are not required.

## 30. Open / deferred implementation decisions

PT-23 intentionally leaves unresolved:

- final professional Experience copy;
- final public-safe organisation wording;
- exact final role periods and content;
- final public evidence URLs;
- the final CV URL or file;
- final GitHub and LinkedIn destinations if not already canonical;
- exact production responsive breakpoints;
- the exact compact-navigation implementation boundary;
- the exact About and Contact fragment or URL strategy;
- whether a Home-section current-state treatment provides useful semantics;
- final component APIs; and
- any optional menu expansion transition.

These decisions require verified content or implementation evidence and must not be resolved speculatively.

## 31. Implementation-time validation

### Responsive

Validate narrow mobile, mobile, tablet or intermediate, desktop and large-desktop contexts; browser zoom; text enlargement; long labels; long role content; and variable entry depth. Confirm content-led heights, safe wrapping and no page-level horizontal overflow.

### Accessibility

Validate semantic landmarks, heading hierarchy, keyboard navigation, current location, focus-visible, programmatically exposed expanded state, no unexpected focus movement, touch targets, section links, external links, CV download semantics, representative colour contrast, reduced motion and reflow.

### Content

Validate that no fictional professional claims are introduced; representative content is replaced or intentionally approved; confidential content is absent; public evidence exists; and roles, responsibilities and contributions accurately represent verified work.

### Interaction

Validate mobile collapsed and expanded states, normal link navigation, current-route treatment, About and Contact cross-route behaviour, focus sequence, reduced motion and reasonable no-JavaScript or static behaviour where applicable.

Automated checks complement but do not replace manual responsive, accessibility, interaction and content review.

## 32. Related documentation

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
- [Projects and project-detail high-fidelity design](projects-design.md)
