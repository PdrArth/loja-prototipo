import React from 'react';

interface Review {
  id: string;
  nome: string;
  nota: number;
  comentario: string;
  data: string;
}

const reviews: Review[] = [
  {
    id: '1',
    nome: 'Ana Paula',
    nota: 5,
    comentario: 'Produto maravilhoso! Chegou rápido e a qualidade é excelente.',
    data: '2024-07-10',
  },
  {
    id: '2',
    nome: 'Marcos Silva',
    nota: 4,
    comentario: 'Muito confortável, só achei a forma um pouco pequena.',
    data: '2024-07-08',
  },
  {
    id: '3',
    nome: 'Juliana Souza',
    nota: 5,
    comentario: 'Amei! Voltarei a comprar com certeza.',
    data: '2024-07-05',
  },
];

function renderStars(nota: number) {
  return (
    <span className="text-yellow-400">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i}>{i < nota ? '★' : '☆'}</span>
      ))}
    </span>
  );
}

export const ProductReviews: React.FC = () => (
  <div className="my-8">
    <h3 className="text-lg font-semibold mb-4">Avaliações de clientes</h3>
    <div className="space-y-4">
      {reviews.map((r) => (
        <div key={r.id} className="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-bold text-primary-700">{r.nome}</span>
              <span className="text-xs text-gray-400">{new Date(r.data).toLocaleDateString('pt-BR')}</span>
            </div>
            <div className="mb-1">{renderStars(r.nota)}</div>
            <div className="text-gray-700 text-sm">{r.comentario}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
); 