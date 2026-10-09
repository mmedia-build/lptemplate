/** Before/after compare slider: pointer drag anywhere on the image, arrow keys on the handle. */
export function initCompareSliders(): void {
  document.querySelectorAll<HTMLElement>('[data-compare]').forEach((root) => {
    const handle = root.querySelector<HTMLElement>('[data-compare-handle]');
    if (!handle) return;
    let dragging = false;

    const setSplit = (percent: number) => {
      const clamped = Math.max(0, Math.min(100, percent));
      root.style.setProperty('--split', `${clamped}%`);
      handle.setAttribute('aria-valuenow', String(Math.round(clamped)));
    };
    const current = () => parseFloat(root.style.getPropertyValue('--split')) || 50;
    const fromEvent = (e: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      return ((e.clientX - rect.left) / rect.width) * 100;
    };

    root.addEventListener('pointerdown', (e) => {
      dragging = true;
      root.setPointerCapture(e.pointerId);
      setSplit(fromEvent(e));
    });
    root.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      setSplit(fromEvent(e));
    });
    const stop = () => {
      dragging = false;
    };
    root.addEventListener('pointerup', stop);
    root.addEventListener('pointercancel', stop);
    root.addEventListener('lostpointercapture', stop);

    handle.addEventListener('keydown', (e) => {
      const stepSize = e.shiftKey ? 10 : 2;
      if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { e.preventDefault(); setSplit(current() - stepSize); }
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { e.preventDefault(); setSplit(current() + stepSize); }
      if (e.key === 'Home') { e.preventDefault(); setSplit(0); }
      if (e.key === 'End') { e.preventDefault(); setSplit(100); }
    });
  });
}
