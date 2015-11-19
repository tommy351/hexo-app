'use strict';

const merge = require('lodash/object/merge');
const webpack = require('webpack');
const fs = require('graceful-fs');
const path = require('path');
const webpackTargetElectronRenderer = require('webpack-target-electron-renderer');
const baseConfig = require('./config');

const babelrc = JSON.parse(fs.readFileSync(path.join(__dirname, '../.babelrc'), 'utf8'));
const webpackHost = 'localhost';
const webpackPort = 3000;

const config = merge({}, baseConfig, {
  webpackHost,
  webpackPort,
  devtool: 'eval',
  entry: {
    main: [
      `webpack-dev-server/client?http://${webpackHost}:${webpackPort}`,
      'webpack/hot/only-dev-server'
    ].concat(baseConfig.entry.main)
  },
  output: {
    publicPath: `http://${webpackHost}:${webpackPort}/build/`
  },
  module: {
    loaders: baseConfig.module.loaders.concat([
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: merge({}, babelrc, {
          plugins: [
            'react-transform'
          ],
          extra: {
            'react-transform': {
              transforms: [
                {
                  transform: 'react-transform-hmr',
                  imports: ['react'],
                  locals: ['module']
                },
                {
                  transform: 'react-transform-catch-errors',
                  imports: ['react', 'redbox-react']
                }
              ]
            }
          }
        })
      },
      {
        test: /\.css$/,
        loader: 'style!css?-minimize!postcss'
      }
    ])
  },
  plugins: baseConfig.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ])
});

config.target = webpackTargetElectronRenderer(config);

module.exports = config;
