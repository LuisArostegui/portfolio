# Design foundations

## 1. Purpose and scope

These foundations translate the approved design principles and PT-17 wireframes into reusable visual decisions. They establish a common vocabulary for colour, typography, spacing, layout, surfaces, interaction states and technical content so later component and page design can remain coherent.

The direction is professional, confident, precise, technically informed, content-led, modern, accessible and restrained. It should be distinctive without becoming decorative. The portfolio must not resemble a SaaS product clone, a terminal-themed novelty site, an interaction showcase or a generic template portfolio.

This is the canonical repository record of the implementation-neutral foundations established by PT-18. It is deliberately proportionate to one professional portfolio, not a complete enterprise design system. It does not implement production CSS, define component APIs or prescribe final high-fidelity page compositions. Evidence from component work, content and accessibility review may refine it later.

## 2. Token architecture

```text
Primitive value
→ Semantic role
→ Component consumption
```

### Primitive tokens

Primitives are raw, reusable values with no page or component meaning. Initial groups are `colour.neutral.*`, `colour.accent.*`, `space.*`, `radius.*` and `container.*`.

### Semantic tokens

Semantic tokens alias primitives by purpose. They communicate intent and insulate consumers from raw values. Initial groups are `colour.surface.*`, `colour.text.*`, `colour.border.*`, `colour.accent.*`, `colour.focus.*`, `layout.gutter.*` and `layout.content.*`. Components should normally consume these roles instead of primitives.

### Typography tokens

Penpot contains the composite roles `type.display`, `type.heading-1`, `type.heading-2`, `type.heading-3`, `type.body-large`, `type.body`, `type.body-small`, `type.label`, `type.metadata` and `type.code`. Each represents a complete typographic role—family, size, line height and weight—not a component-specific token.

### Component-specific tokens

No component-specific tokens are defined by PT-18. PT-19 may introduce one only when a component-level decision repeats, semantic tokens are insufficient, the abstraction adds useful meaning and consistent future change would benefit. A component does not receive a token merely because another design system has one.

Token additions must demonstrate reuse, meaning or a valuable shared relationship. Reviews should reject redundant aliases, synonyms and speculative values, and remove unused tokens when identified.

## 3. Token naming principles

- Prefer purpose over appearance.
- Use hierarchy to reveal category and intent.
- Keep semantic names meaningful when primitive values change.
- Avoid page-specific, temporary and redundant names.
- Keep scales deliberately limited.
- Prefer semantic tokens over primitives at the point of consumption.

Representative names include `colour.text.primary`, `colour.text.secondary`, `colour.surface.page`, `colour.surface.elevated`, `colour.border.subtle`, `colour.accent.default`, `colour.focus.ring`, `layout.content.readable` and `layout.gutter.desktop`.

Names such as `dark-grey-text`, `card-grey`, `project-page-blue`, `nice-shadow` and `big-spacing` obscure intent and must be avoided. A future CSS mapping converts dot notation to kebab-cased custom properties:

```text
colour.text.primary     → --colour-text-primary
space.5                 → --space-5
radius.1                → --radius-1
layout.content.readable → --layout-content-readable
```

PT-18 does not implement those properties.

## 4. Primitive colour foundations

### Neutral scale

| Token | Value |
| --- | --- |
| `colour.neutral.0` | `#FFFFFF` |
| `colour.neutral.100` | `#F5F7FA` |
| `colour.neutral.300` | `#D4D9E1` |
| `colour.neutral.500` | `#8A93A3` |
| `colour.neutral.700` | `#444C5A` |
| `colour.neutral.800` | `#2B313B` |
| `colour.neutral.850` | `#22272F` |
| `colour.neutral.900` | `#171B21` |
| `colour.neutral.950` | `#0D0F12` |

### Accent scale

| Token | Value |
| --- | --- |
| `colour.accent.400` | `#A9B4FF` |
| `colour.accent.500` | `#8B9CFF` |
| `colour.accent.600` | `#6F7FEA` |

The controlled periwinkle accent is a signal, not a large-area surface system. A secondary accent and success, warning, informational or error palettes must not be added without a concrete product state that needs them.

