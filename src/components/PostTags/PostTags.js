import Link from 'next/link'
import styles from './PostTags.module.scss'

export default function PostTags({ post }) {
  const tags = Array.isArray(post.tags) ? post.tags : []
  if (!tags.length) return null
  return (
    <div className={styles.postTags}>
      {tags.map((tag) => (
        <Link
          key={tag}
          href={{ pathname: '/blog', query: { tag } }}
          className={styles.postTags__link}
        >
          {tag}
        </Link>
      ))}
    </div>
  )
}
