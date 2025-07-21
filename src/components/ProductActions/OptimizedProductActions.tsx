'use client';

import React, { useState, useEffect } from 'react';
import { Product } from '@/types/Product';
import { formatPrice } from '@/lib/formatters';

interface OptimizedProductActionsProps {
  product: Product;
  selectedSize?: string;
  onAddToCart: () => void;
  onBuyNow: () => void;
  onAddToWishlist?: () => void;
  onShare?: () => void;
  isInWishlist?: boolean;
  className?: string;
}

export function OptimizedProductActions({
  product,
  selectedSize,
  onAddToCart,
  onBuyNow,
  onAddToWishlist,
  onShare,
  isInWishlist = false,
  className = ""
}: OptimizedProductActionsProps) {
  const [isSticky, setIsSticky] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      // Aparece quando rola mais de 30% da tela ou 300px
      setIsSticky(scrollPosition > Math.min(windowHeight * 0.3, 300));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const shareOptions = [
    {
      name: 'WhatsApp',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
        </svg>
      ),
      action: () => {
        const text = `Olha que produto incrível: ${product.nome} por ${formatPrice(product.preco)}`;
        const url = window.location.href;
        window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
      }
    },
    {
      name: 'Facebook',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      action: () => {
        const url = window.location.href;
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
      }
    },
    {
      name: 'Copiar Link',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      action: () => {
        navigator.clipboard.writeText(window.location.href);
        // Aqui você pode adicionar um toast de sucesso
      }
    }
  ];

  const handleShare = (option: typeof shareOptions[0]) => {
    option.action();
    setShowShareMenu(false);
    onShare?.();
  };

  return (
    <>
      {/* Desktop Actions */}
      <div className={`hidden md:block ${className}`}>
        <div className="space-y-4">
          {/* Price */}
          <div className="text-3xl font-bold text-gray-900">
            {formatPrice(product.preco)}
            {product.precoAntigo && (
              <span className="text-lg text-gray-500 line-through ml-2">
                {formatPrice(product.precoAntigo)}
              </span>
            )}
          </div>

          {/* Installments */}
          <div className="text-sm text-gray-600">
            ou 12x de {formatPrice(product.preco / 12)} sem juros
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={onBuyNow}
              disabled={!selectedSize}
              className="w-full bg-primary-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Comprar Agora
            </button>

            <button
              onClick={onAddToCart}
              disabled={!selectedSize}
              className="w-full border-2 border-primary-600 text-primary-600 py-4 px-6 rounded-lg font-semibold text-lg hover:bg-primary-50 disabled:border-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              Adicionar ao Carrinho
            </button>
          </div>

          {/* Secondary Actions */}
          <div className="flex gap-3">
            <button
              onClick={onAddToWishlist}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg border transition-colors ${
                isInWishlist
                  ? 'bg-red-50 border-red-200 text-red-600'
                  : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
              }`}
            >
              <svg className="w-5 h-5" fill={isInWishlist ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {isInWishlist ? 'Favoritado' : 'Favoritar'}
            </button>

            <div className="relative">
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg border bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
                Compartilhar
              </button>

              {/* Share Menu */}
              {showShareMenu && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
                  {shareOptions.map((option) => (
                    <button
                      key={option.name}
                      onClick={() => handleShare(option)}
                      className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors"
                    >
                      <div className="text-gray-600">{option.icon}</div>
                      <span className="text-gray-700">{option.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Trust Badges */}
          <div className="border-t border-gray-200 pt-4 space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Frete grátis acima de R$ 199
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              30 dias para troca e devolução
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Compra 100% segura
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Actions - Always Visible */}
      <div className="md:hidden mt-6">
        <div className="space-y-3">
          {/* Price Display */}
          <div className="text-center bg-gray-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-gray-900">
              {formatPrice(product.preco)}
              {product.precoAntigo && (
                <span className="text-lg text-gray-500 line-through ml-2">
                  {formatPrice(product.precoAntigo)}
                </span>
              )}
            </div>
            <div className="text-sm text-gray-600 mt-1">
              ou 12x de {formatPrice(product.preco / 12)} sem juros
            </div>
          </div>

          {/* Main Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={onBuyNow}
              disabled={!selectedSize}
              className="w-full bg-primary-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors shadow-lg"
            >
              {!selectedSize ? 'Selecione um tamanho' : 'Comprar Agora'}
            </button>

            <button
              onClick={onAddToCart}
              disabled={!selectedSize}
              className="w-full border-2 border-primary-600 text-primary-600 py-4 px-6 rounded-lg font-semibold text-lg hover:bg-primary-50 disabled:border-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              Adicionar ao Carrinho
            </button>
          </div>

          {/* Secondary Actions */}
          <div className="flex gap-3">
            <button
              onClick={onAddToWishlist}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg border transition-colors ${
                isInWishlist
                  ? 'bg-red-50 border-red-200 text-red-600'
                  : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
              }`}
            >
              <svg className="w-5 h-5" fill={isInWishlist ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="text-sm">{isInWishlist ? 'Favoritado' : 'Favoritar'}</span>
            </button>

            <div className="relative">
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg border bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
                <span className="text-sm">Compartilhar</span>
              </button>

              {/* Share Menu */}
              {showShareMenu && (
                <div className="absolute bottom-full right-0 mb-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
                  {shareOptions.map((option) => (
                    <button
                      key={option.name}
                      onClick={() => handleShare(option)}
                      className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors"
                    >
                      <div className="text-gray-600">{option.icon}</div>
                      <span className="text-gray-700">{option.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bottom Bar - Redesigned */}
      <div className={`md:hidden fixed bottom-0 left-0 right-0 transition-transform duration-300 z-50 ${
        isSticky ? 'translate-y-0' : 'translate-y-full'
      }`}>
        {/* Background with gradient shadow */}
        <div className="bg-gradient-to-t from-white via-white to-transparent pt-4 pb-safe">
          <div className="bg-white border-t border-gray-200 shadow-2xl">
            {/* Price info bar */}
            <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-lg font-bold text-gray-900">{formatPrice(product.preco)}</span>
                  {product.precoAntigo && (
                    <span className="text-sm text-gray-500 line-through ml-2">
                      {formatPrice(product.precoAntigo)}
                    </span>
                  )}
                </div>
                <span className="text-xs text-gray-600">12x sem juros</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="p-4">
              <div className="flex gap-3">
                {/* Add to Cart Button */}
                <button
                  onClick={onAddToCart}
                  disabled={!selectedSize}
                  className="flex-1 bg-white border-2 border-primary-600 text-primary-600 py-3 px-4 rounded-xl font-semibold disabled:border-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed transition-all duration-200 active:scale-95"
                >
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                    </svg>
                    <span>Carrinho</span>
                  </div>
                </button>

                {/* Buy Now Button */}
                <button
                  onClick={onBuyNow}
                  disabled={!selectedSize}
                  className="flex-2 bg-primary-600 text-white py-3 px-6 rounded-xl font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 active:scale-95 shadow-lg"
                >
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>{!selectedSize ? 'Selecione tamanho' : 'Comprar Agora'}</span>
                  </div>
                </button>
              </div>

              {/* Size reminder */}
              {!selectedSize && (
                <div className="mt-2 text-center">
                  <span className="text-xs text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                    ⚠️ Escolha um tamanho acima para continuar
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
