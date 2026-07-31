# ADR 0001: Use Astro as the primary frontend framework

- **Status:** Accepted
- **Date:** 2026-07-31
- **Decision owners:** Portfolio maintainer
- **Related issue:** [PT-8 — Evaluate frontend framework](https://github.com/LuisArostegui/portfolio/issues/11)
- **Related documentation:** [Product vision](../../product/product-vision.md), [information architecture](../../product/information-architecture.md), [content strategy](../../product/content-strategy.md), and [product success criteria](../../product/product-success-criteria.md)

## Context

The portfolio is primarily a content-driven website. Its core routes present professional positioning, experience, projects, case studies, contact information, and engineering evidence. Most of this content can be rendered completely at build time. A smaller number of features, such as project filters or enhanced forms, may benefit from client-side state.

The product must demonstrate React and TypeScript expertise without turning static content into a fully hydrated application. It must also support semantic HTML, keyboard operation, progressive enhancement, strong Core Web Vitals, structured and maintainable editorial content, automated testing, preview deployments, and future localisation or small server-side features.

The framework choice must therefore:

- generate complete static pages by default;
- make browser JavaScript an explicit cost;
- support selective interactivity and React reuse;
- provide strict TypeScript and typed content workflows;
- remain deployable to standard static or edge hosting;
- preserve a practical path to limited dynamic rendering; and
- avoid complexity that only hypothetical application requirements would justify.

Hosting is deliberately outside this decision. A separate ADR will select a provider and deployment topology.

The specific styling, animation, content-management, testing, application-architecture, and hosting approaches will be decided separately. This ADR evaluates whether the framework can support those concerns; it does not select their detailed implementation.

## Assumptions

- The portfolio will remain primarily content-driven.
- Most routes can be generated at build time.
- Authentication is not required for the MVP.
- Shared client-side state will remain exceptional.
- Content changes do not require immediate publication without a rebuild.

## Decision drivers

The following criteria are weighted for this portfolio, not for web projects in general.

| Criterion | Weight | Interpretation for this product |
| --- | ---: | --- |
| Product fit and static generation | 18% | First-class build-time pages, routing, metadata, and dynamic content routes |
| Selective hydration and runtime cost | 16% | Static HTML by default and fine-grained control of shipped JavaScript |
| Content modelling | 12% | Typed, validated Markdown/MDX content and a path to remote sources |
| Selective React reuse and TypeScript integration | 12% | React reuse where valuable and strict end-to-end typing |
| Accessibility implications | 8% | Semantic output, progressive enhancement, and predictable navigation |
| Maintainability and developer experience | 10% | Clear conventions, understandable boundaries, tooling, and low operational burden |
| Testing ecosystem | 6% | Static validation, unit/component tests, and cross-browser end-to-end tests |
| Hosting and preview portability | 7% | Standard static output and broad edge/CDN compatibility |
| Extensibility and migration cost | 6% | A proportionate route to server features or a different architecture |
| Ecosystem maturity and platform coupling | 5% | Sustainable dependencies without unnecessary provider lock-in |

## Options considered

Scores use a five-point scale, where 1 is a poor fit and 5 is an excellent fit. Weighted totals are normalised to 100 and rounded to the nearest whole number. They express suitability for the current portfolio requirements; they are not a universal framework ranking.

| Option | Static and product fit | Hydration and JS | Content | Selective React and TS | Accessibility | Maintainability and DX | Testing | Hosting | Evolution | Maturity and coupling | Total |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| **Astro** | 5 | 5 | 5 | 5 | 4 | 4 | 4 | 5 | 4 | 4 | **93** |
| Next.js | 4 | 3 | 3 | 5 | 4 | 3 | 5 | 4 | 5 | 4 | **77** |
| React Router framework mode | 3 | 2 | 2 | 5 | 3 | 3 | 5 | 4 | 5 | 4 | **66** |
| Vite with React | 2 | 2 | 1 | 5 | 3 | 3 | 5 | 4 | 3 | 5 | **59** |
| SvelteKit | 5 | 4 | 3 | 2 | 4 | 4 | 4 | 5 | 4 | 4 | **78** |
| Nuxt | 5 | 3 | 4 | 2 | 4 | 4 | 4 | 5 | 4 | 5 | **78** |
| Qwik City | 5 | 5 | 3 | 2 | 4 | 3 | 3 | 5 | 4 | 2 | **76** |
| Eleventy | 5 | 5 | 4 | 1 | 4 | 3 | 3 | 5 | 2 | 4 | **75** |

“Remix” is evaluated through React Router framework mode. The current React Router framework incorporates the relevant framework capabilities and provides the meaningful forward-looking comparison; treating legacy Remix as a separate destination would duplicate the same architectural family.

### Astro

Astro components render to HTML at build time by default. Framework components also remain non-interactive unless a `client:*` directive explicitly hydrates them. This gives the architecture a useful default: content is HTML and CSS, while React is loaded only for a bounded feature that needs browser behaviour.

Astro also provides file-based routing, image tooling, Markdown and MDX integration, and Content Collections. Collection schemas turn editorial frontmatter into a validated, typed contract and can later be backed by local or remote loaders. These capabilities directly support the canonical project, case-study, and experience content defined by the product documentation.

The selective React and TypeScript score reflects the required ability to reuse React without adopting a site-wide React runtime; it does not claim that React is as central to Astro as it is to Next.js or React Router. Astro's static output can encourage progressive enhancement, but accessibility still depends on semantic markup, focus behaviour, keyboard support, contrast, and implementation quality. It is therefore scored 4 rather than 5 for accessibility.

Static output is ordinary deployable assets and does not require an application runtime. If a measured requirement later needs dynamic rendering, Astro can introduce an on-demand route or server island with an adapter. That is an available evolution path, not a reason to operate a server today.

### Next.js

Next.js is capable of static export and offers excellent React, TypeScript, testing, routing, and ecosystem support. It is rejected because its central server/client component model, navigation payloads, caching concepts, and server-runtime capabilities add concepts the present product does not need. Static export also excludes runtime-dependent features such as cookies, Server Actions, ISR, request-dependent route handlers, and the default image optimiser.

Using Next.js would introduce a broader application model and additional concepts whose benefits are not required by the current product.

### Vite with React

Vite is a fast, mature build tool and remains part of Astro's underlying toolchain. Vite with React would be familiar and marketable, but Vite alone does not establish routing, static generation, structured content, metadata, image handling, or hydration boundaries. The project would need to assemble and maintain those layers, and a conventional React root would make full-site hydration the path of least resistance.

### React Router framework mode

React Router framework mode provides typed routing, loaders, actions, SSR, SPA operation, and route prerendering. Dynamic paths must be enumerated for prerendering, and the model remains centred on a React application and data-router lifecycle. That is a strong fit for mutation-heavy applications and complex client navigation, but a weaker default for an editorial site with isolated interaction.

### SvelteKit

SvelteKit provides mature routing, static adapters, strong performance, and good testing support. It would require adopting Svelte as the principal UI model, weakening direct React reuse and adding a new ecosystem without a decisive benefit over Astro for this site.

### Nuxt

Nuxt provides mature prerendering, hybrid rendering, content integrations, and broad deployment support. It is a compelling choice for a Vue-oriented product, but this portfolio intentionally demonstrates React and TypeScript. Moving the UI layer to Vue would incur learning and migration cost without improving the core product fit.

### Qwik City

Qwik City supports SSG and uses resumability to avoid traditional hydration. Its runtime model is technically well aligned with low initial JavaScript, but its smaller ecosystem, different component model, lower hiring relevance, and added learning risk are disproportionate for a site that Astro can render almost entirely without client JavaScript.

### Eleventy

Eleventy could produce a very small, robust static site while remaining in the JavaScript ecosystem. It would, however, provide weaker direct React reuse and a less integrated TypeScript content model. Adding interactive React features would require more bespoke bundling and hydration conventions, while future partial server rendering would usually cross a larger architectural boundary. Hugo is not scored because adopting its Go template ecosystem is not a realistic option for this React- and TypeScript-oriented project.

## Decision

Adopt **Astro 7** as the initial major version of the primary frontend framework. The exact minor and patch versions will be pinned in the lockfile and updated through the normal dependency-management process.

The initial architecture will use:

- static generation as the default rendering strategy;
- `.astro` components for pages, layouts, and static presentation;
- React as the only client UI framework;
- React islands only for meaningful client-side state or interaction;
- TypeScript extending Astro's `strictest` configuration;
- support for structured, type-checked content without deciding the content-management approach here; and
- no server adapter or application runtime until a concrete server-side requirement exists.

React and TypeScript remain the principal marketable skills demonstrated by the portfolio. Astro is not selected because it has greater employment demand than React or Next.js. It is selected because choosing a content-oriented architecture for a content-oriented product demonstrates sound engineering judgement while retaining React for the features that benefit from it.

## Rendering and island policy

1. Use `.astro` components by default. Static navigation, headings, content, project cards, metadata, and layout do not require React.
2. Use React only when client-side state or interaction provides concrete user value. CSS behaviour or a small framework-free script may be more appropriate for simple enhancement.
3. Treat every `client:*` directive as an architectural decision that must be reviewable in the change introducing it.
4. Use `client:load` only for interaction that must be ready immediately. Prefer `client:idle` or `client:visible` for non-critical features, and `client:media` when interaction only applies under a media condition.
5. Avoid `client:only`. It removes useful initial server-rendered HTML and is permitted only when server rendering is technically impossible and the accessibility and loading fallback are documented.
6. Do not introduce another client UI framework merely because Astro supports mixing frameworks.
7. Keep props crossing into islands serialisable. Astro composes the page; a React island owns its internal interactive tree.
8. Do not introduce global client state unless multiple interactive areas genuinely need it. When islands require tightly coupled state, prefer one coherent larger island over several synchronised islands.
9. Preserve progressive enhancement and meaningful HTML before hydration. Detailed accessibility requirements remain governed by the product success criteria and future implementation decisions.

The detailed content model, CSS approach, animation policy, test tools, performance budgets, provider boundaries, and hosting platform are outside this ADR.

## Consequences

### Positive

- Static pages ship minimal or no client-side JavaScript.
- The boundary between content and interactive application behaviour is explicit.
- The generated output supports strong initial performance, SEO, and broad hosting compatibility.
- Astro provides a path to validated, TypeScript-safe content; the content-management decision remains separate.
- Existing React knowledge and selected components remain reusable without making the complete site a React application.
- Static deployment has a small operational surface and avoids a mandatory server runtime.
- Dynamic routes or server islands can be introduced incrementally if an evidenced requirement appears.
- The architecture aligns with the product's progressive-disclosure and maintainability principles.

### Negative

- Astro and its `.astro` component model must be learned and maintained alongside React.
- Direct employment demand for Astro is smaller than for React or Next.js.
- Astro and React have different composition and lifecycle boundaries.
- Careless use of hydration directives or heavy island dependencies can erase the expected performance benefit.
- Multiple islands can make shared client state harder to coordinate.
- Some React libraries assume a fully hydrated application or browser-only environment and may require adaptation or rejection.

## Risks and mitigations

| Risk | Mitigation |
| --- | --- |
| React is used for static presentation out of habit | Default to `.astro`; require concrete interactive value for every React island |
| Hydration grows unnoticed | Review every `client:*` directive and inspect built JavaScript against budgets |
| Islands become fragmented | Consolidate tightly coupled features and avoid incidental global stores |
| A library assumes an SPA | Evaluate progressive enhancement and SSR compatibility before adoption |
| Astro's organisational relationship with Cloudflare affects governance or platform neutrality | Monitor governance and portability; mitigate through Astro's MIT licence, open governance, and platform-neutral static output |
| Future dynamic requirements are over-anticipated | Add an adapter or on-demand route only after a concrete requirement and separate decision |

## Revisit this decision when

Review this ADR if any of the following becomes true:

- authenticated application functionality becomes central;
- most pages require shared client state;
- complex server mutations become common;
- real-time or collaborative features are introduced;
- dynamic personalisation becomes a primary requirement;
- Astro blocks a critical integration;
- the team or product shape changes materially;
- build performance becomes a measured delivery problem; or
- Astro's maintenance, governance, licence, or platform neutrality changes materially.

A revisit does not imply an automatic migration. It triggers a new comparison against measured requirements and migration cost.

## Validation

Validate this decision during the initial implementation by confirming that:

- representative static routes build successfully without a server adapter;
- a page without islands ships no React runtime;
- one representative React island works with selective hydration;
- one representative structured content entry is type-checked during the build; and
- the generated output can be served by a standard static server.

The later testing, content-management, and hosting decisions will determine how these checks are automated and maintained.

## References

### Astro

- [Why Astro?](https://docs.astro.build/en/concepts/why-astro/)
- [Astro islands and UI framework components](https://docs.astro.build/en/guides/framework-components/)
- [React integration](https://docs.astro.build/en/guides/integrations-guide/react/)
- [Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [Markdown and MDX](https://docs.astro.build/en/guides/markdown-content/)
- [TypeScript](https://docs.astro.build/en/guides/typescript/)
- [Testing](https://docs.astro.build/en/guides/testing/)
- [Deploy Astro](https://docs.astro.build/en/guides/deploy/)
- [On-demand rendering](https://docs.astro.build/en/guides/on-demand-rendering/)
- [Server islands](https://docs.astro.build/en/guides/server-islands/)
- [Astro governance](https://astro.build/governance/)
- [Astro licence](https://github.com/withastro/astro/blob/main/LICENSE)

### Alternatives

- [Next.js static exports](https://nextjs.org/docs/app/guides/static-exports)
- [React Router pre-rendering](https://reactrouter.com/how-to/pre-rendering)
- [React Router framework modes](https://reactrouter.com/start/modes)
- [Vite guide](https://vite.dev/guide/)
- [SvelteKit static site generation](https://svelte.dev/docs/kit/adapter-static)
- [Nuxt prerendering](https://nuxt.com/docs/4.x/getting-started/prerendering)
- [Qwik City](https://qwik.dev/docs/qwikcity/)
- [Qwik City static site generation](https://qwik.dev/docs/guides/static-site-generation/)
- [Eleventy documentation](https://www.11ty.dev/docs/)
