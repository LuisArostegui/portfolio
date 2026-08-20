import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('experience renders canonical current and previous role content', async ({
  page,
}) => {
  await page.goto('/experience/');

  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Experience',
  );
  await expect(
    page.getByRole('heading', { name: 'Professional context', level: 2 }),
  ).toBeVisible();

  const currentRole = page.getByRole('article').filter({
    has: page.getByRole('heading', { name: 'Example frontend role' }),
  });
  await expect(currentRole).toContainText('Current role');
  await expect(currentRole).toContainText('Representative product team');
  await expect(currentRole).toContainText('January 2026 - Present');
  await expect(currentRole).toContainText(
    'This entry demonstrates where public-safe context for a professional role can be authored.',
  );
  await expect(
    currentRole.getByRole('heading', { name: 'Responsibilities', level: 3 }),
  ).toBeVisible();
  await expect(currentRole).toContainText('Frontend engineering');

  const previousRole = page.getByRole('article').filter({
    has: page.getByRole('heading', { name: 'Example previous role' }),
  });
  await expect(previousRole).toContainText('Previous role');
  await expect(previousRole).toContainText('Representative delivery team');
  await expect(previousRole).toContainText('May 2024 - December 2025');
  await expect(previousRole).toContainText(
    'A concise non-definitive entry used to validate completed-role presentation.',
  );
  await expect(previousRole).toContainText('Delivery support');
});

test('experience prioritises contribution-led content and continuation paths', async ({
  page,
}) => {
  await page.goto('/experience/');

  await expect(
    page.getByRole('heading', { name: 'Current role', level: 2 }),
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Previous roles', level: 2 }),
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Contribution focus', level: 2 }),
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Continue exploring', level: 2 }),
  ).toBeVisible();
  const continuation = page.getByRole('region', {
    name: 'Continue exploring',
  });
  await expect(
    continuation.getByRole('link', { name: 'View projects' }),
  ).toHaveAttribute('href', '/projects/');
  await expect(
    continuation.getByRole('link', { name: 'Contact' }),
  ).toHaveAttribute('href', '/#contact');
  await expect(
    continuation.getByRole('link', { name: 'GitHub profile' }),
  ).toHaveAttribute('href', 'https://github.com/LuisArostegui');
});

test('experience does not introduce page-level horizontal scrolling on mobile', async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== 'mobile-chromium',
    'Mobile-only responsive check',
  );

  await page.goto('/experience/');

  const hasPageLevelHorizontalScroll = await page.evaluate(
    () =>
      document.documentElement.scrollWidth >
      document.documentElement.clientWidth,
  );

  expect(hasPageLevelHorizontalScroll).toBe(false);
});

test('experience has no automatically detectable accessibility violations', async ({
  page,
}) => {
  await page.goto('/experience/');

  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

  expect(accessibilityScanResults.violations).toEqual([]);
});
