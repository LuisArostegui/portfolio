# ADR 0003: Use a native-first, purpose-driven animation strategy

- **Status:** Accepted
- **Date:** 2026-08-03
- **Decision owners:** Portfolio maintainer
- **Related issue:** [PT-10 — Evaluate animation strategy](https://github.com/LuisArostegui/portfolio/issues/13)
- **Related documentation:** [ADR 0001](0001-use-astro-as-the-primary-frontend-framework.md), [ADR 0002](0002-use-modern-css-as-the-primary-styling-strategy.md), and [product success criteria](../../product/product-success-criteria.md)

## Context

ADR 0001 selects Astro for a primarily static, content-driven website and reserves React islands for bounded interaction with concrete value. ADR 0002 selects modern CSS, semantic custom properties, progressive enhancement, and component-owned styles. The animation strategy must reinforce those boundaries rather than make content dependent on hydration or introduce a general client runtime.

Motion can reinforce hierarchy, navigation, continuity, state changes, feedback, progress, comprehension, and visual identity. It must not undermine readability, delay interaction, create unnecessary browser JavaScript, cause vestibular discomfort, interfere with keyboard or assistive-technology use, create layout instability, or obscure semantic state.

The technologies considered are not equivalent alternatives. CSS transitions and keyframes provide declarative animation; the Web Animations API (WAAPI) provides native imperative control; the View Transitions API provides continuity between views; general-purpose libraries provide higher-level sequencing, gestures, and lifecycle abstractions; AutoAnimate is an automatic layout helper; and Lottie and Rive are runtimes for authored graphical assets. The project therefore needs a hierarchy of tools, not one universal animation tool.

## Assumptions

- Most components remain static Astro components, and React islands remain exceptional.
- The MVP does not require drag, complex layout animation, scrollytelling, or coordinated timelines.
- Page navigation remains a multi-page architecture unless another decision changes it.
- Animation remains a progressive enhancement; content is usable when animation is disabled or unsupported.
- No approved Lottie or Rive assets currently exist.
- A small number of purposeful interactions is more appropriate than site-wide decorative motion.
- Final motion language, durations, easing curves, and movement distances belong to visual design and the future design system, not this ADR.

## Decision drivers

The strategy must preserve the static Astro architecture, minimise shipped JavaScript, meet the product's accessibility and performance criteria, degrade safely, remain understandable to maintainers, and allow a more capable tool when a measured feature genuinely requires one.

Every animation must serve at least one documented purpose:

- feedback;
- orientation;
- continuity;
- hierarchy;
- progress;
- explanation of a relationship;
- comprehension of reordering; or
- controlled brand expression.

An animation is not justified solely because it appears polished or modern, or because it is technically possible.

## Options considered

The assessment is specific to this portfolio. It compares complete initial strategies separately from specialised tools.

| Strategy                                                  | Product fit | Runtime cost                                                       | Accessibility control             | Capability for expected needs              | Initial decision                   |
| --------------------------------------------------------- | ----------- | ------------------------------------------------------------------ | --------------------------------- | ------------------------------------------ | ---------------------------------- |
| Native-first: CSS, View Transitions, and WAAPI            | High        | Low                                                                | Direct and standards-based        | High                                       | Adopt                              |
| Motion as the primary strategy                            | Medium      | Low to medium, depending on imported features and loading strategy | Strong APIs                       | Higher than currently required             | Reassess for React-island features |
| GSAP as the primary strategy                              | Low         | Medium to high                                                     | Requires deliberate configuration | Much higher than currently required        | Reject initially                   |
| Anime.js as the primary strategy                          | Medium      | Low to medium                                                      | Supports scoped handling          | Higher than currently required             | Reject initially                   |
| AutoAnimate as the primary strategy                       | Low         | Low                                                                | Built-in reduced-motion behaviour | Too specialised                            | Reassess for reordering            |
| Only essential feedback, with no navigational enhancement | Medium      | Minimal                                                            | Strong                            | Lower than the intended visual opportunity | Not selected as a general limit    |

Lottie and Rive are excluded from the strategy comparison because they render authored graphical assets rather than replacing CSS, WAAPI, or View Transitions.

### Motion for React

Motion is the leading candidate when a React island specifically requires enter and exit presence, layout or shared-layout animation, gestures, drag, springs, interruptible animation, or animation tightly coupled to React state. It provides React lifecycle integration, reduced-motion support, and lazy-loading options.

It is not selected initially because current features do not require those capabilities and adopting it globally could encourage static Astro components to become React islands solely for animation.

### GSAP

GSAP is appropriate for complex timelines, synchronised sequences, SVG animation, advanced scroll choreography, pinning, scrubbing, and highly visual storytelling. No current requirement needs that capacity. It is rejected initially because its use would add runtime and maintenance cost and could encourage excessive scroll-driven motion.

### Anime.js

Anime.js provides a flexible middle ground with modular WAAPI support, timelines, scopes, media-query handling, and cleanup. Native WAAPI covers the expected imperative scope, so an additional abstraction is not justified initially.

### AutoAnimate

AutoAnimate is a specialised helper for child insertion, removal, and reordering, not a complete animation strategy. It may be reconsidered if a future interactive project list needs to make layout reordering comprehensible.

### Lottie

Lottie is a runtime for authored vector animation, commonly exported from After Effects. It may be introduced only for a concrete approved asset with a static fallback, reduced-motion treatment, autoplay and loop review, performance measurement, and accessible treatment.

### Rive

Rive is an interactive graphical runtime with state machines and a JavaScript/WASM rendering layer. It requires a concrete interaction whose state-machine capability justifies its runtime, rendering, accessibility, and testing complexity.

## Decision

Adopt a **native-first, purpose-driven animation strategy**. Do not install a general-purpose JavaScript animation library in the initial architecture.

Use the following order of preference:

1. no animation;
2. CSS transition;
3. CSS keyframes;
4. View Transitions API;
5. Web Animations API;
6. feature-specific animation library; and
7. authored graphical runtime.

Prefer the lowest level that satisfies the requirement without creating fragile code. Reassess Motion, GSAP, Anime.js, AutoAnimate, Lottie, Rive, or another dependency for the feature that needs it; do not approve a dependency merely for learning or employment value.

## CSS policy

Use CSS transitions by default for hover, focus, pressed, selected, current, expanded, and disabled states; small opacity or transform changes; and short interface feedback. Use keyframes for finite declarative sequences that cannot be expressed clearly as a transition.

Apply these rules:

- declare transitioned properties explicitly; do not use `transition: all`;
- prefer composited properties such as `transform` and `opacity` where appropriate;
- measure animation of layout or paint properties;
- do not apply `will-change` globally or permanently;
- do not hide essential content until a CSS animation or client script runs;
- do not delay an action while a decorative animation completes; and
- keep component animation styles within the ownership rules established by ADR 0002.

The future design system may define semantic custom properties for durations, easing curves, and movement distances. Illustrative names include `--motion-duration-instant`, `--motion-duration-fast`, `--motion-duration-standard`, `--motion-duration-slow`, `--motion-ease-standard`, `--motion-ease-enter`, and `--motion-ease-exit`. Their values are deliberately not fixed here and must follow ADR 0002's semantic-token policy.

## View Transitions policy

Prefer native cross-document View Transitions as an optional enhancement for page navigation. They preserve the static MPA model and fall back to normal browser navigation when unsupported.

Do not add Astro's `<ClientRouter />` solely to obtain animated navigation. Client-side routing changes navigation lifecycle, script execution, persistence, focus management, testing, and failure modes and therefore requires separate, measured justification.

View transitions must:

- remain progressive enhancement with normal navigation as the fallback;
- remain brief and not block access to incoming content;
- preserve meaningful page titles and headings;
- support backward and forward navigation;
- behave correctly when pages are restored from the back-forward cache (`bfcache`);
- respect reduced motion; and
- avoid extensive movement of large page regions.

## Web Animations API policy

Use WAAPI when values are data-driven; playback must be paused, reversed, cancelled, or awaited; keyframes must be generated dynamically; a small Astro client script needs imperative control; or CSS would require fragile class and event coordination. A full library must remain disproportionate to the feature.

The component or script that creates a WAAPI animation owns it and must cancel it when its owner is destroyed.

## Reduced-motion and accessibility policy

Respect `prefers-reduced-motion` for every non-essential animation. Reduced motion is a designed alternative, not only a blanket near-zero duration. Depending on the interaction, remove spatial movement, replace movement with opacity or an immediate state change, disable permitted scroll-linked effects, disable autoplay, use a static asset, preserve essential status feedback, or skip animation entirely.

Adopt WCAG 2.3.3, Animation from Interactions, as product policy although it is Level AAA and the product targets WCAG 2.2 AA. Adopting this criterion as an internal policy does not imply or claim WCAG AAA conformance. Comply with WCAG 2.2.2, Pause, Stop, Hide, for automatically started movement presented alongside other content. Do not create content that flashes above WCAG thresholds.

Animation must never be the only communication channel. Semantic state, focus visibility, keyboard operation, reading order, focus order, and assistive-technology output remain correct before, during, after, and without animation.

Loading animation must accompany an accessible textual or semantic status and must not be the only indication that work is in progress.

## Page and scroll motion policy

The following patterns are prohibited in the MVP:

- scroll hijacking;
- parallax;
- automatic carousels;
- continuous automatic movement without the user controls required by WCAG;
- inaccessible flashing; and
- navigation blocked by decorative animation.

Parallax is not permitted in the MVP. A future exception requires explicit product, accessibility, and performance review.

The following patterns are discouraged and require a documented product purpose if proposed:

- continuous decorative background motion that provides the required user controls;
- site-wide reveal-on-scroll;
- long staggered entrances;
- full-screen zoom transitions;
- typewriter effects for professional content;
- custom cursors;
- perpetual floating elements;
- movement triggered at every scroll section; and
- smooth scrolling that overrides user expectations.

Any scroll-linked animation requires a feature-specific justification, a reduced-motion alternative, performance validation, and confirmation that all content remains available without it.

Initial entrance animation must not delay readability or begin with essential content hidden and should be limited to a small number of high-value elements.

## Lifecycle and cleanup

- An animation is owned by the component or script that creates it.
- Cancel WAAPI animations when their owner is destroyed.
- Remove animation listeners and observers.
- Scope DOM queries to the component and do not retain detached-node references.
- Use library-specific context or scope cleanup if a library is introduced.
- Interruption must leave the interface in a valid state.
- Animation completion must not be required to preserve semantic state.

## Performance policy

- Prefer `transform` and `opacity` where appropriate.
- Measure layout and paint animation and inspect animation in production builds.
- Analyse the bundle impact of any substantial animation dependency.
- Do not perform uncontrolled style updates from scroll handlers.
- Do not create avoidable layout shifts.
- Do not make a component a React island solely for animation.
- Do not load a global animation runtime for one isolated effect.

Performance acceptance depends on representative production traces and constrained devices, not assumptions about a property's cost.

## Testing policy

Automated tests should primarily verify initial and final semantic states, reduced-motion behaviour, focus preservation, keyboard access, fallback without View Transitions, cleanup after unmount or navigation, absence of hidden essential content, and valid interaction when animation is interrupted. Tests must not depend on exact frame timing or duration unless timing is functional.

Manual validation must cover keyboard and screen-reader navigation, reduced-motion mode, mobile devices, constrained CPU, backward and forward navigation, zoom and text resize, rapid repeated interaction, and production performance traces.

## Prohibited patterns

The project must not:

- hide essential content until JavaScript reveals it;
- hijack scrolling or block navigation for decorative animation;
- use animation as the only communication channel;
- create inaccessible flashing;
- remove focus visibility for visual polish;
- change semantic or focus order through visual movement;
- ignore reduced-motion preferences;
- use React only to access an animation library; or
- run continuous automatic movement without required user control.

## Consequences

### Positive

- There is no initial animation dependency and browser JavaScript remains minimal.
- The decision aligns with Astro, modern CSS, and progressive enhancement.
- Standards-based code is portable and teaches the browser's native capabilities directly.
- Accessibility requirements are explicit and initial testing remains comparatively simple.
- Dependencies are selected against feature-specific evidence rather than globally in advance.

### Negative

- Complex animation may eventually require a library.
- WAAPI lifecycle and cancellation require manual implementation.
- Native View Transitions support and capabilities can vary between browsers.
- Developers must understand browser rendering and test inconsistencies.
- There is no shared high-level spring, gesture, or timeline abstraction.
- The project gains less immediate practical experience with Motion or GSAP.

## Risks and mitigations

| Risk                                                    | Mitigation                                                                                 |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Decorative motion expands without product value         | Require a documented purpose for every animation and review site-wide repetition           |
| Reduced-motion handling is incomplete                   | Design and test an explicit alternative for every non-essential animation                  |
| Essential content is hidden before hydration            | Render complete semantic content by default and test without client scripts                |
| Client routing is added for visual reasons              | Require a separate measured decision before adding `<ClientRouter />`                      |
| Animations, listeners, or observers survive their owner | Assign ownership, cancellation, scoped queries, and teardown responsibilities              |
| Layout animation regresses performance or stability     | Prefer compositor-friendly properties and inspect production traces and layout shifts      |
| Scroll motion becomes excessive                         | Require feature approval, reduced-motion fallback, and content availability without it     |
| A dependency is added for one isolated feature          | Compare it with CSS and WAAPI and perform bundle analysis before adoption                  |
| A Lottie or Rive asset is inaccessible or expensive     | Require an approved asset, static fallback, accessibility review, and measurement          |
| Tests become fragile because they assert timing         | Assert semantic states and interruption behaviour instead of frames or incidental duration |
| Components bypass motion tokens                         | Review styles against ADR 0002's semantic-token and ownership policies                     |

## Validation

The initial implementation must validate each selected mechanism used by an approved product interaction. A temporary technical spike may validate WAAPI or View Transitions when no production interaction yet requires them; a mechanism does not need to be implemented merely to demonstrate that it is available.

Validation for the mechanisms actually selected must cover, as applicable:

- the accessible state expressed by a CSS transition;
- the complete finite sequence expressed by CSS keyframes;
- normal navigation fallback and `bfcache` restoration for cross-document View Transitions;
- cancellation, interruption, and owner cleanup for WAAPI;
- the designed reduced-motion alternative;
- keyboard and focus behaviour;
- production performance inspection;
- confirmation that no unapproved animation library is installed;
- confirmation that essential content remains visible without animation; and
- confirmation that normal navigation works without View Transitions support.

Temporary spikes should be removed after recording their findings unless product review confirms that the interaction provides value.

## Revisit this decision when

Review this ADR if any of the following becomes true:

- several React islands need presence or layout animation;
- gesture or drag interactions are introduced;
- WAAPI code becomes duplicated or difficult to maintain;
- approved designs require complex synchronised timelines;
- scrollytelling becomes a product requirement;
- authored Lottie or Rive assets are approved;
- a cross-project motion system is created;
- React becomes the dominant rendering model;
- View Transitions cannot satisfy required navigation behaviour;
- supported-browser requirements change;
- animation creates measured accessibility or performance problems; or
- a library can demonstrably reduce total implementation complexity.

A revisit triggers a feature-specific comparison; it does not automatically approve a dependency.

## References

### Browser and framework APIs

- [MDN: CSS transitions](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_transitions/Using_CSS_transitions)
- [MDN: CSS animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations/Using_CSS_animations)
- [MDN: Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API)
- [MDN: View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API)
- [Chrome Developers: Same-document view transitions](https://developer.chrome.com/docs/web-platform/view-transitions/same-document)
- [Chrome Developers: Cross-document view transitions](https://developer.chrome.com/docs/web-platform/view-transitions/cross-document)
- [Astro: View transitions](https://docs.astro.build/en/guides/view-transitions/)
- [MDN: `prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
- [web.dev: Animations and performance](https://web.dev/articles/animations-guide)

### Accessibility

- [WCAG 2.2: Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html)
- [WCAG 2.2: Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html)
- [WCAG 2.2: Three Flashes or Below Threshold](https://www.w3.org/WAI/WCAG22/Understanding/three-flashes-or-below-threshold.html)

### Libraries and authored runtimes

- [Motion for React](https://motion.dev/docs/react)
- [Motion accessibility](https://motion.dev/docs/react-accessibility)
- [GSAP documentation](https://gsap.com/docs/v3/)
- [GSAP `matchMedia()`](<https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/>)
- [Anime.js documentation](https://animejs.com/documentation/)
- [AutoAnimate documentation](https://auto-animate.formkit.com/)
- [Lottie web player](https://github.com/airbnb/lottie-web)
- [Rive web runtime](https://rive.app/docs/runtimes/web/web-js)
