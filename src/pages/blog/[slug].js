import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Layout from '../../components/Layout'
import PostTags from '../../components/PostTags'
import { getAllPostIds, getPostData, getSortedPostsData } from '../../lib/posts'
import Seo from '../../components/Seo'
import { breadcrumbSchema, buildCanonical, defaultImage, personSchema } from '../../lib/seo'
import { formatDate } from '../../lib/format'
import styles from '../../assets/style/Post.module.scss'

export default function Post({ post, more }) {
  const progressRef = useRef(null)
  const path = `/blog/${post.slug}`
  const faq = Array.isArray(post.faq) ? post.faq : []

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
      <Seo
        title={`${post.title} · Phebian Chukwurah`}
        description={post.description}
        path={path}
        type="article"
        publishedTime={post.date}
        modifiedTime={post.updated || post.date}
        tags={post.tags || []}
        schema={[
          {
            '@type': 'BlogPosting',
            '@id': `${buildCanonical(path)}#article`,
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            dateModified: post.updated || post.date,
            inLanguage: 'en-GB',
            keywords: (post.tags || []).join(', '),
            wordCount: post.wordCount,
            mainEntityOfPage: buildCanonical(path),
            image: buildCanonical(defaultImage),
            author: personSchema(),
            publisher: personSchema(),
          },
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Writing', path: '/blog' },
            { name: post.title, path },
          ]),
          ...(faq.length
            ? [
                {
                  '@type': 'FAQPage',
                  mainEntity: faq.map(({ q, a }) => ({
                    '@type': 'Question',
                    name: q,
                    acceptedAnswer: { '@type': 'Answer', text: a },
                  })),
                },
              ]
            : []),
        ]}
      />

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
              <span>
                By <Link href="/" rel="author">Phebian Chukwurah</Link>
              </span>
              <span aria-hidden="true">·</span>
              <time dateTime={post.date}>{formatDate(post.date, 'd MMMM yyyy')}</time>
              <span aria-hidden="true">·</span>
              <span>{post.readingTime} min read</span>
              {post.published === false && <span className={styles.draft}>Draft</span>}
            </div>
            <PostTags post={post} />
          </header>

          <div className={`prose ${styles.body}`} dangerouslySetInnerHTML={{ __html: post.contentHtml }} />

          {faq.length > 0 && (
            <section className={styles.faq} aria-labelledby="faq-title">
              <h2 id="faq-title">Quick answers</h2>
              <dl>
                {faq.map(({ q, a }) => (
                  <div key={q} className={styles.faq__item}>
                    <dt>{q}</dt>
                    <dd>{a}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}
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
