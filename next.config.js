/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: ['./src/assets/style'],
  },
  env: {
    // Canonical origin for SEO. Netlify sets URL at build time; override with NEXT_PUBLIC_SITE_URL.
    SITE_URL: (process.env.NEXT_PUBLIC_SITE_URL || process.env.URL || 'http://localhost:3000').replace(/\/$/, ''),
  },
}

module.exports = nextConfig
