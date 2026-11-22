# Production security headers

This document records the HTTP response-header policy for the portfolio on Cloudflare Workers Static Assets ([ADR 0005](architecture/decisions/0005-use-cloudflare-workers-static-assets-for-hosting.md)): what is served today, what Cloudflare adds, what is proposed, and how to verify it. It answers the evaluation that ADR 0005 requires for Content Security Policy, Referrer Policy, `X-Content-Type-Options`, Permissions Policy, framing protection, HSTS and `X-Robots-Tag`.

The site is a public static portfolio: no forms, accounts, cookies, analytics, third-party scripts or user data. The policy is therefore small and aimed at defence in depth, not at protecting sensitive state.

## Current policy

Headers are applied by `public/_headers`, which Astro copies to `dist/_headers` and Cloudflare applies to static-asset responses. It contains only crawl control, in this order ([ADR 0008](architecture/decisions/0008-use-the-production-workers-dev-host-as-the-v1-canonical-origin.md), [delivery](delivery.md#repository-configuration)):

```text
https://:version.:subdomain.workers.dev/*
  X-Robots-Tag: noindex

https://luis-arostegui-portfolio.luisarosteguiruizit.workers.dev/*
  ! X-Robots-Tag
```

The first rule adds `X-Robots-Tag: noindex` to every `workers.dev` host, including previews; the second removes it for the production host, which is the canonical origin. `src/lib/crawl.test.ts` asserts these two rules and their order. No security header is set by the project today.

### What Cloudflare adds

Observed on 2026-11-22 on production (`/`, the case study, a CSS file, a font, the CV, `robots.txt`, a 404 and the `/projects` redirect) and on two preview URLs:

| Header                                           | Value or behaviour                                                             |
| ------------------------------------------------ | ------------------------------------------------------------------------------ |
| `cache-control`                                  | `public, max-age=0, must-revalidate` on every asset, hashed ones included      |
| `etag`                                           | Present on assets                                                              |
| `content-encoding`                               | `zstd` for text when the client accepts it                                     |
| `nel`, `report-to`                               | Cloudflare Network Error Logging to `a.nel.cloudflare.com`, success fraction 0 |
| `server`, `cf-ray`, `cf-cache-status`, `alt-svc` | Platform identification, caching and HTTP/3 advertisement                      |
| `x-robots-tag`                                   | `noindex` on previews only, from `_headers`                                    |

Cloudflare adds no `Content-Security-Policy`, `Referrer-Policy`, `X-Content-Type-Options`, `Permissions-Policy`, `X-Frame-Options` or `Strict-Transport-Security` to Workers static assets.

**HTTPS.** A plain `http://` request to the production host is answered with 200 rather than redirected. Browsers never make that request, because the whole `.dev` top-level domain is on the browsers' HSTS preload list and they upgrade to HTTPS before connecting. HSTS is therefore already enforced for real visitors on `workers.dev`; a project `Strict-Transport-Security` header would add nothing there. A future custom domain would need Cloudflare's **Always Use HTTPS** and an HSTS header, decided with that domain.

## Evaluation

| Header                    | Recommendation                                                                                    | Why                                                                                                                                                                                                                                  |
| ------------------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `X-Content-Type-Options`  | `nosniff`                                                                                         | Stops browsers from treating a file as a type other than the one Cloudflare declares. Cloudflare sends correct types for every asset observed, so there is no compatibility cost.                                                    |
| `Referrer-Policy`         | `strict-origin-when-cross-origin`                                                                 | Outbound links (GitHub, LinkedIn, evidence links) receive only the origin, never the path. It is already the default in current browsers; setting it makes the behaviour explicit and independent of browser defaults.               |
| `Permissions-Policy`      | `camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()`                | Disables powerful features the site does not use, for the page and any frame. It deliberately does not restrict `clipboard-write`, which the Contact section's copy-address button uses. Keep the list short rather than exhaustive. |
| Framing protection        | `Content-Security-Policy: frame-ancestors 'none'` plus `X-Frame-Options: DENY` for older browsers | The portfolio has no reason to be embedded; this prevents clickjacking-style framing.                                                                                                                                                |
| CSP baseline              | `object-src 'none'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'`                  | Closes plugin content, `<base>` injection and form submission, and carries the framing rule. It does not restrict scripts or styles, so it has no dependency on build output and cannot break when Astro's output changes.           |
| Full script and style CSP | Not now; see [the follow-up](#full-content-security-policy)                                       | It needs a hash for the inline script and inline styles that change with every relevant code change.                                                                                                                                 |
| HSTS                      | None on `workers.dev`                                                                             | Already enforced by the `.dev` preload list, see above.                                                                                                                                                                              |
| `X-Robots-Tag`            | Unchanged                                                                                         | Already handled by the two crawl rules.                                                                                                                                                                                              |

### Proposed `_headers` addition

The proposal is a third rule that applies to every host, appended after the two crawl rules so their order is unchanged:

```text
/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()
  X-Frame-Options: DENY
  Content-Security-Policy: object-src 'none'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'
```

It is not deployed by this document. Adding it requires updating `src/lib/crawl.test.ts`, which asserts exactly two rules, so that it still checks the two crawl rules first and in order.

### Evidence gathered so far

The headers above were tested in Chromium (Playwright, emulated Pixel 7) by intercepting the production responses for `/`, `/projects/portfolio-foundation/`, `/accessibility/` and a 404, adding the headers to each response and collecting `securitypolicyviolation` events and console errors. This is local browser evidence against the production build, not a deployed preview.

| Variant                                                                             | Result                                                                                                                                                                                                                        |
| ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Proposed rule (baseline CSP + the four other headers)                               | No violations or errors. The header menu enhancement ran and the menu opened, the copy-address button was enabled, both fonts loaded, the JSON-LD parsed and `view-transition-name` was applied.                              |
| Full CSP with `script-src 'self' 'sha256-…'` and `style-src 'self' 'unsafe-inline'` | No violations on any of the four pages.                                                                                                                                                                                       |
| Same, with `style-src 'self'`                                                       | Violations: the inline `style="view-transition-name: …"` attribute on the Work card and the case H1 (`style-src-attr`), and the inline `<style>` block Astro emits for the accessibility page and the 404 (`style-src-elem`). |
| Same, with `script-src 'self'` and no hash                                          | Violation on every page: the inline header script is blocked and the compact navigation is not enhanced.                                                                                                                      |

JSON-LD (`<script type="application/ld+json">`) is a data block, not executed script, and is not affected by `script-src`.

## Full Content Security Policy

A CSP that restricts scripts and styles is a follow-up, not part of the proposed rule, because the generated output contains:

- one inline module script, the site header's menu enhancement, identical on every page today (`sha256-ccr3hYn1VAzrq177bhE28ktIiIsSvpCh/StgXxfDDFg=` at `6deb375`). Its hash changes whenever that script or Astro's bundling of it changes;
- inline `<style>` blocks for pages whose CSS Astro inlines (the accessibility statement and the 404), whose hashes change with the CSS; and
- a `style` attribute carrying `view-transition-name` on the Work card and the case H1.

A hand-maintained hash in `_headers` would break the menu silently whenever the script changed. The follow-up should therefore evaluate Astro's built-in `security.csp` option, which computes script and style hashes at build time and writes them into a per-page `<meta http-equiv="content-security-policy">`, and keep `frame-ancestors` (which a meta CSP cannot set) in the header. The evaluation must cover the inline style attribute, start with `Content-Security-Policy-Report-Only` on a preview, and include the passing browser suite before anything is enforced in production.

## How to verify

Response headers (repeat for the case study, a hashed asset, the CV and a 404):

```sh
curl -sS -o /dev/null -D - https://luis-arostegui-portfolio.luisarosteguiruizit.workers.dev/
```

On production, expect no `x-robots-tag`. Once the proposed rule is deployed, also expect the five security headers exactly as written above.

Find a preview URL in the **Workers Builds: luis-arostegui-portfolio** check of the pull request (it lists a version URL and a branch alias URL), then:

```sh
curl -sS -o /dev/null -D - https://<version-or-branch>-luis-arostegui-portfolio.luisarosteguiruizit.workers.dev/
```

On a preview, expect `x-robots-tag: noindex`, and the same security headers as production once the rule is deployed.

In a browser, open each page with DevTools **Console** and confirm there are no Content Security Policy messages, that the compact navigation opens at a mobile width, and that the copy-address button copies the address.

## Follow-up work

1. **Apply the proposed `_headers` rule.** Update `src/lib/crawl.test.ts`, deploy to a preview, verify with the commands above and the browser checks, then merge. Low risk: the evidence above shows no effect on the generated pages.
2. **Evaluate a full CSP** with Astro `security.csp`, in Report-Only on a preview first, as described above.
3. **Revisit with a custom domain:** Always Use HTTPS, HSTS (and whether to preload), and whether the `workers.dev` host should redirect.
4. **Caching (performance, not security).** Every asset, including content-hashed files under `/_astro/`, is served with `max-age=0, must-revalidate`. ADR 0005 allows long-lived immutable caching for hashed files; a separate change could add `Cache-Control: public, max-age=31536000, immutable` for `/_astro/*` after checking real production responses and rollback.

Any added third-party resource (analytics, embeds, external fonts) would need its own CSP and Permissions-Policy review before it is introduced.
