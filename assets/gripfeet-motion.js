/* ============================================================
   Gripfeet — Motion layer (vanilla port of design-handoff motion.jsx)
   1. Scroll-reveal auto-tagger (no per-section edits needed)
   2. Infinite conveyor drag-to-scrub (loop + pause-on-hover are CSS)
   3. window.gfOnTick — shared poll used by the collection infinite grid
   ============================================================ */
(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.documentElement.classList.add("gf-reveal");

  /* ---- containers whose DIRECT children animate in sequence ---- */
  var STAGGER = [
    ".height-grid", ".trends-grid", ".usps", ".palette-chips", ".palette-groups",
    ".bundles", ".reviews", ".footer-grid", ".col-grid",
    ".pdp-related-grid", ".crew-stat-row", ".crew-spec-table", ".crew-zone-list",
    ".crew-feat", ".lof-under-grid", ".lof-parts", ".kid-safety-grid",
    ".kid-grow-track", ".kid-parents-grid", ".ank-story-flat", ".ank-surf-side",
    ".rev-list", ".qa-list", ".pdp-trust"
  ];
  /* ---- single blocks that animate as one ---- */
  var SINGLE = [
    ".section-head", ".story", ".gifting", ".sub-banner", ".move-band",
    ".newsletter", ".reviews-hero", ".pdp-gallery", ".pdp-info",
    ".ank-instr-card", ".kid-finder-card", ".lof-shade-tool",
    ".crew-spec-head", ".crew-stress-head", ".lof-under-head",
    ".ank-surf-head", ".ank-story-head", ".kid-grow-head",
    ".crew-zones-vis", ".ank-surf-vis", ".ank-prac-card"
  ];
  /* ---- never reveal inside these (moving belts / overlays that toggle) ---- */
  var SKIP = ".conveyor, .marquee, .ticker, .modal, .pdp-modal, .filter-sheet, .cart-drawer, .drawer, .mnav, .mobile-nav, .qv";

  function inSkip(el) { return el.closest(SKIP); }

  function tag(el, kind, delay) {
    if (el.hasAttribute("data-reveal") || inSkip(el)) return;
    el.setAttribute("data-reveal", reduce ? "fade" : kind);
    if (delay && !reduce) el.style.transitionDelay = delay + "ms";
    if (reduce) el.classList.add("is-in");
  }

  function each(sel, fn) { Array.prototype.forEach.call(document.querySelectorAll(sel), fn); }

  function scan() {
    SINGLE.forEach(function (sel) { each(sel, function (el) { tag(el, "up", 0); }); });
    STAGGER.forEach(function (sel) {
      each(sel, function (cont) {
        if (inSkip(cont)) return;
        Array.prototype.forEach.call(cont.children, function (child, i) { tag(child, "up", Math.min(i, 8) * 70); });
      });
    });
    initConveyors();
    reveal();
  }

  /* scroll-driven reveal — no IntersectionObserver dependency (robust in embedded frames) */
  function reveal() {
    var vh = window.innerHeight || document.documentElement.clientHeight;
    each("[data-reveal]:not(.is-in)", function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < vh * 0.92 && r.bottom > 0) el.classList.add("is-in");
    });
  }

  var timer = 0;
  function schedule() { clearTimeout(timer); timer = setTimeout(scan, 80); }
  var ticking = false;
  function onScroll() {
    if (ticking) return; ticking = true;
    setTimeout(function () { reveal(); ticking = false; }, 90);
  }

  /* global tick subscribers (infinite-scroll checkers ride this proven poll) */
  var ticks = [];
  window.gfOnTick = function (fn) { ticks.push(fn); return function () { var i = ticks.indexOf(fn); if (i >= 0) ticks.splice(i, 1); }; };

  /* ---------------------------------------------------------------
     Conveyor drag-to-scrub. The seamless loop (cards duplicated once)
     is rendered in Liquid; pause-on-hover is CSS. This only adds the
     hold-and-drag nudge, pausing the auto-belt while grabbing.
     --------------------------------------------------------------- */
  var active = null, startX = 0, base = 0;
  function curX(track) {
    try { var m = new DOMMatrixReadOnly(getComputedStyle(track).transform); return m.m41 || 0; }
    catch (e) { return 0; }
  }
  function initConveyors() {
    each(".conveyor", function (wrap) {
      if (wrap.dataset.gfConveyor) return;
      var track = wrap.querySelector(".conveyor-track");
      if (!track) return;
      wrap.dataset.gfConveyor = "1";
      wrap.classList.add("is-grab");
      wrap.addEventListener("pointerdown", function (e) {
        active = { wrap: wrap, track: track };
        startX = e.clientX; base = curX(track);
        wrap.classList.add("is-grabbing");
        track.style.animationPlayState = "paused";
      });
    });
  }
  window.addEventListener("pointermove", function (e) {
    if (!active) return;
    active.track.style.transform = "translate3d(" + (base + (e.clientX - startX)) + "px,0,0)";
  });
  window.addEventListener("pointerup", function () {
    if (!active) return;
    active.wrap.classList.remove("is-grabbing");
    active.track.style.transform = "";
    active.track.style.animationPlayState = "";
    active = null;
  });

  /* ---------------------------------------------------------------
     Start
     --------------------------------------------------------------- */
  function start() {
    scan();
    [120, 400, 900].forEach(function (t) { setTimeout(scan, t); });
    var root = document.getElementById("root") || document.body;
    new MutationObserver(schedule).observe(root, { childList: true, subtree: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    /* poll fallback — scroll events can be suppressed in embedded frames */
    setInterval(function () { reveal(); ticks.forEach(function (fn) { try { fn(); } catch (e) {} }); }, 240);
    /* Shopify theme editor: re-scan when sections are re-rendered */
    document.addEventListener("shopify:section:load", schedule);
    document.addEventListener("shopify:section:select", schedule);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
