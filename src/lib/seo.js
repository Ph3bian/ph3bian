export const siteName = 'Phebian Chukwurah'
export const defaultTitle = 'Chukwurah Phebian - Frontend Engineer'
export const defaultDescription = 'Frontend Engineer passionate about building accessible, responsive and performance optimised solutions. Specialising in React, TypeScript, and modern web technologies.'

export function getSiteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '')
}

export function buildCanonical(pathname = '/') {
  const base = getSiteUrl()
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`
  return `${base}${path}`
} 