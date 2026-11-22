/**
 * Marks the link of the section being read with `aria-current="true"`.
 *
 * ADR-0007 purpose: orientation. Without JavaScript the links keep working,
 * they only lack the current state.
 *
 * The current section is the last one whose top has passed the middle of the
 * viewport, or, once the page cannot scroll further, the last one whose top
 * is on screen. The state is derived from geometry rather than from crossing
 * events, so anchor jumps that skip sections still land on the right link.
 * It is recalculated when a section crosses the middle of the viewport
 * (IntersectionObserver), when scrolling ends and when the hash changes.
 */
export function initCurrentSection(
  links: HTMLAnchorElement[],
  sections: HTMLElement[],
): () => void {
  const linkFor = new Map<HTMLElement, HTMLAnchorElement>();

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
  let current: HTMLElement | undefined;

  const update = () => {
    const viewportHeight = window.innerHeight;
    const root = document.documentElement;
    const atEnd =
      Math.ceil(window.scrollY + viewportHeight) >= root.scrollHeight - 2;
    const line = atEnd ? viewportHeight : viewportHeight / 2;
    const next = tracked.findLast(
      (section) => section.getBoundingClientRect().top < line,
    );

    if (next === current) {
      return;
    }

    if (current) {
      linkFor.get(current)?.removeAttribute('aria-current');
    }

    current = next;

    if (current) {
      linkFor.get(current)?.setAttribute('aria-current', 'true');
    }
  };

  // The root is the top half of the viewport, so a section enters or leaves
  // it exactly when its top edge crosses the middle line.
  const observer = new IntersectionObserver(update, {
    rootMargin: '0px 0px -50% 0px',
  });

  for (const section of tracked) {
    observer.observe(section);
  }

  window.addEventListener('scrollend', update);
  window.addEventListener('hashchange', update);
  update();

  return () => {
    observer.disconnect();
    window.removeEventListener('scrollend', update);
    window.removeEventListener('hashchange', update);
  };
}
