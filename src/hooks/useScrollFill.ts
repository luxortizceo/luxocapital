import { useEffect, useRef } from "react";

/** Devuelve un ref cuyo elemento recibe la variable CSS --fill (0 a 1) según el scroll dentro de su contenedor. */
export function useScrollFill<T extends HTMLElement>() {
  const containerRef = useRef<T | null>(null);
  const fillRef = useRef<T | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let raf = 0;

    function update() {
      const el = containerRef.current;
      const fillEl = fillRef.current;
      if (!el || !fillEl) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height + vh * 0.6;
      const passed = vh * 0.85 - rect.top;
      const progress = Math.min(Math.max(passed / total, 0), 1);
      fillEl.style.setProperty("--fill", progress.toFixed(4));
    }

    function onScroll() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return { containerRef, fillRef };
}
