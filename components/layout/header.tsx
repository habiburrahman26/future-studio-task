'use client'

import { cartCount, useCart } from '@/store/cart';
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export function Header() {
  const {items} = useCart()

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="font-display text-2xl tracking-tight">
          Future Shop
        </Link>
        <nav className="flex items-center gap-1">
          <Link
            href="/cart"
            className="relative inline-flex size-11 items-center justify-center"
            aria-label={`Cart, ${10} items`}
          >
            <ShoppingBag className='size-5' />
            <span className="absolute top-1.5 right-1.5 inline-flex min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] leading-4 font-medium text-primary-fg tabular-nums">
              {cartCount(items)}
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
