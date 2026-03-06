/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      // Placeholder images (picsum.photos) — replace with NAS config in production
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      // Future: Synology NAS
      // {
      //   protocol: 'https',
      //   hostname: process.env.NAS_HOSTNAME || 'nas.yourdomain.com',
      //   pathname: '/photos/**',
      // },
    ],
  },
};

export default nextConfig;
