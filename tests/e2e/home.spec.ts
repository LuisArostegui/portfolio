import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Locator } from '@playwright/test';

async function isUnobstructed(locator: Locator): Promise<boolean> {
  return locator.evaluate((element) => {
    const box = element.getBoundingClientRect();
    const hit = document.elementFromPoint(
      box.left + box.width / 2,
      box.top + box.height / 2,
    );

    return hit !== null && element.contains(hit);
  });
}

const checksWorkflowUrl =
  'https://github.com/LuisArostegui/portfolio/actions/workflows/quality.yml?query=branch%3Amain';

test('first viewport shows name, role, CV and experience link', async ({
  page,
}) => {
  await page.goto('/');

  const viewport = page.viewportSize();

  if (!viewport) {
    throw new Error('A viewport size is required for the first-screen check.');
  }

  await expect(
    page.getByRole('heading', { level: 1, name: 'Luis Arostegui Ruiz' }),
  ).toBeVisible();
  await expect(page.getByText('Software Engineer at Openbank')).toBeVisible();

  for (const name of ['Download CV (PDF, 113 KB)', 'See my experience']) {
    const link = page.getByRole('link', { name, exact: true });
    await expect(link).toBeVisible();

    const box = await link.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.y).toBeLessThan(viewport.height);
  }

  await expect(
    page.getByRole('link', { name: 'See my experience', exact: true }),
  ).toHaveAttribute('href', '#experience');
  await expect(
    page.getByRole('link', { name: 'Download CV (PDF, 113 KB)', exact: true }),
  ).toHaveAttribute('href', '/CV-Luis-Arostegui-Ruiz.pdf');
});

test('sections appear in order', async ({ page }) => {
  await page.goto('/');

  const ids = await page
    .locator('main section[id]')
    .evaluateAll((sections) => sections.map((section) => section.id));

  expect(ids).toEqual(['top', 'experience', 'work', 'about', 'contact']);
});

test('legacy anchors resolve', async ({ page }) => {
  const aliases = [
    { hash: '#selected-projects', section: 'work' },
    { hash: '#selected-experience', section: 'experience' },
    { hash: '#process', section: 'about' },
  ];

  for (const { hash, section } of aliases) {
    await page.goto(`/${hash}`);

    const target = page.locator(hash);
    await expect(target).toHaveCount(1);
    expect(
      await target.evaluate((element) => element.closest('section')?.id),
    ).toBe(section);
  }
});

test('case card links to the case study', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByRole('link', {
      name: 'Read the Portfolio foundation case study',
    }),
  ).toHaveAttribute('href', '/projects/portfolio-foundation/');

  const checkLinks = page
    .locator('#work [data-case]')
    .getByRole('list', {
      name: 'Checks the CI workflow runs on every pull request',
    })
    .getByRole('link');
  await expect(checkLinks).toHaveCount(4);

  for (const href of await checkLinks.evaluateAll((links) =>
    links.map((link) => link.getAttribute('href')),
  )) {
    expect(href).toBe(checksWorkflowUrl);
  }
});

test('no horizontal scroll at 320 px', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto('/');

  const { scrollWidth, clientWidth } = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));

  expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
});

test('works without JavaScript', async ({ browser, baseURL }) => {
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

  try {
    await page.goto('/');

    await expect(page.locator('#contact code')).toHaveText(
      'luisarosteguiruizit@gmail.com',
    );
    await expect(
      page.getByRole('button', { name: 'Copy address' }),
    ).toBeHidden();

    await page.goto('/#work');
    await expect
      .poll(() =>
        page
          .locator('#work')
          .evaluate((element) => element.getBoundingClientRect().top),
      )
      .toBeLessThan(200);
    await expect(
      page.getByRole('heading', { level: 2, name: 'Work' }),
    ).toBeInViewport();
  } finally {
    await context.close();
  }
});

test('no axe violations', async ({ page }) => {
  await page.goto('/');

  const results = await new AxeBuilder({ page }).analyze();

  expect(results.violations).toEqual([]);
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

  try {
    await page.goto('/');

    await expect(
      page
        .getByRole('navigation', { name: 'Primary navigation' })
        .getByRole('link', { name: 'Contact', exact: true }),
    ).toBeVisible();
  } finally {
    await context.close();
  }
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
  await expect(menuButton).toHaveAccessibleName('Open navigation menu');
  await expect(menuButton).toHaveAttribute('aria-expanded', 'false');

  await menuButton.focus();
  await page.keyboard.press('Enter');
  await expect(menuButton).toHaveAccessibleName('Close navigation menu');
  await expect(menuButton).toHaveAttribute('aria-expanded', 'true');
  await expect(
    page
      .getByRole('navigation', { name: 'Primary navigation' })
      .getByRole('link', { name: 'Work', exact: true }),
  ).toBeVisible();

  await page.keyboard.press('Escape');
  await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  await expect(menuButton).toBeFocused();
});

