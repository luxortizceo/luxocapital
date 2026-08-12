import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

type LegalSection = { heading: string; body: string };

type LegalPageProps = {
  title: string;
  updated: string;
  sections: LegalSection[];
};

export function LegalPage({ title, updated, sections }: LegalPageProps) {
  return (
    <div className="min-h-screen bg-ink">
      <Header />
      <main className="container-luxo py-32">
        <Link to="/" className="focus-gold text-sm text-gold-bright underline underline-offset-2">
          ← Volver al inicio
        </Link>
        <h1 className="mt-6 font-display text-3xl text-cream sm:text-4xl">{title}</h1>
        <p className="mt-2 text-sm text-titanium">{updated}</p>

        <div className="mt-10 max-w-3xl space-y-8">
          {sections.map((section) => (
            <div key={section.heading}>
              <h2 className="font-display text-xl text-cream">{section.heading}</h2>
              <p className="mt-2 leading-relaxed text-titanium">{section.body}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
