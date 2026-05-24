import { getBrandById } from "@/data/brands";
import ProductCard from "@/components/product/ProductCard";
import type { Product } from "@/types/domain";
import styles from "@/components/product/ProductGrid.module.css";

type ProductGridProps = {
  products: Product[];
};

export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return <p className={styles.empty}>No products found.</p>;
  }

  return (
    <div className={styles.grid}>
      {products.map((product) => {
        const brand = getBrandById(product.brandId);

        if (!brand) {
          return null;
        }

        return <ProductCard key={product.id} product={product} />;
      })}
    </div>
  );
}
