import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Locator, type Page } from '@playwright/test';

const caseId = 'portfolio-foundation';
const signal = 'rgb(200, 245, 96)';
const identity = ['none', 'matrix(1, 0, 0, 1, 0, 0)'];

function computed(locator: Locator, property: string, pseudo?: string) {
  return locator.evaluate(
    (element, [name, pseudoElement]) =>
      getComputedStyle(element, pseudoElement ?? null).getPropertyValue(name),
    [property, pseudo] as const,
  );
}

async function computedAll(locator: Locator, property: string) {
  return locator.evaluateAll(
    (elements, name) =>
      elements.map((element) =>
        getComputedStyle(element).getPropertyValue(name),
      ),
    property,
  );
}

async function settleLoadMotion(page: Page) {
  await page.evaluate(() =>
    Promise.all(
      document
        .getAnimations()
        .filter((animation) => animation.timeline instanceof DocumentTimeline)
        // A cancelled animation rejects `finished` with AbortError; it has
        // settled all the same (e.g. header transitions dropped when the
        // script enhances the navigation after the first style pass).
        .map((animation) => animation.finished.catch(() => undefined)),
    ),
  );
}

test.describe('reduced motion', () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
  });

  test('reduced motion shows the final state', async ({ page }) => {
    await page.goto('/');

    expect(await computed(page.locator('.hero-name'), 'animation-name')).toBe(
      'none',
    );
    expect(
      await computedAll(page.locator('.hero-name span'), 'animation-name'),
    ).toEqual(['none', 'none', 'none']);
    expect(
      new Set(await computedAll(page.locator('[data-node]'), 'animation-name')),
    ).toEqual(new Set(['none']));
    expect(
      new Set(await computedAll(page.locator('[data-role]'), 'animation-name')),
    ).toEqual(new Set(['none']));
    expect(
      new Set(await computedAll(page.locator('[data-role]'), 'opacity')),
    ).toEqual(new Set(['1']));

    const trace = page.locator('[data-trace]');
    expect(identity).toContain(await computed(trace, 'transform', '::after'));
    expect(await computed(trace, 'background-color')).toBe(signal);
  });

  test('reduced motion keeps ticks and stages visible', async ({ page }) => {
    await page.goto('/');

    const ticks = page.locator('[data-tick]');
    await expect(ticks.first()).toBeVisible();
    for (const transform of await computedAll(ticks, 'transform')) {
      expect(identity).toContain(transform);
    }

    const lamps = page.locator('[data-stage] [data-lamp]');
    expect(await lamps.count()).toBeGreaterThan(0);
    expect(new Set(await computedAll(lamps, 'background-color'))).toEqual(
      new Set([signal]),
    );
    expect(await computed(page.locator('[data-pulse]'), 'opacity')).toBe('0');
  });

  test('reduced motion leaves the reading progress collapsed', async ({
    page,
  }) => {
    await page.goto(`/projects/${caseId}/`);

    expect(
      await computed(page.locator('[data-read-progress]'), 'animation-name'),
    ).toBe('none');
    expect(
      new Set(
        await computedAll(
          page.locator('[data-case-prose] .decision'),
          'opacity',
        ),
      ),
    ).toEqual(new Set(['1']));
    expect(
      await computed(page.locator('[data-case-prose] table'), 'animation-name'),
    ).toBe('none');
  });
});

