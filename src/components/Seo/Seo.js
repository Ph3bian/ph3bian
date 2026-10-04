import Head from 'next/head'
import { buildCanonical, defaultDescription, defaultImage, defaultTitle, siteName, twitterHandle } from '../../lib/seo'

// Page metadata: title, canonical, Open Graph, Twitter and JSON-LD structured data.
export default function Seo({
  title = defaultTitle,
  description = defaultDescription,
  path = '/',
  type = 'website',
  image = defaultImage,
  imageAlt = 'Portrait of Phebian Chukwurah',
  publishedTime,
  modifiedTime,
  tags = [],
  noindex = false,
  schema = [],
}) {
  const url = buildCanonical(path)
  const imageUrl = image.startsWith('http') ? image : buildCanonical(image)
  const graph = schema.length ? { '@context': 'https://schema.org', '@graph': schema } : null

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="author" content={siteName} />
      <meta
        name="robots"
        content={noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1'}
      />
      <link rel="canonical" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={imageAlt} />
      <meta property="og:locale" content="en_GB" />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {type === 'article' && <meta property="article:author" content={siteName} />}
      {tags.map((tag) => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {graph && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />
      )}
    </Head>
  )
}
