import { getRelatedProducts } from "../services"
import ProductCard from "./product-cart"

type RelatedProductProps={
    id: string
}

async function RelatedProduct({id}: RelatedProductProps){
const relatedProducts = await getRelatedProducts(id)

console.log(relatedProducts)
return <div className="mt-12">
    <h2 className="text-3xl pb-4">Related Products</h2>

    <div className="grid grid-cols-4 gap-3">
        {relatedProducts.map(p=><ProductCard key={p.id} product={p} titleLength={25}/>)}
    </div>
</div>
}

export default RelatedProduct