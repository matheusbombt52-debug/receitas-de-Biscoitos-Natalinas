import { formatBRL, PRICES } from "@/config/offer";

/** Faixa promocional de Black Friday — fica fixa acima do cabeçalho principal. */
export function PromoBar() {
  return (
    <div
      role="region"
      aria-label="Oferta de Black Friday"
      className="border-b border-gold/40 bg-promo text-on-dark"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-x-4 gap-y-1 px-3 py-1.5 sm:flex-row sm:py-2">
        {/* Linha 1: selo + chamada */}
        <div className="flex items-center gap-2">
          <span className="rounded-sm bg-gold px-2 py-0.5 text-[10px] font-extrabold uppercase leading-tight tracking-[0.14em] text-gold-foreground shadow-soft sm:text-[11px]">
            Black Friday
          </span>
          <span className="text-[11px] font-bold uppercase tracking-[0.12em] sm:text-xs">
            Oferta especial de Natal
          </span>
        </div>

        <span aria-hidden className="hidden h-4 w-px bg-gold/40 sm:block" />

        {/* Linha 2: preços + complemento */}
        <div className="flex flex-wrap items-baseline justify-center gap-x-2.5 leading-tight">
          <span className="text-[11px] text-on-dark-muted sm:text-xs">
            De <s className="decoration-festive decoration-2">{formatBRL(PRICES.premiumReference)}</s>
          </span>
          <span className="font-display text-lg font-bold leading-none text-gold sm:text-xl">
            {formatBRL(PRICES.premium)}
          </span>
          <span className="text-[11px] font-semibold text-on-dark sm:text-xs">
            +147 receitas + 5 bônus exclusivos
          </span>
        </div>
      </div>
    </div>
  );
}
