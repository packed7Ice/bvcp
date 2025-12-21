/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // API プロキシ設定
  async rewrites() {
    // 本番環境では環境変数を使用
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    return [
      {
        source: '/api/:path*',
        destination: `${apiUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;

