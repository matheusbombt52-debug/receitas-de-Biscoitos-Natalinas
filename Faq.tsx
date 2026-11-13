import { BONUSES } from "@/config/content";
import { formatBRL, PRICES } from "@/config/offer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "./SectionHeading";

const FAQS: { q: string; a: React.ReactNode }[] = [
  {
    q: "O que é o +147 Receitas Natalinas?",
    a: "É uma coleção digital com mais de 147 receitas de biscoitos e doces natalinos, disponibilizada em um aplicativo.",
  },
  {
    q: "Como recebo acesso ao aplicativo?",
    a: "Após a confirmação da compra, você receberá as orientações de acesso conforme as informações apresentadas na plataforma de compra.",
  },
  {
    q: "Posso acessar pelo celular?",
    a: "O aplicativo pode ser acessado pelos dispositivos compatíveis com a plataforma. Confira as informações de compatibilidade apresentadas no momento da compra.",
  },
  {
    q: "Qual a diferença entre o Básico e o Completo?",
    a: `O Plano Básico (${formatBRL(PRICES.basico)}) inclui as +147 receitas com acesso ao aplicativo por 3 meses. O Plano Completo (${formatBRL(PRICES.premium)}) inclui as +147 receitas, acesso vitalício ao aplicativo e os cinco bônus exclusivos.`,
  },
  {
    q: "Quanto tempo dura o acesso básico?",
    a: "O Plano Básico oferece acesso ao aplicativo por 3 meses.",
  },
  {
    q: "O Plano Completo tem acesso vitalício?",
    a: "Sim. O Plano Completo inclui acesso vitalício ao aplicativo.",
  },
  {
    q: "Quais são os cinco bônus?",
    a: (
      <ul className="space-y-1.5">
        {BONUSES.map((b) => (
          <li key={b.number}>
            <strong className="font-semibold text-primary">
              Bônus {b.number} — {b.title}:
            </strong>{" "}
            {b.description}
          </li>
        ))}
        <li className="pt-1">Os bônus são exclusivos do Plano Completo e não estão incluídos no Plano Básico.</li>
      </ul>
    ),
  },
  {
    q: "Como funciona a garantia?",
    a: "Você conta com 7 dias de garantia, conforme as condições de compra. Se não ficar satisfeito, poderá solicitar o reembolso dentro do prazo e pelo canal informado na compra.",
  },
  {
    q: "Quando recebo meu acesso?",
    a: "O acesso é liberado após a confirmação do pagamento, de acordo com as informações da plataforma de compra.",
  },
];

export function Faq() {
  return (
    <section id="perguntas" className="pattern-cream py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-5">
        <SectionHeading eyebrow="Dúvidas" title="Perguntas frequentes" />
        <Accordion type="single" collapsible className="mt-12 space-y-3">
          {FAQS.map((item, i) => (
            <AccordionItem
              key={item.q}
              value={`item-${i}`}
              className="rounded-2xl border border-border bg-card px-5 shadow-soft data-[state=open]:border-festive/40 data-[state=open]:bg-accent/40 sm:px-6"
            >
              <AccordionTrigger className="py-5 text-left font-display text-base font-semibold text-primary hover:no-underline sm:text-lg">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-[15px] leading-relaxed text-muted-foreground">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
