import ProductListingPage from "@/components/product/ProductListingPage";
import { getProductsByCollection } from "@/lib/filters";

export default function WomenPage() {
  return <ProductListingPage title="Women" products={getProductsByCollection("women")} />;
}
