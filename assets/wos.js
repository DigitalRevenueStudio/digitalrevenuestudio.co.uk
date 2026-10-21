/* WOS wiki script: guide search, copy-code buttons, gear strip, outbound click tracking.
   Search reads data/wos-guides.js (window.WOS_GUIDES). Gear strip reads data/wos-gear.js (window.WOS_GEAR). */
(function () {
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }

  /* ---------- search ---------- */
  var inp = document.getElementById("wiki-search"), box = document.getElementById("search-results");
  if (inp && box) {
    var G = window.WOS_GUIDES || [];
    function run() {
      var q = inp.value.trim().toLowerCase();
      if (q.length < 2) { box.classList.remove("on"); box.innerHTML = ""; return; }
      var words = q.split(/\s+/);
      var hits = G.filter(function (g) {
        var hay = (g.t + " " + g.d + " " + g.s).toLowerCase();
        return words.every(function (w) { return hay.indexOf(w) > -1; });
      }).slice(0, 8);
      box.innerHTML = hits.length ? hits.map(function (g) {
        return '<a href="' + esc(g.u) + '"><b>' + esc(g.t) + '</b><small>' + esc(g.s) + '</small></a>';
      }).join("") : '<div class="none">No guide matches that yet. Tell us what you want to see in the Community Hub.</div>';
      box.classList.add("on");
    }
    inp.addEventListener("input", run);
    inp.addEventListener("focus", run);
    document.addEventListener("click", function (e) { if (!e.target.closest(".search")) box.classList.remove("on"); });
    inp.addEventListener("keydown", function (e) { if (e.key === "Escape") { box.classList.remove("on"); inp.blur(); } });
  }

  /* ---------- copy code ---------- */
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-copy]"); if (!b) return;
    var code = b.getAttribute("data-copy");
    function done() { var o = b.textContent; b.textContent = "Copied"; b.classList.add("done"); setTimeout(function () { b.textContent = o; b.classList.remove("done"); }, 1600); track("copy_gift_code", { code: code }); }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(code).then(done, function () { fallback(code, done); });
    else fallback(code, done);
  });
  function fallback(t, cb) {
    var a = document.createElement("textarea"); a.value = t; a.setAttribute("readonly", ""); a.style.position = "fixed"; a.style.opacity = "0";
    document.body.appendChild(a); a.select(); try { document.execCommand("copy"); cb(); } catch (x) {} document.body.removeChild(a);
  }

  /* ---------- gear strip ---------- */
  var gear = document.querySelector("[data-gear]");
  if (gear) {
    var items = window.WOS_GEAR || [];
    if (!items.length) { var s = gear.closest("section"); if (s) s.hidden = true; }
    else gear.innerHTML = items.map(function (g) {
      return '<a href="' + esc(g.url) + '" target="_blank" rel="sponsored noopener">' + (g.img ? '<img src="' + esc(g.img) + '" alt="" loading="lazy">' : "") + '<b>' + esc(g.title) + '</b><small>' + esc(g.note || "") + '</small><span class="btn btn-ice btn-sm" style="color:#0a1f35">View on Amazon</span></a>';
    }).join("");
  }

  /* ---------- outbound click tracking (key events in Google Analytics) ----------
     Sends an event only when Google Analytics is loaded (after the visitor's consent). */
  function track(name, params) {
    try { if (typeof window.gtag === "function") window.gtag("event", name, params || {}); } catch (e) {}
  }
  document.addEventListener("click", function (e) {
    var a = e.target.closest("a[href]"); if (!a) return;
    var h = a.getAttribute("href") || "", n = null;
    if (/ko-fi\.com/i.test(h)) n = "click_kofi";
    else if (/payhip\.com/i.test(h)) n = "click_payhip";
    else if (/gumroad\.com/i.test(h)) n = "click_gumroad";
    else if (/amzn\.to|amazon\.(co\.uk|com)/i.test(h)) n = "click_amazon";
    else if (/fathomguides/i.test(h)) n = "click_fathom";
    if (n) track(n, { link_url: h, page_path: location.pathname });
  });
})();
