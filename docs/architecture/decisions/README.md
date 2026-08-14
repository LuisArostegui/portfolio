# Architecture decision records

## Purpose

GitHub decision issues preserve investigation and discussion. Architecture decision records (ADRs) preserve the concise accepted or rejected outcome in the repository, while the [high-level architecture](../high-level-architecture.md) combines active decisions into a living system view. The [repository README](../../../README.md) provides the entry point to both.

Create ADRs for significant decisions whose context and consequences future maintainers need to understand. Ordinary implementation details and easily reversible local choices do not require an ADR. Start new records from the [reusable template](template.md).

## When to create an ADR

Create an ADR when a decision:

- materially affects system boundaries, technology, deployment, data, security, privacy, accessibility, testing, content ownership, or maintainability;
- introduces a constraint that is difficult or expensive to reverse;
- resolves a meaningful architectural trade-off;
- changes or replaces an accepted ADR; or
- requires future maintainers to understand why one option was selected.

Do not create an ADR for routine implementation details, small refactors, local component choices, ordinary dependency updates without architectural impact, formatting or documentation-only corrections, or decisions already governed directly by an accepted ADR.

## Numbering and naming

Use `NNNN-kebab-case-decision-title.md`.

- Use a four-digit, zero-padded sequential number and allocate the next unused number.
- Never reuse or renumber an existing ADR number.
- Preserve numbers for rejected, deprecated, and superseded ADRs.
- Use a concise imperative or decision-oriented kebab-case title.
- Use `# ADR NNNN: Decision title` for the Markdown H1.
- Do not number `template.md` or `README.md` as ADRs.
- The next decision after the current records would use `0007`.

Do not rename an existing ADR unless its filename is broken or contradicts its H1.

## Supported statuses

Use exactly one of these primary statuses.

### Proposed

The decision is documented and under review. It is not yet an active architectural constraint.

### Accepted

The decision has been approved and currently guides implementation.

### Rejected

The proposal was formally considered but not adopted. Preserve it when its reasoning provides meaningful historical value.

### Deprecated

The decision is no longer recommended or applicable and has no direct replacement. Explain why it ceased to apply.

### Superseded

A later ADR replaces the decision. The old ADR must identify and link to the replacing ADR, and the new ADR must identify the ADR it supersedes.

Express required relationships alongside the status or metadata, for example:

- `**Status:** Superseded by [ADR 0008](0008-example.md)`
- `**Supersedes:** [ADR 0003](0003-example.md)`

Do not introduce overlapping primary statuses such as Draft, Pending, Active, Obsolete, Amended, or Completed.

## Lifecycle

1. Confirm that the decision warrants an ADR.
2. Allocate the next number and copy `template.md`.
3. Create the ADR initially as `Proposed`.
4. Link the ADR to its originating GitHub decision issue.
5. Record concise context, drivers, realistic options, the decision, consequences, validation, and revisit conditions.
6. Review the ADR through a pull request.
7. Set it to `Accepted` or `Rejected` when the decision concludes.
8. Update the index.
9. Update the originating issue with the resulting ADR link.
10. Implement the decision through separate issues or pull requests where appropriate.
11. Revisit the ADR only when its documented triggers occur or evidence invalidates its assumptions.

Do not rewrite an accepted ADR to hide a later architectural change. Minor factual corrections, link fixes, and clarifications that do not change the decision may update the existing record; a material change requires a new ADR. Superseding a record requires bidirectional links, and historical ADRs remain in the repository. The index reflects current status.

Detailed investigation belongs in the GitHub issue. The ADR should remain understandable without reproducing the whole discussion.

## Required ADR content

An ADR is expected to contain:

- a title;
- status;
- date;
- decision owners;
- a related issue;
- related documentation where relevant;
- context;
- assumptions when relevant;
- decision drivers;
- options considered;
- the decision;
- consequences;
- risks and mitigations when meaningful;
- validation or confirmation requirements;
- revisit conditions; and
- references when external evidence materially supports the record.

Omit a section only when it is genuinely inapplicable, not for convenience. A weighted comparison matrix is optional and should be used only when it improves an actual multi-option decision.

## Editing historical ADRs

- Preserve the original decision and its historical reasoning.
- Do not silently replace an accepted choice.
- Correct broken links, typographical errors, and demonstrably false factual statements carefully.
- Record material changes through a new ADR.
- Add superseding or deprecation metadata without deleting the old record.
- Avoid rewriting historical language merely to match the latest template.
- Apply the template to new ADRs; old ADRs need only satisfy the required semantic content.

## Index

| ADR                                                                      | Decision                                              | Status   | Date       | Originating issue                                                                                        | Notes or relationship |
| ------------------------------------------------------------------------ | ----------------------------------------------------- | -------- | ---------- | -------------------------------------------------------------------------------------------------------- | --------------------- |
| [ADR 0001](0001-use-astro-as-the-primary-frontend-framework.md)          | Use Astro as the primary frontend framework           | Accepted | 2026-07-31 | [PT-8 — Evaluate frontend framework](https://github.com/LuisArostegui/portfolio/issues/11)               | Current               |
| [ADR 0002](0002-use-modern-css-as-the-primary-styling-strategy.md)       | Use modern CSS as the primary styling strategy        | Accepted | 2026-07-31 | [PT-9 — Evaluate styling strategy](https://github.com/LuisArostegui/portfolio/issues/12)                 | Current               |
| [ADR 0003](0003-use-a-native-first-purpose-driven-animation-strategy.md) | Use a native-first, purpose-driven animation strategy | Accepted | 2026-08-03 | [PT-10 — Evaluate animation strategy](https://github.com/LuisArostegui/portfolio/issues/13)              | Current               |
| [ADR 0004](0004-use-git-versioned-astro-content-collections.md)          | Use Git-versioned Astro Content Collections           | Accepted | 2026-08-04 | [PT-11 — Evaluate content-management strategy](https://github.com/LuisArostegui/portfolio/issues/14)     | Current               |
| [ADR 0005](0005-use-cloudflare-workers-static-assets-for-hosting.md)     | Use Cloudflare Workers Static Assets for hosting      | Accepted | 2026-08-04 | [PT-12 — Evaluate hosting and deployment platform](https://github.com/LuisArostegui/portfolio/issues/15) | Current               |
| [ADR 0006](0006-use-a-pragmatic-risk-based-testing-strategy.md)          | Use a pragmatic risk-based testing strategy           | Accepted | 2026-08-04 | [PT-13 — Evaluate testing strategy](https://github.com/LuisArostegui/portfolio/issues/16)                | Current               |

## Related architecture documentation

- [High-level architecture](../high-level-architecture.md)
- [Product documentation](../../product/)
- [Reusable ADR template](template.md)
