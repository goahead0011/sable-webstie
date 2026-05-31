import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DOC_FILE = path.join(ROOT, "docs", "product-catalog-source.md");
const BRANDS_FILE = path.join(ROOT, "data", "brands.ts");
const NEW_PRODUCTS_FILE = path.join(ROOT, "data", "new-products.json");

function parseTableRows(section) {
  return section
    .split("\n")
    .filter((line) => line.startsWith("| ") && !line.startsWith("| Brand Slug ") && !line.startsWith("|---"))
    .map((line) => line.split("|").slice(1, -1).map((cell) => cell.trim()))
    .filter((cells) => cells.length === 10);
}

function escapeCell(value) {
  return String(value).replace(/\|/g, "\\|").replace(/\s+/g, " ").trim();
}

function categoriesFor(audience) {
  if (audience === "women" || audience === "men") {
    return `new-in, ${audience}`;
  }
  return "new-in";
}

function renderProductRow(product) {
  return [
    product.brandSlug,
    product.name,
    product.price,
    product.audience,
    product.productType,
    product.categories ?? categoriesFor(product.audience),
    Array.isArray(product.sizes) ? product.sizes.join(", ") : product.sizes ?? "TBD",
    product.description ?? "TODO",
    product.sourceImage,
    product.status
  ]
    .map(escapeCell)
    .join(" | ");
}

const currentDoc = await readFile(DOC_FILE, "utf8");
const brandsSource = await readFile(BRANDS_FILE, "utf8");
const newProducts = JSON.parse(await readFile(NEW_PRODUCTS_FILE, "utf8"));
const currentProductSection = currentDoc.split("# Products\n\n")[1].split("\n\n---")[0];
const baseProducts = parseTableRows(currentProductSection)
  .filter(([brandSlug]) => brandSlug !== "natasha-zinko")
  .map(([brandSlug, name, price, audience, productType, categories, sizes, description, sourceImage, status]) => ({
    brandSlug,
    name,
    price: Number(price),
    audience,
    productType,
    categories,
    sizes,
    description,
    sourceImage,
    status
  }));

const brandObjects = [...brandsSource.matchAll(/\{[^{}]*id: "([^"]+)"[^{}]*slug: "([^"]+)"[^{}]*name: "([^"]+)"[^{}]*website: "([^"]+)"[^{}]*\}/g)]
  .map(([, , slug, name, website]) => ({ slug, name, website }))
  .filter((brand, index, brands) => brands.findIndex((candidate) => candidate.slug === brand.slug) === index);
const products = [...baseProducts, ...newProducts];
const needsDetails = products.filter((product) => product.status !== "ready");

const brandRows = brandObjects
  .map((brand, index) => `| ${index + 1} | ${escapeCell(brand.name)} | ${brand.slug} | ${brand.website} |`)
  .join("\n");
const productRows = products.map((product) => `| ${renderProductRow(product)} |`).join("\n");
const detailRows = needsDetails
  .map((product) => `| ${product.brandSlug} | ${escapeCell(product.name)} | ${product.status} |`)
  .join("\n");

const output = `# sable Product Catalog Source

## Purpose

This file is the source of truth for the MVP product catalog and future product detail entry.

Codex should use this file to update:
- data/brands.ts
- data/products.ts
- data/new-products.json
- product image matching
- product names, prices, audience, type, sizes, and descriptions

Do not modify Header, BrandMegaMenu, SearchOverlay, ProductGrid layout, Cart logic, or route structure unless required by catalog behavior.

## Rules

- Prices are integer KRW values. Display formatting belongs to the UI.
- ponder.er must use the slug \`ponder-er\`.
- All products are included in \`new-in\` by default.
- Explicit \`Women\` and \`Men\` filename metadata adds the corresponding collection. \`Unisex\` stays in \`new-in\` only.
- Nested product folder suffixes such as \`_Women_Skirt\`, \`_Men_Outer\`, and \`_Unisex_Pants\` are metadata. Remove them from display names and store them as audience and product type.
- Source cutout filenames must not be renamed or deleted.
- Web storefront images are generated as WebP without resizing.
- For nested image folders, \`Front\` or \`Topview\` is the representative image. \`Back\` or \`Sideview\` is shown on product-card hover when present.

---

# Brands

| No. | Brand Name | Brand Slug | Website |
|---:|---|---|---|
${brandRows}

---

# Products

| Brand Slug | Product Name | Price KRW | Audience | Product Type | Categories | Sizes | Description | Image Source | Status |
|---|---|---:|---|---|---|---|---|---|---|
${productRows}

---

# Products Needing Details

These products still need at least one manually reviewed field.

| Brand Slug | Product Name | Status |
|---|---|---|
${detailRows}

---

# Figma Source Nodes

Product details for the 2026-05-31 integration were collected from:

\`206:2\`, \`206:8\`, \`206:11\`, \`206:15\`, \`206:19\`, \`206:23\`, \`206:27\`, \`206:31\`, \`206:35\`, \`206:39\`, \`206:43\`, \`206:47\`, \`206:51\`, \`206:55\`, \`206:59\`, \`206:63\`, \`229:2\`

---

# Validation Checklist

- ${products.length} visible products exist.
- ${brandObjects.length} visible brands exist.
- Natasha Zinko does not exist in website-visible data.
- Camiel Fortgens exists with slug \`camiel-fortgens\`.
- ponder.er exists with slug \`ponder-er\`.
- Product prices are numeric KRW values.
- Product names are based on cutout filenames or cutout product-folder names.
- Generated WebP files preserve source dimensions.
- Nested product cards use representative and hover images when both are available.
`;

await writeFile(DOC_FILE, output, "utf8");
console.log(`Updated ${path.relative(ROOT, DOC_FILE)} with ${products.length} products and ${brandObjects.length} brands.`);
