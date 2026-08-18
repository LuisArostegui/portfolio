import { describe, expect, it } from 'vitest';
import {
  getLinkAttributes,
  isCurrentPage,
  type NavigationItem,
} from './siteNavigation';

describe('site navigation', () => {
  it('marks an internal route and its generated child routes as current', () => {
    const projects: NavigationItem = {
      label: 'Projects',
      href: '/projects/',
      kind: 'internal',
    };

    expect(isCurrentPage(projects, '/projects')).toBe(true);
    expect(isCurrentPage(projects, '/projects/')).toBe(true);
    expect(isCurrentPage(projects, '/projects///')).toBe(true);
    expect(isCurrentPage(projects, '/projects/portfolio-foundation/')).toBe(
      true,
    );
    expect(isCurrentPage(projects, '/projects-example/')).toBe(false);
  });

  it('keeps Home current only for the root route', () => {
    const home: NavigationItem = {
      label: 'Home',
      href: '/',
      kind: 'internal',
    };

    expect(isCurrentPage(home, '/')).toBe(true);
    expect(isCurrentPage(home, '/projects/portfolio-foundation/')).toBe(false);
  });

  it('does not mark a home section anchor as the current page route', () => {
    const contact: NavigationItem = {
      label: 'Contact',
      href: '/#contact',
      kind: 'internal',
    };

    expect(isCurrentPage(contact, '/')).toBe(false);
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
