import { SectionLabel } from "../components/SectionLabel";
import { Reveal } from "../components/Reveal";
import { TiltCard } from "../components/TiltCard";
import { ServiceIcon } from "../components/ServiceIcon";
import { SERVICES } from "../data/config";

export function Services() {
  return (
    <section id="servicios" className="relative bg-ink py-24 sm:py-32">
      <div className="container-luxo">
        <Reveal y={20} className="max-w-2xl">
          <SectionLabel>Servicios</SectionLabel>
          <h2 className="mt-5 font-display text-3xl leading-tight text-cream sm:text-4xl lg:text-5xl">
            Orientación especializada para cada etapa de tu vida financiera.
          </h2>
        </Reveal>

        <Reveal
          y={26}
          itemSelector="[data-service-card]"
          stagger={0.09}
          className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {SERVICES.map((service) => (
            <div key={service.id} data-service-card>
              <TiltCard
                strength={6}
                className="group relative flex h-full flex-col rounded-3xl border border-cream/10 bg-charcoal/60 p-7 transition-colors duration-400 hover:border-gold/50"
              >
                <div
                  className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(180px circle at 30% 20%, rgba(200,164,93,0.14), transparent 70%)",
                  }}
                  aria-hidden="true"
                />
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-gold/25 bg-gold/5">
                  <ServiceIcon icon={service.icon} />
                </div>
                <h3 className="relative mt-6 font-display text-xl text-cream">{service.title}</h3>
                <p className="relative mt-3 flex-1 text-sm leading-relaxed text-titanium">{service.text}</p>
                {service.note && (
                  <p className="relative mt-4 border-t hairline pt-4 text-xs leading-relaxed text-titanium/70">
                    {service.note}
                  </p>
                )}
              </TiltCard>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
