'use client';

import React from 'react';
import { cn } from '@/lib/css-utils';
import { CartIconProps } from './CartIcon.types';
import { 
  baseClasses, 
  sizeClasses, 
  badgeClasses, 
  largeBadgeClasses,
  badgeAnimationClasses 
} from './CartIcon.styles';

/**
 * Componente CartIcon
 */
export function CartIcon({
  size = 'md',
  itemCount = 0,
  onClick,
  className,
  showBadge = true
}: CartIconProps) {
  const iconClasses = cn(
    baseClasses,
    className
  );

  const svgClasses = cn(
    sizeClasses[size]
  );

  const shouldShowBadge = showBadge && itemCount > 0;
  const badgeText = itemCount > 99 ? '99+' : itemCount.toString();
  const isLargeNumber = itemCount > 9;

  const badgeClassNames = cn(
    isLargeNumber ? largeBadgeClasses : badgeClasses,
    itemCount > 0 && badgeAnimationClasses
  );

  return (
    <div className={iconClasses} onClick={onClick}>
      <svg
        className={svgClasses}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Novo SVG minimalista de carrinho */}
        <circle cx="9" cy="21" r="1.5" />
        <circle cx="18" cy="21" r="1.5" />
        <path d="M3 5h2l.4 2M7 7h13l-1.5 8H8.5L7 7zm0 0L5.4 5M7 7l1.5 8m0 0h8.5" strokeWidth="1.7" />
      </svg>
      {shouldShowBadge && (
        <span className={badgeClassNames}>
          {badgeText}
        </span>
      )}
    </div>
  );
}