(function preloadHeroBg() {
  const heroBg = new window.Image();

  if (window.devicePixelRatio >= 3) {
    heroBg.src = '/img/hero/img_01@3x.webp';
  } else if (window.devicePixelRatio >= 2) {
    heroBg.src = '/img/hero/img_01@2x.webp';
  } else {
    heroBg.src = '/img/hero/img_01.webp';
  }
})();
