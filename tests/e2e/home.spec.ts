import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const checksWorkflowUrl =
  'https://github.com/LuisArostegui/portfolio/actions/workflows/quality.yml?query=branch%3Amain';

test('first viewport shows name, role, CV and experience link', async ({
  page,
}) => {
  await page.goto('/');

  const viewport = page.viewportSize();

  if (!viewport) {
    throw new Error('A viewport size is required for the first-screen check.');
  }

  await expect(
    page.getByRole('heading', { level: 1, name: 'Luis Arostegui Ruiz' }),
  ).toBeVisible();
  await expect(page.getByText('Software Engineer at Openbank')).toBeVisible();

  for (const name of ['Download CV (PDF, 113 KB)', 'See my experience']) {
    const link = page.getByRole('link', { name, exact: true });
    await expect(link).toBeVisible();

    const box = await link.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.y).toBeLessThan(viewport.height);
  }

  await expect(
    page.getByRole('link', { name: 'See my experience', exact: true }),
  ).toHaveAttribute('href', '#experience');
  await expect(
    page.getByRole('link', { name: 'Download CV (PDF, 113 KB)', exact: true }),
  ).toHaveAttribute('href', '/CV-Luis-Arostegui-Ruiz.pdf');
});

test('sections appear in order', async ({ page }) => {
  await page.goto('/');

  const ids = await page
    .locator('main section[id]')
    .evaluateAll((sections) => sections.map((section) => section.id));

  expect(ids).toEqual(['top', 'experience', 'work', 'about', 'contact']);
});

test('legacy anchors resolve', async ({ page }) => {
  const aliases = [
    { hash: '#selected-projects', section: 'work' },
    { hash: '#selected-experience', section: 'experience' },
    { hash: '#process', section: 'about' },
  ];

  for (const { hash, section } of aliases) {
    await page.goto(`/${hash}`);

    const target = page.locator(hash);
    await expect(target).toHaveCount(1);
    expect(
      await target.evaluate((element) => element.closest('section')?.id),
    ).toBe(section);
  }
});

test('case card links to the case study', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByRole('link', {
      name: 'Read the Portfolio foundation case study',
    }),
  ).toHaveAttribute('href', '/projects/portfolio-foundation/');

  const checkLinks = page
    .locator('#work [data-case]')
    .getByRole('list', {
      name: 'Checks the CI workflow runs on every pull request',
    })
    .getByRole('link');
  await expect(checkLinks).toHaveCount(4);

  for (const href of await checkLinks.evaluateAll((links) =>
    links.map((link) => link.getAttribute('href')),
  )) {
    expect(href).toBe(checksWorkflowUrl);
  }
});

test('no horizontal scroll at 320 px', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto('/');

  const { scrollWidth, clientWidth } = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));

  expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
});

test('works without JavaScript', async ({ browser, baseURL }) => {
  if (!baseURL) {
    throw new Error(
      'Playwright baseURL is required for the no-JavaScript check.',
    );
  }

  const context = await browser.newContext({
    baseURL,
    javaScriptEnabled: false,
  });
  const page = await context.newPage();

  try {
    await page.goto('/');

    await expect(page.locator('#contact code')).toHaveText(
      'luisarosteguiruizit@gmail.com',
    );
    await expect(
      page.getByRole('button', { name: 'Copy address' }),
    ).toBeHidden();

    await page.goto('/#work');
    await expect
      .poll(() =>
        page
          .locator('#work')
          .evaluate((element) => element.getBoundingClientRect().top),
      )
      .toBeLessThan(200);
    await expect(
      page.getByRole('heading', { level: 2, name: 'Work' }),
    ).toBeInViewport();
  } finally {
    await context.close();
  }
});

test('no axe violations', async ({ page }) => {
  await page.goto('/');

  const results = await new AxeBuilder({ page }).analyze();

  expect(results.violations).toEqual([]);
});

test('primary navigation remains visible without JavaScript', async ({
  browser,
  baseURL,
}) => {
  if (!baseURL) {
    throw new Error(
      'Playwright baseURL is required for the no-JavaScript check.',
    );
  }

  const context = await browser.newContext({
    baseURL,
    javaScriptEnabled: false,
  });
  const page = await context.newPage();

  try {
    await page.goto('/');

    await expect(
      page
        .getByRole('navigation', { name: 'Primary navigation' })
        .getByRole('link', { name: 'Contact', exact: true }),
    ).toBeVisible();
  } finally {
    await context.close();
  }
});

test('mobile navigation is keyboard operable and restores focus when closed', async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== 'mobile-chromium',
    'Mobile-only interaction',
  );

  await page.goto('/');

  const menuButton = page.locator('[data-menu-toggle]');
  await expect(menuButton).toHaveAccessibleName('Open navigation menu');
  await expect(menuButton).toHaveAttribute('aria-expanded', 'false');

  await menuButton.focus();
  await page.keyboard.press('Enter');
  await expect(menuButton).toHaveAccessibleName('Close navigation menu');
  await expect(menuButton).toHaveAttribute('aria-expanded', 'true');
  await expect(
    page
      .getByRole('navigation', { name: 'Primary navigation' })
      .getByRole('link', { name: 'Work', exact: true }),
  ).toBeVisible();

  await page.keyboard.press('Escape');
  await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  await expect(menuButton).toBeFocused();
});

test('home exposes SEO metadata and public-safe Person structured data', async ({
  page,
}) => {
  await page.goto('/');

  await expect(page).toHaveTitle('Luis Arostegui Ruiz | Software Engineer');
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    'content',
    'Frontend-focused software engineer building customer banking journeys in React and TypeScript at Openbank.',
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://luis-arostegui-portfolio.luisarosteguiruizit.workers.dev/',
  );

  const jsonLd = await page
    .locator('script[type="application/ld+json"]')
    .textContent();

  expect(JSON.parse(jsonLd ?? '')).toMatchObject({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Luis Arostegui Ruiz',
    jobTitle: 'Software Engineer',
  });
});
