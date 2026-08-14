# Dependency updates

## Purpose and scope

GitHub Dependabot is the repository mechanism for proposing package updates during the MVP. It monitors the root `package.json` and the canonical `pnpm-lock.yaml`; it does not add a maintenance platform, runtime service, or package registry configuration.

## Schedule and grouping

Dependabot checks for version updates every Monday.

- Patch and minor updates are grouped into one `routine` pull request when possible.
- Major updates remain individual pull requests so that compatibility changes are reviewed independently.
- At most two version-update pull requests may remain open at once. Security update pull requests are not counted by that limit and are handled with priority.

The repository keeps Dependabot's default labels and branch naming. No automatic merge is configured.

## Review and validation

Treat every Dependabot pull request as a normal repository change.

1. Review the manifest and lockfile changes and the release notes or changelog relevant to the update.
2. For a major update, confirm compatibility with the supported Node.js and pnpm versions and with Astro, React, or the affected tooling.
3. Require the normal `CI / quality` check to pass before merging. It runs static checks, linting, formatting verification, unit and component tests, the production build, generated-site validation, and Playwright checks.
4. Perform any focused manual validation warranted by the changed package. Automated checks do not replace the manual responsibilities described in [testing conventions and responsibilities](testing.md).

## Deferral and manual handling

Defer an update only when it has an explicit reason: an incompatible change, a required Node.js or pnpm upgrade, a reproducible failure, an unresolved upstream issue, or a pending product or architectural decision.

Leave a pull-request comment that records the reason and the condition for revisiting it. Do not add a permanent ignore rule for a package merely to reduce noise. A security update that cannot be merged normally must be assessed and handled manually with priority.
