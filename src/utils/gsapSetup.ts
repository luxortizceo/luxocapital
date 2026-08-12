import gsap from "gsap";

/** Punto único de acceso a GSAP en toda la app. */
export function ensureGsap() {
  return { gsap };
}
