/**
 * Classes CSS para o componente CartItem
 */

export const containerClasses = [
  'flex',
  'items-center',
  'gap-4',
  'p-4',
  'bg-white',
  'border',
  'border-gray-200',
  'rounded-lg',
  'shadow-sm',
  'hover:shadow-md',
  'transition-shadow',
  'duration-200'
].join(' ');

export const imageContainerClasses = [
  'relative',
  'w-16',
  'h-16',
  'sm:w-20',
  'sm:h-20',
  'flex-shrink-0',
  'rounded-md',
  'overflow-hidden',
  'bg-gray-100'
].join(' ');

export const imageClasses = [
  'object-cover',
  'transition-transform',
  'duration-200',
  'hover:scale-105'
].join(' ');

export const contentClasses = [
  'flex-1',
  'min-w-0'
].join(' ');

export const titleClasses = [
  'text-sm',
  'sm:text-base',
  'font-medium',
  'text-gray-900',
  'truncate',
  'mb-1'
].join(' ');

export const priceClasses = [
  'text-sm',
  'text-gray-600',
  'mb-2'
].join(' ');

export const controlsClasses = [
  'flex',
  'items-center',
  'gap-2',
  'sm:gap-3'
].join(' ');

export const quantityControlsClasses = [
  'flex',
  'items-center',
  'gap-1',
  'sm:gap-2'
].join(' ');

export const quantityButtonClasses = [
  'w-8',
  'h-8',
  'flex',
  'items-center',
  'justify-center',
  'rounded-md',
  'border',
  'border-gray-300',
  'bg-white',
  'text-gray-700',
  'hover:bg-gray-50',
  'hover:border-gray-400',
  'focus:outline-none',
  'focus:ring-2',
  'focus:ring-blue-500',
  'focus:ring-offset-1',
  'disabled:opacity-50',
  'disabled:cursor-not-allowed',
  'disabled:hover:bg-white',
  'disabled:hover:border-gray-300',
  'transition-colors',
  'duration-150'
].join(' ');

export const quantityDisplayClasses = [
  'w-12',
  'text-center',
  'text-sm',
  'font-medium',
  'text-gray-900'
].join(' ');

export const removeButtonClasses = [
  'text-red-600',
  'hover:text-red-700',
  'focus:outline-none',
  'focus:ring-2',
  'focus:ring-red-500',
  'focus:ring-offset-1',
  'rounded-md',
  'p-1',
  'transition-colors',
  'duration-150'
].join(' ');

export const subtotalClasses = [
  'text-right',
  'flex-shrink-0'
].join(' ');

export const subtotalLabelClasses = [
  'text-xs',
  'text-gray-500',
  'block',
  'mb-1'
].join(' ');

export const subtotalValueClasses = [
  'text-sm',
  'sm:text-base',
  'font-semibold',
  'text-gray-900'
].join(' ');