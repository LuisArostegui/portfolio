# Portfolio

This repository contains the source, product documentation, design resources, and architectural decisions for a personal portfolio. The project will showcase professional experience, selected projects, and software engineering practices.

Application code and framework dependencies have intentionally not been added yet. The initial repository establishes a clean foundation for future development.

## Repository structure

```text
.
├── .github/
│   ├── ISSUE_TEMPLATE/
│   ├── LABELS.md
│   └── pull_request_template.md
├── docs/
│   ├── architecture/
│   │   └── decisions/
│   ├── design/
│   └── product/
├── .gitignore
├── LICENSE
└── README.md
```

- `docs/architecture/decisions/` stores architectural decision records.
- `docs/design/` stores design documentation and related resources.
- `docs/product/` stores product requirements and planning documentation.
- `.github/` stores repository collaboration templates and configuration.
- [`.github/LABELS.md`](.github/LABELS.md) documents the repository label taxonomy and usage rules.
- [Product vision](docs/product/product-vision.md) defines the portfolio purpose, target audience, professional positioning, and product boundaries.

## Git workflow

1. Create a branch from the latest `main` using a descriptive name such as `feature/<issue>-short-description`, `fix/<issue>-short-description`, or `chore/<issue>-short-description`.
2. Keep commits focused and write imperative commit messages that explain the change.
3. Open a pull request into `main`, link the related issue, and complete the pull request template.
4. Request review and address feedback before merging.
5. Use squash merging to keep the `main` branch history concise, and delete the branch after merging.

Do not commit generated output, installed dependencies, secrets, local environment files, or editor-specific settings.
