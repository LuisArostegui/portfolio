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
    has: page.getByRole('heading', { name: 'Software Engineer' }),
    hasText: 'Openbank',
  });
  await expect(currentRole).toContainText('Current role');
  await expect(currentRole).toContainText('Openbank');
  await expect(currentRole).toContainText('June 2024 - Present');
  await expect(currentRole).toContainText(
    'Santander group digital bank focused on customer-facing banking experiences.',
  );
  await expect(
    currentRole.getByRole('heading', { name: 'Responsibilities', level: 3 }),
  ).toBeVisible();
  await expect(currentRole).toContainText('Frontend engineering');
  await expect(currentRole).toContainText('Dynamic form architecture');

  const previousRole = page.getByRole('article').filter({
    has: page.getByRole('heading', { name: 'Software Engineer' }),
    hasText: 'Nucleoo',
  });
  await expect(previousRole).toContainText('Previous role');
  await expect(previousRole).toContainText('Nucleoo');
  await expect(previousRole).toContainText('February 2022 - June 2024');
  await expect(previousRole).toContainText(
    'Technology consultancy work across healthcare and supply-chain platforms.',
  );
  await expect(previousRole).toContainText('Full-stack product development');
  await expect(previousRole).toContainText('Ksyos');
  await expect(previousRole).toContainText(
    'Contributed to a Dutch healthcare platform using TypeScript, React, Node.js, and PostgreSQL.',
  );
  await expect(previousRole).toContainText(
    'Implemented secure patient authentication with SAML and supported integrations with Medmij and Exact.',
  );
  await expect(previousRole).toContainText(
    'Worked with AWS and Terraform for scalable infrastructure.',
  );
  await expect(previousRole).toContainText(
    'Supported automated testing with Cypress, Mocha, and Chai, CI with GitHub Actions, monitoring with Datadog, and documentation with Confluence.',
  );
  await expect(previousRole).toContainText('Retailisation');
  await expect(previousRole).toContainText(
    'Contributed to a supply-chain optimisation project using Angular, ETL workflows, Azure Database, SQL, MongoDB, Python, and Spark/PySpark.',
  );
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
  await expect(
    continuation.getByRole('link', { name: 'LinkedIn profile' }),
  ).toHaveAttribute('href', 'https://www.linkedin.com/in/luisarosteguiruiz/');
  await expect(
    continuation.getByRole('link', { name: 'Download CV' }),
  ).toHaveAttribute('href', '/CV-Luis-Arostegui-Ruiz.pdf');
});

test('experience continuation remains readable at intermediate viewport widths', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1024, height: 768 });
  await page.goto('/experience/');

  const continuationHeading = page.getByRole('heading', {
    name: 'Continue exploring',
    level: 2,
  });
  const headingBox = await continuationHeading.boundingBox();

  expect(headingBox).not.toBeNull();
  expect(headingBox!.width).toBeGreaterThanOrEqual(280);
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
