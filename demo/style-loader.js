(function () {
  'use strict';

  // Load the stylesheet from the same directory as this script. Using a URL
  // based on the script location keeps this working on GitHub Pages and when
  // the site is opened from a nested route.
  var script = document.currentScript;
  var stylesheetUrl = new URL('style.css', script ? script.src : window.location.href).href;
  var existing = document.querySelector('link[data-pragyaroot-stylesheet]');

  if (existing) {
    existing.href = stylesheetUrl;
    return;
  }

  var stylesheet = document.createElement('link');
  stylesheet.rel = 'stylesheet';
  stylesheet.href = stylesheetUrl;
  stylesheet.dataset.pragyarootStylesheet = 'true';
  stylesheet.onload = function () {
    document.documentElement.classList.add('styles-loaded');
  };
  stylesheet.onerror = function () {
    console.error('PragyaRoot: unable to load stylesheet:', stylesheetUrl);
  };

  document.head.appendChild(stylesheet);
})();
