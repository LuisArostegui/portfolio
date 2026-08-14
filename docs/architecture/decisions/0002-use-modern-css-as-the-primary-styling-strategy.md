# ADR 0002: Use modern CSS as the primary styling strategy

- **Status:** Accepted
- **Date:** 2026-07-31
- **Decision owners:** Portfolio maintainer
- **Related issue:** [PT-9 — Evaluate styling strategy](https://github.com/LuisArostegui/portfolio/issues/12)
- **Related documentation:** [ADR 0001](0001-use-astro-as-the-primary-frontend-framework.md), [product vision](../../product/product-vision.md), [information architecture](../../product/information-architecture.md), [content strategy](../../product/content-strategy.md), and [product success criteria](../../product/product-success-criteria.md)

## Context

ADR 0001 selects Astro as the primary frontend framework. The portfolio is a content-driven site whose pages and presentation are mostly static Astro components. React is reserved for a small number of islands where client-side state or interaction provides concrete value. The styling architecture should reinforce that static-first boundary rather than introduce a parallel application or runtime model.

The portfolio must support a distinctive, highly customised visual identity; reusable primitive and semantic design tokens; responsive and intrinsic layouts; container queries; accessible interaction states; theming; maintainable component ownership; minimal runtime overhead; portable generated CSS; and progressive enhancement. It must remain extensible as content and components grow without creating a design-system platform before one is needed.

The information architecture also requires the same kinds of content to work in different contexts, including project previews, project details, experience entries, and narrow mobile layouts. Component adaptation must therefore respond both to viewport-level conditions and to the space a reusable component actually receives.

The issue lists mechanisms from different categories:

- **Authoring strategies:** native CSS, Tailwind CSS, and Sass.
- **Encapsulation:** Astro scoped styles and CSS Modules.
- **Processors:** PostCSS.
- **Build-time typed styling:** Vanilla Extract, Panda CSS, and StyleX.
- **Runtime CSS-in-JS:** Styled Components and Emotion.
- **Utility engines:** Tailwind CSS and UnoCSS.
- **Token foundations:** Open Props.

These are not all mutually exclusive libraries. Astro scoped styles and CSS Modules encapsulate CSS; PostCSS transforms it; and Open Props supplies predefined values. A useful comparison must therefore evaluate realistic complete strategies, not treat isolated mechanisms as equivalent alternatives.

This ADR decides the styling architecture and its ownership rules. It does not select the palette, typefaces, type scale, spacing values, detailed breakpoints, component appearance, or animation language.

## Assumptions

- Most presentation will remain in `.astro` components.
- React islands will remain selective and independently owned.
- The initial portfolio has one maintainer and a relatively small component set.
- Supported browsers provide the modern CSS capabilities required by the implementation.
- Themes, if introduced, can be expressed by changing semantic token values.
- Tokens do not initially need to be consumed by native applications, Figma, or multiple web applications.
- No existing CSS framework or legacy stylesheet constrains the decision.

## Decision drivers

The following criteria and weights are specific to this portfolio. They are not a universal ranking of styling technologies.

| Criterion                                  | Weight | Interpretation for this product                                                       |
| ------------------------------------------ | -----: | ------------------------------------------------------------------------------------- |
| Distinctive visual design                  |     8% | Freedom to implement a bespoke editorial identity without fighting defaults           |
| Runtime overhead                           |     8% | No client-side runtime should be required to generate or inject stylesheet rules      |
| Generated CSS size                         |     5% | Production CSS should be compact, reusable, and inspectable                           |
| Design-token support                       |     6% | Primitive and semantic values can form a stable, themeable contract                   |
| Component encapsulation                    |     7% | Astro components and React islands can own presentation without leakage               |
| Responsive-design support                  |     5% | Media queries, intrinsic layout, and fluid values are first-class                     |
| Container-query support                    |     4% | Reusable components can adapt to their containing layout                              |
| Theming                                    |     4% | Semantic values can change at runtime through the cascade                             |
| Accessible-state styling                   |     6% | Native state, semantic attributes, and user preferences are straightforward to target |
| Type safety                                |     4% | Invalid token and style references can be detected before runtime                     |
| Developer experience                       |     6% | Authoring, debugging, and feedback loops remain productive                            |
| Component-markup readability               |     6% | Semantic structure remains easy to read without presentation-heavy attributes         |
| Maintainability                            |     7% | Ownership and conventions remain understandable as the site grows                     |
| Refactoring support                        |     4% | Styles and their consumers can be located and changed safely                          |
| Framework coupling                         |     5% | CSS remains portable across rendering technologies                                    |
| Build requirements                         |     4% | Additional plugins, generation, configuration, and failure modes are limited          |
| Learning and employment relevance          |     5% | The approach develops useful skills and communicates relevant experience              |
| Fit with Astro's static-first architecture |     6% | The approach complements scoped Astro components and selective React hydration        |

Scores use a five-point scale, where 1 is a poor fit and 5 is an excellent fit. Weighted totals are normalised to 100 and rounded. The detailed criteria above are applied to every complete strategy; the grouped columns below keep the comparison readable:

- **Design:** distinctive design, responsive design, container queries, and accessible states (23%).
- **Delivery:** runtime overhead and generated CSS size (13%).
- **System:** tokens, theming, and type safety (14%).
- **Ownership:** encapsulation, markup readability, maintainability, and refactoring (24%).
- **Adoption:** developer experience and learning or employment relevance (11%).
- **Architecture:** framework coupling, build requirements, and Astro fit (15%).

| Complete strategy                                  | Design | Delivery | System | Ownership | Adoption | Architecture |  Total |
| -------------------------------------------------- | -----: | -------: | -----: | --------: | -------: | -----------: | -----: |
| **Modern CSS + Astro scoped styles + CSS Modules** |      5 |        5 |      4 |         5 |        4 |            5 | **95** |
| Sass/SCSS + Astro scoped styles or SCSS Modules    |      5 |        5 |      4 |         4 |        4 |            4 | **87** |
| Tailwind CSS 4 + Astro integration                 |      5 |        5 |      4 |         3 |        5 |            4 | **85** |
| Vanilla Extract                                    |      4 |        5 |      5 |         4 |        3 |            3 | **80** |
| Panda CSS                                          |      5 |        5 |      5 |         3 |        3 |            3 | **80** |
| UnoCSS                                             |      5 |        5 |      4 |         3 |        3 |            3 | **77** |
| StyleX                                             |      4 |        4 |      4 |         4 |        3 |            2 | **72** |
| Styled Components or Emotion                       |      4 |        2 |      4 |         4 |        4 |            1 | **66** |

PostCSS and Open Props are assessed separately because neither is a complete strategy:

| Supporting mechanism | Potential value                                                                                | Decision                                                                                    |
| -------------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Open Props           | A mature source of reusable custom properties and useful reference for token naming and scales | Do not adopt as the portfolio's token foundation; use it as research material where helpful |
| PostCSS              | A plugin platform for parsing and transforming CSS                                             | Do not add without a concrete transformation or browser-compatibility requirement           |

Scores describe present product fit. In particular, they do not claim that modern native CSS has stronger explicit employment demand than Tailwind CSS.

## Options considered

### Modern CSS with Astro scoped styles and CSS Modules

Modern CSS provides custom properties, nesting, cascade layers, Grid, Flexbox, logical properties, intrinsic sizing, fluid functions, container queries, media queries, and preference queries without a separate authoring language. Astro already scopes `<style>` rules in `.astro` components. React islands can use CSS Modules for locally scoped class names without a runtime styling dependency.

Custom properties participate in inheritance and the cascade, so semantic tokens can change by theme or context at runtime. Ordinary CSS also benefits from Astro's production bundling, minification, deduplication, and page-aware splitting. No client-side JavaScript runtime is required to generate or inject the stylesheet rules, and the generated CSS remains standards-based and portable if the rendering framework changes. JavaScript may still change a semantic attribute or custom-property value when an interactive feature, such as a theme selector, requires it.

This strategy has less compile-time type safety than typed styling systems and requires direct knowledge of the cascade. For this site's size and mostly Astro component model, those costs are smaller than the abstraction and build integration introduced by a framework or typed styling platform. Direct CSS also makes browser, responsive-design, and accessibility knowledge visible as engineering evidence.

### Tailwind CSS 4

Tailwind CSS 4 is mature, zero-runtime, CSS-first, token-aware, and supports responsive variants and container queries. It generates utilities from detected usage and has strong explicit hiring relevance, particularly in React startups and SaaS products.

It is not rejected for performance or lack of capability. It is rejected because utility-heavy markup makes semantic component structure less readable, and part of its encapsulation and consistency value overlaps with Astro's scoped component styles. The current portfolio is small enough that an additional utility language and framework conventions provide less value than direct modern CSS. Tailwind's stronger hiring demand is acknowledged; native CSS is selected because it better demonstrates this product's specific browser, accessibility, portability, and architecture goals.

### Sass or SCSS Modules

Sass is mature, widely used, and useful when a codebase needs compile-time loops, maps, functions, mixins, or large-scale rule generation. SCSS Modules can add local class names to React components.

The current project does not require those compile-time facilities. Modern CSS already provides the necessary variables, nesting, responsive features, and organisation mechanisms. Sass would introduce another compilation step and a second variable model without solving a present requirement.

### Vanilla Extract

Vanilla Extract produces zero-runtime CSS from typed TypeScript and provides strong token and theme contracts. It is a credible option for a component library or design system shared across packages.

Its build integration, generated artifacts, and TypeScript object authoring model are disproportionate for a site whose presentation is mostly written in `.astro` components. It would also move style expression away from the browser's native language to gain type guarantees that have not yet proved necessary.

### Panda CSS

Panda CSS provides typed tokens, utilities, recipes, static extraction, and code generation. It can enforce design-system constraints effectively.

Those features introduce a proprietary authoring model, generated types, configuration, and another build layer. They solve platform-scale consistency problems that the initial portfolio does not have.

### StyleX

StyleX compiles typed JavaScript styles into atomic CSS and optimises deduplication and composition at scale. Its model is designed for large organisations and application codebases.

The portfolio does not have the volume of styles or organisational scale needed to justify its compiler integration, atomic authoring model, and closer coupling to JavaScript components.

### Styled Components and Emotion

Styled Components and Emotion form the runtime CSS-in-JS family considered here. Both provide component co-location, composition, dynamic styling, and React-oriented theming.

They couple styling to React and introduce runtime style behaviour where the primary rendering model is static Astro. Most presentation would gain no benefit from that runtime, and React should not become necessary merely to style content. This conflicts with ADR 0001's selective hydration policy.

### UnoCSS

UnoCSS is a flexible, on-demand atomic CSS engine with Astro and Vite integrations. It is fast and can define custom presets or utility conventions.

It has the same presentation-heavy markup trade-off as Tailwind while providing a smaller ecosystem and less explicit hiring relevance. Its flexibility could also encourage the project to build a private utility framework rather than establish a small, stable styling vocabulary.

### Open Props

Open Props is a collection of predefined custom properties rather than a complete ownership or encapsulation strategy. It can inform token naming, scales, easing, and other design-system research.

It will not define the portfolio's tokens because the product requires a distinctive visual identity and governed semantic decisions. Importing a broad external token catalogue would add values that may not be used and would make external design choices part of the foundation.

### PostCSS

PostCSS is a transformation platform, not a styling strategy. Its value depends on selected plugins and a concrete transformation requirement.

It will not be introduced speculatively. It may be added later if supported-browser requirements, necessary fallbacks, or another measured transformation need cannot be met by the existing Astro and Vite pipeline.

## Decision

Adopt a **combined modern native CSS strategy**:

- modern native CSS is the primary styling language;
- a small global CSS foundation contains reset or normalisation, design tokens, base element styles, themes, accessibility helpers, and limited reusable layout utilities;
- scoped `<style>` blocks own `.astro` component styles;
- CSS Modules are the default encapsulation mechanism for React island styles that require component-local classes;
- CSS custom properties implement design tokens;
- cascade layers organise global CSS;
- media queries govern viewport-level layout and user preferences;
- container queries govern reusable component adaptation; and
- no CSS framework, preprocessor, runtime CSS-in-JS library, or additional CSS generation tool is part of the initial architecture.

Native CSS, Astro scoped styles, and CSS Modules are complementary rather than mutually exclusive. Native CSS is the language; the other two mechanisms provide component-appropriate encapsulation.

This decision does not prohibit future tooling. It requires a measured need and an explicit reassessment before adding another styling abstraction.

## Global-style boundaries

Global CSS is limited to:

- reset or normalisation;
- primitive and semantic design tokens;
- base document and typography styles;
- themes;
- accessibility helpers; and
- a small collection of proven layout utilities.

It must not contain implementation styles for individual components. Component-specific global stylesheets should not be imported from arbitrary components unless an external integration or rendering boundary makes global CSS necessary and the side effect is documented. Valid exceptions may include third-party widgets, rendered Markdown, code editors, maps, or other libraries whose styling cannot be encapsulated through the normal component mechanism. Print styles may also be global when their document-wide scope is intentional.

Use this initial structure:

```text
src/styles/
├── global.css
├── reset.css
├── tokens.css
├── base.css
└── utilities.css
```

`global.css` is the single global entry point and should declare the global cascade order before importing each concern into its layer. The exact layer names may evolve, but their order must be explicit and centralised. Exact token values and the visual identity are outside this ADR.

## Token policy

Tokens may exist at three levels:

1. **Primitive tokens** hold governed raw scales or values.
2. **Semantic tokens** describe purpose, such as primary text or page surface.
3. **Component tokens** exist only when a component exposes a genuine configurable contract.

Components consume semantic tokens by default. They should not bind directly to primitive palette or scale values when a semantic decision exists.

A token must represent a reused or intentionally governed design decision. Do not create a custom property for every CSS value. Local, one-off values that are not part of a contract should remain local declarations.

Implement tokens as CSS custom properties. Do not duplicate them as Sass variables or TypeScript constants. Generated TypeScript definitions are not initially required. Reconsider type generation only if untyped token use causes measured maintenance defects or tokens need to be shared across platforms.

## Component ownership

1. Use scoped `<style>` blocks for Astro components.
2. Use CSS Modules by default when a React island requires component-local classes. An island without local presentation rules does not need a CSS Module.
3. Each component owns its internal presentation.
4. A parent must not style the private markup of a child component.
5. Use `:global()` only for controlled external or rendered content whose markup the component cannot scope directly.
6. Do not convert an Astro component to React merely to obtain style encapsulation.
7. Keep selectors low-specificity.
8. Avoid ID selectors and `!important`.
9. Keep nesting shallow and use it only when the relationship remains clear.
10. Style meaningful state through semantic attributes such as `aria-current`, `aria-expanded`, `disabled`, and `data-state` where appropriate.

Shared contracts should be expressed through semantic tokens, component APIs, composition, and documented state attributes rather than selectors that reach into another component.

## Responsive policy

- Use media queries for viewport-level layout and user preferences such as reduced motion, contrast, pointer, and hover capabilities.
- Use container queries when a reusable component must adapt to the space provided by its parent context.
- Build mobile-first.
- Prefer logical properties where they clarify flow-relative layout and support future localisation.
- Derive breakpoints from content and layout constraints rather than named devices.
- Prefer intrinsic sizing, Grid, Flexbox, and fluid values over many fixed breakpoints.
- Do not hide essential information behind hover-only interaction.

## Utility policy

A small utility set may cover repeated accessibility and composition patterns, including:

- visually hidden content;
- skip links;
- content wrappers;
- stacks;
- clusters;
- flow spacing; and
- page regions.

A utility must represent a repeated, stable pattern rather than one arbitrary CSS declaration. Do not build a private atomic utility framework or add property-level classes that recreate a subset of Tailwind without its tooling and conventions.

## Inline style policy

Inline styles are not a general styling mechanism. They may be used to pass dynamic custom-property values when the value is data-driven and cannot be represented through a stable class or semantic state attribute. Reusable presentation rules must remain in stylesheets.

## Consequences

### Positive

- No styling runtime is added.
- Generated styles are portable, standards-based CSS.
- The approach aligns directly with Astro's static-first component model.
- Astro and React components have clear and appropriate style ownership.
- Modern browser layout, cascade, state, and preference capabilities are used directly.
- Semantic tokens support inheritance, context, and runtime theming.
- Component markup remains focused on semantic structure.
- Build configuration and dependency surface remain small.
- Migration to another rendering framework can reuse tokens and most ordinary CSS.

### Negative

- Token names and CSS Module class names are not initially TypeScript-checked.
- Contributors must understand the cascade, inheritance, and specificity.
- Visual consistency depends on disciplined semantic-token use.
- CSS duplication must initially be identified through review and measurement.
- Scoped components make cross-component styling intentionally harder.
- The project gains less direct Tailwind implementation experience.

## Risks and mitigations

| Risk                                                | Mitigation                                                                                                              |
| --------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Global CSS grows without control                    | Keep one entry point; restrict global files to the documented concerns; reject component implementation rules in review |
| Custom properties are created for every local value | Require each token to represent reuse, governance, theming, or a real component contract                                |
| Components bypass semantic tokens                   | Review direct primitive and literal use when a semantic token already represents the decision                           |
| Utility classes grow into an atomic framework       | Require demonstrated repetition and a stable composition or accessibility purpose                                       |
| Component styles leak or depend on import order     | Use Astro scoping or CSS Modules; centralise global imports; inspect representative output                              |
| Repeated declarations diverge                       | Extract a token, utility, or component abstraction only after a repeated stable pattern is demonstrated                 |
| Specificity makes overrides fragile                 | Keep selectors shallow and low-specificity; avoid IDs and `!important`; use layers for global order                     |
| `:global()` breaks ownership boundaries             | Limit it to controlled external or rendered markup and document the boundary in the component                           |
| Untyped tokens cause defects                        | Use clear naming and lint or validation where justified; reconsider generated types after measured failures             |
| Browser support changes or requirements expand      | Track the supported-browser policy and add targeted transformations or fallbacks only when evidence requires them       |

## Validation

Validate this decision through an initial representative vertical slice containing:

- the single global style entry point and declared cascade layers;
- example primitive and semantic tokens without fixing the final visual system in this ADR;
- one Astro component with a scoped `<style>` block;
- one React island using a CSS Module;
- one reusable component adapting through a container query;
- a visible `:focus-visible` keyboard state;
- one semantic current or expanded state;
- reduced-motion handling;
- confirmation that stylesheet rules are not generated or injected by a client-side JavaScript runtime;
- inspection of generated production CSS; and
- confirmation that one component's internal styles do not affect another component.

The future testing and performance decisions will determine how these validations are automated and which budgets or compatibility targets apply.

## Revisit this decision when

Review this ADR if any of the following becomes true:

- the portfolio becomes a large application;
- a design system must serve multiple applications;
- multiple teams contribute regularly;
- multi-brand or cross-platform tokens are required;
- lack of token type safety causes repeated defects;
- CSS duplication becomes a measured problem;
- a utility-first workflow would materially improve delivery;
- browser requirements require substantial transformation;
- React becomes the dominant rendering model;
- a critical component ecosystem requires another strategy; or
- generated CSS exceeds agreed performance budgets.

A revisit does not imply automatic migration. It triggers a comparison against measured requirements, current browser capabilities, and migration cost.

## References

### Selected strategy

- [Astro styling and CSS](https://docs.astro.build/en/guides/styling/)
- [Astro framework components and islands](https://docs.astro.build/en/guides/framework-components/)
- [MDN: Using CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascading_variables/Using_custom_properties)
- [MDN: Cascade layers](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Cascade_layers)
- [MDN: CSS container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries)
- [MDN: CSS nesting](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Nesting)
- [MDN: CSS logical properties and values](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Logical_properties_and_values)
- [MDN: `prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)

### Alternatives

- [Tailwind CSS documentation](https://tailwindcss.com/docs/installation/framework-guides/astro)
- [Sass documentation](https://sass-lang.com/documentation/)
- [Vanilla Extract documentation](https://vanilla-extract.style/documentation/)
- [Panda CSS documentation](https://panda-css.com/docs/overview/getting-started)
- [StyleX documentation](https://stylexjs.com/docs/learn/)
- [Styled Components documentation](https://styled-components.com/docs)
- [Emotion documentation](https://emotion.sh/docs/introduction)
- [UnoCSS documentation](https://unocss.dev/)
- [Open Props documentation](https://open-props.style/)
- [PostCSS documentation](https://postcss.org/)
