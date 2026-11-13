/**
 * Imagens da página de vendas.
 *
 * Os arquivos ficam em `public/images/` e são servidos em `/images/<arquivo>`.
 * Para trocar uma imagem, substitua o arquivo em `public/images/` mantendo o MESMO nome
 * (ou altere o nome aqui). Se um arquivo estiver ausente, o ImageSlot mostra o espaço
 * reservado numerado no lugar, em vez de uma imagem quebrada.
 */
const DIR = "/images";

export const IMAGES = {
  // Capas dos bônus
  bonus1: `${DIR}/bonus_1_manual_biscoitos_perfeitos.png`,
  bonus2: `${DIR}/bonus_2_embalagens_magicas_natal.png`,
  bonus3: `${DIR}/bonus_3_especial_natal_lucrativo.png`,
  bonus4: `${DIR}/bonus_4_planejador_producao_natalina.png`,
  bonus5: `${DIR}/bonus_5_guia_decoracao_criativa.webp`,

  // Seção de apresentação e possibilidades
  mesaDoces: `${DIR}/mesa_doces_natalinos.png`,
  mesaBiscoitos: `${DIR}/mesa_biscoitos_natal.png`,
  caixasPresente: `${DIR}/caixas_presente_biscoitos.png`,
  kitsVenda: `${DIR}/kits_biscoitos_venda.png`,

  // Depoimentos (prints de conversa)
  depoimentoMariana: `${DIR}/depoimento_mariana.png`,
  depoimentoRicardo: `${DIR}/depoimento_ricardo.png`,
  depoimentoPatricia: `${DIR}/depoimento_patricia.png`,
  depoimentoSonia: `${DIR}/depoimento_sonia.png`,

  // Garantia
  seloGarantia: `${DIR}/selo_garantia_7_dias.png`,
} as const;
