/* WEGO6 — first-touch click-id capture.
   Loaded on every content page. Stores the first ad click-id we ever see for this
   visitor so that /go/ can attach it to sub1 later, even if they browse first.

   gbraid + wbraid are NOT optional: iOS / ATT Google Ads clicks arrive with those
   instead of gclid. Leaving them out silently drops those conversions — every one
   would report as organic and could never be uploaded back to Google Ads. */
(function () {
  "use strict";

  var KEYS = [
    "gclid", "gbraid", "wbraid",          // Google (gbraid/wbraid = iOS/ATT)
    "fbclid", "ttclid", "msclkid",        // Meta, TikTok, Microsoft
    "utm_source", "utm_medium", "utm_campaign"
  ];

  try {
    var q = new URLSearchParams(location.search);
    var s = JSON.parse(localStorage.getItem("w6_track") || "{}");
    var dirty = false;
    KEYS.forEach(function (k) {
      var v = q.get(k);
      if (v && !s[k]) { s[k] = v; dirty = true; }   // first touch wins
    });
    if (dirty) localStorage.setItem("w6_track", JSON.stringify(s));
  } catch (e) { /* private mode / storage disabled — organic tag still works */ }
})();
