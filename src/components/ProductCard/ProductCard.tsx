'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/css-utils';
import { formatPrice } from '@/lib/formatters';
import { Button } from '@/components/ui/Button';
import { ProductCardProps } from './ProductCard.types';
import {
  cardClasses,
  imageContainerClasses,
  imageClasses,
  contentClasses,
  titleClasses,
  priceClasses,
  buttonContainerClasses
} from './ProductCard.styles';
import { ProductImage } from '@/components/ui/ProductImage';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { EyeIcon } from '@heroicons/react/24/outline';
import { ImageZoom } from '@/components/ImageZoom';

/**
 * Componente ProductCard - Exibe um produto em formato de card
 * com imagem, nome, preço e botão para ver detalhes
 */
export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  className, 
  onBuy,
  onAddToCart,
  onView
}) => {
  return (
    <div className={cn(cardClasses, className)}>
      <div className="relative group">
        <button
          className="absolute top-2 right-2 z-10 bg-white/80 rounded-full p-1.5 shadow hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
          aria-label={`Ver detalhes de ${product.nome}`}
          onClick={() => onView ? onView(product) : null}
        >
          <EyeIcon className="w-5 h-5 text-gray-700" />
        </button>
        <button
          className="absolute top-2 left-2 z-10 bg-white/80 rounded-full p-1.5 shadow hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
          aria-label={`Adicionar ${product.nome} ao carrinho`}
          onClick={() => onAddToCart ? onAddToCart(product) : null}
        >
          <ShoppingCartIcon className="w-5 h-5 text-gray-700" />
        </button>
        <Link href={`/produto/${product.id}`} tabIndex={-1} className="block">
          <div className={imageContainerClasses}>
            <ImageZoom
              src={product.imagem}
              alt={product.nome}
              className="w-full h-full"
            />
          </div>
        </Link>
      </div>
      <div className={contentClasses}>
        <h3 className={titleClasses}>{product.nome}</h3>

        {/* Informações adicionais */}
        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
          {product.marca && <span>{product.marca}</span>}
          {product.rating && (
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>{product.rating}</span>
            </div>
          )}
        </div>

        <p className={priceClasses}>{formatPrice(product.preco)}</p>

        <div className={buttonContainerClasses + ' flex flex-col gap-2 mt-4'}>
          <button
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 rounded-lg shadow transition text-base focus:outline-none focus:ring-2 focus:ring-primary-500"
            onClick={() => onBuy && onBuy(product)}
            aria-label={`Comprar ${product.nome}`}
          >
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
};

ProductCard.displayName = 'ProductCard';