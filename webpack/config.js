'use strict';

const path = require('path');
const webpack = require('webpack');
const postcssImport = require('postcss-import');
const precss = require('precss');
const cssnano = require('cssnano');

module.exports = {
  entry: {
    main: [
      'babel-core/polyfill',
      './src/main'
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
    packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main']
  },
  output: {
    libraryTarget: 'commonjs2',
    pathinfo: true,
    path: path.join(__dirname, '../build'),
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: '/build/'
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loader: 'eslint',
        exclude: /node_modules/
      },
      {
        test: /\.jsx?$/,
        loader: 'jscs',
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  plugins: [
    new webpack.EnvironmentPlugin([
      'NODE_ENV'
    ]),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin()
  ],

  postcss: function(webpack) {
    return [
      postcssImport({
        addDependencyTo: webpack
      }),
      precss(),
      cssnano({
        zindex: false
      })
    ];
  },

  progress: true
};
