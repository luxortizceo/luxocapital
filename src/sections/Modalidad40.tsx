import { useMemo, useState } from "react";
import { SectionLabel } from "../components/SectionLabel";
import { Reveal } from "../components/Reveal";
import { SelectField, TextField } from "../components/FormFields";
import { Button } from "../components/Button";
import { buildModalidad40Message, whatsappLink, type Modalidad40FormData } from "../utils/whatsapp";

const TIMELINE = [
  {
    title: "¿Qué es la Modalidad 40?",
    text: "Es la Continuación Voluntaria en el Régimen Obligatorio del IMSS: un esquema que permite seguir cotizando de forma voluntaria aun sin una relación laboral activa.",
  },
  {
    title: "¿Para quién puede ser relevante?",
    text: "Puede resultar de interés para personas que dejaron de cotizar y buscan mejorar su historial ante una futura pensión, sujeto a los requisitos aplicables.",
  },
  {
    title: "Revisa tu régimen aplicable",
    text: "Antes de decidir, es importante identificar si te encuentras bajo la Ley 73 o la Ley 97, ya que las implicaciones son distintas para cada régimen.",
  },
  {
    title: "Semanas cotizadas y salario base",
    text: "El monto de las aportaciones y su impacto dependen de tus semanas cotizadas previas y del salario base de cotización que elijas registrar.",
  },
  {
    title: "Análisis individual antes de decidir",
    text: "Cada situación es distinta. Recomendamos una revisión personalizada antes de inscribirte, considerando tu edad, historial y objetivos.",
  },
  {
    title: "Reglas y aportaciones vigentes",
    text: "Las aportaciones y reglas del IMSS pueden cambiar. Siempre deben validarse con la información oficial vigente antes de tomar una decisión.",
  },
];

const REGIMEN_OPTIONS = ["Ley 73 (antes de 1997)", "Ley 97 (a partir de 1997)", "No estoy seguro"];
const GOAL_OPTIONS = ["Aumentar mi pensión", "Cumplir semanas faltantes", "Mejorar mi salario base", "Aún no lo sé"];

const INITIAL: Modalidad40FormData = { age: "", weeksContributed: "", regime: "", lastSalary: "", goal: "" };

export function Modalidad40() {
  const [data, setData] = useState<Modalidad40FormData>(INITIAL);

  function update<K extends keyof Modalidad40FormData>(key: K, value: string) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  const filled = Object.values(data).every((v) => v.trim().length > 0);
  const message = useMemo(() => buildModalidad40Message(data), [data]);
  const link = useMemo(() => whatsappLink(message), [message]);

  return (
    <section id="modalidad-40" className="relative bg-ink py-24 sm:py-32">
      <div className="container-luxo">
        <Reveal y={20} className="max-w-2xl">
          <SectionLabel>Modalidad 40</SectionLabel>
          <h2 className="mt-5 font-display text-3xl leading-tight text-cream sm:text-4xl lg:text-5xl">
            Conoce cómo funciona la Modalidad 40
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-16 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
          <Reveal
            as="ol"
            itemSelector="[data-timeline-item]"
            stagger={0.1}
            className="relative border-l hairline pl-8 sm:pl-10"
          >
            {TIMELINE.map((item, i) => (
              <li key={item.title} data-timeline-item className="relative pb-10 last:pb-0">
                <span className="absolute -left-[calc(2rem+5px)] top-1 flex h-3 w-3 -translate-x-1/2 items-center justify-center rounded-full bg-gold-bright shadow-[0_0_0_4px_rgba(200,164,93,0.15)] sm:-left-[calc(2.5rem+5px)]" aria-hidden="true" />
                <span className="text-xs font-medium uppercase tracking-widest text-gold-bright">
                  Paso {i + 1}
                </span>
                <h3 className="mt-2 font-display text-xl text-cream">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-titanium">{item.text}</p>
              </li>
            ))}
          </Reveal>

          <Reveal y={26} delay={0.1}>
            <div className="glass sticky top-28 rounded-3xl border border-gold/25 p-6 sm:p-8">
              <h3 className="font-display text-xl text-cream">Simulador informativo</h3>
              <p className="mt-2 text-sm text-titanium">
                Solo con fines orientativos. No calcula ni promete una pensión específica.
              </p>

              <div className="mt-6 space-y-5">
                <TextField id="m40-age" type="number" label="Edad" value={data.age} onChange={(v) => update("age", v)} placeholder="Ej. 52" min={18} max={99} />
                <TextField id="m40-weeks" type="number" label="Semanas cotizadas aproximadas" value={data.weeksContributed} onChange={(v) => update("weeksContributed", v)} placeholder="Ej. 750" />
                <SelectField id="m40-regime" label="Régimen estimado" value={data.regime} onChange={(v) => update("regime", v)} options={REGIMEN_OPTIONS} />
                <TextField id="m40-salary" type="number" label="Último salario registrado (MXN)" value={data.lastSalary} onChange={(v) => update("lastSalary", v)} placeholder="Ej. 12000" />
                <SelectField id="m40-goal" label="Objetivo de retiro" value={data.goal} onChange={(v) => update("goal", v)} options={GOAL_OPTIONS} />
              </div>

              <div className="mt-6 rounded-xl border border-gold/20 bg-gold/5 p-4 text-sm text-cream/90">
                {filled
                  ? "Con estos datos podemos preparar una revisión inicial de tu situación."
                  : "Completa los campos para preparar tu revisión inicial."}
              </div>

              <Button
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                className="mt-5 w-full"
                aria-disabled={!filled}
                onClick={(e) => {
                  if (!filled) e.preventDefault();
                }}
              >
                Solicitar análisis por WhatsApp
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
