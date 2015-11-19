'use strict';

const merge = require('lodash/object/merge');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpackTargetElectronRenderer = require('webpack-target-electron-renderer');
const baseConfig = require('./config');

const config = merge({}, baseConfig, {
  devtool: 'source-map',
  module: {
    loaders: baseConfig.module.loaders.concat([
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css?-minimize!postcss')
      }
    ])
  },
  plugins: baseConfig.plugins.concat([
    new ExtractTextPlugin('[name].css'),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false
      }
    })
  ])
});

config.target = webpackTargetElectronRenderer(config);

module.exports = config;
