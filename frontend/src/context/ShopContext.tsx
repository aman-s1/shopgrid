import {
    createContext,
    useContext,
    useState,
    useEffect,
    useMemo,
    useCallback,
    type ReactNode,
} from 'react';
import { useLocation } from 'react-router-dom';

import type { Product, PaginationMeta } from '../types';
import { useProducts } from '../hooks/useProducts';

interface ShopContextType {
    // State
    products: Product[];
    loading: boolean;
    error: string | null;
    pagination: PaginationMeta | null;
    categories: string[];
    currentPage: number;
    selectedCategory: string;
    searchQuery: string;
    isFilterOpen: boolean;

    // Actions
    setCurrentPage: (page: number) => void;
    setSelectedCategory: (category: string) => void;
    setSearchQuery: (query: string) => void;
    setIsFilterOpen: (isOpen: boolean) => void;
    handleSearch: (query: string) => void;
    handleCategoryChange: (category: string) => void;
    handlePageChange: (page: number) => void;
    handleReset: () => void;
    addProduct: (
        product: Omit<Product, '_id' | 'createdAt' | 'updatedAt'>
    ) => Promise<void>;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export function ShopProvider({ children }: { children: ReactNode }) {
    const getParams = useCallback(() => {
        const params = new URLSearchParams(window.location.search);
        return {
            page: parseInt(params.get('page') || '1', 10),
            category: params.get('category') || '',
            search: params.get('search') || '',
        };
    }, []);

    const [currentPage, setCurrentPage] = useState(() => getParams().page);
    const [selectedCategory, setSelectedCategory] = useState(
        () => getParams().category
    );
    const [searchQuery, setSearchQuery] = useState(() => getParams().search);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    // Sync state with browser navigation (back/forward)
    useEffect(() => {
        const handlePopState = () => {
            const { page, category, search } = getParams();
            setCurrentPage(page);
            setSelectedCategory(category);
            setSearchQuery(search);
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [getParams]);

    // Use existing hook inside context
    const { products, loading, error, pagination, categories } = useProducts(
        currentPage,
        8,
        searchQuery,
        selectedCategory,
        refreshTrigger
    );

    // Manual refresh for after adding a product
    const refreshProducts = useCallback(() => {
        setRefreshTrigger((prev) => prev + 1);
    }, []);

    const addProduct = useCallback(
        async (productData: Omit<Product, '_id' | 'createdAt' | 'updatedAt'>) => {
            const response = await fetch(`${API_URL}/products`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
                credentials: 'include',
            });


            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to add product');
            }

            // Trigger a refresh of categories and products
            refreshProducts();
        },
        [refreshProducts]
    );

    const location = useLocation();

    // URL Sync (updates browser history when state changes, only on shop page)
    useEffect(() => {
        if (!location.pathname.startsWith('/shop')) return;

        const url = new URL(window.location.href);
        const currentParams = new URLSearchParams(url.search);

        let changed = false;

        if (currentPage.toString() !== currentParams.get('page')) {
            url.searchParams.set('page', currentPage.toString());
            changed = true;
        }

        if (selectedCategory !== (currentParams.get('category') || '')) {
            if (selectedCategory) {
                url.searchParams.set('category', selectedCategory);
            } else {
                url.searchParams.delete('category');
            }
            changed = true;
        }

        if (searchQuery !== (currentParams.get('search') || '')) {
            if (searchQuery) {
                url.searchParams.set('search', searchQuery);
            } else {
                url.searchParams.delete('search');
            }
            changed = true;
        }

        if (changed) {
            window.history.pushState({}, '', url.toString());
        }
    }, [currentPage, selectedCategory, searchQuery, location.pathname]);

    const handlePageChange = useCallback((page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const handleCategoryChange = useCallback((category: string) => {
        setSelectedCategory(category);
        setCurrentPage(1);
        setIsFilterOpen(false);
    }, []);

    const handleSearch = useCallback((query: string) => {
        setSearchQuery(query);
        setCurrentPage(1);
    }, []);

    const handleReset = useCallback(() => {
        setSearchQuery('');
        setSelectedCategory('');
        setCurrentPage(1);
        setIsFilterOpen(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const value = useMemo(
        () => ({
            products,
            loading,
            error,
            pagination,
            categories,
            currentPage,
            selectedCategory,
            searchQuery,
            isFilterOpen,
            setCurrentPage,
            setSelectedCategory,
            setSearchQuery,
            setIsFilterOpen,
            handleSearch,
            handleCategoryChange,
            handlePageChange,
            handleReset,
            addProduct,
        }),
        [
            products,
            loading,
            error,
            pagination,
            categories,
            currentPage,
            selectedCategory,
            searchQuery,
            isFilterOpen,
            handleSearch,
            handleCategoryChange,
            handlePageChange,
            handleReset,
            addProduct,
        ]
    );

    return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
    const context = useContext(ShopContext);
    if (context === undefined) {
        throw new Error('useShop must be used within a ShopProvider');
    }
    return context;
}
