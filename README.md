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

Before running browser tests on a new machine, install the only browser used by the focused suite:

```sh
pnpm exec playwright install chromium
```

The other project commands are:

```sh
pnpm lint          # Lint Astro, TypeScript, and React source files
pnpm format:check  # Check source and Markdown formatting
pnpm format:write  # Format source and Markdown files
pnpm test          # Run the Vitest unit and component suite once
pnpm test:watch    # Run Vitest in watch mode during development
pnpm test:e2e      # Build the site and run focused Playwright browser tests
pnpm check         # Run Astro and TypeScript static checks
pnpm build         # Generate the static production output in dist/
pnpm preview       # Preview the production build locally
```

VS Code users are prompted to install the Astro, ESLint, and Prettier extensions. Prettier is the repository's only formatter and runs on save through the shared workspace settings; ESLint remains responsible for code-quality diagnostics.

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
│   ├── content/
│   └── product/
├── src/
│   ├── content/
│   ├── lib/content/
│   ├── content.config.ts
│   ├── env.d.ts
│   └── pages/
│       └── index.astro
├── tests/
│   └── setup.ts
├── .gitignore
├── .nvmrc
├── .prettierignore
├── .vscode/
│   ├── extensions.json
│   └── settings.json
├── astro.config.mjs
├── eslint.config.js
├── LICENSE
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── playwright.config.mjs
├── prettier.config.mjs
├── vitest.config.ts
└── README.md
```

- `docs/architecture/decisions/` stores architectural decision records.
- `docs/design/` stores design documentation and related resources.
- `docs/content/` stores public content-authoring guidance.
- `docs/product/` stores product requirements and planning documentation.
- `src/content/` stores canonical, public-safe Markdown for projects and experience.
- `src/lib/content/` maps Astro collection entries to presentation-facing models.
- `src/pages/` stores Astro routes; the initial route only verifies the framework foundation.
- `tests/setup.ts` configures shared DOM matchers and React Testing Library cleanup; behaviour tests stay beside the source they protect.
- `pnpm-workspace.yaml` records the root pnpm install policy, including the single approved dependency build script; it does not define a multi-package workspace.
- `.github/` stores repository collaboration templates and configuration.
- [`.github/LABELS.md`](.github/LABELS.md) documents the repository label taxonomy and usage rules.
- [Product vision](docs/product/product-vision.md) defines the portfolio purpose, target audience, professional positioning, and product boundaries.
- [Information architecture](docs/product/information-architecture.md) defines the portfolio sitemap, navigation hierarchy, visitor journeys, and MVP content structure.
- [Content strategy](docs/product/content-strategy.md) defines tone, professional-content guidelines, project and case-study structures, confidentiality rules, and language strategy.
- [Product success criteria](docs/product/product-success-criteria.md) defines the measurable communication, usability, accessibility, performance, content, maintainability, and production-readiness expectations for the portfolio.
- [Content authoring](docs/content/authoring.md) defines collection locations, frontmatter contracts, ordering, and the public-safety boundary.

## Architecture

- [High-level architecture](docs/architecture/high-level-architecture.md)
- [Architecture decision records](docs/architecture/decisions/README.md)
- [Testing conventions and responsibilities](docs/testing.md)

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
