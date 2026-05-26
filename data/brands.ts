import type { Brand } from "@/types/domain";

export const brands: Brand[] = [
  {
    id: "abelia-edoward-goucha",
    slug: "abelia-edoward-goucha",
    name: "Abelia Edoward Goucha",
    website: "https://abeliaedowardgoucha.com/"
  },
  {
    id: "natasha-zinko",
    slug: "natasha-zinko",
    name: "Natasha Zinko",
    website: "https://natashazinko.com"
  },
  { id: "gimaguas", slug: "gimaguas", name: "Gimaguas", website: "https://gimaguas.com" },
  {
    id: "gabriela-coll-garments",
    slug: "gabriela-coll-garments",
    name: "Gabriela Coll Garments",
    website: "https://www.gabrielacoll.com"
  },
  {
    id: "umber-postpast",
    slug: "umber-postpast",
    name: "Umber Postpast",
    website: "https://umber-postpast.com/"
  },
  { id: "ponder-er", slug: "ponder-er", name: "ponder.er", website: "https://www.ponder-er.com" },
  { id: "paloma-wool", slug: "paloma-wool", name: "Paloma Wool", website: "https://palomawool.com" },
  { id: "edward-cuming", slug: "edward-cuming", name: "Edward Cuming", website: "https://edwardcuming.com" },
  { id: "helmut-lang", slug: "helmut-lang", name: "Helmut Lang", website: "https://www.helmutlang.com" },
  { id: "kiko-kostadinov", slug: "kiko-kostadinov", name: "Kiko Kostadinov", website: "https://kikokostadinov.com" },
  {
    id: "meta-campania-collective",
    slug: "meta-campania-collective",
    name: "Meta Campania Collective",
    website: "https://meta-campania-collective.com"
  },
  { id: "mainline", slug: "mainline", name: "Mainline:RUS/Fr.CA/DE", website: "https://rusfrcade.com" },
  { id: "commission", slug: "commission", name: "Commission", website: "https://www.commission.nyc" },
  { id: "johanna-parv", slug: "johanna-parv", name: "Johanna Parv", website: "https://www.johannaparv.com" },
  { id: "a-v-vattev", slug: "a-v-vattev", name: "A. V. Vattev", website: "https://www.avvattev.com" },
  { id: "super-yaya", slug: "super-yaya", name: "Super Yaya", website: "https://super-yaya.com" },
  { id: "lea-boberg", slug: "lea-boberg", name: "Lea Boberg", website: "https://leaboberg.com" }
];

export function getBrandById(id: string) {
  return brands.find((brand) => brand.id === id);
}

export function getBrandBySlug(slug: string) {
  return brands.find((brand) => brand.slug === slug);
}

export type BrandGroup = { initial: string; brandIds: readonly string[] };

export const brandMenuColumns: readonly (readonly BrandGroup[])[] = [
  [
    { initial: "A", brandIds: ["abelia-edoward-goucha", "a-v-vattev"] },
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

export const brandMenuOrder: readonly string[] = brandMenuColumns
  .flatMap((column) => column)
  .flatMap((group) => group.brandIds);
