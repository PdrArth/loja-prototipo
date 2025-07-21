import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import CartPage from '../page';
import { useCart } from '@/hooks/useCart';
import { CartItem } from '@/types/Product';

// Mock do Next.js router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock do hook useCart
jest.mock('@/hooks/useCart', () => ({
  useCart: jest.fn(),
}));

// Mock do componente Link do Next.js
jest.mock('next/link', () => {
  return function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>;
  };
});

const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
const mockUseCart = useCart as jest.MockedFunction<typeof useCart>;

describe('CartPage', () => {
  const mockPush = jest.fn();
  
  beforeEach(() => {
    mockUseRouter.mockReturnValue({
      push: mockPush,
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Empty Cart State', () => {
    beforeEach(() => {
      mockUseCart.mockReturnValue({
        items: [],
        addToCart: jest.fn(),
        updateQuantity: jest.fn(),
        removeFromCart: jest.fn(),
        clearCart: jest.fn(),
        getTotalItems: jest.fn(() => 0),
        getTotalPrice: jest.fn(() => 0),
        isInCart: jest.fn(() => false),
        getCartItem: jest.fn(() => undefined),
      });
    });

    it('should render empty cart state', () => {
      render(<CartPage />);
      
      expect(screen.getByText('Seu carrinho está vazio')).toBeInTheDocument();
      expect(screen.getByText('Adicione alguns produtos para começar suas compras')).toBeInTheDocument();
      expect(screen.getByText('Continuar Comprando')).toBeInTheDocument();
    });

    it('should have link to home page', () => {
      render(<CartPage />);
      
      const continueShoppingLink = screen.getByRole('link', { name: /continuar comprando/i });
      expect(continueShoppingLink).toHaveAttribute('href', '/');
    });
  });

  describe('Cart with Items', () => {
    const mockCartItems: CartItem[] = [
      {
        produto: {
          id: '1',
          nome: 'Produto Teste 1',
          descricao: 'Descrição do produto teste 1',
          imagem: 'https://example.com/image1.jpg',
          preco: 99.90,
        },
        quantidade: 2,
      },
      {
        produto: {
          id: '2',
          nome: 'Produto Teste 2',
          descricao: 'Descrição do produto teste 2',
          imagem: 'https://example.com/image2.jpg',
          preco: 149.90,
        },
        quantidade: 1,
      },
    ];

    const mockUpdateQuantity = jest.fn();
    const mockRemoveFromCart = jest.fn();

    beforeEach(() => {
      mockUseCart.mockReturnValue({
        items: mockCartItems,
        addToCart: jest.fn(),
        updateQuantity: mockUpdateQuantity,
        removeFromCart: mockRemoveFromCart,
        clearCart: jest.fn(),
        getTotalItems: jest.fn(() => 3),
        getTotalPrice: jest.fn(() => 349.70),
        isInCart: jest.fn(() => true),
        getCartItem: jest.fn(),
      });
    });

    it('should render cart with items', () => {
      render(<CartPage />);
      
      expect(screen.getByText('Seu Carrinho')).toBeInTheDocument();
      expect(screen.getByText('3 itens no seu carrinho')).toBeInTheDocument();
      expect(screen.getByText('Itens do Carrinho')).toBeInTheDocument();
      expect(screen.getByText('Resumo do Pedido')).toBeInTheDocument();
    });

    it('should display correct total price', () => {
      render(<CartPage />);
      
      // Verifica se o preço total aparece no resumo
      const totalElements = screen.getAllByText('R$ 349,70');
      expect(totalElements.length).toBeGreaterThan(0);
    });

    it('should display correct item count', () => {
      render(<CartPage />);
      
      expect(screen.getByText('Subtotal (3 itens)')).toBeInTheDocument();
    });

    it('should have checkout button', () => {
      render(<CartPage />);
      
      const checkoutButton = screen.getByRole('link', { name: /ir para checkout/i });
      expect(checkoutButton).toHaveAttribute('href', '/checkout');
    });

    it('should have continue shopping link', () => {
      render(<CartPage />);
      
      const continueShoppingLink = screen.getByRole('link', { name: /continuar comprando/i });
      expect(continueShoppingLink).toHaveAttribute('href', '/');
    });

    it('should display free shipping message', () => {
      render(<CartPage />);
      
      expect(screen.getByText('Grátis')).toBeInTheDocument();
      expect(screen.getByText('Frete grátis para todo o Brasil')).toBeInTheDocument();
    });
  });

  describe('Single Item Cart', () => {
    beforeEach(() => {
      mockUseCart.mockReturnValue({
        items: [{
          produto: {
            id: '1',
            nome: 'Produto Único',
            descricao: 'Descrição do produto único',
            imagem: 'https://example.com/image.jpg',
            preco: 99.90,
          },
          quantidade: 1,
        }],
        addToCart: jest.fn(),
        updateQuantity: jest.fn(),
        removeFromCart: jest.fn(),
        clearCart: jest.fn(),
        getTotalItems: jest.fn(() => 1),
        getTotalPrice: jest.fn(() => 99.90),
        isInCart: jest.fn(() => true),
        getCartItem: jest.fn(),
      });
    });

    it('should use singular form for single item', () => {
      render(<CartPage />);
      
      expect(screen.getByText('1 item no seu carrinho')).toBeInTheDocument();
      expect(screen.getByText('Subtotal (1 item)')).toBeInTheDocument();
    });
  });
});