import { notFound } from 'next/navigation';
import { getProductById } from '@/features/product/services';
import { formatPrice } from '@/lib/utils';
import ImageGallery from '@/features/product/components/image-gallery';
import RelatedProduct from '@/features/product/components/related-product';
import Review from '@/features/product/components/review';
import { Badge } from '@/components/ui/badge';
import StarIcon from '@/components/ui/star-icon';

export default async function SingleProduct({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-6xl py-4">
      <div className="grid items-start gap-10 lg:grid-cols-[1.08fr_1fr] lg:gap-12">
        <ImageGallery images={product.images} productName={product.name} />
        <div className="pt-4 lg:pt-8">
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.35em] text-[#726b65]">
            {product.category.toUpperCase()}
          </p>

          <h1 className="mt-3 text-3xl font-display font-medium leading-none tracking-[-0.06em] text-[#1e1a17] md:text-4xl">
            {product.name}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-[1.05rem] text-[#30302d]">
            <span className="text-[1.05rem] font-medium tabular-nums">
              {formatPrice(product.price)}
            </span>
            <span className="inline-flex items-center gap-2 text-[#504c48]">
             <StarIcon/>
              <span className="font-medium">{product.rating}</span>
              <span className="text-[#685f59]">({product.reviewCount})</span>
            </span>
            {product.stock > 0 ? (
              <Badge>In stock • {product.stock}</Badge>
            ) : (
              <Badge >Sold Out</Badge>
            )}
          </div>

          <p className="mt-5 max-w-xl leading-relaxed text-[#4d4945]">
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

      <Review reviews={product.reviews} />
      <RelatedProduct id={id} />
    </div>
  );
}
