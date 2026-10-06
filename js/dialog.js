// Treat a complete backdrop click like Escape, preserving each dialog's cancel policy.
export function showModal(dialog) {
  let startedOutside = false;
  const outside = event => {
    const rect = dialog.getBoundingClientRect();
    return event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right ||
      event.clientY < rect.top || event.clientY > rect.bottom);
  };
  dialog.addEventListener('pointerdown', event => {
    startedOutside = event.button === 0 && outside(event);
  });
  dialog.addEventListener('pointercancel', () => { startedOutside = false; });
  dialog.addEventListener('click', event => {
    const dismiss = startedOutside && outside(event);
    startedOutside = false;
    if (dismiss && dialog.dispatchEvent(new Event('cancel', {cancelable: true}))) dialog.close();
  });
  dialog.showModal();
}
