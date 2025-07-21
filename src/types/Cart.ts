import { Product, CartItem } from './Product';

/**
 * Interface para o contexto do carrinho
 */
export interface CartContextType {
  items: CartItem[];
  addToCart: (produto: Product) => void;
  updateQuantity: (productId: string, quantidade: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  isInCart: (productId: string) => boolean;
  getCartItem: (productId: string) => CartItem | undefined;
}

/**
 * Ações do carrinho para o reducer
 */
export type CartAction =
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantidade: number } }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] };

/**
 * Estado do carrinho
 */
export interface CartState {
  items: CartItem[];
}

/**
 * Configurações do carrinho
 */
export interface CartConfig {
  maxQuantity: number;
  minQuantity: number;
  storageKey: string;
}