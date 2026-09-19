import { notFound } from 'next/navigation';
import { getProductById } from '@/features/product/services';
import { formatPrice } from '@/lib/utils';
import ImageGallery from '@/features/product/components/image-gallery';
import RelatedProduct from '@/features/product/components/related-product';
import Review from '@/features/product/components/review';
import { Badge } from '@/components/ui/badge';
import AddToCart from '@/features/product/components/add-to-cart';
import { Star } from 'lucide-react';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  const product = await getProductById(id);
  return {
    title: product?.name || "Future Shop",
    description: product?.description,
  };
}

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
            <span className="inline-flex items-center gap-2 text-sm text-subtle">
              <Star className="size-3.5 fill-fg text-fg" />
              <span className="font-medium">{product.rating}</span>
              <span>({product.reviewCount})</span>
            </span>
            {product.stock === 0 ? (
              <Badge>Sold out</Badge>
            ) : product.stock < 8 ? (
              <Badge>Low stock · {product.stock}</Badge>
            ) : (
              <Badge>In stock · {product.stock}</Badge>
            )}
          </div>

          <p className="mt-5 max-w-xl leading-relaxed text-subtle">
            {product.description}
          </p>

          <AddToCart product={product} />
        </div>
      </div>

      <Review reviews={product.reviews} />
      <RelatedProduct id={id} />
    </div>
  );
}
