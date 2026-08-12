import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Regresa el scroll al inicio en cada cambio de ruta (no afecta anclas #). */
export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, hash]);

  return null;
}
