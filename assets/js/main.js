/* ==========================================================================
   Bella Esperanza | BE — interactions
   Vanilla JS, no dependencies. Every effect degrades gracefully without JS.
   ========================================================================== */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- 1. Sticky header state ------------------------------------------- */
  var header = document.querySelector('.site-header');
  if (header) {
    var threshold = 24;
    var ticking = false;
    var onScroll = function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        header.classList.toggle('is-stuck', window.scrollY > threshold);
        ticking = false;
      });
    };
    // Sub pages have a shorter hero, so they start "stuck" straight away.
    if (document.body.dataset.header === 'solid') {
      header.classList.add('is-stuck');
    } else {
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }
  }

  /* --- 2. Mobile drawer -------------------------------------------------- */
  var burger = document.querySelector('.burger');
  var drawer = document.getElementById('drawer');
  if (burger && drawer) {
    var setDrawer = function (open) {
      burger.setAttribute('aria-expanded', String(open));
      drawer.classList.toggle('is-open', open);
      document.body.classList.toggle('is-locked', open);
      if (open) header.classList.add('is-stuck');
      else if (document.body.dataset.header !== 'solid' && window.scrollY <= 24) {
        header.classList.remove('is-stuck');
      }
    };
    burger.addEventListener('click', function () {
      setDrawer(burger.getAttribute('aria-expanded') !== 'true');
    });
    drawer.addEventListener('click', function (e) {
      if (e.target.closest('a')) setDrawer(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
        setDrawer(false);
        burger.focus();
      }
    });
  }

  /* --- 3. Scroll reveal -------------------------------------------------- */
  var revealables = document.querySelectorAll('[data-reveal]');
  if (revealables.length) {
    if (reduceMotion || !('IntersectionObserver' in window)) {
      revealables.forEach(function (el) { el.classList.add('is-in'); });
    } else {
      var revealObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-in');
          revealObs.unobserve(entry.target);
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
      revealables.forEach(function (el) { revealObs.observe(el); });
    }
  }

  /* --- 4. Count-up statistics -------------------------------------------- */
  var counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    var runCount = function (el) {
      var target = parseFloat(el.dataset.count);
      var suffix = el.dataset.suffix || '';
      var dur = reduceMotion ? 0 : 1500;
      var start = performance.now();
      var step = function (now) {
        var p = dur === 0 ? 1 : Math.min((now - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased).toLocaleString('it-IT') + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    if (!('IntersectionObserver' in window)) {
      counters.forEach(runCount);
    } else {
      var countObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          runCount(entry.target);
          countObs.unobserve(entry.target);
        });
      }, { threshold: 0.4 });
      counters.forEach(function (el) { countObs.observe(el); });
    }
  }

  /* --- 5. Horizontal rails ------------------------------------------------ */
  document.querySelectorAll('[data-rail]').forEach(function (rail) {
    var controls = document.querySelector('[data-rail-nav="' + rail.dataset.rail + '"]');
    if (!controls) return;
    controls.addEventListener('click', function (e) {
      var btn = e.target.closest('button[data-dir]');
      if (!btn) return;
      var card = rail.querySelector(':scope > *');
      var step = card ? card.getBoundingClientRect().width + 24 : rail.clientWidth * 0.8;
      rail.scrollBy({ left: step * Number(btn.dataset.dir), behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  });

  /* --- 6. Copy IBAN ------------------------------------------------------- */
  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    var original = btn.querySelector('.copy-label');
    btn.addEventListener('click', function () {
      var value = btn.dataset.copy;
      var done = function () {
        btn.classList.add('is-done');
        if (original) original.textContent = original.dataset.done || 'Copiato';
        setTimeout(function () {
          btn.classList.remove('is-done');
          if (original) original.textContent = original.dataset.idle || 'Copia IBAN';
        }, 2200);
      };
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(value).then(done).catch(function () {});
      } else {
        var ta = document.createElement('textarea');
        ta.value = value;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); done(); } catch (err) {}
        document.body.removeChild(ta);
      }
    });
  });

  /* --- 7. Scroll-spy for the anchor nav ----------------------------------- */
  var spyLinks = Array.prototype.slice.call(
    document.querySelectorAll('.nav-link[href^="#"]')
  );
  if (spyLinks.length && 'IntersectionObserver' in window) {
    var sections = spyLinks
      .map(function (a) { return document.querySelector(a.getAttribute('href')); })
      .filter(Boolean);
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        spyLinks.forEach(function (a) {
          a.classList.toggle('is-active', a.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* --- 8. Newsletter / contact form feedback ------------------------------ */
  document.querySelectorAll('form[data-demo-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var note = form.querySelector('.form-note');
      if (!note) return;
      note.dataset.original = note.dataset.original || note.textContent;
      note.textContent = note.dataset.success || 'Grazie! Ti abbiamo aggiunto alla lista.';
      form.reset();
    });
  });

  /* --- 9. Current year ---------------------------------------------------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* --- 10. Back to top ----------------------------------------------------- */
  var toTop = document.querySelector('[data-to-top]');
  if (toTop) {
    var topTicking = false;
    var syncToTop = function () {
      if (topTicking) return;
      topTicking = true;
      requestAnimationFrame(function () {
        toTop.classList.toggle('is-in', window.scrollY > window.innerHeight * 0.75);
        topTicking = false;
      });
    };
    window.addEventListener('scroll', syncToTop, { passive: true });
    syncToTop();
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
      // Tastaturfokus mitnehmen, sonst springt Tab zurück in die Seitenmitte.
      var brand = document.querySelector('.site-header .brand');
      if (brand) brand.focus({ preventScroll: true });
    });
  }

  /* --- 11. Einwilligung ----------------------------------------------------
     Die Seite selbst setzt keine Cookies und lädt nichts von fremden Servern.
     Gespeichert wird nur diese Entscheidung — das ist technisch notwendig und
     damit einwilligungsfrei.

     Wenn später Statistik oder Conversion-Tracking dazukommt, wird das Skript
     so eingebunden und startet erst nach Zustimmung:

         <script type="text/plain" data-consent="marketing" src="..."></script>

     Zusätzlich steht window.beConsent bereit ('all' | 'necessary') und es wird
     ein Event 'be:consent' ausgelöst.
     ---------------------------------------------------------------------- */
  var CONSENT_KEY = 'be-consent';
  var banner = document.querySelector('[data-consent-banner]');

  var readConsent = function () {
    try { return localStorage.getItem(CONSENT_KEY); } catch (e) { return null; }
  };

  var activateConsented = function (level) {
    window.beConsent = level;
    if (level === 'all') {
      document.querySelectorAll('script[type="text/plain"][data-consent]').forEach(function (node) {
        var real = document.createElement('script');
        for (var i = 0; i < node.attributes.length; i++) {
          var attr = node.attributes[i];
          if (attr.name !== 'type' && attr.name !== 'data-consent') {
            real.setAttribute(attr.name, attr.value);
          }
        }
        real.text = node.text;
        node.parentNode.replaceChild(real, node);
      });
    }
    document.dispatchEvent(new CustomEvent('be:consent', { detail: { level: level } }));
  };

  if (banner) {
    var measure = function () {
      document.documentElement.style.setProperty('--consent-h', banner.offsetHeight + 'px');
    };
    var showBanner = function () {
      banner.hidden = false;
      requestAnimationFrame(function () {
        banner.classList.add('is-open');
        measure();
      });
    };
    var hideBanner = function () {
      banner.classList.remove('is-open');
      document.documentElement.style.setProperty('--consent-h', '0px');
      setTimeout(function () { banner.hidden = true; }, 720);
    };

    var saved = readConsent();
    if (saved === 'all' || saved === 'necessary') activateConsented(saved);
    else showBanner();

    banner.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-consent-set]');
      if (!btn) return;
      var level = btn.dataset.consentSet;
      try { localStorage.setItem(CONSENT_KEY, level); } catch (err) {}
      activateConsented(level);
      hideBanner();
    });

    // Die Entscheidung muss jederzeit widerrufbar sein — Link im Footer.
    document.addEventListener('click', function (e) {
      var opener = e.target.closest('[data-consent-open]');
      if (!opener) return;
      e.preventDefault();
      showBanner();
    });

    window.addEventListener('resize', function () {
      if (!banner.hidden) measure();
    }, { passive: true });
  }

  /* --- 12. Donorbox --------------------------------------------------------
     Das Spendenformular kommt von donorbox.org. Damit beim blossen
     Seitenaufruf keine IP-Adresse dorthin geht, laedt das Skript erst auf
     Klick — oder automatisch, wenn im Banner bereits zugestimmt wurde.
     ---------------------------------------------------------------------- */
  var DBOX_CAMPAIGN = 'join-the-bevolution';
  var dboxScriptLoaded = false;

  function loadDboxScript() {
    if (dboxScriptLoaded) return;
    dboxScriptLoaded = true;
    var s = document.createElement('script');
    s.type = 'module';
    s.src = 'https://donorbox.org/widgets.js';
    s.async = true;
    document.head.appendChild(s);
  }

  function mountDbox(box) {
    if (!box || box.classList.contains('is-loaded')) return;
    box.classList.add('is-loaded');
    var widget = document.createElement('dbox-widget');
    widget.setAttribute('campaign', DBOX_CAMPAIGN);
    widget.setAttribute('type', 'donation_form');
    widget.setAttribute('enable-auto-scroll', 'true');
    box.appendChild(widget);
    loadDboxScript();
  }

  document.addEventListener('click', function (e) {
    var trigger = e.target.closest('[data-dbox-load]');
    if (!trigger) return;
    mountDbox(trigger.closest('[data-dbox]'));
  });

  // Wer im Banner bereits zugestimmt hat, bekommt das Formular direkt.
  function autoMountIfConsented() {
    if (readConsent() !== 'all') return;
    document.querySelectorAll('[data-dbox]').forEach(function (box) {
      if (!box.closest('[data-dbox-modal]')) mountDbox(box);
    });
  }
  autoMountIfConsented();
  document.addEventListener('be:consent', autoMountIfConsented);

  /* --- Spenden-Overlay ---------------------------------------------------- */
  var dboxModal = document.querySelector('[data-dbox-modal]');
  if (dboxModal) {
    var lastFocus = null;
    var openModal = function () {
      lastFocus = document.activeElement;
      dboxModal.hidden = false;
      requestAnimationFrame(function () {
        dboxModal.classList.add('is-open');
        document.body.classList.add('is-locked');
        var focusable = dboxModal.querySelector('button, a, input');
        if (focusable) focusable.focus();
      });
      if (readConsent() === 'all') mountDbox(dboxModal.querySelector('[data-dbox]'));
    };
    var closeModal = function () {
      dboxModal.classList.remove('is-open');
      document.body.classList.remove('is-locked');
      setTimeout(function () { dboxModal.hidden = true; }, 340);
      if (lastFocus) lastFocus.focus();
    };

    document.addEventListener('click', function (e) {
      var opener = e.target.closest('[data-dbox-open]');
      if (opener) {
        // Ohne JavaScript bleibt der Link auf dona.html als Rueckfallebene.
        e.preventDefault();
        openModal();
        return;
      }
      if (e.target.closest('[data-dbox-close]') || e.target === dboxModal) closeModal();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && dboxModal.classList.contains('is-open')) closeModal();
    });
  }

})();
