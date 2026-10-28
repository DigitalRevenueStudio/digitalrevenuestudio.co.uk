/* Digital Revenue Studio: cookie consent, Google Consent Mode v2 and Google Analytics loader.

   How it works
   - Every page loads this file. Nothing is stored and Google Analytics is NOT loaded until a visitor clicks Accept.
   - Consent Mode v2 defaults are set to "denied" on every page load, then updated to "granted" on Accept, so any
     Google product added later (AdSense, Ads) starts from the right state.
   - The choice is remembered for 12 months, then the banner is shown again.
   - Any link or button with the attribute data-cookie-settings re-opens the banner ("Cookie settings" in the footer).
   - When Analytics is on, outbound clicks (Ko-fi, Amazon, Fathom, Payhip and so on), code copies and form sign-ups are sent
     as events, and each page is tagged with a content_group so reports can be split by section.

   When AdSense is approved, replace the banner below with a Google certified CMP (Funding Choices) and keep this file
   for the analytics loader only. See GO-LIVE-CHECKLIST.md. */
(function () {
  'use strict';
  var GA_ID = 'G-EWFNWGYHH9';
  var KEY = 'drs_cookie_consent';          // 'granted' | 'denied'
  var KEY_TS = 'drs_cookie_consent_ts';    // epoch ms
  var MAX_AGE = 365 * 24 * 60 * 60 * 1000; // 12 months

  /* ---------- storage ---------- */
  function getChoice() {
    try {
      var v = localStorage.getItem(KEY);
      var ts = parseInt(localStorage.getItem(KEY_TS) || '0', 10);
      if (v && ts && (Date.now() - ts) > MAX_AGE) { return null; }
      return v;
    } catch (e) { return null; }
  }
  function setChoice(v) {
    try { localStorage.setItem(KEY, v); localStorage.setItem(KEY_TS, String(Date.now())); } catch (e) {}
  }

  /* ---------- Consent Mode v2 defaults (always denied until the visitor chooses) ---------- */
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== 'function') { window.gtag = function () { window.dataLayer.push(arguments); }; }
  window.gtag('consent', 'default', {
    ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied',
    analytics_storage: 'denied', wait_for_update: 500
  });

  function updateConsent(granted) {
    var v = granted ? 'granted' : 'denied';
    window.gtag('consent', 'update', {
      ad_storage: v, ad_user_data: v, ad_personalization: v, analytics_storage: v
    });
  }

  /* ---------- page grouping ---------- */
  function contentGroup() {
    var p = location.pathname.replace(/^\//, '').replace(/\.html$/, '') || 'index';
    if (/^wos-guide-/.test(p)) { return 'WOS guide'; }
    if (/^wos-blog-|^wos-news/.test(p)) { return 'WOS news'; }
    if (/^wos-/.test(p) || p === 'drs-wos-wiki') { return 'WOS wiki'; }
    if (/^drs-blog/.test(p)) { return 'DRS blog'; }
    if (/^drs-case-study|^portfolio|^drs-brand/.test(p)) { return 'Portfolio'; }
    if (/^drs-shop/.test(p)) { return 'Shop'; }
    if (/^faq|^cdm|^drs-cdm/.test(p)) { return 'Tools and FAQ'; }
    if (p === 'index' || p === '') { return 'Home'; }
    return 'Studio';
  }

  /* ---------- Analytics ---------- */
  function loadGA() {
    if (window.__drsGALoaded) { return; }
    window.__drsGALoaded = true;
    window['ga-disable-' + GA_ID] = false;
    updateConsent(true);
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    window.gtag('js', new Date());
    window.gtag('config', GA_ID, { content_group: contentGroup(), anonymize_ip: true });
    bindEvents();
  }

  function clearGACookies() {
    window['ga-disable-' + GA_ID] = true;
    var host = location.hostname.replace(/^www\./, '');
    document.cookie.split(';').forEach(function (c) {
      var name = c.split('=')[0].trim();
      if (name === '_ga' || name.indexOf('_ga_') === 0 || name === '_gid' || name === '_gat') {
        ['', '; domain=' + host, '; domain=.' + host, '; domain=www.' + host].forEach(function (d) {
          document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/' + d;
        });
      }
    });
  }

  /* ---------- events (only bound once consent is granted) ---------- */
  function send(name, params) {
    try { if (window.__drsGALoaded && !window['ga-disable-' + GA_ID]) { window.gtag('event', name, params || {}); } } catch (e) {}
  }
  var OUT = [
    [/ko-fi\.com/i, 'kofi_click'],
    [/amzn\.to|amazon\./i, 'affiliate_click'],
    [/fathomguides/i, 'fathom_click'],
    [/payhip\.com/i, 'shop_click'],
    [/atker\.co\.uk/i, 'atker_click'],
    [/mavericksadventures/i, 'ma_click'],
    [/instagram\.com|facebook\.com|tiktok\.com|pinterest\.|youtube\.com|reddit\.com|t\.me|x\.com/i, 'social_click']
  ];
  function bindEvents() {
    if (window.__drsEvents) { return; }
    window.__drsEvents = true;
    document.addEventListener('click', function (e) {
      var t = e.target;
      if (!t || !t.closest) { return; }
      var copy = t.closest('.copy, .copy-btn, [data-copy]');
      if (copy) { send('copy_content', { item: (copy.getAttribute('data-copy') || copy.id || 'template').slice(0, 40), page: location.pathname }); return; }
      var a = t.closest('a[href]');
      if (!a) { return; }
      var href = a.getAttribute('href') || '';
      var abs;
      try { abs = new URL(href, location.href); } catch (er) { return; }
      if (abs.hostname.replace(/^www\./, '') === location.hostname.replace(/^www\./, '')) {
        if (a.classList.contains('btn') || a.classList.contains('cta')) {
          send('cta_click', { link_text: (a.textContent || '').trim().slice(0, 40), link_url: abs.pathname, page: location.pathname });
        }
        return;
      }
      var name = 'outbound_click';
      for (var i = 0; i < OUT.length; i++) { if (OUT[i][0].test(abs.href)) { name = OUT[i][1]; break; } }
      send(name, { link_url: abs.href.slice(0, 120), link_domain: abs.hostname, link_text: (a.textContent || '').trim().slice(0, 40), page: location.pathname });
    }, true);
  }

  /* ---------- banner ---------- */
  function injectStyles() {
    if (document.getElementById('drs-consent-css')) { return; }
    var st = document.createElement('style');
    st.id = 'drs-consent-css';
    st.textContent =
      '#drs-consent{position:fixed;left:16px;right:16px;bottom:16px;z-index:99999;max-width:660px;margin:0 auto;' +
      'background:#0A1F14;color:#fff;border:1px solid #F5A623;border-radius:12px;padding:18px 20px;' +
      'box-shadow:0 8px 32px rgba(0,0,0,.35);font-family:"DM Sans",system-ui,sans-serif;font-size:14px;line-height:1.55}' +
      'body.wiki #drs-consent{background:#0b1d33;border-color:#7dbdf0}' +
      '#drs-consent h2{margin:0 0 6px;font:700 15px "DM Sans",system-ui,sans-serif;color:#fff;letter-spacing:0}' +
      '#drs-consent p{margin:0 0 14px;color:#e8efe9}' +
      'body.wiki #drs-consent p{color:#d6e4f2}' +
      '#drs-consent a{color:#F5A623;text-decoration:underline}' +
      'body.wiki #drs-consent a{color:#7dd4f8}' +
      '#drs-consent .drs-c-row{display:flex;gap:10px;flex-wrap:wrap}' +
      '#drs-consent button{flex:1 1 140px;min-height:44px;padding:10px 18px;border-radius:8px;font:600 14px "DM Sans",system-ui,sans-serif;cursor:pointer;border:2px solid #F5A623}' +
      'body.wiki #drs-consent button{border-color:#7dbdf0}' +
      '#drs-consent .drs-c-accept{background:#F5A623;color:#0A1F14}' +
      'body.wiki #drs-consent .drs-c-accept{background:#7dbdf0;color:#0b1d33}' +
      '#drs-consent .drs-c-decline{background:transparent;color:#F5A623}' +
      'body.wiki #drs-consent .drs-c-decline{color:#7dd4f8}' +
      '#drs-consent button:focus-visible{outline:3px solid #fff;outline-offset:2px}';
    document.head.appendChild(st);
  }

  function hideBanner() {
    var b = document.getElementById('drs-consent');
    if (b && b.parentNode) { b.parentNode.removeChild(b); }
  }

  function showBanner() {
    if (document.getElementById('drs-consent')) { return; }
    injectStyles();
    var current = getChoice();
    var b = document.createElement('div');
    b.id = 'drs-consent';
    b.setAttribute('role', 'dialog');
    b.setAttribute('aria-modal', 'false');
    b.setAttribute('aria-labelledby', 'drs-consent-h');
    b.innerHTML =
      '<h2 id="drs-consent-h">Cookies and analytics</h2>' +
      '<p>We use Google Analytics cookies to see which pages are useful and to improve the site. ' +
      'They are only set if you accept, and the site works the same either way. ' +
      (current ? 'Your current choice is <strong>' + (current === 'granted' ? 'accepted' : 'declined') + '</strong>. ' : '') +
      'You can change your mind at any time from Cookie settings in the footer. ' +
      '<a href="/drs-privacy#cookies">Privacy policy</a></p>' +
      '<div class="drs-c-row">' +
      '<button type="button" class="drs-c-accept">Accept</button>' +
      '<button type="button" class="drs-c-decline">Decline</button></div>';
    b.querySelector('.drs-c-accept').addEventListener('click', function () {
      setChoice('granted'); hideBanner(); loadGA();
    });
    b.querySelector('.drs-c-decline').addEventListener('click', function () {
      setChoice('denied'); hideBanner(); updateConsent(false); clearGACookies();
    });
    document.body.appendChild(b);
    var first = b.querySelector('.drs-c-accept');
    if (first && current) { try { first.focus(); } catch (e) {} }
  }

  window.drsCookieSettings = showBanner;

  /* "Cookie settings" links anywhere on the site */
  document.addEventListener('click', function (e) {
    var t = e.target && e.target.closest ? e.target.closest('[data-cookie-settings]') : null;
    if (t) { e.preventDefault(); showBanner(); }
  });

  /* Older pages have no Cookie settings link yet: add one to the footer so a choice can always be changed. */
  function ensureSettingsLink() {
    if (document.querySelector('[data-cookie-settings]')) { return; }
    var f = document.querySelector('footer');
    if (!f) { return; }
    var p = document.createElement('p');
    p.style.cssText = 'text-align:center;margin:10px 0 0;font-size:.8rem';
    p.innerHTML = '<a href="#" data-cookie-settings style="color:inherit;text-decoration:underline;opacity:.8">Cookie settings</a>';
    f.appendChild(p);
  }

  function init() {
    ensureSettingsLink();
    var c = getChoice();
    if (c === 'granted') { loadGA(); }
    else if (c === 'denied') { updateConsent(false); clearGACookies(); }
    else { showBanner(); }
  }

  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', init); }
  else { init(); }
})();
