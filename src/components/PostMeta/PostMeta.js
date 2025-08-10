import styles from './PostMeta.module.scss'

export default function PostMeta({ post }) {
  return (
    <div className={styles.postMeta}>
      Posted {post.date}.
      {post.timeToRead && (
        <strong> {post.timeToRead} min read.</strong>
      )}
    </div>
  )
} 