import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useParams, useRouter } from 'next/navigation';
import ProductDetailsPage from '../page';
import { CartProvider } from '@/contexts/CartContext';
import { getProductById } from '@/data/products';

// Mock Next.js hooks
jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
  useRouter: jest.fn(),
}));

// Mock data functions
jest.mock('@/data/products', () => ({
  getProductById: jest.fn(),
}));

// Mock Next.js Image component
jest.mock('next/image', () => {
  return function MockImage({ src, alt, ...props }: any) {
    return <img src={src} alt={alt} {...props} />;
  };
});

const mockProduct = {
  id: '1',
  nome: 'Scarpin Clássico Preto',
  descricao: 'Scarpin elegante em couro legítimo, perfeito para ocasiões especiais e uso profissional.',
  imagem: 'https://example.com/image.jpg',
  preco: 189.90
};

const mockRouter = {
  push: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
  refresh: jest.fn(),
  replace: jest.fn(),
};

const renderWithCart = (component: React.ReactElement) => {
  return render(
    <CartProvider>
      {component}
    </CartProvider>
  );
};

describe('ProductDetailsPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it('should render loading state initially', () => {
    (useParams as jest.Mock).mockReturnValue({ id: '1' });
    (getProductById as jest.Mock).mockReturnValue(mockProduct);

    renderWithCart(<ProductDetailsPage />);

    expect(screen.getByText('Voltar para produtos')).toBeInTheDocument();
    // Loading skeleton should be visible
    expect(document.querySelector('.animate-pulse')).toBeInTheDocument();
  });

  it('should render product details when product is found', async () => {
    (useParams as jest.Mock).mockReturnValue({ id: '1' });
    (getProductById as jest.Mock).mockReturnValue(mockProduct);

    renderWithCart(<ProductDetailsPage />);

    await waitFor(() => {
      expect(screen.getByText(mockProduct.nome)).toBeInTheDocument();
    });

    expect(screen.getByText('R$ 189,90')).toBeInTheDocument();
    expect(screen.getByText(mockProduct.descricao)).toBeInTheDocument();
    expect(screen.getByText('Adicionar ao carrinho')).toBeInTheDocument();
  });

  it('should render not found state when product does not exist', async () => {
    (useParams as jest.Mock).mockReturnValue({ id: 'invalid-id' });
    (getProductById as jest.Mock).mockReturnValue(undefined);

    renderWithCart(<ProductDetailsPage />);

    await waitFor(() => {
      expect(screen.getByText('Produto não encontrado')).toBeInTheDocument();
    });

    expect(screen.getByText('O produto que você está procurando não existe ou foi removido.')).toBeInTheDocument();
    expect(screen.getByText('Ver todos os produtos')).toBeInTheDocument();
  });

  it('should add product to cart when button is clicked', async () => {
    (useParams as jest.Mock).mockReturnValue({ id: '1' });
    (getProductById as jest.Mock).mockReturnValue(mockProduct);

    renderWithCart(<ProductDetailsPage />);

    await waitFor(() => {
      expect(screen.getByText(mockProduct.nome)).toBeInTheDocument();
    });

    const addToCartButton = screen.getByText('Adicionar ao carrinho');
    fireEvent.click(addToCartButton);

    await waitFor(() => {
      expect(screen.getByText('Produto adicionado ao carrinho com sucesso!')).toBeInTheDocument();
    });
  });

  it('should show breadcrumb navigation', async () => {
    (useParams as jest.Mock).mockReturnValue({ id: '1' });
    (getProductById as jest.Mock).mockReturnValue(mockProduct);

    renderWithCart(<ProductDetailsPage />);

    const breadcrumbLink = screen.getByText('Voltar para produtos');
    expect(breadcrumbLink).toBeInTheDocument();
    expect(breadcrumbLink.closest('a')).toHaveAttribute('href', '/');
  });

  it('should navigate to cart when "Ver carrinho" button is clicked', async () => {
    (useParams as jest.Mock).mockReturnValue({ id: '1' });
    (getProductById as jest.Mock).mockReturnValue(mockProduct);

    renderWithCart(<ProductDetailsPage />);

    await waitFor(() => {
      expect(screen.getByText(mockProduct.nome)).toBeInTheDocument();
    });

    const viewCartButton = screen.getByText('Ver carrinho');
    fireEvent.click(viewCartButton);

    expect(mockRouter.push).toHaveBeenCalledWith('/carrinho');
  });

  it('should navigate to home when "Continuar comprando" button is clicked', async () => {
    (useParams as jest.Mock).mockReturnValue({ id: '1' });
    (getProductById as jest.Mock).mockReturnValue(mockProduct);

    renderWithCart(<ProductDetailsPage />);

    await waitFor(() => {
      expect(screen.getByText(mockProduct.nome)).toBeInTheDocument();
    });

    const continueShoppingButton = screen.getByText('Continuar comprando');
    fireEvent.click(continueShoppingButton);

    expect(mockRouter.push).toHaveBeenCalledWith('/');
  });
});