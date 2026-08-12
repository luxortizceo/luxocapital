import type { ReactNode } from "react";
import { useTilt } from "../hooks/useTilt";
import clsx from "clsx";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
};

export function TiltCard({ children, className, strength = 8 }: TiltCardProps) {
  const ref = useTilt<HTMLDivElement>(strength);
  return (
    <div
      ref={ref}
      className={clsx(
        "will-change-transform transition-transform duration-300 ease-out [transform-style:preserve-3d]",
        className
      )}
    >
      {children}
    </div>
  );
}
