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
    page.getByRole('heading', {
      name: 'Software Engineer with strong frontend expertise',
      level: 1,
    }),
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Professional summary', level: 2 }),
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Selected projects', level: 2 }),
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Engineering strengths', level: 2 }),
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Selected experience', level: 2 }),
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Engineering process', level: 2 }),
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Contact', level: 2 }),
  ).toBeVisible();

  await expect(
    page.getByRole('link', { name: 'View selected projects' }),
  ).toHaveAttribute('href', '#selected-projects');
  await expect(
    page.getByRole('link', { name: 'View experience' }),
  ).toHaveAttribute('href', '/experience/');
  await expect(
    page.getByRole('link', { name: 'GitHub profile' }),
  ).toHaveAttribute('href', 'https://github.com/LuisArostegui');
  await expect(
    page.getByRole('link', { name: 'LinkedIn profile' }),
  ).toHaveAttribute('href', 'https://www.linkedin.com/in/luisarosteguiruiz/');
  const cvLinks = page.getByRole('link', { name: 'Download CV' });
  await expect(cvLinks).toHaveCount(2);
  await expect(cvLinks.first()).toHaveAttribute(
    'href',
    '/CV-Luis-Arostegui-Ruiz.pdf',
  );
  await expect(cvLinks.nth(1)).toHaveAttribute(
    'href',
    '/CV-Luis-Arostegui-Ruiz.pdf',
  );
  await expect(
    page.getByRole('link', { name: 'Send an email' }),
  ).toHaveAttribute('href', 'mailto:luisarosteguiruizit@gmail.com');
  await expect(
    page.getByRole('link', { name: 'GitHub repository' }),
  ).toHaveAttribute('href', 'https://github.com/LuisArostegui/portfolio');
  await expect(
    page.getByRole('heading', { name: 'Portfolio foundation', level: 3 }),
  ).toBeVisible();
  await expect(page.getByText('Repository maintainer')).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'View project: Portfolio foundation' }),
  ).toHaveAttribute('href', '/projects/portfolio-foundation/');
  await expect(
    page.getByRole('heading', { name: 'Software Engineer', level: 3 }).first(),
  ).toBeVisible();
  await expect(page.getByText('Openbank')).toBeVisible();

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
  await expect(menuButton).toHaveAccessibleName('Open navigation menu');
  await expect(menuButton).toHaveText('');
  await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  await expect(menuIcon).toBeVisible();
  await expect(closeIcon).toBeHidden();

  await menuButton.focus();
  await page.keyboard.press('Enter');
  await expect(menuButton).toHaveAccessibleName('Close navigation menu');
  await expect(menuButton).toHaveText('');
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
  await expect(menuButton).toHaveText('');
  await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  await expect(menuIcon).toBeVisible();
  await expect(closeIcon).toBeHidden();
  await expect(menuButton).toBeFocused();
});

test('selected experience previews keep a visible gap before the wide desktop grid', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1024, height: 768 });
  await page.goto('/');

  const experiencePreviews = page.locator('.experience-preview');
  await expect(experiencePreviews).toHaveCount(2);

  const firstPreviewBox = await experiencePreviews.nth(0).boundingBox();
  const secondPreviewBox = await experiencePreviews.nth(1).boundingBox();

  expect(firstPreviewBox).not.toBeNull();
  expect(secondPreviewBox).not.toBeNull();

  const verticalGap =
    secondPreviewBox!.y - (firstPreviewBox!.y + firstPreviewBox!.height);

  expect(verticalGap).toBeGreaterThanOrEqual(16);
});

test('engineering strengths section has a single closing separator', async ({
  page,
}) => {
  await page.goto('/');

  const lastStrengthItem = page.locator('.strength-item').last();
  const lastStrengthBorder = await lastStrengthItem.evaluate((element) => {
    const styles = getComputedStyle(element);

    return {
      borderBlockEndStyle: styles.borderBlockEndStyle,
      borderBlockEndWidth: styles.borderBlockEndWidth,
    };
  });

  expect(lastStrengthBorder).toEqual({
    borderBlockEndStyle: 'none',
    borderBlockEndWidth: '0px',
  });
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
        'Software engineer with strong frontend expertise in React, TypeScript, accessibility, testing, and maintainable web products.',
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
      'https://luis-arostegui-portfolio.luisarosteguiruizit.workers.dev/social-preview.png',
    );
    await expect(
      page.locator('meta[property="og:image:type"]'),
    ).toHaveAttribute('content', 'image/png');
    await expect(
      page.locator('meta[property="og:image:width"]'),
    ).toHaveAttribute('content', '1200');
    await expect(
      page.locator('meta[property="og:image:height"]'),
    ).toHaveAttribute('content', '630');
    await expect(page.locator('meta[property="og:image:alt"]')).toHaveAttribute(
      'content',
      'Luis Arostegui Ruiz portfolio preview',
    );
    await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute(
      'content',
      'https://luis-arostegui-portfolio.luisarosteguiruizit.workers.dev/social-preview.png',
    );
    await expect(
      page.locator('meta[name="twitter:image:alt"]'),
    ).toHaveAttribute('content', 'Luis Arostegui Ruiz portfolio preview');
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
      'content',
      'summary_large_image',
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
  expect(JSON.parse(jsonLd ?? '')).toMatchObject({
    sameAs: [
      'https://github.com/LuisArostegui',
      'https://www.linkedin.com/in/luisarosteguiruiz/',
    ],
  });
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
      .getByRole('link', { name: 'Contact', exact: true }),
  ).toBeVisible();

  await context.close();
});

test('mobile navigation remains immediate and understandable with reduced motion', async ({
  browser,
  baseURL,
}) => {
  if (!baseURL) {
    throw new Error(
      'Playwright baseURL is required for the reduced-motion navigation check.',
    );
  }

  const context = await browser.newContext({
    baseURL,
    reducedMotion: 'reduce',
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();

  try {
    await page.goto('/');

    const menuButton = page.locator('[data-menu-toggle]');
    const primaryNavigation = page.getByRole('navigation', {
      name: 'Primary navigation',
    });

    await menuButton.click();

    await expect(menuButton).toHaveAttribute('aria-expanded', 'true');
    await expect(menuButton).toHaveAccessibleName('Close navigation menu');
    await expect(menuButton).toHaveText('');
    await expect(
      primaryNavigation.getByRole('link', { name: 'Projects', exact: true }),
    ).toBeVisible();

    const navigationMotion = await primaryNavigation.evaluate((element) => {
      const styles = getComputedStyle(element);

      return {
        animationName: styles.animationName,
        transitionDuration: styles.transitionDuration,
      };
    });

    expect(navigationMotion.animationName).toBe('none');
    expect(navigationMotion.transitionDuration).toBe('0s');
  } finally {
    await context.close();
  }
});
