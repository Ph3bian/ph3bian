export const siteName = 'Phebian Chukwurah'
export const defaultTitle = 'Phebian Chukwurah · Frontend Engineer'
export const defaultDescription =
  'Phebian Chukwurah is a frontend engineer with 8+ years of experience building accessible, responsive and performance-optimised web products with React, TypeScript and Next.js.'
export const twitterHandle = '@ph3bian'
export const defaultImage = '/images/phebian.png'

export const author = {
  name: 'Phebian Chukwurah',
  jobTitle: 'Frontend Engineer',
  sameAs: ['https://github.com/ph3bian', 'https://x.com/ph3bian'],
  knowsAbout: [
    'Frontend engineering',
    'React',
    'Next.js',
    'TypeScript',
    'Web accessibility (WCAG 2.1)',
    'Web performance and Core Web Vitals',
    'Frontend testing',
    'AI-assisted software development',
  ],
}

export function getSiteUrl() {
  return process.env.SITE_URL || 'http://localhost:3000'
}

export function buildCanonical(pathname = '/') {
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`
  return `${getSiteUrl()}${path}`
}

export function personSchema() {
  const url = getSiteUrl()
  return {
    '@type': 'Person',
    '@id': `${url}/#person`,
    name: author.name,
    jobTitle: author.jobTitle,
    url,
    image: `${url}${defaultImage}`,
    sameAs: author.sameAs,
    knowsAbout: author.knowsAbout,
  }
}

export function websiteSchema() {
  const url = getSiteUrl()
  return {
    '@type': 'WebSite',
    '@id': `${url}/#website`,
    url,
    name: siteName,
    description: defaultDescription,
    inLanguage: 'en-GB',
    publisher: { '@id': `${url}/#person` },
  }
}

export function breadcrumbSchema(items) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map(({ name, path }, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      item: buildCanonical(path),
    })),
  }
}
