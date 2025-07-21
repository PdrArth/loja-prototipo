import React, { useState } from 'react';
import { ProductImage } from '@/components/ui/ProductImage';

interface ProductGalleryProps {
  images: string[];
  alt: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ images, alt }) => {
  const [selected, setSelected] = useState(0);

  if (!images || images.length === 0) return null;

  const prev = () => setSelected((prev) => (prev - 1 + images.length) % images.length);
  const next = () => setSelected((prev) => (prev + 1) % images.length);

  return (
    <div className="w-full flex flex-col items-center">
      {/* Imagem principal + setas */}
      <div className="relative w-full aspect-square bg-white rounded-lg overflow-hidden shadow mb-4 flex items-center justify-center">
        {/* Seta esquerda */}
        {images.length > 1 && (
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-primary-100 rounded-full p-1.5 shadow z-10 focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label="Imagem anterior"
          >
            <svg width={24} height={24} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
        )}
        <ProductImage
          src={images[selected]}
          alt={alt}
          fill
          className="object-contain transition-all duration-300 cursor-zoom-in"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Seta direita */}
        {images.length > 1 && (
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-primary-100 rounded-full p-1.5 shadow z-10 focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label="Próxima imagem"
          >
            <svg width={24} height={24} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        )}
      </div>
      {/* Dots mobile */}
      {images.length > 1 && (
        <div className="flex gap-2 mb-2 sm:hidden">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setSelected(idx)}
              className={`w-2.5 h-2.5 rounded-full ${selected === idx ? 'bg-primary-600' : 'bg-gray-300'} focus:outline-none focus:ring-2 focus:ring-primary-500`}
              aria-label={`Ir para imagem ${idx + 1}`}
            />
          ))}
        </div>
      )}
      {/* Miniaturas desktop */}
      {images.length > 1 && (
        <div className="hidden sm:flex gap-2 justify-center">
          {images.map((img, idx) => (
            <button
              key={img}
              onClick={() => setSelected(idx)}
              className={`w-16 h-16 rounded border-2 ${selected === idx ? 'border-primary-600' : 'border-gray-200'} overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary-500`}
              aria-label={`Selecionar imagem ${idx + 1}`}
            >
              <ProductImage
                src={img}
                alt={alt}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Componente de estrelas de avaliação
export function StarRating({ rating, max = 5, className = '' }: { rating: number; max?: number; className?: string }) {
  return (
    <div className={`flex items-center gap-0.5 ${className}`} aria-label={`Avaliação: ${rating} de ${max}`}>
      {Array.from({ length: max }).map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${i < Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
          fill={i < Math.round(rating) ? 'currentColor' : 'none'}
          stroke="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <polygon points="10 1.5 12.59 7.36 18.82 7.64 13.97 11.97 15.54 18.02 10 14.5 4.46 18.02 6.03 11.97 1.18 7.64 7.41 7.36 10 1.5" />
        </svg>
      ))}
    </div>
  );
} 