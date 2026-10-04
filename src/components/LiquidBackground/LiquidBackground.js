import styles from './LiquidBackground.module.scss'

// Fixed, decorative layer of slow-morphing colour blobs.
export default function LiquidBackground() {
  return (
    <div className={styles.liquid} aria-hidden="true">
      <span className={`${styles.blob} ${styles.blobA}`} />
      <span className={`${styles.blob} ${styles.blobB}`} />
      <span className={`${styles.blob} ${styles.blobC}`} />
    </div>
  )
}
