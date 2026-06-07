import Link from "next/link";
import { notFound } from "next/navigation";
import ZoomableHero from "@/components/ui/ZoomableHero";
import ProductGrid from "@/components/product/ProductGrid";
import { getBrandById } from "@/data/brands";
import { products } from "@/data/products";
import { stylingStories, getStylingStoryBySlug } from "@/data/styling";
import { formatPrice } from "@/lib/format";
import styles from "@/app/styling/[slug]/styling-detail.module.css";
import type { Product } from "@/types/domain";

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

  const relatedProducts = story.relatedProductIds
    .map((productId) => products.find((product) => product.id === productId))
    .filter((product): product is Product => Boolean(product));

  return (
    <article className={styles.detail}>
      <div className={styles.storyLayout}>
        <ZoomableHero src={story.image} tone={story.placeholderTone} alt={story.title} className={styles.hero} />
        <div className={styles.copy}>
          <p>{story.season}</p>
          <h1>{story.title}</h1>

          <section className={styles.worn} aria-labelledby="worn-title">
            <h2 id="worn-title">Worn pieces</h2>
            <ul>
              {relatedProducts.map((product) => {
                const brand = getBrandById(product.brandId);

                return (
                  <li key={product.id}>
                    <Link href={`/products/${product.slug}`}>
                      <span>{brand?.name ?? product.brandSlug}</span>
                      <strong>{product.name}</strong>
                    </Link>
                    <p>{formatPrice(product.price)}</p>
                    <p>{product.description}</p>
                  </li>
                );
              })}
            </ul>
          </section>

          <Link href="/styling">Back to styling</Link>
        </div>
      </div>
      <section className={styles.related} aria-labelledby="related-title">
        <h2 id="related-title">Related products</h2>
        <ProductGrid products={relatedProducts} />
      </section>
    </article>
  );
}
