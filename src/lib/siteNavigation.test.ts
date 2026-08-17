import { describe, expect, it } from 'vitest';
import {
  getLinkAttributes,
  isCurrentPage,
  type NavigationItem,
} from './siteNavigation';

describe('site navigation', () => {
  it('marks only an exact internal route as the current page', () => {
    const projects: NavigationItem = {
      label: 'Projects',
      href: '/projects',
      kind: 'internal',
    };

    expect(isCurrentPage(projects, '/projects')).toBe(true);
    expect(isCurrentPage(projects, '/projects/example')).toBe(false);
  });

  it('derives safe external-link attributes from the item kind', () => {
    const item = {
      label: 'GitHub',
      href: 'https://github.com/example',
      kind: 'external',
    } as const satisfies NavigationItem;

    expect(getLinkAttributes(item)).toEqual({
      target: '_blank',
      rel: 'noreferrer',
    });
  });

  it('derives the native download attribute from the item kind', () => {
    const item = {
      label: 'Download CV',
      href: '/cv.pdf',
      kind: 'download',
    } as const satisfies NavigationItem;

    expect(getLinkAttributes(item)).toEqual({ download: true });
  });
});
