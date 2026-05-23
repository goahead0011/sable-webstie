import ProductListingPage from "@/components/product/ProductListingPage";
import { getProductsByCollection } from "@/lib/filters";

export default function LifePage() {
  return <ProductListingPage title="Life" products={getProductsByCollection("life")} />;
}
