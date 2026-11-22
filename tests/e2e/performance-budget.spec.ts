import { expect, test } from '@playwright/test';

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

    const responses: Promise<{ url: string; type: string; bytes: number }>[] =
      [];
    page.on('requestfinished', (request) => {
      responses.push(
        request.response().then(async (response) => ({
          url: request.url(),
          type: request.resourceType(),
          bytes: response ? (await response.body()).length : 0,
        })),
      );
    });

    await page.goto(path, { waitUntil: 'networkidle' });
    await page.evaluate(async () => {
      for (let y = 0; y < document.documentElement.scrollHeight; y += 400) {
        window.scrollTo(0, y);
        await new Promise((resolve) => requestAnimationFrame(resolve));
      }
    });
    await page.waitForLoadState('networkidle');

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
