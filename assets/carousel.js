/* Shared carousels: news carousel, work gallery and social pills.
   Carousels advance automatically and loop seamlessly (no rewind). They pause on hover (mouse users only) and while the tab is hidden; touch visitors are never stalled by a tap.
   Needs data/updates.js and assets/site.js (which provides window.drsLoop) on the page. */
(function () {
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function fmtd(d) { if (!d) return ""; var f = /^\d{4}-\d{2}-\d{2}$/.test(d), m = /^\d{4}-\d{2}$/.test(d); if (!f && !m) return d; var t = new Date(f ? d + "T00:00:00" : d + "-01T00:00:00"); return isNaN(t) ? d : t.toLocaleDateString("en-GB", f ? { day: "numeric", month: "short", year: "numeric" } : { month: "short", year: "numeric" }); }
  var reduce = false;

  /* generic: wires a looping track to controls and autoplay */
  function wire(box, track, n, dots, prevBtn, nextBtn, delay) {
    var cur = 0, timer = null, loop = n > 1 && window.drsLoop ? window.drsLoop(track, n) : null;
    function mark() { dots.forEach(function (d, i) { d.setAttribute("aria-current", i === cur ? "true" : "false"); }); }
    function go(k) {
      var m = (k + n) % n;
      if (loop) { if (k === cur + 1) loop.next(); else if (k === cur - 1) loop.prev(); else loop.goTo(m); }
      cur = m; mark();
    }
    function stop() { if (timer) clearInterval(timer); timer = null; }
    function play() { if (reduce || n < 2) return; stop(); timer = setInterval(function () { go(cur + 1); }, delay); }
    if (prevBtn) prevBtn.addEventListener("click", function () { go(cur - 1); play(); });
    if (nextBtn) nextBtn.addEventListener("click", function () { go(cur + 1); play(); });
    dots.forEach(function (d, i) { d.addEventListener("click", function () { go(i); play(); }); });
    if (window.drsHover) { box.addEventListener("mouseenter", stop); box.addEventListener("mouseleave", play); box.addEventListener("focusin", stop); box.addEventListener("focusout", play); }
    document.addEventListener("visibilitychange", function () { if (document.hidden) stop(); else play(); });
    var x0 = null;
    box.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; stop(); }, { passive: true });
    box.addEventListener("touchend", function (e) { if (x0 === null) return; var dx = e.changedTouches[0].clientX - x0; x0 = null; if (Math.abs(dx) > 40) go(cur + (dx < 0 ? 1 : -1)); play(); });
    go(0); play();
  }

  /* ---------- news carousel: [data-news-more] data-brand, data-skip, data-title ---------- */
  document.querySelectorAll("[data-news-more]").forEach(function (box) {
    var D = window.DRS || {}, names = D.brandNames || {}, skip = parseInt(box.getAttribute("data-skip") || "0", 10), brand = box.getAttribute("data-brand");
    var title = box.getAttribute("data-title") || "Earlier news";
    var all = (D.updates || []).filter(function (u) { return !brand || u.brand === brand; }).slice().sort(function (a, b) { var x = a.date || "0000", y = b.date || "0000"; return y < x ? -1 : y > x ? 1 : 0; });
    var items = all.slice(skip);
    if (!items.length) { box.innerHTML = '<p class="nm-empty">No news yet. Check back soon.</p>'; return; }
    var multi = items.length > 1;
    box.innerHTML = '<div class="nm-head"><b>' + esc(title) + '</b>' + (multi ? '<span class="nm-ctl"><button type="button" class="nm-prev" aria-label="Previous">&lsaquo;</button><button type="button" class="nm-next" aria-label="Next">&rsaquo;</button></span>' : '') + '</div>' +
      '<div class="nm-view" aria-live="off"><div class="nm-track">' + items.map(function (u) {
        var t = u.url ? '<a href="' + esc(u.url) + '">' + esc(u.title) + '</a>' : esc(u.title);
        return '<article class="nm-slide"><div class="meta">' + esc(names[u.brand] || "") + (u.date ? (names[u.brand] ? " &middot; " : "") + esc(fmtd(u.date)) : "") + '</div><h3>' + t + '</h3><p>' + esc(u.text) + '</p></article>';
      }).join("") + '</div></div>' + (multi ? '<div class="nm-dots">' + items.map(function (u, i) { return '<button type="button" aria-label="Go to item ' + (i + 1) + '"></button>'; }).join("") + '</div>' : "");
    if (!multi) return;
    wire(box, box.querySelector(".nm-track"), items.length, Array.prototype.slice.call(box.querySelectorAll(".nm-dots button")), box.querySelector(".nm-prev"), box.querySelector(".nm-next"), 5500);
  });

  /* ---------- gallery: [data-gallery] wraps .gslide children ---------- */
  document.querySelectorAll("[data-gallery]").forEach(function (box) {
    var slides = Array.prototype.slice.call(box.querySelectorAll(".gslide")); if (slides.length < 2) return;
    var track = document.createElement("div"); track.className = "gtrack";
    slides.forEach(function (s) { track.appendChild(s); });
    var view = document.createElement("div"); view.className = "gview"; view.appendChild(track); box.insertBefore(view, box.firstChild);
    var ctl = document.createElement("div"); ctl.className = "gctl";
    ctl.innerHTML = '<button type="button" class="gprev" aria-label="Previous">&lsaquo;</button><span class="gdots">' + slides.map(function (s, i) { return '<button type="button" aria-label="Go to slide ' + (i + 1) + '"></button>'; }).join("") + '</span><button type="button" class="gnext" aria-label="Next">&rsaquo;</button>';
    box.appendChild(ctl);
    wire(box, track, slides.length, Array.prototype.slice.call(ctl.querySelectorAll(".gdots button")), ctl.querySelector(".gprev"), ctl.querySelector(".gnext"), 6000);
  });

  /* ---------- social pills: [data-socials="ma"] reads DRS_LINKS.brands.ma.social; empty ones stay greyed out ---------- */
  document.querySelectorAll("[data-socials]").forEach(function (box) {
    var L = (window.DRS_LINKS || {}).brands || {}, b = L[box.getAttribute("data-socials")] || {}, s = b.social || {};
    box.querySelectorAll("[data-net]").forEach(function (a) {
      var u = s[a.getAttribute("data-net")];
      if (u) { a.setAttribute("href", u); a.setAttribute("target", "_blank"); a.setAttribute("rel", "noopener"); a.classList.remove("off"); a.removeAttribute("aria-disabled"); }
    });
    if (!box.querySelector(".net.off")) { var n = box.parentNode.querySelector(".note"); if (n) n.style.display = "none"; }
  });
})();
