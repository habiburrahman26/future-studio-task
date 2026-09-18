import { Badge } from '@/components/ui/badge';
import StarIcon from '@/components/ui/star-icon';
import type { Product } from '@/features/product/types';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

type ProductCardProps = {
  product: Product;
  titleLength?: number;
};

function ProductCard({ product, titleLength = 37 }: ProductCardProps) {
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
          className="mt-1 font-display text-lg leading-snug text-nowrap truncate"
        >
          {product.name}
        </h3>
        <div className="mt-3 flex items-center justify-between text-base">
          <span className="tabular-nums">{formatPrice(product.price)}</span>
          <span className="inline-flex items-center gap-1 text-muted">
            <StarIcon />
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
