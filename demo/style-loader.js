(function () {
  'use strict';

  var currentScript = document.currentScript;
  var baseUrl = currentScript && currentScript.src ? currentScript.src : window.location.href;
  var stylesheetUrl = new URL('./style.css', baseUrl).href;
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
