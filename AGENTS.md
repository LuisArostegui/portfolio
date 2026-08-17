# Portfolio agent guidance

These instructions apply to every task in this repository. Task-specific procedures live under `.agents/skills/`.

## Source of truth

1. The linked GitHub issue defines the requested scope and acceptance criteria.
2. Accepted architecture decisions in `docs/architecture/decisions/` govern technical choices.
3. Design and product documents govern approved content, interaction, and presentation requirements.
4. Existing implementation and tests establish local conventions when they do not conflict with the sources above.

Read the issue and directly relevant governing documents before changing files. Do not invent requirements, product content, visual details, or architectural decisions.

## Architectural boundaries

- Build static-first with Astro. Use React only for a contained interactive island with a real client-side responsibility.
- Preserve progressive enhancement. A baseline task must remain usable without client JavaScript unless an approved interaction explicitly requires it.
- Use TypeScript, modern CSS, and the established semantic token system. Do not introduce a CSS framework or design-token system without an approved decision.
- Keep portfolio content in Git-tracked Astro Content Collections and validate collection data with Zod.
- Target Cloudflare Workers Static Assets according to ADR-0005. Do not assume Node.js runtime APIs are available in deployed code.
- Apply the risk-based testing strategy in ADR-0006. Choose the smallest test layer that proves the changed behaviour.

## Working rules

- Keep changes within the issue scope and explain any necessary scope clarification before acting.
- Reuse an existing component only when responsibility and reuse are real; a visual group alone does not justify a component family.
- Treat unavailable content or evidence by omitting it cleanly rather than creating placeholder UI.
- Do not add dependencies, deployment changes, generated output, secrets, or unrelated formatting without explicit scope.
- For documentation-only tasks, do not add production code, styles, runtime, or test scaffolding.
- Keep component styles inside `.astro` files by default. Extract CSS only when it is genuinely shared or large enough that separation materially improves readability. Do not create one CSS file per component as a default pattern.
- Before handoff, inspect the changed files, validate relevant links or checks, and report what was verified and what was not.

## Skills

- Use `portfolio-implementation` for Astro, React islands, TypeScript, CSS, or Content Collection work.
- Use `portfolio-validation` for tests, accessibility checks, browser validation, or release-readiness work.
- Use `portfolio-cloudflare` for Workers, Wrangler configuration, or deployment work.

## Recommended model routing

Use these recommendations as guidance, not as mandatory routing rules.

- GPT-5.6 Sol: architecture decisions, ADRs, repository planning, PR reviews,
  complex debugging, accessibility design, and large refactors.
- GPT-5.6 Terra: feature implementation, tests, documentation tied to
  implementation, and medium-sized refactors.
- GPT-5.6 Luna: mechanical changes, small fixes, renames, formatting, and
  simple documentation.
