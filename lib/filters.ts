import { brands, getBrandBySlug } from "@/data/brands";
import { products } from "@/data/products";
import type { Audience, Product } from "@/types/domain";

export type CollectionKey = "new-in" | "women" | "men" | "life" | "sale";

export function getProductsByCollection(collection: CollectionKey): Product[] {
  if (collection === "new-in") {
    return products.filter((product) => product.isNew);
  }

  if (collection === "sale") {
    return products.filter((product) => product.isSale);
  }

  return products.filter((product) => product.audience === collection);
}

export function getProductsByBrandSlug(slug: string): Product[] {
  const brand = getBrandBySlug(slug);

  if (!brand) {
    return [];
  }

  return products.filter((product) => product.brandId === brand.id);
}

export function getFeaturedProducts(): Product[] {
  const featuredBrandIds = new Set(brands.filter((brand) => brand.featured).map((brand) => brand.id));
  return products.filter((product) => featuredBrandIds.has(product.brandId)).slice(0, 6);
}

export function isAudience(value: string): value is Audience {
  return value === "women" || value === "men" || value === "life" || value === "unisex";
}
