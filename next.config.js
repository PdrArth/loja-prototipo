/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configurações básicas de imagens
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me',
        port: '',
        pathname: '/**',
      },
    ],
  },

  // Configurações básicas
  poweredByHeader: false,

  // Configurações experimentais mínimas
  experimental: {
    optimizePackageImports: ['@headlessui/react', 'clsx', 'tailwind-merge'],
  },
};

module.exports = nextConfig;