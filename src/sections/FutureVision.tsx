import { lazy, Suspense, useRef, useState } from "react";
import type { MorphStage } from "../three/ParticleMorph";
import { SectionLabel } from "../components/SectionLabel";
import { Reveal } from "../components/Reveal";
import clsx from "clsx";

const ParticleMorph = lazy(() => import("../three/ParticleMorph").then((m) => ({ default: m.ParticleMorph })));

const CONCEPTS = [
  {
    title: "Claridad financiera",
    text: "Entiende con precisión tu situación actual: AFORE, semanas cotizadas y opciones reales disponibles.",
  },
  {
    title: "Estrategia personalizada",
    text: "Cada caso es distinto. Diseñamos el camino a seguir de acuerdo con tu perfil y objetivos.",
  },
  {
    title: "Acompañamiento durante el proceso",
    text: "Te orientamos en cada paso, desde la evaluación inicial hasta la validación institucional.",
  },
];

const STAGE_CAPTIONS = [
  "Cada decisión financiera comienza con información clara.",
  "Esa claridad se convierte en una moneda: recursos que ya te pertenecen.",
  "Con estrategia, tus recursos se transforman en crecimiento visible.",
  "Y con acompañamiento, se convierten en protección patrimonial.",
];

export function FutureVision() {
  const outerRef = useRef<HTMLDivElement | null>(null);
  const [stage, setStage] = useState<MorphStage>(0);

  return (
    <section id="nosotros" className="relative bg-ink">
      <div ref={outerRef} className="relative" style={{ minHeight: "320vh" }}>
        <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
          <Suspense fallback={null}>
            <ParticleMorph outerRef={outerRef} onStageChange={setStage} />
          </Suspense>

          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(5,5,5,0.85)_100%)]" />

          <div className="container-luxo relative z-10 flex flex-1 flex-col justify-between py-24 sm:py-28">
            <Reveal y={20}>
              <div className="max-w-2xl">
                <SectionLabel>Tu futuro financiero</SectionLabel>
                <h2 className="mt-5 font-display text-3xl leading-tight text-cream sm:text-4xl lg:text-5xl">
                  No se trata solamente de dinero. Se trata de tomar mejores decisiones.
                </h2>
                <p className="mt-5 max-w-xl text-titanium sm:text-lg">
                  Luxo Capital brinda orientación clara para que cada persona conozca sus opciones, requisitos y
                  posibles caminos de acuerdo con su situación particular.
                </p>
              </div>
            </Reveal>

            <div className="flex flex-col gap-8">
              <p
                className="max-w-md font-display text-xl text-gold-bright transition-opacity duration-700 sm:text-2xl"
                aria-live="polite"
              >
                {STAGE_CAPTIONS[stage]}
              </p>

              <div className="grid gap-4 sm:grid-cols-3">
                {CONCEPTS.map((concept, i) => {
                  const active = stage === i + 1;
                  return (
                    <div
                      key={concept.title}
                      className={clsx(
                        "glass rounded-2xl p-5 transition-all duration-500",
                        active ? "border-gold/60 opacity-100" : "opacity-50"
                      )}
                    >
                      <h3 className="font-display text-lg text-cream">{concept.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-titanium">{concept.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
