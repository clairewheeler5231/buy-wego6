/* Exit intent + sticky CTA.

   Aggressive on TRIGGERS, honest on CONTENT. No countdown, no fake stock counter,
   no invented discount — those are the things that get a page reported, and the
   visitor already knows the price and which pack they picked. The lever that is
   left is removing the risk of deciding right now, so the panel leads with the
   guarantee rather than a number.

   Fires up to twice per session:
     1st  — the moment they try to leave
     2nd  — only after a real cooldown AND only if they never clicked through,
            because a second panel to someone already on their way to the offer
            is pure friction.
*/
(function () {
  var el = document.getElementById('xi');
  var sticky = document.getElementById('sticky');
  var KEY = 'w6xi', CLICK = 'w6go';
  var shown = 0, open = false, lastFocus = null, armed = false, lastY = 0, since = 0;

  function fired() { try { return +(sessionStorage.getItem(KEY) || 0); } catch (e) { return 0; } }
  function clicked() { try { return sessionStorage.getItem(CLICK) === '1'; } catch (e) { return false; } }

  // remember that they went to the offer, so we never nag someone who converted
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href*="/go/"]');
    if (a) { try { sessionStorage.setItem(CLICK, '1'); } catch (err) {} }
  }, true);

  /* ── the panel ───────────────────────────────────────────────────────── */
  function show() {
    if (!el || open || clicked()) return;
    var n = fired();
    if (n >= 2) return;
    if (n === 1 && Date.now() - since < 45000) return;   // cooldown before a 2nd try
    open = true; shown = n + 1; since = Date.now();
    try { sessionStorage.setItem(KEY, String(shown)); } catch (e) {}
    lastFocus = document.activeElement;
    el.hidden = false;
    requestAnimationFrame(function () { el.classList.add('is-on'); });
    document.documentElement.style.overflow = 'hidden';
    var cta = el.querySelector('.btn');
    if (cta) cta.focus();
    document.addEventListener('keydown', onKey, true);
  }

  function hide() {
    if (!open) return;
    open = false;
    el.classList.remove('is-on');
    document.documentElement.style.overflow = '';
    document.removeEventListener('keydown', onKey, true);
    var done = function () { el.hidden = true; };
    matchMedia('(prefers-reduced-motion: reduce)').matches ? done() : setTimeout(done, 220);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function onKey(e) {
    if (e.key === 'Escape') { e.preventDefault(); hide(); return; }
    if (e.key !== 'Tab') return;
    var f = el.querySelectorAll('button, a[href]');
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  if (el) {
    el.addEventListener('click', function (e) {
      if (e.target === el || e.target.closest('.xi-x') || e.target.closest('.xi-dismiss')) hide();
    });

    if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
      // leaving through the TOP edge — toward the tab bar / address bar
      document.addEventListener('mouseout', function (e) {
        if (!e.relatedTarget && e.clientY <= 6) show();
      });
      // ...and a decisive upward flick toward it, which precedes the mouseout
      document.addEventListener('mousemove', function (e) {
        var dy = e.clientY - lastY;
        if (lastY && dy < -40 && e.clientY < 130) show();
        lastY = e.clientY;
      });
      // tab going to the background while they are deep in the page
      document.addEventListener('visibilitychange', function () {
        if (document.hidden && window.scrollY > 600) show();
      });
    } else {
      // touch: consume one back gesture
      var arm = function () {
        if (armed) return;
        armed = true;
        try { history.pushState({ w6xi: 1 }, ''); } catch (e) {}
      };
      window.addEventListener('touchstart', arm, { passive: true, once: true });
      window.addEventListener('scroll', arm, { passive: true, once: true });
      window.addEventListener('popstate', function () { if (armed) show(); });

      // ...and a hard scroll back up toward the top, which is what leaving looks
      // like on a phone. Guarded on having read something first.
      var maxY = 0, ticking = false;
      window.addEventListener('scroll', function () {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(function () {
          var y = window.scrollY;
          maxY = Math.max(maxY, y);
          if (maxY > 1400 && y < maxY - 900 && y < 500) show();
          ticking = false;
        });
      }, { passive: true });
    }
  }

  /* ── sticky CTA: the offer stays one tap away all the way down ────────── */
  if (sticky) {
    var prices = document.getElementById('preise');
    var showBar = function () {
      // never cover the price table — the CTA is already right there
      var inPrices = false;
      if (prices) {
        var r = prices.getBoundingClientRect();
        inPrices = r.top < window.innerHeight && r.bottom > 0;
      }
      var want = window.scrollY > 700 && !inPrices && !open;
      if (want === !sticky.hidden) return;
      sticky.hidden = !want;
      if (want) requestAnimationFrame(function () { sticky.classList.add('is-on'); });
      else sticky.classList.remove('is-on');
    };
    var t = false;
    window.addEventListener('scroll', function () {
      if (t) return; t = true;
      requestAnimationFrame(function () { showBar(); t = false; });
    }, { passive: true });
    showBar();
  }
})();
