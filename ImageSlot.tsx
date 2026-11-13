import { useState } from "react";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageSlotProps {
  /** Número da imagem, ex.: "01" */
  id: string;
  /** Identificação do conteúdo, ex.: "Mockup principal do produto" */
  label: string;
  /** Proporção CSS, ex.: "4 / 3" */
  ratio?: string;
  /** Tamanho recomendado da imagem final, ex.: "1600 × 1200 px" */
  sizeHint?: string;
  className?: string;
  compact?: boolean;
  rounded?: "xl" | "2xl" | "3xl" | "full";
  /** Imagem real; quando informada, substitui o espaço reservado na mesma proporção */
  src?: string;
  /** Texto alternativo da imagem real */
  alt?: string;
}

/**
 * Espaço reservado para uma imagem real que será inserida depois.
 * Substitua por <img> mantendo a mesma proporção.
 */
export function ImageSlot({
  id,
  label,
  ratio = "4 / 3",
  sizeHint,
  className,
  compact = false,
  rounded = "2xl",
  src,
  alt,
}: ImageSlotProps) {
  // Guarda o src que falhou ao carregar (arquivo ausente em public/images, por exemplo).
  // Nesse caso mostramos o espaço reservado em vez de uma imagem quebrada.
  const [failedSrc, setFailedSrc] = useState<string | undefined>(undefined);

  const radius = {
    xl: "rounded-xl",
    "2xl": "rounded-2xl",
    "3xl": "rounded-3xl",
    full: "rounded-full",
  }[rounded];

  if (src && src !== failedSrc) {
    return (
      <div
        data-image-slot={id}
        className={cn("relative w-full overflow-hidden bg-slot", radius, className)}
        style={{ aspectRatio: ratio }}
      >
        <img
          src={src}
          alt={alt ?? label}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 size-full object-cover"
          onError={() => setFailedSrc(src)}
          // Com SSR a imagem pode falhar antes do React hidratar, e o onError se perde.
          ref={(img) => {
            if (img && img.complete && img.naturalWidth === 0) setFailedSrc(src);
          }}
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={`Imagem ${id} — ${label} (espaço reservado)`}
      data-image-slot={id}
      className={cn(
        "relative w-full overflow-hidden border border-slot-border bg-slot text-slot-foreground",
        radius,
        className,
      )}
      style={{ aspectRatio: ratio }}
    >
      {rounded !== "full" && (
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute border border-dashed border-slot-border",
            compact ? "inset-2 rounded-lg" : "inset-3 rounded-xl",
          )}
        />
      )}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 px-4 text-center">
        <ImageIcon
          aria-hidden
          className={cn("opacity-60", compact ? "size-4" : "size-6")}
          strokeWidth={1.5}
        />
        <span
          className={cn(
            "font-bold uppercase tracking-[0.18em]",
            compact ? "text-[10px]" : "text-xs",
          )}
        >
          Imagem {id}
        </span>
        <span
          className={cn(
            "max-w-[28ch] font-medium uppercase leading-snug tracking-wide",
            compact ? "text-[9px]" : "text-[11px] sm:text-xs",
          )}
        >
          {label}
        </span>
        {sizeHint && !compact && (
          <span className="mt-1 text-[10px] tracking-wide opacity-70">{sizeHint}</span>
        )}
      </div>
    </div>
  );
}
