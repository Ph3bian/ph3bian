/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: ['./src/assets/style'],
  },
  images: {
    domains: ['localhost'],
  },
}

module.exports = nextConfig 