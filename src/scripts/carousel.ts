/** Scroll-snap carousel controls: dots per page, prev/next, arrow keys. Centre mode marks the slide nearest the middle as current. */
export function initCarousels(): void {
  document.querySelectorAll<HTMLElement>('[data-carousel]').forEach((root) => {
    if (root.dataset.carouselMode === 'centre') {
      initCentre(root);
      return;
    }
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

/** Centre mode: one slide centred, prev/next step one slide, the nearest slide to the middle is current. */
function initCentre(root: HTMLElement): void {
  const track = root.querySelector<HTMLElement>('[data-carousel-track]');
  const prev = root.querySelector<HTMLButtonElement>('[data-carousel-prev]');
  const next = root.querySelector<HTMLButtonElement>('[data-carousel-next]');
  if (!track || !prev || !next) return;
  const slides = Array.from(track.children) as HTMLElement[];
  if (!slides.length) return;

  const centreOf = (el: HTMLElement) => el.offsetLeft + el.offsetWidth / 2;
  const current = () => {
    const mid = track.scrollLeft + track.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    slides.forEach((s, i) => {
      const d = Math.abs(centreOf(s) - mid);
      if (d < bestDist) { bestDist = d; best = i; }
    });
    return best;
  };
  const goTo = (i: number) => {
    const idx = Math.max(0, Math.min(slides.length - 1, i));
    track.scrollTo({ left: centreOf(slides[idx]) - track.clientWidth / 2, behavior: 'smooth' });
  };
  const update = () => {
    const idx = current();
    slides.forEach((s, i) => {
      s.classList.toggle('is-current', i === idx);
      s.setAttribute('aria-label', `${i + 1} of ${slides.length}`);
      s.setAttribute('role', 'group');
      s.setAttribute('aria-roledescription', 'slide');
    });
    prev.disabled = idx <= 0;
    next.disabled = idx >= slides.length - 1;
  };

  prev.addEventListener('click', () => goTo(current() - 1));
  next.addEventListener('click', () => goTo(current() + 1));
  track.addEventListener('keydown', (e) => {
    if (e.target !== track) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); goTo(current() + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(current() - 1); }
  });
  // A focused control inside a neighbour brings that slide to the centre.
  track.addEventListener('focusin', (e) => {
    const slide = slides.find((s) => s.contains(e.target as Node));
    if (slide && !slide.classList.contains('is-current')) goTo(slides.indexOf(slide));
  });
  let raf = 0;
  track.addEventListener('scroll', () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(update);
  }, { passive: true });
  window.addEventListener('resize', update);
  update();
}
