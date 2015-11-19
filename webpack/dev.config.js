import merge from 'lodash/object/merge';
import webpack from 'webpack';
import fs from 'graceful-fs';
import path from 'path';
import webpackTargetElectronRenderer from 'webpack-target-electron-renderer';
import * as baseConfig from './config';

const babelrc = JSON.parse(fs.readFileSync(path.join(__dirname, '../.babelrc'), 'utf8'));

const config = merge({}, baseConfig, {
  devtool: 'eval',
  entry: {
    main: [
      'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr'
    ].concat(baseConfig.entry.main)
  },
  output: {
    publicPath: 'http://localhost:3000/build/'
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

export default config;
