import { CartItem } from '@/types/Product';
import { CART_CONFIG } from '@/config/constants';

/**
 * Salva o carrinho no localStorage
 */
export function saveCartToStorage(items: CartItem[]): void {
  try {
    if (typeof window !== 'undefined') {
      const cartData = JSON.stringify(items);
      localStorage.setItem(CART_CONFIG.storageKey, cartData);
    }
  } catch (error) {
    console.error('Erro ao salvar carrinho no localStorage:', error);
  }
}

/**
 * Carrega o carrinho do localStorage
 */
export function loadCartFromStorage(): CartItem[] {
  try {
    if (typeof window !== 'undefined') {
      const cartData = localStorage.getItem(CART_CONFIG.storageKey);
      if (cartData) {
        const parsedData = JSON.parse(cartData);
        return Array.isArray(parsedData) ? parsedData : [];
      }
    }
  } catch (error) {
    console.error('Erro ao carregar carrinho do localStorage:', error);
  }
  return [];
}

/**
 * Remove o carrinho do localStorage
 */
export function clearCartFromStorage(): void {
  try {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(CART_CONFIG.storageKey);
    }
  } catch (error) {
    console.error('Erro ao limpar carrinho do localStorage:', error);
  }
}

/**
 * Verifica se o localStorage está disponível
 */
export function isStorageAvailable(): boolean {
  try {
    if (typeof window === 'undefined') return false;
    
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}