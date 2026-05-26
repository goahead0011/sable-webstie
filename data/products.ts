import { getBrandBySlug } from "@/data/brands";
import { productImages } from "@/data/product-images";
import type { Audience, Product, ProductCategory } from "@/types/domain";

type CatalogProductInput = {
  slug: string;
  name: string;
  brandSlug: string;
  price: number;
  categories: readonly ProductCategory[];
  imageProductSlug?: string;
};

type ProductImageKey = `${string}/${string}`;

const DEFAULT_AUDIENCE: Audience = "unisex";
const DEFAULT_CATEGORIES: readonly ProductCategory[] = ["new-in"];

function imageKey(brandSlug: string, productSlug: string): ProductImageKey {
  return `${brandSlug}/${productSlug}`;
}

const imagePathByKey = new Map<ProductImageKey, string>(
  productImages.map((image) => [imageKey(image.brandSlug, image.productSlug), image.imagePath])
);

function getImagePath(brandSlug: string, productSlug: string) {
  return imagePathByKey.get(imageKey(brandSlug, productSlug));
}

const catalogProducts = [
  {
    slug: "abelia-edoward-goucha-ordinary-shirt-chino",
    name: "ordinary shirt chino",
    brandSlug: "abelia-edoward-goucha",
    price: 870000,
    categories: DEFAULT_CATEGORIES,
    imageProductSlug: "ordinary-shirt-chino"
  },
  {
    slug: "abelia-edoward-goucha-sun-hoodie",
    name: "sun hoodie",
    brandSlug: "abelia-edoward-goucha",
    price: 432000,
    categories: DEFAULT_CATEGORIES,
    imageProductSlug: "sun-hoodie"
  },
  {
    slug: "natasha-zinko-bunny-bag",
    name: "Bunny bag",
    brandSlug: "natasha-zinko",
    price: 320000,
    categories: DEFAULT_CATEGORIES,
    imageProductSlug: "bunny-bag"
  },
  {
    slug: "natasha-zinko-double-tshirt",
    name: "double tshirt",
    brandSlug: "natasha-zinko",
    price: 450000,
    categories: DEFAULT_CATEGORIES,
    imageProductSlug: "double-tshirt"
  },
  {
    slug: "natasha-zinko-oversized-double-polo",
    name: "oversized double polo",
    brandSlug: "natasha-zinko",
    price: 450000,
    categories: DEFAULT_CATEGORIES,
    imageProductSlug: "oversized-double-polo"
  },
  {
    slug: "gimaguas-001",
    name: "발레리나 웻지",
    brandSlug: "gimaguas",
    price: 630000,
    categories: DEFAULT_CATEGORIES,
    imageProductSlug: "bailarina-wedges-black-silueta-01"
  },
  {
    slug: "gimaguas-002",
    name: "인그리드 드레스",
    brandSlug: "gimaguas",
    price: 231000,
    categories: DEFAULT_CATEGORIES,
    imageProductSlug: "ingrid-mini-dress-black-silueta"
  },
  {
    slug: "gimaguas-003",
    name: "다리아 탑",
    brandSlug: "gimaguas",
    price: 213000,
    categories: DEFAULT_CATEGORIES,
    imageProductSlug: "daria-top-black-silueta"
  },
  {
    slug: "gimaguas-004",
    name: "루이스 폴로",
    brandSlug: "gimaguas",
    price: 290000,
    categories: DEFAULT_CATEGORIES,
    imageProductSlug: "luis-ls-polo-grey-silueta"
  },
  {
    slug: "gimaguas-005",
    name: "다니엘 자켓",
    brandSlug: "gimaguas",
    price: 621000,
    categories: DEFAULT_CATEGORIES,
    imageProductSlug: "daniel-jacket-grey-silueta"
  },
  {
    slug: "gabriela-coll-garments-001",
    name: "297 백",
    brandSlug: "gabriela-coll-garments",
    price: 1070000,
    categories: DEFAULT_CATEGORIES,
    imageProductSlug: "no-297-leather-small-crossed-bag-black"
  },
  {
    slug: "gabriela-coll-garments-002",
    name: "216 립스탑",
    brandSlug: "gabriela-coll-garments",
    price: 1480000,
    categories: DEFAULT_CATEGORIES,
    imageProductSlug: "no-216-ripstop-hooded-zipper-jacket-off-black"
  },
  {
    slug: "gabriela-coll-garments-003",
    name: "317",
    brandSlug: "gabriela-coll-garments",
    price: 545000,
    categories: DEFAULT_CATEGORIES,
    imageProductSlug: "no-317-organic-cotton-fleece-top-black"
  },
  {
    slug: "gabriela-coll-garments-004",
    name: "304",
    brandSlug: "gabriela-coll-garments",
    price: 845000,
    categories: DEFAULT_CATEGORIES,
    imageProductSlug: "no-304-linen-wrap-skirt-black"
  },
  {
    slug: "umber-postpast-001",
    name: "오간자",
    brandSlug: "umber-postpast",
    price: 520000,
    categories: DEFAULT_CATEGORIES,
    imageProductSlug: "cotton-organza-layered-midi-dress"
  },
  {
    slug: "umber-postpast-002",
    name: "트렌치",
    brandSlug: "umber-postpast",
    price: 1550000,
    categories: DEFAULT_CATEGORIES,
    imageProductSlug: "natural-dyed-silk-trench-coat"
  },
  {
    slug: "umber-postpast-003",
    name: "롱드레스",
    brandSlug: "umber-postpast",
    price: 650000,
    categories: DEFAULT_CATEGORIES,
    imageProductSlug: "wool-gauze-boat-neck-long-dress"
  },
  {
    slug: "ponder-er-001",
    name: "백",
    brandSlug: "ponder-er",
    price: 530000,
    categories: DEFAULT_CATEGORIES,
    imageProductSlug: "dash-crossbody-denim-bag-blue-mv2"
  },
  {
    slug: "ponder-er-002",
    name: "보바 자켓",
    brandSlug: "ponder-er",
    price: 870000,
    categories: DEFAULT_CATEGORIES,
    imageProductSlug: "voya-faux-shearling-jacket-black"
  },
  {
    slug: "ponder-er-003",
    name: "라벨 스커트",
    brandSlug: "ponder-er",
    price: 570000,
    categories: DEFAULT_CATEGORIES,
    imageProductSlug: "ravel-spiral-smocked-denim-skirt-white"
  },
  {
    slug: "paloma-wool-001",
    name: "벨트",
    brandSlug: "paloma-wool",
    price: 345000,
    categories: DEFAULT_CATEGORIES,
    imageProductSlug: "simulet-brown"
  },
  {
    slug: "paloma-wool-002",
    name: "데님",
    brandSlug: "paloma-wool",
    price: 469000,
    categories: DEFAULT_CATEGORIES,
    imageProductSlug: "lonati-denim"
  },
  {
    slug: "paloma-wool-003",
    name: "홀터넥",
    brandSlug: "paloma-wool",
    price: 249000,
    categories: DEFAULT_CATEGORIES,
    imageProductSlug: "penelope-ii-black"
  },
  {
    slug: "edward-cuming-thong-sandal-mens",
    name: "Thong Sandal Mens",
    brandSlug: "edward-cuming",
    price: 791000,
    categories: DEFAULT_CATEGORIES,
    imageProductSlug: "thong-sandal-mens"
  },
  {
    slug: "edward-cuming-002",
    name: "봄버",
    brandSlug: "edward-cuming",
    price: 1115000,
    categories: DEFAULT_CATEGORIES,
    imageProductSlug: "bottom-heavy-top-heavy-bomber"
  },
  {
    slug: "edward-cuming-003",
    name: "데님",
    brandSlug: "edward-cuming",
    price: 776000,
    categories: DEFAULT_CATEGORIES,
    imageProductSlug: "drop-dart-volume-jean"
  },
  {
    slug: "edward-cuming-004",
    name: "스커트",
    brandSlug: "edward-cuming",
    price: 880000,
    categories: DEFAULT_CATEGORIES,
    imageProductSlug: "encompassing-vortex-skirt"
  },
  {
    slug: "helmut-lang-001",
    name: "넥집업",
    brandSlug: "helmut-lang",
    price: 229000,
    categories: DEFAULT_CATEGORIES,
    imageProductSlug: "funnel-neck-pullover"
  },
  {
    slug: "helmut-lang-002",
    name: "치노팬츠",
    brandSlug: "helmut-lang",
    price: 450000,
    categories: DEFAULT_CATEGORIES,
    imageProductSlug: "chino-pant"
  },
  {
    slug: "helmut-lang-003",
    name: "노트 셔츠 드레스",
    brandSlug: "helmut-lang",
    price: 870000,
    categories: DEFAULT_CATEGORIES,
    imageProductSlug: "knot-shirt-dress"
  },
  {
    slug: "helmut-lang-004",
    name: "트위스트",
    brandSlug: "helmut-lang",
    price: 850000,
    categories: DEFAULT_CATEGORIES,
    imageProductSlug: "twisted-shirt-dress"
  },
  {
    slug: "kiko-kostadinov-001",
    name: "사르고 슈즈",
    brandSlug: "kiko-kostadinov",
    price: 1140000,
    categories: DEFAULT_CATEGORIES,
    imageProductSlug: "sargo-shoes-umber"
  },
  {
    slug: "kiko-kostadinov-002",
    name: "오스트로",
    brandSlug: "kiko-kostadinov",
    price: 1150000,
    categories: DEFAULT_CATEGORIES,
    imageProductSlug: "ostro-canvas-shoes-beech-orange"
  },
  {
    slug: "kiko-kostadinov-003",
    name: "키코 닥터마틴",
    brandSlug: "kiko-kostadinov",
    price: 479000,
    categories: DEFAULT_CATEGORIES,
    imageProductSlug: "kiko-kostadinov-x-dr-martens-the-toe-box-shoe-moss-green"
  },
  {
    slug: "kiko-kostadinov-004",
    name: "발레리나",
    brandSlug: "kiko-kostadinov",
    price: 980000,
    categories: DEFAULT_CATEGORIES,
    imageProductSlug: "reticella-ballerina-sapphire"
  },
  {
    slug: "meta-campania-collective-nino-jacket",
    name: "Nino jacket",
    brandSlug: "meta-campania-collective",
    price: 1200000,
    categories: DEFAULT_CATEGORIES,
    imageProductSlug: "jacket"
  },
  {
    slug: "mainline-ilya-pants",
    name: "Ilya pants",
    brandSlug: "mainline",
    price: 460000,
    categories: DEFAULT_CATEGORIES,
    imageProductSlug: "ilya"
  },
  {
    slug: "commission-tie-tartan-mini-dress",
    name: "Tie tartan mini dress",
    brandSlug: "commission",
    price: 1250000,
    categories: DEFAULT_CATEGORIES,
    imageProductSlug: "dress"
  },
  {
    slug: "commission-curve-flap-jacket-heather-grey",
    name: "Curve Flap Jacket, Heather Grey",
    brandSlug: "commission",
    price: 1000000,
    categories: DEFAULT_CATEGORIES,
    imageProductSlug: "curve-flap-jacket-heather-grey"
  },
  {
    slug: "johanna-parv-skirt-capris-black",
    name: "Skirt Capris, Black",
    brandSlug: "johanna-parv",
    price: 544800,
    categories: DEFAULT_CATEGORIES,
    imageProductSlug: "skirt-capris-black"
  },
  {
    slug: "johanna-parv-cover-skirt-khaki",
    name: "Cover Skirt, Khaki",
    brandSlug: "johanna-parv",
    price: 748000,
    categories: DEFAULT_CATEGORIES,
    imageProductSlug: "cover-skirt-khaki"
  },
  {
    slug: "a-v-vattev-o-keeffe-studded-t-shirt-black",
    name: "O'KEEFFE STUDDED T-SHIRT BLACK",
    brandSlug: "a-v-vattev",
    price: 202000,
    categories: DEFAULT_CATEGORIES,
    imageProductSlug: "o-keeffe-studded-t-shirt-black"
  },
  {
    slug: "a-v-vattev-scarf-shirt-patchwork-black",
    name: "SCARF SHIRT PATCHWORK BLACK",
    brandSlug: "a-v-vattev",
    price: 620000,
    categories: DEFAULT_CATEGORIES,
    imageProductSlug: "scarf-shirt-patchwork-black"
  },
  {
    slug: "super-yaya-syy-x-puma-speedcat-ii-black",
    name: "SYY X PUMA SPEEDCAT II - BLACK",
    brandSlug: "super-yaya",
    price: 155000,
    categories: DEFAULT_CATEGORIES,
    imageProductSlug: "syy-x-puma-speedcat-ii-black"
  },
  {
    slug: "super-yaya-winona-knit-polo-tee-brown-purple",
    name: "Winona Knit Polo Tee, Brown/Purple",
    brandSlug: "super-yaya",
    price: 1100000,
    categories: DEFAULT_CATEGORIES,
    imageProductSlug: "winona-knit-polo-tee-brown-purple"
  },
  {
    slug: "lea-boberg-sc-shirt",
    name: "SC SHIRT",
    brandSlug: "lea-boberg",
    price: 879000,
    categories: DEFAULT_CATEGORIES,
    imageProductSlug: "sc-shirt"
  }
] satisfies readonly CatalogProductInput[];

