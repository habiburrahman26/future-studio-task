'use client';

import { useCart } from '@/store/cart';
import { useState } from 'react';
import { Product } from '../types';

type AddToCartType={
    product: Product
}



function AddToCart({product}:AddToCartType) {
  const { add, items } = useCart();
  const [quantity, setQuantity] = useState(1);

  console.log(items)

  return (
    <div className="mt-8 flex items-center gap-4">
      <div className="flex items-center overflow-hidden rounded-xl border border-border bg-paper text-fg shadow-border">
        <button
          type="button"
          className="flex h-12 w-12 items-center justify-center text-2xl text-[#2d2723] transition hover:bg-bg"
          aria-label="Decrease quantity"
          disabled={quantity === 0}
          onClick={() => setQuantity((prevState) => Math.max(0, prevState - 1))}
        >
          −
        </button>
        <span className="flex h-12 w-14 items-center justify-center text-lg font-medium tabular-nums">
          {quantity}
        </span>
        <button
          type="button"
          className="flex h-12 w-12 items-center justify-center text-2xl text-[#2d2723] transition hover:bg-bg"
          aria-label="Increase quantity"
          onClick={() => setQuantity((prevState) => prevState + 1)}
        >
          +
        </button>
      </div>

      <button
        type="button"
        className="inline-flex h-12 flex-1 items-center justify-center rounded-xl bg-primary px-6 text-base font-medium text-paper shadow-border transition-color hover:bg-ok"
        onClick={()=>add(product, quantity)}
      >
        Add to bag
      </button>
    </div>
  );
}

export default AddToCart;
