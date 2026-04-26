// Next rejects basePath "/"; treat it like unset (root deploy).
const raw = process.env.NEXT_PUBLIC_BASE_PATH || ''
const basePath = raw === '/' ? '' : raw

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  ...(basePath ? { basePath } : {}),
}

module.exports = nextConfig
