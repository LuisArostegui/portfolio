import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

async function openCompactNavigationIfVisible(page: Page) {
  const menuButton = page.locator('[data-menu-toggle]');

  if (await menuButton.isVisible()) {
    await menuButton.click();
  }
}

test('home renders the shared semantic shell and has no automatically detectable accessibility violations', async ({
  page,
}) => {
  await page.goto('/');

  await expect(page.getByRole('banner')).toBeVisible();
  const primaryNavigation = page.getByRole('navigation', {
    name: 'Primary navigation',
  });

  await page.keyboard.press('Tab');
  const skipLink = page.getByRole('link', { name: 'Skip to main content' });
  await expect(skipLink).toBeFocused();
  await expect(skipLink).toHaveAttribute('href', '#main-content');

  await openCompactNavigationIfVisible(page);
  await expect(primaryNavigation).toBeVisible();
  await expect(
    primaryNavigation.getByRole('link', { name: 'Home', exact: true }),
  ).toHaveAttribute('aria-current', 'page');
  await expect(page.getByRole('contentinfo')).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Portfolio project foundation' }),
  ).toBeVisible();

  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

  expect(accessibilityScanResults.violations).toEqual([]);
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
  const menuIcon = page.locator('[data-menu-icon]');
  const closeIcon = page.locator('[data-close-icon]');
  await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  await expect(menuIcon).toBeVisible();
  await expect(closeIcon).toBeHidden();

  await menuButton.focus();
  await page.keyboard.press('Enter');
  await expect(menuButton).toHaveAccessibleName('Close navigation menu');
  await expect(menuButton).toHaveAttribute('aria-expanded', 'true');
  await expect(menuIcon).toBeHidden();
  await expect(closeIcon).toBeVisible();
  await expect(
    page
      .getByRole('navigation', { name: 'Primary navigation' })
      .getByRole('link', { name: 'Projects', exact: true }),
  ).toBeVisible();

  await page.keyboard.press('Escape');
  await expect(menuButton).toHaveAccessibleName('Open navigation menu');
  await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  await expect(menuIcon).toBeVisible();
  await expect(closeIcon).toBeHidden();
  await expect(menuButton).toBeFocused();
});

test('top-level routes expose their matching current page in primary navigation', async ({
  page,
}) => {
  await page.goto('/projects/');
  await openCompactNavigationIfVisible(page);

  const primaryNavigation = page.getByRole('navigation', {
    name: 'Primary navigation',
  });
  await expect(
    primaryNavigation.getByRole('link', { name: 'Projects', exact: true }),
  ).toHaveAttribute('aria-current', 'page');
  await expect(
    primaryNavigation.getByRole('link', { name: 'Home', exact: true }),
  ).not.toHaveAttribute('aria-current');
});

test('top-level routes expose SEO metadata in generated HTML', async ({
  page,
}) => {
  const routes = [
    {
      path: '/',
      title: 'Luis Arostegui Ruiz | Software Engineer',
      description:
        'Portfolio for Luis Arostegui Ruiz, a software engineer focused on reliable, accessible, and maintainable web products.',
      canonical:
        'https://luis-arostegui-portfolio.luisarosteguiruizit.workers.dev',
    },
    {
      path: '/projects/',
      title: 'Projects | Luis Arostegui Ruiz',
      description:
        'Selected portfolio projects and engineering case studies from Luis Arostegui Ruiz.',
      canonical:
        'https://luis-arostegui-portfolio.luisarosteguiruizit.workers.dev/projects/',
    },
    {
      path: '/experience/',
      title: 'Experience | Luis Arostegui Ruiz',
      description:
        'Professional experience, engineering judgement, and delivery capabilities from Luis Arostegui Ruiz.',
      canonical:
        'https://luis-arostegui-portfolio.luisarosteguiruizit.workers.dev/experience/',
    },
  ];

  for (const route of routes) {
    await page.goto(route.path);

    await expect(page).toHaveTitle(route.title);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      'content',
      route.description,
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      route.canonical,
    );
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
      'content',
      route.title,
    );
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
      'content',
      route.canonical,
    );
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      'content',
      'https://luis-arostegui-portfolio.luisarosteguiruizit.workers.dev/social-preview.svg',
    );
    await expect(page.locator('meta[property="og:image:alt"]')).toHaveAttribute(
      'content',
      'Luis Arostegui Ruiz portfolio preview',
    );
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
      'content',
      'summary_large_image',
    );
    await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute(
      'content',
      'https://luis-arostegui-portfolio.luisarosteguiruizit.workers.dev/social-preview.svg',
    );
  }
});

test('home exposes public-safe Person structured data', async ({ page }) => {
  await page.goto('/');

  const jsonLd = await page
    .locator('script[type="application/ld+json"]')
    .textContent();

  expect(JSON.parse(jsonLd ?? '')).toMatchObject({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Luis Arostegui Ruiz',
    jobTitle: 'Software Engineer',
    url: 'https://luis-arostegui-portfolio.luisarosteguiruizit.workers.dev',
  });
  expect(JSON.parse(jsonLd ?? '')).not.toHaveProperty('sameAs');
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

  await page.goto('/');

  await expect(
    page
      .getByRole('navigation', { name: 'Primary navigation' })
      .getByRole('link', { name: 'Experience', exact: true }),
  ).toBeVisible();

  await context.close();
});
