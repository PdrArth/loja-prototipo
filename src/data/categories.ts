export interface Category {
  id: string;
  nome: string;
  slug: string;
  icone?: string; // caminho para ícone ou nome do ícone
}

// Alias para compatibilidade
export type ProductCategory = Category;

export const categories: Category[] = [
  { id: '1', nome: 'Tênis', slug: 'tenis', icone: '👟' },
  { id: '2', nome: 'Sandálias', slug: 'sandalias', icone: '🥿' },
  { id: '3', nome: 'Bolsas', slug: 'bolsas', icone: '👜' },
  { id: '4', nome: 'Acessórios', slug: 'acessorios', icone: '🕶️' },
  { id: '5', nome: 'Roupas', slug: 'roupas', icone: '👗' },
  { id: '6', nome: 'Promoções', slug: 'promocoes', icone: '🔥' },
];

export function getCategoryById(id: string): Category | undefined {
  return categories.find(category => category.id === id);
}

export function getAllCategories(): Category[] {
  return categories;
}