'use client';

import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

interface ProductVariation {
  id: string;
  name: string;
  color?: string;
  image?: string;
  stock: number;
  price?: number;
}

interface ProductVariationsProps {
  sizes: string[];
  colors?: ProductVariation[];
  selectedSize?: string;
  selectedColor?: string;
  onSizeChange: (size: string) => void;
  onColorChange?: (color: string) => void;
  sizeError?: string;
  className?: string;
}

const sizeGuide = {
  '34': { cm: '21.5', us: '4' },
  '35': { cm: '22.0', us: '5' },
  '36': { cm: '22.5', us: '6' },
  '37': { cm: '23.0', us: '7' },
  '38': { cm: '23.5', us: '8' },
  '39': { cm: '24.0', us: '9' },
  '40': { cm: '24.5', us: '10' },
  '41': { cm: '25.0', us: '11' },
  '42': { cm: '25.5', us: '12' }
};

export function ProductVariations({
  sizes,
  colors,
  selectedSize,
  selectedColor,
  onSizeChange,
  onColorChange,
  sizeError,
  className = ""
}: ProductVariationsProps) {
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  const getSizeStock = (size: string) => {
    // Simular estoque por tamanho
    const stockLevels = ['34', '35', '41', '42']; // Tamanhos com estoque baixo
    if (stockLevels.includes(size)) {
      return Math.floor(Math.random() * 3) + 1; // 1-3 unidades
    }
    return Math.floor(Math.random() * 10) + 5; // 5-15 unidades
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { text: 'Esgotado', color: 'text-red-600', bg: 'bg-red-50 border-red-200' };
    if (stock <= 3) return { text: `Últimas ${stock} unidades`, color: 'text-orange-600', bg: 'bg-orange-50 border-orange-200' };
    return { text: 'Em estoque', color: 'text-green-600', bg: 'bg-green-50 border-green-200' };
  };

  return (
    <div className={className}>
      {/* Color Selection */}
      {colors && colors.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Cor</h3>
          <div className="flex flex-wrap gap-3">
            {colors.map((color) => (
              <button
                key={color.id}
                onClick={() => onColorChange?.(color.id)}
                className={`relative w-12 h-12 rounded-full border-2 transition-all duration-200 ${
                  selectedColor === color.id
                    ? 'border-primary-500 scale-110'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                style={{ backgroundColor: color.color }}
                title={color.name}
              >
                {selectedColor === color.id && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Size Selection */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900">Tamanho</h3>
          <button
            onClick={() => setShowSizeGuide(true)}
            className="text-primary-600 hover:text-primary-700 text-sm font-medium underline"
          >
            Guia de tamanhos
          </button>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
          {sizes.map((size) => {
            const stock = getSizeStock(size);
            const stockStatus = getStockStatus(stock);
            const isSelected = selectedSize === size;
            const isOutOfStock = stock === 0;

            return (
              <button
                key={size}
                onClick={() => !isOutOfStock && onSizeChange(size)}
                disabled={isOutOfStock}
                className={`relative p-3 text-center border rounded-lg transition-all duration-200 ${
                  isOutOfStock
                    ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                    : isSelected
                    ? 'bg-primary-600 text-white border-primary-600'
                    : 'bg-white text-gray-900 border-gray-300 hover:border-primary-300 hover:bg-primary-50'
                }`}
              >
                <div className="font-medium">{size}</div>
                {!isOutOfStock && stock <= 3 && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full"></div>
                )}
                {isOutOfStock && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-0.5 bg-gray-400 transform rotate-45"></div>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Size Error */}
        {sizeError && (
          <p className="mt-2 text-sm text-red-600">{sizeError}</p>
        )}

        {/* Stock Status */}
        {selectedSize && (
          <div className="mt-3">
            {(() => {
              const stock = getSizeStock(selectedSize);
              const status = getStockStatus(stock);
              return (
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium ${status.bg} ${status.color}`}>
                  <div className={`w-2 h-2 rounded-full ${stock === 0 ? 'bg-red-500' : stock <= 3 ? 'bg-orange-500' : 'bg-green-500'}`}></div>
                  {status.text}
                </div>
              );
            })()}
          </div>
        )}
      </div>

      {/* Size Guide Modal */}
      <Transition appear show={showSizeGuide} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setShowSizeGuide(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title className="text-lg font-medium leading-6 text-gray-900 mb-4">
                    Guia de Tamanhos
                  </Dialog.Title>

                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-4">
                      Encontre o tamanho ideal medindo seu pé e comparando com a tabela abaixo:
                    </p>

                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-2 font-medium text-gray-900">BR</th>
                            <th className="text-left py-2 font-medium text-gray-900">CM</th>
                            <th className="text-left py-2 font-medium text-gray-900">US</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Object.entries(sizeGuide).map(([size, measurements]) => (
                            <tr key={size} className="border-b border-gray-100">
                              <td className="py-2 font-medium">{size}</td>
                              <td className="py-2 text-gray-600">{measurements.cm}</td>
                              <td className="py-2 text-gray-600">{measurements.us}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4 mb-4">
                    <h4 className="font-medium text-blue-900 mb-2">Como medir seu pé:</h4>
                    <ol className="text-sm text-blue-800 space-y-1">
                      <li>1. Coloque uma folha de papel no chão</li>
                      <li>2. Pise sobre o papel com o pé descalço</li>
                      <li>3. Marque a ponta do dedão e o calcanhar</li>
                      <li>4. Meça a distância entre as marcas</li>
                    </ol>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      className="flex-1 inline-flex justify-center rounded-md border border-transparent bg-primary-100 px-4 py-2 text-sm font-medium text-primary-900 hover:bg-primary-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                      onClick={() => setShowSizeGuide(false)}
                    >
                      Entendi
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
