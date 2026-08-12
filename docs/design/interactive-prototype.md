# Interactive prototype and interaction contract

## 1. Purpose

PT-24 connects the approved high-fidelity portfolio design into a representative interactive journey before production implementation. The prototype is a design-validation artefact: it helps reviewers assess hierarchy, navigation, action priority, current-location awareness, discovery and continuation. It is not a coded application and does not demonstrate implemented browser behaviour.

The delivered PT-24 artefact is deliberately **representative prototype + responsive interaction contract**:

- one representative desktop prototype connects the principal portfolio surfaces;
- this document specifies how the approved mobile and tablet designs behave interactively; and
- already-approved responsive screens are not duplicated into separate prototype boards without an unresolved design question to validate.

This proportional scope is explicit. It does not claim that every literal mobile and tablet prototype flow in the original issue exists. Responsive correctness, semantics and accessibility must ultimately be validated in the production browser.

## 2. Relationship to previous design work

PT-24 consumes rather than replaces:

- the [responsive wireframes](responsive-wireframes.md);
- the [design foundations and token system](design-foundations.md);
- the [component foundations and accessibility states](component-foundations.md);
- the [motion and interaction guidelines](motion-interaction-guidelines.md);
- the [Home high-fidelity design](home-design.md);
- the [Projects and project-detail high-fidelity design](projects-design.md); and
- the [Experience and shared navigation high-fidelity design](experience-navigation-design.md).

Those documents remain authoritative for information hierarchy, responsive composition, states, accessibility intent, motion and content ownership. PT-24 connects their decisions and records interaction responsibilities without redesigning their screens, creating new routes or redefining component contracts.

## 3. Canonical prototype source

### Editable source

