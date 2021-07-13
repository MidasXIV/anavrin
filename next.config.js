/* eslint-disable @typescript-eslint/no-var-requires */
// next.config.js
const path = require("path");
const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

module.exports = withPWA({
  pwa: {
    dest: "public",
    disable: false,
    runtimeCaching
  },

  // This is not required to make it into a PWA, but is a nice way to clean up your imports
  webpack: config => {
    config.resolve.modules.push(path.resolve("./"));
    return config;
  },

  eslint: {
    // Warning: Dangerously allow production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true
  },

  webpack5: true
});
