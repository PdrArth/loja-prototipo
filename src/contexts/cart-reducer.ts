import { CartState, CartAction } from '@/types/Cart';
import {
  addProductToCart,
  updateCartItemQuantity,
  removeProductFromCart,
  clearAllCartItems
} from '@/lib/cart-utils';

/**
 * Reducer para gerenciar o estado do carrinho
 */
export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        items: addProductToCart(state.items, action.payload)
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: updateCartItemQuantity(
          state.items,
          action.payload.productId,
          action.payload.quantidade
        )
      };

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: removeProductFromCart(state.items, action.payload)
      };

    case 'CLEAR_CART':
      return {
        ...state,
        items: clearAllCartItems()
      };

    case 'LOAD_CART':
      return {
        ...state,
        items: action.payload
      };

    default:
      return state;
  }
}