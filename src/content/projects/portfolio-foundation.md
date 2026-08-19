---
title: Portfolio foundation
summary: A representative entry showing how this public repository records and validates project content.
role: Repository maintainer
status: active
featured: true
order: 0
capabilities:
  - Content modelling
  - Type-safe application boundaries
technologies:
  - Astro
  - TypeScript
publicLinks:
  - https://github.com/LuisArostegui/portfolio
  - https://github.com/LuisArostegui/portfolio/issues/65
  - https://github.com/LuisArostegui/portfolio/blob/main/docs/design/projects-design.md
---

> Representative validation content for the public content system. This is not final portfolio copy.

## Context

The portfolio needs one canonical, reviewable source for project summaries and future case-study prose.

## Constraints

Content must remain local, build-time validated, portable, and safe to publish in a public repository.

## Decisions

Use Markdown for narrative content, concise frontmatter for structured metadata, and project-owned models for presentation-facing queries.

## Technical evidence

This representative content exercises long-form project detail rendering without adding a new runtime or private implementation detail.

```ts
const projectDetailRouteKeepsContentStatic =
  'Astro renders project Markdown without introducing a client-side island or backend dependency.';
const deliberatelyLongPublicSafeEvidenceIdentifier =
  'portfolio_project_detail_markdown_code_block_local_overflow_validation_without_runtime_hydration_or_backend_dependency';
```

| Evidence type  | Public-safe purpose                            | Layout risk covered                                                                           |
| -------------- | ---------------------------------------------- | --------------------------------------------------------------------------------------------- |
| Markdown prose | Shows narrative project context                | Long technical text should wrap without widening the page                                     |
| Code excerpt   | Exercises a realistic technical evidence block | long_code_should_scroll_inside_the_code_block_without_creating_page_level_horizontal_overflow |
| Evidence table | Keeps comparison content structured            | table_cells_should_wrap_without_creating_page_level_horizontal_overflow                       |

![Portfolio social preview image](/social-preview.png)

## Outcome

This entry exercises the project collection without claiming finished pages, production results, or private professional evidence.
