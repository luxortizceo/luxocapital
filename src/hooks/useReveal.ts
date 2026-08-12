import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useReducedMotion } from "./useReducedMotion";

type RevealOptions = {
  y?: number;
  delay?: number;
  duration?: number;
  /** Margen del IntersectionObserver; controla qué tan pronto se dispara la revelación. */
  rootMargin?: string;
  stagger?: number;
  /** Selector de hijos a animar en cascada; si se omite, anima el propio elemento. */
  itemSelector?: string;
};

/** Revela un elemento (o sus hijos) con fade + blur + movimiento al entrar en el viewport. */
export function useReveal<T extends HTMLElement>(options: RevealOptions = {}) {
  const ref = useRef<T | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (reducedMotion) {
      el.style.opacity = "1";
      el.style.transform = "none";
      el.style.filter = "none";
      return;
    }

    const targets = options.itemSelector ? el.querySelectorAll(options.itemSelector) : el;

    function play() {
      gsap.fromTo(
        targets,
        { opacity: 0, y: options.y ?? 32, filter: "blur(8px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: options.duration ?? 1,
          delay: options.delay ?? 0,
          stagger: options.stagger ?? 0.08,
          ease: "power3.out",
          overwrite: true,
        }
      );
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            play();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15, rootMargin: options.rootMargin ?? "0px 0px -10% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion, options.y, options.delay, options.duration, options.rootMargin, options.stagger, options.itemSelector]);

  return ref;
}
