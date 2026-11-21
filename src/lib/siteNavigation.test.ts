import { describe, expect, it } from 'vitest';
import {
  cvAction,
  footerNavigation,
  getLinkAttributes,
  isCurrentPage,
  primaryNavigation,
  type NavigationItem,
} from './siteNavigation';

describe('site navigation', () => {
  const item = (label: string): NavigationItem => {
    const found = primaryNavigation.find((entry) => entry.label === label);

    if (!found) {
      throw new Error(`Missing navigation item: ${label}`);
    }

    return found;
  };
  const experience = item('Experience');
  const work = item('Work');
  const about = item('About');
  const contact = item('Contact');

  it('lists the primary destinations in order', () => {
    expect(primaryNavigation).toEqual([
      { label: 'Experience', href: '/#experience', kind: 'internal' },
      { label: 'Work', href: '/#work', kind: 'internal' },
      { label: 'About', href: '/#about', kind: 'internal' },
      { label: 'Contact', href: '/#contact', kind: 'internal' },
    ]);
  });

  it('exposes the CV as a download action', () => {
    expect(cvAction).toEqual({
      label: 'CV',
      href: '/CV-Luis-Arostegui-Ruiz.pdf',
      kind: 'download',
    });
    expect(cvAction.kind).toBe('download');
  });

  it('extends the footer with accessibility and profile links', () => {
    expect(footerNavigation.slice(0, 4)).toEqual(primaryNavigation);
    expect(footerNavigation.slice(4)).toEqual([
      { label: 'Accessibility', href: '/accessibility/', kind: 'internal' },
      {
        label: 'GitHub',
        href: 'https://github.com/LuisArostegui',
        kind: 'external',
      },
      {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/luisarosteguiruiz/',
        kind: 'external',
      },
    ]);
  });

  it('marks Work as current on project routes only', () => {
    expect(isCurrentPage(work, '/projects/portfolio-foundation/')).toBe(true);
    expect(isCurrentPage(work, '/projects/portfolio-foundation')).toBe(true);
    expect(isCurrentPage(work, '/')).toBe(false);
  });

  it('never marks a home section anchor as current on the home page', () => {
    for (const entry of [experience, work, about, contact]) {
      expect(isCurrentPage(entry, '/')).toBe(false);
    }
    expect(isCurrentPage(experience, '/projects/portfolio-foundation/')).toBe(
      false,
    );
  });

  it('marks a route page and its child routes as current', () => {
    const accessibility: NavigationItem = {
      label: 'Accessibility',
      href: '/accessibility/',
      kind: 'internal',
    };

    expect(isCurrentPage(accessibility, '/accessibility')).toBe(true);
    expect(isCurrentPage(accessibility, '/accessibility///')).toBe(true);
    expect(isCurrentPage(accessibility, '/accessibility-example/')).toBe(false);
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
