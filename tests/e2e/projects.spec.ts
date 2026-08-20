import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('projects lists canonical production entries and links to generated project detail', async ({
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
    'A public Astro portfolio built to present professional experience, project evidence, and engineering practice through typed content and static-first routes.',
  );
  await expect(portfolioProject).toContainText('Repository maintainer');
  await expect(portfolioProject).toContainText('active');
  await expect(portfolioProject).toContainText('Content modelling');
  await expect(portfolioProject).toContainText('Astro');
  await expect(page.getByText('Content model example')).toHaveCount(0);

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
      'The portfolio needs to communicate professional positioning, experience, selected project evidence, and contact paths without relying on a CMS or runtime content service.',
    ),
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Decisions and trade-offs', level: 2 }),
  ).toBeVisible();
  await expect(
    page.getByText(
      'The implementation uses Astro Content Collections for projects and experience so previews and detail pages derive from one canonical Markdown entry per content item.',
    ),
  ).toBeVisible();

  await expect(
    page.getByRole('heading', { name: 'Public evidence', level: 2 }),
  ).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'GitHub repository' }),
  ).toHaveAttribute('href', 'https://github.com/LuisArostegui/portfolio');
  await expect(
    page.getByRole('link', { name: 'GitHub issue' }),
  ).toHaveAttribute(
    'href',
    'https://github.com/LuisArostegui/portfolio/issues/67',
  );
  await expect(
    page.getByRole('link', { name: 'GitHub documentation' }),
  ).toHaveAttribute(
    'href',
    'https://github.com/LuisArostegui/portfolio/blob/main/docs/product/content-strategy.md',
  );

  await expect(
    page.getByRole('navigation', { name: 'Project continuation' }),
  ).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'All projects' }),
  ).toHaveAttribute('href', '/projects/');
});

test('project detail does not introduce page-level horizontal scrolling on mobile', async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== 'mobile-chromium',
    'Mobile-only responsive check',
  );

  await page.goto('/projects/portfolio-foundation/');

  await expect(
    page.getByRole('heading', { name: 'Technical evidence' }),
  ).toBeVisible();

  const hasPageLevelHorizontalScroll = await page.evaluate(
    () =>
      document.documentElement.scrollWidth >
      document.documentElement.clientWidth,
  );

  expect(hasPageLevelHorizontalScroll).toBe(false);

  const technicalContentLayout = await page.evaluate(() => {
    const codeBlock = document.querySelector('.project-prose pre');
    const table = document.querySelector('.project-prose table');

    if (
      codeBlock === null ||
      table === null ||
      codeBlock.parentElement === null ||
      table.parentElement === null
    ) {
      throw new Error('Expected project technical content was not rendered.');
    }

    return {
      codeBlockLocallyScrolls:
        codeBlock.scrollWidth > codeBlock.clientWidth &&
        codeBlock.clientWidth <= document.documentElement.clientWidth,
      tableFitsPage: table.scrollWidth <= document.documentElement.clientWidth,
    };
  });

  expect(technicalContentLayout).toEqual({
    codeBlockLocallyScrolls: true,
    tableFitsPage: true,
  });
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
