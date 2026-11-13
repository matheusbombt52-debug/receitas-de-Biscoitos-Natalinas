import { Gift, HeartHandshake, Store } from "lucide-react";
import { Holly, OrnamentIcon } from "./Decor";
import { ImageSlot } from "./ImageSlot";
import { IMAGES } from "@/config/images";
import { SectionHeading } from "./SectionHeading";

const CARDS = [
  {
    icon: HeartHandshake,
    tone: "festive" as const,
    title: "Para preparar em família",
    text: "Receitas para reunir quem você ama na cozinha e criar memórias de Natal.",
  },
  {
    icon: Gift,
    tone: "primary" as const,
    title: "Para criar presentes especiais",
    text: "Biscoitos e doces que viram lembranças carinhosas para amigos e familiares.",
  },
  {
    icon: Store,
    tone: "gold" as const,
    title: "Para explorar a venda de doces",
    text: "Ideias para quem deseja preparar doces natalinos e oferecê-los a clientes.",
  },
];

export function Presentation() {
  return (
    <section id="apresentacao" className="bg-cozy py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Um Natal com mais sabor"
          title="Prepare um Natal cheio de sabor, criatividade e momentos especiais."
          subtitle="Imagine ter uma coleção de receitas natalinas sempre à sua disposição, com ideias deliciosas para preparar, compartilhar, presentear e até transformar em oportunidades de venda."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {CARDS.map(({ icon, tone, title, text }) => (
            <article
              key={title}
              className="stitched flex flex-col items-center rounded-[1.75rem] bg-card px-7 pb-8 pt-7 text-center shadow-soft transition-transform hover:-translate-y-1"
            >
              <OrnamentIcon icon={icon} tone={tone} />
              <h3 className="mt-5 text-xl font-semibold text-primary">{title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{text}</p>
            </article>
          ))}
        </div>

        <div className="relative mx-auto mt-16 max-w-5xl">
          <div className="-rotate-1 rounded-[2rem] bg-card p-3 shadow-card sm:p-4">
            <ImageSlot
              id="02"
              label="Composição de doces natalinos"
              alt="Mesa de Natal com biscoitos de gengibre decorados, cookies, brigadeiros e cupcakes"
              ratio="1898 / 829"
              src={IMAGES.mesaDoces}
              sizeHint="Recomendado: 1920 × 840 px (16:7)"
              rounded="3xl"
            />
          </div>
          <Holly className="absolute -left-4 -top-5 h-12 w-24 -rotate-12" />
          <Holly className="absolute -bottom-5 -right-4 h-12 w-24 rotate-[160deg]" />
        </div>
      </div>
    </section>
  );
}
