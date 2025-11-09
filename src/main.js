document.addEventListener('DOMContentLoaded', async () => {
  const mobileMenuCache = import('/js/mobile-menu.js');
  const experienceAnimCache = import('/js/experience-anim.js');
  const modalCache = import('/js/modal.js');

  const openMenuBtn = document.querySelector('.burger-buttom');
  if (openMenuBtn) {
    openMenuBtn.addEventListener(
      'click',
      async () => {
        const { initMobileMenu } = await mobileMenuCache;
        initMobileMenu();
      },
      { once: true }
    );
  }

  if (window.matchMedia('(min-width: 768px)').matches) {
    const experienceAnimCache = import('/js/experience-anim.js');
    const initExperienceAnim = (await experienceAnimCache).default;
    initExperienceAnim();
  }

  const subscribeBtn = document.querySelector('.input_button[type="submit"]');
  if (subscribeBtn) {
    subscribeBtn.addEventListener(
      'click',
      async e => {
        e.preventDefault();
        const { openSubscriptionModal } = await modalCache;
        openSubscriptionModal();
      },
      { once: false }
    );
  }
});
