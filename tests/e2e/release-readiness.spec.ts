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
    page.getByRole('heading', { name: 'Review scope in progress', level: 2 }),
  ).toBeVisible();
  await expect(page.getByText('the review remains in progress')).toBeVisible();
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
    page.getByRole('main').getByRole('link', { name: 'See experience' }),
  ).toHaveAttribute('href', '/#experience');
  await expect(
    page.getByRole('main').getByRole('link', { name: 'See work' }),
  ).toHaveAttribute('href', '/#work');
  await expect(page.getByText('Stack trace')).toHaveCount(0);
  await expect(page.getByText('Exception')).toHaveCount(0);
});

test('every sitemap URL matches the canonical of the page it points to', async ({
  page,
  request,
}) => {
  const sitemap = await request.get('/sitemap.xml');
  expect(sitemap.ok()).toBe(true);

  const locations = [
    ...(await sitemap.text()).matchAll(/<loc>([^<]+)<\/loc>/g),
  ].map(([, location]) => location ?? '');
  expect(locations.length).toBeGreaterThan(0);

  for (const location of locations) {
    const { pathname } = new URL(location);
    expect(pathname).not.toMatch(/^\/(projects|experience)\/?$/);

    const response = await page.goto(pathname);
    expect(response?.status()).toBe(200);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      location,
    );
  }
});

test('robots.txt allows crawling and names the sitemap', async ({
  request,
}) => {
  const robots = await request.get('/robots.txt');
  expect(robots.ok()).toBe(true);

  const body = await robots.text();
  expect(body).toContain('User-agent: *');
  expect(body).toContain('Allow: /');
  expect(body).not.toMatch(/^Disallow: \/\s*$/m);
  expect(body).toMatch(/^Sitemap: https:\/\/\S+\/sitemap\.xml$/m);
});
