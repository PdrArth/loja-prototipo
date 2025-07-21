/**
 * Arquivo de índice para exportar todos os dados mockados
 */

// Produtos
export { 
  products, 
  getProductById, 
  getAllProducts, 
  getProductsByCategory, 
  searchProducts 
} from './products';

// Categorias
export type { ProductCategory } from './categories';
export {
  categories,
  getCategoryById,
  getAllCategories
} from './categories';

// Imagens
export { ProductImages, getProductImageUrl } from './product-images';

// Descrições
export { ProductDescriptions, getProductDescription } from './product-descriptions';

// Preços
export { ProductPrices, generatePrice, applyDiscount } from './product-prices';

// Nomes
export { 
  ProductNames, 
  ProductColors, 
  generateProductName, 
  getProductNamesByCategory 
} from './product-names';

// Tipos
export type { Category } from './categories';