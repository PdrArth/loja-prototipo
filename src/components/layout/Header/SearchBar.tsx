import React, { useState } from 'react';
import { products } from '@/data/products';
import Link from 'next/link';
import { SearchIcon } from '@/components/ui/SearchIcon';

export const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);

  const results =
    query.length > 1
      ? products.filter((p) =>
          p.nome.toLowerCase().includes(query.toLowerCase()) ||
          p.descricao.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 5)
      : [];

  return (
    <div className="relative w-full max-w-xs">
      <form
        role="search"
        className="flex"
        onSubmit={e => { e.preventDefault(); }}
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          placeholder="Buscar produtos..."
          className="w-full px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
          aria-label="Buscar produtos"
        />
        <button
          type="submit"
          className="px-3 py-2 bg-primary-600 text-white rounded-r-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
          aria-label="Buscar"
        >
          <SearchIcon size={18} />
        </button>
      </form>
      {focused && results.length > 0 && (
        <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
          <ul>
            {results.map((p) => (
              <li key={p.id}>
                <Link
                  href={`/produto/${p.id}`}
                  className="flex items-center gap-3 px-4 py-2 hover:bg-primary-50 transition-colors"
                  onClick={() => setQuery('')}
                >
                  <img src={p.imagem} alt={p.nome} className="w-8 h-8 rounded object-cover" />
                  <span className="text-gray-800 text-sm">{p.nome}</span>
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={`/produtos?busca=${encodeURIComponent(query)}`}
                className="block px-4 py-2 text-primary-700 hover:underline text-sm"
                onClick={() => setQuery('')}
              >
                Ver todos os resultados
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}; 