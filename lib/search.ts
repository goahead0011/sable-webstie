import { brands, getBrandById } from "@/data/brands";
import { products } from "@/data/products";
import type { Product } from "@/types/domain";

export function searchProducts(query: string): Product[] {
  const term = query.trim().toLowerCase();

  if (!term) {
    return [];
  }

  const brandNameById = new Map(brands.map((brand) => [brand.id, brand.name.toLowerCase()]));

  return products.filter((product) => {
    const brandName = brandNameById.get(product.brandId) ?? "";
    const categories = product.categories.join(" ");

    return [product.name, brandName, product.audience, product.productType, categories]
      .join(" ")
      .toLowerCase()
      .includes(term);
  });
}

export function getSearchLabel(product: Product) {
  const brand = getBrandById(product.brandId);
  return `${product.name} ${brand?.name ?? ""} ${product.productType} ${product.categories.join(" ")}`;
}