## 5. Semantic colour foundations

| Role | Alias | Value | Purpose and contrast intent | Inappropriate use and additional cues |
| --- | --- | --- | --- | --- |
| `colour.surface.page` | `colour.neutral.950` | `#0D0F12` | Base page canvas supporting light text. | Not an interactive state. |
| `colour.surface.default` | `colour.neutral.900` | `#171B21` | Ordinary grouped content on the page. | Do not turn every section into a card. |
| `colour.surface.subtle` | `colour.neutral.850` | `#22272F` | Quiet tonal separation. | Do not rely on tone alone when a boundary is essential. |
| `colour.surface.elevated` | `colour.neutral.800` | `#2B313B` | Temporary or genuinely raised context. | Not the default content surface; retain a structural boundary where needed. |
| `colour.text.primary` | `colour.neutral.100` | `#F5F7FA` | Primary reading text on dark surfaces. | Do not use for every level of hierarchy. |
| `colour.text.secondary` | `colour.neutral.300` | `#D4D9E1` | Supporting text on dark surfaces. | Not a substitute for reduced font size alone. |
| `colour.text.muted` | `colour.neutral.500` | `#8A93A3` | Genuinely secondary metadata. | Not for essential instructions or low-contrast body copy. |
| `colour.text.accent` | `colour.accent.400` | `#A9B4FF` | Limited high-emphasis text or links. | Never the sole cue for links or state. |
| `colour.text.on-accent` | `colour.neutral.950` | `#0D0F12` | Text placed on an accent control or signal. | Use only where the pairing is contrast-validated. |
| `colour.border.subtle` | `colour.neutral.800` | `#2B313B` | Quiet grouping between dark surfaces. | Not sufficient alone for critical state. |
| `colour.border.strong` | `colour.neutral.700` | `#444C5A` | Explicit boundaries. | Avoid outlining all content. |
| `colour.border.accent` | `colour.accent.500` | `#8B9CFF` | Limited high-emphasis boundary. | Add text, structure or another cue for meaning. |
| `colour.accent.default` | `colour.accent.500` | `#8B9CFF` | Default interactive accent. | Do not use as a large decorative field. |
| `colour.accent.hover` | `colour.accent.400` | `#A9B4FF` | Pointer-hover feedback. | Hover cannot be the only sign of interactivity. |
| `colour.accent.active` | `colour.accent.600` | `#6F7FEA` | Pressed or active feedback. | Pair persistent state with semantic and non-colour cues. |
| `colour.focus.ring` | `colour.accent.400` | `#A9B4FF` | Clearly perceivable focus-visible ring. | Must not be replaced by a subtle colour shift. |

Exact combinations require contrast review in their real context. Colour must never be the sole carrier of meaning. The initial foundation is dark. If a future design needs a light surface or embedded light context, it must use semantic foreground, border and state combinations validated for that context rather than reuse dark-context values by assumption. This does not establish a light theme: the dark direction does not imply alternative themes, and no theme switcher is required.

## 6. Typography foundations

The typographic personality is readable, professional, confident, contemporary and technically informed without becoming terminal-themed.

**Primary family:** Manrope for display, headings, body, controls, labels, ordinary metadata and professional communication. Fallback order is Manrope → Inter → system sans-serif.

**Technical family:** IBM Plex Mono only where monospaced notation helps—inline code, code blocks, token names, terminal content and selected technical metadata. Monospace is not the portfolio's default personality. No font files are added by PT-18.

| Role | Size | Line height | Weight |
| --- | --- | --- | --- |
| Display | 64px | 68px | ExtraBold |
| Heading 1 | 48px | 56px | Bold |
| Heading 2 | 36px | 44px | Bold |
| Heading 3 | 28px | 36px | SemiBold |
| Body large | 20px | 30px | Regular |
| Body | 16px | 26px | Regular |
| Body small | 14px | 22px | Regular |
| Label | 14px | 20px | SemiBold |
| Metadata | 12px | 18px | Medium |
| Code | 14px | 22px | Regular / mono |

Display uses slight negative tracking; the largest headings use restrained negative tracking. Body and technical reading retain default tracking unless evidence justifies a change.

