const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = () => {
  return merge(common(), {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
      compress: true,
      port: 8080,
      watchFiles: {
        paths: ['app/**/*.html', 'app/**/.js', 'app/**/.css'],
        options: {
          usePolling: true,
        },
      },
    }
  });
};
