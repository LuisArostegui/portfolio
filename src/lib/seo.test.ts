import { describe, expect, it } from 'vitest';
import { siteMetadata } from './siteMetadata';
import {
  getPersonStructuredData,
  getSeoMetadata,
  serializeStructuredData,
} from './seo';

describe('SEO metadata helpers', () => {
  it('resolves page metadata with canonical and social preview URLs', () => {
    const metadata = getSeoMetadata({
      title: 'Projects',
      description: 'Selected portfolio projects and engineering case studies.',
      pathname: '/projects/',
    });

    expect(metadata).toEqual({
      title: 'Projects | Luis Arostegui Ruiz',
      description: 'Selected portfolio projects and engineering case studies.',
      canonicalUrl:
        'https://luis-arostegui-portfolio.luisarosteguiruizit.workers.dev/projects/',
      imageUrl:
        'https://luis-arostegui-portfolio.luisarosteguiruizit.workers.dev/social-preview.png',
      imageAlt: 'Luis Arostegui Ruiz portfolio preview',
      imageHeight: 630,
      imageType: 'image/png',
      imageWidth: 1200,
      locale: 'en_US',
      openGraphType: 'website',
      siteName: 'Luis Arostegui Ruiz Portfolio',
      twitterCard: 'summary_large_image',
    });
  });

  it('applies safe site defaults when page metadata is not provided', () => {
    const metadata = getSeoMetadata({});

    expect(metadata.title).toBe(siteMetadata.defaultTitle);
    expect(metadata.description).toBe(siteMetadata.defaultDescription);
    expect(metadata.canonicalUrl).toBe(siteMetadata.siteUrl);
  });

  it('omits unconfirmed public profile URLs from Person structured data', () => {
    const structuredData = getPersonStructuredData();

    expect(structuredData).toMatchObject({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Luis Arostegui Ruiz',
      jobTitle: 'Software Engineer',
      url: siteMetadata.siteUrl,
    });
    expect(structuredData).not.toHaveProperty('sameAs');
  });

  it('serializes structured data without literal script-closing text', () => {
    const serialized = serializeStructuredData({
      '@context': 'https://schema.org',
      '@type': 'Thing',
      name: '</script>',
    });

    expect(serialized).not.toContain('</script>');
    expect(serialized).toContain('\\u003c/script>');
  });
});
