import type { StylingStory } from "@/types/domain";

export const stylingStories: StylingStory[] = [
  {
    id: "s-001",
    slug: "styling-01",
    title: "Styling 01",
    season: "Styling edit",
    image: "/styling/1.png",
    relatedProductIds: ["p-083", "p-040", "p-085"],
    placeholderTone: "light"
  },
  {
    id: "s-002",
    slug: "styling-02",
    title: "Styling 02",
    season: "Styling edit",
    image: "/styling/2.png",
    relatedProductIds: ["p-016", "p-017", "p-068"],
    placeholderTone: "medium"
  },
  {
    id: "s-003",
    slug: "styling-03",
    title: "Styling 03",
    season: "Styling edit",
    image: "/styling/3.png",
    relatedProductIds: ["p-119", "p-115", "p-006"],
    placeholderTone: "light"
  },
  {
    id: "s-004",
    slug: "styling-04",
    title: "Styling 04",
    season: "Styling edit",
    image: "/styling/4.png",
    relatedProductIds: ["p-057", "p-026", "p-024"],
    placeholderTone: "medium"
  },
  {
    id: "s-005",
    slug: "styling-05",
    title: "Styling 05",
    season: "Styling edit",
    image: "/styling/5.png",
    relatedProductIds: ["p-056", "p-032"],
    placeholderTone: "light"
  },
  {
    id: "s-006",
    slug: "styling-06",
    title: "Styling 06",
    season: "Styling edit",
    image: "/styling/6.png",
    relatedProductIds: ["p-012", "p-058"],
    placeholderTone: "medium"
  }
];

export function getStylingStoryBySlug(slug: string) {
  return stylingStories.find((story) => story.slug === slug);
}
