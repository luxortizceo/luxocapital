import type { ServiceItem } from "../data/config";

const strokeProps = {
  fill: "none",
  stroke: "url(#service-icon-grad)",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const ICON_PATHS: Record<ServiceItem["icon"], React.ReactNode> = {
  afore: (
    <>
      <rect x="6" y="10" width="24" height="18" rx="3" {...strokeProps} />
      <path d="M6 16H30" {...strokeProps} />
      <circle cx="12" cy="22" r="2" {...strokeProps} />
      <path d="M12 6V10M24 6V10" {...strokeProps} />
    </>
  ),
  desempleo: (
    <>
      <path d="M18 6L28 11V19C28 25 23.5 28.8 18 30C12.5 28.8 8 25 8 19V11L18 6Z" {...strokeProps} />
      <path d="M13 18L16.5 21.5L23 15" {...strokeProps} />
    </>
  ),
  pension: (
    <>
      <path d="M6 26C6 26 10 12 18 12C26 12 30 26 30 26" {...strokeProps} />
      <circle cx="18" cy="12" r="3.2" {...strokeProps} />
      <path d="M6 26H30" {...strokeProps} />
    </>
  ),
  modalidad40: (
    <>
      <circle cx="18" cy="18" r="12" {...strokeProps} />
      <path d="M18 10V18L23 21" {...strokeProps} />
    </>
  ),
  planificacion: (
    <>
      <path d="M8 28V16M18 28V8M28 28V20" {...strokeProps} />
      <path d="M6 28H30" {...strokeProps} />
    </>
  ),
  inversion: (
    <>
      <path d="M6 24L14 16L20 21L30 10" {...strokeProps} />
      <path d="M22 10H30V18" {...strokeProps} />
    </>
  ),
};

export function ServiceIcon({ icon }: { icon: ServiceItem["icon"] }) {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" aria-hidden="true">
      <defs>
        <linearGradient id="service-icon-grad" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E5C77A" />
          <stop offset="1" stopColor="#C8A45D" />
        </linearGradient>
      </defs>
      {ICON_PATHS[icon]}
    </svg>
  );
}
