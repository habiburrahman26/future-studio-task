import { NextResponse, type NextRequest } from 'next/server';
import productsData from '@/data/products.json';
import { Product } from '@/features/product/types';

const allProducts = productsData as Product[];

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;

    const search = searchParams.get('search')?.trim();
    const category = searchParams.get('category');
    const brand = searchParams.get('brand');
    const price = searchParams.get('price');
    const rating = searchParams.get('rating');
    const sort = searchParams.get('sort') || 'newest';
    const page = Math.max(1, Number(searchParams.get('page')) || 1);
    const limit = Math.max(1, Number(searchParams.get('limit')) || 12);

    const [minPrice, maxPrice] = price ? price.split('-') : [];

    let filtered = [...allProducts];

    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((tag) => tag.toLowerCase().includes(q)),
      );
    }

    if (category) {
      filtered = filtered.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase(),
      );
    }

    if (brand) {
      filtered = filtered.filter(
        (p) => p.brand.toLowerCase() === brand.toLowerCase(),
      );
    }

    if (minPrice && isFinite(+minPrice)) {
      filtered = filtered.filter((p) => p.price >= Number(minPrice));
    }
    if (maxPrice && isFinite(+maxPrice)) {
      filtered = filtered.filter((p) => p.price <= Number(maxPrice));
    }

    if (rating && isFinite(+rating)) {
      filtered = filtered.filter((p) => p.rating >= Number(rating));
    }

    switch (sort) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        filtered.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        break;
    }

    // Pagination
    const total = filtered.length;
    const totalPages = Math.ceil(total / limit) || 1;
    const currentPage = Math.min(page, totalPages);
    const start = (currentPage - 1) * limit;
    const products = filtered.slice(start, start + limit);

    return NextResponse.json({
      products,
      total,
      page: currentPage,
      limit,
      totalPages,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 },
    );
  }
}
