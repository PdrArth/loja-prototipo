import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import CheckoutPage from '../page';
import { useCart } from '@/hooks/useCart';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock useCart hook
jest.mock('@/hooks/useCart', () => ({
  useCart: jest.fn(),
}));

// Mock next/link
jest.mock('next/link', () => {
  return function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>;
  };
});

const mockPush = jest.fn();
const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
const mockUseCart = useCart as jest.MockedFunction<typeof useCart>;

describe('CheckoutPage', () => {
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

  it('should redirect to shopping when cart is empty', () => {
    mockUseCart.mockReturnValue({
      items: [],
      getTotalPrice: () => 0,
      getTotalItems: () => 0,
      clearCart: jest.fn(),
      addToCart: jest.fn(),
      updateQuantity: jest.fn(),
      removeFromCart: jest.fn(),
      isInCart: jest.fn(),
      getCartItem: jest.fn(),
    });

    render(<CheckoutPage />);

    expect(screen.getByText('Carrinho vazio')).toBeInTheDocument();
    expect(screen.getByText('Adicione produtos ao carrinho antes de finalizar o pedido')).toBeInTheDocument();
    expect(screen.getByText('Ir às Compras')).toBeInTheDocument();
  });

  it('should display order summary with cart items', () => {
    const mockItems = [
      {
        produto: {
          id: '1',
          nome: 'Produto Teste',
          descricao: 'Descrição do produto teste',
          imagem: 'https://example.com/image.jpg',
          preco: 99.90,
        },
        quantidade: 2,
      },
    ];

    mockUseCart.mockReturnValue({
      items: mockItems,
      getTotalPrice: () => 199.80,
      getTotalItems: () => 2,
      clearCart: jest.fn(),
      addToCart: jest.fn(),
      updateQuantity: jest.fn(),
      removeFromCart: jest.fn(),
      isInCart: jest.fn(),
      getCartItem: jest.fn(),
    });

    render(<CheckoutPage />);

    expect(screen.getByText('Finalizar Pedido')).toBeInTheDocument();
    expect(screen.getByText('Resumo do Pedido')).toBeInTheDocument();
    expect(screen.getByText('Produto Teste')).toBeInTheDocument();
    expect(screen.getByText('Quantidade: 2')).toBeInTheDocument();
    expect(screen.getByText('R$ 199,80')).toBeInTheDocument();
    expect(screen.getByText('Total do Pedido')).toBeInTheDocument();
  });

  it('should process order and show success message', async () => {
    const mockClearCart = jest.fn();
    const mockItems = [
      {
        produto: {
          id: '1',
          nome: 'Produto Teste',
          descricao: 'Descrição do produto teste',
          imagem: 'https://example.com/image.jpg',
          preco: 99.90,
        },
        quantidade: 1,
      },
    ];

    mockUseCart.mockReturnValue({
      items: mockItems,
      getTotalPrice: () => 99.90,
      getTotalItems: () => 1,
      clearCart: mockClearCart,
      addToCart: jest.fn(),
      updateQuantity: jest.fn(),
      removeFromCart: jest.fn(),
      isInCart: jest.fn(),
      getCartItem: jest.fn(),
    });

    render(<CheckoutPage />);

    const finalizarButton = screen.getByRole('button', { name: /finalizar pedido/i });
    fireEvent.click(finalizarButton);

    // Should show processing state
    expect(screen.getByText('Processando...')).toBeInTheDocument();

    // Wait for order completion
    await waitFor(() => {
      expect(screen.getByText('Pedido Finalizado com Sucesso!')).toBeInTheDocument();
    }, { timeout: 3000 });

    expect(mockClearCart).toHaveBeenCalled();
    expect(screen.getByText('Obrigado pela sua compra! Seu pedido foi processado e você receberá um e-mail de confirmação em breve.')).toBeInTheDocument();
    expect(screen.getByText('Voltar à Página Inicial')).toBeInTheDocument();
  });

  it('should display correct totals and breakdown', () => {
    const mockItems = [
      {
        produto: {
          id: '1',
          nome: 'Produto 1',
          descricao: 'Descrição 1',
          imagem: 'https://example.com/image1.jpg',
          preco: 50.00,
        },
        quantidade: 2,
      },
      {
        produto: {
          id: '2',
          nome: 'Produto 2',
          descricao: 'Descrição 2',
          imagem: 'https://example.com/image2.jpg',
          preco: 75.50,
        },
        quantidade: 1,
      },
    ];

    mockUseCart.mockReturnValue({
      items: mockItems,
      getTotalPrice: () => 175.50,
      getTotalItems: () => 3,
      clearCart: jest.fn(),
      addToCart: jest.fn(),
      updateQuantity: jest.fn(),
      removeFromCart: jest.fn(),
      isInCart: jest.fn(),
      getCartItem: jest.fn(),
    });

    render(<CheckoutPage />);

    expect(screen.getByText('Subtotal (3 itens)')).toBeInTheDocument();
    expect(screen.getByText('Frete')).toBeInTheDocument();
    expect(screen.getByText('Grátis')).toBeInTheDocument();
    expect(screen.getByText('Impostos')).toBeInTheDocument();
    expect(screen.getByText('Inclusos')).toBeInTheDocument();
    expect(screen.getByText('Total Final')).toBeInTheDocument();
  });

  it('should have navigation links', () => {
    const mockItems = [
      {
        produto: {
          id: '1',
          nome: 'Produto Teste',
          descricao: 'Descrição do produto teste',
          imagem: 'https://example.com/image.jpg',
          preco: 99.90,
        },
        quantidade: 1,
      },
    ];

    mockUseCart.mockReturnValue({
      items: mockItems,
      getTotalPrice: () => 99.90,
      getTotalItems: () => 1,
      clearCart: jest.fn(),
      addToCart: jest.fn(),
      updateQuantity: jest.fn(),
      removeFromCart: jest.fn(),
      isInCart: jest.fn(),
      getCartItem: jest.fn(),
    });

    render(<CheckoutPage />);

    expect(screen.getByText('Voltar ao Carrinho')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /voltar ao carrinho/i })).toHaveAttribute('href', '/carrinho');
  });
});