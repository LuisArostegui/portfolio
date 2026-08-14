# Agent guidance

## Status

Proposed by PT-27. This document defines the project-level guidance expected by coding agents working on the Portfolio MVP.

## Goals

- Preserve the accepted static-first architecture and avoid rediscovering the same constraints in every task.
- Use a small set of task-specific skills instead of a broad, overlapping collection.
- Keep repository guidance portable and reviewable alongside the source it governs.
- Load detailed procedure only when relevant so routine tasks do not carry unnecessary context.

## Configuration model

| Location | Responsibility |
| --- | --- |
| `AGENTS.md` | Concise rules that apply to every task: source precedence, architectural boundaries, scope control, and handoff expectations. |
| `.agents/skills/portfolio-implementation/` | On-demand procedure for Astro, React islands, TypeScript, modern CSS, Content Collections, and Zod work. |
| `.agents/skills/portfolio-validation/` | On-demand procedure for risk-based tests, accessibility checks, browser validation, and verification evidence. |
| `.agents/skills/portfolio-cloudflare/` | On-demand procedure for Cloudflare Workers Static Assets, Wrangler, and runtime compatibility work. |
| Governing ADRs and design/product records | Detailed approved decisions. Skills link to them instead of copying or replacing them. |

The root configuration must remain concise. A skill should have a clear trigger, a bounded procedure, and references that are loaded only when the task needs them.

## Skills matrix

| Technology or concern | Candidate source | Recommendation | Rationale |
| --- | --- | --- | --- |
| Astro | `withastro/astro` skills | Adapt | Upstream provides development and review skills, but they target the Astro monorepo. The local implementation skill retains only application-level guidance. |
| React and TypeScript | `vercel-labs/agent-skills` React best practices | Adapt | Useful reference for isolated React behaviour; do not import Next.js or Vercel deployment assumptions into an Astro application. |
| Modern CSS and design tokens | Existing ADR-0002 and design foundations | Create | The portfolio's semantic token and responsive rules are project-specific. |
| Accessibility | Existing component and validation records | Create | The local validation skill preserves the approved interaction and accessibility boundaries without claiming conformance from automation alone. |
| Astro Content Collections and Zod | ADR-0004 and Astro documentation | Create | Collection names, schemas, Git-tracked content, and editorial constraints belong to this repository. |
| Vitest and React Testing Library | ADR-0006 | Create | The project needs a risk-based selection procedure, not a framework-wide testing playbook. |
| Playwright and axe | Official Playwright skills and ADR-0006 | Use later | Add the official Playwright skill when browser testing is introduced. Use axe as evidence within the selected test layer, not as a declaration of WCAG conformance. |
| GitHub workflow | Existing repository templates and configured GitHub capability | Create | The root guidance and issue/PR conventions are repository-specific; no additional generic GitHub skill is needed. |
| Cloudflare and Wrangler | `cloudflare/skills` | Use on demand | The official Wrangler skill prefers current documentation for configuration and CLI syntax, which is valuable for time-sensitive platform work. |
| Superpowers methodology | `obra/superpowers` | Reject as a repository dependency | Its debugging and verification procedures can be used personally when needed, but importing the full methodology would duplicate local process and increase context. |
| Deprecated OpenAI skills catalog | `openai/skills` | Reject | The repository is deprecated in favour of current plugin examples and is not a source for new project dependencies. |

## Approved external sources

- https://github.com/withastro/astro/tree/main/.agents/skills
- https://github.com/vercel-labs/agent-skills/tree/main/skills/react-best-practices
- https://playwright.dev/agent-cli/skills
- https://github.com/cloudflare/skills/tree/main/skills/wrangler
- https://github.com/obra/superpowers
- https://github.com/openai/skills

External skills are references or on-demand tools. Their full contents are not vendored into this repository by default.

## Maintenance

1. Review the relevant local skill when its governing ADR, toolchain, or task workflow changes.
2. Review an external source before first use and whenever a task depends on current CLI or platform behaviour.
3. Keep source URLs, scope, and the recommendation in this matrix current; remove a skill that no longer has a distinct responsibility.
4. Keep every `SKILL.md` small and move lengthy examples or changing vendor detail to referenced documentation.
5. Review changes to `AGENTS.md` and `.agents/skills/` as production-adjacent repository configuration.

## Follow-up plan

1. Validate the new local guidance on the next implementation issue.
2. Add Playwright's official skill only when an accepted task introduces browser end-to-end validation.
3. Load Cloudflare's Wrangler skill only for configuration or deployment work.
4. Reassess the matrix after the initial application bootstrap; do not add skills solely because they are popular.

## Governing decisions

- [ADR-0001: Astro](decisions/0001-use-astro-as-the-primary-frontend-framework.md)
- [ADR-0002: Modern CSS](decisions/0002-use-modern-css-as-the-primary-styling-strategy.md)
- [ADR-0003: Motion](decisions/0003-use-a-native-first-purpose-driven-animation-strategy.md)
- [ADR-0004: Content Collections](decisions/0004-use-git-versioned-astro-content-collections.md)
- [ADR-0005: Cloudflare Workers Static Assets](decisions/0005-use-cloudflare-workers-static-assets-for-hosting.md)
- [ADR-0006: Risk-based testing](decisions/0006-use-a-pragmatic-risk-based-testing-strategy.md)
