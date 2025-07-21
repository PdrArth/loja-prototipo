import { ButtonVariant, ButtonSize } from './Button.types';

/**
 * Classes base do botão
 */
export const baseClasses = [
  'inline-flex',
  'items-center',
  'justify-center',
  'font-medium',
  'rounded-lg',
  'transition-all',
  'duration-200',
  'focus:outline-none',
  'focus:ring-2',
  'focus:ring-offset-2',
  'disabled:opacity-50',
  'disabled:cursor-not-allowed',
  'disabled:pointer-events-none'
].join(' ');

/**
 * Classes para variantes do botão
 */
export const variantClasses: Record<ButtonVariant, string> = {
  primary: [
    'bg-primary-600',
    'hover:bg-primary-700',
    'active:bg-primary-800',
    'text-white',
    'focus:ring-primary-500'
  ].join(' '),
  
  secondary: [
    'bg-secondary-100',
    'hover:bg-secondary-200',
    'active:bg-secondary-300',
    'text-secondary-800',
    'focus:ring-secondary-500'
  ].join(' '),
  
  danger: [
    'bg-red-600',
    'hover:bg-red-700',
    'active:bg-red-800',
    'text-white',
    'focus:ring-red-500'
  ].join(' '),
  
  outline: [
    'border-2',
    'border-primary-600',
    'text-primary-600',
    'hover:bg-primary-50',
    'active:bg-primary-100',
    'focus:ring-primary-500'
  ].join(' '),
  
  ghost: [
    'text-gray-700',
    'hover:bg-gray-100',
    'active:bg-gray-200',
    'focus:ring-gray-500'
  ].join(' ')
};

/**
 * Classes para tamanhos do botão
 */
export const sizeClasses: Record<ButtonSize, string> = {
  xs: 'px-2 py-1 text-xs',
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
  xl: 'px-8 py-4 text-lg'
};

/**
 * Classes para estado de loading
 */
export const loadingClasses = 'cursor-wait opacity-75';

/**
 * Classes para botão full width
 */
export const fullWidthClasses = 'w-full';