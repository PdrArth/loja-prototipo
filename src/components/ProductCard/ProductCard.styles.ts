/**
 * Classes CSS para o componente ProductCard
 */

export const cardClasses = [
  'bg-white',
  'rounded-lg',
  'shadow-md',
  'overflow-hidden',
  'transition-all',
  'duration-300',
  'hover:shadow-lg',
  'hover:scale-105',
  'group',
  'cursor-pointer'
].join(' ');

export const imageContainerClasses = [
  'relative',
  'w-full',
  'h-48',
  'sm:h-56',
  'md:h-64',
  'overflow-hidden',
  'bg-gray-100'
].join(' ');

export const imageClasses = [
  'object-cover',
  'transition-transform',
  'duration-300',
  'group-hover:scale-110'
].join(' ');

export const contentClasses = [
  'p-4',
  'space-y-3'
].join(' ');

export const titleClasses = [
  'text-lg',
  'font-semibold',
  'text-gray-900',
  'truncate',
  'group-hover:text-blue-600',
  'transition-colors',
  'duration-200'
].join(' ');

export const priceClasses = [
  'text-xl',
  'font-bold',
  'text-green-600'
].join(' ');

export const buttonContainerClasses = [
  'mt-4'
].join(' ');