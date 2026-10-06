/* Digital Revenue Studio: cookie consent + Google Analytics loader.
   Google Analytics is only loaded after a visitor clicks Accept. */
(function () {
  var GA_ID = 'G-EWFNWGYHH9';
  var KEY = 'drs_cookie_consent';

  function getChoice() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function setChoice(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  function loadGA() {
    if (window.__drsGALoaded) { return; }
    window.__drsGALoaded = true;
    window['ga-disable-' + GA_ID] = false;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    window.gtag('js', new Date());
    window.gtag('config', GA_ID);
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

  function injectStyles() {
    if (document.getElementById('drs-consent-css')) { return; }
    var st = document.createElement('style');
    st.id = 'drs-consent-css';
    st.textContent =
      '#drs-consent{position:fixed;left:16px;right:16px;bottom:16px;z-index:99999;max-width:640px;margin:0 auto;' +
      'background:#0A1F14;color:#fff;border:1px solid #F5A623;border-radius:12px;padding:18px 20px;' +
      'box-shadow:0 8px 32px rgba(0,0,0,.35);font-family:"DM Sans",system-ui,sans-serif;font-size:14px;line-height:1.55}' +
      '#drs-consent p{margin:0 0 14px;color:#e8efe9}' +
      '#drs-consent a{color:#F5A623;text-decoration:underline}' +
      '#drs-consent .drs-c-row{display:flex;gap:10px;flex-wrap:wrap}' +
      '#drs-consent button{flex:1 1 140px;min-height:44px;padding:10px 18px;border-radius:8px;font:600 14px "DM Sans",system-ui,sans-serif;cursor:pointer;border:2px solid #F5A623}' +
      '#drs-consent .drs-c-accept{background:#F5A623;color:#0A1F14}' +
      '#drs-consent .drs-c-decline{background:transparent;color:#F5A623}' +
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
    var b = document.createElement('div');
    b.id = 'drs-consent';
    b.setAttribute('role', 'dialog');
    b.setAttribute('aria-label', 'Cookie choices');
    b.innerHTML =
      '<p>We use Google Analytics cookies to see which pages are useful and to improve the site. ' +
      'They are only set if you accept. You can change your mind at any time. ' +
      '<a href="/drs-privacy.html#cookies">Privacy policy</a></p>' +
      '<div class="drs-c-row">' +
      '<button type="button" class="drs-c-accept">Accept</button>' +
      '<button type="button" class="drs-c-decline">Decline</button></div>';
    b.querySelector('.drs-c-accept').addEventListener('click', function () {
      setChoice('granted'); hideBanner(); loadGA();
    });
    b.querySelector('.drs-c-decline').addEventListener('click', function () {
      setChoice('denied'); hideBanner(); clearGACookies();
    });
    document.body.appendChild(b);
  }

  window.drsCookieSettings = showBanner;

  function init() {
    var c = getChoice();
    if (c === 'granted') { loadGA(); }
    else if (c === 'denied') { clearGACookies(); }
    else { showBanner(); }
  }

  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', init); }
  else { init(); }
})();
