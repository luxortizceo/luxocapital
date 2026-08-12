import { useMemo, useState } from "react";
import { SectionLabel } from "../components/SectionLabel";
import { Reveal } from "../components/Reveal";
import { TextField } from "../components/FormFields";
import { GrowthBars } from "../components/GrowthBars";
import { compoundGrowth, formatMXN, growthSeries } from "../utils/finance";

const CONCEPTS = [
  { title: "Creación de objetivos", text: "Definimos metas claras y medibles para cada etapa de tu vida financiera." },
  { title: "Hábitos de ahorro", text: "Construimos disciplina de ahorro sostenible, adaptada a tu realidad." },
  { title: "Diversificación", text: "Exploramos alternativas para no concentrar tu patrimonio en un solo instrumento." },
  { title: "Horizonte de inversión", text: "El tiempo disponible cambia por completo las estrategias posibles." },
  { title: "Perfil de riesgo", text: "Cada persona tolera el riesgo de forma distinta; lo identificamos contigo." },
  { title: "Protección del patrimonio", text: "Buscamos equilibrio entre crecimiento y protección de lo construido." },
];

export function Investment() {
  const [initial, setInitial] = useState("20000");
  const [monthly, setMonthly] = useState("2000");
  const [years, setYears] = useState("10");
  const [rate, setRate] = useState("8");

  const values = useMemo(
    () => ({
      initial: Number(initial) || 0,
      monthly: Number(monthly) || 0,
      years: Number(years) || 0,
      annualRate: Number(rate) || 0,
    }),
    [initial, monthly, years, rate]
  );

  const result = useMemo(() => compoundGrowth(values), [values]);
  const series = useMemo(() => growthSeries(values), [values]);
  const totalContributed = values.initial + values.monthly * Math.max(values.years, 0) * 12;

  return (
    <section className="relative bg-charcoal py-24 sm:py-32">
      <div className="container-luxo">
        <Reveal y={20} className="max-w-2xl">
          <SectionLabel>Inversión y crecimiento</SectionLabel>
          <h2 className="mt-5 font-display text-3xl leading-tight text-cream sm:text-4xl lg:text-5xl">
            Haz que cada objetivo tenga una estrategia.
          </h2>
        </Reveal>

        <Reveal
          itemSelector="[data-concept]"
          stagger={0.06}
          y={18}
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {CONCEPTS.map((concept) => (
            <div key={concept.title} data-concept className="rounded-2xl border border-cream/10 bg-ink/40 p-5">
              <h3 className="font-display text-base text-cream">{concept.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-titanium">{concept.text}</p>
            </div>
          ))}
        </Reveal>

        <Reveal y={26} delay={0.1} className="mt-16 grid gap-10 rounded-3xl border border-gold/25 bg-ink/40 p-6 lg:grid-cols-[1fr_1.1fr] lg:p-10">
          <div>
            <h3 className="font-display text-xl text-cream">Calculadora de crecimiento compuesto</h3>
            <p className="mt-2 text-sm text-titanium">Herramienta educativa para visualizar el efecto del tiempo y la constancia.</p>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <TextField id="inv-initial" type="number" label="Inversión inicial (MXN)" value={initial} onChange={setInitial} />
              <TextField id="inv-monthly" type="number" label="Aportación mensual (MXN)" value={monthly} onChange={setMonthly} />
              <TextField id="inv-years" type="number" label="Plazo (años)" value={years} onChange={setYears} min={1} max={40} />
              <TextField id="inv-rate" type="number" label="Rendimiento hipotético (%)" value={rate} onChange={setRate} min={0} max={30} />
            </div>

            <div className="mt-6 rounded-2xl border border-gold/25 bg-gold/5 p-5">
              <p className="text-xs uppercase tracking-wide text-titanium">Valor estimado al final del plazo</p>
              <p className="mt-1 font-display text-3xl text-gold-bright">{formatMXN(result)}</p>
              <p className="mt-1 text-xs text-titanium">Aportado: {formatMXN(totalContributed)}</p>
            </div>

            <p className="mt-4 text-xs leading-relaxed text-titanium/80">
              Esta simulación es ilustrativa y no representa una promesa ni garantía de rendimiento.
            </p>
          </div>

          <div className="flex flex-col justify-end">
            <GrowthBars series={series} />
            <div className="mt-4 flex justify-between text-xs text-titanium">
              <span>Año 1</span>
              <span>Año {Math.max(Number(years) || 1, 1)}</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
