import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleReader from "@/components/editorial/ArticleReader";
import ZoomableHero from "@/components/ui/ZoomableHero";
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

  // Articles with a hero asset render the rich editorial layout; the rest keep
  // the placeholder fallback until their imagery is produced.
  if (article.hero) {
    return <ArticleReader article={article} />;
  }

  return (
    <article className="utility-page">
      <ZoomableHero tone="light" alt={article.title} className="article-hero" />
      <p className="utility-copy">{article.category} / {formatDate(article.date)}</p>
      <h1 className="utility-title">{article.brand}</h1>
      <p className="utility-copy">{article.excerpt}</p>
      {article.body.map((paragraph, index) => (
        <p key={`${article.slug}-${index}`} className="utility-copy">
          {paragraph}
        </p>
      ))}
      <Link href="/magazine">Back to magazine</Link>
    </article>
  );
}
