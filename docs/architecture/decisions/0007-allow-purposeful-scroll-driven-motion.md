# ADR 0007: Allow purposeful scroll-driven motion

- **Status:** Accepted
- **Date:** 2026-11-22
- **Decision owners:** Portfolio maintainer
- **Related issue:** [PT-65 — Redesign the portfolio in the "signal panel" direction](https://github.com/LuisArostegui/portfolio/issues/120)
- **Related documentation:** [ADR 0003](0003-use-a-native-first-purpose-driven-animation-strategy.md) (amended by this record), [ADR 0002](0002-use-modern-css-as-the-primary-styling-strategy.md), [ADR 0006](0006-use-a-pragmatic-risk-based-testing-strategy.md), and [motion and interaction guidelines](../../design/motion-interaction-guidelines.md)

## Context

ADR 0003 adopted a native-first, purpose-driven animation strategy and assumed that the MVP would not need scrollytelling or coordinated timelines. It allows scroll-linked animation only with a feature-specific justification, a reduced-motion alternative, performance validation, and confirmation that all content remains available without it. The motion guidelines treat scroll-driven animation as a review trigger, not as an approved pattern.

The approved direction B redesign (PT-65) presents the home page as a "signal panel": a trace in the left margin that connects each section, an experience timeline, and a case card that shows how the project gets from Markdown to production. The maintainer asked for scroll motion that reveals these relationships. The design specification defines nine motions (M1–M9) with one purpose each.

Native CSS now covers this need without a library. `animation-timeline` with `scroll()`, `view()` and named view timelines is available in Chrome 115, Safari 26 and Firefox 159. Cross-document view transitions (`@view-transition`) are available in Chrome 126 and Safari 18.2, and only as a preview in Firefox.

## Assumptions

- The page is complete and readable without motion; motion only adds orientation, progress and relationship cues.
- Visitors without scroll-timeline support, or with reduced motion requested, get the static final state and lose nothing.
- The set of motions stays small and tied to the signal-panel structure; it is not a general reveal-on-scroll pattern.

## Decision drivers

- Every animation serves one ADR 0003 purpose (hierarchy, orientation, continuity, progress, relationship or feedback).
- No new dependency and no JavaScript animation runtime (ADR 0003, ADR 0002).
- Progressive enhancement: content is never hidden waiting for scroll or script.
- Reduced motion is a designed state, not a near-zero duration.
- Animation work stays off the main thread where the browser allows it.

## Options considered

| Option                                                  | Assessment                                                                                                         |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Keep ADR 0003's assumption: no scroll-driven motion     | Safest, but leaves the trace, timeline and pipeline static and does not meet the approved design.                  |
| Native CSS scroll-driven animation and view transitions | No dependency, runs on the compositor for `transform` and `opacity`, falls back to the static page. **Chosen.**    |
| `IntersectionObserver` class toggles for every reveal   | Works everywhere, but needs main-thread script for each effect and tempts hiding content until a class is applied. |
| A library (GSAP ScrollTrigger, Motion) or the polyfill  | Rejected by ADR 0003 for this scope: runtime cost and a dependency for effects CSS can express.                    |

## Decision

Amend ADR 0003's assumption "the MVP does not require scrollytelling or coordinated timelines". Scroll-driven motion is allowed for the motions listed below and for later additions that meet the same rules and are recorded here or in a new ADR.

| #   | Moment            | What happens                                                                                        | Purpose                  | Technique                                    |
| --- | ----------------- | --------------------------------------------------------------------------------------------------- | ------------------------ | -------------------------------------------- |
| M1  | Load              | The hero name rises line by line (0.7 s) and the status lamp lights once. Only time-based sequence. | Hierarchy, identity      | Keyframes, `backwards` fill                  |
| M2  | Hero to header    | The large name shrinks and fades over the first 55vh; the compact header name takes over.           | Orientation, continuity  | `scroll(root)` with `animation-range`        |
| M3  | Signal trace      | The margin line fills with reading progress.                                                        | Progress                 | `scroll(root)`, `scaleY`                     |
| M4  | Section nodes     | Each section node lights as its heading reaches mid-viewport.                                       | Orientation              | `view()`, `entry 100%` to `cover 45%`        |
| M5  | Experience        | Each role slides out of the trace (28 px, opacity from 0.35) and its connector draws.               | Relation to the timeline | `view()`                                     |
| M6  | Case pipeline     | Stages light in order, a pulse travels down the line, and the check marks tick one after another.   | Explain a relationship   | `view-timeline: --run` with staggered ranges |
| M7  | Home card to case | The card title becomes the case H1.                                                                 | Continuity               | `@view-transition`, `view-transition-name`   |
| M8  | Case page         | A reading progress bar grows; decisions and evidence settle in.                                     | Progress                 | `scroll(root)`, `view()`                     |
| M9  | Hover and focus   | Colour and border change in 120–160 ms.                                                             | Feedback                 | Transitions                                  |

The current-section link in the header and the case steps rail use one small `IntersectionObserver` script for orientation. Without JavaScript the links work without a current state.

Rules for every motion:

- Every animation sits inside `@media (prefers-reduced-motion: no-preference)`. Scroll-driven animations also sit inside `@supports ((animation-timeline: scroll()) and (animation-range: 0 1px))`.
- Without support or with reduced motion, the page shows the complete static state: trace full, nodes lit, lamps on, ticks visible.
- Only `transform` and `opacity` animate, except colour changes on small nodes and lamps.
- Nothing waits for scroll below opacity 0.35. Check labels always show; only their marks animate.
- No parallax, large zoom, typewriter effect or blinking cursor. No scroll hijacking or forced smooth scrolling.
- Each animation documents its purpose next to its CSS. Motion lives in `src/styles/motion.css`; components expose hooks (`data-*` attributes and custom properties) rather than their own scroll animations.

## Consequences

### Positive

- The signal-panel structure explains itself while scrolling, with no JavaScript animation runtime and no dependency.
- Browsers without support and visitors who request reduced motion get the same content in its final state.
- Motion is in one reviewed file, so additions are visible in review.

### Negative

- Behaviour differs between engines until support is universal; Firefox navigates without the page transition.
- Scroll-driven ranges are tuned to the current layout and need retuning when the layout changes.
- The build minifier folds `animation-timeline` into the `animation` shorthand, which browsers reject, so scroll-driven rules must use longhands.

## Risks and mitigations

- **Motion sickness or distraction:** reduced-motion users get no motion; movement distances stay small; no parallax or zoom.
- **Hidden content:** minimum opacity 0.35 and static fallbacks; end-to-end tests assert the final state under reduced motion.
- **Jank on low-end devices:** only compositor-friendly properties animate; scroll handlers are not used.
- **Scope creep into site-wide reveal-on-scroll:** new motions need a purpose and must be recorded against this ADR.

## Validation requirements

- `tests/e2e/motion.spec.ts` asserts that reduced motion shows the final state, that scroll timelines drive the motions when allowed, that the current-section link follows scroll, that the home card and case H1 share a transition name, and that ticks and lamps stay visible under reduced motion.
- Manual checks on each release that changes motion: scroll smoothness on iOS Safari and Android Chrome, macOS "Reduce motion", Firefox without the page transition, and a keyboard-only pass.

## Revisit conditions

- A motion causes reported discomfort, accessibility failures or measurable jank.
- A layout change makes a motion misleading or its range wrong.
- A proposal needs JavaScript-driven animation, a library, or motion beyond the M1–M9 purposes.

## References

- [WebKit: A guide to scroll-driven animations with just CSS](https://webkit.org/blog/17101/a-guide-to-scroll-driven-animations-with-just-css/)
- [Chrome for Developers: Scroll entry and exit effects](https://developer.chrome.com/docs/modern-web-guidance/guides/ui-behaviors/scroll-entry-exit-effects)
- [MDN: `@view-transition`](https://developer.mozilla.org/en-US/docs/Web/CSS/@view-transition)
