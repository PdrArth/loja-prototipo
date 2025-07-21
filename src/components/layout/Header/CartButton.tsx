'use client';

import React from 'react';
import Link from 'next/link';
import { CartIcon } from '@/components/ui/CartIcon';
import { useCart } from '@/hooks/useCart';
import { cn } from '@/lib/css-utils';

/**
 * Props do componente CartButton
 */
interface CartButtonProps {
  className?: string;
  iconSize?: number;
}

/**
 * Componente CartButton - Botão do carrinho no header
 */
export function CartButton({ className, iconSize }: CartButtonProps) {
  const { getTotalItems } = useCart();
  const itemCount = getTotalItems();

  const buttonClasses = cn(
    'relative',
    'p-2',
    'rounded-lg',
    'hover:bg-gray-100',
    'transition-colors',
    'duration-200',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-primary-500',
    'focus:ring-offset-2',
    className
  );

  return (
    <Link href="/carrinho" className={buttonClasses} aria-label={`Carrinho com ${itemCount} itens`}>
      <CartIcon 
        size={iconSize ? undefined : 'md'}
        {...(iconSize ? { style: { width: iconSize, height: iconSize } } : {})}
        itemCount={itemCount}
        showBadge={true}
      />
    </Link>
  );
}

/**
 * Fallback do CartButton para ser usado durante a hidratação
 */
export function CartButtonFallback({ className, iconSize }: CartButtonProps) {
  const buttonClasses = cn(
    'relative',
    'p-2',
    'rounded-lg',
    'hover:bg-gray-100',
    'transition-colors',
    'duration-200',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-primary-500',
    'focus:ring-offset-2',
    className
  );

  return (
    <Link href="/carrinho" className={buttonClasses} aria-label="Carrinho">
      <CartIcon 
        size={iconSize ? undefined : 'md'}
        {...(iconSize ? { style: { width: iconSize, height: iconSize } } : {})}
        itemCount={0}
        showBadge={false}
      />
    </Link>
  );
}