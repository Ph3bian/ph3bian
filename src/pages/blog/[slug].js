import { useEffect, useRef } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/Layout'
import PostTags from '../../components/PostTags'
import { getAllPostIds, getPostData, getSortedPostsData } from '../../lib/posts'
import { buildCanonical } from '../../lib/seo'
import { formatDate } from '../../lib/format'
import styles from '../../assets/style/Post.module.scss'

export default function Post({ post, more }) {
  const progressRef = useRef(null)

  // Reading progress bar
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? window.scrollY / max : 0
      progressRef.current?.style.setProperty('transform', `scaleX(${p})`)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <Head>
        <title>{`${post.title} · Phebian Chukwurah`}</title>
        {post.description && <meta name="description" content={post.description} />}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={post.title} />
        {post.description && <meta property="og:description" content={post.description} />}
        <meta property="og:type" content="article" />
        <link rel="canonical" href={buildCanonical(`/blog/${post.slug}`)} />
      </Head>

      <div className={styles.progress} aria-hidden="true">
        <span ref={progressRef} />
      </div>

      <Layout>
        <article className={styles.post}>
          <header className={styles.header}>
            <Link href="/blog" className={styles.back}>
              <span aria-hidden="true">←</span> All writing
            </Link>
            <h1 className={styles.title}>{post.title}</h1>
            {post.description && <p className={styles.lede}>{post.description}</p>}
            <div className={styles.meta}>
              <time dateTime={post.date}>{formatDate(post.date, 'd MMMM yyyy')}</time>
              <span aria-hidden="true">·</span>
              <span>{post.readingTime} min read</span>
              {post.published === false && <span className={styles.draft}>Draft</span>}
            </div>
            <PostTags post={post} />
          </header>

          <div className={`prose ${styles.body}`} dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
        </article>

        {more.length > 0 && (
          <aside className={styles.more} aria-labelledby="more-title">
            <h2 id="more-title" className="eyebrow">Keep reading</h2>
            <ul>
              {more.map((p) => (
                <li key={p.slug}>
                  <Link href={`/blog/${p.slug}`} className={styles.moreLink}>
                    <span>{p.title}</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        )}
      </Layout>
    </>
  )
}

export function getStaticPaths() {
  return { paths: getAllPostIds(), fallback: false }
}

export async function getStaticProps({ params }) {
  const post = await getPostData(params.slug)
  const more = getSortedPostsData()
    .filter((p) => p.slug !== params.slug)
    .slice(0, 2)
    .map(({ slug, title }) => ({ slug, title }))
  return { props: { post: JSON.parse(JSON.stringify(post)), more } }
}
