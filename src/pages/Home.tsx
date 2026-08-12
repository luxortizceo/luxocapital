import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Hero } from "../sections/Hero";
import { FutureVision } from "../sections/FutureVision";
import { Services } from "../sections/Services";
import { UnemploymentEval } from "../sections/UnemploymentEval";
import { Modalidad40 } from "../sections/Modalidad40";
import { Pensiones } from "../sections/Pensiones";
import { Investment } from "../sections/Investment";
import { HowItWorks } from "../sections/HowItWorks";
import { Trust } from "../sections/Trust";
import { Testimonials } from "../sections/Testimonials";
import { FAQSection } from "../sections/FAQSection";
import { FinalCTA } from "../sections/FinalCTA";

export function Home() {
  return (
    <div className="bg-ink">
      <Header />
      <main>
        <Hero />
        <FutureVision />
        <Services />
        <UnemploymentEval />
        <Modalidad40 />
        <Pensiones />
        <Investment />
        <HowItWorks />
        <Trust />
        <Testimonials />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
