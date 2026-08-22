import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('accessibility statement is public, linked from the footer, and has no automatically detectable accessibility violations', async ({
  page,
}) => {
  await page.goto('/');

  await expect(
    page
      .getByRole('navigation', { name: 'Footer navigation' })
      .getByRole('link', { name: 'Accessibility' }),
  ).toHaveAttribute('href', '/accessibility/');

  await page.goto('/accessibility/');

  await expect(page).toHaveTitle('Accessibility | Luis Arostegui Ruiz');
  await expect(
    page.getByRole('heading', { name: 'Accessibility', level: 1 }),
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Conformance intent', level: 2 }),
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Known limitations', level: 2 }),
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Feedback', level: 2 }),
  ).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'Send an email' }),
  ).toHaveAttribute('href', 'mailto:luisarosteguiruizit@gmail.com');

  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

  expect(accessibilityScanResults.violations).toEqual([]);
});

test('custom not-found output is generated without exposing technical details', async ({
  page,
}) => {
  const response = await page.goto('/404.html');

  expect(response?.ok()).toBe(true);
  await expect(page).toHaveTitle('Page not found | Luis Arostegui Ruiz');
  await expect(
    page.getByRole('heading', { name: 'Page not found', level: 1 }),
  ).toBeVisible();
  await expect(
    page.getByRole('main').getByRole('link', { name: 'Go home' }),
  ).toHaveAttribute('href', '/');
  await expect(
    page.getByRole('main').getByRole('link', { name: 'View projects' }),
  ).toHaveAttribute('href', '/projects/');
  await expect(page.getByText('Stack trace')).toHaveCount(0);
  await expect(page.getByText('Exception')).toHaveCount(0);
});
