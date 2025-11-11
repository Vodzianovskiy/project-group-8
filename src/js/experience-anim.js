let currentObserver = null;
let isTablet = window.matchMedia('(min-width: 768px)').matches;

const destroyObserver = () => {
  if (currentObserver) {
    currentObserver.disconnect();
    currentObserver = null;
  }
};

const createObserver = () => {
  const section = document.querySelector('.experience');
  if (!section) return;
  destroyObserver();
  currentObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        } else {
          entry.target.classList.remove('show');
        }
      });
    },
    {
      threshold: 0.01,
      rootMargin: '-5% 0px -5% 0px',
    }
  );
  currentObserver.observe(section);
};

const initExperienceAnim = () => {
  destroyObserver();
  if (isTablet) {
    createObserver();
  } else {
    const section = document.querySelector('.experience');
    if (section) section.classList.remove('show');
  }
};

const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      requestAnimationFrame(() => func.apply(this, args));
    }, wait);
  };
};

const handleResize = debounce(() => {
  const newIsTablet = window.matchMedia('(min-width: 768px)').matches;
  if (newIsTablet !== isTablet) {
    isTablet = newIsTablet;
    initExperienceAnim();
  }
}, 150);

window.addEventListener('resize', handleResize, { passive: true });

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initExperienceAnim);
} else {
  initExperienceAnim();
}

export default initExperienceAnim;
