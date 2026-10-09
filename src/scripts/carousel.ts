/** Scroll-snap carousel controls: dots per page, prev/next, arrow keys. */
export function initCarousels(): void {
  document.querySelectorAll<HTMLElement>('[data-carousel]').forEach((root) => {
    const track = root.querySelector<HTMLElement>('[data-carousel-track]');
    const dots = root.querySelector<HTMLElement>('[data-carousel-dots]');
    const prev = root.querySelector<HTMLButtonElement>('[data-carousel-prev]');
    const next = root.querySelector<HTMLButtonElement>('[data-carousel-next]');
    if (!track || !dots || !prev || !next) return;
    const slides = Array.from(track.children) as HTMLElement[];
    if (!slides.length) return;

    const pageCount = () => {
      const visible = Math.max(1, Math.round(track.clientWidth / (slides[0].offsetWidth + gap())));
      return Math.max(1, slides.length - visible + 1);
    };
    const gap = () => parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || '0') || 0;
    const step = () => slides[0].offsetWidth + gap();
    const currentIndex = () => Math.round(track.scrollLeft / step());

    const buildDots = () => {
      dots.innerHTML = '';
      const pages = pageCount();
      for (let i = 0; i < pages; i++) {
        const b = document.createElement('button');
        b.type = 'button';
        b.setAttribute('role', 'tab');
        b.setAttribute('aria-label', `Slide ${i + 1} of ${pages}`);
        b.addEventListener('click', () => goTo(i));
        dots.appendChild(b);
      }
      update();
    };

    const goTo = (index: number) => {
      const clamped = Math.max(0, Math.min(pageCount() - 1, index));
      track.scrollTo({ left: clamped * step(), behavior: 'smooth' });
    };

    const update = () => {
      const idx = currentIndex();
      const pages = pageCount();
      Array.from(dots.children).forEach((d, i) => d.setAttribute('aria-selected', String(i === idx)));
      prev.disabled = idx <= 0;
      next.disabled = idx >= pages - 1;
    };

    prev.addEventListener('click', () => goTo(currentIndex() - 1));
    next.addEventListener('click', () => goTo(currentIndex() + 1));
    track.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); goTo(currentIndex() + 1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(currentIndex() - 1); }
    });
    let raf = 0;
    track.addEventListener('scroll', () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    }, { passive: true });
    window.addEventListener('resize', buildDots);
    buildDots();
  });
}
