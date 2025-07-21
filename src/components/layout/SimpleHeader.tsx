'use client';

import React from 'react';
import Link from 'next/link';
import { SearchBar } from './Header/SearchBar';

/**
 * Componente Header Simplificado (temporário)
 */
export function SimpleHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md border-b border-gray-200">
      <div className="container-custom flex items-center justify-between h-16 py-4 gap-4">
        {/* Logo */}
        <Link href="/" className="flex flex-col">
          <h1 className="text-primary-600 font-bold text-xl md:text-2xl hover:text-primary-700 transition-colors duration-200">
            Valentina Shoes
          </h1>
          <p className="text-gray-600 text-sm hidden sm:block">
            Calçados, Bolsas e Acessórios
          </p>
        </Link>

        {/* SearchBar centralizado */}
        <div className="flex-1 flex justify-center">
          <SearchBar />
        </div>

        {/* Navegação Simples */}
        <nav className="hidden md:flex items-center space-x-4">
          <Link href="/" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
            Início
          </Link>
          <Link href="/produtos" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
            Produtos
          </Link>
          <Link href="/carrinho" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
            Carrinho
          </Link>
        </nav>
      </div>
    </header>
  );
}