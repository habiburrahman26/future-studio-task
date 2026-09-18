'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { ChangeEvent } from 'react';

function ProductSort() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());

    if (e.target.value) {
      params.set('sort', e.target.value);
    }else{
      params.delete("sort")
    }

    router.push(`${pathname}?${params}`, { scroll: true });
  };

  return (
    <select
      defaultValue={searchParams.get('sort') || ''}
      onChange={handleSortChange}
      className="h-auto py-4 px-3 bg-surface border-2 border-border rounded-2xl mb-6 text-subtle text-sm"
    >
      <option value="">Featured</option>
      <option value="price-asc">Price: Low to high</option>
      <option value="price-desc">Price: High to low</option>
      <option value="rating">Top rated</option>
    </select>
  );
}

export default ProductSort;