Long-form prose normally uses the readable container and generous body line height. Semantic heading order must not be replaced by visual size. Headings should scale down before essential body text becomes uncomfortably small; enlarged text, browser zoom and reflow must remain viable. Exact responsive type breakpoints remain implementation decisions.

Font loading must avoid invisible text and minimise layout shifts. Fallback rendering must remain usable, IBM Plex Mono must not block ordinary content, and every added weight or variant must justify its performance cost.

## 7. Spacing foundations

| Token | Value |
| --- | --- |
| `space.1` | 4px |
| `space.2` | 8px |
| `space.3` | 12px |
| `space.4` | 16px |
| `space.5` | 24px |
| `space.6` | 32px |
| `space.7` | 48px |
| `space.8` | 64px |
| `space.9` | 96px |

- **Micro — 4 / 8:** tightly related information.
- **Element — 12 / 16 / 24:** component internals and control padding.
- **Composition — 32 / 48:** grouped content and columns.
- **Section/page — 64 / 96:** major structural rhythm.

These bands guide rather than mandate mappings. Height remains content-led; gaps and padding should reflect ownership. Arbitrary one-off values are discouraged, although a small optical correction may remain local when it is not reusable. Spacing should communicate relationships before borders or effects are added.

## 8. Interactive target sizing and density

Interactive controls should normally offer approximately 44–48px of usable target height or area where appropriate and remain operable by pointer and touch. This is design guidance, not one universal WCAG number. Visual density must not shrink meaningful targets, while static metadata must not be padded as if interactive. Compact and comfortable density remain content-driven.

## 9. Layout foundations

| Primitive | Semantic alias | Value | Use |
| --- | --- | --- | --- |
| `container.readable` | `layout.content.readable` | 720px | Long-form prose, case studies and explanatory text. |
| `container.standard` | `layout.content.standard` | 1120px | Ordinary composition, project grids and grouped sections. |
| `container.wide` | `layout.content.wide` | 1360px | Diagrams, screenshots, tables and technical evidence that benefits from width. |

Wide viewports must not stretch prose beyond readable line lengths. Media and evidence may expand independently while captions return to the ordinary reading hierarchy.

### Full-width presentation regions

An intentionally full-width or full-bleed region may extend beyond the wide container when the presentation itself benefits from uninterrupted viewport space—for example, a meaningful media study or visual transition between major sections. It does not create a new content-width token. Readable text and controls inside it must return to the appropriate content container, outer edges must preserve safe gutters where content could otherwise collide with the viewport, and the region must not create page-level horizontal overflow.

### Grid and column principles

Columns emerge from available space, content requirements and useful minimum widths rather than fixed device categories. Compositions may add columns when each column remains readable and collapse them before content or targets become cramped. Collapse must preserve logical source, reading and focus order. Fixed column counts must not become device rules, and grids must accommodate variable content instead of relying on equal text length or fixed card height.

### Gutters

| Token | Value |
| --- | --- |
| `layout.gutter.mobile` | 20px |
| `layout.gutter.tablet` | 32px |
| `layout.gutter.desktop` | 48px |

These are representative semantic layout values, not device detection. Transitions must be driven by content.

### Responsive layout model

- Preserve mobile-first source, reading and focus order.
- Keep equivalent content and actions in every responsive context.
- Progressively recompose instead of creating device-specific designs.
- Reduce columns before shrinking readable text.
- Keep prose readable when evidence regions expand.
- Avoid fixed card heights for variable content and assumptions about short English-only text.

Viewport media queries own overall gutters, navigation transformation, major page composition and preferences such as reduced motion. Container queries own reusable module composition, card layout, local column collapse and technical-content density in different parents. Exact breakpoints remain implementation decisions; framework defaults must not be copied without content evidence.

### Technical overflow

Page-level horizontal scrolling is not an ordinary solution. Code, tables, diagrams and long technical data may use bounded local overflow where reflow would destroy meaning. Long URLs must wrap or break safely.

## 10. Surfaces, borders, radii and elevation

Use the lightest sufficient grouping mechanism:

