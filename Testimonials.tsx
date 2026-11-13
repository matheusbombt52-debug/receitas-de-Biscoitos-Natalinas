import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ImageSlot } from "./ImageSlot";
import { SectionHeading } from "./SectionHeading";
import { IMAGES } from "@/config/images";

/** Conversas reais enviadas pela cliente, na ordem pedida. Proporção = tamanho original (sem cortes). */
const TESTIMONIALS = [
  { id: "11", name: "Mariana", src: IMAGES.depoimentoMariana, ratio: "941 / 1671", tilt: "-rotate-1" },
  { id: "12", name: "Ricardo", src: IMAGES.depoimentoRicardo, ratio: "391 / 409", tilt: "rotate-1" },
  { id: "13", name: "Patrícia", src: IMAGES.depoimentoPatricia, ratio: "941 / 1671", tilt: "rotate-1" },
  { id: "14", name: "Sônia", src: IMAGES.depoimentoSonia, ratio: "1141 / 1379", tilt: "-rotate-1" },
];

export function Testimonials() {
  return (
    <section id="depoimentos" className="bg-cream-deep py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-5">
        <SectionHeading
          eyebrow="Depoimentos"
          title="Veja o que nossas clientes dizem!"
          subtitle="Experiências de quem preparou receitas especiais para o Natal."
        />

        <div className="mt-16 grid items-center gap-x-8 gap-y-12 sm:grid-cols-2">
          {TESTIMONIALS.map((t) => (
            <article
              key={t.id}
              className={cn(
                "relative rounded-md bg-card p-3 pb-4 shadow-card transition-transform duration-300 hover:rotate-0",
                t.tilt,
              )}
            >
              <span
                aria-hidden
                className="absolute -top-3 left-1/2 z-10 h-6 w-20 -translate-x-1/2 rotate-[-4deg] rounded-sm bg-gold-soft/80 shadow-soft"
              />
              <ImageSlot
                id={t.id}
                label={`Depoimento de ${t.name}`}
                alt={`Conversa de ${t.name} contando sua experiência com as receitas de Natal`}
                ratio={t.ratio}
                rounded="xl"
                src={t.src}
              />
              <div className="mt-3 flex items-center justify-center gap-2">
                <Heart aria-hidden className="size-4 fill-festive text-festive" />
                <p className="font-script text-2xl font-bold leading-none text-primary">{t.name}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button asChild variant="cta" size="xl" className="w-full rounded-full sm:w-auto">
            <a href="#planos">
              <Heart className="fill-current" />
              Quero viver isso também
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
