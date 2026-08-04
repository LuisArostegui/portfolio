# ADR 0005: Use Cloudflare Workers Static Assets for hosting

- **Status:** Accepted
- **Date:** 2026-08-04
- **Decision owners:** Portfolio maintainer
- **Related issue:** [PT-12 — Evaluate hosting and deployment platform](https://github.com/LuisArostegui/portfolio/issues/15)
- **Related documentation:** [ADR 0001](0001-use-astro-as-the-primary-frontend-framework.md), [ADR 0002](0002-use-modern-css-as-the-primary-styling-strategy.md), [ADR 0003](0003-use-a-native-first-purpose-driven-animation-strategy.md), [ADR 0004](0004-use-git-versioned-astro-content-collections.md), and [product success criteria](../../product/product-success-criteria.md)

## Context

The portfolio is a primarily static Astro site generated from Git-versioned content and initially maintained by one developer. It must be publicly available under a custom domain, independently of the Synology NAS and home network. Pull-request previews are part of the review model established by ADR 0004, while the product success criteria require strong accessibility, performance, maintainability, privacy, reproducibility, production smoke testing, and a reasonable rollback path.

The hosting platform must support standard static files, GitHub-triggered builds, reviewable previews, managed HTTPS, global edge delivery, redirects, response headers, deployment history and logs, low and predictable operational cost, and a proportionate path to limited server functionality. It must not turn a possible future backend requirement into a server runtime, database, or provider-specific binding today.

The issue lists several products with materially different operating models. Edge-oriented static and serverless platforms include Cloudflare Workers, Vercel, and Netlify. AWS Amplify Hosting, Firebase Hosting, and Azure Static Web Apps are managed cloud static-hosting products. Render and Railway are general application platforms. Fly.io and a traditional VPS expose VM or container operations. GitHub Pages is repository-integrated static hosting. The Synology NAS is home infrastructure, while a cloud-production-plus-NAS arrangement separates public hosting from optional private staging. These categories are compared against the same product outcomes, but they should not be mistaken for interchangeable services.

Cloudflare Pages requires particular clarification. Pages remains functional and continues to provide Git integration, preview deployments, custom domains, Functions, redirects, and rollbacks. However, Cloudflare now recommends Workers Static Assets for new static sites and applications and states that new features and optimisations are focused on Workers. This ADR therefore evaluates Pages fairly but does not preserve the historical assumption that it is Cloudflare's preferred destination for a new static site. Workers Static Assets is not Pages, and the deprecated Workers Sites product is not considered for adoption.

## Assumptions

- The MVP is fully statically generated into `dist`.
- No persistent application server, database, server-side session, or dynamic rendering is required.
- Publishing may occur after an approved change is merged to `main`.
- Preview URLs may be public, but previews contain only public-safe data.
- The project does not currently require a contractual service-level agreement.
- Normal static deployment and traffic should remain within the selected platform's free allowances.
- The custom domain can use a Cloudflare-managed DNS zone; the registrar decision is separate.
- One maintainer needs a low-overhead Git-based workflow rather than a general infrastructure platform.
- Future dynamic capabilities require feature-specific approval and may trigger a separate architectural decision.
- Domain purchase, detailed CI tooling, analytics selection, and backend implementation remain outside this ADR.

## Decision drivers

The weights and scores are specific to this portfolio, not a universal hosting ranking. Scores use a five-point scale, where 1 is a poor fit and 5 is an excellent fit. Weighted totals are normalised to 100 and rounded.

| Criterion | Weight | Interpretation for this product |
| --- | ---: | --- |
| Static Astro compatibility | 10% | Deploy standard `dist` output without an application adapter or server |
| GitHub integration | 7% | Build automatically from the canonical repository and report useful status |
| Pull-request or branch previews | 9% | Produce isolated, reviewable deployments without changing production |
| Global CDN and edge delivery | 7% | Serve public assets close to visitors without operating an origin |
| Custom domains and TLS | 6% | Manage certificates and support one canonical production hostname |
| Redirects and response headers | 6% | Keep routing and security policy reviewable with the project |
| Rollback and versioning | 7% | Restore a known deployment without rebuilding it |
| Deployment logs and observability | 5% | Inspect builds, deployments, availability, and later runtime behaviour |
| Future serverless or edge functionality | 6% | Add small approved server features without replacing static delivery |
| Operational complexity | 9% | Remain proportionate for one maintainer and avoid server administration |
| Pricing predictability | 7% | Keep a static MVP inexpensive with understandable growth costs |
| Vendor coupling | 4% | Avoid requiring proprietary runtime or data services for the MVP |
| Privacy and data considerations | 4% | Permit public-safe previews and avoid unnecessary collection or processing |
| Portability of generated output | 5% | Retain deployable standard files and a credible migration path |
| Independence from the home network | 5% | Keep production, CI, previews, and recovery separate from the NAS |
| Suitability for one maintainer | 3% | Keep routine release and recovery understandable and supportable |

## Options considered

The matrix groups related criteria to remain readable. **Static** combines static Astro compatibility and output portability; **delivery** combines global edge delivery, custom domains, and TLS; **workflow** combines GitHub integration and previews; **control** combines redirects, headers, rollback, and versioning; **operations** combines logs, observability, operational complexity, and one-maintainer suitability; **evolution** covers future serverless or edge functionality; **cost** covers pricing predictability; and **risk** combines vendor coupling, privacy and data considerations, and independence from the home network. The underlying criterion weights above, rather than equal column weighting, determine the total.

| Option | Static | Delivery | Workflow | Control | Operations | Evolution | Cost | Risk | Total |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| **Cloudflare Workers Static Assets with Workers Builds** | 5 | 5 | 5 | 5 | 4 | 5 | 5 | 4 | **95** |
| Vercel | 5 | 5 | 5 | 5 | 5 | 5 | 4 | 4 | **91** |
| Netlify | 5 | 5 | 5 | 5 | 5 | 5 | 3 | 4 | **88** |
| Cloudflare Pages | 5 | 5 | 5 | 4 | 3 | 3 | 5 | 3 | **86** |
| Render Static Sites | 5 | 4 | 4 | 4 | 4 | 3 | 4 | 4 | **84** |
| Azure Static Web Apps | 4 | 5 | 5 | 4 | 4 | 5 | 4 | 3 | **79** |
| AWS Amplify Hosting | 4 | 5 | 5 | 4 | 4 | 5 | 3 | 3 | **78** |
| Firebase Hosting | 4 | 5 | 4 | 4 | 4 | 4 | 4 | 3 | **76** |
| GitHub Pages | 5 | 4 | 2 | 2 | 3 | 1 | 5 | 5 | **69** |
| Railway static hosting | 4 | 3 | 4 | 3 | 4 | 4 | 2 | 3 | **65** |
| Fly.io | 3 | 3 | 2 | 4 | 2 | 5 | 2 | 3 | **51** |
| Traditional VPS | 5 | 2 | 2 | 4 | 1 | 5 | 2 | 2 | **45** |
| Synology NAS self-hosting | 5 | 1 | 1 | 3 | 1 | 3 | 3 | 1 | **32** |

### Cloudflare Workers Static Assets with Workers Builds

Workers Static Assets is selected because Cloudflare recommends it for new projects instead of Pages. Astro can generate ordinary static files without `@astrojs/cloudflare`; Wrangler can point `assets.directory` at `./dist`; and a purely static deployment requires no Worker `main` entry point. Matching assets are served from Cloudflare's network without invoking Worker code. Static asset requests are currently free and unlimited, with no additional charge for static asset storage.

Workers Builds can connect the GitHub repository, run production and non-production commands, report build state on pull requests, and include preview links when a build creates a non-promoted version. At the time of this decision, the supported commands are normally `wrangler deploy` for production and `wrangler versions upload` for a non-production version. The implementation may use those commands or their supported successors; the architectural requirement is the distinction between promotion to production and creation of a previewable, non-promoted version. Versioned and branch-aliased preview URLs provide review environments on `workers.dev`. Deployments and versions provide a rollback mechanism. Custom Domains attach a hostname from a Cloudflare-managed zone and allow Cloudflare to manage its DNS record and certificate. `_headers` and `_redirects` keep supported response and routing rules with the static output.

The platform also preserves a proportionate evolution path. A later Worker could combine request-time logic with the same static assets, while assets continue to bypass the script by default. Until that happens, `dist` remains portable to another static host.

The disadvantages are explicit. A Custom Domain requires the domain to be in a Cloudflare-managed DNS zone. Preview URLs use `workers.dev` and are public when enabled unless a separate access policy is introduced. Cloudflare currently does not expose Workers Logs, `wrangler tail`, or Logpush for preview URLs. Future dynamic functionality would run in the Workers runtime rather than unrestricted Node.js, and D1, KV, R2, Durable Objects, or other bindings would increase lock-in. Workers Builds and Static Assets are newer than Pages, Vercel, and Netlify. Choosing Cloudflare alongside Astro's organisational relationship with Cloudflare also concentrates platform exposure, although static output and Astro's open-source implementation remain portable.

### Cloudflare Pages

Pages remains capable: it provides Git integration, previews, custom domains, Functions, redirects, headers, and deployment rollback. It is rejected for this new project because Cloudflare explicitly directs new static projects to Workers Static Assets and focuses new features and optimisations there. Pages' automatic preview `noindex` behaviour must not be assumed for Workers previews. Workers Sites is an older, deprecated architecture and is not an alternative.

### Vercel

Vercel is the strongest rejected alternative. It supports static Astro with minimal configuration, excellent GitHub previews, custom domains, managed HTTPS, instant rollback, Functions, analytics products, and an Astro adapter for dynamic rendering. It also has strong developer experience and employment relevance. It is rejected because this site gains little from Vercel-specific application capabilities, while Cloudflare provides a simpler static-asset cost model and a direct edge path for the small functions the portfolio might later need. Vercel would become more attractive if first-class preview ergonomics or Vercel-specific dynamic features outweighed that difference.

### Netlify

Netlify has mature Deploy Previews, branch deploys, atomic deployments, rollbacks, Functions, redirects, headers, Forms, custom domains, and direct Astro support. Its stable pull-request workflow is excellent. It is rejected because its current credit-based billing combines several usage categories into a less straightforward cost model for this portfolio, and Forms and its richer collaboration features are not current requirements.

### GitHub Pages

GitHub Pages is simple, has no direct hosting cost, integrates with GitHub Actions, and supports custom domains and HTTPS. It could serve the generated files. It is rejected because integrated per-pull-request environments, response-header control, deployment observability, rollback, redirects, and a future edge-function path would require more custom machinery or another service.

### AWS Amplify Hosting

Amplify Hosting provides Git integration, pull-request previews, CloudFront delivery, custom domains, managed certificates, redirects and rewrites, CloudWatch integration, and a path to AWS serverless services. These are transferable professional skills. It is rejected because the AWS configuration, service surface, and usage-based billing are disproportionate for one static portfolio and make accidental complexity and cost harder to reason about.

### Firebase Hosting

Firebase Hosting provides CDN delivery, SSL, custom domains, GitHub integration, preview channels, release history and rollback, and integration with Cloud Functions and Cloud Run. It is rejected because the Firebase project and preview-channel model offers no present advantage, while dynamic functions require a billing-enabled project and would couple the portfolio to an application backend ecosystem it does not need.

### Azure Static Web Apps

Azure Static Web Apps offers GitHub integration, pull-request environments, custom domains, SSL, Azure Functions, and integrated authentication. It is rejected because its strongest benefits apply to applications already using Azure identity, APIs, and operational tooling. Those capabilities add little to this static site.

### Render Static Sites

Render is a strong, relatively neutral alternative with free static hosting, CDN delivery, custom domains, TLS, headers, redirects, service previews, atomic deployments, and rollbacks. It is rejected because Cloudflare provides a more direct static-edge model and can add limited request logic in the same deployment unit, whereas Render's future compute would be another service type.

### Railway static hosting

Railway supports static hosting, custom domains, pull-request environments, deployment metrics, and Functions. It is rejected because it is primarily a general compute platform with subscription and usage billing, and its dedicated static workflow is comparatively new. That operating and pricing model is unnecessary for static files.

### Fly.io

Fly.io provides Machines, regional placement, custom domains, certificates, volumes, and substantial container control. It is rejected because static assets would fundamentally be served through managed compute or associated storage rather than a specialised static edge-hosting workflow. Machine lifecycle, regions, and capacity are avoidable operational concerns here.

### Traditional VPS

A VPS can serve `dist` and offers unrestricted software choices. It is rejected because the maintainer would own operating-system patching, the web server, certificates, firewall, monitoring, backups, deployment automation, availability, and a CDN strategy. Those responsibilities provide no product benefit for this site.

### Synology NAS self-hosting

The NAS can technically serve static files and support experiments with Nginx, Apache, Docker, HTTP configuration, and caching. It is rejected for production because public availability would depend on home power, connectivity, routing, hardware, and self-managed security. It cannot satisfy the requirement that the portfolio remain independent of the home network.

### Cloud production with optional NAS staging

This arrangement is accepted only as an optional development practice around the selected Cloudflare production architecture. The NAS may serve `dist` privately, support testing from home-network devices, or provide infrastructure-learning experiments. Cloudflare previews remain the canonical pull-request review environments. The NAS is never required to build, review, release, route, recover, or keep production available.

## Decision

Adopt **Cloudflare Workers Static Assets with Workers Builds** as the production hosting and deployment platform.

The initial architecture is:

- Astro generates a fully static `dist` directory.
- Workers Static Assets serves that directory from Cloudflare's network.
- No Worker script and no Cloudflare Astro adapter are introduced.
- Workers Builds connects the GitHub repository to Cloudflare.
- `main` is the production branch and promotes its successful static build to production, currently through `wrangler deploy` or its supported successor.
- Non-production branches create non-promoted Worker versions with preview URLs, currently through `wrangler versions upload` or its supported successor, and do not change production.
- Preview URLs are enabled for uploaded non-production versions.
- A later implementation attaches the approved production hostname through a Workers Custom Domain in a Cloudflare-managed DNS zone.
- Cloudflare manages TLS certificates for the Custom Domain.
- Wrangler and project-owned routing and header files version deployment policy in the repository.
- The Synology NAS is excluded from production availability, routing, failover, CI, previews, and deployment.

The exact domain, registrar, Wrangler compatibility date, CI checks, analytics product, and any future Worker implementation are intentionally not fixed here. The compatibility date belongs in real configuration and should advance through normal platform maintenance rather than becoming an ADR constant.

## Environment model

The deployment model uses these environment concepts without freezing their eventual hostnames:

- **Production:** the active deployment created from `main` and, before public launch, attached to the canonical custom domain.
- **Preview:** a public-safe, non-promoted version created from a non-production branch for pull-request review.
- **Local:** a developer-owned environment that builds and serves the standard static output without requiring Cloudflare.
- **Optional private NAS:** a private experimentation environment with no release, review, routing, or availability responsibility.

The NAS is deliberately not named or treated as staging because it is not an official promotion gate. Preview retention follows platform limits initially. Preview URLs and old versions must not be treated as permanent archival hosting; if retention later becomes an operational or compliance requirement, it needs an explicit policy and storage decision.

## Static deployment boundary

The initial deployment must not include:

- `@astrojs/cloudflare`;
- a Worker `main` script;
- Pages Functions;
- D1, KV, R2, Durable Objects, Queues, or another Cloudflare binding;
- server-side sessions;
- dynamic rendering; or
- an application API.

A future capability may introduce Worker code only for a concrete approved requirement. Platform capability alone is not justification.

## Preview and publication policy

Preview deployments are a required part of pull-request review. They support review of layout, responsive behaviour, navigation, content, accessibility, images, links, generated routes, metadata, redirects, headers, and actual production-build behaviour.

`main` is the only production branch. A non-production branch creates a version rather than a production deployment. Merging an approved pull request triggers the production build and deployment. Manual deployment from a developer workstation is not the normal release path. Branch protection and automated quality checks should gate merges when those checks are introduced, and a post-deployment smoke check must inspect the public site. The active production deployment is the only deployment attached to the production domain.

Preview URLs are public when enabled. They must not contain confidential content, production-only data, or secrets. Production and preview build variables may differ, preview analytics must not contaminate production analytics, and safe test integrations should be used where appropriate. Every Astro variable exposed to the client is public. Build secrets must never be rendered into HTML, JavaScript, source maps, or assets, and production credentials must not be exposed to previews without a demonstrated requirement.

Workers previews do not inherit Pages' automatic search-index protection. A project-owned `_headers` rule or equivalent must add `X-Robots-Tag: noindex` to versioned, branch, and technical `workers.dev` responses. The technical hostname must not compete with the canonical custom domain. Because preview logging is currently unavailable, review must rely on build output, browser diagnostics, and production-equivalent checks that do not require runtime preview logs; this limitation is a revisit trigger if previews later contain significant Worker logic.

## Domain and TLS policy

The registrar is outside this ADR. The selected production domain will use a Cloudflare DNS zone so that a Workers Custom Domain can manage its DNS record and certificate. Exactly one apex or `www` hostname is canonical; the alternate redirects to it. HTTPS is required, and `workers.dev` is not the public canonical URL.

HSTS should be enabled only after the canonical domain and every required subdomain are known to work over HTTPS. The final hostname must not be frozen until approved separately, and purchasing or configuring it is not part of this documentation change.

## Headers, redirects, and caching policy

Deployment configuration and supported asset-level security and routing rules must be versioned in the repository. Implementation must evaluate Content Security Policy, Referrer Policy, `X-Content-Type-Options`, Permissions Policy, framing protection, HSTS, and `X-Robots-Tag` for previews. A complete CSP is not fixed here because its valid sources depend on the eventual fonts, images, forms, analytics, and third-party integrations.

Redirects should enforce the canonical hostname where the chosen mechanism supports it, preserve old routes, handle approved slug changes, redirect technical hosts where appropriate, and prevent broken links. Astro generates real static routes, so the deployment must not add a single-page-application fallback rewrite. Cloudflare's static `_redirects` file does not support every domain-level policy; zone-level redirect configuration or another versioned project-owned mechanism may therefore be required for apex/`www` canonicalisation.

Generated HTML must remain safely revalidatable. Content-hashed scripts, styles, and images may use long-lived immutable caching. Unversioned files require conservative caching. Non-default cache rules must be validated against real production responses and must not make rollback or urgent content correction unreliable. Exact durations belong to implementation and performance validation.

DNS, Custom Domains, certificates, GitHub authorisation, Workers Builds permissions, protected variables, and some zone-level rules cannot necessarily be represented by `_headers`, `_redirects`, or Wrangler. Any required dashboard-only configuration must be documented with its purpose, owner, environment, and reproduction steps. Unrecorded dashboard changes are not permitted.

## Rollback policy

The platform must be able to restore a previous deployment version, and this procedure must be tested before launch. The static MVP is intentionally straightforward to roll back because it has no persistent state.

Rollback does not revert data in external services or future Cloudflare bindings. Any later data migration requires its own backward-compatibility and rollback strategy. After an emergency rollback, automatic deployment must not immediately republish the faulty commit; the change or deployment trigger must first be addressed.

## Observability policy

The initial hosting integration requires build logs, deployment status, version history, and the ability to inspect and roll back deployments. Before public launch, the operational baseline additionally requires a documented production smoke check, basic availability monitoring when included in launch scope, and representative production Core Web Vitals verification. Availability monitoring should originate outside Cloudflare when introduced so that it can detect failures affecting the hosting provider itself.

If Worker functions are introduced, they also require Workers Logs, error monitoring, invocation and latency metrics, controlled sampling, secret-safe logs, and alerts proportionate to the feature. Cloudflare Web Analytics may be evaluated separately as a privacy-conscious real-user monitoring option, but hosting on Cloudflare does not authorise analytics. Analytics remains subject to the project's privacy and analytics decisions.

## Future server functionality

A future Worker may be considered for a contact-form endpoint, spam protection, a small API, a secure third-party integration, conditional request headers, rate limiting, or limited Astro on-demand rendering. Such a change must solve an approved requirement; assess privacy, abuse, runtime compatibility, bundle size, requests, and cost; include validation and accessible error handling; use safe preview configuration; and provide observability.

It must not introduce a database or stateful Cloudflare service without a separate demonstrated need. Runtime secrets belong in Cloudflare's secret storage only after a Worker exists and must never be committed to Git or Wrangler configuration.

## Synology NAS policy

The NAS may optionally:

- serve the generated `dist` directory on a private network;
- support tests from different home-network devices;
- host experiments with Nginx, Apache, Docker, headers, or caching;
- rehearse self-hosted deployment; and
- support infrastructure learning.

The NAS must not be the production origin, a required staging gate, the canonical preview environment, a failover origin, a public DNS target, a duplicate public preview host, a CI or deployment dependency, or an environment represented as having production-equivalent availability. Production must remain available while it is offline.

## Employment relevance

Frontend roles may value AWS, Cloudflare, Vercel, Netlify, Azure, CDN delivery, DNS, TLS, CI/CD, observability, and cloud deployments. Provider keywords do not determine the architecture. The transferable evidence created by this decision is the evaluation of static versus compute boundaries, Git-based deployment, preview design, DNS, TLS, caching, headers, secrets, rollbacks, cost control, privacy, and observability.

## Consequences

### Positive

- Production is independent of the NAS and home network.
- Static hosting has no expected direct platform cost at current scale.
- GitHub branches produce reviewable version previews without changing production.
- Static output is delivered globally with managed TLS and custom-domain routing.
- Deployment and supported asset-level header and redirect configuration remain reviewable with the codebase; unavoidable account- and zone-level configuration is documented for reproduction.
- Version history makes the state-free MVP straightforward to roll back.
- The generated site remains portable to other static hosts.
- No application server runtime is introduced.
- Approved Worker functionality can be added incrementally without replacing static delivery.

### Negative

- The production domain's DNS zone must be managed through Cloudflare.
- Preview URLs use `workers.dev` and are public when enabled.
- Workers preview logging is currently limited.
- Workers-specific runtime features and bindings would increase lock-in.
- Future server code must conform to the Workers runtime.
- Production depends on Cloudflare's availability.
- Workers Builds and Static Assets are newer than established Pages, Vercel, and Netlify workflows.
- The NAS no longer provides public production-infrastructure experience; it remains an optional learning environment.

## Risks and mitigations

| Risk | Mitigation |
| --- | --- |
| Pages is selected from historical familiarity | Follow current Cloudflare guidance; identify Workers Static Assets explicitly in configuration and documentation |
| Astro and hosting concentrate exposure to Cloudflare | Preserve standard static output and prohibit provider bindings without an approved requirement |
| Search engines index preview or technical URLs | Add and verify `X-Robots-Tag: noindex`; keep one canonical custom domain |
| A build secret leaks into static output | Treat client variables as public, inspect output, restrict credentials, and never commit secrets |
| Preview code reaches production integrations | Separate build variables and use public-safe test integrations |
| Cloudflare DNS becomes a migration constraint | Keep registrar ownership separate and document DNS records and migration steps |
| A security-header change breaks the site | Version headers, introduce CSP deliberately, and validate production responses and user journeys |
| Stale caching hides a correction or rollback | Use hashed immutable assets, revalidatable HTML, and verify non-default cache rules |
| Rollback is assumed to restore external state | Keep the MVP state-free and require separate migration and compatibility plans for later state |
| Dashboard-only changes create configuration drift | Prefer Wrangler and project-owned files; record every unavoidable manual setting with its purpose, owner, environment, and reproduction steps; prohibit unrecorded dashboard changes |
| Dynamic services are added because they are available | Require a concrete feature, cost and privacy assessment, validation, and separate approval |
| Preview failures cannot be diagnosed through runtime logs | Use build logs and browser diagnostics; revisit the provider or access model if dynamic previews need logs |
| Functions or observability create unexpected cost | Keep the MVP static, monitor usage, and approve paid services deliberately |
| Analytics is enabled incidentally | Keep analytics outside this ADR and require a separate privacy decision |
| The NAS gradually becomes a release dependency | Make Cloudflare previews canonical and include NAS-offline availability in validation |

## Validation

### Initial hosting integration

The initial integration must confirm that:

- Astro produces a static `dist` build;
- the generated `dist` directory can be served through a standard local static server without Cloudflare-specific processing;
- no Cloudflare adapter or Worker script is required;
- Wrangler configuration is versioned;
- Workers Builds is connected to the GitHub repository;
- `main` builds and deploys to production;
- a non-production branch creates a non-promoted version and receives a preview URL;
- the preview status and link appear in GitHub;
- preview and technical `workers.dev` responses are marked `noindex`;
- the custom 404 page works without an SPA fallback;
- selected response headers are present and do not break required journeys;
- the deployment contains no Worker script, static asset routing requires no dynamic execution, and no binding or route forces Worker execution;
- a previous production version can be restored;
- build and deployment logs are available;
- production remains available while the NAS is offline; and
- no unapproved Worker, binding, database, API, analytics, or data-collection integration exists.

### Pre-launch validation

Before the public launch, validation must additionally confirm that:

- the approved custom domain resolves to the active production deployment;
- its TLS certificate is valid;
- the alternate apex or `www` hostname redirects to the canonical hostname;
- HSTS is enabled only if the domain and required subdomains are ready;
- a post-deployment smoke test passes;
- representative production pages meet the project's accessibility and performance checks; and
- external availability monitoring is configured when included in the launch scope.

Custom-domain, canonical-host, and final TLS validation are therefore launch requirements, not requirements of the initial hosting integration or this ADR-only change. Domain purchase and final domain configuration remain outside this change.

## Revisit this decision when

Review this ADR if:

- Cloudflare materially changes its product direction;
- Workers Static Assets or Workers Builds no longer meet project needs;
- the custom DNS zone cannot remain on Cloudflare;
- previews require more advanced isolation, access control, or runtime logs;
- private previews become necessary;
- the Workers runtime blocks a critical feature or unrestricted Node.js becomes necessary;
- the application requires substantial backend or persistent infrastructure;
- pricing becomes materially worse than credible alternatives;
- production logs or observability are insufficient;
- regulatory, privacy, or data-residency requirements change;
- a contractual SLA becomes necessary;
- dynamic requests dominate static delivery;
- the project becomes several independently deployed applications; or
- another provider demonstrably reduces total complexity or cost.

A revisit starts a new comparison using measured requirements and migration cost; it does not automatically trigger migration.

## References

### Selected platform

- [Cloudflare Workers best practices: use Workers Static Assets for new projects](https://developers.cloudflare.com/workers/best-practices/workers-best-practices/#use-workers-static-assets-for-new-projects)
- [Cloudflare Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/)
- [Cloudflare Workers Static Assets pricing](https://developers.cloudflare.com/workers/static-assets/#pricing)
- [Cloudflare Workers Builds](https://developers.cloudflare.com/workers/ci-cd/builds/)
- [Cloudflare Workers GitHub integration](https://developers.cloudflare.com/workers/ci-cd/builds/git-integration/github-integration/)
- [Cloudflare Workers preview URLs](https://developers.cloudflare.com/workers/versions-and-deployments/preview-urls/)
- [Cloudflare Workers versions and deployments](https://developers.cloudflare.com/workers/versions-and-deployments/)
- [Cloudflare Workers rollbacks](https://developers.cloudflare.com/workers/versions-and-deployments/rollbacks/)
- [Cloudflare Workers Custom Domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/)
- [Cloudflare Workers Static Assets headers](https://developers.cloudflare.com/workers/static-assets/headers/)
- [Cloudflare Workers Static Assets redirects](https://developers.cloudflare.com/workers/static-assets/redirects/)
- [Cloudflare Workers Static Assets routing](https://developers.cloudflare.com/workers/static-assets/routing/)
- [Cloudflare Pages to Workers migration guide](https://developers.cloudflare.com/workers/static-assets/migration-guides/migrate-from-pages/)
- [Astro static output](https://docs.astro.build/en/reference/configuration-reference/#output)
- [Astro deployment overview](https://docs.astro.build/en/guides/deploy/)

### Alternatives

- [Cloudflare Pages](https://developers.cloudflare.com/pages/)
- [Vercel deployments](https://vercel.com/docs/deployments)
- [Vercel Astro documentation](https://vercel.com/docs/frameworks/frontend/astro)
- [Netlify Deploy Previews](https://docs.netlify.com/deploy/deploy-types/deploy-previews/)
- [Netlify Astro integration](https://docs.netlify.com/build/frameworks/framework-setup-guides/astro/)
- [GitHub Pages](https://docs.github.com/en/pages)
- [AWS Amplify Hosting](https://docs.aws.amazon.com/amplify/latest/userguide/welcome.html)
- [Firebase Hosting](https://firebase.google.com/docs/hosting)
- [Azure Static Web Apps](https://learn.microsoft.com/en-us/azure/static-web-apps/overview)
- [Render static sites](https://render.com/docs/static-sites)
- [Railway static hosting](https://docs.railway.com/guides/static-hosting)
- [Fly.io apps](https://fly.io/docs/apps/)
- [Synology Web Station](https://www.synology.com/dsm/feature/web_station)
