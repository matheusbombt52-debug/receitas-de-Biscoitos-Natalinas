import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { HollyDivider } from "./Decor";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  tone?: "light" | "dark";
  align?: "center" | "left";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  tone = "light",
  align = "center",
  className,
}: SectionHeadingProps) {
  const dark = tone === "dark";
  return (
    <header
      className={cn(
        "mx-auto max-w-3xl",
        align === "center" ? "text-center" : "text-left",
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-2 font-script text-2xl font-bold leading-none sm:text-3xl",
            dark ? "text-gold" : "text-festive",
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "text-balance text-3xl font-semibold leading-[1.1] sm:text-4xl lg:text-5xl",
          dark ? "text-on-dark" : "text-primary",
        )}
      >
        {title}
      </h2>
      <HollyDivider tone={tone} className={cn("mt-5", align === "left" && "justify-start")} />
      {subtitle && (
        <p
          className={cn(
            "mx-auto mt-5 max-w-2xl text-balance text-base leading-relaxed sm:text-lg",
            dark ? "text-on-dark-muted" : "text-muted-foreground",
          )}
        >
          {subtitle}
        </p>
      )}
    </header>
  );
}

export function Star({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className={cn("size-3 fill-current", className)}
    >
      <path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z" />
    </svg>
  );
}
