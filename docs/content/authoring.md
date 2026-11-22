# Content authoring

Public portfolio content is stored as local Markdown in two Astro Content Collections:

- `src/content/projects/` contains one canonical file per project.
- `src/content/experience/` contains one canonical file per professional role or meaningful career stage.

Keep concise, reusable metadata in YAML frontmatter. Put narrative context, responsibilities, project decisions, and case-study prose in the Markdown body. A project's case study remains part of that project's body rather than a separate collection.

## Project frontmatter

Every project requires `title`, `summary`, `role`, `status`, `featured`, `order`, and at least one `capabilities` value. `status` is one of `planned`, `experimental`, `active`, `completed`, or `archived`. `featured` selects projects for highlighted MVP views; `order` is a non-negative integer that controls their ascending order, with the filename-derived ID resolving ties.

`technologies`, `period`, and `publicLinks` are optional. Technologies remain subordinate labels. When present, a period uses `YYYY-MM` for `start` and either `YYYY-MM` or `null` for `end`. Public links must be real public URLs; omit them when none exist.

Direction B ([#120](https://github.com/LuisArostegui/portfolio/issues/120)) added three optional fields. `checks` and `pipeline` render nothing when they are absent. An absent `visibility` behaves as `public`.

| Field        | Values                                       | Home card (`ProjectCase.astro`)                                                                                                                                                                    | Case page (`projects/[id].astro`)                                                                               |
| ------------ | -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `visibility` | `public` or `private`; absent means `public` | `public` shows `● <status>`, the repository link and the `checks` row. `private` shows `◐ private` and hides the repository link and the `checks` row.                                             | `public` shows `● <status>` and the repository link. `private` shows `◐ private` and hides the repository link. |
| `checks`     | `{ url, labels }` with at least one label    | A row of check labels linking to `url` (for example a CI run), only when `visibility` is `public`.                                                                                                 | Not rendered.                                                                                                   |
| `pipeline`   | At least two `{ label, detail }` steps       | A described pipeline figure, lit stage by stage by the scroll motion ([ADR 0007](../architecture/decisions/0007-allow-purposeful-scroll-driven-motion.md)). Every stage is visible without motion. | Not rendered.                                                                                                   |

`visibility` describes the project's source code, not the case study. The repository link also needs a GitHub repository URL in `publicLinks`; without one it is omitted on both surfaces.

`src/lib/content/projects.ts` maps these fields into the page-facing models: `toProjectPreview()` applies the `visibility` default, `getProjectState()` derives the state label and symbol, and `getRepositoryUrl()` picks the repository link from `publicLinks`.

## Experience frontmatter

Every experience entry requires `organisation`, `role`, `summary`, `startPeriod`, `endPeriod`, and at least one `capabilities` value. Periods use `YYYY-MM`. Set `endPeriod: null` for a current role; the application derives `isCurrent` from that value. Experience is ordered by its stored start period, not by presentation text.

## Publication contract

Every entry in the `projects` collection is published. `getStaticPaths()` in `src/pages/projects/[id].astro` generates `/projects/<slug>/` for all of them, and featured entries also appear in the home Work section. There is no draft state today.

- `visibility: private` does not unpublish anything. A case study about a project whose code is private can be public and indexable when its text is approved.
- Commit only approved, public-safe text. A case without approved material stays out of the repository rather than behind a flag.
- If drafts are ever needed, add an explicit publication field and apply it to the routes, the home previews and the sitemap in the same change. See [routing and error handling](../architecture/routing.md#dynamic-routes).

v1 launches with one approved case study, `portfolio-foundation` (decision of 2026-11-22, recorded in [#85](https://github.com/LuisArostegui/portfolio/issues/85)). A second case needs its own issue and publishable material.

## Publication boundary

Review every entry and asset for factual accuracy, attribution, confidentiality, and permission before commit. This repository and its Git history are public. A visibility or draft field could hide content from a generated page, but it would not make committed content private.

Do not add relations, a CMS, MDX, or new collections until a real approved requirement justifies them. A project-to-experience relation should use Astro `reference()` only after a genuine public relationship exists.

## Consumption boundary

Pages and components must use the modules in `src/lib/content/` rather than importing Astro's collection APIs directly. `getProjectById()` returns `{ data, Content }`: `data` is the deliberate `ProjectDetail` model and `Content` is the rendered Markdown component for the canonical project body. This keeps `getCollection()`, `CollectionEntry`, and `render()` inside the content boundary.

## Validation

Run the repository quality gates after editing content:

```sh
pnpm lint
pnpm format:check
pnpm check
pnpm build
```
