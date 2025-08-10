import Image from 'next/image'
import Link from 'next/link'
import PostMeta from '../PostMeta'
import PostTags from '../PostTags'
import styles from './PostCard.module.scss'

export default function PostCard({ post }) {
  return (
    <div className={`${styles.postCard} ${styles.contentBox} ${post.coverImage ? styles.postCard__hasPoster : ''}`}>
      <div className={styles.postCard__header}>
        {post.coverImage && (
          <Image 
            alt="Cover image" 
            className={styles.postCard__image} 
            src={post.coverImage}
            width={860}
            height={400}
          />
        )}
      </div>
      <div className={styles.postCard__content}>
        <h2 className={styles.postCard__title} dangerouslySetInnerHTML={{ __html: post.title }} />
        <p className={styles.postCard__description} dangerouslySetInnerHTML={{ __html: post.description }} />
        
        <PostMeta className={styles.postCard__meta} post={post} />
        <PostTags className={styles.postCard__tags} post={post} />

        <Link className={styles.postCard__link} href={`/${post.slug}`}>
          Link
        </Link>
      </div>
    </div>
  )
} 