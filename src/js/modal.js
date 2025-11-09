export function openSubscriptionModal() {
  const modal = document.querySelector('.section-success-subscription');
  if (!modal) return;

  modal.classList.add('is-open');
  document.body.classList.add('modal-open');

  const closeModal = () => {
    modal.classList.remove('is-open');
    document.body.classList.remove('modal-open');
    closeBtn?.removeEventListener('click', closeModal);
    subscriptionClose?.removeEventListener('click', closeModal);
    modal.removeEventListener('click', overlayClickHandler);
    document.removeEventListener('keydown', escHandler);
  };

  const closeBtn = document.querySelector('.btn-success-subscription');
  const subscriptionClose = document.querySelector('.subscription-close');

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (subscriptionClose)
    subscriptionClose.addEventListener('click', closeModal);

  const overlayClickHandler = e => {
    if (e.target === modal) closeModal();
  };
  modal.addEventListener('click', overlayClickHandler);

  const escHandler = e => {
    if (e.key === 'Escape') closeModal();
  };
  document.addEventListener('keydown', escHandler);
}
