import { Product, ProductFilters, SortBy } from '@/types/Product';
import { getRandomBrand, generateRating, generateNumAvaliacoes, generateVendidos } from './brands';

export const products: Product[] = [
  {
    id: '1',
    nome: 'Scarpin Clássico Preto',
    descricao: 'Scarpin elegante em couro legítimo, perfeito para ocasiões especiais e uso profissional. Salto médio de 7cm proporciona conforto e sofisticação.',
    imagem: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop&auto=format',
    preco: 189.90,
    categoria: 'calcados',
    created_at: '2024-07-01',
    marca: 'Elegance',
    rating: 4.5,
    numAvaliacoes: 127,
    vendidos: 245,
    imagens: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400&h=400&fit=crop&auto=format',
    ],
    tamanhos: ['34', '35', '36', '37', '38', '39', '40'],
  },
  {
    id: '2',
    nome: 'Tênis Casual Feminino',
    descricao: 'Tênis confortável para o dia a dia, com design moderno e materiais de qualidade. Ideal para caminhadas e atividades casuais.',
    imagem: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop&auto=format',
    preco: 149.90,
    categoria: 'tenis',
    created_at: '2024-07-10',
    marca: 'Urban Step',
    rating: 4.2,
    numAvaliacoes: 89,
    vendidos: 312,
    imagens: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400&h=400&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&auto=format',
    ],
    tamanhos: ['34', '35', '36', '37', '38', '39', '40'],
  },
  {
    id: '3',
    nome: 'Sandália de Salto Alto',
    descricao: 'Sandália sofisticada com salto alto de 10cm, perfeita para festas e eventos especiais. Disponível em várias cores.',
    imagem: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400&h=400&fit=crop&auto=format',
    preco: 229.90,
    categoria: 'sandalias',
    created_at: '2024-06-25',
    marca: 'Valentina',
    rating: 4.7,
    numAvaliacoes: 203,
    vendidos: 156,
    imagens: [
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400&h=400&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400&h=400&fit=crop&auto=format',
    ],
    tamanhos: ['34', '35', '36', '37', '38', '39', '40'],
  },
  {
    id: '4',
    nome: 'Bolsa de Couro Marrom',
    descricao: 'Bolsa espaçosa em couro legítimo, com compartimentos internos organizadores. Ideal para trabalho e uso diário.',
    imagem: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&auto=format',
    preco: 299.90,
    categoria: 'bolsas',
    created_at: '2024-06-15',
    imagens: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&auto=format',
    ],
  },
  {
    id: '5',
    nome: 'Sapatilha Confortável',
    descricao: 'Sapatilha ultra confortável para uso diário, com palmilha acolchoada e design atemporal. Disponível em várias cores.',
    imagem: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400&h=400&fit=crop&auto=format',
    preco: 89.90,
    categoria: 'calcados',
    created_at: '2024-06-20',
    imagens: [
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400&h=400&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400&h=400&fit=crop&auto=format',
    ],
    tamanhos: ['34', '35', '36', '37', '38', '39', '40'],
  },
  {
    id: '6',
    nome: 'Bota Feminina Cano Alto',
    descricao: 'Bota elegante de cano alto em couro sintético, perfeita para o inverno. Zíper lateral para facilitar o calce.',
    imagem: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop&auto=format',
    preco: 259.90,
    categoria: 'calcados',
    created_at: '2024-06-10',
    imagens: [
      'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400&h=400&fit=crop&auto=format',
    ],
    tamanhos: ['34', '35', '36', '37', '38', '39', '40'],
  },
  {
    id: '7',
    nome: 'Carteira Feminina Pequena',
    descricao: 'Carteira compacta em couro sintético com múltiplos compartimentos para cartões e documentos. Design moderno e funcional.',
    imagem: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&auto=format',
    preco: 79.90,
    categoria: 'acessorios',
    created_at: '2024-06-05',
    imagens: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400&h=400&fit=crop&auto=format',
    ],
  },
  {
    id: '8',
    nome: 'Chinelo Slide Confortável',
    descricao: 'Chinelo slide com palmilha anatômica, ideal para relaxar em casa ou usar na praia. Material antiderrapante.',
    imagem: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400&h=400&fit=crop&auto=format',
    preco: 49.90,
    categoria: 'calcados',
    created_at: '2024-06-01',
    imagens: [
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400&h=400&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400&h=400&fit=crop&auto=format',
    ],
    tamanhos: ['34', '35', '36', '37', '38', '39', '40'],
  },
  {
    id: '9',
    nome: 'Mochila Feminina Urbana',
    descricao: 'Mochila moderna com design urbano, múltiplos bolsos e compartimento para notebook. Perfeita para trabalho e estudos.',
    imagem: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&auto=format',
    preco: 179.90,
    categoria: 'bolsas',
    created_at: '2024-05-25',
    imagens: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400&h=400&fit=crop&auto=format',
    ],
  },
  {
    id: '10',
    nome: 'Oxford Feminino Casual',
    descricao: 'Sapato oxford feminino em couro sintético, com design casual-chic. Combina com looks despojados e elegantes.',
    imagem: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop&auto=format',
    preco: 169.90,
    categoria: 'calcados',
    created_at: '2024-05-15',
    imagens: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400&h=400&fit=crop&auto=format',
    ],
    tamanhos: ['34', '35', '36', '37', '38', '39', '40'],
  },
  {
    id: '11',
    nome: 'Cinto de Couro Clássico',
    descricao: 'Cinto em couro legítimo com fivela dourada, acessório essencial para compor looks elegantes e casuais.',
    imagem: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&auto=format',
    preco: 69.90,
    categoria: 'acessorios',
    created_at: '2024-05-10',
    imagens: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400&h=400&fit=crop&auto=format',
    ],
  },
  {
    id: '12',
    nome: 'Rasteirinha Verão',
    descricao: 'Rasteirinha delicada para o verão, com detalhes em strass e design minimalista. Confortável para uso prolongado.',
    imagem: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400&h=400&fit=crop&auto=format',
    preco: 59.90,
    categoria: 'sandalias',
    created_at: '2024-05-01',
    imagens: [
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400&h=400&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400&h=400&fit=crop&auto=format',
    ],
    tamanhos: ['34', '35', '36', '37', '38', '39', '40'],
  },
  {
    id: '13',
    nome: 'Sandália Flat Colorida',
    descricao: 'Sandália flat super confortável, ideal para o verão. Cores vibrantes e tiras macias.',
    imagem: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400&h=400&fit=crop&auto=format',
    preco: 79.90,
    categoria: 'sandalias',
    created_at: '2024-07-12',
    imagens: [
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400&h=400&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&auto=format',
    ],
    tamanhos: ['34', '35', '36', '37', '38', '39', '40'],
  },
  {
    id: '14',
    nome: 'Bolsa Tote Grande',
    descricao: 'Bolsa tote espaçosa, perfeita para o dia a dia e viagens. Material resistente e alças reforçadas.',
    imagem: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&auto=format',
    preco: 219.90,
    categoria: 'bolsas',
    created_at: '2024-07-11',
    imagens: [
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400&h=400&fit=crop&auto=format',
    ],
  },
  {
    id: '15',
    nome: 'Óculos de Sol Fashion',
    descricao: 'Óculos de sol com design moderno e proteção UV400. Várias cores de armação.',
    imagem: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&auto=format',
    preco: 129.90,
    categoria: 'acessorios',
    created_at: '2024-07-09',
    imagens: [
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400&h=400&fit=crop&auto=format',
    ],
  },
  {
    id: '16',
    nome: 'Vestido Midi Floral',
    descricao: 'Vestido midi com estampa floral, tecido leve e modelagem soltinha. Ideal para dias quentes.',
    imagem: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400&h=400&fit=crop&auto=format',
    preco: 159.90,
    categoria: 'roupas',
    created_at: '2024-07-08',
    imagens: [
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400&h=400&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&auto=format',
    ],
    tamanhos: ['P', 'M', 'G', 'GG'],
  },
  {
    id: '17',
    nome: 'Cinto Feminino Fino',
    descricao: 'Cinto fino em couro sintético, ideal para marcar a cintura em vestidos e calças.',
    imagem: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&auto=format',
    preco: 39.90,
    categoria: 'acessorios',
    created_at: '2024-07-07',
    imagens: [
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400&h=400&fit=crop&auto=format',
    ],
  },
  {
    id: '18',
    nome: 'Tênis Esportivo Unissex',
    descricao: 'Tênis esportivo leve, com solado antiderrapante e design moderno. Unissex.',
    imagem: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400&h=400&fit=crop&auto=format',
    preco: 199.90,
    categoria: 'tenis',
    created_at: '2024-07-06',
    imagens: [
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400&h=400&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&auto=format',
    ],
    tamanhos: ['36', '37', '38', '39', '40', '41', '42'],
  },
  {
    id: '19',
    nome: 'Bolsa Clutch Festa',
    descricao: 'Bolsa clutch elegante, perfeita para festas e eventos noturnos. Fecho metálico e alça removível.',
    imagem: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&auto=format',
    preco: 99.90,
    categoria: 'bolsas',
    created_at: '2024-07-05',
    imagens: [
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400&h=400&fit=crop&auto=format',
    ],
  },
  {
    id: '20',
    nome: 'Sandália Anabela',
    descricao: 'Sandália anabela com salto médio, tiras cruzadas e palmilha macia. Conforto e elegância.',
    imagem: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400&h=400&fit=crop&auto=format',
    preco: 139.90,
    categoria: 'sandalias',
    created_at: '2024-07-04',
    imagens: [
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400&h=400&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&auto=format',
    ],
    tamanhos: ['34', '35', '36', '37', '38', '39', '40'],
  },
];

