import { HangingOrnaments, SnowEdge } from "./Decor";
import { ImageSlot } from "./ImageSlot";
import { SectionHeading } from "./SectionHeading";
import { IMAGES } from "@/config/images";

const BLOCKS = [
  {
    tag: "Para sua família",
    text: "Prepare receitas deliciosas e torne os momentos de Natal ainda mais especiais.",
    image: {
      id: "08",
      label: "Mesa natalina com biscoitos decorados, cookies e chocolate quente",
      src: IMAGES.mesaBiscoitos,
    },
  },
  {
    tag: "Para presentear",
    text: "Crie lembranças carinhosas com biscoitos, doces e pequenas caixas natalinas.",
    image: {
      id: "09",
      label: "Caixas de presente com biscoitos natalinos e etiqueta Feliz Natal",
      src: IMAGES.caixasPresente,
    },
  },
  {
    tag: "Para vender",
    text: "Explore ideias de produtos natalinos para montar kits e oferecer aos seus clientes.",
    image: {
      id: "10",
      label: "Kits de biscoitos natalinos embalados em saquinho e caixa com visor",
      src: IMAGES.kitsVenda,
    },
  },
];

export function Possibilities() {
  return (
    <section id="possibilidades" className="relative overflow-hidden bg-primary">
      <SnowEdge flip className="relative fill-cream-deep" />
      <div aria-hidden className="pattern-plaid absolute inset-0 opacity-70" />
      <HangingOrnaments className="top-6 hidden opacity-90 md:block sm:top-10" />

      <div className="relative mx-auto max-w-6xl px-5 py-20 sm:py-28">
        <SectionHeading
          tone="dark"
          eyebrow="Possibilidades"
          title={
            <>
              Você pode preparar, presentear{" "}
              <span className="font-script text-[1.25em] font-bold text-gold">e até vender!</span>
            </>
          }
        />

        <div className="mt-14 grid gap-7 md:grid-cols-3">
          {BLOCKS.map((block, i) => (
            <article
              key={block.tag}
              className={`flex flex-col rounded-[1.75rem] bg-cream p-3 shadow-premium ${i === 1 ? "md:-translate-y-4" : ""}`}
            >
              <ImageSlot
                id={block.image.id}
                label={block.image.label}
                src={block.image.src}
                ratio="4 / 3"
                sizeHint="Recomendado: 1200 × 900 px (4:3)"
                rounded="2xl"
              />
              <div className="px-4 pb-5 pt-5 text-center">
                <p className="font-script text-3xl font-bold leading-none text-festive">
                  {block.tag}
                </p>
                <p className="mt-3 text-lg leading-relaxed text-primary">{block.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <SnowEdge className="relative -mb-px fill-cream-deep" />
    </section>
  );
}
