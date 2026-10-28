/* WOS wiki carousels: [data-wnews] builds from data/updates.js, [data-wcar] wraps slides already in the page.
   Needs assets/site.js (window.drsLoop, window.drsHover) and data/updates.js on the page. */
(function () {
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function fmtd(d) { if (!d) return ""; var f = /^\d{4}-\d{2}-\d{2}$/.test(d); if (!f) return d; var t = new Date(d + "T00:00:00"); return isNaN(t) ? d : t.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }); }
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function init(box, label) {
    var track = box.querySelector(".wn-track"); if (!track) return;
    var n = track.children.length;
    var head = box.querySelector(".wn-head");
    var ctl = null, dots = [];
    if (n > 1) {
      ctl = document.createElement("span"); ctl.className = "wn-ctl";
      ctl.innerHTML = '<button type="button" class="wn-prev" aria-label="Previous ' + esc(label) + '">&lsaquo;</button><button type="button" class="wn-next" aria-label="Next ' + esc(label) + '">&rsaquo;</button>';
      if (head) head.appendChild(ctl);
      var dwrap = document.createElement("div"); dwrap.className = "wn-dots";
      dwrap.innerHTML = Array.prototype.map.call(track.children, function (s, i) { return '<button type="button" aria-label="Go to ' + esc(label) + ' ' + (i + 1) + '"></button>'; }).join("");
      box.appendChild(dwrap); dots = Array.prototype.slice.call(dwrap.querySelectorAll("button"));
    }
    var cur = 0, timer = null, loop = n > 1 && window.drsLoop ? window.drsLoop(track, n) : null;
    function mark() { dots.forEach(function (d, i) { d.setAttribute("aria-current", i === cur ? "true" : "false"); }); }
    function go(k) {
      var m = (k + n) % n;
      if (loop) { if (k === cur + 1) loop.next(); else if (k === cur - 1) loop.prev(); else loop.goTo(m); }
      cur = m; mark();
    }
    function stop() { if (timer) clearInterval(timer); timer = null; }
    function play() { if (reduce || n < 2) return; stop(); timer = setInterval(function () { go(cur + 1); }, 6500); }
    if (n < 2) return;
    box.querySelector(".wn-prev").addEventListener("click", function () { go(cur - 1); play(); });
    box.querySelector(".wn-next").addEventListener("click", function () { go(cur + 1); play(); });
    dots.forEach(function (d, i) { d.addEventListener("click", function () { go(i); play(); }); });
    if (window.drsHover) { box.addEventListener("mouseenter", stop); box.addEventListener("mouseleave", play); }
    box.addEventListener("focusin", stop); box.addEventListener("focusout", play);
    document.addEventListener("visibilitychange", function () { if (document.hidden) stop(); else play(); });
    var x0 = null;
    box.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; stop(); }, { passive: true });
    box.addEventListener("touchend", function (e) { if (x0 === null) return; var dx = e.changedTouches[0].clientX - x0; x0 = null; if (Math.abs(dx) > 40) go(cur + (dx < 0 ? 1 : -1)); play(); });
    mark(); play();
  }

  /* latest news from data/updates.js: data-brand, data-limit */
  document.querySelectorAll("[data-wnews]").forEach(function (box) {
    var D = window.DRS || {}, names = D.brandNames || {}, brand = box.getAttribute("data-brand"), lim = parseInt(box.getAttribute("data-limit") || "4", 10);
    var items = (D.updates || []).filter(function (u) { return !brand || u.brand === brand; }).slice().sort(function (a, b) { var x = a.date || "0000", y = b.date || "0000"; return y < x ? -1 : y > x ? 1 : 0; }).slice(0, lim);
    var fresh = Date.now() - 14 * 864e5;
    if (!items.length) { box.hidden = true; return; }
    box.innerHTML = '<div class="wn-head"><span class="wn-eb">Latest news</span></div><div class="wn-view"><div class="wn-track">' + items.map(function (u) {
      var isNew = u.date && /^\d{4}-\d{2}-\d{2}$/.test(u.date) && new Date(u.date + "T00:00:00").getTime() > fresh;
      var t = u.url ? '<a href="' + esc(u.url) + '">' + esc(u.title) + '</a>' : esc(u.title);
      return '<article class="wn-slide"><div><div class="wn-meta">' + esc(names[u.brand] || "") + (u.date ? " &middot; " + esc(fmtd(u.date)) : "") + (isNew ? '<span class="wn-new">NEW</span>' : "") + '</div><h3>' + t + '</h3><p>' + esc(u.text) + '</p>' +
        (u.url ? '<a class="wn-btn" href="' + esc(u.url) + '">' + esc(u.cta || "Read more") + ' &rarr;</a>' : "") + '</div>' +
        (u.img ? '<div class="wn-pic"><img src="' + esc(u.img) + '" alt="" height="190" loading="lazy"></div>' : "") + '</article>';
    }).join("") + '</div></div>';
    init(box, "news item");
  });


  /* earlier news list: data-brand, data-skip, data-limit */
  document.querySelectorAll("[data-wlist]").forEach(function (ul) {
    var D = window.DRS || {}, names = D.brandNames || {}, brand = ul.getAttribute("data-brand"), skip = parseInt(ul.getAttribute("data-skip") || "0", 10), lim = parseInt(ul.getAttribute("data-limit") || "5", 10);
    var items = (D.updates || []).filter(function (u) { return !brand || u.brand === brand; }).slice().sort(function (a, b) { var x = a.date || "0000", y = b.date || "0000"; return y < x ? -1 : y > x ? 1 : 0; }).slice(skip, skip + lim);
    if (!items.length) { ul.innerHTML = '<li><p>No earlier news yet.</p></li>'; return; }
    ul.innerHTML = items.map(function (u) {
      var t = u.url ? '<a href="' + esc(u.url) + '">' + esc(u.title) + '</a>' : esc(u.title);
      return '<li data-brand="' + esc(u.brand) + '"><div class="meta">' + esc(names[u.brand] || "Studio") + (u.date ? " &middot; " + esc(fmtd(u.date)) : "") + '</div><h3>' + t + '</h3><p>' + esc(u.text) + '</p></li>';
    }).join("");
  });

  /* slides written into the page */
  document.querySelectorAll("[data-wcar]").forEach(function (box) { init(box, box.getAttribute("data-wcar") || "slide"); });
})();
