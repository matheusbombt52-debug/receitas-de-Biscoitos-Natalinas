import { createFileRoute } from "@tanstack/react-router";
import { PromoBar } from "@/components/sales/PromoBar";
import { Hero } from "@/components/sales/Hero";
import { Presentation } from "@/components/sales/Presentation";
import { RecipeGallery } from "@/components/sales/RecipeGallery";
import { Benefits } from "@/components/sales/Benefits";
import { Possibilities } from "@/components/sales/Possibilities";
import { Testimonials } from "@/components/sales/Testimonials";
import { Bonuses } from "@/components/sales/Bonuses";
import { Pricing } from "@/components/sales/Pricing";
import { Guarantee } from "@/components/sales/Guarantee";
import { Faq } from "@/components/sales/Faq";
import { FinalCta } from "@/components/sales/FinalCta";
import { Footer } from "@/components/sales/Footer";

const TITLE = "+147 Receitas Natalinas — Biscoitos e doces de Natal em um aplicativo";
const DESCRIPTION =
  "Coleção com mais de 147 receitas natalinas de biscoitos e doces em um aplicativo. Prepare, presenteie e até venda neste Natal.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      {/* Faixa promocional fica fixa no topo durante toda a rolagem */}
      <div className="sticky top-0 z-50">
        <PromoBar />
      </div>
      <main>
        <Hero />
        <Presentation />
        <RecipeGallery />
        <Benefits />
        <Possibilities />
        <Testimonials />
        <Bonuses />
        <Pricing />
        <Guarantee />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
