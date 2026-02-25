import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Shop from '../Shop';
import { ShopContext } from '../../context/ShopContext';
import React from 'react';

// Mock child components
jest.mock('../../components/ProductGrid', () => ({
  ProductGrid: () => <div data-testid="product-grid">Product Grid</div>,
}));

jest.mock('../../components/Pagination', () => ({
  Pagination: () => <div data-testid="pagination">Pagination</div>,
}));

jest.mock('../../components/FilterModal', () => ({
  FilterModal: () => <div data-testid="filter-modal">Filter Modal</div>,
}));

jest.mock('../../components/Skeleton', () => ({
  PaginationSkeleton: () => (
    <div data-testid="pagination-skeleton">Skeleton</div>
  ),
}));

const mockShopContext = {
  products: [],
  loading: false,
  error: null,
  pagination: null,
  categories: [],
  currentPage: 1,
  selectedCategory: '',
  searchQuery: '',
  isFilterOpen: false,

  setCurrentPage: jest.fn(),
  setSelectedCategory: jest.fn(),
  setSearchQuery: jest.fn(),
  setIsFilterOpen: jest.fn(),
  handleSearch: jest.fn(),
  handleCategoryChange: jest.fn(),
  handlePageChange: jest.fn(),
  handleReset: jest.fn(),
  addProduct: jest.fn(),
};

const renderWithProviders = (
  ui: React.ReactElement,
  contextValue: unknown = mockShopContext
) => {
  return render(
    <ShopContext.Provider
      value={
        contextValue as React.ComponentProps<
          typeof ShopContext.Provider
        >['value']
      }
    >
      {ui}
    </ShopContext.Provider>
  );
};

describe('Shop Page', () => {
  it('renders skeleton when loading with no pagination', () => {
    renderWithProviders(<Shop />, { ...mockShopContext, loading: true });

    expect(screen.getByTestId('product-grid')).toBeInTheDocument();
    expect(screen.getByTestId('pagination-skeleton')).toBeInTheDocument();
    expect(screen.queryByTestId('pagination')).not.toBeInTheDocument();
    expect(screen.getByTestId('filter-modal')).toBeInTheDocument();
  });

  it('renders pagination when loaded and pagination exists', () => {
    const loadedContext = {
      ...mockShopContext,
      loading: false,
      pagination: { page: 1, pages: 2, total: 10, limit: 8 },
    };

    renderWithProviders(<Shop />, loadedContext);

    expect(screen.getByTestId('product-grid')).toBeInTheDocument();
    expect(screen.queryByTestId('pagination-skeleton')).not.toBeInTheDocument();
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
    expect(screen.getByTestId('filter-modal')).toBeInTheDocument();
  });

  it('renders correctly when loading with existing pagination', () => {
    const loadingContext = {
      ...mockShopContext,
      loading: true,
      pagination: { page: 1, pages: 2, total: 10, limit: 8 },
    };

    renderWithProviders(<Shop />, loadingContext);

    // Should show pagination instead of skeleton even when loading, if pagination data exists
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
    expect(screen.queryByTestId('pagination-skeleton')).not.toBeInTheDocument();
  });
});
