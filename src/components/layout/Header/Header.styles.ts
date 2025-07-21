/**
 * Classes de estilo para o Header
 */

/**
 * Classes base do header
 */
export const headerBaseClasses = [
  'fixed',
  'top-0',
  'left-0',
  'right-0',
  'z-50',
  'bg-white',
  'shadow-md',
  'border-b',
  'border-gray-200'
].join(' ');

/**
 * Classes do container do header
 */
export const headerContainerClasses = [
  'container-custom',
  'flex',
  'items-center',
  'justify-between',
  'h-16',
  'py-4'
].join(' ');

/**
 * Classes da seção esquerda (logo)
 */
export const headerLeftClasses = [
  'flex',
  'items-center',
  'space-x-4'
].join(' ');

/**
 * Classes da seção direita (navegação)
 */
export const headerRightClasses = [
  'flex',
  'items-center',
  'space-x-4'
].join(' ');

/**
 * Classes do logo
 */
export const logoClasses = [
  'text-primary-600',
  'font-bold',
  'text-xl',
  'md:text-2xl',
  'hover:text-primary-700',
  'transition-colors',
  'duration-200',
  'cursor-pointer'
].join(' ');

/**
 * Classes do subtítulo do logo
 */
export const logoSubtitleClasses = [
  'text-gray-600',
  'text-sm',
  'hidden',
  'sm:block'
].join(' ');

/**
 * Classes para espaçamento do body (para compensar header fixo)
 */
export const bodySpacingClasses = 'pt-16';