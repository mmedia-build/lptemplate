/**
 * Accordion: one item open at a time, the first open on load. Buttons carry
 * aria-expanded; panels animate through a grid-row transition in CSS.
 */
export function initFaqs(): void {
  document.querySelectorAll<HTMLElement>('[data-faq]').forEach((root) => {
    const items = Array.from(root.querySelectorAll<HTMLElement>('[data-faq-item]'));
    const setOpen = (item: HTMLElement, open: boolean) => {
      item.classList.toggle('is-open', open);
      item.querySelector<HTMLButtonElement>('[data-faq-trigger]')?.setAttribute('aria-expanded', String(open));
    };
    items.forEach((item, index) => {
      setOpen(item, index === 0);
      item.querySelector<HTMLButtonElement>('[data-faq-trigger]')?.addEventListener('click', () => {
        const willOpen = !item.classList.contains('is-open');
        items.forEach((other) => setOpen(other, other === item && willOpen));
      });
    });
  });
}
