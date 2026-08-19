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

## Model aliases

Use these names as human-facing capability aliases only. Do not use them as technical model IDs.

- Sol: main architect/orchestrator model with stronger reasoning.
- Terra: balanced implementer model.
- Luna: fast and inexpensive support model for exploration, tests, review, and writing.

Technical configuration must use local placeholders or real model IDs from your Codex allowlist:

- `<MAIN_MODEL>`
- `<FAST_MODEL>`
- `<REVIEW_MODEL>`

## Recommended model routing

Use these recommendations as guidance, not as mandatory routing rules.

- Sol: architecture decisions, ADRs, repository planning, PR reviews, complex debugging, accessibility design, and large refactors.
- Terra: feature implementation, tests, documentation tied to implementation, and medium-sized refactors.
- Luna: mechanical changes, small fixes, renames, formatting, and simple documentation.

## Team workflow

Use the reusable Codex team workflow for complex or parallelizable tasks:

1. Architect reads the issue and existing project context.
2. Explorer analyzes the repository before implementation starts.
3. Architect splits the work and assigns focused tasks.
4. Frontend implements production changes.
5. QA writes or updates tests.
6. Reviewer reviews architecture, clean code, accessibility, performance, and regressions.
7. Writer prepares PR notes, changelog entries, and documentation.
8. Architect performs final integration and verification.

When work can happen in parallel, use separate git worktrees so agents do not overwrite each other.

## Team roles

Shared rules:

- Read the nearest project instructions before editing: `AGENTS.md`, `README.md`, package docs, and relevant issue context.
- Protect user changes. Never revert unrelated work.
- Keep edits scoped to the assigned task.
- Prefer existing project conventions over new abstractions.
- Verify changes before claiming they are complete.
- Report blockers with concrete evidence and suggested next steps.

Architect:

- Understand the issue.
- Define success criteria.
- Split the work into independent tasks.
- Decide whether worktrees are needed.
- Delegate to Explorer before implementation.
- Review the final result.
- Avoid programming except for very small glue changes.

Explorer:

- Analyze the repository before implementation starts.
- Identify relevant files, patterns, constraints, and risks.
- Explain the current behavior.
- Recommend the smallest viable implementation path.
- Avoid modifying code.

Frontend Engineer:

- Implement production code.
- Follow existing architecture and style.
- Keep components ergonomic, accessible, and responsive.
- Avoid unrelated refactors.
- Hand off what changed and what still needs testing.

QA Engineer:

- Write and update tests.
- Cover user-facing behavior and likely regressions.
- Prefer real behavior over mock behavior.
- Keep tests focused and maintainable.
- Report any gaps that cannot be tested locally.

Reviewer:

- Review architecture.
- Review clean code.
- Review accessibility.
- Review performance.
- Review test coverage and regression risk.
- Lead with findings and do not implement changes.

Technical Writer:

- Draft PR descriptions.
- Draft changelog entries.
- Update documentation.
- Summarize user-facing impact.
- Keep writing factual, concise, and tied to verified changes.
