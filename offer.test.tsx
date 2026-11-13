import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { formatBRL, getCheckoutUrl, PRICES, upgradeDifference } from "@/config/offer";

vi.mock("@/components/sales/checkout", () => ({ goToCheckout: vi.fn() }));

import { goToCheckout } from "@/components/sales/checkout";
import { Pricing } from "@/components/sales/Pricing";

describe("Preços da oferta", () => {
  it("Plano Básico custa R$ 14,90", () => {
    expect(formatBRL(PRICES.basico)).toBe("R$ 14,90");
  });

  it("Plano Premium custa R$ 27,90", () => {
    expect(formatBRL(PRICES.premium)).toBe("R$ 27,90");
  });

  it("Upgrade especial custa R$ 19,90, R$ 5,00 a mais que o Básico", () => {
    expect(formatBRL(PRICES.upgrade)).toBe("R$ 19,90");
    expect(formatBRL(upgradeDifference())).toBe("R$ 5,00");
  });

  it("checkout sem link configurado não gera URL inventada", () => {
    expect(getCheckoutUrl("basico")).toBeNull();
  });
});

describe("Fluxo de compra", () => {
  beforeEach(() => vi.mocked(goToCheckout).mockClear());

  it("botão do Básico abre o modal de upgrade em vez de ir ao checkout", () => {
    render(<Pricing />);
    fireEvent.click(screen.getByRole("button", { name: /quero o plano básico/i }));
    expect(screen.getByRole("heading", { name: /espere! aproveite por apenas r\$\s5,00 a mais!/i })).toBeInTheDocument();
    expect(goToCheckout).not.toHaveBeenCalled();
  });

  it("aceitar o upgrade leva ao checkout de upgrade", () => {
    render(<Pricing />);
    fireEvent.click(screen.getByRole("button", { name: /quero o plano básico/i }));
    fireEvent.click(screen.getByRole("button", { name: /sim! quero o plano completo por r\$\s19,90/i }));
    expect(goToCheckout).toHaveBeenCalledWith("upgrade");
  });

  it("recusar o upgrade leva ao checkout do Básico", () => {
    render(<Pricing />);
    fireEvent.click(screen.getByRole("button", { name: /quero o plano básico/i }));
    fireEvent.click(screen.getByRole("button", { name: /prefiro continuar com o plano básico/i }));
    expect(goToCheckout).toHaveBeenCalledWith("basico");
  });

  it("botão Premium leva direto ao checkout Premium", () => {
    render(<Pricing />);
    fireEvent.click(screen.getByRole("button", { name: /quero a versão completa/i }));
    expect(goToCheckout).toHaveBeenCalledWith("premium");
  });
});

describe("Preços riscados nos planos", () => {
  it("Premium mostra R$ 47,00 riscado e Básico mostra R$ 27,90 riscado", () => {
    render(<Pricing />);
    const struck = Array.from(document.querySelectorAll("#planos s")).map((s) => s.textContent);
    expect(struck).toContain("R$ 47,00");
    expect(struck).toContain("R$ 27,90");
  });

  it("Básico lista os 5 bônus riscados (não incluídos)", () => {
    render(<Pricing />);
    const struckBonuses = Array.from(document.querySelectorAll("#planos s")).filter((s) =>
      s.textContent?.startsWith("Bônus"),
    );
    expect(struckBonuses).toHaveLength(5);
  });
});

describe("Faixa de Black Friday", () => {
  it("mostra De R$ 47,00 riscado e o preço promocional R$ 27,90", async () => {
    const { PromoBar } = await import("@/components/sales/PromoBar");
    render(<PromoBar />);
    expect(screen.getByText("R$ 47,00").tagName).toBe("S");
    expect(screen.getByText("R$ 27,90")).toBeInTheDocument();
    expect(screen.getByText("+147 receitas + 5 bônus exclusivos")).toBeInTheDocument();
  });
});

describe("Valor dos bônus", () => {
  it("cada bônus mostra seu valor individual riscado e a etiqueta GRÁTIS", async () => {
    const { Bonuses } = await import("@/components/sales/Bonuses");
    render(<Bonuses />);
    const struck = Array.from(document.querySelectorAll("#bonus article s")).map((s) => s.textContent);
    expect(struck).toEqual(["R$ 27,90", "R$ 17,90", "R$ 27,90", "R$ 17,90", "R$ 17,90"]);
    expect(screen.getAllByText("Grátis")).toHaveLength(5);
  });

  it("total de referência dos bônus é R$ 109,50 riscado, com TODOS GRÁTIS! SOMENTE HOJE!", async () => {
    const { Bonuses } = await import("@/components/sales/Bonuses");
    render(<Bonuses />);
    const total = screen.getByTestId("bonus-total");
    expect(total.querySelector("s")?.textContent).toBe("R$ 109,50");
    expect(total.textContent).toContain("Todos grátis!");
    expect(total.textContent).toContain("Somente hoje!");
    expect(total.textContent).not.toContain("R$ 0,00");
  });
});
