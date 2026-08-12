import { lazy, Suspense, useEffect, useRef } from "react";
import { SectionLabel } from "../components/SectionLabel";
import { Button } from "../components/Button";
import { WHATSAPP } from "../data/config";
import { ensureGsap } from "../utils/gsapSetup";
import { useReducedMotion } from "../hooks/useReducedMotion";

const HeroScene = lazy(() => import("../three/HeroScene").then((m) => ({ default: m.HeroScene })));

const TITLE = "Convierte tus decisiones de hoy en tranquilidad para tu futuro.";

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const introRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const titleEl = titleRef.current;
    const introEl = introRef.current;
    if (!titleEl || !introEl) return;

    if (reducedMotion) {
      titleEl.style.opacity = "1";
      introEl.style.opacity = "1";
      return;
    }

    const { gsap } = ensureGsap();
    const words = titleEl.querySelectorAll<HTMLElement>("[data-word]");
    const tl = gsap.timeline({ delay: 0.3 });
    tl.set(introEl, { opacity: 0, y: 16 })
      .fromTo(
        words,
        { yPercent: 120, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1, stagger: 0.045, ease: "power4.out" }
      )
      .to(introEl, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.5");
  }, [reducedMotion]);

  return (
    <section id="inicio" ref={sectionRef} className="relative min-h-[100svh] w-full overflow-hidden bg-ink">
      <Suspense fallback={<div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(200,164,93,0.16),transparent_60%)]" />}>
        <HeroScene containerRef={sectionRef} />
      </Suspense>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(5,5,5,0.35)_55%,rgba(5,5,5,0.92)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-ink to-transparent" />
      <div className="noise-overlay" />

      <div className="container-luxo relative z-10 flex min-h-[100svh] flex-col justify-center pb-20 pt-32">
        <div className="max-w-3xl">
          <SectionLabel>Consultoría financiera personalizada</SectionLabel>

          <h1
            ref={titleRef}
            className="mt-6 text-balance font-display text-4xl leading-[1.08] text-cream sm:text-5xl md:text-6xl lg:text-[4.2rem]"
          >
            {TITLE.split(" ").map((word, i) => (
              <span key={i} className="mr-[0.28em] inline-block overflow-hidden pb-1 align-bottom">
                <span data-word className="inline-block">
                  {word === "tranquilidad" || word === "futuro." ? (
                    <span className="text-gradient-gold">{word}</span>
                  ) : (
                    word
                  )}
                </span>
              </span>
            ))}
          </h1>

          <div ref={introRef} style={{ opacity: reducedMotion ? 1 : undefined }}>
            <p className="mt-7 max-w-xl text-balance text-base leading-relaxed text-titanium sm:text-lg">
              En Luxo Capital analizamos tu situación y te orientamos en temas de AFORE, pensiones, Modalidad 40,
              retiro por desempleo y planificación financiera.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button href="#retiro-desempleo" size="lg" variant="primary" icon={<ArrowIcon />}>
                Evaluar mi caso
              </Button>
              <Button href={WHATSAPP.general} target="_blank" rel="noopener noreferrer" size="lg" variant="secondary">
                Hablar por WhatsApp
              </Button>
            </div>

            <p className="mt-9 text-xs uppercase tracking-[0.2em] text-titanium/80">
              Atención personalizada · Información confidencial · Evaluación inicial
            </p>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-8 z-10 hidden justify-center sm:flex" aria-hidden="true">
        <div className="flex h-10 w-6 justify-center rounded-full border border-cream/25 pt-2">
          <span className="h-1.5 w-1 animate-float rounded-full bg-gold-bright" />
        </div>
      </div>
    </section>
  );
}
