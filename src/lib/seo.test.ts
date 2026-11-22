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
      imageAlt: 'Luis Arostegui Ruiz, Software Engineer at Openbank',
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
    expect(metadata.canonicalUrl).toBe(`${siteMetadata.siteUrl}/`);
  });

  it('resolves the root canonical with a trailing slash', () => {
    const metadata = getSeoMetadata({ pathname: '/' });

    expect(metadata.canonicalUrl).toBe(
      'https://luis-arostegui-portfolio.luisarosteguiruizit.workers.dev/',
    );
  });

  it('uses a page-specific social preview image and alt text', () => {
    const metadata = getSeoMetadata({
      imagePath: '/projects/example/social-preview.png',
      imageAlt: 'Example case study',
    });

    expect(metadata.imageUrl).toBe(
      'https://luis-arostegui-portfolio.luisarosteguiruizit.workers.dev/projects/example/social-preview.png',
    );
    expect(metadata.imageAlt).toBe('Example case study');
  });

  it('omits the canonical URL when a page opts out', () => {
    const metadata = getSeoMetadata({ canonical: false });

    expect(metadata.canonicalUrl).toBeUndefined();
  });

  it('includes confirmed public profile URLs in Person structured data', () => {
    const structuredData = getPersonStructuredData();

    expect(structuredData).toMatchObject({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Luis Arostegui Ruiz',
      jobTitle: 'Software Engineer',
      url: `${siteMetadata.siteUrl}/`,
      mainEntityOfPage: `${siteMetadata.siteUrl}/`,
    });
    expect(structuredData).toMatchObject({
      sameAs: [
        'https://github.com/LuisArostegui',
        'https://www.linkedin.com/in/luisarosteguiruiz/',
      ],
    });
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
