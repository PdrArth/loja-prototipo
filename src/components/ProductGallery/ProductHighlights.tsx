import React from 'react';

interface Highlight {
  icon: React.ReactNode;
  title: string;
  description?: string;
}

const highlights: Highlight[] = [
  {
    icon: <span role="img" aria-label="Frete grátis">🚚</span>,
    title: 'Frete grátis',
    description: 'Para todo o Brasil em compras acima de R$ 199',
  },
  {
    icon: <span role="img" aria-label="Devolução fácil">🔄</span>,
    title: 'Devolução fácil',
    description: '7 dias para trocar ou devolver sem burocracia',
  },
  {
    icon: <span role="img" aria-label="Garantia">🛡️</span>,
    title: 'Garantia de qualidade',
    description: 'Produtos originais e com garantia',
  },
];

export const ProductHighlights: React.FC = () => (
  <div className="flex flex-wrap gap-4 my-6">
    {highlights.map((h) => (
      <div
        key={h.title}
        className="flex items-center gap-3 bg-primary-50 border border-primary-200 rounded-lg px-4 py-3 min-w-[180px] shadow-sm"
      >
        <span className="text-2xl">{h.icon}</span>
        <div>
          <div className="font-semibold text-primary-700 text-sm">{h.title}</div>
          {h.description && <div className="text-xs text-primary-800">{h.description}</div>}
        </div>
      </div>
    ))}
  </div>
); 