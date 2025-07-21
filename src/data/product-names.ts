/**
 * Nomes dos produtos organizados por categoria
 */
export const ProductNames = {
  calcados: [
    'Scarpin Clássico Preto',
    'Tênis Casual Feminino',
    'Sandália de Salto Alto',
    'Bota Feminina Cano Alto',
    'Sapatilha Confortável',
    'Oxford Feminino Casual',
    'Chinelo Slide Confortável',
    'Rasteirinha Verão'
  ],
  bolsas: [
    'Bolsa de Couro Marrom',
    'Mochila Feminina Urbana',
    'Carteira Feminina Pequena'
  ],
  acessorios: [
    'Cinto de Couro Clássico',
    'Carteira Compacta'
  ]
} as const;

/**
 * Variações de cores para produtos
 */
export const ProductColors = [
  'Preto',
  'Marrom',
  'Bege',
  'Branco',
  'Vermelho',
  'Azul Marinho',
  'Caramelo',
  'Nude'
] as const;

/**
 * Gera nome do produto com variação de cor
 */
export function generateProductName(baseName: string, includeColor: boolean = false): string {
  if (includeColor && Math.random() > 0.5) {
    const randomColor = ProductColors[Math.floor(Math.random() * ProductColors.length)];
    return `${baseName} ${randomColor}`;
  }
  return baseName;
}

/**
 * Obtém nomes de produtos por categoria
 */
export function getProductNamesByCategory(category: string): readonly string[] {
  return ProductNames[category as keyof typeof ProductNames] || [];
}