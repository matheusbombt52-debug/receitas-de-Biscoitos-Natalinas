import type { CSSProperties, ComponentType } from "react";
import { cn } from "@/lib/utils";

/** Gerador determinístico (mesmo resultado no servidor e no navegador). */
function seeded(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return Math.round((((t ^ (t >>> 14)) >>> 0) / 4294967296) * 1000) / 1000;
  };
}

function makeFlakes(count: number, seed: number) {
  const r = seeded(seed);
  return Array.from({ length: count }, () => ({
    left: Math.round(r() * 1000) / 10,
    size: Math.round(3 + r() * 5),
    duration: Math.round(12 + r() * 16),
    delay: -Math.round(r() * 28),
    opacity: Math.round((0.35 + r() * 0.55) * 100) / 100,
    drift: Math.round((r() - 0.5) * 80),
  }));
}

/** Neve caindo suavemente (desativada para quem prefere menos movimento). */
export function Snowfall({ count = 40, seed = 7, className }: { count?: number; seed?: number; className?: string }) {
  const flakes = makeFlakes(count, seed);
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {flakes.map((f, i) => (
        <span
          key={i}
          className="animate-snow absolute -top-4 rounded-full bg-on-dark"
          style={
            {
              left: `${f.left}%`,
              width: f.size,
              height: f.size,
              opacity: f.opacity,
              animationDuration: `${f.duration}s`,
              animationDelay: `${f.delay}s`,
              "--drift": `${f.drift}px`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

const BULB_TONES = ["bg-gold glow-gold", "bg-festive glow-festive", "bg-on-dark glow-snow", "bg-gold-soft glow-gold", "bg-festive glow-festive"];

/** Varal de luzinhas de Natal no topo de uma seção. */
export function StringLights({ bulbs = 16, className }: { bulbs?: number; className?: string }) {
  const w = 100 / bulbs;
  const path = Array.from({ length: bulbs }, (_, i) => {
    const x0 = i * w;
    const x1 = (i + 1) * w;
    return `${i === 0 ? `M${x0},2 ` : ""}Q${x0 + w / 2},20 ${x1},2`;
  }).join(" ");

  return (
    <div aria-hidden className={cn("pointer-events-none relative h-12 sm:h-16", className)}>
      <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="absolute inset-0 size-full">
        <path
          d={path}
          fill="none"
          className="stroke-on-dark/35"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      {Array.from({ length: bulbs }, (_, i) => (
        <span
          key={i}
          className="absolute flex -translate-x-1/2 flex-col items-center"
          style={{ left: `${(i + 0.5) * w}%`, top: "52%" }}
        >
          <span className="h-1.5 w-2 rounded-t-sm bg-primary-deep ring-1 ring-on-dark/30" />
          <span
            className={cn("animate-twinkle h-3.5 w-2.5 rounded-b-full rounded-t-[40%] sm:h-4 sm:w-3", BULB_TONES[i % BULB_TONES.length])}
            style={{ animationDelay: `${(i % 5) * 0.45}s` }}
          />
        </span>
      ))}
    </div>
  );
}

/** Bola de Natal em SVG. */
export function Bauble({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 50" aria-hidden className={className}>
      <rect x="14" y="1" width="12" height="8" rx="2" className="fill-gold" />
      <circle cx="20" cy="30" r="18" fill="currentColor" />
      <path d="M3 27 Q20 36 37 27" fill="none" className="stroke-gold" strokeWidth="2" opacity="0.8" />
      <path d="M3.5 34 Q20 43 36.5 34" fill="none" className="stroke-gold" strokeWidth="1.2" opacity="0.6" />
      <ellipse cx="12.5" cy="22" rx="3.5" ry="6" className="fill-on-dark" opacity="0.35" transform="rotate(25 12.5 22)" />
    </svg>
  );
}

const ORNAMENTS = [
  { left: "6%", len: 40, size: "size-9", tone: "text-festive", delay: "0s" },
  { left: "18%", len: 80, size: "size-12", tone: "text-gold", delay: "-1.2s" },
  { left: "30%", len: 24, size: "size-8", tone: "text-on-dark", delay: "-2.5s" },
  { left: "72%", len: 56, size: "size-10", tone: "text-festive", delay: "-0.6s" },
  { left: "86%", len: 96, size: "size-12", tone: "text-gold", delay: "-3.1s" },
  { left: "95%", len: 30, size: "size-8", tone: "text-festive", delay: "-1.8s" },
];

/** Bolas de Natal penduradas balançando no topo de uma seção. */
export function HangingOrnaments({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-x-0 top-0", className)}>
      {ORNAMENTS.map((o) => (
        <div
          key={o.left}
          className="animate-sway absolute top-0 flex flex-col items-center"
          style={{ left: o.left, animationDelay: o.delay }}
        >
          <span className="w-px bg-gold/60" style={{ height: o.len }} />
          <Bauble className={cn("-mt-0.5 drop-shadow-lg", o.size, o.tone)} />
        </div>
      ))}
    </div>
  );
}

/** Raminho de azevinho (folhas verdes + frutinhas vermelhas). */
export function Holly({ className, onDark = false }: { className?: string | undefined; onDark?: boolean }) {
  const leafFill = onDark ? "fill-gold" : "fill-primary";
  const vein = onDark ? "stroke-gold-foreground/40" : "stroke-primary-deep";
  const leaf =
    "M0 10 C4 4 8 7 10 3 C12 7 16 4 19 2 C21 6 25 4 28 3 C30 7 34 6 38 10 C34 14 30 13 28 17 C25 16 21 14 19 18 C16 16 12 13 10 17 C8 13 4 16 0 10Z";
  return (
    <svg viewBox="0 0 80 40" aria-hidden className={cn("h-6 w-12", className)}>
      <g transform="translate(2 8) rotate(-12 20 10)">
        <path d={leaf} className={leafFill} />
        <path d="M2 10 L36 10" className={vein} strokeWidth="1" />
      </g>
      <g transform="translate(40 8) rotate(12 20 10)">
        <path d={leaf} className={leafFill} />
        <path d="M2 10 L36 10" className={vein} strokeWidth="1" />
      </g>
      <circle cx="36" cy="24" r="5" className="fill-festive" />
      <circle cx="45" cy="25" r="5" className="fill-festive-deep" />
      <circle cx="40" cy="31" r="5" className="fill-festive" />
      <circle cx="34.5" cy="22.5" r="1.4" className="fill-on-dark" opacity="0.6" />
    </svg>
  );
}

/** Laço de presente. */
export function Bow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 52" aria-hidden className={cn("h-12 w-20", className)}>
      <path d="M38 26 L24 50 L31 47 L35 52 L41 28Z" className="fill-festive-deep" />
      <path d="M42 26 L56 50 L49 47 L45 52 L39 28Z" className="fill-festive-deep" />
      <path d="M40 24 C30 2 4 2 8 18 C11 30 30 28 40 24Z" className="fill-festive" />
      <path d="M40 24 C50 2 76 2 72 18 C69 30 50 28 40 24Z" className="fill-festive" />
      <path d="M38 23 C30 10 16 9 15 17" fill="none" className="stroke-festive-deep" strokeWidth="2" />
      <path d="M42 23 C50 10 64 9 65 17" fill="none" className="stroke-festive-deep" strokeWidth="2" />
      <ellipse cx="40" cy="24" rx="7" ry="6" className="fill-festive-deep" />
    </svg>
  );
}

/** Borda ondulada de neve entre seções. */
export function SnowEdge({ className, flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 60"
      preserveAspectRatio="none"
      className={cn("block h-8 w-full sm:h-14", flip && "rotate-180", className)}
    >
      <path d="M0 34 C 120 12 220 46 360 30 S 600 6 740 28 S 980 52 1100 26 S 1320 10 1440 30 V60 H0Z" />
    </svg>
  );
}

/** Divisor decorativo com azevinho no centro. */
export function HollyDivider({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  const line = tone === "dark" ? "bg-gold/40" : "bg-gold/60";
  return (
    <div aria-hidden className={cn("flex items-center justify-center gap-3", className)}>
      <span className={cn("h-px w-12 sm:w-16", line)} />
      <Holly onDark={tone === "dark"} />
      <span className={cn("h-px w-12 sm:w-16", line)} />
    </div>
  );
}

const ORNAMENT_TONES = {
  festive: "bg-festive text-festive-foreground",
  primary: "bg-primary text-gold",
  gold: "bg-gold text-gold-foreground",
};

/** Ícone dentro de uma "bolinha de Natal". */
export function OrnamentIcon({
  icon: Icon,
  tone = "festive",
  className,
}: {
  icon: ComponentType<{ className?: string }>;
  tone?: keyof typeof ORNAMENT_TONES | undefined;
  className?: string | undefined;
}) {
  return (
    <span
      className={cn(
        "relative mt-3 inline-flex size-14 shrink-0 items-center justify-center rounded-full shadow-soft",
        ORNAMENT_TONES[tone],
        className,
      )}
    >
      <span aria-hidden className="absolute -top-4 left-1/2 size-3 -translate-x-1/2 rounded-full border-2 border-gold" />
      <span aria-hidden className="absolute -top-2 left-1/2 h-2.5 w-5 -translate-x-1/2 rounded-sm bg-gold" />
      <span aria-hidden className="absolute left-3 top-2.5 h-4 w-2 rotate-[30deg] rounded-full bg-on-dark/30" />
      <Icon className="relative size-6" />
    </span>
  );
}
