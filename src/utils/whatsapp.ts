import { BRAND } from "../data/config";
import { sanitizeText } from "./sanitize";

/** Construye un enlace wa.me con un mensaje de texto codificado. */
export function whatsappLink(message: string, phone: string = BRAND.phoneE164): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export type UnemploymentFormData = {
  fullName: string;
  phone: string;
  state: string;
  age: string;
  hasAfore: string;
  isUnemployed: string;
  timeSinceLastJob: string;
  hasContributedImss: string;
  timeContributed: string;
  priorWithdrawal: string;
  comments: string;
};

const FIELD_FALLBACK = "No proporcionado";

function line(value: string | undefined) {
  const clean = sanitizeText(value ?? "", 200);
  return clean.length > 0 ? clean : FIELD_FALLBACK;
}

/** Genera el mensaje estructurado para la evaluación de retiro por desempleo. */
export function buildUnemploymentMessage(data: UnemploymentFormData): string {
  return [
    "Hola, Luxo Capital. Quiero solicitar una evaluación inicial para retiro por desempleo.",
    "",
    `Nombre: ${line(data.fullName)}`,
    `Teléfono: ${line(data.phone)}`,
    `Estado: ${line(data.state)}`,
    `Edad: ${line(data.age)}`,
    `¿Cuenta con AFORE?: ${line(data.hasAfore)}`,
    `Situación laboral: ${line(data.isUnemployed)}`,
    `Tiempo desde la baja: ${line(data.timeSinceLastJob)}`,
    `Cotización ante el IMSS: ${line(data.hasContributedImss)}`,
    `Tiempo cotizado: ${line(data.timeContributed)}`,
    `Retiro anterior: ${line(data.priorWithdrawal)}`,
    `Comentarios: ${line(data.comments || "Sin comentarios")}`,
    "",
    "Acepté el aviso de privacidad y deseo recibir información.",
  ].join("\n");
}

export type Modalidad40FormData = {
  age: string;
  weeksContributed: string;
  regime: string;
  lastSalary: string;
  goal: string;
};

export function buildModalidad40Message(data: Modalidad40FormData): string {
  return [
    "Hola, Luxo Capital. Quiero solicitar un análisis inicial sobre Modalidad 40.",
    "",
    `Edad: ${line(data.age)}`,
    `Semanas cotizadas aproximadas: ${line(data.weeksContributed)}`,
    `Régimen estimado: ${line(data.regime)}`,
    `Último salario registrado: ${line(data.lastSalary)}`,
    `Objetivo de retiro: ${line(data.goal)}`,
  ].join("\n");
}
