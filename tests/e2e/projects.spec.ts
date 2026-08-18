import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('projects lists canonical entries and links to generated project detail', async ({
  page,
}) => {
  await page.goto('/projects/');

  await expect(
    page.getByRole('heading', { name: 'Projects', level: 1 }),
  ).toBeVisible();

  const portfolioProject = page.getByRole('article').filter({
    has: page.getByRole('heading', { name: 'Portfolio foundation' }),
  });

  await expect(portfolioProject).toContainText(
    'A representative entry showing how this public repository records and validates project content.',
  );
  await expect(portfolioProject).toContainText('Repository maintainer');
  await expect(portfolioProject).toContainText('active');
  await expect(portfolioProject).toContainText('Content modelling');
  await expect(portfolioProject).toContainText('Astro');

  const projectLink = portfolioProject.getByRole('link', {
    name: 'View project: Portfolio foundation',
  });
  await expect(projectLink).toHaveAttribute(
    'href',
    '/projects/portfolio-foundation/',
  );

  await page.goto('/projects/portfolio-foundation/');
  await expect(
    page.getByRole('heading', { name: 'Portfolio foundation', level: 1 }),
  ).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'Back to Projects' }),
  ).toHaveAttribute('href', '/projects/');
});

test('projects has no automatically detectable accessibility violations', async ({
  page,
}) => {
  await page.goto('/projects/');

  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

  expect(accessibilityScanResults.violations).toEqual([]);
});
