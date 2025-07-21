import React from 'react';

interface ProductSizeTableProps {
  tamanhos: string[];
}

export const ProductSizeTable: React.FC<ProductSizeTableProps> = ({ tamanhos }) => {
  if (!tamanhos || tamanhos.length === 0) return null;

  return (
    <div className="my-6">
      <h3 className="text-lg font-semibold mb-2">Tabela de Tamanhos</h3>
      <div className="flex flex-wrap gap-2">
        {tamanhos.map((t) => (
          <span
            key={t}
            className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-lg font-medium border border-primary-200"
          >
            {t}
          </span>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-2">Consulte a tabela antes de comprar. Dúvidas? Fale conosco!</p>
    </div>
  );
}; 