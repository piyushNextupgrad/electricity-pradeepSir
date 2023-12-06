/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  env: {
    SITE_URL: process.env.SITE_URL,
  },
};

module.exports = nextConfig;
