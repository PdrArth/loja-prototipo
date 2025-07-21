/**
 * Tamanhos do ícone do carrinho
 */
export type CartIconSize = 'sm' | 'md' | 'lg';

/**
 * Props do componente CartIcon
 */
export interface CartIconProps {
  size?: CartIconSize;
  itemCount?: number;
  onClick?: () => void;
  className?: string;
  showBadge?: boolean;
}