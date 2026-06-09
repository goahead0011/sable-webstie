import HomeBrandFilm from "@/app/HomeBrandFilm";
import styles from "@/app/page.module.css";

export default function HomePage() {
  return (
    <section className={styles.home} aria-label="sable home">
      <HomeBrandFilm />
    </section>
  );
}
