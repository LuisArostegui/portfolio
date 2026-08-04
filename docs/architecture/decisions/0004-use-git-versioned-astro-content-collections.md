# ADR 0004: Use Git-versioned Astro Content Collections

- **Status:** Accepted
- **Date:** 2026-08-04
- **Decision owners:** Portfolio maintainer
- **Related issue:** [PT-11 — Evaluate content-management strategy](https://github.com/LuisArostegui/portfolio/issues/14)
- **Related documentation:** [ADR 0001](0001-use-astro-as-the-primary-frontend-framework.md), [product vision](../../product/product-vision.md), [information architecture](../../product/information-architecture.md), [content strategy](../../product/content-strategy.md), and [product success criteria](../../product/product-success-criteria.md)

## Context

The portfolio is a static-first Astro site maintained initially by one technical author. Its content includes projects, professional experience, project details and case-study material, public-safe engineering evidence, associated media, small site configuration, and possible future articles and localisation.

The content strategy favours evidence over unsupported claims, one canonical source for each content entity, reviewable changes, structured metadata, and maintainable long-form technical prose. It also separates the private professional knowledge base from the public portfolio. Content must be safe for public disclosure before it enters the public system.

The decision must provide strong typing, build-time validation, straightforward offline authoring, clear ownership, portability, and a credible evolution path without introducing an editorial platform before there is a measured need. It must also preserve the progressive-disclosure model: summaries are projections of canonical entries, while project pages can disclose deeper case-study material.

The options named in the issue occupy different layers and are not mutually exclusive alternatives. Astro Content Collections provide an access, validation, and query layer. Markdown, MDX, TypeScript, JSON, and YAML are authoring or data formats. Decap CMS and TinaCMS can add Git-backed editing interfaces. Remote or self-hosted CMS platforms provide content storage, workflows, APIs, and media services. This ADR selects a complete initial combination across those layers.

## Assumptions

- One technical maintainer authors the MVP content.
- Publishing frequency is low and content changes can wait for a rebuild.
- Git and pull requests are acceptable authoring and review tools.
- The site has no active localisation, scheduled publishing, real-time update, remote-media, or multi-author workflow requirement.
- Public content benefits from review alongside the code and presentation that consume it.
- The MVP remains statically generated as selected by ADR 0001.

## Decision drivers

The following criteria are weighted for this portfolio, not for content systems in general.

| Criterion | Weight | Interpretation for this product |
| --- | ---: | --- |
| Type safety and validation | 16% | Project-owned schemas, useful editor types, and build-time failure for invalid metadata |
| Product and authoring fit | 15% | Efficient technical authoring for structured metadata and long-form case studies |
| Version control and review | 12% | Clear diffs, branch previews, history, attribution, and rollback |
| Portability and canonical ownership | 12% | Open formats, one public source per entity, and limited vendor coupling |
| Operational simplicity and cost | 12% | No unnecessary service, database, authentication, maintenance, or subscription |
| Offline development | 8% | Complete local authoring, validation, and builds without a content API |
| Media and localisation evolution | 7% | Proportionate initial handling with credible future options |
| Preview and collaboration evolution | 7% | A path to richer editorial workflows when measured requirements emerge |
| Build and hosting fit | 6% | Predictable static builds without a runtime content dependency |
| Migration boundary | 5% | Ability to map a future source into stable project-owned contracts |

## Options considered

The matrix compares complete content-source strategies. Authoring formats and supporting mechanisms are evaluated separately below. Scores use a five-point scale; weighted totals are normalised to 100 and rounded. They reflect this portfolio's present requirements, not a universal CMS ranking.

| Strategy | Types and validation | Authoring fit | Git review | Portability | Simplicity and cost | Offline | Media and i18n | Preview and collaboration | Build fit | Migration | Total |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| **Astro Content Collections, Markdown, and Git** | 5 | 5 | 5 | 5 | 5 | 5 | 3 | 3 | 5 | 4 | **93** |
| Decap CMS over Git content | 4 | 4 | 5 | 5 | 4 | 3 | 3 | 4 | 5 | 4 | **83** |
| TinaCMS over Git content | 4 | 5 | 4 | 4 | 3 | 2 | 4 | 5 | 4 | 4 | **79** |
| Sanity | 4 | 5 | 2 | 3 | 3 | 1 | 5 | 5 | 4 | 3 | **70** |
| DatoCMS | 4 | 5 | 2 | 3 | 3 | 1 | 5 | 5 | 4 | 3 | **70** |
| Contentful | 4 | 4 | 2 | 3 | 2 | 1 | 5 | 5 | 4 | 3 | **65** |
| Storyblok | 3 | 5 | 2 | 3 | 3 | 1 | 5 | 5 | 4 | 3 | **67** |
| Strapi | 4 | 4 | 2 | 4 | 1 | 2 | 5 | 4 | 3 | 4 | **65** |
| Directus | 4 | 4 | 2 | 4 | 1 | 2 | 5 | 4 | 3 | 4 | **65** |
| Payload CMS | 5 | 4 | 2 | 4 | 1 | 2 | 5 | 4 | 2 | 4 | **67** |
| Custom backend and database | 3 | 1 | 2 | 4 | 1 | 2 | 2 | 2 | 2 | 3 | **44** |

### Astro Content Collections with Markdown and Git

Astro's build-time Content Collections load local files, validate metadata with Zod, generate TypeScript types, support validated references, and expose consistent query APIs. The `glob()` loader supports separate Markdown, MDX, JSON, YAML, and TOML entries and derives stable IDs from filenames by default. Custom loaders can later supply remote content.

This strategy best fits one technical maintainer, static output, low publishing frequency, offline work, and review through Git. Markdown provides readable, portable prose and clear diffs. No content service, runtime API, database, authentication layer, or subscription is required.

### Authoring-format alternatives

**MDX as the default** would support embedded components, but it adds executable JSX and JavaScript syntax, component coupling, compilation failure modes, and migration cost without an approved embedded-component requirement. It is rejected as the default.

**Local typed TypeScript data** provides excellent refactoring and derived values. It remains appropriate for small, stable application configuration, but is poorly suited to long-form prose or future non-technical authors and is rejected as the primary editorial format.

**JSON or YAML with schema validation** can represent generated or purely structured data. JSON is cumbersome for prose; YAML has indentation and value-coercion hazards. Both remain available where their structure improves authoring, but neither replaces Markdown for projects or experience.

### Git-based editing interfaces

**Decap CMS** is the smallest likely future step when non-technical contributors need a browser UI while Git remains the source and pull requests remain the review mechanism. It offers Git-backed editorial workflows and repository-based media, but adds authentication, administration, and provider-API integration that the sole current author does not need.

**TinaCMS** keeps Markdown, MDX, or JSON in Git and adds TypeScript schemas, an editing UI, media options, a generated GraphQL layer, and visual editing. It is capable, but its backend, generated API, configuration, and possible client-side editing integration are disproportionate without an editor requirement.

### Remote SaaS CMS platforms

**Sanity** provides a configurable Studio, structured schemas, relations, media, collaboration, and visual editing. Its Content Lake is schemaless: Studio validation improves authoring but is not automatically enforced for every API write. A project-owned runtime validation boundary would therefore remain necessary. Sanity is not selected because remote storage and collaboration do not solve a current problem.

**Contentful** provides mature content modelling, assets, localisation, environments, previews, and enterprise workflows. Remote-only authoring, provider coupling, integration work, and plan constraints are excessive for the MVP.

**Storyblok** provides a visual editor, reusable blocks, rich text, assets, and several localisation strategies. The portfolio does not need page-builder freedom; premature block composition could weaken its established information architecture and canonical ownership.

**DatoCMS** provides a model builder, GraphQL delivery, localisation, media, drafts, real-time updates, and Astro-oriented visual editing. It is a strong future SaaS candidate, but no external editorial workflow currently justifies it.

### Self-hosted CMS platforms

**Strapi** provides collection and single types, components, relations, draft and publish, localisation, media, and REST or GraphQL APIs. It also requires a persistent backend, database, security posture, deployment, backup, monitoring, and upgrades.

**Directus** provides a SQL-first model, Data Studio, APIs, media, translations, and schema snapshots. No existing relational content database or complex business-data model justifies its operational surface.

**Payload CMS** provides TypeScript configuration and generated types, an administration panel, versions, drafts, localisation, uploads, and extensive customisation. Its Next.js-oriented backend application and database conflict with the present static Astro scope.

### Custom backend and database

A custom system would require authentication, authorisation, administration, editing, preview, media, versioning, security, deployment, backups, and migration tooling. Building those capabilities without a product requirement has the highest cost and risk and is rejected.

## Decision

Adopt **Git-tracked local files as the initial public content source of truth**, with **build-time Astro Content Collections** as the access, validation, and query layer.

The initial strategy will use:

- Markdown entries for projects and professional experience;
- concise structured frontmatter for metadata;
- Markdown bodies for long-form project details and case-study prose;
- project-owned Zod schemas as the validation boundary;
- small typed TypeScript modules for stable application configuration;
- small content-query modules that centralise filtering, ordering, publication, reference resolution, and mapping;
- repository-hosted, public-safe media where its size and editorial needs remain proportionate; and
- Git branches, pull requests, and deployment previews as the publication workflow.

The MVP will not include a headless CMS, content API, database, CMS SDK, or MDX integration. MDX may be added only for a concrete, approved content requirement that cannot be expressed maintainably through Markdown and page composition.

## Security and confidentiality boundary

This repository is public. A `draft`, `isPublished`, or equivalent field may control generated-site visibility, but it does not provide a private editorial workflow. An unpublished entry, its history, and its media remain publicly accessible in Git. Introduce such a field only when withholding otherwise public-safe content from the generated site is a real requirement; do not add `draft: false` or an editorial state machine to every entry by convention.

Consequently:

- confidential, unresolved, employer-private, or otherwise restricted source material must never be committed;
- public-safety, attribution, and confidentiality review occurs before commit, not merely before publication;
- drafts may be incomplete but must already be safe for public disclosure; and
- the private professional knowledge base remains outside this public content system.

Schema validation cannot establish confidentiality, factual truth, or permission to publish.

## Initial content model

### `projects`

Use one Markdown entry per canonical project. Frontmatter will describe title, summary, role, project status, featured state where required, capabilities, subordinate technology labels, public links, relevant dates or period, optional site-visibility data where justified, and media metadata where present. Project status describes the real state of the work and may distinguish `planned`, `experimental`, `active`, `completed`, and `archived` where the content strategy needs them; implementation must not add unused statuses merely for completeness. It is separate from whether an entry is rendered on the site.

The body contains optional project-detail or case-study prose following the established narrative: problem, context, constraints, decisions and trade-offs, implementation approach, outcome, and lessons learned. Preview cards and homepage selections derive from the same entry rather than duplicating project content.

### `experience`

Use one Markdown entry per professional role or meaningful career stage. Frontmatter will describe organisation, role, start period, nullable end period, concise summary, capabilities, and optional site-visibility data where justified. The body contains context, selected contributions, responsibilities, outcomes, and demonstrated capabilities.

An `endPeriod` value of `null` identifies a current role; derive presentation values such as `isCurrent` rather than storing a second field with the same meaning. Dates and periods must use one documented, machine-sortable internal representation. Human-readable presentation such as “June 2024 – Present” remains separate from stored values. The implementation decision may choose the required precision, but must not sort experience by display strings.

### Case studies

Do not create a `caseStudies` collection initially. The information architecture defines a case study as a deeper presentation mode within a project detail page, so its initial prose belongs in the project's Markdown body.

Reconsider independent case-study entries only when they gain their own routes or index, publishing lifecycle, reuse across projects, multiple instances per project, or relationships and metadata that justify an independent identity.

### Small stable data

Use typed TypeScript modules for navigation, professional-profile URLs, site metadata, and similarly small stable configuration that does not represent repeatable editorial content. Do not create collections for every singleton, constant, or short list.

Do not add speculative collections for skills, technologies, tags, organisations, authors, or categories. Promote one of these concepts to a collection only when it gains independent content, genuine reuse, relationships, or navigational responsibility.

## Collection and schema boundaries

- Register collections in `src/content.config.ts` and load local entries with Astro's `glob()` loader.
- Keep project-owned Zod schemas responsible for the internal data contract. Schema modules may be separated by content type so that collection registration remains focused.
- Directory names may evolve, but ownership must remain explicit and each entity must have one canonical file.
- Use the filename-derived entry ID by default. Do not duplicate it with a custom slug unless routing has a concrete need for a separate value.
- Introduce `reference()` only for a genuine relationship, not to demonstrate the API or normalise a small taxonomy prematurely.

Schemas validate required metadata, enums, URLs, dates or periods, arrays, media metadata, relationships, optional visibility fields where justified, and cross-field invariants. Astro uses these schemas to validate collection data and derive TypeScript types and references. The generated types describe collection metadata and entry APIs; they do not type the semantic structure of arbitrary Markdown prose.

Schemas do not prove factual accuracy, confidentiality safety, professional attribution, evidence quality, narrative quality, tone, final-page accessibility, or completeness of the Markdown prose. Those remain human, editorial, accessibility, and content-specific review responsibilities.

## Authoring policies

### Markdown

Markdown is the default because it is portable, readable without specialised tooling, suitable for technical long-form content, easy to diff, usable offline, supported directly by Astro, and separable from component implementation.

Apply these rules:

1. One file represents one canonical content entity.
2. Frontmatter contains concise structured metadata; long-form prose belongs in the body.
3. Do not turn every narrative heading into a field or introduce fields for hypothetical needs.
4. Do not place implementation or business logic in content.
5. Use consistent British English and a clear heading hierarchy.
6. Keep technology lists subordinate to problem context, decisions, outcomes, and capabilities.
7. Do not introduce raw HTML or components when Markdown semantics are sufficient.

### MDX

Do not install `@astrojs/mdx` initially. MDX combines Markdown with JSX, JavaScript expressions, imports, and exports; it is executable content rather than harmless rich Markdown.

If an approved feature later requires a reusable embedded component that Markdown and the page layout cannot express maintainably:

- document the requirement and its accessibility implications;
- restrict content to a controlled, documented component set;
- keep business logic out of content;
- hydrate a framework component only when interaction genuinely requires it;
- preserve a meaningful static and accessible representation;
- assess portability and CMS migration impact; and
- never accept unrestricted MDX from untrusted authors.

### TypeScript, JSON, and YAML

TypeScript is appropriate for small stable configuration and derived values, not as the default long-form authoring format. JSON is appropriate for generated or purely structured data. YAML may be used for concise structured data when it materially improves authoring. Neither replaces Markdown for project or experience prose.

Any of these formats loaded into a collection remains subject to project-owned schema validation. Astro can generate JSON Schema files for collection entries to improve editor completion and validation for JSON and YAML.

## Query boundary

Introduce small modules, for example under `src/lib/content/`, to centralise collection access, visibility filtering when required, sorting, featured selection, reference resolution, and mapping to page-specific models. Pages and components should consume deliberate internal shapes rather than scatter raw `getCollection()` calls or depend on storage details.

This is a small seam, not a full repository or hexagonal architecture for static files. It prevents future CMS SDK types or vendor responses from reaching presentation code and creates one place to apply publication rules.

## Publication and review workflow

1. Author content locally only after it is safe for public disclosure.
2. Validate it through Astro and the project-owned schema.
3. Commit it to a feature branch.
4. Review the change through a pull request.
5. Inspect the preview deployment.
6. Review content, attribution, links, accessibility concerns, and confidentiality.
7. Merge the approved change.
8. Publish it through the production build.

Exact CI, preview hosting, test, and link-check tools belong to later implementation or hosting decisions.

## Media policy

- Public-safe images, diagrams, and project screenshots may initially live in the repository.
- Prefer build-time processing for content images.
- Informative images require suitable alternative text; decorative treatment must be explicit. Store alternative text with content when an image has stable editorial meaning. Context-specific alternative treatment may remain in the consuming component when the same asset serves different purposes.
- Employer-confidential images and private source material must never enter the repository.
- PDFs and assets requiring stable public filenames may live in `public/`.
- Large video and unbounded media archives do not belong in Git.
- Adopt external storage or a CMS media library only after measured asset volume, transformation, reuse, or editorial requirements justify it.

## Localisation policy

Do not introduce localisation infrastructure in the MVP. Preserve a future path by using stable content IDs, keeping route slugs conceptually separate from identity, and avoiding assumptions in query and presentation code that make a second locale impossible. Do not create empty locale folders, duplicate fields, translated slugs, or fallback rules before translated content exists.

A future decision may select separate local files per locale or a CMS with field-level or document-level localisation, depending on real authoring, routing, translation, and publication requirements.

## Migration boundary

Astro loaders provide a useful source boundary, but they do not make CMS migration automatic. A migration may need explicit treatment of IDs, slugs, rich-text formats, references, assets, localisation, drafts, previews, webhooks, caching, API failures, exports, and rollback.

Future remote content must flow through a loader or adapter, be mapped and validated against project-owned internal schemas, and only then reach query modules and presentation code. Pages and components must not consume vendor-specific response types directly. A migration should include a complete export, route and relationship verification, a rollback path, and a separate architectural decision.

## Employment relevance

Headless CMS experience is relevant to modern frontend work, including content modelling, Storyblok, Contentful, Sanity, Strapi, GraphQL or REST integration, localisation, preview, and media workflows. That relevance does not justify an unused production dependency.

Demonstrating sound content modelling, schema design, validation, canonical ownership, portability, and a credible migration plan provides stronger engineering evidence than selecting a CMS solely to add an employment keyword.

## Consequences

### Positive

- Content is typed and structurally validated at build time.
- Markdown remains readable, portable, reviewable, and usable offline.
- Git provides history, branch review, preview integration, and rollback without another platform.
- Static builds have no remote content dependency or CMS runtime failure mode.
- Canonical entries can drive summaries and detail pages without duplicated content.
- The operational surface and direct cost remain small.
- Project-owned schemas and query modules establish a credible source-migration boundary.

### Negative

- Authors must be comfortable with Markdown, frontmatter, Git, and pull requests.
- Publication remains coupled to a code build and deployment.
- Invalid content can fail a build.
- Git is a limited media-management interface and repository size can grow.
- Drafts have no confidentiality boundary.
- There is no visual editor, role system, scheduled publishing, or real-time preview.
- A later CMS migration will still require explicit content and workflow conversion.

## Risks and mitigations

| Risk | Mitigation |
| --- | --- |
| Frontmatter becomes excessive | Keep concise metadata in frontmatter and narrative prose in the body |
| Schemas become too rigid | Validate stable structural contracts, not every editorial choice |
| Confidential content is committed | Complete public-safety and confidentiality review before commit |
| A draft flag is mistaken for privacy | Document that every committed file and asset is public |
| Canonical content is duplicated across pages | Derive previews and selections from one canonical entry |
| Speculative collections or relationships proliferate | Require independent content, reuse, or navigation before adding them |
| MDX becomes a presentation shortcut | Keep Markdown as the default and require an approved embedded-component need |
| Components depend on raw collection details | Centralise access and mapping in small query modules |
| Media causes repository growth | Optimise assets, prohibit large archives, and measure before externalising media |
| Localisation is designed prematurely | Preserve IDs and boundaries without adding unused locale infrastructure |
| Invalid entries break production builds | Run schema and production-build validation locally and in CI before merge |
| CMS migration cost is underestimated | Treat migration as explicit modelling, mapping, asset, workflow, and rollback work |
| A CMS is selected for perceived employability | Require a measured editorial or operational need |

## Validation

The initial implementation should validate only mechanisms required by approved content. A representative vertical slice must confirm:

- registration of each collection required by the approved implementation scope, initially expected to include `projects` and `experience` before MVP completion;
- project-owned schemas and at least one valid entry per implemented collection;
- a deliberately invalid fixture or automated test that proves build-time validation;
- a generated project-detail route and Markdown rendering;
- centralised visibility filtering where an approved visibility field exists, and centralised sorting;
- media and alternative-text handling where media exists;
- successful offline development and a successful production build;
- preview review through the normal pull-request workflow; and
- absence of a CMS, content API, database, and MDX integration unless separately approved.

Do not create artificial collections, relationships, content, or media solely to exercise an Astro API.

## Revisit this decision when

Review this ADR when any of the following is measured:

- non-technical editors contribute regularly;
- several authors need independent workflows;
- publication must occur independently from code deployment;
- live editorial preview or scheduled publishing becomes necessary;
- updates cannot wait for a rebuild;
- localisation becomes active;
- roles, permissions, approvals, or audit workflows are required;
- repository-based media becomes difficult to manage;
- content must serve multiple products;
- content volume or publishing frequency increases materially;
- Git-based authoring causes repeated errors or friction; or
- a CMS demonstrably reduces total maintenance cost.

A revisit does not automatically approve a remote CMS. It triggers a new project-specific comparison using measured editorial and operational requirements.

## References

### Astro and MDX

- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [Astro Content Loader API](https://docs.astro.build/en/reference/content-loader-reference/)
- [Astro Content Collections API](https://docs.astro.build/en/reference/modules/astro-content/)
- [Astro Markdown content](https://docs.astro.build/en/guides/markdown-content/)
- [Astro images in content collections](https://docs.astro.build/en/guides/images/#images-in-content-collections)
- [Astro JSON Schema generation](https://docs.astro.build/en/reference/experimental-flags/content-intellisense/)
- [MDX: What is MDX?](https://mdxjs.com/docs/what-is-mdx/)
- [MDX security guidance](https://mdxjs.com/docs/getting-started/#security)

### Git-based editors

- [Decap CMS overview](https://decapcms.org/docs/intro/)
- [Decap CMS editorial workflows](https://decapcms.org/docs/editorial-workflows/)
- [TinaCMS content modelling](https://tina.io/docs/schema/)
- [TinaCMS visual editing](https://tina.io/docs/visual-editing/overview/)

### Remote and self-hosted CMS platforms

- [Sanity content modelling](https://www.sanity.io/docs/content-lake/content-modelling)
- [Sanity validation](https://www.sanity.io/docs/studio/validation)
- [Contentful content modelling](https://www.contentful.com/developers/docs/concepts/data-model/)
- [Contentful localisation](https://www.contentful.com/developers/docs/tutorials/general/setting-locales/)
- [Storyblok visual editor](https://www.storyblok.com/docs/concepts/visual-editor)
- [Storyblok internationalisation](https://www.storyblok.com/docs/concepts/internationalization/)
- [DatoCMS content modelling](https://www.datocms.com/docs/content-modelling)
- [DatoCMS Astro visual editing](https://www.datocms.com/docs/astro/visual-editing)
- [Strapi content-type builder](https://docs.strapi.io/cms/features/content-type-builder)
- [Strapi internationalisation](https://docs.strapi.io/cms/features/internationalization)
- [Directus data model](https://directus.io/docs/guides/data-model/overview)
- [Directus schema](https://directus.io/docs/guides/migrations/schema)
- [Payload CMS overview](https://payloadcms.com/docs/getting-started/what-is-payload)
- [Payload CMS versions and drafts](https://payloadcms.com/docs/versions/overview)

### Accessibility

- [W3C Web Accessibility Initiative: images tutorial](https://www.w3.org/WAI/tutorials/images/)
