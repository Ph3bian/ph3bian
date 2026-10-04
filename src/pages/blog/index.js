import Head from 'next/head'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import PostCard from '../../components/PostCard'
import { getSortedPostsData } from '../../lib/posts'
import { buildCanonical } from '../../lib/seo'
import styles from '../../assets/style/Blog.module.scss'

export default function Blog({ posts, tags }) {
  const router = useRouter()
  const active = typeof router.query.tag === 'string' ? router.query.tag : null
  const visible = active ? posts.filter((p) => p.tags.includes(active)) : posts

  const selectTag = (tag) => {
    router.replace(tag ? { pathname: '/blog', query: { tag } } : '/blog', undefined, {
      shallow: true,
      scroll: false,
    })
  }

  return (
    <>
      <Head>
        <title>Writing · Phebian Chukwurah</title>
        <meta name="description" content="Notes on frontend engineering, accessibility, performance and craft." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={buildCanonical('/blog')} />
      </Head>

      <Layout>
        <section className={styles.blog}>
          <header className={styles.header}>
            <span className="eyebrow">Journal — {posts.length} {posts.length === 1 ? 'note' : 'notes'}</span>
            <h1 className={styles.title}>
              <span className={styles.line}><span>Writing</span></span>
            </h1>
            <p className={styles.lede}>
              Notes on frontend engineering, accessibility, performance and the small details that make
              interfaces feel considered.
            </p>
          </header>

          {tags.length > 0 && (
            <div className={styles.filters} role="group" aria-label="Filter by topic">
              <button
                type="button"
                className={`${styles.chip} ${!active ? styles.chipActive : ''}`}
                aria-pressed={!active}
                onClick={() => selectTag(null)}
              >
                All
              </button>
              {tags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  className={`${styles.chip} ${active === tag ? styles.chipActive : ''}`}
                  aria-pressed={active === tag}
                  onClick={() => selectTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}

          {visible.length ? (
            <div className={styles.grid}>
              {visible.map((post, i) => (
                <PostCard key={post.slug} post={post} featured={i === 0 && !active} />
              ))}
            </div>
          ) : (
            <p className={styles.empty}>Nothing here yet — new notes are on the way.</p>
          )}
        </section>
      </Layout>
    </>
  )
}

export function getStaticProps() {
  const posts = getSortedPostsData().map((post) => ({
    slug: post.slug,
    title: post.title,
    description: post.description || '',
    date: post.date,
    readingTime: post.readingTime,
    tags: Array.isArray(post.tags) ? post.tags : [],
    published: post.published !== false,
  }))
  const tags = [...new Set(posts.flatMap((p) => p.tags))].sort()
  return { props: { posts, tags } }
}
