import Head from 'next/head'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Marquee from '../components/Marquee'
import About from '../components/About'
import Craft from '../components/Craft'
import LatestWriting from '../components/LatestWriting'
import Contact from '../components/Contact'
import { getSortedPostsData } from '../lib/posts'
import { defaultTitle, defaultDescription } from '../lib/seo'

export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title>{defaultTitle}</title>
        <meta name="description" content={defaultDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={defaultTitle} />
        <meta property="og:description" content={defaultDescription} />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content={defaultTitle} />
        <meta name="twitter:description" content={defaultDescription} />
      </Head>

      <Layout>
        <Hero />
        <Marquee />
        <About />
        <Craft />
        <LatestWriting posts={posts} />
        <Contact />
      </Layout>
    </>
  )
}

export function getStaticProps() {
  const posts = getSortedPostsData()
    .slice(0, 3)
    .map(({ slug, title, date, readingTime }) => ({ slug, title, date, readingTime }))
  return { props: { posts } }
}
