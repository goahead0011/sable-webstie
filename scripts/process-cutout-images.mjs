// Cutout product image pipeline.
//
// Source images live in assets/cutouts/<brand>/<product?>/<image>.
// Files directly inside a brand folder are single-image products. Nested
// folders are multi-image products: Front/Topview becomes the storefront
// image and Back/Sideview becomes the hover image when available. If no
// Back/Sideview file exists but the folder still has 2+ images, the next
// non-primary image is used as the hover so every multi-image product hovers.
//
// Output: public/products/<brand-slug>/<source-relative-path>.webp
// Manifest: data/product-images.ts
//
// Source files are only ever read. Dimensions are preserved exactly.

import { mkdir, readdir, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SCRIPT_DIR, "..");
const INPUT_DIR = path.join(ROOT, "assets", "cutouts");
const OUTPUT_DIR = path.join(ROOT, "public", "products");
const MANIFEST_FILE = path.join(ROOT, "data", "product-images.ts");
const SUPPORTED_EXT = new Set([".png", ".jpg", ".jpeg", ".webp", ".avif"]);

function stripExtensions(fileName) {
  let name = fileName;
  let ext = path.extname(name).toLowerCase();
  while (SUPPORTED_EXT.has(ext)) {
    name = name.slice(0, -ext.length);
    ext = path.extname(name).toLowerCase();
  }
  return name;
}

