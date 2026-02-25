import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { ShopProvider, useShop } from '../ShopContext';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';

// Mock the global fetch
global.fetch = jest.fn() as jest.Mock;

const TestComponent = () => {
    const { products, loading } = useShop();
    return (
        <div>
            {loading ? (
                <div data-testid="loading">Loading...</div>
            ) : (
                <ul data-testid="products">
                    {products.map((p) => (
                        <li key={p._id}>{p.title}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

describe('ShopContext', () => {
    beforeEach(() => {
        (global.fetch as jest.Mock).mockClear();
    });

    it('provides products from API', async () => {
        const mockProducts = [
            { _id: '1', title: 'Test Product', price: 100, category: 'test', image: 'test.jpg' },
        ];

        const mockData = {
            products: mockProducts,
            categories: ['test'],
            pagination: { page: 1, pages: 1, total: 1 }
        };

        (global.fetch as jest.Mock).mockResolvedValue({
            ok: true,
            json: async () => mockData,
        });

        render(
            <BrowserRouter>
                <ShopProvider>
                    <TestComponent />
                </ShopProvider>
            </BrowserRouter>
        );

        expect(screen.getByTestId('loading')).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
        });

        expect(screen.getByTestId('products')).toHaveTextContent('Test Product');
    });
});
