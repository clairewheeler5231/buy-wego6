/* ═══════════════════════════════════════════════════════════════════════════
   WEGO6 — AFFILIATE LINKS.  This is the ONLY file that holds offer URLs.

   TO CHANGE WHERE A COUNTRY'S "BUY" BUTTONS GO:
     edit that country's `base` below, commit, done. Live in ~60 seconds.
     No rebuild, no code, nothing else to touch.

   `base` = the full Everflow tracking URL for that country.
   `org`  = the tag we send in sub1 for ORGANIC visitors, so the dashboard can
            split revenue by country. Paid clicks overwrite it with the click-id.

   Hashes below were read back from each offer's own tracking_url via the
   Everflow API (GET /v1/affiliates/alloffers) — never typed by hand.
   ═══════════════════════════════════════════════════════════════════════════ */

window.WEGO6_LINKS = {

  uk: { base: "https://www.slmw4qtrk.com/ZZ2GX/MPWX6H/", org: "wego6uk" }, /* offer 378 · UK · $80 */

  /* ── live now ── */
  de: { base: "https://www.slmw4qtrk.com/ZZ2GX/DDD68M/", org: "wego6de" }, /* offer 230 · DE/AT/CH v8 · $80 */
  at: { base: "https://www.slmw4qtrk.com/ZZ2GX/DDD68M/", org: "wego6at" }, /* offer 230 · same DACH offer */
  ch: { base: "https://www.slmw4qtrk.com/ZZ2GX/DDD68M/", org: "wego6ch" }, /* offer 230 · same DACH offer */
  nl: { base: "https://www.slmw4qtrk.com/ZZ2GX/C9SQ39/", org: "wego6nl" }, /* offer 208 · $75 */
  be: { base: "https://www.slmw4qtrk.com/ZZ2GX/C2WBD8/", org: "wego6be" }, /* offer 203 · $75 */
  dk: { base: "https://www.slmw4qtrk.com/ZZ2GX/D6SMB7/", org: "wego6dk" }, /* offer 226 · $80 */
  fr: { base: "https://www.slmw4qtrk.com/ZZ2GX/C5N3TG/", org: "wego6fr" }, /* offer 205 · $75 */
  it: { base: "https://www.slmw4qtrk.com/ZZ2GX/C72ZL3/", org: "wego6it" }, /* offer 206 · $75 */
  no: { base: "https://www.slmw4qtrk.com/ZZ2GX/CC7LRW/", org: "wego6no" }, /* offer 209 · $75 */
  se: { base: "https://www.slmw4qtrk.com/ZZ2GX/C1HFMM/", org: "wego6se" }, /* offer 202 · $75 */
  fi: { base: "https://www.slmw4qtrk.com/ZZ2GX/C4974T/", org: "wego6fi" }, /* offer 204 · $75 */
  lu: { base: "https://www.slmw4qtrk.com/ZZ2GX/C8FTBN/", org: "wego6lu" }  /* offer 207 · $75 · no pages built */
};

/* Optional referrer hop (must live on a DIFFERENT domain than this site, and never
   on an account that hosts another live site). Empty = send no referrer at all. */
window.WEGO6_HOP = "";
