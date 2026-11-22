# Design documentation

Direction B, the "signal panel" design approved in [#120](https://github.com/LuisArostegui/portfolio/issues/120), is the current design. It shipped in [#121](https://github.com/LuisArostegui/portfolio/pull/121) (visual system and structure) and [#122](https://github.com/LuisArostegui/portfolio/pull/122) (motion). Start here before changing anything visual.

## Current references

| Topic            | Source                                                                                                                                                                                                                                                                      |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Approved design  | [Static prototype](https://claude.ai/artifact/F5AhU9xzXQYYYMWxuVhgfn) (row B) and [motion prototype](https://claude.ai/artifact/V1yBk4j8fck83vbi7f1veX). The written specification is `Proyectos/Portfolio/Output/Diseño · dirección B.md` in the companion Obsidian vault. |
| Pages and routes | [Information architecture](../product/information-architecture.md) and [routing and error handling](../architecture/routing.md)                                                                                                                                             |
| Tokens           | `src/styles/tokens.css` is the source of truth. `src/styles/tokens.test.ts` enforces WCAG AA contrast for the text and signal pairs. The current palette is summarised in [design foundations](design-foundations.md#direction-b-palette).                                  |
| Navigation       | Experience, Work, About and Contact (all home sections) plus a CV action. `aria-current` follows the current section through `src/scripts/current-section.ts`; navigation works without JavaScript.                                                                         |
| Motion           | [ADR 0007](../architecture/decisions/0007-allow-purposeful-scroll-driven-motion.md), which amends [ADR 0003](../architecture/decisions/0003-use-a-native-first-purpose-driven-animation-strategy.md). Implementation lives in `src/styles/motion.css`.                      |
| Principles       | [Design principles](design-principles.md) and the accessibility and state rules in [component foundations](component-foundations.md) still apply.                                                                                                                           |

The final visual pass for Direction B is tracked in [#109](https://github.com/LuisArostegui/portfolio/issues/109).

## Historical records

These documents describe the MVP design before Direction B. They are kept for traceability and are not active references. Where they disagree with Direction B, Direction B governs.

- [Responsive wireframes](responsive-wireframes.md)
- [Home high-fidelity design](home-design.md)
- [Projects and project-detail high-fidelity design](projects-design.md)
- [Experience and shared navigation high-fidelity design](experience-navigation-design.md)
- [Interactive prototype and interaction contract](interactive-prototype.md)
- [Design validation and implementation handoff](design-validation-handoff.md)

[Motion and interaction guidelines](motion-interaction-guidelines.md) remain valid except where ADR 0007 approves scroll-driven motion and the case page view transition.
