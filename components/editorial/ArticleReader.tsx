import Link from "next/link";
import ZoomableHero from "@/components/ui/ZoomableHero";
import { formatDate } from "@/lib/format";
import type { Article } from "@/types/domain";
import styles from "@/components/editorial/ArticleReader.module.css";

type ArticleReaderProps = {
  article: Article;
};

/**
 * Splits the paragraphs into `parts` near-equal, order-preserving chunks so each
 * portrait image can anchor one chunk and the remainder flows as a closing column.
 */
function chunkParagraphs(paragraphs: string[], parts: number): string[][] {
  if (parts <= 1) {
    return [paragraphs];
  }
  const chunks: string[][] = [];
  const base = Math.floor(paragraphs.length / parts);
  const remainder = paragraphs.length % parts;
  let cursor = 0;
  for (let i = 0; i < parts; i += 1) {
    const size = base + (i < remainder ? 1 : 0);
    chunks.push(paragraphs.slice(cursor, cursor + size));
    cursor += size;
  }
  return chunks;
}

export default function ArticleReader({ article }: ArticleReaderProps) {
  const portraits = article.images ?? [];
  // One chunk per portrait + a final closing chunk of flowing text.
  const chunks = chunkParagraphs(article.body, portraits.length + 1);
  const closing = chunks[chunks.length - 1] ?? [];

  return (
    <article className={styles.article}>
      <ZoomableHero
        src={article.hero}
        tone="light"
        alt={article.title}
        className={styles.hero}
      />

      <header className={styles.header}>
        <p className={styles.meta}>
          {article.category} / {formatDate(article.date)}
        </p>
        <h1 className={styles.title}>{article.brand}</h1>
        <p className={styles.lead}>{article.excerpt}</p>
      </header>

      <div className={styles.body}>
        {portraits.map((src, index) => {
          const paragraphs = chunks[index] ?? [];
          const imageRight = index % 2 === 1;
          return (
            <section
              key={src}
              className={`${styles.feature} ${imageRight ? styles.featureReverse : ""}`}
            >
              <ZoomableHero
                src={src}
                tone="light"
                alt={`${article.title} — ${index + 1}`}
                className={styles.portrait}
              />
              <div className={styles.featureText}>
                {paragraphs.map((paragraph, paragraphIndex) => (
                  <p key={`${article.slug}-feature-${index}-${paragraphIndex}`} className={styles.copy}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          );
        })}

        {closing.length > 0 ? (
          <div className={styles.closing}>
            {closing.map((paragraph, paragraphIndex) => (
              <p key={`${article.slug}-closing-${paragraphIndex}`} className={styles.copy}>
                {paragraph}
              </p>
            ))}
          </div>
        ) : null}
      </div>

      <Link href="/magazine" className={styles.back}>
        Back to magazine
      </Link>
    </article>
  );
}
