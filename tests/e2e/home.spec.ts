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

test('primary navigation remains visible without JavaScript', async ({
  browser,
  baseURL,
}) => {
  if (!baseURL) {
    throw new Error('Playwright baseURL is required for the no-JavaScript check.');
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
