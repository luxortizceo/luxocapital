// oxlint-disable-next-line no-control-regex -- intencional: elimina caracteres de control
const CONTROL_CHARS = new RegExp("[\\u0000-\\u001F\\u007F]", "g");

/** Elimina caracteres de control y recorta espacios; evita inyección en enlaces/mensajes generados. */
export function sanitizeText(value: string, maxLength = 300): string {
  return value.replace(CONTROL_CHARS, "").trim().slice(0, maxLength);
}

export function sanitizePhone(value: string): string {
  return value.replace(/[^\d+\s()-]/g, "").slice(0, 20);
}