test('mobile menu closes after choosing a link and the target clears the header', async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== 'mobile-chromium',
    'Mobile-only interaction',
  );

  await page.goto('/');

  const menuButton = page.locator('[data-menu-toggle]');
  await menuButton.click();
  await expect(menuButton).toHaveAttribute('aria-expanded', 'true');

  await page
    .getByRole('navigation', { name: 'Primary navigation' })
    .getByRole('link', { name: 'Work', exact: true })
    .tap();

  await expect(menuButton).toHaveAttribute('aria-expanded', 'false');

  const heading = page.locator('#work h2').first();
  await expect
    .poll(async () => {
      const headerBox = await page.locator('[data-site-header]').boundingBox();
      const headingBox = await heading.boundingBox();

      return headerBox && headingBox
        ? headingBox.y - (headerBox.y + headerBox.height)
        : Number.NEGATIVE_INFINITY;
    })
    .toBeGreaterThanOrEqual(-1);
});

test('header is not sticky on small screens without JavaScript', async ({
  browser,
  baseURL,
}) => {
  if (!baseURL) {
    throw new Error('Playwright baseURL is required for the no-JS check.');
  }

  const context = await browser.newContext({
    baseURL,
    javaScriptEnabled: false,
    viewport: { width: 375, height: 812 },
  });
  const page = await context.newPage();

  try {
    await page.goto('/');

    await expect(page.locator('[data-site-header]')).not.toHaveCSS(
      'position',
      'sticky',
    );
  } finally {
    await context.close();
  }
});

test('home exposes SEO metadata and public-safe Person structured data', async ({
  page,
}) => {
  await page.goto('/');

  await expect(page).toHaveTitle('Luis Arostegui Ruiz | Software Engineer');
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    'content',
    'Frontend-focused software engineer building customer banking journeys in React and TypeScript at Openbank.',
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://luis-arostegui-portfolio.luisarosteguiruizit.workers.dev/',
  );

  const socialPreviewUrl =
    'https://luis-arostegui-portfolio.luisarosteguiruizit.workers.dev/social-preview.png';
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    'content',
    socialPreviewUrl,
  );
  await expect(page.locator('meta[property="og:image:width"]')).toHaveAttribute(
    'content',
    '1200',
  );
  await expect(
    page.locator('meta[property="og:image:height"]'),
  ).toHaveAttribute('content', '630');
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
    'content',
    'summary_large_image',
  );
  await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute(
    'content',
    socialPreviewUrl,
  );

  const jsonLd = await page
    .locator('script[type="application/ld+json"]')
    .textContent();

  expect(JSON.parse(jsonLd ?? '')).toMatchObject({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Luis Arostegui Ruiz',
    jobTitle: 'Software Engineer',
  });
});

test('skip link is the first focus stop and targets main content', async ({
  page,
}) => {
  await page.goto('/');
  await page.keyboard.press('Tab');

  const skipLink = page.getByRole('link', { name: 'Skip to main content' });
  await expect(skipLink).toBeFocused();
  await expect(skipLink).toHaveAttribute('href', '#main-content');
  await expect.poll(() => isUnobstructed(skipLink)).toBe(true);
});

test('mobile menu closes when focus leaves the header and the focus target is not covered', async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== 'mobile-chromium',
    'Mobile-only interaction',
  );

  await page.goto('/');
  await page.evaluate(() => window.scrollTo(0, 400));

  const menuButton = page.locator('[data-menu-toggle]');
  await menuButton.focus();
  await page.keyboard.press('Enter');
  await expect(menuButton).toHaveAttribute('aria-expanded', 'true');

  const cvLink = page
    .getByRole('navigation', { name: 'Primary navigation' })
    .locator('.site-header__cv');
  for (let index = 0; index < 10; index += 1) {
    await page.keyboard.press('Tab');
    if (
      await cvLink.evaluate((element) => element === document.activeElement)
    ) {
      break;
    }
  }
  await expect(cvLink).toBeFocused();

  await page.keyboard.press('Tab');
  await expect(menuButton).toHaveAttribute('aria-expanded', 'false');

  const focused = page.locator(':focus');
  await expect(focused).not.toHaveCount(0);
  await expect(focused).not.toHaveAttribute('data-menu-toggle', /.*/);
  await focused.scrollIntoViewIfNeeded();
  await expect.poll(() => isUnobstructed(focused)).toBe(true);
});

test('experience role headings are unique and name the organisation', async ({
  page,
}) => {
  await page.goto('/');

  const names = await page
    .locator('#experience')
    .getByRole('heading', { level: 3 })
    .evaluateAll((headings) =>
      headings.map((heading) =>
        (heading.textContent ?? '').replace(/\s+/g, ' ').trim(),
      ),
    );

  expect(names.length).toBeGreaterThan(1);
  expect(new Set(names).size).toBe(names.length);
  expect(names.some((name) => name.includes('Openbank'))).toBe(true);
  expect(names.some((name) => name.includes('Nucleoo'))).toBe(true);
  await expect(
    page.getByRole('heading', {
      level: 3,
      name: 'Software Engineer at Openbank',
    }),
  ).toBeVisible();
});

test('copy failure falls back to selecting the address', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText: () => Promise.reject(new Error('denied')) },
    });
  });
  await page.goto('/');

  await page.getByRole('button', { name: 'Copy address' }).click();

  await expect(page.locator('#contact [role="status"]')).toHaveText(
    'Address selected, copy it manually',
  );
  expect(await page.evaluate(() => window.getSelection()?.toString())).toBe(
    'luisarosteguiruizit@gmail.com',
  );
});

test('pipeline caption is generic for any project', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('#work figure figcaption')).toHaveText(
    'How this project gets from the repository to production.',
  );
});
