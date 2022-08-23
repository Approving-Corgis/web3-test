module.exports = {
  reactStrictMode: true,
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { 
      fs: false,
      path: false,
      http: false,
      https: false,
      stream: false };
    return config;
  },
}
