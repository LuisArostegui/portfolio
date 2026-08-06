# Responsive wireframes

## 1. Purpose and scope

The approved low-fidelity wireframes validate page hierarchy, content priority, navigation, visitor journeys, accessibility expectations and responsive structural behaviour for the portfolio MVP. They translate the accepted information architecture and design principles into a reviewable structure before high-fidelity design or implementation begins.

They do not establish final colour, typography, design tokens, components, motion, visual styling, implementation breakpoints or production copy. Representative labels and review-canvas dimensions communicate intent only.

## 2. Canonical editable source

[Open the canonical responsive wireframes in Figma](https://www.figma.com/design/kYIbXQszzYSVJnQzQCKHAh/Portfolio-%E2%80%94-PT-17-Responsive-Wireframes)

Figma is the canonical editable wireframe source. This document records the structural decisions represented by that source so they remain discoverable and reviewable from the repository. When later design work changes an approved structural decision, the Figma source and this documentation must be updated together.

## 3. Wireframe conventions

- The layouts are constructed mobile first and then expanded for wider contexts.
- Greyscale blocks and neutral text keep the work deliberately low fidelity.
- Wording is representative where meaning affects hierarchy; it is not final portfolio copy.
- The mobile, tablet and desktop widths are review canvases, not implementation breakpoints.
- Annotations identify landmarks, headings, actions, focus order, responsive changes and accessibility intent.
- No final colour, typography, spacing system, component treatment, motion or other visual-design decision is implied.

## 4. Source organisation

The reviewed Figma source consolidates the work into three pages because the Starter plan limits the file to three pages. This organisation preserves the complete functional coverage without maintaining a separate page for every route or decision topic.

| Figma page | Purpose | Principal frames |
| --- | --- | --- |
| `00 — Overview & decisions` | Introduces the wireframe conventions, established structural decisions and deferred work. | `PT-17 overview canvas` |
| `01 — Shared navigation & Home` | Defines shared navigation states and the Home hierarchy at the representative mobile and desktop widths. | `Mobile navigation — closed`, `Mobile navigation — open`, `Desktop navigation`, `Home — mobile 390`, `Home — desktop 1440` |
| `02 — Routes & journeys` | Covers the remaining MVP routes and the five primary visitor journeys. | Mobile and desktop frames for Projects, Project detail and Experience; `Visitor journeys` |

## 5. Shared navigation

Navigation remains shallow and exposes equivalent destinations on mobile and desktop. Home, Projects, Experience, About and Contact form the primary hierarchy; CV, GitHub and LinkedIn remain secondary professional resources. About and Contact point to Home content rather than introducing routes.

The desktop frame presents the primary destinations in the shared header, with CV visible as a professional resource and GitHub and LinkedIn remaining secondary. The mobile source shows both closed and open states. The current wireframe proposal expands the mobile navigation inline beneath the header; its final presentation remains provisional and must not become a nested menu or require a focus trap without a later justified decision.

The mobile control needs an accessible name that reflects its action, exposes its expanded state and identifies the controlled navigation region. The intended focus order follows the visible order: brand or Home destination, navigation control, expanded destinations, then professional resources and page content. The current location must be communicated programmatically and visually without depending only on colour.

The footer closes each route with relevant navigation and professional resources, preserving useful continuation and access to CV, GitHub, LinkedIn or Contact as appropriate. Final navigation styling and detailed component specifications remain deferred.

## 6. Home

The approved Home order is:

1. Hero and professional positioning.
2. Professional summary and About content.
3. Selected projects.
4. Engineering strengths.
5. Selected experience.
6. Engineering process.
7. Contact call to action.
8. Footer.

The hero prioritises the path to Projects, with CV as a secondary action. Selected-project and selected-experience regions are previews that link to their canonical destinations rather than duplicating complete content. Positioning and summaries give recruiters a quick reading path, while evidence-led strengths and project continuation support engineering managers and engineers seeking greater depth.

On mobile, content remains in a clear linear order and actions stay close to their context. The desktop frame has more room to place positioning beside supporting engineering evidence and to present project previews with greater horizontal breadth, while preserving the same reading sequence. Projects, Experience, CV and Contact remain discoverable through the header, relevant sections, continuation actions and footer.

## 7. Projects index

The Projects index opens with selection context and presents a curated collection rather than an exhaustive archive. Each preview communicates the problem, role and professional relevance, with supporting capabilities and selected technologies subordinate to that story. A clear action leads to the canonical project-detail page.

Filtering is omitted until project volume demonstrates a genuine need. Wider layouts may use a grid; narrow layouts become a readable list without removing information. A preview must not create conflicting nested interactive targets: the detail action and any separate external evidence need distinct purposes and operable regions.

## 8. Project detail

The project header orients visitors with title, context, role, status or relevance and available public evidence before implementation detail. The structure supports both concise entries and complete case studies; unavailable optional sections disappear rather than leaving empty placeholders.

Representative long-form regions cover the problem, context, constraints, role and responsibilities, decisions, trade-offs, implementation approach, accessibility and testing or other quality practices, outcomes, limitations and lessons. Code, diagrams, tables, media and long URLs have bounded regions with captions or supporting context where relevant.

Narrow layouts preserve the narrative order and allow technical regions to scroll or reflow within their own bounds rather than forcing page-level horizontal scrolling. Wider layouts may place metadata or evidence alongside a readable long-form column. Every detail page ends with meaningful continuation towards Projects, another relevant project, Experience or Contact.

## 9. Experience

Experience communicates professional trajectory and growth through organisation or product context, role, period, responsibilities, selected contributions and capabilities. Current and completed roles must be distinguishable through text or structure rather than colour alone.

The page is not a duplicated CV or a purely decorative timeline. Entries may connect to related public-safe project or engineering evidence when it adds substance. Mobile presents entries in a direct reading order; desktop may give context, contributions and evidence more horizontal structure without changing meaning. Continuation towards Projects, CV and Contact remains available.

## 10. Responsive model

Mobile establishes the canonical content and focus order. Representative mobile, tablet and desktop frames communicate layout behaviour; tablet is needed only when a structural or interaction change cannot be inferred responsibly between the mobile and desktop examples. The reviewed source currently uses annotated mobile and desktop route frames and describes intermediate behaviour rather than defining a separate tablet design for every route.

Content and actions remain equivalent across viewports while available space expands fluidly. Layouts should avoid fixed heights, tolerate longer headings and technical content, provide touch-friendly control regions and prevent unintended page-level horizontal scrolling. Reading columns should retain usable line lengths even when wider evidence regions are available. These are responsive rules, not implementation breakpoints.

## 11. Accessibility annotations

The wireframes establish the following implementation intent:

- Use recognisable page landmarks and a meaningful heading hierarchy.
- Preserve a reading and focus order consistent with the content hierarchy.
- Provide clearly visible keyboard focus.
- Give the mobile navigation control an understandable accessible name and exposed expanded state.
- Ensure navigation and other controls are keyboard operable and have adequate touch-target regions.
- Communicate current, expanded and other meaningful states without relying only on colour.
- Keep essential information and actions available without hover.
- Support zoom, text enlargement and reflow without lost content or actions.
- Provide textual equivalents for meaningful diagrams.
- Bound overflow for code and tables while avoiding page-level horizontal scrolling.
- Give links meaningful purpose; identify external and downloadable resources appropriately.

These annotations guide later design and implementation. They do not establish WCAG conformance by themselves; automated and manual validation remain necessary.

## 12. Visitor journeys

| Journey | Starting context and required comprehension | Principal destinations | Expected continuation or professional action |
| --- | --- | --- | --- |
| Recruiter | Starts on Home and needs to understand role, specialisation and relevance quickly. | Home, selected Projects or Experience, CV and LinkedIn. | Review credible evidence and continue to Contact. |
| Engineering manager | Starts with positioning and needs evidence of judgement, ownership and quality. | Engineering strengths, Project detail and Experience. | Assess decisions and contributions, then make professional contact. |
| Software engineer | Starts from Home or shared evidence and seeks technical depth. | Project detail, code or diagrams, repository material and ADRs. | Follow related evidence or another project. |
| Direct project visitor | Lands on Project detail and needs immediate project and role orientation. | Project narrative, public evidence, related project and Experience. | Continue to related evidence or Contact without returning to Home first. |
| Mobile visitor | Starts on a narrow viewport and needs the same destinations without losing context. | Open navigation, Projects, Experience, CV and Contact. | Complete the chosen path and return through familiar navigation. |

## 13. Key decisions

- About and Contact remain sections on Home.
- Case studies remain within project-detail pages.
- Navigation remains shallow.
- Mobile and desktop preserve equivalent destinations.
- Home contains previews instead of duplicating complete canonical content.
- Project detail supports variable content depth.
- Experience prioritises context, contributions, capabilities and growth over a CV timeline.
- Technical evidence is progressively disclosed within one coherent experience.
- Every project-detail page includes a meaningful continuation path.

## 14. Assumptions and unresolved questions

The wireframes intentionally leave these questions open for the relevant later issues:

- Whether the provisional inline mobile-navigation presentation remains the best final pattern.
- How much project and experience preview content Home should contain.
- How many selected projects will have sufficient public-safe evidence for the initial release.
- How much project media will be available and useful.
- Whether sufficiently long project pages will eventually justify a local table of contents.
- How final About content divides between the professional summary and supporting detail.
- When the final CV, GitHub, LinkedIn and professional contact destinations will be available.

These are genuine content or interaction uncertainties, not permission to add speculative routes or features.

## 15. Deferred decisions

- Final palette and typography.
- Design-token values.
- Implementation breakpoints.
- Component specifications.
- Final navigation styling.
- Detailed interaction states.
- Animation and motion.
- High-fidelity page design.
- Final content and production copy.
- Implementation code.

## 16. Related documentation

- [Product vision](../product/product-vision.md)
- [Information architecture](../product/information-architecture.md)
- [Content strategy](../product/content-strategy.md)
- [Product success criteria](../product/product-success-criteria.md)
- [High-level architecture](../architecture/high-level-architecture.md)
- [Architecture decision records](../architecture/decisions/README.md)
- [ADR 0001: Use Astro as the primary frontend framework](../architecture/decisions/0001-use-astro-as-the-primary-frontend-framework.md)
- [ADR 0002: Use modern CSS as the primary styling strategy](../architecture/decisions/0002-use-modern-css-as-the-primary-styling-strategy.md)
- [ADR 0003: Use a native-first, purpose-driven animation strategy](../architecture/decisions/0003-use-a-native-first-purpose-driven-animation-strategy.md)
- [ADR 0004: Use Git-versioned Astro Content Collections](../architecture/decisions/0004-use-git-versioned-astro-content-collections.md)
- [ADR 0005: Use Cloudflare Workers Static Assets for hosting](../architecture/decisions/0005-use-cloudflare-workers-static-assets-for-hosting.md)
- [ADR 0006: Use a pragmatic, risk-based testing strategy](../architecture/decisions/0006-use-a-pragmatic-risk-based-testing-strategy.md)
- [Design principles and visual direction](design-principles.md)
