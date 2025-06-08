/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  serverRuntimeConfig: {
    port: 9990
  },
  experimental: { 
    allowedDevOrigins: ['192.168.150.*']
  }
}

export default nextConfig
