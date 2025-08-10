import Head from 'next/head'
import Layout from '../components/Layout'
import HeroContainer from '../components/HeroContainer'
import Skills from '../components/Skills'
import WorkHistory from '../components/WorkHistory'
import Tools from '../components/Tools'
import Contact from '../components/Contact'

export default function Home() {
  return (
    <>
      <Head>
        <title>Chukwurah Phebian - Frontend Engineer</title>
        <meta name="description" content="Frontend Engineer passionate about building accessible, responsive and performance optimised solutions. Specialising in React, TypeScript, and modern web technologies." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Chukwurah Phebian - Frontend Engineer" />
        <meta property="og:description" content="Frontend Engineer passionate about building accessible, responsive and performance optimised solutions." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Chukwurah Phebian - Frontend Engineer" />
        <meta name="twitter:description" content="Frontend Engineer passionate about building accessible, responsive and performance optimised solutions." />
      </Head>
      
      <Layout showLogo={false}>
        <HeroContainer />
        <Skills />
        <WorkHistory />
        <Tools />
        <Contact />
      </Layout>
    </>
  )
} 