'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/css-utils';
import { LogoProps } from './Header.types';
import { logoClasses, logoSubtitleClasses } from './Header.styles';

/**
 * Componente Logo da Valentina Shoes
 */
export function Logo({ className, size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: 'text-lg md:text-xl',
    md: 'text-xl md:text-2xl',
    lg: 'text-2xl md:text-3xl'
  };

  return (
    <Link href="/" className={cn('flex flex-col', className)}>
      <h1 className={cn(logoClasses, sizeClasses[size])}>
        Valentina Shoes
      </h1>
      <p className={logoSubtitleClasses}>
        Calçados, Bolsas e Acessórios
      </p>
    </Link>
  );
}