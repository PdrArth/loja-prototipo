/**
 * Variantes do badge
 */
export type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';

/**
 * Tamanhos do badge
 */
export type BadgeSize = 'sm' | 'md' | 'lg';

/**
 * Props do componente Badge
 */
export interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
  children: React.ReactNode;
}