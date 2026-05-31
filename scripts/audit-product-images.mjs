import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifest = await readFile(path.join(ROOT, "data", "product-images.ts"), "utf8");
const newProducts = JSON.parse(await readFile(path.join(ROOT, "data", "new-products.json"), "utf8"));
const entries = [...manifest.matchAll(/\{ brandSlug: "([^"]+)", productName: "([^"]+)", productSlug: "([^"]+)", imagePath: "([^"]+)"(?:, hoverImagePath: "([^"]+)")? \}/g)].map(
  ([, brandSlug, productName, productSlug, imagePath, hoverImagePath]) => ({
    brandSlug,
    productName,
    productSlug,
    imagePath,
    hoverImagePath
  })
);
const imageByKey = new Map(entries.map((entry) => [`${entry.brandSlug}/${entry.productSlug}`, entry]));

function slugify(value) {
  return value
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function inferProductSlug(product) {
  const fileName = product.sourceImage.split(/[\\/]/).at(-1) ?? product.sourceImage;
  return product.imageProductSlug ?? slugify(fileName.replace(/(\.png|\.jpg|\.jpeg|\.webp|\.avif)+$/gi, ""));
}

function publicPathExists(publicUrl) {
  return existsSync(path.join(ROOT, "public", ...decodeURIComponent(publicUrl).split("/").filter(Boolean)));
}

const missingMappings = newProducts.filter((product) => !imageByKey.has(`${product.brandSlug}/${inferProductSlug(product)}`));
const missingFiles = entries.flatMap((entry) =>
  [entry.imagePath, entry.hoverImagePath].filter((file) => file && !publicPathExists(file)).map((file) => `${entry.brandSlug}/${entry.productSlug}: ${file}`)
);

if (missingMappings.length > 0 || missingFiles.length > 0) {
  console.error("Product image audit failed.");
  for (const product of missingMappings) {
    console.error(`Missing mapping: ${product.brandSlug}/${product.name}`);
  }
  for (const file of missingFiles) {
    console.error(`Missing file: ${file}`);
  }
  process.exit(1);
}

console.log(`Image audit passed: ${newProducts.length} new products mapped.`);
console.log(`Generated sets: ${entries.length}; hover-enabled sets: ${entries.filter((entry) => entry.hoverImagePath).length}.`);
