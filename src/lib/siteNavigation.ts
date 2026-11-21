import type { HTMLAttributes } from 'astro/types';
import { siteMetadata } from './siteMetadata';

type NavigationItemKind = 'internal' | 'external' | 'download';

export type NavigationItem = {
  [Kind in NavigationItemKind]: {
    label: string;
    href: string;
    kind: Kind;
  };
}[NavigationItemKind];

type LinkAttributes = Partial<
  Pick<HTMLAttributes<'a'>, 'target' | 'rel' | 'download'>
>;

function normalizePathname(value: string) {
  let normalized = value;

  while (normalized.length > 1 && normalized.endsWith('/')) {
    normalized = normalized.slice(0, -1);
  }

  return normalized;
}

const [githubUrl, linkedInUrl] = siteMetadata.owner.profileUrls;

export const primaryNavigation = [
  { label: 'Experience', href: '/#experience', kind: 'internal' },
  { label: 'Work', href: '/#work', kind: 'internal' },
  { label: 'About', href: '/#about', kind: 'internal' },
  { label: 'Contact', href: '/#contact', kind: 'internal' },
] satisfies readonly NavigationItem[];

export const cvAction = {
  label: 'CV',
  href: '/CV-Luis-Arostegui-Ruiz.pdf',
  kind: 'download',
} as const satisfies NavigationItem;

export const footerNavigation = [
  ...primaryNavigation,
  { label: 'Accessibility', href: '/accessibility/', kind: 'internal' },
  { label: 'GitHub', href: githubUrl, kind: 'external' },
  { label: 'LinkedIn', href: linkedInUrl, kind: 'external' },
] satisfies readonly NavigationItem[];

export function getLinkAttributes(item: NavigationItem): LinkAttributes {
  if (item.kind === 'external') {
    return { target: '_blank', rel: 'noreferrer' };
  }

  if (item.kind === 'download') {
    return { download: true };
  }

  return {};
}

export function isCurrentPage(item: NavigationItem, pathname: string) {
  if (item.kind !== 'internal') {
    return false;
  }

  const currentPathname = normalizePathname(pathname);

  if (item.href.includes('#')) {
    return item.href === '/#work' && currentPathname.startsWith('/projects/');
  }

  const itemPathname = normalizePathname(item.href);

  if (itemPathname === '/') {
    return currentPathname === itemPathname;
  }

  return (
    currentPathname === itemPathname ||
    currentPathname.startsWith(`${itemPathname}/`)
  );
}
