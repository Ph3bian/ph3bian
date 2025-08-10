import Link from "next/link";
import styles from "./NotFound.module.scss";

export default function NotFound() {
  return (
    <section className={styles.section} aria-labelledby="not-found-title">
      <div className={styles.card} role="group" aria-label="Page not found">
        <div className={styles.content}>
          <div className={styles.badge}>404</div>
          <h1 id="not-found-title" className={styles.title}>
            Page not found
          </h1>
          <p className={styles.subtitle}>
            Sorry, we couldn't find that page. It may have been moved or
            deleted.
          </p>

          <div className={styles.actions}>
            <Link
              className={styles.secondaryBtnBtn}
              href="/"
              aria-label="Go back home"
            >
              <span>Go home</span>
            </Link>
          </div>
        </div>
        <div className={styles.illustration} aria-hidden="true" />
      </div>
    </section>
  );
}
