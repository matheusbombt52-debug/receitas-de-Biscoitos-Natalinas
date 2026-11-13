import { describe, expect, it } from "vitest";
import { advertisingAllowed, isTrackingRegion, parseTraceRegion } from "@/lib/consent";

const granted = { advertising: "granted" as const, at: "", notice: "", region: "DE" };
const denied = { advertising: "denied" as const, at: "", notice: "", region: "BR" };

describe("Região do visitante", () => {
  it("lê o país da resposta de trace", () => {
    expect(parseTraceRegion("h=site.com\nloc=BR\n", "site.com")).toBe("BR");
  });
  it("host diferente, XX ou Tor contam como região desconhecida", () => {
    expect(parseTraceRegion("h=outro.com\nloc=BR\n", "site.com")).toBeNull();
    expect(parseTraceRegion("h=site.com\nloc=XX\n", "site.com")).toBeNull();
    expect(parseTraceRegion("h=site.com\nloc=T1\n", "site.com")).toBeNull();
  });
});

describe("Meta Pixel só no Brasil", () => {
  it("Brasil sem escolha: carrega", () => {
    expect(isTrackingRegion("BR")).toBe(true);
    expect(advertisingAllowed(null, "BR", false)).toBe(true);
  });
  it("Europa, Reino Unido, EUA e outros países: nunca carrega", () => {
    for (const c of ["DE", "GB", "US", "PT", "AR", "JP", "CA"]) {
      expect(advertisingAllowed(null, c, false)).toBe(false);
    }
  });
  it("fora do Brasil não carrega nem com aceite salvo", () => {
    expect(advertisingAllowed(granted, "DE", false)).toBe(false);
    expect(advertisingAllowed(granted, "US", false)).toBe(false);
  });
  it("localização desconhecida: não carrega", () => {
    expect(advertisingAllowed(null, null, false)).toBe(false);
    expect(advertisingAllowed(granted, null, false)).toBe(false);
  });
  it("recusa vale no Brasil", () => {
    expect(advertisingAllowed(denied, "BR", false)).toBe(false);
  });
  it("GPC bloqueia no Brasil", () => {
    expect(advertisingAllowed(null, "BR", true)).toBe(false);
  });
});
