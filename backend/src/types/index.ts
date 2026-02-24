export interface Product {
    id: number;
    title: string;
    price: number;
    category: string;
    image: string;
}

export interface PaginationMeta {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    limit: number;
}

export interface ProductsResponse {
    products: Product[];
    pagination: PaginationMeta;
    categories: string[];
}
