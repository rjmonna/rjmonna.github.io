// Babel 8's React preset emits jsxDEV (missing from React's production runtime)
// unless the Babel env is production.
process.env.NODE_ENV = 'production';

const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = () => {
  return merge(common(), {
    mode: 'production',
    devtool: 'source-map',
  });
};
