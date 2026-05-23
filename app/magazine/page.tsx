import ArticleGrid from "@/components/editorial/ArticleGrid";
import { articles } from "@/data/articles";

export default function MagazinePage() {
  return <ArticleGrid articles={articles} />;
}
