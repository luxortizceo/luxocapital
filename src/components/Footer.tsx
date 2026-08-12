import { Link } from "react-router-dom";
import { BRAND, LEGAL_DISCLAIMER, OFFICIAL_SOURCES, SERVICES, WHATSAPP } from "../data/config";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contacto" className="relative border-t hairline bg-charcoal">
      <div className="container-luxo grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        <div className="lg:col-span-1">
          <Logo />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-titanium">
            Consultoría independiente de orientación financiera: AFORE, pensiones, Modalidad 40, retiro por
            desempleo y planificación patrimonial.
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <a href={`tel:+${BRAND.phoneE164}`} className="focus-gold text-sm text-cream/85 hover:text-gold-bright">
              {BRAND.phoneDisplay}
            </a>
            <a
              href={WHATSAPP.general}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-gold inline-flex w-fit items-center gap-2 rounded-full border border-gold/40 px-4 py-2 text-sm text-gold-bright transition-colors hover:bg-gold/10"
            >
              Escríbenos por WhatsApp
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-display text-base text-cream">Servicios</h3>
          <ul className="mt-5 space-y-3">
            {SERVICES.map((service) => (
              <li key={service.id}>
                <a href="#servicios" className="focus-gold text-sm text-titanium transition-colors hover:text-gold-bright">
                  {service.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-base text-cream">Legal</h3>
          <ul className="mt-5 space-y-3">
            <li>
              <Link to="/aviso-de-privacidad" className="focus-gold text-sm text-titanium transition-colors hover:text-gold-bright">
                Aviso de privacidad
              </Link>
            </li>
            <li>
              <Link to="/terminos-y-condiciones" className="focus-gold text-sm text-titanium transition-colors hover:text-gold-bright">
                Términos y condiciones
              </Link>
            </li>
            <li>
              <Link to="/descargo-de-responsabilidad" className="focus-gold text-sm text-titanium transition-colors hover:text-gold-bright">
                Descargo de responsabilidad
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-base text-cream">Fuentes oficiales</h3>
          <ul className="mt-5 space-y-3">
            {OFFICIAL_SOURCES.map((source) => (
              <li key={source.href}>
                <a
                  href={source.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-gold text-sm text-titanium transition-colors hover:text-gold-bright"
                >
                  {source.label} ↗
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs uppercase tracking-widest text-titanium/70">Redes sociales próximamente</p>
        </div>
      </div>

      <div className="border-t hairline">
        <div className="container-luxo py-6">
          <p className="max-w-4xl text-xs leading-relaxed text-titanium/80">{LEGAL_DISCLAIMER}</p>
          <p className="mt-4 text-xs text-titanium/60">
            © {year} {BRAND.legalName}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
