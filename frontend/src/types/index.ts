export interface Product {
  _id: string;
  title: string;
  price: number;
  category: string;
  image: string;
  createdAt: string;
  updatedAt: string;
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
