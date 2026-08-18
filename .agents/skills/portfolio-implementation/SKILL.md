---
name: portfolio-implementation
description: Implement or review Portfolio MVP work involving Astro pages or components, selective React islands, TypeScript, modern CSS, Astro Content Collections, or Zod. Use after reading AGENTS.md and the linked issue; do not use for deployment-only or validation-only tasks.
---

# Portfolio implementation

## Purpose

Apply the approved Portfolio architecture without duplicating its ADRs in prompts. This is a task-specific procedure, not a replacement for the governing documentation.

## Procedure

1. Read `AGENTS.md`, the full linked issue, and the directly relevant ADRs and design/product records.
2. State the affected route, content, component, or interaction boundary before editing.
3. Start with Astro-rendered semantic HTML. Introduce a React island only when the interaction needs client state or browser APIs and its boundary is contained.
4. Use existing semantic CSS tokens and component patterns. Do not create an abstraction merely because a visual group exists.
5. For content, define or update the collection schema before relying on the data; keep content Git-tracked and validate it with Zod.
6. Preserve the non-JavaScript baseline and reduced-motion or accessibility requirements stated by the governing records.
7. Select proportionate validation using `portfolio-validation` when tests or accessibility checks are relevant.

## Decision gates

- If an interaction is possible with semantic HTML and CSS, keep it static.
- If a requirement is absent from the issue or governing record, do not invent it; report the gap.
- If a proposed dependency, data source, or runtime feature is outside the accepted stack, stop and request a decision.
- For route-specific page sections, keep the first implementation in the owning route when there is no real reuse and the file remains reviewable. Extract later to focused `.astro` components under `src/components/<route-or-feature>/` only when a section gains a clear responsibility, repeated use, independent review value, or the route becomes difficult to navigate. Keep route files responsible for data loading and page composition; pass typed props to extracted presentation sections.

## References

- `docs/architecture/decisions/0001-use-astro-as-the-primary-frontend-framework.md`
- `docs/architecture/decisions/0002-use-modern-css-as-the-primary-styling-strategy.md`
- `docs/architecture/decisions/0003-use-a-native-first-purpose-driven-animation-strategy.md`
- `docs/architecture/decisions/0004-use-git-versioned-astro-content-collections.md`
- `docs/design/` and `docs/product/` records named by the issue