test.describe('motion allowed', () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
  });

  test('motion uses scroll timelines when allowed', async ({ page }) => {
    await page.goto('/');

    expect(
      await computed(page.locator('[data-node]').first(), 'animation-timeline'),
    ).toContain('view');
    expect(
      await computed(page.locator('[data-role]').first(), 'animation-timeline'),
    ).toContain('view');
    expect(
      await computed(page.locator('.hero-name'), 'animation-timeline'),
    ).toContain('scroll');
    expect(
      await computed(page.locator('[data-compact-name]'), 'animation-timeline'),
    ).toContain('scroll');
    expect(
      await computed(
        page.locator('[data-trace]'),
        'animation-timeline',
        '::after',
      ),
    ).toContain('scroll');
  });

  test('pipeline is driven by the card timeline', async ({ page }) => {
    await page.goto('/');

    expect(
      new Set(
        await computedAll(page.locator('[data-stage]'), 'animation-timeline'),
      ),
    ).toEqual(new Set(['--run']));
    expect(
      await computed(page.locator('[data-pulse]'), 'animation-timeline'),
    ).toBe('--run');
    expect(
      await computed(page.locator('[data-tick]').first(), 'animation-timeline'),
    ).toBe('--run');
  });

  test('first viewport at rest has no axe violations with motion', async ({
    page,
  }) => {
    await page.goto('/');
    await settleLoadMotion(page);

    const results = await new AxeBuilder({ page })
      .include('[data-site-header]')
      .include('.hero')
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test('hero name keeps the opacity floor while it is on screen', async ({
    page,
  }) => {
    await page.goto('/');
    await settleLoadMotion(page);

    const samples = await page.evaluate(async () => {
      const name = document.querySelector<HTMLElement>('.hero-name');
      const frame = () =>
        new Promise((resolve) => requestAnimationFrame(() => resolve(null)));
      const results: { scroll: number; bottom: number; opacity: number }[] = [];

      if (!name) {
        return results;
      }

      for (let scroll = 0; scroll <= window.innerHeight; scroll += 40) {
        window.scrollTo({ top: scroll, behavior: 'instant' });
        await frame();
        await frame();
        results.push({
          scroll,
          bottom: name.getBoundingClientRect().bottom,
          opacity: Number(getComputedStyle(name).opacity),
        });
      }

      return results;
    });

    const onScreen = samples.filter((sample) => sample.bottom > 0);
    expect(onScreen.length).toBeGreaterThan(3);
    expect(onScreen.some((sample) => sample.opacity < 1)).toBe(true);
    for (const sample of onScreen) {
      expect(
        sample.opacity,
        `opacity at ${sample.scroll}px`,
      ).toBeGreaterThanOrEqual(0.35);
    }
  });

  test('case evidence table settles with the decisions', async ({ page }) => {
    await page.goto(`/projects/${caseId}/`);

    expect(
      await computed(page.locator('[data-case-prose] table'), 'animation-name'),
    ).toBe('motion-settle');
    expect(
      new Set(
        await computedAll(
          page.locator('[data-case-prose] .decision'),
          'animation-name',
        ),
      ),
    ).toEqual(new Set(['motion-settle']));
  });

  test('compact name stays out of motion on case pages', async ({ page }) => {
    await page.goto(`/projects/${caseId}/`);

    expect(
      await computed(page.locator('[data-compact-name]'), 'animation-name'),
    ).toBe('none');
    expect(
      await computed(
        page.locator('[data-read-progress]'),
        'animation-timeline',
      ),
    ).toContain('scroll');
  });
});

test('case card and case title share a transition name', async ({ page }) => {
  await page.goto('/');
  const cardName = await computed(
    page.locator(`[data-case-title="${caseId}"]`),
    'view-transition-name',
  );

  await page.goto(`/projects/${caseId}/`);
  const headingName = await computed(
    page.getByRole('heading', { level: 1 }),
    'view-transition-name',
  );

  expect(cardName).toBe(`case-title-${caseId}`);
  expect(headingName).toBe(cardName);
});

test('current section link follows scroll', async ({ page }) => {
  await page.goto('/');

  const work = page.locator('#primary-navigation a[href="/#work"]');
  const experience = page.locator('#primary-navigation a[href="/#experience"]');

  await page
    .locator('#work')
    .evaluate((element) => element.scrollIntoView({ block: 'start' }));
  await expect(work).toHaveAttribute('aria-current', 'true', { timeout: 1000 });
  await expect(experience).not.toHaveAttribute('aria-current');

  await page.evaluate(() => window.scrollTo(0, 0));
  await expect(work).not.toHaveAttribute('aria-current', { timeout: 1000 });
});

test('case steps rail follows scroll', async ({ page }) => {
  await page.goto(`/projects/${caseId}/`);

  const evidence = page.locator('[data-case-steps] a[href="#evidence"]');

  await page
    .locator('#evidence')
    .evaluate((element) =>
      window.scrollTo(
        0,
        element.getBoundingClientRect().top +
          window.scrollY -
          window.innerHeight * 0.46,
      ),
    );
  await expect(evidence).toHaveAttribute('aria-current', 'true', {
    timeout: 1000,
  });
});

test('case steps rail follows link clicks', async ({ page }) => {
  await page.goto(`/projects/${caseId}/`);

  const rail = page.locator('[data-case-steps]');

  for (const step of ['problem', 'evidence', 'decisions', 'outcome']) {
    await rail.locator(`a[href="#${step}"]`).click();
    await expect(page).toHaveURL(new RegExp(`#${step}$`));
    await expect(rail.locator(`a[href="#${step}"]`)).toHaveAttribute(
      'aria-current',
      'true',
      { timeout: 3000 },
    );
    await expect(rail.locator('a[aria-current]')).toHaveCount(1);
  }
});