```text
Whitespace
→ tonal surface shift
→ border
→ elevation
```

The surface hierarchy is page → default → subtle → elevated. Elevation is not the default card treatment.

Use `colour.border.subtle` for quiet grouping, `colour.border.strong` for explicit boundaries and `colour.border.accent` for limited high emphasis. Do not outline every important item with the accent; dividers belong only where they improve structural comprehension.

| Token | Value | Intended use |
| --- | --- | --- |
| `radius.0` | 0px | Structural or technical contexts. |
| `radius.1` | 8px | Restrained default. |
| `radius.2` | 16px | Selected prominent surfaces. |
| `radius.pill` | 999px | Genuinely pill-shaped controls or tags. |

Radius communicates object type and hierarchy. Avoid arbitrary proliferation and excessive rounding.

**Level 0** has no shadow and is the default, using whitespace, surfaces and borders. **Level 1** is subtle elevation used only when those are insufficient for temporary raised context. **Level 2** is reserved for genuine overlays above another region. Production shadow tokens are deferred until component work demonstrates reuse. Important boundaries must survive high contrast, zoom and reduced visual effects and must not rely on shadow alone.

## 11. Interaction state foundations

### Visual interaction states

The visual sequence is default → hover → focus-visible → active/pressed. Representative accent values are default `#8B9CFF`, hover `#A9B4FF` and active `#6F7FEA`. Hover is supplementary, never the only indication of interactivity. Focus-visible requires a clearly perceivable ring and cannot depend on a subtle colour change. Final component implementations remain deferred.

### Semantic UI states

- **Current:** expose semantically and visually.
- **Selected:** provide a non-colour cue.
- **Expanded:** expose programmatically and keep the control relationship understandable.
- **Invalid:** provide explanatory text or equivalent structure as well as styling.
- **Disabled:** reserve for genuine unavailability; never use it merely to make content secondary or represent missing portfolio content.

### Application states

Loading, success, error and empty states may be introduced only when a real asynchronous feature requires them. Static portfolio content must not receive artificial application states.

## 12. Iconography foundations

Icons supplement text and structure. Unfamiliar actions must not use an icon as their only accessible label; decorative icons remain semantically hidden, and interactive icons need adequate target sizing. Style, stroke, size and optical alignment should remain consistent and restrained. Technologies must not become an unstructured logo wall. A production icon library is deferred until a component need exists; a design-tool plugin is not an implementation decision.

## 13. Image and media foundations

Media needs a communicative purpose. Screenshots should demonstrate a behaviour, result, interface or technical decision rather than decorate a page, preserve useful aspect ratios and carry captions explaining what to notice. Meaningful images need appropriate alternative text in implementation; decorative media should remain silent to assistive technology.

Media must respond to its container. Loading, file size and resolution need deliberate optimisation, and technical screenshots must be checked for confidential or sensitive information before commit. PT-18 adds no final assets.

## 14. Technical content foundations

- **Inline code:** concise technical references inside prose; not every technology name.
- **Code blocks:** the smallest excerpt that demonstrates the point, not large source dumps.
- **Terminal content:** only where command/output context matters, never as the site's decorative identity.
- **Decision blocks:** may use Decision → Why → Outcome.
- **Trade-off blocks:** may use Benefit → Cost → Trigger/reassessment condition.
- **Tables:** compact comparisons with manageable columns and labels plus narrow-context handling.
- **Diagrams:** clarify relationships or flow and supplement understandable text; implementation supplies an equivalent accessible explanation where needed.
- **Screenshots:** evidence with captions and relevant context.
- **Long URLs:** wrap or break safely.
- **Technical overflow:** bounded horizontal overflow where reflow would destroy meaning, never page-level scrolling.

## 15. Motion-token boundaries

[ADR 0003](../architecture/decisions/0003-use-a-native-first-purpose-driven-animation-strategy.md) remains authoritative. Ordinary transitions are native-first. Motion tokens should appear only for repeated, meaningful timing or easing decisions; no speculative duration/easing scale or animation library is introduced. Reduced-motion behaviour is mandatory, and motion cannot be necessary for content access or navigation. Final choreography belongs to later design and implementation.

