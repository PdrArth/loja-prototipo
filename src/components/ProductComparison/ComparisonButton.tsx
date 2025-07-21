'use client';

import React from 'react';
import { useComparison } from '@/contexts/ComparisonContext';
import { Product } from '@/types/Product';

interface ComparisonButtonProps {
  product: Product;
  className?: string;
}

export function ComparisonButton({ product, className = "" }: ComparisonButtonProps) {
  const { addToComparison, removeFromComparison, isInComparison, canAddMore } = useComparison();
  
  const inComparison = isInComparison(product.id);

  const handleClick = () => {
    if (inComparison) {
      removeFromComparison(product.id);
    } else if (canAddMore) {
      addToComparison(product);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={!inComparison && !canAddMore}
      className={`
        flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors
        ${inComparison 
          ? 'bg-primary-100 text-primary-700 hover:bg-primary-200' 
          : canAddMore
            ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            : 'bg-gray-50 text-gray-400 cursor-not-allowed'
        }
        ${className}
      `}
      title={
        inComparison 
          ? 'Remover da comparação' 
          : canAddMore 
            ? 'Adicionar à comparação'
            : 'Limite de comparação atingido'
      }
    >
      <svg 
        className="w-4 h-4" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" 
        />
      </svg>
      {inComparison ? 'Na comparação' : 'Comparar'}
    </button>
  );
}

// Botão flutuante para mostrar comparação
interface ComparisonFloatingButtonProps {
  onClick: () => void;
}

export function ComparisonFloatingButton({ onClick }: ComparisonFloatingButtonProps) {
  const { comparisonItems } = useComparison();

  if (comparisonItems.length === 0) {
    return null;
  }

  return (
    <button
      onClick={onClick}
      className="fixed bottom-4 right-4 z-40 bg-primary-600 text-white rounded-full p-4 shadow-lg hover:bg-primary-700 transition-colors"
      title="Ver comparação"
    >
      <div className="relative">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        {comparisonItems.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {comparisonItems.length}
          </span>
        )}
      </div>
    </button>
  );
}
