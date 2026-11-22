/**
 * Marks the link of the section being read with `aria-current="true"`.
 *
 * ADR-0007 purpose: orientation. Without JavaScript the links keep working,
 * they only lack the current state. A section counts as current while it
 * crosses a thin band just above the middle of the viewport.
 */
export function initCurrentSection(
  links: HTMLAnchorElement[],
  sections: HTMLElement[],
): () => void {
  const linkFor = new Map<Element, HTMLAnchorElement>();

  for (const section of sections) {
    const link = links.find(
      (candidate) => new URL(candidate.href).hash === `#${section.id}`,
    );

    if (link) {
      linkFor.set(section, link);
    }
  }

  if (linkFor.size === 0 || !('IntersectionObserver' in window)) {
    return () => {};
  }

  const tracked = sections.filter((section) => linkFor.has(section));
  let current: Element | undefined;

  const setCurrent = (section: Element | undefined) => {
    current = section;

    for (const link of linkFor.values()) {
      link.removeAttribute('aria-current');
    }

    if (section) {
      linkFor.get(section)?.setAttribute('aria-current', 'true');
    }
  };

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setCurrent(entry.target);
        } else if (
          entry.target === current &&
          entry.rootBounds &&
          entry.boundingClientRect.top >= entry.rootBounds.bottom
        ) {
          // Scrolling back up above the current section: the last section
          // that starts above the band becomes current, or none at the top.
          const bandTop = entry.rootBounds.top;
          setCurrent(
            tracked.findLast(
              (section) => section.getBoundingClientRect().top < bandTop,
            ),
          );
        }
      }
    },
    { rootMargin: '-45% 0px -50% 0px' },
  );

  for (const section of tracked) {
    observer.observe(section);
  }

  return () => {
    observer.disconnect();
  };
}
