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
---

## Context

The portfolio needs to communicate professional positioning, experience, selected project evidence, and contact paths without relying on a CMS or runtime content service.

## Constraints

The repository is public, so content and assets must be safe to disclose before they are committed. The MVP also needs to stay static-first, use Git-tracked content, avoid unnecessary dependencies, and keep Home previews derived from canonical project and experience entries.

## Decisions and trade-offs

The implementation uses Astro Content Collections for projects and experience so previews and detail pages derive from one canonical Markdown entry per content item. This keeps content reviewable in Git and avoids introducing a CMS before there is a measured editorial need.

Astro pages own route composition and semantic HTML. Shared query modules keep collection access, sorting, and mapping out of page templates, while CSS remains local to route files unless reuse justifies extraction.

## Technical evidence

The current MVP includes static routes for Home, Projects, project detail, and Experience. The content boundary validates project and experience frontmatter at build time, and browser tests cover navigation, generated routes, responsive layout risks, and automated accessibility scans.

```ts
const portfolioContentBoundary =
  'Astro Content Collections validate canonical project and experience entries before production output is generated.';
const longPublicRouteEvidenceIdentifier =
  'portfolio_project_detail_markdown_code_block_overflow_validation_for_static_public_evidence_without_runtime_content_dependencies';
```

| Evidence type        | Public-safe purpose                          | Validation route                       |
| -------------------- | -------------------------------------------- | -------------------------------------- |
| Product documents    | Explain audience, scope, and content rules   | Repository documentation and page copy |
| Architecture records | Capture accepted technical boundaries        | ADRs and implementation review         |
| Automated tests      | Protect route, link, and accessibility risks | Vitest and Playwright quality gates    |

## Outcome

This project demonstrates the same engineering practices it describes: typed content, public-safe writing, static delivery, accessible navigation, and proportionate validation. It remains intentionally scoped to the MVP instead of adding analytics, a CMS, forms, or deployment changes without separate approval.
