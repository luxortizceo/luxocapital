import { Reveal } from "../components/Reveal";
import { Button } from "../components/Button";
import { useScrollFill } from "../hooks/useScrollFill";
import { WHATSAPP } from "../data/config";

export function FinalCTA() {
  const { containerRef, fillRef } = useScrollFill<HTMLElement>();

  return (
    <section
      ref={(node) => {
        containerRef.current = node;
        fillRef.current = node;
      }}
      className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-ink py-24"
      style={{ ["--fill" as string]: 0 }}
    >
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        style={{
          opacity: "calc(0.35 + var(--fill) * 0.65)",
          transition: "opacity 0.2s linear",
        }}
        aria-hidden="true"
      >
        <div className="h-[70vmin] w-[70vmin] rounded-full bg-[radial-gradient(circle,rgba(229,199,122,0.35)_0%,rgba(200,164,93,0.08)_45%,transparent_75%)] blur-2xl" />
      </div>

      {/* Puertas metálicas */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-1/2 border-r border-gold/30 bg-gradient-to-r from-charcoal via-charcoal-soft to-charcoal"
        style={{ transform: "translateX(calc(var(--fill) * -100%))", transition: "transform 0.15s linear" }}
        aria-hidden="true"
      >
        <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-gold-bright to-transparent" />
      </div>
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-charcoal via-charcoal-soft to-charcoal"
        style={{ transform: "translateX(calc(var(--fill) * 100%))", transition: "transform 0.15s linear" }}
        aria-hidden="true"
      />

      <div className="container-luxo relative z-10">
        <Reveal y={26} className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl leading-tight text-cream sm:text-4xl lg:text-5xl">
            El primer paso hacia una mejor decisión financiera comienza con información clara.
          </h2>
          <p className="mt-6 text-titanium sm:text-lg">
            Cuéntanos tu situación y recibe atención personalizada de Luxo Capital.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href="#retiro-desempleo" size="lg" variant="primary">
              Evaluar mi caso
            </Button>
            <Button href={WHATSAPP.general} target="_blank" rel="noopener noreferrer" size="lg" variant="secondary">
              Hablar por WhatsApp
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
