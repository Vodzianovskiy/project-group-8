document.addEventListener('DOMContentLoaded', () => {
  const openMenuBtn = document.querySelector('.burger-buttom');
  if (openMenuBtn) {
    let debounceTimer;
    openMenuBtn.addEventListener(
      'click',
      async () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(async () => {
          const { initMobileMenu } = await import('/js/mobile-menu.js');
          initMobileMenu();
        }, 100);
      },
      { once: true }
    );
  }

  if (window.matchMedia('(min-width: 768px)').matches) {
    const expSection = document.querySelector('.experience');
    if (expSection && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(async entry => {
            if (entry.isIntersecting) {
              observer.unobserve(entry.target);
              try {
                const experienceAnimCache = await import(
                  '/js/experience-anim.js'
                );
                const initExperienceAnim = experienceAnimCache.default;
                initExperienceAnim();
              } catch {}
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px',
        }
      );
      observer.observe(expSection);
    } else {
      const onScroll = async () => {
        if (expSection.getBoundingClientRect().top < window.innerHeight) {
          window.removeEventListener('scroll', onScroll);
          const experienceAnimCache = await import('/js/experience-anim.js');
          const initExperienceAnim = experienceAnimCache.default;
          initExperienceAnim();
        }
      };
      window.addEventListener('scroll', onScroll, { passive: true });
    }
  }

  const subscribeBtn = document.querySelector('.input_button[type="submit"]');
  if (subscribeBtn) {
    subscribeBtn.addEventListener(
      'click',
      async e => {
        e.preventDefault();
        const form = subscribeBtn.closest('form');
        if (form && !form.checkValidity()) {
          form.reportValidity();
          return;
        }
        try {
          const { openSubscriptionModal } = await import('/js/modal.js');
          openSubscriptionModal();
        } catch {
          alert('підписка єєє! ');
        }
      },
      { once: false }
    );
  }

  if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });
    lazyImages.forEach(img => imageObserver.observe(img));
  }
});
