import { LegalPage } from "./LegalPage";
import { PRIVACY_NOTICE } from "../data/legal";

export function Privacidad() {
  return <LegalPage title={PRIVACY_NOTICE.title} updated={PRIVACY_NOTICE.updated} sections={PRIVACY_NOTICE.sections} />;
}
