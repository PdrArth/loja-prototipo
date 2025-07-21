export interface Product {
  id: string;
  nome: string;
  descricao: string;
  imagem: string;
  preco: number;
  categoria?: string; // slug da categoria
  created_at?: string; // ISO date
  imagens?: string[]; // galeria de imagens
  tamanhos?: string[]; // tamanhos disponíveis
  rating?: number; // média de avaliações
  numAvaliacoes?: number; // número de avaliações
  precoAntigo?: number; // preço antigo para desconto
  tamanhoSelecionado?: string; // tamanho escolhido pelo usuário
  marca?: string; // marca do produto
  vendidos?: number; // quantidade vendida (para ordenação por popularidade)
  cupomDesconto?: {
    codigo: string;
    valor: number; // valor do desconto em reais ou porcentagem
    tipo: 'percentual' | 'fixo';
  };
}

// Tipos para filtros e busca
export interface ProductFilters {
  categoria?: string;
  precoMin?: number;
  precoMax?: number;
  marca?: string;
  ratingMin?: number;
  busca?: string;
}

export interface SortOption {
  value: string;
  label: string;
}

export type SortBy = 'relevancia' | 'preco-asc' | 'preco-desc' | 'rating' | 'vendidos' | 'novidades';

export interface CartItem {
  produto: Product;
  quantidade: number;
}