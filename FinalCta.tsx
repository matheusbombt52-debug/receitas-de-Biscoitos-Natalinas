import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Holly, Snowfall, SnowEdge, StringLights } from "./Decor";
import { ImageSlot } from "./ImageSlot";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-hearth">
      <SnowEdge flip className="relative fill-cream" />
      <Snowfall count={36} seed={42} />
      <StringLights bulbs={8} className="absolute inset-x-0 top-6 sm:hidden" />
      <StringLights bulbs={14} className="absolute inset-x-0 top-10 hidden sm:block" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-20 sm:pb-28 sm:pt-24 lg:grid-cols-2">
        <div className="order-2 text-center lg:order-1 lg:text-left">
          <p className="font-script text-3xl font-bold leading-none text-gold sm:text-4xl">
            +147 receitas natalinas
          </p>
          <h2 className="mt-4 text-balance text-3xl font-semibold leading-[1.1] text-on-dark sm:text-4xl lg:text-5xl">
            Seu próximo Natal pode começar com{" "}
            <span className="font-script text-[1.25em] font-bold text-gold">uma receita especial.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-on-dark-muted lg:mx-0">
            Descubra novas ideias, prepare delícias natalinas e compartilhe momentos especiais com
            quem você ama.
          </p>
          <Button asChild variant="cta" size="xl" className="mt-8 w-full rounded-full sm:w-auto">
            <a href="#planos">
              Quero minhas +147 receitas
              <ArrowRight />
            </a>
          </Button>
        </div>
        <div className="relative order-1 mx-auto w-full max-w-lg lg:order-2">
          <div aria-hidden className="absolute -inset-8 rounded-full bg-gold/20 blur-3xl" />
          <div className="relative rotate-1 rounded-[2.25rem] bg-on-dark/10 p-2.5 ring-1 ring-gold/40">
            <ImageSlot
              id="21"
              label="Mockup final do produto"
              ratio="5 / 4"
              sizeHint="Recomendado: 1500 × 1200 px (5:4)"
              rounded="3xl"
              className="shadow-premium"
            />
          </div>
          <Holly onDark className="absolute -left-4 -top-5 h-12 w-24 -rotate-12 drop-shadow-md" />
        </div>
      </div>
    </section>
  );
}
