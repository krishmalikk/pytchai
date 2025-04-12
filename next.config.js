/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export',  // Enable static exports
  images: {
    unoptimized: true, // Required for static export
    domains: ['firebasestorage.googleapis.com'],
  },
  basePath: '/pytchai', // Updated to match your repository name
  assetPrefix: '/pytchai/',
  trailingSlash: true,
}

module.exports = nextConfig 