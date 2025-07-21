'use client';

import React, { createContext, useReducer, useEffect, useCallback } from 'react';
import { CartContextType, CartState } from '@/types/Cart';
import { Product, CartItem } from '@/types/Product';
import { cartReducer } from './cart-reducer';
import { 
  calculateTotalItems, 
  calculateTotalPrice, 
  isProductInCart, 
  findCartItem 
} from '@/lib/cart-utils';
import { 
  saveCartToStorage, 
  loadCartFromStorage, 
  clearCartFromStorage 
} from '@/lib/cart-storage';

/**
 * Contexto do carrinho
 */
export const CartContext = createContext<CartContextType | undefined>(undefined);

/**
 * Estado inicial do carrinho
 */
const initialState: CartState = {
  items: []
};

/**
 * Props do provider do carrinho
 */
interface CartProviderProps {
  children: React.ReactNode;
}

/**
 * Provider do contexto do carrinho
 */
export function CartProvider({ children }: CartProviderProps) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  /**
   * Carrega o carrinho do localStorage na inicialização
   */
  useEffect(() => {
    const savedCart = loadCartFromStorage();
    if (savedCart.length > 0) {
      dispatch({ type: 'LOAD_CART', payload: savedCart });
    }
  }, []);

  /**
   * Salva o carrinho no localStorage sempre que o estado muda
   */
  useEffect(() => {
    saveCartToStorage(state.items);
  }, [state.items]);

  /**
   * Adiciona um produto ao carrinho
   */
  const addToCart = useCallback((produto: Product) => {
    dispatch({ type: 'ADD_TO_CART', payload: produto });
  }, []);

  /**
   * Atualiza a quantidade de um item no carrinho
   */
  const updateQuantity = useCallback((productId: string, quantidade: number) => {
    if (quantidade <= 0) {
      dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
    } else {
      dispatch({ 
        type: 'UPDATE_QUANTITY', 
        payload: { productId, quantidade } 
      });
    }
  }, []);

  /**
   * Remove um produto do carrinho
   */
  const removeFromCart = useCallback((productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  }, []);

  /**
   * Limpa todo o carrinho
   */
  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
    clearCartFromStorage();
  }, []);

  /**
   * Retorna o total de itens no carrinho
   */
  const getTotalItems = useCallback((): number => {
    return calculateTotalItems(state.items);
  }, [state.items]);

  /**
   * Retorna o preço total do carrinho
   */
  const getTotalPrice = useCallback((): number => {
    return calculateTotalPrice(state.items);
  }, [state.items]);

  /**
   * Verifica se um produto está no carrinho
   */
  const isInCart = useCallback((productId: string): boolean => {
    return isProductInCart(state.items, productId);
  }, [state.items]);

  /**
   * Retorna um item específico do carrinho
   */
  const getCartItem = useCallback((productId: string): CartItem | undefined => {
    return findCartItem(state.items, productId);
  }, [state.items]);

  /**
   * Valor do contexto
   */
  const contextValue: CartContextType = {
    items: state.items,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotalItems,
    getTotalPrice,
    isInCart,
    getCartItem
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}