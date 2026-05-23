import ProductListingPage from "@/components/product/ProductListingPage";
import { searchProducts } from "@/lib/search";

type SearchPageProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q = "" } = await searchParams;
  const query = Array.isArray(q) ? q[0] ?? "" : q;
  const results = searchProducts(query);

  return <ProductListingPage title={query ? `Search: ${query}` : "Search"} products={results} />;
}
