---
name: portfolio-validation
description: Validate Portfolio MVP changes involving Vitest, React Testing Library, Playwright, axe, accessibility, browser behaviour, or release readiness. Use after the implementation boundary is known; do not use to add speculative test tooling.
---

# Portfolio validation

## Purpose

Apply the repository's risk-based testing strategy and produce evidence proportionate to the changed behaviour.

## Procedure

1. Read `AGENTS.md`, the issue acceptance criteria, and ADR-0006.
2. Identify the observable risk and choose the smallest test layer that can demonstrate it:
   - use Vitest for deterministic functions, schemas, and content transforms;
   - use React Testing Library for behaviour within an interactive React island;
   - use Playwright for critical user journeys, route integration, or browser-only behaviour;
   - use axe where automated accessibility checks are relevant.
3. Do not claim WCAG conformance from an automated check. Record the scope and limitations of every validation method.
4. Prefer tests that would fail if the intended behaviour regressed. Avoid tests that merely execute implementation details.
5. Use the package scripts and configuration already present in the checkout. Do not invent commands or add test dependencies outside the issue scope.
6. Report commands or checks run, their outcome, and any validation intentionally not run.

## Accessibility baseline

Check semantic structure, keyboard access, visible focus, accessible names, and motion preferences when the changed scope makes them relevant. Escalate gaps in the approved design or interaction contract instead of silently choosing a new product behaviour.

## References

- `docs/architecture/decisions/0006-use-a-pragmatic-risk-based-testing-strategy.md`
- `docs/design/component-foundations.md`
- `docs/design/motion-interaction-guidelines.md`
- `docs/design/design-validation-handoff.md`
