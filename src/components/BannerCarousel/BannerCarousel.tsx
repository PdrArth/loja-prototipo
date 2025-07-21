import React, { useState } from 'react';
import { ProductImage } from '@/components/ui/ProductImage';

export interface Banner {
  id: string;
  image: string;
  title: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
}

interface BannerCarouselProps {
  banners: Banner[];
  autoPlay?: boolean;
  interval?: number;
}

export const BannerCarousel: React.FC<BannerCarouselProps> = ({ banners, autoPlay = true, interval = 6000 }) => {
  const [current, setCurrent] = useState(0);

  React.useEffect(() => {
    if (!autoPlay) return;
    const timer = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, interval);
    return () => clearTimeout(timer);
  }, [current, autoPlay, interval, banners.length]);

  const goTo = (idx: number) => setCurrent(idx);
  const prev = () => setCurrent((prev) => (prev - 1 + banners.length) % banners.length);
  const next = () => setCurrent((prev) => (prev + 1) % banners.length);

  if (banners.length === 0) return null;

  const banner = banners[current];

  return (
    <div className="relative w-full h-40 sm:h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden shadow-lg mb-8">
      <ProductImage
        src={banner.image}
        alt={banner.title}
        fill
        className="object-cover object-center sm:object-center object-top transition-all duration-700"
        sizes="100vw"
        priority
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center sm:items-start px-3 py-4 sm:p-8 text-center sm:text-left">
        <h2 className="text-lg xs:text-xl sm:text-2xl md:text-4xl font-bold text-white mb-1 sm:mb-2 drop-shadow-lg">
          {banner.title}
        </h2>
        {banner.description && <p className="text-white text-sm sm:text-lg mb-2 sm:mb-4 drop-shadow max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl">{banner.description}</p>}
        {banner.ctaText && banner.ctaLink && (
          <a href={banner.ctaLink} className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-semibold px-4 sm:px-6 py-2 rounded-lg shadow transition-colors duration-200 text-sm sm:text-base mt-1">
            {banner.ctaText}
          </a>
        )}
      </div>
      {/* Setas */}
      <button onClick={prev} className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-1.5 sm:p-2 shadow-md z-10 focus:outline-none focus:ring-2 focus:ring-primary-500" aria-label="Anterior">
        <svg width={28} height={28} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
      </button>
      <button onClick={next} className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-1.5 sm:p-2 shadow-md z-10 focus:outline-none focus:ring-2 focus:ring-primary-500" aria-label="Próximo">
        <svg width={28} height={28} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
      </button>
      {/* Dots */}
      <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${idx === current ? 'bg-primary-600' : 'bg-white bg-opacity-70'} border border-white focus:outline-none focus:ring-2 focus:ring-primary-500`}
            aria-label={`Ir para banner ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}; 