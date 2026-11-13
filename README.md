# +147 Receitas Natalinas — página de vendas

TanStack Start (React 19) + Tailwind 4, publicado como **Cloudflare Worker** com arquivos estáticos.

## Onde editar as coisas mais comuns

| O que | Onde |
| --- | --- |
| Links de checkout, preços, rodapé | `src/config/offer.ts` |
| Textos de bônus e receitas | `src/config/content.ts` |
| Imagens (caminhos) | `src/config/images.ts` — arquivos em `public/images/` |
| Meta Pixel (só Brasil) | `src/lib/meta-pixel.ts` e `src/lib/consent.ts` |
| Seções da página | `src/components/sales/` |
| Cores e fontes | `src/styles.css` |

## Rodar localmente

```sh
npm install
npm run dev      # http://localhost:3000 (ou a porta que o Vite mostrar)
npm test         # testes
npm run build    # gera .output/ (Worker + arquivos estáticos)
```

Requer Node 22 (arquivo `.node-version`).

## Publicar na Cloudflare (Workers Builds, ligado ao GitHub)

1. Suba este projeto para um repositório no GitHub.
2. Cloudflare → **Workers & Pages** → **Create** → **Import a repository** → escolha o repositório.
3. Em **Project name**, use exatamente `receitas-natalinas` (o mesmo `name` do `wrangler.jsonc`).
   Se quiser outro nome, altere o `name` no `wrangler.jsonc` antes.
4. Configurações de build:
   - **Build command:** `npm run build`
   - **Deploy command:** `npx wrangler deploy`
   - **Root directory:** `/`
   - **Variável de ambiente:** `NODE_VERSION` = `22`
5. Salve e faça o deploy. Cada `git push` na branch principal publica de novo automaticamente.
6. Domínio próprio: projeto → **Settings** → **Domains & Routes** → **Add**.

> O Meta Pixel só dispara para visitantes no Brasil, usando `/cdn-cgi/trace` da própria Cloudflare.
> Teste no endereço publicado (`workers.dev` ou seu domínio), não no `localhost`.

## Se o build na Cloudflare falhar

- Erro no `bun install`: apague `bun.lock` e `bunfig.toml` do repositório (a Cloudflare passa a usar npm).
  As dependências críticas estão com versão exata no `package.json`.
- Erro de "main"/"entry-point" no deploy: confirme que o build gerou `.output/server/index.mjs`.
- Nome do Worker diferente: ajuste o `name` em `wrangler.jsonc` ou o nome do projeto no painel.
