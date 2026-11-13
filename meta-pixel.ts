/**
 * Meta Pixel da página de vendas.
 * Só carrega para visitantes localizados no Brasil e com permissão de publicidade (ver consent.ts).
 * Todo evento passa por trackMetaEvent(), que repete a verificação de país — nenhum evento
 * é enviado fora do Brasil.
 */
import { isTrackingRegion } from "./consent";

export const META_PIXEL_ID = "1464199862561163";

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[];
  push: Fbq;
  loaded: boolean;
  version: string;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

/** País confirmado para esta visita; só "BR" libera o pixel. */
let pixelRegion: string | null = null;
let revoked = false;

function canSend(): boolean {
  return typeof window !== "undefined" && !!window.fbq && !revoked && isTrackingRegion(pixelRegion);
}

/**
 * Carrega o pixel (uma vez) e registra a visualização da página.
 * Fora do Brasil (ou com país desconhecido) não faz nada: o script da Meta nem é baixado.
 */
export function grantMetaPixel(region: string | null) {
  if (typeof window === "undefined") return;
  if (!isTrackingRegion(region)) {
    revokeMetaPixel();
    return;
  }
  pixelRegion = region;
  revoked = false;
  if (window.fbq) {
    window.fbq("consent", "grant");
    return;
  }
  const fbq = function (...args: unknown[]) {
    if (fbq.callMethod) fbq.callMethod.apply(fbq, args);
    else fbq.queue.push(args);
  } as Fbq;
  if (!window._fbq) window._fbq = fbq;
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];
  window.fbq = fbq;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);

  fbq("consent", "grant");
  fbq("init", META_PIXEL_ID, {}, { agent: "lovable" });
  trackMetaEvent("PageView");
}

/** Único caminho para enviar eventos (PageView, Purchase, etc.). Bloqueia fora do Brasil. */
export function trackMetaEvent(event: string, params?: Record<string, unknown>) {
  if (!canSend()) return;
  if (params) window.fbq!("track", event, params);
  else window.fbq!("track", event);
}

/** Interrompe o envio imediatamente, sem recarregar a página. */
export function revokeMetaPixel() {
  revoked = true;
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq("consent", "revoke");
}
