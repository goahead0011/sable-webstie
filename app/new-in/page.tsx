import ProductListingPage from "@/components/product/ProductListingPage";
import { getProductsByCollection } from "@/lib/filters";

export default function NewInPage() {
  return <ProductListingPage title="New in" products={getProductsByCollection("new-in")} />;
}
