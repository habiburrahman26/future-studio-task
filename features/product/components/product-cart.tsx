import { Badge } from '@/components/ui/badge';
import type { Product } from '@/features/product/types';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

type ProductCardProps = {
  product: Product;
  titleLength?: number;
};

function ProductCard({ product, titleLength = 37 }: ProductCardProps) {
  const name =
    product.name.length > titleLength
      ? `${product.name.slice(0, titleLength)}..`
      : product.name;

  return (
    <Link
      href={`/products/${product.id}`}
      className="group block rounded-[26px] bg-surface p-2.5 shadow-(--shadow-border) transition-[box-shadow,transform] duration-300 ease-out  hover:shadow-(--shadow-border-hover)"
    >
      <div className="relative aspect-square overflow-hidden rounded-[19px] bg-paper">
        <Image
          src={product.images[0]}
          alt={`${product.name} image`}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-linear-to-t from-black/35 to-transparent px-5 pb-4 pt-12 text-white">
          <span className="text-sm font-semibold tracking-tight">
            {product.category}
          </span>
          {product.stock === 0 && <Badge>Sold out</Badge>}
        </div>
      </div>

      <div className="px-2.5 pb-3 pt-3.5">
        <p className="text-sm uppercase tracking-wider text-subtle">
          {product.brand}
        </p>
        <h3
          className="mt-1 font-display text-lg leading-snug text-nowrap"
          title={product.name}
        >
          {name}
        </h3>
        <div className="mt-3 flex items-center justify-between text-base">
          <span className="tabular-nums">{formatPrice(product.price)}</span>
          <span className="inline-flex items-center gap-1 text-muted">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4 fill-fg stroke-fg"
            >
              <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
            </svg>
            <span className="tabular-nums text-sm">
              {product.rating.toFixed(1)}
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
