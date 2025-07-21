import React from 'react';
import { CartItem } from './CartItem';
import { CartItem as CartItemType } from '@/types/Product';

// Mock product data for stories
const mockProduct = {
  id: '1',
  nome: 'Smartphone Galaxy Pro',
  descricao: 'Smartphone com tela de 6.5 polegadas, 128GB de armazenamento e câmera tripla de alta resolução.',
  imagem: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
  preco: 899.90
};

const mockCartItem: CartItemType = {
  produto: mockProduct,
  quantidade: 2
};

// Story component for demonstration
export default {
  title: 'Components/CartItem',
  component: CartItem,
};

export const Default = () => {
  const handleUpdateQuantity = (productId: string, quantity: number) => {
    console.log(`Update quantity for product ${productId} to ${quantity}`);
  };

  const handleRemove = (productId: string) => {
    console.log(`Remove product ${productId} from cart`);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <CartItem
        item={mockCartItem}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemove}
      />
    </div>
  );
};

export const MinQuantity = () => {
  const itemWithMinQuantity: CartItemType = {
    produto: mockProduct,
    quantidade: 1
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    console.log(`Update quantity for product ${productId} to ${quantity}`);
  };

  const handleRemove = (productId: string) => {
    console.log(`Remove product ${productId} from cart`);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <CartItem
        item={itemWithMinQuantity}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemove}
      />
    </div>
  );
};

export const MaxQuantity = () => {
  const itemWithMaxQuantity: CartItemType = {
    produto: mockProduct,
    quantidade: 99
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    console.log(`Update quantity for product ${productId} to ${quantity}`);
  };

  const handleRemove = (productId: string) => {
    console.log(`Remove product ${productId} from cart`);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <CartItem
        item={itemWithMaxQuantity}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemove}
      />
    </div>
  );
};

export const MultipleItems = () => {
  const items: CartItemType[] = [
    {
      produto: {
        id: '1',
        nome: 'Smartphone Galaxy Pro',
        descricao: 'Smartphone avançado',
        imagem: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
        preco: 899.90
      },
      quantidade: 2
    },
    {
      produto: {
        id: '2',
        nome: 'Notebook Dell Inspiron',
        descricao: 'Notebook para trabalho',
        imagem: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400',
        preco: 2499.90
      },
      quantidade: 1
    },
    {
      produto: {
        id: '3',
        nome: 'Fone de Ouvido Bluetooth',
        descricao: 'Fone sem fio premium',
        imagem: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
        preco: 299.90
      },
      quantidade: 3
    }
  ];

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    console.log(`Update quantity for product ${productId} to ${quantity}`);
  };

  const handleRemove = (productId: string) => {
    console.log(`Remove product ${productId} from cart`);
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      {items.map((item) => (
        <CartItem
          key={item.produto.id}
          item={item}
          onUpdateQuantity={handleUpdateQuantity}
          onRemove={handleRemove}
        />
      ))}
    </div>
  );
};