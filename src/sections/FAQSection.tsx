import { SectionLabel } from "../components/SectionLabel";
import { Reveal } from "../components/Reveal";
import { Accordion } from "../components/Accordion";
import { FAQ_ITEMS, OFFICIAL_SOURCES } from "../data/config";

export function FAQSection() {
  return (
    <section id="faq" className="relative bg-charcoal py-24 sm:py-32">
      <div className="container-luxo">
        <Reveal y={20} className="max-w-2xl">
          <SectionLabel>Preguntas frecuentes</SectionLabel>
          <h2 className="mt-5 font-display text-3xl leading-tight text-cream sm:text-4xl lg:text-5xl">
            Respuestas claras a las dudas más comunes.
          </h2>
        </Reveal>

        <Reveal y={24} delay={0.1} className="mx-auto mt-14 max-w-3xl">
          <Accordion items={FAQ_ITEMS} />

          <p className="mt-8 text-sm leading-relaxed text-titanium">
            Te recomendamos validar siempre los requisitos y reglas vigentes en fuentes oficiales:{" "}
            {OFFICIAL_SOURCES.map((source, i) => (
              <span key={source.href}>
                <a
                  href={source.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold-bright underline underline-offset-2 hover:text-gold"
                >
                  {source.label}
                </a>
                {i < OFFICIAL_SOURCES.length - 1 ? ", " : "."}
              </span>
            ))}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
