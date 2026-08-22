# PT-44 Portfolio MVP validation record

## Purpose

This record tracks implementation-level validation for
[PT-44 -- Validate and harden Portfolio MVP](https://github.com/LuisArostegui/portfolio/issues/69).
It turns the issue acceptance criteria into accountable evidence before release.

Automated checks, browser checks, accessibility scans, and manual review all
contribute evidence. Automated accessibility results must not be reported as
WCAG conformance.

## Scope sources

- `AGENTS.md`
- `docs/architecture/decisions/0006-use-a-pragmatic-risk-based-testing-strategy.md`
- `docs/design/design-validation-handoff.md`
- `docs/product/product-success-criteria.md`
- `docs/testing.md`
- `docs/continuous-integration.md`
- `docs/delivery.md`

## Command queue

The maintainer runs commands and records the result in the evidence log below.

### Baseline quality gate

```sh
pnpm install --frozen-lockfile
pnpm check
pnpm lint
pnpm format:check
pnpm test
pnpm build
pnpm test:site
pnpm exec playwright install chromium
pnpm exec playwright test
```

### Production-build local preview

Use this after `pnpm build` succeeds.

```sh
pnpm preview
```

Open the local preview URL and validate the manual checklist against the built
site, not the development server.

### Portable static-output check

Use this after `pnpm build` succeeds.

```sh
python -m http.server 4173 --directory dist
```

Open `/`, `/projects`, one generated project detail route, `/experience`, and
an unknown path. Record whether static routing and the custom not-found output
behave as expected.

### Cloudflare configuration dry run

Use this only when the baseline build succeeds.

```sh
pnpm exec wrangler deploy --dry-run
```

Confirm that the dry run does not require secrets and that the generated asset
configuration still matches `docs/delivery.md`.

## Evidence log

| Check                      | Command or method                             | Status  | Evidence                                                                     | Blocker |
| -------------------------- | --------------------------------------------- | ------- | ---------------------------------------------------------------------------- | ------- |
| Dependency install         | `pnpm install --frozen-lockfile`              | Not run | Maintainer will provide output                                               | Unknown |
| Astro and TypeScript check | `pnpm check`                                  | Not run | Maintainer will provide output                                               | Unknown |
| Lint                       | `pnpm lint`                                   | Not run | Maintainer will provide output                                               | Unknown |
| Formatting                 | `pnpm format:check`                           | Not run | Maintainer will provide output                                               | Unknown |
| Unit and integration tests | `pnpm test`                                   | Not run | Maintainer will provide output                                               | Unknown |
| Production build           | `pnpm build`                                  | Not run | Maintainer will provide output                                               | Unknown |
| Generated-site validation  | `pnpm test:site`                              | Not run | Maintainer will provide output                                               | Unknown |
| Browser E2E                | `pnpm exec playwright test`                   | Not run | Maintainer will provide output                                               | Unknown |
| Portable static output     | `python -m http.server 4173 --directory dist` | Pass    | Maintainer served `dist` locally on port 4173 and reported that routes work. | No      |
| Cloudflare dry run         | `pnpm exec wrangler deploy --dry-run`         | Not run | Maintainer will provide output                                               | Unknown |

## Manual route and journey matrix

| Area                           | Validation method                                                                                           | Status  | Notes                                         | Blocker |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------- | ------- | --------------------------------------------- | ------- |
| Home route `/`                 | Load built output; inspect title, heading, navigation, About and Contact destinations                       | Pass    | Maintainer reported local static route works. | No      |
| Projects route `/projects`     | Load built output; open a project detail; return or continue from the detail page                           | Pass    | Maintainer reported local static route works. | No      |
| Project detail route           | Load at least one generated detail page; review evidence, links, continuation paths, and public-safe claims | Pass    | Maintainer reported local static route works. | No      |
| Experience route `/experience` | Load built output; review role hierarchy, periods, responsibilities, contributions, and navigation state    | Pass    | Maintainer reported local static route works. | No      |
| Unknown route                  | Open an unrecognised path; verify understandable custom not-found output                                    | Pass    | Maintainer reported local static route works. | No      |
| Recruiter journey              | Home -> Projects -> CV/profile/contact                                                                      | Not run |                                               | Unknown |
| Engineering-manager journey    | Home -> project detail -> engineering evidence -> Experience/contact                                        | Not run |                                               | Unknown |
| Software-engineer journey      | Projects -> detail -> architecture/testing/accessibility evidence -> repository/profile                     | Not run |                                               | Unknown |
| Direct-project journey         | Enter project detail URL directly; verify context and continuation paths                                    | Not run |                                               | Unknown |
| Mobile journey                 | Repeat core navigation and contact/profile/CV paths at representative mobile viewport                       | Not run |                                               | Unknown |
| CV/profile journey             | Locate and activate CV, GitHub, and LinkedIn from primary expected surfaces                                 | Not run |                                               | Unknown |
| Contact journey                | Locate and activate at least one professional contact method using pointer and keyboard                     | Not run |                                               | Unknown |

## Manual accessibility matrix

| Area                     | Validation method                                                                                      | Status  | Notes                                                                                              | Blocker |
| ------------------------ | ------------------------------------------------------------------------------------------------------ | ------- | -------------------------------------------------------------------------------------------------- | ------- |
| Landmarks                | Inspect rendered page landmarks for header, navigation, main, and footer responsibilities              | Not run |                                                                                                    | Unknown |
| Headings                 | Review heading outline on each MVP route                                                               | Not run |                                                                                                    | Unknown |
| Link purpose             | Review link labels in context, including repeated links and external/download destinations             | Not run |                                                                                                    | Unknown |
| Buttons versus links     | Confirm navigation uses links and disclosure/local state uses buttons                                  | Not run |                                                                                                    | Unknown |
| Keyboard operation       | Tab through all interactive controls; activate links/buttons with keyboard                             | Not run |                                                                                                    | Unknown |
| Focus visibility         | Confirm visible focus on every interactive surface at desktop and mobile widths                        | Not run |                                                                                                    | Unknown |
| Focus order              | Confirm logical order and no keyboard traps, especially compact navigation                             | Not run |                                                                                                    | Unknown |
| Compact navigation state | Confirm accessible name, `aria-expanded`, control relationship, and inline expanded region             | Pass    | Maintainer reported the mobile menu change looks correct after the icon-only accessible-label fix. | No      |
| Screen-reader smoke      | Review representative desktop and mobile output with a screen reader                                   | Not run |                                                                                                    | Unknown |
| Image alternatives       | Confirm portrait/media and SVG icons have contextual accessible treatment                              | Not run |                                                                                                    | Unknown |
| Contrast                 | Check implemented text, focus, link, and meaningful UI combinations                                    | Not run |                                                                                                    | Unknown |
| Zoom and reflow          | Test browser zoom and text enlargement; confirm no two-dimensional page scrolling for ordinary content | Not run |                                                                                                    | Unknown |
| Reduced motion           | Test `prefers-reduced-motion: reduce`; confirm content access does not depend on motion                | Not run |                                                                                                    | Unknown |
| No JavaScript baseline   | Disable JavaScript where practical; confirm essential static content and navigation remain usable      | Not run |                                                                                                    | Unknown |

## Responsive matrix

Use built output. Representative sizes come from the design handoff and product
criteria; they are review widths, not mandatory CSS breakpoints.

| Viewport                                 | Status       | Notes                                                                                                                           | Blocker |
| ---------------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------- | ------- |
| 320px narrow mobile                      | Not run      |                                                                                                                                 | Unknown |
| 390px mobile                             | Not run      |                                                                                                                                 | Unknown |
| 768px tablet                             | Not run      |                                                                                                                                 | Unknown |
| 1440px desktop                           | Partial pass | Maintainer reported selected-experience spacing looks correct after the base grid gap fix. Full viewport sweep remains pending. | No      |
| 1728px large desktop                     | Not run      |                                                                                                                                 | Unknown |
| Mobile landscape                         | Not run      |                                                                                                                                 | Unknown |
| Long content, long labels, and long URLs | Not run      |                                                                                                                                 | Unknown |

## Content and confidentiality review

| Area                     | Validation method                                                                                                       | Status                | Notes                                                                                                                                                                 | Blocker |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| Professional positioning | Review Home, About, Projects, Experience, CV/profile access for frontend/React/TypeScript emphasis                      | Not run               |                                                                                                                                                                       | Unknown |
| Project claims           | Confirm public-safe, factual, evidence-supported project content                                                        | Not run               |                                                                                                                                                                       | Unknown |
| Experience claims        | Confirm role periods, responsibilities, contributions, and attribution                                                  | Not run               |                                                                                                                                                                       | Unknown |
| Placeholders             | Confirm no placeholder routes, empty sections, or provisional evidence are presented as final                           | Not run               |                                                                                                                                                                       | Unknown |
| Confidentiality          | Review generated output and content for secrets, private configuration, private client details, and unsupported metrics | Not run               |                                                                                                                                                                       | Unknown |
| Accessibility statement  | Confirm release-ready statement exists if required for MVP release                                                      | Fixed in working tree | Added `/accessibility/` with conformance intent, known limitations, feedback method, and latest review scope. Footer link added. Awaiting build and E2E verification. | Unknown |

## Metadata, routing, and assets

| Area                         | Validation method                                                                        | Status                | Notes                                                                                                                                                                                                                  | Blocker |
| ---------------------------- | ---------------------------------------------------------------------------------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| Titles and descriptions      | Inspect each MVP route                                                                   | Not run               |                                                                                                                                                                                                                        | Unknown |
| Canonical strategy           | Inspect metadata output and current product/deployment decision                          | Not run               |                                                                                                                                                                                                                        | Unknown |
| Robots and sitemap behaviour | Inspect generated output and deployment headers where applicable                         | Not run               |                                                                                                                                                                                                                        | Unknown |
| Internal links and fragments | `pnpm test:site` plus manual route review                                                | Not run               |                                                                                                                                                                                                                        | Unknown |
| External links               | Manual spot check; do not make flaky remote checks release-blocking without evidence     | Not run               |                                                                                                                                                                                                                        | Unknown |
| CV file                      | Confirm existence, expected format, filename, link purpose, and activation behaviour     | Not run               |                                                                                                                                                                                                                        | Unknown |
| Public assets                | Confirm images, icons, fonts, and generated assets resolve from built output             | Not run               |                                                                                                                                                                                                                        | Unknown |
| 404 output                   | Confirm generated not-found output is understandable and does not leak technical details | Fixed in working tree | Added `src/pages/404.astro` with safe continuation links. Playwright validates `/404.html`; Cloudflare `404-page` status behaviour remains covered by deployment configuration and dry run. Awaiting E2E verification. | Unknown |

## Performance and JavaScript review

| Area                   | Validation method                                                                              | Status  | Notes | Blocker |
| ---------------------- | ---------------------------------------------------------------------------------------------- | ------- | ----- | ------- |
| Production performance | Run a repeatable production-build audit for Home, Projects, one project detail, and Experience | Not run |       | Unknown |
| Core Web Vitals        | Record LCP, INP, CLS thresholds used and measured lab results                                  | Not run |       | Unknown |
| Layout shift           | Inspect image dimensions, font loading, and obvious CLS sources                                | Not run |       | Unknown |
| Client JavaScript      | Review built output and hydrated islands; confirm each script is justified and bounded         | Not run |       | Unknown |
| Console and network    | Inspect representative routes for user-impacting console or network errors                     | Not run |       | Unknown |

## Blocker classification

A finding is a release blocker when it matches any release-blocking criterion
from `docs/product/product-success-criteria.md`, including:

- professional role or specialisation is unclear or materially misrepresented;
- required navigation destinations are inaccessible;
- required content is empty or placeholder material;
- confidential information is exposed;
- a required production route or production build fails;
- the local environment cannot be reproduced from repository documentation;
- core keyboard navigation is unusable;
- a critical accessibility barrier prevents access to core content or actions;
- required links, contact, or CV access are unavailable;
- core content is materially inaccurate;
- severe layout breakage occurs on representative mobile or desktop viewports;
- an avoidable performance issue materially prevents practical use; or
- secrets or private configuration are committed.

Non-blocking findings must be recorded as follow-up work rather than hidden or
folded into PT-44 without a release-blocking defect.

## Findings

| ID       | Area                            | Finding                                                                                                                                         | Evidence                                                                                                                                                                                                                                                                                                               | Severity                                                                                                      | Proposed resolution                                                                                                                                          | Status                                                             |
| -------- | ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------ |
| PT44-F01 | Home responsive layout          | Selected experience preview cards touched each other before the wide desktop grid breakpoint.                                                   | Maintainer screenshot at an intermediate desktop width showed the current and previous role card borders visually adjacent. Maintainer later reported the spacing changed correctly after the fix.                                                                                                                     | Visual hardening defect; not currently blocking after manual verification.                                    | Apply grid layout and `var(--space-4)` gap to `.experience-list` at the base style, not only at `min-width: 70rem`.                                          | Fixed and manually verified; awaiting Playwright regression check. |
| PT44-F02 | Mobile navigation accessibility | The compact navigation button exposed "Open navigation menu" as visible text instead of only as its accessible name.                            | Maintainer mobile review. Maintainer later reported the menu changed correctly after the icon-only accessible-label fix.                                                                                                                                                                                               | Accessibility/visual hardening defect; not currently blocking after manual verification.                      | Move the label to `aria-label`, update it with `aria-expanded`, and keep the visible control icon-only.                                                      | Fixed and manually verified; awaiting Playwright regression check. |
| PT44-F03 | Motion review                   | Existing motion was not noticeable during manual review.                                                                                        | Maintainer visual review. Existing implementation uses restrained color/border transitions and optional compact-menu entry animation.                                                                                                                                                                                  | Non-blocking unless a required interaction state lacks useful feedback or reduced-motion behaviour regresses. | Keep restrained native motion; validate hover/focus feedback and reduced-motion final states before deciding on any new animation.                           | Open validation item; no product change made.                      |
| PT44-F04 | Accessibility statement         | Product success criteria require a release-ready accessibility statement, but no public statement route or footer destination existed.          | Repository search found product criteria for an accessibility statement and no matching public page.                                                                                                                                                                                                                   | Release blocker until statement exists and is reachable.                                                      | Add a static `/accessibility/` route with conformance intent, known limitations, feedback method, and latest review scope; expose it from footer navigation. | Fixed in working tree; awaiting build and E2E verification.        |
| PT44-F05 | Custom not-found output         | Delivery documentation configures Cloudflare static assets with `404-page`, but no `src/pages/404.astro` existed.                               | Repository page inventory had Home, Projects, project detail, and Experience only; `wrangler.jsonc` expects static 404-page handling. Local Vite preview serves Home with status 200 for unknown routes, so Playwright validates the generated `/404.html` artifact rather than Cloudflare's deployed status handling. | Release blocker until generated output includes a safe custom 404 page.                                       | Add a static `404.astro` route with an understandable message and continuation links, avoiding technical details.                                            | Fixed in working tree; awaiting build and E2E verification.        |
| PT44-F06 | Home visual separators          | The final Engineering strengths item showed its own separator immediately above the section separator, creating two horizontal lines.           | Maintainer screenshot of the Product reasoning strength item showed duplicate closing separators.                                                                                                                                                                                                                      | Visual hardening defect.                                                                                      | Remove the last strength item's bottom border and bottom padding while keeping the section-level separator.                                                  | Fixed in working tree; awaiting Playwright/manual verification.    |
| PT44-F07 | Experience responsive layout    | The Experience continuation section switched to two columns at an intermediate width and compressed the heading into a few characters per line. | Maintainer screenshot at roughly 1024px wide showed "Continue exploring" broken into narrow fragments.                                                                                                                                                                                                                 | Responsive hardening defect; release blocker if it remains on representative viewport review.                 | Keep the continuation section as one column until the wide desktop breakpoint, then switch to the two-column layout.                                         | Fixed in working tree; awaiting Playwright/manual verification.    |

## Non-blocking follow-up candidates

| ID  | Area | Follow-up | Evidence | Suggested issue title |
| --- | ---- | --------- | -------- | --------------------- |
