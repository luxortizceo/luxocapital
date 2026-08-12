import { SectionLabel } from "../components/SectionLabel";
import { Reveal } from "../components/Reveal";

const POINTS = [
  {
    title: "Atención personalizada",
    text: "Cada conversación se atiende de forma directa, sin respuestas genéricas.",
  },
  {
    title: "Evaluación individual",
    text: "Analizamos tu situación particular antes de sugerir cualquier camino.",
  },
  {
    title: "Seguimiento directo",
    text: "Mantenemos comunicación clara contigo durante todo el proceso.",
  },
  {
    title: "Protección de información",
    text: "Tratamos tus datos con confidencialidad conforme a nuestro aviso de privacidad.",
  },
];

function CheckBadge() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="10" stroke="url(#trust-grad)" strokeWidth="1.3" />
      <path d="M6.5 11.2L9.3 14L15.5 7.5" stroke="url(#trust-grad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <defs>
        <linearGradient id="trust-grad" x1="0" y1="0" x2="22" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E5C77A" />
          <stop offset="1" stopColor="#C8A45D" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function Trust() {
  return (
    <section className="relative bg-charcoal py-24 sm:py-32">
      <div className="container-luxo">
        <Reveal y={20} className="mx-auto max-w-2xl text-center">
          <SectionLabel>Confianza</SectionLabel>
          <h2 className="mt-5 font-display text-3xl leading-tight text-cream sm:text-4xl lg:text-5xl">
            Información clara para decisiones importantes.
          </h2>
        </Reveal>

        <Reveal
          itemSelector="[data-trust-item]"
          stagger={0.08}
          y={20}
          className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-2"
        >
          {POINTS.map((point) => (
            <div
              key={point.title}
              data-trust-item
              className="flex gap-4 rounded-2xl border border-cream/10 bg-ink/40 p-5"
            >
              <div className="mt-0.5 shrink-0">
                <CheckBadge />
              </div>
              <div>
                <h3 className="font-display text-base text-cream">{point.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-titanium">{point.text}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
