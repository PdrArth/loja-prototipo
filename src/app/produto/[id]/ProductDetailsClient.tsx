'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Product } from '@/types/Product';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/lib/formatters';
import { AdvancedProductGallery } from '@/components/ProductGallery';
import { ProductVariations } from '@/components/ProductVariations';
import { EnhancedProductReviews } from '@/components/ProductReviews';
import { OptimizedProductActions } from '@/components/ProductActions';
import { ConversionFeatures } from '@/components/ConversionFeatures';
import { products } from '@/data/products';
import { useToast } from '@/components/ui/Toast/ToastContext';

interface ProductDetailsClientProps {
  product: Product;
}

export function ProductDetailsClient({ product }: ProductDetailsClientProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [sizeError, setSizeError] = useState<string>('');
  const [isInWishlist, setIsInWishlist] = useState(false);

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
    setSizeError('');
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  const handleAddToCart = () => {
    if (!product) return;

    if (product.tamanhos && product.tamanhos.length > 0 && !selectedSize) {
      setSizeError('Por favor, selecione um tamanho');
      return;
    }

    addToCart({ ...product, tamanhoSelecionado: selectedSize });
    showToast('Produto adicionado ao carrinho!', 'success');
  };

  const handleBuyNow = () => {
    if (!product) return;

    if (product.tamanhos && product.tamanhos.length > 0 && !selectedSize) {
      setSizeError('Por favor, selecione um tamanho');
      return;
    }

    addToCart({ ...product, tamanhoSelecionado: selectedSize });
    router.push('/checkout');
  };

  const handleAddToWishlist = () => {
    setIsInWishlist(!isInWishlist);
    if (!isInWishlist) {
      showToast('Produto adicionado aos favoritos!', 'success');
    } else {
      showToast('Produto removido dos favoritos!', 'success');
    }
  };

  const handleShare = () => {
    showToast('Link copiado para a área de transferência!', 'success');
  };

  // Simular múltiplas imagens do produto
  const getProductImages = (product: Product) => {
    const images = [product.imagem];
    // Adicionar mais imagens simuladas
    for (let i = 2; i <= 4; i++) {
      images.push(product.imagem.replace('.jpg', `_${i}.jpg`));
    }
    return images;
  };

  const getRelatedProducts = () => {
    return products
      .filter(p => p.id !== product?.id && p.categoria === product?.categoria)
      .slice(0, 4);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-8">
      <div className="container-custom py-4 md:py-6">
        {/* Breadcrumb Navigation */}
        <nav className="mb-4 md:mb-6">
          <Link
            href="/produtos"
            className="text-primary-600 hover:text-primary-700 transition-colors duration-200 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Voltar para produtos
          </Link>
        </nav>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 mb-8 md:mb-12">
          {/* Product Gallery */}
          <div className="order-1">
            <AdvancedProductGallery
              images={getProductImages(product)}
              alt={product.nome}
              className="mb-4 md:mb-6"
            />
          </div>

          {/* Product Information */}
          <div className="order-2 space-y-4 md:space-y-6">
            {/* Basic Info */}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {product.nome}
              </h1>

              {product.marca && (
                <p className="text-lg text-gray-600 mb-3">por {product.marca}</p>
              )}

              {product.rating && (
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`w-5 h-5 ${star <= (product.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating} ({Math.floor(Math.random() * 100) + 50} avaliações)
                  </span>
                </div>
              )}

              {product.descricao && (
                <p className="text-gray-700 mb-6">{product.descricao}</p>
              )}
            </div>

            {/* Product Variations */}
            <ProductVariations
              sizes={product.tamanhos || ['36', '37', '38', '39', '40']}
              selectedSize={selectedSize}
              onSizeChange={handleSizeChange}
              sizeError={sizeError}
            />

            {/* Product Actions */}
            <OptimizedProductActions
              product={product}
              selectedSize={selectedSize}
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
              onAddToWishlist={handleAddToWishlist}
              onShare={handleShare}
              isInWishlist={isInWishlist}
            />

            {/* Conversion Features */}
            <ConversionFeatures
              productPrice={product.preco}
              stock={Math.floor(Math.random() * 15) + 5}
            />
          </div>
        </div>

        {/* Enhanced Reviews Section */}
        <div className="mb-12">
          <EnhancedProductReviews />
        </div>

        {/* Related Products */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Produtos Relacionados</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {getRelatedProducts().map((relatedProduct) => (
              <Link
                key={relatedProduct.id}
                href={`/produto/${relatedProduct.id}`}
                className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="aspect-square relative overflow-hidden rounded-t-lg">
                  <img
                    src={relatedProduct.imagem}
                    alt={relatedProduct.nome}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">
                    {relatedProduct.nome}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary-600">
                      {formatPrice(relatedProduct.preco)}
                    </span>
                    {relatedProduct.precoAntigo && (
                      <span className="text-sm text-gray-500 line-through">
                        {formatPrice(relatedProduct.precoAntigo)}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
