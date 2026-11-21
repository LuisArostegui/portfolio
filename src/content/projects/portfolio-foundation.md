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

The repository is public, so content and assets must be safe to disclose before they are committed. The MVP also needs to stay static-first, use Git-tracked content, avoid unnecessary dependencies, and keep Home previews derived from canonical project and experience entries.

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

## Evidence

The current MVP includes static routes for Home, project detail, and Accessibility. The content boundary validates project and experience frontmatter at build time, and browser tests cover navigation, generated routes, responsive layout risks, and automated accessibility scans.

| Evidence type        | Public-safe purpose                          | Validation route                                                                                                                                                          |
| -------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Product documents    | Explain audience, scope, and content rules   | Repository documentation and page copy                                                                                                                                    |
| Architecture records | Capture accepted technical boundaries        | [ADRs](https://github.com/LuisArostegui/portfolio/tree/main/docs/architecture/decisions) and [implementation review](https://github.com/LuisArostegui/portfolio/pull/110) |
| Automated tests      | Protect route, link, and accessibility risks | [Vitest and Playwright quality gates](https://github.com/LuisArostegui/portfolio/blob/main/.github/workflows/quality.yml)                                                 |

## Outcome

This project demonstrates the same engineering practices it describes: typed content, public-safe writing, static delivery, accessible navigation, and proportionate validation. It remains intentionally scoped to the MVP instead of adding analytics, a CMS, forms, or deployment changes without separate approval.
