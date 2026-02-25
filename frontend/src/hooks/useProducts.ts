import { useState, useEffect } from 'react';
import type { ProductsResponse, Product, PaginationMeta } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export function useProducts(page = 1, limit = 8, search = '', category = '') {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [categories, setCategories] = useState<string[]>([]);
    const [pagination, setPagination] = useState<PaginationMeta | null>(null);

    const [activeParams, setActiveParams] = useState({ page, limit, search, category });

    if (page !== activeParams.page || limit !== activeParams.limit || search !== activeParams.search || category !== activeParams.category) {
        setLoading(true);
        setActiveParams({ page, limit, search, category });
    }

    useEffect(() => {
        const controller = new AbortController();

        async function fetchProducts() {
            setLoading(true);
            setError(null);

            try {
                const params = new URLSearchParams({
                    page: String(page),
                    limit: String(limit),
                    ...(search && { search }),
                    ...(category && { category }),
                });

                const res = await fetch(`${API_URL}/products?${params}`, {
                    signal: controller.signal,
                });

                if (!res.ok) throw new Error(`Server error: ${res.status}`);

                const data: ProductsResponse = await res.json();

                // Batch updates
                setProducts(data.products);
                setCategories(data.categories);
                setPagination(data.pagination);
                setLoading(false);
            } catch (err) {
                if ((err as Error).name !== 'AbortError') {
                    setError('Failed to load products. Please try again.');
                    setLoading(false);
                }
            }
        }

        fetchProducts();

        return () => controller.abort();
    }, [page, limit, search, category]);

    return { products, loading, error, categories, pagination };
}


