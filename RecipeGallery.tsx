import { RECIPE_EXAMPLES } from "@/config/content";
import { cn } from "@/lib/utils";
import { ImageSlot } from "./ImageSlot";
import { SectionHeading } from "./SectionHeading";
import amanteigados from "@/assets/receitas/amanteigados.jpg";
import decorados from "@/assets/receitas/decorados.jpg";
import cookiesChocolate from "@/assets/receitas/cookies_chocolate.jpg";
import gengibre from "@/assets/receitas/gengibre.jpg";
import baunilha from "@/assets/receitas/baunilha.jpg";
import estrelinhasCanela from "@/assets/receitas/estrelinhas_canela.jpg";
import guirlandasCoco from "@/assets/receitas/guirlandas_coco.jpg";
import presentear from "@/assets/receitas/presentear.jpg";

const RECIPE_PHOTOS: Record<(typeof RECIPE_EXAMPLES)[number]["name"], string> = {
  "Biscoitos Amanteigados Natalinos": amanteigados,
  "Biscoitos Decorados": decorados,
  "Cookies de Chocolate": cookiesChocolate,
  "Biscoitos de Gengibre": gengibre,
  "Biscoitos de Baunilha": baunilha,
  "Estrelinhas de Canela": estrelinhasCanela,
  "Guirlandas de Coco": guirlandasCoco,
  "Biscoitos Natalinos para Presentear": presentear,
};

const TILTS = ["-rotate-1", "rotate-1", "rotate-[0.5deg]", "-rotate-[1.5deg]"];

export function RecipeGallery() {
  return (
    <section id="receitas" className="pattern-gingham py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mx-auto max-w-3xl rounded-[2rem] bg-cream/90 px-6 py-8 shadow-soft backdrop-blur-sm sm:px-10">
          <SectionHeading
            eyebrow="Galeria de receitas"
            title="Uma coleção deliciosa para deixar seu Natal ainda mais especial."
            subtitle="São +147 receitas natalinas para descobrir, preparar e compartilhar."
          />
        </div>

        <div className="mt-14 grid grid-cols-2 gap-5 sm:gap-6 lg:grid-cols-4">
          {RECIPE_EXAMPLES.map((recipe, index) => (
            <article
              key={recipe.name}
              className={cn(
                "relative flex flex-col rounded-2xl bg-card p-2.5 shadow-card transition-transform duration-300 hover:rotate-0 hover:scale-[1.02] sm:p-3",
                TILTS[index % TILTS.length],
              )}
            >
              <span
                aria-hidden
                className="absolute -top-2 left-1/2 z-10 size-4 -translate-x-1/2 rounded-full bg-festive shadow-soft ring-2 ring-card"
              />
              <ImageSlot
                id={`07.${String(index + 1).padStart(2, "0")}`}
                label="Galeria de receitas"
                ratio="1 / 1"
                rounded="xl"
                compact
                src={RECIPE_PHOTOS[recipe.name]}
                alt={recipe.name}
              />
              <div className="flex flex-1 flex-col px-1.5 pb-2 pt-4 sm:px-2">
                <h3 className="font-display text-base font-semibold leading-snug text-primary sm:text-lg">
                  {recipe.name}
                </h3>
                <div aria-hidden className="mt-2 border-t border-dashed border-festive/30" />
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  {recipe.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        <p className="mx-auto mt-10 w-fit rounded-full bg-card px-5 py-2 text-center font-script text-xl font-bold text-primary shadow-soft">
          Exemplos de receitas para inspirar seu Natal.
        </p>
      </div>
    </section>
  );
}
