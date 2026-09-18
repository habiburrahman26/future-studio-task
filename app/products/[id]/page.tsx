import { notFound } from 'next/navigation';
import {
  getProductById,
  getRelatedProducts,
} from '@/features/product/services';
import { formatPrice } from '@/lib/utils';
import ImageGallery from '@/features/product/components/image-gallery';
import RelatedProduct from '@/features/product/components/related-product';

export default async function SingleProduct({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [product, relatedProducts] = await Promise.all([
    getProductById(id),
    getRelatedProducts(id, 3),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-6xl py-4">
      <div className="grid items-start gap-10 lg:grid-cols-[1.08fr_1fr] lg:gap-12">
          <ImageGallery images={product.images} productName={product.name}/>
        <div className="pt-4 lg:pt-8">
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.35em] text-[#726b65]">
            {product.category.toUpperCase()}
          </p>

          <h1 className="mt-3 text-5xl font-display font-medium leading-none tracking-[-0.06em] text-[#1e1a17] md:text-4xl">
            {product.name}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-[1.05rem] text-[#30302d]">
            <span className="text-[1.05rem] font-medium tabular-nums">
              {formatPrice(product.price)}
            </span>
            <span className="inline-flex items-center gap-2 text-[#504c48]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4 text-black"
                aria-hidden="true"
              >
                <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
              </svg>
              <span className="font-medium">{product.rating}</span>
              <span className="text-[#685f59]">({product.reviewCount})</span>
            </span>
            <span className="text-[#685f59]">In stock • {product.stock}</span>
          </div>

          <p className="mt-7 max-w-xl text-[1.12rem] leading-relaxed text-[#4d4945]">
            {product.description}
          </p>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center overflow-hidden rounded-xl border border-[#c9c0b2] bg-[#f7f3ee] text-[#1c1a18] shadow-[0_0_0_1px_rgba(40,33,28,0.02)]">
              <button
                type="button"
                className="flex h-12 w-12 items-center justify-center text-2xl text-[#2d2723] transition hover:bg-[#efe6dc]"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="flex h-12 w-14 items-center justify-center text-lg font-medium tabular-nums">
                1
              </span>
              <button
                type="button"
                className="flex h-12 w-12 items-center justify-center text-2xl text-[#2d2723] transition hover:bg-[#efe6dc]"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <button
              type="button"
              className="inline-flex h-12 flex-1 items-center justify-center rounded-xl bg-[#243733] px-6 text-base font-medium text-[#f3efe6] shadow-[0_8px_16px_rgba(35,51,47,0.18)] transition hover:bg-[#1c2d2a]"
            >
              Add to bag
            </button>
          </div>
        </div>
      </div>

      <RelatedProduct />
    </div>
  );
}
