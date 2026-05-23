import type { Article } from "@/types/domain";

export const articles: Article[] = [
  {
    id: "a-001",
    slug: "quiet-fabric-first",
    title: "Quiet fabric first",
    excerpt: "Notes on texture, weight, and the small distance between clothing and mood.",
    date: "2026-05-01",
    category: "essay"
  },
  {
    id: "a-002",
    slug: "atelier-with-paloma-wool",
    title: "Atelier with Paloma Wool",
    excerpt: "A short studio conversation on color, instinct, and daily wear.",
    date: "2026-04-20",
    category: "interview"
  },
  {
    id: "a-003",
    slug: "grey-morning-edit",
    title: "Grey morning edit",
    excerpt: "An editorial selection for soft light, washed cotton, and longer silhouettes.",
    date: "2026-04-06",
    category: "editorial"
  }
];

export function getArticleBySlug(slug: string) {
  return articles.find((article) => article.slug === slug);
}
