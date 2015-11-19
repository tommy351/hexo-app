'use strict';

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const path = require('path');
const config = require('./dev.config');

new WebpackDevServer(webpack(config), {
  contentBase: path.join(__dirname, '../public'),
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  quiet: true,
  stats: {
    colors: true
  },
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
}).listen(config.webpackPort, config.webpackHost, function(err) {
  if (err) throw err;
  console.log('webpack-dev-server listening at %s:%s', config.webpackHost, config.webpackPort);
});
