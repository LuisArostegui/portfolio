import { expect, test, type Request } from '@playwright/test';

// Mirrors the automated budget in docs/performance-budget.md. Sizes are the
// uncompressed bytes the local static preview serves, so they are
// deterministic; compressed transfer sizes are checked on production by hand.
const KiB = 1024;
const budget = {
  requests: 10,
  document: { bytes: 24 * KiB },
  script: { files: 3, bytes: 4 * KiB },
  stylesheet: { files: 2, bytes: 36 * KiB },
  font: { files: 2, bytes: 44 * KiB },
  image: { files: 2, bytes: 100 * KiB },
} as const;

const pages = ['/', '/projects/portfolio-foundation/'];

type ResourceType = Exclude<keyof typeof budget, 'requests'>;

for (const path of pages) {
  test(`${path} stays within the performance budget`, async ({
    page,
    baseURL,
  }, testInfo) => {
    test.skip(
      testInfo.project.name !== 'chromium',
      'Requested resources do not depend on the viewport; one project is enough.',
    );

    // Track every request from the moment it starts, so one that begins during
    // the scroll is still pending, and therefore awaited, rather than missed.
    const pending = new Set<Request>();
    const failed: string[] = [];
    // Every network event restarts the quiet period, including a request that
    // starts and finishes between two checks of the loop below.
    let lastActivity = Date.now();
    const responses: Promise<{ url: string; type: string; bytes: number }>[] =
      [];
    page.on('request', (request) => {
      lastActivity = Date.now();
      pending.add(request);
    });
    page.on('requestfailed', (request) => {
      lastActivity = Date.now();
      pending.delete(request);
      failed.push(request.url());
    });
    page.on('requestfinished', (request) => {
      lastActivity = Date.now();
      pending.delete(request);
      responses.push(
        Promise.all([request.response(), request.sizes()]).then(
          async ([response, sizes]) => ({
            url: request.url(),
            type: request.resourceType(),
            // Chromium discards the body of an image it cannot decode, so
            // fall back to the bytes received on the wire.
            bytes: Math.max(
              response ? (await response.body()).length : 0,
              sizes.responseBodySize,
            ),
          }),
        ),
      );
    });

    await page.goto(path, { waitUntil: 'networkidle' });
    await page.evaluate(async () => {
      for (let y = 0; y < document.documentElement.scrollHeight; y += 400) {
        window.scrollTo(0, y);
        await new Promise((resolve) => requestAnimationFrame(resolve));
      }
    });
    // A second waitForLoadState('networkidle') resolves at once because the
    // navigation already reached it. Instead, wait until no request has been
    // in flight and no network event has happened for a quiet period, which
    // also covers requests that start a little after the scroll (lazy images,
    // observers) or are triggered by another request finishing.
    const quietPeriod = 500;
    lastActivity = Date.now();
    while (pending.size > 0 || Date.now() - lastActivity < quietPeriod) {
      await page.waitForTimeout(50);
    }

    const inlineScriptBytes = await page.evaluate(() =>
      [...document.querySelectorAll('script:not([src])')]
        .filter((script) => {
          const type = script.getAttribute('type');
          return !type || type === 'module' || type === 'text/javascript';
        })
        .reduce(
          (total, script) =>
            total + new TextEncoder().encode(script.textContent ?? '').length,
          0,
        ),
    );

    const resources = await Promise.all(responses);
    const origin = new URL(baseURL!).origin;
    expect(
      resources.filter((resource) => new URL(resource.url).origin !== origin),
      'third-party requests',
    ).toEqual([]);
    expect(failed, 'failed requests').toEqual([]);
    expect(resources.length, 'requests').toBeLessThanOrEqual(budget.requests);

    const of = (type: ResourceType) =>
      resources.filter((resource) => resource.type === type);
    const sum = (list: { bytes: number }[]) =>
      list.reduce((total, resource) => total + resource.bytes, 0);

    expect(sum(of('document')), 'document bytes').toBeLessThanOrEqual(
      budget.document.bytes,
    );
    expect(
      sum(of('script')) + inlineScriptBytes,
      'JavaScript bytes, external and inline',
    ).toBeLessThanOrEqual(budget.script.bytes);

    for (const type of ['script', 'stylesheet', 'font', 'image'] as const) {
      expect(of(type).length, `${type} files`).toBeLessThanOrEqual(
        budget[type].files,
      );
      if (type !== 'script') {
        expect(sum(of(type)), `${type} bytes`).toBeLessThanOrEqual(
          budget[type].bytes,
        );
      }
    }
  });
}
