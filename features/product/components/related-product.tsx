import { getRelatedProducts } from '../services';
import ProductCard from './product-cart';

type RelatedProductProps = {
  id: string;
};

async function RelatedProduct({ id }: RelatedProductProps) {
  const relatedProducts = await getRelatedProducts(id);

  return (
    <>
      {relatedProducts.length > 0 ? (
        <div className="mt-12">
          <h2 className="text-2xl pb-4">Related Products</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}

export default RelatedProduct;
