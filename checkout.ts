import { toast } from "sonner";
import { formatBRL, getCheckoutUrl, PRICES, type CheckoutKind } from "@/config/offer";

const LABELS: Record<CheckoutKind, string> = {
  basico: "Plano Básico",
  premium: "Plano Completo",
  upgrade: "Upgrade para o Plano Completo",
};

/**
 * Repassa ao checkout os parâmetros de rastreamento da página (utm_*, src, sck, fbclid...),
 * sem sobrescrever os que o link de checkout já tem. Botões navegam via JS, então o
 * script da UTMify não consegue reescrevê-los sozinho.
 */
export function withPageParams(checkoutUrl: string, pageSearch: string): string {
  const params = new URLSearchParams(pageSearch);
  if ([...params.keys()].length === 0) return checkoutUrl;
  let url: URL;
  try {
    url = new URL(checkoutUrl);
  } catch {
    return checkoutUrl;
  }
  params.forEach((value, key) => {
    if (!url.searchParams.has(key)) url.searchParams.set(key, value);
  });
  return url.toString();
}

/**
 * Envia o visitante para o checkout configurado em src/config/offer.ts.
 * Nenhum pagamento é processado aqui.
 */
export function goToCheckout(kind: CheckoutKind) {
  const url = getCheckoutUrl(kind);
  if (url) {
    window.location.href = withPageParams(url, window.location.search);
    return;
  }
  toast.info("Link de checkout ainda não configurado", {
    description: `${LABELS[kind]} — ${formatBRL(PRICES[kind])}. O link será inserido em breve.`,
  });
}
