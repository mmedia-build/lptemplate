/** Adds .is-visible to .reveal elements as they enter the viewport. Respects reduced motion. */
export function initReveal(): void {
  const items = document.querySelectorAll<HTMLElement>('.reveal');
  if (!items.length) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
  );
  items.forEach((el) => observer.observe(el));
}
