import { describe, expect, it, vi } from "vitest";
vi.mock("sonner", () => ({ toast: { info: vi.fn() } }));
import { withPageParams } from "@/components/sales/checkout";

describe("withPageParams", () => {
  it("passes the page UTMs on to the checkout link", () => {
    const out = new URL(withPageParams("https://pay.example.com/c/abc", "?utm_source=FB&utm_campaign=natal"));
    expect(out.searchParams.get("utm_source")).toBe("FB");
    expect(out.searchParams.get("utm_campaign")).toBe("natal");
  });

  it("keeps parameters the checkout link already has", () => {
    const out = new URL(withPageParams("https://pay.example.com/c/abc?src=fixo", "?src=anuncio&utm_medium=cpc"));
    expect(out.searchParams.get("src")).toBe("fixo");
    expect(out.searchParams.get("utm_medium")).toBe("cpc");
  });

  it("leaves the link unchanged when the page has no parameters", () => {
    expect(withPageParams("https://pay.example.com/c/abc", "")).toBe("https://pay.example.com/c/abc");
  });
});
