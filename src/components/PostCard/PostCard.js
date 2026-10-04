import Link from 'next/link'
import { formatDate } from '../../lib/format'
import styles from './PostCard.module.scss'

// Deterministic hue shift per post so every card gets its own liquid swatch
function swatch(slug) {
  let h = 0
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) % 360
  return { '--h1': `${318 + (h % 22)}deg`, '--rot': `${h}deg` }
}

export default function PostCard({ post, featured = false }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`${styles.card} ${featured ? styles.featured : ''}`}
      data-reveal
    >
      <div className={styles.art} style={swatch(post.slug)} aria-hidden="true">
        <span className={styles.drop} />
        <span className={`${styles.drop} ${styles.dropB}`} />
      </div>
      <div className={styles.body}>
        <div className={styles.meta}>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{post.readingTime} min read</span>
          {!post.published && <span className={styles.draft}>Draft</span>}
        </div>
        <h2 className={styles.title}>{post.title}</h2>
        {post.description && <p className={styles.description}>{post.description}</p>}
        <span className={styles.cta}>
          Read <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  )
}
