import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    // ローカル開発時は最適化オフ、本番はオン（または運用に合わせて選択）
    unoptimized: process.env.NODE_ENV === 'development',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'shinysheep.net', // 本番ドメインを許可
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
      },
    ],
  },
  async rewrites() {
    return [
      {
        // Strapiの画像(uploads)もこのプロキシを通るようにする
        source: '/api-proxy/:path*',
        destination: 'http://strapi:1337/:path*',
      },
    ];
  },
};

export default nextConfig;
