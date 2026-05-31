import ProductListingPage from "@/components/product/ProductListingPage";
import { getProductsByCollection } from "@/lib/filters";

export default async function MenPage({
  searchParams
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;

  return <ProductListingPage title="Men" products={getProductsByCollection("men")} activeCategory={category} />;
}
