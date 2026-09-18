export type Review = {
  rating: number;
  comment: string;
  author: string;
  date: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  rating: number;
  reviewCount: number;
  stock: number;
  images: string[];
  tags: string[];
  reviews: Review[];
  createdAt: string;
};

export type ProductFilters = {
  search?: string;
  category?: string;
  brand?: string;
  price?: string;
  rating?: number;
  sort?: 'price-asc' | 'price-desc' | 'rating' | 'newest';
  page?: number;
  limit?: number;
};

export type ProductsResponse = {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};
