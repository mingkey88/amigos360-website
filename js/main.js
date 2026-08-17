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

  /* ===== NAVBAR SCROLL STATE =====
     Solid at the top of the page, translucent once scrolled past it.
     Webflow equivalent: a "Page scrolled" trigger driving a class.

     Throttled through requestAnimationFrame and registered passive — a scroll
     handler that writes to the DOM on every event is the classic way to make a
     sticky bar stutter, and passive:true tells the browser it never needs to
     wait on this listener before scrolling. */
  function initNavScroll() {
    var navbar = document.querySelector('.navbar');
    if (!navbar) return;

    var threshold = 24;   // past the bar's own height, so it does not flicker at rest
    var queued = false;

    function apply() {
      navbar.classList.toggle('navbar-scrolled', window.pageYOffset > threshold);
      queued = false;
    }

    window.addEventListener('scroll', function () {
      if (queued) return;
      queued = true;
      window.requestAnimationFrame(apply);
    }, { passive: true });

    apply();   // a reload part-way down the page must not start solid
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

  /* ===== TESTIMONIAL SLIDER — one card at a time =====
     Webflow equivalent: the native Slider component.

     Hides by the [hidden] attribute rather than by class, which the reset
     enforces with display:none !important — the same fix the portfolio filter
     needed. Hidden cards leave the accessibility tree entirely, so a screen
     reader is never offered four overlapping quotes. */
  function initTestimonialSlider() {
    var stage = document.querySelector('.testimonial-stage');
    if (!stage) return;

    var cards = stage.querySelectorAll('.testimonial-card');
    var arrows = document.querySelectorAll('.testimonial-arrow');
    var count = document.querySelector('.testimonial-count');
    if (cards.length < 2 || !arrows.length) return;

    var index = 0;
    var pad = function (n) { return (n < 10 ? '0' : '') + n; };

    function show(next) {
      // Wrap in both directions so neither arrow is ever a dead control.
      index = (next + cards.length) % cards.length;
      Array.prototype.forEach.call(cards, function (card, i) {
        card.hidden = i !== index;
      });
      if (count) count.textContent = pad(index + 1) + ' / ' + pad(cards.length);
    }

    Array.prototype.forEach.call(arrows, function (arrow) {
      arrow.addEventListener('click', function () {
        show(index + Number(arrow.getAttribute('data-step') || 1));
      });
    });

    show(0);
  }

  /* ===== EMAIL CAPTURE — client-side validation stub =====
     No backend, same as the booking form. Kept separate rather than folded
     into initBookingForm because the two have different fields, different
     success copy, and only ever appear on different pages.
     Webflow equivalent: native Form block + Success / Error states. */
  function initSignupForm() {
    var form = document.querySelector('.signup-form');
    if (!form) return;

    var success = document.querySelector('.signup-success');
    var input = form.querySelector('.signup-input');
    var error = document.querySelector('.signup-error');
    var terms = form.querySelector('.signup-checkbox');

    form.setAttribute('novalidate', 'novalidate');

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      var emailOk = input.checkValidity();
      var termsOk = !terms || terms.checked;

      input.classList.toggle('signup-input-error', !emailOk);
      input.setAttribute('aria-invalid', String(!emailOk));

      if (error) {
        error.hidden = emailOk && termsOk;
        if (!emailOk) error.textContent = 'Enter a valid email address.';
        else if (!termsOk) error.textContent = 'Please accept the terms to continue.';
      }

      if (!emailOk) { input.focus(); return; }
      if (!termsOk) { terms.focus(); return; }

      console.log('Trial signup request:', { email: input.value });

      form.hidden = true;
      if (success) {
        success.hidden = false;
        success.focus();
      }
    });
  }

  function init() {
    initNavToggle();
    initNavScroll();
    initAccordion();
    initPortfolioFilter();
    initReveal();
    initBookingForm();
    initTestimonialSlider();
    initSignupForm();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
