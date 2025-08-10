import Head from 'next/head'
import Layout from '../components/Layout'
import NotFound from '../components/NotFound'

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Page not found · Chukwurah Phebian</title>
        <meta name="robots" content="noindex" />
      </Head>

      <Layout>
        <NotFound />
      </Layout>
    </>
  )
}


