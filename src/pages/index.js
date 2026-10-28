import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Marquee from '../components/Marquee'
import About from '../components/About'
import Principles from '../components/Principles'
import Craft from '../components/Craft'
import LatestWriting from '../components/LatestWriting'
import { getSortedPostsData } from '../lib/posts'
import Seo from '../components/Seo'
import { personSchema, websiteSchema } from '../lib/seo'

export default function Home({ posts }) {
  return (
    <>
      <Seo schema={[personSchema(), websiteSchema()]} />

      <Layout>
        <Hero />
        <About />
        <Marquee />
        <Principles />
        <Craft />
        <LatestWriting posts={posts} />
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
