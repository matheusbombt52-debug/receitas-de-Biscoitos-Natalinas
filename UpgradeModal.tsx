import { Check, Gift, Sparkles } from "lucide-react";
import { BONUSES } from "@/config/content";
import { BONUS_COVERS } from "@/config/bonus-covers";
import { formatBRL, PRICES, upgradeDifference } from "@/config/offer";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Bow, Holly } from "./Decor";

interface UpgradeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAccept: () => void;
  onDecline: () => void;
}

const INCLUDED = ["+147 receitas de biscoitos natalinos", "Acesso vitalício ao aplicativo"];

export function UpgradeModal({ open, onOpenChange, onAccept, onDecline }: UpgradeModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[96dvh] w-[calc(100%-1.5rem)] max-w-md gap-0 overflow-y-auto rounded-3xl border-2 border-gold/60 bg-promo p-0 text-on-dark shadow-2xl [&>button:last-child]:text-on-dark">
        <div aria-hidden className="pattern-stars pointer-events-none absolute inset-0 opacity-50" />
        <div aria-hidden className="candy-stripe absolute inset-x-0 top-0 h-1.5" />

        <div className="relative px-5 pb-5 pt-6 text-center sm:px-7 sm:pb-6 sm:pt-7">
          {/* Selo */}
          <div className="flex items-center justify-center gap-2">
            <Holly onDark className="h-5 w-10" />
            <span className="rounded-full bg-gold px-3 py-1 text-[0.65rem] font-extrabold uppercase tracking-[0.2em] text-gold-foreground">
              Condição especial
            </span>
            <Holly onDark className="h-5 w-10 -scale-x-100" />
          </div>

          <DialogTitle className="mt-3 text-balance font-display text-[1.45rem] font-semibold leading-tight text-on-dark sm:text-[1.7rem]">
            Espere! Aproveite por apenas{" "}
            <span className="text-gold">{formatBRL(upgradeDifference())} a mais!</span>
          </DialogTitle>
          <DialogDescription className="mx-auto mt-2 max-w-xs text-pretty text-sm leading-snug text-on-dark-muted">
            Leve o Plano Completo com acesso vitalício e receba os 5 bônus exclusivos!
          </DialogDescription>

          {/* Preço */}
          <div className="mt-4">
            <p className="text-sm text-on-dark-muted">
              De <span className="font-semibold line-through decoration-festive decoration-2">{formatBRL(PRICES.premium)}</span> por:
            </p>
            <p className="font-display text-[3.25rem] font-bold leading-none text-gold drop-shadow-[0_2px_12px_color-mix(in_oklab,var(--gold)_45%,transparent)] sm:text-6xl">
              {formatBRL(PRICES.upgrade)}
            </p>
            <span className="mt-2 inline-block rounded-full bg-festive px-3 py-0.5 text-[0.65rem] font-extrabold uppercase tracking-[0.2em] text-festive-foreground ring-1 ring-gold/70">
              Oferta especial
            </span>
          </div>

          {/* O que recebe */}
          <div className="mt-4 text-left">
            <p className="text-center text-xs font-bold uppercase tracking-[0.18em] text-on-dark-muted">
              Você vai receber:
            </p>
            <ul className="mx-auto mt-2 w-fit space-y-1.5 text-sm">
              {INCLUDED.map((item) => (
                <li key={item} className="flex items-center gap-2 text-on-dark">
                  <Check className="size-4 shrink-0 text-gold" strokeWidth={3} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Bônus em destaque */}
          <div className="relative mt-4 rounded-2xl border-2 border-dashed border-gold/80 bg-gold/10 px-3 pb-3 pt-4">
            <Bow className="absolute -top-4 left-1/2 h-8 w-12 -translate-x-1/2" />
            <p className="flex items-center justify-center gap-1.5 whitespace-nowrap font-display text-[0.95rem] font-bold uppercase tracking-wide text-gold sm:text-lg">
              <Gift className="size-4 shrink-0 sm:size-5" strokeWidth={2.5} />
              5 bônus exclusivos{" "}
              <span className="rounded-md bg-festive px-1.5 py-0.5 text-xs sm:text-sm text-festive-foreground">grátis!</span>
            </p>
            <ul className="mt-2.5 grid grid-cols-5 gap-1.5" aria-label="Capas dos 5 bônus">
              {BONUSES.map((b) => (
                <li key={b.number} className="flex flex-col items-center gap-1">
                  <img
                    src={BONUS_COVERS[b.number]}
                    alt={`Bônus ${b.number} — ${b.title}`}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.visibility = "hidden";
                    }}
                    className="aspect-[1672/941] w-full rounded object-cover shadow-md ring-1 ring-gold/70"
                  />
                  <span className="whitespace-nowrap text-[0.6rem] font-extrabold uppercase leading-none tracking-wide text-gold">
                    Bônus {b.number}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Botões */}
          <div className="mt-5 flex flex-col items-center gap-1.5">
            <Button
              variant="cta"
              size="xl"
              className="h-auto w-full whitespace-normal rounded-full px-4 py-3.5 text-sm leading-tight ring-2 ring-gold/70 sm:text-base"
              onClick={onAccept}
            >
              <Sparkles className="shrink-0" />
              Sim! Quero o Plano Completo por {formatBRL(PRICES.upgrade)}
            </Button>
            <Button
              variant="quiet"
              size="sm"
              className="h-auto py-1.5 text-xs text-on-dark-muted underline-offset-4 hover:bg-transparent hover:text-on-dark hover:underline"
              onClick={onDecline}
            >
              Não, prefiro continuar com o Plano Básico.
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
