const webpack = require('webpack');

module.exports = function override(config, env) {
  // Add the polyfill for crypto
  config.resolve.fallback = {
    ...config.resolve.fallback,
    "crypto": require.resolve("crypto-browserify")
  };

  return config;
};