/**
 * Busca produto por ID
 */
export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id);
}

/**
 * Retorna todos os produtos
 */
export function getAllProducts(): Product[] {
  return products;
}

/**
 * Filtra produtos por categoria (implementação simples para o protótipo)
 */
export function getProductsByCategory(category: string): Product[] {
  const categoryKeywords: Record<string, string[]> = {
    'calcados': ['Scarpin', 'Tênis', 'Sandália', 'Bota', 'Sapatilha', 'Oxford', 'Chinelo', 'Rasteirinha'],
    'bolsas': ['Bolsa', 'Mochila'],
    'acessorios': ['Carteira', 'Cinto']
  };
  
  const keywords = categoryKeywords[category] || [];
  return products.filter(product => 
    keywords.some(keyword => product.nome.includes(keyword))
  );
}

/**
 * Busca produtos por termo
 */
export function searchProducts(searchTerm: string): Product[] {
  const term = searchTerm.toLowerCase();
  return products.filter(product =>
    product.nome.toLowerCase().includes(term) ||
    product.descricao.toLowerCase().includes(term) ||
    product.marca?.toLowerCase().includes(term)
  );
}

/**
 * Filtra e ordena produtos com base nos filtros fornecidos
 */
export function filterAndSortProducts(filters: ProductFilters, sortBy: SortBy = 'relevancia'): Product[] {
  let filteredProducts = [...products];

  // Filtro por busca
  if (filters.busca) {
    const term = filters.busca.toLowerCase();
    filteredProducts = filteredProducts.filter(product =>
      product.nome.toLowerCase().includes(term) ||
      product.descricao.toLowerCase().includes(term) ||
      product.marca?.toLowerCase().includes(term)
    );
  }

  // Filtro por categoria
  if (filters.categoria) {
    filteredProducts = filteredProducts.filter(product =>
      product.categoria === filters.categoria
    );
  }

  // Filtro por marca
  if (filters.marca) {
    filteredProducts = filteredProducts.filter(product =>
      product.marca === filters.marca
    );
  }

  // Filtro por preço
  if (filters.precoMin !== undefined) {
    filteredProducts = filteredProducts.filter(product =>
      product.preco >= filters.precoMin!
    );
  }
  if (filters.precoMax !== undefined) {
    filteredProducts = filteredProducts.filter(product =>
      product.preco <= filters.precoMax!
    );
  }

  // Filtro por rating
  if (filters.ratingMin !== undefined) {
    filteredProducts = filteredProducts.filter(product =>
      (product.rating || 0) >= filters.ratingMin!
    );
  }

  // Ordenação
  return sortProducts(filteredProducts, sortBy);
}

