import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SearchBar } from '../SearchBar';
import { useRouter } from 'next/navigation';

// Mock do useRouter
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock dos produtos
jest.mock('@/data/products', () => ({
  searchProducts: jest.fn((query) => [
    {
      id: '1',
      nome: 'Tênis Nike',
      marca: 'Nike',
      preco: 299.90,
      imagem: 'test-image.jpg'
    }
  ])
}));

const mockPush = jest.fn();
(useRouter as jest.Mock).mockReturnValue({
  push: mockPush,
});

describe('SearchBar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar corretamente', () => {
    render(<SearchBar />);
    
    const input = screen.getByPlaceholderText('Buscar produtos...');
    expect(input).toBeInTheDocument();
  });

  it('deve mostrar sugestões quando o usuário digita', async () => {
    render(<SearchBar />);
    
    const input = screen.getByPlaceholderText('Buscar produtos...');
    fireEvent.change(input, { target: { value: 'tenis' } });

    await waitFor(() => {
      expect(screen.getByText('Tênis Nike')).toBeInTheDocument();
    });
  });

  it('deve navegar para produtos quando submete o formulário', () => {
    render(<SearchBar />);
    
    const input = screen.getByPlaceholderText('Buscar produtos...');
    fireEvent.change(input, { target: { value: 'tenis' } });
    fireEvent.submit(input.closest('form')!);

    expect(mockPush).toHaveBeenCalledWith('/produtos?busca=tenis');
  });

  it('deve chamar onSearch quando fornecido', () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText('Buscar produtos...');
    fireEvent.change(input, { target: { value: 'tenis' } });
    fireEvent.submit(input.closest('form')!);

    expect(mockOnSearch).toHaveBeenCalledWith('tenis');
  });

  it('deve fechar sugestões ao clicar fora', async () => {
    render(<SearchBar />);
    
    const input = screen.getByPlaceholderText('Buscar produtos...');
    fireEvent.change(input, { target: { value: 'tenis' } });

    await waitFor(() => {
      expect(screen.getByText('Tênis Nike')).toBeInTheDocument();
    });

    fireEvent.mouseDown(document.body);

    await waitFor(() => {
      expect(screen.queryByText('Tênis Nike')).not.toBeInTheDocument();
    });
  });
});
