/* =========================================================================
   app.js — boot, language switching, dynamic rendering, interactions.
   ========================================================================= */
(function () {
  'use strict';

  var I18N = window.I18N, PROFILE = window.PROFILE, VCard = window.VCard;
  var SUPPORTED = ['en', 'ru'];
  var STORE_KEY = 'rh-lang';
  var state = { lang: 'en' };

  /* ----------------------------- helpers ------------------------------- */
  function pick(field, lang) {
    if (field == null) return '';
    return typeof field === 'object' ? (field[lang] || field.en || '') : field;
  }
  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function detectLang() {
    var saved = null;
    try { saved = localStorage.getItem(STORE_KEY); } catch (e) {}
    if (saved && SUPPORTED.indexOf(saved) > -1) return saved;
    var nav = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
    return nav.indexOf('ru') === 0 ? 'ru' : 'en';
  }

  /* --------------------------- apply language -------------------------- */
  function applyI18n(lang) {
    var dict = I18N[lang] || I18N.en;
    document.querySelectorAll('[data-i18n]').forEach(function (node) {
      var key = node.getAttribute('data-i18n');
      var val = dict[key];
      if (val == null) return;
      var attr = node.getAttribute('data-i18n-attr');
      if (attr) node.setAttribute(attr, val);
      else node.textContent = val;
    });
    document.documentElement.lang = lang;
    document.documentElement.setAttribute('data-lang', lang);
    document.title = dict.first_name + ' ' + dict.last_name + ' — ' + dict.role;

    // language switch buttons
    document.querySelectorAll('[data-lang-btn]').forEach(function (b) {
      var on = b.getAttribute('data-lang-btn') === lang;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });

    // CV download link → language-specific PDF
    var pdf = lang === 'ru' ? '/cv/Rahbar-Homidova-CV-RU.pdf' : '/cv/Rahbar-Homidova-CV-EN.pdf';
    document.querySelectorAll('[data-cv-link]').forEach(function (a) { a.setAttribute('href', pdf); });
  }

  /* --------------------------- render: dynamic ------------------------- */
  // Hide a whole section (and any nav links pointing to it) when it has no data,
  // so the site always looks complete — sections appear automatically once filled.
  function toggleSection(id, hasData) {
    var sec = document.getElementById(id);
    if (sec) sec.hidden = !hasData;
    document.querySelectorAll('a[href="#' + id + '"]').forEach(function (a) {
      a.style.display = hasData ? '' : 'none';
    });
  }

  function renderExperience(lang) {
    var wrap = document.getElementById('timeline');
    if (!wrap) return;
    var items = PROFILE.experience || [];
    toggleSection('experience', items.length > 0);
    if (!items.length) { wrap.innerHTML = ''; return; }
    wrap.innerHTML = '';
    items.forEach(function (it) {
      var li = el('li', 'tl-item reveal');
      var period = pick(it.period, lang);
      var org = pick(it.org, lang);
      var loc = pick(it.location, lang);
      var bullets = (it.bullets && (it.bullets[lang] || it.bullets.en)) || [];
      var html = '';
      if (period) html += '<p class="tl-item__period">' + escapeHtml(period) + '</p>';
      html += '<h3 class="tl-item__role">' + escapeHtml(pick(it.role, lang)) + '</h3>';
      html += '<p class="tl-item__org">' + escapeHtml(org) + (loc ? '<span> · ' + escapeHtml(loc) + '</span>' : '') + '</p>';
      if (bullets.length) {
        html += '<div class="tl-item__desc"><ul>' +
          bullets.map(function (b) { return '<li>' + escapeHtml(b) + '</li>'; }).join('') + '</ul></div>';
      } else if (it.summary) {
        html += '<div class="tl-item__desc"><p>' + escapeHtml(pick(it.summary, lang)) + '</p></div>';
      }
      li.innerHTML = html;
      wrap.appendChild(li);
    });
  }

  function renderEducation(lang) {
    var wrap = document.getElementById('eduGrid');
    if (!wrap) return;
    var items = PROFILE.education || [];
    toggleSection('education', items.length > 0);
    if (!items.length) { wrap.innerHTML = ''; return; }
    wrap.innerHTML = '';
    items.forEach(function (it) {
      var card = el('div', 'edu-card reveal');
      var period = pick(it.period, lang);
      card.innerHTML =
        (period ? '<p class="edu-card__period">' + escapeHtml(period) + '</p>' : '') +
        '<h3 class="edu-card__degree">' + escapeHtml(pick(it.degree, lang)) + '</h3>' +
        '<p class="edu-card__place">' + escapeHtml(pick(it.place, lang)) + '</p>';
      wrap.appendChild(card);
    });
  }

  function renderSkills(lang) {
    var wrap = document.getElementById('skillsList');
    if (!wrap) return;
    wrap.innerHTML = '';
    (PROFILE.skills || []).forEach(function (s) {
      wrap.appendChild(el('li', null, escapeHtml(pick(s, lang))));
    });
  }

  function renderLanguages(lang) {
    var wrap = document.getElementById('languagesList');
    if (!wrap) return;
    wrap.innerHTML = '';
    (PROFILE.languages || []).forEach(function (lng) {
      var li = el('li', 'lang-item');
      li.innerHTML =
        '<div class="lang-item__top"><span class="lang-item__name">' + escapeHtml(pick(lng.name, lang)) +
        '</span><span class="lang-item__level">' + escapeHtml(pick(lng.level, lang)) + '</span></div>' +
        '<div class="lang-item__bar"><span class="lang-item__fill" data-fill="' + (lng.value || 0) + '"></span></div>';
      wrap.appendChild(li);
    });
    requestAnimationFrame(function () {
      wrap.querySelectorAll('.lang-item__fill').forEach(function (f) {
        f.style.width = (f.getAttribute('data-fill') || 0) + '%';
      });
    });
  }

  function renderDynamic(lang) {
    renderExperience(lang);
    renderEducation(lang);
    renderSkills(lang);
    renderLanguages(lang);
    observeReveals();
  }

  /* ------------------------------ language ----------------------------- */
  function setLanguage(lang, persist) {
    if (SUPPORTED.indexOf(lang) < 0) lang = 'en';
    state.lang = lang;
    if (persist !== false) { try { localStorage.setItem(STORE_KEY, lang); } catch (e) {} }
    applyI18n(lang);
    renderDynamic(lang);
  }

  /* ---------------------------- interactions --------------------------- */
  function wireLangButtons() {
    document.querySelectorAll('[data-lang-btn]').forEach(function (b) {
      b.addEventListener('click', function () { setLanguage(b.getAttribute('data-lang-btn')); });
    });
  }

  function wireContactButtons() {
    document.querySelectorAll('[data-action="save-contact"]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        try { VCard.download(PROFILE, state.lang); toast(I18N[state.lang].toast_contact_saved); }
        catch (e) { toast(I18N[state.lang].toast_error); }
      });
    });
  }

  function wireMobileNav() {
    var toggle = document.querySelector('.nav-toggle');
    var menu = document.getElementById('mobileNav');
    if (!toggle || !menu) return;
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  function wireHeaderScroll() {
    var header = document.getElementById('siteHeader');
    if (!header) return;
    var onScroll = function () { header.classList.toggle('is-stuck', window.scrollY > 8); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ----------------------------- reveals ------------------------------- */
  var revealObserver = null;
  function observeReveals() {
    var targets = document.querySelectorAll('.reveal:not(.is-visible)');
    if (!('IntersectionObserver' in window)) {
      targets.forEach(function (t) { t.classList.add('is-visible'); });
      return;
    }
    if (!revealObserver) {
      revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add('is-visible'); revealObserver.unobserve(en.target); }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    }
    targets.forEach(function (t) { revealObserver.observe(t); });
  }

  function markReveals() {
    var sel = ['.section__head', '.about__lead', '.about__body', '.exp-card',
      '.contact__card', '.skills__col', '.hero__content', '.hero__media'];
    document.querySelectorAll(sel.join(',')).forEach(function (n) { n.classList.add('reveal'); });
  }

  /* ------------------------------- toast ------------------------------- */
  var toastTimer = null;
  function toast(msg) {
    var t = document.getElementById('toast');
    if (!t) { t = el('div'); t.id = 'toast'; t.className = 'toast'; document.body.appendChild(t); }
    t.textContent = msg;
    t.classList.add('is-on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove('is-on'); }, 2600);
  }

  /* ------------------------------- init -------------------------------- */
  function init() {
    document.querySelectorAll('[data-year]').forEach(function (n) { n.textContent = new Date().getFullYear(); });
    markReveals();
    wireLangButtons();
    wireContactButtons();
    wireMobileNav();
    wireHeaderScroll();
    setLanguage(detectLang(), false);
    requestAnimationFrame(observeReveals);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
