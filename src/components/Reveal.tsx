import type { ElementType, ReactNode } from "react";
import { useReveal } from "../hooks/useReveal";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  y?: number;
  delay?: number;
  duration?: number;
  itemSelector?: string;
  stagger?: number;
};

/** Envoltorio genérico para animar la aparición de secciones/elementos al hacer scroll. */
export function Reveal({
  children,
  as: Tag = "div",
  className,
  y,
  delay,
  duration,
  itemSelector,
  stagger,
}: RevealProps) {
  const ref = useReveal<HTMLElement>({ y, delay, duration, itemSelector, stagger });
  return (
    <Tag ref={ref} className={className} style={{ opacity: itemSelector ? 1 : 0 }}>
      {children}
    </Tag>
  );
}
