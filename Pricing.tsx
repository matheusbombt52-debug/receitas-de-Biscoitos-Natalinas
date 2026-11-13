import { useState } from "react";
import { Check, Crown, Gift, X } from "lucide-react";
import { BONUSES } from "@/config/content";
import { formatBRL, PRICES } from "@/config/offer";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { goToCheckout } from "./checkout";
import { Bow } from "./Decor";
import { SectionHeading } from "./SectionHeading";
import { UpgradeModal } from "./UpgradeModal";

function PriceTag({
  value,
  from,
  tone,
}: {
  value: number;
  from: number;
  tone: "basic" | "premium";
}) {
  const [reais, cents] = value.toFixed(2).split(".");
  return (
    <div>
      <p className="text-sm font-semibold text-muted-foreground">
        De <s className="decoration-festive decoration-2">{formatBRL(from)}</s> por
      </p>
      <p
        className={cn(
          "mt-1 flex items-start font-display font-bold leading-none",
          tone === "premium" ? "text-primary" : "text-foreground",
        )}
      >
        <span className="mt-2 text-xl">R$</span>
        <span className="ml-1 text-6xl tracking-tight">{reais}</span>
        <span className="mt-2 text-2xl">,{cents}</span>
      </p>
    </div>
  );
}

type FeatureKind = "check" | "gift" | "excluded";

function Feature({
  children,
  kind = "check",
  highlight = false,
}: {
  children: React.ReactNode;
  kind?: FeatureKind;
  highlight?: boolean;
}) {
  const icon = {
    check: (
      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <Check className="size-3" strokeWidth={3} />
      </span>
    ),
    gift: (
      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-gold text-gold-foreground">
        <Gift className="size-3" strokeWidth={2.5} />
      </span>
    ),
    excluded: (
      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-festive/15 text-festive">
        <X className="size-3" strokeWidth={3} />
      </span>
    ),
  }[kind];

  return (
    <li
      className={cn(
        "flex items-start gap-3",
        highlight && "-mx-3 rounded-xl bg-gold/15 px-3 py-2.5 font-semibold text-primary ring-1 ring-gold/50",
        kind === "excluded" && "text-muted-foreground",
      )}
    >
      {icon}
      {kind === "excluded" ? (
        <s className="decoration-festive decoration-2">{children}</s>
      ) : (
        <span>{children}</span>
      )}
    </li>
  );
}

export function Pricing() {
  const [upgradeOpen, setUpgradeOpen] = useState(false);

  return (
    <section id="planos" className="relative overflow-hidden bg-cozy py-20 sm:py-28">
      <div className="relative mx-auto max-w-5xl px-5">
        <SectionHeading
          eyebrow="Planos"
          title="Escolha como deseja aproveitar sua coleção natalina!"
        />

        <div className="mt-20 grid items-stretch gap-14 md:grid-cols-2 md:gap-8">
          {/* PLANO BÁSICO */}
          <article className="stitched relative order-2 flex flex-col rounded-[2rem] bg-card p-8 pt-12 shadow-soft sm:p-10 sm:pt-14 md:order-1">
            {/* furo de etiqueta de presente */}
            <span aria-hidden className="absolute left-1/2 top-4 size-5 -translate-x-1/2 rounded-full border-2 border-gold bg-cream-deep" />
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">
              Plano Básico
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-primary">+147 Receitas de Biscoitos</h3>
            <div className="mt-6">
              <PriceTag value={PRICES.basico} from={PRICES.basicoReference} tone="basic" />
              <p className="mt-2 text-sm text-muted-foreground">Pagamento único</p>
            </div>
            <div aria-hidden className="my-7 h-px bg-border" />
            <ul className="space-y-3.5 text-[15px]">
              <Feature highlight>Acesso ao aplicativo por 3 meses</Feature>
              <Feature>Acesso às +147 receitas</Feature>
              <Feature>Garantia de 7 dias</Feature>
              {BONUSES.map((b) => (
                <Feature key={b.number} kind="excluded">
                  Bônus {b.number} — {b.title}
                </Feature>
              ))}
            </ul>
            <div className="mt-auto pt-9">
              <Button
                variant="outline"
                size="xl"
                className="w-full rounded-full border-2 border-primary font-bold uppercase tracking-wide text-primary hover:bg-primary hover:text-primary-foreground"
                onClick={() => setUpgradeOpen(true)}
              >
                Quero o plano básico
              </Button>
            </div>
          </article>

          {/* PLANO COMPLETO */}
          <article className="relative order-1 flex flex-col rounded-[2rem] border-2 border-festive bg-card p-8 pt-14 shadow-premium sm:p-10 sm:pt-16 md:order-2">
            {/* embrulho de presente: fita + laço */}
            <span aria-hidden className="bg-festive-gradient absolute inset-x-0 top-0 h-4 rounded-t-[1.85rem]" />
            <Bow className="absolute -top-9 left-1/2 h-14 w-24 -translate-x-1/2 drop-shadow-lg" />
            <div className="absolute -right-3 top-6 inline-flex rotate-6 items-center gap-1.5 whitespace-nowrap rounded-full bg-gold px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-gold-foreground shadow-soft">
              <Crown className="size-3.5" />
              Mais recomendado
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">
              Plano Completo
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-primary">
              +147 Receitas de Biscoitos Completo
            </h3>
            <div className="mt-6">
              <PriceTag value={PRICES.premium} from={PRICES.premiumReference} tone="premium" />
              <p className="mt-2 text-sm text-muted-foreground">Pagamento único</p>
            </div>
            <div aria-hidden className="gold-line my-7" />
            <ul className="space-y-3.5 text-[15px]">
              <Feature highlight>Acesso vitalício ao aplicativo</Feature>
              <Feature>Acesso às +147 receitas</Feature>
              {BONUSES.map((b) => (
                <Feature key={b.number} kind="gift">
                  <span className="rounded-full bg-gold px-2 py-0.5 text-[13px] font-bold text-gold-foreground">Bônus {b.number}</span>{" "}
                  <span className="font-semibold">{b.title}</span>
                </Feature>
              ))}
            </ul>
            <div className="mt-auto pt-9">
              <Button
                variant="cta"
                size="xl"
                className="w-full rounded-full"
                onClick={() => goToCheckout("premium")}
              >
                Quero a versão completa
              </Button>
            </div>
          </article>
        </div>
      </div>

      <UpgradeModal
        open={upgradeOpen}
        onOpenChange={setUpgradeOpen}
        onAccept={() => {
          setUpgradeOpen(false);
          goToCheckout("upgrade");
        }}
        onDecline={() => {
          setUpgradeOpen(false);
          goToCheckout("basico");
        }}
      />
    </section>
  );
}
