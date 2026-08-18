import {
  siteMetadata,
  type AbsoluteUrl,
  type RootRelativePath,
} from './siteMetadata';

type OpenGraphType = 'website' | 'profile';
type TwitterCardType = 'summary_large_image';

export type PageSeoMetadata = {
  title?: string;
  description?: string;
  pathname?: RootRelativePath;
  imagePath?: RootRelativePath;
  openGraphType?: OpenGraphType;
};

export type ResolvedSeoMetadata = {
  title: string;
  description: string;
  canonicalUrl: AbsoluteUrl;
  imageUrl: AbsoluteUrl;
  imageAlt: string;
  imageType: string;
  imageWidth: number;
  imageHeight: number;
  locale: string;
  openGraphType: OpenGraphType;
  siteName: string;
  twitterCard: TwitterCardType;
};

export type PersonStructuredData = {
  '@context': 'https://schema.org';
  '@type': 'Person';
  name: string;
  jobTitle: string;
  description: string;
  url: AbsoluteUrl;
  mainEntityOfPage: AbsoluteUrl;
  knowsAbout: readonly string[];
  sameAs?: AbsoluteUrl[];
};

function resolveTitle(title?: string) {
  if (!title || title === siteMetadata.defaultTitle) {
    return siteMetadata.defaultTitle;
  }

  return `${title} | ${siteMetadata.owner.name}`;
}

function resolveAbsoluteUrl(path: RootRelativePath) {
  if (path === '/') {
    return siteMetadata.siteUrl;
  }

  return new URL(path, `${siteMetadata.siteUrl}/`).toString() as AbsoluteUrl;
}

export function getSeoMetadata(
  pageMetadata: PageSeoMetadata,
): ResolvedSeoMetadata {
  const imagePath =
    pageMetadata.imagePath ?? siteMetadata.socialPreviewImage.path;

  return {
    title: resolveTitle(pageMetadata.title),
    description: pageMetadata.description ?? siteMetadata.defaultDescription,
    canonicalUrl: resolveAbsoluteUrl(pageMetadata.pathname ?? '/'),
    imageUrl: resolveAbsoluteUrl(imagePath),
    imageAlt: siteMetadata.socialPreviewImage.alt,
    imageType: siteMetadata.socialPreviewImage.mimeType,
    imageWidth: siteMetadata.socialPreviewImage.width,
    imageHeight: siteMetadata.socialPreviewImage.height,
    locale: siteMetadata.locale,
    openGraphType: pageMetadata.openGraphType ?? 'website',
    siteName: siteMetadata.siteName,
    twitterCard: 'summary_large_image',
  };
}

export function getPersonStructuredData(): PersonStructuredData {
  const structuredData: PersonStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteMetadata.owner.name,
    jobTitle: siteMetadata.owner.jobTitle,
    description: siteMetadata.owner.description,
    url: siteMetadata.siteUrl,
    mainEntityOfPage: siteMetadata.siteUrl,
    knowsAbout: siteMetadata.owner.knowsAbout,
  };

  if (siteMetadata.owner.profileUrls.length > 0) {
    structuredData.sameAs = [...siteMetadata.owner.profileUrls];
  }

  return structuredData;
}

export function serializeStructuredData(data: unknown) {
  return JSON.stringify(data).replaceAll('<', String.raw`\u003c`);
}
