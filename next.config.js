/* eslint-disable @typescript-eslint/no-var-requires */
// next.config.js
const path = require("path");
const withPWA = require("next-pwa")({
  dest: "public",
  disable: false,
  // runtimeCaching,Aet this up
  customWorkerDir: "src/service-worker"
});

const runtimeCaching = require("next-pwa/cache");

module.exports = withPWA({
  images: {
    domains: [
      "images.unsplash.com",
      "lh3.googleusercontent.com",
      "res.cloudinary.com",
      "assets.coingecko.com",
      "github.com"
    ]
  },

  transpilePackages: ["geist"],
  swcMinify: true,

  // This is not required to make it into a PWA, but is a nice way to clean up your imports
  webpack: config => {
    config.resolve.fallback = { fs: false };
    config.resolve.modules.push(path.resolve("./"));
    return config;
  },

  eslint: {
    // Warning: Dangerously allow production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true
  }
});
