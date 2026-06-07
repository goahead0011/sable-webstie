import Link from "next/link";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import type { StylingStory } from "@/types/domain";
import styles from "@/components/editorial/LookbookGrid.module.css";

type LookbookGridProps = {
  stories: StylingStory[];
};

export default function LookbookGrid({ stories }: LookbookGridProps) {
  return (
    <section className="page-content" aria-labelledby="styling-title">
      <h1 id="styling-title" className="sr-only">
        Styling
      </h1>
      <div className={styles.grid}>
        {stories.map((story) => (
          <Link key={story.id} href={`/styling/${story.slug}`} className={styles.card}>
            {story.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img className={styles.image} src={story.image} alt={story.title} loading="lazy" />
            ) : (
              <PlaceholderImage tone={story.placeholderTone} label={story.title} className={styles.image} />
            )}
            <span className={styles.meta}>
              <strong>{story.title}</strong>
              <span>{story.season}</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
