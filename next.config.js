/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  webpack: (config, { isServer, dev }) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      '@react-native-async-storage/async-storage': false,
    };
    if (!dev && !isServer) {
      config.devtool = false;
    }
    return config;
  },
};

module.exports = nextConfig;
