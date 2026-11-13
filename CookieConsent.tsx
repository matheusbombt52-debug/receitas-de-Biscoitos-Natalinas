import { useEffect, useRef, useState } from "react";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  CONSENT_STORAGE_KEY,
  OPEN_CONSENT_EVENT,
  advertisingAllowed,
  detectRegion,
  hasGlobalPrivacyControl,
  isTrackingRegion,
  readConsent,
  saveConsent,
  type AdvertisingChoice,
} from "@/lib/consent";
import { grantMetaPixel, revokeMetaPixel } from "@/lib/meta-pixel";

/**
 * Controle do Meta Pixel (somente Brasil).
 * Não abre sozinho: no Brasil o pixel carrega por padrão; fora do Brasil ele nunca carrega.
 * Qualquer visitante pode abrir pelo rodapé ("Configurações de cookies").
 */
export function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [gpc, setGpc] = useState(false);
  const [trackedRegion, setTrackedRegion] = useState(false);
  const regionRef = useRef<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const gpcOn = hasGlobalPrivacyControl();
    setGpc(gpcOn);

    const apply = (region: string | null) => {
      const record = readConsent();
      if (advertisingAllowed(record, region, gpcOn)) grantMetaPixel(region);
      else revokeMetaPixel();
      return record;
    };

    detectRegion().then((region) => {
      if (cancelled) return;
      regionRef.current = region;
      setTrackedRegion(isTrackingRegion(region));
      apply(region);
    });

    const onStorage = (e: StorageEvent) => {
      if (e.key === CONSENT_STORAGE_KEY) apply(regionRef.current);
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("storage", onStorage);
    window.addEventListener(OPEN_CONSENT_EVENT, onOpen);
    return () => {
      cancelled = true;
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(OPEN_CONSENT_EVENT, onOpen);
    };
  }, []);

  const choose = (choice: AdvertisingChoice) => {
    const record = saveConsent(choice, regionRef.current);
    if (advertisingAllowed(record, regionRef.current, gpc)) grantMetaPixel(regionRef.current);
    else revokeMetaPixel();
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Aviso de cookies"
      className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-xl rounded-2xl border border-gold/40 bg-card p-4 shadow-premium sm:inset-x-5 sm:bottom-5 sm:p-5"
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold">
          <Cookie className="size-4" />
        </span>
        {!trackedRegion ? (
          <p className="text-sm leading-relaxed text-foreground">
            O Meta Pixel não é usado na sua região. Nenhum dado de navegação desta página é
            compartilhado com o Meta.
          </p>
        ) : (
        <p className="text-sm leading-relaxed text-foreground">
          Usamos cookies do Meta (Facebook e Instagram) para medir os resultados dos nossos anúncios.
          Se preferir, você pode recusar e seus dados de navegação nesta página deixam de ser
          compartilhados com o Meta. Você pode mudar sua escolha a qualquer momento aqui, em
          “Configurações de cookies”, no rodapé.
          {gpc && (
            <span className="mt-1 block text-xs text-muted-foreground">
              Seu navegador pede para não ser rastreado, então o Meta Pixel fica desativado.
            </span>
          )}
        </p>
        )}
      </div>
      {!trackedRegion ? (
        <div className="mt-4 grid grid-cols-1">
          <Button variant="outline" className="rounded-full font-bold" onClick={() => setOpen(false)}>
            Entendi
          </Button>
        </div>
      ) : (
      <div className="mt-4 grid grid-cols-2 gap-3">
        <Button variant="outline" className="rounded-full font-bold" onClick={() => choose("denied")}>
          Recusar
        </Button>
        <Button variant="outline" className="rounded-full font-bold" onClick={() => choose("granted")}>
          Aceitar
        </Button>
      </div>
      )}
    </div>
  );
}
