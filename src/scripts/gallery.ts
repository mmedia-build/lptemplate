/** Expands a collapsed gallery once; the button then leaves the page. */
export function initGalleries(): void {
  document.querySelectorAll<HTMLElement>('[data-gallery]').forEach((root) => {
    const button = root.querySelector<HTMLButtonElement>('[data-gallery-more]');
    if (!button) return;
    button.addEventListener('click', () => {
      root.classList.add('is-open');
      button.setAttribute('aria-expanded', 'true');
      button.hidden = true;
    });
  });
}
