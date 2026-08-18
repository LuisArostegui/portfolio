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

test('project detail renders canonical narrative, evidence, and continuation', async ({
  page,
}) => {
  await page.goto('/projects/portfolio-foundation/');

  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
  await expect(
    page.getByRole('heading', { name: 'Portfolio foundation', level: 1 }),
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Context', level: 2 }),
  ).toBeVisible();
  await expect(
    page.getByText(
      'The portfolio needs one canonical, reviewable source for project summaries and future case-study prose.',
    ),
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Decisions', level: 2 }),
  ).toBeVisible();
  await expect(
    page.getByText(
      'Use Markdown for narrative content, concise frontmatter for structured metadata, and project-owned models for presentation-facing queries.',
    ),
  ).toBeVisible();

  await expect(
    page.getByRole('heading', { name: 'Public evidence', level: 2 }),
  ).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'GitHub repository' }),
  ).toHaveAttribute('href', 'https://github.com/LuisArostegui/portfolio');

  await expect(
    page.getByRole('navigation', { name: 'Project continuation' }),
  ).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'All projects' }),
  ).toHaveAttribute('href', '/projects/');
});

test('concise project detail omits unavailable optional sections cleanly', async ({
  page,
}) => {
  await page.goto('/projects/content-model-example/');

  await expect(
    page.getByRole('heading', { name: 'Content model example', level: 1 }),
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Context', level: 2 }),
  ).toBeVisible();
  await expect(
    page.getByText(
      'Future pages need stable project models without depending directly on Astro collection entries.',
    ),
  ).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Technologies' })).toHaveCount(
    0,
  );
  await expect(
    page.getByRole('heading', { name: 'Public evidence' }),
  ).toHaveCount(0);
  await expect(
    page.getByRole('link', { name: 'GitHub repository' }),
  ).toHaveCount(0);
});

test('project detail does not introduce page-level horizontal scrolling on mobile', async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== 'mobile-chromium',
    'Mobile-only responsive check',
  );

  await page.goto('/projects/portfolio-foundation/');

  const hasPageLevelHorizontalScroll = await page.evaluate(
    () =>
      document.documentElement.scrollWidth >
      document.documentElement.clientWidth,
  );

  expect(hasPageLevelHorizontalScroll).toBe(false);
});

test('projects and project detail have no automatically detectable accessibility violations', async ({
  page,
}) => {
  await page.goto('/projects/');

  const projectsScanResults = await new AxeBuilder({ page }).analyze();

  expect(projectsScanResults.violations).toEqual([]);

  await page.goto('/projects/portfolio-foundation/');

  const detailScanResults = await new AxeBuilder({ page }).analyze();

  expect(detailScanResults.violations).toEqual([]);
});
