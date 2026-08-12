import { useEffect, useRef, useState } from "react";
import { SectionLabel } from "../components/SectionLabel";
import { Reveal } from "../components/Reveal";
import { TiltCard } from "../components/TiltCard";
import { useScrollFill } from "../hooks/useScrollFill";
import clsx from "clsx";

const CARDS = [
  { title: "Revisión de semanas cotizadas", text: "Verificamos el estado de tu historial ante el IMSS de forma orientativa." },
  { title: "Identificación del régimen", text: "Te ayudamos a identificar si aplicas a la Ley 73 o a la Ley 97." },
  { title: "Escenarios de retiro", text: "Exploramos distintos caminos posibles según tu situación particular." },
  { title: "Orientación documental", text: "Te explicamos qué información podría requerirse en cada etapa del proceso." },
  { title: "Corrección de posibles inconsistencias", text: "Identificamos datos que podrían necesitar aclaración ante el IMSS o tu AFORE." },
  { title: "Acompañamiento informativo", text: "Te acompañamos con explicaciones claras durante cada paso del análisis." },
];

const MILESTONES = ["Hoy", "Revisión de tu caso", "Definición de estrategia", "Tu retiro"];

export function Pensiones() {
  const { containerRef, fillRef } = useScrollFill<HTMLDivElement>();
  const lineRef = useRef<HTMLDivElement | null>(null);
  const [activeMilestone, setActiveMilestone] = useState(-1);

  useEffect(() => {
    let raf = 0;
    function update() {
      const el = lineRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.min(Math.max((vh * 0.75 - rect.top) / (rect.height || 1), 0), 1);
      setActiveMilestone(Math.floor(progress * MILESTONES.length));
    }
    function onScroll() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    }
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section id="pensiones" className="relative bg-charcoal py-24 sm:py-32">
      <div className="container-luxo">
        <Reveal y={20} className="max-w-2xl">
          <SectionLabel>Pensiones</SectionLabel>
          <h2 className="mt-5 font-display text-3xl leading-tight text-cream sm:text-4xl lg:text-5xl">
            Tu pensión merece una estrategia, no suposiciones.
          </h2>
        </Reveal>

        <Reveal
          itemSelector="[data-pension-card]"
          stagger={0.08}
          y={24}
          className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {CARDS.map((card) => (
            <div key={card.title} data-pension-card>
              <TiltCard strength={5} className="h-full rounded-3xl border border-cream/10 bg-ink/50 p-6 transition-colors duration-300 hover:border-gold/40">
                <h3 className="font-display text-lg text-cream">{card.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-titanium">{card.text}</p>
              </TiltCard>
            </div>
          ))}
        </Reveal>

        <div ref={containerRef} className="mt-24">
          <p className="mb-10 text-center font-display text-xl text-cream sm:text-2xl">
            Tu línea de vida financiera
          </p>
          <div
            ref={(node) => {
              fillRef.current = node;
              lineRef.current = node;
            }}
            className="relative"
            style={{ ["--fill" as string]: 0 }}
          >
            <div className="relative h-1 w-full overflow-hidden rounded-full bg-cream/10">
              <div
                className="h-full origin-left rounded-full bg-gradient-to-r from-gold to-gold-bright transition-transform duration-100 ease-out"
                style={{ transform: "scaleX(var(--fill))" }}
              />
            </div>
            <div className="mt-5 grid grid-cols-2 gap-y-8 sm:grid-cols-4">
              {MILESTONES.map((milestone, i) => (
                <div key={milestone} className="flex flex-col items-center text-center">
                  <span
                    className={clsx(
                      "mb-3 flex h-3 w-3 items-center justify-center rounded-full transition-colors duration-500",
                      i <= activeMilestone ? "bg-gold-bright" : "bg-titanium/40"
                    )}
                    aria-hidden="true"
                  />
                  <span
                    className={clsx(
                      "text-xs uppercase tracking-wide sm:text-sm",
                      i <= activeMilestone ? "text-cream" : "text-titanium"
                    )}
                  >
                    {milestone}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
