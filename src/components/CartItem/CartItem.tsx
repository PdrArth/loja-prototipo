'use client';

import React, { useCallback, useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/css-utils';
import { formatPrice } from '@/lib/formatters';
import { CartItemProps } from './CartItem.types';
import {
  containerClasses,
  imageContainerClasses,
  imageClasses,
  contentClasses,
  titleClasses,
  priceClasses,
  controlsClasses,
  quantityControlsClasses,
  quantityButtonClasses,
  quantityDisplayClasses,
  removeButtonClasses,
  subtotalClasses,
  subtotalLabelClasses,
  subtotalValueClasses
} from './CartItem.styles';
import { ProductImage } from '@/components/ui/ProductImage';

/**
 * Componente CartItem - Exibe um item do carrinho com controles de quantidade
 * e opção de remoção
 */
export const CartItem: React.FC<CartItemProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
  className
}) => {
  const { produto, quantidade } = item;
  const subtotal = produto.preco * quantidade;
  const [warning, setWarning] = useState<string | null>(null);

  /**
   * Manipula o incremento da quantidade
   */
  const handleIncrement = useCallback(() => {
    if (quantidade < 99) {
      onUpdateQuantity(produto.id, quantidade + 1);
      setWarning(null);
    } else {
      setWarning('Quantidade máxima atingida (99).');
    }
  }, [produto.id, quantidade, onUpdateQuantity]);

  /**
   * Manipula o decremento da quantidade
   */
  const handleDecrement = useCallback(() => {
    if (quantidade > 1) {
      onUpdateQuantity(produto.id, quantidade - 1);
      setWarning(null);
    } else {
      setWarning('Quantidade mínima é 1.');
    }
  }, [produto.id, quantidade, onUpdateQuantity]);

  /**
   * Manipula a remoção do item
   */
  const handleRemove = useCallback(() => {
    onRemove(produto.id);
  }, [produto.id, onRemove]);

  return (
    <div className={cn(containerClasses, className)}>
      {/* Imagem do produto */}
      <div className={imageContainerClasses}>
        <ProductImage
          src={produto.imagem}
          alt={produto.nome}
          fill
          className={imageClasses}
          sizes="(max-width: 640px) 64px, 80px"
        />
      </div>

      {/* Conteúdo principal */}
      <div className={contentClasses}>
        <h3 className={titleClasses}>
          {produto.nome}
        </h3>
        
        <p className={priceClasses}>
          {formatPrice(produto.preco)} cada
        </p>

        {/* Controles */}
        <div className={controlsClasses}>
          {/* Controles de quantidade */}
          <div className={quantityControlsClasses}>
            <button
              type="button"
              onClick={handleDecrement}
              disabled={quantidade <= 1}
              className={quantityButtonClasses}
              aria-label="Diminuir quantidade"
            >
              <svg
                width={16}
                height={16}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 12H4"
                />
              </svg>
            </button>
            
            <span className={quantityDisplayClasses}>
              {quantidade}
            </span>
            
            <button
              type="button"
              onClick={handleIncrement}
              disabled={quantidade >= 99}
              className={quantityButtonClasses}
              aria-label="Aumentar quantidade"
            >
              <svg
                width={16}
                height={16}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </div>
          {warning && (
            <div className="text-xs text-yellow-600 mt-1">{warning}</div>
          )}

          {/* Botão de remover */}
          <button
            type="button"
            onClick={handleRemove}
            className={removeButtonClasses}
            aria-label={`Remover ${produto.nome} do carrinho`}
          >
            <svg
              width={16}
              height={16}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Subtotal */}
      <div className={subtotalClasses}>
        <span className={subtotalLabelClasses}>
          Subtotal
        </span>
        <span className={subtotalValueClasses}>
          {formatPrice(subtotal)}
        </span>
      </div>
    </div>
  );
};

CartItem.displayName = 'CartItem';