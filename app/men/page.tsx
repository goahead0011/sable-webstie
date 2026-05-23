import ProductListingPage from "@/components/product/ProductListingPage";
import { getProductsByCollection } from "@/lib/filters";

export default function MenPage() {
  return <ProductListingPage title="Men" products={getProductsByCollection("men")} />;
}
