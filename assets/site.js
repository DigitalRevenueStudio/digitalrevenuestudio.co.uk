/* Digital Revenue Studio site script.
   Fills brand links from data/links.js; renders the news lists, Portfolio carousel and blog picks from data/updates.js; runs the Meet the brands tabs. */
(function () {
  var D = window.DRS || {}, L = window.DRS_LINKS || {};
  var names = D.brandNames || {};

  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function fmt(d) {
    if (!d) return "";
    var full = /^\d{4}-\d{2}-\d{2}$/.test(d), month = /^\d{4}-\d{2}$/.test(d);
    if (!full && !month) return esc(d);
    var t = new Date(full ? d + "T00:00:00" : d + "-01T00:00:00");
    if (isNaN(t)) return esc(d);
    return t.toLocaleDateString("en-GB", full ? { day: "numeric", month: "short", year: "numeric" } : { month: "short", year: "numeric" });
  }
  function isNew(d) {
    if (!d) return false;
    var t = new Date(/^\d{4}-\d{2}$/.test(d) ? d + "-01T00:00:00" : d + "T00:00:00");
    return !isNaN(t) && (Date.now() - t.getTime()) < 45 * 86400000;
  }
  function isExternal(u) { return /^https?:\/\//i.test(u); }
  function isAffiliate(u) { return /amzn\.to|amazon\.(co\.uk|com)/i.test(u); }
  function applyLink(a, url) {
    if (!url) return;
    a.setAttribute("href", url);
    if (isExternal(url) && url.indexOf(location.host) === -1) {
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", isAffiliate(url) ? "sponsored noopener" : "noopener");
    }
  }
  function sorted(list) {
    return list.slice().sort(function (a, b) {
      if (!a.date && !b.date) return 0; if (!a.date) return 1; if (!b.date) return -1;
      return a.date < b.date ? 1 : a.date > b.date ? -1 : 0;
    });
  }
  function pick(list, brand) { if (!brand) return list; var b = brand.split(","); return list.filter(function (u) { return b.indexOf(u.brand) > -1; }); }

  /* ---------- links from data/links.js ---------- */
  document.querySelectorAll("[data-link]").forEach(function (a) {
    var path = a.getAttribute("data-link").split("."), o = L;
    for (var i = 0; i < path.length && o; i++) o = o[path[i]];
    if (typeof o === "string") applyLink(a, o);
    else if (o && o.url) { applyLink(a, o.url); if (o.label && a.hasAttribute("data-label")) a.textContent = o.label; }
  });

  /* ---------- mobile menu ---------- */
  var mb = document.querySelector(".menu-btn"), nav = document.getElementById("nav");
  if (mb && nav) mb.addEventListener("click", function () {
    var o = nav.classList.toggle("open"); mb.setAttribute("aria-expanded", o ? "true" : "false");
  });

  var all = sorted(D.updates || []);


  /* ---------- seamless loop helper (shared with carousel.js) ----------
     Clones the first slide to the end. Moving past the last slide slides into the clone, then snaps back to the real first slide with no visible rewind. */
  window.drsLoop = function (track, n) {
    var pos = 0, MAX = 3;
    /* clones: the first slides are repeated at the end so the loop never rewinds. A track may show several slides at once via the CSS variable --per. */
    var kids = Array.prototype.slice.call(track.children, 0, Math.min(MAX, n));
    if (n > 1) kids.forEach(function (first) { var c = first.cloneNode(true); c.setAttribute("aria-hidden", "true"); c.querySelectorAll("a,button,input").forEach(function (e) { e.tabIndex = -1; }); track.appendChild(c); });
    function per() { var v = parseFloat(getComputedStyle(track).getPropertyValue("--per")); return v > 0 ? v : 1; }
    function apply() { track.style.transform = "translateX(" + (-(100 / per()) * pos) + "%)"; }
    function setT(on) { track.style.transition = on ? "" : "none"; }
    function reflow() { void track.offsetWidth; }
    function snap() { if (pos === n) { setT(false); pos = 0; apply(); reflow(); setT(true); } }
    track.addEventListener("transitionend", function (e) { if (e.target === track && e.propertyName === "transform") snap(); });
    window.addEventListener("resize", function () { setT(false); apply(); reflow(); setT(true); });
    return {
      next: function () { snap(); pos++; apply(); },
      prev: function () { snap(); if (pos === 0) { setT(false); pos = n; apply(); reflow(); setT(true); } pos--; apply(); },
      goTo: function (k) { snap(); pos = k; apply(); }
    };
  };

  /* ---------- carousel ---------- */
  document.querySelectorAll("[data-carousel]").forEach(function (box) {
    var items = all.filter(function (u) { return u.featured; });
    if (!items.length) { box.hidden = true; return; }
    box.innerHTML = '<div class="track">' + items.map(function (u, n) {
      return '<div class="slide" data-brand="' + esc(u.brand) + '" role="group" aria-roledescription="slide" aria-label="Update ' + (n + 1) + ' of ' + items.length + '">' +
        '<div class="k"><span>' + esc(names[u.brand] || "Studio") + '</span>' + (u.date ? '<span class="tag">NEW</span>' : '<span class="tag">ALWAYS ON</span>') + '</div>' +
        '<h3>' + esc(u.title) + '</h3><p>' + esc(u.text) + '</p>' +
        '<div class="row"><span class="when">' + fmt(u.date) + '</span>' +
        (u.url ? '<a class="btn btn-gold btn-sm" href="' + esc(u.url) + '">' + esc(u.cta || "Read more") + ' &rarr;</a>' : '') + '</div></div>';
    }).join("") + '</div>' +
      (items.length > 1 ? '<button class="cnav prev" type="button" aria-label="Previous update">&#8249;</button><button class="cnav next" type="button" aria-label="Next update">&#8250;</button>' +
        '<div class="dots">' + items.map(function (_, n) { return '<button type="button" aria-label="Show update ' + (n + 1) + '"></button>'; }).join("") + '</div>' : '');
    var track = box.querySelector(".track"), dots = box.querySelectorAll(".dots button"), i = 0, timer = null;
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var L = items.length, loop = L > 1 ? window.drsLoop(track, L) : null;
    function go(n) {
      var m = (n + L) % L;
      if (loop) { if (n === i + 1) loop.next(); else if (n === i - 1) loop.prev(); else loop.goTo(m); }
      i = m;
      dots.forEach(function (d, k) { d.setAttribute("aria-current", k === i ? "true" : "false"); });
    }
    function stop() { if (timer) clearInterval(timer); timer = null; }
    function play() { if (reduce || items.length < 2) return; stop(); timer = setInterval(function () { go(i + 1); }, 6500); }
    box.addEventListener("click", function (e) {
      var b = e.target.closest("button"); if (!b) return;
      if (b.classList.contains("prev")) go(i - 1);
      else if (b.classList.contains("next")) go(i + 1);
      else { var k = Array.prototype.indexOf.call(dots, b); if (k > -1) go(k); }
      play();
    });
    box.addEventListener("mouseenter", stop); box.addEventListener("mouseleave", play); box.addEventListener("focusin", stop);
    var x0 = null;
    box.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; stop(); }, { passive: true });
    box.addEventListener("touchend", function (e) {
      if (x0 === null) return; var dx = e.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) > 40) go(i + (dx < 0 ? 1 : -1)); play();
    });
    go(0); play();
  });

  /* ---------- news list: data-news, optional data-brand and data-limit ---------- */
  document.querySelectorAll("[data-news]").forEach(function (ul) {
    var items = pick(all, ul.getAttribute("data-brand")).slice(0, parseInt(ul.getAttribute("data-limit") || "5", 10));
    if (!items.length) { ul.innerHTML = '<li><p>No updates yet. Check back soon.</p></li>'; return; }
    ul.innerHTML = items.map(function (u) {
      var t = u.url ? '<a href="' + esc(u.url) + '">' + esc(u.title) + '</a>' : esc(u.title);
      return '<li data-brand="' + esc(u.brand) + '"><div class="meta">' + esc(names[u.brand] || "Studio") + (u.date ? ' &middot; ' + fmt(u.date) : '') + (isNew(u.date) ? '<span class="newtag">NEW</span>' : '') + '</div><h3>' + t + '</h3><p>' + esc(u.text) + '</p></li>';
    }).join("");
  });

  /* ---------- blog picks ---------- */
  document.querySelectorAll("[data-posts]").forEach(function (box) {
    var items = (D.posts || []).slice(0, parseInt(box.getAttribute("data-limit") || "3", 10));
    if (!items.length) { box.hidden = true; return; }
    box.innerHTML = items.map(function (p) {
      return '<a class="post" href="' + esc(p.url) + '"><div class="meta">' + esc(p.label) + '</div><h3>' + esc(p.title) + '</h3><p>' + esc(p.text) + '</p><span class="go">Read &rarr;</span></a>';
    }).join("");
  });

  /* ---------- Meet the brands tabs ---------- */
  document.querySelectorAll("[data-tabs]").forEach(function (box) {
    var tabs = box.querySelectorAll('[role="tab"]'), panes = box.querySelectorAll('[role="tabpanel"]'), cur = 0, timer = null;
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    function show(n) {
      cur = (n + tabs.length) % tabs.length;
      tabs.forEach(function (t, k) { t.setAttribute("aria-selected", k === cur ? "true" : "false"); t.tabIndex = k === cur ? 0 : -1; });
      panes.forEach(function (p, k) { p.hidden = k !== cur; });
    }
    function stop() { if (timer) clearInterval(timer); timer = null; }
    function play() { if (reduce) return; stop(); timer = setInterval(function () { show(cur + 1); }, 6000); }
    tabs.forEach(function (t, k) {
      t.addEventListener("click", function () { show(k); stop(); });
      t.addEventListener("keydown", function (e) {
        if (e.key === "ArrowRight") { show(cur + 1); tabs[cur].focus(); stop(); }
        if (e.key === "ArrowLeft") { show(cur - 1); tabs[cur].focus(); stop(); }
      });
    });
    box.addEventListener("mouseenter", stop); box.addEventListener("focusin", stop);
    show(0); play();
  });
})();
