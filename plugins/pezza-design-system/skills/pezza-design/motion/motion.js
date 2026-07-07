/* ============================================================
   PEZZA · MOTION HELPERS — minimal vanilla JS.
   Pairs with motion.css. Respects prefers-reduced-motion.
   ============================================================ */

const prefersReduced = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* DRAW-ON: prime an inline svg's paths and trigger the draw.
   Reads data-length (authored, e.g. 82.12 on the emblem) and falls
   back to getTotalLength(). Staggers paths in document order. */
export function drawOn(svg, { duration = 900, stagger = 140 } = {}) {
  const paths = svg.querySelectorAll("path");
  paths.forEach((p, i) => {
    const len = parseFloat(p.dataset.length) || p.getTotalLength();
    p.style.setProperty("--draw-len", len);
    p.style.setProperty("--draw-index", i);
  });
  svg.style.setProperty("--draw-dur", `${duration}ms`);
  svg.classList.remove("draw-on");
  // restart reliably: force reflow between class toggles
  void svg.getBoundingClientRect();
  svg.classList.add("draw-on");
}

/* CROSSFADE-WIPE: toggle a panel/slide-over behind the moving edge.
   Returns a promise that resolves when the wipe settles. */
export function crossfadeWipe(el, show) {
  return new Promise((resolve) => {
    el.classList.remove("crossfade-wipe-in", "crossfade-wipe-out");
    void el.getBoundingClientRect();
    if (show) el.hidden = false;
    el.classList.add(show ? "crossfade-wipe-in" : "crossfade-wipe-out");
    const done = () => {
      if (!show) el.hidden = true;
      el.removeEventListener("animationend", done);
      resolve();
    };
    if (prefersReduced()) {
      // fade fallback still fires animationend; belt and braces:
      setTimeout(done, 260);
    }
    el.addEventListener("animationend", done);
  });
}

/* PLAYHEAD: drive the accent sweep from real progress (0..1).
   This is the product-safe way to use the playhead - no loop. */
export function playheadSet(el, fraction) {
  const clamped = Math.max(0, Math.min(1, fraction));
  el.style.setProperty("--playhead-p", `${(clamped * 100).toFixed(2)}%`);
}
