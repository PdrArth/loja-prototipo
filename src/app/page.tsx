'use client';

import React from 'react';
import { banners } from '@/data/banners';
import { categories } from '@/data/categories';
import { products } from '@/data/products';
import { BannerCarousel } from '@/components/BannerCarousel/BannerCarousel';
import { ProductCard } from '@/components/ProductCard';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { BenefitsSection } from '@/components/BenefitsSection';
import { useCart } from '@/hooks/useCart';
import { useRouter } from 'next/navigation';
import { Product } from '@/types/Product';
import { ProductImage } from '@/components/ui/ProductImage';

// Funções para obter diferentes tipos de produtos
function getMaisVendidos() {
  return products.slice(0, 4);
}

function getNovidades() {
  return [...products]
    .sort((a, b) => new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime())
    .slice(0, 4);
}

function getOfertasRelampago() {
  return products.filter((p) => p.preco < 200).slice(0, 4);
}

function getMaisBuscados() {
  return products.filter((p) => ['tenis', 'sandalias', 'bolsas'].includes(p.categoria || '')).slice(0, 4);
}

const depoimentos = [
  {
    nome: 'Carla Mendes',
    texto: 'Amei a experiência! Entrega rápida e produto de qualidade.',
    foto: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    nome: 'Lucas Pereira',
    texto: 'Comprei para minha esposa e ela adorou. Recomendo muito!',
    foto: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    nome: 'Fernanda Lima',
    texto: 'Atendimento excelente e produtos lindos. Voltarei a comprar!',
    foto: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
];

export default function HomePage() {
  const { addToCart } = useCart();
  const router = useRouter();

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

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Carrossel de banners */}
      <BannerCarousel banners={banners} />

      {/* Produtos em destaque: Mais vendidos */}
      <section className="container-custom my-10 sm:my-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Mais Vendidos</h2>
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {getMaisVendidos().map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onView={handleView}
              onAddToCart={handleAddToCart}
              onBuy={handleBuy}
            />
          ))}
        </div>
      </section>

      {/* Produtos em destaque: Novidades */}
      <section className="container-custom my-10 sm:my-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Novidades</h2>
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {getNovidades().map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onView={handleView}
              onAddToCart={handleAddToCart}
              onBuy={handleBuy}
            />
          ))}
        </div>
      </section>

      {/* Ofertas Relâmpago */}
      <section className="container-custom my-10 sm:my-12">
        <h2 className="text-2xl font-bold text-red-600 mb-6">⚡ Ofertas Relâmpago</h2>
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {getOfertasRelampago().map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onView={handleView}
              onAddToCart={handleAddToCart}
              onBuy={handleBuy}
            />
          ))}
        </div>
      </section>

      {/* Mais Buscados */}
      <section className="container-custom my-10 sm:my-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Mais Buscados</h2>
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {getMaisBuscados().map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onView={handleView}
              onAddToCart={handleAddToCart}
              onBuy={handleBuy}
            />
          ))}
        </div>
      </section>

      {/* Compre por categoria */}
      <section className="container-custom my-10 sm:my-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Compre por categoria</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={`/produtos?categoria=${cat.slug}`}
              className="flex flex-col items-center justify-center bg-primary-50 hover:bg-primary-100 rounded-xl shadow p-4 group border border-primary-100 hover:border-primary-300 min-h-[120px] sm:min-h-[140px] transition"
            >
              <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">{cat.icone}</span>
              <span className="text-base font-semibold text-primary-700 group-hover:text-primary-900 text-center">{cat.nome}</span>
            </a>
          ))}
        </div>
      </section>

      {/* Depoimentos */}
      <TestimonialsSection />

      {/* Benefícios */}
      <BenefitsSection />

      {/* Newsletter simples */}
      <section className="bg-primary-600 py-12">
        <div className="container-custom text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Fique por dentro das novidades!</h2>
          <p className="text-primary-100 mb-6">Receba ofertas exclusivas e lançamentos em primeira mão</p>
          <div className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              placeholder="Seu e-mail"
              className="flex-1 px-4 py-2 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-primary-300"
            />
            <button className="bg-white text-primary-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Cadastrar
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
