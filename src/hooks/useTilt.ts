import { useEffect, useRef } from "react";
import { useReducedMotion } from "./useReducedMotion";

/** Efecto de inclinación 3D (tilt) siguiendo el cursor, con retorno suave al salir. */
export function useTilt<T extends HTMLElement>(strength = 10) {
  const ref = useRef<T | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let frame = 0;

    function handleMove(e: PointerEvent) {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        el.style.transform = `perspective(900px) rotateX(${(-py * strength).toFixed(2)}deg) rotateY(${(px * strength).toFixed(2)}deg) translateZ(0)`;
      });
    }

    function handleLeave() {
      if (!el) return;
      cancelAnimationFrame(frame);
      el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
    }

    el.addEventListener("pointermove", handleMove);
    el.addEventListener("pointerleave", handleLeave);
    return () => {
      el.removeEventListener("pointermove", handleMove);
      el.removeEventListener("pointerleave", handleLeave);
      cancelAnimationFrame(frame);
    };
  }, [reducedMotion, strength]);

  return ref;
}
