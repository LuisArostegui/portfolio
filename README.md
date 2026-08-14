# Portfolio

This repository contains the source, product documentation, design resources, and architectural decisions for a personal portfolio. The project will showcase professional experience, selected projects, and software engineering practices.

The application uses Astro with static output, strict TypeScript, and React prepared for future interactive islands. pnpm is the canonical package manager.

## Local development

Use Node.js 24.19.0 and pnpm 11.21.0. The Node version is recorded in `.nvmrc`, and the pnpm version is pinned through the `packageManager` field in `package.json`.

After installing the supported Node.js version, enable Corepack once so it can provide the pinned pnpm version:

```sh
corepack enable
```

Install dependencies and start the local development server:

```sh
pnpm install
pnpm dev
```

The other project commands are:

```sh
pnpm check    # Run Astro and TypeScript static checks
pnpm build    # Generate the static production output in dist/
pnpm preview  # Preview the production build locally
```

Commit only `pnpm-lock.yaml`; do not create or commit lockfiles from other package managers.

## Repository structure

```text
.
├── .github/
│   ├── ISSUE_TEMPLATE/
│   ├── LABELS.md
│   └── pull_request_template.md
├── docs/
│   ├── architecture/
│   │   ├── high-level-architecture.md
│   │   └── decisions/
│   │       ├── README.md
│   │       ├── template.md
│   │       └── 0001-... through 0006-...
│   ├── design/
│   └── product/
├── src/
│   ├── env.d.ts
│   └── pages/
│       └── index.astro
├── .gitignore
├── .nvmrc
├── astro.config.mjs
├── LICENSE
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
└── README.md
```

- `docs/architecture/decisions/` stores architectural decision records.
- `docs/design/` stores design documentation and related resources.
- `docs/product/` stores product requirements and planning documentation.
- `src/pages/` stores Astro routes; the initial route only verifies the framework foundation.
- `pnpm-workspace.yaml` records the root pnpm install policy, including the single approved dependency build script; it does not define a multi-package workspace.
- `.github/` stores repository collaboration templates and configuration.
- [`.github/LABELS.md`](.github/LABELS.md) documents the repository label taxonomy and usage rules.
- [Product vision](docs/product/product-vision.md) defines the portfolio purpose, target audience, professional positioning, and product boundaries.
- [Information architecture](docs/product/information-architecture.md) defines the portfolio sitemap, navigation hierarchy, visitor journeys, and MVP content structure.
- [Content strategy](docs/product/content-strategy.md) defines tone, professional-content guidelines, project and case-study structures, confidentiality rules, and language strategy.
- [Product success criteria](docs/product/product-success-criteria.md) defines the measurable communication, usability, accessibility, performance, content, maintainability, and production-readiness expectations for the portfolio.

## Architecture

- [High-level architecture](docs/architecture/high-level-architecture.md)
- [Architecture decision records](docs/architecture/decisions/README.md)

## Agent guidance

- [Agent guidance](docs/architecture/agent-guidance.md) defines the repository-specific agent configuration, curated skills, source policy, and maintenance approach.
- [AGENTS.md](AGENTS.md) provides the concise instructions that apply to every repository task.

## Design

- [Design principles and visual direction](docs/design/design-principles.md)
- [Responsive wireframes](docs/design/responsive-wireframes.md)
- [Design foundations and token system](docs/design/design-foundations.md)
- [Component foundations and accessibility states](docs/design/component-foundations.md)
- [Motion and interaction guidelines](docs/design/motion-interaction-guidelines.md)
- [Home high-fidelity design](docs/design/home-design.md)
- [Projects and project-detail high-fidelity design](docs/design/projects-design.md)
- [Experience and shared navigation high-fidelity design](docs/design/experience-navigation-design.md)
- [Interactive prototype and interaction contract](docs/design/interactive-prototype.md)
- [Design validation and implementation handoff](docs/design/design-validation-handoff.md)

## Git workflow

1. Create a branch from the latest `main` using a descriptive name such as `feature/<issue>-short-description`, `fix/<issue>-short-description`, or `chore/<issue>-short-description`.
2. Keep commits focused and write imperative commit messages that explain the change.
3. Open a pull request into `main`, link the related issue, and complete the pull request template.
4. Request review and address feedback before merging.
5. Use squash merging to keep the `main` branch history concise, and delete the branch after merging.

Do not commit generated output, installed dependencies, secrets, local environment files, or editor-specific settings.
