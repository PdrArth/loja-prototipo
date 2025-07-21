import React from 'react';
import { getProductById } from '@/data/products';
import { products } from '@/data/products';
import { ProductDetailsClient } from './ProductDetailsClient';

// Generate static params for all products
export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

interface ProductDetailsPageProps {
  params: {
    id: string;
  };
}

export default function ProductDetailsPage({ params }: ProductDetailsPageProps) {
  const product = getProductById(params.id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Produto não encontrado</h1>
          <p className="text-gray-600 mb-8">O produto que você está procurando não existe.</p>
        </div>
      </div>
    );
  }

  return <ProductDetailsClient product={product} />;
}