export const products: Product[] = catalogProducts.map((entry, index) => {
  const brand = getBrandBySlug(entry.brandSlug);
  const image = entry.imageProductSlug ? getImagePath(entry.brandSlug, entry.imageProductSlug) : undefined;

  if (!brand) {
    throw new Error(`Unknown brand slug in product catalog: ${entry.brandSlug}`);
  }

  return {
    id: `p-${String(index + 1).padStart(3, "0")}`,
    slug: entry.slug,
    name: entry.name,
    brandId: brand.id,
    brandSlug: entry.brandSlug,
    categories: [...entry.categories],
    audience: DEFAULT_AUDIENCE,
    price: entry.price,
    isNew: true,
    description: `${entry.name}${brand ? ` by ${brand.name}` : ""}.`,
    sizes: ["One size"],
    ...(image ? { image } : {})
  };
});

const usedImageKeys = new Set(
  catalogProducts.flatMap((entry) =>
    entry.imageProductSlug ? [imageKey(entry.brandSlug, entry.imageProductSlug)] : []
  )
);

export const missingProductImages = catalogProducts
  .filter(
    (entry): entry is CatalogProductInput & { imageProductSlug: string } =>
      Boolean(entry.imageProductSlug) && !getImagePath(entry.brandSlug, entry.imageProductSlug)
  )
  .map((entry) => `${entry.brandSlug}: ${entry.name} (${entry.imageProductSlug})`);

export const unusedProductImages = productImages
  .filter((image) => !usedImageKeys.has(imageKey(image.brandSlug, image.productSlug)))
  .map((image) => image.imagePath);

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getProductById(id: string) {
  return products.find((product) => product.id === id);
}
