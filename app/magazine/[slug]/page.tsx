import Link from "next/link";
import { notFound } from "next/navigation";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import { articles, getArticleBySlug } from "@/data/articles";
import { formatDate } from "@/lib/format";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="utility-page">
      <PlaceholderImage tone="light" label={article.title} className="article-hero" />
      <p className="utility-copy">{article.category} / {formatDate(article.date)}</p>
      <h1 className="utility-title">{article.title}</h1>
      <p className="utility-copy">{article.excerpt}</p>
      <p className="utility-copy">
        This magazine page is a mock editorial entry for the MVP content structure.
      </p>
      <Link href="/magazine">Back to magazine</Link>
    </article>
  );
}
