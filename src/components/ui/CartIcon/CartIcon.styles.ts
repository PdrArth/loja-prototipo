import { CartIconSize } from './CartIcon.types';

/**
 * Classes base do ícone do carrinho
 */
export const baseClasses = [
  'relative',
  'inline-flex',
  'items-center',
  'justify-center',
  'cursor-pointer',
  'transition-colors',
  'duration-200',
  'hover:text-primary-600'
].join(' ');

/**
 * Classes para tamanhos do ícone
 */
export const sizeClasses: Record<CartIconSize, string> = {
  sm: 'h-5 w-5',
  md: 'h-6 w-6',
  lg: 'h-8 w-8'
};

/**
 * Classes para o badge de contagem
 */
export const badgeClasses = [
  'absolute',
  '-top-2',
  '-right-2',
  'bg-primary-600',
  'text-white',
  'text-xs',
  'font-bold',
  'rounded-full',
  'h-5',
  'w-5',
  'flex',
  'items-center',
  'justify-center',
  'min-w-[1.25rem]'
].join(' ');

/**
 * Classes para badge com números grandes
 */
export const largeBadgeClasses = [
  'absolute',
  '-top-2',
  '-right-2',
  'bg-primary-600',
  'text-white',
  'text-xs',
  'font-bold',
  'rounded-full',
  'px-1.5',
  'py-0.5',
  'min-w-[1.25rem]',
  'h-5',
  'flex',
  'items-center',
  'justify-center'
].join(' ');

/**
 * Classes para animação do badge
 */
export const badgeAnimationClasses = 'animate-pulse';