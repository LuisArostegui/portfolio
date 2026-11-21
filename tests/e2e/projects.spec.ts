import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const casePath = '/projects/portfolio-foundation/';

test('case shows facts and sections', async ({ page }) => {
  await page.goto(casePath);

  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
  await expect(
    page.getByRole('heading', { name: 'Portfolio foundation', level: 1 }),
  ).toBeVisible();

  const facts = page.locator('[data-case-facts]');
  await expect(facts.locator('dt', { hasText: 'role' })).toBeVisible();
  await expect(facts).toContainText('Repository maintainer');
  await expect(facts.locator('dt', { hasText: 'stack' })).toBeVisible();
  await expect(facts).toContainText('Astro, TypeScript');
  await expect(facts.locator('dt', { hasText: 'source' })).toBeVisible();
  await expect(facts.getByRole('link', { name: 'GitHub' })).toHaveAttribute(
    'href',
    'https://github.com/LuisArostegui/portfolio',
  );
  // Hosting is not in the project content, so it is omitted rather than hard-coded.
  await expect(facts.locator('dt', { hasText: 'hosting' })).toHaveCount(0);

  const steps = page.locator('[data-case-steps]');
  for (const [name, id] of [
    ['Problem', 'problem'],
    ['Decisions', 'decisions'],
    ['Evidence', 'evidence'],
    ['Outcome', 'outcome'],
  ] as const) {
    await expect(steps.getByRole('link', { name })).toHaveAttribute(
      'href',
      `#${id}`,
    );
    await expect(page.getByRole('heading', { name, level: 2 })).toHaveAttribute(
      'id',
      id,
    );
  }

  await expect(page.locator('h1[data-case-title]')).toHaveAttribute(
    'data-case-title',
    'portfolio-foundation',
  );
  await expect(page.locator('[data-read-progress]')).toHaveAttribute(
    'aria-hidden',
    'true',
  );
});

test('Evidence section links the issue and the content strategy', async ({
  page,
}) => {
  await page.goto(casePath);

  await expect(
    page
      .locator('[data-case-facts]')
      .getByRole('link', { name: 'GitHub repository', exact: true }),
  ).toHaveAttribute('href', 'https://github.com/LuisArostegui/portfolio');

  const hrefs = await page.evaluate(() => {
    const heading = document.getElementById('evidence');
    const found: string[] = [];

    for (
      let node = heading?.nextElementSibling;
      node && node.tagName !== 'H2';
      node = node.nextElementSibling
    ) {
      node
        .querySelectorAll('a[href]')
        .forEach((a) => found.push(a.getAttribute('href') ?? ''));
    }

    return found;
  });

  expect(hrefs).toContain(
    'https://github.com/LuisArostegui/portfolio/issues/67',
  );
  expect(hrefs).toContain(
    'https://github.com/LuisArostegui/portfolio/blob/main/docs/product/content-strategy.md',
  );
});

test('back link returns to work', async ({ page }) => {
  await page.goto(casePath);

  await expect(
    page.getByRole('link', { name: 'Back to work' }),
  ).toHaveAttribute('href', '/#work');
});

test('next case only when another exists', async ({ page }) => {
  await page.goto(casePath);

  await expect(page.getByRole('link', { name: /Next case/ })).toHaveCount(0);
});

test('Work is current in navigation', async ({ page }) => {
  await page.goto(casePath);

  const menuToggle = page.getByRole('button', { name: 'Open navigation menu' });
  if (await menuToggle.isVisible()) {
    await menuToggle.click();
  }

  await expect(
    page
      .getByRole('navigation', { name: 'Primary navigation' })
      .getByRole('link', { name: 'Work' }),
  ).toHaveAttribute('aria-current', 'page');
});

test('no horizontal scroll at 320 px', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 700 });
  await page.goto(casePath);

  await expect(
    page.getByRole('heading', { name: 'Evidence', level: 2 }),
  ).toBeVisible();

  const overflows = await page.evaluate(
    () =>
      document.documentElement.scrollWidth >
      document.documentElement.clientWidth,
  );

  expect(overflows).toBe(false);
});

test('no axe violations', async ({ page }) => {
  await page.goto(casePath);

  const results = await new AxeBuilder({ page }).analyze();

  expect(results.violations).toEqual([]);
});
