import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CartItem } from '../CartItem';
import { CartItem as CartItemType } from '@/types/Product';

// Mock do next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => (
    <img src={src} alt={alt} {...props} />
  ),
}));

// No need to mock icons since we're using inline SVG

describe('CartItem', () => {
  const mockProduct = {
    id: '1',
    nome: 'Produto Teste',
    descricao: 'Descrição do produto teste',
    imagem: 'https://example.com/image.jpg',
    preco: 99.90
  };

  const mockCartItem: CartItemType = {
    produto: mockProduct,
    quantidade: 2
  };

  const mockOnUpdateQuantity = jest.fn();
  const mockOnRemove = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render cart item with product information', () => {
    render(
      <CartItem
        item={mockCartItem}
        onUpdateQuantity={mockOnUpdateQuantity}
        onRemove={mockOnRemove}
      />
    );

    expect(screen.getByText('Produto Teste')).toBeInTheDocument();
    expect(screen.getByText('R$ 99,90 cada')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('R$ 199,80')).toBeInTheDocument();
  });

  it('should render product image with correct attributes', () => {
    render(
      <CartItem
        item={mockCartItem}
        onUpdateQuantity={mockOnUpdateQuantity}
        onRemove={mockOnRemove}
      />
    );

    const image = screen.getByAltText('Produto Teste');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  it('should call onUpdateQuantity when increment button is clicked', () => {
    render(
      <CartItem
        item={mockCartItem}
        onUpdateQuantity={mockOnUpdateQuantity}
        onRemove={mockOnRemove}
      />
    );

    const incrementButton = screen.getByLabelText('Aumentar quantidade');
    fireEvent.click(incrementButton);

    expect(mockOnUpdateQuantity).toHaveBeenCalledWith('1', 3);
  });

  it('should call onUpdateQuantity when decrement button is clicked', () => {
    render(
      <CartItem
        item={mockCartItem}
        onUpdateQuantity={mockOnUpdateQuantity}
        onRemove={mockOnRemove}
      />
    );

    const decrementButton = screen.getByLabelText('Diminuir quantidade');
    fireEvent.click(decrementButton);

    expect(mockOnUpdateQuantity).toHaveBeenCalledWith('1', 1);
  });

  it('should disable decrement button when quantity is 1', () => {
    const itemWithMinQuantity: CartItemType = {
      produto: mockProduct,
      quantidade: 1
    };

    render(
      <CartItem
        item={itemWithMinQuantity}
        onUpdateQuantity={mockOnUpdateQuantity}
        onRemove={mockOnRemove}
      />
    );

    const decrementButton = screen.getByLabelText('Diminuir quantidade');
    expect(decrementButton).toBeDisabled();
  });

  it('should disable increment button when quantity is 99', () => {
    const itemWithMaxQuantity: CartItemType = {
      produto: mockProduct,
      quantidade: 99
    };

    render(
      <CartItem
        item={itemWithMaxQuantity}
        onUpdateQuantity={mockOnUpdateQuantity}
        onRemove={mockOnRemove}
      />
    );

    const incrementButton = screen.getByLabelText('Aumentar quantidade');
    expect(incrementButton).toBeDisabled();
  });

  it('should not call onUpdateQuantity when decrement is clicked at minimum quantity', () => {
    const itemWithMinQuantity: CartItemType = {
      produto: mockProduct,
      quantidade: 1
    };

    render(
      <CartItem
        item={itemWithMinQuantity}
        onUpdateQuantity={mockOnUpdateQuantity}
        onRemove={mockOnRemove}
      />
    );

    const decrementButton = screen.getByLabelText('Diminuir quantidade');
    fireEvent.click(decrementButton);

    expect(mockOnUpdateQuantity).not.toHaveBeenCalled();
  });

  it('should not call onUpdateQuantity when increment is clicked at maximum quantity', () => {
    const itemWithMaxQuantity: CartItemType = {
      produto: mockProduct,
      quantidade: 99
    };

    render(
      <CartItem
        item={itemWithMaxQuantity}
        onUpdateQuantity={mockOnUpdateQuantity}
        onRemove={mockOnRemove}
      />
    );

    const incrementButton = screen.getByLabelText('Aumentar quantidade');
    fireEvent.click(incrementButton);

    expect(mockOnUpdateQuantity).not.toHaveBeenCalled();
  });

  it('should call onRemove when remove button is clicked', () => {
    render(
      <CartItem
        item={mockCartItem}
        onUpdateQuantity={mockOnUpdateQuantity}
        onRemove={mockOnRemove}
      />
    );

    const removeButton = screen.getByLabelText('Remover Produto Teste do carrinho');
    fireEvent.click(removeButton);

    expect(mockOnRemove).toHaveBeenCalledWith('1');
  });

  it('should calculate and display correct subtotal', () => {
    const itemWithDifferentQuantity: CartItemType = {
      produto: { ...mockProduct, preco: 50.00 },
      quantidade: 3
    };

    render(
      <CartItem
        item={itemWithDifferentQuantity}
        onUpdateQuantity={mockOnUpdateQuantity}
        onRemove={mockOnRemove}
      />
    );

    expect(screen.getByText('R$ 150,00')).toBeInTheDocument();
  });

  it('should apply custom className when provided', () => {
    const { container } = render(
      <CartItem
        item={mockCartItem}
        onUpdateQuantity={mockOnUpdateQuantity}
        onRemove={mockOnRemove}
        className="custom-class"
      />
    );

    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('should have proper accessibility attributes', () => {
    render(
      <CartItem
        item={mockCartItem}
        onUpdateQuantity={mockOnUpdateQuantity}
        onRemove={mockOnRemove}
      />
    );

    expect(screen.getByLabelText('Diminuir quantidade')).toBeInTheDocument();
    expect(screen.getByLabelText('Aumentar quantidade')).toBeInTheDocument();
    expect(screen.getByLabelText('Remover Produto Teste do carrinho')).toBeInTheDocument();
  });

  it('should display quantity controls with proper SVG icons', () => {
    render(
      <CartItem
        item={mockCartItem}
        onUpdateQuantity={mockOnUpdateQuantity}
        onRemove={mockOnRemove}
      />
    );

    // Check if SVG elements are present
    const svgElements = screen.getAllByRole('img', { hidden: true });
    expect(svgElements).toHaveLength(3); // minus, plus, trash icons
  });
});