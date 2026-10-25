// Wiggy's Plumbing sample preview - progressive enhancement only.
// Content stays fully visible if this file fails to load.
(function () {
  "use strict";

  var items = document.querySelectorAll(
    ".card, .hero-inner > *, .section h2, .section-sub, .info-grid"
  );

  var reduceMotion =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion || !("IntersectionObserver" in window)) {
    return;
  }

  var revealables = [];
  for (var i = 0; i < items.length; i++) {
    items[i].classList.add("reveal-init");
    revealables.push(items[i]);
  }

  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
  );

  revealables.forEach(function (el) {
    io.observe(el);
  });

  // Safety net: never leave anything hidden (e.g. above-the-fold items in odd layouts).
  window.setTimeout(function () {
    revealables.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add("is-visible");
      }
    });
  }, 400);
})();
