export type Audience = "women" | "men" | "life" | "unisex" | "TBD";

export type ProductCategory =
  | "new-in"
  | "women"
  | "men"
  | "life"
  | "sale"
  | "outerwear"
  | "tops"
  | "bottoms"
  | "shoes"
  | "bags"
  | "accessories"
  | "home";

export type ProductType =
  | "top"
  | "shirt"
  | "jacket"
  | "dress"
  | "skirt"
  | "pants"
  | "bag"
  | "shoes"
  | "accessory"
  | "TBD";

export type ProductStatus = "ready" | "needs-details" | "needs-image-match";

export type Product = {
  id: string;
  slug: string;
  name: string;
  brandId: string;
  brandSlug: string;
  categories: ProductCategory[];
  audience: Audience;
  productType: ProductType;
  price: number;
  compareAtPrice?: number;
  isNew?: boolean;
  isSale?: boolean;
  description: string;
  sizes: string[];
  sourceImage: string;
  status: ProductStatus;
  placeholderTone?: "light" | "medium";
  relatedProductIds?: string[];
  /** Processed storefront image (public path). Falls back to a placeholder when absent. */
  image?: string;
  /** Optional alternate storefront image shown when a product card is hovered. */
  hoverImage?: string;
  /** Product detail gallery images in display order. */
  images?: string[];
};

export type Brand = {
  id: string;
  slug: string;
  name: string;
  country?: string;
  description?: string;
  featured?: boolean;
  website?: string;
};

export type Article = {
  id: string;
  slug: string;
  title: string;
  /** Brand name shown as the magazine heading (the full `title` stays for alt text / SEO). */
  brand: string;
  excerpt: string;
  body: string[];
  date: string;
  category: "interview" | "essay" | "editorial";
  /** 16:9 hero image (public path). When present, the article renders the rich editorial layout. */
  hero?: string;
  /** 9:16 portrait images (public paths) woven through the body in display order. */
  images?: string[];
};

export type StylingStory = {
  id: string;
  slug: string;
  title: string;
  season: string;
  image?: string;
  relatedProductIds: string[];
  placeholderTone?: "light" | "medium";
};

export type CartItem = {
  productId: string;
  size: string;
  quantity: number;
};
