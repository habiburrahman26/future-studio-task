'use client'

import { cartCount, useCart } from '@/store/cart';
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
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-bag"><path d="M16 10a4 4 0 0 1-8 0"/><path d="M3.103 6.034h17.794"/><path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z"/></svg>

            <span className="absolute top-1.5 right-1.5 inline-flex min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] leading-4 font-medium text-primary-fg tabular-nums">
              {cartCount(items)}
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
