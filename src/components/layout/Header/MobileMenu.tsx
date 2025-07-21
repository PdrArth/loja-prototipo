'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/css-utils';

/**
 * Props do componente MobileMenu
 */
interface MobileMenuProps {
  className?: string;
}

/**
 * Links de navegação mobile
 */
const mobileLinks = [
  { href: '/', label: 'Início' },
  { href: '/produtos', label: 'Produtos' },
  { href: '/sobre', label: 'Sobre' },
  { href: '/contato', label: 'Contato' }
];

/**
 * Componente MobileMenu - Menu mobile hamburger
 */
export function MobileMenu({ className }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const buttonClasses = cn(
    'md:hidden',
    'p-2',
    'rounded-lg',
    'hover:bg-gray-100',
    'transition-colors',
    'duration-200',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-primary-500',
    'focus:ring-offset-2'
  );

  const menuClasses = cn(
    'absolute',
    'top-full',
    'left-0',
    'right-0',
    'bg-white',
    'border-t',
    'border-gray-200',
    'shadow-lg',
    'md:hidden',
    isOpen ? 'block' : 'hidden'
  );

  const linkClasses = [
    'block',
    'px-4',
    'py-3',
    'text-gray-700',
    'hover:text-primary-600',
    'hover:bg-gray-50',
    'transition-colors',
    'duration-200',
    'border-b',
    'border-gray-100',
    'last:border-b-0'
  ].join(' ');

  return (
    <div className={cn('relative', className)}>
      <button
        onClick={toggleMenu}
        className={buttonClasses}
        aria-label="Menu de navegação"
        aria-expanded={isOpen}
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      <div className={menuClasses}>
        <nav className="py-2">
          {mobileLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={linkClasses}
              onClick={closeMenu}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Overlay para fechar menu ao clicar fora */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-25 md:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
    </div>
  );
}