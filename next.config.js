/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export',  // Enable static exports
  images: {
    unoptimized: true, // Required for static export
    domains: [
      'firebasestorage.googleapis.com',
      'oaidalleapiprodscus.blob.core.windows.net',
      'dalleproduse.blob.core.windows.net'
    ],
  },
  basePath: '/pytchai', // Updated to match your repository name
  assetPrefix: '/pytchai/',
  trailingSlash: true,
}

module.exports = nextConfig 