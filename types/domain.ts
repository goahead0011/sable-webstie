export type Audience = "women" | "men" | "life" | "unisex";

export type ProductCategory =
  | "outerwear"
  | "tops"
  | "bottoms"
  | "shoes"
  | "bags"
  | "accessories"
  | "home";

export type Product = {
  id: string;
  slug: string;
  name: string;
  brandId: string;
  categories: ProductCategory[];
  audience: Audience;
  price: number;
  compareAtPrice?: number;
  isNew?: boolean;
  isSale?: boolean;
  description: string;
  sizes: string[];
  placeholderTone?: "light" | "medium";
  relatedProductIds?: string[];
};

export type Brand = {
  id: string;
  slug: string;
  name: string;
  country?: string;
  description?: string;
  featured?: boolean;
};

export type Article = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: "interview" | "essay" | "editorial";
};

export type StylingStory = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  season: string;
  relatedProductIds: string[];
  placeholderTone?: "light" | "medium";
};

export type CartItem = {
  productId: string;
  size: string;
  quantity: number;
};
