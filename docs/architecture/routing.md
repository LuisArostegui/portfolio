# Routing and error handling

This document records the route contract that Direction B ([#120](https://github.com/LuisArostegui/portfolio/issues/120)) established and the rules for adding or removing routes. It covers [PT-50 (#89)](https://github.com/LuisArostegui/portfolio/issues/89). The site is static: Astro generates every page at build time ([ADR 0001](decisions/0001-use-astro-as-the-primary-frontend-framework.md)), and Cloudflare Workers Static Assets serves `dist/` ([ADR 0005](decisions/0005-use-cloudflare-workers-static-assets-for-hosting.md)). No Worker script runs, so every response comes from a generated file, `public/_redirects`, `public/_headers` or the asset handling configured in `wrangler.jsonc`.

## Route contract

| URL                                                         | Response                                           | Source                                                           |
| ----------------------------------------------------------- | -------------------------------------------------- | ---------------------------------------------------------------- |
| `/`                                                         | 200                                                | `src/pages/index.astro`                                          |
| `/#experience`, `/#work`, `/#about`, `/#contact`            | Home sections, not separate URLs                   | Section `id`s in `index.astro`                                   |
| `/#selected-experience`, `/#selected-projects`, `/#process` | Legacy anchors that land in the equivalent section | Alias `id`s on inner elements                                    |
| `/projects/<slug>/`                                         | 200 for every entry in the `projects` collection   | `src/pages/projects/[id].astro` (`getStaticPaths()`)             |
| `/accessibility/`                                           | 200                                                | `src/pages/accessibility.astro`                                  |
| `/projects`, `/projects/`                                   | 301 to `/#work`                                    | `public/_redirects`                                              |
| `/experience`, `/experience/`                               | 301 to `/#experience`                              | `public/_redirects`                                              |
| A page URL without its trailing slash                       | 307 to the URL with the slash                      | Cloudflare asset `html_handling` (default `auto-trailing-slash`) |
| An unknown slug or unknown path                             | 404 with the custom error page                     | `src/pages/404.astro` and `not_found_handling: "404-page"`       |

Canonical URLs always end with a slash, and the 404 page has no canonical (`src/lib/seo.ts`). Navigation links use the canonical form so that no internal link goes through the 307.

Production check on 2026-11-22 (current `workers.dev` host, `main` at 4ac09ed): every row above returned the listed status, with no redirect chain. `/404.html` itself returns 307 to `/404`. That is the asset handler normalising the file name and is not a route that visitors use. The same check must be repeated on the production origin if it changes.

## When to return 404

Return 404 when the requested resource does not exist: an unknown path, a slug with no collection entry, or a page that was removed without a direct replacement. The response must be a real 404 status with the custom page. A 200 response that only looks like an error (a soft 404) is not acceptable.

Because the build is static, Astro does not need `Response(404)` or `Astro.redirect()` at runtime. A route is missing when `getStaticPaths()` does not generate it, and Cloudflare then serves `404.html` with status 404. Inside a dynamic route, a missing entry is a build error (`[id].astro` throws), not a 404, because `getStaticPaths()` only passes ids that exist. Revisit this if a route ever moves to on-demand rendering.

The error page must not expose technical details, must have one H1, a skip link and links back to the home page and its sections, and must work without JavaScript.

## When to redirect

Redirect with 301 only when a URL that was published or shared has a direct replacement. The Direction B redirects are the reference case: the old index pages became home sections, so they point to the fragment for the equivalent section.

- Redirect to the final destination in one step. No chains.
- Do not redirect missing content to the home page or to a listing. That would hide the missing resource; return 404 instead.
- Add redirects to `public/_redirects` and cover them in `src/lib/redirects.test.ts`. Verify the served status and `Location` on a preview or in production; a local static server does not apply `_redirects`.
- The fragment is part of the `Location` value. Whether the browser lands on the right section must be checked in a browser, because HTTP tools do not follow fragments.

## Dynamic routes

`/projects/[id]` is the only dynamic route. Rules for it and for any future one:

- Generate pages from the content layer in `src/lib/content/`, never from a hand-written list.
- Every generated page must have approved, public-safe content. Do not generate placeholder pages to fill a structure.
- If a draft or unpublished state is introduced, apply the same rule to the route, the home page previews and the sitemap together. See the publication contract in [content authoring](../content/authoring.md#publication-contract).
- Keep the slug stable once published. If it must change, add a 301 from the old URL.

## Indexing

Search indexing depends on the response headers per host, not only on the page markup. `public/_headers` currently adds `X-Robots-Tag: noindex` to `https://:version.:subdomain.workers.dev/*`. That pattern also matches the current production host, so production is not indexable today. The production-origin decision is pending; until it is made, robots.txt and the sitemap ([#90](https://github.com/LuisArostegui/portfolio/issues/90), [#91](https://github.com/LuisArostegui/portfolio/issues/91)) stay unimplemented. See [delivery](../delivery.md#repository-configuration).
