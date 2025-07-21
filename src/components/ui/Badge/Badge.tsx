'use client';

import React from 'react';
import { cn } from '@/lib/css-utils';
import { BadgeProps } from './Badge.types';
import { baseClasses, variantClasses, sizeClasses } from './Badge.styles';

/**
 * Componente Badge
 */
export function Badge({
  variant = 'primary',
  size = 'md',
  className,
  children
}: BadgeProps) {
  const badgeClasses = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  return (
    <span className={badgeClasses}>
      {children}
    </span>
  );
}