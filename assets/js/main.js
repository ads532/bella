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
})();
