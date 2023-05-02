/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["cards.scryfall.io"],
  },
};

module.exports = nextConfig;
