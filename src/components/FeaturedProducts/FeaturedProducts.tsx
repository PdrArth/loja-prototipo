'use client';

import React, { useState, useEffect } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { Product } from '@/types/Product';
import { useCart } from '@/hooks/useCart';
import { useRouter } from 'next/navigation';

interface FeaturedProductsProps {
  title: string;
  products: Product[];
  type: 'bestsellers' | 'new' | 'sale' | 'trending';
  showCountdown?: boolean;
}

function CountdownTimer({ endTime }: { endTime: Date }) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTime.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  return (
    <div className="flex items-center gap-2 text-sm font-medium text-red-600">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>
        {String(timeLeft.hours).padStart(2, '0')}:
        {String(timeLeft.minutes).padStart(2, '0')}:
        {String(timeLeft.seconds).padStart(2, '0')}
      </span>
    </div>
  );
}

function ProductBadge({ type }: { type: 'bestsellers' | 'new' | 'sale' | 'trending' }) {
  const badges = {
    bestsellers: { text: 'MAIS VENDIDO', color: 'bg-green-500' },
    new: { text: 'NOVO', color: 'bg-blue-500' },
    sale: { text: 'OFERTA', color: 'bg-red-500' },
    trending: { text: 'TENDÊNCIA', color: 'bg-purple-500' }
  };

  const badge = badges[type];

  return (
    <span className={`absolute top-2 left-2 z-10 ${badge.color} text-white text-xs font-bold px-2 py-1 rounded-md`}>
      {badge.text}
    </span>
  );
}

export function FeaturedProducts({ title, products, type, showCountdown = false }: FeaturedProductsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { addToCart } = useCart();
  const router = useRouter();

  // Auto-scroll for carousel
  useEffect(() => {
    if (products.length > 4) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % Math.max(1, products.length - 3));
      }, 5000);

      return () => clearInterval(timer);
    }
  }, [products.length]);

  const handleView = (product: Product) => {
    router.push(`/produto/${product.id}`);
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  const handleBuy = (product: Product) => {
    addToCart(product);
    router.push('/checkout');
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, products.length - 3));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, products.length - 3)) % Math.max(1, products.length - 3));
  };

  // Countdown end time (24 hours from now for demo)
  const countdownEnd = new Date(Date.now() + 24 * 60 * 60 * 1000);

  const titleColors = {
    bestsellers: 'text-green-600',
    new: 'text-blue-600',
    sale: 'text-red-600',
    trending: 'text-purple-600'
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container-custom">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className={`text-2xl md:text-3xl font-bold ${titleColors[type]} mb-2`}>
              {title}
            </h2>
            {showCountdown && (
              <CountdownTimer endTime={countdownEnd} />
            )}
          </div>

          {/* Navigation Arrows */}
          {products.length > 4 && (
            <div className="flex gap-2">
              <button
                onClick={prevSlide}
                className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextSlide}
                className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Products Carousel */}
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 25}%)` }}
          >
            {products.map((product) => (
              <div key={product.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex-shrink-0 px-3">
                <div className="relative">
                  <ProductBadge type={type} />
                  <ProductCard
                    product={product}
                    onView={handleView}
                    onAddToCart={handleAddToCart}
                    onBuy={handleBuy}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots Indicator */}
        {products.length > 4 && (
          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: Math.max(1, products.length - 3) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-primary-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-8">
          <button
            onClick={() => router.push('/produtos')}
            className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            Ver Todos os Produtos
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
