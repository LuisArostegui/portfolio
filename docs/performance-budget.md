# Performance budget

This budget turns the static-first architecture ([ADR 0001](architecture/decisions/0001-use-astro-as-the-primary-frontend-framework.md), [high-level architecture](architecture/high-level-architecture.md)) and the [performance success criteria](product/product-success-criteria.md#10-performance-criteria) into limits that a change can be checked against. It is a guardrail, not a score to chase: the limits sit just above what the site sends today, so a change that crosses one is visible and has to be justified.

The budget covers the two pages that the success criteria name: Home (`/`) and the representative case study (`/projects/portfolio-foundation/`). `/projects` and `/experience` are redirects and are not measured.

## Baseline (2026-11-22)

Measured on `main` at `6deb375`, whose asset hashes match the deployed production build. "Requested" means the browser fetched it during the page load and a full scroll to the bottom of the page. The sizes of files in `dist/` that no page requests are not part of the budget.

### Requested resources per page

Uncompressed bytes are the files the local production build serves. Transferred bytes are what Chromium reported on production (`https://luis-arostegui-portfolio.luisarosteguiruizit.workers.dev/`), with Cloudflare's zstd compression for text; they include a small amount of HTTP/2 framing, which is why a 24,836-byte font is reported as about 25.4 KB.

| Resource                       | Home files | Home uncompressed | Home transferred | Case files | Case uncompressed | Case transferred |
| ------------------------------ | ---------: | ----------------: | ---------------: | ---------: | ----------------: | ---------------: |
| HTML document                  |          1 |          19,758 B |           5.6 KB |          1 |          13,222 B |           4.5 KB |
| CSS                            |          2 |          30,399 B |           7.3 KB |          2 |          23,403 B |           6.1 KB |
| JavaScript, external           |          2 |           1,424 B |           1.7 KB |          2 |             941 B |           1.5 KB |
| JavaScript, inline in the HTML |          1 |           1,120 B |    (in the HTML) |          1 |           1,120 B |    (in the HTML) |
| Fonts (WOFF2)                  |          2 |          39,544 B |          40.6 KB |          2 |          39,544 B |          40.6 KB |
| Images                         |          0 |               0 B |              0 B |          0 |               0 B |              0 B |
| **Total requests / transfer**  |      **7** |                   |      **55.2 KB** |      **7** |                   |      **52.7 KB** |

The values were the same in a desktop and an emulated Pixel 7 context. Every request is same-origin; there are no third-party requests. The JavaScript is the site header's menu enhancement (inline module script), the current-section indicator shared chunk, and a small page entry (Home also enhances the copy-address button). The JSON-LD block is data, not executed script, and counts as part of the HTML. The `social-preview.png` image is only referenced by Open Graph metadata and is not requested by the page.

### The unreferenced React client bundle

`dist/_astro/client.*.js` (about 188 KiB, 191,581 bytes in this build) is React and React DOM's client renderer. The `@astrojs/react` integration always emits it as the hydration entry point for `client:*` islands. The site has no React island yet, so no HTML page or script references it, and the measurements above confirm that no page requests it. It costs deployment storage, not visitor bytes. It disappears only if the React integration is removed, which would contradict [ADR 0001](architecture/decisions/0001-use-astro-as-the-primary-frontend-framework.md), so it stays. The first island will make it a real request; that is exactly the change this budget is meant to surface (see [exceptions](#exceptions-and-review-rules)).

### Lab Core Web Vitals and scroll

A Playwright-driven Chromium run against production, emulating a Pixel 7 with network throttling at 150 ms latency and 1.6 Mbps down and a 4x CPU slowdown (the Lighthouse mobile profile, applied through DevTools rather than simulated), three runs per page with the cache disabled:

| Page | First Contentful Paint | Largest Contentful Paint (element) | Total Blocking Time | Cumulative Layout Shift |
| ---- | ---------------------: | ---------------------------------: | ------------------: | ----------------------: |
| Home |             528–540 ms |           528–540 ms (a paragraph) |                0 ms |                       0 |
| Case |             472–480 ms |           472–480 ms (a paragraph) |                0 ms |                       0 |

These are lab numbers from DevTools throttling, not Lighthouse scores and not field data. Lighthouse was not run for this baseline: PageSpeed Insights' unauthenticated API quota was exhausted and Lighthouse is not a project dependency. Total Blocking Time is a diagnostic lab signal about main-thread blocking during load. It is not Interaction to Next Paint, which needs real user interactions; the INP target remains unverified until field data exists.

**Scroll smoothness.** In the same throttled mobile context with motion allowed (`prefers-reduced-motion: no-preference`, so the scroll-driven timelines from [ADR 0007](architecture/decisions/0007-allow-purposeful-scroll-driven-motion.md) run), scrolling each page from top to bottom in 120 px wheel steps produced frame intervals with a median of 16.7 ms and a maximum of 17.7 ms, no frame longer than 50 ms, no long task and no layout shift. A check on a physical phone has not been done; it remains part of the manual review below.

## Budget

### Automated budget (local production build)

`tests/e2e/performance-budget.spec.ts` runs with `pnpm test:e2e` (Chromium project only, because the requested resources do not depend on the viewport). It records every request from the moment it starts, loads each page from the local static preview, scrolls to the bottom, waits until no request is in flight and 500 ms have passed since the last network event (so resources that start downloading during the scroll, such as lazy images, are counted), and fails if a request fails or any of these uncompressed limits is exceeded:

| Limit per page                           | Budget  | Home today | Case today |
| ---------------------------------------- | ------- | ---------- | ---------- |
| Requests, all types                      | 10      | 7          | 7          |
| Third-party requests                     | 0       | 0          | 0          |
| HTML document                            | 24 KiB  | 19.3 KiB   | 12.9 KiB   |
| JavaScript files (external)              | 3       | 2          | 2          |
| JavaScript bytes, external + inline      | 4 KiB   | 2.5 KiB    | 2.0 KiB    |
| CSS files                                | 2       | 2          | 2          |
| CSS bytes                                | 36 KiB  | 29.7 KiB   | 22.9 KiB   |
| Font files                               | 2       | 2          | 2          |
| Font bytes                               | 44 KiB  | 38.6 KiB   | 38.6 KiB   |
| Image files requested during load+scroll | 2       | 0          | 0          |
| Image bytes requested during load+scroll | 100 KiB | 0          | 0          |

Uncompressed sizes are used because they are deterministic and do not depend on the host's compression. The test is a Playwright browser test rather than a script over `dist/` because the budget is about what a browser actually requests: an unreferenced file in `dist/` must not count, and a newly hydrated island must. It adds no dependency ([ADR 0006](architecture/decisions/0006-use-a-pragmatic-risk-based-testing-strategy.md)).

### Production transfer budget (manual)

Checked by hand on production, compressed, per page:

| Resource                | Budget                                                     |
| ----------------------- | ---------------------------------------------------------- |
| HTML                    | 8 KB                                                       |
| CSS                     | 10 KB                                                      |
| JavaScript              | 3 KB                                                       |
| Fonts                   | 44 KB                                                      |
| Images                  | 100 KB, and none above the fold unless sized and justified |
| Total, excluding images | 64 KB                                                      |

### Images and other assets

The two pages request no images today. When one is added it must have explicit `width` and `height` (or an aspect ratio) so it cannot shift layout, use a modern format at the size it is displayed, load lazily unless it is the Largest Contentful Paint candidate, and stay within the image budget. Downloads such as the CV are fetched only on request and are outside the page budget. Fonts stay self-hosted WOFF2 subsets with at most two files per page.

### Core Web Vitals targets

The targets are the "good" thresholds published by Google for the current stable Core Web Vitals, measured at the 75th percentile ([web.dev: Web Vitals](https://web.dev/articles/vitals), checked 2026-11-22):

| Metric                          | Target   |
| ------------------------------- | -------- |
| Largest Contentful Paint (LCP)  | ≤ 2.5 s  |
| Interaction to Next Paint (INP) | ≤ 200 ms |
| Cumulative Layout Shift (CLS)   | ≤ 0.1    |

The site has too little traffic for field data. LCP and CLS are checked in the lab under the mobile profile above. INP cannot be verified in the lab and stays **unverified** until the Chrome UX Report (for example through PageSpeed Insights) has field data for the origin. Until then, Total Blocking Time ≤ 200 ms in the lab is tracked as a diagnostic signal that load does not block the main thread, not as evidence that the INP target is met ([web.dev: INP](https://web.dev/articles/inp)).

### Lighthouse target

Lighthouse mobile performance score ≥ 90 for both pages, taken as the median of three runs on production with the default mobile configuration (PageSpeed Insights or Chrome DevTools Lighthouse, in an incognito window without extensions). A single local desktop run is not evidence. The score is diagnostic: a failing metric matters more than the score itself.

## How to measure

1. **Every pull request (automated).** `pnpm test:e2e` builds the site and runs the budget test with the other browser tests.
2. **Before a release or after a change that adds JavaScript, CSS, fonts or images (manual).**
   - Open each page on production or its preview in Chrome DevTools with **Network**, **Disable cache** and the **Fast 4G** or a custom 150 ms / 1.6 Mbps profile, scroll to the bottom, and read the transferred size per type from the Network panel's filters. Compare with the production transfer budget.
   - Run Lighthouse three times per page (DevTools **Lighthouse**, mobile, Performance) or use [PageSpeed Insights](https://pagespeed.web.dev/), and record the median score with LCP, TBT and CLS.
   - Scroll each page on a mobile viewport with reduced motion off and confirm the motion is smooth (DevTools **Performance** recording: no long tasks or dropped-frame clusters during scroll). Repeat on a physical phone when one is available.
3. **Record the result** in the release-readiness record or the pull request, with the date, the commit and the tool used.

## Exceptions and review rules

- A pull request that raises any limit must update this document and the constants in `tests/e2e/performance-budget.spec.ts` together, state the new measured values and explain why the cost is worth it.
- The first React island will add the React client runtime (about 188 KiB uncompressed today) to the pages that use it. It needs an approved interaction ([high-level architecture](architecture/high-level-architecture.md)), a review of whether `client:visible` or `client:idle` can defer it, and an explicit JavaScript budget increase for those pages only.
- A third-party request (analytics, embeds, external fonts) is not allowed by this budget. Adding one needs separate approval, including its privacy and [security-header](security-headers.md) consequences.
- Do not optimise without a measured problem or rewrite pages to raise a score that already meets the target.
- Re-baseline when the budget's pages change (a new representative case study, a new section that adds assets) and record the new date and commit here.
