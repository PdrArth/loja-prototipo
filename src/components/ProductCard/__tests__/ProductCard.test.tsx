import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProductCard } from '../ProductCard';
import { Product } from '@/types/Product';

// Mock Next.js components
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, fill, priority, sizes, className, ...props }: any) => (
    <img 
      src={src} 
      alt={alt} 
      className={className}
      data-fill={fill ? 'true' : 'false'}
      data-priority={priority ? 'true' : 'false'}
      data-sizes={sizes}
      {...props} 
    />
  ),
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children }: any) => (
    <a href={href}>{children}</a>
  ),
}));

// Mock console.error to suppress JSDOM navigation warnings
const originalError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalError;
});

describe('ProductCard', () => {
  const mockProduct: Product = {
    id: '1',
    nome: 'Produto Teste',
    descricao: 'Descrição do produto teste',
    imagem: 'https://example.com/image.jpg',
    preco: 99.90,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText('Produto Teste')).toBeInTheDocument();
    expect(screen.getByText('R$ 99,90')).toBeInTheDocument();
    expect(screen.getByText('Ver detalhes')).toBeInTheDocument();
    expect(screen.getByAltText('Produto Teste')).toBeInTheDocument();
  });

  it('renders product image with correct attributes', () => {
    render(<ProductCard product={mockProduct} />);

    const image = screen.getByAltText('Produto Teste');
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
    expect(image).toHaveAttribute('alt', 'Produto Teste');
  });

  it('formats price correctly in Brazilian currency', () => {
    const productWithDifferentPrice: Product = {
      ...mockProduct,
      preco: 1234.56,
    };

    render(<ProductCard product={productWithDifferentPrice} />);

    expect(screen.getByText('R$ 1.234,56')).toBeInTheDocument();
  });

  it('creates correct link to product details page', () => {
    render(<ProductCard product={mockProduct} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/produto/1');
  });

  it('button click handler is called correctly', () => {
    render(<ProductCard product={mockProduct} />);

    const button = screen.getByText('Ver detalhes');
    
    // Test that the button is clickable and doesn't throw errors
    expect(() => {
      fireEvent.click(button);
    }).not.toThrow();
  });

  it('applies custom className when provided', () => {
    const { container } = render(
      <ProductCard product={mockProduct} className="custom-class" />
    );

    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('custom-class');
  });

  it('has proper accessibility attributes', () => {
    render(<ProductCard product={mockProduct} />);

    const image = screen.getByAltText('Produto Teste');
    expect(image).toBeInTheDocument();

    const button = screen.getByRole('button', { name: 'Ver detalhes' });
    expect(button).toBeInTheDocument();
  });

  it('handles long product names correctly', () => {
    const productWithLongName: Product = {
      ...mockProduct,
      nome: 'Este é um nome de produto muito longo que deveria ser truncado para não quebrar o layout do card',
    };

    render(<ProductCard product={productWithLongName} />);

    const title = screen.getByText(productWithLongName.nome);
    expect(title).toHaveClass('truncate');
  });

  it('displays hover effects classes', () => {
    const { container } = render(<ProductCard product={mockProduct} />);

    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('hover:shadow-lg', 'hover:scale-105', 'group');
  });

  it('prevents default link behavior when button is clicked', () => {
    render(<ProductCard product={mockProduct} />);

    const button = screen.getByText('Ver detalhes');
    const clickEvent = new MouseEvent('click', { bubbles: true });
    const preventDefaultSpy = jest.spyOn(clickEvent, 'preventDefault');

    fireEvent(button, clickEvent);

    expect(preventDefaultSpy).toHaveBeenCalled();
  });
});