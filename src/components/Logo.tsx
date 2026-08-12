import { BRAND } from "../data/config";
import clsx from "clsx";

export function Logo({ className }: { className?: string }) {
  return (
    <a href="#inicio" className={clsx("focus-gold group flex items-center gap-2.5", className)} aria-label={`${BRAND.name} — Inicio`}>
      <svg width="34" height="34" viewBox="0 0 64 64" fill="none" aria-hidden="true" className="shrink-0">
        <rect width="64" height="64" rx="14" fill="#050505" />
        <circle cx="32" cy="32" r="22" fill="none" stroke="url(#logo-grad)" strokeWidth="1.4" opacity="0.55" />
        <path d="M22 20 V40 H40" fill="none" stroke="url(#logo-grad)" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22 40 L40 22" fill="none" stroke="url(#logo-grad)" strokeWidth="2.2" strokeLinecap="round" opacity="0.7" />
        <defs>
          <linearGradient id="logo-grad" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
            <stop stopColor="#E5C77A" />
            <stop offset="1" stopColor="#C8A45D" />
          </linearGradient>
        </defs>
      </svg>
      <span className="font-display text-lg tracking-wide text-cream sm:text-xl">
        Luxo <span className="text-gradient-gold">Capital</span>
      </span>
    </a>
  );
}
