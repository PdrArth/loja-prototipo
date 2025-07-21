import { useContext } from 'react';
import { CartContext } from '@/contexts/CartContext';
import { CartContextType } from '@/types/Cart';

/**
 * Hook customizado para usar o contexto do carrinho
 * @returns Contexto do carrinho com todas as funções disponíveis
 * @throws Error se usado fora do CartProvider
 */
export function useCart(): CartContextType {
  const context = useContext(CartContext);
  
  if (context === undefined) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  
  return context;
}

/**
 * Hook para verificar se o carrinho está vazio
 */
export function useIsCartEmpty(): boolean {
  const { items } = useCart();
  return items.length === 0;
}

/**
 * Hook para obter estatísticas do carrinho
 */
export function useCartStats() {
  const { items, getTotalItems, getTotalPrice } = useCart();
  
  return {
    itemCount: items.length,
    totalItems: getTotalItems(),
    totalPrice: getTotalPrice(),
    isEmpty: items.length === 0
  };
}