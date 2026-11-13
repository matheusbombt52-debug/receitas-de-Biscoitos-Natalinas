/**
 * Permissão de publicidade (Meta Pixel).
 *
 * Regra: o Meta Pixel funciona EXCLUSIVAMENTE para visitantes localizados no Brasil.
 * Qualquer outro país — ou localização desconhecida — nunca carrega o pixel,
 * mesmo com aceite salvo. No Brasil o rastreamento é padrão, mas o visitante pode
 * recusar em "Configurações de cookies". Global Privacy Control (GPC) sempre bloqueia.
 */

export const CONSENT_STORAGE_KEY = "advertising-consent-v1";
export const CONSENT_NOTICE_VERSION = "2026-11-meta-pixel-v1";

/** Único país onde o Meta Pixel pode ser carregado. */
export const TRACKING_COUNTRY = "BR";

export type AdvertisingChoice = "granted" | "denied";

export interface ConsentRecord {
  advertising: AdvertisingChoice;
  /** ISO timestamp da escolha */
  at: string;
  /** Versão do aviso exibido */
  notice: string;
  /** Região detectada no momento da escolha ("unknown" se não detectada) */
  region: string;
}

/**
 * Lê a resposta de /cdn-cgi/trace e devolve o código do país,
 * ou null quando a resposta é desconhecida, Tor ou de outro host.
 */
export function parseTraceRegion(traceText: string, expectedHost: string): string | null {
  const fields: Record<string, string> = {};
  for (const line of traceText.split("\n")) {
    const eq = line.indexOf("=");
    if (eq > 0) fields[line.slice(0, eq).trim()] = line.slice(eq + 1).trim();
  }
  const host = fields["h"];
  if (host && host !== expectedHost) return null;
  const loc = (fields["loc"] ?? "").toUpperCase();
  if (!loc || loc === "XX" || loc === "T1") return null;
  return loc;
}

/** Só o Brasil pode ser rastreado; região desconhecida (null) nunca é. */
export function isTrackingRegion(region: string | null): boolean {
  return region === TRACKING_COUNTRY;
}

let regionPromise: Promise<string | null> | null = null;

/** Detecta a região uma vez por visita (timeout de ~2 s). */
export function detectRegion(): Promise<string | null> {
  if (regionPromise) return regionPromise;
  regionPromise = (async () => {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 2000);
      const res = await fetch("/cdn-cgi/trace", { signal: controller.signal, cache: "no-store" });
      clearTimeout(timer);
      if (!res.ok) return null;
      return parseTraceRegion(await res.text(), window.location.host);
    } catch {
      return null;
    }
  })();
  return regionPromise;
}

export function hasGlobalPrivacyControl(): boolean {
  return (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true;
}

export function readConsent(): ConsentRecord | null {
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentRecord;
    return parsed.advertising === "granted" || parsed.advertising === "denied" ? parsed : null;
  } catch {
    return null;
  }
}

export function saveConsent(advertising: AdvertisingChoice, region: string | null): ConsentRecord {
  const record: ConsentRecord = {
    advertising,
    at: new Date().toISOString(),
    notice: CONSENT_NOTICE_VERSION,
    region: region ?? "unknown",
  };
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record));
  } catch {
    /* armazenamento indisponível: a escolha vale só para esta visita */
  }
  return record;
}

/**
 * Decide se o pixel pode carregar.
 * Fora do Brasil > GPC > recusa explícita: qualquer um bloqueia. Senão, carrega.
 */
export function advertisingAllowed(
  record: ConsentRecord | null,
  region: string | null,
  gpc: boolean,
): boolean {
  if (!isTrackingRegion(region)) return false;
  if (gpc) return false;
  if (record?.advertising === "denied") return false;
  return true;
}

/** Evento para reabrir o aviso a partir do rodapé. */
export const OPEN_CONSENT_EVENT = "open-cookie-settings";
export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_CONSENT_EVENT));
}
