import { useMemo, useState } from "react";
import { SectionLabel } from "../components/SectionLabel";
import { Reveal } from "../components/Reveal";
import { Button } from "../components/Button";
import { RadioPillGroup, SelectField, TextAreaField, TextField } from "../components/FormFields";
import { MEXICO_STATES } from "../data/mexicoStates";
import { buildUnemploymentMessage, whatsappLink, type UnemploymentFormData } from "../utils/whatsapp";
import { sanitizePhone, sanitizeText } from "../utils/sanitize";

const INITIAL_DATA: UnemploymentFormData = {
  fullName: "",
  phone: "",
  state: "",
  age: "",
  hasAfore: "",
  isUnemployed: "",
  timeSinceLastJob: "",
  hasContributedImss: "",
  timeContributed: "",
  priorWithdrawal: "",
  comments: "",
};

const STEP_LABELS = ["Contacto", "Situación laboral", "Historial IMSS", "Comentarios", "Resumen"];

type Errors = Partial<Record<keyof UnemploymentFormData, string>>;

export function UnemploymentEval() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<UnemploymentFormData>(INITIAL_DATA);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  function update<K extends keyof UnemploymentFormData>(key: K, value: string) {
    setData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function validateStep(current: number): Errors {
    const next: Errors = {};
    if (current === 0) {
      if (sanitizeText(data.fullName).length < 3) next.fullName = "Ingresa tu nombre completo.";
      if (sanitizePhone(data.phone).replace(/\D/g, "").length < 10) next.phone = "Ingresa un teléfono a 10 dígitos.";
      if (!data.state) next.state = "Selecciona tu estado.";
      const age = Number(data.age);
      if (!data.age || Number.isNaN(age) || age < 18 || age > 99) next.age = "Ingresa una edad válida.";
    }
    if (current === 1) {
      if (!data.hasAfore) next.hasAfore = "Selecciona una opción.";
      if (!data.isUnemployed) next.isUnemployed = "Selecciona una opción.";
    }
    if (current === 2) {
      if (!data.timeSinceLastJob) next.timeSinceLastJob = "Selecciona una opción.";
      if (!data.hasContributedImss) next.hasContributedImss = "Selecciona una opción.";
      if (sanitizeText(data.timeContributed).length < 1) next.timeContributed = "Indica un tiempo aproximado.";
      if (!data.priorWithdrawal) next.priorWithdrawal = "Selecciona una opción.";
    }
    return next;
  }

  function goNext() {
    const stepErrors = validateStep(step);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setStep((s) => Math.min(s + 1, STEP_LABELS.length - 1));
  }

  function goBack() {
    setStep((s) => Math.max(s - 1, 0));
  }

  const message = useMemo(() => buildUnemploymentMessage(data), [data]);
  const link = useMemo(() => whatsappLink(message), [message]);

  const summaryRows: [string, string][] = [
    ["Nombre", data.fullName],
    ["Teléfono", data.phone],
    ["Estado", data.state],
    ["Edad", data.age],
    ["¿Cuenta con AFORE?", data.hasAfore],
    ["Situación laboral", data.isUnemployed],
    ["Tiempo desde la baja", data.timeSinceLastJob],
    ["Cotización IMSS", data.hasContributedImss],
    ["Tiempo cotizado", data.timeContributed],
    ["Retiro anterior", data.priorWithdrawal],
  ];

  return (
    <section id="retiro-desempleo" className="relative overflow-hidden bg-charcoal py-24 sm:py-32">
      <div
        className="pointer-events-none absolute -right-40 top-0 h-[520px] w-[520px] rounded-full bg-gold/10 blur-[140px]"
        aria-hidden="true"
      />
      <div className="container-luxo relative">
        <Reveal y={20} className="mx-auto max-w-2xl text-center">
          <SectionLabel>Evaluación inicial</SectionLabel>
          <h2 className="mt-5 font-display text-3xl leading-tight text-cream sm:text-4xl lg:text-5xl">
            Descubre si podrías ser candidato a un retiro por desempleo
          </h2>
          <p className="mt-5 text-titanium sm:text-lg">
            Responde unas preguntas iniciales. Revisaremos tu información y podremos continuar la conversación por
            WhatsApp.
          </p>
        </Reveal>

        <Reveal y={26} delay={0.1} className="mx-auto mt-14 max-w-3xl">
          <div className="glass rounded-3xl border border-gold/30 p-6 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)] sm:p-10">
            {!sent ? (
              <>
                <ol className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-3 text-xs uppercase tracking-wide text-titanium">
                  {STEP_LABELS.map((label, i) => (
                    <li key={label} className="flex items-center gap-2">
                      <span
                        className={`flex h-6 w-6 items-center justify-center rounded-full border text-[0.7rem] ${
                          i === step
                            ? "border-gold bg-gold text-ink"
                            : i < step
                              ? "border-gold-bright/60 text-gold-bright"
                              : "border-cream/20 text-titanium"
                        }`}
                      >
                        {i < step ? "✓" : i + 1}
                      </span>
                      <span className={i === step ? "text-cream" : ""}>{label}</span>
                      {i < STEP_LABELS.length - 1 && <span className="mx-1 h-px w-4 bg-cream/15" aria-hidden="true" />}
                    </li>
                  ))}
                </ol>

                <div className="space-y-6">
                  {step === 0 && (
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="sm:col-span-2">
                        <TextField id="fullName" label="Nombre completo" value={data.fullName} onChange={(v) => update("fullName", v)} required error={errors.fullName} placeholder="Tu nombre" />
                      </div>
                      <TextField id="phone" type="tel" label="Número de teléfono" value={data.phone} onChange={(v) => update("phone", sanitizePhone(v))} required error={errors.phone} placeholder="10 dígitos" />
                      <TextField id="age" type="number" label="Edad" value={data.age} onChange={(v) => update("age", v)} required error={errors.age} min={18} max={99} placeholder="Ej. 45" />
                      <div className="sm:col-span-2">
                        <SelectField id="state" label="Estado de residencia" value={data.state} onChange={(v) => update("state", v)} options={MEXICO_STATES} required error={errors.state} />
                      </div>
                    </div>
                  )}

                  {step === 1 && (
                    <div className="space-y-7">
                      <RadioPillGroup legend="¿Cuentas con AFORE?" name="hasAfore" value={data.hasAfore} onChange={(v) => update("hasAfore", v)} options={["Sí", "No", "No estoy seguro"]} required error={errors.hasAfore} />
                      <RadioPillGroup legend="¿Actualmente te encuentras sin empleo formal?" name="isUnemployed" value={data.isUnemployed} onChange={(v) => update("isUnemployed", v)} options={["Sí", "No"]} required error={errors.isUnemployed} />
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-7">
                      <RadioPillGroup legend="¿Cuánto tiempo ha pasado desde tu última baja ante el IMSS?" name="timeSinceLastJob" value={data.timeSinceLastJob} onChange={(v) => update("timeSinceLastJob", v)} options={["Menos de 46 días", "46 días o más", "No estoy seguro"]} required error={errors.timeSinceLastJob} />
                      <RadioPillGroup legend="¿Has cotizado anteriormente ante el IMSS?" name="hasContributedImss" value={data.hasContributedImss} onChange={(v) => update("hasContributedImss", v)} options={["Sí", "No", "No estoy seguro"]} required error={errors.hasContributedImss} />
                      <TextField id="timeContributed" label="Tiempo aproximado cotizando" value={data.timeContributed} onChange={(v) => update("timeContributed", v)} required error={errors.timeContributed} placeholder="Ej. 8 años" />
                      <RadioPillGroup legend="¿Has realizado anteriormente un retiro por desempleo?" name="priorWithdrawal" value={data.priorWithdrawal} onChange={(v) => update("priorWithdrawal", v)} options={["Sí", "No", "No recuerdo"]} required error={errors.priorWithdrawal} />
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-6">
                      <TextAreaField id="comments" label="Comentarios adicionales" value={data.comments} onChange={(v) => update("comments", v)} placeholder="Cuéntanos cualquier detalle adicional relevante para tu caso (opcional)" />
                      <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-cream/15 bg-ink/40 p-4 text-sm text-cream/85">
                        <input
                          type="checkbox"
                          checked={consent}
                          onChange={(e) => setConsent(e.target.checked)}
                          className="mt-0.5 h-4 w-4 shrink-0 accent-[#c8a45d]"
                          required
                        />
                        Autorizo que Luxo Capital utilice estos datos para contactarme y dar seguimiento a mi
                        solicitud. He leído el{" "}
                        <a href="/aviso-de-privacidad" target="_blank" className="text-gold-bright underline underline-offset-2">
                          aviso de privacidad
                        </a>
                        .
                      </label>
                    </div>
                  )}

                  {step === 4 && (
                    <div className="space-y-6">
                      <div className="grid gap-x-6 gap-y-3 rounded-2xl border border-cream/10 bg-ink/40 p-5 sm:grid-cols-2">
                        {summaryRows.map(([label, value]) => (
                          <div key={label}>
                            <dt className="text-xs uppercase tracking-wide text-titanium">{label}</dt>
                            <dd className="mt-0.5 text-sm text-cream">{value || "—"}</dd>
                          </div>
                        ))}
                        {data.comments && (
                          <div className="sm:col-span-2">
                            <dt className="text-xs uppercase tracking-wide text-titanium">Comentarios</dt>
                            <dd className="mt-0.5 text-sm text-cream">{data.comments}</dd>
                          </div>
                        )}
                      </div>

                      <p className="text-xs leading-relaxed text-titanium/80">
                        Esta evaluación es únicamente informativa y no representa una aprobación. La posibilidad de
                        realizar el trámite y el monto disponible dependen de la situación particular del
                        solicitante y de la validación de las instituciones correspondientes.
                      </p>

                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-disabled={!consent}
                        onClick={(e) => {
                          if (!consent) {
                            e.preventDefault();
                            return;
                          }
                          setSent(true);
                        }}
                        className={`focus-gold flex w-full items-center justify-center gap-2.5 rounded-full px-8 py-4 text-center text-sm font-medium tracking-wide transition-all duration-300 ${
                          consent
                            ? "bg-gradient-to-r from-gold to-gold-bright text-ink shadow-[0_8px_30px_-8px_rgba(200,164,93,0.55)] hover:-translate-y-0.5"
                            : "cursor-not-allowed bg-cream/10 text-titanium"
                        }`}
                      >
                        Enviar evaluación por WhatsApp
                      </a>
                      {!consent && (
                        <p className="text-center text-xs text-[#e08a6b]">
                          Debes autorizar el uso de tus datos en el paso de comentarios para continuar.
                        </p>
                      )}
                    </div>
                  )}
                </div>

                <div className="mt-9 flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={goBack}
                    disabled={step === 0}
                    className="focus-gold text-sm text-titanium transition-colors hover:text-cream disabled:opacity-0"
                  >
                    ← Atrás
                  </button>
                  {step < STEP_LABELS.length - 1 && (
                    <Button type="button" onClick={goNext} variant="primary">
                      Continuar
                    </Button>
                  )}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center py-8 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-gold-bright">
                  <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                    <path d="M5 13.5L10.5 19L21 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="mt-6 font-display text-2xl text-cream">Solicitud enviada por WhatsApp</h3>
                <p className="mt-3 max-w-md text-sm text-titanium">
                  Un asesor de Luxo Capital continuará la conversación contigo directamente en WhatsApp para revisar
                  tu evaluación inicial.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSent(false);
                    setStep(0);
                    setData(INITIAL_DATA);
                    setConsent(false);
                  }}
                  className="focus-gold mt-6 text-sm text-gold-bright underline underline-offset-4"
                >
                  Completar otra evaluación
                </button>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
