# Continuous integration

## Automated quality gate

The `CI` workflow runs the `quality` job for pull requests targeting `main` and pushes to `main`. GitHub exposes this as the `CI / quality` check. A failed command fails that check; no step is allowed to continue after an error.

## Checks

The job installs pnpm 11.21.0 and Node.js 24.19.0, restores the pnpm store cache, and installs from `pnpm-lock.yaml` with `--frozen-lockfile`. It then runs Astro/TypeScript checks, linting, formatting verification, Vitest, the production build, generated-site validation, and Playwright's Chromium projects.

Generated-site validation checks only output internal routes, fragments, CSS URLs, and local assets. External HTTP(S) URLs are skipped to keep the quality gate deterministic.

## Run locally

```sh
pnpm install --frozen-lockfile
pnpm check
pnpm lint
pnpm format:check
pnpm test
pnpm build
pnpm test:site
pnpm exec playwright install chromium
pnpm exec playwright test
```

`pnpm test:e2e` remains the self-contained local shortcut that builds the site before running Playwright.

## Repository configuration

After the first successful workflow run, a repository administrator must require `CI / quality` in the `main` branch rule or ruleset. That GitHub setting is not stored in this repository.

## Manual responsibilities

CI provides repeatable automated evidence; it does not replace visual review, content-accuracy and confidentiality review, real keyboard and assistive-technology testing, focus review, touch testing, zoom and reflow checks, motion-comfort review, or WCAG conformance assessment. See [testing conventions and responsibilities](testing.md).
