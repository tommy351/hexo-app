import merge from 'lodash/object/merge';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import * as config from './config';

export default merge({}, config, {
  devtool: 'source-map',
  module: {
    loaders: config.module.loaders.concat([
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
  plugins: config.plugins.concat([
    new ExtractTextPlugin('[name].css', {
      allChunks: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ])
});
