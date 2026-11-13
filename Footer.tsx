import { SITE_INFO } from "@/config/offer";
import { openCookieSettings } from "@/lib/consent";

export function Footer() {
  return (
    <footer className="bg-primary-deep text-on-dark">
      <div aria-hidden className="candy-stripe h-1.5" />
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-5 py-6 text-center text-xs text-on-dark-muted">
        <p>
          © {new Date().getFullYear()} {SITE_INFO.productName}. Todos os direitos reservados.
        </p>
        <button
          type="button"
          onClick={openCookieSettings}
          className="underline underline-offset-2 hover:text-on-dark"
        >
          Configurações de cookies
        </button>
      </div>
    </footer>
  );
}
