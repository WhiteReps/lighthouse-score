import withBundleAnalyzer from '@next/bundle-analyzer';

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  trailingSlash: false,
  compress: true,
  images: {
    remotePatterns: [
      { protocol: "http", hostname: "localhost" },
      { protocol: "https", hostname: "blogger.googleusercontent.com" },
      { protocol: "https", hostname: "admin.avexim.com" },
      { protocol: "https", hostname: "api.avexim.com" },
      { protocol: "https", hostname: "as.com" },
      { protocol: "https", hostname: "puramas.avexim.com" },
      { protocol: "https", hostname: "www.images.puramas.co" },
    ],
    formats: ["image/webp"],
    minimumCacheTTL: 60,
    deviceSizes: [320, 420, 768, 1024, 1200],
    imageSizes: [16, 32, 48, 64, 96],
    domains: ["it.score.co"],
  },
  experimental: {
    turbo: {},
  },
  async rewrites() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap.xml",
      },
    ];
  },
 
};

export default bundleAnalyzer(nextConfig);