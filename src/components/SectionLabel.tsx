export function SectionLabel({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.28em] text-gold-bright">
      <span className="h-px w-8 bg-gradient-to-r from-gold-bright to-transparent" aria-hidden="true" />
      {children}
    </span>
  );
}
