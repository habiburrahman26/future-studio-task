'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import StarIcon from '@/components/ui/star-icon';
import { getFilterOptions } from '../services';
import { cn } from '@/lib/utils';
import ArrowIcon from '@/components/ui/arrow-icon';
import { useState } from 'react';

function ProductFilter() {
  const { categories, brands } = getFilterOptions();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get('category') || '';
  const selectedBrand = searchParams.get('brand') || '';
  const selectedRating = Number(searchParams.get('rating')) || 0;
  const price = searchParams.get('price');
  const [min = '', max = ''] = price ? price.split('-') : [];

  const [minPrice, setMinPrice] = useState(min);
  const [maxPrice, setMaxPrice] = useState(max);

  const setCategory = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (selectedCategory === category) {
      params.delete('category');
    } else {
      params.set('category', category);
    }

    params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`, { scroll: true });
  };

  const setBrand = (brand: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (selectedBrand === brand) {
      params.delete('brand');
    } else {
      params.set('brand', brand);
    }

    params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`, { scroll: true });
  };

  const setPrice = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (minPrice || maxPrice) {
      params.set('price', `${minPrice}-${maxPrice}`);
    } else {
      params.delete('price');
    }

    params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`, { scroll: true });
  };

  const setRating = (rating: number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (rating === selectedRating) {
      params.delete('rating');
    } else {
      params.set('rating', String(rating));
    }

    params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`, { scroll: true });
  };

  return (
    <div className="bg-surface rounded-xl border-border/80 px-4 py-5">
      <h3 className="text-lg font-semibold pb-3">Filter</h3>
      <hr className="border-t border-[#d8cdb8]" />

      <div className="py-4">
        <h3 className="text-subtle uppercase font-medium tracking-widest text-sm">
          Category
        </h3>

        <ul className="pt-2">
          {categories.map((category) => (
            <li
              key={category}
              onClick={() => setCategory(category)}
              className={cn(
                'group hover:bg-primary-fg transition-all p-2 rounded-md cursor-pointer',
                {
                  'bg-primary-fg': category === selectedCategory,
                },
              )}
            >
              <span
                className={cn('text-subtle text-sm group-hover:text-fg', {
                  'text-fg': category === selectedCategory,
                })}
              >
                {category}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <hr className="border-t border-[#d8cdb8]" />

      <div className="py-4">
        <h3 className="text-subtle uppercase font-medium tracking-widest text-sm">
          Brand
        </h3>

        <ul className="pt-2">
          {brands.map((brand) => (
            <li
              key={brand}
              onClick={() => setBrand(brand)}
              className={cn(
                'group hover:bg-primary-fg transition-all p-2 rounded-md cursor-pointer',
                {
                  'bg-primary-fg': brand === selectedBrand,
                },
              )}
            >
              <span
                className={cn('text-subtle text-sm group-hover:text-fg', {
                  'text-fg': brand === selectedBrand,
                })}
              >
                {brand}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <hr className="border-t border-[#d8cdb8]" />

      <div className="py-4">
        <h3 className="text-subtle uppercase font-medium tracking-widest text-sm">
          Price
        </h3>

        <div className="grid grid-cols-[1fr_1fr_auto] gap-2 pt-2">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="h-10 min-w-0 w-full rounded-md border border-border p-2 text-sm outline-none placeholder:text-sm focus:ring-2 focus:ring-paper"
          />
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="h-10 min-w-0 w-full rounded-md border border-border p-2 text-sm outline-none placeholder:text-sm focus:ring-2 focus:ring-paper"
          />
          <button
            type="button"
            aria-label="Apply price filter"
            className="flex h-10 w-10 items-center justify-center rounded-md border border-border p-2 transition-colors hover:bg-paper focus:outline-none focus:ring-2 focus:ring-paper"
            onClick={setPrice}
          >
            <ArrowIcon direction="right" />
          </button>
        </div>
      </div>

      <hr className="border-t border-[#d8cdb8]" />

      <div className="py-4">
        <h3 className="text-subtle uppercase font-medium tracking-widest text-sm">
          Rating
        </h3>

        <div className="mt-3 space-y-1">
          {[5, 4, 3, 2, 1].map((rating) => (
            <button
              key={rating}
              type="button"
              onClick={() => setRating(rating)}
              aria-pressed={selectedRating === rating}
              className={cn(
                'group flex w-full items-center gap-2 rounded-md px-2 py-2 text-left transition-colors hover:bg-primary-fg',
                {
                  'bg-primary-fg': rating === selectedRating,
                },
              )}
            >
              <span className="flex items-center gap-0.5" aria-hidden="true">
                {Array.from({ length: 5 }, (_, index) => (
                  <StarIcon
                    key={index}
                    className={cn('size-4 fill-transparent stroke-subtle', {
                      'fill-primary stroke-primary': index < rating,
                    })}
                  />
                ))}
              </span>
              <span className="text-sm text-muted">& up</span>
              <span className="sr-only">{rating} stars and up</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductFilter;
