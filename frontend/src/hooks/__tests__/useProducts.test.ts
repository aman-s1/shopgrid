import { renderHook, waitFor } from '@testing-library/react';
import { useProducts } from '../useProducts';
global.fetch = jest.fn() as jest.Mock;

describe('useProducts', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it('should fetch products on mount', async () => {
    const mockData = {
      products: [
        {
          _id: '1',
          title: 'Product 1',
          price: 10,
          category: 'cat1',
          image: 'img1',
          brand: 'b1',
          rating: 4.5,
          numReviews: 10,
          countInStock: 5,
          description: 'desc1',
        },
      ],
      categories: ['cat1'],
      pagination: { page: 1, pages: 1, total: 1 },
    };

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockData,
    });

    const { result } = renderHook(() => useProducts());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.products).toEqual(mockData.products);
    expect(result.current.categories).toEqual(mockData.categories);
  });

  it('should handle fetch error', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 500,
    });

    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe(
      'Failed to load products. Please try again.'
    );
  });
});
