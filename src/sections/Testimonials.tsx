import { useEffect, useState } from "react";
import { SectionLabel } from "../components/SectionLabel";
import { Reveal } from "../components/Reveal";
import { useReducedMotion } from "../hooks/useReducedMotion";
import clsx from "clsx";

const SLOTS = [1, 2, 3];

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % SLOTS.length), 6000);
    return () => clearInterval(id);
  }, [reducedMotion]);

  return (
    <section className="relative bg-ink py-24 sm:py-32">
      <div className="container-luxo">
        <Reveal y={20} className="mx-auto max-w-2xl text-center">
          <SectionLabel>Testimonios</SectionLabel>
          <h2 className="mt-5 font-display text-3xl leading-tight text-cream sm:text-4xl lg:text-5xl">
            La confianza se construye con el tiempo.
          </h2>
          <p className="mt-4 text-titanium">
            Aún no contamos con testimonios verificados publicados. Cuando estén disponibles, aparecerán aquí con
            la autorización explícita de cada cliente.
          </p>
        </Reveal>

        <Reveal y={26} delay={0.1} className="relative mx-auto mt-14 max-w-2xl overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {SLOTS.map((slot) => (
              <div key={slot} className="w-full shrink-0 px-2">
                <div className="flex flex-col items-center gap-4 rounded-3xl border border-dashed border-cream/20 bg-charcoal/50 p-10 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-cream/15 text-titanium">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                      <path d="M11 2V6M11 16V20M2 11H6M16 11H20" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                  </div>
                  <p className="font-display text-lg text-titanium">Contenido pendiente</p>
                  <p className="max-w-sm text-sm text-titanium/70">
                    Este espacio está reservado para testimonios reales y verificados de clientes de Luxo Capital.
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-center gap-2">
            {SLOTS.map((slot, i) => (
              <button
                key={slot}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Ver testimonio ${i + 1}`}
                className={clsx(
                  "focus-gold h-1.5 rounded-full transition-all duration-300",
                  i === index ? "w-6 bg-gold-bright" : "w-1.5 bg-cream/20"
                )}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
