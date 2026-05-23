import Link from "next/link";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import { formatDate } from "@/lib/format";
import type { Article } from "@/types/domain";
import styles from "@/components/editorial/ArticleGrid.module.css";

type ArticleGridProps = {
  articles: Article[];
};

export default function ArticleGrid({ articles }: ArticleGridProps) {
  return (
    <section className="page-content" aria-labelledby="magazine-title">
      <h1 id="magazine-title" className="sr-only">
        Magazine
      </h1>
      <div className={styles.grid}>
        {articles.map((article) => (
          <Link key={article.id} href={`/magazine/${article.slug}`} className={styles.card}>
            <PlaceholderImage tone="light" label={article.title} className={styles.image} />
            <span className={styles.meta}>
              <strong>{article.title}</strong>
              <span>{article.category} / {formatDate(article.date)}</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
