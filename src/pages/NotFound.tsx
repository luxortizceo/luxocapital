import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-ink">
      <Header />
      <main className="container-luxo flex flex-1 flex-col items-center justify-center py-32 text-center">
        <p className="font-display text-7xl text-gold-bright">404</p>
        <h1 className="mt-4 font-display text-2xl text-cream">Página no encontrada</h1>
        <p className="mt-3 max-w-md text-titanium">
          El contenido que buscas no está disponible o ha cambiado de dirección.
        </p>
        <Link to="/" className="focus-gold mt-8 text-sm text-gold-bright underline underline-offset-2">
          Volver al inicio
        </Link>
      </main>
      <Footer />
    </div>
  );
}
