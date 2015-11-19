import merge from 'lodash/object/merge';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import webpackTargetElectronRenderer from 'webpack-target-electron-renderer';
import * as baseConfig from './config';

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

export default config;
