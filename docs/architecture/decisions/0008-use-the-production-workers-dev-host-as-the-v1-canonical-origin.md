# ADR 0008: Use the production workers.dev host as the v1 canonical origin

- **Status:** Accepted
- **Date:** 2026-11-22
- **Decision owners:** Portfolio maintainer
- **Related issue:** [PT-66 — Index production on workers.dev and keep previews out of the index](https://github.com/LuisArostegui/portfolio/issues/124)
- **Related documentation:** [ADR 0005](0005-use-cloudflare-workers-static-assets-for-hosting.md) (amended by this record), [delivery](../../delivery.md), and [routing and error handling](../routing.md)

## Context

ADR 0005 assumes a custom domain in a Cloudflare DNS zone and states that `workers.dev` is not the public canonical URL. No domain has been chosen, and the maintainer decided to launch v1 without one.

The site already declares `https://luis-arostegui-portfolio.luisarosteguiruizit.workers.dev` as its origin in canonical URLs, Open Graph and JSON-LD (`src/lib/siteMetadata.ts`). The `_headers` rule from ADR 0005, `https://:version.:subdomain.workers.dev/*`, adds `X-Robots-Tag: noindex`. A hostname placeholder matches one DNS label, so the rule matches the production host as well as the preview hosts. On 2026-11-22 every production page returned 200 with `noindex`, so the portfolio could not be indexed.

## Decision drivers

- Publish an indexable portfolio now, without waiting for a domain.
- Keep preview and version URLs out of search results, as ADR 0005 requires.
- Keep one origin in canonical URLs, social metadata, structured data, the sitemap and `robots.txt`.
- Stay static: no Worker script and no new dependency.

## Options considered

- **Wait for a custom domain.** This matches ADR 0005, but keeps the portfolio out of search results for an undefined time.
- **Remove the `noindex` rule.** Production becomes indexable, but previews do too, which ADR 0005 forbids.
- **Keep the broad rule and detach the header for the exact production host.** Cloudflare's `_headers` supports `! X-Robots-Tag` to remove a header that an earlier, broader rule added. Version and alias preview URLs (`<prefix>-luis-arostegui-portfolio.<subdomain>.workers.dev`) do not match the exact host and keep `noindex`.

## Decision

For v1, the canonical origin is `https://luis-arostegui-portfolio.luisarosteguiruizit.workers.dev`. This amends the domain policy of ADR 0005. Everything else in ADR 0005 stays in force.

- `public/_headers` keeps the broad `workers.dev` `noindex` rule, followed by a rule for the exact production host that detaches `X-Robots-Tag`. The detach must come after the broad rule, because it only removes headers that earlier rules added.
- `siteMetadata.siteUrl` is the single source of the origin. `robots.txt` and `sitemap.xml` are generated from it at build time.

## Consequences

### Positive

- Production can be indexed as soon as this is deployed, with no DNS or certificate work.
- Previews stay excluded with the rule ADR 0005 already validated.

### Negative

- Moving to a custom domain later is a URL migration. Shared links and indexed URLs point to `workers.dev`, and Workers Static Assets cannot redirect from one host to another without a Worker script or a zone-level rule.
- The production host name, which includes the account subdomain, is written in `_headers` and in `siteMetadata`. Renaming the Worker or the account subdomain changes the origin.

## Risks and mitigations

- **A preview loses `noindex`.** A unit test checks that the broad rule comes first and that the detach rule names exactly the production host. Each release checks the header on a preview URL.
- **The detach rule stops matching production.** The test compares the host in `_headers` with `siteMetadata.siteUrl`, and the release check requests production pages and looks for the absence of `noindex`.

## Validation requirements

After deployment, record in [#70](https://github.com/LuisArostegui/portfolio/issues/70):

- Production `/`, the case study and `/accessibility/` return 200 without `X-Robots-Tag: noindex`.
- A version or alias preview URL returns `X-Robots-Tag: noindex`.
- `/robots.txt` allows crawling and names the sitemap; every URL in `/sitemap.xml` matches the canonical of its page.

## Revisit conditions

- A custom domain is chosen. A new decision then covers the migration from `workers.dev`, including redirects for shared links.
- Cloudflare changes how `_headers` matches hosts or detaches headers.
- The Worker or the account subdomain is renamed.

## References

- [Cloudflare Workers Static Assets: headers](https://developers.cloudflare.com/workers/static-assets/headers/)
- [Cloudflare Workers: version URLs](https://developers.cloudflare.com/workers/configuration/previews/)
