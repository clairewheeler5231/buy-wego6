/* Exit intent — one shot per session, on the way out only.

   Desktop fires on a real upward exit (cursor leaving through the top of the
   viewport toward the tab bar / address bar), not on any mouseleave: leaving
   sideways or downward is normal reading behaviour and popping there is what
   makes these things hated.

   Mobile has no cursor, so it uses the back gesture: one history entry is
   pushed on first interaction and consumed on popstate. That shows the offer
   at the exact moment the visitor is leaving, and the back press still works
   on the second attempt because the entry is not re-pushed.

   Deliberately does NOT fire on: timers, scroll depth, or repeat visits in the
   same session. */
(function () {
  var el = document.getElementById('xi');
  if (!el) return;

  var KEY = 'w6xi';
  try { if (sessionStorage.getItem(KEY)) return; } catch (e) { /* private mode */ }

  var shown = false, lastFocus = null, armed = false;

  function open() {
    if (shown) return;
    shown = true;
    try { sessionStorage.setItem(KEY, '1'); } catch (e) {}
    lastFocus = document.activeElement;
    el.hidden = false;
    // next frame so the transition has a start state to animate from
    requestAnimationFrame(function () { el.classList.add('is-on'); });
    document.documentElement.style.overflow = 'hidden';
    var cta = el.querySelector('.btn');
    if (cta) cta.focus();
    document.addEventListener('keydown', onKey, true);
  }

  function close() {
    el.classList.remove('is-on');
    document.documentElement.style.overflow = '';
    document.removeEventListener('keydown', onKey, true);
    var done = function () { el.hidden = true; };
    // honour reduced motion: no transition means no transitionend
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) done();
    else setTimeout(done, 220);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function onKey(e) {
    if (e.key === 'Escape') { e.preventDefault(); close(); return; }
    if (e.key !== 'Tab') return;
    // keep focus inside the dialog while it is open
    var f = el.querySelectorAll('button, a[href]');
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  el.addEventListener('click', function (e) {
    if (e.target === el || e.target.closest('.xi-x')) close();
  });

  // ── desktop: leaving through the top edge ────────────────────────────────
  if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.addEventListener('mouseout', function (e) {
      if (e.relatedTarget || e.clientY > 6) return;   // still on the page, or not upward
      open();
    });
  } else {
    // ── touch: consume one back gesture ────────────────────────────────────
    var arm = function () {
      if (armed) return;
      armed = true;
      try { history.pushState({ w6xi: 1 }, ''); } catch (e) {}
      window.removeEventListener('touchstart', arm);
      window.removeEventListener('scroll', arm);
    };
    window.addEventListener('touchstart', arm, { passive: true, once: true });
    window.addEventListener('scroll', arm, { passive: true, once: true });
    window.addEventListener('popstate', function (e) {
      if (!shown && armed) open();
    });
  }
})();
