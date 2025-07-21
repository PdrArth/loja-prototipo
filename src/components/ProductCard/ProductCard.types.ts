import { Product } from '@/types/Product';

/**
 * Props do componente ProductCard
 */
export interface ProductCardProps {
  product: Product;
  className?: string;
  onBuy?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
  onView?: (product: Product) => void;
}