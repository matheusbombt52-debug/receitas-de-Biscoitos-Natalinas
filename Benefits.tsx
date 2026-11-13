import { ArrowRight, ChefHat, Gift, Layers, LayoutGrid, Smartphone, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OrnamentIcon } from "./Decor";
import { SectionHeading } from "./SectionHeading";

const BENEFITS = [
  {
    icon: Layers,
    title: "Variedade de receitas",
    text: "+147 receitas de biscoitos e doces natalinos para escolher.",
  },
  {
    icon: ChefHat,
    title: "Inspiração para a cozinha",
    text: "Novas ideias para preparar durante toda a temporada de festas.",
  },
  {
    icon: Gift,
    title: "Ideias para presentear",
    text: "Receitas que se transformam em presentes feitos com carinho.",
  },
  {
    icon: Store,
    title: "Possibilidades de venda",
    text: "Inspiração para quem deseja montar e oferecer produtos natalinos.",
  },
  {
    icon: LayoutGrid,
    title: "Organização digital",
    text: "Sua coleção reunida em um aplicativo, sem papéis espalhados.",
  },
  {
    icon: Smartphone,
    title: "Acesso pelo dispositivo compatível",
    text: "Consulte suas receitas pelo dispositivo compatível com a plataforma.",
  },
];

const TONES = ["festive", "primary", "gold"] as const;

export function Benefits() {
  return (
    <section id="beneficios" className="bg-cozy py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Benefícios"
          title="Tudo para tornar seus preparativos de Natal mais especiais."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map(({ icon, title, text }, i) => (
            <article
              key={title}
              className="stitched-festive flex items-start gap-5 rounded-[1.75rem] bg-card p-7 shadow-soft sm:p-8"
            >
              <OrnamentIcon icon={icon} tone={TONES[i % TONES.length]} className="size-12" />
              <div>
                <h3 className="text-lg font-semibold text-primary">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button asChild variant="cta" size="xl" className="w-full rounded-full sm:w-auto">
            <a href="#planos">
              Quero um Natal mais especial
              <ArrowRight />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
