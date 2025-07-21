'use client';

import React, { useState } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { SearchBar } from '@/components/SearchBar';
import { FilterPanel } from '@/components/FilterPanel';
import { SortOptions, SortOptionsDropdown } from '@/components/SortOptions';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useCart } from '@/hooks/useCart';
import { useProductFilters } from '@/hooks/useProductFilters';
import { useRouter } from 'next/navigation';
import { Product } from '@/types/Product';
import { useToast } from '@/components/ui/Toast/ToastContext';

export function ProdutosPageContent() {
  const [showFilters, setShowFilters] = useState(false);
  const { addToCart } = useCart();
  const router = useRouter();
  const { showToast } = useToast();

  // Hook para gerenciar filtros e busca
  const {
    filters,
    sortBy,
    isLoading,
    filteredProducts,
    totalProducts,
    hasActiveFilters,
    applyFilters,
    applySorting,
    clearFilters
  } = useProductFilters();

  function handleView(product: Product) {
    router.push(`/produto/${product.id}`);
  }

  function handleAddToCart(product: Product) {
    addToCart(product);
    showToast('Produto adicionado ao carrinho!', 'success');
  }

  function handleBuy(product: Product) {
    addToCart(product);
    router.push('/checkout');
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Header da página */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-custom py-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Produtos</h1>

          {/* Barra de busca */}
          <SearchBar
            placeholder="Buscar produtos, marcas..."
            className="max-w-2xl"
          />
        </div>
      </div>

      <div className="container-custom py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filtros laterais - Desktop */}
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <FilterPanel
              filters={filters}
              onFiltersChange={applyFilters}
            />
          </aside>

          {/* Conteúdo principal */}
          <main className="flex-1">
            {/* Barra de controles mobile */}
            <div className="flex lg:hidden items-center justify-between mb-4 gap-2">
              <button
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg font-medium shadow-sm hover:bg-gray-50 transition"
                onClick={() => setShowFilters(true)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
                </svg>
                Filtros
                {hasActiveFilters && (
                  <span className="bg-primary-600 text-white text-xs px-2 py-0.5 rounded-full">
                    •
                  </span>
                )}
              </button>

              <SortOptionsDropdown
                sortBy={sortBy}
                onSortChange={applySorting}
                className="flex-1 max-w-xs"
              />
            </div>

            {/* Barra de controles desktop */}
            <div className="hidden lg:flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <p className="text-sm text-gray-600">
                  {isLoading ? 'Carregando...' : `${totalProducts} produto${totalProducts !== 1 ? 's' : ''} encontrado${totalProducts !== 1 ? 's' : ''}`}
                </p>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Limpar filtros
                  </button>
                )}
              </div>

              <SortOptions
                sortBy={sortBy}
                onSortChange={applySorting}
              />
            </div>

            {/* Grid de produtos */}
            <div className="relative">
              {isLoading && (
                <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600"></div>
                    <span className="text-gray-600">Carregando produtos...</span>
                  </div>
                </div>
              )}

              {filteredProducts.length === 0 && !isLoading ? (
                <div className="text-center py-12">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.5-.935-6.072-2.456M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m3 5.197V9a3 3 0 00-6 0v8.001" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhum produto encontrado</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Tente ajustar os filtros ou fazer uma nova busca.
                  </p>
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200"
                    >
                      Limpar filtros
                    </button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onView={handleView}
                      onAddToCart={handleAddToCart}
                      onBuy={handleBuy}
                    />
                  ))}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      {/* Modal de filtros para mobile */}
      <Transition.Root show={showFilters} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={setShowFilters}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-50 flex">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-300"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-200"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative w-full max-w-sm bg-white h-full shadow-xl flex flex-col">
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                  <Dialog.Title className="text-lg font-semibold text-gray-900">
                    Filtros
                  </Dialog.Title>
                  <button
                    type="button"
                    className="p-2 -m-2 text-gray-400 hover:text-gray-500"
                    onClick={() => setShowFilters(false)}
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                  <FilterPanel
                    filters={filters}
                    onFiltersChange={(newFilters) => {
                      applyFilters(newFilters);
                      setShowFilters(false);
                    }}
                    className="border-0 shadow-none"
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
