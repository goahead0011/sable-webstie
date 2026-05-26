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
  { id: "hodakova", slug: "hodakova", name: "Hodakova" },
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
