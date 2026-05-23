import ProductGrid from "@/components/product/ProductGrid";
import type { Product } from "@/types/domain";

type ProductListingPageProps = {
  title: string;
  products: Product[];
};

export default function ProductListingPage({ title, products }: ProductListingPageProps) {
  return (
    <section className="page-content" aria-labelledby="page-title">
      <h1 id="page-title" className="sr-only">
        {title}
      </h1>
      <ProductGrid products={products} />
    </section>
  );
}
