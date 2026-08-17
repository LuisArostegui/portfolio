import type { HTMLAttributes } from 'astro/types';

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

export const primaryNavigation = [
  { label: 'Home', href: '/', kind: 'internal' },
  { label: 'Projects', href: '/projects', kind: 'internal' },
  { label: 'Experience', href: '/experience', kind: 'internal' },
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
  return item.kind === 'internal' && item.href === pathname;
}
