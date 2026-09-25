(function () {
  'use strict';

  var doc = document.documentElement;

  function getStoredValue(key) {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      return null;
    }
  }

  function setStoredValue(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      // Ignore storage issues in restricted browsers.
    }
  }

  /* THEME */
  function setTheme(mode) {
    var safeMode = mode === 'dark' ? 'dark' : 'light';
    doc.classList.toggle('is-dark', safeMode === 'dark');
    setStoredValue('theme', safeMode);
  }

  var storedTheme = getStoredValue('theme');
  if (!storedTheme) {
    storedTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  setTheme(storedTheme);

  document.querySelectorAll('#theme-toggle, #theme-toggle-mobile').forEach(function (btn) {
    btn.addEventListener('click', function () {
      setTheme(doc.classList.contains('is-dark') ? 'light' : 'dark');
    });
  });

  /* LANGUAGE */
  var dict = {
    en: {
      'nav.home': 'Home',
      'nav.nepali': 'Nepali',
      'nav.english': 'English',
      'nav.games': 'Games',
      'nav.about': 'About',
      'nav.contact': 'Contact',
      'hero.badge': 'Nepal · Class 10 · SEE 2082/83',
      'hero.title1': 'Knowledge',
      'hero.title2': 'Confidence',
      'hero.title3': 'Results',
      'hero.sub': "Class 10 study resources built for Nepal's SEE students.",
      'card.available': 'Available',
      'card.soon': 'Soon',
      'card.nepali': 'Nepali',
      'card.nepali.desc': 'Notes · Grammar · Solutions',
      'card.english': 'English',
      'card.english.desc': 'Notes · Grammar · Solutions',
      'card.science': 'Science',
      'card.science.desc': 'Notes · Solutions',
      'card.math': 'Mathematics',
      'card.math.desc': 'Step-by-step solutions',
      'content.about.title': 'About PragyaRoot',
      'content.about.body': 'PragyaRoot is a free study resource for Class 10 students preparing for the SEE examination in Nepal.',
      'content.why.title': 'Why it exists',
      'content.why.body': 'Most Class 10 material online is either too shallow to be useful or too dense to read on a phone.',
      'content.what.title': "What you'll find",
      'content.what.li1': 'Chapter notes for every subject',
      'content.what.li2': 'Step-by-step exercise solutions',
      'content.what.li3': 'Nepali and English grammar guides',
      'content.what.li4': 'Interactive learning games',
      'content.cta': 'Learn more',
      'footer.tagline': "Class 10 study resources for Nepal's SEE students.",
      'footer.study': 'Study',
      'footer.site': 'Site',
      'footer.privacy': 'Privacy',
      'footer.copy': '© 2026 PragyaRoot. All rights reserved.',
      'footer.made': 'Made in Nepal'
    },
    ne: {
      'nav.home': 'गृहपृष्ठ',
      'nav.nepali': 'नेपाली',
      'nav.english': 'अङ्ग्रेजी',
      'nav.games': 'खेलहरू',
      'nav.about': 'हाम्रोबारे',
      'nav.contact': 'सम्पर्क',
      'hero.badge': 'नेपाल · कक्षा १० · SEE २०८२/८३',
      'hero.title1': 'ज्ञान',
      'hero.title2': 'आत्मविश्वास',
      'hero.title3': 'नतिजा',
      'hero.sub': 'नेपालका SEE विद्यार्थीहरूको लागि कक्षा १० अध्ययन सामग्री।',
      'card.available': 'उपलब्ध',
      'card.soon': 'चाँडै',
      'card.nepali': 'नेपाली',
      'card.nepali.desc': 'नोट्स · व्याकरण · समाधान',
      'card.english': 'अङ्ग्रेजी',
      'card.english.desc': 'नोट्स · व्याकरण · समाधान',
      'card.science': 'विज्ञान',
      'card.science.desc': 'नोट्स · समाधान',
      'card.math': 'गणित',
      'card.math.desc': 'चरणबद्ध समाधान',
      'content.about.title': 'प्रज्ञारूटको बारेमा',
      'content.about.body': 'प्रज्ञारूट नेपालमा SEE परीक्षाको तयारी गर्ने कक्षा १० का विद्यार्थीहरूका लागि नि:शुल्क अध्ययन सामग्री हो।',
      'content.why.title': 'यो किन छ',
      'content.why.body': 'अधिकारमा पाइने धेरै कक्षा १० सामग्री या त धेरै सरल हुन्छ वा फोनमा पढ्न धेरै कठिन हुन्छ।',
      'content.what.title': 'तपाईंले के पाउनुहुनेछ',
      'content.what.li1': 'प्रत्येक विषयका अध्याय नोट्स',
      'content.what.li2': 'चरणबद्ध अभ्यास समाधान',
      'content.what.li3': 'नेपाली र अङ्ग्रेजी व्याकरण मार्गदर्शन',
      'content.what.li4': 'अन्तरक्रियात्मक सिकाइ खेलहरू',
      'content.cta': 'अझ जान्नुहोस्',
      'footer.tagline': 'नेपालका SEE विद्यार्थीहरूको लागि कक्षा १० अध्ययन सामग्री।',
      'footer.study': 'अध्ययन',
      'footer.site': 'साइट',
      'footer.privacy': 'गोपनीयता',
      'footer.copy': '© २०२६ प्रज्ञारूट। सर्वाधिकार सुरक्षित।',
      'footer.made': 'नेपालमा निर्मित'
    }
  };

  function applyLanguage(lang) {
    var currentLanguage = dict[lang] ? lang : 'en';
    var pack = dict[currentLanguage];

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (pack[key] != null) {
        el.textContent = pack[key];
      }
    });

    doc.setAttribute('lang', currentLanguage === 'ne' ? 'ne' : 'en');

    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      var isActive = btn.dataset.lang === currentLanguage;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', String(isActive));
    });

    setStoredValue('lang', currentLanguage);
  }

  document.querySelectorAll('.lang-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyLanguage(btn.dataset.lang);
    });
  });

  applyLanguage(getStoredValue('lang') || 'en');

  /* MOBILE MENU */
  var hamburger = document.getElementById('hamburger');
  var closeBtn = document.getElementById('sidebar-close');
  var overlay = document.getElementById('overlay');

  function closeMenu() {
    document.body.classList.remove('menu-open');
  }

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      document.body.classList.add('menu-open');
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeMenu);
  }

  if (overlay) {
    overlay.addEventListener('click', closeMenu);
  }

  /* BACK TO TOP */
  var backTop = document.getElementById('back-top');
  if (backTop) {
    window.addEventListener('scroll', function () {
      backTop.classList.toggle('show', window.scrollY > 400);
    });
    backTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();
