import { getBrandBySlug } from "@/data/brands";
import newCatalogProductsData from "@/data/new-products.json";
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
  imageProductSlug?: string;
  status: ProductStatus;
};

type NewCatalogProductInput = Omit<CatalogProductInput, "categories">;

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

function getDefaultCategories(audience: Audience): readonly ProductCategory[] {
  if (audience === "women") {
    return NEW_IN_WOMEN;
  }

  if (audience === "men") {
    return NEW_IN_MEN;
  }

  return NEW_IN;
}

function getImageLookupSlug(entry: CatalogProductInput) {
  return entry.imageProductSlug ?? getImageProductSlug(entry.sourceImage);
}

const imageByKey = new Map<ProductImageKey, (typeof productImages)[number]>(
  productImages.map((image) => [imageKey(image.brandSlug, image.productSlug), image])
);

function getProductImage(entry: CatalogProductInput) {
  return imageByKey.get(imageKey(entry.brandSlug, getImageLookupSlug(entry)));
}

function getProductImagePaths(image: (typeof productImages)[number] | undefined) {
  if (!image) {
    return [];
  }

  return [image.imagePath, image.hoverImagePath].filter((imagePath): imagePath is string => Boolean(imagePath));
}

const baseCatalogProducts = [
  {
    name: "Ordinary Shirt Chino",
    brandSlug: "abelia-edoward-goucha",
    price: 870000,
    audience: "unisex",
    productType: "shirt",
    categories: NEW_IN,
    sizes: ["2", "3"],
    description:
      "Boxy casual shirt in crisp cotton katsuragi twill with twin front pockets; the placket, pleats and cuff gauntlets are designed inside-out as a playful but fully functional everyday detail.",
    sourceImage: "assets/cutouts/abelia-edoward-goucha/ordinary shirt chino.png",
    status: "needs-details"
  },
  {
    name: "Sun Hoodie",
    brandSlug: "abelia-edoward-goucha",
    price: 432000,
    audience: "unisex",
    productType: "top",
    categories: NEW_IN,
    sizes: ["2", "3"],
    description:
      "Lightweight, fully reversible summer hoodie with zippered front and interior pockets, in a high-performance knit offering UV protection, moisture-wicking, a cool-to-the-touch feel and machine washability.",
    sourceImage: "assets/cutouts/abelia-edoward-goucha/sun hoodie.png",
    status: "ready"
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
    audience: "women",
    productType: "shoes",
    categories: NEW_IN_WOMEN,
    sizes: ["36", "37", "38", "39", "40", "41"],
    description: "Women's ballerina shoes with a soft faded-leather finish, a round toe and a 7.5cm wedge heel.",
    sourceImage: "assets/cutouts/gimaguas/bailarina-wedges-black_silueta_01.jpg.png",
    status: "needs-details"
  },
  {
    name: "Ingrid Mini Dress Black Silueta",
    brandSlug: "gimaguas",
    price: 231000,
    audience: "women",
    productType: "dress",
    categories: NEW_IN_WOMEN,
    sizes: ["XS", "S", "M", "L", "XL"],
    description:
      "Black semi-sheer mini dress with a gathered crew neckline, soft pleats and three-quarter sleeves in lightweight textured cotton; regular fit.",
    sourceImage: "assets/cutouts/gimaguas/ingrid-mini-dress_black_silueta.jpg.png",
    status: "ready"
  },
  {
    name: "Daria Top",
    brandSlug: "gimaguas",
    price: 213000,
    audience: "women",
    productType: "top",
    categories: NEW_IN_WOMEN,
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Black asymmetrical t-shirt with ruched shoulder and draped hem.",
    sourceImage: "assets/cutouts/gimaguas/daria-top_black_silueta.jpg.png",
    status: "ready"
  },
  {
    name: "Luis Ls Polo Grey Silueta",
    brandSlug: "gimaguas",
    price: 290000,
    audience: "unisex",
    productType: "shirt",
    categories: NEW_IN,
    sizes: ["XS", "S", "M", "L", "XL"],
    description:
      "Dark grey and navy long-sleeve polo with a faux layered effect — lightweight cotton jersey with a faux blue shirt layer underneath and an oversized silhouette.",
    sourceImage: "assets/cutouts/gimaguas/luis-ls-polo_grey_silueta.jpg.png",
    status: "ready"
  },
  {
    name: "Daniel Jacket Grey Silueta",
    brandSlug: "gimaguas",
    price: 621000,
    audience: "unisex",
    productType: "jacket",
    categories: NEW_IN,
    sizes: ["XS", "S", "M", "L", "XL"],
    description:
      "Grey pinstripe jacket with a mandarin collar, button closure, four button-flap pockets, elasticated hem and contrasting ribbed cuffs; straight fit.",
    sourceImage: "assets/cutouts/gimaguas/daniel-jacket_grey_silueta.png",
    status: "ready"
  },
  {
    name: "No.297 Leather Small Crossed Bag, Black",
    brandSlug: "gabriela-coll-garments",
    price: 1070000,
    audience: "unisex",
    productType: "bag",
    categories: NEW_IN,
    sizes: ["OS"],
    description:
      "Compact crossbody bag in vegetable-tanned lambskin with zip closure, interior pocket and RIRI metal hardware; unlined, with natural leather markings left visible.",
    sourceImage: "assets/cutouts/gabriela-coll-garments/No.297 Leather Small Crossed Bag, Black.png",
    status: "ready"
  },
  {
    name: "No.216 Ripstop Hooded Zipper Jacket, Off Black",
    brandSlug: "gabriela-coll-garments",
    price: 1480000,
    audience: "unisex",
    productType: "jacket",
    categories: NEW_IN,
    sizes: ["0", "1", "2", "3", "4", "5"],
    description:
      "Off-black ripstop hooded jacket with an oversized fit, two-way RIRI metal zip closure, side-seam pockets and gathered cuffs and hem.",
    sourceImage: "assets/cutouts/gabriela-coll-garments/No.216 Ripstop Hooded Zipper Jacket, Off Black.png",
    status: "ready"
  },
  {
    name: "No.317 Organic Cotton Fleece Top, Black",
    brandSlug: "gabriela-coll-garments",
    price: 545000,
    audience: "unisex",
    productType: "top",
    categories: NEW_IN,
    sizes: ["0", "1", "2", "3", "4", "5"],
    description:
      "Relaxed-fit top in heavy 100% organic cotton fleece with a crew neck and exposed raw-edge finish at collar, cuffs and hem; individually dyed so colour nuances occur.",
    sourceImage: "assets/cutouts/gabriela-coll-garments/No.317 Organic Cotton Fleece Top, Black.png",
    status: "ready"
  },
  {
    name: "No.304 Linen Wrap Skirt, Black",
    brandSlug: "gabriela-coll-garments",
    price: 845000,
    audience: "women",
    productType: "skirt",
    categories: NEW_IN_WOMEN,
    sizes: ["0", "1", "2", "3", "4"],
    description:
      "Narrow-fitting 100% linen wrap skirt with a self-tie fastening strap, button adjustment, raw-edge finish and natural corozo buttons.",
    sourceImage: "assets/cutouts/gabriela-coll-garments/No.304 Linen Wrap Skirt, Black.png",
    status: "ready"
  },
  {
    name: "Cotton Organza Layered Midi Dress",
    brandSlug: "umber-postpast",
    price: 520000,
    audience: "women",
    productType: "dress",
    categories: NEW_IN_WOMEN,
    sizes: ["1", "2", "3"],
    description:
      "Sleeveless midi dress in sheer cotton organza with a layered detail, side-seam pockets, concealed back zip and full cupro lining; 100% cotton.",
    sourceImage: "assets/cutouts/umber-postpast/COTTON ORGANZA LAYERED MIDI DRESS.jpg.png",
    status: "ready"
  },
  {
    name: "Natural Dyed Silk Trench Coat",
    brandSlug: "umber-postpast",
    price: 1550000,
    audience: "unisex",
    productType: "jacket",
    categories: NEW_IN,
    sizes: ["0", "1", "2"],
    description:
      "Double-breasted natural-dyed silk trench coat with horn buttons, a detachable neck latch and waist belt, diagonal flap pockets, epaulettes and a back vent; 100% silk.",
    sourceImage: "assets/cutouts/umber-postpast/NATURAL DYED SILK TRENCH COAT.png",
    status: "ready"
  },
  {
    name: "Wool Gauze Boat-Neck Long Dress",
    brandSlug: "umber-postpast",
    price: 650000,
    audience: "women",
    productType: "dress",
    categories: NEW_IN_WOMEN,
    sizes: ["0", "1", "2"],
    description:
      "Sleeveless boat-neck long dress in wool gauze with side-seam pockets, side vents, concealed back zip and full cupro lining; 100% wool.",
    sourceImage: "assets/cutouts/umber-postpast/WOOL GAUZE BOAT-NECK LONG DRESS.png",
    status: "ready"
  },
  {
    name: "DASH Crossbody Denim Bag (Blue)",
    brandSlug: "ponder-er",
    price: 530000,
    audience: "unisex",
    productType: "bag",
    categories: NEW_IN,
    sizes: ["OS"],
    description:
      "Denim crossbody bag featuring ponder.er's signature diamond-shaped smocking and cut-out details, made from treated denim with a unique washed shade.",
    sourceImage: "assets/cutouts/ponder-er/_DASH_ Crossbody Denim Bag (Blue)~mv2.jpg.png",
    status: "ready"
  },
  {
    name: "VOYA Faux-Shearling Jacket (Black)",
    brandSlug: "ponder-er",
    price: 870000,
    audience: "unisex",
    productType: "jacket",
    categories: NEW_IN,
    sizes: ["S", "M", "L"],
    description:
      "Faux-shearling jacket with ponder.er's signature smocking, technical-fabric side panels with elasticated hem, zip closure and a relaxed fit.",
    sourceImage: "assets/cutouts/ponder-er/_VOYA_ Faux-Shearling Jacket (Black).png",
    status: "ready"
  },
  {
    name: "RAVEL Spiral Smocked Denim Skirt (White)",
    brandSlug: "ponder-er",
    price: 570000,
    audience: "women",
    productType: "skirt",
    categories: NEW_IN_WOMEN,
    sizes: ["XS", "S", "M", "L"],
    description:
      "Spiral-panelled denim skirt with button closure, signature diamond smocking and cut-out fraying details creating an elegant mermaid shape.",
    sourceImage: "assets/cutouts/ponder-er/_RAVEL_ Spiral Smocked Denim Skirt (White).png",
    status: "ready"
  },
  {
    name: "Simulet, Brown",
    brandSlug: "paloma-wool",
    price: 345000,
    audience: "women",
    productType: "top",
    categories: NEW_IN_WOMEN,
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Halter top with an eyelet patch detail and adjustable strap, made from soft micromodal.",
    sourceImage: "assets/cutouts/paloma-wool/Simulet, Brown.png",
    status: "ready"
  },
  {
    name: "Lonati, Denim",
    brandSlug: "paloma-wool",
    price: 469000,
    audience: "women",
    productType: "pants",
    categories: NEW_IN_WOMEN,
    sizes: ["34", "36", "38", "40", "42", "44"],
    description: "Waistband-free denim trousers with large pockets in classic denim.",
    sourceImage: "assets/cutouts/paloma-wool/Lonati, Denim.png",
    status: "ready"
  },
  {
    name: "Penelope Ii, Black",
    brandSlug: "paloma-wool",
    price: 249000,
    audience: "women",
    productType: "accessory",
    categories: NEW_IN_WOMEN,
    sizes: ["XS/S", "M/L"],
    description: "Smooth leather hip belt with a double-buckle system oriented in opposite directions.",
    sourceImage: "assets/cutouts/paloma-wool/Penelope Ii, Black.png",
    status: "ready"
  },
  {
    name: "Thong Sandal Mens",
    brandSlug: "edward-cuming",
    price: 791000,
    audience: "men",
    productType: "shoes",
    categories: NEW_IN_MEN,
    sizes: ["40", "41", "42", "43", "44", "45"],
    description:
      "Handmade leather thong sandal with a wide strap and sculpted construction on a low stacked-leather sole; finished by hand with subtle unique idiosyncrasies.",
    sourceImage: "assets/cutouts/edward-cuming/Thong Sandal Mens .jpg.png",
    status: "ready"
  },
  {
    name: "Bottom Heavy Top Heavy Bomber",
    brandSlug: "edward-cuming",
    price: 1115000,
    audience: "men",
    productType: "jacket",
    categories: NEW_IN_MEN,
    sizes: ["46", "48", "50"],
    description:
      "Padded technical cotton-blend bomber with a bottom-heavy curved hem, oversized utility flap pockets, a double-ended exposed zip and ribbed cuffs and hem.",
    sourceImage: "assets/cutouts/edward-cuming/Bottom Heavy Top Heavy Bomber .png",
    status: "ready"
  },
  {
    name: "Drop Dart Volume Jean",
    brandSlug: "edward-cuming",
    price: 776000,
    audience: "unisex",
    productType: "pants",
    categories: NEW_IN,
    sizes: ["0", "1", "2", "3", "4"],
    description:
      "Washed-blue denim jeans with a dropped crotch and darted, panelled construction that drapes volume through the leg and kicks out at the back hem; five-pocket with exposed button fly.",
    sourceImage: "assets/cutouts/edward-cuming/Drop Dart Volume Jean .png",
    status: "ready"
  },
  {
    name: "Encompassing Vortex Skirt",
    brandSlug: "edward-cuming",
    price: 880000,
    audience: "women",
    productType: "skirt",
    categories: NEW_IN_WOMEN,
    sizes: ["0", "1", "2", "3"],
    description:
      "Mid-length seamless skirt using Edward Cuming's signature 'scratch the itch' technique in circular movements; slashed and washed embroidery reveals a contrasting underlayer for a radial vortex effect.",
    sourceImage: "assets/cutouts/edward-cuming/Encompassing Vortex Skirt.png",
    status: "ready"
  },
  {
    name: "FUNNEL NECK PULLOVER",
    brandSlug: "helmut-lang",
    price: 229000,
    audience: "men",
    productType: "top",
    categories: NEW_IN_MEN,
    sizes: ["OS"],
    description: "Oversized cotton-terry sweatshirt with a funnel neck, utility-parka details and a metal logo zip.",
    sourceImage: "assets/cutouts/helmut-lang/FUNNEL NECK PULLOVER.png",
    status: "ready"
  },
  {
    name: "CHINO PANT",
    brandSlug: "helmut-lang",
    price: 450000,
    audience: "men",
    productType: "pants",
    categories: NEW_IN_MEN,
    sizes: ["28", "29", "30", "31", "32", "33", "34", "36", "38"],
    description: "Mid-rise straight-leg pants in cotton chino twill with utility-inspired details and classic trouser construction.",
    sourceImage: "assets/cutouts/helmut-lang/CHINO PANT.png",
    status: "ready"
  },
  {
    name: "KNOT SHIRT DRESS",
    brandSlug: "helmut-lang",
    price: 870000,
    audience: "women",
    productType: "dress",
    categories: NEW_IN_WOMEN,
    sizes: ["2XS", "XS", "S", "M", "L", "XL"],
    description:
      "Mini shirt dress in Japanese cotton poplin with side knot detailing at the hip and asymmetric drape, a structured collar and tuxedo cuffs.",
    sourceImage: "assets/cutouts/helmut-lang/KNOT SHIRT DRESS.png",
    status: "ready"
  },
  {
    name: "TWISTED SHIRT DRESS",
    brandSlug: "helmut-lang",
    price: 850000,
    audience: "women",
    productType: "dress",
    categories: NEW_IN_WOMEN,
    sizes: ["2XS", "XS", "S", "M", "L"],
    description:
      "Viscose-jersey shirt dress with an elongated button placket that twists around the body for a close fit, a pointed collar, button cuffs, a high slit and metal-wrapped logo buttons.",
    sourceImage: "assets/cutouts/helmut-lang/TWISTED SHIRT DRESS.png",
    status: "ready"
  },
  {
    name: "SARGO SHOES UMBER",
    brandSlug: "kiko-kostadinov",
    price: 1140000,
    audience: "men",
    productType: "shoes",
    categories: NEW_IN_MEN,
    sizes: ["39", "40", "41", "42", "43", "44", "45"],
    description:
      "Metropolitan casual shoe with a refined everyday profile, braided whipstitch trim outlining the silhouette and a tonal rubber sole engraved with traditional Bulgarian designs.",
    sourceImage: "assets/cutouts/kiko-kostadinov/SARGO SHOES UMBER.png",
    status: "ready"
  },
  {
    name: "OSTRO CANVAS SHOES BEECH ORANGE",
    brandSlug: "kiko-kostadinov",
    price: 1150000,
    audience: "men",
    productType: "shoes",
    categories: NEW_IN_MEN,
    sizes: ["40"],
    description:
      "Hybrid-sole shoe with a raw-cut canvas-panelled upper, lace-up closure and branded tongue webbing; 100% bovine leather and cotton.",
    sourceImage: "assets/cutouts/kiko-kostadinov/OSTRO CANVAS SHOES BEECH ORANGE.png",
    status: "ready"
  },
  {
    name: "KIKO KOSTADINOV X DR. MARTENS THE TOE BOX SHOE MOSS GREEN",
    brandSlug: "kiko-kostadinov",
    price: 479000,
    audience: "women",
    productType: "shoes",
    categories: NEW_IN_WOMEN,
    sizes: ["3", "4", "5", "6", "6.5", "7"],
    description:
      "Single-eyelet collaboration shoe in embossed chartreuse suede and two-tone green leather, applying a Mary Jane profile to a classic Oxford with cut-out construction, triple contrast-stitching and a Goodyear-welted air-cushioned sole.",
    sourceImage: "assets/cutouts/kiko-kostadinov/KIKO KOSTADINOV X DR. MARTENS THE TOE BOX SHOE MOSS GREEN.png",
    status: "ready"
  },
  {
    name: "RETICELLA BALLERINA SAPPHIRE",
    brandSlug: "kiko-kostadinov",
    price: 980000,
    audience: "women",
    productType: "shoes",
    categories: NEW_IN_WOMEN,
    sizes: ["35", "36", "37", "38", "39", "40", "41", "42", "43"],
    description:
      "Sapphire Reticella shoe in soft viscose point coupé with brushed-suede contrast, custom laces, brushed-silver eyelets and logo-engraved discs; Italian materials, made in Spain, with leather soles and a rubber injection insert.",
    sourceImage: "assets/cutouts/kiko-kostadinov/RETICELLA BALLERINA SAPPHIRE.png",
    status: "ready"
  },
  {
    name: "Lilo Unlined Trucker Denim Jacket",
    brandSlug: "meta-campania-collective",
    price: 1200000,
    audience: "unisex",
    productType: "jacket",
    categories: NEW_IN,
    sizes: ["M", "L", "XL"],
    description: "Unlined denim trucker jacket made in Italy from 100% cotton, cut in the brand's relaxed trucker silhouette.",
    sourceImage:
      "assets/cutouts/meta-campania-collective/Lilo Unlined Trucker Denim Jacket_Unisex_Outer/Lilo Unlined Trucker Denim Jacket_Unisex_Outer_Front.png",
    imageProductSlug: "lilo-unlined-trucker-denim-jacket",
    status: "ready"
  },
  {
    name: "Ilya",
    brandSlug: "mainline",
    price: 460000,
    audience: "men",
    productType: "pants",
    categories: NEW_IN_MEN,
    sizes: ["OS"],
    description: "Wool melton trousers with two-pocket styling, a zip-fly, ruching at the front and back and twisted side seams.",
    sourceImage: "assets/cutouts/mainline/ilya.png",
    status: "ready"
  },
  {
    name: "Dress",
    brandSlug: "commission",
    price: 1250000,
    audience: "women",
    productType: "dress",
    categories: NEW_IN_WOMEN,
    sizes: ["2", "4", "6", "8"],
    description:
      "Technical wool shift dress with an upside-down trouser construction at the hem, a boat neckline, scooped back and concealed side zip; fully satin-lined, relaxed fit.",
    sourceImage: "assets/cutouts/commission/dress.png",
    status: "ready"
  },
  {
    name: "Curve Flap Jacket, Heather Grey",
    brandSlug: "commission",
    price: 1000000,
    audience: "unisex",
    productType: "jacket",
    categories: NEW_IN,
    sizes: ["S", "M", "L"],
    description:
      "Coated Italian cow-leather jacket with a spread collar and signature curve-flap closure, side-seam pockets, an inside chest pocket and satin lining.",
    sourceImage: "assets/cutouts/commission/Curve Flap Jacket, Heather Grey.png",
    status: "ready"
  },
  {
    name: "Skirt Capris, Black",
    brandSlug: "johanna-parv",
    price: 544800,
    audience: "women",
    productType: "skirt",
    categories: NEW_IN_WOMEN,
    sizes: ["S", "M", "L"],
    description:
      "One-piece skirt-capris in lightweight recycled nylon-lycra with laser-cut raw edges, a concealed left-side zip, a right-thigh phone/key pocket and internal silicone grips.",
    sourceImage: "assets/cutouts/johanna-parv/Skirt Capris, Black.png",
    status: "ready"
  },
  {
    name: "Cover Skirt, Khaki",
    brandSlug: "johanna-parv",
    price: 748000,
    audience: "women",
    productType: "skirt",
    categories: NEW_IN_WOMEN,
    sizes: ["S", "M"],
    description: "Waist-banded skirt in a lightweight, stretchy fabric; made in the U.K.",
    sourceImage: "assets/cutouts/johanna-parv/Cover Skirt, Khaki.png",
    status: "ready"
  },
  {
    name: "O'KEEFFE STUDDED T-SHIRT BLACK",
    brandSlug: "a-v-vattev",
    price: 202000,
    audience: "men",
    productType: "top",
    categories: NEW_IN_MEN,
    sizes: ["S", "M", "L", "XL"],
    description:
      "Semi-fitted organic cotton-jersey T-shirt with a rib-knit crewneck and a signature O'Keeffe-inspired silver studded ornament on the front.",
    sourceImage: "assets/cutouts/a-v-vattev/O'KEEFFE STUDDED T-SHIRT BLACK.png.png",
    status: "ready"
  },
  {
    name: "SCARF SHIRT PATCHWORK BLACK",
    brandSlug: "a-v-vattev",
    price: 620000,
    audience: "men",
    productType: "shirt",
    categories: NEW_IN_MEN,
    sizes: ["S", "M", "L", "XL"],
    description:
      "Loose-fit classic button-up shirt with a unique half-mandarin, half-scarf collar, signature chest belt loops, contrast fabric patchwork on the front and sleeves and classic cuffs; 80% cotton, 20% polyester.",
    sourceImage: "assets/cutouts/a-v-vattev/SCARF SHIRT PATCHWORK BLACK.png",
    status: "ready"
  },
  {
    name: "SYY X PUMA SPEEDCAT II - BLACK",
    brandSlug: "super-yaya",
    price: 155000,
    audience: "unisex",
    productType: "shoes",
    categories: NEW_IN,
    sizes: ["OS"],
    description:
      "Super Yaya x Puma Speedcat II in patent leather with an embossed polka-dot print; unisex sizing, includes alternate white laces.",
    sourceImage: "assets/cutouts/super-yaya/SYY X PUMA SPEEDCAT II - BLACK.png",
    status: "ready"
  },
  {
    name: "Winona Knit Polo Tee, Brown Purple",
    brandSlug: "super-yaya",
    price: 1100000,
    audience: "women",
    productType: "top",
    categories: NEW_IN_WOMEN,
    sizes: ["XS", "S", "M", "L"],
    description: "Short-sleeve knit polo with a contrast V-neck, lace-up detail and two-button closure.",
    sourceImage: "assets/cutouts/super-yaya/Winona Knit Polo Tee, Brown Purple.png",
    status: "ready"
  },
  {
    name: "SC Shirt",
    brandSlug: "lea-boberg",
    price: 879000,
    audience: "women",
    productType: "shirt",
    categories: NEW_IN_WOMEN,
    sizes: ["2", "3", "4"],
    description:
      "Sandwich Collar shirt with deep armholes and generous volume for an elegant drape, cuffless convertible-button sleeves, a 4cm high-stand collar and a flat-yoke back with two reverse side pleats.",
    sourceImage: "assets/cutouts/lea-boberg/sc shirt.jpg.png",
    status: "ready"
  }
] satisfies readonly CatalogProductInput[];

