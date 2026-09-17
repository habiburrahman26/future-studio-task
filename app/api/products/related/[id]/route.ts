import { type NextRequest, NextResponse } from "next/server";
import productsData from "@/data/products.json";
import { Product } from "@/lib/api/types";

const allProducts = productsData as Product[];

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const searchParams  = req.nextUrl.searchParams
    const limit = Number(searchParams.get("limit")) || 5;

    const currentProduct = allProducts.find((p) => p.id === id);

    if (!currentProduct) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    const related = allProducts
      .filter(
        (p) => p.category === currentProduct.category && p.id !== id
      )
      .slice(0, limit);

    return NextResponse.json(related);
  } catch (error) {
    console.error("Error fetching related products:", error);
    return NextResponse.json(
      { error: "Failed to fetch related products" },
      { status: 500 }
    );
  }
}