import { getBrandBySlug } from "@/data/brands";
import { productImages } from "@/data/product-images";
import type { Audience, Product, ProductCategory, ProductStatus, ProductType } from "@/types/domain";

type CatalogProductInput = {
  name: string;
  brandSlug: string;
  price: number;
  audience: Audience;
  productType: ProductType;
  categories: readonly ProductCategory[];
  sizes?: readonly string[];
  description?: string;
  sourceImage: string;
  status: ProductStatus;
};

type ProductImageKey = `${string}/${string}`;

const DEFAULT_DESCRIPTION = "Product details will be updated soon.";
const DEFAULT_SIZES: readonly string[] = ["TBD"];
const NEW_IN: readonly ProductCategory[] = ["new-in"];
const NEW_IN_WOMEN: readonly ProductCategory[] = ["new-in", "women"];
const NEW_IN_MEN: readonly ProductCategory[] = ["new-in", "men"];
const IMAGE_EXTENSIONS = [".png", ".jpg", ".jpeg", ".webp", ".avif"] as const;

function imageKey(brandSlug: string, productSlug: string): ProductImageKey {
  return `${brandSlug}/${productSlug}`;
}

function slugify(value: string) {
  return value
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function stripImageExtensions(fileName: string) {
  let baseName = fileName;
  let stripped = true;

  while (stripped) {
    stripped = false;
    const lowerBaseName = baseName.toLowerCase();

    for (const extension of IMAGE_EXTENSIONS) {
      if (lowerBaseName.endsWith(extension)) {
        baseName = baseName.slice(0, -extension.length);
        stripped = true;
        break;
      }
    }
  }

  return baseName;
}

function getImageProductSlug(sourceImage: string) {
  const fileName = sourceImage.split(/[\\/]/).at(-1) ?? sourceImage;
  return slugify(stripImageExtensions(fileName));
}

function getProductSlug(entry: CatalogProductInput, index: number) {
  const productSlug = slugify(entry.name);
  return productSlug ? `${entry.brandSlug}-${productSlug}` : `${entry.brandSlug}-${String(index + 1).padStart(3, "0")}`;
}

const imagePathByKey = new Map<ProductImageKey, string>(
  productImages.map((image) => [imageKey(image.brandSlug, image.productSlug), image.imagePath])
);

function getImagePath(brandSlug: string, sourceImage: string) {
  return imagePathByKey.get(imageKey(brandSlug, getImageProductSlug(sourceImage)));
}

const catalogProducts = [
  {
    name: "Ordinary Shirt Chino",
    brandSlug: "abelia-edoward-goucha",
    price: 870000,
    audience: "TBD",
    productType: "shirt",
    categories: NEW_IN,
    sourceImage: "assets/cutouts/abelia-edoward-goucha/ordinary shirt chino.png",
    status: "needs-details"
  },
  {
    name: "Sun Hoodie",
    brandSlug: "abelia-edoward-goucha",
    price: 432000,
    audience: "TBD",
    productType: "top",
    categories: NEW_IN,
    sourceImage: "assets/cutouts/abelia-edoward-goucha/sun hoodie.png",
    status: "needs-details"
  },
  {
    name: "Bunny Bag",
    brandSlug: "natasha-zinko",
    price: 320000,
    audience: "TBD",
    productType: "bag",
    categories: NEW_IN,
    sourceImage: "assets/cutouts/natasha-zinko/bunny bag.png",
    status: "needs-details"
  },
  {
    name: "Double Tshirt",
    brandSlug: "natasha-zinko",
    price: 450000,
    audience: "TBD",
    productType: "top",
    categories: NEW_IN,
    sourceImage: "assets/cutouts/natasha-zinko/double tshirt.png",
    status: "needs-details"
  },
  {
    name: "Oversized Double Polo",
    brandSlug: "natasha-zinko",
    price: 450000,
    audience: "TBD",
    productType: "shirt",
    categories: NEW_IN,
    sourceImage: "assets/cutouts/natasha-zinko/oversized double polo.png.png",
    status: "needs-details"
  },
  {
    name: "Bailarina Wedges Black Silueta 01",
    brandSlug: "gimaguas",
    price: 630000,
    audience: "TBD",
    productType: "shoes",
    categories: NEW_IN,
    sourceImage: "assets/cutouts/gimaguas/bailarina-wedges-black_silueta_01.jpg.png",
    status: "needs-details"
  },
  {
    name: "Ingrid Mini Dress Black Silueta",
    brandSlug: "gimaguas",
    price: 231000,
    audience: "TBD",
    productType: "dress",
    categories: NEW_IN,
    sourceImage: "assets/cutouts/gimaguas/ingrid-mini-dress_black_silueta.jpg.png",
    status: "needs-details"
  },
  {
    name: "Daria Top",
    brandSlug: "gimaguas",
    price: 213000,
    audience: "women",
    productType: "top",
    categories: NEW_IN_WOMEN,
    sizes: ["xs", "s", "m", "l", "xl"],
    description: "Black asymmetrical t-shirt with ruched shoulder and draped hem.",
    sourceImage: "assets/cutouts/gimaguas/daria-top_black_silueta.jpg.png",
    status: "ready"
  },
  {
    name: "Luis Ls Polo Grey Silueta",
    brandSlug: "gimaguas",
    price: 290000,
    audience: "TBD",
    productType: "shirt",
    categories: NEW_IN,
    sourceImage: "assets/cutouts/gimaguas/luis-ls-polo_grey_silueta.jpg.png",
    status: "needs-details"
  },
  {
    name: "Daniel Jacket Grey Silueta",
    brandSlug: "gimaguas",
    price: 621000,
    audience: "TBD",
    productType: "jacket",
    categories: NEW_IN,
    sourceImage: "assets/cutouts/gimaguas/daniel-jacket_grey_silueta.png",
    status: "needs-details"
  },
  {
    name: "No.297 Leather Small Crossed Bag, Black",
    brandSlug: "gabriela-coll-garments",
    price: 1070000,
    audience: "TBD",
    productType: "bag",
    categories: NEW_IN,
    sourceImage: "assets/cutouts/gabriela-coll-garments/No.297 Leather Small Crossed Bag, Black.png",
    status: "needs-details"
  },
  {
    name: "No.216 Ripstop Hooded Zipper Jacket, Off Black",
    brandSlug: "gabriela-coll-garments",
    price: 1480000,
    audience: "TBD",
    productType: "jacket",
    categories: NEW_IN,
    sourceImage: "assets/cutouts/gabriela-coll-garments/No.216 Ripstop Hooded Zipper Jacket, Off Black.png",
    status: "needs-details"
  },
  {
    name: "No.317 Organic Cotton Fleece Top, Black",
    brandSlug: "gabriela-coll-garments",
    price: 545000,
    audience: "TBD",
    productType: "top",
    categories: NEW_IN,
    sourceImage: "assets/cutouts/gabriela-coll-garments/No.317 Organic Cotton Fleece Top, Black.png",
    status: "needs-details"
  },
  {
    name: "No.304 Linen Wrap Skirt, Black",
    brandSlug: "gabriela-coll-garments",
    price: 845000,
    audience: "TBD",
    productType: "skirt",
    categories: NEW_IN,
    sourceImage: "assets/cutouts/gabriela-coll-garments/No.304 Linen Wrap Skirt, Black.png",
    status: "needs-details"
  },
  {
    name: "Cotton Organza Layered Midi Dress",
    brandSlug: "umber-postpast",
    price: 520000,
    audience: "TBD",
    productType: "dress",
    categories: NEW_IN,
    sourceImage: "assets/cutouts/umber-postpast/COTTON ORGANZA LAYERED MIDI DRESS.jpg.png",
    status: "needs-details"
  },
  {
    name: "Natural Dyed Silk Trench Coat",
    brandSlug: "umber-postpast",
    price: 1550000,
    audience: "TBD",
    productType: "jacket",
    categories: NEW_IN,
    sourceImage: "assets/cutouts/umber-postpast/NATURAL DYED SILK TRENCH COAT.png",
    status: "needs-details"
  },
  {
    name: "Wool Gauze Boat-Neck Long Dress",
    brandSlug: "umber-postpast",
    price: 650000,
    audience: "TBD",
    productType: "dress",
    categories: NEW_IN,
    sourceImage: "assets/cutouts/umber-postpast/WOOL GAUZE BOAT-NECK LONG DRESS.png",
    status: "needs-details"
  },
  {
    name: "DASH Crossbody Denim Bag (Blue)",
    brandSlug: "ponder-er",
    price: 530000,
    audience: "TBD",
    productType: "bag",
    categories: NEW_IN,
    sourceImage: "assets/cutouts/ponder-er/_DASH_ Crossbody Denim Bag (Blue)~mv2.jpg.png",
    status: "needs-details"
  },
  {
    name: "VOYA Faux-Shearling Jacket (Black)",
    brandSlug: "ponder-er",
    price: 870000,
    audience: "TBD",
    productType: "jacket",
    categories: NEW_IN,
    sourceImage: "assets/cutouts/ponder-er/_VOYA_ Faux-Shearling Jacket (Black).png",
    status: "needs-details"
  },
  {
    name: "RAVEL Spiral Smocked Denim Skirt (White)",
    brandSlug: "ponder-er",
    price: 570000,
    audience: "TBD",
    productType: "skirt",
    categories: NEW_IN,
    sourceImage: "assets/cutouts/ponder-er/_RAVEL_ Spiral Smocked Denim Skirt (White).png",
    status: "needs-details"
  },
  {
    name: "Simulet, Brown",
    brandSlug: "paloma-wool",
    price: 345000,
    audience: "TBD",
    productType: "TBD",
    categories: NEW_IN,
    sourceImage: "assets/cutouts/paloma-wool/Simulet, Brown.png",
    status: "needs-details"
  },
  {
    name: "Lonati, Denim",
    brandSlug: "paloma-wool",
    price: 469000,
    audience: "TBD",
    productType: "TBD",
    categories: NEW_IN,
    sourceImage: "assets/cutouts/paloma-wool/Lonati, Denim.png",
    status: "needs-details"
  },
  {
    name: "Penelope Ii, Black",
    brandSlug: "paloma-wool",
    price: 249000,
    audience: "TBD",
    productType: "TBD",
    categories: NEW_IN,
    sourceImage: "assets/cutouts/paloma-wool/Penelope Ii, Black.png",
    status: "needs-details"
  },
  {
    name: "Thong Sandal Mens",
    brandSlug: "edward-cuming",
    price: 791000,
    audience: "men",
    productType: "shoes",
    categories: NEW_IN_MEN,
    sourceImage: "assets/cutouts/edward-cuming/Thong Sandal Mens .jpg.png",
    status: "needs-details"
  },
  {
    name: "Bottom Heavy Top Heavy Bomber",
    brandSlug: "edward-cuming",
    price: 1115000,
    audience: "TBD",
    productType: "jacket",
    categories: NEW_IN,
    sourceImage: "assets/cutouts/edward-cuming/Bottom Heavy Top Heavy Bomber .png",
    status: "needs-details"
  },
  {
    name: "Drop Dart Volume Jean",
    brandSlug: "edward-cuming",
    price: 776000,
    audience: "TBD",
    productType: "pants",
    categories: NEW_IN,
    sourceImage: "assets/cutouts/edward-cuming/Drop Dart Volume Jean .png",
    status: "needs-details"
  },
  {
    name: "Encompassing Vortex Skirt",
    brandSlug: "edward-cuming",
    price: 880000,
    audience: "TBD",
    productType: "skirt",
    categories: NEW_IN,
    sourceImage: "assets/cutouts/edward-cuming/Encompassing Vortex Skirt.png",
    status: "needs-details"
  },
  {
    name: "FUNNEL NECK PULLOVER",
    brandSlug: "helmut-lang",
    price: 229000,
    audience: "TBD",
    productType: "top",
    categories: NEW_IN,
    sourceImage: "assets/cutouts/helmut-lang/FUNNEL NECK PULLOVER.png",
    status: "needs-details"
  },
  {
    name: "CHINO PANT",
    brandSlug: "helmut-lang",
    price: 450000,
    audience: "TBD",
    productType: "pants",
    categories: NEW_IN,
    sourceImage: "assets/cutouts/helmut-lang/CHINO PANT.png",
    status: "needs-details"
  },
  {
    name: "KNOT SHIRT DRESS",
    brandSlug: "helmut-lang",
    price: 870000,
    audience: "TBD",
    productType: "dress",
    categories: NEW_IN,
    sourceImage: "assets/cutouts/helmut-lang/KNOT SHIRT DRESS.png",
    status: "needs-details"
  },
  {
    name: "TWISTED SHIRT DRESS",
    brandSlug: "helmut-lang",
    price: 850000,
    audience: "TBD",
    productType: "dress",
    categories: NEW_IN,
    sourceImage: "assets/cutouts/helmut-lang/TWISTED SHIRT DRESS.png",
    status: "needs-details"
  },
  {
    name: "SARGO SHOES UMBER",
    brandSlug: "kiko-kostadinov",
    price: 1140000,
    audience: "TBD",
    productType: "shoes",
    categories: NEW_IN,
    sourceImage: "assets/cutouts/kiko-kostadinov/SARGO SHOES UMBER.png",
    status: "needs-details"
  },
  {
    name: "OSTRO CANVAS SHOES BEECH ORANGE",
    brandSlug: "kiko-kostadinov",
    price: 1150000,
    audience: "TBD",
    productType: "shoes",
    categories: NEW_IN,
    sourceImage: "assets/cutouts/kiko-kostadinov/OSTRO CANVAS SHOES BEECH ORANGE.png",
    status: "needs-details"
  },
  {
    name: "KIKO KOSTADINOV X DR. MARTENS THE TOE BOX SHOE MOSS GREEN",
    brandSlug: "kiko-kostadinov",
    price: 479000,
    audience: "TBD",
    productType: "shoes",
    categories: NEW_IN,
    sourceImage: "assets/cutouts/kiko-kostadinov/KIKO KOSTADINOV X DR. MARTENS THE TOE BOX SHOE MOSS GREEN.png",
    status: "needs-details"
  },
  {
    name: "RETICELLA BALLERINA SAPPHIRE",
    brandSlug: "kiko-kostadinov",
    price: 980000,
    audience: "TBD",
    productType: "shoes",
    categories: NEW_IN,
    sourceImage: "assets/cutouts/kiko-kostadinov/RETICELLA BALLERINA SAPPHIRE.png",
    status: "needs-details"
  },
  {
    name: "Jacket",
    brandSlug: "meta-campania-collective",
    price: 1200000,
    audience: "TBD",
    productType: "jacket",
    categories: NEW_IN,
    sourceImage: "assets/cutouts/meta-campania-collective/jacket.png.png",
    status: "needs-details"
  },
  {
    name: "Ilya",
    brandSlug: "mainline",
    price: 460000,
    audience: "TBD",
    productType: "TBD",
    categories: NEW_IN,
    sourceImage: "assets/cutouts/mainline/ilya.png",
    status: "needs-details"
  },
  {
    name: "Dress",
    brandSlug: "commission",
    price: 1250000,
    audience: "TBD",
    productType: "dress",
    categories: NEW_IN,
    sourceImage: "assets/cutouts/commission/dress.png",
    status: "needs-details"
  },
  {
    name: "Curve Flap Jacket, Heather Grey",
    brandSlug: "commission",
    price: 1000000,
    audience: "TBD",
    productType: "jacket",
    categories: NEW_IN,
    sourceImage: "assets/cutouts/commission/Curve Flap Jacket, Heather Grey.png",
    status: "needs-details"
  },
  {
    name: "Skirt Capris, Black",
    brandSlug: "johanna-parv",
    price: 544800,
    audience: "TBD",
    productType: "skirt",
    categories: NEW_IN,
    sourceImage: "assets/cutouts/johanna-parv/Skirt Capris, Black.png",
    status: "needs-details"
  },
  {
    name: "Cover Skirt, Khaki",
    brandSlug: "johanna-parv",
    price: 748000,
    audience: "TBD",
    productType: "skirt",
    categories: NEW_IN,
    sourceImage: "assets/cutouts/johanna-parv/Cover Skirt, Khaki.png",
    status: "needs-details"
  },
  {
    name: "O'KEEFFE STUDDED T-SHIRT BLACK",
    brandSlug: "a-v-vattev",
    price: 202000,
    audience: "TBD",
    productType: "top",
    categories: NEW_IN,
    sourceImage: "assets/cutouts/a-v-vattev/O'KEEFFE STUDDED T-SHIRT BLACK.png.png",
    status: "needs-details"
  },
  {
    name: "SCARF SHIRT PATCHWORK BLACK",
    brandSlug: "a-v-vattev",
    price: 620000,
    audience: "TBD",
    productType: "shirt",
    categories: NEW_IN,
    sourceImage: "assets/cutouts/a-v-vattev/SCARF SHIRT PATCHWORK BLACK.png",
    status: "needs-details"
  },
  {
    name: "SYY X PUMA SPEEDCAT II - BLACK",
    brandSlug: "super-yaya",
    price: 155000,
    audience: "TBD",
    productType: "shoes",
    categories: NEW_IN,
    sourceImage: "assets/cutouts/super-yaya/SYY X PUMA SPEEDCAT II - BLACK.png",
    status: "needs-details"
  },
  {
    name: "Winona Knit Polo Tee, Brown Purple",
    brandSlug: "super-yaya",
    price: 1100000,
    audience: "TBD",
    productType: "top",
    categories: NEW_IN,
    sourceImage: "assets/cutouts/super-yaya/Winona Knit Polo Tee, Brown Purple.png",
    status: "needs-details"
  },
  {
    name: "SC Shirt",
    brandSlug: "lea-boberg",
    price: 879000,
    audience: "TBD",
    productType: "shirt",
    categories: NEW_IN,
    sourceImage: "assets/cutouts/lea-boberg/sc shirt.jpg.png",
    status: "needs-details"
  }
] satisfies readonly CatalogProductInput[];

export const products: Product[] = catalogProducts.map((entry, index) => {
  const brand = getBrandBySlug(entry.brandSlug);
  const image = getImagePath(entry.brandSlug, entry.sourceImage);

  if (!brand) {
    throw new Error(`Unknown brand slug in product catalog: ${entry.brandSlug}`);
  }

  return {
    id: `p-${String(index + 1).padStart(3, "0")}`,
    slug: getProductSlug(entry, index),
    name: entry.name,
    brandId: brand.id,
    brandSlug: entry.brandSlug,
    categories: [...entry.categories],
    audience: entry.audience,
    productType: entry.productType,
    price: entry.price,
    isNew: entry.categories.includes("new-in"),
    isSale: entry.categories.includes("sale"),
    description: entry.description ?? DEFAULT_DESCRIPTION,
    sizes: [...(entry.sizes ?? DEFAULT_SIZES)],
    sourceImage: entry.sourceImage,
    status: entry.status,
    ...(image ? { image } : {})
  };
});

const usedImageKeys = new Set(catalogProducts.map((entry) => imageKey(entry.brandSlug, getImageProductSlug(entry.sourceImage))));

export const missingProductImages = catalogProducts
  .filter((entry) => !getImagePath(entry.brandSlug, entry.sourceImage))
  .map((entry) => `${entry.brandSlug}: ${entry.name} (${entry.sourceImage})`);

export const unusedProductImages = productImages
  .filter((image) => !usedImageKeys.has(imageKey(image.brandSlug, image.productSlug)))
  .map((image) => image.imagePath);

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getProductById(id: string) {
  return products.find((product) => product.id === id);
}
