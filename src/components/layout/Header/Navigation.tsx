'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/css-utils';
import { NavigationProps } from './Header.types';

/**
 * Links de navegação
 */
const navigationLinks = [
  { href: '/', label: 'Início' },
  { href: '/produtos', label: 'Produtos' },
  { href: '/sobre', label: 'Sobre' },
  { href: '/contato', label: 'Contato' }
];

/**
 * Classes para links de navegação
 */
const navLinkClasses = [
  'text-gray-700',
  'hover:text-primary-600',
  'px-3',
  'py-2',
  'rounded-md',
  'text-sm',
  'font-medium',
  'transition-colors',
  'duration-200',
  'focus:outline-none',
  'focus:ring-2',
  'focus:ring-primary-500',
  'focus:ring-offset-2'
].join(' ');

/**
 * Componente Navigation - Links de navegação do header
 */
export function Navigation({ className }: NavigationProps) {
  return (
    <nav className={cn('hidden md:flex items-center space-x-1', className)}>
      {navigationLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={navLinkClasses}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}