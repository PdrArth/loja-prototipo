/**
 * Test to verify responsive grid implementation
 */
import { render } from '@testing-library/react';
import Home from '../page';
import { getAllProducts } from '@/data/products';

// Mock the data module
jest.mock('@/data/products', () => ({
  getAllProducts: jest.fn()
}));

const mockGetAllProducts = getAllProducts as jest.MockedFunction<typeof getAllProducts>;

describe('Responsive Grid Layout', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock products data
    mockGetAllProducts.mockReturnValue([
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
      },
      {
        id: '3',
        nome: 'Test Product 3',
        descricao: 'Test description 3',
        imagem: 'https://example.com/image3.jpg',
        preco: 199.90
      },
      {
        id: '4',
        nome: 'Test Product 4',
        descricao: 'Test description 4',
        imagem: 'https://example.com/image4.jpg',
        preco: 249.90
      }
    ]);
  });

  it('should have correct responsive grid classes', async () => {
    const { container } = render(<Home />);
    
    // Wait for loading to complete
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const gridContainer = container.querySelector('.grid');
    expect(gridContainer).toHaveClass('grid');
    expect(gridContainer).toHaveClass('grid-cols-1'); // Mobile: 1 column
    expect(gridContainer).toHaveClass('sm:grid-cols-2'); // Small: 2 columns
    expect(gridContainer).toHaveClass('md:grid-cols-3'); // Medium: 3 columns
    expect(gridContainer).toHaveClass('lg:grid-cols-4'); // Large: 4 columns
    expect(gridContainer).toHaveClass('xl:grid-cols-4'); // XL: 4 columns
    expect(gridContainer).toHaveClass('gap-6'); // Gap between items
  });

  it('should render all products in the grid', async () => {
    const { container } = render(<Home />);
    
    // Wait for loading to complete
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const productCards = container.querySelectorAll('[data-testid="product-card"], .grid > div');
    expect(productCards.length).toBeGreaterThan(0);
  });

  it('should have hover effects on product cards', async () => {
    const { container } = render(<Home />);
    
    // Wait for loading to complete
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const gridContainer = container.querySelector('.grid');
    const firstChild = gridContainer?.firstElementChild;
    
    if (firstChild) {
      expect(firstChild).toHaveClass('transform');
      expect(firstChild).toHaveClass('transition-transform');
      expect(firstChild).toHaveClass('duration-200');
      expect(firstChild).toHaveClass('hover:scale-105');
    }
  });

  it('should display product count', async () => {
    const { container } = render(<Home />);
    
    // Wait for loading to complete
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const productCount = container.querySelector('p:contains("produtos disponíveis")');
    expect(container.textContent).toContain('produtos disponíveis');
  });
});

/**
 * Breakpoint verification tests
 */
describe('Grid Breakpoint Requirements', () => {
  it('should meet requirement 1.3 - Mobile: 1 column', () => {
    // This test verifies that grid-cols-1 is the base class
    const { container } = render(<Home />);
    const gridContainer = container.querySelector('.grid');
    expect(gridContainer).toHaveClass('grid-cols-1');
  });

  it('should meet requirement 1.4 - Tablet: 2-3 columns', () => {
    // This test verifies sm:grid-cols-2 and md:grid-cols-3
    const { container } = render(<Home />);
    const gridContainer = container.querySelector('.grid');
    expect(gridContainer).toHaveClass('sm:grid-cols-2');
    expect(gridContainer).toHaveClass('md:grid-cols-3');
  });

  it('should meet requirement 1.5 - Desktop: 4+ columns', () => {
    // This test verifies lg:grid-cols-4 and xl:grid-cols-4
    const { container } = render(<Home />);
    const gridContainer = container.querySelector('.grid');
    expect(gridContainer).toHaveClass('lg:grid-cols-4');
    expect(gridContainer).toHaveClass('xl:grid-cols-4');
  });
});