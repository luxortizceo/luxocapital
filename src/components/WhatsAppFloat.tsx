import { WHATSAPP } from "../data/config";

function WhatsAppIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M16 2.7C8.7 2.7 2.7 8.6 2.7 15.9c0 2.5.7 4.9 2 7L2 29.3l6.6-2.6c2 1.1 4.2 1.7 6.5 1.7h.1c7.3 0 13.2-5.9 13.2-13.2S23.4 2.7 16 2.7Z"
        fill="#050505"
      />
      <path
        d="M23.4 19.4c-.3.9-1.7 1.7-2.5 1.8-.6.1-1.4.2-4.6-1-3.9-1.5-6.4-5.4-6.6-5.6-.2-.3-1.6-2.1-1.6-4s1-2.8 1.4-3.2c.3-.4.7-.5 1-.5h.7c.2 0 .5 0 .8.6.3.7 1.1 2.6 1.2 2.8.1.2.2.4 0 .7-.1.3-.2.4-.4.6l-.6.7c-.2.2-.4.4-.2.8.2.4 1 1.6 2.1 2.6 1.4 1.3 2.6 1.7 3 1.9.3.2.5.1.7-.1l1-1.1c.3-.3.5-.3.8-.2.3.1 2.1 1 2.5 1.2.4.2.6.3.7.4.1.2.1.9-.2 1.6Z"
        fill="url(#wa-grad)"
      />
      <defs>
        <linearGradient id="wa-grad" x1="7" y1="7" x2="24" y2="21" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E5C77A" />
          <stop offset="1" stopColor="#C8A45D" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP.floating}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Hablar con Luxo Capital por WhatsApp"
      className="focus-gold group fixed bottom-6 right-5 z-50 flex items-center gap-3 sm:bottom-8 sm:right-8"
    >
      <span className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-gold/25 blur-xl animate-pulse-soft" />
      <span className="glass hidden translate-x-2 rounded-full px-4 py-2 text-sm text-cream opacity-0 shadow-lg transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:block">
        Hablar por WhatsApp
      </span>
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-gold-bright to-gold shadow-[0_10px_30px_-6px_rgba(200,164,93,0.7)] transition-transform duration-300 group-hover:scale-105 group-active:scale-95">
        <WhatsAppIcon />
      </span>
    </a>
  );
}
