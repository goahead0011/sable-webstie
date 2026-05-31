import ProductListingPage from "@/components/product/ProductListingPage";
import { getProductsByCollection } from "@/lib/filters";

export default async function WomenPage({
  searchParams
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;

  return (
    <ProductListingPage title="Women" products={getProductsByCollection("women")} activeCategory={category} />
  );
}
