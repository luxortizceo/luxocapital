import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollProgress } from "./components/ScrollProgress";
import { WhatsAppFloat } from "./components/WhatsAppFloat";
import { ScrollToTop } from "./components/ScrollToTop";
import { Home } from "./pages/Home";
import { Privacidad } from "./pages/Privacidad";
import { Terminos } from "./pages/Terminos";
import { AvisoLegal } from "./pages/AvisoLegal";
import { NotFound } from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ScrollProgress />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aviso-de-privacidad" element={<Privacidad />} />
        <Route path="/terminos-y-condiciones" element={<Terminos />} />
        <Route path="/descargo-de-responsabilidad" element={<AvisoLegal />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <WhatsAppFloat />
    </BrowserRouter>
  );
}

export default App;
