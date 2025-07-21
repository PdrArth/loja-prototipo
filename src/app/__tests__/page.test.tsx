import { render, screen, waitFor } from '@testing-library/react';
import Home from '../page';
import { getAllProducts } from '@/data/products';

// Mock the data module
jest.mock('@/data/products', () => ({
  getAllProducts: jest.fn()
}));

const mockGetAllProducts = getAllProducts as jest.MockedFunction<typeof getAllProducts>;

describe('Home Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render loading state initially', () => {
    mockGetAllProducts.mockReturnValue([]);
    render(<Home />);
    
    expect(screen.getByText('Carregando produtos...')).toBeInTheDocument();
  });

  it('should render product grid after loading', async () => {
    const mockProducts = [
      {
        id: '1',
        nome: 'Test Product 1',
        descricao: 'Test description',
        imagem: 'https://example.com/image1.jpg',
        preco: 99.90
      },
      {
        id: '2',
        nome: 'Test Product 2',
        descricao: 'Test description 2',
        imagem: 'https://example.com/image2.jpg',
        preco: 149.90
      }
    ];

    mockGetAllProducts.mockReturnValue(mockProducts);
    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText('Test Product 1')).toBeInTheDocument();
      expect(screen.getByText('Test Product 2')).toBeInTheDocument();
    });

    expect(screen.getByText('2 produtos disponíveis')).toBeInTheDocument();
  });

  it('should render error state when products fail to load', async () => {
    mockGetAllProducts.mockImplementation(() => {
      throw new Error('Failed to load');
    });

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText('Ops! Algo deu errado')).toBeInTheDocument();
      expect(screen.getByText('Erro ao carregar produtos. Tente novamente.')).toBeInTheDocument();
    });
  });

  it('should have responsive grid classes', async () => {
    const mockProducts = [
      {
        id: '1',
        nome: 'Test Product',
        descricao: 'Test description',
        imagem: 'https://example.com/image.jpg',
        preco: 99.90
      }
    ];

    mockGetAllProducts.mockReturnValue(mockProducts);
    const { container } = render(<Home />);

    await waitFor(() => {
      const gridContainer = container.querySelector('.grid');
      expect(gridContainer).toHaveClass(
        'grid-cols-1',
        'sm:grid-cols-2', 
        'md:grid-cols-3',
        'lg:grid-cols-4',
        'xl:grid-cols-4'
      );
    });
  });
});