const newCatalogProducts = (newCatalogProductsData as NewCatalogProductInput[]).map(
  (entry): CatalogProductInput => ({
    ...entry,
    categories: getDefaultCategories(entry.audience)
  })
);

const catalogProducts: readonly CatalogProductInput[] = [...baseCatalogProducts, ...newCatalogProducts];

export const products: Product[] = catalogProducts.flatMap((entry, index) => {
  if (entry.brandSlug === "natasha-zinko") {
    return [];
  }

  const brand = getBrandBySlug(entry.brandSlug);
  const image = getProductImage(entry);
  const images = getProductImagePaths(image);

  if (!brand) {
    throw new Error(`Unknown brand slug in product catalog: ${entry.brandSlug}`);
  }

  return [{
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
    ...(image ? { image: image.imagePath } : {}),
    ...(image?.hoverImagePath ? { hoverImage: image.hoverImagePath } : {}),
    ...(images.length > 0 ? { images } : {})
  }];
});

const visibleCatalogProducts = catalogProducts.filter((entry) => entry.brandSlug !== "natasha-zinko");
const usedImageKeys = new Set(visibleCatalogProducts.map((entry) => imageKey(entry.brandSlug, getImageLookupSlug(entry))));

export const missingProductImages = visibleCatalogProducts
  .filter((entry) => !getProductImage(entry))
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

export function getProductsByBrandId(brandId: string) {
  return products.filter((product) => product.brandId === brandId);
}
