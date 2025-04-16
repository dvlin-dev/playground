/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL || 'http://localhost:12000',
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY || '',
  }
};

module.exports = nextConfig; 