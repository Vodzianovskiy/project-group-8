let currentObserver = null;
let isDesktop = window.matchMedia('(min-width: 768px)').matches;

const destroyObserver = () => {
  if (currentObserver) {
    currentObserver.disconnect();
    currentObserver = null;
  }
};

const createObserver = () => {
  const expSection = document.querySelector('.experience');
  if (!expSection) return;

  destroyObserver();

  currentObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        const target = entry.target;
        if (entry.isIntersecting) {
          target.classList.add('show');
        } else {
          target.classList.remove('show');
        }
      });
    },
    {
      threshold: 0.23,
      rootMargin: '0px 0px -10% 0px',
    }
  );

  currentObserver.observe(expSection);
};

const initExperienceAnim = () => {
  if (isDesktop) {
    createObserver();
  } else {
    destroyObserver();
  }
};

const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

const handleResize = debounce(() => {
  const newIsDesktop = window.matchMedia('(min-width: 768px)').matches;
  if (newIsDesktop !== isDesktop) {
    isDesktop = newIsDesktop;
    initExperienceAnim();
  }
}, 150);

window.addEventListener('resize', handleResize);

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initExperienceAnim);
} else {
  initExperienceAnim();
}

export default initExperienceAnim;
