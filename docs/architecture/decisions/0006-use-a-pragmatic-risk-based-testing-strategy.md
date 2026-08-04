# ADR 0006: Use a pragmatic risk-based testing strategy

- **Status:** Accepted
- **Date:** 2026-08-04
- **Decision owners:** Portfolio maintainer
- **Related issue:** [PT-13 — Evaluate testing strategy](https://github.com/LuisArostegui/portfolio/issues/16)
- **Related documentation:** [ADR 0001](0001-use-astro-as-the-primary-frontend-framework.md), [ADR 0002](0002-use-modern-css-as-the-primary-styling-strategy.md), [ADR 0003](0003-use-a-native-first-purpose-driven-animation-strategy.md), [ADR 0004](0004-use-git-versioned-astro-content-collections.md), [ADR 0005](0005-use-cloudflare-workers-static-assets-for-hosting.md), and [product success criteria](../../product/product-success-criteria.md)

## Context

The portfolio is a primarily statically generated, content-driven Astro site with selective React islands. Its quality risks are not distributed evenly. Invalid public content, missing generated routes, inaccessible navigation, broken professional links, confidential material, and production-only failures matter more than isolated lines of static presentation code.

The testing strategy must support confidence in user-visible behaviour, public content validity, accessibility, responsive interaction, and production delivery without creating a large maintenance surface for one developer. It must also respect the boundaries already selected: Astro and Vite, Git-versioned Content Collections with Zod validation, purpose-driven progressive animation, and production builds deployed as static assets.

This decision selects responsibilities and tools, not an implementation. Dependencies, test configuration, test cases, workflows, and application code will be introduced only with the features that require them.

## Assumptions

- Most pages remain static Astro output and most defects can be detected before or against a production build.
- React islands remain bounded and own only interaction that provides concrete value.
- Content Collections and project-owned Zod schemas remain the structured-content contract.
- One maintainer initially owns the test suite and CI budget.
- Pull-request previews and production deployments contain only public-safe content.
- The project targets WCAG 2.2 Level AA for its implemented scope.
- The exact route catalogue, interactive features, CI duration, and observed failure patterns will become clearer during implementation.

## Decision drivers

The weights and scores are specific to this portfolio, not universal rankings of testing tools or strategies. Scores use a five-point scale, where 1 is a poor fit and 5 is an excellent fit. Weighted totals are normalised to 100 and rounded.

| Criterion | Weight | Interpretation for this product |
| --- | ---: | --- |
| Confidence in critical user outcomes | 18% | Detect failures in navigation, content access, interaction, and production delivery |
| Astro, Vite, ESM, and TypeScript fit | 14% | Reuse the selected framework toolchain with little duplicated configuration |
| Accessibility and semantic testing | 14% | Support automated checks and user-centred interaction without overstating conformance |
| Production and cross-browser realism | 12% | Exercise built output across relevant engines, viewports, and media preferences |
| Feedback speed | 10% | Keep common local and pull-request checks fast enough to run consistently |
| Maintainability for one developer | 12% | Avoid redundant harnesses, brittle assertions, and excessive operational work |
| Diagnostics and CI integration | 8% | Make failures actionable through reports and retained evidence |
| React-island testing support | 5% | Test meaningful component behaviour through accessible DOM interaction |
| Ecosystem maturity and stability | 4% | Prefer dependable APIs and documented integrations |
| Extensibility without premature infrastructure | 3% | Permit measured expansion without adopting unused platforms now |
| **Total** | **100%** | |

## Options considered

The strategy separates two decisions that solve different problems:

- **Unit and integration runner:** Vitest, Rstest, or Jest, combined with React Testing Library for justified React-island tests.
- **Browser and end-to-end platform:** Playwright, Cypress, or WebdriverIO.

For this project, Rstest Browser Mode and browser-based component runners do not replace an end-to-end suite that exercises the complete built and deployed application.

## Comparison matrix

The grouped columns preserve the weighted evaluation above. **Outcomes** combines critical outcomes and accessibility; **architecture** combines Astro/Vite fit and React support; **execution** combines production realism and feedback speed; **ownership** covers maintainability; **operations** combines diagnostics and extensibility; and **maturity** covers ecosystem stability. The underlying weights, not equal column weighting, determine the total.

### Unit and integration runners

| Option | Outcomes | Architecture | Execution | Ownership | Operations | Maturity | Total |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| **Vitest** | 5 | 5 | 4 | 5 | 5 | 5 | **96** |
| Rstest | 5 | 3 | 5 | 3 | 4 | 3 | **84** |
| Jest | 5 | 3 | 4 | 3 | 4 | 5 | **81** |

### Browser and end-to-end platforms

| Option | Outcomes | Architecture | Execution | Ownership | Operations | Maturity | Total |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| **Playwright** | 5 | 5 | 4 | 5 | 5 | 5 | **96** |
| Cypress | 5 | 4 | 4 | 4 | 5 | 5 | **89** |
| WebdriverIO | 5 | 4 | 5 | 3 | 4 | 5 | **89** |

These totals describe present project fit. They do not claim that every project should choose Vitest or Playwright, or that similarly scored alternatives have identical strengths.

## Detailed evaluation of alternatives

### Vitest

Vitest is Vite-native and supports ESM, TypeScript, JSX, watch mode, Jest-compatible assertions and mocking, DOM environments, and V8 or Istanbul coverage. Astro documents it directly and exposes `getViteConfig()` so tests can share the application's Astro and Vite settings. This is the cleanest configuration boundary for a project already committed to Astro's Vite toolchain.

It is not cost-free: DOM emulation differs from a real browser, test environments and mocks still require maintenance, and execution slows as suites and worker setup grow. These trade-offs keep its score below a near-perfect result without changing its architectural lead.

### Rstest

Rstest is the strongest revisit candidate for the unit and integration runner. It is powered by Rspack and supports TypeScript, ESM, Jest- and Vitest-inspired APIs, mocking, coverage, watch mode, Node and DOM environments, React test execution and integration with Testing Library-based approaches, and an optional Browser Mode based on Playwright. It can test pure logic, hooks, and React components with `jsdom` or `happy-dom`; familiarity from professional use is also a genuine developer-experience benefit.

It is not selected initially because its principal architectural advantage is reusing the Rstack toolchain. The official adapters currently target Rsbuild, Rslib, and Rspack, while Astro provides a documented Vitest integration and uses Vite. Rstest can run standalone, but doing so here would introduce a second compilation and configuration boundary without a demonstrated speed or maintenance advantage. Its official documentation also describes the project as pre-1.0 with APIs that may change frequently, and Browser Mode remains experimental. For this project, Browser Mode would serve component or browser-focused tests without removing the selected need for production E2E coverage of the complete application.

### Jest

Jest is mature, capable, widely understood, and valid for TypeScript and React testing. It remains a reasonable choice in an existing Jest ecosystem. For this new Astro/Vite project it would create a less natural transformation and configuration boundary than Vitest, without a project-specific capability that compensates for that cost.

### Playwright

Playwright directly exercises the Astro production build and supports TypeScript, Chromium, Firefox, and WebKit; desktop and mobile device emulation; media emulation including `prefers-reduced-motion`; projects for different environments; traces, screenshots, videos, and HTML reports; and GitHub Actions. One browser platform can cover functional journeys, axe scans, and selective visual assertions against local builds, preview deployments, and production smoke targets.

That realism costs more than static or DOM-based checks: browser binaries must be installed, suites consume more time and CI resources, test data and environments require maintenance, asynchronous browser behaviour can produce flakiness, and emulation is not equivalent to validation on every real device. The tiered matrix and small critical suite are therefore essential constraints.

### Cypress

Cypress is a strong alternative with an excellent interactive runner, time-travel debugging, mature E2E support, and a particularly polished component-testing experience. It is not selected because the expected component layer is adequately covered by Vitest and React Testing Library, while Playwright provides the more proportionate single browser layer for the required engine matrix, device and media emulation, accessibility integration, and CI diagnostics.

### WebdriverIO

WebdriverIO is a flexible browser-automation platform with broad WebDriver and WebDriver BiDi capabilities, service integrations, multiple test frameworks, and real-browser component testing through its browser runner. That flexibility is valuable for heterogeneous or remote-grid requirements. This portfolio has no such requirement, and its additional runner and service choices create more configuration and maintenance than Playwright's integrated test runner provides for the selected scope.

### Browser-based component testing

Playwright Component Testing and Cypress Component Testing are not selected for the MVP. They would add another browser-component harness when DOM-oriented Vitest and React Testing Library tests are sufficient for the expected islands and Playwright already owns browser-level integration. This is a scope decision, not a judgement that either capability is poor.

## Decision

Adopt a pragmatic, risk-based testing strategy rather than a rigid testing pyramid. Select:

- Vitest for unit and integration tests;
- React Testing Library, `@testing-library/user-event`, and DOM-oriented assertions for justified React-island tests;
- Playwright for browser and end-to-end tests; and
- `@axe-core/playwright` for primary automated accessibility checks.

Rstest is evaluated as a first-class alternative to Vitest and Jest and retained as the strongest revisit candidate for the unit and integration runner. Playwright remains a separate E2E decision.

Tests optimise for useful confidence, not test count, uniform treatment of every layer, or a global coverage percentage.

## Testing distribution

Quality work proceeds in this order, adjusted to the risk of each change:

1. Static analysis and production-build validation.
2. Focused unit and integration tests for meaningful logic.
3. Component tests for interactive React islands where they provide cheaper, clearer feedback.
4. A small set of high-value browser journeys.
5. Automated accessibility checks on representative pages and states.
6. Documented manual validation for outcomes automation cannot establish.

A layer may be expanded after defects or measured risk justify it. The project must not maximise the number of tests at the expense of stable, user-visible outcomes.

## Static and content validation

Static validation is the broadest and cheapest quality layer. These checks are part of the broader verification strategy, even when they are static quality gates rather than behavioural tests. When the application exists, fast validation should include:

- TypeScript and Astro type checking;
- Content Collection and Zod schema validation;
- ESLint;
- a production Astro build;
- generated-route and internal-link checking;
- appropriate HTML validation; and
- existence checks for required public assets and downloadable resources.

Structured metadata that violates the content contract must fail the build. Do not duplicate every schema rule with unit tests; add focused tests only for custom cross-field refinements or transformations whose behaviour is not sufficiently demonstrated by build validation.

External links are a separate, failure-prone network concern. Check them on a scheduled or non-blocking basis unless implementation evidence shows that a blocking check is reliable. Formatting may be a quality gate, but it is not a behavioural test.

## Unit and integration testing

Use Vitest for behaviour-heavy TypeScript modules such as content queries, sorting and filtering, mapping functions, date or period formatting, route and metadata helpers, custom cross-field schema logic, provider-independent boundaries, animation lifecycle helpers, and other pure domain or application logic.

Test public behaviour, edge cases, and failure handling. Do not test simple constants, direct property access, framework behaviour, or trivial implementation details. Prefer real pure collaborators; mock only boundaries whose cost, nondeterminism, or failure modes require control.

## React and Astro component-testing policy

Use React Testing Library and `@testing-library/user-event` with Vitest when an interactive island owns meaningful behaviour. Query through roles, accessible names, labels, and visible content; interact as a user would; and assert semantic and accessible state. Cover keyboard behaviour and relevant loading, empty, error, selected, expanded, or submitted states when the feature owns them.

Do not inspect React state, hooks, component instances, private functions, child-component structure, or CSS class names. Test a coherent interactive feature instead of every component in its internal tree, and do not add a test merely because a component exists.

Do not unit-test every static `.astro` component. Validate ordinary Astro presentation through type and build checks, rendered-page browser tests, accessibility checks, semantic review, and preview-based responsive and visual review. Prefer extracting pure rendering decisions into typed functions before adopting the experimental Container API solely to unit-test an Astro component. Astro's Container API may be used selectively for non-trivial server-side rendering logic, conditional output, or slot composition when it is cheaper and clearer than a page test. Because the API is experimental and may change in minor or patch releases, it must not become a mandatory project-wide convention. Avoid snapshots of complete Astro-generated HTML.

Revisit browser-based component testing only when DOM emulation is a demonstrated limitation for multiple components.

## End-to-end and browser coverage

Playwright tests must run against a production Astro build for release confidence. They may also target pull-request previews and production for appropriate smoke checks; the development server alone is insufficient evidence.

Use a tiered matrix:

- **Normal pull requests:** run the fastest critical suite in Chromium; include at least one representative mobile configuration when responsive behaviour is affected; focus execution further when the change scope supports it. Scope-based selection must not skip the stable critical smoke suite, and any dependency mapping used for selection must be explicit and conservative.
- **`main`, release candidates, scheduled validation, or pre-launch:** run critical journeys in Chromium, Firefox, and WebKit; include representative mobile coverage; and verify the production build.

Adjust the exact matrix after measuring duration and flakiness. Reduce it only with evidence, not convenience.

For animation and View Transitions, verify initial and final semantic states, the designed reduced-motion alternative, focus preservation, keyboard access, fallback when View Transitions are unavailable, interruption and repeated interaction, cleanup of listeners, observers, or animations, and continued visibility of essential content. Use Playwright media emulation for `prefers-reduced-motion`. Do not assert exact frames, incidental durations, easing values, or timing unless timing is itself functional behaviour.

## Accessibility strategy

Use `@axe-core/playwright` as the primary automated accessibility integration. Scan representative core routes, project details, the custom not-found page, responsive navigation, significant interactive states after activation, forms if introduced, and other high-risk journeys or components.

A scan with no reported violations means only that no automatically detectable violation was found. It is never proof of WCAG 2.2 AA conformance. Mandatory manual validation covers:

- keyboard-only navigation, focus order, visible focus, and focus restoration;
- screen-reader behaviour, semantic structure, and accessible names and descriptions;
- contrast, browser zoom, text resizing, reflow, and orientation;
- reduced motion, meaningful behaviour without animation, and animation comfort;
- touch interaction where relevant; and
- accessible errors and status messages when forms exist.

Do not require `jest-axe` as a baseline. It may be introduced for an isolated React island when it provides materially earlier feedback without duplicating the browser suite. Lighthouse is a performance and general audit tool, not the primary accessibility-conformance tool. Do not introduce Pa11y initially because it would duplicate the selected axe and Playwright layer without a demonstrated need.

## Visual-testing policy

Do not adopt broad visual regression for the MVP. Do not initially introduce Storybook, Chromatic, Percy, or large full-page screenshot-baseline suites. Use preview deployments and documented manual responsive review.

Selective Playwright screenshot assertions are permitted for a stable high-risk visual component, a layout regression that has already occurred, or a critical rendering boundary that cannot be asserted reliably through DOM semantics. Control fonts, data, viewport, animations, and execution environment. Screenshot assertions supplement rather than replace semantic and functional assertions.

Revisit a managed visual-regression platform when the component system, contributor count, supported themes, or volume of visual change grows materially.

## Critical journeys

The initial browser catalogue will cover, without freezing exact test cases:

- Home loads successfully and every primary destination is reachable;
- Projects opens and leads to a project detail or case study;
- Experience is reachable;
- CV, GitHub, LinkedIn, and professional contact paths are available;
- responsive navigation works;
- every interactive control is keyboard operable and focus remains usable;
- representative pages remain usable with reduced motion;
- every required generated route loads;
- an unknown route produces the custom 404 experience;
- internal links do not create broken paths or dead ends;
- required titles, descriptions, canonical metadata, and heading structure are present where appropriate;
- a production deployment smoke check succeeds; and
- generated preview and production output is checked for known secret patterns, unintended environment values, and explicitly prohibited content, while confidentiality remains subject to mandatory human review.

Assert stable outcomes rather than exact prose unless the copy is a legal, accessibility, navigation, or product-critical contract.

## Behaviour not tested

The project should not normally automate tests for:

- framework internals or third-party library behaviour;
- private functions, React internal state, or implementation-specific DOM nesting;
- CSS class names, generated hashes, trivial getters, or constants;
- every static component or every line of Markdown prose;
- schema behaviour already demonstrated by build validation;
- exact pixel output across the whole site;
- exact animation frames or decorative timing; or
- large snapshots that reviewers cannot meaningfully inspect.

Content accuracy, confidentiality, professional positioning, narrative quality, and factual evidence remain human content-review responsibilities.

## CI execution model

Future fast pull-request checks should include linting and type checking, content and schema validation, focused Vitest tests, a production build, critical Chromium Playwright journeys, and representative axe scans.

Broader `main`, scheduled, or pre-launch validation should include Chromium, Firefox, and WebKit; representative mobile projects; complete critical journeys; production-build smoke tests; route and internal-link validation; broader accessibility scans; separately approved production performance audits; and external-link checks when reliable.

Failed browser runs should retain useful HTML reports, traces, screenshots, or videos as CI artifacts. Retries may collect evidence or identify nondeterminism, but must not turn a persistent flaky test into a pass condition. Flakiness is a defect in the test or product and must be investigated.

## Manual validation boundary

Manual validation is mandatory when the outcome depends on human comprehension, visual quality, screen-reader usability, real keyboard and focus experience, responsive-design quality, content accuracy, confidentiality, animation comfort, perceived performance, or recruiter and engineering-manager understanding.

Automation supplies repeatable evidence and catches known classes of defects. It does not replace accountable human review of those outcomes.

## Coverage policy

Do not impose a global numerical code-coverage threshold for the MVP. Coverage may be collected diagnostically for behaviour-heavy TypeScript and React modules, but must not drive tests for trivial code or static presentation.

A future threshold requires a stable, meaningful code boundary and an explanation of the risks it controls. Consider branch and behaviour coverage separately instead of applying one arbitrary repository-wide number.

## Consequences

### Positive

- The broadest feedback comes from cheap static and build checks.
- Test effort follows product risk and user-visible behaviour.
- Vitest shares Astro and Vite configuration instead of introducing a second compiler boundary.
- One Playwright layer covers cross-browser journeys, accessibility scans, and selective visual assertions.
- React-island tests remain fast and centred on accessible user interaction.
- Manual accessibility, content, and visual responsibilities remain explicit.
- The strategy can expand from measured failures without starting with a platform-sized test estate.

### Negative

- Some defects will only be caught by broader scheduled checks or manual review.
- Cross-browser and mobile Playwright runs consume more CI time than Chromium-only checks.
- DOM emulation cannot reproduce every browser behaviour in React component tests.
- Manual validation requires discipline and recorded evidence.
- A small critical suite requires deliberate prioritisation as routes and features grow.
- Choosing Vitest leaves Rstest, the strongest revisit candidate for the unit and integration runner, outside the initial toolchain despite the maintainer's professional experience with it.

## Risks and mitigations

| Risk | Mitigation |
| --- | --- |
| Static checks create false confidence about interaction | Preserve critical Playwright journeys and manual keyboard review |
| Browser suites become slow or flaky | Keep journeys high-value, measure the matrix, isolate causes, and retain traces |
| Chromium-only pull requests miss engine differences | Run Firefox and WebKit on `main`, scheduled, release, or pre-launch validation |
| Axe passes are mistaken for conformance | State the limitation in reports and require manual and assistive-technology review |
| Component tests couple to implementation | Enforce semantic queries, user-event interaction, and public-state assertions |
| Schema tests duplicate the build | Test only custom transformations and cross-field behaviour not already demonstrated |
| Screenshot baselines generate noise | Permit narrow, controlled assertions only for demonstrated visual risk |
| Coverage becomes a vanity target | Keep it diagnostic and require a risk-based case for any future threshold |
| External-link outages block valid changes | Separate remote checks and schedule or soften them until reliable |
| Rstest would provide a material advantage but is overlooked | Reassess official Astro support, stability, and measured spikes at the stated triggers |
| Confidential material reaches preview or production | Retain mandatory human review and add production-output checks without claiming automation proves safety |

## Validation requirements

When this strategy is implemented, validate that:

- static, content, route, asset, internal-link, and production-build checks detect representative failures;
- Vitest shares the Astro/Vite configuration and exercises meaningful pure logic;
- React tests demonstrate semantic queries, keyboard interaction, and owned states;
- Playwright runs against production output in Chromium and in the broader engine matrix;
- at least one representative mobile and reduced-motion journey is exercised;
- axe scans run against representative pages and activated states without being reported as conformance;
- the critical route and journey catalogue matches the implemented information architecture;
- browser failures retain actionable artifacts;
- the manual review checklist has accountable evidence; and
- no global coverage threshold or broad screenshot baseline appears without a new approved rationale.

Implementation should include a deliberately failing representative check while establishing each layer, then remove or correct the fixture, to prove that the gate can actually detect its target failure.

## Revisit conditions

Review the unit and integration runner decision when any Rstest-specific condition below occurs, and review the relevant parts of the broader strategy for the remaining conditions:

- an official Astro integration or adapter for Rstest appears;
- the project adopts Rspack, Rsbuild, or another Rstack tool;
- Rstest reaches a sufficiently stable API for the project's maintenance expectations;
- a measured Rstest spike demonstrates a meaningful speed, debugging, or maintenance advantage without duplicating Astro/Vite configuration;
- DOM emulation limits several React-island tests;
- recurring visual regressions justify managed visual testing;
- CI duration or flakiness makes the browser matrix unsustainable;
- contributors, routes, interactive features, themes, or content volume grow materially;
- production defects reveal an untested risk boundary; or
- a stable domain module justifies a targeted coverage policy.

A revisit must compare measured project outcomes and migration cost. Familiarity with a tool is relevant evidence, but is not by itself sufficient to override architectural fit.

## References

### Astro, Vitest, and Rstest

- [Astro testing guidance and Vitest integration](https://docs.astro.build/en/guides/testing/)
- [Astro `getViteConfig()` reference](https://docs.astro.build/en/reference/modules/astro-config/#getviteconfig)
- [Astro Container API](https://docs.astro.build/en/reference/container-reference/)
- [Vitest features](https://vitest.dev/guide/features.html)
- [Vitest mocking](https://vitest.dev/guide/mocking.html)
- [Vitest coverage](https://vitest.dev/guide/coverage.html)
- [Rstest introduction and core packages](https://rstest.rs/guide/start/)
- [Rstest configuration](https://rstest.rs/guide/basic/configure-rstest)
- [Rstest official adapters](https://rstest.rs/guide/integration/adapters)
- [Rstest Browser Mode](https://rstest.rs/guide/browser-testing/getting-started)
- [Rstest React Browser Mode](https://rstest.rs/guide/browser-testing/framework-guides)
- [Rstest upgrade and pre-1.0 status](https://rstest.rs/guide/basic/upgrade-rstest)

### React component testing

- [React Testing Library introduction](https://testing-library.com/docs/react-testing-library/intro/)
- [Testing Library query priorities](https://testing-library.com/docs/queries/about/)
- [`user-event` introduction](https://testing-library.com/docs/user-event/intro/)
- [`jest-dom` custom matchers](https://github.com/testing-library/jest-dom)

### Browser and end-to-end testing

- [Playwright browsers and installation](https://playwright.dev/docs/intro)
- [Playwright projects and devices](https://playwright.dev/docs/test-projects)
- [Playwright emulation](https://playwright.dev/docs/emulation)
- [Playwright trace viewer](https://playwright.dev/docs/trace-viewer)
- [Playwright screenshots and visual comparisons](https://playwright.dev/docs/test-snapshots)
- [Playwright videos](https://playwright.dev/docs/videos)
- [Playwright reporters](https://playwright.dev/docs/test-reporters)
- [Playwright continuous integration](https://playwright.dev/docs/ci)
- [Cypress end-to-end testing](https://docs.cypress.io/app/end-to-end-testing/writing-your-first-end-to-end-test)
- [Cypress component testing](https://docs.cypress.io/app/component-testing/get-started)
- [WebdriverIO automation protocols](https://webdriver.io/docs/automationProtocols/)
- [WebdriverIO component testing](https://webdriver.io/docs/component-testing/)

### Accessibility and audits

- [Playwright accessibility testing with `@axe-core/playwright`](https://playwright.dev/docs/accessibility-testing)
- [axe-core](https://github.com/dequelabs/axe-core)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [W3C understanding WCAG conformance](https://www.w3.org/WAI/WCAG22/Understanding/conformance.html)
- [W3C understanding accessibility conformance test rules](https://www.w3.org/WAI/WCAG22/Understanding/understanding-act-rules)
- [Lighthouse CI documentation](https://github.com/GoogleChrome/lighthouse-ci/blob/main/docs/getting-started.md)
