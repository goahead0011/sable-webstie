import Link from "next/link";
import { notFound } from "next/navigation";
import ZoomableHero from "@/components/ui/ZoomableHero";
import ProductGrid from "@/components/product/ProductGrid";
import { products } from "@/data/products";
import { stylingStories, getStylingStoryBySlug } from "@/data/styling";
import styles from "@/app/styling/[slug]/styling-detail.module.css";

type StylingDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return stylingStories.map((story) => ({ slug: story.slug }));
}

export default async function StylingDetailPage({ params }: StylingDetailPageProps) {
  const { slug } = await params;
  const story = getStylingStoryBySlug(slug);

  if (!story) {
    notFound();
  }

  const relatedProducts = products.filter((product) => story.relatedProductIds.includes(product.id));

  return (
    <article className={styles.detail}>
      <ZoomableHero tone={story.placeholderTone} alt={story.title} className={styles.hero} />
      <div className={styles.copy}>
        <p>{story.season}</p>
        <h1>{story.title}</h1>
        <p>{story.excerpt}</p>
        <Link href="/styling">Back to styling</Link>
      </div>
      <section className={styles.related} aria-labelledby="related-title">
        <h2 id="related-title">Related products</h2>
        <ProductGrid products={relatedProducts} />
      </section>
    </article>
  );
}
