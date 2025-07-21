import { BadgeVariant, BadgeSize } from './Badge.types';

/**
 * Classes base do badge
 */
export const baseClasses = [
  'inline-flex',
  'items-center',
  'justify-center',
  'font-medium',
  'rounded-full',
  'text-center'
].join(' ');

/**
 * Classes para variantes do badge
 */
export const variantClasses: Record<BadgeVariant, string> = {
  primary: 'bg-primary-100 text-primary-800',
  secondary: 'bg-secondary-100 text-secondary-800',
  success: 'bg-green-100 text-green-800',
  warning: 'bg-yellow-100 text-yellow-800',
  danger: 'bg-red-100 text-red-800',
  info: 'bg-blue-100 text-blue-800'
};

/**
 * Classes para tamanhos do badge
 */
export const sizeClasses: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
  lg: 'px-3 py-1.5 text-base'
};