import React from 'react';
import { ProductCard } from './ProductCard';
import { Product } from '@/types/Product';

// Sample product data for testing
const sampleProduct: Product = {
  id: '1',
  nome: 'Scarpin Clássico Preto',
  descricao: 'Scarpin elegante em couro legítimo, perfeito para ocasiões especiais e uso profissional. Salto médio de 7cm proporciona conforto e sofisticação.',
  imagem: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop&auto=format',
  preco: 189.90
};

const longNameProduct: Product = {
  id: '2',
  nome: 'Produto com Nome Muito Longo que Deveria Ser Truncado para Não Quebrar o Layout do Card',
  descricao: 'Descrição do produto com nome longo.',
  imagem: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop&auto=format',
  preco: 299.90
};

/**
 * Componente de exemplo para testar o ProductCard
 * Este arquivo pode ser usado para visualizar o componente durante o desenvolvimento
 */
export const ProductCardExamples: React.FC = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-8">ProductCard Examples</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <ProductCard product={sampleProduct} />
        <ProductCard product={longNameProduct} />
        <ProductCard 
          product={sampleProduct} 
          className="border-2 border-blue-500" 
        />
      </div>
    </div>
  );
};

export default ProductCardExamples;