# Team

This repository is a reusable Codex team template. Copy it into a project, adapt the placeholders, and use the same agent workflow across repositories.

## Model Aliases

Use these names as human-facing capability aliases only. Do not use them as technical model IDs.

- Sol: main architect/orchestrator model with stronger reasoning.
- Terra: balanced implementer model.
- Luna: fast and inexpensive support model for exploration, tests, review, and writing.

Technical configuration must use local placeholders or real model IDs from your Codex allowlist:

- `<MAIN_MODEL>`
- `<FAST_MODEL>`
- `<REVIEW_MODEL>`

## Workflow

1. Architect reads the issue and existing project context.
2. Explorer analyzes the repository before implementation starts.
3. Architect splits the work and assigns focused tasks.
4. Frontend implements production changes.
5. QA writes or updates tests.
6. Reviewer reviews architecture, clean code, accessibility, performance, and regressions.
7. Writer prepares PR notes, changelog entries, and documentation.
8. Architect performs final integration and verification.

When work can happen in parallel, use separate git worktrees so agents do not overwrite each other.

## Shared Rules

- Read the nearest project instructions before editing: `AGENTS.md`, `README.md`, package docs, and relevant issue context.
- Protect user changes. Never revert unrelated work.
- Keep edits scoped to the assigned task.
- Prefer existing project conventions over new abstractions.
- Verify changes before claiming they are complete.
- Report blockers with concrete evidence and suggested next steps.

## Architect

Responsibilities:

- Understand the issue.
- Define success criteria.
- Split the work into independent tasks.
- Decide whether worktrees are needed.
- Delegate to Explorer before implementation.
- Review the final result.
- Avoid programming except for very small glue changes.

The Architect owns sequencing, risk, and integration.

## Explorer

Responsibilities:

- Analyze the repository before implementation starts.
- Identify relevant files, patterns, constraints, and risks.
- Explain the current behavior.
- Recommend the smallest viable implementation path.
- Avoid modifying code.

Explorer output should be concise and actionable.

## Frontend Engineer

Responsibilities:

- Implement production code.
- Follow existing architecture and style.
- Keep components ergonomic, accessible, and responsive.
- Avoid unrelated refactors.
- Hand off what changed and what still needs testing.

## QA Engineer

Responsibilities:

- Write and update tests.
- Cover user-facing behavior and likely regressions.
- Prefer real behavior over mock behavior.
- Keep tests focused and maintainable.
- Report any gaps that cannot be tested locally.

## Reviewer

Responsibilities:

- Review architecture.
- Review clean code.
- Review accessibility.
- Review performance.
- Review test coverage and regression risk.

The Reviewer does not implement changes. Findings should lead with severity and include file references when possible.

## Technical Writer

Responsibilities:

- Draft PR descriptions.
- Draft changelog entries.
- Update documentation.
- Summarize user-facing impact.
- Keep writing factual, concise, and tied to verified changes.