## 16. Accessibility foundations

Accessibility is part of every foundation above. Later work must preserve semantic structure and heading order; keyboard operability and visible focus; usable target sizing; colour-independent state; text enlargement, browser zoom and reflow; resilient long content and bounded technical overflow; high-contrast comprehension; reduced-motion alternatives; meaningful alternative text; readable line length; and sufficient text contrast.

Validation should combine Contrast Checker, Accessible Design Checklist, semantic review, manual keyboard/focus review, and responsive and zoom review. Design-tool and automated checks assist review but do not prove WCAG conformance; manual accessibility review remains necessary.

## 17. Performance foundations

Limit font families, weights and files; optimise images and screenshots; omit decorative media without value; and keep shadows and effects restrained. Avoid generated CSS from unnecessary token or component variants and avoid runtime styling systems. The direction must remain implementable with native CSS, and browser JavaScript must not be introduced merely for visual presentation. These constraints follow the [high-level architecture](../architecture/high-level-architecture.md) and [ADR 0002](../architecture/decisions/0002-use-modern-css-as-the-primary-styling-strategy.md).

## 18. Implementation constraints

Later implementation uses modern native CSS, CSS custom properties and Astro scoped styles, with CSS Modules for justified React islands. Media queries own viewport behaviour, container queries own local component composition and preference queries apply where relevant.

PT-18 introduces no Tailwind, Sass, CSS-in-JS, runtime token library, Style Dictionary, token compiler, CSS framework, production dependency or actual production CSS.

## 19. Penpot design source

The visual foundations and native design tokens were designed and reviewed in the [PT-18 design foundations shared library in Penpot](https://design.penpot.app/#/workspace?team-id=81f57451-85cc-819d-8008-7273b4e9b9c5&project-id=3be9e5e1-190f-8090-8008-727473508846&file-id=81f57451-85cc-819d-8008-7289fce2780a&page-id=81f57451-85cc-819d-8008-7289fce2780b). Penpot contains the editable visual source; this repository document records the implementation-neutral decisions and remains useful independently. Later implementation should follow the documented semantic system rather than copy incidental board geometry.

## 20. Validation and design-tool workflow

Later reviews should:

1. Validate token use and naming.
2. Check colour contrast.
3. Review focus and state communication.
4. Review text enlargement and zoom.
5. Review responsive layouts.
6. Review technical overflow.
7. Review content confidentiality.
8. Review visual consistency.
9. Remove unused or redundant tokens.

Design tooling can assist these checks but cannot replace implementation testing or manual accessibility review.

## 21. Unresolved decisions and review triggers

Deferred decisions are component-specific tokens; final component variants; exact responsive breakpoints; final navigation styling; final high-fidelity page compositions; final motion choreography; icon-library selection; real feedback-colour families; alternative themes and a theme switcher; final media assets; exact shadow tokens; additional spacing values; and additional typography roles.

Review the foundations when PT-19 exposes repeated component needs; high-fidelity design exposes insufficient tokens; accessible contrast cannot be achieved with current roles; long-form content reveals readability problems; responsive composition exposes missing layout roles; a genuine form or asynchronous interaction needs feedback colours; localisation materially changes content; a theme requirement becomes real; motion needs repeated timing decisions; or component states justify reusable component tokens. These triggers do not authorise speculative additions in advance.

## 22. Related documentation

- [Product vision](../product/product-vision.md)
- [Information architecture](../product/information-architecture.md)
- [Content strategy](../product/content-strategy.md)
- [Product success criteria](../product/product-success-criteria.md)
- [High-level architecture](../architecture/high-level-architecture.md)
- [Architecture decision records](../architecture/decisions/README.md)
- [ADR 0002: Use modern CSS as the primary styling strategy](../architecture/decisions/0002-use-modern-css-as-the-primary-styling-strategy.md)
- [ADR 0003: Use a native-first, purpose-driven animation strategy](../architecture/decisions/0003-use-a-native-first-purpose-driven-animation-strategy.md)
- [Design principles and visual direction](design-principles.md)
- [Responsive wireframes](responsive-wireframes.md)
