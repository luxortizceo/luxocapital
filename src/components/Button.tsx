import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "group relative inline-flex items-center justify-center gap-2.5 rounded-full font-medium tracking-wide transition-all duration-300 focus-gold whitespace-nowrap select-none";

const sizes = {
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-[0.95rem]",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-gold to-gold-bright text-ink shadow-[0_8px_30px_-8px_rgba(200,164,93,0.55)] hover:shadow-[0_12px_40px_-6px_rgba(229,199,122,0.65)] hover:-translate-y-0.5 active:translate-y-0",
  secondary:
    "border border-gold/50 text-cream hover:border-gold hover:bg-gold/10 hover:-translate-y-0.5 active:translate-y-0",
  ghost: "text-cream/80 hover:text-gold-bright",
};

type CommonProps = {
  variant?: Variant;
  size?: keyof typeof sizes;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
};

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant = "primary", size = "md", icon, children, className, ...rest } = props;
  const classes = clsx(base, sizes[size], variants[variant], className);

  if ("href" in props && props.href) {
    const { href, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a href={href} className={classes} {...anchorRest}>
        <span>{children}</span>
        {icon && <span className="transition-transform duration-300 group-hover:translate-x-0.5">{icon}</span>}
      </a>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      <span>{children}</span>
      {icon && <span className="transition-transform duration-300 group-hover:translate-x-0.5">{icon}</span>}
    </button>
  );
}