/**
 * Ordena produtos com base no critério especificado
 */
export function sortProducts(products: Product[], sortBy: SortBy): Product[] {
  const sortedProducts = [...products];

  switch (sortBy) {
    case 'preco-asc':
      return sortedProducts.sort((a, b) => a.preco - b.preco);

    case 'preco-desc':
      return sortedProducts.sort((a, b) => b.preco - a.preco);

    case 'rating':
      return sortedProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0));

    case 'vendidos':
      return sortedProducts.sort((a, b) => (b.vendidos || 0) - (a.vendidos || 0));

    case 'novidades':
      return sortedProducts.sort((a, b) => {
        const dateA = new Date(a.created_at || '').getTime();
        const dateB = new Date(b.created_at || '').getTime();
        return dateB - dateA;
      });

    case 'relevancia':
    default:
      // Para relevância, mantém a ordem original ou pode implementar lógica específica
      return sortedProducts;
  }
}

/**
 * Retorna todas as marcas únicas dos produtos
 */
export function getAvailableBrands(): string[] {
  const brands = new Set<string>();
  products.forEach(product => {
    if (product.marca) {
      brands.add(product.marca);
    }
  });
  return Array.from(brands).sort();
}

/**
 * Retorna faixa de preços dos produtos
 */
export function getPriceRange(): { min: number; max: number } {
  const prices = products.map(p => p.preco);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices)
  };
}