import { LegalPage } from "./LegalPage";
import { DISCLAIMER } from "../data/legal";

export function AvisoLegal() {
  return <LegalPage title={DISCLAIMER.title} updated={DISCLAIMER.updated} sections={DISCLAIMER.sections} />;
}
