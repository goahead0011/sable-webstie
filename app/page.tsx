import Image from "next/image";
import styles from "@/app/page.module.css";

export default function HomePage() {
  return (
    <section className={styles.home} aria-label="sable home">
      <Image
        className={styles.heroImage}
        src="/home/hero-main.png"
        alt=""
        fill
        priority
        sizes="100vw"
        aria-hidden="true"
      />
    </section>
  );
}
