'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Product, ProductFilters, SortBy } from '@/types/Product';
import { filterAndSortProducts } from '@/data/products';

export function useProductFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Estado dos filtros
  const [filters, setFilters] = useState<ProductFilters>({});
  const [sortBy, setSortBy] = useState<SortBy>('relevancia');
  const [isLoading, setIsLoading] = useState(false);

  // Inicializar filtros a partir da URL
  useEffect(() => {
    const urlFilters: ProductFilters = {};
    
    // Busca
    const busca = searchParams.get('busca');
    if (busca) urlFilters.busca = busca;
    
    // Categoria
    const categoria = searchParams.get('categoria');
    if (categoria) urlFilters.categoria = categoria;
    
    // Marca
    const marca = searchParams.get('marca');
    if (marca) urlFilters.marca = marca;
    
    // Preço
    const precoMin = searchParams.get('precoMin');
    if (precoMin) urlFilters.precoMin = Number(precoMin);
    
    const precoMax = searchParams.get('precoMax');
    if (precoMax) urlFilters.precoMax = Number(precoMax);
    
    // Rating
    const ratingMin = searchParams.get('ratingMin');
    if (ratingMin) urlFilters.ratingMin = Number(ratingMin);
    
    // Ordenação
    const sort = searchParams.get('sort') as SortBy;
    if (sort) setSortBy(sort);
    
    setFilters(urlFilters);
  }, [searchParams]);

  // Atualizar URL quando filtros mudarem
  const updateURL = (newFilters: ProductFilters, newSortBy?: SortBy) => {
    const params = new URLSearchParams();
    
    // Adicionar filtros à URL
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        params.set(key, String(value));
      }
    });
    
    // Adicionar ordenação
    const currentSort = newSortBy || sortBy;
    if (currentSort !== 'relevancia') {
      params.set('sort', currentSort);
    }
    
    // Navegar para nova URL
    const newURL = params.toString() ? `/produtos?${params.toString()}` : '/produtos';
    router.push(newURL, { scroll: false });
  };

  // Aplicar filtros
  const applyFilters = (newFilters: ProductFilters) => {
    setIsLoading(true);
    setFilters(newFilters);
    updateURL(newFilters);
    
    // Simular delay de carregamento
    setTimeout(() => setIsLoading(false), 300);
  };

  // Aplicar ordenação
  const applySorting = (newSortBy: SortBy) => {
    setIsLoading(true);
    setSortBy(newSortBy);
    updateURL(filters, newSortBy);
    
    // Simular delay de carregamento
    setTimeout(() => setIsLoading(false), 300);
  };

  // Limpar filtros
  const clearFilters = () => {
    const clearedFilters: ProductFilters = {};
    setFilters(clearedFilters);
    setSortBy('relevancia');
    router.push('/produtos');
  };

  // Produtos filtrados e ordenados
  const filteredProducts = useMemo(() => {
    return filterAndSortProducts(filters, sortBy);
  }, [filters, sortBy]);

  // Contadores
  const totalProducts = filteredProducts.length;
  const hasActiveFilters = Object.keys(filters).some(key => 
    filters[key as keyof ProductFilters] !== undefined
  );

  return {
    // Estado
    filters,
    sortBy,
    isLoading,
    
    // Dados
    filteredProducts,
    totalProducts,
    hasActiveFilters,
    
    // Ações
    applyFilters,
    applySorting,
    clearFilters,
    setFilters,
    setSortBy
  };
}

// Hook para busca rápida
export function useProductSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const performSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    
    // Simular delay de busca
    setTimeout(() => {
      const results = filterAndSortProducts({ busca: query }, 'relevancia');
      setSearchResults(results);
      setIsSearching(false);
    }, 200);
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      performSearch(searchQuery);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    performSearch
  };
}
