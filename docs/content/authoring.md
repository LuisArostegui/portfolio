# Content authoring

Public portfolio content is stored as local Markdown in two Astro Content Collections:

- `src/content/projects/` contains one canonical file per project.
- `src/content/experience/` contains one canonical file per professional role or meaningful career stage.

Keep concise, reusable metadata in YAML frontmatter. Put narrative context, responsibilities, project decisions, and case-study prose in the Markdown body. A project's case study remains part of that project's body rather than a separate collection.

## Project frontmatter

Every project requires `title`, `summary`, `role`, `status`, `featured`, `order`, and at least one `capabilities` value. `status` is one of `planned`, `experimental`, `active`, `completed`, or `archived`. `featured` selects projects for highlighted MVP views; `order` is a non-negative integer that controls their ascending order, with the filename-derived ID resolving ties.

`technologies`, `period`, and `publicLinks` are optional. Technologies remain subordinate labels. When present, a period uses `YYYY-MM` for `start` and either `YYYY-MM` or `null` for `end`. Public links must be real public URLs; omit them when none exist.

## Experience frontmatter

Every experience entry requires `organisation`, `role`, `summary`, `startPeriod`, `endPeriod`, and at least one `capabilities` value. Periods use `YYYY-MM`. Set `endPeriod: null` for a current role; the application derives `isCurrent` from that value. Experience is ordered by its stored start period, not by presentation text.

## Publication boundary

Review every entry and asset for factual accuracy, attribution, confidentiality, and permission before commit. This repository and its Git history are public. A visibility or draft field could hide content from a generated page, but it would not make committed content private.

Do not add relations, a CMS, MDX, or new collections until a real approved requirement justifies them. A project-to-experience relation should use Astro `reference()` only after a genuine public relationship exists.

## Validation

Run the repository quality gates after editing content:

```sh
pnpm lint
pnpm format:check
pnpm check
pnpm build
```
