import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Holly, Snowfall, SnowEdge, StringLights } from "./Decor";
import { ImageSlot } from "./ImageSlot";

export function Hero() {
  return (
    <section id="topo" className="relative overflow-hidden bg-hero">
      <Snowfall count={46} />
      <StringLights bulbs={8} className="absolute inset-x-0 top-0 sm:hidden" />
      <StringLights className="absolute inset-x-0 top-0 hidden sm:block" />

      <div className="relative mx-auto grid max-w-6xl gap-y-10 px-5 pb-16 pt-20 sm:pt-24 lg:grid-cols-[1.05fr_1fr] lg:grid-rows-[auto_auto] lg:gap-x-16 lg:gap-y-0 lg:pb-24 lg:pt-28">
        <div className="order-1 text-center lg:col-start-1 lg:row-start-1 lg:self-end lg:text-left">
          <h1 className="text-on-dark">
            <span className="block text-balance text-[1.85rem] font-semibold leading-[1.12] tracking-tight sm:text-[2.4rem] lg:text-[2.7rem]">
              Crie memórias <em className="font-semibold italic text-gold-soft">inesquecíveis</em>{" "}
              neste Natal com
            </span>
            <span className="relative mt-2 inline-block font-script whitespace-nowrap text-[1.8rem] font-bold min-[360px]:text-[2.1rem] leading-[1] text-gold min-[400px]:text-[2.4rem] sm:text-[3.3rem] lg:text-[3.6rem]">
              +147 receitas de biscoitos
              <svg
                aria-hidden
                viewBox="0 0 300 14"
                preserveAspectRatio="none"
                className="absolute -bottom-2 left-[4%] h-3 w-[92%] text-festive"
              >
                <path
                  d="M3 9 C 60 2, 120 2, 170 7 S 260 12, 297 4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>
        </div>

        <div className="order-3 text-center lg:order-none lg:col-start-1 lg:row-start-2 lg:self-start lg:text-left">
          <p className="mx-auto max-w-xl text-balance text-base leading-relaxed text-on-dark-muted sm:text-lg lg:mx-0 lg:mt-6">
            <strong className="font-bold text-on-dark">
              Prepare-se para um Natal ainda mais especial!
            </strong>{" "}
            São +147 receitas de biscoitos natalinos para você preparar com carinho, reunir a família
            e deixar essa época do ano ainda mais doce e inesquecível!
          </p>

          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <Button asChild variant="cta" size="xl" className="w-full rounded-full sm:w-auto">
              <a href="#planos">
                Quero conhecer as receitas
                <ArrowRight />
              </a>
            </Button>
          </div>
        </div>

        <div className="relative order-2 mx-auto mb-4 w-full max-w-xl lg:order-none lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mb-0 lg:self-center">
          {/* brilho quente de lareira atrás da imagem */}
          <div aria-hidden className="absolute -inset-8 rounded-full bg-gold/20 blur-3xl" />
          <div className="animate-float-soft relative">
            <div className="rounded-[2.25rem] bg-on-dark/10 p-2.5 ring-1 ring-gold/40 backdrop-blur-sm">
              <ImageSlot
                id="01"
                label="Mockup principal do produto — celular em destaque, notebook, capa do livro digital e tablet"
                ratio="1 / 1"
                sizeHint="Recomendado: 1400 × 1400 px (1:1), fundo transparente"
                rounded="3xl"
                className="shadow-premium"
              />
            </div>
            <Holly onDark className="absolute -right-3 -top-4 h-12 w-24 rotate-12 drop-shadow-md" />
          </div>

          {/* selo 147 em forma de bola de Natal */}
          <div className="absolute -bottom-6 -left-2 sm:-left-6">
            <span aria-hidden className="mx-auto block h-3 w-7 rounded-t-md bg-gold-soft ring-2 ring-primary" />
            <div className="flex size-28 flex-col items-center justify-center rounded-full border-4 border-primary bg-festive text-festive-foreground shadow-card sm:size-32">
              <span className="font-display text-4xl font-bold leading-none sm:text-5xl"><span className="align-top text-2xl sm:text-3xl">+</span>147</span>
              <span className="mt-1 text-[10px] font-extrabold uppercase tracking-[0.14em] sm:text-[11px]">
                receitas
              </span>
            </div>
          </div>
        </div>
      </div>

      <SnowEdge className="relative -mb-px fill-background" />
    </section>
  );
}
