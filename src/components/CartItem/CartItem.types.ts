import { CartItem } from '@/types/Product';

/**
 * Props do componente CartItem
 */
export interface CartItemProps {
  item: CartItem;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
  className?: string;
}