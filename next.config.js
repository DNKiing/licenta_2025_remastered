/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    esmExternals: true, // Add this to handle ESModules correctly
  },
};

module.exports = nextConfig;
