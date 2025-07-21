import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CartIcon } from '../index';

describe('CartIcon Component', () => {
  it('renders cart icon with default props', () => {
    render(<CartIcon />);
    
    const container = document.querySelector('.relative.inline-flex');
    const svg = container?.querySelector('svg');
    
    expect(container).toBeInTheDocument();
    expect(svg).toHaveClass('h-6', 'w-6');
  });

  it('applies small size correctly', () => {
    render(<CartIcon size="sm" />);
    
    const container = document.querySelector('.relative.inline-flex');
    const svg = container?.querySelector('svg');
    
    expect(svg).toHaveClass('h-5', 'w-5');
  });

  it('applies large size correctly', () => {
    render(<CartIcon size="lg" />);
    
    const container = document.querySelector('.relative.inline-flex');
    const svg = container?.querySelector('svg');
    
    expect(svg).toHaveClass('h-8', 'w-8');
  });

  it('applies custom className', () => {
    render(<CartIcon className="text-red-500" />);
    
    const container = document.querySelector('.relative.inline-flex');
    expect(container).toHaveClass('text-red-500');
  });

  it('does not show badge when itemCount is 0', () => {
    render(<CartIcon itemCount={0} />);
    
    expect(screen.queryByText('0')).not.toBeInTheDocument();
  });

  it('shows badge when itemCount is greater than 0', () => {
    render(<CartIcon itemCount={3} />);
    
    const badge = screen.getByText('3');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-primary-600', 'text-white');
  });

  it('shows 99+ when itemCount is greater than 99', () => {
    render(<CartIcon itemCount={150} />);
    
    expect(screen.getByText('99+')).toBeInTheDocument();
  });

  it('hides badge when showBadge is false', () => {
    render(<CartIcon itemCount={5} showBadge={false} />);
    
    expect(screen.queryByText('5')).not.toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<CartIcon onClick={handleClick} />);
    
    const container = document.querySelector('.relative.inline-flex');
    fireEvent.click(container!);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies different badge styles for large numbers', () => {
    render(<CartIcon itemCount={15} />);
    
    const badge = screen.getByText('15');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('px-1.5', 'py-0.5');
  });

  it('applies animation classes when itemCount is greater than 0', () => {
    render(<CartIcon itemCount={1} />);
    
    const badge = screen.getByText('1');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('animate-pulse');
  });

  it('has proper hover styles', () => {
    render(<CartIcon />);
    
    const container = document.querySelector('.relative.inline-flex');
    expect(container).toHaveClass('hover:text-primary-600');
  });
});