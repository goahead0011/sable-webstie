import styles from "@/app/page.module.css";

export default function HomePage() {
  return (
    <section className={styles.home} aria-label="sable home">
      <div className={styles.videoPlaceholder} aria-label="Future video area" />
    </section>
  );
}
