# Component foundations

## 1. Purpose

This document is the canonical, implementation-facing record of the component foundations approved for PT-19. It translates the approved visual work into reusable rules for component responsibility, semantics, interaction, accessibility and content resilience. It is implementation-neutral: it does not define production component APIs, files or styling.

These foundations are deliberately proportionate to a static-first professional portfolio. Accessibility is part of every component contract, not a final quality-assurance phase. Components should communicate professional context and engineering evidence clearly without speculative application patterns or design-system complexity.

## 2. Design references

The visual component foundations are maintained in Penpot:

- [PT-19 component foundations — Penpot](https://design.penpot.app/?_gl=1*12fwxa4*_gcl_au*MTA2MzA0OTkyOS4xNzg2MTAyMzU3Li0uLS4xNzg2MTE0ODc5LjExMDA1ODgzNDcuMTc4NjExNDg4MC4xNzg2MTE0OTUz*_ga*NjEwMzg5ODk0LjE3ODYxMDIzNTc.*_ga_K0KF97C51Q*czE3ODYxMTQ0MTMkbzIkZzEkdDE3ODYxMTUxODYkajQ3JGwwJGgw#/workspace?team-id=81f57451-85cc-819d-8008-7273b4e9b9c5&file-id=81f57451-85cc-819d-8008-7375f67ec471&page-id=77158d26-68a7-80e1-8008-73762a419595&layout=layers)
- [Portfolio design project — Penpot](https://design.penpot.app/?_gl=1*12fwxa4*_gcl_au*MTA2MzA0OTkyOS4xNzg2MTAyMzU3Li0uLS4xNzg2MTE0ODc5LjExMDA1ODgzNDcuMTc4NjExNDg4MC4xNzg2MTE0OTUz*_ga*NjEwMzg5ODk0LjE3ODYxMDIzNTc.*_ga_K0KF97C51Q*czE3ODYxMTQ0MTMkbzIkZzEkdDE3ODYxMTUxODYkajQ3JGwwJGgw#/dashboard/files?team-id=81f57451-85cc-819d-8008-7273b4e9b9c5&project-id=3be9e5e1-190f-8090-8008-727473508846)
- [PT-18 design foundations / shared library — Penpot](https://design.penpot.app/#/workspace?team-id=81f57451-85cc-819d-8008-7273b4e9b9c5&project-id=3be9e5e1-190f-8090-8008-727473508846&file-id=81f57451-85cc-819d-8008-7289fce2780a&page-id=81f57451-85cc-819d-8008-7289fce2780b)

Penpot is the visual reference for the seven approved boards: Action foundations, Navigation foundations, Content & hierarchy foundations, Project foundations, Experience foundations, Technical content foundations, and Accessibility & feedback foundations. This repository document is the authoritative implementation-facing specification. If the authenticated Penpot workspace is unavailable, implementation must follow this written specification and must not infer missing visual details.

## 3. Relationship to design foundations

PT-19 consumes the tokens and global rules established by [Design foundations](design-foundations.md). It follows the existing flow:

```text
Primitive value
→ Semantic role
→ Component consumption
```

Components should consume the established surface, text, border, accent and focus roles rather than duplicate primitive values or create arbitrary component colours. The existing typography, spacing, content-width, radius, target-size and interaction-state foundations also apply. A component-specific token is justified only by demonstrated repetition and shared meaning; PT-19 introduces none.

This document does not establish a light theme, feedback colour palette, additional elevation levels or motion tokens. A later concrete requirement must justify any extension to the foundations.

## 4. Shared component principles

- **Semantics before appearance.** Visual hierarchy does not decide the HTML element. Links navigate; buttons perform operations or change local state.
- **Native before custom.** Prefer semantic HTML and simple platform behaviour when it satisfies the requirement.
- **Content before container.** Height is content-led. Text and labels may grow, wrap and reflow without truncation, overlap or fixed-height assumptions.
- **Structure before decoration.** Use spacing and hierarchy first; add surfaces, borders or elevation only when they communicate a real boundary or relationship.
- **Evidence before ornament.** Technical presentation, media, tags and icons support meaning rather than becoming a decorative identity.
- **Progressive enhancement.** Essential content and navigation remain available without hydration, animation or pointer hover.
- **Equivalent responsive access.** Responsive compositions preserve essential destinations, information, semantic source order, reading order and keyboard focus order.
- **Proportionate variants.** Add a component or variant only for a demonstrated content, interaction or accessibility need.
- **Public safety.** Professional evidence must follow the repository's confidentiality and attribution rules.

Interactive targets should normally provide approximately 44–48px of usable area. A small glyph may sit inside a larger hit area. Hover is supplementary; important information and actions must not depend on it.

## 5. Component inventory

| Family                | Foundations                                                                                                                                   |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Actions               | Primary action, secondary action, text link, icon-supported action/link, contact action, CV download action, external link, download link     |
| Navigation            | Site header, primary navigation, mobile trigger and panel, current item, skip link, footer, conditional breadcrumbs, resource links           |
| Content and hierarchy | Page and section headers, introductory text, content section, prose, capability item, tag, metadata, definition list, statement/quote, notice |
| Projects              | Preview, collection, metadata, status, detail header, case-study section, decision, trade-off, technical evidence, continuation navigation    |
| Experience            | Entry, ordered collection/timeline, role metadata, contributions, capability/evidence connections, current role, related evidence             |
| Technical content     | Inline code, technical metadata, code excerpt, terminal output, diagram, table, media, caption, wide-content region                           |

This inventory names responsibilities, not mandatory implementation components. Closely related patterns may share an implementation when their semantics and contracts remain clear.

## 6. Actions

### Action responsibilities

- A **primary action** represents the clearest continuation in a context. It may be an anchor or a button according to behaviour.
- A **secondary action** provides a valid alternative without competing with the primary path. Its quieter appearance does not weaken its semantics or accessibility.
- A **text link** communicates navigation within prose or compact supporting content through more than colour alone.
- An **icon-supported action or link** retains an understandable visible label. The icon supplements meaning and is hidden from assistive technology when decorative.
- A **contact action** identifies the destination or contact method clearly. It is normally navigation to a contact destination or an appropriate URI, not a simulated button operation.
- A **CV download action** is an anchor to the real resource and communicates that it downloads a file where that outcome may not be obvious.
- An **external link** communicates its destination and, where useful, that it leaves the portfolio. Opening a new browsing context is not automatic; if used, it must be communicated and implemented safely.
- A **download link** uses native link/download semantics where appropriate and provides useful file context when known.

A link may visually resemble a primary or secondary action while remaining an anchor. Buttons must not be used for URL navigation, and links must not be used to change local UI state. Labels grow or wrap rather than truncate. Unavailable links and resources are omitted; disabled styling is reserved for genuinely unavailable controls.

### Interaction sequence

Interactive visuals follow:

```text
default → hover → focus-visible → active/pressed
```

These are distinct conditions, not necessarily a temporal sequence for every input method. Focus-visible remains clearly distinguishable from hover and from the component's existing border. Active/pressed feedback is temporary unless a separate semantic state applies. Disabled is outside the sequence and exists only where the control remains meaningful but is genuinely unavailable.

## 7. Navigation

### Site-wide navigation

The **site header** establishes identity and access to shallow, predictable core destinations. **Primary navigation** uses a semantic navigation landmark and a meaningful accessible name when multiple navigation regions exist. Desktop and mobile treatments expose equivalent essential destinations.

The **current navigation item** combines semantic exposure, such as `aria-current` where appropriate, with a visible structural or textual cue. Current location and hover are different concepts; neither may rely on colour alone.

### Mobile navigation

The **mobile navigation trigger** is a real button with an accessible name and a programmatically exposed expanded/collapsed state. Its relationship to the controlled panel must remain understandable. Opening and closing navigation preserves sensible focus behaviour, and closing a temporary surface restores focus to an appropriate logical location when focus moved into it.

Mobile navigation does not imply React. Use the simplest accessible implementation compatible with the final interaction. Essential destinations must not become inaccessible because hydration fails.

### Supporting navigation

- The **skip link** targets the main content and becomes clearly visible on keyboard focus.
- The **footer** provides supporting navigation, contact or professional-resource context and essential repository/legal information without duplicating the entire page hierarchy.
- **Breadcrumbs** appear only when a real multi-level hierarchy benefits from them; the shallow top-level structure does not require them by default.
- Internal, external and download resources use the action treatments defined above.
- CV, GitHub, LinkedIn and similar resources remain secondary resources unless product requirements explicitly change the top-level hierarchy.

## 8. Content and hierarchy

### Structural content

- A **page header** identifies the page and supplies only the context needed to orient the visitor.
- A **section header** names and introduces a meaningful group. Its heading level follows document structure rather than visual size.
- **Introductory text** establishes purpose and context without replacing the detailed content below.
- A **content section** groups related material with semantic structure and spacing. It is not automatically a card.
- A **prose container** uses the established readable content width. Diagrams, tables and media may move into standard or wide evidence regions while surrounding explanation remains readable.

### Supporting information

- A **capability or engineering-strength item** names a capability and supplies context or evidence. It never presents a percentage, rating or unsupported proficiency level.
- A **tag or technology label** is supporting metadata, not a logo wall or a substitute for explaining relevance.
- A **metadata list** groups related supporting facts. Use list semantics where order is not a key/value relationship.
- A **definition or key/value list** uses definition-list semantics when terms genuinely map to values.
- A **highlighted statement or quote** is used only when emphasis or attribution has meaning; visual prominence must not manufacture authority.
- A **notice or callout** separates genuinely useful context from the main narrative. It uses existing semantic foundations and does not imply an unsupported warning/success taxonomy.

All content uses content-led height. Enlarged or long text must wrap without truncation or overlap. Responsive rearrangement preserves semantic source, reading and focus order.

## 9. Projects

### Project previews and collections

A **project preview** communicates:

- project context or purpose;
- role or ownership stated proportionately;
- professional or engineering relevance;
- technologies as supporting metadata; and
- one clear primary continuation path.

The preview must avoid conflicting nested click targets. Do not make an entire card clickable when it contains separate interactive descendants. A **project collection** supports scanning and comparison while allowing variable content length; it must not require equal or fixed card heights.

**Project metadata** contains concise supporting facts. A **project status** is used only when relevant and communicates meaning through text and structure, not colour alone.

Repository, live-demo, screenshot, diagram and optional case-study links or sections are omitted when unavailable. Missing resources do not produce disabled links, fake empty states or invented placeholders.

### Project detail and case studies

A **project-detail header** establishes context, actual ownership and professional relevance before implementation depth. The overall sequence should make the following easy to understand:

```text
context → ownership → reasoning → evidence/outcome
```

A **case-study section** adapts to available public evidence rather than enforcing an identical template. Where applicable, the reasoning structure includes context/problem/constraints, role/ownership, decisions, trade-offs, outcome and lessons.

- A **decision block** makes an important choice, rationale and consequence scannable without replacing surrounding prose.
- A **trade-off block** presents meaningful benefits, costs and constraints without implying certainty that evidence does not support.
- A **technical evidence block** frames code, diagrams, tables or media with enough explanation to establish relevance and accessibility.
- **Related or continuation navigation** provides a clear next path without manufacturing relationships.

Never invent metrics. Evidence must be accurate, attributable and public-safe. Project presentation is static by default and does not justify hydration.

## 10. Experience

An **experience entry** explains professional context, responsibility, selected contributions and growth rather than reproducing a CV. **Role metadata** communicates organisation or public-safe context, role and period accurately. A **contribution list** demonstrates applied responsibility using evidence-oriented language.

An ordered **professional collection or timeline** preserves chronological comprehension without making chronology the only hierarchy. Depth follows professional relevance and available evidence. Roles may have different content lengths and must not be forced into equal heights.

**Capability/evidence connections** link capability claims to real contributions or projects. **Related evidence links** avoid duplicating detailed project material. A **current-role treatment** uses explicit text and semantic/structural cues rather than colour alone; previous roles remain fully readable and are never styled as disabled.

Do not introduce confidential employers, projects, screenshots, metrics or implementation details unless already approved for public use. Experience remains static by default.

## 11. Technical content

Technical presentation supports reasoning and evidence; it is not decorative identity.

- **Inline code** identifies actual notation within prose.
- **Technical metadata** may use the established technical type role when monospace improves interpretation.
- A **code excerpt** includes only enough public-safe code to demonstrate the point. Complete source belongs in the repository.
- **Terminal output** is appropriate only when the command or output itself provides evidence; ordinary biography, headings and navigation must not imitate a terminal.
- An **architecture diagram** has equivalent surrounding textual explanation and cannot encode meaning through colour alone.
- A **table** represents genuine structured relationships or comparisons. Narrative prose must not be forced into rows and columns.
- **Screenshots and media** require an evidential purpose, accessible treatment, useful caption/context where appropriate and confidentiality review.
- A **caption** identifies or explains the evidence and its relevance; it does not merely repeat nearby text.
- A **wide technical-content region** may use bounded local horizontal overflow where reflow would destroy meaning.

IBM Plex Mono, or the established equivalent, is limited to actual technical notation, code and selected metadata. Page-level horizontal overflow is unacceptable. Ordinary long strings and URLs wrap safely.

## 12. Interaction and semantic states

### Focus-visible

Focus-visible is a system requirement for every interactive component. It must be obvious on every supported surface, distinguishable from hover, and not disappear into an existing border. Filled, secondary, text and icon-supported controls receive equivalent focus consideration. Implementations must not remove the user-agent outline without supplying an equally perceivable replacement based on the established focus role.

### Semantic states

| State    | Contract                                                                                                                             |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Current  | Identifies the visitor's present location or item with relevant semantics and a non-colour cue.                                      |
| Selected | Identifies a chosen option or item; it is not interchangeable with current.                                                          |
| Expanded | Exposes whether controlled content is open and preserves an understandable control relationship.                                     |
| Invalid  | Identifies the actual problem in text and uses appropriate form semantics; colour is supplementary.                                  |
| Disabled | Represents genuine control unavailability, remains programmatically meaningful where applicable and is not used for missing content. |

Do not collapse these concepts into a generic “active” state. State is communicated through semantics plus text, structure or shape where appropriate, never colour alone.

Loading, success, error and empty are deferred conceptual application states. Static content must not imitate asynchronous behaviour. PT-19 does not create success/error colours; any future feedback meaning must initially use text, structure and existing foundations until a real requirement justifies token expansion.

## 13. Accessibility contract

Every eventual component specification and implementation must define its element semantics, accessible name where needed, keyboard behaviour, focus treatment, state exposure, target size and content-resilience expectations.

The shared contract requires:

- native semantic HTML wherever it satisfies the behaviour;
- an accessible name for every control, including icon-only controls when exceptionally justified;
- visible, operable keyboard focus and logical focus order;
- no important information or action available only on hover;
- semantic and non-colour communication of status and state;
- text explanation tied to the relevant field or control for invalid input;
- no focus movement merely because content appears visually;
- logical focus restoration after temporary interaction surfaces close;
- approximately 44–48px usable targets for controls in ordinary circumstances;
- complete meaning and functionality when motion is reduced or absent; and
- appropriate accessible alternatives, captions or surrounding explanation for evidence media.

Explicitly reject clickable `div`/`span` elements, buttons for navigation, links for local state, unnamed icon-only controls, hover-only actions, colour-only statuses, conflicting nested card actions and inaccessible custom controls where a native/simple pattern suffices.

Custom tabs, menus, accordions, dialogs, carousels, progress indicators and application-state components must not be introduced before a concrete product requirement establishes their need and accessibility contract.

## 14. Responsive and content resilience

- Text enlargement and zoom must not truncate essential content, labels or actions.
- Component height remains content-led; fixed heights are inappropriate for variable professional content.
- Components recompose before readable text or targets become cramped.
- Responsive changes preserve logical source, reading and keyboard order.
- Essential content and actions remain equivalent across viewport treatments.
- Long-form text uses the readable width; evidence may use wider established regions.
- Local bounded overflow is reserved for code, tables, diagrams or technical data whose meaning would be damaged by reflow.
- Page-level horizontal scrolling is not acceptable; ordinary strings and URLs wrap safely.
- Reduced-motion preferences are honoured whenever motion is introduced. Motion remains progressive enhancement and never carries essential meaning alone.

Exact breakpoints and responsive type adjustments remain implementation decisions driven by content rather than named devices.

## 15. Astro vs React guidance

Most foundations should be implemented with Astro, semantic HTML and CSS: headers, navigation links, navigational actions, project cards and collections, experience entries, metadata, tags, prose, code blocks, diagrams/media wrappers, tables, skip links and the footer. Hover, focus and responsive CSS behaviour do not justify React.

React is a possibility only when concrete client-side interaction or local state requires hydration. If justified:

- keep state local to the island;
- preserve native semantics and behaviour where possible;
- render essential content independently of successful hydration; and
- do not introduce a global React root, global store or client-side router.

The final mobile-navigation behaviour should use the simplest accessible implementation; this document does not prescribe its framework ownership.

## 16. Content and data boundaries

Component contracts express presentation and domain intent, not storage-provider details. They must not accept Astro Content Collection entries merely because Markdown content is stored through that system.

```text
Canonical Markdown / Content Collection entry
→ small query or mapping boundary
→ deliberate component-facing data
```

For example, a project preview should receive the fields or presentation-oriented summary needed to communicate context, ownership, relevance and continuation. It should not receive a collection entry and discover those responsibilities internally. Small explicit boundaries improve clarity and testability; this does not require a full abstraction layer or hexagonal architecture.

## 17. Anti-patterns

Reject:

- speculative components and variants;
- wrapping every element or section in a card;
- fixed component heights for content that may grow;
- logo or technology walls;
- skill progress bars, percentages or arbitrary ratings;
- colour-only state communication;
- hover-only information or interactions;
- conflicting nested click targets;
- disabled placeholders for missing project resources;
- decorative code or terminal UI;
- arbitrary carousels or advanced custom controls without a product need;
- React or hydration for static presentation;
- component contracts coupled directly to content-storage models;
- asynchronous feedback states without asynchronous behaviour; and
- invented metrics, evidence or confidential detail.

## 18. Open and deferred decisions

PT-19 intentionally does not decide:

- final production component APIs, names or composition boundaries;
- exact Astro or React files;
- exact responsive breakpoints;
- a new feedback colour palette;
- advanced overlay primitives or custom dialog/menu/tab patterns;
- application loading, success, error or empty-state implementations;
- concrete motion tokens;
- production icon-library selection;
- speculative variants unsupported by real content; or
- exact visual details that are not captured by this specification and cannot be inspected in Penpot.

These items remain undecided rather than implied recommendations. A later requirement, content model, accessibility review or implementation task must provide evidence before resolving them.
