/**
 * Marcas disponíveis organizadas por categoria
 */
export const brands = {
  calcados: [
    'Valentina',
    'Comfort Plus',
    'Style Walk',
    'Urban Step',
    'Classic Shoes',
    'Modern Feet',
    'Elegance',
    'Casual Wear'
  ],
  bolsas: [
    'Valentina',
    'Leather Co.',
    'Fashion Bags',
    'Urban Style',
    'Classic Collection',
    'Modern Bags'
  ],
  acessorios: [
    'Valentina',
    'Accessories Plus',
    'Style Collection',
    'Urban Accessories',
    'Classic Line'
  ]
} as const;

/**
 * Retorna uma marca aleatória para uma categoria
 */
export function getRandomBrand(categoria: string): string {
  const categoryBrands = brands[categoria as keyof typeof brands];
  if (categoryBrands && categoryBrands.length > 0) {
    return categoryBrands[Math.floor(Math.random() * categoryBrands.length)];
  }
  return 'Valentina'; // marca padrão
}

/**
 * Retorna todas as marcas únicas
 */
export function getAllBrands(): string[] {
  const allBrands = new Set<string>();
  Object.values(brands).forEach(categoryBrands => {
    categoryBrands.forEach(brand => allBrands.add(brand));
  });
  return Array.from(allBrands).sort();
}

/**
 * Gera uma avaliação aleatória entre 3.0 e 5.0
 */
export function generateRating(): number {
  return Math.round((Math.random() * 2 + 3) * 10) / 10; // Entre 3.0 e 5.0
}

/**
 * Gera número de avaliações aleatório
 */
export function generateNumAvaliacoes(): number {
  return Math.floor(Math.random() * 500) + 10; // Entre 10 e 510
}

/**
 * Gera número de vendas aleatório
 */
export function generateVendidos(): number {
  return Math.floor(Math.random() * 1000) + 50; // Entre 50 e 1050
}
