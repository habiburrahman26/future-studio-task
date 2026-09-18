// src/app/products/page.tsx

import FilterModal from '@/features/product/components/filter-modal';
import Pagination from '@/features/product/components/pagination';
import ProductCard from '@/features/product/components/product-cart';
import ProductFilter from '@/features/product/components/product-filter';
import ProductSort from '@/features/product/components/product-sort';
import Search from '@/features/product/components/search';
import { getProducts } from '@/features/product/services';
import { ProductFilters } from '@/features/product/types';

interface Props {
  searchParams: Promise<ProductFilters>;
}

export default async function ProductsPage({ searchParams }: Props) {
  const params = await searchParams;

  const filters: ProductFilters = {
    search: params.search || '',
    category: params.category,
    brand: params.brand,
    price: params.price,
    rating: params.rating ? Number(params.rating) : undefined,
    sort: params.sort as ProductFilters['sort'],
    page: params.page ? Number(params.page) : 1,
    limit: 12,
  };

  const { products, total, page, limit, totalPages } =
    await getProducts(filters);

  return (
    <div className="container mx-auto px-2 lg:px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">All Products</h1>

      <div className="grid lg:grid-cols-4 gap-6">
        <div className="hidden lg:block">
          <ProductFilter />
        </div>
        <div className="lg:col-span-3">
          <div className="flex flex-col md:flex-row items-center sm:gap-4">
            <Search />
            <div className='flex items-center gap-4 w-full md:w-auto mb-6'>
              <ProductSort />
             <FilterModal/>
            </div>
          </div>
          {products.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-xl font-medium">No products found</h3>
              <p className="text-gray-500 mt-2">
                Try adjusting your search or filters.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {products?.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <Pagination
                total={total}
                page={page}
                limit={limit}
                totalPages={totalPages}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
