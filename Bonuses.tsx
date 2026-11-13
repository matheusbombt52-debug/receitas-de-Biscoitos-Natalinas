import { Crown, Gift } from "lucide-react";
import { BONUSES } from "@/config/content";
import { BONUS_REFERENCE_VALUES, bonusReferenceTotal, formatBRL } from "@/config/offer";
import { Bow, Snowfall } from "./Decor";
import { ImageSlot } from "./ImageSlot";
import { SectionHeading } from "./SectionHeading";
import { BONUS_COVERS } from "@/config/bonus-covers";

export function Bonuses() {
  return (
    <section id="bonus" className="relative overflow-hidden bg-primary-deep py-20 sm:py-28">
      <div aria-hidden className="pattern-stars absolute inset-0 opacity-50" />
      <Snowfall count={28} seed={21} />
      <div className="relative mx-auto max-w-6xl px-5">
        <SectionHeading
          tone="dark"
          eyebrow="Exclusivo do Plano Completo"
          title={
            <>
              Adquirindo o Plano Completo, receba{" "}
              <span className="font-script text-[1.25em] font-bold text-gold">
                5 materiais exclusivos!
              </span>
            </>
          }
        />

        <div className="mt-20 flex flex-wrap justify-center gap-x-6 gap-y-16">
          {BONUSES.map((bonus) => (
            <article
              key={bonus.number}
              className="relative flex w-full flex-col rounded-3xl border border-gold/30 bg-primary p-3 pt-6 shadow-premium sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
            >
              {/* fita e laço de presente */}
              <span aria-hidden className="bg-festive-gradient absolute inset-x-0 top-0 h-3 rounded-t-3xl" />
              <Bow className="absolute -top-9 left-1/2 -translate-x-1/2 drop-shadow-lg" />

              <ImageSlot
                id={bonus.image}
                label={`Capa do bônus ${bonus.number}`}
                alt={`Capa do Bônus ${bonus.number}: ${bonus.title}`}
                ratio="1672 / 941"
                src={BONUS_COVERS[bonus.number]}
                rounded="2xl"
              />
              <div className="flex flex-1 flex-col px-4 pb-5 pt-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-gold px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-gold-foreground">
                    Bônus {bonus.number}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-gold">
                    <Crown className="size-3.5" />
                    Completo
                  </span>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-on-dark">{bonus.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-on-dark-muted">
                  {bonus.description}
                </p>

                {/* valor individual de referência + GRÁTIS */}
                <div className="mt-auto pt-5">
                  <div className="flex items-center justify-between gap-3 rounded-2xl border border-dashed border-gold/40 bg-primary-deep/60 px-4 py-3">
                    <div className="leading-tight">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-dark-muted">
                        Valor individual
                      </p>
                      <s className="mt-0.5 block text-sm font-semibold text-gold-soft/80 decoration-festive decoration-2">
                        {formatBRL(BONUS_REFERENCE_VALUES[bonus.number])}
                      </s>
                    </div>
                    <span className="-rotate-3 rounded-lg bg-festive px-3 py-1.5 text-sm font-extrabold uppercase tracking-[0.14em] text-festive-foreground shadow-lg ring-2 ring-gold">
                      Grátis
                    </span>
                  </div>
                  <p className="mt-2 flex items-center justify-center gap-1.5 text-xs font-semibold text-gold">
                    <Gift className="size-3.5" />
                    Incluso no Plano Completo
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* destaque: total dos bônus */}
        <div data-testid="bonus-total" className="mt-16 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-on-dark-muted">
            Valor total:{" "}
            <s className="text-base font-bold text-gold-soft decoration-festive decoration-2">
              {formatBRL(bonusReferenceTotal())}
            </s>
          </p>
          <p className="mt-3 font-display text-4xl font-extrabold uppercase leading-tight text-gold sm:text-5xl">
            Todos grátis!{" "}
            <span className="text-festive">Somente hoje!</span>
          </p>
        </div>

        <p className="mt-12 text-center text-sm text-on-dark-muted">
          Os cinco bônus são exclusivos do Plano Completo e não estão incluídos no Plano Básico.
        </p>
      </div>
    </section>
  );
}
