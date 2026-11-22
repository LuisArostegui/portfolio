import { describe, expect, it } from 'vitest';
import headers from '../../public/_headers?raw';
import { buildRobotsTxt, buildSitemapXml, getIndexableUrls } from './crawl';
import { siteMetadata } from './siteMetadata';

const origin =
  'https://luis-arostegui-portfolio.luisarosteguiruizit.workers.dev';

describe('indexable URLs', () => {
  it('lists home, each case study and the accessibility statement only', () => {
    expect(getIndexableUrls(['portfolio-foundation'])).toEqual([
      `${origin}/`,
      `${origin}/projects/portfolio-foundation/`,
      `${origin}/accessibility/`,
    ]);
  });
});

describe('sitemap', () => {
  it('wraps each URL in a loc element and escapes XML characters', () => {
    expect(buildSitemapXml([`${origin}/`, `${origin}/a&b/`])).toBe(
      `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${origin}/</loc>
  </url>
  <url>
    <loc>${origin}/a&amp;b/</loc>
  </url>
</urlset>
`,
    );
  });
});

describe('robots.txt', () => {
  it('allows crawling and names the sitemap', () => {
    expect(buildRobotsTxt(`${origin}/sitemap.xml`)).toBe(
      `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`,
    );
  });
});

describe('public/_headers', () => {
  const rules = headers
    .trim()
    .split(/\n\s*\n/)
    .map((block) => block.split('\n').map((line) => line.trim()));

  it('keeps previews noindex and detaches it afterwards for the production host only', () => {
    expect(rules).toEqual([
      ['https://:version.:subdomain.workers.dev/*', 'X-Robots-Tag: noindex'],
      [`${siteMetadata.siteUrl}/*`, '! X-Robots-Tag'],
    ]);
  });
});
