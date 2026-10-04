import Link from 'next/link'
import Button from '../Button'
import { formatDate } from '../../lib/format'
import styles from './LatestWriting.module.scss'

export default function LatestWriting({ posts = [] }) {
  return (
    <section id="writing" className={styles.writing} aria-labelledby="writing-title">
      <header className={styles.header}>
        <span className="eyebrow">(03) Writing</span>
        <h2 id="writing-title" data-reveal>
          Notes on <em>craft,</em> code &amp; care.
        </h2>
      </header>

      {posts.length ? (
        <ul className={styles.list}>
          {posts.map((post) => (
            <li key={post.slug} data-reveal>
              <Link href={`/blog/${post.slug}`} className={styles.row}>
                <time dateTime={post.date} className={styles.date}>{formatDate(post.date)}</time>
                <span className={styles.title}>{post.title}</span>
                <span className={styles.read}>{post.readingTime} min read</span>
                <span className={styles.arrow} aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.empty}>First notes are brewing. Check back soon.</p>
      )}

      <div className={styles.more}>
        <Button href="/blog" variant="glass">All writing <span aria-hidden="true">→</span></Button>
      </div>
    </section>
  )
}
