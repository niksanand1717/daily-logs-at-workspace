// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
//   typescript: {
//     ignoreBuildErrors: true,
//   },
//   images: {
//     unoptimized: true,
//   },
//   serverRuntimeConfig: {
//     port: 9990
//   },
//   experimental: {
//     allowedDevOrigins: ['192.168.150.*']
//   }
// }

// export default nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ Required for GitHub Pages static export
  output: "export",

  // ✅ Must be your repo name if deploying to <username>.github.io/<repo>
  basePath: "/daily-logs-at-workspace",

  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true, // Required for static export
  },

  // ✅ These have no effect on static exports, can be removed or ignored
  serverRuntimeConfig: {
    port: 9990,
  },
  experimental: {
    allowedDevOrigins: ["192.168.150.*"],
  },
};

export default nextConfig;
