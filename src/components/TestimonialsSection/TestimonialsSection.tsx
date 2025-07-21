'use client';

import React, { useState, useEffect } from 'react';
import { ProductImage } from '@/components/ui/ProductImage';

interface Testimonial {
  id: string;
  nome: string;
  texto: string;
  foto: string;
  rating: number;
  produto?: string;
  cidade: string;
  data: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    nome: 'Carla Mendes',
    texto: 'Amei a experiência! Entrega rápida e produto de qualidade excepcional. O scarpin que comprei é perfeito para o trabalho.',
    foto: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 5,
    produto: 'Scarpin Clássico Preto',
    cidade: 'São Paulo, SP',
    data: '2024-01-15'
  },
  {
    id: '2',
    nome: 'Lucas Pereira',
    texto: 'Comprei para minha esposa e ela adorou! A qualidade dos produtos é incrível e o atendimento é nota 10.',
    foto: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 5,
    produto: 'Bolsa de Couro Marrom',
    cidade: 'Rio de Janeiro, RJ',
    data: '2024-01-10'
  },
  {
    id: '3',
    nome: 'Fernanda Lima',
    texto: 'Atendimento excelente e produtos lindos. A sandália que comprei é super confortável. Voltarei a comprar com certeza!',
    foto: 'https://randomuser.me/api/portraits/women/65.jpg',
    rating: 5,
    produto: 'Sandália de Salto Alto',
    cidade: 'Belo Horizonte, MG',
    data: '2024-01-08'
  },
  {
    id: '4',
    nome: 'Roberto Silva',
    texto: 'Primeira compra online de calçados e foi perfeita! O tênis chegou rapidinho e é exatamente como nas fotos.',
    foto: 'https://randomuser.me/api/portraits/men/15.jpg',
    rating: 4,
    produto: 'Tênis Casual Feminino',
    cidade: 'Porto Alegre, RS',
    data: '2024-01-05'
  },
  {
    id: '5',
    nome: 'Ana Carolina',
    texto: 'Produtos de alta qualidade e preços justos. O site é fácil de navegar e a entrega foi super rápida.',
    foto: 'https://randomuser.me/api/portraits/women/28.jpg',
    rating: 5,
    produto: 'Sapatilha Confortável',
    cidade: 'Brasília, DF',
    data: '2024-01-03'
  },
  {
    id: '6',
    nome: 'Marina Santos',
    texto: 'Adorei a experiência de compra! A bolsa é linda e chegou muito bem embalada. Recomendo para todas as amigas.',
    foto: 'https://randomuser.me/api/portraits/women/17.jpg',
    rating: 5,
    produto: 'Mochila Feminina Urbana',
    cidade: 'Salvador, BA',
    data: '2024-01-01'
  }
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-5 h-5 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume auto-play after 10s
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <section className="py-16 bg-gradient-to-br from-primary-50 to-white">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            O que nossos clientes dizem
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Mais de 8.500 clientes satisfeitos compartilham suas experiências conosco
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0">
                  <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mx-4">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                      {/* Customer Photo */}
                      <div className="flex-shrink-0">
                        <div className="relative w-24 h-24 rounded-full overflow-hidden ring-4 ring-primary-100">
                          <ProductImage
                            src={testimonial.foto}
                            alt={testimonial.nome}
                            fill
                            className="object-cover"
                            sizes="96px"
                          />
                        </div>
                      </div>

                      {/* Testimonial Content */}
                      <div className="flex-1 text-center md:text-left">
                        <StarRating rating={testimonial.rating} />
                        
                        <blockquote className="text-lg md:text-xl text-gray-700 my-6 leading-relaxed">
                          "{testimonial.texto}"
                        </blockquote>

                        <div className="space-y-2">
                          <div className="font-semibold text-gray-900 text-lg">
                            {testimonial.nome}
                          </div>
                          
                          {testimonial.produto && (
                            <div className="text-primary-600 font-medium">
                              Comprou: {testimonial.produto}
                            </div>
                          )}
                          
                          <div className="text-gray-500 text-sm">
                            {testimonial.cidade} • {formatDate(testimonial.data)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow z-10"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow z-10"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? 'bg-primary-600' : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Overall Rating */}
        <div className="text-center mt-12 p-6 bg-white rounded-xl shadow-sm">
          <div className="flex items-center justify-center gap-4">
            <div className="text-4xl font-bold text-primary-600">4.8</div>
            <div>
              <StarRating rating={5} />
              <div className="text-gray-600 mt-1">Baseado em 2.847 avaliações</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
