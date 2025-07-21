'use client';

import React, { useState } from 'react';
import { ProductFilters } from '@/types/Product';
import { categories } from '@/data/categories';
import { getAvailableBrands, getPriceRange } from '@/data/products';
import { formatPrice } from '@/lib/formatters';

interface FilterPanelProps {
  filters: ProductFilters;
  onFiltersChange: (filters: ProductFilters) => void;
  className?: string;
}

export function FilterPanel({ filters, onFiltersChange, className = "" }: FilterPanelProps) {
  const [priceRange] = useState(getPriceRange());
  const [availableBrands] = useState(getAvailableBrands());
  
  const handleCategoryChange = (categoria: string) => {
    onFiltersChange({
      ...filters,
      categoria: categoria === filters.categoria ? undefined : categoria
    });
  };

  const handleBrandChange = (marca: string) => {
    onFiltersChange({
      ...filters,
      marca: marca === filters.marca ? undefined : marca
    });
  };

  const handlePriceChange = (min?: number, max?: number) => {
    onFiltersChange({
      ...filters,
      precoMin: min,
      precoMax: max
    });
  };

  const handleRatingChange = (rating: number) => {
    onFiltersChange({
      ...filters,
      ratingMin: rating === filters.ratingMin ? undefined : rating
    });
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  const hasActiveFilters = Object.keys(filters).some(key => 
    filters[key as keyof ProductFilters] !== undefined
  );

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Filtros</h3>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              Limpar filtros
            </button>
          )}
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Categorias */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Categorias</h4>
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category.id} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.categoria === category.slug}
                  onChange={() => handleCategoryChange(category.slug)}
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-700 flex items-center gap-2">
                  <span>{category.icone}</span>
                  {category.nome}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Faixa de Preço */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Preço</h4>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Min"
                value={filters.precoMin || ''}
                onChange={(e) => handlePriceChange(
                  e.target.value ? Number(e.target.value) : undefined,
                  filters.precoMax
                )}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <span className="text-gray-500">até</span>
              <input
                type="number"
                placeholder="Max"
                value={filters.precoMax || ''}
                onChange={(e) => handlePriceChange(
                  filters.precoMin,
                  e.target.value ? Number(e.target.value) : undefined
                )}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div className="text-xs text-gray-500">
              Faixa: {formatPrice(priceRange.min)} - {formatPrice(priceRange.max)}
            </div>
            
            {/* Faixas de preço predefinidas */}
            <div className="space-y-2">
              {[
                { label: 'Até R$ 100', max: 100 },
                { label: 'R$ 100 - R$ 200', min: 100, max: 200 },
                { label: 'R$ 200 - R$ 300', min: 200, max: 300 },
                { label: 'Acima de R$ 300', min: 300 }
              ].map((range, index) => (
                <label key={index} className="flex items-center">
                  <input
                    type="radio"
                    name="priceRange"
                    checked={filters.precoMin === range.min && filters.precoMax === range.max}
                    onChange={() => handlePriceChange(range.min, range.max)}
                    className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{range.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Marcas */}
        {availableBrands.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Marcas</h4>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {availableBrands.map((brand) => (
                <label key={brand} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.marca === brand}
                    onChange={() => handleBrandChange(brand)}
                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{brand}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Avaliação */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Avaliação</h4>
          <div className="space-y-2">
            {[4, 3, 2, 1].map((rating) => (
              <label key={rating} className="flex items-center">
                <input
                  type="radio"
                  name="rating"
                  checked={filters.ratingMin === rating}
                  onChange={() => handleRatingChange(rating)}
                  className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                />
                <span className="ml-2 flex items-center gap-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${
                        i < rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-sm text-gray-600 ml-1">
                    {rating}+ estrelas
                  </span>
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
