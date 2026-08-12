import { SectionLabel } from "../components/SectionLabel";
import { Reveal } from "../components/Reveal";
import { useScrollFill } from "../hooks/useScrollFill";

const STEPS = [
  { title: "Cuéntanos tu situación", text: "Compartes tu contexto general a través de nuestros formularios o por WhatsApp." },
  { title: "Revisamos la información inicial", text: "Analizamos tus respuestas para entender el panorama general de tu caso." },
  { title: "Te explicamos las alternativas", text: "Te compartimos, en términos claros, las opciones que podrían aplicar a tu situación." },
  { title: "Definimos los siguientes pasos", text: "Acordamos contigo cómo continuar el proceso de orientación y seguimiento." },
];

export function HowItWorks() {
  const { containerRef, fillRef } = useScrollFill<HTMLDivElement>();

  return (
    <section className="relative bg-ink py-24 sm:py-32">
      <div className="container-luxo">
        <Reveal y={20} className="max-w-2xl">
          <SectionLabel>Cómo funciona</SectionLabel>
          <h2 className="mt-5 font-display text-3xl leading-tight text-cream sm:text-4xl lg:text-5xl">
            Un proceso simple, claro y sin presión.
          </h2>
        </Reveal>

        <div ref={containerRef} className="relative mt-20">
          <div
            ref={fillRef}
            className="absolute left-[19px] top-0 hidden h-full w-px bg-cream/10 md:block lg:left-0 lg:top-6 lg:h-px lg:w-full"
            style={{ ["--fill" as string]: 0 }}
          >
            <div
              className="absolute left-0 top-0 h-full w-full origin-top bg-gradient-to-b from-gold to-gold-bright transition-transform duration-150 lg:origin-left lg:bg-gradient-to-r"
              style={{ transform: "scaleY(var(--fill))" }}
            />
          </div>

          <Reveal
            as="div"
            itemSelector="[data-step]"
            stagger={0.12}
            className="relative grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8"
          >
            {STEPS.map((step, i) => (
              <div key={step.title} data-step className="relative flex gap-5 lg:flex-col lg:gap-0">
                <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/50 bg-ink font-display text-sm text-gold-bright shadow-[0_0_25px_-4px_rgba(200,164,93,0.5)] lg:mb-6">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-display text-lg text-cream">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-titanium">{step.text}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
