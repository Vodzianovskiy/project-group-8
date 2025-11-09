document.addEventListener('DOMContentLoaded', async () => {
  const [mobileMenuModule, experienceAnimModule, modalModule] =
    await Promise.all([
      import('/js/mobile-menu.js'),
      import('/js/experience-anim.js'),
      import('/js/modal.js'),
    ]);

  const { initMobileMenu } = mobileMenuModule;
  const { default: initExperienceAnim } = experienceAnimModule;
  const { openSubscriptionModal } = modalModule;

  const openMenuBtn = document.querySelector('.burger-buttom');
  if (openMenuBtn) {
    openMenuBtn.addEventListener('click', () => initMobileMenu(), {
      once: true,
    });
  }

  if (window.matchMedia('(min-width: 768px)').matches) {
    initExperienceAnim();
  }

  const subscribeBtn = document.querySelector('.input_button[type="submit"]');
  if (subscribeBtn) {
    subscribeBtn.addEventListener('click', e => {
      e.preventDefault();
      openSubscriptionModal();
    });
  }
});
