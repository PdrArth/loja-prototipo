import { CartItem, Product } from '@/types/Product';
import { CART_CONFIG } from '@/config/constants';

/**
 * Calcula o total de itens no carrinho
 */
export function calculateTotalItems(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.quantidade, 0);
}

/**
 * Calcula o preço total do carrinho
 */
export function calculateTotalPrice(items: CartItem[]): number {
  return items.reduce((total, item) => {
    return total + (item.produto.preco * item.quantidade);
  }, 0);
}

/**
 * Verifica se um produto está no carrinho
 */
export function isProductInCart(items: CartItem[], productId: string): boolean {
  return items.some(item => item.produto.id === productId);
}

/**
 * Encontra um item específico no carrinho
 */
export function findCartItem(items: CartItem[], productId: string): CartItem | undefined {
  return items.find(item => item.produto.id === productId);
}

/**
 * Adiciona um produto ao carrinho ou incrementa a quantidade
 */
export function addProductToCart(items: CartItem[], product: Product): CartItem[] {
  const existingItem = findCartItem(items, product.id);
  
  if (existingItem) {
    // Se já existe, incrementa a quantidade (respeitando o limite)
    const newQuantity = Math.min(
      existingItem.quantidade + 1, 
      CART_CONFIG.maxQuantity
    );
    
    return items.map(item =>
      item.produto.id === product.id
        ? { ...item, quantidade: newQuantity }
        : item
    );
  } else {
    // Se não existe, adiciona novo item
    return [...items, { produto: product, quantidade: 1 }];
  }
}

/**
 * Atualiza a quantidade de um item no carrinho
 */
export function updateCartItemQuantity(
  items: CartItem[], 
  productId: string, 
  quantidade: number
): CartItem[] {
  // Valida a quantidade
  const validQuantity = Math.max(
    CART_CONFIG.minQuantity,
    Math.min(quantidade, CART_CONFIG.maxQuantity)
  );
  
  return items.map(item =>
    item.produto.id === productId
      ? { ...item, quantidade: validQuantity }
      : item
  );
}

/**
 * Remove um item do carrinho
 */
export function removeProductFromCart(items: CartItem[], productId: string): CartItem[] {
  return items.filter(item => item.produto.id !== productId);
}

/**
 * Limpa todos os itens do carrinho
 */
export function clearAllCartItems(): CartItem[] {
  return [];
}

/**
 * Valida se a quantidade é válida
 */
export function isValidQuantity(quantidade: number): boolean {
  return (
    Number.isInteger(quantidade) &&
    quantidade >= CART_CONFIG.minQuantity &&
    quantidade <= CART_CONFIG.maxQuantity
  );
}