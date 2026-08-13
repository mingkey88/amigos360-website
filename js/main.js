/* =========================================================================
   AMIGOS360 — main.js
   Every behaviour below has a direct Webflow equivalent (see README).
   All modules guard on element presence so one file can serve every page.
   ========================================================================= */
(function () {
  'use strict';

  /* ===== MOBILE NAV TOGGLE =====
     Webflow equivalent: native Navbar component. */
  function initNavToggle() {
    var toggle = document.querySelector('.nav-toggle');
    var menu = document.querySelector('.nav-menu');
    if (!toggle || !menu) return;

    function setOpen(open) {
      menu.classList.toggle('nav-menu-open', open);
      toggle.setAttribute('aria-expanded', String(open));
    }

    toggle.addEventListener('click', function () {
      setOpen(!menu.classList.contains('nav-menu-open'));
    });

    // Close on Escape, and return focus to the control that opened it.
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && menu.classList.contains('nav-menu-open')) {
        setOpen(false);
        toggle.focus();
      }
    });

    // Reset state when resizing back up to desktop.
    window.addEventListener('resize', function () {
      if (window.innerWidth > 992) setOpen(false);
    });
  }

  /* ===== FAQ ACCORDION — one open at a time =====
     Webflow equivalent: Dropdown, or an Interaction on click. */
  function initAccordion() {
    var items = document.querySelectorAll('.faq-item');
    if (!items.length) return;

    var triggers = document.querySelectorAll('.faq-question');

    function closeAll() {
      Array.prototype.forEach.call(triggers, function (trigger) {
        trigger.setAttribute('aria-expanded', 'false');
        var panel = document.getElementById(trigger.getAttribute('aria-controls'));
        if (panel) panel.hidden = true;
        trigger.closest('.faq-item').classList.remove('faq-item-open');
      });
    }

    Array.prototype.forEach.call(triggers, function (trigger) {
      trigger.addEventListener('click', function () {
        var wasOpen = trigger.getAttribute('aria-expanded') === 'true';
        closeAll();
        if (wasOpen) return;
        trigger.setAttribute('aria-expanded', 'true');
        var panel = document.getElementById(trigger.getAttribute('aria-controls'));
        if (panel) panel.hidden = false;
        trigger.closest('.faq-item').classList.add('faq-item-open');
      });
    });
  }

  /* ===== PORTFOLIO FILTER — show/hide by data-category =====
     Webflow equivalent: CMS Collection List + Tabs, or filter Interaction. */
  function initPortfolioFilter() {
    var buttons = document.querySelectorAll('.filter-button');
    var tiles = document.querySelectorAll('.portfolio-tile');
    if (!buttons.length || !tiles.length) return;

    var status = document.querySelector('.filter-status');

    Array.prototype.forEach.call(buttons, function (button) {
      button.addEventListener('click', function () {
        var category = button.getAttribute('data-filter');
        var shown = 0;

        Array.prototype.forEach.call(buttons, function (other) {
          var active = other === button;
          other.classList.toggle('filter-button-active', active);
          other.setAttribute('aria-pressed', String(active));
        });

        Array.prototype.forEach.call(tiles, function (tile) {
          var match = category === 'all' || tile.getAttribute('data-category') === category;
          tile.hidden = !match;
          if (match) shown++;
        });

        if (status) {
          status.textContent = shown + (shown === 1 ? ' project shown' : ' projects shown');
        }
      });
    });
  }

  /* ===== SCROLL REVEAL — fade + translate, staggered by arrival =====
     Webflow equivalent: "Scroll into view" Page Trigger, with the delay set per
     child of a group.

     The stagger is computed from what arrives TOGETHER, not from DOM index. An
     index-based delay looks right on a short grid and wrong on a long one: the
     16th portfolio tile sits 2000px down the page, arrives entirely on its own,
     and would still sit waiting out a 360ms delay before moving. Cards that
     land in the same frame cascade; a card scrolled to alone starts at once. */
  function initReveal() {
    var targets = document.querySelectorAll('.reveal');
    if (!targets.length) return;

    // Single source of truth for the interval is the --reveal-step token.
    var step = parseFloat(getComputedStyle(document.documentElement)
      .getPropertyValue('--reveal-step')) || 70;
    var maxSteps = 6;   // caps a big batch so a full grid never crawls

    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !('IntersectionObserver' in window)) {
      Array.prototype.forEach.call(targets, function (target) {
        target.classList.add('reveal-visible');
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      var arriving = [];
      entries.forEach(function (entry) {
        if (entry.isIntersecting) arriving.push(entry);
      });
      if (!arriving.length) return;

      // Top-to-bottom, then DOM order within a row (sort is stable).
      arriving.sort(function (a, b) {
        return a.boundingClientRect.top - b.boundingClientRect.top;
      });

      arriving.forEach(function (entry, i) {
        var delay = Math.min(i, maxSteps) * step;
        var el = entry.target;
        el.style.transitionDelay = delay + 'ms';

        // A process step's dial must sweep on the same beat as its step.
        var dial = el.querySelector('.step-dial');
        if (dial) dial.style.transitionDelay = delay + 'ms';

        el.classList.add('reveal-visible');
        observer.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    Array.prototype.forEach.call(targets, function (target) {
      observer.observe(target);
    });
  }

  /* ===== DISCOVERY CALL FORM — client-side validation stub =====
     No backend. Logs the payload and swaps in the success state.
     Webflow equivalent: native Form block + Success/Error states. */
  function initBookingForm() {
    var form = document.querySelector('.booking-form');
    if (!form) return;

    var success = document.querySelector('.form-success');

    form.setAttribute('novalidate', 'novalidate');

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      var fields = form.querySelectorAll('.form-input, .form-select');
      var firstInvalid = null;

      Array.prototype.forEach.call(fields, function (field) {
        var error = document.getElementById(field.getAttribute('aria-describedby'));
        var valid = field.checkValidity();

        field.classList.toggle('form-input-error', !valid);
        field.setAttribute('aria-invalid', String(!valid));
        if (error) error.hidden = valid;
        if (!valid && !firstInvalid) firstInvalid = field;
      });

      if (firstInvalid) {
        firstInvalid.focus();
        return;
      }

      var payload = {};
      Array.prototype.forEach.call(fields, function (field) {
        payload[field.name] = field.value;
      });
      console.log('Discovery call request:', payload);

      form.hidden = true;
      if (success) {
        success.hidden = false;
        success.focus();
      }
    });
  }

  function init() {
    initNavToggle();
    initAccordion();
    initPortfolioFilter();
    initReveal();
    initBookingForm();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
