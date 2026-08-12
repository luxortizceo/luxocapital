import { LegalPage } from "./LegalPage";
import { TERMS } from "../data/legal";

export function Terminos() {
  return <LegalPage title={TERMS.title} updated={TERMS.updated} sections={TERMS.sections} />;
}
