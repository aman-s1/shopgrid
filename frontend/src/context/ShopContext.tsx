import { createContext, useContext, useState, useEffect, useMemo, useCallback, type ReactNode } from 'react';
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
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

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
    const [selectedCategory, setSelectedCategory] = useState(() => getParams().category);
    const [searchQuery, setSearchQuery] = useState(() => getParams().search);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

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
        selectedCategory
    );

    // URL Sync (updates browser history when state changes)
    useEffect(() => {
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
    }, [currentPage, selectedCategory, searchQuery]);

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

    const value = useMemo(() => ({
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
    }), [
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
    ]);


    return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
    const context = useContext(ShopContext);
    if (context === undefined) {
        throw new Error('useShop must be used within a ShopProvider');
    }
    return context;
}
