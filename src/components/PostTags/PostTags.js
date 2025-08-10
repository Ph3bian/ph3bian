import Link from 'next/link'
import styles from './PostTags.module.scss'

export default function PostTags({ post }) {
  const tags = Array.isArray(post.tags) ? post.tags : []
  return (
    <div className={styles.postTags}>
      {tags.map((tag) => (
        <Link 
          key={tag} 
          href={`/tag/${encodeURIComponent(tag)}`} 
          className={styles.postTags__link}
        >
          <span>#</span> {tag}
        </Link>
      ))}
    </div>
  )
} 