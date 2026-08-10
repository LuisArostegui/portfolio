# Motion and interaction guidelines

## 1. Purpose and scope

These guidelines translate the portfolio's accepted motion foundations into a canonical implementation-facing specification. They apply to later design, prototype and implementation work; they do not implement animation.

> Motion should explain change, not compete for attention.

Motion may reinforce feedback, comprehension of state changes, spatial orientation, navigation continuity, relationships, hierarchy, limited attention guidance and justified progressive disclosure. Animation is not itself a product requirement. Every meaningful pattern needs a user-facing purpose, and the projects, experience and engineering evidence must remain more memorable than the effects around them.

The approved direction is **static-first, content-driven, modular and progressively enhanced**. Essential content, navigation and semantic state must remain complete without animation, hydration or optional browser capabilities. This document creates no production motion tokens, component variants, runtime, router or dependency.

## 2. Design references

- [PT-20 motion and interaction foundation in Penpot](https://design.penpot.app/#/workspace?team-id=81f57451-85cc-819d-8008-7273b4e9b9c5&file-id=81f57451-85cc-819d-8008-7375f67ec471&page-id=1b36394a-b4e1-80d4-8008-761843b52bfc&layout=layers) is the approved visual reference.
- [Portfolio design project in Penpot](https://design.penpot.app/#/dashboard/files?team-id=81f57451-85cc-819d-8008-7273b4e9b9c5&project-id=3be9e5e1-190f-8090-8008-727473508846) provides the wider design context.
- [PT-19 component foundations in Penpot](https://design.penpot.app/#/workspace?team-id=81f57451-85cc-819d-8008-7273b4e9b9c5&file-id=81f57451-85cc-819d-8008-7375f67ec471&page-id=77158d26-68a7-80e1-8008-73762a419595&layout=layers) provides the component reference.
- [PT-18 design foundations in Penpot](https://design.penpot.app/#/workspace?team-id=81f57451-85cc-819d-8008-7273b4e9b9c5&project-id=3be9e5e1-190f-8090-8008-727473508846&file-id=81f57451-85cc-819d-8008-7289fce2780a&page-id=81f57451-85cc-819d-8008-7289fce2780b) provides the shared visual foundation.

Penpot is the visual reference. This document is authoritative for implementation-facing motion behaviour. It does not recreate the Penpot artwork or infer details not stated here.

## 3. Relationship to architecture and design foundations

[ADR 0003](../architecture/decisions/0003-use-a-native-first-purpose-driven-animation-strategy.md) is authoritative for animation architecture. PT-20 applies that decision and neither overrides nor reinterprets it. Astro remains the primary framework; static output, ordinary multi-page navigation and `.astro` composition remain the defaults. React is reserved for bounded interaction with concrete user value and must not be introduced solely for motion. There is no default client router, global client state or application-wide React root. Browser JavaScript is an explicit cost.

[Design foundations (PT-18)](design-foundations.md) remain authoritative for visual tokens, semantic colours, the focus role, spacing, typography, layout and interaction-state foundations. [Component foundations (PT-19)](component-foundations.md) remain authoritative for component semantics; links versus buttons; current, selected, expanded, invalid and disabled distinctions; the focus-visible contract; responsive and content resilience; Astro versus React guidance; and application-state deferral.

PT-20 describes how motion may behave around those contracts. It does not define feedback colours, final variants, CSS properties or final motion custom properties.

## 4. Motion principles

1. **Explain a meaningful change.** Motion must support feedback, orientation, continuity, hierarchy or comprehension.
2. **Keep meaning independent.** Semantics, text, structure and focus communicate the interaction before, during, after and without motion.
3. **Prefer restraint.** Small, local feedback needs less justification than prominent or spatial motion. Decorative motion is optional and removable.
4. **Respond promptly.** Visual treatment must not delay the action, final state, content or navigation it accompanies.
5. **Enhance progressively.** Unsupported capabilities, failed styles and missing JavaScript leave a complete, understandable experience.
6. **Design alternatives intentionally.** Reduced motion preserves the result while removing or simplifying unnecessary movement.
7. **Own the lifecycle.** A later implementation must define interruption, reversal, cleanup and validation alongside the visual treatment.

## 5. When not to animate

No animation is the first mechanism in the accepted hierarchy and is frequently the correct choice. Prefer it when:

- the state or relationship is already obvious;
- movement adds no understanding;
- feedback must be immediate;
- an effect would delay reading or navigation;
- novelty is its only purpose;
- responsive or touch use makes it unnecessary;
- the reduced-motion alternative removes its reason to exist;
- implementation or runtime cost is disproportionate; or
- the content should receive the visitor's attention.

Not every component needs a motion specification. Absence of motion is an intentional design outcome, not an omission.

## 6. Mechanism-selection hierarchy

Use the least complex mechanism capable of satisfying the approved interaction:

1. No animation.
2. CSS transition.
3. CSS keyframes.
4. View Transitions API.
5. Web Animations API (WAAPI).
6. Feature-specific animation library.
7. Authored graphical runtime.

CSS transitions are the default for simple state changes. CSS keyframes are appropriate only for a finite declarative sequence or repeated progression that a transition cannot express clearly. Native cross-document View Transitions are an optional progressive enhancement, not a change to the multi-page architecture. WAAPI requires data-driven or imperative playback, interruption or cancellation that CSS cannot express maintainably.

Moving down the hierarchy requires a concrete user-facing requirement and evidence that simpler mechanisms are inadequate. Motion, GSAP, Anime.js, AutoAnimate, Lottie, Rive and other dependencies are not selected or pre-approved. A feature-specific library or authored runtime requires architectural, accessibility, performance and fallback review. Do not create a generic animation abstraction, add Astro's `ClientRouter` solely for animation, or turn static Astro presentation into React for motion.

## 7. Conceptual timing

These are **provisional design and prototype ranges**, not final implementation values or tokens.

| Category   | Approximate range | Purpose                                                                                                                                                                          |
| ---------- | ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Immediate  | 0–100 ms          | Focus or pressed feedback, direct acknowledgement and states where perceptible delay weakens control. The final state must not wait unnecessarily for visual motion.             |
| Fast       | 100–180 ms        | Hover, small surface or border changes and lightweight local visual-state feedback. It should feel responsive rather than animated.                                              |
| Standard   | 180–300 ms        | Opening or closing a bounded component, a small spatial relationship or local repositioning that aids orientation; for example, a mobile navigation panel.                       |
| Deliberate | 300–450 ms        | A larger spatial change, navigation continuity or a transition needing additional orientation. This requires stronger justification and is not the default for prominent design. |

Anything substantially longer than Deliberate requires design review rather than a new timing category by default. Final values require prototype and implementation validation. PT-20 creates no production motion tokens; repeated implementation evidence may later justify semantic motion tokens through the design-foundation process.

## 8. Easing intent

Easing follows interaction intent, not decorative preference:

- **Enter — decelerating:** begin promptly and settle gently into the final state.
- **Exit — accelerating where appropriate:** when an element genuinely leaves the context, it should not linger unnecessarily.
- **Reversible state — balanced:** opening and closing, selecting and deselecting, or another immediately reversible change must reverse predictably.
- **Continuous — linear or constant:** use only when the underlying behaviour is genuinely continuous.

PT-20 does not define cubic-bezier values or easing tokens. Prototype validation must confirm that feedback remains connected to its trigger and that entry, exit and reversal feel coherent.

## 9. Motion pattern specification

A significant future pattern should record, where relevant:

- context or trigger;
- user-facing purpose;
- elements affected;
- preferred mechanism;
- conceptual duration category;
- easing intent;
- semantic and state requirements;
- interruption or reversal behaviour;
- reduced-motion behaviour;
- unsupported-capability fallback;
- keyboard and focus considerations;
- performance considerations; and
- automated and manual validation requirements.

A concise paragraph is sufficient for trivial local feedback. The format is a decision aid, not a requirement to animate every component.

## 10. Control feedback

### Links and buttons

Hover may use a **Fast CSS transition** for foreground, background, border, opacity or a very small transform where testing shows a genuine affordance benefit. Hover is supplementary: essential information and actions must not appear exclusively on hover, and keyboard and touch access remain complete.

Pressed or active feedback should feel **Immediate**. Semantic state and the action response must not wait for decorative animation to finish.

Focus-visible is accessibility feedback first. It must appear immediately, remain clearly visible and follow the PT-18/PT-19 focus contract. Do not delay focus indication, animate it so keyboard position is temporarily obscured, or move focus to match visual motion.

Reduced motion normally retains immediate focus, pressed and semantic feedback while removing unnecessary transforms. If transitions fail, the final CSS state remains understandable.

## 11. Navigation and mobile navigation

Navigation hover may use **Fast**, local CSS feedback. Current location is a persistent semantic state, not an animation. Current, hover, selected and active states must remain distinguishable without animation and must not depend on movement or colour alone.

### Mobile navigation pattern

- **Context / trigger:** the visitor opens or closes the bounded mobile navigation from its trigger.
- **User-facing purpose:** reinforce the relationship between trigger and panel and preserve orientation.
- **Elements affected:** the trigger's persistent state treatment and navigation panel; essential destinations remain available through the navigation interaction regardless of animation support.
- **Preferred mechanism:** CSS when the final interaction can be expressed clearly; React is not prescribed.
- **Timing and easing:** **Standard** with balanced, predictable reversible behaviour.
- **Semantic/state requirements:** `aria-expanded` and any control relationship reflect the actual interaction immediately; animation never defines state.
- **Interruption/reversal:** rapid repeated open and close actions reverse or restart predictably and leave a valid state.
- **Reduced motion:** remove spatial movement; change state immediately or use a restrained non-spatial transition only when it improves clarity.
- **Unsupported fallback:** complete, accessible navigation without animation.
- **Keyboard/focus:** focus behaviour and restoration follow PT-19 and are independent of visual timing. Animation must not move focus unexpectedly.
- **Performance:** keep work bounded to the owned surface and avoid avoidable layout shifts.
- **Validation:** check keyboard and touch use, visible focus, rapid reversal, reduced motion, animation failure and, where the implementation provides a reasonable no-JavaScript fallback, that fallback. JavaScript remains permissible when the interaction justifies it.

## 12. Project and content interactions

### Project cards

Cards may use **Fast** CSS feedback through a small surface or border change. A very restrained transform may be considered only if visual testing demonstrates a real affordance benefit. Do not create dramatic elevation, tilt, rotation, perspective, substantial pointer-following movement or hover-only information. Touch users receive the same content and actions. Motion is unnecessary for project-card comprehension and should be omitted when the static affordance is clear.

### Expandable content

Expandable content is not approved merely because motion is documented. If a real pattern is later justified, semantic state and content availability exist independently of motion; access to expanded content is not delayed; rapid reversal stays valid; and reduced motion may change state immediately. Prefer CSS for a simple bounded transition and otherwise use the mechanism hierarchy. PT-20 introduces no accordion infrastructure.

### Project filtering — future example only

Project filtering is outside the current MVP. If later approved, results must remain understandable without motion. Reordering motion is justified only when it helps explain what changed. Evaluate CSS first; WAAPI or another mechanism requires evidence that simpler approaches are inadequate. AutoAnimate, Motion and other dependencies are not pre-approved and require feature-specific architectural review. This guidance does not approve a filtering component or API.

## 13. Route and viewport transitions

### Page and route transitions — optional enhancement

Native cross-document View Transitions may be explored later where navigation continuity has concrete value. A restrained fade or continuity treatment is preferable to large page movement if prototypes justify any route transition. Route transitions need stronger justification than local control feedback and are not prescribed site-wide.

Any implementation must preserve ordinary anchor links, normal multi-page navigation, browser history, deep linking, meaningful incoming content and usable back/forward navigation. It must not delay navigation or leave incoming content hidden waiting for transition logic. Reduced motion uses normal navigation or a non-spatial restrained alternative. Unsupported browsers receive ordinary navigation. Astro's `ClientRouter` must not be introduced solely for animation.

### Content entering the viewport

Content is visible by default. Site-wide reveal-on-scroll is not part of the motion language. Essential content must not wait for JavaScript, `IntersectionObserver`, scroll position or a reveal animation. An isolated viewport-triggered enhancement may be reviewed only for a concrete communication purpose, with visible default content and an intentional reduced-motion alternative. Scroll-driven animation is not approved as a general pattern.

## 14. Future application interactions

Loading, success and error are not current static portfolio states. The following is future guidance, not approval for components, asynchronous behaviour or feedback colours.

- **Loading:** motion cannot be the only indication of work; provide a semantic or textual status. Do not simulate work or add endless decoration when no asynchronous operation exists. Reduced motion removes repeated movement while retaining status.
- **Success:** confirmation is concise and does not depend on movement or colour alone. Reduced motion may present the final confirmation immediately.
- **Error:** identify failure and recovery explicitly. Motion must not dramatise or intensify the error; reduced motion should normally present the stable error state immediately.

## 15. Reduced motion

Reduced motion preserves the meaningful result while removing or simplifying unnecessary movement. It is not equivalent to making every animation extremely fast.

Depending on the interaction, the designed alternative may remove spatial movement, provide the final state immediately, use a restrained opacity change, remove decoration, disable autoplay, use a static alternative or fall back to normal browser navigation. Focus feedback remains visible and semantic state remains intact.

| Motion category or pattern                 | Reduced-motion alternative                                                                                |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| Focus, pressed and direct control feedback | Keep the immediate visible/semantic result; remove unnecessary movement.                                  |
| Hover and small surface feedback           | Use an immediate state or restrained colour, border or opacity change; never remove essential affordance. |
| Bounded open/close interactions            | Remove translation or scale; change immediately or use a restrained non-spatial transition.               |
| Project-card feedback                      | Remove transforms; retain any useful static, border or surface affordance.                                |
| Route continuity                           | Use normal browser navigation, or a restrained non-spatial treatment only if it remains useful.           |
| Viewport-triggered enhancement             | Show content statically by default; omit the enhancement.                                                 |
| Future loading/status motion               | Preserve semantic text/status; stop repeating decoration or use a static alternative.                     |
| Future authored/decorative motion          | Disable autoplay or replace it with a static equivalent; remove it entirely if it carries no meaning.     |

The experience must remain complete when `prefers-reduced-motion` is active, animation styles fail, JavaScript does not load or View Transitions are unsupported. ADR 0003 adopts WCAG 2.3.3 Animation from Interactions as a stronger internal policy while the project targets WCAG 2.2 AA; this does not claim overall WCAG AAA conformance.

## 16. Responsive motion

Motion need not be identical at every viewport. Simplify it according to available space, input mechanism, touch use, device capability, movement distance and content density. Mobile and touch interaction cannot depend on hover. A translation acceptable in a wide layout should be reduced, replaced or removed when it becomes disorienting on a smaller screen.

Responsive simplification never removes functionality, content, state or focus visibility. Create no separate device-specific motion system; select the simplest treatment appropriate to the same interaction contract.

## 17. Interruption, reversal and lifecycle

Lifecycle is part of the interaction contract for later implementation:

- interruption must leave the interface in a valid state;
- repeated actions reverse or restart predictably where appropriate;
- semantic state never waits for animation completion;
- imperative animation has a clear owner;
- an owner cancels and cleans up its WAAPI animations;
- event listeners and observers are removed when no longer needed;
- disconnected DOM elements do not retain animation ownership; and
- any future library uses its documented lifecycle and cleanup mechanism.

These are implementation requirements for future work, not implementation introduced by PT-20.

## 18. Accessibility and usability

Motion must preserve semantic state, keyboard operation, focus visibility and order, reading order, assistive-technology understanding and content availability. The portfolio targets WCAG 2.2 AA, alongside ADR 0003's stronger reduced-motion policy.

- Focus indicators remain immediate and visible.
- Motion must not move keyboard focus unexpectedly.
- Visual movement must not imply semantic, reading or focus reordering.
- Information must not depend exclusively on movement, direction, colour or animation.
- Pointer movement must not be the sole trigger for an essential interaction.
- Loading animation requires a semantic status.
- Reduced-motion preference receives an intentional treatment.
- Flashing patterns are prohibited.
- Motion that risks nausea, disorientation or loss of reading position must be removed or redesigned.

## 19. Performance

- Prefer compositor-friendly properties such as `transform` and `opacity` when they satisfy the design; this is not permission to add transform motion everywhere.
- Declare transitioned properties explicitly. Do not use `transition: all`.
- Avoid unnecessary layout-affecting animation. Layout- or paint-heavy work requires explicit justification and measurement.
- Avoid preventable layout shifts.
- Do not perform uncontrolled animation work from scroll handlers.
- Do not use permanent or global `will-change`.
- Do not introduce a global runtime for isolated effects or a React island solely for motion.
- Validate production-like builds on constrained devices when motion is implemented.

Duration alone does not determine performance. Property cost, affected area, concurrent work, device capability and lifecycle all matter.

## 20. Prohibited and review-required patterns

### Normally prohibited

- scroll hijacking or forced global smooth scrolling;
- essential content revealed only through scrolling animation;
- long introductions before content is available;
- route transitions that delay normal navigation;
- continuous movement from ordinary pointer movement;
- excessive parallax or automatic carousels;
- infinite decorative movement;
- inaccessible flashing or rapidly repeating effects;
- unnecessary large background video, particle systems or gratuitous 3D scenes;
- cursor replacement;
- motion causing disorientation or loss of reading position;
- unexpected focus or scroll-position changes;
- simultaneous unrelated animations competing for attention;
- site-wide reveal-on-scroll or long staggered section entrances;
- typewriter hero text or perpetual floating elements; and
- animation added merely to demonstrate technical complexity.

### Requires feature-specific review

Scroll-driven animation, route transitions, layout animation, animated diagrams or code examples, gesture-driven interaction, persistent ambient motion, WebGL, canvas, Lottie, Rive, a feature-specific library and complex multi-component sequencing each require a concrete purpose and accessibility, performance, fallback and architecture review. A review trigger is not pre-approval.

## 21. Validation

### Automated and implementation-level validation

Future tests should verify behaviour and state rather than arbitrary frames. As applicable, validate initial and final semantic state, reduced-motion behaviour, keyboard operation, focus preservation, content availability without JavaScript, fallback without View Transitions, cleanup, valid state after interruption, route-navigation fallback and absence of hidden essential content. Avoid exact frame-timing assertions unless timing is functionally relevant.

### Mandatory manual review

Later design, prototype and implementation review must cover:

- keyboard navigation and visible focus;
- screen-reader or assistive-technology interaction where relevant;
- reduced-motion and no-JavaScript modes;
- unsupported View Transition or browser fallback;
- mobile and touch interaction;
- rapid repeated interaction;
- zoom, text resize and reflow;
- constrained CPU and device performance;
- browser back/forward navigation where route motion exists;
- layout-shift observation; and
- visual appropriateness and restraint.

Automated success does not prove motion accessibility or usability.

## 22. Open decisions and review triggers

PT-20 intentionally does not decide exact production durations, cubic-bezier curves, production motion tokens, movement distances, final choreography, whether route transitions will be implemented, which components receive animation, project filtering, asynchronous application states, scroll-driven animation, any dependency, Motion/GSAP/Anime.js/AutoAnimate/Lottie/Rive adoption, Astro `ClientRouter` adoption, implementation-specific CSS or WAAPI architecture, or high-fidelity page animation.

Review may be triggered when repeated timing or easing evidence justifies semantic tokens; several features need WAAPI; React islands repeatedly need presence or layout motion; mobile navigation exposes new requirements; project filtering, gesture or drag interaction becomes real; route transitions pass prototype validation; motion creates measured accessibility or performance problems; a dependency demonstrably reduces total complexity; or browser support assumptions change materially.

Review reopens only the affected decision and does not automatically approve a mechanism or dependency.

## 23. Related documentation

- [Product vision](../product/product-vision.md)
- [Information architecture](../product/information-architecture.md)
- [Content strategy](../product/content-strategy.md)
- [Product success criteria](../product/product-success-criteria.md)
- [High-level architecture](../architecture/high-level-architecture.md)
- [ADR 0001: Use Astro as the primary frontend framework](../architecture/decisions/0001-use-astro-as-the-primary-frontend-framework.md)
- [ADR 0002: Use modern CSS as the primary styling strategy](../architecture/decisions/0002-use-modern-css-as-the-primary-styling-strategy.md)
- [ADR 0003: Use a native-first, purpose-driven animation strategy](../architecture/decisions/0003-use-a-native-first-purpose-driven-animation-strategy.md)
- [ADR 0006: Use a pragmatic risk-based testing strategy](../architecture/decisions/0006-use-a-pragmatic-risk-based-testing-strategy.md)
- [Design principles and visual direction](design-principles.md)
- [Responsive wireframes](responsive-wireframes.md)
- [Design foundations and token system](design-foundations.md)
- [Component foundations and accessibility states](component-foundations.md)
