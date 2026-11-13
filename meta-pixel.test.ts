import { beforeEach, describe, expect, it, vi } from "vitest";

beforeEach(() => {
  vi.resetModules();
  delete window.fbq;
  delete window._fbq;
  document.head.querySelectorAll("script[src*='facebook']").forEach((s) => s.remove());
});

describe("Pixel fora do Brasil", () => {
  it("não baixa o script nem cria o fbq para outro país ou país desconhecido", async () => {
    const { grantMetaPixel, trackMetaEvent } = await import("@/lib/meta-pixel");
    for (const c of ["US", "DE", "GB", null]) grantMetaPixel(c);
    trackMetaEvent("Purchase", { value: 27.9, currency: "BRL" });
    expect(window.fbq).toBeUndefined();
    expect(document.querySelector("script[src*='connect.facebook.net']")).toBeNull();
  });
});

describe("Pixel no Brasil", () => {
  it("inicia o ID 1464199862561163 e envia PageView", async () => {
    const { grantMetaPixel } = await import("@/lib/meta-pixel");
    grantMetaPixel("BR");
    const queue = window.fbq!.queue as unknown[][];
    expect(queue).toContainEqual(["init", "1464199862561163", {}, { agent: "lovable" }]);
    expect(queue).toContainEqual(["track", "PageView"]);
    expect(document.querySelector("script[src*='connect.facebook.net']")).not.toBeNull();
  });
  it("depois de recusar, nenhum evento novo sai", async () => {
    const { grantMetaPixel, revokeMetaPixel, trackMetaEvent } = await import("@/lib/meta-pixel");
    grantMetaPixel("BR");
    revokeMetaPixel();
    const before = window.fbq!.queue.length;
    trackMetaEvent("Purchase", { value: 27.9, currency: "BRL" });
    expect(window.fbq!.queue.slice(before)).not.toContainEqual(["track", "Purchase", { value: 27.9, currency: "BRL" }]);
  });
});
