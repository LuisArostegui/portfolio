# Testing conventions and responsibilities

The portfolio follows the risk-based strategy accepted in [ADR 0006](architecture/decisions/0006-use-a-pragmatic-risk-based-testing-strategy.md). Tests protect project-owned behaviour and user-visible outcomes; test count and repository-wide coverage percentages are not objectives.

## Vitest foundation

Vitest loads the Astro and Vite configuration through Astro's `getViteConfig()` helper. The shared `jsdom` environment supports future React-island tests, while `tests/setup.ts` installs the Testing Library DOM matchers and performs React Testing Library cleanup after each test.

Run the complete suite once with `pnpm test`, or use `pnpm test:watch` while developing. Both TypeScript unit tests and React component tests use the same runner and configuration.

Name tests `*.test.ts` for TypeScript logic and `*.test.tsx` for React behaviour. Place each test beside the production module or island it protects so ownership remains clear. Keep shared test-only setup in `tests/`; do not add methods or abstractions to production solely for test cleanup or convenience.

## Unit and integration responsibilities

Use Vitest for deterministic project-owned logic such as content mapping, ordering, filtering, derived states, formatting, route or metadata helpers, and non-trivial cross-field rules. Assert public results, boundary cases, and error outcomes. Mock only an external or framework boundary when exercising it directly would make a focused test slow, nondeterministic, or impractical.

Do not duplicate ordinary Astro Content Collection or Zod validation already demonstrated by `pnpm check` and `pnpm build`. Do not test constants, direct property access, framework behaviour, static Astro markup, CSS classes, private functions, or large snapshots.

The representative content-query tests protect editorial ordering, featured-project selection and limit handling, and current-experience derivation through the public query functions. Their expectations use literal, hand-checked results rather than repeating the implementation's comparison logic.

## React-island responsibilities

Use React Testing Library and `@testing-library/user-event` only when a real React island owns bounded client-side behaviour. Query elements by role, accessible name, label, and visible content; interact through `user-event`; and assert semantic or accessible state with `@testing-library/jest-dom` matchers. Cover keyboard interaction and owned expanded, selected, loading, empty, error, or submitted states when those states exist.

Do not inspect React state, hooks, component instances, internal child structure, or class names. A DOM test is not a real-browser test, and accessible matchers do not establish WCAG conformance.

React is configured in the application, but there is currently no interactive React island in `src/`. The foundation therefore includes no artificial component or behaviour example. Add the first `*.test.tsx` example alongside the first justified island, as required by the issue's “when available” boundary.

## Browser and manual boundaries

Keep complete routes, generated pages, navigation between routes, browser-only APIs, JavaScript failure behaviour, responsive layout, production-output integration, and critical journeys for a separately approved Playwright/E2E foundation. Do not simulate those outcomes in Vitest merely to increase coverage.

Manual validation remains responsible for visual quality, content accuracy and confidentiality, real keyboard and screen-reader usability, focus visibility and order, zoom and reflow, touch behaviour, animation comfort, and WCAG 2.2 AA assessment. Automated tests provide repeatable evidence for defined behaviours; they do not replace accountable human review.
