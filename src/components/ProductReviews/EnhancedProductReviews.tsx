'use client';

import React, { useState } from 'react';
import { ProductImage } from '@/components/ui/ProductImage';

interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  photos?: string[];
  verified: boolean;
  helpful: number;
  size?: string;
  fit?: 'small' | 'perfect' | 'large';
}

interface QAItem {
  id: string;
  question: string;
  answer: string;
  userName: string;
  date: string;
  helpful: number;
}

const mockReviews: Review[] = [
  {
    id: '1',
    userName: 'Maria Silva',
    userAvatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    rating: 5,
    date: '2024-01-15',
    title: 'Produto incrível!',
    comment: 'Superou minhas expectativas! O material é de excelente qualidade e o acabamento é perfeito. Muito confortável para usar o dia todo.',
    photos: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=300&h=300&fit=crop'
    ],
    verified: true,
    helpful: 12,
    size: '37',
    fit: 'perfect'
  },
  {
    id: '2',
    userName: 'Ana Costa',
    userAvatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    rating: 4,
    date: '2024-01-10',
    title: 'Muito bom, recomendo',
    comment: 'Produto de boa qualidade, chegou rápido e bem embalado. Único ponto é que achei um pouco apertado, talvez seja melhor pedir um número maior.',
    verified: true,
    helpful: 8,
    size: '36',
    fit: 'small'
  },
  {
    id: '3',
    userName: 'Carla Mendes',
    userAvatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    rating: 5,
    date: '2024-01-08',
    title: 'Perfeito!',
    comment: 'Exatamente como na foto. Material excelente e muito confortável. Já é a segunda vez que compro desta marca.',
    photos: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop'
    ],
    verified: true,
    helpful: 15,
    size: '38',
    fit: 'perfect'
  }
];

const mockQA: QAItem[] = [
  {
    id: '1',
    question: 'Este produto é resistente à água?',
    answer: 'Sim, possui tratamento impermeável que protege contra respingos e chuva leve.',
    userName: 'Atendimento Valentina',
    date: '2024-01-12',
    helpful: 5
  },
  {
    id: '2',
    question: 'Qual o prazo de entrega para São Paulo?',
    answer: 'Para São Paulo, o prazo é de 2-3 dias úteis com frete expresso.',
    userName: 'Atendimento Valentina',
    date: '2024-01-10',
    helpful: 3
  }
];

function StarRating({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`${sizeClasses[size]} ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function EnhancedProductReviews() {
  const [activeTab, setActiveTab] = useState<'reviews' | 'qa'>('reviews');
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const filteredReviews = selectedRating 
    ? mockReviews.filter(review => review.rating === selectedRating)
    : mockReviews;

  const ratingCounts = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: mockReviews.filter(review => review.rating === rating).length,
    percentage: (mockReviews.filter(review => review.rating === rating).length / mockReviews.length) * 100
  }));

  const averageRating = mockReviews.reduce((sum, review) => sum + review.rating, 0) / mockReviews.length;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getFitText = (fit?: string) => {
    switch (fit) {
      case 'small': return 'Ficou apertado';
      case 'large': return 'Ficou largo';
      case 'perfect': return 'Caiu perfeito';
      default: return '';
    }
  };

  const getFitColor = (fit?: string) => {
    switch (fit) {
      case 'small': return 'text-red-600 bg-red-50';
      case 'large': return 'text-blue-600 bg-blue-50';
      case 'perfect': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex">
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'reviews'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Avaliações ({mockReviews.length})
          </button>
          <button
            onClick={() => setActiveTab('qa')}
            className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'qa'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Perguntas & Respostas ({mockQA.length})
          </button>
        </nav>
      </div>

      <div className="p-6">
        {activeTab === 'reviews' ? (
          <div>
            {/* Rating Summary */}
            <div className="mb-8 p-6 bg-gray-50 rounded-lg">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    {averageRating.toFixed(1)}
                  </div>
                  <StarRating rating={Math.round(averageRating)} size="lg" />
                  <div className="text-sm text-gray-600 mt-2">
                    {mockReviews.length} avaliações
                  </div>
                </div>

                <div className="flex-1">
                  {ratingCounts.map(({ rating, count, percentage }) => (
                    <button
                      key={rating}
                      onClick={() => setSelectedRating(selectedRating === rating ? null : rating)}
                      className={`w-full flex items-center gap-3 py-1 px-2 rounded hover:bg-white transition-colors ${
                        selectedRating === rating ? 'bg-white shadow-sm' : ''
                      }`}
                    >
                      <span className="text-sm font-medium w-8">{rating}★</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-400 h-2 rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 w-8">{count}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-6">
              {filteredReviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                      <ProductImage
                        src={review.userAvatar}
                        alt={review.userName}
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium text-gray-900">{review.userName}</h4>
                        {review.verified && (
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                            Compra verificada
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-4 mb-2">
                        <StarRating rating={review.rating} />
                        <span className="text-sm text-gray-500">{formatDate(review.date)}</span>
                        {review.size && (
                          <span className="text-sm text-gray-500">Tamanho: {review.size}</span>
                        )}
                      </div>

                      {review.fit && (
                        <div className="mb-2">
                          <span className={`text-xs px-2 py-1 rounded-full ${getFitColor(review.fit)}`}>
                            {getFitText(review.fit)}
                          </span>
                        </div>
                      )}

                      <h5 className="font-medium text-gray-900 mb-2">{review.title}</h5>
                      <p className="text-gray-700 mb-3">{review.comment}</p>

                      {/* Review Photos */}
                      {review.photos && review.photos.length > 0 && (
                        <div className="flex gap-2 mb-3">
                          {review.photos.map((photo, index) => (
                            <div key={index} className="w-20 h-20 rounded-lg overflow-hidden">
                              <ProductImage
                                src={photo}
                                alt={`Foto do cliente ${index + 1}`}
                                width={80}
                                height={80}
                                className="object-cover hover:scale-110 transition-transform cursor-pointer"
                              />
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <button className="flex items-center gap-1 hover:text-gray-700">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                          </svg>
                          Útil ({review.helpful})
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Q&A Section */
          <div className="space-y-6">
            {mockQA.map((qa) => (
              <div key={qa.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">P: {qa.question}</h4>
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                    <p className="text-gray-700 mb-2">R: {qa.answer}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>Por {qa.userName}</span>
                      <span>{formatDate(qa.date)}</span>
                      <button className="flex items-center gap-1 hover:text-gray-700">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                        </svg>
                        Útil ({qa.helpful})
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <h4 className="font-medium text-gray-900 mb-2">Tem alguma dúvida?</h4>
              <p className="text-gray-600 mb-4">Faça sua pergunta e nossa equipe responderá em breve.</p>
              <button className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                Fazer Pergunta
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
