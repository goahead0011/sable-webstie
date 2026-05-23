import ProductListingPage from "@/components/product/ProductListingPage";
import { getProductsByCollection } from "@/lib/filters";

export default function SalePage() {
  return <ProductListingPage title="Sale" products={getProductsByCollection("sale")} />;
}
