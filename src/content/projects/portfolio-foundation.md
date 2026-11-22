---
title: Portfolio foundation
summary: A public Astro portfolio built to present professional experience, project evidence, and engineering practice through typed content and static-first routes.
role: Repository maintainer
status: active
featured: true
order: 0
capabilities:
  - Content modelling
  - Type-safe application boundaries
  - Static-first delivery
  - Accessibility validation
technologies:
  - Astro
  - TypeScript
publicLinks:
  - https://github.com/LuisArostegui/portfolio
  - https://github.com/LuisArostegui/portfolio/issues/67
  - https://github.com/LuisArostegui/portfolio/blob/main/docs/product/content-strategy.md
visibility: public
checks:
  url: https://github.com/LuisArostegui/portfolio/actions/workflows/quality.yml?query=branch%3Amain
  labels:
    - type check
    - lint
    - unit tests
    - browser + axe
pipeline:
  - label: Markdown entry
    detail: src/content/projects/*.md
  - label: Zod schema
    detail: invalid data fails the build
  - label: Astro pages
    detail: static HTML, no client router
  - label: Cloudflare Workers
    detail: static assets
---

## Problem

The portfolio has to communicate professional positioning, experience, selected project evidence, and contact paths without relying on a CMS or runtime content service.

The repository is public, so content and assets must be safe to disclose before they are committed. The site also needs to stay static-first, use Git-tracked content, avoid unnecessary dependencies, and keep Home previews derived from canonical project and experience entries.

## Decisions

<section class="decision">

[ADR-0004](https://github.com/LuisArostegui/portfolio/blob/main/docs/architecture/decisions/0004-use-git-versioned-astro-content-collections.md)

### One Markdown entry per project, validated at build time

The implementation uses Astro Content Collections for projects and experience, so previews and detail pages derive from one canonical Markdown entry per content item. Content stays reviewable in Git.

Trade-off: there is no editing interface until a measured editorial need justifies introducing a CMS.

</section>

<section class="decision">

[ADR-0001](https://github.com/LuisArostegui/portfolio/blob/main/docs/architecture/decisions/0001-use-astro-as-the-primary-frontend-framework.md)

### Static pages first, client code only where it earns its place

Astro pages own route composition and semantic HTML. Shared query modules keep collection access, sorting, and mapping out of page templates.

Trade-off: every interactive feature has to justify what it costs the client.

</section>

<section class="decision">

[ADR-0006](https://github.com/LuisArostegui/portfolio/blob/main/docs/architecture/decisions/0006-use-a-pragmatic-risk-based-testing-strategy.md)

### Tests chosen by risk

Browser tests cover navigation, generated routes, responsive layout risks, and automated accessibility scans, while the content boundary validates project and experience frontmatter at build time.

Trade-off: there is no blanket coverage target; each test has to protect a real journey or risk.

</section>

<section class="decision">

[ADR-0005](https://github.com/LuisArostegui/portfolio/blob/main/docs/architecture/decisions/0005-use-cloudflare-workers-static-assets-for-hosting.md)

### Static files on Cloudflare Workers, with no server to run

Workers Static Assets serves the generated `dist` directory with no Worker script and no adapter. `main` deploys production, other branches upload non-promoted preview versions, and routing and headers live in the repository as `_redirects` and `_headers`. For v1 the production `workers.dev` host is the canonical origin ([ADR-0008](https://github.com/LuisArostegui/portfolio/blob/main/docs/architecture/decisions/0008-use-the-production-workers-dev-host-as-the-v1-canonical-origin.md)), and previews stay out of search results.

Trade-off: header and redirect rules follow Cloudflare's format, although the output itself stays standard static files.

</section>

<section class="decision">

[ADR-0007](https://github.com/LuisArostegui/portfolio/blob/main/docs/architecture/decisions/0007-allow-purposeful-scroll-driven-motion.md)

### Motion in CSS only, and only when it explains something

Scroll-driven CSS animations show reading progress, mark the current section and light this case's pipeline stage by stage. There is no animation library and no JavaScript animation runtime. With reduced motion, or in a browser without scroll timelines, every piece of content is visible in its final state.

Trade-off: behaviour differs between engines until support is universal, and the scroll ranges need retuning when the layout changes.

</section>

## Evidence

The site is published on Cloudflare Workers with Home, this case study, the Accessibility statement and a 404 page, all generated as static HTML. The content boundary validates project and experience frontmatter at build time, and browser tests cover navigation, generated routes, responsive layout risks, automated accessibility scans and a performance budget.

| Evidence type        | Public-safe purpose                          | Validation route                                                                                                                                                                        |
| -------------------- | -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Product documents    | Explain audience, scope, and content rules   | [content-strategy.md](https://github.com/LuisArostegui/portfolio/blob/main/docs/product/content-strategy.md) and [Issue #67](https://github.com/LuisArostegui/portfolio/issues/67)      |
| Architecture records | Capture accepted technical boundaries        | [ADRs](https://github.com/LuisArostegui/portfolio/tree/main/docs/architecture/decisions) and [accessibility and navigation review](https://github.com/LuisArostegui/portfolio/pull/110) |
| Automated tests      | Protect route, link, and accessibility risks | [Vitest and Playwright quality gates](https://github.com/LuisArostegui/portfolio/blob/main/.github/workflows/quality.yml)                                                               |
| Performance budget   | Keep page weight and loading in check        | [Performance budget](https://github.com/LuisArostegui/portfolio/blob/main/docs/performance-budget.md)                                                                                   |

## Outcome

The portfolio is live and indexable on its production host. Home and this case each load seven same-origin requests (about 55 KB and 53 KB transferred) with no third-party requests, and a lab run against production measured 0 ms Total Blocking Time and no layout shift on Home and on this case.

It demonstrates the same engineering practices it describes: typed content, public-safe writing, static delivery, accessible navigation, and proportionate validation. It stays intentionally small, without analytics, a CMS or forms until a real need justifies them.
