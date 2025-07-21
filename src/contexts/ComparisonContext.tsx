'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { Product } from '@/types/Product';

interface ComparisonContextType {
  comparisonItems: Product[];
  addToComparison: (product: Product) => void;
  removeFromComparison: (productId: string) => void;
  clearComparison: () => void;
  isInComparison: (productId: string) => boolean;
  canAddMore: boolean;
  maxItems: number;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

interface ComparisonProviderProps {
  children: React.ReactNode;
  maxItems?: number;
}

export function ComparisonProvider({ children, maxItems = 3 }: ComparisonProviderProps) {
  const [comparisonItems, setComparisonItems] = useState<Product[]>([]);

  const addToComparison = useCallback((product: Product) => {
    setComparisonItems(prev => {
      // Não adicionar se já está na comparação
      if (prev.some(item => item.id === product.id)) {
        return prev;
      }
      
      // Não adicionar se já atingiu o limite
      if (prev.length >= maxItems) {
        return prev;
      }
      
      return [...prev, product];
    });
  }, [maxItems]);

  const removeFromComparison = useCallback((productId: string) => {
    setComparisonItems(prev => prev.filter(item => item.id !== productId));
  }, []);

  const clearComparison = useCallback(() => {
    setComparisonItems([]);
  }, []);

  const isInComparison = useCallback((productId: string) => {
    return comparisonItems.some(item => item.id === productId);
  }, [comparisonItems]);

  const canAddMore = comparisonItems.length < maxItems;

  const value: ComparisonContextType = {
    comparisonItems,
    addToComparison,
    removeFromComparison,
    clearComparison,
    isInComparison,
    canAddMore,
    maxItems
  };

  return (
    <ComparisonContext.Provider value={value}>
      {children}
    </ComparisonContext.Provider>
  );
}

export function useComparison() {
  const context = useContext(ComparisonContext);
  if (context === undefined) {
    throw new Error('useComparison must be used within a ComparisonProvider');
  }
  return context;
}
