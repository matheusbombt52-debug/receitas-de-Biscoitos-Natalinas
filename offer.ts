/**
 * Configuração central da oferta — 147 Receitas Natalinas.
 *
 * Cole aqui os links de checkout quando estiverem disponíveis.
 * Enquanto estiverem vazios, os botões avisam que o link ainda não foi configurado
 * (nenhum pagamento é processado ou simulado).
 */
export const CHECKOUT_BASICO = "";
export const CHECKOUT_PREMIUM = "";
export const CHECKOUT_UPGRADE = "";

export const PRICES = {
  basico: 14.9,
  premium: 27.9,
  upgrade: 19.9,
  /** Preço de referência riscado do Premium (faixa de Black Friday e card do plano). */
  premiumReference: 47,
  /** Preço de referência riscado do Básico (card do plano). */
  basicoReference: 27.9,
} as const;

/**
 * Valor individual de referência de cada bônus (mostrado riscado na seção de bônus,
 * com a etiqueta GRÁTIS). Chave = número do bônus.
 */
export const BONUS_REFERENCE_VALUES = {
  "1": 27.9,
  "2": 17.9,
  "3": 27.9,
  "4": 17.9,
  "5": 17.9,
} as const;

/** Soma dos valores de referência dos 5 bônus. */
export function bonusReferenceTotal(): number {
  const total = Object.values(BONUS_REFERENCE_VALUES).reduce((sum, v) => sum + v, 0);
  return Math.round(total * 100) / 100;
}

export type CheckoutKind = "basico" | "premium" | "upgrade";

export const CHECKOUT_LINKS: Record<CheckoutKind, string> = {
  basico: CHECKOUT_BASICO,
  premium: CHECKOUT_PREMIUM,
  upgrade: CHECKOUT_UPGRADE,
};

/** Formata um valor em reais: 14.9 -> "R$ 14,90" */
export function formatBRL(value: number): string {
  return `R$ ${value.toFixed(2).replace(".", ",")}`;
}

/** Diferença entre a condição de upgrade e o plano básico. */
export function upgradeDifference(): number {
  return Math.round((PRICES.upgrade - PRICES.basico) * 100) / 100;
}

/** Retorna o link configurado para o checkout, ou null se ainda não houver link. */
export function getCheckoutUrl(kind: CheckoutKind): string | null {
  const url = CHECKOUT_LINKS[kind].trim();
  return url.length > 0 ? url : null;
}

/** Placeholders de rodapé/suporte a preencher depois. */
export const SITE_INFO = {
  productName: "+147 Receitas Natalinas",
  supportContact: "",
  privacyPolicyUrl: "",
  termsUrl: "",
  companyInfo: "",
} as const;
