/**
 * Configuração de preços por categoria e tipo de produto
 */
export const ProductPrices = {
  calcados: {
    scarpin: { min: 180, max: 220 },
    tenis: { min: 140, max: 180 },
    sandalia: { min: 200, max: 280 },
    bota: { min: 240, max: 300 },
    sapatilha: { min: 80, max: 120 },
    oxford: { min: 160, max: 200 },
    chinelo: { min: 40, max: 80 },
    rasteirinha: { min: 50, max: 90 }
  },
  bolsas: {
    bolsa_couro: { min: 280, max: 350 },
    mochila: { min: 170, max: 220 },
    carteira: { min: 70, max: 100 }
  },
  acessorios: {
    cinto: { min: 60, max: 90 },
    carteira_pequena: { min: 70, max: 100 }
  }
} as const;

/**
 * Gera um preço aleatório dentro da faixa especificada
 */
export function generatePrice(category: string, type: string): number {
  const categoryPrices = ProductPrices[category as keyof typeof ProductPrices];
  if (categoryPrices) {
    const priceRange = categoryPrices[type as keyof typeof categoryPrices] as { min: number; max: number } | undefined;
    if (priceRange) {
      const randomPrice = Math.random() * (priceRange.max - priceRange.min) + priceRange.min;
      return Math.round(randomPrice * 100) / 100; // Arredonda para 2 casas decimais
    }
  }
  return 99.90; // Preço padrão
}

/**
 * Aplica desconto a um preço
 */
export function applyDiscount(price: number, discountPercent: number): number {
  const discountedPrice = price * (1 - discountPercent / 100);
  return Math.round(discountedPrice * 100) / 100;
}