import ProductGrid from "@/components/product/ProductGrid";
import { filterByTypeGroup } from "@/lib/filters";
import type { Product } from "@/types/domain";

type ProductListingPageProps = {
  title: string;
  products: Product[];
  /** Active clothing-type filter from the `?category=` query (Women/Men only). */
  activeCategory?: string;
};

export default function ProductListingPage({ title, products, activeCategory }: ProductListingPageProps) {
  const visibleProducts = filterByTypeGroup(products, activeCategory);

  return (
    <section className="page-content" aria-labelledby="page-title">
      <h1 id="page-title" className="sr-only">
        {title}
      </h1>
      <ProductGrid products={visibleProducts} />
    </section>
  );
}
