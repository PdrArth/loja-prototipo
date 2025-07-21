import { SpinnerSize, SpinnerVariant } from './LoadingSpinner.types';

/**
 * Classes base do spinner
 */
export const baseClasses = 'animate-spin';

/**
 * Classes para tamanhos do spinner
 */
export const sizeClasses: Record<SpinnerSize, string> = {
  xs: 'h-3 w-3',
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
  xl: 'h-12 w-12'
};

/**
 * Classes para variantes do spinner
 */
export const variantClasses: Record<SpinnerVariant, string> = {
  primary: 'text-primary-600',
  secondary: 'text-secondary-600',
  white: 'text-white',
  gray: 'text-gray-600'
};

/**
 * Classes para o container do spinner
 */
export const containerClasses = 'inline-flex items-center justify-center';

/**
 * Classes para o label
 */
export const labelClasses = 'ml-2 text-sm text-gray-600';