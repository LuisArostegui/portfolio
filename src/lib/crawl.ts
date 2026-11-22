import { getSeoMetadata } from './seo';
import type { AbsoluteUrl, RootRelativePath } from './siteMetadata';

/**
 * Public, indexable pages. Redirected URLs, home fragments and the 404 page
 * are deliberately absent; see docs/architecture/routing.md.
 */
export function getIndexablePaths(
  projectIds: readonly string[],
): RootRelativePath[] {
  return [
    '/',
    ...projectIds.map((id) => `/projects/${id}/` as RootRelativePath),
    '/accessibility/',
  ];
}

/** Resolves each path with the same canonical logic the pages use. */
export function getIndexableUrls(projectIds: readonly string[]): AbsoluteUrl[] {
  return getIndexablePaths(projectIds).map((pathname) => {
    const { canonicalUrl } = getSeoMetadata({ pathname });

    if (canonicalUrl === undefined) {
      throw new Error(`Indexable path "${pathname}" has no canonical URL.`);
    }

    return canonicalUrl;
  });
}

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

export function buildSitemapXml(urls: readonly AbsoluteUrl[]): string {
  const entries = urls
    .map((url) => `  <url>\n    <loc>${escapeXml(url)}</loc>\n  </url>`)
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;
}

export function buildRobotsTxt(sitemapUrl: AbsoluteUrl): string {
  return `User-agent: *\nAllow: /\n\nSitemap: ${sitemapUrl}\n`;
}