function slugify(value) {
  return value
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function stripCatalogMetadata(value) {
  return value
    .replace(/_(?:women|men|man|unisex)_(?:upper|outer|pants|skirt|skirts|skrts|dress|shoes|bag|belts)$/i, "")
    .replace(/_(?:women|men|man|unisex)$/i, "")
    .replace(/_(?:upper|outer|pants|skirt|skirts|skrts|dress|shoes|bag|belts)$/i, "")
    .replace(/_바지$/u, "")
    .trim();
}

function toProductName(value) {
  return stripCatalogMetadata(value)
    .replace(/^_+|_+$/g, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\S+/g, (word) => word.toLowerCase().replace(/[a-z]/, (letter) => letter.toUpperCase()));
}

function toBrandSlug(folderName) {
  return slugify(folderName);
}

function isImageFile(name) {
  return SUPPORTED_EXT.has(path.extname(name).toLowerCase());
}

function isPreferredPrimary(fileName) {
  return /(?:^|[_ -])(front|topview)$/i.test(stripExtensions(fileName));
}

function isPreferredHover(fileName) {
  return /(?:^|[_ -])(back|sideview)$/i.test(stripExtensions(fileName));
}

function imagePreference(fileName, matcher) {
  const base = stripExtensions(fileName);
  if (matcher(fileName)) {
    return /(?:^|[_ -])front$/i.test(base) || /(?:^|[_ -])back$/i.test(base) ? 0 : 1;
  }
  return 2;
}

function publicUrl(brandSlug, relativePath) {
  return `/products/${brandSlug}/${relativePath.split(path.sep).map(encodeURIComponent).join("/")}`;
}

async function listEntries(dir) {
  return (await readdir(dir, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name, "en"));
}

async function convertImage(sourceFile, outputFile) {
  await mkdir(path.dirname(outputFile), { recursive: true });
  await sharp(sourceFile).webp({ quality: 85 }).toFile(outputFile);
}

async function processProductFiles({ brandSlug, sourceDir, relativeDir = "", productBase, files }) {
  const imageFiles = files.filter((file) => isImageFile(file.name));
  if (imageFiles.length === 0) {
    return null;
  }

  const converted = [];
  for (const file of imageFiles) {
    const outputName = `${stripExtensions(file.name).trim()}.webp`;
    const relativeOutput = path.join(relativeDir, outputName);
    await convertImage(path.join(sourceDir, file.name), path.join(OUTPUT_DIR, brandSlug, relativeOutput));
    converted.push({ sourceName: file.name, relativeOutput });
  }

  const primary =
    converted
      .filter((image) => isPreferredPrimary(image.sourceName))
      .sort((a, b) => imagePreference(a.sourceName, isPreferredPrimary) - imagePreference(b.sourceName, isPreferredPrimary))[0] ??
    converted.find((image) => !isPreferredHover(image.sourceName)) ??
    converted[0];
  const hover =
    converted
      .filter((image) => isPreferredHover(image.sourceName))
      .sort((a, b) => imagePreference(a.sourceName, isPreferredHover) - imagePreference(b.sourceName, isPreferredHover))[0] ??
    converted.find((image) => image !== primary);
  const cleanBase = stripCatalogMetadata(productBase);

  return {
    brandSlug,
    productName: toProductName(cleanBase),
    productSlug: slugify(cleanBase) || "item",
    imagePath: publicUrl(brandSlug, primary.relativeOutput),
    ...(hover ? { hoverImagePath: publicUrl(brandSlug, hover.relativeOutput) } : {})
  };
}

async function processBrand(folderName) {
  const brandSlug = toBrandSlug(folderName);
  const brandDir = path.join(INPUT_DIR, folderName);
  const entries = await listEntries(brandDir);
  const products = [];

  for (const entry of entries) {
    if (entry.isFile() && isImageFile(entry.name)) {
      const product = await processProductFiles({
        brandSlug,
        sourceDir: brandDir,
        productBase: stripExtensions(entry.name),
        files: [entry]
      });
      if (product) {
        products.push(product);
      }
    }

    if (entry.isDirectory()) {
      const productDir = path.join(brandDir, entry.name);
      const product = await processProductFiles({
        brandSlug,
        sourceDir: productDir,
        relativeDir: entry.name,
        productBase: entry.name,
        files: await listEntries(productDir)
      });
      if (product) {
        products.push(product);
      }
    }
  }

  return products;
}

function renderManifest(entries) {
  const rows = entries
    .map((entry) => {
      const hover = entry.hoverImagePath ? `, hoverImagePath: ${JSON.stringify(entry.hoverImagePath)}` : "";
      return (
        `  { brandSlug: ${JSON.stringify(entry.brandSlug)}, productName: ${JSON.stringify(entry.productName)}, ` +
        `productSlug: ${JSON.stringify(entry.productSlug)}, imagePath: ${JSON.stringify(entry.imagePath)}${hover} }`
      );
    })
    .join(",\n");

  return (
    "// AUTO-GENERATED by scripts/process-cutout-images.mjs - do not edit by hand.\n" +
    "// Transparent WebP storefront images. Source dimensions are preserved.\n\n" +
    "export type ProductImage = {\n" +
    "  brandSlug: string;\n" +
    "  productName: string;\n" +
    "  productSlug: string;\n" +
    "  imagePath: string;\n" +
    "  hoverImagePath?: string;\n" +
    "};\n\n" +
    "export const productImages: ProductImage[] = [\n" +
    `${rows}\n` +
    "];\n"
  );
}

async function main() {
  if (!existsSync(INPUT_DIR)) {
    throw new Error(`assets/cutouts/ not found at ${INPUT_DIR}`);
  }

  if (path.dirname(OUTPUT_DIR) !== path.join(ROOT, "public")) {
    throw new Error(`Refusing to replace unexpected output directory: ${OUTPUT_DIR}`);
  }

  await rm(OUTPUT_DIR, { recursive: true, force: true });
  await mkdir(OUTPUT_DIR, { recursive: true });

  const brandFolders = (await listEntries(INPUT_DIR)).filter((entry) => entry.isDirectory()).map((entry) => entry.name);
  const products = [];
  for (const folderName of brandFolders) {
    const brandProducts = await processBrand(folderName);
    products.push(...brandProducts);
    console.log(`${toBrandSlug(folderName)}: ${brandProducts.length} product image set(s)`);
  }

  await writeFile(MANIFEST_FILE, renderManifest(products), "utf8");
  console.log(`Done. ${products.length} product image set(s), original dimensions preserved.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
