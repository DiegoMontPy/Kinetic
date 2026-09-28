// @ts-check
/* global document, window, performance, requestAnimationFrame, IntersectionObserver */
// Inlined verbatim into <head>. The flag that hides [data-reveal] elements is set in the
// same script that observes them, so content is never hidden without the logic to show it.
(() => {
  const root = document.documentElement;
  const canAnimate =
    "IntersectionObserver" in window &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!canAnimate) return;

  const VISIBLE_THRESHOLD = 0.15;
  const MAX_STAGGER_INDEX = 3;
  const COUNT_DURATION_MS = 900;

  /** @param {HTMLElement} element */
  const countUp = (element) => {
    const target = Number(element.dataset.count);
    const start = performance.now();
    /** @param {number} now */
    const frame = (now) => {
      const progress = Math.min((now - start) / COUNT_DURATION_MS, 1);
      const eased = 1 - (1 - progress) ** 3;
      element.textContent = String(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  };

  const observe = () => {
    const observer = new IntersectionObserver(
      (entries) => {
        /** @type {Map<Element | null, number>} */
        const staggerByGroup = new Map();
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const element = /** @type {HTMLElement} */ (entry.target);
          observer.unobserve(element);

          if (element.hasAttribute("data-reveal")) {
            const index = staggerByGroup.get(element.parentElement) ?? 0;
            staggerByGroup.set(element.parentElement, index + 1);
            element.style.setProperty("--reveal-index", String(Math.min(index, MAX_STAGGER_INDEX)));
            element.setAttribute("data-revealed", "");
          }
          if (element.dataset.count) countUp(element);
        }
      },
      { threshold: VISIBLE_THRESHOLD },
    );

    for (const element of document.querySelectorAll("[data-count]")) {
      element.textContent = "0";
      observer.observe(element);
    }
    for (const element of document.querySelectorAll("[data-reveal]")) observer.observe(element);
  };

  root.setAttribute("data-reveal-ready", "");
  const start = () => {
    try {
      observe();
    } catch {
      root.removeAttribute("data-reveal-ready");
    }
  };
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
