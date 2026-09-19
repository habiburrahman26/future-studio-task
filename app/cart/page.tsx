'use client';

import Image from 'next/image';
import Link from 'next/link';
import { cartSubtotal, useCart } from '@/store/cart';
import { formatPrice } from '@/lib/utils';

export default function CartPage() {
  const { items, setQty, remove } = useCart();
  const subtotal = cartSubtotal(items);

  return (
    <section className="py-2 sm:py-8">
      <h1 className="font-display text-3xl leading-none">Bag</h1>

      {items.length === 0 ? (
        <div className="mt-10 rounded-[28px] bg-surface px-6 py-16 text-center shadow-(--shadow-border)">
          <h2 className="text-3xl">Your bag is empty</h2>
          <p className="mt-3 text-muted">Find something worth taking home.</p>
          <Link
            href="/"
            className="mt-7 inline-flex h-12 items-center justify-center rounded-xl bg-primary px-7 font-medium text-primary-fg transition-colors hover:bg-ok"
          >
            Continue shopping
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_352px] lg:items-start">
          <div className="space-y-4">
            {items.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="grid grid-cols-[88px_minmax(0,1fr)_auto] gap-4 rounded-[26px] bg-surface p-4 shadow-border sm:grid-cols-[120px_minmax(0,1fr)_auto] sm:gap-5 sm:p-4"
              >
                <Link
                  href={`/products/${product.id}`}
                  className="relative aspect-square overflow-hidden rounded-[18px] bg-paper"
                >
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    sizes="(min-width: 640px) 120px, 88px"
                    className="object-cover"
                  />
                </Link>

                <div className="flex min-w-0 flex-col justify-between py-1">
                  <div>
                    <h2 className="truncate font-display text-lg sm:text-xl">
                      {product.name}
                    </h2>
                    <p className="mt-1 text-sm text-muted">{product.brand}</p>
                    <p className="mt-2 text-base tabular-nums">
                      {formatPrice(product.price)}
                    </p>
                  </div>

                  <div className="mt-5 w-full flex items-center justify-between gap-3">
                    <div className='flex items-center gap-1'>
                      <button
                        type="button"
                        aria-label={`Decrease quantity of ${product.name}`}
                        disabled={quantity <= 1}
                        onClick={() => setQty(product.id, quantity - 1)}
                        className="inline-flex size-8 items-center justify-center text-2xl text-muted transition-colors hover:text-fg disabled:cursor-not-allowed disabled:opacity-35"
                      >
                        −
                      </button>
                      <span className="min-w-6 text-center tabular-nums">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        aria-label={`Increase quantity of ${product.name}`}
                        disabled={quantity >= Math.max(1, product.stock)}
                        onClick={() => setQty(product.id, quantity + 1)}
                        className="inline-flex size-8 items-center justify-center text-2xl text-muted transition-colors hover:text-fg disabled:cursor-not-allowed disabled:opacity-35"
                      >
                        +
                      </button>
                      
                    </div>
                    <button
                        type="button"
                        aria-label={`Remove ${product.name} from bag`}
                        onClick={() => remove(product.id)}
                        className="col-start-2 row-start-1 self-end justify-self-end p-2 text-danger transition-colors hover:text-fg sm:col-start-3 sm:row-start-1 sm:self-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M3 6h18" />
                          <path d="M8 6V4h8v2" />
                          <path d="M19 6l-1 14H6L5 6" />
                          <path d="M10 11v5M14 11v5" />
                        </svg>
                      </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside className="rounded-[26px] bg-surface p-6 shadow-(--shadow-border) lg:sticky lg:top-24">
            <p className="text-base text-muted">Subtotal</p>
            <p className="mt-1 font-display text-2xl tabular-nums">
              {formatPrice(subtotal)}
            </p>
            <button
              type="button"
              className="mt-7 h-10 w-full rounded-md bg-primary font-medium text-primary-fg transition-colors hover:bg-ok"
            >
              Checkout
            </button>
          </aside>
        </div>
      )}
    </section>
  );
}
