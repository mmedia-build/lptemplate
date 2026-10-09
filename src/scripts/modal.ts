/** Opens <dialog data-modal> elements from any [data-open-modal] trigger; closes on button, Escape (native) or backdrop click. */
export function initModals(): void {
  document.addEventListener('click', (event) => {
    const target = event.target as Element | null;
    if (!target) return;

    const opener = target.closest<HTMLElement>('[data-open-modal]');
    if (opener) {
      const id = opener.dataset.openModal;
      const dialog = document.querySelector<HTMLDialogElement>(`dialog[data-modal="${id}"]`);
      if (dialog && typeof dialog.showModal === 'function') {
        dialog.showModal();
        dialog.scrollTop = 0;
      }
      return;
    }

    const closer = target.closest<HTMLElement>('[data-close-modal]');
    if (closer) {
      closer.closest('dialog')?.close();
      return;
    }

    if (target instanceof HTMLDialogElement && target.open) {
      // A click on the dialog element itself (not its children) is a backdrop click.
      const rect = target.getBoundingClientRect();
      const e = event as MouseEvent;
      const inside = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
      if (!inside) target.close();
    }
  });
}
