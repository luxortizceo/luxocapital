import { useEffect, useState } from "react";
import { NAV_LINKS } from "../data/config";
import { Button } from "./Button";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import clsx from "clsx";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={clsx(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled ? "glass py-3 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.8)]" : "bg-transparent py-5"
        )}
      >
        <div className="container-luxo flex items-center justify-between">
          <Logo />

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Navegación principal">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="focus-gold relative text-sm text-cream/85 transition-colors duration-300 hover:text-gold-bright after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-gold-bright after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Button href="#retiro-desempleo" size="md" variant="primary">
              Evaluar mi caso
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menú"
            className="focus-gold flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 text-gold-bright lg:hidden"
          >
            <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
              <path d="M0 1H20M0 7H20M0 13H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
