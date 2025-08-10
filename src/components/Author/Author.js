import Image from "next/image";
import styles from "./Author.module.scss";

export default function Author({ showTitle = false }) {
  return (
    <div className={styles.author}>
      <Image
        alt="Author image"
        className={styles.author__image}
        src="/images/me.png"
        width={180}
        height={180}
        priority
      />

      {showTitle && (
        <h1 className={styles.author__siteTitle}>Phebian Chukwurah</h1>
      )}

      <p className={styles.author__intro}>
        Phebian is a frontend developer with expertise in building responsive,
        accessible, and performant web applications.
      </p>

      <p className={styles.author__links}>
        <a
          href="//github.com/ph3bian"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </p>
    </div>
  );
} 