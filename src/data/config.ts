/**
 * Configuración central de LUXO CAPITAL.
 * Modifica aquí teléfonos, enlaces, textos y contenido editable del sitio.
 */

export const BRAND = {
  name: "Luxo Capital",
  legalName: "Luxo Capital",
  tagline: "Consultoría financiera personalizada",
  phoneDisplay: "+52 56 5572 4405",
  phoneE164: "525655724405",
  email: "contacto@luxocapital.mx",
  city: "México",
};

function buildWhatsAppLink(message: string) {
  return `https://wa.me/${BRAND.phoneE164}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP = {
  base: `https://wa.me/${BRAND.phoneE164}`,
  general: buildWhatsAppLink(
    "Hola Luxo Capital, me gustaría recibir información sobre sus servicios de consultoría financiera."
  ),
  floating: buildWhatsAppLink(
    "Hola, Luxo Capital. Me gustaría recibir información sobre AFORE, pensiones o retiro por desempleo."
  ),
  modalidad40: buildWhatsAppLink(
    "Hola, Luxo Capital. Me gustaría solicitar un análisis inicial sobre Modalidad 40."
  ),
  evaluar: buildWhatsAppLink(
    "Hola Luxo Capital, me gustaría evaluar mi caso con un asesor."
  ),
  buildLink: buildWhatsAppLink,
};

export const NAV_LINKS = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Retiro por desempleo", href: "#retiro-desempleo" },
  { label: "Pensiones", href: "#pensiones" },
  { label: "Modalidad 40", href: "#modalidad-40" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Preguntas frecuentes", href: "#faq" },
  { label: "Contacto", href: "#contacto" },
];

export type ServiceItem = {
  id: string;
  title: string;
  text: string;
  note?: string;
  icon: "afore" | "desempleo" | "pension" | "modalidad40" | "planificacion" | "inversion";
};

export const SERVICES: ServiceItem[] = [
  {
    id: "afore",
    title: "AFORE",
    text: "Orientación para comprender tu cuenta individual, semanas cotizadas, recursos acumulados y opciones disponibles.",
    icon: "afore",
  },
  {
    id: "desempleo",
    title: "Retiro por desempleo",
    text: "Revisión inicial para identificar si podrías cumplir con los requisitos aplicables para solicitar un retiro parcial por desempleo.",
    icon: "desempleo",
  },
  {
    id: "pensiones",
    title: "Pensiones",
    text: "Análisis informativo de tu situación laboral y previsional para ayudarte a comprender posibles escenarios de retiro.",
    icon: "pension",
  },
  {
    id: "modalidad40",
    title: "Modalidad 40",
    text: "Orientación sobre la Continuación Voluntaria en el Régimen Obligatorio, sus requisitos, aportaciones y posibles implicaciones.",
    icon: "modalidad40",
  },
  {
    id: "planificacion",
    title: "Planificación financiera",
    text: "Organización de objetivos, ahorro, protección y estrategias para construir una estructura financiera más sólida.",
    icon: "planificacion",
  },
  {
    id: "inversiones",
    title: "Inversiones",
    text: "Información y acompañamiento inicial para conocer alternativas de inversión de acuerdo con tus objetivos y perfil.",
    note: "Las inversiones implican riesgos. Luxo Capital no garantiza rendimientos y cualquier estrategia debe analizarse individualmente.",
    icon: "inversion",
  },
];

export const FAQ_ITEMS = [
  {
    q: "¿Qué es un retiro parcial por desempleo?",
    a: "Es una prestación que permite a las personas trabajadoras disponer de una parte de los recursos de su cuenta AFORE cuando se encuentran en una situación de desempleo formal, siempre que cumplan con los requisitos y tiempos establecidos por la ley y su AFORE.",
  },
  {
    q: "¿Cuánto tiempo debo tener sin empleo?",
    a: "Existen distintos supuestos según el tiempo transcurrido desde la baja ante el IMSS. Los plazos y condiciones exactas deben confirmarse de forma individual, ya que pueden variar según cada caso.",
  },
  {
    q: "¿El retiro puede reducir mis semanas cotizadas?",
    a: "En algunos esquemas, el retiro por desempleo puede implicar una reducción de semanas de cotización. Es importante analizar tu caso particular antes de tomar una decisión, ya que esto puede afectar trámites futuros como una pensión.",
  },
  {
    q: "¿Puedo recuperar las semanas descontadas?",
    a: "En ciertos supuestos existe la posibilidad de reintegrar el monto retirado para recuperar las semanas correspondientes, sujeto a condiciones y plazos específicos que deben validarse con tu AFORE.",
  },
  {
    q: "¿Cómo sé en qué AFORE estoy?",
    a: "Puedes consultarlo directamente en el sitio oficial de la CONSAR o mediante el SAR desde tu portal de identidad digital. Nosotros podemos orientarte sobre cómo realizar esta consulta.",
  },
  {
    q: "¿Qué es la Modalidad 40?",
    a: "Es la Continuación Voluntaria en el Régimen Obligatorio del IMSS, un esquema que permite a ciertas personas seguir cotizando de forma voluntaria, generalmente con el objetivo de mejorar su historial ante una futura pensión.",
  },
  {
    q: "¿Todas las personas pueden inscribirse?",
    a: "No. La elegibilidad depende de factores como haber cotizado previamente, el tiempo desde la baja del IMSS y el régimen de pensión aplicable. Es necesario un análisis individual antes de inscribirse.",
  },
  {
    q: "¿Cómo puedo conocer mi régimen de pensión?",
    a: "El régimen (Ley 73 o Ley 97) depende de tu fecha de inicio de cotización ante el IMSS. Podemos ayudarte a identificarlo como parte de una revisión inicial de tu situación.",
  },
  {
    q: "¿La evaluación tiene algún costo?",
    a: "La evaluación inicial a través de nuestros formularios es informativa y sirve para conocer tu situación general. Cualquier costo asociado a un servicio de acompañamiento se informará con claridad antes de iniciar el proceso.",
  },
  {
    q: "¿Qué documentos podrían solicitarse posteriormente?",
    a: "Dependiendo del trámite, más adelante podrían solicitarse documentos como identificación oficial, CURP, NSS o constancias del IMSS. En esta primera evaluación no se solicita ningún dato sensible.",
  },
];

export const OFFICIAL_SOURCES = [
  { label: "IMSS", href: "https://www.imss.gob.mx" },
  { label: "CONSAR", href: "https://www.gob.mx/consar" },
  { label: "Gobierno de México", href: "https://www.gob.mx" },
];

export const LEGAL_DISCLAIMER =
  "Luxo Capital es una consultoría independiente. No somos una AFORE, institución bancaria, aseguradora ni dependencia gubernamental. La información presentada es de carácter general y no sustituye una evaluación personalizada. Los requisitos, montos, condiciones y disposiciones oficiales pueden cambiar.";
