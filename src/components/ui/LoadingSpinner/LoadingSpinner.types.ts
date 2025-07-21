/**
 * Tamanhos do spinner
 */
export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Variantes do spinner
 */
export type SpinnerVariant = 'primary' | 'secondary' | 'white' | 'gray';

/**
 * Props do componente LoadingSpinner
 */
export interface LoadingSpinnerProps {
  size?: SpinnerSize;
  variant?: SpinnerVariant;
  className?: string;
  label?: string;
}