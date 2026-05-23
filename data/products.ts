import type { Product } from "@/types/domain";

export const products: Product[] = [
  {
    id: "p-001",
    slug: "nova-2995-coat",
    name: "no 2995 / Nova",
    brandId: "kiko-kostadinov",
    categories: ["outerwear"],
    audience: "men",
    price: 2350000,
    isNew: true,
    description: "A quiet outer layer with a soft structured shoulder and generous daily volume.",
    sizes: ["44", "46", "48", "50"],
    placeholderTone: "light",
    relatedProductIds: ["p-002", "p-008"]
  },
  {
    id: "p-002",
    slug: "washed-cotton-shirt",
    name: "Washed cotton shirt",
    brandId: "jil-sander",
    categories: ["tops"],
    audience: "unisex",
    price: 680000,
    isNew: true,
    description: "A washed cotton shirt cut with an easy, boxy proportion.",
    sizes: ["XS", "S", "M", "L"],
    placeholderTone: "medium"
  },
  {
    id: "p-003",
    slug: "soft-pleated-trouser",
    name: "Soft pleated trouser",
    brandId: "camiel-fortgens",
    categories: ["bottoms"],
    audience: "men",
    price: 790000,
    isSale: true,
    compareAtPrice: 980000,
    description: "Relaxed trousers with a low pleat and broken-in drape.",
    sizes: ["S", "M", "L"],
    placeholderTone: "medium"
  },
  {
    id: "p-004",
    slug: "rib-knit-cardigan",
    name: "Rib knit cardigan",
    brandId: "extreme-cashmere",
    categories: ["tops"],
    audience: "women",
    price: 620000,
    description: "Compact rib knit with a light hand and close fit.",
    sizes: ["One size"],
    placeholderTone: "light"
  },
  {
    id: "p-005",
    slug: "canvas-day-bag",
    name: "Canvas day bag",
    brandId: "paloma-wool",
    categories: ["bags"],
    audience: "women",
    price: 340000,
    isNew: true,
    description: "Everyday canvas bag with a softened rectangular body.",
    sizes: ["One size"],
    placeholderTone: "medium"
  },
  {
    id: "p-006",
    slug: "home-linen-throw",
    name: "Home linen throw",
    brandId: "toogood",
    categories: ["home"],
    audience: "life",
    price: 410000,
    description: "A washed linen throw for room, sofa, or travel.",
    sizes: ["One size"],
    placeholderTone: "light"
  },
  {
    id: "p-007",
    slug: "square-toe-flat",
    name: "Square toe flat",
    brandId: "maryam-nassir-zadeh",
    categories: ["shoes"],
    audience: "women",
    price: 720000,
    isSale: true,
    compareAtPrice: 910000,
    description: "A soft square-toe flat with quiet polish.",
    sizes: ["36", "37", "38", "39"],
    placeholderTone: "medium"
  },
  {
    id: "p-008",
    slug: "technical-zip-vest",
    name: "Technical zip vest",
    brandId: "johanna-parv",
    categories: ["outerwear"],
    audience: "unisex",
    price: 890000,
    isNew: true,
    description: "A compact zip vest with a technical surface and soft inner structure.",
    sizes: ["S", "M", "L"],
    placeholderTone: "light"
  },
  {
    id: "p-009",
    slug: "wool-collar-jacket",
    name: "Wool collar jacket",
    brandId: "dries-van-noten",
    categories: ["outerwear"],
    audience: "men",
    price: 1680000,
    description: "Wool jacket with a clean collar and straight body.",
    sizes: ["46", "48", "50"],
    placeholderTone: "medium"
  },
  {
    id: "p-010",
    slug: "silk-pocket-shirt",
    name: "Silk pocket shirt",
    brandId: "gabriela-coll-garments",
    categories: ["tops"],
    audience: "women",
    price: 740000,
    description: "A fluid silk shirt with a single front pocket.",
    sizes: ["S", "M", "L"],
    placeholderTone: "light"
  },
  {
    id: "p-011",
    slug: "daily-leather-belt",
    name: "Daily leather belt",
    brandId: "rier",
    categories: ["accessories"],
    audience: "unisex",
    price: 280000,
    isSale: true,
    compareAtPrice: 360000,
    description: "Narrow leather belt with a softened matte finish.",
    sizes: ["80", "85", "90", "95"],
    placeholderTone: "medium"
  },
  {
    id: "p-012",
    slug: "linen-room-shirt",
    name: "Linen room shirt",
    brandId: "sunflower",
    categories: ["tops"],
    audience: "life",
    price: 390000,
    description: "A room shirt in washed linen for slow days and travel.",
    sizes: ["S", "M", "L"],
    placeholderTone: "light"
  }
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getProductById(id: string) {
  return products.find((product) => product.id === id);
}
