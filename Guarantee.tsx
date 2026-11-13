import { Holly } from "./Decor";
import { ImageSlot } from "./ImageSlot";
import { IMAGES } from "@/config/images";

export function Guarantee() {
  return (
    <section id="garantia" className="pattern-gingham py-20 sm:py-24">
      <div className="mx-auto max-w-4xl px-5">
        <div className="stitched relative rounded-[2rem] bg-card p-9 shadow-card sm:p-14">
          <Holly className="absolute -left-3 -top-4 h-12 w-24 -rotate-12" />
          <Holly className="absolute -bottom-4 -right-3 h-12 w-24 rotate-[168deg]" />
          <div className="flex flex-col items-center gap-8 text-center md:flex-row md:text-left">
            <div className="w-52 shrink-0 drop-shadow-xl sm:w-60">
              <ImageSlot
                id="20"
                label="Selo de 7 dias de garantia"
                alt="Selo: 7 dias de garantia — sua compra protegida"
                ratio="1 / 1"
                rounded="xl"
                className="bg-transparent"
                src={IMAGES.seloGarantia}
              />
            </div>
            <div>
              <p className="font-script text-2xl font-bold leading-none text-festive sm:text-3xl">
                Garantia de 7 dias
              </p>
              <h2 className="mt-3 text-balance text-3xl font-semibold leading-tight text-primary sm:text-4xl">
                Você pode conhecer sua coleção com tranquilidade.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                Você conta com 7 dias de garantia, conforme as condições de compra. Se não ficar
                satisfeito, poderá solicitar o reembolso dentro do prazo e pelo canal informado na
                compra.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
