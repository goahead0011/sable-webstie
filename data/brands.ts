import type { Brand } from "@/types/domain";

export const brands: Brand[] = [
  { id: "abelia-edoward-goucha", slug: "abelia-edoward-goucha", name: "Abelia Edoward Goucha" },
  {
    id: "av-vattev",
    slug: "a-v-vattev",
    name: "A. V. Vattev",
    country: "United Kingdom",
    featured: true
  },
  { id: "aloha-polydor", slug: "aloha-polydor", name: "Aloha Polydor" },
  {
    id: "automatic-for-the-people",
    slug: "automatic-for-the-people",
    name: "Automatic for the People"
  },
  { id: "camiel-fortgens", slug: "camiel-fortgens", name: "Camiel Fortgens", featured: true },
  { id: "commission", slug: "commission", name: "Commission" },
  { id: "dries-van-noten", slug: "dries-van-noten", name: "Dries Van Noten", featured: true },
  { id: "edward-cuming", slug: "edward-cuming", name: "Edward Cuming" },
  { id: "extreme-cashmere", slug: "extreme-cashmere", name: "Extreme Cashmere" },
  {
    id: "gabriela-coll-garments",
    slug: "gabriela-coll-garments",
    name: "Gabriela Coll Garments",
    featured: true
  },
  { id: "gimaguas", slug: "gimaguas", name: "Gimaguas" },
  { id: "helmut-lang", slug: "helmut-lang", name: "Helmut Lang" },
  { id: "issuethings", slug: "issuethings", name: "Issuethings" },
  { id: "jan-jan-van-essche", slug: "jan-jan-van-essche", name: "Jan Jan Van Essche" },
  { id: "jil-sander", slug: "jil-sander", name: "Jil Sander", featured: true },
  { id: "johanna-parv", slug: "johanna-parv", name: "Johanna Parv" },
  { id: "kiko-kostadinov", slug: "kiko-kostadinov", name: "Kiko Kostadinov", featured: true },
  { id: "lcbx", slug: "lcbx", name: "LCBX" },
  { id: "lea-boberg", slug: "lea-boberg", name: "Lea Boberg" },
  { id: "mainline", slug: "mainline", name: "Mainline:RUS/Fr.CA/DE" },
  { id: "maryam-nassir-zadeh", slug: "maryam-nassir-zadeh", name: "Maryam Nassir Zadeh" },
  {
    id: "meta-campania-collective",
    slug: "meta-campania-collective",
    name: "Meta Campania Collective"
  },
  { id: "natasha-zinko", slug: "natasha-zinko", name: "Natasha Zinko" },
  { id: "paloma-wool", slug: "paloma-wool", name: "Paloma Wool", featured: true },
  { id: "ponder-er", slug: "ponder-er", name: "ponder.er" },
  {
    id: "renaissance-renaissance",
    slug: "renaissance-renaissance",
    name: "Renaissance Renaissance"
  },
  { id: "rier", slug: "rier", name: "Rier" },
  { id: "sunflower", slug: "sunflower", name: "Sunflower" },
  { id: "super-yaya", slug: "super-yaya", name: "Super Yaya" },
  { id: "toogood", slug: "toogood", name: "Toogood" },
  { id: "umber-postpast", slug: "umber-postpast", name: "Umber Postpast" },
  { id: "vein", slug: "vein", name: "Vein" }
];

export function getBrandById(id: string) {
  return brands.find((brand) => brand.id === id);
}

export function getBrandBySlug(slug: string) {
  return brands.find((brand) => brand.slug === slug);
}

// --- Curated Brands menu (single source of truth) ---------------------------
// One alphabet bucket of brand ids. `brands` above is the full /brands
// directory; the menu below is the curated subset shown in navigation.
export type BrandGroup = { initial: string; brandIds: readonly string[] };

// Mirrors the Figma desktop Brands modal (node 22:20): 4 columns, grouped by
// leading initial. The desktop BrandMegaMenu renders these as columns; the
// mobile drawer flattens them (brandMenuOrder). Edit brands here once and both
// surfaces stay in sync — no per-surface hardcoded arrays.
export const brandMenuColumns: readonly (readonly BrandGroup[])[] = [
  [
    { initial: "A", brandIds: ["abelia-edoward-goucha", "av-vattev"] },
    { initial: "C", brandIds: ["commission"] },
    { initial: "E", brandIds: ["edward-cuming"] },
    { initial: "G", brandIds: ["gabriela-coll-garments", "gimaguas"] }
  ],
  [
    { initial: "H", brandIds: ["helmut-lang"] },
    { initial: "J", brandIds: ["johanna-parv"] },
    { initial: "K", brandIds: ["kiko-kostadinov"] },
    { initial: "L", brandIds: ["lea-boberg"] }
  ],
  [
    { initial: "M", brandIds: ["mainline", "meta-campania-collective"] },
    { initial: "N", brandIds: ["natasha-zinko"] },
    { initial: "P", brandIds: ["paloma-wool", "ponder-er"] }
  ],
  [
    { initial: "S", brandIds: ["super-yaya"] },
    { initial: "U", brandIds: ["umber-postpast"] }
  ]
];

// Flat, Figma reading-order list (column 1 → 4, group order preserved) for the
// mobile drawer, which renders a list rather than columns.
export const brandMenuOrder: readonly string[] = brandMenuColumns
  .flatMap((column) => column)
  .flatMap((group) => group.brandIds);
