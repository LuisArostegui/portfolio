# Delivery

## Responsibilities

The portfolio is a static Astro site. `pnpm build` generates the portable `dist` directory, and Cloudflare Workers Static Assets serves that directory without a Worker script, backend, binding, database, persistent state, or runtime environment variable.

GitHub Actions owns quality verification. The existing CI workflow runs checks, tests, builds the production output, validates generated links, and runs browser tests; it does not deploy. Cloudflare Workers Builds owns delivery and must not duplicate those quality checks.

The Synology NAS may serve a private local build for experiments. It is not staging and has no role in CI, previews, release, routing, rollback, failover, or production availability.

## Environments

| Environment | Purpose                         | Delivery behaviour                                                                     |
| ----------- | ------------------------------- | -------------------------------------------------------------------------------------- |
| Local       | Developer validation            | Build and serve standard `dist`; Cloudflare is not required.                           |
| Preview     | Public-safe pull-request review | A non-production branch produces a non-promoted Worker version and public preview URL. |
| Production  | Public visitor delivery         | A build from `main` creates the active production deployment.                          |
| Private NAS | Optional local experiment       | May serve `dist` privately; never participates in the canonical release path.          |

`main` is the only production branch. A preview is never promoted: merging an approved pull request creates a new `main` revision, which Workers Builds rebuilds and deploys independently.

Preview URLs are public. Commit only public-safe material and do not expose secrets, production-only data, or confidential evidence in preview builds. The application currently requires no build variables, runtime variables, or secrets.

## Repository configuration

`wrangler.jsonc` configures the assets-only Worker named `luis-arostegui-portfolio`. It points `assets.directory` to `./dist`, uses `404-page` handling for a static-site 404, and enables technical `workers.dev` and preview URLs. It intentionally has no `main`, compatibility flags, bindings, routes, or environment sections.

Wrangler is an exact project development dependency. Cloudflare Workers Builds uses that reviewed repository version rather than a globally installed CLI. `workerd` is explicitly disabled in `pnpm-workspace.yaml`: it is not required for the static build/deploy flow and this project does not use local Worker development.

`public/_headers` is copied into `dist/_headers` by Astro. Its hostname-scoped rule is:

```text
https://:version.:subdomain.workers.dev/*
  X-Robots-Tag: noindex
```

This is Cloudflare's documented pattern for preventing versioned and technical `workers.dev` URLs from being indexed. It does not match a future canonical custom domain, which remains indexable by default. Do not replace it with a global `/*` rule.

`_redirects` is intentionally absent. No approved redirect requirement or canonical hostname exists, and the static site must not receive an SPA fallback.

## Cloudflare Workers Builds setup

The maintainer must authenticate in Cloudflare and configure the Workers project. These account-owned settings are not committed to the repository:

| Setting                             | Value                                |
| ----------------------------------- | ------------------------------------ |
| Worker                              | `luis-arostegui-portfolio`           |
| Git repository                      | This GitHub repository               |
| Production branch                   | `main`                               |
| Builds for non-production branches  | Enabled                              |
| Build command                       | `pnpm build`                         |
| Production deploy command           | `pnpm exec wrangler deploy`          |
| Non-production deploy command       | `pnpm exec wrangler versions upload` |
| Preview URLs                        | Enabled                              |
| Build/runtime variables and secrets | None                                 |

The GitHub connection, Cloudflare authentication or build token, build logs, deployment history, and rollback controls remain Cloudflare-owned. Do not add account IDs, tokens, or secrets to the repository.

Custom domains, DNS, certificates, canonical-host redirects, analytics, and any runtime service require separately approved work.

## Local validation

Run the normal repository checks before delivery work:

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

To prove `dist` remains portable outside Cloudflare, serve it with an ordinary static server after building:

```sh
python -m http.server 4173 --directory dist
```

Open the generated routes and an unknown route in a browser. This checks the ordinary static-server path; `astro preview` may be used as a convenience check but does not replace it.

Validate the repository-owned deployment configuration without publishing:

```sh
pnpm exec wrangler deploy --dry-run
```

Confirm that `dist/_headers` exists and contains the scoped `workers.dev` rule after each production build.

## Preview and production verification

For a public-safe non-production branch, confirm in Workers Builds that the build runs `pnpm build` and `pnpm exec wrangler versions upload`, reports a preview URL, and does not change the active production deployment. Request the preview URL and confirm its `X-Robots-Tag` response header is `noindex`.

After an approved merge to `main`, confirm that Workers Builds runs `pnpm build` and `pnpm exec wrangler deploy`, creates a new active production version, exposes build/deployment logs, and appears in deployment history. Run a production smoke check against the active public URL. Production and previews must remain available with the NAS offline.

## Rollback

Before launch, rehearse rollback with a known prior production version:

1. In Cloudflare, go to **Workers & Pages** and select `luis-arostegui-portfolio`.
2. Open **Deployments**.
3. Select a prior production version and choose **Rollback**.
4. Confirm Cloudflare creates a new active deployment using that version.
5. Rerun the production smoke check and record the version identifiers, date, result, and maintainer in the team operational record.

Rollback restores a Cloudflare deployment version. It does not make the NAS part of recovery and cannot roll back future external data or bindings; neither exists in this static MVP.
