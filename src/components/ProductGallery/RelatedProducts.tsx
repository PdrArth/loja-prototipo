import React from 'react';
import { Product } from '@/types/Product';
import { ProductCard } from '@/components/ProductCard';

interface RelatedProductsProps {
  currentProductId: string;
  categoria?: string;
  allProducts: Product[];
}

export const RelatedProducts: React.FC<RelatedProductsProps> = ({ currentProductId, categoria, allProducts }) => {
  const related = allProducts
    .filter(p => p.id !== currentProductId && p.categoria === categoria)
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section className="my-12">
      <h3 className="text-lg font-semibold mb-4">Você também pode gostar</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {related.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}; 