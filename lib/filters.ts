import { brands, getBrandBySlug } from "@/data/brands";
import { products } from "@/data/products";
import type { Audience, Product, ProductType } from "@/types/domain";

export type CollectionKey = "new-in" | "women" | "men" | "life" | "sale";

export function getProductsByCollection(collection: CollectionKey): Product[] {
  if (collection === "new-in") {
    return products.filter((product) => product.isNew);
  }

  if (collection === "sale") {
    return products.filter((product) => product.isSale);
  }

  // Unisex pieces belong to both the Women and Men collections.
  if (collection === "women" || collection === "men") {
    return products.filter((product) => product.audience === collection || product.audience === "unisex");
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
  return value === "women" || value === "men" || value === "life" || value === "unisex" || value === "TBD";
}

// ---------------------------------------------------------------------------
// Product type groups
//
// The catalog stores a fine-grained `productType` per product. The Women/Men
// category menus collapse those into the largest sensible buckets (e.g. jacket
// and coat both live under "Outer"). `TBD` types have no group and only ever
// appear under "All".
// ---------------------------------------------------------------------------

export type TypeGroup =
  | "outerwear"
  | "tops"
  | "bottoms"
  | "dress"
  | "skirt"
  | "shoes"
  | "bags"
  | "accessories";

const TYPE_GROUP_BY_PRODUCT_TYPE: Record<ProductType, TypeGroup | null> = {
  jacket: "outerwear",
  top: "tops",
  shirt: "tops",
  pants: "bottoms",
  dress: "dress",
  skirt: "skirt",
  shoes: "shoes",
  bag: "bags",
  accessory: "accessories",
  TBD: null
};

export const TYPE_GROUP_LABELS: Record<TypeGroup, string> = {
  outerwear: "Outer",
  tops: "Top",
  bottoms: "Bottom",
  dress: "Dress",
  skirt: "Skirt",
  shoes: "Shoes",
  bags: "Bag",
  accessories: "Accessories"
};

// Display order of the category buttons within a menu.
const TYPE_GROUP_ORDER: readonly TypeGroup[] = [
  "outerwear",
  "tops",
  "bottoms",
  "dress",
  "skirt",
  "shoes",
  "bags",
  "accessories"
];

export function getTypeGroup(productType: ProductType): TypeGroup | null {
  return TYPE_GROUP_BY_PRODUCT_TYPE[productType];
}

export function isTypeGroup(value: string): value is TypeGroup {
  return Object.prototype.hasOwnProperty.call(TYPE_GROUP_LABELS, value);
}

export function filterByTypeGroup(items: Product[], group?: string): Product[] {
  if (!group || group === "all" || !isTypeGroup(group)) {
    return items;
  }

  return items.filter((product) => getTypeGroup(product.productType) === group);
}

export type CategoryMenuItem = { key: string; label: string; href: string };

// Builds the "All + clothing type" menu for a collection, including only the
// groups that actually have products in that collection so menus never offer an
// empty filter. Women keeps Dress/Skirt; Men drops them automatically.
export function getCollectionCategories(collection: CollectionKey): CategoryMenuItem[] {
  const present = new Set<TypeGroup>();
  for (const product of getProductsByCollection(collection)) {
    const group = getTypeGroup(product.productType);
    if (group) {
      present.add(group);
    }
  }

  const base = `/${collection}`;
  const items: CategoryMenuItem[] = [{ key: "all", label: "All", href: base }];
  for (const group of TYPE_GROUP_ORDER) {
    if (present.has(group)) {
      items.push({ key: group, label: TYPE_GROUP_LABELS[group], href: `${base}?category=${group}` });
    }
  }

  return items;
}
