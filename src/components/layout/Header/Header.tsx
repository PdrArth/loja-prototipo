'use client';

import React from 'react';
import { cn } from '@/lib/css-utils';
import { HeaderProps } from './Header.types';
import {
  headerBaseClasses,
  headerContainerClasses,
  headerLeftClasses,
  headerRightClasses
} from './Header.styles';
import { Logo } from './Logo';
import { Navigation } from './Navigation';
import { CartButton } from './CartButton';
import { MobileMenu } from './MobileMenu';
import { SearchIcon, UserIcon } from '@/components/ui';

// Componente MenuIcon simples
const MenuIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);
import { useState, useEffect, useRef } from 'react';
import { SearchBar } from '@/components/SearchBar';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

/**
 * Componente Header principal
 */
export function Header({ className }: HeaderProps) {
  const [showSearch, setShowSearch] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const router = useRouter();
  const userMenuRef = useRef<HTMLDivElement>(null);

  console.log('Header - user:', user, 'isAuthenticated:', isAuthenticated, 'isAdmin:', isAdmin);

  // Fechar menu do usuário quando clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    }

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showUserMenu]);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    router.push('/');
  };

  // Se for admin, não mostrar o header da loja
  if (isAdmin) {
    return null;
  }

  return (
    <header className={cn(headerBaseClasses, className)}>
      <div className={headerContainerClasses}>
        {/* Seção Esquerda - Logo */}
        <div className={headerLeftClasses}>
          <Logo />
        </div>

        {/* Seção Central - Navegação Desktop (apenas para clientes/visitantes) */}
        <nav className="hidden md:flex items-center space-x-1">
          <Navigation />
        </nav>

        {/* Seção Direita - Busca, Carrinho, Perfil, Menu Mobile */}
        <div className={headerRightClasses}>
          {/* Ícone de busca */}
          {!showSearch && (
            <button
              className="flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              aria-label="Buscar produtos"
              onClick={() => setShowSearch(true)}
            >
              <SearchIcon size={22} />
            </button>
          )}

          {/* Campo de busca inline (desktop e mobile) */}
          {showSearch && (
            <div className="flex items-center w-64 max-w-xs">
              <SearchBar
                placeholder="Buscar produtos..."
                className="flex-1"
              />
              <button
                className="ml-2 flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                aria-label="Fechar busca"
                onClick={() => setShowSearch(false)}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>
          )}

          {/* Carrinho */}
          <div className="flex items-center justify-center">
            <CartButton />
          </div>

          {/* Área do usuário */}
          {isAuthenticated ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                aria-label="Menu do usuário"
              >
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-medium text-sm">
                    {user?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="hidden sm:block text-sm font-medium text-gray-700">
                  {user?.name}
                </span>
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown do usuário */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>

                  <Link
                    href="/minha-conta"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Minha Conta
                  </Link>

                  <Link
                    href="/meus-pedidos"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    Meus Pedidos
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Sair
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Ícone de perfil para usuários não logados */
            <Link
              href="/login"
              className="flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              aria-label="Entrar ou criar conta"
            >
              <UserIcon size={22} />
            </Link>
          )}

          {/* Menu Mobile: só aparece no mobile */}
          <button
            className="flex md:hidden items-center justify-center p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            aria-label="Abrir menu"
            onClick={() => setShowMobileMenu(true)}
          >
            <MenuIcon size={22} />
          </button>
        </div>
      </div>
      {/* Menu lateral mobile */}
      {showMobileMenu && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="bg-black bg-opacity-30 flex-1" onClick={() => setShowMobileMenu(false)} />
          <div className="w-64 max-w-full bg-white h-full shadow-lg p-6 flex flex-col gap-4">
            <button className="self-end mb-4 p-2" onClick={() => setShowMobileMenu(false)} aria-label="Fechar menu">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>
            <a href="/" className="py-2 text-lg font-medium text-gray-800 hover:text-primary-600">Início</a>
            <a href="/produtos" className="py-2 text-lg font-medium text-gray-800 hover:text-primary-600">Produtos</a>
            <a href="/sobre" className="py-2 text-lg font-medium text-gray-800 hover:text-primary-600">Sobre</a>
            <a href="/contato" className="py-2 text-lg font-medium text-gray-800 hover:text-primary-600">Contato</a>
          </div>
        </div>
      )}
    </header>
  );
}

