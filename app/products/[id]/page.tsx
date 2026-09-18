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
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.35em] text-subtle">
            {product.category.toUpperCase()}
          </p>

          <h1 className="mt-3 text-3xl font-display font-medium leading-none tracking-[-0.06em] text-fg md:text-4xl">
            {product.name}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-[1.05rem] text-[#30302d]">
            <span className="text-[1.05rem] font-medium tabular-nums">
              {formatPrice(product.price)}
            </span>
            <span className="inline-flex items-center gap-2">
              <StarIcon />
              <span className="font-medium">{product.rating}</span>
              <span>({product.reviewCount})</span>
            </span>
            {product.stock > 0 ? (
              <Badge>In stock • {product.stock}</Badge>
            ) : (
              <Badge>Sold Out</Badge>
            )}
          </div>

          <p className="mt-5 max-w-xl leading-relaxed text-subtle">
            {product.description}
          </p>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center overflow-hidden rounded-xl border border-border bg-paper text-fg shadow-border">
              <button
                type="button"
                className="flex h-12 w-12 items-center justify-center text-2xl text-[#2d2723] transition hover:bg-bg"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="flex h-12 w-14 items-center justify-center text-lg font-medium tabular-nums">
                1
              </span>
              <button
                type="button"
                className="flex h-12 w-12 items-center justify-center text-2xl text-[#2d2723] transition hover:bg-bg"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <button
              type="button"
              className="inline-flex h-12 flex-1 items-center justify-center rounded-xl bg-primary px-6 text-base font-medium text-paper shadow-border transition-color hover:bg-ok"
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
