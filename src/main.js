document.addEventListener('DOMContentLoaded', function () {
  const refs = {
    openModalBtn: document.querySelector('.burger-buttom'),
    closeModalBtn: document.querySelector('[data-menu-close]'),
    modal: document.querySelector('[data-menu]'),
  };

  if (refs.openModalBtn) {
    refs.openModalBtn.addEventListener('click', toggleModal);
  }
  if (refs.closeModalBtn) {
    refs.closeModalBtn.addEventListener('click', toggleModal);
  }
  if (refs.modal) {
    refs.modal.addEventListener('click', e => {
      if (e.target === refs.modal) {
        toggleModal();
      }
    });
  }

  document.addEventListener('keydown', e => {
    if (
      e.code === 'Escape' &&
      refs.modal &&
      refs.modal.classList.contains('is-open')
    ) {
      toggleModal();
    }
  });

  function toggleModal() {
    if (refs.modal) {
      refs.modal.classList.toggle('is-open');
    }
  }
});

// при загрузке

document.addEventListener('DOMContentLoaded', function () {
  function showOnScroll(selector) {
    document.querySelectorAll(selector).forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        el.classList.add('visible');
      }
    });
  }

  window.addEventListener('scroll', function () {
    showOnScroll('.hero-title, .hero-text, .hero-button');
  });

  // Первый вызов сразу после загрузки DOM
  showOnScroll('.hero-title, .hero-text, .hero-button');
});

// фото experience
