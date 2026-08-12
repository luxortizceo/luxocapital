import { useEffect } from "react";
import { NAV_LINKS, WHATSAPP } from "../data/config";
import { Button } from "./Button";
import clsx from "clsx";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <div
      className={clsx(
        "fixed inset-0 z-[70] flex flex-col bg-ink/98 backdrop-blur-xl transition-all duration-500 md:hidden",
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      )}
      role="dialog"
      aria-modal="true"
      aria-hidden={!open}
    >
      <div className="container-luxo flex items-center justify-between py-6">
        <span className="font-display text-lg text-cream">Menú</span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar menú"
          className="focus-gold flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 text-gold-bright"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M1 1L17 17M17 1L1 17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <nav className="container-luxo flex flex-1 flex-col justify-center gap-2 pb-16">
        {NAV_LINKS.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="focus-gold border-b hairline py-4 font-display text-3xl text-cream transition-colors duration-300 hover:text-gold-bright"
            style={{
              transitionDelay: open ? `${i * 40}ms` : "0ms",
              opacity: open ? 1 : 0,
              transform: open ? "translateY(0)" : "translateY(12px)",
            }}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div className="container-luxo flex flex-col gap-4 pb-10">
        <Button href="#retiro-desempleo" onClick={onClose} variant="primary" className="w-full">
          Evaluar mi caso
        </Button>
        <Button href={WHATSAPP.floating} target="_blank" rel="noopener noreferrer" variant="secondary" className="w-full">
          Hablar por WhatsApp
        </Button>
      </div>
    </div>
  );
}
