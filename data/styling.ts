import type { StylingStory } from "@/types/domain";

export const stylingStories: StylingStory[] = [
  {
    id: "s-001",
    slug: "grey-morning-edit",
    title: "Grey morning edit",
    excerpt: "Soft outerwear, low contrast layers, and compact daily bags.",
    season: "Spring edit",
    relatedProductIds: ["p-001", "p-002", "p-005"],
    placeholderTone: "light"
  },
  {
    id: "s-002",
    slug: "room-and-street",
    title: "Room and street",
    excerpt: "Home textures moved into the city with easy linen and quiet technical layers.",
    season: "Life edit",
    relatedProductIds: ["p-006", "p-008", "p-012"],
    placeholderTone: "medium"
  },
  {
    id: "s-003",
    slug: "black-line-study",
    title: "Black line study",
    excerpt: "A restrained study in flat shoes, narrow accessories, and clean tailoring.",
    season: "Evening edit",
    relatedProductIds: ["p-007", "p-010", "p-011"],
    placeholderTone: "light"
  },
  {
    id: "s-004",
    slug: "washed-weekend",
    title: "Washed weekend",
    excerpt: "Faded cotton, relaxed trousers, and softened proportion.",
    season: "Weekend edit",
    relatedProductIds: ["p-002", "p-003", "p-009"],
    placeholderTone: "medium"
  }
];

export function getStylingStoryBySlug(slug: string) {
  return stylingStories.find((story) => story.slug === slug);
}
