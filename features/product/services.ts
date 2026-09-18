import { Product, ProductFilters, ProductsResponse } from "./types";
import productsData from "@/data/products.json";


const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";




/**
 * Get filtered, sorted & paginated products
 */
export async function getProducts(
  filters: ProductFilters = {}
): Promise<ProductsResponse> {
  const params = new URLSearchParams();

  if (filters.search){ params.set("search", filters.search);}
  if (filters.category) {
    params.set("category", filters.category);
  }
  if(filters.brand){
    params.set("brand", filters.brand)
  }
  if (filters.price !== undefined) {
    params.set("price", String(filters.price));
  }
  if (filters.rating !== undefined && Number.isFinite(filters.rating)) {
    params.set("rating", String(filters.rating));
  }
  if (filters.sort) params.set("sort", filters.sort);
  if (filters.page) params.set("page", String(filters.page));
  if (filters.limit) params.set("limit", String(filters.limit));

  const res = await fetch(`${BASE_URL}/api/products?${params.toString()}`)

  console.log(res)

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

/**
 * Get single product by ID
 */
export async function getProductById(id: string): Promise<Product | null> {
  const res = await fetch(`${BASE_URL}/api/products/${id}`, {
    next: { revalidate: 60 },
  });

  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to fetch product");

  return res.json();
}

/**
 * Get related products
 */
export async function getRelatedProducts(
  productId: string,
  limit = 4
): Promise<Product[]> {
  const res = await fetch(
    `${BASE_URL}/api/products/related/${productId}?limit=${limit}`,
    {
      next: { revalidate: 60 },
    }
  );

  console.log("res", res)

  if (!res.ok) {
    throw new Error("Failed to fetch related products");
  }

  return res.json();
}

/**
 * Get unique categories & brands (for filter UI)
 * This one can stay synchronous since it's small
 */

const allProducts = productsData as Product[];

export function getFilterOptions() {
  const categories = Array.from(
    new Set(allProducts.map((p) => p.category))
  ).sort();

  const brands = Array.from(
    new Set(allProducts.map((p) => p.brand))
  ).sort();

  return { categories, brands };
}