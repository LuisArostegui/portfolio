export type AbsoluteUrl = `http://${string}` | `https://${string}`;
export type RootRelativePath = `/${string}`;

export type SocialPreviewImage = {
  path: RootRelativePath;
  mimeType: 'image/png' | 'image/jpeg';
  width: number;
  height: number;
  alt: string;
};

export type OwnerProfile = {
  name: string;
  jobTitle: string;
  description: string;
  knowsAbout: readonly string[];
  profileUrls: readonly AbsoluteUrl[];
};

export type SiteMetadata = {
  siteUrl: AbsoluteUrl;
  siteName: string;
  defaultTitle: string;
  defaultDescription: string;
  locale: string;
  socialPreviewImage: SocialPreviewImage;
  owner: OwnerProfile;
};

export const siteMetadata = {
  siteUrl: 'https://luis-arostegui-portfolio.luisarosteguiruizit.workers.dev',
  siteName: 'Luis Arostegui Ruiz Portfolio',
  defaultTitle: 'Luis Arostegui Ruiz | Software Engineer',
  defaultDescription:
    'Portfolio for Luis Arostegui Ruiz, a software engineer focused on reliable, accessible, and maintainable web products.',
  locale: 'en_US',
  socialPreviewImage: {
    path: '/social-preview.png',
    mimeType: 'image/png',
    width: 1200,
    height: 630,
    alt: 'Luis Arostegui Ruiz portfolio preview',
  },
  owner: {
    name: 'Luis Arostegui Ruiz',
    jobTitle: 'Software Engineer',
    description:
      'Software engineer with strong frontend expertise, focused on reliable, accessible, and maintainable web products.',
    knowsAbout: [
      'Software engineering',
      'Frontend engineering',
      'Accessibility',
      'Testing',
      'Maintainability',
      'TypeScript',
      'Astro',
      'React',
    ],
    profileUrls: ['https://github.com/LuisArostegui'],
  },
} as const satisfies SiteMetadata;