The approved designs and representative desktop prototype live in the existing [Portfolio — Product Design Penpot file](https://design.penpot.app/#/workspace?team-id=81f57451-85cc-819d-8008-7273b4e9b9c5&file-id=81f57451-85cc-819d-8008-762cda1b22f8). Penpot is the canonical editable design and prototype source. No new file, page identifier, board identifier or prototype URL is inferred by this document.

### Reviewer-accessible prototype

A separate read-only presentation or prototype URL is not recorded in the repository or supplied context. Publishing or capturing that reviewer-accessible URL remains a final manual Penpot action. Until it is supplied and verified, the original issue criterion requiring that link is not complete.

The written interaction contract remains independently useful if Penpot is unavailable. Access to the editable file does not substitute for a reviewer-accessible presentation link, and the repository does not store Penpot exports or prototype artefacts.

## 4. Prototype scope

The representative desktop prototype connects:

```text
Home
Projects
Project detail
Experience
About target within Home
Contact target within Home
```

It connects principal surfaces rather than making every visual element interactive. Dedicated prototype boards may simulate arrival at the About or Contact section. That simulation is a prototype limitation: About and Contact remain Home content and do not establish `/about` or `/contact` routes. Project case-study content remains within project detail.

The prototype validates hierarchy, navigation, action priority, current-location awareness, project discovery, project-detail continuation, Experience continuation, professional-resource discovery, Contact discovery and interaction intent.

## 5. Representative journeys

These are reviewer tasks through one shared prototype, not promises of separate duplicated Penpot flows.

### Main desktop journey

```text
Home
→ Projects
→ Project detail
→ Experience
→ Contact
```

The prototype supports multiple visitor intentions rather than forcing one artificial linear wizard.

### Recruiter-oriented use

```text
Home
→ understand professional positioning
→ Experience or selected work
→ CV / LinkedIn
→ Contact
```

### Engineering-manager-oriented use

```text
Home
→ engineering strengths / selected work
→ Projects
→ Project detail
→ decisions / constraints / quality
→ Experience
→ Contact
```

### Software-engineer-oriented use

```text
Home
→ Projects
→ Project detail
→ technical reasoning / public evidence
→ meaningful continuation
```

### Direct-project visitor

```text
Project detail
→ understand project and role
→ review technical evidence
→ Projects or Experience
→ Contact / professional resource
```

## 6. Interaction contract

| Surface | Control | Semantic intent | Behaviour / destination | Responsive notes |
| --- | --- | --- | --- | --- |
| Shared header | Site identity / Home | Internal navigation | Navigate to the Home top-level destination. | Remains available across compositions. |
| Shared header | Projects | Internal navigation | Navigate to `/projects`. | Direct on desktop; exposed through compact navigation where needed. |
| Shared header | Experience | Internal navigation | Navigate to `/experience`. | Direct on desktop; exposed through compact navigation where needed. |
| Shared header | About | Internal section navigation | Navigate to About content within Home; the exact production URL or fragment is deferred. | Same destination meaning on every viewport. |
| Shared header | Contact | Internal section navigation | Navigate to Contact content within Home; the exact production URL or fragment is deferred. | Same destination meaning on every viewport. |
| Compact navigation | Menu | Local disclosure control | Toggle the inline navigation region and expose expanded state programmatically. | Real control; no modal semantics, focus trap or global client state. |
| Expanded navigation | Primary destinations | Internal navigation | Expose Home, Projects, Experience, About and Contact. | Appears beneath the header in normal document flow. |
| Expanded navigation | Professional resources | Resource navigation | Expose Download CV, GitHub and LinkedIn as a separate group. | Remains distinct from primary navigation. |
| Home | View selected projects | Internal navigation | Navigate to `/projects` or an approved selected-project continuation represented by the canonical design. | Remains a normal link; no transition is required. |
| Home | View project | Internal navigation | Navigate to the corresponding genuine project-detail route. | Omit the action when no real destination exists. |
| Home | Experience continuation | Internal navigation | Navigate to `/experience`. | Preserve equivalent access across viewports. |
| Home | Contact continuation | Internal section navigation | Navigate to Contact content within Home. | Exact URL or fragment remains deferred. |
| Home | Download CV | Downloadable resource | Open or download the final approved CV when available. | Do not create a dead or placeholder link. |
| Home | GitHub / LinkedIn | External navigation | Open the verified public professional resource. | Use understandable labels; do not invent destinations. |
| Projects index | View project → | Internal navigation | Navigate to the corresponding genuine project-detail route; the explicit action owns navigation. | The whole card need not become one giant clickable container. |
| Project detail | ← All projects / Back to Projects | Internal navigation | Navigate to `/projects`. | Does not depend on browser Back. |
| Project detail | Related experience → | Internal navigation | Navigate to `/experience` when a genuine relationship is represented. | Link rather than duplicate Experience content. |
| Project detail | Next or related project | Internal navigation | Navigate only to a manually curated, genuine project destination. | Omit when unavailable. |
| Project detail | View repository ↗ | External navigation | Open a real public repository. | Omit when no public repository exists. |
| Project detail | Open live demo ↗ | External navigation | Open a real live destination. | Omit when no live destination exists. |
| Project detail | Professional contact → | Internal section navigation | Navigate to Contact content within Home. | Exact URL or fragment remains deferred. |
| Experience | Selected projects | Internal navigation | Navigate to `/projects`. | Supports meaningful continuation rather than duplicating project detail. |
| Experience | Related project / evidence | Internal or external navigation | Navigate to a genuine related project or public-safe resource. | Omit unavailable evidence without disabled controls. |
| Experience | Professional contact | Internal section navigation | Navigate to Contact content within Home. | Same destination meaning on every viewport. |
| Experience | CV | Downloadable resource | Open or download the final approved CV when available. | Final resource remains a content dependency. |
| Shared footer | Primary and professional destinations | Navigation and resources | Preserve the header hierarchy and useful continuation without creating a second navigation architecture. | Recompose responsively without changing destination meaning. |

Closing compact navigation returns it to the collapsed inline state. The table records responsibilities, not exact component APIs, filenames, event handlers or production breakpoints.

## 7. Link and action semantics

### Internal navigation

Home, Projects, Experience, View project, All projects and Contact use normal links. Section navigation remains link behaviour even when the exact Home fragment strategy is deferred.

### Local state

Menu is a button or equivalent real control because it changes the local expanded or collapsed state. Links must not be repurposed to toggle local UI state.

### External resources

GitHub, LinkedIn, a public repository and a live demo use external links with understandable purpose. Only verified, public destinations are exposed.

### Downloadable resource

The CV is a downloadable or directly viewable professional resource. It appears only after a final approved public asset and destination exist.

Generic clickable containers, invisible hotspots and unexplained interaction regions must not replace visible semantic controls.

## 8. Responsive interaction contract

Dedicated interactive mobile and tablet prototypes are not claimed. Their behaviour follows the approved responsive designs and this contract.

### Mobile

```text
Header
→ Menu
→ inline expanded navigation
→ destination
→ normal page navigation
```

The expansion occurs beneath the header, remains in normal document flow and is not a modal, drawer or full-screen overlay. It requires no focus trap or background deactivation. Mobile exposes the same core destinations as desktop, with primary navigation and professional resources kept distinct.

### Tablet / compact

When available width no longer supports the full desktop navigation, the compact model preserves the same destination hierarchy and CV or resource access according to available space. Tablet is an intermediate responsive composition rather than scaled desktop. The 768px review context is not a mandatory production breakpoint.

### Desktop

Desktop exposes primary navigation directly where space supports it. Current location remains visible and semantic, while the CV, GitHub and LinkedIn remain secondary professional resources. Navigation stays shallow.

## 9. Interaction states

PT-24 references the approved states rather than creating new variants:

```text
default
hover
focus-visible
current
pressed
collapsed
expanded
```

- **Hover** is temporary pointer feedback and reveals no essential information.
- **Focus-visible** provides prominent keyboard orientation and remains distinct from hover.
- **Current** communicates persistent location through more than colour.
- **Pressed** is temporary input acknowledgement, not current or selected state.
- **Collapsed** and **expanded** communicate persistent disclosure state programmatically and visually.

These states are not interchangeable. Essential actions remain available without hover or motion.

## 10. Focus and keyboard expectations

Production implementation must provide logical focus order, visible focus, keyboard-operable Menu control, programmatically exposed expanded state and no hover dependency. Expanded links join the normal document order.

Opening inline navigation does not require forced focus movement or a focus trap. Keeping focus on the Menu control is valid. Closing must not move focus unexpectedly; a future alternative close control would require predictable restoration to an appropriate origin.

> The Penpot prototype does not validate real browser keyboard or focus behaviour.

These expectations are implementation requirements, not claims about prototype capability.

## 11. Motion

PT-24 consumes the approved PT-20 motion guidance. Ordinary route navigation has no required transition:

```text
normal navigation
→ no required animation
```

Mobile disclosure may later use a restrained, bounded transition if it materially improves comprehension. It must not imply drawer movement, SPA navigation, client routing or a required animation runtime. Motion cannot delay navigation, hide the destination or become the only communication of state.

## 12. Reduced motion

Reduced motion reaches the same final states, removes unnecessary spatial movement, keeps navigation immediate and leaves state understandable without animation. Content access is never delayed.

A separate complete reduced-motion prototype is not required by this proportional scope because the interaction outcome is already specified. The actual `prefers-reduced-motion` response remains a production-browser validation requirement.

## 13. Public professional resources

- **GitHub** is an external public profile or resource.
- **LinkedIn** is an external public professional profile.
- **CV** is the final public downloadable or viewable professional resource when it exists.

No final destination is invented here. A resource without a canonical, approved URL or asset remains an implementation or content dependency and must not appear as a dead link.

## 14. Contact behaviour

Contact remains straightforward Home content. The prototype may navigate to a simulated Home Contact board, while production must use the final approved normal document or section-navigation mechanism.

PT-24 introduces no contact form, scheduling tool, backend or third-party integration. It also establishes no `/contact` route.

## 15. Prototype limitations

The Penpot prototype does not prove:

- semantic HTML or actual link and button semantics;
- keyboard behaviour or focus management;
- screen-reader output;
- browser history or native anchor behaviour;
- browser zoom, text enlargement or reflow;
- real downloads or external-link behaviour;
- JavaScript failure or network behaviour;
- reduced-motion media-query behaviour;
- production animation;
- actual device or application performance;
- Core Web Vitals; or
- accessibility conformance.

It also cannot establish real route integrity, dynamic content resilience or browser-specific behaviour. These limitations become implementation and validation requirements rather than completed work.

## 16. Why mobile and tablet were not duplicated as complete prototypes

This is a proportional design-prototyping decision, not incomplete responsive design:

- high-fidelity responsive layouts already exist;
- mobile closed and expanded navigation states are explicitly designed;
- responsive transformation, semantics and focus expectations are documented;
- duplicating the same interactions across many viewport-specific boards would increase maintenance without materially reducing implementation uncertainty;
- responsive correctness must ultimately be tested in a real browser; and
- one interaction contract makes ownership and expected outcomes clearer.

The prototype validates remaining interaction assumptions. It does not rebuild the portfolio as a fake application inside Penpot.

## 17. Validation scenarios for PT-25

### Recruiter

Without additional explanation, identify role and specialisation, reach Projects or Experience, locate the CV or LinkedIn, and reach Contact.

### Engineering manager

Locate engineering strengths, enter Projects, inspect project reasoning, find Experience and reach Contact.

### Software engineer

Open project detail, find decisions, trade-offs and technical evidence, identify genuine public evidence and continue to another meaningful destination.

### Direct-project visitor

Understand project context and role, find technical evidence, return to Projects or continue to Experience, and reach Contact or a professional resource.

### Mobile reviewer

Use the approved mobile designs and this interaction contract to evaluate Menu discovery, expanded-navigation hierarchy, current location and access to Projects, Experience and Contact. Confirm that primary destinations and professional resources remain distinct.

These are implementation-independent review tasks. Real responsive and mobile interaction validation remains a production-browser requirement.

## 18. Implementation-time requirements

Future implementation issues must verify:

- semantic links and buttons;
- real routing and route integrity;
- About and Contact section navigation;
- browser history and native navigation behaviour;
- keyboard operation, focus-visible and logical focus order;
- expanded-state semantics and appropriate focus restoration;
- browser zoom, text enlargement and reflow;
- reasonable no-JavaScript behaviour where applicable;
- reduced-motion behaviour;
- external-link purpose and destinations;
- the final CV resource;
- equivalent responsive content and actions;
- long headings and variable project or Experience content;
- accessibility through automated and manual testing; and
- performance in the production application.

Implementation must retain the static-first architecture: ordinary navigation uses normal Astro links, static presentation does not require React hydration, Menu owns only minimal local state, and no SPA router, global React root or global client state is required.

## 19. Deferred decisions

PT-24 intentionally leaves unresolved:

- the exact About and Contact URL or fragment strategy;
- the exact mobile disclosure implementation;
- the final CV resource;
- final external URLs where they are not already canonical;
- the reviewer-accessible Penpot presentation or prototype URL;
- optional cross-document View Transitions;
- exact responsive breakpoints; and
- implementation component boundaries.

These require verified content, a manual Penpot publication action or production evidence and must not be resolved speculatively.

## 20. Status against the original issue

The representative desktop prototype and complete responsive interaction contract fulfil the deliberately revised design objective. They do not literally complete the original issue criteria that require interactive mobile flows and a reviewer-accessible prototype link.

The current issue text has not been modified. Until it is updated or the remaining literal artefacts are supplied, PT-24 should reference issue #39 rather than close it automatically. This distinction keeps the delivered design decision transparent without treating proportional scope as missing design work.
